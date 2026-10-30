# Slide 19 Hybrid Experience Plan: Photorealistic Video Ads & Separate Three.js 3D Product Viewer

- **Project:** The Consumer Brain: The Psychology Behind Purchasing Decisions (`SHM-2026`)
- **Branch:** `malak-improvments`
- **Selected Product:** **Gritti Tutù** (*White Collection, Extrait de Parfum, 100 ml, € 260*)
- **Document Status:** `PRODUCTION & INTEGRATION PLAN READY — AWAITING AUTHENTIC BOTTLE REFERENCE PHOTOS & VIDEO/3D ASSET PRODUCTION`
- **Existing Slide 19 Status:** Preserved and fully functional on `malak-improvments` while authentic video and 3D assets are prepared.

---

## 1. Honest Statement on Asset Generation Capabilities & Current Repository Audit

### A. Can This AI Assistant Directly Generate the Final Video and 3D Model Files?
**No.**
1. **Photorealistic Video Generation:** This coding environment does **not** have an integrated live-action video generation model (such as Veo, Runway Gen-3/Gen-4, Kling, or Sora), nor is `ffmpeg` installed locally on this Mac. Moreover, we do not yet have Malak's reference photographs of her physical **Gritti Tutù** bottle, which are required to anchor the real bottle's geometry and typography.
2. **Authentic 3D Mesh Generation:** This environment cannot generate a faithful, texture-mapped `.glb` / `.gltf` 3D mesh of **Gritti Tutù**, and `blender` is not installed locally.
3. **Current Project Asset Audit (`assets/` & `js/vendor/`):**
   - **Official `Gritti Tutù` (`SKU: DGB00600`) Product Images Downloaded Locally:**
     - `assets/images/gritti_tutu_01.jpg` (`2160×3240`, studio front bottle view) — Source: `https://cdn.shopify.com/s/files/1/0957/8646/7660/files/DGB00600_01.jpg?v=1758124436` (from `https://www.grittifragrances.com/products/tutu-dgb00600`). Used in Slide 19 (Informational ad).
     - `assets/images/gritti_tutu_02.jpg` (`2160×3240`, studio bottle + presentation box view) — Source: `https://cdn.shopify.com/s/files/1/0957/8646/7660/files/DGB00600_02.jpg?v=1758124436` (from `https://www.grittifragrances.com/products/tutu-dgb00600`). Used in Slide 1 hero frame.
     - `assets/images/gritti_tutu_03.jpg` (`2160×3240`, editorial campaign bottle on gold pedestal with rose petals) — Source: `https://cdn.shopify.com/s/files/1/0957/8646/7660/files/DGB00600_03.jpg?v=1758124436` (from `https://www.grittifragrances.com/products/tutu-dgb00600`). Used in Slide 19 (Emotional ad).
   - **3D Models in Repo:** None (`0` `.glb`/`.gltf`/`.obj` files exist in the workspace). **Deferred** until sufficient multi-angle reference views (back, sides, top, bottom) exist; no millimeter accuracy is claimed without verified physical measurements. The interactive Three.js brain scene on Slide 8 (`js/brain3d.js`) is preserved intact.
   - **Videos in Repo:** None (`0` `.mp4`/`.webm` files exist in the workspace).
   - **Three.js Engine (`js/vendor/three.min.js`):** Present and working (`603 KB`). It includes core 3D geometries, physically based materials (`MeshPhysicalMaterial`, `MeshStandardMaterial`), lights, raycasting, and `WebGLRenderer`, and already powers the custom drag-to-orbit + zoom camera controller in `js/brain3d.js`. (It does not bundle `GLTFLoader`, which is a single ~25 KB file that we will add to `js/vendor/` when the `.glb` bottle model is ready).

> **Strict Non-Substitution Commitment:** Per project rules, we have **not** substituted unrelated stock footage, have **not** rotated a flat 2D image to fake a 3D model, have **not** invented the unseen back or label of the Gritti Tutù bottle, and do **not** claim that the video or 3D assets are produced yet. Instead, this document provides the complete production briefs, shot-by-shot storyboards, reference-photo specifications, and DOM/Three.js integration plan.

---

## 2. Core Conceptual & Technical Distinctions

To maintain scientific, technical, and terminological accuracy across the presentation:

