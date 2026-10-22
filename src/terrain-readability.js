/* Walkable ground is a flat material. Raised scenery alone owns collisions.
 * Shared footprint geometry drives contact edges and the physics renderer.
 */
const TERRAIN_READABILITY={
 version:'walkable-ground-v10',
 floorAtlas:'./assets/reference/walkable-floors-v10.webp',
 zoneProps:[
  ['deadTree','grave2','urn','bones','arch'],['grave2','ruinwall','urn','deadTree','well'],
  ['arch','statue','ruinwall','brazier','urn'],['ruinwall','bones','urn','brazier','arch'],
  ['palm','obelisk','urn','bones','well'],['statue','ruinwall','obelisk','urn','brazier'],
  ['obelisk','ruinwall','urn','bones','brazier'],['obelisk','statue','brazier','urn','arch'],
  ['root','deadTree','urn','bones','well'],['root','temple','urn','bones','well'],
  ['temple','statue','ruinwall','root','urn'],['statue','temple','brazier','urn','bones'],
  ['hellspike','bones','urn','brazier','ruinwall'],['hellspike','brazier','bones','urn','well'],
  ['brazier','hellspike','statue','urn','ruinwall'],['hellspike','arch','brazier','statue','urn']
 ]
};
RASTER_DATA.terrain=TERRAIN_READABILITY.floorAtlas;
const WALKABLE_FLOOR_PATTERNS=new WeakMap();

rebuildRasterTextures=function(){
 const image=RASTER.images.terrain;if(!image)return;
 const sw=image.width/2,sh=image.height/2,materials=[];
 for(let act=0;act<4;act++)materials.push(referenceFloorTile(image,(act%2)*sw,Math.floor(act/2)*sh,sw,sh));
 for(let zone=0;zone<16;zone++){
  const act=Math.floor(zone/4),sub=zone%4,tile=surface(256,256),c=tile.getContext('2d');
  c.drawImage(materials[act],0,0);
  const indoors=act===0&&sub>=2||act===1&&sub>0||act===2&&sub>=2||act===3&&sub>=2;
  if(indoors){c.globalAlpha=.38;c.drawImage(texturedFloor(zone,0),0,0);c.globalAlpha=1;}
  // Each variant retains exactly the same borders: no false tile-edge barriers.
  worldFloors[zone]=[tile,tile,tile];
 }
 rebuildRasterPreviews();
};

// One opaque repeating fill avoids fractional-pixel cracks between individual
// drawImage tiles on a scaled phone canvas. Patterns are cached by source tile.
drawFloor=function(){
 const id=run?levelInfo().zoneId:0,tile=worldFloors[id][0];
 let pattern=WALKABLE_FLOOR_PATTERNS.get(tile);
 if(!pattern){pattern=ctx.createPattern(tile,'repeat');if(!pattern)return;WALKABLE_FLOOR_PATTERNS.set(tile,pattern);}
 const ox=(run?run.cam.x:0)-CONFIG.W/2,oy=(run?run.cam.y:clock*3)-CONFIG.H*.48;
 ctx.save();ctx.translate(-ox,-oy);ctx.fillStyle=pattern;ctx.fillRect(ox-2,oy-2,CONFIG.W+4,CONFIG.H+4);ctx.restore();
};

/** One spaced object per chunk leaves broad connected routes between objects.
 * Stable cell-local positions prevent scenery moving when the camera streams.
 */
world.stream=function(){
 if(!run)return;const cx=Math.floor(run.player.x/256),cy=Math.floor(run.player.y/256);
 if(cx===this.cx&&cy===this.cy)return;this.cx=cx;this.cy=cy;props.clear();
 const zone=levelInfo().zoneId??levelInfo().id,types=TERRAIN_READABILITY.zoneProps[zone];
 for(let yy=cy-3;yy<=cy+3;yy++)for(let xx=cx-3;xx<=cx+3;xx++){
  const key=xx+','+yy+',0';if(this.broken.has(key))continue;
  const seed=hash(xx,yy,this.seed),p=props.get();if(!p)break;
  p.x=xx*256+128+(seed%49)-24;p.y=yy*256+128+((seed>>>9)%49)-24;
  p.key=key;p.type=types[seed%types.length];p.hp=p.type==='urn'?18:1e9;p.size=p.type==='urn'?18:0;p.used=false;
 }
 Terrain.rebuild();Terrain.place(run.player,14);
 for(let i=0;i<enemies.count;i++)Terrain.place(enemies.items[i],enemies.items[i].r);
 for(let i=0;i<allies.count;i++)Terrain.place(allies.items[i],12);
};

/** Read the same offsets and extents used by Terrain.rebuild, including arch gaps. */
function visibleFootprint(prop){return PROP_FOOTPRINTS[prop.type]||[];}

/** Subtle contact edging, rather than colored boxes or a second collision model. */
function drawObstacleFootprint(prop){
 const parts=visibleFootprint(prop);if(!parts.length)return;
 const x=screenX(prop.x),y=screenY(prop.y),near=run&&Math.hypot(prop.x-run.player.x,prop.y-run.player.y)<135;
 ctx.save();
 for(const [ox,oy,hw,hh]of parts){
  const left=x+ox-hw,top=y+oy-hh,w=hw*2,h=hh*2;
  ellipse(ctx,x+ox,y+oy+4,hw+8,hh+5,'#080b0a66');
  ctx.strokeStyle=near?'#c6bda285':'#b7ac8d50';ctx.lineWidth=near?1.6:1.1;
  ctx.beginPath();ctx.moveTo(left,top+hh);ctx.lineTo(left,top+h-3);
  ctx.quadraticCurveTo(left,top+h,left+3,top+h);ctx.lineTo(left+w-3,top+h);
  ctx.quadraticCurveTo(left+w,top+h,left+w,top+h-3);ctx.lineTo(left+w,top+hh);ctx.stroke();
 }
 ctx.restore();
}

drawScenery=function(prop){
 drawObstacleFootprint(prop);
 const player=run?.player,h=['arch','deadTree','obelisk','root'].includes(prop.type)?180:145,w=h*160/210;
 const covers=player&&prop.y>player.y&&prop.y-player.y<h-20&&Math.abs(prop.x-player.x)<w*.42;
 ctx.save();if(covers)ctx.globalAlpha*=.28;
 // The existing painted scenery, depth sort, ember effects and well glow remain.
 drawReferenceScenery(prop);ctx.restore();
};

// Decal records still power corpse spells. Only their visual coverage is reduced.
drawDecals=function(){
 for(let i=0;i<decals.count;i++){
  const d=decals.items[i];if(!inView(d.x,d.y,d.size))continue;
  ctx.save();ctx.translate(screenX(d.x),screenY(d.y));ctx.rotate(d.rotation);
  ctx.globalAlpha=Math.min(.3,d.life/35);ellipse(ctx,0,0,d.size*.88,d.size*.48,'#3c0b11');
  ellipse(ctx,d.size*.6,-d.size*.3,d.size*.2,d.size*.14,'#591018');ctx.restore();
 }
 ctx.globalAlpha=1;
};
