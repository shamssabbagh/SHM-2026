# פרומפט 27 — שדרוג שקופית 8: מודל מוח אנטומי תלת-ממדי (CC BY-SA 3.0), בהירות מדעית, שקיפות שמע וזהות עריכתית

**תאריך:** 30 באוקטובר 2026  
**ענף עבודה:** `malak-improvments`  
**סטטוס:** הושלם ואומת בבדיקות ריצה אוטומטיות (Node.js + `three.min.js` + CPython 3.11 + HTTP); תצפית הדפדפן הידנית של המשתמשת ב-Safari תועדה במדויק.

---

## 1. פרומפט המשתמשת (Verbatim)

```text
I manually confirmed that Slide 8 rotates automatically in Safari. Record only that observation as verified; dragging, region interaction, and browser Pyodide execution are not yet confirmed.

Now improve Slide 8 as the next focused milestone.

1. Brain appearance
The current particle cloud does not look recognizably like a brain. Replace it with a more realistic, recognizable interactive 3D brain, with visible hemispheres and cortical folds, soft lighting, and a larger useful viewing area.

Prefer a suitable openly licensed anatomical 3D asset. Verify and document its source, license, and attribution before using it. Do not invent anatomical accuracy or label an approximate procedural shape as medically accurate. If no suitable asset is available, report that limitation rather than silently substituting an inaccurate model.

Keep real Three.js rendering, rotation, drag controls, pause/resume, and reset. Do not replace the interactive scene with a flat image or MP4.

2. Scientific clarity
Check the region labels and explanations against authoritative neuroscience sources. Explain contributions to distributed networks rather than presenting each region as a single “buy button” or equating System 1/System 2 with individual brain structures.

Do not place deep brain regions on the outer cortex as if those were their anatomical positions. Use a clearly explained cutaway/transparency approach if the model supports accurate placement; otherwise explain the limitation.

3. Sound
Inspect the existing audio code and explain what the music and region tones actually represent. Do not describe synthetic tones as recordings of brain activity or scientifically validated frequencies.
Make Slide 8 silent by default. Remove unexplained region tones from its interaction. Any retained optional audio must require an explicit user action and have a clear Hebrew label.

4. Approved visual identity
Match Slides 1 and 19 using the existing shared design tokens:
ivory #F7F3ED, burgundy #502638, blush #EBD9DF, and readable charcoal text.
Remove the old dark neon styling from Slide 8. Preserve other slides while making this focused change.

Use a large brain viewer and a concise Hebrew RTL information card:
- Region name.
- One short explanation.
- One consumer-decision example.
- Expandable scientific detail and source.
Avoid dense paragraphs, tiny text, clipped controls, and excessive decorative effects.

5. Verification and checkpoint
Test the affected interactions and check the layout at a laptop-sized viewport. Separate actual browser evidence from simulated tests. Preserve Python functionality and existing work.

Document the source/license, changes, limitations, and actual tests. Update README, the checklist, and prompt history with this prompt verbatim. Create a meaningful commit on malak-improvments and attempt a normal push. If authentication blocks it, report once.

Proceed with routine work without repeated confirmation questions. Do not purchase assets, force-push, or merge into main.

Finish with the preview URL, what changed, what remains unverified, and commit/push status.
```

---

## 2. תיעוד תצפית הדפדפן הידנית של המשתמשת (Safari)

- **אומת ידנית בדפדפן Safari על ידי המשתמשת:** שקופית 8 מסתובבת אוטומטית (`Auto-Rotation`).
- **טרם אומת ידנית בדפדפן חי:** גרירה בעכבר/מגע (`Dragging`), לחיצה על אזורי המוח וכפתורי הבחירה (`Region Interaction`), מעבר ידני במצב שקיפות החתך (`Cutaway`), וטעינת `Pyodide` מהרשת בדפדפן חי.

---

## 3. מה בוצע בפועל ומדוע

### א. החלפת ענן החלקיקים במודל מוח אנטומי תלת-ממדי ברישיון פתוח (`js/vendor/brain_mesh_data.js`, `assets/models/brain_fsaverage_dk.json`, `js/brain3d.js`)
- **מקור המודל ורישוי מאומת:**
  - **מאגר:** **Brainder.org — "Brain for Blender"** מאת **Dr. Anderson M. Winkler, MD, PhD** (`https://brainder.org/research/brain-for-blender/`).
  - **רישיון:** **Creative Commons Attribution-ShareAlike 3.0 Unported (`CC BY-SA 3.0`)** (`https://creativecommons.org/licenses/by-sa/3.0/`).
  - **מקור אנטומי ומדעי:** מבוסס על שחזור MRI אנושי בתוכנת **FreeSurfer** (*Fischl, 2012, NeuroImage 62(2):774–781*), חלוקה קורטיקלית לפי אטלס **Desikan-Killiany** (*Desikan et al., 2006, NeuroImage 31(3):968–980*), וסגמנטציה תת-קורטיקלית **ASEG** (*Fischl et al., 2002, Neuron 33(3):341–355*).
