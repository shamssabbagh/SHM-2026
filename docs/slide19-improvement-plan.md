# Slide 19 Improvement Plan: Emotional vs. Neutral Advertising Lab

- **Project:** The Consumer Brain (`SHM-2026`)
- **Branch:** `malak-improvments`
- **Overall Status:** `PLANNED` (No application code changes implemented yet)

---

## Methodological & Scientific Guardrails

- **Self-Report Measures Only:** Both *brand attitude / connection* (`חיבור ועמדה כלפי המותג`) and *purchase intention* (`כוונת קנייה מוצהרת`) in Slide 19 are **self-reported ratings**, not observed or measured purchasing behavior.
- **Terminology:** Any difference between self-reported brand attitude and self-reported purchase intention must be described accurately as a gap between **self-reported attitude and declared purchase intention**, not as measured purchasing behavior.
- **No Causal Claims:** This interactive exercise is a single-user educational demonstration. It does **not** prove causation or replace a controlled empirical experiment.

---

## Staged Implementation Plan

### Stage 1: Fix the Python `Map`-to-JavaScript Conversion for Slide 19 Without Breaking Other Slides
- **Status:** `PLANNED`
- **Goal:** Ensure Python results returned by `calculate_emotional_ad_comparison` via Pyodide (`proxy.toJs()`) are properly converted or read as plain JavaScript objects for Slide 19, while leaving all other slides (`slide-9`, `slide-10`, `slide-13`, `slide-14`, `slide-16`) and `verifyPythonExecution()` completely intact.
- **Affected Files:**
  - `js/python_runner.js`
  - `js/emotional_ad.js`
- **Check for Success:**
  - When Pyodide is loaded and ready, completing Slide 19 updates all comparison bars, numeric labels, and badges in Step 3 without throwing `TypeError: Cannot read properties of undefined`.
  - Calling `verifyPythonExecution()` in the browser console still succeeds for all 6 models, and Slides 9, 10, 13, 14, and 16 continue to work without regressions.

---

### Stage 2: Display the Actual Calculation Engine (Python or JavaScript)
- **Status:** `PLANNED`
- **Goal:** Replace the static calculation badge in Slide 19's results panel with a dynamic indicator that accurately reports whether the results were computed by **Python (Pyodide WebAssembly)** or the **JavaScript fallback engine**.
- **Affected Files:**
  - `index.html` (Slide 19 results header badge)
  - `js/emotional_ad.js`
  - `js/python_runner.js` (if engine metadata is passed in the result object)
- **Check for Success:**
  - When Pyodide is active and computes the result, the Slide 19 badge clearly states that Python performed the calculation.
  - When Pyodide is unavailable or still loading and the fallback runs, the badge accurately states that the JavaScript fallback performed the calculation.

---

### Stage 3: Equal Rating Defaults, Explicit Ratings Requirement, and Randomized Ad Order
- **Status:** `PLANNED`
- **Goal:** Eliminate pre-baked bias in the interface by:
  1. Starting both the neutral ad and the emotional ad with identical neutral default slider positions (e.g., `5/10` across all three sliders for both ads) instead of `4, 4, 3` vs. `8, 8, 6`.
  2. Requiring the user to explicitly interact with / confirm ratings in each step before advancing to the next step or viewing results.
  3. Randomizing which ad (Neutral vs. Emotional) is presented first in Step 1 and Step 2, updating step labels/trackers accordingly while mapping ratings back to the correct ad (`neutral` vs. `emotional`) for comparison.
- **Affected Files:**
  - `index.html` (Slide 19 step panels, slider defaults, tracker labels, and prompt/notice elements)
  - `js/emotional_ad.js`
  - `css/style.css` (optional styling for disabled/unrated states if needed)
- **Check for Success:**
  - Both ads initialize with equal default values on load and after clicking "Restart".
  - Users cannot advance from Step 1 to Step 2, or from Step 2 to Step 3, until they have explicitly rated the current ad's sliders.
  - Reloading or restarting the simulation randomly assigns either the neutral ad or the emotional ad to appear first, and Step 3 still attributes each rating to the right ad.

---

### Stage 4: Dynamic Explanation Reflecting the User's Actual Results
- **Status:** `PLANNED`
- **Goal:** Make the Step 3 analysis and summary dynamically reflect the user's actual ratings—whether the user rated the emotional ad higher, gave both ads equal scores, or preferred the neutral/factual ad—while strictly describing the ratings as **self-reported brand attitude** and **self-reported purchase intention** (never as measured buying behavior or proof of causation).
- **Affected Files:**
  - `index.html` (Slide 19 results insights section)
  - `js/emotional_ad.js`
  - `js/python_runner.js`
- **Check for Success:**
  - Testing three scenarios (emotional > neutral, emotional == neutral, neutral > emotional) produces tailored, accurate Hebrew explanations matching the user's actual numbers.
  - The explanation accurately discusses any difference between self-reported brand connection and self-reported purchase intention without claiming actual purchase behavior was measured or that causation was proven.

---

### Stage 5: Review Hebrew Wording and Verify All Changes
- **Status:** `PLANNED`
- **Goal:** Review all Hebrew copy in Slide 19 for clarity, natural RTL/BIDI formatting (`<bdi>`), and methodological accuracy (self-report vs. behavior, educational demonstration vs. controlled study), and verify all interactive flows end-to-end.
- **Affected Files:**
  - `index.html`
  - `js/emotional_ad.js`
  - `js/python_runner.js`
- **Check for Success:**
  - All Hebrew text in Slide 19 is grammatically natural, clear, properly aligned in RTL, and methodologically accurate.
  - End-to-end verification confirms all 5 stages work smoothly in both Python (Pyodide) and JavaScript fallback modes without console errors.