| Component | What It Actually Is | What It Must NEVER Be Called or Faked As |
| :--- | :--- | :--- |
| **1. Two Video Advertisements (`Ad A` & `Ad B`)** | Two **~25-second cinematic video files** (`<video>` in `.mp4` / `.webm`) shot/generated from **fixed camera viewpoints** (locked tripod or subtle linear dolly/focus pull). | Must **never** be described as "freely rotatable", "interactive 360°", or "6D". |
| **2. Interactive 3D Product Viewer** | A **separate, real Three.js WebGL scene** (`<canvas>`) rendered in real time with **drag-to-orbit rotation**, **bounded zoom**, and a **Reset View (`איפוס מבט`)** button, unlocked **equally after both ads have been rated**. | Must **never** be faked by CSS-rotating a flat 2D image, and must **never** invent unseen back labels or bottle geometry without reference photos. Any approximate geometric prototype during development must carry a visible `"אב-טיפוס גיאומטרי זמני לפיתוח"` label. |
| **3. Synthetic Footage Disclosure** | Any AI-generated or AI-composited video shots must be explicitly documented in the UI and credits as **synthetic educational footage (`וידאו סינתטי שנוצר בסיוע AI לצורכי הוראה — אינו תיעוד מצולם ואינו פרסומת רשמית של המותג`)**. | Must **never** be presented as an actual filmed documentary event or an official Gritti Fragrances commercial. |

---

## 3. Parity & Methodological Guardrails Across Both Videos

1. **Comparable Technical & Exposure Parameters:**
   - **Total Duration:** `25.0 seconds` each (`±1.0s`).
   - **Aspect Ratio, Resolution & Frame Rate:** `16:9` (`1920×1080` Full HD, `24 fps`), H.264 `.mp4` + VP9 `.webm`.
   - **Visual Realism Standard:** Live-action photorealism—natural human proportions, realistic skin pores and hand anatomy, natural fabric drape, accurate glass refraction, and physically plausible daylight/warm interior lighting. Strictly no cartoon, CGI-doll, plastic skin, or game-like aesthetics.
   - **Bottle Identity & Visibility Parity:** Both videos feature the exact same **Gritti Tutù** (*White Collection, Extrait de Parfum, 100 ml*) pink rectangular bottle with its front gold-trimmed emblem and striated white cap, with comparable clear bottle screen time (`~9–10 seconds` of unobstructed bottle visibility in each video) and an identical 5-second closing product slate (`00:20–00:25`).
   - **Playback Controls & Audio Parity:** Identical HTML5 playback controls (`הפעל / השהה`, timeline scrub bar, `השתק / הפעל שמע`, and built-in Hebrew subtitles `<track kind="captions" srclang="he">`). **No automatic music or autoplay with sound**—both videos start paused or muted until the user explicitly clicks Play/Unmute.
2. **Methodological Limitation (Complete Ad Executions):**
   - Because `Ad A` (Informational studio close-ups + olfactory notes) and `Ad B` (Emotional narrative of a student preparing for a presentation) differ across **multiple dimensions simultaneously**—human presence, setting, narrative arc, and on-screen copy—this activity compares **two complete advertising executions** (`שתי הוצאות לפועל פרסומיות שלמות`) and **cannot isolate emotion alone as the causal variable**.

---

## 4. Shot-by-Shot Storyboards, Timing & Hebrew Copy (~25 Seconds Each)

### Video A: Informational Concept (`מודעה עובדתית-אינפורמטיבית` — 25.0 Seconds)

- **Objective:** Help the viewer understand **Gritti Tutù** using verified facts, clear optical close-ups of the physical bottle, concentration, volume, and official scent descriptors.
- **Content Guardrails:**
  - Describe fragrance notes strictly as **scent descriptors (`תיאורי ניחוח / רשמים ארומטיים`)**, not as literal physical ingredients inside the bottle.
  - Do **not** invent longevity claims (e.g., "lasts 12 hours"), projection/sillage claims, or psychological/social benefits.
- **Visual Style:** Clean, high-craft studio cinematography on a warm travertine/limestone surface (`#F7F3ED` / `#EBD9DF` daylight palette), crisp macro optics (85mm/100mm macro lens look), fixed camera viewpoints.

