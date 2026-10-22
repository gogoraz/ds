'use strict';
const fs=require('node:fs'),assert=require('node:assert/strict'),{boot}=require('./harness-v7.cjs');
const{g,els}=boot();const {en,bg}=g.I18n.dictionaries;
assert.deepEqual(Object.keys(en).sort(),Object.keys(bg).sort());
for(const[k,v]of Object.entries(en))assert.ok(!/[\u0400-\u04ff]/.test(v),'English contains Cyrillic: '+k);
for(const file of fs.readdirSync('src').filter(x=>x!=='i18n.js'))assert.ok(!/[\u0400-\u04ff]/.test(fs.readFileSync('src/'+file,'utf8')),file);
for(const lang of ['en','bg','en']){g.save.settings.lang=lang;for(const action of ['menu','gear','shop','recipes','heroes','talents','crypt','settings','achievements','campaign','test','gambler','rifts','missions','bestiary','statistics','guide']){g.uiAction(action);const html=els.get('ui').innerHTML;assert.ok(html.length>100,action);if(lang==='en')assert.ok(!/[\u0400-\u04ff]/.test(html),action+' contains Bulgarian');}}
g.save.settings.lang='en';g.save.campaign.cleared.fill(true);g.stage=47;g.startRun();for(let i=0;i<6;i++){g.hero=i;g.save.unlockedHeroes=[0,1,2,3,4,5];g.heroScreen();assert.ok(!/[\u0400-\u04ff]/.test(els.get('ui').innerHTML),'hero '+i);}
g.I18n.pseudo=true;assert.ok(g.t('legacy.3').length>en['legacy.3'].length);g.I18n.pseudo=false;
assert.equal(g.I18n.plural(2,{one:'one',other:'many'}),'many');assert.equal(g.I18n.time(121),'2:01');
assert.equal(g.I18n.missing.size,0);console.log('PASS i18n parity, source scan, all existing screens in BG/EN, six heroes, pseudo text, plural and time');
