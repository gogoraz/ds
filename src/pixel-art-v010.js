/* Hellbound Survivors v0.10.0 — cached pixel-art presentation layer.
 * This module intentionally does not touch combat, physics, saves or loot odds.
 * Every transformation is made once per cached canvas, never per draw frame.
 */
const PIXEL_ART_V010=Object.freeze({
 version:'0.10.0',spriteCell:2,propCell:3,floorCell:4,
 coverage:'6 heroes, all existing enemies and bosses, scenery, four-act floors, icons'
});
const PIXEL_ART_CACHE=new WeakMap();
function pixelArtCanvas(source,cell=2,kind='actor'){
 if(!source||!source.width||!source.height)return source;
 const w=source.width,h=source.height,sw=Math.max(1,Math.ceil(w/cell)),sh=Math.max(1,Math.ceil(h/cell));
 const sampled=surface(sw,sh),sc=sampled.getContext('2d');
 sc.imageSmoothingEnabled=true;sc.imageSmoothingQuality='high';
 sc.drawImage(source,0,0,sw,sh);
 const pixels=sc.getImageData(0,0,sw,sh),p=pixels.data,n=sw*sh;
 const originalAlpha=new Uint8Array(n);
 const floor=kind==='floor';
 for(let i=0;i<n;i++){
  const k=i*4,alpha=p[k+3];originalAlpha[i]=alpha;
  if(alpha<48){p[k+3]=0;continue;}
  const average=(p[k]*3+p[k+1]*5+p[k+2]*2)/10;
  // Five-to-seven discrete tonal steps, retaining each source's hue.
  for(let channel=0;channel<3;channel++){
   let value=p[k+channel],step=floor?26:22;
   if(floor)value=value*.80+average*.20;
   else value=Math.min(255,value*1.07+7);
   p[k+channel]=Math.max(0,Math.min(255,Math.round(value/step)*step));
  }
  p[k+3]=floor?255:alpha>=118?255:Math.round(alpha/85)*85;
 }
 if(kind==='actor'||kind==='prop'){
  // A one-cell, ink-dark silhouette keeps feet and enemies distinct from ground.
  for(let y=1;y<sh-1;y++)for(let x=1;x<sw-1;x++){
   const i=y*sw+x,k=i*4;
   if(originalAlpha[i]>=48)continue;
   if(originalAlpha[i-1]<118&&originalAlpha[i+1]<118&&originalAlpha[i-sw]<118&&originalAlpha[i+sw]<118)continue;
   p[k]=19;p[k+1]=19;p[k+2]=23;p[k+3]=255;
  }
 }
 sc.putImageData(pixels,0,0);
 const output=surface(w,h),oc=output.getContext('2d');
 oc.imageSmoothingEnabled=false;oc.drawImage(sampled,0,0,sw,sh,0,0,w,h);
 return output;
}
function pixelCachedCanvas(raw,cell,kind){
 if(!raw)return raw;
 let bucket=PIXEL_ART_CACHE.get(raw);
 if(!bucket){bucket=new Map();PIXEL_ART_CACHE.set(raw,bucket);}
 const key=cell+':'+kind;
 if(!bucket.has(key))bucket.set(key,pixelArtCanvas(raw,cell,kind));
 return bucket.get(key);
}
const rasterBeforePixelV010=rasterBase;
rasterBase=function(id,dir){
 const raw=rasterBeforePixelV010(id,dir);
 return pixelCachedCanvas(raw,PIXEL_ART_V010.spriteCell,'actor');
};
// Animated poses are pixelated AFTER existing gait/weapon articulation.
// Raw animation and game speed stay unchanged; the WeakMap amortizes the work.
const actorMotionBeforePixelV010=actorMotionFrame;
actorMotionFrame=function(id,dir,phase,pose){
 const frame=actorMotionBeforePixelV010(id,dir,phase,pose);
 return pixelCachedCanvas(frame,PIXEL_ART_V010.spriteCell,'actor');
};
const propsBeforePixelV010=rebuildRasterProps;
rebuildRasterProps=function(){
 propsBeforePixelV010();
 for(const id of Object.keys(PROP_CELL)){
  if(sprites[id])sprites[id]=pixelCachedCanvas(sprites[id],PIXEL_ART_V010.propCell,'prop');
  delete spriteUrls[id];
 }
};
const floorsBeforePixelV010=rebuildRasterTextures;
rebuildRasterTextures=function(){
 floorsBeforePixelV010();
 for(let zone=0;zone<16;zone++){
  if(!worldFloors[zone]||!worldFloors[zone][0])continue;
  const material=pixelCachedCanvas(worldFloors[zone][0],PIXEL_ART_V010.floorCell,'floor');
  worldFloors[zone]=[material,material,material];
 }
 rebuildRasterPreviews();
};
// Procedural fallback and item icons share the same coherent treatment offline.
const buildBeforePixelV010=buildArt;
buildArt=function(){
 buildBeforePixelV010();
 for(const id of Object.keys(sprites)){
  if(!sprites[id])continue;
  const kind=Object.prototype.hasOwnProperty.call(PROP_CELL,id)?'prop':'actor';
  sprites[id]=pixelCachedCanvas(sprites[id],kind==='prop'?3:2,kind);
  delete spriteUrls[id];
 }
 for(const id of Object.keys(icons))if(icons[id]){
  icons[id]=pixelCachedCanvas(icons[id],2,'icon');
  delete spriteUrls[id];
 }
};
// Nearest-neighbour enlargement avoids blurry characters on phones.
const drawActorBeforePixelV010=drawActor;
drawActor=function(...args){
 const previous=ctx.imageSmoothingEnabled;
 ctx.imageSmoothingEnabled=false;
 try{return drawActorBeforePixelV010(...args);}
 finally{ctx.imageSmoothingEnabled=previous;}
};
const drawSceneryBeforePixelV010=drawScenery;
drawScenery=function(...args){
 const previous=ctx.imageSmoothingEnabled;
 ctx.imageSmoothingEnabled=false;
 try{return drawSceneryBeforePixelV010(...args);}
 finally{ctx.imageSmoothingEnabled=previous;}
};
const drawFloorBeforePixelV010=drawFloor;
drawFloor=function(...args){
 const previous=ctx.imageSmoothingEnabled;
 ctx.imageSmoothingEnabled=false;
 try{return drawFloorBeforePixelV010(...args);}
 finally{ctx.imageSmoothingEnabled=previous;}
};
const bootBeforePixelV010=boot;
boot=function(){
 bootBeforePixelV010();
 document.title='Hellbound Survivors · v0.10.0';
 document.documentElement.dataset.artVersion=PIXEL_ART_V010.version;
};
