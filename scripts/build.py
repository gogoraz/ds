"""Build the standalone game page from the preserved v3.4 engine and v6 extension."""
from pathlib import Path
root=Path(__file__).resolve().parents[1]
css='\n'.join((root/p).read_text() for p in ['src/base-v34.css','src/act1-v6.css'])
js='\n'.join((root/p).read_text() for p in ['src/engine-v34.js','src/act1-v6.js'])+'\n/* All content, renderers and campaign migrations are initialized before boot. */\nboot();\n'
html=(root/'src/template.html').read_text().replace('__STYLE__',css).replace('__SCRIPT__',js)
(root/'index.html').write_text(html)
print(f'Built index.html ({len(html.encode())} bytes)')
