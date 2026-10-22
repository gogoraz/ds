'use strict';const assert=require('node:assert/strict'),{boot}=require('./harness-v7.cjs');const{g}=boot();assert.equal(g.MUSIC_THEMES.length,17);assert.equal(new Set(g.MUSIC_THEMES.map(x=>x.id)).size,17);
for(const theme of g.MUSIC_THEMES){g.Music.play(theme.id);const scale=g.MUSIC_MODES[theme.mode];for(let n=-7;n<14;n++){const pitch=g.Music.midi(n,1);assert.ok(scale.includes(((pitch-theme.root)%12+12)%12));}assert.ok(theme.bpm>=60&&theme.bpm<=130);assert.ok(theme.instrument);}
let active=0,peak=0;const oscillators=[];const param={value:0,setValueAtTime(){},exponentialRampToValueAtTime(){},linearRampToValueAtTime(){},cancelScheduledValues(){},setTargetAtTime(){}};const node=()=>({gain:param,frequency:{...param},connect(){},disconnect(){},type:''});
const vm=require('node:vm');const b=boot();const ac={state:'running',currentTime:0,createGain:node,createBiquadFilter:node,createOscillator(){const o={...node(),start(){active++;peak=Math.max(peak,active)},stop(){}};oscillators.push(o);return o;}};
b.sandbox.fakeAudio=ac;vm.runInContext('Sound.ac=fakeAudio;Sound.music=fakeAudio.createGain();Sound.voices=0',b.sandbox);b.g.Music.play('hub');for(let i=0;i<50;i++)b.g.Music.note(50,0,.5);assert.ok(peak<=12);assert.equal(b.g.Music.voices,12);for(const o of oscillators){o.onended();active--;}assert.equal(b.g.Music.voices,0);
console.log('PASS 17 theme definitions, modal notes and bounded/disconnected audio voices');

const familyTest=boot(),fg=familyTest.g;fg.startRun();fg.state='RUN';
assert.equal(new Set(fg.BOSS_MUSIC.map(x=>x.motif.join(','))).size,3);
for(let family=0;family<3;family++){
 fg.enemies.clear();const boss=fg.spawnEnemy(0,false,100,100,family);assert.ok(boss);fg.state='RUN';
 for(const [ratio,phase]of [[1,0],[.5,1],[.2,2]]){boss.hp=boss.maxHp*ratio;const context=fg.Music.bossContext();assert.equal(context.profile.family,family);assert.equal(context.phase,phase);}
}
fg.state='PAUSE';assert.equal(fg.Music.bossContext(),null);
// Exercise the actual scheduler for all nine family/phase combinations.
const scheduled=boot(),sg=scheduled.g;scheduled.sandbox.fakeAudio={state:'running',currentTime:0,createGain:node};vm.runInContext('Sound.ac=fakeAudio;Sound.music=fakeAudio.createGain()',scheduled.sandbox);sg.startRun();sg.state='RUN';
for(let family=0;family<3;family++)for(let phase=0;phase<3;phase++){
 sg.enemies.clear();const boss=sg.spawnEnemy(0,false,100,100,family);sg.state='RUN';boss.hp=boss.maxHp*[1,.5,.2][phase];sg.Music.play('zone'+family);sg.Music.beat=0;sg.Music.next=0;
 const notes=[],drums=[];sg.Music.note=(...args)=>notes.push(args);sg.Music.percussion=(...args)=>drums.push(args);
 for(let step=0;step<32;step++){scheduled.sandbox.fakeAudio.currentTime=step*.15;sg.Music.schedule();}
 assert.ok(drums.length);if(phase>=1)assert.ok(notes.some(n=>n[3]===sg.BOSS_MUSIC[family].voice&&n[4]===.024));if(phase===2)assert.ok(notes.some(n=>n[4]===.012));
 const theme=sg.Music.theme,scale=sg.MUSIC_MODES[theme.mode];for(const [pitch]of notes)assert.ok(scale.includes(((pitch-theme.root)%12+12)%12));
}
console.log('PASS three distinct boss motifs/rhythms and real scheduler layers for all nine family/health phases');
