/* ==================== V7 / FOUR ACTS, CLASS IDENTITY AND RELICS ==================== */
const CAMPAIGN_KEY='hellbound_campaign_v7';
const ROMAN=['I','II','III','IV'];
const NODES=LEVELS.flatMap((z,zoneId)=>Array.from({length:3},(_,trial)=>({
 ...z,id:zoneId*3+trial,zoneId,trial,act:Math.floor(zoneId/4),sub:zoneId%4,
 name:[z.name[0]+' · '+(trial+1),z.name[1]+legacy("legacy.559")+(trial+1)],
 duration:105+(zoneId%4)*15+trial*20+Math.floor(zoneId/4)*10,
 boss:(z.boss+trial)%3,
 guardian:trial===2?z.guardian:[['Gate Sentinel',legacy("legacy.560")],['Seal Warden',legacy("legacy.561")]][trial]
})));
const CLASS_PROFILES=[
 {hp:130,speed:138,might:1.05,armor:3,mana:90,crit:.05,regen:.35,area:1,duration:1,amount:0},
 {hp:96,speed:163,might:1,armor:0,mana:105,crit:.15,regen:.2,area:1,duration:1,amount:0},
 {hp:84,speed:144,might:1.08,armor:0,mana:135,crit:.06,regen:.2,area:1.2,duration:1,amount:0},
 {hp:106,speed:138,might:.98,armor:1,mana:125,crit:.05,regen:.65,area:1,duration:1.2,amount:1},
 {hp:124,speed:132,might:1.02,armor:4,mana:100,crit:.05,regen:.8,area:1,duration:1.12,amount:0},
 {hp:90,speed:170,might:1.04,armor:0,mana:110,crit:.18,regen:.25,area:1,duration:1,amount:0}
];
const CLASS_GATES=[-1,2,5,11,23,35];
const SLOT_RULES={
 weapon:{label:legacy("legacy.428"),stat:'might',cap:.3,base:.075,step:.015,unit:legacy("legacy.456")},
 armor:{label:legacy("legacy.429"),stat:'hp',cap:80,base:18,step:4,unit:legacy("legacy.457")},
 charm:{label:legacy("legacy.430"),stat:'growth',cap:.25,base:.04,step:.01,unit:legacy("legacy.458")},
 head:{label:legacy("legacy.562"),stat:'mana',cap:40,base:8,step:2,unit:legacy("legacy.563")},
 gloves:{label:legacy("legacy.564"),stat:'crit',cap:.06,base:.01,step:.003,unit:legacy("legacy.565")},
 boots:{label:legacy("legacy.566"),stat:'speed',cap:.08,base:.02,step:.004,unit:legacy("legacy.567")},
 cloak:{label:legacy("legacy.568"),stat:'regen',cap:.5,base:.12,step:.025,unit:legacy("legacy.569")},
 belt:{label:legacy("legacy.570"),stat:'armor',cap:3,base:.5,step:.15,unit:legacy("legacy.571")}
};
for(const [slot,r]of Object.entries(SLOT_RULES))GEAR_SLOT[slot]=r.label;
const SETS=[
 {id:'ash',name:legacy("legacy.572"),color:'#c09b70'},
 {id:'sun',name:legacy("legacy.573"),color:'#dfbd6c'},
 {id:'thorn',name:legacy("legacy.574"),color:'#82ac85'},
 {id:'ember',name:legacy("legacy.575"),color:'#d58268'}
];
const MATERIALS=[legacy("legacy.576"),legacy("legacy.577"),legacy("legacy.578"),legacy("legacy.579")];
const RELIC_NAMES=[legacy("legacy.580"),legacy("legacy.581"),legacy("legacy.582"),legacy("legacy.583"),legacy("legacy.584"),legacy("legacy.585")];
const RELIC_DESC=[
 legacy("legacy.586"),
 legacy("legacy.587"),
 legacy("legacy.588"),
 legacy("legacy.589"),
 legacy("legacy.590"),
 legacy("legacy.591")
];
const RECIPES=SETS.flatMap((set,act)=>['head','armor','boots'].map(slot=>({id:set.id+'_'+slot,set:act,slot,name:GEAR_SLOT[slot]+' · '+set.name})));
const normalizeV6=normalizeSave,defaultsV6=defaults;
cleanGear=function(list){const out=[],ids=new Set();for(const x of Array.isArray(list)?list.slice(0,80):[]){
 if(!x||!SLOT_RULES[x.slot]||typeof x.id!=='string'||!x.id||ids.has(x.id))continue;
 const id=x.id.slice(0,80);if(ids.has(id))continue;ids.add(id);
 out.push({id,name:String(x.name||legacy("legacy.592")).slice(0,70),slot:x.slot,rarity:safeInt(x.rarity,3),tier:clamp(safeInt(x.tier),1,8),rank:safeInt(x.rank,5),power:clamp(Number(x.power)||0,0,SLOT_RULES[x.slot].cap),cost:safeInt(x.cost,5000),set:Number.isInteger(x.set)&&x.set>=0&&x.set<4?x.set:null});
 }return out;};
