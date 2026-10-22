'use strict';const fs=require('node:fs'),assert=require('node:assert/strict'),{boot}=require('./harness-v7.cjs');
const{g,sandbox}=boot();let size,readable;sandbox.document.documentElement.style={setProperty:(k,v)=>size=v};sandbox.document.documentElement.classList={toggle:(k,v)=>readable=v};
for(const [scale,px]of Object.entries(g.FONT_SCALES)){g.save.settings.fontScale=scale;g.applyReadability();assert.equal(size,px+'px');}g.save.settings.readableFont=true;g.applyReadability();assert.equal(readable,true);
for(const font of ['ui','heading']){const bytes=fs.readFileSync('assets/fonts/'+font+'.woff2');assert.equal(bytes.subarray(0,4).toString(),'wOF2');assert.ok(bytes.length<100000);}
function lum(hex){const c=hex.match(/\w\w/g).map(x=>parseInt(x,16)/255).map(x=>x<=.04045?x/12.92:((x+.055)/1.055)**2.4);return c[0]*.2126+c[1]*.7152+c[2]*.0722;}
for(const fg of ['e4e4df','c2c7c8','ffaaa0'])for(const bg of ['252e34','11171d','162028']){const l=[lum(fg),lum(bg)].sort((a,b)=>b-a);assert.ok((l[0]+.05)/(l[1]+.05)>=4.5);}
console.log('PASS four text sizes, readable option, two offline WOFF2 assets and nine AA contrast pairs');

const css=fs.readFileSync('src/readability.css','utf8');assert.ok(css.includes('.panel{overflow-wrap:anywhere}'));assert.ok(css.includes('min-height:max(44px,2.8rem)'));
