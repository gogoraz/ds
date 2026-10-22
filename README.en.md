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

## v8 preview systems

The town now links equipment, trader, rifts, missions, heroes, talents, Legacy, achievements, bestiary, statistics and settings. Inventory supports slot/rarity filters, search, sorting, locks, comparisons, best-item equipping and reviewed bulk dismantling. Post-run reports show damage by weapon and class spells.

After campaign level 12, a free T1 keystone opens the rift loop through T50. Slay enemies to fill progress, defeat the guardian before the timer expires, and earn rift fragments, runes, loot and a higher keystone. Death retains 50% of earned rift fragments, timeout/retreat 25%; gold remains, and the key drops one tier. These currencies remain separate from the four boss materials and forge fragments.

Tempering reaches +10. Ranks +1–3 are safe; later break risks are 5/10/16/24/34/46/60%. Up to five rift runes reduce risk, and two consecutive breaks halve the next chance with a 2% floor. Broken items cannot be equipped or sold. Repair costs 60% of invested gold and 50% of fragments, with a two-rank loss. Optional hardcore forging permanently destroys broken items. Risks of 25% or more require an explicit in-game confirmation.

The sealed relic trader uses only earned rift fragments: 60% common, 28% magic, 10% rare, 2% legendary. Rare-or-better is guaranteed by purchase 10 without one, legendary by 40. Inventory capacity is checked before payment.

Three daily and one weekly local contracts award persistent resources once. Seven bonus modes cover treasure pursuit, holding an arena, elite hunting, protecting an altar, accepting a curse, three guardian fights and survival without mana. Secret portals explicitly settle the current campaign attempt as a retreat before entry.

Thirty-two new species use fourteen behavior archetypes and the existing animated sprite library. Each zone has two exclusive species and a distinct environment-hazard profile. The bestiary records encounters and kills. There are 162 bilingual achievements with one-time rewards: bronze 25 gold; silver one soulstone; gold three soulstones and a title; platinum a title and frame. Training and automated play never grant achievements. Soulburst now supports ten bodies so its ten-body achievement is possible.

Seventeen original procedural music themes cover the hub and zones. A local WebP atlas supplies 48 level crops, 16 zone previews, four act banners, a rift background and seven bonus thumbnails. Artwork loads lazily with a 25 MiB cache limit. DejaVu UI/heading fonts are bundled with their license; S/M/L/XL text scales, reduced motion, contrast markers, held spell keys, 30/60 FPS and save-backup preview/restore are available.

This is a testing preview. Physical iOS/Android/controller checks, the complete screenshot audit, long listening/LUFS measurements and human rift/bonus balance remain open. Paragon, ascension, online rankings and the remaining optional T13/T15 ideas are not included.

### Input corrections (T05)

Hold left mouse to follow the cursor; release, blur or hide the page to stop. Right click casts spell 1; all spell/dash HUD buttons are clickable. Stick sensitivity is adjustable from 0.5 to 1.5. Town shortcuts: F/I inventory, R rifts, M missions, H heroes, T talents, B bestiary, G trader, C campaign.

### T06 — boss music

Boss music now has three family-specific motifs and rhythms. Below 66% health it adds bass; below 33% it adds a choir layer. Notes remain in the zone mode and share the existing bounded voice budget.

### T11 — contract variety

Daily contracts include a specific spell slot, damage-free wins and single-weapon wins. The three offers are saved per date, so unlocking rifts cannot replace current contracts. Weekly rewards also unlock a persistent title and frame without duplicates.