function blankCampaign(){return {cleared:Array(48).fill(false),best:Array(48).fill(0),wins:Array(48).fill(0),checkpoint:null};}
defaults=function(){const s=defaultsV6();s.version=7;s.campaign=blankCampaign();s.tiers=Array(48).fill(0);s.stars=Array(48).fill(0);s.wins=Array(48).fill(0);s.best=Array(48).fill(0);s.materials=[0,0,0,0];s.relicRanks=Array(6).fill(0);s.recipes=[];s.recipeMisses=[0,0,0,0];s.worn=Object.fromEntries(Object.keys(SLOT_RULES).map(k=>[k,s.worn[k]||null]));return s;};
normalizeSave=function(input){
 if(!input||typeof input!=='object'||Array.isArray(input))throw Error('Invalid save');
 if(![1,2,6,7].includes(input.version)&&![4,5].includes(input.v))throw Error('Unsupported version');
 const old=input.version!==7,s=normalizeV6({...input,version:input.version===7?6:input.version}),source=old?s:input,c=source.campaign||{};
 s.version=7;s.campaign=blankCampaign();
 for(let i=0;i<48;i++){const j=old?Math.floor(i/3):i;s.campaign.cleared[i]=c.cleared?.[j]===true;s.campaign.best[i]=safeInt(c.best?.[j],10000);s.campaign.wins[i]=s.campaign.cleared[i]?Math.max(1,safeInt(c.wins?.[j],1e6)):0;}
 // Completion remains continuous; imports cannot skip locked campaign nodes.
 let continuous=true;for(let i=0;i<48;i++){if(!s.campaign.cleared[i])continuous=false;if(!continuous){s.campaign.cleared[i]=false;s.campaign.wins[i]=0;}}
 s.tiers=Array.from({length:48},(_,i)=>safeInt(source.tiers?.[old?Math.floor(i/3):i],3));
 s.stars=Array.from({length:48},(_,i)=>s.campaign.cleared[i]?clamp(safeInt(source.stars?.[old?Math.floor(i/3):i],4),1,4):0);
 s.gear=cleanGear(input.gear?.length?input.gear:s.gear);if(!s.gear.length)s.gear=starterGear();
 s.worn=Object.fromEntries(Object.keys(SLOT_RULES).map(slot=>{const id=Object.prototype.hasOwnProperty.call(input.worn||{},slot)?input.worn[slot]:s.worn?.[slot];return [slot,s.gear.find(it=>it.id===id&&it.slot===slot)?.id||null];}));
 s.materials=Array.from({length:4},(_,i)=>safeInt(input.materials?.[i],9999));
 s.relicRanks=Array.from({length:6},(_,i)=>safeInt(input.relicRanks?.[i],5));
 s.recipes=Array.from(new Set((Array.isArray(input.recipes)?input.recipes:[]).filter(id=>RECIPES.some(r=>r.id===id))));
 s.recipeMisses=Array.from({length:4},(_,i)=>safeInt(input.recipeMisses?.[i],4));
 const p=c.checkpoint;if(p){const stage=old?p.stage*3:p.stage;
 if(Number.isInteger(stage)&&stage>0&&stage<48&&s.campaign.cleared[stage-1]&&s.unlockedHeroes.includes(p.hero)){
 const weapons=[],seen=new Set();for(const w of Array.isArray(p.weapons)?p.weapons:[]){if(!Number.isInteger(w.id)||w.id<0||w.id>=12||seen.has(w.id)||weapons.length>=6)continue;seen.add(w.id);weapons.push({id:w.id,level:clamp(safeInt(w.level),1,8),evolved:w.evolved===true&&w.level===8});}
 const passives=Array(16).fill(0);let count=0;for(let j=0;j<16;j++){const n=safeInt(p.passives?.[j],5);if(n&&count++<6)passives[j]=n;}
 if(weapons.length)s.campaign.checkpoint={stage,hero:p.hero,level:clamp(safeInt(p.level),1,100),xp:safeInt(p.xp,1e5),weapons,passives};
 }}
 s.wins=[...s.campaign.wins];s.best=[...s.campaign.best];
 s.pendingRun=input.pendingRun?{gold:safeInt(input.pendingRun.gold),soul:0,kills:0,gear:[]}:null;
 s.unlockedStages=NODES.filter(n=>n.id===0||s.campaign.cleared[n.id-1]).map(n=>n.id);return s;
};
recoverRun=function(s){if(!s.pendingRun)return;s.gold=Math.min(1e9,s.gold+safeInt(s.pendingRun.gold));s.economy.earned+=safeInt(s.pendingRun.gold);s.pendingRun=null;s.campaign.checkpoint=null;};
loadSave=function(){for(const key of [CAMPAIGN_KEY,CAMPAIGN_KEY+'_backup','hellbound_act1_v6','hellbound_act1_v6_backup','hellbound_mobile_ch1_v4','hellbound_save_v1']){try{const raw=localStorage.getItem(key);if(raw){const s=normalizeSave(JSON.parse(raw));recoverRun(s);return s;}}catch(_){}}return defaults();};
save=loadSave();
persist=function(){if(sandboxMode||run?.sandbox&&!run.ended)return;try{
 if(run&&!run.ended)save.pendingRun={gold:earnedGold(run)};
 const raw=localStorage.getItem(CAMPAIGN_KEY);if(raw){try{normalizeSave(JSON.parse(raw));localStorage.setItem(CAMPAIGN_KEY+'_backup',raw);}catch(_){}}
 localStorage.setItem(CAMPAIGN_KEY,JSON.stringify(save));saveAvailable=true;
 }catch(_){saveAvailable=false;}};
levelInfo=function(id=run?.stage??selectedStage){return NODES[clamp(safeInt(id),0,47)];};
unlockedLevel=function(id){return Number.isInteger(id)&&id>=0&&id<48&&(sandboxMode||id===0||save.campaign.cleared[id-1]);};
updateUnlocks=function(){const before=save.unlockedHeroes.length;for(let h=0;h<6;h++){if((h===0||save.campaign.cleared[CLASS_GATES[h]])&&!save.unlockedHeroes.includes(h))save.unlockedHeroes.push(h);}
 save.unlockedStages=NODES.filter(n=>unlockedLevel(n.id)).map(n=>n.id);return before!==save.unlockedHeroes.length;};
