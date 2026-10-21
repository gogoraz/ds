# UI audit — v8 work in progress

T01 fixes the confirmed panel replacement/reset defect. T02 covers the existing UI in BG/EN. T03 supplies local subset DejaVu Sans/Serif fonts with their license, 15/16/18/21px root scales, readable headings, larger secondary text and controls, reflowing grids and clear focus outlines. Nine foreground/background combinations pass the automated AA contrast calculation.

The environment has no working Chromium executable. Downloading Chromium returned an invalid archive, so no browser screenshots have been fabricated. This is a source review and automated CSS/settings check, not a completed visual audit. DejaVu covers Cyrillic and Latin; Bulgarian-specific localized glyph shapes are not claimed.

Pending: screenshots of town, heroes, inventory, campaign and settings at S/M/L/XL on mobile and desktop (40 captures), pseudo-localization overflow checks, and physical iOS inertial scrolling.

T04 proposals carried into the authorized implementation: permanent wallet/navigation, item comparisons and inventory filters/locks, clear risk/reward previews, explicit controller focus and end-of-run weapon damage. Actual screenshots and visual acceptance remain open until a rendered browser/device session is available.
