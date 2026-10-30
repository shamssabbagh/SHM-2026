# Lecturer Requirements Checklist (Lesson 2 Summary, Section 11, Pages 21–23)

- **Project:** The Consumer Brain: The Psychology Behind Purchasing Decisions (`SHM-2026`)
- **Institution & Course:** University of Haifa — AI Agents & Vibe Coding (Assignment 1)
- **Students:** Shams Sabag (Psychology) & Malak Faroji (Communication & Marketing)
- **Branch Audited:** `malak-improvments`
- **Audit Timestamp:** October 30, 2026 (`21:38 +02:00` — Updated after Slide 8 Interactive 3D Controls & Editorial Redesign in Prompt 28)
- **Future Slide Visual Design Standard:** For every slide worked on in future tasks, review and improve its visual design—including colors (`#F7F3ED` warm ivory, `#502638` deep burgundy, `#EBD9DF` soft blush, `#D85B49` coral, `#252329` charcoal), layout, imagery, and overall experience—while keeping lecturer requirements, Hebrew RTL layout, and factual accuracy intact.

---

## Summary Table of the 9 Lecturer Requirements

| # | Lecturer Requirement (Lesson 2, Sec. 11, pp. 21–23) | Audit Status | Primary File Evidence | Key Notes & Action Needed |
| :---: | :--- | :---: | :--- | :--- |
| **1** | **An HTML presentation related to our field of study** (~20 slides sufficient) | **VERIFIED** | `index.html`, `css/style.css`, `js/presentation.js` | All 20 slides (`#slide-1` to `#slide-20`) verified reachable via `#btnNext`, `#btnPrev`, `#tocModal`, URL hash (`#slide-1`..`#slide-20`), and keyboard arrows (with input/slider focus guard + `body.editorial-active` class toggle in `js/presentation.js`). All local assets return `HTTP 200 OK` with `Cache-Control: no-store`. |
| **2** | **A 3D animated scene/movie embedded in the presentation** (ordinary MP4 ads do not replace this requirement) | **PARTIALLY VERIFIED (Safari Auto-Rotation Manually Confirmed by User; 85,219-Triangle Anatomical 3D Brain, 2-Axis Mouse/Touch Drag, Wheel/Pinch/Button Zoom, Cutaway Transparency, 3D Pathways & Editorial Palette Verified in Runtime Harness; Live Browser Drag/Zoom/Region Check Still Pending Manual Confirmation)** | `index.html` (`#slide-8`), `js/brain3d.js`, `js/vendor/brain_mesh_data.js`, `assets/models/brain_fsaverage_dk.json`, `js/vendor/three.min.js`, `js/audio.js`, `css/style.css` | **User manually confirmed in Safari:** Slide 8 rotates automatically.<br>**Upgraded in Prompt 28:** Upgraded to `85,219` triangles (`lh`: `16,343` vertices / `37,270` faces; `rh`: `16,291` vertices / `37,353` faces; plus 4 co-registered regions) from **Brainder.org** (`CC BY-SA 3.0`), added 2-axis camera-relative orbit drag (mouse + 1-finger touch), wheel/trackpad zoom + 2-finger pinch zoom (`[2.65, 6.20]`), visible zoom controls (`#btnZoomIn`, `#btnZoomOut`, `#brainZoomReadout`), 6 3D neural pathway tubes & animated signal pulses, Hebrew drag/zoom instruction banner (`#brainInteractionGuide`), and replaced all legacy dark navy/neon Slide 8 CSS rules in `css/style.css` with the warm editorial palette (`#F7F3ED`, `#502638`, `#EBD9DF`, `#D85B49`, `#252329`).<br>**Note on Slide 19:** Two ~25s AI video ads remain in production, and the optional Slide 19 3D perfume bottle model remains deferred. |
| **3** | **Python code that actually runs and contributes to the presentation or controls part of its flow** | **PARTIALLY VERIFIED (All 6 Python Models & UI Integration on Slides 9, 10, 13, 14, 16, 19 Verified With Real Python 3.11.9; Live Browser CDN Pyodide Download Still Not Manually Confirmed)** | `js/python_runner.js`, `js/scarcity_sim.js`, `js/choice_paradox.js`, `js/prospect_theory.js`, `js/ethical_marketing.js`, `js/emotional_ad.js` | Fixed Pyodide `Map` → plain JS object conversion across `calculateScarcityPython` (Slide 9), `calculateChoiceParadoxPython` (Slide 10), `calculateProspectPython` (Slide 13), `calculateDarkPatternsPython` (Slide 16), and `calculateEmotionalAdPython` (Slide 19), while keeping `Map` `.get()` on Slide 14 and `verifyPythonExecution()`. Verified Slide 19 with real Python for equal ratings (`5/5/5`), higher informational ratings (`8/9/8` vs `5/5/4`), and higher emotional ratings (`4/5/4` vs `9/8/7`). |
| **4** | **A `PRD.md` describing the planned scope and implementation** | **VERIFIED** | `PRD.md`, `docs/visual-redesign-plan.md`, `docs/slide19-improvement-plan.md`, `docs/video-ad-production-plan.md` | `PRD.md` (v2.1) documents the 20 slides, 7 interactive labs, Three.js scene, and 6 Python models, plus Section 11 documenting the `malak-improvments` editorial pilot, official `Gritti Tutù` (`SKU: DGB00600`) images, and unfinished/deferred Slide 19 media. |
| **5** | **A GitHub repository accessible to both students and the lecturer** | **REQUIRES MANUAL VERIFICATION** | `.git/config` (`origin`: `https://github.com/shamssabbagh/SHM-2026.git`) | Remote URL is configured and reachable (`git ls-remote`), but repository visibility/collaborator permissions for both students and the lecturer must be verified manually on GitHub. |
| **6** | **Meaningful intermediate pushes, each explaining what changed** | **VERIFIED (On `main` and `origin/malak-improvments`; Latest Checkpoint Committed Locally for GitHub Desktop Push)** | Git history (`git log`), `origin/main`, `origin/malak-improvments` | Commits `f9d5af6`, `25b717c`, `2d19ea8`, and `8cb62c0` are verified on `origin/malak-improvments`. Prompts 27 and 28 are committed locally on `malak-improvments` for pushing via GitHub Desktop. |
| **7** | **A `README.md` explaining the project and its parts, updated with every push** | **VERIFIED (Kept Updated on Every Milestone; Slide 1, 8, & 19 Screenshots Planned for Refresh)** | `README.md`, `docs/screenshots/` | `README.md` explains the project purpose, all 20 slides, Three.js anatomical brain (`Brainder.org`, `CC BY-SA 3.0`) + interactive controls + optional Web Audio synthesizer, Pyodide Python verification, visual assets (`gritti_tutu_01..03.jpg`), prompt history links (`01`–`28`), and current limitations. |
| **8** | **A saved and uploaded chronological prompt history** | **VERIFIED (Saved Chronologically in `prompts/01`–`28`)** | `prompts/01_PRD_Planning.md` through `prompts/28_Slide8_Interactive_3D_Controls_And_Editorial_Redesign.md` | All 28 chronological prompt files are saved in `prompts/` with verbatim user prompts and honest summaries of changes, tests, and remaining work. |
| **9** | **Final Moodle submission using the provided Word form: both students’ names, IDs, and GitHub link, exported to PDF** | **MISSING (External Final Submission Step)** | Not in repository (external Word -> PDF form for Moodle) | Must be completed by Shams Sabag and Malak Faroji at final submission time using the lecturer's Word template, filling in both students' names, student ID numbers (`ת.ז.`), and the GitHub repository URL, then exporting to PDF and uploading to Moodle. |

