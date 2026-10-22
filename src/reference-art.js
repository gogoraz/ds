/* Uploaded art, 23 October 2026. Original JPEGs remain byte-for-byte intact.
 * All extraction happens once on cached canvases, before normal sprite animation.
 * Collision footprints, class balance, boss attacks and save data are unchanged.
 */
const REFERENCE_ART={
 version:'reference-2026-10-23',errors:[],
 // Columns are editorial poses, NOT an eight-direction animation strip.
 heroColumns:[3,0,1,0,3,5,4,2],
 heroes:[
  [[12,3,194,221],[215,2,373,220],[392,3,554,220],[548,5,633,219],[664,2,817,220],[818,6,998,220]],
  [[14,224,204,437],[212,224,378,439],[388,224,525,439],[550,224,665,437],[641,224,820,438],[806,224,1025,436]],
  [[12,435,173,658],[183,435,368,660],[365,439,525,660],[517,439,668,663],[658,439,836,662],[835,438,1016,661]],
  [[7,661,178,886],[176,660,353,885],[319,663,513,886],[507,660,669,887],[683,663,848,885],[832,663,1040,886]],
  [[14,882,165,1084],[190,882,342,1087],[358,881,505,1089],[491,884,645,1089],[664,885,819,1084],[835,885,1024,1089]],
  [[7,1083,165,1246],[182,1086,342,1247],[360,1087,501,1247],[521,1086,656,1247],[669,1086,839,1247],[847,1087,1044,1244]]
 ],
 heroFlip:[false,false,false,true,true,false,false,false],
 // Hand-framed cells avoid cutting the bat's wings, long weapons and boss crowns.
 monsters:[
  [0,0,240,339],[176,0,546,319],[473,0,736,339],[725,0,954,335],[954,0,1208,336],[1150,55,1448,345],
  [0,300,241,704],[202,320,466,705],[462,344,712,705],[681,333,967,696],[944,319,1235,698],[1210,315,1448,699],
  [0,694,267,1074],[242,715,467,1067],[454,697,714,1071],[700,699,922,1072],[874,671,1262,1080],[1233,688,1448,1075]
 ],
 props:[
  [0,0,375,371],[357,0,719,382],[703,0,964,397],[960,0,1254,397],
  [0,343,324,635],[320,359,677,728],[650,389,975,733],[995,412,1254,715],
  [0,675,279,965],[279,710,651,1010],[650,700,994,1010],[994,700,1254,1010],
  [0,957,324,1254],[319,1009,636,1254]
 ]
};
for(const id of Object.keys(RASTER_DATA))RASTER_DATA[id]='./assets/reference/'+id+'.jpg';

// A restrained, cached rim separates the player from similarly colored rubble.
const referenceGradedBase=gradedMotionBase,REFERENCE_RIMS=new WeakSet();
gradedMotionBase=function(base,hero){
 const image=referenceGradedBase(base,hero);if(!hero||REFERENCE_RIMS.has(image))return image;
 const rim=surface(96,128),r=rim.getContext('2d');r.drawImage(image,0,0);r.globalCompositeOperation='source-in';r.fillStyle='#d0c39b66';r.fillRect(0,0,96,128);
 const c=image.getContext('2d');c.save();c.globalCompositeOperation='destination-over';
 for(const [x,y]of [[-1,0],[1,0],[0,-1],[0,1]])c.drawImage(rim,x,y);c.restore();REFERENCE_RIMS.add(image);return image;
};

/** Key only neutral paper connected to an edge; enclosed bright metal stays intact. */
function removeReferencePaper(image,w,h){
 const p=image.data,n=w*h,seen=new Uint8Array(n),queue=new Int32Array(n);let head=0,tail=0;
 function push(i){if(seen[i])return;seen[i]=1;const k=i*4,lo=Math.min(p[k],p[k+1],p[k+2]),hi=Math.max(p[k],p[k+1],p[k+2]);
  if(lo<(i>=n*.85?115:153)||hi-lo>34)return;queue[tail++]=i;}
 for(let x=0;x<w;x++){push(x);push((h-1)*w+x);}for(let y=1;y<h-1;y++){push(y*w);push(y*w+w-1);}
 while(head<tail){const i=queue[head++],x=i%w,y=Math.floor(i/w);p[i*4+3]=0;
  if(x)push(i-1);if(x<w-1)push(i+1);if(y)push(i-w);if(y<h-1)push(i+w);}
 // Paper also shows through enclosed bow strings, bent arms and tree branches.
 for(let i=0;i<n;i++){const k=i*4,lo=Math.min(p[k],p[k+1],p[k+2]),hi=Math.max(p[k],p[k+1],p[k+2]);if(lo>165&&hi-lo<17)p[k+3]=0;}
 // Decontaminate the one-pixel antialias rim, without punching holes in a figure.
 for(let y=1;y<h-1;y++)for(let x=1;x<w-1;x++){const i=y*w+x,k=i*4;if(!p[k+3])continue;
  if(p[(i-1)*4+3]&&p[(i+1)*4+3]&&p[(i-w)*4+3]&&p[(i+w)*4+3])continue;
  const lo=Math.min(p[k],p[k+1],p[k+2]),hi=Math.max(p[k],p[k+1],p[k+2]);
  if(lo>135&&hi-lo<38){const alpha=clamp((220-lo)/85,.08,1);p[k+3]=Math.round(255*alpha);
   for(let ch=0;ch<3;ch++)p[k+ch]=clamp((p[k+ch]-220*(1-alpha))/alpha,0,255);}
 }
}

