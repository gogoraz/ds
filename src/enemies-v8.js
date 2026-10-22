/* Two exclusive species per zone, sharing the established animated sprite atlas. */
const NEW_ENEMIES=[
 [0,'swarm',1],[0,'charger',0],[1,'summoner',3],[1,'aura',7],[2,'shielded',3],[2,'healer',6],[3,'spitter',4],[3,'burrower',13],
 [4,'burrower',8],[4,'spitter',4],[5,'shielded',3],[5,'teleporter',6],[6,'spitter',8],[6,'splitter',8],[7,'teleporter',7],[7,'reflect',10],
 [8,'swarm',1],[8,'spitter',6],[9,'leech',8],[9,'charger',5],[10,'charger',9],[10,'exploder',11],[11,'healer',6],[11,'exploder',2],
 [12,'charger',5],[12,'bomber',9],[13,'burrower',8],[13,'teleporter',7],[14,'shielded',10],[14,'summoner',6],[15,'aura',10],[15,'splitter',9]
].map(([zone,archetype,base],i)=>({id:14+i,zone,archetype,base,name:'enemy.'+(14+i)}));
const Species={
 initialize(e,definition=null){e.species=definition?.id??e.id;e.archetype=definition?.archetype||null;e.abilityTimer=2.5;e.burrowTime=0;e.splitChild=false;e.exploded=false;e.webUntil=0;e.zoneModifier=e.elite?['cursed','sandshield','poisonhalo','firehalo'][run.act]:null;if(e.zoneModifier==='sandshield')e.resist=Math.min(.8,e.resist+.15);if(definition){e.behavior='walker';e.name=[t(definition.name),legacy(definition.name)];e.variant=definition.id;e.maxHp*=.85;e.hp=e.maxHp;if(e.archetype==='swarm'){e.r*=.7;e.speed*=1.4;e.xp=Math.max(1,Math.floor(e.xp*.6));}if(definition.id===31)e.speed=0;if(e.archetype==='spitter')e.behavior='archer';if(e.archetype==='summoner')e.behavior='summon';if(e.archetype==='teleporter')e.behavior='teleport';}
 if(Stats.enabled()){save.bestiary.seen[String(e.species)]=1;Stats.unique('bestiarySeen',e.species);}return e;},
 spawn(id,elite=false,x=null,y=null){const d=NEW_ENEMIES.find(x=>x.id===id);if(!d||d.zone!==run.zone)return null;const e=spawnBeforeSpecies(d.base,elite,x,y);return e?this.initialize(e,d):null;},
 update(dt){const p=run.player;for(let i=0;i<enemies.count;i++){const e=enemies.items[i];if(e.hp<=0)continue;e.abilityTimer-=dt;e.burrowTime=Math.max(0,e.burrowTime-dt);const distance=Math.hypot(p.x-e.x,p.y-e.y);
 if(e.archetype==='leech'&&distance<95)p.mana=Math.max(0,p.mana-8*dt);
 if(e.archetype==='aura'&&distance<160){if(e.species===44)run.healingBlockedUntil=run.time+.2;else p.slow=.25;}
 if(e.webUntil>run.time&&Math.hypot(p.x-e.webX,p.y-e.webY)<80)p.slow=.25;
 if(e.archetype==='exploder'&&distance<70&&e.hp/e.maxHp<.4){e.exploded=true;effect('hostileWarn',e.x,e.y,85,PAL.POISON_GREEN,.9,e.damage*1.8,1);e.hp=0;}
 if(e.abilityTimer>0)continue;e.abilityTimer=4;
 if(e.archetype==='charger'){if(e.species===34){const wall=Terrain.trace(e.x,e.y,p.x,p.y,e.r);if(wall?.prop){world.broken.add(wall.prop.key);wall.prop.type='bones';Terrain.rebuild();}}effect('hostileWarn',p.x,p.y,35,'#d4a579',.7,e.damage*.6,0);const point=Terrain.endpoint(e.x,e.y,p.x,p.y,e.r);e.vx=(point.x-e.x)/.4;e.vy=(point.y-e.y)/.4;e.charging=.4;}
 if(e.archetype==='burrower'){e.burrowTime=.7;effect('ring',e.x,e.y,45,'#bba373',.7);const a=rand(0,TAU);Terrain.move(e,p.x+Math.cos(a)*90,p.y+Math.sin(a)*90,e.r,false);if(e.species===21){e.webX=e.x;e.webY=e.y;e.webUntil=run.time+5;effect('ring',e.x,e.y,80,'#c0bdad',5);}}
 if(e.archetype==='healer'){let count=0;for(let j=0;j<enemies.count&&count<5;j++){const other=enemies.items[j];if(other.hp>0&&Math.hypot(other.x-e.x,other.y-e.y)<170){other.hp=Math.min(other.maxHp,other.hp+other.maxHp*.1);count++;}}effect('warcry',e.x,e.y,170,'#92ba8d',.6);}
 if(e.archetype==='bomber')for(let j=0;j<3;j++)effect('hostileWarn',p.x+rand(-80,80),p.y+rand(-80,80),45,PAL.HELL_ORANGE,1+j*.2,e.damage,1);
 if(e.species===42)effect('hostileWarn',p.x,p.y,70,'#d1b284',1.1,e.damage*1.3,0);
 if(e.species===41)effect('hostileZone',e.x,e.y,32,PAL.HELL_ORANGE,3,e.damage*.4);
 if(e.species===43){const turret=spawnEnemy(4,false,e.x+rand(-50,50),e.y+rand(-50,50));if(turret)turret.speed=0;}
 if(e.zoneModifier==='poisonhalo'||e.zoneModifier==='firehalo')effect('hostileWarn',e.x,e.y,80,e.zoneModifier==='poisonhalo'?PAL.POISON_GREEN:PAL.HELL_ORANGE,1,e.damage*.45,1);
 }},
 screen(){state='BESTIARY';showUI(wallet()+'<h2>'+t('bestiary.title')+'</h2><p>'+t('bestiary.rules')+'</p><div class="v6-grid">'+Array.from({length:46},(_,id)=>{const d=NEW_ENEMIES.find(x=>x.id===id),seen=save.bestiary.seen[id],name=d?t(d.name):L(ENEMIES[id].name||['Creature '+(id+1),'Creature '+(id+1)]);return '<div class="v6-card"><h3>'+(seen?name:'???')+'</h3><p>'+(seen?(d?L(LEVELS[d.zone].name)+' · '+t('behavior.'+d.archetype):t('bestiary.original')):t('bestiary.unknown'))+'</p><p>'+t('bestiary.kills',{count:save.bestiary.kills[id]||0})+'</p></div>';}).join('')+'</div>'+backButton(),'bestiary');}
};
const spawnBeforeSpecies=spawnEnemy;spawnEnemy=function(...args){const e=spawnBeforeSpecies(...args);return e?Species.initialize(e):e;};
const enemiesBeforeSpecies=updateEnemies;updateEnemies=function(dt){Species.update(dt);enemiesBeforeSpecies(dt);};
const hitBeforeSpecies=hit;hit=function(e,damage,...args){if(e?.burrowTime>0)return;if(e?.archetype==='shielded'&&args[3]!==null){const ox=args[3]??run.player.x,oy=args[4]??run.player.y,front=Math.cos(Math.atan2(oy-e.y,ox-e.x)-(e.drawAngle||0));if(front>.2)damage*=.25;}
 if(e?.archetype==='reflect'&&args[2]>=0&&args[2]!==0&&args[2]!==8&&e.abilityTimer>3.3){effect('ring',e.x,e.y,30,'#a6d6f0',.3);enemyShot(e.x,e.y,Math.atan2(run.player.y-e.y,run.player.x-e.x),180,Math.min(12,damage*.12),'#a6d6f0');return;}hitBeforeSpecies(e,damage,...args);};
