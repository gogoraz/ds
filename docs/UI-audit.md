# UI audit — v8 work in progress

T01 fixes the confirmed panel replacement/reset defect. T02 covers the existing UI in BG/EN. T03 supplies local subset DejaVu Sans/Serif fonts with their license, 15/16/18/21px root scales, readable headings, larger secondary text and controls, reflowing grids and clear focus outlines. Nine foreground/background combinations pass the automated AA contrast calculation.

The environment has no working Chromium executable. Downloading Chromium returned an invalid archive, so no browser screenshots have been fabricated. This is a source review and automated CSS/settings check, not a completed visual audit. DejaVu covers Cyrillic and Latin; Bulgarian-specific localized glyph shapes are not claimed.

Pending: screenshots of town, heroes, inventory, campaign and settings at S/M/L/XL on mobile and desktop (40 captures), pseudo-localization overflow checks, and physical iOS inertial scrolling.

T04 proposals carried into the authorized implementation: permanent wallet/navigation, item comparisons and inventory filters/locks, clear risk/reward previews, explicit controller focus and end-of-run weapon damage. Actual screenshots and visual acceptance remain open until a rendered browser/device session is available.

Implemented in the preview: shared wallet and scrolling town tabs; item search, slot/rarity filters, comparisons with numeric +/−, locks, best-per-slot and reviewed bulk dismantling; controller focus/adjustment; damage breakdowns; title/frame selection; a first-run guide; three-backup preview/confirmation/restore; reduced shake, high-contrast markers, held spell keys and 30 FPS. The DOM test harness now retains the actual panel content so appended settings and reports are included in localization checks.

This does not change the pending screenshot/device status above. No claim of a completed browser pixel audit is made.

## Correction review — 22 October 2026

Added left/right one-hand controls, held-mouse behavior and controller sensitivity. A dependency-free Chrome/CDP job now captures the requested 40 phone/desktop font-size screenshots, checks pseudo-localization overflow, real pointer events and offline artwork. Local Chromium downloads succeeded but execution failed with OS socket restrictions. Inspect the `v8-browser-evidence` Actions artifact before marking rendered acceptance complete. No physical iOS/controller or listening checks are represented by that job.

The first real Chrome run captured all 40 primary views and found horizontal overflow on the achievements heading in EN pseudo-localization at XL on a 390px viewport. Added text reflow and bounded settings children, preserving visible content; minimum menu target height is now 44px even at S. The CI rerun determines whether all remaining input/offline checks pass.

Visual inspection of the 40 captured views also found cramped four-column act tabs on phones. They now use a two-column layout. A second browser run passed the layout/pseudo-localization and actual mouse/one-hand/save checks, then exposed a reload synchronization race in the test itself. The test now awaits the page load event before reading the new JavaScript context, and visits artwork before asserting offline availability.