/** The adjacent artwork often overlaps a cell's bounding rectangle. Keep its
 * largest connected silhouette, rather than unrelated fragments at the edges. */
function isolateReferenceFigure(image,w,h){
 const p=image.data,n=w*h,labels=new Int32Array(n),queue=new Int32Array(n),counts=[0];let label=0,biggest=0;
 for(let i=0;i<n;i++){if(labels[i]||p[i*4+3]<20)continue;label++;let head=0,tail=0;queue[tail++]=i;labels[i]=label;
  while(head<tail){const at=queue[head++],x=at%w,y=Math.floor(at/w);
   for(let yy=Math.max(0,y-1);yy<=Math.min(h-1,y+1);yy++)for(let xx=Math.max(0,x-1);xx<=Math.min(w-1,x+1);xx++){const k=yy*w+xx;if(!labels[k]&&p[k*4+3]>=20){labels[k]=label;queue[tail++]=k;}}}
  counts[label]=tail;if(tail>counts[biggest])biggest=label;
 }
 for(let i=0;i<n;i++)if(labels[i]!==biggest)p[i*4+3]=0;
}

/** Crop at original source resolution, then normalize to the existing foot anchor. */
function referenceCut(image,box,referenceW,referenceH,w,h,foot,maxHeight,maxWidth){
 const sx=image.width/referenceW,sy=image.height/referenceH,l=Math.round(box[0]*sx),t=Math.round(box[1]*sy);
 const cut=surface(Math.round((box[2]-box[0])*sx),Math.round((box[3]-box[1])*sy)),c=cut.getContext('2d');
 c.drawImage(image,l,t,cut.width,cut.height,0,0,cut.width,cut.height);
 const pixels=c.getImageData(0,0,cut.width,cut.height);removeReferencePaper(pixels,cut.width,cut.height);isolateReferenceFigure(pixels,cut.width,cut.height);c.putImageData(pixels,0,0);
 let left=cut.width,right=-1,top=cut.height,bottom=-1;const p=pixels.data;
 for(let y=0;y<cut.height;y++)for(let x=0;x<cut.width;x++)if(p[(y*cut.width+x)*4+3]>45){left=Math.min(left,x);right=Math.max(right,x);top=Math.min(top,y);bottom=Math.max(bottom,y);}
 const out=surface(w,h);if(right<left||bottom<top)return out;
 const bw=right-left+1,bh=bottom-top+1,scale=Math.min(maxWidth/bw,maxHeight/bh),dw=bw*scale,dh=bh*scale,oc=out.getContext('2d');
 oc.imageSmoothingEnabled=true;oc.imageSmoothingQuality='high';oc.drawImage(cut,left,top,bw,bh,(w-dw)/2,foot-dh,dw,dh);return out;
}

/** Match eight game bearings to the actual seven-pose sheet; share monster mirrors. */
rasterBase=function(id,dir){
 const hero=id.startsWith('hero'),bearing=hero?dir:(dir>=3&&dir<=5?4:0),key=id+':'+bearing;
 if(RASTER.base[key])return RASTER.base[key];const image=RASTER.images[hero?'heroes':'monsters'];if(!image)return null;
 let out,flip=false;
 if(hero){const row=Number(id.slice(4)),column=REFERENCE_ART.heroColumns[bearing];
  out=referenceCut(image,REFERENCE_ART.heroes[row][column],1254,1254,96,128,113,100,84);flip=REFERENCE_ART.heroFlip[bearing];
 }else{const index=MONSTER_CELL[id];if(index===undefined)return null;
  const heights={imp:70,bat:58,zombie:88,skeleton:88,archer:90,ghoul:80,cultist:96,revenant:96,leech:49,wraith:99,demon:98,gravewarden:102,plague:90,shade:90,boss0:108,boss1:108,boss2:110,reaper:110};
  out=referenceCut(image,REFERENCE_ART.monsters[index],1448,1086,96,128,113,heights[id]||90,id==='bat'?94:88);flip=bearing===4;
 }
 if(flip){const mirrored=surface(96,128),c=mirrored.getContext('2d');c.translate(96,0);c.scale(-1,1);c.drawImage(out,0,0);out=mirrored;}
 RASTER.base[key]=out;return out;
};

