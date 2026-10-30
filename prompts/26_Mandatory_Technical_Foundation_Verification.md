# Prompt 26 — Mandatory Technical Foundation Verification & Fixes (All 20 Slides, Three.js, Python Runtime, and Slide 19 Scenarios)

## 1. Verbatim User Prompt

```text
Continue from the existing lecturer-requirements audit. Complete the mandatory technical foundation before starting new visual redesign or video work.

Work in /Users/malakfaroji/SHM-2026 on malak-improvments. Confirm the path, branch, and git status first. Preserve all existing work.

1. Read docs/lecturer-requirements-checklist.md and the existing project instructions. Reuse valid test evidence instead of repeating completed checks unnecessarily.

2. Run the presentation and verify:
- All 20 slides can be reached using the navigation controls.
- The existing Three.js scene renders, animates, and responds to its intended controls.
- Python actually executes and its output reaches the presentation. A JavaScript fallback alone does not satisfy this check.
- Slide 19 calculations work for equal ratings, higher informational-ad ratings, and higher emotional-ad ratings.
- Relevant assets load and there are no blocking browser errors.

3. Fix any actual failures you find, keeping the current approved design and content. Preserve the existing 3D brain scene. Do not add a perfume model or generate videos during this milestone.

Use browser testing if available. If it is unavailable, perform the checks you can and clearly separate code inspection from runtime verification. Never mark an unperformed test as passed. Provide only the minimal manual steps needed for remaining checks.

4. Update the requirements checklist, README, and chronological prompt log with the actual changes and results. Save this prompt verbatim. Distinguish completed, planned, and untested work.

5. Review the diff and create a meaningful checkpoint commit if there are changes. Attempt a normal push to origin/malak-improvments. If authentication blocks it, stop retrying and tell me to use GitHub Desktop. Do not force-push or merge into main.

Proceed autonomously through routine project edits and checks without asking whether to continue. Respect application permission controls. Ask only if essential information is missing or a destructive or paid action is needed.

Finish with a short report:
- What passed.
- What you fixed.
- What remains unverified.
- Commit hash and push status.
- The next recommended milestone.
```

---

## 2. Actual Changes Made & Why (Bugs Found & Fixed)

During automated runtime verification of the presentation scripts against real Python 3.11.9 and Three.js r128, three actual runtime bugs were discovered and fixed:

1. **Pyodide `Map` Return-Type Mismatch on Slides 9, 10, 13, and 16 (`js/python_runner.js`, `js/prospect_theory.js`):**
   - **Problem Found:** While `window.calculateEmotionalAdPython` (Slide 19) had been fixed in Stage 1 to convert Pyodide's `Map` proxy into plain nested JavaScript objects via `mapToPlainObject(proxy.toJs({ dict_converter: Object.fromEntries }))`, the other four public Python helper functions (`window.calculateScarcityPython` on Slide 9, `window.calculateChoiceParadoxPython` on Slide 10, `window.calculateProspectPython` on Slide 13, and `window.calculateDarkPatternsPython` on Slide 16) still called `proxy.toJs()` directly and returned a `Map`.
   - Because `js/scarcity_sim.js` (`res.state_a.desire`), `js/choice_paradox.js` (`res.round1.time`), and `js/ethical_marketing.js` (`analysis.store_a.autonomy_score`) read properties via dot-notation (`.` rather than `.get()`), whenever Pyodide was `ready`, `res.state_a` and `res.round1` evaluated to `undefined` (throwing a `TypeError` on Slides 9 and 10) and `analysis.store_a` evaluated to `undefined` on Slide 16. Furthermore, on Slide 13 (`js/prospect_theory.js`), `window.calculateProspectPython(amount, isLoss)` was called without assigning its return value to update the UI.
   - **Fix Applied:**
     - Updated `window.calculateScarcityPython`, `window.calculateChoiceParadoxPython`, `window.calculateProspectPython`, and `window.calculateDarkPatternsPython` in [`js/python_runner.js`](../js/python_runner.js) to use `proxy.toJs({ dict_converter: Object.fromEntries })` + `mapToPlainObject(raw)` so all external slide controllers receive plain nested JS objects.
     - Updated [`js/prospect_theory.js`](../js/prospect_theory.js) (`updateUI()`) to consume the Python return value from `window.calculateProspectPython(amount, isLoss)` (`psychological_value`, `intensity`, `ratio`, `message`) when Pyodide is ready, falling back to local JS math only when Pyodide is still loading or offline.
     - Preserved `Map` `.get()` behavior inside `runAnchoringCalculation()` (Slide 14) and `window.verifyPythonExecution()`.

