'use strict';const assert=require('node:assert/strict'),{boot}=require('./harness-v7.cjs');const{g,sandbox}=boot();const r=g.InputRouter;
assert.equal(r.axis(.1,.1).x,0);assert.ok(Math.abs(r.axis(1,1).x-Math.SQRT1_2)<.001);assert.equal(r.axis(1,0).x,1);
g.startRun();g.state='RUN';r.key({key:'d',preventDefault(){},repeat:false},true);r.poll();assert.equal(g.Input.x,1);r.key({key:'d',preventDefault(){}},false);r.poll();assert.equal(g.Input.x,0);
r.pending='spell0';r.key({key:'q',preventDefault(){}},true);assert.equal(r.binding('spell0'),'q');assert.equal(r.pending,null);
g.state='RUN';let buttons=Array.from({length:16},()=>({pressed:false,value:0}));sandbox.navigator.getGamepads=()=>[{id:'Xbox',connected:true,axes:[.7,0,0,0],buttons}];r.poll();assert.equal(r.last,'gamepad');assert.ok(g.Input.x>.5);
buttons[0].pressed=true;g.state='RUN';r.poll();assert.ok(g.run.skillCDs[0]>0);const cd=g.run.skillCDs[0];r.poll();assert.equal(g.run.skillCDs[0],cd,'held buttons must not retrigger');
buttons[9].pressed=true;r.poll();assert.equal(g.state,'PAUSE');
g.save.settings.mouseMode=true;g.state='RUN';assert.equal(r.pointer({pointerType:'mouse',button:0,clientX:100,clientY:100,preventDefault(){}}),true);assert.ok(r.target);
console.log('PASS radial dead zone, keyboard move/release, remapping, gamepad movement, edge-triggered casts/pause and mouse target');
// Mouse movement must stop on release and follow the current cursor while held.
const mouse=boot(),mg=mouse.g,mr=mg.InputRouter;mg.startRun();mg.state='RUN';mg.save.settings.mouseMode=true;
const pointer={pointerType:'mouse',button:0,pointerId:3,clientX:110,clientY:130,preventDefault(){}};
mr.pointer(pointer);mr.poll();assert.ok(Math.hypot(mg.Input.x,mg.Input.y)>0);mr.move({...pointer,clientX:0,clientY:50});assert.notEqual(mr.cursor.x,110);mr.release();mr.poll();assert.equal(mg.Input.x,0);assert.equal(mg.Input.y,0);
mg.run.skillCDs[0]=0;mg.run.player.mana=mg.run.player.maxMana;mr.pointer({...pointer,button:2});assert.ok(mg.run.skillCDs[0]>0,'right click casts spell 1');assert.equal(mr.leftHeld,false);
const moveButton=mg.SKILL_BUTTONS[1],stagePoint=mouse.els.get('stage').getBoundingClientRect();
// Sensitivity preserves radial bounds and survives save normalization.
mg.save.settings.sensitivity=.5;const gentle=mr.axis(.7,0).x;mg.save.settings.sensitivity=1.5;assert.ok(mr.axis(.7,0).x>gentle);assert.ok(Math.hypot(...Object.values(mr.axis(1,1)))<=1.00001);
assert.equal(mg.normalizeSave({...mg.save,settings:{...mg.save.settings,sensitivity:99}}).settings.sensitivity,1.5);
mg.finishRun(false);mr.key({key:'r',preventDefault(){}},true);assert.equal(mg.state,'RIFTS');
console.log('PASS held mouse release/cursor, right-click spell, controller sensitivity bounds/persistence and town shortcuts');

mg.settingsScreen();assert.ok(mouse.els.get('ui').innerHTML.includes('data-setting="sensitivity"'));
const one=boot(),og=one.g;og.startRun();og.state='RUN';og.save.settings.oneHand=true;const op={pointerType:'touch',clientX:200,clientY:100,preventDefault(){}};assert.equal(og.InputRouter.pointer(op),true);assert.ok(og.InputRouter.oneHandTarget);og.InputRouter.poll();assert.ok(Math.hypot(og.Input.x,og.Input.y)>0);og.OneHand.action('stop');assert.equal(og.InputRouter.oneHandTarget,null);assert.equal(og.Input.x,0);assert.equal(og.Input.y,0);
og.run.skillCDs[1]=0;og.run.player.mana=og.run.player.maxMana;og.OneHand.action('spell1');assert.ok(og.run.skillCDs[1]>0);og.OneHand.action('pause');assert.equal(og.state,'PAUSE');og.settingsScreen();assert.ok(one.els.get('ui').innerHTML.includes('data-setting="oneHandSide"'));assert.equal(og.normalizeSave({...og.save,settings:{...og.save.settings,oneHand:true,oneHandSide:'left'}}).settings.oneHandSide,'left');
console.log('PASS one-hand tap-to-move, stop, spell, pause, side selector and saved settings');