HEROES.forEach((h,i)=>h.hint=i===0?['Available',legacy("legacy.216")]:['Complete level '+(CLASS_GATES[i]+1),legacy("legacy.593")+(CLASS_GATES[i]+1)+' · '+ROMAN[NODES[CLASS_GATES[i]].act]+legacy("legacy.594")]);
MOVEMENT[0].name=['Earthbreak',legacy("legacy.595")];MOVEMENT[1].name=['Fox Vault',legacy("legacy.596")];MOVEMENT[2].name=['Veilstep',legacy("legacy.597")];MOVEMENT[3].name=['Soul Drift',legacy("legacy.598")];MOVEMENT[4].name=['Oath Charge',legacy("legacy.599")];MOVEMENT[5].name=['Raven Dive',legacy("legacy.600")];
const MOVE_DESC=[legacy("legacy.601"),legacy("legacy.602"),legacy("legacy.603"),legacy("legacy.604"),legacy("legacy.605"),legacy("legacy.606")];
for(const slot of Object.keys(SLOT_RULES).filter(k=>!['weapon','armor','charm'].includes(k))){const r=SLOT_RULES[slot];FORGE.push({id:slot,name:legacy("legacy.607")+r.label.toLowerCase(),slot,power:r.base,cost:55});}
gearLine=function(it){const r=SLOT_RULES[it.slot],v=itemValue(it);return '+'+(r.unit.startsWith('%')?Math.round(v*100):Number(v.toFixed(2)))+r.unit;};
gearBonuses=function(){const b={might:0,hp:0,growth:0,mana:0,crit:0,speed:0,regen:0,armor:0,sets:[0,0,0,0]};for(const slot of Object.keys(SLOT_RULES)){const it=save.gear.find(x=>x.id===save.worn[slot]&&x.slot===slot);if(!it)continue;b[SLOT_RULES[slot].stat]+=itemValue(it);if(it.set!==null&&it.set!==undefined)b.sets[it.set]++;}return b;};
stats=function(){
 const p=run.player,old=p.maxHp||100,hp=p.hp,profile=CLASS_PROFILES[selectedHero],b=gearBonuses(),tal=save.talents[selectedHero]||[0,0,0];
 statsV1(); // Reuse the passive and meta tables, then replace legacy class offsets.
 if(selectedHero===1){p.speed/=1.15;p.crit-=.1;}if(selectedHero===2){p.area-=.25;p.maxHp/=.8;}if(selectedHero===3)p.amount--;if(selectedHero===4){p.regen--;p.duration-=.25;}
 p.maxHp+=(profile.hp-100)*(1+metaLv('health')*.08)+b.hp+(selectedHero===0?tal[1]*6:0);
 p.speed=(p.speed+(profile.speed-140)*(1+metaLv('speed')*.05))*(1+b.speed+(selectedHero===5?tal[1]*.02:0));
 p.armor+=profile.armor-(selectedHero===0?2:0)+b.armor+(selectedHero===4?tal[1]:0);
 p.might+=profile.might-1+b.might+tal[0]*.03;p.crit=clamp(p.crit+profile.crit-.05+b.crit+metaLv('legacycrit')*.02+(selectedHero===1?tal[1]*.015:0),0,.75);
 p.regen+=profile.regen-.2+b.regen+metaLv('legacyregen')*.12;p.area+=profile.area-1+(selectedHero===2?tal[1]*.04:0);p.duration+=profile.duration-1+(selectedHero===3?tal[1]*.06:0);p.amount+=profile.amount;
 p.growth+=b.growth;p.cooldown=clamp(p.cooldown+tal[2]*.02,0,.6);p.maxMana=profile.mana+b.mana+tal[2]*8;p.mana=clamp(p.mana??p.maxMana,0,p.maxMana);
 for(let a=0;a<4;a++){if(b.sets[a]>=2){if(a===0)p.maxHp+=18;if(a===1)p.cooldown=clamp(p.cooldown+.04,0,.6);if(a===2)p.regen+=.35;if(a===3)p.might+=.05;}
 if(b.sets[a]>=3){if(a===0)p.armor+=1;if(a===1)p.maxMana+=15;if(a===2)p.speed*=1.05;if(a===3)p.crit=clamp(p.crit+.04,0,.75);}}
 p.hp=clamp(hp+p.maxHp-old,0,p.maxHp);
};
startRun=function(carry=null){
 if(!unlockedLevel(selectedStage)||!sandboxMode&&!save.unlockedHeroes.includes(selectedHero))return;
 if(sandboxMode&&!sandboxOriginalSave){sandboxOriginalSave=save;save=normalizeSave(JSON.parse(JSON.stringify(save)));}
 startRunV1();grid.build();const n=levelInfo();
 Object.assign(run,{skillCDs:[0,0,0],guardianSpawned:false,eliteMarks:0,ambientTick:0,act:n.act,sub:n.sub,zone:n.zoneId,trial:n.trial,sandbox:sandboxMode,tier:save.tiers[selectedStage]||0,loot:[],eliteLoot:0,checkpointTimer:0,baseTime:n.duration,materials:[0,0,0,0],recipe:null,recipeRolled:false,relicCD:0});
 Object.assign(run.player,{mana:CLASS_PROFILES[selectedHero].mana,leapTime:0,leapMax:0,z:0,attackPose:0,drawAngle:0,buffPower:0,shieldTime:0,strafeTime:0,strafeTick:0,spinTick:0,moveType:'',vx:0,vy:0});
 if(carry&&carry.stage===selectedStage&&carry.hero===selectedHero){run.level=clamp(safeInt(carry.level),1,100);run.xp=clamp(carry.xp,0,xpToNext(run.level)-1);run.nextXP=xpToNext(run.level);run.weapons=carry.weapons.map(w=>({...w,cd:.25}));run.passives=new Uint8Array(carry.passives);}
 else if(selectedStage>0){const depth=n.zoneId;run.level=1+Math.min(32,depth*2+n.trial);run.nextXP=xpToNext(run.level);run.weapons[0].level=Math.min(8,2+Math.floor(depth/2));for(const [stat,rank]of [['might',Math.min(3,Math.floor(depth/4))],['health',Math.min(3,Math.floor(depth/4))],['armor',Math.min(2,Math.floor(depth/6))],['cooldown',Math.min(2,Math.floor(depth/6))]]){const id=PASSIVES.findIndex(p=>p.stat===stat);if(id>=0)run.passives[id]=rank;}for(const id of (selectedHero===1?[2,4,6]:[1,4,6]).slice(0,Math.min(3,1+Math.floor(depth/3))))if(!run.weapons.some(w=>w.id===id))run.weapons.push({id,level:Math.min(5,1+Math.floor(depth/3)),evolved:false,cd:.3});}
 if(sandboxBoss){run.time=n.duration;run.weapons[0].level=8;run.weapons[0].evolved=true;run.level=Math.max(run.level,20);run.passives[0]=3;run.passives[8]=3;}
 stats();run.player.hp=run.player.maxHp;run.player.mana=run.player.maxMana;Terrain.place(run.player,14);world.cx=1e9;world.stream();Input.reset();persist();
};
spawnEnemy=function(id=0,elite=false,x=null,y=null,boss=-1){if(!run)return null;
 if(x===null){const a=rand(0,TAU),distance=Math.hypot(CONFIG.W,CONFIG.H)*.53+65;x=run.player.x+Math.cos(a)*distance;y=run.player.y+Math.sin(a)*distance;}
 const e=spawnEnemyV1(id,elite,x,y,boss);if(!e)return null;const n=levelInfo(),depth=n.zoneId,t=run.tier||0;
 e.levelGuardian=boss>=0;e.colorAct=n.act;e.attackPose=0;e.drawAngle=0;
 if(boss<0&&id!==99){e.maxHp=ENEMIES[id].hp*(1+depth*.18+n.trial*.1)*(1+run.time/60*.12)*(elite?4.5:1)*(1+.22*t)*run.player.curse;e.hp=e.maxHp;e.speed*=.92+Math.min(.18,depth*.012)+Math.min(.1,run.time/1200);e.damage*=1+depth*.025+n.trial*.03+t*.07;}
 if(boss>=0){e.maxHp=(720+depth*240+n.trial*210)*(1+.22*t)*run.player.curse;e.hp=e.maxHp;e.damage=(17+depth*.9+n.trial)*(1+.07*t);e.speed*=.8;e.sprite='boss'+boss;e.name=n.guardian;}
 Terrain.place(e,e.r);return e;};