| Shot # | Timecode | Duration | Fixed Camera Viewpoint & Visual Action | Hebrew On-Screen Copy (`כיתוב על המסך`) | Optional Calm Hebrew Narration (`קריינות אופציונלית`) |
| :---: | :---: | :---: | :--- | :--- | :--- |
| **A1** | `00:00–00:05` | `5.0s` | **Locked Medium Close-Up (Eye-Level, 85mm):** The real **Gritti Tutù** bottle stands centered on a warm limestone slab in soft, even natural studio daylight. Subtle natural light moves softly across the glass surface. | **<bdi>Gritti Tutù — White Collection</bdi>**<br>בית הבישום האיטלקי <bdi>Gritti Venetia</bdi> | *"גריטי טוטו, מתוך הקולקציה הלבנה של בית הבישום האיטלקי גריטי ונציה."* |
| **A2** | `00:05–00:10` | `5.0s` | **Fixed Macro Shot (Front Emblem & Cap):** Tight focus on the front plaque of the bottle and the textured white cap, showing physical material quality, glass edges, and volume specification. | **ריכוז ותכולה**<br><bdi>Extrait de Parfum</bdi> • 100 מ"ל | *"מיוצר בריכוז אקסטרייט דה פרפיום, בבקבוק של מאה מיליליטר."* |
| **A3** | `00:10–00:15` | `5.0s` | **Fixed 3/4 Angle Close-Up (Atomizer & Upper Bottle):** Clean studio view of the bottle profile and gold atomizer collar. Minimalist editorial typography lists the opening scent descriptors. | **תיאורי ניחוח פותחים (תווים עליונים)**<br>רשמים ארומטיים של אשכולית, דומדמניות שחורות, קוקוס ושמפניה ורודה | *"פרופיל הניחוח נפתח בתיאורי ריח רעננים של אשכולית, דומדמניות שחורות, קוקוס ורמז תוסס של שמפניה ורודה."* |
| **A4** | `00:15–00:20` | `5.0s` | **Fixed Low-Angle Studio Shot:** Soft rack focus from the base of the bottle to the center plaque against a warm ivory backdrop, presenting the heart and base scent descriptors. | **תיאורי לב ובסיס בניחוח**<br>תווי לב: יסמין, ורד, הליוטרופ ופודרה<br>תווי בסיס: פטל, וניל, ענבר ומושק<br>*(תיאורי הניחוח מבטאים רשמים ארומטיים)* | *"במרכז הניחוח ניצבים תיאורים פרחוניים ופודרתיים של יסמין, ורד והליוטרופ, על בסיס חם של פטל, וניל, ענבר ומושק."* |
| **A5** | `00:20–00:25` | `5.0s` | **Locked Hero End-Slate (Identical Framing to Shot B6):** Full bottle centered on the warm stone surface with clean editorial typography and price. | **<bdi>Gritti Tutù — Extrait de Parfum</bdi>**<br>100 מ"ל • <bdi>€ 260</bdi> | *"גריטי טוטו. אקסטרייט דה פרפיום, מאה מיליליטר. מאתיים ושישים אירו."* |

---

### Video B: Emotional Concept — “Before they call your name” (`"עוד לפני שקוראים בשמך"` — 25.0 Seconds)

- **Objective:** Evoke a relatable, grounded human moment—an adult university student preparing to present an important academic project—where applying the perfume is a natural part of her getting-ready routine, ending as she steps into the presentation room.
- **Content & Ethical Guardrails:**
  - **No Magical / Causal Claims:** The perfume is **never** portrayed as causing her confidence, preparation, or academic success. Her readiness comes from her own work and rehearsal; the scent is simply a personal sensory detail in her routine.
  - **Live-Action Photorealism:** Adult university student (approx. 22–26 years old), natural proportions, realistic skin texture, natural hand movements, authentic wardrobe (tailored blazer/blouse in warm neutral tones), realistic university/home-study lighting.
  - **Mandatory Closing Line:** Must end with the exact student-written line:
    `"עוד לפני שמכירים את השם שלך — יש לך סיפור."`

