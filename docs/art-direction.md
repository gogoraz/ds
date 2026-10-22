# v8 environment art

Created with the built-in imagegen tool as one original 4×4 environment atlas. Prompt: uniform four columns/four rows without borders, lettering, logos, characters or watermark; sixteen separate dark gothic fantasy painterly panoramic environments, consistent cinematic lighting and strong silhouettes. Rows follow the campaign: ash wasteland, moonlit graveyard, ruined cathedral, bone catacombs; scorched dunes, buried palace, serpent tomb, astral sanctuary; thorn jungle, swamp, overgrown city, blood temple; ashen descent, lava river, infernal forge, sanctuary of ruin. Requested 3840×2160; the returned source is 1672×941, and no 4K source is claimed.

Runtime assets are in `assets/art/`. `atlas.webp` preserves the approved source. `scripts/prepare_art.py` derives sixteen 640×360 zone previews, forty-eight 640×360 level crops, four 1280×720 act banners, one rift background and seven bonus thumbnails. Level crops change the framing, not the underlying painting. The larger output dimensions do not add source detail.

All runtime artwork is local WebP. Cards load lazily; missing artwork leaves the CSS gradient. The service worker caches artwork on request, capped at 25 MiB and 80 entries, versioned independently from the shell.