const deathV6=enemyDeath;
enemyDeath=function(e){if(e.boss>=0){const n=levelInfo();run.materials[n.act]+=1+(n.trial===2?1:0);const missing=RECIPES.filter(r=>r.set===n.act&&!save.recipes.includes(r.id));run.recipeRolled=true;if(missing.length&&(Math.random()<[.23,.35,.5][n.trial]||save.recipeMisses[n.act]>=4))run.recipe=missing[Math.floor(Math.random()*missing.length)].id;}deathV6(e);};
rollGear=function(boss=false){const r=Math.random(),rarity=boss?(r<.08?3:r<.7?2:1):(r<.04?3:r<.35?2:1),slots=Object.keys(SLOT_RULES),slot=slots[Math.floor(Math.random()*slots.length)],rule=SLOT_RULES[slot],tier=clamp(1+run.act+Math.floor(run.sub/2)+Math.floor(run.tier/2),1,8);
 const power=Math.min(rule.cap,rule.base+rule.step*(tier+rarity));let id;do{id='relic_'+(++save.itemCounter);}while(save.gear.some(i=>i.id===id));
 return {id,name:rule.label+legacy("legacy.608")+[legacy("legacy.609"),legacy("legacy.610"),legacy("legacy.611"),legacy("legacy.612")][run.act],slot,rarity,tier,rank:0,power,cost:60+tier*18+rarity*20,set:null};};