---

## Detailed Audit & Test Evidence by Requirement

### Requirement 1: An HTML Presentation Related to Our Field of Study (~20 Slides)
- **Status:** `VERIFIED`
- **File Paths:**
  - [`index.html`](../index.html) (2,074 lines, 20 `<section class="slide" id="slide-1">` ... `<section class="slide" id="slide-20">`)
  - [`css/style.css`](../css/style.css) (5,121 lines)
  - [`js/presentation.js`](../js/presentation.js) (keyboard navigation, buttons, progress bar, Table of Contents modal `#tocModal`, swipe gestures, and URL hash routing `#slide-1`..`#slide-20`)
- **Test Evidence:**
  - Verified exact count of 20 `<section class="slide"` elements in `index.html` and 20 TOC entries in `#tocGrid`.
  - Automated runtime navigation verification (`js/presentation.js` in Node VM): stepped forward `1 → 20` via `#btnNext` (`btnNext.disabled === true` at Slide 20), backward `20 → 1` via `#btnPrev` (`btnPrev.disabled === true` at Slide 1), TOC jump to Slide 19, URL hash `#slide-8` jump to Slide 8, and verified keyboard arrow navigation does **not** hijack focused `<input>` sliders or `<button>` controls.
  - Verified all 27 local assets referenced in `index.html` return `HTTP 200 OK` with non-zero byte sizes over `http://127.0.0.1:8000`.
  - Verified interdisciplinary academic alignment: Cognitive & Behavioral Psychology (Dual-Process Theory, Visual Attention, Sensory Marketing, Somatic Markers, Associative Memory, Scarcity, Choice Overload, Decoy Effect, Social Proof, Prospect Theory, Anchoring, Pain of Paying) combined with Marketing Strategy & Consumer Ethics (Dark Patterns vs. Ethical Nudge, AI Shopping Agents, Emotional vs. Informational Advertising with **Gritti Tutù**).
  - Verified `node --check js/*.js` passes with zero syntax errors across all 9 JS modules.