rebuildRasterProps=function(){
 const image=RASTER.images.props;if(!image)return;
 const sizes={ruinwall:[160,145],arch:[185,149],obelisk:[170,90],statue:[170,80],palm:[185,149],root:[175,149],temple:[125,145],hellspike:[175,130],brazier:[105,70],deadTree:[185,149],grave2:[104,68],urn:[58,48],well:[72,105],bones:[35,73]};
 for(const [id,index]of Object.entries(PROP_CELL)){const [height,width]=sizes[id];sprites[id]=referenceCut(image,REFERENCE_ART.props[index],1254,1254,160,210,202,height,width);delete spriteUrls[id];}
};

/** Cross-fade overlapping edges into a periodic tile without reflected geometry. */
function referenceFloorTile(image,sx,sy,sw,sh){
 const sample=surface(320,320),sc=sample.getContext('2d');sc.imageSmoothingQuality='high';sc.drawImage(image,sx,sy,sw,sh,0,0,320,320);
 const src=sc.getImageData(0,0,320,320).data,out=surface(256,256),c=out.getContext('2d'),pixels=c.getImageData(0,0,256,256),p=pixels.data;
 for(let y=0;y<256;y++)for(let x=0;x<256;x++){const wx=x<64?(x/64)**2*(3-2*x/64):1,wy=y<64?(y/64)**2*(3-2*y/64):1;
  const x2=x<64?x+256:x,y2=y<64?y+256:y,k=(y*256+x)*4;
  for(let ch=0;ch<3;ch++){const color=src[(y*320+x)*4+ch]*wx*wy+src[(y*320+x2)*4+ch]*(1-wx)*wy+src[(y2*320+x)*4+ch]*wx*(1-wy)+src[(y2*320+x2)*4+ch]*(1-wx)*(1-wy);
   // Compress ground contrast only: keep the painted detail below combat actors.
   p[k+ch]=color*.62+12;}p[k+3]=255;
 }c.putImageData(pixels,0,0);return out;
}

/** Three rows in the upload: wet earth, desert ruins, lava. Act III uses wet earth. */
rebuildRasterTextures=function(){
 const image=RASTER.images.terrain;if(!image)return;const sw=image.width/2,sh=image.height/3;
 const tiles=[];for(let row=0;row<3;row++)for(let col=0;col<2;col++)tiles.push(referenceFloorTile(image,col*sw,row*sh,sw,sh));
 for(let id=0;id<16;id++){const act=Math.floor(id/4),sub=id%4,row=[0,1,0,2][act],column=act===2?1:sub%2;
  const tile=surface(256,256),c=tile.getContext('2d');c.drawImage(tiles[row*2+column],0,0);
  if(act===2){c.fillStyle='#19301d24';c.fillRect(0,0,256,256);}
  if(sub>=2){c.fillStyle=act===3?'#110c1633':'#0c111626';c.fillRect(0,0,256,256);}
  worldFloors[id]=[tile,tile,tile];
 }
};

// Tall foreground scenery becomes translucent while it covers the hero. The
// existing depth sort and all collision footprints continue to apply normally.
const drawReferenceScenery=drawScenery;
drawScenery=function(prop){
 const p=run?.player,h=['arch','deadTree','obelisk','root'].includes(prop.type)?180:145,w=h*160/210;
 const covers=p&&prop.y>p.y&&prop.y-p.y<h-20&&Math.abs(prop.x-p.x)<w*.42;
 ctx.save();if(covers)ctx.globalAlpha*=.38;drawReferenceScenery(prop);ctx.restore();
};

// Clear procedural frames created while JPEG decoding was pending. This also
// refreshes hero portraits and boss intros if a run starts before art is ready.
initRasterArt=function(){
 if(typeof Image==='undefined')return;
 for(const id of Object.keys(RASTER_DATA)){RASTER.pending++;const image=new Image();
  image.onload=()=>{try{RASTER.images[id]=image;
   if(id==='terrain')rebuildRasterTextures();else if(id==='props')rebuildRasterProps();else{
    for(const key of Object.keys(RASTER.base))if(id==='heroes'?key.startsWith('hero'):!key.startsWith('hero'))delete RASTER.base[key];
    for(const key of Object.keys(RASTER.frames))delete RASTER.frames[key];
    MOTION_FRAMES.clear();MOTION_FLASHES.clear();MOTION_PENDING.clear();MOTION_RECENT.clear();
    const names=id==='heroes'?Array.from({length:6},(_,i)=>'hero'+i):Object.keys(MONSTER_CELL);
    for(const name of names){sprites[name]=rasterBase(name,2);delete spriteUrls[name];}
   }rebuildRasterPreviews();
  }catch(error){REFERENCE_ART.errors.push(id+': '+error.message);}finally{finish();}};
  image.onerror=()=>{REFERENCE_ART.errors.push(id+': load failed');finish();};
  function finish(){RASTER.pending--;RASTER.ready=RASTER.pending===0;if(RASTER.ready&&!run&&state==='MENU')menu();}
  image.src=RASTER_DATA[id];
 }
};