earnedGold=function(r,victory=false){if(r.sandbox)return 0;const n=NODES[r.stage]||NODES[0],effort=Math.min(r.time,r.kills*5)*.22+r.kills*.22;return Math.floor((effort*(1+metaLv('greed')*.08)+r.gold+(victory?45+n.zoneId*7+n.trial*8:0))*(1+.15*(r.tier||0)));};
const ACT_POOLS=[[0,1,2,3,4,5,6],[2,4,8,3,5,9,12],[8,7,11,2,6,10,13],[9,12,13,5,6,10,11]];
waveDirector=function(dt){const r=run,n=levelInfo();r.spawn-=dt;const pressure=clamp(r.time/n.duration,0,1),pool=ACT_POOLS[n.act],length=Math.min(pool.length,2+n.sub+n.trial+Math.floor(r.time/30));
 if(r.spawn<=0){r.spawn=(r.guardianSpawned?2.8:.95-pressure*.42-n.act*.035)/Math.sqrt(r.player.curse);const count=r.guardianSpawned?1:Math.min(6,1+Math.floor(r.time/55)+Math.floor(n.act/2));for(let i=0;i<count;i++)spawnEnemy(pool[Math.floor(Math.random()*length)]);}
 const hazard=Math.floor(r.time/(30-n.trial*3));if(hazard>(r.hazardMark||0)&&r.time>20&&!r.guardianSpawned){r.hazardMark=hazard;const p=r.player;effect('hostileWarn',p.x+rand(-30,30),p.y+rand(-30,30),55+n.act*8,['#a08a76','#d5b16c','#82a06e','#d68157'][n.act],1.6,12+n.act*2+n.trial,1);}
 const mark=Math.floor(r.time/50);if(mark>r.eliteMarks&&r.time<n.duration-10){r.eliteMarks=mark;spawnEnemy(pool[Math.min(pool.length-1,2+n.sub+n.trial)],true);}
 if(r.time>=n.duration&&!r.guardianSpawned){r.guardianSpawned=true;if(!spawnEnemy(0,false,null,null,n.boss))r.guardianSpawned=false;}
 if(r.time>=n.duration+180&&!r.reaper){r.reaper=true;spawnEnemy(99);toast(legacy("legacy.613"));}
};
finishRun=function(victory){if(!run||run.ended)return;const r=run,n=levelInfo();r.ended=true;r.victory=!!victory;r.awardedGold=earnedGold(r,victory);r.awardedSoul=!r.sandbox&&victory?r.soulstones:0;r.fresh=false;r.overflow=0;r.savedLoot=0;
 if(!r.sandbox){const c=save.campaign,first=victory&&!c.cleared[r.stage];if(first)r.awardedGold+=25;
 save.gold+=r.awardedGold;save.economy.earned+=r.awardedGold;save.runs++;save.pendingRun=null;c.checkpoint=null;
 if(victory){save.soulstones+=r.awardedSoul;save.kills+=r.kills;save.maxLevel=Math.max(save.maxLevel,r.level);
 for(const it of r.loot){if(save.gear.length<80){save.gear.push(it);r.savedLoot++;}else{save.shards+=1+it.rarity;r.overflow++;}}
 save.shards+=2+n.act+n.trial;for(let a=0;a<4;a++)save.materials[a]+=r.materials[a];
 if(r.recipe&&!save.recipes.includes(r.recipe))save.recipes.push(r.recipe);
 if(r.recipeRolled)save.recipeMisses[n.act]=r.recipe?0:Math.min(4,save.recipeMisses[n.act]+1);
 c.cleared[r.stage]=true;c.wins[r.stage]++;c.best[r.stage]=Math.max(c.best[r.stage],r.time);save.stars[r.stage]=Math.max(save.stars[r.stage],r.tier+1);
 if(r.stage<47)c.checkpoint={stage:r.stage+1,hero:selectedHero,level:r.level,xp:r.xp,weapons:r.weapons.map(w=>({id:w.id,level:w.level,evolved:w.evolved})),passives:Array.from(r.passives)};
 }else{r.loot=[];r.materials=[0,0,0,0];r.recipe=null;}
 save.wins=[...c.wins];save.best=[...c.best];r.fresh=updateUnlocks();persist();
 }else if(sandboxOriginalSave){save=sandboxOriginalSave;sandboxOriginalSave=null;}
 state='RESULT';Input.reset();Sound.play(victory?'level':'hurt');showResult();
};
function relicCost(hero=selectedHero){const rank=save.relicRanks[hero];return {act:Math.max(0,rank-1),material:2+rank*2,gold:90+rank*65};}
function buyRelic(){const rank=save.relicRanks[selectedHero],c=relicCost();if(!save.unlockedHeroes.includes(selectedHero)||rank>=5||save.gold<c.gold||save.materials[c.act]<c.material)return false;save.gold-=c.gold;save.economy.spent+=c.gold;save.materials[c.act]-=c.material;save.relicRanks[selectedHero]++;persist();return true;}
function craftRecipe(id){const r=RECIPES.find(x=>x.id===id);if(!r||!save.recipes.includes(id)||save.gear.length>=80)return false;const gold=125+r.set*50,mat=3+r.set;if(save.gold<gold||save.materials[r.set]<mat)return false;
 save.gold-=gold;save.economy.spent+=gold;save.materials[r.set]-=mat;const rule=SLOT_RULES[r.slot],tier=2+r.set;let itemId;do{itemId='crafted_'+(++save.itemCounter);}while(save.gear.some(it=>it.id===itemId));
 save.gear.push({id:itemId,name:r.name,slot:r.slot,rarity:2,tier,rank:0,power:Math.min(rule.cap,rule.base+rule.step*(tier+2)),cost:gold,set:r.set});persist();return true;}
const castClassSkill=activeSkill;
activeSkill=function(slot=0){if(!run||state!=='RUN'||!Number.isInteger(slot)||slot<0||slot>2)return false;const before=run.skillCDs[slot];castClassSkill(slot);if(before>0||run.skillCDs[slot]<=0)return false;
 const rank=save.relicRanks[selectedHero]||0;if(slot===2&&rank>0&&run.relicCD<=0){run.relicCD=12;const p=run.player,m=1+(rank-1)*.08,color=SETS[Math.min(3,rank-1)].color;
 if(selectedHero===0){areaHit(p.x,p.y,150*p.area,34*m,0);slowArea(p.x,p.y,150,.7,.25);effect('warcry',p.x,p.y,150,color,.6);}
 if(selectedHero===1)for(let j=-1;j<=1;j++){const q=shoot(p.x,p.y,p.aim+j*.22,480,23*m,'arrow',5,3,2,PAL.GOLD);if(q)q.source=1;}
 if(selectedHero===2){areaHit(p.x,p.y,170*p.area,35*m,6);slowArea(p.x,p.y,170,1.3,.25);effect('frostNova',p.x,p.y,170,'#a1cddd',.7);}
 if(selectedHero===3){heal(p.maxHp*.04*m);for(let j=-1;j<=1;j++){const q=shoot(p.x,p.y,p.aim+j*.2,280,25*m,'bonespear',6,3,2,'#b8c6b2');if(q)q.source=3;}effect('warcry',p.x,p.y,90,'#a4bbaa',.6);}
 if(selectedHero===4){p.shieldTime=Math.max(p.shieldTime,2*m);holyFist(p.x+Math.cos(p.aim)*70,p.y+Math.sin(p.aim)*70,38*m);}
 if(selectedHero===5){poisonNova(p.x,p.y,32*m,150);p.frenzyTime=2*m;}
 }return true;};
