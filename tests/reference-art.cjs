const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path'),assert=require('node:assert/strict');
const Canvas=require(process.env.REFERENCE_CANVAS_MODULE||'@napi-rs/canvas');
const captureDir=process.env.REFERENCE_CAPTURE_DIR||'docs/reference-captures';
process.chdir(path.resolve(__dirname,'..'));
let harness=fs.readFileSync('tests/harness-v7.cjs','utf8').replace("const fs=require('node:fs')","const Canvas=globalThis.NativeCanvas;const fs=require('node:fs')");
harness=harness.replace("constructor(tag='DIV'){","constructor(tag='DIV'){if(tag==='canvas'){const c=Canvas.createCanvas(1,1);c.style={};c.addEventListener=()=>{};c.getBoundingClientRect=()=>({left:0,top:0});return c;}");
harness=harness.replace("els.set(id,new Element())","els.set(id,new Element(id==='game'?'canvas':'div'))");
const context={require,module:{exports:{}},globalThis:{NativeCanvas:Canvas},console};vm.runInNewContext(harness,context);
(async()=>{
 const {sandbox}=context.module.exports.boot();
 const paths=vm.runInContext('RASTER_DATA',sandbox);sandbox.sourceImages={};for(const id of ['heroes','monsters','props','terrain'])sandbox.sourceImages[id]=await Canvas.loadImage(paths[id]);
 if(process.env.REFERENCE_PORTRAIT){sandbox.window.visualViewport.width=390;sandbox.window.visualViewport.height=844;}
 vm.runInContext('buildArtV2();RASTER.images=sourceImages;rebuildRasterTextures();rebuildRasterProps();for(const key of Object.keys(RASTER.base))delete RASTER.base[key];',sandbox);
 const result=vm.runInContext(`(()=>{const report=[];const ids=['hero0','hero1','hero2','hero3','hero4','hero5',...Object.keys(MONSTER_CELL)];const sheet=surface(1440,1050),c=sheet.getContext('2d');c.fillStyle='#24272b';c.fillRect(0,0,1440,1050);for(let i=0;i<ids.length;i++){const id=ids[i],s=rasterBase(id,2),p=s.getContext('2d').getImageData(0,0,s.width,s.height).data;let solid=0,clear=0;for(let j=3;j<p.length;j+=4){if(p[j]>32)solid++;if(!p[j])clear++;}report.push({id,solid,clear,corner:p[3]});const x=i%8*180,y=Math.floor(i/8)*255;c.drawImage(s,x+12,y,156,208);c.fillStyle='#e0d5c2';c.font='16px sans-serif';c.fillText(id,x+55,y+230);}for(let i=0;i<4;i++)c.drawImage(worldFloors[i*4][0],i*360,780,360,270);return{report,sheet}})()`,sandbox);
 fs.mkdirSync(captureDir,{recursive:true});fs.writeFileSync(captureDir+'/actors-and-terrain.png',result.sheet.toBuffer('image/png'));
 assert.ok(result.report.every(x=>x.solid>200&&x.clear>1000&&x.corner===0));
 const direction=vm.runInContext(`(()=>{const s=surface(1440,1080),c=s.getContext('2d');c.fillStyle='#24272b';c.fillRect(0,0,1440,1080);for(let row=0;row<6;row++)for(let dir=0;dir<8;dir++)c.drawImage(rasterBase('hero'+row,dir),dir*180,row*180,132,176);return s})()`,sandbox);
 fs.writeFileSync(captureDir+'/hero-directions.png',direction.toBuffer('image/png'));
 const props=vm.runInContext(`(()=>{const s=surface(1120,800),c=s.getContext('2d');c.fillStyle='#24272b';c.fillRect(0,0,1120,800);let i=0;for(const id of Object.keys(PROP_CELL)){const x=i%7*160,y=Math.floor(i/7)*270;c.drawImage(sprites[id],x,y);c.fillStyle='#e0d5c2';c.font='14px sans-serif';c.fillText(id,x+20,y+235);i++;}return s})()`,sandbox);fs.writeFileSync(captureDir+'/scenery.png',props.toBuffer('image/png'));
 vm.runInContext('resize();buildOverlays();save.tutorialSeen=true;sandboxMode=true;',sandbox);
 for(let act=0;act<4;act++){
  sandbox.captureAct=act;
  const scene=vm.runInContext(`selectedStage=captureAct*12;startRun();run.cam.x=run.player.x;run.cam.y=run.player.y;run.player.invuln=0;for(let i=0;i<8;i++)spawnEnemy((i+captureAct*3)%14,false,run.player.x-260+i*65,run.player.y+80+(i%2)*100);spawnEnemy(0,false,run.player.x+180,run.player.y-100,captureAct%3);state='RUN';MOTION_FRAMES.clear();render();canvas`,sandbox);
  fs.writeFileSync(captureDir+'/act-'+(act+1)+'.png',scene.toBuffer('image/png'));
 }
 fs.writeFileSync(captureDir+'/results.json',JSON.stringify({renderer:'@napi-rs/canvas (Skia), real source artwork, no browser',actors:result.report,scenes:4},null,2)+'\n');
 console.log('PASS isolated pixels for '+result.report.length+' actors, generated direction and scenery captures');
})().catch(e=>{console.error(e);process.exitCode=1});
