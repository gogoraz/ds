/* Versioned, bounded persistence. Earlier save keys are never deleted. */
const V8_KEY='hellbound_campaign_v8';
const V8_STATS_NUMBERS='playTimeSec kills eliteKills crits spellsCast damageDealt bestSingleSpellDamage wins deaths urnsBroken wellsUsed goldEarned goldSpent goldMax itemsEquipped enchants enchantBreaks dismantled evolutions chestsOpened riftsCompleted riftBestTier riftRunes gamblerBuys missionsDone missionStreak portalsFound langChanges exports offlinePlays dodgedWarnings dodgedMeteors'.split(' ');
function v8BlankStats(){return Object.assign(Object.fromEntries(V8_STATS_NUMBERS.map(k=>[k,0])),{killsByType:{},deathsByLevel:{},bonusLevelsDone:{},inputUsedToday:{},zonesEntered:[],zonesMusicHeard:[],weaponsSeen:[],passivesTaken:[],weaponsEvolved:[],heroWins:{},bestiarySeen:[],flags:{},records:{},weaponDamage:{},goldSpent:0});}
const defaultsBefore8=defaults,normalizeBefore8=normalizeSave;
defaults=function(){const s=defaultsBefore8();s.version=8;s.riftMaterials={shards:0,runes:0,keystones:Array(50).fill(0)};s.forge={breakStreak:0,history:[]};s.gambler={buys:0,sinceRare:0,sinceLegendary:0,commonStreak:0,history:[]};s.rifts={bestTier:{},lastTier:{},history:[],records:{}};s.missions={days:{},weeks:{},claimed:[],lastDate:'',streak:0};s.bestiary={seen:{},kills:{}};s.achievementUnlocks={};s.titles=[];s.frames=[];s.stats=v8BlankStats();Object.assign(s.settings,{fontScale:'M',readableFont:false,deadzone:.2,rumble:true,mouseMode:false,bindings:{},hardcoreForge:false,reducedMotion:false,fpsLimit:60,colorblind:false});return s;};
function boundedMap(input,max=1e12,limit=500){const out={};if(!input||typeof input!=='object'||Array.isArray(input))return out;for(const [k,v]of Object.entries(input).slice(0,limit))if(/^[a-zA-Z0-9_:.\/-]{1,100}$/.test(k))out[k]=safeInt(v,max);return out;}
function uniqueStrings(input,limit=500){return [...new Set((Array.isArray(input)?input:[]).filter(v=>typeof v==='string'&&v.length<=100))].slice(0,limit);}
normalizeSave=function(input){if(!input||typeof input!=='object')throw Error('Invalid save');const is8=input.version===8;const s=normalizeBefore8(is8?{...input,version:7}:input),d=defaults();s.version=8;
 for(const key of ['riftMaterials','forge','gambler','rifts','missions','bestiary','achievementUnlocks','stats','titles','frames'])s[key]=d[key];
 s.riftMaterials={shards:safeInt(input.riftMaterials?.shards,1e8),runes:safeInt(input.riftMaterials?.runes,1e6),keystones:Array.from({length:50},(_,i)=>safeInt(input.riftMaterials?.keystones?.[i],999))};
 s.forge={breakStreak:safeInt(input.forge?.breakStreak,2),history:(Array.isArray(input.forge?.history)?input.forge.history:[]).slice(-20).map(x=>({rank:safeInt(x.rank,10),success:!!x.success,runes:safeInt(x.runes,5),at:safeInt(x.at,1e14)}))};
 s.gambler={buys:safeInt(input.gambler?.buys,1e8),sinceRare:safeInt(input.gambler?.sinceRare,9),sinceLegendary:safeInt(input.gambler?.sinceLegendary,39),commonStreak:safeInt(input.gambler?.commonStreak,1e5),history:[]};
 const history=(Array.isArray(input.rifts?.history)?input.rifts.history:[]).slice(-20).map(x=>({tier:clamp(safeInt(x.tier),1,50),hero:safeInt(x.hero,5),time:safeInt(x.time,1000),won:!!x.won,reason:['death','timeout','quit','victory'].includes(x.reason)?x.reason:'quit'}));
 s.rifts={bestTier:boundedMap(input.rifts?.bestTier,50,6),lastTier:boundedMap(input.rifts?.lastTier,50,6),records:boundedMap(input.rifts?.records,1000,300),history};
 s.bestiary={seen:boundedMap(input.bestiary?.seen,1,100),kills:boundedMap(input.bestiary?.kills,1e9,100)};
 const st=input.stats||{};for(const k of V8_STATS_NUMBERS)s.stats[k]=Math.max(0,Math.min(1e12,Number(st[k])||0));
 for(const k of ['killsByType','deathsByLevel','bonusLevelsDone','heroWins','flags','records','weaponDamage'])s.stats[k]=boundedMap(st[k]);
 s.stats.inputUsedToday={};for(const [k,v]of Object.entries(st.inputUsedToday||{}).slice(-8))if(/^\d{4}-\d{2}-\d{2}$/.test(k))s.stats.inputUsedToday[k]=uniqueStrings(v,4).filter(x=>['touch','mouse','keyboard','gamepad'].includes(x));
 for(const k of ['zonesEntered','zonesMusicHeard','weaponsSeen','passivesTaken','weaponsEvolved','bestiarySeen'])s.stats[k]=uniqueStrings(st[k]);
 s.achievementUnlocks=boundedMap(input.achievementUnlocks,1e14,200);s.titles=uniqueStrings(input.titles,200);s.frames=uniqueStrings(input.frames,200);
 s.missions={days:boundedMap(input.missions?.days,1e5,100),weeks:boundedMap(input.missions?.weeks,1e5,100),claimed:uniqueStrings(input.missions?.claimed,1000),lastDate:/^\d{4}-\d{2}-\d{2}$/.test(input.missions?.lastDate||'')?input.missions.lastDate:'',streak:safeInt(input.missions?.streak,1e4)};
 s.settings.fontScale=Object.hasOwn(FONT_SCALES,input.settings?.fontScale)?input.settings.fontScale:'M';for(const k of ['readableFont','rumble','mouseMode','hardcoreForge','reducedMotion','colorblind'])s.settings[k]=!!input.settings?.[k];s.settings.rumble=input.settings?.rumble!==false;
 s.settings.deadzone=clamp(Number(input.settings?.deadzone)||.2,.05,.5);s.settings.fpsLimit=input.settings?.fpsLimit===30?30:60;
 s.settings.bindings={};for(const[k,v]of Object.entries(input.settings?.bindings||{}))if(/^(up|down|left|right|spell0|spell1|spell2|dash|pause)$/.test(k)&&typeof v==='string'&&v.length<25)s.settings.bindings[k]=v;
 const byId=new Map((Array.isArray(input.gear)?input.gear:[]).filter(x=>x&&typeof x.id==='string').map(x=>[x.id,x]));for(const it of s.gear){const src=byId.get(it.id)||{};it.rank=is8?safeInt(src.rank,10):it.rank;it.broken=!!src.broken;it.locked=!!src.locked;it.forgeGold=safeInt(src.forgeGold,1e8);it.forgeDust=safeInt(src.forgeDust,1e6);if(it.broken&&s.worn[it.slot]===it.id)s.worn[it.slot]=null;}
 if(!is8){s.stats.kills=s.kills;s.stats.wins=s.campaign.wins.reduce((a,b)=>a+b,0);s.stats.goldEarned=s.economy.earned;s.stats.goldSpent=s.economy.spent;}
 if(input.pendingRun&&is8)s.pendingRun={gold:safeInt(input.pendingRun.gold),mode:input.pendingRun.mode==='rift'?'rift':'campaign',tier:clamp(safeInt(input.pendingRun.tier),1,50)};
 return s;
};
const recoverBefore8=recoverRun;recoverRun=function(s){const pending=s.pendingRun;if(pending?.mode==='rift')s.riftMaterials.keystones[Math.max(0,pending.tier-2)]++;recoverBefore8(s);};
let migrationPending=null;
loadSave=function(){for(const key of [V8_KEY,V8_KEY+'_backup',CAMPAIGN_KEY,CAMPAIGN_KEY+'_backup','hellbound_act1_v6','hellbound_act1_v6_backup','hellbound_mobile_ch1_v4','hellbound_save_v1']){try{const raw=localStorage.getItem(key);if(!raw)continue;const s=normalizeSave(JSON.parse(raw));recoverRun(s);if(key!==V8_KEY&&key!==V8_KEY+'_backup')migrationPending={key,raw};return s;}catch(_){}}return defaults();};
save=loadSave();
function writeSave8(){if(sandboxMode||run?.sandbox&&!run.ended||globalThis.__AUTOPLAY__)return false;try{
 if(migrationPending){localStorage.setItem('hellbound_backup_'+migrationPending.key+'_'+new Date().toISOString().replace(/[:.]/g,'-'),migrationPending.raw);}
 const old=localStorage.getItem(V8_KEY);if(old){try{normalizeSave(JSON.parse(old));for(let i=2;i>=1;i--){const prev=localStorage.getItem(V8_KEY+'_backup'+(i===1?'':i-1));if(prev)localStorage.setItem(V8_KEY+'_backup'+i,prev);}localStorage.setItem(V8_KEY+'_backup',old);}catch(_){}}
 localStorage.setItem(V8_KEY,JSON.stringify(save));migrationPending=null;saveAvailable=true;return true;
 }catch(_){saveAvailable=false;return false;}}