function safeLanding(p,tx,ty){for(let i=0;i<=12;i++){const f=1-i/12,x=lerp(p.x,tx,f),y=lerp(p.y,ty,f);if(Terrain.free(x,y,14))return{x,y};}return{x:p.x,y:p.y};}
dash=function(){if(!run||state!=='RUN'||run.dashCD>0||run.player.leapTime>0)return false;const p=run.player,m=MOVEMENT[selectedHero],a=p.aim;let tx=p.x+Math.cos(a)*m.range,ty=p.y+Math.sin(a)*m.range;
 if(m.type==='flight'){const target=nearest(tx,ty,180);if(target){tx=target.x;ty=target.y;}}
 const landing=m.type==='charge'?Terrain.endpoint(p.x,p.y,tx,ty,14):safeLanding(p,tx,ty);
 if(Math.hypot(landing.x-p.x,landing.y-p.y)<12)return false;
 run.dashCD=m.cd*(1-p.cooldown*.5);Object.assign(p,{moveType:m.type,leapSX:p.x,leapSY:p.y,leapTX:landing.x,leapTY:landing.y,leapMax:m.type==='blink'?.12:m.type==='bloodrush'?.24:m.type==='charge'?.38:m.type==='vault'?.42:.6,vx:0,vy:0,chargeTick:0});
 p.leapTime=p.leapMax;p.invuln=Math.max(p.invuln,p.leapMax+.15);castPose(a,.5);effect(m.type==='blink'?'blink':'leapDust',p.x,p.y,55,['#c8b28b','#b5b67d','#a4bfe0','#c06b73','#e0ce96','#bb9dce'][selectedHero],.5);Sound.play('slash');return true;};
const updateClassPlayer=updatePlayer;
updatePlayer=function(dt){updateClassPlayer(dt);run.relicCD=Math.max(0,run.relicCD-dt);};
showBossIntro=function(e){if(run.ended)return;state='BOSS_INTRO';Input.reset();showUI(legacy("legacy.614")+ROMAN[levelInfo().act]+legacy("legacy.615")+imageURL('boss'+e.boss)+'" style="height:140px"></div><h2>'+L(levelInfo().guardian)+legacy("legacy.616")+MATERIALS[levelInfo().act]+legacy("legacy.617")+button(legacy("legacy.18"),'resume','primary back'),'boss');};

