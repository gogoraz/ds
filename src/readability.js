/* T03: persisted text sizes and an offline UI font. */
const FONT_SCALES={S:15,M:16,L:18,XL:21};
function applyReadability(){const size=FONT_SCALES[save.settings.fontScale]||16;document.documentElement.style?.setProperty('font-size',size+'px');document.documentElement.classList?.toggle('readable',!!save.settings.readableFont);}
const settingsBeforeFonts=settingsScreen;
settingsScreen=function(back='menu'){const previous=screenName==='settings'?ui.querySelector('.panel'):null;withScrollPreserved(previous,()=>{settingsBeforeFonts(back);const panel=ui.querySelector('.panel');panel.innerHTML+='<div class="setting"><label>'+t('font.size')+'</label><select data-setting="fontScale">'+Object.keys(FONT_SCALES).map(k=>'<option value="'+k+'" '+((save.settings.fontScale||'M')===k?'selected':'')+'>'+k+'</option>').join('')+'</select></div><div class="setting"><label for="readable-font">'+t('font.readable')+'</label><input type="checkbox" id="readable-font" data-setting="readableFont" '+(save.settings.readableFont?'checked':'')+'></div>';if(!previous)restoreScroll(panel,scrollMemory.settings);return panel;});applyReadability();};
const showBeforeFonts=showUI;showUI=function(html,name=''){showBeforeFonts(html,name);applyReadability();};
ui.addEventListener('input',e=>{if(['fontScale','readableFont'].includes(e.target.dataset.setting))applyReadability();});
