/* Original procedural themes; no recordings or external audio requests. */
const MUSIC_MODES={aeolian:[0,2,3,5,7,8,10],dorian:[0,2,3,5,7,9,10],phrygian:[0,1,3,5,7,8,10],dominant:[0,1,4,5,7,8,10],double:[0,1,4,5,7,8,11],lydian:[0,2,4,6,7,9,11],penta:[0,2,3,7,9],mixolydian:[0,2,4,5,7,9,10],locrian:[0,1,3,5,6,8,10]};
const MUSIC_THEMES=[
 ['hub',50,'dorian',76,4,'lute',.16],['zone0',45,'aeolian',66,4,'bell',.10],['zone1',40,'phrygian',60,4,'box',.13],['zone2',50,'aeolian',72,3,'organ',.14],['zone3',49,'aeolian',64,4,'drip',.08],
 ['zone4',50,'dominant',92,4,'oud',.21],['zone5',43,'double',84,4,'sitar',.22],['zone6',45,'dominant',100,7,'reed',.18],['zone7',52,'lydian',78,4,'glass',.20],
 ['zone8',52,'penta',104,4,'marimba',.20],['zone9',48,'dorian',68,4,'bubble',.08],['zone10',53,'mixolydian',90,4,'harp',.18],['zone11',49,'phrygian',108,5,'ritual',.15],
 ['zone12',48,'aeolian',96,4,'ash',.18],['zone13',50,'phrygian',112,4,'ember',.23],['zone14',43,'phrygian',118,4,'anvil',.20],['zone15',47,'locrian',90,4,'choir',.14]
].map(([id,root,mode,bpm,meter,instrument,brightness])=>({id,root,mode,bpm,meter,instrument,brightness}));
// Each family keeps its own rhythm/motif; the three health phases add layers.
const BOSS_MUSIC=[
 {family:0,motif:[0,0,2,1,0,4,1,0],rhythm:[0,3,4,7],bass:[0,0,3,1],voice:'sawtooth'},
 {family:1,motif:[0,4,2,6,4,1,5,2],rhythm:[0,2,5,6],bass:[0,4,1,4],voice:'triangle'},
 {family:2,motif:[6,5,3,0,6,4,1,0],rhythm:[0,1,4,6],bass:[0,3,6,1],voice:'square'}
];
const Music={theme:null,desired:'hub',intensity:0,voices:0,limit:12,next:0,beat:0,timer:null,bus:null,rng:null,paused:false,
 play(id){const next=MUSIC_THEMES.find(t=>t.id===id)||MUSIC_THEMES[0];this.desired=next.id;if(this.theme?.id===next.id)return;this.theme=next;this.rng=seeded(hash(next.root,next.bpm,next.id.length));this.beat=0;this.audibleStart=Sound.ac?.currentTime||0;this.next=Sound.ac?Sound.ac.currentTime+.04:0;if(Sound.ac){const old=this.bus;this.bus=Sound.ac.createGain();this.bus.gain.setValueAtTime(.0001,Sound.ac.currentTime);this.bus.gain.linearRampToValueAtTime(1,Sound.ac.currentTime+1.8);this.bus.connect(Sound.music);if(old){old.gain.cancelScheduledValues(Sound.ac.currentTime);old.gain.setTargetAtTime(.0001,Sound.ac.currentTime,.5);setTimeout(()=>old.disconnect(),3500);}}},
 setIntensity(level){this.intensity=clamp(Math.floor(level),0,2);},setVolume(value){if(Sound.music)Sound.music.gain.value=clamp(value,0,1);},
 stop(){if(this.timer&&typeof clearInterval!=='undefined')clearInterval(this.timer);this.timer=null;if(this.bus&&Sound.ac)this.bus.gain.setTargetAtTime(.0001,Sound.ac.currentTime,.15);this.theme=null;},
 duck(on){if(!Sound.music||!Sound.ac)return;Sound.music.gain.setTargetAtTime(save.settings.music*(on?.22:1),Sound.ac.currentTime,.15);},
 midi(step,octave=0){const scale=MUSIC_MODES[this.theme.mode],index=((step%scale.length)+scale.length)%scale.length;return this.theme.root+scale[index]+12*octave;},
 note(midi,when,duration,voice='sine',gain=.025){const ac=Sound.ac;if(!ac||this.voices>=this.limit||Sound.voices>=14)return false;
 const osc=ac.createOscillator(),env=ac.createGain(),filter=ac.createBiquadFilter();this.voices++;Sound.voices++;osc.type=voice;osc.frequency.setValueAtTime(440*2**((midi-69)/12),when);filter.type='lowpass';filter.frequency.value=700+this.theme.brightness*6000;osc.connect(filter);filter.connect(env);env.connect(this.bus||Sound.music);env.gain.setValueAtTime(.0001,when);env.gain.exponentialRampToValueAtTime(gain,when+.018);env.gain.exponentialRampToValueAtTime(.0001,when+duration);osc.start(when);osc.stop(when+duration+.03);osc.onended=()=>{this.voices=Math.max(0,this.voices-1);Sound.voices=Math.max(0,Sound.voices-1);osc.disconnect();filter.disconnect();env.disconnect();};return true;},
 percussion(when,strong){const ac=Sound.ac;if(!ac||this.voices>=this.limit||Sound.voices>=14)return;const osc=ac.createOscillator(),gain=ac.createGain();this.voices++;Sound.voices++;osc.type='sine';osc.frequency.setValueAtTime(strong?110:220,when);osc.frequency.exponentialRampToValueAtTime(28,when+.16);gain.gain.setValueAtTime(strong?.055:.016,when);gain.gain.exponentialRampToValueAtTime(.0001,when+.18);osc.connect(gain);gain.connect(this.bus||Sound.music);osc.start(when);osc.stop(when+.2);osc.onended=()=>{this.voices--;Sound.voices--;osc.disconnect();gain.disconnect();};},
 bossContext(){
  if(!run||state!=='RUN')return null;
  for(let i=0;i<enemies.count;i++){const e=enemies.items[i];if(e.hp>0&&e.boss>=0){const phase=e.hp/e.maxHp<.33?2:e.hp/e.maxHp<.66?1:0;return{profile:BOSS_MUSIC[clamp(e.boss,0,2)],phase};}}
  return null;
 },
 schedule(){const ac=Sound.ac;if(!ac||ac.state!=='running'||!this.theme)return;if(this.next<ac.currentTime-.2)this.next=ac.currentTime+.03;
 const t=this.theme,intense=this.intensity,boss=this.bossContext(),rift=run?.mode==='rift',period=60/(t.bpm*(boss?1.2:rift?1.08:1))/2,measureSteps=t.id==='zone6'?7:t.meter*2,low=quality==='low';this.limit=low?7:12;
 while(this.next<ac.currentTime+.1){const b=this.beat++,when=this.next,phrase=Math.floor(b/measureSteps)%8,melody=boss?boss.profile.motif:[0,2,4,1,5,3,2,6],step=melody[(b+phrase)%melody.length]+(this.phraseShift||0),bright=['glass','bell','box','anvil'].includes(t.instrument),pluck=['lute','oud','sitar','harp','marimba','drip'].includes(t.instrument);
 if(b%measureSteps===0){this.phraseShift=Math.floor(this.rng()*MUSIC_MODES[t.mode].length);this.note(this.midi(phrase%3),when,Math.min(2.8,period*t.meter*1.8),t.instrument==='organ'||t.instrument==='choir'?'triangle':'sine',.026);if(!low)this.note(this.midi((phrase%3)+4),when,2,'sine',.009);}
 if((b+(t.root%3))%(pluck?2:bright?3:4)===0)this.note(this.midi(step,1),when,pluck?.24:bright?1.1:.65,bright?'sine':t.instrument==='reed'||t.instrument==='ash'?'sawtooth':'triangle',.018+t.brightness*.03);
 if(boss){
  if(boss.profile.rhythm.includes(b%8))this.percussion(when,b%8===0);
  if(boss.phase>=1&&b%4===0)this.note(this.midi(boss.profile.bass[Math.floor(b/4)%4],-1),when,period*2,boss.profile.voice,.024);
  if(boss.phase>=2&&!low&&b%8===2){this.note(this.midi(boss.profile.motif[b%8]),when,period*4,'triangle',.021);this.note(this.midi(boss.profile.motif[b%8]+4),when,period*4,'sine',.012);}
 }else{if(intense>0&&b%2===0)this.percussion(when,b%measureSteps===0);if(intense===2&&b%4===2)this.note(this.midi(0,-1),when,.3,'triangle',.038);}
 if(rift&&!low&&b%4===1)this.note(this.midi(step,2),when,.18,'square',.008+Math.min(50,run.rift.tier)*.00015);
 this.next+=period;}
 },
 tick(){if(!Sound.ac)return;if(this.theme?.id.startsWith('zone')&&Sound.ac.state==='running'&&!save.settings.mute&&save.settings.music>0&&Sound.ac.currentTime-this.audibleStart>=3)Stats.unique('zonesMusicHeard',Number(this.theme.id.slice(4)));this.setIntensity(run&&state==='RUN'?(run.bosses>0||enemies.items.slice(0,enemies.count).some(e=>e.elite)?2:enemies.count>=30||run.time>levelInfo().duration*.5?1:0):0);this.duck(['PAUSE','LEVELUP','CHEST','BOSS_INTRO'].includes(state));this.schedule();},
 motif(won){if(!Sound.ac)return;const time=Sound.ac.currentTime;for(const[i,step]of (won?[0,2,4,7]:[4,2,1,0]).entries())this.note(this.midi(step,won?1:0),time+i*.28,1.3,'triangle',.045);}
};
Sound.unlock=function(){try{if(!this.ac){const A=window.AudioContext||window.webkitAudioContext;if(!A)return;const ac=this.ac=new A();this.master=ac.createGain();this.music=ac.createGain();this.sfx=ac.createGain();this.music.connect(this.master);this.sfx.connect(this.master);const compressor=ac.createDynamicsCompressor();compressor.threshold.value=-20;compressor.ratio.value=5;this.master.connect(compressor);compressor.connect(ac.destination);
 const reverb=ac.createConvolver(),wet=ac.createGain(),buffer=ac.createBuffer(2,Math.floor(ac.sampleRate*1.25),ac.sampleRate),rng=seeded(1981);for(let c=0;c<2;c++){const data=buffer.getChannelData(c);for(let i=0;i<data.length;i++)data[i]=(rng()*2-1)*(1-i/data.length)**2;}reverb.buffer=buffer;wet.gain.value=.14;this.music.connect(reverb);reverb.connect(wet);wet.connect(this.master);
 const wanted=Music.desired;Music.theme=null;Music.play(wanted);if(typeof setInterval!=='undefined')Music.timer=setInterval(()=>Music.tick(),25);}
 this.ac.resume().catch(()=>{});this.volumes();}catch(_){this.ac=null;}};
Sound.tick=()=>Music.tick();
const menuBeforeMusic=menu;menu=function(){menuBeforeMusic();Music.play('hub');};
const startBeforeMusic=startRun;startRun=function(carry=null){startBeforeMusic(carry);if(run&&!run.ended){Music.play('zone'+run.zone);}};
const endBeforeMusic=finishRun;finishRun=function(victory){if(!run||run.ended)return;endBeforeMusic(victory);Music.motif(victory);};
