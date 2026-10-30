# Lecturer Requirements Checklist (Lesson 2 Summary, Section 11, Pages 21–23)

- **Project:** The Consumer Brain: The Psychology Behind Purchasing Decisions (`SHM-2026`)
- **Institution & Course:** University of Haifa — AI Agents & Vibe Coding (Assignment 1)
- **Students:** Shams Sabag (Psychology) & Malak Faroji (Communication & Marketing)
- **Branch Audited:** `malak-improvments`
- **Audit Timestamp:** October 30, 2026 (`19:30 +02:00`)

---

## Summary Table of the 9 Lecturer Requirements

| # | Lecturer Requirement (Lesson 2, Sec. 11, pp. 21–23) | Audit Status | Primary File Evidence | Key Notes & Action Needed |
| :---: | :--- | :---: | :--- | :--- |
| **1** | **An HTML presentation related to our field of study** (~20 slides sufficient) | **VERIFIED** | `index.html`, `css/style.css`, `js/presentation.js` | 20 slides (`#slide-1` to `#slide-20`) integrating Cognitive/Behavioral Psychology (Shams) and Marketing/Advertising (Malak). Slides 1 & 19 use the new warm editorial pilot (`Gritti Tutù`); Slides 2–18 & 20 use the existing dark theme (`PLANNED` for editorial redesign). |
| **2** | **A 3D animated scene/movie embedded in the presentation** (ordinary MP4 ads do not replace this requirement) | **PARTIALLY VERIFIED (Code & Asset Verified; Live WebGL Requires Manual Browser Check)** | `index.html` (`#slide-8`), `js/brain3d.js`, `js/vendor/three.min.js`, `js/audio.js`, `docs/screenshots/slide8_brain3d.png` | **Slide 8** embeds a real-time animated Three.js WebGL 3D brain scene (`requestAnimationFrame` loop, 1,400-particle dual-hemisphere point cloud, wireframe core, 6 pulsing 3D region hotspots, drag-to-orbit, zoom, raycasting, and Web Audio frequency synthesis).<br>**Note on Slide 19:** The two planned ~25s AI video ads are **still in production and not integrated**, and the optional Slide 19 3D perfume bottle viewer is **not completed (deferred)**. Slide 8's Three.js brain scene is what fulfills Requirement 2. |
| **3** | **Python code that actually runs and contributes to the presentation or controls part of its flow** | **PARTIALLY VERIFIED (CPython 3.11 Code & Wrapper Verified in CLI; Live CDN Pyodide Requires Manual Browser Check)** | `js/python_runner.js`, `index.html` (`#slide-9`, `#slide-10`, `#slide-13`, `#slide-14`, `#slide-16`, `#slide-19`), `js/emotional_ad.js` | `js/python_runner.js` embeds 6 real Python functions executed in-browser via Pyodide WebAssembly (`CPython v3.11`). Slide 14 (Anchoring) requires real Python execution with **no** JS fallback; Slides 9, 10, 13, 16, and 19 run Python first when Pyodide is ready and fall back to JS only if offline/loading. Slide 19 displays `#emotCalcEngineBadge` (`"חושב באמצעות Python"` vs. `"חושב במנגנון גיבוי (JavaScript)"`). |
| **4** | **A `PRD.md` describing the planned scope and implementation** | **PARTIALLY VERIFIED (Comprehensive v2.0 Exists; Needs Sync with Editorial Pilot / `Gritti Tutù`)** | `PRD.md`, `docs/visual-redesign-plan.md`, `docs/slide19-improvement-plan.md`, `docs/video-ad-production-plan.md` | `PRD.md` (462 lines, v2.0) thoroughly documents the 20 slides, 7 interactive labs, Three.js scene, and 6 Python models, plus an addendum noting the `malak-improvments` editorial pilot and `Gritti Tutù` updates on Slides 1 & 19. |
| **5** | **A GitHub repository accessible to both students and the lecturer** | **REQUIRES MANUAL VERIFICATION** | `.git/config` (`origin`: `https://github.com/shamssabbagh/SHM-2026.git`) | Remote URL is configured and reachable, but repository visibility (Public vs. Private collaborator permissions for both students and the lecturer) and GitHub Desktop authentication must be verified manually on GitHub. |
| **6** | **Meaningful intermediate pushes, each explaining what changed** | **PARTIALLY VERIFIED (14 Commits on `main` + 1 Pushed on `malak-improvments`; Latest Local Checkpoint Pending Push)** | Git history (`git log`), `origin/main`, `origin/malak-improvments` | Commit `f9d5af6` was pushed to `origin/malak-improvments`. Subsequent checkpoint commits on `malak-improvments` have clear descriptive messages locally, but pushing from the CLI was blocked by interactive HTTPS login (`Username for 'https://github.com':`) and requires pushing via **GitHub Desktop**. |
| **7** | **A `README.md` explaining the project and its parts, updated with every push** | **VERIFIED (Kept Updated on Every Milestone)** | `README.md`, `docs/screenshots/` | `README.md` explains the project purpose, all 20 slides, Three.js + Web Audio architecture, Pyodide Python verification, visual assets (`gritti_tutu_01..03.jpg`), prompt history links (`01`–`25`), and current limitations (including that Slide 19 video ads are still in production and screenshots for Slides 1 & 19 are pre-redesign). |
| **8** | **A saved and uploaded chronological prompt history** | **PARTIALLY VERIFIED (Saved Locally in `prompts/01`–`25`; Upload Pending Push in GitHub Desktop)** | `prompts/01_PRD_Planning.md` through `prompts/25_Lecturer_Requirements_Audit.md` | All 25 chronological prompt files are saved in `prompts/` with verbatim user prompts and labeled summaries of changes, tests, and remaining work. Pushing the latest prompt files (`19`–`25`) to GitHub requires clicking **Push origin** in GitHub Desktop. |
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
  - Verified exact count of 20 `<section class="slide"` elements in `index.html`.
  - Verified interdisciplinary academic alignment: Cognitive & Behavioral Psychology (Dual-Process Theory, Visual Attention, Sensory Marketing, Somatic Markers, Associative Memory, Scarcity, Choice Overload, Decoy Effect, Social Proof, Prospect Theory, Anchoring, Pain of Paying) combined with Marketing Strategy & Consumer Ethics (Dark Patterns vs. Ethical Nudge, AI Shopping Agents, Emotional vs. Informational Advertising with **Gritti Tutù**).
  - Verified `node --check js/presentation.js` passes with zero syntax errors.