persist=function(){if(sandboxMode||run?.sandbox&&!run.ended||globalThis.__AUTOPLAY__)return;if(run&&!run.ended)save.pendingRun={gold:earnedGold(run),mode:run.mode||'campaign',tier:run.rift?.tier||0};writeSave8();};
const Stats={
 listeners:[],enabled(){return !sandboxMode&&!run?.sandbox&&!globalThis.__AUTOPLAY__;},
 add(key,value=1){if(!this.enabled())return;save.stats[key]=(save.stats[key]||0)+value;},
 setMax(key,value){if(this.enabled())save.stats[key]=Math.max(save.stats[key]||0,value);},
 flag(id,value=1){if(this.enabled())save.stats.flags[id]=Math.max(save.stats.flags[id]||0,value);},
 unique(key,id){if(this.enabled()&&!save.stats[key].includes(String(id)))save.stats[key].push(String(id));},
 emit(name,data={}){if(!this.enabled())return;for(const fn of this.listeners)fn(name,data);},
 input(type){if(!this.enabled())return;const today=localDateKey(),list=save.stats.inputUsedToday[today]||(save.stats.inputUsedToday[today]=[]);if(!list.includes(type))list.push(type);},
 syncEconomy(){if(!this.enabled())return;save.stats.goldEarned=Math.max(save.stats.goldEarned,save.economy.earned);save.stats.goldSpent=Math.max(save.stats.goldSpent,save.economy.spent);this.setMax('goldMax',save.gold);}
};
function localDateKey(date=new Date()){return date.getFullYear()+'-'+String(date.getMonth()+1).padStart(2,'0')+'-'+String(date.getDate()).padStart(2,'0');}
const startBeforeStats=startRun;startRun=function(carry=null){startBeforeStats(carry);if(!run||run.ended)return;run.metrics={damage:0,damageTaken:0,byWeapon:{},spells:0,crit:0,elites:0,chests:0,urns:0,wells:0,lowWells:0,spellTimes:[],killTimes:[],maxKills60:0,noDamageTime:0,lowLifeTime:0,stillTime:0,revives:0,guardianTime:null,guardianDamage:0,guardianSpells:0,startLegacy:Object.values(save.meta).reduce((a,b)=>a+b,0),startedAt:Date.now(),lastPos:{x:run.player.x,y:run.player.y}};Stats.unique('zonesEntered',run.zone);Stats.unique('weaponsSeen',run.weapons[0].id);Stats.emit('start');};
const hitBeforeStats=hit;hit=function(e,...args){const hp=e?.hp,flash=e?.flash;hitBeforeStats(e,...args);if(!run||!e||!Number.isFinite(hp))return;const dealt=Math.max(0,Math.min(hp,hp-e.hp));if(!dealt)return;const source=String(args[3]??-1),m=run.metrics;if(m){m.damage+=dealt;m.byWeapon[source]=(m.byWeapon[source]||0)+dealt;}
 Stats.add('damageDealt',dealt);if(Stats.enabled())save.stats.weaponDamage[source]=(save.stats.weaponDamage[source]||0)+dealt;};