| Shot # | Timecode | Duration | Fixed Camera Viewpoint & Visual Action | Hebrew On-Screen Copy (`כיתוב על המסך`) | Optional Calm Hebrew Narration (`קריינות אופציונלית`) |
| :---: | :---: | :---: | :--- | :--- | :--- |
| **B1** | `00:00–00:05` | `5.0s` | **Fixed Medium Shot (Desk / Morning Light, 50mm):** An adult university student sits at a sunlit wooden table reviewing printed presentation cards and a laptop slide deck. She mouths a key sentence quietly to herself, rehearsing. The **Gritti Tutù** bottle is visible resting naturally near the corner of the table. | *(ללא כיתוב פולשני — מיקוד ברגע החזרה השקט)* | *"חודשים של עבודה מתנקזים לעשר דקות על הבמה."* |
| **B2** | `00:05–00:09` | `4.0s` | **Fixed Close-Up (Face & Hands Gathering Notes, 85mm):** She stacks her note cards neatly on the table, pauses, closes her eyes for a brief steadying breath, and looks into a small wall mirror as she adjusts the collar of her blazer. | *(ללא כיתוב — תחושת ציפייה וריכוז לפני היציאה)* | *"הנשימה השקטה הזו, רגע לפני שיוצאים אל החדר."* |
| **B3** | `00:09–00:15` | `6.0s` | **Fixed Macro-Medium Shot (Tabletop & Wrist Application):** Her hand reaches for the **Gritti Tutù** bottle on the table (clear, sharp view of the authentic bottle and plaque). She applies a single brief spray to her wrist, sets the bottle back down gently on the stone tray, and picks up her presentation folder. | **<bdi>Gritti Tutù — White Collection</bdi>** | *(רחש עדין וטבעי של התזה קצרה ורשרוש דפי המצגת)* |
| **B4** | `00:15–00:18` | `3.0s` | **Fixed Medium Tracking/Hallway Lock-Off:** Outside a university seminar/auditorium door. She stands holding her folder; through the frosted glass we see the soft silhouette of the classroom inside. She checks her watch/notes calmly. | *(ללא כיתוב)* | *(שקט מרוכז לפני פתיחת הדלת)* |
| **B5** | `00:18–00:21` | `3.0s` | **Fixed Over-the-Shoulder Shot at the Doorway:** A voice or gesture from inside invites the next presenter. She presses the door handle down, opens the door into the warm-lit seminar room, and takes her first composed step inside. | **"עוד לפני שמכירים את השם שלך — יש לך סיפור."** | *"עוד לפני שמכירים את השם שלך — יש לך סיפור."* |
| **B6** | `00:21–00:25` | `4.0s` | **Locked Hero End-Slate (Matching Shot A5):** Cut to the clean studio close-up of the **Gritti Tutù** bottle on warm stone alongside the final line and identical product/price specification. | **"עוד לפני שמכירים את השם שלך — יש לך סיפור."**<br>**<bdi>Gritti Tutù — Extrait de Parfum</bdi>** • 100 מ"ל • <bdi>€ 260</bdi> | *"גריטי טוטו. אקסטרייט דה פרפיום, מאה מיליליטר. מאתיים ושישים אירו."* |

---

## 5. Required Authentic Product Assets (What Malak Needs to Capture)

Because we must **never** invent unseen sides, labels, or geometry of the **Gritti Tutù** bottle, we need the following reference photographs (and optional short smartphone video clips) of Malak's actual bottle before generating the video keyframes and building the 3D model:

### A. Six Orthographic Reference Views (For Faithful 3D Model & Texture Projection)
Shoot on a flat table near a window (soft, diffused daylight—no harsh direct flash reflections), holding the camera at **bottle center height** from ~1.5 meters away using the `2×` or `3×` lens (`50mm–77mm equivalent`) to avoid wide-angle barrel distortion:
1. **View 1 — Front (`0°` Orthographic):** Dead-center front view showing the pink glass body, the gold/cream front plaque (`TUTÙ / GRITTI`), and the striated white cap aligned straight.
2. **View 2 — Back (`180°` Orthographic):** Dead-center back view (so we know with 100% accuracy whether the back glass is plain matte/glossy pink or carries an emblem/text).
3. **View 3 — Left Profile (`90°` Orthographic):** Dead-center left side view showing exact glass depth, edge bevels, and cap alignment.
4. **View 4 — Right Profile (`270°` Orthographic):** Dead-center right side view.
5. **View 5 — Top-Down (`+90°` Overhead):** Directly above the cap showing the top square/rectangular profile and any top logo/engraving.
6. **View 6 — Bottom-Up (`-90°` Base) + Cap-Off Atomizer View:**
   - One photo of the bottom base label/batch sticker.
   - One front photo **with the cap removed**, showing the gold atomizer neck and spray nozzle (essential for Shot A3 and Shot B3!).