---

### Requirement 2: A 3D Animated Scene/Movie Embedded in the Presentation
- **Status:** `PARTIALLY VERIFIED (Code & Local Three.js Engine Verified; Live WebGL 60fps Canvas Requires Manual Browser Check)`
- **File Paths:**
  - [`index.html`](../index.html) (`#slide-8`, lines 409–487: `#brain3d-canvas-container`, region selector buttons `.brain-region-btn`, `#btnToggleRotate`, `#btnResetView`, `#brainRegionCard`)
  - [`js/brain3d.js`](../js/brain3d.js) (622 lines)
  - [`js/vendor/three.min.js`](../js/vendor/three.min.js) (`603 KB` local Three.js r128 WebGL library)
  - [`js/audio.js`](../js/audio.js) (`window.AudioEngine.playRegionTone()` Web Audio API synthesizer)
  - [`docs/screenshots/slide8_brain3d.png`](screenshots/slide8_brain3d.png) (captured WebGL frame from Slide 8)
- **How the Existing Three.js Scene Is Animated (`js/brain3d.js`):**
  1. **3D Geometry Built in Real Time (`createBrainGeometry` & `createHotspots`, lines 195–350):**
     - Creates a `THREE.Group` (`brainGroup`) containing `1,400` 3D particles (`THREE.BufferGeometry` + `THREE.PointsMaterial` with radial glow `CanvasTexture` and `THREE.AdditiveBlending`) arranged into left and right cerebral hemispheres separated by a longitudinal fissure.
     - Adds an inner synaptic wireframe mesh (`THREE.IcosahedronGeometry(1.2, 2)`).
     - Places 6 interactive 3D hotspot meshes (`THREE.SphereGeometry(0.12, 16, 16)` + `THREE.RingGeometry(0.16, 0.20, 24)`) at 3D coordinates for the **Prefrontal Cortex (PFC)**, bilateral **Amygdala**, bilateral **Insula**, and **Nucleus Accumbens (NAcc)**.
  2. **Continuous Animation Loop (`animate()`, lines 454–483):**
     - Driven by `requestAnimationFrame(animate)` whenever Slide 8 is active.
     - Automatically rotates the 3D brain (`targetRotation.y += 0.005` per frame with smooth damping `currentRotation += (target - current) * 0.08`).
     - Continuously animates a sinusoidal pulse on all hotspot rings (`const scale = 1.0 + 0.15 * Math.sin(time * 2.0)`).
     - Supports interactive mouse/touch drag rotation (`mousedown`/`mousemove`/`touchmove`), mouse-wheel zoom (`camera.position.z` clamped between `3.0` and `7.5`), and 3D raycasting (`THREE.Raycaster`) when clicking hotspots directly on the canvas.
