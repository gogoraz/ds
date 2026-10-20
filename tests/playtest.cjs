'use strict';
// Heuristic player, real combat and terrain, no rendering. Not a human win-rate estimate.
const {boot}=require('./act1-v6.cjs');
const results=[];const campaign=boot();
for(let zone=0;zone<4;zone++){
 const{g}=campaign;for(let i=0;i<zone;i++)g.save.campaign.cleared[i]=true;g.stage=zone;const cp=g.save.campaign.checkpoint;g.startRun(cp?.stage===zone?cp:null);let frames=0;
 while(!g.run.ended&&g.run.time<g.LEVELS[zone].duration+100&&frames++<15000){
  if(g.state==='BOSS_INTRO'||g.state==='PAUSE')g.resumeRun();
  if(g.state==='CHEST'){g.uiAction('closeChest');continue;}
  if(g.state==='LEVELUP'){let pick=0,score=-999;g.choices.forEach((o,i)=>{let s=0;if(o.type==='w'){const own=g.run.weapons.find(w=>w.id===o.id);s=own?9-own.level:15;if([1,2,4,6,8,10].includes(o.id))s+=4;}else if(o.type==='p'){s=[0,4,6,7,8,10].includes(o.id)?12:4;if(g.run.player.hp<g.run.player.maxHp*.5&&o.id===8)s=25;}if(s>score){score=s;pick=i;}});g.chooseUpgrade(pick);continue;}
  const r=g.run,p=r.player;let target=null,d=Infinity;
  for(let i=0;i<g.enemies.count;i++){const e=g.enemies.items[i],dd=Math.hypot(e.x-p.x,e.y-p.y);if(e.hp>0&&dd<d){target=e;d=dd;}}
  let tx=p.x+Math.cos(r.time*.25)*180,ty=p.y+Math.sin(r.time*.25)*180;
  if(target){if(d>90){tx=target.x;ty=target.y;}else{tx=p.x+(p.x-target.x)*2-(p.y-target.y);ty=p.y+(p.y-target.y)*2+(p.x-target.x);}}
  let orb=null,od=130;for(let i=0;i<g.drops.count;i++){const o=g.drops.items[i],dd=Math.hypot(o.x-p.x,o.y-p.y);if(o.type==='xp'&&dd<od){orb=o;od=dd;}}if(orb&&d>55){tx=orb.x;ty=orb.y;}
  for(let i=0;i<g.effects.count;i++){const e=g.effects.items[i];if(e.kind==='hostileWarn'&&Math.hypot(e.x-p.x,e.y-p.y)<e.r+25){tx=p.x+(p.x-e.x||1)*6;ty=p.y+(p.y-e.y||1)*6;}}
  const steer=g.Terrain.steer({x:p.x,y:p.y,r:14},tx,ty),len=Math.hypot(steer.x,steer.y)||1;g.Input.x=steer.x/len;g.Input.y=steer.y/len;
  if(target&&d<180)g.activeSkill(0);if(target&&d<150)g.activeSkill(1);if(p.hp<p.maxHp*.7)g.activeSkill(2);
  g.frameStep();g.updateRun(1/30);
 }
 results.push({zone:zone+1,won:!!g.run.victory,ended:g.run.ended,seconds:+g.run.time.toFixed(1),kills:g.run.kills,level:g.run.level,hp:+g.run.player.hp.toFixed(1),gold:g.run.awardedGold??g.earnedGold(g.run),weapons:g.run.weapons.map(w=>[w.id,w.level,w.evolved])});
 console.log('PLAYTEST '+JSON.stringify(results[results.length-1]));if(g.run.victory){g.buyItem('steel');g.buyItem('coat');if(g.save.gold>=40)g.uiAction('buy_health');}
}
require('node:fs').writeFileSync('docs/playtest-results.json',JSON.stringify({scenario:'Heuristic player, sequential carry build, purchases after victories, actual terrain, 30 Hz simulation. Not human win rates or device FPS.',results},null,2)+'\n');
