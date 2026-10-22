# Walkable terrain — readability correction

## Findings

1. **Walking area: poor in the supplied mobile screenshot.** Large roots, stones and apparent ridges were painted directly into the old repeating floor. They had no collision geometry. Reducing contrast did not remove that misleading height information.
2. **Obstacles: poor separation from the floor.** Two randomly positioned props per streamed chunk, combined with the painted objects below them, obscured open space. Full canopies and broad blood decals further covered the player's route. The arch opening needs to remain visibly and physically open.
3. **Acceptance: physical consistency as well as image loading.** Earlier browser checks proved that artwork decoded and controls worked. They did not prove that a player could predict an obstacle from its appearance.

The user-supplied phone screenshot is the current audit evidence. It is not copied into this public repository. New renderer captures below contain game content only.

## Change

- Dedicated 2×2 flat floor-material atlas: compacted earth/slate, sand, damp mud/moss and volcanic ash. It contains no trees, walls, roots, pits or lava rivers. The original uploaded assets are preserved.
- Native repeating Canvas patterns avoid the one-pixel seams produced by individually scaled image tiles. Patterns and textures are cached; there are no per-frame image filters or gradients.
- One large scenery slot per 256-pixel chunk, with deterministic ±24-pixel position variation. This halves object density and guarantees connected passages along chunk edges, wide enough for a radius-46 actor. Shared chunks retain their positions during streaming.
- Contact shadows and restrained front edges read the exact `PROP_FOOTPRINTS` arrays used by physics. Both arch pillars are marked separately; the central opening remains passable. Foreground canopies fade while covering the hero, while their footprint cue remains visible.
- Blood records retain their lifetime, positions and spell interactions. Their painted area and opacity are reduced.
- No hero balance, weapon, progression, inventory or save-schema changes. Lower scenery density changes arena cover and available urn density; the campaign simulation checks the resulting layout.

## Checks

- Eighteen local test suites passed. `tests/terrain-readability.cjs` covers all 16 zones: free initial spawns, wide connected routes, stable streaming, visible solid footprints, passable arch openings, solid pillars and urn destruction/loot.
- Real-Canvas extraction checks passed for 24 actors. Four portrait game scenes were rendered with Skia, using the actual runtime artwork. These captures are not physical-device or browser results.
- CI additionally renders all four acts in mobile Chrome, verifies the floor atlas and broad passages, and retains the existing desktop/mobile layout, actual input, save and offline tests.
- Full campaign simulation remains in CI. A simulated run is not a human win-rate estimate or a phone FPS measurement.

Native rendered comparisons after correction: [Act I](terrain-v10/act-1.webp), [Act II](terrain-v10/act-2.webp), [Act III](terrain-v10/act-3.webp), [Act IV](terrain-v10/act-4.webp).

## Floor asset provenance

Built-in ImageGen generated `assets/reference/walkable-floors-v10.webp` from the supplied terrain reference. The generated source was converted to WebP for runtime delivery. The source has 1254×1254 pixels; no higher resolution is claimed.

Prompt: production overhead gothic-fantasy floor albedo atlas, exactly two columns and two rows, no gutters or text. Top left cool compacted earth and subtle flat slate chips; top right muted desaturated compacted sand; bottom left cool damp mud with sparse flat moss; bottom right cool volcanic ash and fine basalt gravel. Orthographic 90-degree overhead view, diffuse lighting, low visual contrast, sparse shallow detail. Every quadrant is flat walkable ground, with tileable opposite edges. No trees, roots, walls, pillars, buildings, bones, skulls, bushes, boulders, pits, deep cracks, lava streams, cast shadows, horizon, perspective, vignette, UI, symbols, labels or watermark. The supplied image is a material-style reference only; do not reproduce its large raised objects.