- **Important Distinction Regarding Slide 19 Media:**
  - The lecturer specifies that ordinary `.mp4` ads do **not** replace the 3D animated scene requirement. Our project satisfies Requirement 2 via **Slide 8's interactive Three.js 3D brain scene**.
  - On **Slide 19**, the two planned ~25-second AI video ads (*Informational* and *Emotional — "Before they call your name"*) are **still in production and have not yet been integrated into the presentation**.
  - The optional separate Three.js 3D perfume bottle viewer proposed for Slide 19 (`docs/video-ad-production-plan.md`) is **not completed (deferred until multi-angle reference views exist)** and is **not** marked as completed.

---

### Requirement 3: Python Code That Actually Runs and Contributes to the Presentation
- **Status:** `PARTIALLY VERIFIED (All 6 Python Functions & Map Conversion Verified in Local CPython 3.11.9 + Node.js; Live Browser CDN Pyodide Execution Requires Manual Check)`
- **File Paths:**
  - [`js/python_runner.js`](../js/python_runner.js) (767 lines; embeds `PYTHON_SCRIPTS` on lines 21–269)
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
     - **Stage 1 Fix Verified on Slide 19 (`js/python_runner.js#L579-L615`):** `window.calculateEmotionalAdPython` converts Pyodide's returned `Map` proxy into plain nested JavaScript objects via `{ dict_converter: Object.fromEntries }` and `mapToPlainObject(raw)`, while preserving `Map` return types for Slides 9, 10, 13, 14, 16, and `verifyPythonExecution()`.
  2. **JavaScript Fallback Path (When Offline or Before Pyodide Finishes Loading):**
     - On Slides 9, 10, 13, 16, and 19, if `state.pyodide` is `null` or `state.status !== 'ready'`, the wrapper returns `null` (or a fallback object in `calculateDarkPatternsPython`) and the slide controller computes the same mathematical formula in JavaScript so the user interface does not break offline.
     - On **Slide 19**, `#emotCalcEngineBadge` (`js/emotional_ad.js#L502-L511`) explicitly tells the user which engine actually ran:
       - When Python runs: `"חושב באמצעות Python"`
       - When JS fallback runs: `"חושב במנגנון גיבוי (JavaScript)"`
  3. **Test Evidence Executed in This Audit:**
     - Extracted `PYTHON_SCRIPTS` directly from `js/python_runner.js` and executed all 6 functions in local **Python 3.11.9**:
       - `calculate_anchoring(399, 850)` → `estimated_value: 534.3`, `difference: 135.3`, `pct_increase: 33.9`
       - `calculate_prospect_theory(200, False/True)` → `+105.9` gain vs. `-238.3` loss (`ratio: 2.25`)
       - `calculate_emotional_ad_comparison({"emotion":5,"brand":6,"intent":5}, {"emotion":8,"brand":7,"intent":6})` → `differences: {emotion: 3.0, brand: 1.0, intent: 1.0, overall: 1.7}`, `attitude_intent_gap: 0.0`
       - `calculate_scarcity_comparison(...)` → `scarcity_multiplier: 2.52`
       - `calculate_choice_paradox(...)` → `diff_time: 6.6`, `time_ratio: 3.06`
       - `calculate_dark_patterns_ethics(False, True)` → `price_difference: 49.0`, `autonomy_gap: 65.0`
     - **Manual Browser Check Needed:** Open `http://127.0.0.1:8000/index.html#slide-14` and `#slide-19` with internet access, open DevTools Console (`F12`), and run `verifyPythonExecution()` to confirm live in-browser CDN Pyodide execution (`isPythonRunning: true`).