- **מבנה הגיאומטריה התלת-ממדית ב-Three.js (`THREE.BufferGeometry`):**
  - **המיספרה שמאלית (`lh`):** `6,654` קודקודים ו-`15,866` משולשים עם נורמלים מוחלקים וצביעת קודקודים לפי עומק החריצים הקורטיקליים (`Sulci` כהים יותר ו-`Gyri` בגוון שנהב-אנטומי חם).
  - **המיספרה ימנית (`rh`):** `6,710` קודקודים ו-`16,190` משולשים עם הפרדה ברורה של החריץ האורכי (`Longitudinal Fissure`).
  - **4 מבנים ורשתות אנטומיות באותו מרחב קואורדינטות סטריאוטקסי (`FreeSurfer RAS`):**
    1. `pfc` (**הרשת הקדם-מצחית — `vmPFC / OFC & dlPFC`**): `3,097` קודקודים, `6,496` משולשים (`medialorbitofrontal`, `lateralorbitofrontal`, `rostralmiddlefrontal`, `frontalpole` דו-צדדי).
    2. `amygdala` (**האמיגדלה — `Left & Right Amygdala`**): `730` קודקודים, `1,461` משולשים (גרעינים תת-קורטיקליים עמוקים באונה הרקתית התיכונה).
    3. `insula` (**קליפת האינסולה — `lh/rh.pial.DK.insula`**): `862` קודקודים, `1,590` משולשים (קליפה פנימית הקבורה בעומק החריץ הצידי מתחת לאופרקולה).
    4. `nacc` (**גרעין האקומבנס — `Left & Right Accumbens-area`**): `528` קודקודים, `1,049` משולשים (גרעינים תת-קורטיקליים עמוקים בסטריאטום הגחוני).
- **שמירת כלל יכולות האינטראקציה ב-Three.js:** סיבוב אוטומטי חלק, גרירה בעכבר ובמגע, זום בגלגלת, כפתור עצור/הפעל סיבוב (`#btnToggleRotate`), כפתור מבט עומק / שקיפות חתך (`#btnToggleCutaway`), וכפתור איפוס מבט (`#btnResetView`).

### ב. בהירות מדעית ומיקום אנטומי פנימי באמצעות שקיפות חתך (`Cutaway`)
- **הסבר רשתי מבוזר:** כל 4 הכרטיסיות וההבהרה בראש השקופית עודכנו כך שיסבירו תרומה לרשתות מוחיות מבוזרות (רשת הערך `Valuation Network`, רשת הבולטות `Salience Network`, ורשת הבקרה הקוגניטיבית `Executive Control`) — ללא הצגת אף אזור כ"כפתור קנייה" בודד וללא זיהוי שגוי של מערכת 1 או מערכת 2 של כהנמן עם מבנה אנטומי יחיד.
- **מיקום עמוק אמיתי ושקיפות חתך (`Cutaway Transparency`):**
  - האמיגדלה (`x ≈ ±0.54, y ≈ -0.68, z ≈ +0.11`), האינסולה (`x ≈ ±0.83, y ≈ -0.36, z ≈ +0.37`), וגרעין האקומבנס (`x ≈ ±0.20, y ≈ -0.47, z ≈ +0.48`) ממוקמים במיקומם האנטומי הפנימי האמיתי ולא על פני קליפת המוח החיצונית.
  - בעת בחירה באחד משלושת המבנים העמוקים (או בלחיצה על `#btnToggleCutaway`), שתי ההמיספרות החיצוניות עוברות אוטומטית לשקיפות חתך (`opacity: 0.22`, `depthWrite: false`) כך שהמבנים הפנימיים נראים בوضوح בתוך עומק המוח.

### ג. ביקורת קוד השמע, השתקת ברירת מחדל והסרת צלילי אזורים (`js/audio.js`, `js/brain3d.js`)
- **ממצאי ביקורת הקוד ב-`js/audio.js`:**
  1. `startAmbientMusic()` מפעיל סינתיסייזר פרוצדורלי ב-`Web Audio API` המנגן אקורד `A-Minor` מתמשך (`110 Hz`, `164.81 Hz`, `220 Hz`, `261.63 Hz`, `329.63 Hz`) דרך מסנן `Lowpass` ורצף פעמונים פנטטוני (`440 Hz` עד `880 Hz`).
  2. `playRegionTone()` ניגן תווים מוזיקליים סינתטיים שרירותיים (`523.25 Hz` דו, `392.00 Hz` סול, `329.63 Hz` מי, `659.25 Hz` מי גבוה) בעת לחיצה על אזורי המוח.
  3. לצלילים אלו אין כל קשר להקלטות מוחיות (`EEG / fMRI`) או לתדרים נוירולוגיים מאומתים מדעית.
