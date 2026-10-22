# v8 preview — validation evidence

Date: 21 October 2026. Repository: `gogoraz/ds`; review branch: `work/v8-t01-scroll`; base: `932c8dca89d8c1d69c3edfe28fed0f27e63153d9`. This is a test preview, with no merge into `main` or production deployment.

## Automated checks

The Python build reproduces the committed standalone `index.html`. JavaScript syntax checks and these 17 functional suites pass:

`campaign-v7`, `act1-v6`, `offline`, `scroll`, `i18n`, `readability`, `save-v8`, `input`, `music`, `rift`, `forge`, `gambler`, `art`, `missions`, `enemies`, `achievements`, `ui-v8`.

The v6 suite is retained as an archived mechanics regression; current campaign settlement follows the v7/v8 rules. DOM, Canvas, AudioContext and controller fixtures exercise the actual game functions, but do not measure rendered pixels, sound quality or physical devices.

| Evidence | Result | Scope |
| --- | --- | --- |
| Campaign combat, [playtest-v8-results.json](playtest-v8-results.json) | 48 nodes, 48 attempts, 48 victories | Heuristic Warden at 30 simulation updates/second, actual terrain/combat, sequential carried progress and purchases. This is not human win rate or device FPS. The harness allows up to three attempts and can unlock the following node after three failures; that fallback was not needed in this run. |
| Rift settlement, [playtest-v8-rifts.json](playtest-v8-rifts.json) | T1–T50 checked | Deterministic guardian/progress/reward/XP scenarios, including explicit lethal hits. This does not establish human rift balance. |
| Forge probability checks | 1,000,000 samples | Declared risks, rune reductions, protection and repair invariants. |
| Trader probability checks | 100,000 samples | Base odds, capacity-before-charge, pity guarantees and earned-currency handling. |
| Achievements | 162 unique bilingual definitions and condition fixtures | Event counters, one-time rewards, exclusions and a real ten-body Soulburst cast are checked; every rare condition has not been played by a person. |
| Local art | 48 level crops, 16 zones, 4 act banners, rift and 7 bonus previews | Derived from one original 1672×941 atlas. Crops/upscaled outputs are not independent paintings or a 4K source. |

The combat report records this exact SHA-256 of the tested `index.html`:

```
b3c244b10b09dcb11a308853996ede25e72991fb662ed91683c17b373c4c5dde
```

The report and final page hash were compared after the run. The historical v7 report is preserved separately. GitHub Actions is configured to rebuild, run syntax/the 17 suites, simulate the campaign and upload the two v8 reports. A local pass is not a claim that the remote workflow has completed.

## Acceptance still open

- Rendered desktop/mobile screenshots at all four text sizes, pseudo-localization overflow, focus and touch-target inspection. The environment had no working browser executable; the attempted Chromium download was invalid.
- Physical iOS/Android scrolling, background/resume, offline resource acquisition and storage-limit behavior.
- Xbox/PlayStation controller-only play, reconnects and vibration on real hardware.
- Listening to all themes, transitions, mobile audio and loudness/LUFS measurements.
- Human balance and readability for rifts, seven bonus modes, hazards, new enemies and the economy; broader six-hero campaign play.

These checks remain pending, not passed or silently skipped. See [v8-status.md](v8-status.md) for task-by-task scope. T13 discussion and the remaining optional T15 systems are outside this implementation.
