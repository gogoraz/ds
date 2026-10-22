"""Derive the approved zone atlas into versioned local campaign previews."""
from pathlib import Path
from PIL import Image, ImageOps
root=Path(__file__).resolve().parents[1]
folder=root/'assets/art';atlas=Image.open(folder/'atlas.webp').convert('RGB');w,h=atlas.size
cells=[]
for zone in range(16):
 x,y=zone%4,zone//4;cell=atlas.crop((round(x*w/4),round(y*h/4),round((x+1)*w/4),round((y+1)*h/4)));cells.append(cell)
 ImageOps.fit(cell,(640,360)).save(folder/f'zone-{zone}.webp',quality=82,method=6)
 for trial in range(3):
  if trial:
   zoom=1+trial*.09;cw,ch=int(cell.width/zoom),int(cell.height/zoom);left=int((cell.width-cw)*(.25 if trial==1 else .75));top=int((cell.height-ch)*.4);view=cell.crop((left,top,left+cw,top+ch))
  else:view=cell
  ImageOps.fit(view,(640,360)).save(folder/f'level-{zone*3+trial}.webp',quality=82,method=6)
for act in range(4):ImageOps.fit(cells[act*4],(1280,720)).save(folder/f'act-{act}.webp',quality=84,method=6)
ImageOps.fit(cells[15],(1280,720)).save(folder/'rift.webp',quality=84,method=6)
for i,z in enumerate([5,2,0,11,6,14,7]):ImageOps.fit(cells[z],(320,180)).save(folder/f'bonus-{i}.webp',quality=80,method=6)
print('Prepared 48 level, 16 zone, 4 act, 1 rift and 7 bonus WebP previews')