const deathBeforeSpecies=enemyDeath;enemyDeath=function(e){if(e.archetype==='exploder'&&!e.exploded)effect('hostileWarn',e.x,e.y,85,PAL.POISON_GREEN,.9,e.damage*1.8,1);if(e.archetype==='splitter'&&!e.splitChild)for(let j=0;j<2;j++){const child=Species.spawn(e.species,false,e.x+rand(-25,25),e.y+rand(-25,25));if(child){child.splitChild=true;child.archetype='swarm';child.hp=child.maxHp*=.3;child.r*=.7;child.speed*=1.3;}}
 if(e.zoneModifier==='cursed'){const child=spawnEnemy(3,false,e.x+35,e.y);if(child)child.maxHp=child.hp=Math.max(1,child.hp*.4);}deathBeforeSpecies(e);};
const wavesBeforeSpecies=waveDirector;waveDirector=function(dt){wavesBeforeSpecies(dt);if(run?.mode==='rift'&&!run.ended&&!run.guardianSpawned){const profile=ZONE_HAZARDS[run.zone],mark=Math.floor(run.time/profile.period);if(mark>(run.zoneHazardMark||0)){run.zoneHazardMark=mark;emitZoneHazard(profile);}}if(!run||run.ended||run.guardianSpawned||run.mode==='bonus'&&run.bonus.type==='bossrush')return;run.speciesTimer=(run.speciesTimer??2)-dt;if(run.speciesTimer<=0){run.speciesTimer=12;run.speciesCycle=(run.speciesCycle||0)+1;Species.spawn(14+run.zone*2+run.speciesCycle%2);}};
const healBeforeAura=heal;heal=function(value){if(run?.healingBlockedUntil>run.time)return;healBeforeAura(value);};
const effectsBeforeDodge=updateEffects;updateEffects=function(dt){const p=run.player,expired=[];for(let i=0;i<effects.count;i++){const e=effects.items[i];if(e.kind!=='hostileWarn')continue;if(Math.hypot(p.x-e.x,p.y-e.y)<e.r+14)e.wasThreatened=true;if(e.life<=dt&&e.wasThreatened&&Math.hypot(p.x-e.x,p.y-e.y)>e.r+14)expired.push(e);}effectsBeforeDodge(dt);for(const e of expired){Stats.add('dodgedWarnings');if(e.meteorWarning)Stats.add('dodgedMeteors');}};
const effectBeforeDodge=effect;effect=function(...args){const e=effectBeforeDodge(...args);if(e){e.wasThreatened=false;e.meteorWarning=args[0]==='hostileWarn'&&run?.bosses>0;}return e;};
const actorBeforeSpecies=drawActor;drawActor=function(id,x,y,size=70,flip=1,bob=0,flash=0,alpha=1,entity=null){actorBeforeSpecies(id,x,y,size,flip,bob,flash,entity?.burrowTime>0?alpha*.25:alpha,entity);if(entity?.archetype){const color=['#d9b88b','#e0c47e','#94b399','#d18a70'][Math.floor((entity.species-14)/8)];ctx.strokeStyle=color;ctx.lineWidth=1.5;ctx.beginPath();ctx.ellipse(screenX(x),screenY(y)+2,size*.28,7,0,0,TAU);ctx.stroke();}};
const actionBeforeBestiary=uiAction;uiAction=function(action){if(action==='bestiary'){Species.screen();return;}actionBeforeBestiary(action);};
const shotBeforePoison=enemyShot;enemyShot=function(x,y,...args){const shot=shotBeforePoison(x,y,...args);if(shot){shot.v8Poison=false;for(let i=0;i<enemies.count;i++){const e=enemies.items[i];if([23,26].includes(e.species)&&Math.hypot(e.x-x,e.y-y)<2){shot.v8Poison=true;break;}}}return shot;};
const shotsBeforePoison=updateShots;updateShots=function(dt){if(run){const p=run.player;for(let i=0;i<shots.count;i++){const s=shots.items[i];if(s.v8Poison&&s.hostile&&p.invuln<=0&&Math.hypot(s.x+s.vx*dt-p.x,s.y+s.vy*dt-p.y)<s.r+18)run.poisonUntil=run.time+4;}if(run.poisonUntil>run.time&&run.time>=(run.poisonTick||0)){run.poisonTick=run.time+1;hurt(2+run.act);}}shotsBeforePoison(dt);};
const ZONE_HAZARDS=[
 ['spikes',45,30,'#b8a18b',12,0],['graveburst',58,31,'#a7b29a',12,0],['stonefall',52,29,'#c8c0b0',13,0],['bonefield',55,28,'#c4bba3',13,0],
 ['quicksand',65,29,'#d9bd73',10,2],['collapse',70,32,'#d8b16b',14,0],['poison',75,28,'#8fbc70',12,0],['astral',55,27,'#9ccbdd',14,0],
 ['thorns',70,30,'#95ba86',14,0],['swampgas',80,29,'#9ea55e',13,0],['roots',75,28,'#a6a673',14,2],['bloodpool',70,27,'#d18a80',15,0],
 ['ashfall',60,30,'#d9a180',16,0],['lava',80,28,'#e88c56',17,0],['hammer',70,27,'#deb274',18,0],['void',90,26,'#c495d9',18,0]
].map(([id,radius,period,color,damage,slow])=>({id,radius,period,color,damage,slow}));
function emitZoneHazard(profile){const p=run.player,e=effect('hostileWarn',p.x+rand(-35,35),p.y+rand(-35,35),profile.radius,profile.color,1.6,profile.damage+run.trial,['poison','swampgas','bloodpool','lava'].includes(profile.id)?1:0);if(e)e.v8Slow=profile.slow;}
const effectsBeforeHazardSlow=updateEffects;updateEffects=function(dt){for(let i=0;i<effects.count;i++){const f=effects.items[i];if(f.kind==='hostileWarn'&&f.v8Slow&&f.life<=dt&&Math.hypot(run.player.x-f.x,run.player.y-f.y)<f.r+14)run.player.slow=Math.max(run.player.slow||0,f.v8Slow);}effectsBeforeHazardSlow(dt);};
const effectBeforeHazardSlow=effect;effect=function(...args){const e=effectBeforeHazardSlow(...args);if(e)e.v8Slow=0;return e;};