2. **Three.js Camera `NaN` Aspect Ratio When Initialized While Slide 8 Is Hidden (`js/brain3d.js`):**
   - **Problem Found:** When the presentation loads on Slide 1 (`#slide-1`), Slide 8 (`#slide-8`) has `display: none`, so `#brain3d-canvas-container` has `clientWidth === 0` and `clientHeight === 0`. In `js/brain3d.js` `init()`, `const aspect = container.clientWidth / container.clientHeight` evaluated to `0 / 0 = NaN`, initializing `THREE.PerspectiveCamera(45, NaN, 0.1, 100)` and `renderer.setSize(0, 0)`.
   - **Fix Applied:** Updated `init()` in [`js/brain3d.js`](../js/brain3d.js) to use safe fallback dimensions (`const initWidth = container.clientWidth || 640; const initHeight = container.clientHeight || 420;`) and scheduled `setTimeout(onWindowResize, 0)` alongside `onWindowResize()` when `slideChanged` activates Slide 8.

3. **Keyboard Slide Navigation Hijacking Focused Range Sliders and Buttons (`js/presentation.js`):**
   - **Problem Found:** The global `document.addEventListener('keydown', ...)` in `js/presentation.js` triggered `nextSlide()` / `prevSlide()` on `ArrowLeft`, `ArrowRight`, `ArrowUp`, `ArrowDown`, and `Space` (`' '`) even when a user had focused an interactive `<input type="range">` slider (Slides 8, 9, 10, 13, 14, 19) or `<button>`. Also, the fallback slide count on line 43 was `19` instead of `20`.
   - **Fix Applied:** Added a target guard in [`js/presentation.js`](../js/presentation.js) so arrow/space slide-navigation shortcuts do not fire when `e.target` is an `INPUT`, `TEXTAREA`, `SELECT`, `BUTTON`, `SUMMARY`, `A`, or `isContentEditable` element, and updated the fallback slide count to `20`.

---

## 3. Automated Runtime Verification vs. Live GUI Browser Verification

### Why Headless Chrome Could Not Attach in the CLI Sandbox
- Attempting to launch `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome --headless=new --remote-debugging-port=9229` inside the macOS CLI sandbox failed because Chrome's Crashpad handler is blocked from reading process memory (`mach_vm_read ... (os/kern) invalid address (1)`), preventing the DevTools WebSocket from binding.
- Therefore, we strictly separate **Automated Node.js + Local HTTP + Real CPython 3.11.9 Runtime Verification** (performed and passed) from **Live GUI Browser Verification** (which requires a quick manual check in your open browser window).

### A. What Was Verified Automatically (Node.js VM + Local HTTP Server + Real Python 3.11.9)
1. **All 27 Local Assets Over HTTP (`http://127.0.0.1:8000`):**
   - Verified `index.html` and all 27 referenced local assets (`css/style.css`, 17 images/SVGs in `assets/images/` including `gritti_tutu_01.jpg`, `gritti_tutu_02.jpg`, `gritti_tutu_03.jpg`, `js/vendor/three.min.js`, and all 9 modular JS scripts in `js/`) return `HTTP 200 OK` with non-zero byte lengths.
2. **All 20 Slides & Navigation Controls (`js/presentation.js`):**
   - Confirmed 20 `<section class="slide" id="slide-1">` .. `<section class="slide" id="slide-20">` elements in `index.html` and 20 generated TOC items in `#tocGrid`.
   - Stepped forward `1 → 20` via `#btnNext` (`btnNext.disabled === true` at Slide 20) and backward `20 → 1` via `#btnPrev` (`btnPrev.disabled === true` at Slide 1).
   - Verified TOC item click (`#tocGrid` item 19 → Slide 19), URL hash routing (`#slide-8` → Slide 8), keyboard `ArrowLeft` advancing slides when `BODY` is focused, and keyboard guard keeping the current slide unchanged when an `INPUT` slider is focused.
