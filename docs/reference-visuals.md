# Reference artwork integration — 23 October 2026

The four JPEG sheets supplied by the user are preserved unchanged in `assets/reference/`. No image generation or redrawing was used. `src/reference-art.js` extracts and keys the artwork into cached Canvas sprites at startup.

- Six heroes: per-character source rectangles and an explicit mapping from the sheet poses to eight bearings. Existing distance-driven animation remains active.
- Fourteen enemy archetypes, three bosses and the Reaper: hand-framed source regions, shared mirrored bases, transparent silhouette extraction. Additional campaign species retain their existing shared archetype artwork.
- Fourteen scenery props: original stone, wood and metal artwork. Tall scenery fades while covering the player. The crowded source sheet has overlapping silhouettes; some edge detail is necessarily cropped.
- Terrain: the upload contains two columns and three biome rows. Acts I/III use wet earth, II uses desert, IV uses lava. Overlapping edges are blended into periodic floor tiles; floor contrast is compressed to keep combat readable.
- Updated offline cache names and precached JPEG paths. Gameplay statistics, collision footprints, progression and save schema are unchanged.

## Validation

- All 17 existing non-browser suites passed, including 25 campaign checks, input, offline caching, saves and UI.
- `node --check src/reference-art.js` and `git diff --check` passed.
- `tests/reference-art.cjs` decoded the real JPEGs with Skia, checked 24 actor silhouettes, and rendered all hero directions, scenery and four game scenes. Captures are in `docs/reference-captures/`; numeric evidence is in `docs/reference-pixel-results.json`.
- Reproduce the pixel check with `NODE_PATH=<folder containing @napi-rs/canvas> node tests/reference-art.cjs`. This package is only a verification dependency; the game has no added runtime dependencies.
- The existing Chromium CI test now also waits for all four source sheets and checks actor alpha masks. Local Chromium installation failed because the browser download returned an invalid archive; no local browser or physical-phone result is claimed.

## Source integrity

- `assets/reference/heroes.jpg`: SHA-256 `891800b627a0a1f3a19539ce07dca83187f88cf11e88967699cd89cf43b7ea33`
- `assets/reference/monsters.jpg`: SHA-256 `c33cda52286773153d40ac10ae90a542f2effcd7d421daa3f8f0b278dadceb5c`
- `assets/reference/props.jpg`: SHA-256 `652cdd9eb276f8442acc3a0c6c58e8f187f4dacc79eb89afa9680ca7bb42dd60`
- `assets/reference/terrain.jpg`: SHA-256 `f4c6421d288478821a9ec32370b7d1627a5042561b27d8cf22203f63d48d5ec3`
