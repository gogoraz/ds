'use strict';const assert=require('node:assert/strict'),{boot}=require('./harness-v7.cjs');const{g,sandbox}=boot();const r=g.InputRouter;
assert.equal(r.axis(.1,.1).x,0);assert.ok(Math.abs(r.axis(1,1).x-Math.SQRT1_2)<.001);assert.equal(r.axis(1,0).x,1);
g.startRun();g.state='RUN';r.key({key:'d',preventDefault(){},repeat:false},true);r.poll();assert.equal(g.Input.x,1);r.key({key:'d',preventDefault(){}},false);r.poll();assert.equal(g.Input.x,0);
r.pending='spell0';r.key({key:'q',preventDefault(){}},true);assert.equal(r.binding('spell0'),'q');assert.equal(r.pending,null);
g.state='RUN';let buttons=Array.from({length:16},()=>({pressed:false,value:0}));sandbox.navigator.getGamepads=()=>[{id:'Xbox',connected:true,axes:[.7,0,0,0],buttons}];r.poll();assert.equal(r.last,'gamepad');assert.ok(g.Input.x>.5);
buttons[0].pressed=true;g.state='RUN';r.poll();assert.ok(g.run.skillCDs[0]>0);const cd=g.run.skillCDs[0];r.poll();assert.equal(g.run.skillCDs[0],cd,'held buttons must not retrigger');
buttons[9].pressed=true;r.poll();assert.equal(g.state,'PAUSE');
g.save.settings.mouseMode=true;g.state='RUN';assert.equal(r.pointer({pointerType:'mouse',button:0,clientX:100,clientY:100,preventDefault(){}}),true);assert.ok(r.target);
console.log('PASS radial dead zone, keyboard move/release, remapping, gamepad movement, edge-triggered casts/pause and mouse target');