### B. Physical Dimensions (Ruler Check — Takes 1 Minute)
Please measure and note in millimeters:
- Total height with cap on (`H_total`).
- Height of the pink glass body alone up to the shoulder (`H_body`).
- Height and width of the white cap (`H_cap`, `W_cap`).
- Width and depth of the pink glass body (`W_body`, `D_body`).

### C. High-Resolution Hero Plates for Video Production
1. **Studio Neutral Plate (for Video A):** Malak's bottle placed on a neutral light surface (stone, cream ceramic, or white linen) in even daylight—either a 5-second locked-off smartphone video at `1080p/4K 24/30fps` or 3 sharp still photos (front, macro plaque, 3/4 angle).
2. **Tabletop Getting-Ready Plate (for Video B, Shot B3):** A 5-second locked-off clip (or still plate) of the bottle on a study desk beside a notebook/blazer sleeve, ensuring 100% authentic bottle geometry when the hand reaches for it.

---

## 6. Available Production Tools & Their Limitations

| Tool Category | Specific Tools | Role in Production | Key Technical & Scientific Limitations |
| :--- | :--- | :--- | :--- |
| **1. Direct Smartphone Live-Action Capture (Recommended Primary Path for Bottle Shots)** | iPhone / modern smartphone camera (`1080p/4K 24fps`), tripod or stable surface, natural window light. | Filming Shots `A1–A5` and `B1–B6` (or at minimum all bottle close-ups `A1–A5`, `B3`, `B6`). | Requires a steady surface/tripod and consistent room lighting, but guarantees **100% authentic bottle typography, natural human hands/skin, zero AI hallucinations, and full student authorship**. |
| **2. Image-to-Video AI Generators (Optional Hybrid Path)** | Runway Gen-3 Alpha / Gen-4, Kling AI, Google Veo 2, Luma Dream Machine. | Animating subtle camera/lighting motion from Malak's real reference photos of the bottle, or generating ambient B-roll (`B1, B2, B4, B5`). | **Limitations:** AI video models frequently warp small Latin/serif typography on perfume plaques (`TUTÙ / GRITTI`), alter bottle proportions during motion, or produce unnatural finger movements when spraying a bottle. **Mitigation:** Lock the bottle shots to real photography/composited plates, and disclose any AI-generated shots as *synthetic footage*. |
| **3. 3D Reconstruction & Modeling Tools** | **Option A:** Photogrammetry / Gaussian Splat / NeRF-to-Mesh (`Polycam`, `Kiri Engine`) from 40–60 photos around Malak's bottle.<br>**Option B (Recommended for Clean Glass/Cap):** Precision box/chamfer modeling in Blender (`glTF 2.0 / .glb` export) using the 6 orthographic photos as UV textures + PBR materials. | Producing `assets/models/gritti_tutu.glb` (`< 5 MB`) for the Slide 19 Three.js viewer. | **Limitations:** Mobile photogrammetry struggles with reflective/semi-translucent glass and metallic gold plaques, creating bumpy meshes. **Mitigation:** Building a clean parametric mesh from the exact millimeter measurements + projecting Malak's 6 orthographic photos onto the UV faces produces a razor-sharp, lightweight (`< 2 MB`) `.glb` model with accurate reflections. |
| **4. In-Browser Runtime Engine (Already in Repo)** | `js/vendor/three.min.js` (`WebGLRenderer`, `MeshPhysicalMaterial`, raycasting) + HTML5 `<video>`. | Rendering the two fixed-camera `<video>` ads and the separate interactive Three.js 3D bottle viewer. | `js/vendor/three.min.js` does not currently include `GLTFLoader`. We can either add `js/vendor/GLTFLoader.js` (~25 KB, offline-ready) or construct the exact multi-materialUV-mapped geometry directly in Three.js from the 6 orthographic texture images. |

