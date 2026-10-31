# Slides 9–10 product imagery update

- Slide 9 uses handbag_editorial.png in both conditions; full bag and handle remain visible on an ivory backdrop.
- Slide 10 replaces emoji placeholders with twelve fictional bottle photos from a 4×3 atlas, perfume_catalog_editorial.png. Each bottle is displayed through CSS background positioning, without modifying the source image.
- The first three products have identical names, prices, notes, and image crops in both rounds.
- The catalog loads and decodes before enabling the experiment start button. On image failure a visible message allows continuing with text descriptions.
- Removed the cropped catalog banner. Added a scrolling hint, keyboard-accessible existing selection buttons, and small-screen layout rules.
- Images are AI-generated illustrations of fictional products, not photographs of verified commercial brands. This is stated in the interface and credits.
- Existing navigation, scarcity calculations, Python engine and brain scripts were preserved byte-for-byte.

## Image-generation method
OpenAI built-in image generation. Handbag edit prompt: preserve black chevron quilted bag, handle, gold clasp and key; remove logo; ivory studio backdrop and soft light; entire bag visible. Perfume prompt: twelve equally lit premium fictional bottles in a uniform four-column, three-row grid; ivory background; amber, emerald, plum, clear, navy, rose, brown, peach, taupe, yellow, lavender and burgundy; no labels or logos. Generated files are local PNG assets.

## Verification
- browser: Chromium
- navigation: 20 slides passed
- scarcity: A/B/results passed
- choice: 3 and 12 cards; selection, ratings, results and restart passed
- errors: []
- scope: External CDNs blocked; JavaScript fallback tested, live Pyodide not tested
- Visual inspection at desktop and narrow mobile viewport. Safari still needs user verification.
- README showcase refresh remains deferred as requested.
