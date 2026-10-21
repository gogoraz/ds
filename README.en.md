# Hellbound Survivors

An original offline 2D dark-fantasy survival game. Move your hero while weapons attack automatically; cast three class spells and use a separate class movement skill. The campaign contains four acts, sixteen zones and forty-eight levels.

## Play

Serve the project folder over HTTP or open its hosted page. Keep the assets folder alongside index.html. Touch controls support movement and casting with separate fingers. Desktop controls use WASD/arrows, 1/2/3 for spells, Space for the first spell and Shift for movement. Select your language in Settings; switching does not reload the game.

The six heroes have distinct statistics, spells and movement. Collect twelve weapons, sixteen passive gifts and weapon evolutions. Eight equipment slots, permanent talents, six boss relics and twelve recipes across four sets provide persistent progression.

Death in the campaign keeps only gold earned during that run. Your existing permanent purchases, unlocked heroes, equipment and secured resources remain. Unsecured loot and your temporary combat build are lost. Victory secures loot and can carry the combat build into the next level.

## Localization update

The shared BG/EN dictionary covers the legacy interface, class descriptions, generated equipment names, combat text and settings. Historical item names retain their original stored form; the display layer resolves translated names without rewriting the player's save. Numbers, plural rules and time formatting have shared helpers.

There are no runtime frameworks, npm dependencies, advertisements, real-money purchases or online accounts. Audio is synthesized. Progress lives in the current browser. Export your save before moving to another device.

## Development

Build with `python3 scripts/build.py`. Run `node tests/campaign-v7.cjs`, `node tests/act1-v6.cjs`, `node tests/offline.cjs`, `node tests/scroll.cjs` and `node tests/i18n.cjs`. The full diagnostic combat simulation is `node tests/playtest.cjs`; it is not a measurement of human win rates or device performance.

The v8 upgrade is in development. See `docs/QA-v8.md` for completed automated checks, unverified device checks and remaining features. A working automated test is not a substitute for physical iOS/Android or controller validation.