---

### Requirement 4: A `PRD.md` Describing the Planned Scope and Implementation
- **Status:** `PARTIALLY VERIFIED (Updated with Current Branch Addendum)`
- **File Paths:**
  - [`PRD.md`](../PRD.md)
  - Supporting design/stage specs in [`docs/slide19-improvement-plan.md`](slide19-improvement-plan.md), [`docs/visual-redesign-plan.md`](visual-redesign-plan.md), [`docs/content-audit.md`](content-audit.md), and [`docs/video-ad-production-plan.md`](video-ad-production-plan.md).
- **Evidence:** `PRD.md` contains full functional/non-functional requirements, the 20-slide table, 7 interactive lab specs, Three.js and Web Audio specs, and Python integration specs, updated with a section documenting the `malak-improvments` editorial redesign pilot and **Gritti Tutù** update on Slides 1 & 19.

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
- **Status:** `PARTIALLY VERIFIED (Local Commits Created with Meaningful Messages; Latest Commits Require Push via GitHub Desktop)`
- **Evidence:**
  - Previous commits on `main` (`b594440` through `cbc0433`, 14 commits) and `malak-improvments` (`f9d5af6`: *"Document staged improvement plan for slide 19"*) were pushed to GitHub with clear messages.
  - Checkpoint commit `25b717c` (*"Checkpoint: Slide 1 & 19 editorial pilot, Gritti Tutu official images, Python fix, and audit docs"*) and this lecturer-audit checkpoint commit are saved locally on `malak-improvments`, awaiting push from **GitHub Desktop** because non-interactive CLI `git push` prompts for `Username for 'https://github.com':`.

---

### Requirement 7: A `README.md` Explaining the Project and Its Parts, Updated With Every Push
- **Status:** `VERIFIED`
- **File Paths:** [`README.md`](../README.md)
- **Evidence:** `README.md` documents the project's academic purpose, visual showcase (`docs/screenshots/`), Three.js 3D brain & Web Audio synthesizer, Pyodide CPython engine & `verifyPythonExecution()`, 20-slide overview table, technology stack, how-to-run instructions, visual assets (including official `gritti_tutu_01..03.jpg` credits), chronological prompt logs (`01`–`25`), and current status/limitations on `malak-improvments`.

---

### Requirement 8: A Saved and Uploaded Chronological Prompt History
- **Status:** `PARTIALLY VERIFIED (Saved Chronologically in prompts/01..25; Upload of 19..25 Pending GitHub Desktop Push)`
- **File Paths:**
  - `prompts/01_PRD_Planning.md` through `prompts/17_README_Visuals_Screenshots.md` (pushed on `main` and `origin/malak-improvments`)
  - `prompts/18_Slide19_Improvement_Plan.md` (pushed in `f9d5af6` on `origin/malak-improvments`)
  - `prompts/19_Stage1_Slide19_Python_Conversion.md` through `prompts/25_Lecturer_Requirements_Audit.md` (committed locally on `malak-improvments`, ready to push via GitHub Desktop).

---

### Requirement 9: Final Moodle Submission Using the Provided Word Form (Exported to PDF)
- **Status:** `MISSING (External Final Submission Step)`
- **What Is Required Before Final Submission:**
  1. Open the lecturer's official Word submission form.
  2. Fill in both students' full names (**שמס סבאג** & **מלאק פרוג'ה**), both student ID numbers (`ת.ז.`), and the GitHub repository link (`https://github.com/shamssabbagh/SHM-2026`).
  3. Export the completed Word form to `.pdf` and upload it to Moodle.
