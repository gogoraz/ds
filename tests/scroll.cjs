'use strict';
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const source=fs.readFileSync('src/act1-v6.js','utf8');
const start=source.indexOf('const scrollMemory='),end=source.indexOf('\nfunction menu()',start);
assert.ok(start>0&&end>start);
let passed=0;
function test(name,fn){fn();passed++;console.log('PASS '+name);}
class Panel{
 constructor(){this.scrollTop=0;this.nodes=[];this.html='';this.top=20;}
 getBoundingClientRect(){return{top:this.top};}
 querySelectorAll(){return this.nodes;}
 contains(el){return this.nodes.includes(el);}
 set innerHTML(html){this.html=html;this.scrollTop=0;this.nodes=[];}
 get innerHTML(){return this.html;}
}
function node(panel,id,y,disabled=false){
 const el={dataset:{id},disabled,focusOptions:null,
 getBoundingClientRect(){return{top:panel.top+y-panel.scrollTop,bottom:panel.top+y-panel.scrollTop+50,height:50};},
 focus(options){this.focusOptions=options;}};panel.nodes.push(el);return el;
}
function boot(){
 let panel=null;const ui={classList:{add(){},remove(){}},style:{},querySelector:()=>panel,
 set innerHTML(html){panel=html?new Panel():null;}};
 const context={ui,screenName:'',state:'GEAR',I18n:{localize:x=>x,localizeMarkup:x=>x,language:'en'},document:{activeElement:null,documentElement:{}}};
 vm.createContext(context);vm.runInContext(source.slice(start,end),context);
 const engine=fs.readFileSync('src/engine-v34.js','utf8');
 vm.runInContext(engine.match(/^function hideUI\(\).*$/m)[0],context);
 return{c:context,ui,get panel(){return panel}};
}
test('Absolute position is restored when no anchors exist',()=>{
 const{c}=boot(),p=new Panel();p.scrollTop=700;c.withScrollPreserved(p,()=>{p.innerHTML='new';});assert.equal(p.scrollTop,700);
});
test('Visible anchor retains its offset after cards reorder',()=>{
 const{c}=boot(),p=new Panel();p.scrollTop=500;node(p,'above',0);node(p,'item-b',510);node(p,'item-c',600);
 c.withScrollPreserved(p,()=>{p.innerHTML='reorder';node(p,'item-c',100);node(p,'item-b',810);});assert.equal(p.scrollTop,800);
});
test('Deleting the visible item falls back to the next surviving anchor',()=>{
 const{c}=boot(),p=new Panel();p.scrollTop=500;node(p,'removed',510);node(p,'survivor',600);
 c.withScrollPreserved(p,()=>{p.innerHTML='deleted';node(p,'survivor',400);});assert.equal(p.scrollTop,300);
});
test('Focus is restored with preventScroll after rendering',()=>{
 const{c}=boot(),p=new Panel();p.scrollTop=300;c.document.activeElement=node(p,'temper-a',350);let replacement;
 c.withScrollPreserved(p,()=>{p.innerHTML='tempered';replacement=node(p,'temper-a',350);});
 assert.equal(replacement.focusOptions.preventScroll,true);assert.equal(p.scrollTop,300);
});
test('A newly disabled action is not refocused',()=>{
 const{c}=boot(),p=new Panel();c.document.activeElement=node(p,'max-rank',10);let replacement;
 c.withScrollPreserved(p,()=>{p.innerHTML='max';replacement=node(p,'max-rank',10,true);});assert.equal(replacement.focusOptions,null);
});
test('Renderer can return a replacement scroll container',()=>{
 const{c}=boot(),old=new Panel(),next=new Panel();old.scrollTop=220;
 assert.equal(c.withScrollPreserved(old,()=>next),next);assert.equal(next.scrollTop,220);
});
test('In-screen actions retain the same panel and position',()=>{
 const b=boot();b.c.showUI('inventory','gear');const original=b.panel;original.scrollTop=460;
 b.c.showUI('tempered inventory','gear');assert.equal(b.panel,original);assert.equal(b.panel.scrollTop,460);
});
test('Each screen restores its own position when returning',()=>{
 const b=boot();b.c.showUI('inventory','gear');b.panel.scrollTop=640;
 b.c.showUI('shop','shop');assert.equal(b.panel.scrollTop,0);b.panel.scrollTop=180;
 b.c.showUI('inventory','gear');assert.equal(b.panel.scrollTop,640);
 b.c.showUI('shop','shop');assert.equal(b.panel.scrollTop,180);
});
test('Leaving for combat remembers the panel before hideUI removes it',()=>{
 const b=boot();b.c.showUI('settings','settings');b.panel.scrollTop=320;b.c.hideUI();assert.equal(b.panel,null);
 b.c.showUI('settings again','settings');assert.equal(b.panel.scrollTop,320);
});
test('Late-appended relic content restores the final composite screen',()=>{
 const{c}=boot(),p=new Panel();p.scrollTop=620;node(p,'relic-up',700);
 c.withScrollPreserved(p,()=>{p.innerHTML='base talents';p.scrollTop=100;node(p,'relic-up',700);return p;});assert.equal(p.scrollTop,620);
});
test('Anchor keys support data-action and input ids without selector interpolation',()=>{
 const{c}=boot();assert.equal(c.scrollKey({dataset:{action:'temper-quote"[]'}}),'temper-quote"[]');
 assert.equal(c.scrollKey({id:'saveText'}),'saveText');assert.equal(c.scrollKey(null),null);
});
test('The assembled game contains the tested helper and safe focus calls',()=>{
 const html=fs.readFileSync('index.html','utf8');assert.ok(html.includes(source.slice(start,end)));
 for(const file of ['src/engine-v34.js','src/act1-v6.js','src/campaign-v7.js'])assert.ok(!/\.focus\(\)/.test(fs.readFileSync(file,'utf8')),file);
});
console.log(passed+' scroll checks passed');
