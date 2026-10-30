# Slide 19 Improvement Plan: Emotional vs. Neutral Advertising Lab (`Gritti Tutù`)

- **Project:** The Consumer Brain (`SHM-2026`)
- **Branch:** `malak-improvments`
- **Overall Status:** `IMPLEMENTED (Stages 1–5 implemented in code & verified via automated Node.js + Python 3.11 harness; manual browser check open on local server)`
- **Related Documents:** [`docs/visual-redesign-plan.md`](visual-redesign-plan.md) | [`docs/content-audit.md`](content-audit.md) | [`docs/video-ad-production-plan.md`](video-ad-production-plan.md)

---

## Methodological & Scientific Guardrails

- **Verified Real Product & Official Product Imagery (`Gritti Tutù`):** Both ads present **Gritti Tutù** (*White Collection, Extrait de Parfum, 100 ml, € 260, SKU: DGB00600*) verified against the official brand website (`https://www.grittifragrances.com/products/tutu-dgb00600`), without reusing the fictional `AURA Privée` specs or `₪480` price, and without confusing *Tutù* (Extrait de Parfum) with *Tutù Blanc* (Eau de Parfum).
- **Authentic Official Images Integrated on Slides 1 & 19:** The old `AURA` placeholders (`perfume_neutral.jpg` and `perfume_emotional.jpg`) have been replaced on Slide 1 and Slide 19 with the authentic official gallery images from Gritti Fragrances (`assets/images/gritti_tutu_01.jpg`, `assets/images/gritti_tutu_02.jpg`, and `assets/images/gritti_tutu_03.jpg`), preserving the bottle's proportions and `Gritti / tutù EXTRAIT DE PARFUM / Venetia` label (`object-fit: contain`).
- **3D Bottle Model Deferred Until Sufficient Reference Views Exist:** Because the official gallery provides front and three-quarter front views (`01`, `02`, `03`) but does not show the unseen back, left profile, top-down cap, or verified millimeter measurements, the 3D bottle model is deferred until sufficient reference views exist (and no millimeter accuracy is claimed without verified measurements). The existing interactive Three.js brain scene on Slide 8 remains completely preserved.
- **Self-Report Measures Only:** Both *brand attitude / connection* (`חיבור ועמדה כלפי המותג`) and *purchase intention* (`כוונת קנייה מוצהרת`) in Slide 19 are **self-reported ratings**, not observed or measured purchasing behavior.
- **No Causal Claims:** Multiple simultaneous differences in image and copy, prior familiarity with a real perfume (`Gritti Tutù`), and seeing both ads sequentially (`Within-Subject Order Effects`) limit causal interpretation. This is an educational self-report activity, not a controlled study or a measurement of real purchasing behavior.

---

## Staged Implementation Plan

### Stage 1: Fix the Python `Map`-to-JavaScript Conversion for Slide 19 Without Breaking Other Slides
- **Status:** `COMPLETED (Verified via Node.js + Python 3.11 harness; open on local server for manual browser check)`
- **Goal:** Ensure Python results returned by `calculate_emotional_ad_comparison` via Pyodide (`proxy.toJs()`) are properly converted into plain nested JavaScript objects for Slide 19, while leaving all other slides (`slide-9`, `slide-10`, `slide-13`, `slide-14`, `slide-16`) and `verifyPythonExecution()` completely intact.
- **Affected Files:**
  - `js/python_runner.js` (`mapToPlainObject` + `window.calculateEmotionalAdPython`)
- **Check for Success & Verification Status:**
  - **Automated check run (Node.js + Python 3.11.9):** Confirmed `calculateEmotionalAdPython` converts nested `Map` results into plain JS objects (`res.ad_a.emotion`, etc.), Step 3 DOM elements render without error, the JS fallback works when Pyodide is unavailable, both paths produce identical DOM outputs for matching ratings, and other wrappers still return `Map` instances.

---

### Stage 2: Display the Actual Calculation Engine (Python or JavaScript)
- **Status:** `COMPLETED (Verified via Node.js + Python 3.11 harness)`
- **Goal:** Replace the static calculation badge in Slide 19's results panel with a dynamic indicator (`#emotCalcEngineBadge`) that accurately reports whether the results were computed by **Python (Pyodide WebAssembly)** or the **JavaScript fallback engine**.
- **Affected Files:**
  - `index.html` (`#emotCalcEngineBadge` in Slide 19 results header)
  - `js/emotional_ad.js` (`renderResults()` updates `#emotCalcEngineBadge`)
- **Check for Success:**
  - Displays `חושב באמצעות Python` when Pyodide computes the result, and `חושב במנגנון גיבוי (JavaScript)` when the JS fallback runs.

---

### Stage 3: Two-Phase Exposure (`“דרגו את הרושם”`), Equal Defaults, Explicit Rating Confirmation (Including Midpoint `5/10`), and Randomized Ad Order
- **Status:** `COMPLETED (Verified via Node.js + Python 3.11 harness)`
- **Goal:** Eliminate pre-baked bias and implement a clean 5-step experiential flow:
  1. Show the first ad prominently under the neutral label `מודעה א׳` with a `“דרגו את הרושם”` button (`#btnRevealRatingA`).
  2. Reveal the three clearly labelled rating questions (`#ratingCardA`) when clicked.
  3. Require an explicit answer or confirmation for every rating before advancing, and allow users to select the midpoint (`5/10`) without moving a slider via the explicit `"אשר 5/10"` button (or by clicking the slider).
  4. Repeat the exact same flow for the second ad (`מודעה ב׳`, `#btnRevealRatingB`, `#ratingCardB`).
  5. Randomize presentation order (`['neutral', 'emotional']` vs. `['emotional', 'neutral']`) once per new activity (on load and on Restart), reveal the intended advertising approaches only **after** rating, keep results accurately mapped to each ad regardless of order, keep exposure controls identical across both ads, and disable automatic music.