---

### Requirement 2: A 3D Animated Scene/Movie Embedded in the Presentation
- **Status:** `PARTIALLY VERIFIED (Safari Auto-Rotation Manually Confirmed by User; 85,219-Triangle Anatomical 3D Brain, 2-Axis Mouse/Touch Drag, Wheel/Pinch/Button Zoom, Cutaway Transparency, 3D Pathways & Editorial Palette Verified in Runtime Harness; Live Browser Drag/Zoom/Region Check Pending Manual Confirmation)`
- **File Paths:**
  - [`index.html`](../index.html) (`#slide-8.editorial-pilot`, lines 220–337: `#brain3d-canvas-container`, `.brain-region-btn`, `#btnToggleRotate`, `#btnZoomIn`, `#brainZoomReadout`, `#btnZoomOut`, `#btnToggleCutaway`, `#btnResetView`, `#btnToggleSound`, `#brainInteractionGuide`, `#brainRegionCard`)
  - [`js/brain3d.js`](../js/brain3d.js)
  - [`js/vendor/brain_mesh_data.js`](../js/vendor/brain_mesh_data.js) & [`assets/models/brain_fsaverage_dk.json`](../assets/models/brain_fsaverage_dk.json) (Openly licensed 3D human brain anatomy from **Brainder.org — "Brain for Blender"** by Dr. Anderson M. Winkler, MD, PhD, `CC BY-SA 3.0`, derived from **FreeSurfer** *Fischl, 2012*, **Desikan-Killiany Atlas** *Desikan et al., 2006*, and **ASEG** *Fischl et al., 2002*)
  - [`js/vendor/three.min.js`](../js/vendor/three.min.js) (`603 KB` local Three.js r128 WebGL library)
  - [`js/audio.js`](../js/audio.js) (Optional procedural Web Audio API ambient synthesizer — silent by default, region tones removed)