- **שינויים שבוצעו:**
  - שקופית 8 **שקטה לחלוטין כברירת מחדל** (`isMuted: true`, `isAmbientPlaying: false`).
  - **צלילי האזורים (`Region Tones`) הוסרו לחלוטין** מלחיצה על אזורי המוח (`selectRegion`) ומהפעלת השמע (`toggleMute`), וסליידר ה"אפקטים" המיותר הוסר מהממשק.
  - מוזיקת האווירה הסינתטית נשמרה כאפשרות יזומה בלבד עם תווית עברית מפורשת וברורה: **`🔇 מוזיקת אווירה סינתטית: כבויה`** / **`🔊 מוזיקת אווירה סינתטית: פועלת`**.

### ד. זהות חזותית עריכתית מאושרת (`index.html` `#slide-8`, `css/style.css`)
- לשקופית 8 הוחלה המחלקה `editorial-pilot` (`<section class="slide editorial-pilot" id="slide-8">`) תוך שימוש באסימוני העיצוב המשותפים לשקופיות 1 ו-19:
  - רקע שנהב חם `#F7F3ED` (`--ed-bg`), בורגונדי עמוק `#502638` (`--ed-burgundy`), סומק חיוור `#EBD9DF` (`--ed-blush`), קורל `#D85B49` (`--ed-coral`), וטקסט פחם קריא `#252329` (`--ed-charcoal`).
- הוסר העיצוב הכהה-ניאוני משקופית 8 בלבד תוך שמירה מלאה על שאר השקופיות.
- הממשק כולל צופה מוח תלת-ממדי גדול (`1.38fr`, גובה רספונסיבי `clamp(290px, 38vh, 420px)`) וכרטיסיית מידע עריכתית תמציתית בעברית RTL (`0.92fr`) הכוללת:
  1. שם האזור בעברית ובאנגלית (`<bdi>`) + תגית עומק אנטומי.
  2. הסבר קצר אחד על תרומתו לרשת המוחית המבוזרת.
  3. דוגמה צרכנית קונקרטית אחת.
  4. מגירה מתקפלת (`<details class="editorial-theory-drawer brain-sci-drawer">`) עם פירוט אנטומי, הסתייגות מדעית ורשימת מקורות מבוקרי עמיתים (`APA`).

---

## 4. בדיקות שבוצעו ותוצאותיהן (הפרדה בין דפדפן חי לבדיקות אוטומטיות)

1. **בדיקה ידנית בדפדפן חי (Safari — על ידי המשתמשת):**
   - אומת כי שקופית 8 מסתובבת אוטומטית (`Auto-Rotation`).
2. **בדיקות ריצה אוטומטיות (`node verify_foundation.mjs` + `python3` + שרת HTTP מקומי `http://127.0.0.1:8000`):**
   - כל **28 הנכסים המקומיים** (כולל `js/vendor/brain_mesh_data.js`, `js/brain3d.js`, `js/audio.js`, `css/style.css`) החזירו `HTTP 200 OK` ועברו בדיקת תחביר `node --check`.
   - אומתה טעינת שתי ההמיספרות (`lh` = `6,654` קודקודים / `15,866` משולשים; `rh` = `6,710` קודקודים / `16,190` משולשים) ו-4 ה-Meshes האנטומיים (`pfc`, `amygdala`, `insula`, `nacc`).
   - אומתה שקיפות החתך (`Cutaway`): בבחירת `pfc` אטימות הקורטקס היא `0.96`; בבחירת `amygdala`, `insula` או `nacc` אטימות הקורטקס יורדת אוטומטית ל-`0.22` (`cutawayActiveForDeepRegion: true`), וגם כפתור `#btnToggleCutaway` הידני מעביר בין `0.96` ל-`0.22`.
   - אומת כי השקופית שקטה כברירת מחדל (`silentByDefault: true`), וכי מעבר בין כל 4 האזורים שומר על השתקת השמע ואינו מפעיל צלילי אזורים.
   - אומתו סיבוב אוטומטי ב-10 פריימים, גרירת עכבר (`dragChangedRotation: true`), עצירה/הפעלה (`pauseResumeWorked: true`), ואיפוס מבט (`resetSelectedPfc: true`).
   - אומת כי כל 6 מודלי ה-Python ב-`js/python_runner.js` ושלושת תרחישי שקופית 19 ממשיכים לפעול באופן תקין מול `CPython 3.11.9`.