- **Affected Files:**
  - `index.html` (Slide 19 step panels, neutral badges, `"דרגו את הרושם"` buttons, `"אשר 5/10"` controls)
  - `js/emotional_ad.js` (`randomizeAdOrder`, `revealRatingPanel`, `recordRating`, `syncRatingsByApproach`)
  - `css/style.css`
- **Check for Success:**
  - Both presentation orders (`['neutral', 'emotional']` and `['emotional', 'neutral']`) map ratings accurately to the factual (`ratingsA` / `ad_a`) and emotional (`ratingsB` / `ad_b`) conditions.
  - Advancing from Step 1 to Step 2 and from Step 2 to Step 3 is blocked until all 3 questions in the current step are explicitly confirmed.
  - Clicking `"אשר 5/10"` confirms the midpoint `5/10` without moving the slider.

---

### Stage 4: Dynamic Explanation & Expandable Methodological Limitations Reflecting the User's Actual Results
- **Status:** `COMPLETED (Verified via Node.js + Python 3.11 harness)`
- **Goal:** Make the Step 3 comparison and explanation reflect **only** the visitor's submitted ratings (equal ratings, factual ad rated higher, or emotional ad rated higher) while revealing which display label (`מודעה א׳` or `מודעה ב׳`) corresponded to each approach, and provide an expandable theoretical and methodological limitations drawer (`#emotTheoryDrawer`).
- **Affected Files:**
  - `index.html` (`#emotOrderRevealNote`, `#emotDynamicSummary`, `<details id="emotTheoryDrawer">`)
  - `js/emotional_ad.js` (`renderResults`, `updateDynamicSummary`)
- **Check for Success:**
  - Equal ratings, factual ad higher, and emotional ad higher each generate accurate, non-leading Hebrew summaries in `#emotDynamicSummary` in both display orders.
  - `#emotTheoryDrawer` explains how multiple differences in image/copy, prior brand familiarity with **Gritti Tutù**, and seeing both ads sequentially limit causal interpretation, and reiterates that this is an educational self-report activity, not a controlled study or measurement of real purchasing behavior.

---

### Stage 5: Review Hebrew Wording, Product Accuracy & Verify All Changes
- **Status:** `COMPLETED (Automated checks passed; open on local server for manual visual check)`
- **Goal:** Review all Hebrew copy in Slide 19 for natural RTL/BIDI formatting (`<bdi>`), verified **Gritti Tutù** product facts (`Extrait de Parfum, 100 ml, € 260`), clear temporary placeholder badges, laptop viewport fit, and end-to-end interactive behavior.
- **Affected Files:**
  - `index.html`
  - `js/emotional_ad.js`
  - `css/style.css`
  - `js/python_runner.js`
- **Check for Success:**
  - Automated test suite verifies equal ratings, factual higher, emotional higher, both display orders, midpoint `5/10` confirmation without slider movement, explicit rating gate, Python `Map` conversion, JS fallback, and laptop viewport layout fit.

---

### Stage 6 (Next Phase): Hybrid Video Advertisements + Separate Interactive Three.js 3D Product Viewer
- **Status:** `IN PRODUCTION / PLANNED — NOT YET INTEGRATED INTO PRESENTATION`
- **Specification Document:** [`docs/video-ad-production-plan.md`](video-ad-production-plan.md)
- **Goal:** Upgrade Slide 19 to a hybrid experience combining two ~25-second fixed-camera photorealistic video ads (**Ad A: Informational** and **Ad B: Emotional — "Before they call your name"** ending with `"עוד לפני שמכירים את השם שלך — יש לך סיפור."`) plus a separate interactive Three.js 3D product viewer (`js/perfume3d.js`) with drag-to-orbit, bounded zoom, and reset view made equally available after both ratings.
- **Honest Capability & Asset Status:**
  - **Video Ads:** Still in production externally and **not yet integrated** into the presentation (`index.html` / `js/emotional_ad.js`).
  - **3D Bottle Model:** Deferred until sufficient multi-angle reference views exist; no millimeter accuracy is claimed without verified physical measurements. The existing Three.js interactive brain scene on Slide 8 (`js/brain3d.js`) remains preserved.
  - **Existing Slide 19:** Preserved and working with the authentic official **Gritti Tutù** product images (`assets/images/gritti_tutu_01.jpg` and `assets/images/gritti_tutu_03.jpg`).

---

## Session Saving & Checkpoint Workflow
- Save files continuously during work and record every user prompt verbatim in `prompts/`.
- Clearly separate **completed**, **planned/in-production**, and **untested** work across `README.md`, `docs/`, and `prompts/`.
- After each completed, verified milestone, run quality/diff checks and create a clearly named checkpoint commit on `malak-improvments` (pushing normally to `origin/malak-improvments` without force-pushing or merging into `main`).