- **How the Three.js Scene Is Built, Animated & Verified (`js/brain3d.js`):**
  1. **Manual Browser Observation Recorded:**
     - The user manually confirmed in **Safari** that **Slide 8 rotates automatically**. Dragging, zoom controls, region interaction, cutaway toggle, and live browser Pyodide execution are not yet manually confirmed in the browser.
  2. **3D Anatomical Geometry, Pathways & Cutaway Transparency (`createBrainGeometry`, `createNetworkPathways`, `createHotspots`):**
     - Renders left (`lh`: `16,343` vertices / `37,270` triangles) and right (`rh`: `16,291` vertices / `37,353` triangles) cerebral hemispheres with smooth vertex normals and per-vertex sulcal/gyral fold shading (`sulc` concavity), plus 4 co-registered 3D anatomical region meshes (`pfc` = `6,496` triangles, `amygdala` = `1,461` triangles, `insula` = `1,590` triangles, `nacc` = `1,049` triangles — total `85,219` triangles), 6 3D neural pathway tubes (`THREE.CatmullRomCurve3` + `THREE.TubeGeometry`) with animated signal pulses, and bilateral callout markers.
     - **Cutaway / Cortical Transparency:** Selecting a deep region (`amygdala`, `insula`, `nacc`) or clicking `#btnToggleCutaway` transitions the outer cortical hemispheres to translucent cutaway mode (`opacity: 0.22`, `depthWrite: false`), revealing the true internal stereotaxic positions of the Amygdala, Insula, and Nucleus Accumbens rather than placing them on the outer cortex.
  3. **Interactive Controls & Automated Runtime Verification (`animate()`):**
     - Verified in Node VM + `three.min.js`: 10-frame auto-rotation (`-0.5395 → -0.5171`), 2-axis mouse drag rotation (`mouseDragChangedBothAxes: true` + `autoRotatePausedOnDrag: true`), 1-finger touch drag (`touchDragChangedBothAxes: true`), 2-finger pinch zoom (`pinchZoomDecreasedCamZ: true`), visible zoom buttons (`#btnZoomIn` → `112%`, `#btnZoomOut` → `91%`) and wheel zoom clamping (`[2.65, 6.20]`), cutaway opacity transition (`0.96 → 0.22`), silent-by-default audio (`silentByDefault: true`), pause/resume (`#btnToggleRotate`), and reset view (`#btnResetView` → `100%`).
- **Important Distinction Regarding Slide 19 Media:**
  - The lecturer specifies that ordinary `.mp4` ads do **not** replace the 3D animated scene requirement. Our project satisfies Requirement 2 via **Slide 8's interactive Three.js 3D brain scene**.
  - On **Slide 19**, the two planned ~25-second AI video ads (*Informational* and *Emotional — "Before they call your name"*) are **still in production and have not yet been integrated into the presentation**.
  - The optional separate Three.js 3D perfume bottle viewer proposed for Slide 19 (`docs/video-ad-production-plan.md`) is **not completed (deferred until multi-angle reference views exist)** and is **not** marked as completed.

---

### Requirement 3: Python Code That Actually Runs and Contributes to the Presentation
- **Status:** `PARTIALLY VERIFIED (All 6 Python Models & UI Integration on Slides 9, 10, 13, 14, 16, 19 Verified With Real Python 3.11.9; Live Browser CDN Pyodide Execution Requires Manual Check)`
- **File Paths:**
  - [`js/python_runner.js`](../js/python_runner.js) (embeds `PYTHON_SCRIPTS` on lines 21–269)
  - [`js/scarcity_sim.js`](../js/scarcity_sim.js) (Slide 9 caller)
  - [`js/choice_paradox.js`](../js/choice_paradox.js) (Slide 10 caller)
  - [`js/prospect_theory.js`](../js/prospect_theory.js) (Slide 13 caller)
  - [`js/ethical_marketing.js`](../js/ethical_marketing.js) (Slide 16 caller)
  - [`js/emotional_ad.js`](../js/emotional_ad.js) (Slide 19 caller)