const hurtBeforeStats=hurt;hurt=function(...args){if(!run)return;const hp=run.player.hp;hurtBeforeStats(...args);const taken=Math.max(0,hp-run.player.hp);if(taken&&run.metrics){run.metrics.damageTaken+=taken;run.metrics.noDamageTime=0;if(run.guardianSpawned)run.metrics.guardianDamage+=taken;}};
const castBeforeStats=activeSkill;activeSkill=function(slot=0){const result=castBeforeStats(slot);if(result&&run?.metrics){const m=run.metrics;m.spells++;m.guardianSpells+=run.guardianSpawned?1:0;m.spellTimes.push({slot,time:run.time});m.spellTimes=m.spellTimes.filter(x=>run.time-x.time<=1.5);if(new Set(m.spellTimes.map(x=>x.slot)).size===3)Stats.flag('BAT-10');Stats.add('spellsCast');Stats.emit('spell',{slot});}return result;};
const deathBeforeStats=enemyDeath;enemyDeath=function(e){const m=run?.metrics;if(m){m.elites+=e.elite?1:0;m.killTimes.push(run.time);m.killTimes=m.killTimes.filter(x=>run.time-x<=60);m.maxKills60=Math.max(m.maxKills60,m.killTimes.length);}
 Stats.add('kills');if(e.elite)Stats.add('eliteKills');if(Stats.enabled()){const type=String(e.species??e.id);save.stats.killsByType[type]=(save.stats.killsByType[type]||0)+1;save.bestiary.kills[type]=(save.bestiary.kills[type]||0)+1;save.bestiary.seen[type]=1;}
 deathBeforeStats(e);Stats.emit('kill',{enemy:e});};