/* CAMPAIGN AND TOWN UI */
wallet=function(){return '<div class="v6-wallet"><span>HELLBOUND SURVIVORS · v7.0</span><span>◆ '+save.gold+' · ✧ '+save.soulstones+' · ◇ '+save.shards+'</span></div>';};
menu=function(){state='MENU';sandboxMode=false;sandboxBoss=false;Input.reset();const count=save.campaign.cleared.filter(Boolean).length,cp=save.campaign.checkpoint;
 showUI(wallet()+legacy("legacy.618")+L(HEROES[selectedHero].name)+' · '+count+legacy("legacy.619")+save.unlockedHeroes.length+'/6</div><img alt="" src="'+imageURL('hero'+selectedHero)+legacy("legacy.620")+button(legacy("legacy.621"),'campaign','primary')+button(legacy("legacy.622"),'gear')+button(legacy("legacy.623"),'talents')+button(legacy("legacy.624"),'crypt')+button(legacy("legacy.486"),'heroes')+button(legacy("legacy.487"),'settings')+'</div>'+(cp?button(legacy("legacy.625")+(cp.stage+1)+'/48','checkpoint','primary back'):'')+button(legacy("legacy.626"),'test','back')+legacy("legacy.627"),'town');
};
heroScreen=function(){state='HERO_SELECT';const h=HEROES[selectedHero],p=CLASS_PROFILES[selectedHero],open=save.unlockedHeroes.includes(selectedHero);
 showUI(wallet()+legacy("legacy.628")+(selectedHero+1)+' / 6</div><div class="hero-view"><img alt="'+L(h.name)+'" src="'+imageURL('hero'+selectedHero)+'"></div><div class="row">'+button('‹','heroPrev')+'<h2>'+L(h.name)+'</h2>'+button('›','heroNext')+'</div><div class="v7-stats"><span>♥ '+p.hp+legacy("legacy.629")+p.mana+legacy("legacy.630")+p.armor+legacy("legacy.631")+p.speed+legacy("legacy.632")+Math.round(p.might*100)+legacy("legacy.633")+Math.round(p.crit*100)+legacy("legacy.634")+L(MOVEMENT[selectedHero].name)+'</b> · '+MOVEMENT[selectedHero].cd+legacy("legacy.635")+MOVE_DESC[selectedHero]+'</div><div class="skill-list">'+LOADOUTS[selectedHero].map(id=>{const s=SKILLS[id];return '<div><img alt="" src="'+imageURL('w'+s.icon)+'"><span><b>'+L(s.name)+'</b><p>'+L(s.desc)+'</p></span><em>'+s.cost+legacy("legacy.636")+s.cd+legacy("legacy.637");}).join('')+legacy("legacy.638")+RELIC_NAMES[selectedHero]+'</b><br>'+RELIC_DESC[selectedHero]+legacy("legacy.639")+(open?button(legacy("legacy.640"),'stage','primary back'):legacy("legacy.641")+L(h.hint)+'</p>')+backButton(),'hero');
};
stageScreen=function(){state='STAGE_SELECT';const act=clamp(campaignAct,0,3),sel=levelInfo(selectedStage);
 showUI(wallet()+legacy("legacy.642")+save.campaign.cleared.filter(Boolean).length+'/48</div><div class="act-tabs">'+ACTS.map((a,i)=>'<button data-action="chapter-'+i+'" class="'+(act===i?'active':'')+'">'+ROMAN[i]+'<small>'+save.campaign.cleared.slice(i*12,i*12+12).filter(Boolean).length+'/12</small></button>').join('')+'</div><h2>'+ROMAN[act]+' · '+L(ACTS[act].name)+'</h2><div class="v6-grid">'+LEVELS.slice(act*4,act*4+4).map(z=>{const zone=z.id;return legacy("legacy.643")+(zone%4+1)+'</span><h3>'+L(z.name)+'</h3><div class="v7-levels">'+[0,1,2].map(t=>{const id=zone*3+t,open=unlockedLevel(id),stars=save.stars[id];return button((stars?'★'.repeat(stars):open?'○':'🔒')+legacy("legacy.644")+(t+1),'level-'+id,selectedStage===id?'primary':'',!open);}).join('')+'</div><small>'+MATERIALS[act]+legacy("legacy.645")+SETS[act].name+'</small></div>';}).join('')+'</div><div class="v6-notice"><b>'+ROMAN[sel.act]+'-'+(sel.sub+1)+'-'+(sel.trial+1)+' · '+L(sel.name)+legacy("legacy.646")+L(sel.guardian)+' · '+fmt(sel.duration)+legacy("legacy.647")+(save.tiers[selectedStage]+1)+'/4 · '+L(HEROES[selectedHero].name)+'</div><div class="v6-actions">'+button(legacy("legacy.648"),'tierdown-'+selectedStage,'',save.tiers[selectedStage]===0)+button(legacy("legacy.649"),'tierup-'+selectedStage,'',save.tiers[selectedStage]>=3||save.stars[selectedStage]<save.tiers[selectedStage]+1)+legacy("legacy.650")+button(legacy("legacy.651"),'enter','primary',!unlockedLevel(selectedStage)||!save.unlockedHeroes.includes(selectedHero))+button(legacy("legacy.3"),'heroes')+button(legacy("legacy.507"),'menu')+'</div>','campaign');
};
function setsDescription(){return SETS.map((s,i)=>'<span style="color:'+s.color+'">'+s.name+legacy("legacy.652")+[legacy("legacy.653"),legacy("legacy.654"),legacy("legacy.655"),legacy("legacy.656")][i]+legacy("legacy.657")+[legacy("legacy.169"),legacy("legacy.658"),legacy("legacy.659"),legacy("legacy.660")][i]+'.').join('<br>');}
gearScreen=function(){state='GEAR';const bonuses=gearBonuses();showUI(wallet()+legacy("legacy.661")+button(legacy("legacy.662"),'shop')+button(legacy("legacy.663"),'recipes')+button(legacy("legacy.512"),'menu')+'</div><div class="v7-stats">'+Object.keys(SLOT_RULES).map(slot=>{const it=save.gear.find(x=>x.id===save.worn[slot]&&x.slot===slot);return '<span>'+GEAR_SLOT[slot]+': <b>'+(it?htmlEscape(it.name):legacy("legacy.664"))+'</b></span>';}).join('')+'</div><p class="v6-notice">'+setsDescription()+('</p><p class="small">'+t('forge.rules')+' ')+bonuses.sets.map((n,a)=>SETS[a].name+' '+n+'/3').join(' · ')+'</p><div class="v6-grid">'+save.gear.map(it=>{const worn=save.worn[it.slot]===it.id,cost=forgeCost(it),sh=Forge.price(it).dust;return '<div class="v6-card '+(worn?'selected':'')+'" style="border-top:2px solid '+RARITY_COLORS[it.rarity]+'"><span class="v6-tag">'+RARITY_NAMES[it.rarity]+' · '+GEAR_SLOT[it.slot]+' · +'+it.rank+'</span><h3>'+htmlEscape(it.name)+'</h3><p>'+gearLine(it)+'</p>'+(it.set!==null&&it.set!==undefined?'<small style="color:'+SETS[it.set].color+legacy("legacy.666")+SETS[it.set].name+'</small>':'')+button(worn?legacy("legacy.515"):legacy("legacy.516"),'wear-'+it.id,'',worn)+(worn?button(legacy("legacy.667"),'unwear-'+it.slot):'')+button(it.rank>=10?legacy("legacy.668"):legacy("legacy.518")+cost+' ◆ + '+sh+' ◇','temper-'+it.id,'',it.rank>=10||save.gold<cost||save.shards<sh)+button(it.cost?legacy("legacy.519")+Math.floor(it.cost*.2)+' ◆ + '+(1+it.rarity)+' ◇':legacy("legacy.669"),'sell-'+it.id,'',worn||!it.cost)+'</div>';}).join('')+'</div><p class="v6-footer">'+save.gear.length+legacy("legacy.670"),'gear');};
function recipeScreen(){state='GEAR';showUI(wallet()+legacy("legacy.671")+MATERIALS.map((m,a)=>'<span>'+m+': <b>'+save.materials[a]+'</b></span>').join('')+'</div><div class="v6-grid">'+RECIPES.map(r=>{const known=save.recipes.includes(r.id),cost=125+r.set*50,mat=3+r.set;return '<div class="v6-card '+(known?'':'locked')+'"><span class="v6-tag">'+ROMAN[r.set]+legacy("legacy.672")+(known?legacy("legacy.673"):legacy("legacy.674"))+'</span><h3>'+r.name+'</h3><p>'+gearLine({slot:r.slot,power:Math.min(SLOT_RULES[r.slot].cap,SLOT_RULES[r.slot].base+SLOT_RULES[r.slot].step*(4+r.set)),rank:0})+'</p><small>'+mat+' × '+MATERIALS[r.set]+'</small>'+button(legacy("legacy.675")+cost+' ◆','craft-'+r.id,'',!known||save.gold<cost||save.materials[r.set]<mat||save.gear.length>=80)+'</div>';}).join('')+'</div><p class="small">'+setsDescription()+'</p>'+backButton('gear'),'recipes');}
const talentScreenV6=talentScreen;
talentScreen=function(){const previous=screenName==='talents'?ui.querySelector('.panel'):null;withScrollPreserved(previous,()=>{talentScreenV6();const rank=save.relicRanks[selectedHero],c=relicCost();const panel=ui.querySelector('.panel');panel.innerHTML+=legacy("legacy.676")+rank+'/5</span><h3>'+RELIC_NAMES[selectedHero]+'</h3><p>'+RELIC_DESC[selectedHero]+legacy("legacy.677")+(rank<5?c.material+' × '+MATERIALS[c.act]+legacy("legacy.678")+save.materials[c.act]:legacy("legacy.679"))+'</small>'+button(rank>=5?legacy("legacy.668"):(rank?legacy("legacy.36"):legacy("legacy.680"))+' · '+c.gold+' ◆','relic-up','primary',rank>=5||save.gold<c.gold||save.materials[c.act]<c.material||!save.unlockedHeroes.includes(selectedHero))+'</div>';I18n.localizePanel(panel);if(!previous)restoreScroll(panel,scrollMemory.talents);return panel;});};
showResult=function(){const r=run,n=levelInfo();showUI(wallet()+'<div class="eyebrow">'+(r.sandbox?legacy("legacy.681"):legacy("legacy.682")+(r.stage+1)+'/48 · '+ROMAN[n.act]+legacy("legacy.683"))+'</div><h2>'+(r.victory?(r.stage===47?legacy("legacy.684"):n.trial===2?legacy("legacy.685"):legacy("legacy.686")):legacy("legacy.545"))+'</h2><p class="subtitle">'+L(n.name)+'</p><div class="stat-grid"><div><b>'+fmt(r.time)+legacy("legacy.537")+r.kills+legacy("legacy.538")+r.awardedGold+legacy("legacy.539")+r.awardedSoul+legacy("legacy.687")+(r.sandbox?legacy("legacy.688"):r.victory?legacy("legacy.689")+r.savedLoot+legacy("legacy.690")+r.overflow+'<br>'+r.materials[n.act]+' × '+MATERIALS[n.act]+(r.recipe?legacy("legacy.691")+RECIPES.find(x=>x.id===r.recipe).name:legacy("legacy.692")):legacy("legacy.693"))+'</p>'+(r.fresh?legacy("legacy.694"):'')+'<div class="v6-actions">'+(r.victory&&r.stage<47&&!r.sandbox?button(legacy("legacy.695"),'nextLevel','primary'):button(legacy("legacy.551"),'retryLevel','primary'))+button(legacy("legacy.552"),'gear')+button(legacy("legacy.512"),'menu')+'</div>','result');};
testScreen=function(){state='TEST';sandboxMode=false;sandboxBoss=false;const act=clamp(campaignAct,0,3);showUI(wallet()+legacy("legacy.696")+HEROES.map((h,i)=>button(L(h.name),'testhero-'+i,selectedHero===i?'primary':'')).join('')+'</div><div class="act-tabs">'+ACTS.map((a,i)=>button(ROMAN[i]+legacy("legacy.594"),'testact-'+i,act===i?'primary':'')).join('')+'</div><div class="v6-grid">'+NODES.slice(act*12,act*12+12).map(n=>'<div class="v6-card"><span class="v6-tag">'+ROMAN[act]+'-'+(n.sub+1)+'-'+(n.trial+1)+'</span><h3>'+L(n.name)+'</h3><p>'+fmt(n.duration)+' · '+L(n.guardian)+'</p>'+button(legacy("legacy.697"),'testzone-'+n.id)+button(legacy("legacy.555"),'testboss-'+n.id)+'</div>').join('')+'</div>'+backButton(),'test');};
const actionV6=uiAction;
uiAction=function(action){Sound.unlock();
 if(action==='campaign'||action==='stage'){sandboxMode=false;sandboxBoss=false;campaignAct=levelInfo(selectedStage).act;stageScreen();return;}
 if(action==='newJourney'){sandboxMode=false;selectedStage=save.unlockedStages.find(i=>!save.campaign.cleared[i])??0;campaignAct=levelInfo(selectedStage).act;heroScreen();return;}
 if(action.startsWith('chapter-')){const a=Number(action.slice(8));if(!Number.isInteger(a)||a<0||a>3)return;campaignAct=a;const first=a*12;selectedStage=NODES.slice(first,first+12).find(n=>unlockedLevel(n.id)&&!save.campaign.cleared[n.id])?.id??first;stageScreen();return;}
 if(action.startsWith('level-')){const id=Number(action.slice(6));if(unlockedLevel(id)){selectedStage=id;campaignAct=levelInfo(id).act;stageScreen();}return;}
 if(action.startsWith('tierup-')||action.startsWith('tierdown-')){const id=Number(action.split('-')[1]);if(!unlockedLevel(id))return;const down=action.startsWith('tierdown');if(down)save.tiers[id]=Math.max(0,save.tiers[id]-1);else if(save.tiers[id]<3&&save.stars[id]>=save.tiers[id]+1)save.tiers[id]++;persist();stageScreen();return;}
 if(action.startsWith('testzone-')||action.startsWith('testboss-')){const id=Number(action.split('-')[1]);if(!Number.isInteger(id)||id<0||id>=48)return;sandboxMode=true;sandboxBoss=action.startsWith('testboss-');selectedStage=id;unlockDevice();startRun();return;}
 if(action.startsWith('testhero-')){const id=Number(action.slice(9));if(Number.isInteger(id)&&id>=0&&id<6){selectedHero=id;testScreen();}return;}
 if(action.startsWith('testact-')){const id=Number(action.slice(8));if(Number.isInteger(id)&&id>=0&&id<4){campaignAct=id;testScreen();}return;}
 if(action==='enter'||action==='start'){sandboxMode=false;sandboxBoss=false;unlockDevice();const cp=save.campaign.checkpoint;startRun(cp?.stage===selectedStage&&cp.hero===selectedHero?cp:null);return;}
 if(action==='checkpoint'||action==='nextLevel'){const cp=save.campaign.checkpoint;if(!cp)return;sandboxMode=false;sandboxBoss=false;selectedStage=cp.stage;selectedHero=cp.hero;unlockDevice();startRun(cp);return;}
 if(action==='retryLevel'){const test=run?.sandbox;sandboxMode=!!test;sandboxBoss=false;startRun();return;}
 if(action==='recipes'){recipeScreen();return;}
 if(action.startsWith('craft-')){craftRecipe(action.slice(6));recipeScreen();return;}
 if(action==='relic-up'){buyRelic();talentScreen();return;}
 if(action.startsWith('unwear-')){const slot=action.slice(7);if(SLOT_RULES[slot]){save.worn[slot]=null;persist();gearScreen();}return;}
 actionV6(action);
};
const bootV6=boot;boot=function(){bootV6();document.title='Hellbound Survivors · Four Acts · v7.0';};
