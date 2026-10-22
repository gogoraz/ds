'use strict';
// Dependency-free Chromium/CDP check. Requires Node 22+ and a Chrome executable.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),http=require('node:http'),os=require('node:os'),{spawn}=require('node:child_process');
const executable=process.env.CHROME_PATH||'/usr/bin/google-chrome';
const output=path.resolve('docs/browser-captures'),profile=fs.mkdtempSync(path.join(os.tmpdir(),'ds-browser-'));
fs.mkdirSync(output,{recursive:true});
const server=http.createServer((request,response)=>{
 const pathname=decodeURIComponent(new URL(request.url,'http://local').pathname),file=path.resolve('.'+(pathname==='/'?'/index.html':pathname));
 if(!file.startsWith(process.cwd()+path.sep)){response.writeHead(403);response.end();return;}
 fs.readFile(file,(error,data)=>{if(error){response.writeHead(404);response.end();return;}response.setHeader('Content-Type',({'.html':'text/html','.js':'text/javascript','.woff2':'font/woff2','.webp':'image/webp','.svg':'image/svg+xml','.webmanifest':'application/manifest+json'})[path.extname(file)]||'application/octet-stream');response.end(data);});
});
let chrome,session,sequence=0,wire='',stderr='',pending=new Map(),browserExited=false,errors=[],checks=[],captures=[];
const delay=ms=>new Promise(resolve=>setTimeout(resolve,ms));
function send(method,params={},target=session){if(browserExited)return Promise.reject(Error('Chrome exited: '+stderr));return new Promise((resolve,reject)=>{const id=++sequence,timer=setTimeout(()=>{pending.delete(id);reject(Error('CDP timeout: '+method));},30000);pending.set(id,{resolve,reject,timer});chrome.stdio[3].write(JSON.stringify({id,method,params,...(target?{sessionId:target}:{})})+'\0');});}
function receive(data){wire+=data;let end;while((end=wire.indexOf('\0'))!==-1){const raw=wire.slice(0,end);wire=wire.slice(end+1);if(!raw)continue;const message=JSON.parse(raw),job=pending.get(message.id);if(job){clearTimeout(job.timer);pending.delete(message.id);message.error?job.reject(Error(JSON.stringify(message.error))):job.resolve(message.result);}if(message.method==='Runtime.exceptionThrown')errors.push(message.params.exceptionDetails.exception?.description||message.params.exceptionDetails.text);}}
async function evaluate(expression){const result=await send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(result.exceptionDetails)throw Error(result.exceptionDetails.exception?.description||result.exceptionDetails.text);return result.result.value;}
function check(name,passed,detail){checks.push({name,passed,detail});assert.ok(passed,name+': '+JSON.stringify(detail));}
async function waitFor(expression){for(let n=0;n<100;n++){try{if(await evaluate(expression))return;}catch(error){if(browserExited||String(error).includes('CDP timeout'))throw error;}await delay(100);}throw Error('Timed out waiting for '+expression);}
async function screenshot(name){await evaluate('document.fonts.ready.then(()=>true)');await delay(80);const {data}=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});fs.writeFileSync(path.join(output,name+'.png'),Buffer.from(data,'base64'));captures.push(name+'.png');}
async function main(){
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));const url='http://127.0.0.1:'+server.address().port+'/';
 chrome=spawn(executable,['--headless','--no-sandbox','--disable-dev-shm-usage','--no-first-run','--no-default-browser-check','--remote-debugging-pipe','--user-data-dir='+profile,'--no-startup-window'],{stdio:['ignore','ignore','pipe','pipe','pipe']});
 chrome.stderr.on('data',x=>{stderr=(stderr+x).slice(-12000);});chrome.stdio[4].on('data',receive);chrome.on('error',error=>{for(const job of pending.values()){clearTimeout(job.timer);job.reject(error);}pending.clear();});chrome.on('exit',()=>{browserExited=true;for(const job of pending.values()){clearTimeout(job.timer);job.reject(Error('Chrome exited: '+stderr));}pending.clear();});
 const browser=await send('Browser.getVersion',{},null),{targetId}=await send('Target.createTarget',{url:'about:blank'},null);session=(await send('Target.attachToTarget',{targetId,flatten:true},null)).sessionId;
 await send('Page.enable');await send('Runtime.enable');await send('Network.enable');await send('Page.navigate',{url});await waitFor("typeof OneHand!=='undefined'&&typeof state!=='undefined'");
 await evaluate("save.settings.reducedMotion=true;save.tutorialSeen=true;save.settings.lang='bg';menu()");
 for(const [device,width,height]of [['mobile',390,844],['desktop',1440,1000]]){
  await send('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:device==='mobile'});await evaluate('resize()');
  for(const size of ['S','M','L','XL'])for(const [screen,action]of [['town','menu'],['heroes','heroes'],['inventory','gear'],['campaign','campaign'],['settings','settings']]){
   await evaluate(`save.settings.fontScale=${JSON.stringify(size)};applyReadability();uiAction(${JSON.stringify(action)})`);
   const layout=await evaluate("(()=>{const p=ui.querySelector('.panel');return{width:p.clientWidth,scroll:p.scrollWidth,screen:screenName}})()");check(device+' '+size+' '+screen+' panel fits',layout.scroll<=layout.width+2,layout);await screenshot(device+'-'+size+'-'+screen);
  }
 }
 // Pseudo-localization and EN checks use real DOM layout on every town screen.
 await send('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});await evaluate("resize();save.settings.fontScale='XL';save.settings.lang='en';I18n.pseudo=true");
 for(const action of ['menu','gear','shop','recipes','heroes','talents','crypt','settings','achievements','campaign','gambler','rifts','missions','bestiary','statistics','guide']){
  const result=await evaluate(`uiAction(${JSON.stringify(action)});(()=>{const p=ui.querySelector('.panel');return{text:p.innerText,width:p.clientWidth,scroll:p.scrollWidth}})()`);check('EN/pseudo '+action,!/[\u0400-\u04ff]/.test(result.text)&&!result.text.includes('undefined')&&result.scroll<=result.width+2,{width:result.width,scroll:result.scroll});
 }
 await evaluate("I18n.pseudo=false;save.settings.fontScale='M';applyReadability();save.gold=100000;save.soulstones=100;buyItem('head');buyItem('boots');gearScreen()");
 const before=await evaluate("(()=>{const p=ui.querySelector('.panel');p.scrollTop=p.scrollHeight;return p.scrollTop})()");
 const after=await evaluate("Inventory.best();gearScreen();ui.querySelector('.panel').scrollTop");check('real DOM inventory scroll',Math.abs(before-after)<3,{before,after});
 // Real input delivery, rather than calls to the input handler.
 await evaluate("save.settings.mouseMode=true;startRun();state='RUN';save.settings.oneHand=false");
 await send('Input.dispatchMouseEvent',{type:'mousePressed',x:320,y:360,button:'left',buttons:1,clickCount:1});await delay(150);check('held mouse starts movement',await evaluate('InputRouter.leftHeld&&Math.hypot(Input.x,Input.y)>0'));
 await send('Input.dispatchMouseEvent',{type:'mouseReleased',x:320,y:360,button:'left',buttons:0,clickCount:1});await delay(100);check('mouse release stops movement',await evaluate('!InputRouter.leftHeld&&Input.x===0&&Input.y===0'));
 await evaluate('run.skillCDs[0]=0;run.player.mana=run.player.maxMana');await send('Input.dispatchMouseEvent',{type:'mousePressed',x:300,y:360,button:'right',buttons:2,clickCount:1});check('right mouse casts spell 1',await evaluate('run.skillCDs[0]>0'));await send('Input.dispatchMouseEvent',{type:'mouseReleased',x:300,y:360,button:'right',buttons:0,clickCount:1});
 await evaluate("save.settings.oneHand=true;InputRouter.use('touch');state='RUN';OneHand.render()");const oneHand=await evaluate("({hidden:OneHand.element.hidden,buttons:OneHand.element.querySelectorAll('button').length})");check('one-hand surface has six controls',!oneHand.hidden&&oneHand.buttons===6,oneHand);await screenshot('mobile-one-hand');
 await evaluate("OneHand.element.querySelector('[data-one-hand=stop]').click()");check('one-hand stop through DOM',await evaluate('InputRouter.oneHandTarget===null&&Input.x===0&&Input.y===0'));
 await evaluate("finishRun(false);save.gold=9876;persist()");await send('Page.reload');await waitFor("typeof save!=='undefined'&&save.gold===9876");check('saved controls survive reload',await evaluate('save.settings.oneHand&&save.settings.mouseMode&&save.gold===9876'));
 // Localhost is a secure context; explicitly register to test the HTTPS-only production worker.
 await evaluate("navigator.serviceWorker.register('./sw.js').then(()=>navigator.serviceWorker.ready).then(()=>true)");await send('Page.reload');await waitFor('navigator.serviceWorker.controller!==null');await evaluate('stageScreen()');await waitFor("document.querySelectorAll('.v8-preview').length>0&&Array.from(document.querySelectorAll('.v8-preview')).every(i=>i.complete&&i.naturalWidth>0)");await delay(400);
 await send('Network.emulateNetworkConditions',{offline:true,latency:0,downloadThroughput:0,uploadThroughput:0});await send('Page.reload');await waitFor("typeof save!=='undefined'&&screenName==='town'");check('offline shell reload',await evaluate('save.gold===9876'));await evaluate('stageScreen()');await waitFor("Array.from(document.querySelectorAll('.v8-preview')).every(i=>i.complete&&i.naturalWidth>0)");check('visited artwork reloads offline',true);await screenshot('mobile-offline');
 check('no uncaught browser errors',errors.length===0,errors);
 fs.writeFileSync('docs/browser-v8-results.json',JSON.stringify({browser:browser.product,sourceSha256:require('node:crypto').createHash('sha256').update(fs.readFileSync('index.html')).digest('hex'),checks,captures,errors,limitations:'Viewport emulation and synthetic input; no physical iOS/Android/controller or listening acceptance.'},null,2)+'\n');console.log('PASS '+checks.length+' browser checks; '+captures.length+' screenshots');
}
main().catch(error=>{fs.writeFileSync('docs/browser-v8-results.json',JSON.stringify({checks,captures,errors,failure:String(error),browserStderr:stderr},null,2)+'\n');console.error(error);process.exitCode=1;}).finally(async()=>{if(chrome){try{await send('Browser.close',{},null);}catch(_){}chrome.kill();}server.close();fs.rmSync(profile,{recursive:true,force:true,maxRetries:10,retryDelay:100});});
