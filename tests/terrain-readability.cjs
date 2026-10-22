'use strict';
const assert=require('node:assert/strict'),vm=require('node:vm'),{boot}=require('./harness-v7.cjs');
const {g,sandbox}=boot(),view=vm.runInContext('({TERRAIN_READABILITY,visibleFootprint,PROP_FOOTPRINTS,world})',sandbox);
g.sandbox=true;
for(let zone=0;zone<16;zone++){
 g.stage=zone*3;g.startRun();assert.equal(g.props.count,49,'one stable scenery slot per chunk');
 assert.equal(g.Terrain.free(g.run.player.x,g.run.player.y,14),true,'safe initial spawn');
 assert.equal(g.Terrain.trace(-640,0,640,0,46),null,'horizontal route fits the largest normal boss');
 assert.equal(g.Terrain.trace(0,-640,0,640,46),null,'vertical route fits the largest normal boss');
 for(let i=0;i<g.props.count;i++){
  const p=g.props.items[i],parts=view.visibleFootprint(p);
  for(const [x,y]of parts)assert.equal(g.Terrain.free(p.x+x,p.y+y),false,'every marked footprint is actually solid');
 }
 const positions=()=>new Map(g.props.items.slice(0,g.props.count).map(p=>[p.key,[p.x,p.y,p.type].join(',')]));
 const before=positions();g.run.player.x=270;view.world.stream();const after=positions();
 for(const [key,value]of before)if(after.has(key))assert.equal(after.get(key),value,'shared chunk does not move');
}
g.stage=0;g.startRun();g.props.clear();
const arch=g.props.get();Object.assign(arch,{type:'arch',x:0,y:0,hp:1e9,key:'arch-test'});g.Terrain.rebuild();
assert.equal(view.visibleFootprint(arch),view.PROP_FOOTPRINTS.arch,'visual and collision shapes share one source');
assert.equal(g.Terrain.trace(0,-120,0,100,14),null,'the visible opening under an arch is passable');
assert.ok(g.Terrain.trace(-33,-120,-33,100,14),'the left pillar blocks movement');
assert.ok(g.Terrain.trace(33,-120,33,100,14),'the right pillar blocks movement');
const moving={x:-120,y:-27};g.Terrain.move(moving,100,-27,14);assert.ok(moving.x<-33,'movement stops at the visible pillar');
g.props.clear();const bones=g.props.get();Object.assign(bones,{type:'bones',x:0,y:0,hp:1e9,key:'bones-test'});g.Terrain.rebuild();
assert.equal(view.visibleFootprint(bones).length,0);assert.equal(g.Terrain.trace(-100,0,100,0,14),null,'flat bone litter is walkable');
g.props.clear();const urn=g.props.get();Object.assign(urn,{type:'urn',x:0,y:0,hp:18,key:'urn-test'});g.Terrain.rebuild();
assert.ok(g.Terrain.trace(-100,0,100,0,14),'a standing urn blocks movement');view.world.damageProp(urn,100);
assert.equal(g.Terrain.trace(-100,0,100,0,14),null,'destroyed urn releases its marked footprint');
assert.ok(g.drops.count>0,'urn loot still works');
console.log('PASS 16 zones: connected wide routes, safe spawns, stable streaming, shared footprint geometry, passable arches, solid pillars and breakable urns');