- **Strict Distinction Between Real Python Execution and JavaScript Fallback:**
  1. **Real Python Execution (`Pyodide WebAssembly CPython v3.11`):**
     - `initPyodide()` (`js/python_runner.js#L297-L339`) loads `https://cdn.jsdelivr.net/pyodide/v0.25.1/full/pyodide.js` when the user navigates to Slide 9, 10, 13, 14, 16, or 19 (or clicks `#btnRunPythonAnchoring` on Slide 14), initializes the WebAssembly CPython runtime, and executes `await state.pyodide.runPythonAsync(PYTHON_SCRIPTS)`.
     - **Slide 14 (`runAnchoringCalculation`, lines 363–394):** Has **NO JavaScript fallback**. If Pyodide is not `ready`, Slide 14 dims the output container (`disabled-dim`) and displays `—`. Moving `#anchorSlider` or clicking `#btnRunPythonAnchoring` executes `state.pyodide.runPython("calculate_anchoring(399, anchorVal)")` directly in Python and updates the bar chart heights and shekel outputs from the Python dictionary.
     - **Slides 9, 10, 13, 16, and 19:** Each slide's controller calls `window.calculateScarcityPython`, `window.calculateChoiceParadoxPython`, `window.calculateProspectPython`, `window.calculateDarkPatternsPython`, or `window.calculateEmotionalAdPython` first. When `state.status === 'ready'`, the calculation runs in CPython WebAssembly.
     - **Unified Pyodide `Map` → Plain JS Object Conversion Verified Across All External Callers (`js/python_runner.js`):**
       - `window.calculateScarcityPython` (Slide 9), `window.calculateChoiceParadoxPython` (Slide 10), `window.calculateProspectPython` (Slide 13), `window.calculateDarkPatternsPython` (Slide 16), and `window.calculateEmotionalAdPython` (Slide 19) all convert Pyodide's returned `Map` proxy into plain nested JavaScript objects via `{ dict_converter: Object.fromEntries }` and `mapToPlainObject(raw)`, while preserving `Map` `.get()` inside `runAnchoringCalculation()` (Slide 14) and `verifyPythonExecution()`.
       - `js/prospect_theory.js` (`updateUI()`) directly consumes the Python return value from `window.calculateProspectPython(amount, isLoss)` when Pyodide is ready.
  2. **JavaScript Fallback Path (When Offline or Before Pyodide Finishes Loading):**
     - On Slides 9, 10, 13, 16, and 19, if `state.pyodide` is `null` or `state.status !== 'ready'`, the wrapper returns `null` (or a fallback object in `calculateDarkPatternsPython`) and the slide controller computes the same mathematical formula in JavaScript so the user interface does not break offline.
     - On **Slide 19**, `#emotCalcEngineBadge` (`js/emotional_ad.js#L502-L511`) explicitly tells the user which engine actually ran:
       - When Python runs: `"חושב באמצעות Python"`
       - When JS fallback runs: `"חושב במנגנון גיבוי (JavaScript)"`
  3. **Test Evidence Executed in This Audit (Prompt 25 & Prompt 26):**
     - Executed `js/python_runner.js` + `js/scarcity_sim.js` + `js/choice_paradox.js` + `js/prospect_theory.js` + `js/ethical_marketing.js` + `js/emotional_ad.js` in a Node.js VM wired to a real **Python 3.11.9** subprocess (`python3`) returning Pyodide-faithful `Map` proxies:
       - `verifyPythonExecution()` → `isPythonRunning: true`, `pythonVersion: "3.11.9"`
       - **Slide 9 (Scarcity):** Rendered Python output `4/10` vs `8/10` (`+4 נקודות (+100%)`)
       - **Slide 10 (Choice Paradox):** Rendered Python output `3.2 שניות` vs `9.8 שניות` (`זמן ההחלטה התארך פי 3.06!`)
       - **Slide 13 (Prospect Theory):** Rendered Python output for `- ₪ 200` loss → `- 238.3 נקודות` (`הפסד כואב פי 2.25!`)
       - **Slide 14 (Anchoring):** Rendered Python output for `₪ 850` anchor on `₪ 399` base → `₪ 534.30`, `+ ₪ 135.30`, `+33.9%`
       - **Slide 16 (Dark Patterns):** Rendered Python ethics analysis showing `Pyodide CPython WebAssembly` and `35%` autonomy score for Store B
       - **Slide 19 (Emotional vs. Informational Advertising — 3 Scenarios Verified With Real Python):**
         1. *Equal ratings (`5/5/5` vs. `5/5/5` via `"אשר 5/10"` midpoint buttons):* Badge `"חושב באמצעות Python"`, diffs `0 נקודות (0%)`, equal-score summary.
         2. *Higher informational-ad ratings (`8/9/8` Info vs. `5/5/4` Emotional, tested with randomized `emotional_first` order):* Badge `"חושב באמצעות Python"`, diffs `-3 נקודות (-37.5%)`, `-4 נקודות (-44.4%)`, `-4 נקודות (-50%)`, summary accurately credits the informational presentation.
         3. *Higher emotional-ad ratings (`4/5/4` Info vs. `9/8/7` Emotional, tested with `neutral_first` order):* Badge `"חושב באמצעות Python"`, diffs `+5 נקודות (+125%)`, `+3 נקודות (+60%)`, `+3 נקודות (+75%)`, summary accurately credits the emotional presentation.
     - **Manual Browser Check Needed:** Open `http://127.0.0.1:8000/index.html#slide-14` and `#slide-19` with internet access, open DevTools Console (`F12`), and run `verifyPythonExecution()` to confirm live in-browser CDN Pyodide execution (`isPythonRunning: true`).

