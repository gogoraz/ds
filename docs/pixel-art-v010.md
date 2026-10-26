# Hellbound Survivors — v0.10.0 Pixel-Art Recovery

**Work branch:** `work/0.10.0-pixel-art` — do not merge until approved.

## What was recovered from the last project conversations

The user approved a new dark gothic pixel-art presentation inspired by the thumbnail references: sharp hand-crafted-looking silhouettes, legible walkable floors, distinct barriers, and stylized gothic lettering for headings and item names. Earlier discussions also require the six heroes, enemy families, bosses and environmental props to feel cohesive, without losing animation, traversal, spells, boss rewards, saves, or the 4-act campaign.

The earlier local Git objects/assets reported in chat were **not accessible in the new session**. The version in this branch is a reconstructed source-based implementation, **not** a byte-identical recovery of those local commits. It deliberately reuses the tracked reference art and runtime data.

## Delivered

- `src/pixel-art-v010.js`: deterministic palette/tonal quantization with coarse pixel grids, alpha-preserving outlines, transparent hero silhouettes and per-source WeakMap memoization.
- Existing eight-direction hero/monster gait, boss species, combat sprites and equipment icon sources are retained. Cached frame processing is applied to actor output, with nearest-neighbor gameplay draw calls.
- `src/terrain-readability.js` remains the owner of the 16-zone walkable-floor and obstacle collision visuals; v0.10.0 pixelates only the material, never the collision footprint.
- `src/pixel-art-v010.css`: dark stone/aged-gold gothic heading styling for item names, panels, cards and menus. Uses the existing locally stored offline heading font; no copyrighted thumbnail font is embedded or claimed.
- Main menu, inventory wallet and manifest updated to v0.10.0; versioned service-worker cache refresh.
- Standalone `index.html` rebuilt in the branch with both new source modules.
- Existing gameplay balance, maps, class skills, 4 acts, 16 zones, 48 stages, drops and saved progression are not intentionally modified.

## Acceptance / remaining limitations

This is an **algorithmic pixel-art conversion** of existing painted images. It does **not** replace each hero/prop with a manually drawn sprite sheet and cannot exactly reproduce unseen image generation or unpushed historical local artwork.

Before approving merge, inspect on a real mobile screen: hero/monster silhouettes (all directions), bosses/attacks, 16 floor textures, readable obstacle boundaries, menu and inventory item names, landscape UI, 60 FPS targets, artwork on cold PWA/offline boot. Pixelation quality depends on reference resolution; if the thumbnail's exact font is required, acquire appropriate licensed artwork/font rather than copying it.

## Build and QA

```sh
python3 scripts/build.py
git diff --exit-code -- index.html
for file in src/*.js; do node --check "$file"; done
node tests/pixel-art-v010.cjs
node tests/terrain-readability.cjs
node tests/playtest.cjs
node tests/browser-v8.cjs
```

CI runs the existing regression suite and the new pixel-art acceptance test. Browser captures and physical device results must be inspected before this branch is merged.