3. **Slide 8 Three.js 3D Brain Scene (`js/vendor/three.min.js` + `js/brain3d.js`):**
   - Verified scene creation (`THREE.Scene`, `THREE.PerspectiveCamera` with finite aspect ratio even when initialized at `0x0`, `1,400`-particle `THREE.Points` + inner wireframe `THREE.Mesh` + 6 hotspot meshes).
   - Stepped through 10 animation frames (`requestAnimationFrame`) and confirmed `brainGroup.rotation.y` advances smoothly (`-0.3996 → -0.37952`) and hotspot ring scales pulse.
   - Clicked all 4 brain region buttons (`pfc`, `amygdala`, `insula`, `nacc`) and verified `#brainRegionCard` updates with the corresponding Hebrew/English region title and triggers `AudioEngine.playRegionTone()`.
   - Verified `#btnToggleRotate` pauses (`"הפעל סיבוב"`) and resumes (`"עצור סיבוב"`), and `#btnResetView` resets camera/rotation and re-selects `PFC`.
4. **Real Python Execution Across All 6 Python-Powered Slides (`js/python_runner.js` + Python 3.11.9):**
   - Wired `js/python_runner.js` in Node VM to execute `PYTHON_SCRIPTS` in a real local `python3` (`Python 3.11.9`) subprocess returning Pyodide-faithful `Map` proxies:
     - `verifyPythonExecution()` → `isPythonRunning: true`, `pythonVersion: "3.11.9"`, `executedBy: "Pyodide CPython WebAssembly"`.
     - **Slide 9 (`js/scarcity_sim.js`):** Rendered Python output `4/10` vs `8/10` (`+4 נקודות (+100%)`).
     - **Slide 10 (`js/choice_paradox.js`):** Rendered Python output `3.2 שניות` vs `9.8 שניות` (`זמן ההחלטה התארך פי 3.06!`).
     - **Slide 13 (`js/prospect_theory.js`):** Rendered Python output for `- ₪ 200` loss → `- 238.3 נקודות` (`הפסד כואב פי 2.25!`).
     - **Slide 14 (`js/python_runner.js`):** Rendered Python output for `₪ 850` anchor on `₪ 399` base → `₪ 534.30`, `+ ₪ 135.30`, `+33.9%`.
     - **Slide 16 (`js/ethical_marketing.js`):** Rendered Python ethics analysis showing `Pyodide CPython WebAssembly` and `35%` autonomy score for Store B.
5. **Slide 19 (`js/emotional_ad.js`) Across All 3 Required Rating Scenarios (Backed by Real Python):**
   - **Equal Ratings (`5/5/5` vs. `5/5/5` using `"אשר 5/10"` midpoint buttons):**
     - Engine badge: `"חושב באמצעות Python"`
     - Bars: `5/10` vs `5/10`; Diffs: `0 נקודות (0%)` across Emotion, Brand, and Intent.
     - Summary accurately reports equal overall scores between the informational and emotional presentations.
   - **Higher Informational-Ad Ratings (`8/9/8` Info vs. `5/5/4` Emotional, tested with randomized `emotional_first` order):**
     - Engine badge: `"חושב באמצעות Python"`
     - Correctly maps randomized presentation order back to Informational (`8/10`, `9/10`, `8/10`) vs. Emotional (`5/10`, `5/10`, `4/10`); Diffs: `-3 נקודות (-37.5%)`, `-4 נקודות (-44.4%)`, `-4 נקודות (-50%)`.
     - Summary accurately states that the informational presentation (shown as Ad B) received a higher overall score than the emotional presentation (Ad A).
   - **Higher Emotional-Ad Ratings (`4/5/4` Info vs. `9/8/7` Emotional, tested with `neutral_first` order):**
     - Engine badge: `"חושב באמצעות Python"`
     - Bars: `4/10`, `5/10`, `4/10` vs. `9/10`, `8/10`, `7/10`; Diffs: `+5 נקודות (+125%)`, `+3 נקודות (+60%)`, `+3 נקודות (+75%)`.
     - Summary accurately states that the emotional presentation (shown as Ad B) received a higher overall score than the informational presentation (Ad A).

### B. What Remains Unverified in a Live GUI Browser (Minimal Manual Steps)
1. **Live GPU WebGL Visual Rendering on Slide 8:**
   - Open `http://127.0.0.1:8000/index.html#slide-8` in Chrome/Edge/Safari, confirm the 3D particle brain is visibly rotating, drag the canvas, and click a region button (`PFC` / `אמיגדלה`).
2. **Live CDN Pyodide Download in Browser:**
   - Open `http://127.0.0.1:8000/index.html#slide-19`, open DevTools Console (`F12`), run `verifyPythonExecution()`, and confirm `isPythonRunning: true` and that Slide 19's results badge displays `"חושב באמצעות Python"`.
