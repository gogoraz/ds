# v7 verification

The campaign release adds 48 nodes, six class stat profiles, corrected traversal, eight gear slots, four material currencies, six permanent class relics and twelve recipes across four three-piece sets.

Automated functional checks run against the actual assembled JavaScript with mocked DOM/Canvas. They cover all 48 guardian → chest → XP choice → reward transitions, all 18 active skills, six wall traversal behaviours, class stats, crafting and set effects, gold-only loss settlement, interruption recovery, migration, late-act reload, sandbox isolation, prices, rank caps, pointer identity, UI rendering and retained weapon evolutions.

The scripted combat player exercises real enemy AI, collision, waves, damage, drops and upgrade selection at 30 Hz. Its results are diagnostic, not expected human win rates. The heuristic retries a node up to three times, purchases upgrades after every settlement and prioritizes guardians. After three failures, later levels are explicitly unlocked by the test harness to exercise the whole campaign even if the heuristic loses an earlier fight. Direct late-game entry has a bounded weapon/passive preparation budget; it does not restore a dead character's build. Normal game progression still requires actual victories.

No physical iOS/Android device or rendered browser session was available during this change. Touch hardware, visual layout, orientation APIs, audio, PWA installation and actual frame rate need device testing. Mocked Canvas checks do not verify pixels.

Existing equipped items are represented by inventory state and actual stat effects. Layered visual armour changes are not included. The game uses existing 2D art and three boss behaviour families, with per-level profiles rather than 48 unique boss animation sets.

Run:
~~~sh
python3 scripts/build.py
node tests/campaign-v7.cjs
node tests/act1-v6.cjs
node tests/offline.cjs
node tests/playtest.cjs
~~~