---

## 7. Feasible Integration Plan for Slide 19 (Video Ads + Separate 3D Viewer)

### A. Preserving the Current Working Slide Until Assets Arrive
- Until `assets/video/gritti_tutu_info.mp4`, `assets/video/gritti_tutu_emotional.mp4`, and the 6 orthographic bottle views / `.glb` model are added, **Slide 19 remains 100% functional** in its current image-led state (with temporary placeholder banners, randomized order, `"דרגו את הרושם"` reveal, and explicit `"אשר 5/10"` confirmation).

### B. Target File Structure Once Assets Are Produced
```text
assets/
├── video/
│   ├── gritti_tutu_info.mp4            # 25s Informational video (1080p H.264)
│   ├── gritti_tutu_info_poster.jpg     # Poster frame from Shot A1
│   ├── gritti_tutu_info_he.vtt         # Hebrew WebVTT captions for Video A
│   ├── gritti_tutu_emotional.mp4       # 25s Emotional video (1080p H.264)
│   ├── gritti_tutu_emotional_poster.jpg# Poster frame from Shot B1
│   └── gritti_tutu_emotional_he.vtt    # Hebrew WebVTT captions for Video B
└── models/
    └── gritti_tutu.glb                 # Authenticated 3D model built from Malak's 6 reference views
js/
├── product3d_viewer.js                 # Dedicated Three.js 3D bottle viewer with orbit, bounded zoom & reset
└── emotional_ad.js                     # Updated to swap <video> sources by randomized adOrder
```

### C. Step-by-Step UX & Technical Integration on Slide 19
1. **Steps 1 & 2 (`מודעה א׳` and `מודעה ב׳` — Fixed-Camera Video Ads):**
   - Replace the static `<div class="ad-image-frame">` content with a controlled `<video>` player (`playsinline`, `preload="metadata"`, no autoplay with sound) plus identical custom editorial controls across both ads:
     - `▶ הפעל סרטון (0:25)` / `⏸ השהה`
     - `🔊 שמע` / `🔇 השתק`
     - `כתוביות בעברית (CC)`
     - `↺ צפה שוב מההתחלה`
   - Include a clear disclosure badge below the video player when synthetic shots are used:
     `הערת הפקה: סרטון לימודי הכולל צילום סינתטי (AI) של סיטואציית ההגשה בשילוב בקבוק Gritti Tutù המקורי.`
   - Pause the video automatically if the user switches steps or navigates away from Slide 19 (`slideChanged` event).
   - Keep the exact same `"דרגו את הרושם"` button and 3 explicit rating questions (`1–10` with `"אשר 5/10"` midpoint button).
2. **Step 3 (`השוואת הדירוגים` + Separate Interactive Three.js 3D Product Viewer):**
   - **Why Step 3 (After Both Ratings)?** Making the interactive 3D Product Viewer available **after both ads have been rated** ensures 100% equal availability across conditions without distracting from or biasing the timed video ad exposures in Steps 1 and 2.
   - **3D Viewer Features (`js/product3d_viewer.js`):**
     - Real `THREE.Scene`, `THREE.PerspectiveCamera`, and `THREE.WebGLRenderer` inside `#product3dCanvasContainer`.
     - **Drag-to-Orbit (`סובבו בגרירה`):** Smooth pointer-drag rotation (`pointerdown`, `pointermove`, `pointerup`) around the bottle's vertical and horizontal axes.
     - **Bounded Zoom (`זום מוגבל`):** Mouse wheel and pinch zoom clamped strictly between `minDistance = 2.2` and `maxDistance = 6.0` so the camera never clips inside the bottle or loses it in space.
     - **Reset View (`איפוס מבט`):** Button (`#btnResetProduct3D`) that smoothly returns the bottle to its canonical front-facing `0°` studio orientation and default zoom.
     - **Prototype vs. Final Labeling:** If tested with an approximate geometric prototype before all 6 orthographic photos are mapped, the viewer displays a mandatory banner: `אב-טיפוס תלת-ממדי זמני לפיתוח — הגיאומטריה המלאה תוטמע מצילומי הבקבוק המקורי`.
     - **Respects `prefers-reduced-motion`:** Disables any idle turntable rotation when reduced motion is enabled, rotating only on direct user drag.