---

### Requirement 4: A `PRD.md` Describing the Planned Scope and Implementation
- **Status:** `VERIFIED (Updated to v2.1 with Current Branch Addendum)`
- **File Paths:**
  - [`PRD.md`](../PRD.md)
  - Supporting design/stage specs in [`docs/slide19-improvement-plan.md`](slide19-improvement-plan.md), [`docs/visual-redesign-plan.md`](visual-redesign-plan.md), [`docs/content-audit.md`](content-audit.md), and [`docs/video-ad-production-plan.md`](video-ad-production-plan.md).
- **Evidence:** `PRD.md` contains full functional/non-functional requirements, the 20-slide table, 7 interactive lab specs, Three.js and Web Audio specs, and Python integration specs, updated with Section 11 documenting the `malak-improvments` editorial redesign pilot and **Gritti Tutù** update on Slides 1 & 19.

---

### Requirement 5: A GitHub Repository Accessible to Both Students and the Lecturer
- **Status:** `REQUIRES MANUAL VERIFICATION`
- **File Paths:** `.git/config` (`remote.origin.url = https://github.com/shamssabbagh/SHM-2026.git`)
- **Evidence & Manual Check Required:**
  - Confirm on `https://github.com/shamssabbagh/SHM-2026` that:
    1. Both **Shams Sabag** and **Malak Faroji** (`malakfaroji-7`) have collaborator write access.
    2. The repository is either **Public** or the course lecturer has been granted access.

---

### Requirement 6: Meaningful Intermediate Pushes, Each Explaining What Changed
- **Status:** `VERIFIED (Commits Pushed on main and origin/malak-improvments; Latest Checkpoint Ready for Push)`
- **Evidence:**
  - Previous commits on `main` (`b594440` through `cbc0433`, 14 commits) and `origin/malak-improvments` (`f9d5af6`, `25b717c`, and `2d19ea8`) are verified on GitHub (`git ls-remote origin refs/heads/malak-improvments`) with clear messages.
  - This technical-foundation verification checkpoint commit is saved on `malak-improvments` with a descriptive commit message.

---

### Requirement 7: A `README.md` Explaining the Project and Its Parts, Updated With Every Push
- **Status:** `VERIFIED`
- **File Paths:** [`README.md`](../README.md)
- **Evidence:** `README.md` documents the project's academic purpose, visual showcase (`docs/screenshots/`), Three.js 3D brain & Web Audio synthesizer, Pyodide CPython engine & `verifyPythonExecution()`, 20-slide overview table, technology stack, how-to-run instructions, visual assets (including official `gritti_tutu_01..03.jpg` credits), chronological prompt logs (`01`–`26`), and current status/limitations on `malak-improvments`.

---

### Requirement 8: A Saved and Uploaded Chronological Prompt History
- **Status:** `VERIFIED (Saved Chronologically in prompts/01..28)`
- **File Paths:**
  - `prompts/01_PRD_Planning.md` through `prompts/26_Mandatory_Technical_Foundation_Verification.md` (verified pushed on `origin/malak-improvments` at `8cb62c0`)
  - `prompts/27_Slide8_Anatomical_3D_Brain_And_Editorial_Upgrade.md` and `prompts/28_Slide8_Interactive_3D_Controls_And_Editorial_Redesign.md` (committed locally on `malak-improvments`).

---

### Requirement 9: Final Moodle Submission Using the Provided Word Form (Exported to PDF)
- **Status:** `MISSING (External Final Submission Step)`
- **What Is Required Before Final Submission:**
  1. Open the lecturer's official Word submission form.
  2. Fill in both students' full names (**שמס סבאג** & **מלאק פרוג'ה**), both student ID numbers (`ת.ז.`), and the GitHub repository link (`https://github.com/shamssabbagh/SHM-2026`).
  3. Export the completed Word form to `.pdf` and upload it to Moodle.