const updateBeforeStats=updateRun;updateRun=function(dt){if(run?.metrics&&!run.ended){const m=run.metrics,p=run.player;m.noDamageTime+=dt;m.lowLifeTime=p.hp/p.maxHp<.05?m.lowLifeTime+dt:0;m.stillTime=Math.hypot(p.x-m.lastPos.x,p.y-m.lastPos.y)<.1?m.stillTime+dt:0;m.lastPos={x:p.x,y:p.y};if(run.guardianSpawned&&m.guardianTime===null)m.guardianTime=run.time;Stats.add('playTimeSec',dt);if(m.noDamageTime>=60)Stats.flag('BAT-12');if(m.lowLifeTime>=30)Stats.flag('BAT-13');if(m.stillTime>=20)Stats.flag('SEC-13');}updateBeforeStats(dt);};
const endBeforeStats=finishRun;finishRun=function(victory){if(!run||run.ended)return;const r=run,m=r.metrics;Stats.add(victory?'wins':'deaths');if(Stats.enabled()){if(!victory)save.stats.deathsByLevel[r.stage]=(save.stats.deathsByLevel[r.stage]||0)+1;else save.stats.heroWins[selectedHero]=Math.max(save.stats.heroWins[selectedHero]||0,r.stage+1);}Stats.emit('end',{victory,run:r,metrics:m});endBeforeStats(victory);Stats.syncEconomy();persist();};
