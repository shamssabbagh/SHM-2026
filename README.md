# המוח הצרכני: הפסיכולוגיה שמאחורי החלטות קנייה
## The Consumer Brain: The Psychology Behind Purchasing Decisions

> **קוד פרויקט:** `SHM-2026`  
> **מוסד אקדמי:** אוניברסיטת חיפה  
> **מסגרת אקדמית:** מטלה מספר 1 | קורס סוכני AI ו-Vibe Coding  
> **צוות המגישות:**  
> - **שמס סבאג** – סטודנטית לפסיכולוגיה, אוניברסיטת חיפה  
> - **מלאק פרוג'ה** – סטודנטית לתקשורת ושיווק, אוניברסיטת חיפה  

---

## 🎯 מטרת הפרויקט (Project Purpose)

פרויקט **"המוח הצרכני"** מהווה גשר אינטגרטיבי ובינתחומי בין **מדעי המוח והפסיכולוגיה הקוגניטיבית וההתנהגותית** לבין **אסטרטגיות שיווק, פרסום ותקשורת שכנועית**. 

מטרת הפרויקט היא לחשוף, להמחיש ולנתח את המנגנונים המנטליים והמוחיים הבלתי-מודעים המעצבים את בחירות הצרכן בעולם הדיגיטלי והפיזי. באמצעות ממשק מצגת מתקדם, מעבדות אינטראקטיביות בזמן אמת, מודל תלת-ממדי של המוח, מוזיקה פרוצדורלית ומנוע חישוב Python מלא הרץ ישירות בדפדפן (Pyodide WebAssembly), הפרויקט מפרק הטיות קוגניטיביות מרכזיות, בוחן את יעילותם של מסרים רגשיים מול עובדתיים, ומציב זרקור אתי וביקורתי על הגבול הדק שבין דחיפה מיטיבה (<bdi>Nudge</bdi>) לבין מניפולציה מסחרית (<bdi>Dark Patterns</bdi>).

---

## 📊 סקירה מקיפה של 20 השקופיות (Slides Overview)

המצגת בנויה במבנה פדגוגי הדרגתי ומדויק בן **20 שקופיות בדיוק**:

| # | כותרת השקופית | נושא מרכזי | סוג תוכן ומדיה | רכיבים אינטראקטיביים ומנועים |
| :-: | :--- | :--- | :--- | :--- |
| **1** | **המוח הצרכני** | פתיח, שער, זהות צוות שוויונית ושיוך לאוניברסיטת חיפה | Hero Image (`consumer_brain_hero.jpg`) | כפתור התחלת מצגת, ניווט ישיר |
| **2** | **מבוא וגבולות המדע: מיתוס מול מציאות** | מתודולוגיה אקדמית, שלילת מיתוסים נוירו-שיווקיים | כרטיסיות השוואת מיתוס מול עובדה | קריאה מובנית, עיצוב Glassmorphism |
| **3** | **מודל שתי המערכות: אינטואיציה מול שיקול דעת** | <bdi>Dual-Process Theory: System 1 & System 2</bdi> (כהנמן וטברסקי) | תרשים וקטורי (`dual_system.svg`) | המחשה תהליכית של אינטואיציה מול ניתוח |
| **4** | **קשב חזותי וסלקטיביות** | <bdi>Visual Attention & Eye-Tracking</bdi>, תבנית סריקה F | מפת חום וקטורית (`visual_attention_heatmap.svg`) | ניתוח מוקדי עניין במסחר מקוון |
| **5** | **תפיסה ועיבוד חושי** | <bdi>Sensory Marketing</bdi> – השפעת חושים על תפיסת איכות | גלגל חושים (`sensory_wheel.svg`) | המחשת התאמה רב-חושית במיתוג |
| **6** | **רגשות וסמנים סומטיים בהחלטות** | תיאוריית הסמנים הסומטיים (<bdi>Antonio Damasio</bdi>) | תרשים וקטורי (`somatic_marker.svg`) | ניתוח תגובות גופניות מקדימות |
| **7** | **זיכרון ואסוציאציות מותג** | רשתות אסוציאטיביות ושליפה מהזיכרון הסמנטי | מפת רשת (`brand_associative_network.svg`) | ניתוח עוצמת קשרים מותגיים |
| **8** | **הדמיה תלת-ממדית: מפת המוח הקונספטואלית** | מיפוי אזורי מוח מרכזיים בקבלת החלטות צרכניות | **מודל תלת-ממדי אינטראקטיבי (Three.js WebGL)** + תרשים (`hero_brain_diagram.jpg`) | סיבוב חופשי 360°, כפתורי שליטה, מיקוד ב-4 אזורים (PFC, אמיגדלה, אינסולה, NAcc) |
| **9** | **אפקט המחסור: למה אנחנו ממהרים לקנות?** | <bdi>Scarcity Effect, FOMO</bdi> ותיאוריית ההתנגדות | תצלום יוקרה מסחרי (`luxury_handbag.jpg`) | **מעבדת A/B אינטראקטיבית** + 3 מחווני דירוג + גרף השוואה + **מנוע Python (Pyodide)** |
| **10** | **פרדוקס הבחירה: האם יותר אפשרויות משמחות יותר?** | <bdi>Choice Overload & Analysis Paralysis</bdi> (שוורץ, איינגאר) | תצלומי בישום (`perfume_trio.jpg`, `perfumes_collection_12.jpg`) | **ניסוי שעון עצר דיגיטלי חי (Live Stopwatch)** (3 מול 12 אפשרויות) + דירוגי קושי + **מנוע Python** |
| **11** | **אפקט הפיתיון ופרדוקס הבחירה** | <bdi>The Decoy Effect (Asymmetric Dominance)</bdi> | דיאגרמה וקטורית (`decoy_effect.svg`) | ניתוח הוספת חלופה נחותה להטיית העדפה |
| **12** | **השפעה והוכחה חברתית** | <bdi>Social Proof</bdi> והפחתת אי-ודאות (<bdi>Cialdini</bdi>) | איור וקטורי (`social_proof.svg`) | ניתוח רמזים נורמטיביים וביקורות המונים |
| **13** | **תורת הסיכויים: למה הפסד כואב יותר מרווח?** | <bdi>Prospect Theory & Loss Aversion</bdi> (כהנמן וטברסקי) | **עקומת S אינטראקטיבית מבוססת SVG** | בורר רווח/הפסד + מחוון סכום (₪0–₪500) + נקודה נעה + חישוב ערך פסיכולוגי $v(x)$ ב-**Python** |
| **14** | **אפקט העיגון: איך המחיר הראשון משפיע עלינו?** | <bdi>Anchoring & Adjustment Heuristic</bdi> | גרף עמודות השוואתי דינמי | מחוון עוגן (₪400–₪1,200) + כפתור חישוב + הרצת נוסחת שווי ב-**Python (Pyodide)** |
| **15** | **כאב התשלום וארנקים דיגיטליים** | <bdi>The "Pain of Paying"</bdi> (פרלק ולוונשטיין) | איור וקטורי (`pain_of_paying.svg`) | ניתוח נטרול פעילות האינסולה בתשלומי 1-Click |
| **16** | **שיווק מבוסס מדע ואתיקה מקצועית** | <bdi>Ethical Marketing vs. Dark Patterns</bdi> | תצלום יוקרה אחיד (`luxury_handbag.jpg`) | **מעבדת Checkout השוואתית** (חנות הוגנת מול מניפולטיבית) + מודאל Confirmshaming + שאלת אבחון + **מנוע Python** |
| **17** | **סוכני AI ועתיד ההחלטות הצרכניות** | <bdi>AI Agents, Machine Customers & Hyper-Personalization</bdi> | דיאגרמת מעגל החלטה (`ai_decision_loop.svg`) | ניתוח עתידני של סוכנים אוטונומיים |
| **18** | **סיכום ותובנות יישומיות** | אינטגרציה מעשית לאנשי שיווק ולצרכנים ביקורתיים | כרטיסיות סיכום מודולריות | עקרונות יישומיים להגברת מודעות ואמון |
| **19** | **כשהפרסומת מעוררת רגש – האם נקנה יותר?** | פרסום רגשי מול ניטרלי, <bdi>Attitude-Behavior Gap</bdi> | תצלומי בושם מקוריים (`perfume_neutral.jpg`, `perfume_emotional.jpg`) | **מעבדת A/B תלת-שלבית** + מוזיקת אווירה ייעודית (Web Audio) + 3 מחווני דירוג + גרף השוואה + **מנוע Python** |
| **20** | **ביבליוגרפיה, קרדיטים ומקורות** | מקורות מחקריים מאומתים, רישוי חזותי וקרדיטים | כרטיסיות ביבליוגרפיה מובנות | סקירת ספרות אקדמית מלאה ורישוי נכסים |

---

## 🔬 פירוט הסימולציות האינטראקטיביות (Interactive Labs)

המצגת כוללת **6 מעבדות אינטראקטיביות מבוססות חישוב אמיתי**:

### 1. שקופית 8 – מודל מוח תלת-ממדי אינטראקטיבי (Three.js WebGL)
- מודל מוח תלת-ממדי חי המבוסס על רשת נקודות וחלקיקים נוירונליים זוהרים.
- סיבוב 360 מעלות חופשי באמצעות גרירת עכבר ומגע.
- 4 מוקדים קונספטואליים אינטראקטיביים עם צלילי תדרים ייחודיים וכרטיסיות מידע פסיכולוגיות:
  - **קליפת המוח הקדם-מצחית (PFC):** בקרה רציונלית, שקילת מחיר וחישוב תקציב (מערכת 2).
  - **אמיגדלה (Amygdala):** דחיפות רגשית, תגובת בהלה ומסרי FOMO.
  - **אינסולה (Insula):** כאב התשלום ודחיית מחירים מופקעים.
  - **גרעין האקומבנס (NAcc):** דופמין, עונג קנייה וציפייה לתגמול.
- תמיכה מלאה ב-Fallback גרפי למכשירים ללא תמיכת WebGL.

### 2. שקופית 9 – מעבדת אפקט המחסור ו-FOMO (The Scarcity Effect)
- השוואת A/B של אותו תיק עור שחור יוקרתי (`MAISON VENDÔME`):
  - **מצב א׳:** המוצר זמין במלאי שוטף.
  - **מצב ב׳:** התרעת מחסור דוחקת ("נותרו רק 2 יחידות במלאי!").
- 3 מחווני דירוג אישיים (סולם 1–10): רצון לרכוש, תחושת דחיפות, וחשש מהחמצה (FOMO).
- גרף השוואה דינמי המופק באמצעות מנוע Python ברקע (`calculate_scarcity_comparison`).

### 3. שקופית 10 – ניסוי פרדוקס הבחירה בזמן אמת (The Paradox of Choice)
- ניסוי מדידה אמפירי מדויק לבחינת עומס יתר בבחירה (<bdi>Choice Overload</bdi>):
  - **סבב 1 (בחירה מצומצמת):** בחירה מתוך 3 בשמי יוקרה, בליווי **שעון עצר דיגיטלי חי** (`performance.now()`) המודד את זמן ההחלטה המדויק.
  - **סבב 2 (עומס אפשרויות):** בחירה מתוך קטלוג של 12 בשמים בעיצוב Obsidian & Gold, עם שעון עצר נפרד.
- דירוג סובייקטיבי של קושי הבחירה (1–10) בכל סבב.
- ניתוח פערים וחישוב מכפיל הזמן ($T_2 / T_1$) באמצעות פונקציית Python ברקע (`calculate_choice_paradox`).

### 4. שקופית 13 – סימולציית תורת הסיכויים (Prospect Theory)
- המחשה אינטראקטיבית של פונקציית הערך הא-סימטרית של כהנמן וטברסקי:
  $$v(x) = \begin{cases} x^{0.88} & \text{for } x \ge 0 \\ -2.25(-x)^{0.88} & \text{for } x < 0 \end{cases}$$
- בורר תרחיש רווח מול הפסד, סליידר סכום כספי (₪0–₪500), והזזת נקודה זוהרת בזמן אמת לאורך עקומת S וקטורית (SVG).
- המחשה ויזואלית לכך שכאב ההפסד חזק פי ~2.25 מעונג הרווח המקביל.

### 5. שקופית 14 – סימולציית אפקט העיגון (Anchoring Effect)
- הצגת מוצר עוגן (אוזניות פרימיום שמחיר הבסיס שלהן הוא ₪399).
- מחוון לשינוי מחיר העוגן (₪400 עד ₪1,200) וכפתור *"🎯 בדקו את השפעת המחיר"*.
- הרצת נוסחת שווי מותאמת ב-Python:
  $$\text{Estimated Valuation} = 399 + 0.3 \times (\text{Anchor} - 399)$$
- גרף עמודות השוואתי דינמי הממחיש את השפעת העוגן על תפיסת הערך.

### 6. שקופית 16 – מעבדת שיווק אתי מול דפוסי חושך (Ethical Marketing & Dark Patterns)
- שתי חוויות Checkout לאותו תיק יוקרתי (₪899):
  - **גרסה א׳ (Fair UX):** מחיר שקוף, ביטוח אופציונלי של ₪49 שאינו מסומן מראש, ביטול חופשי.
  - **גרסה ב׳ (Dark Patterns):** ביטוח של ₪49 מסומן מראש כברירת מחדל (<bdi>Default Effect</bdi>), באנר דחיפות מלאכותי, ומנגנון <bdi>Confirmshaming</bdi> מעורר אשמה בעת ניסיון ביטול (*"לא תודה, אני מעדיפה להישאר ללא הגנה ולקחת סיכון מיותר"*).
- שאלת אבחון אינטראקטיבית ("בחנו את עצמכם") עם משוב מנומק ומדדי אוטונומיה ושקיפות המחושבים ב-Python (`calculate_dark_patterns_ethics`).

### 7. שקופית 19 – מעבדת פרסום רגשי מול ניטרלי (Emotional Advertising Lab)
- ניסוי תלת-שלבי מובנה להשוואת פרסומת ניטרלית מול פרסומת רגשית לאותו בושם יוקרתי (`AURA Privée`, ₪480).
- שילוב מוזיקת אווירה רומנטית מקורית (Web Audio API) בפרסומת ב׳ בלחיצה יזומה.
- דירוג 3 מדדים (רגש חיובי, חיבור למותג, כוונת קנייה) והפקת גרף עמודות השוואתי ב-Python המנתח את פער העמדה-התנהגות (<bdi>Attitude-Behavior Gap</bdi>).

---

## 💻 פירוט הטכנולוגיות שבשימוש (Technologies Used)

1. **HTML5 Semantic & BIDI/RTL Architecture:**
   - מבנה סמנטי של 20 שקופיות מובחנות (`<section class="slide" id="slide-X">`).
   - התאמה מלאה לכיווניות עברית (`dir="rtl"`) ובידוד מונחים אקדמיים באנגלית באמצעות תגיות `<bdi>`.
2. **Modern CSS3 (Design System):**
   - שימוש במשתני עיצוב מרכזיים (CSS Custom Properties).
   - עיצוב כהה ועתידני (Dark Luxury Glassmorphism) עם שכבות שקיפות וטשטוש (`backdrop-filter: blur`).
   - אנימציות מעבר חלקות ועימוד רספונסיבי מותאם לכל גודלי המסכים.
3. **Vanilla JavaScript (ES6+ Modular Architecture):**
   - 9 סקריפטים מודולריים נקיים ללא ספריות כבדות (Zero external runtime bloat):
     - `presentation.js` – בקר שקופיות, ניווט מקלדת, מגע, TOC והיסטוריית URL.
     - `audio.js` – מנוע סינתזת קול ומוזיקה מרחבית.
     - `brain3d.js` – בקר מודל המוח התלת-ממדי.
     - `python_runner.js` – מנהל סביבת Pyodide WebAssembly והרצת 6 מודלי Python.
     - `scarcity_sim.js` – לוגיקת מעבדת אפקט המחסור (שקופית 9).
     - `choice_paradox.js` – לוגיקת ניסוי פרדוקס הבחירה והסטופר (שקופית 10).
     - `prospect_theory.js` – לוגיקת תורת הסיכויים ועקומת ה-SVG (שקופית 13).
     - `ethical_marketing.js` – לוגיקת שיווק אתי ומודאל ה-Confirmshaming (שקופית 16).
     - `emotional_ad.js` – לוגיקת מעבדת הפרסום הרגשי (שקופית 19).
4. **Three.js WebGL Engine (`js/vendor/three.min.js`):**
   - ספרייה מקומית בתצורת Offline מלאה לרינדור גרפי תלת-ממדי מואץ חומרה.
5. **Web Audio API Synthesizer:**
   - סינתזת סאונד פרוצדורלית בזמן אמת (Warm Pads, Ethereal Arpeggios, Feedback Delays, Dynamic Filters).
   - ללא קובצי MP3 חיצוניים, ללא בעיות זכויות יוצרים, ותאימות מלאה לדפדפנים מודרניים.
6. **Pyodide WebAssembly (Client-side CPython v3.11):**
   - הרצת קוד Python תקני ישירות בתוך הדפדפן של הלקוח.
   - 6 פונקציות ניתוח מדעיות הפועלות ברקע ללא הצגת קוד גולמי לצופים.
   - מנגנוני Fallback אלגנטיים ב-JavaScript המבטיחים פעולה רציפה גם בהיעדר רשת.

---

## 🚀 הוראות מדויקות להפעלת הפרויקט (How to Run)

הפרויקט בנוי לפעולה עצמאית ומיידית ללא צורך בהתקנת שרת מקומי (Zero Setup):

1. **פתיחת המצגת:**
   - הורידו או שכפלו את המאגר (`git clone` או הורדת ZIP).
   - לחצו לחיצה כפולה על הקובץ [`index.html`](file:///c:/Users/shams/OneDrive/Documents/GitHub/SHM-2026/index.html) לפתיחה בכל דפדפן מודרני (**Microsoft Edge, Google Chrome, Mozilla Firefox**).
2. **מקשי ניווט ובקרה:**
   - `חץ שמאלה` / `רווח` / `Page Down` – מעבר לשקופית הבאה.
   - `חץ ימינה` / `Page Up` – חזרה לשקופית הקודמת.
   - `Home` – קפיצה לשקופית הפתיחה (שקופית 1).
   - `End` – קפיצה לשקופית הביבליוגרפיה (שקופית 20).
   - `Esc` – סגירת תוכן העניינים או חלונות קופצים.
   - מגע במסכי מגע: החלקת אצבע ימינה/שמאלה (<bdi>Swipe</bdi>).
3. **שליטה בשמע:**
   - לחצו על אייקון הרמקול בסרגל העליון כדי להפעיל או להשתיק את מוזיקת הרקע (ברירת המחדל היא השתקה מלאה בהתאם לתקני הדפדפן).
   - ניתן לכוונן את עוצמת השמע באמצעות מחוון הווליום.
4. **בדיקת מנוע ה-Python בקונסול הדפדפן (לבודקים ומרצים):**
   - לחצו על מקש `F12` (או `Ctrl + Shift + I`) ועברו ללשונית **Console**.
   - הריצו את הפקודה:
     ```javascript
     verifyPythonExecution()
     ```
   - יוצג אובייקט JSON המאשר ומאמת את פעולת CPython WebAssembly עבור כל 6 המודלים המדעיים במצגת.

---

## 🖼️ נכסים חזותיים מרכזיים (Visual Assets)

כל הנכסים החזותיים נשמרים מקומית תחת תיקיית `assets/images/`:
- [`consumer_brain_hero.jpg`](file:///c:/Users/shams/OneDrive/Documents/GitHub/SHM-2026/assets/images/consumer_brain_hero.jpg) – תמונת שער נוירו-גרפית מרשימה לשקופית 1.
- [`hero_brain_diagram.jpg`](file:///c:/Users/shams/OneDrive/Documents/GitHub/SHM-2026/assets/images/hero_brain_diagram.jpg) – תרשים מבנה המוח לשקופית 8 (וגרסת גיבוי ל-Three.js).
- [`luxury_handbag.jpg`](file:///c:/Users/shams/OneDrive/Documents/GitHub/SHM-2026/assets/images/luxury_handbag.jpg) – תצלום מסחרי יוקרתי של תיק עור שחור ופרזול זהב עבור שקופיות 9 ו-16.
- [`perfume_trio.jpg`](file:///c:/Users/shams/OneDrive/Documents/GitHub/SHM-2026/assets/images/perfume_trio.jpg) – שלישיית בשמי יוקרה על שיש כהה לסבב 1 של פרדוקס הבחירה (שקופית 10).
- [`perfumes_collection_12.jpg`](file:///c:/Users/shams/OneDrive/Documents/GitHub/SHM-2026/assets/images/perfumes_collection_12.jpg) – קטלוג 12 בשמים יוקרתיים לסבב 2 של פרדוקס הבחירה (שקופית 10).
- [`perfume_neutral.jpg`](file:///c:/Users/shams/OneDrive/Documents/GitHub/SHM-2026/assets/images/perfume_neutral.jpg) – פרסומת עובדתית ומינימליסטית לשקופית 19.
- [`perfume_emotional.jpg`](file:///c:/Users/shams/OneDrive/Documents/GitHub/SHM-2026/assets/images/perfume_emotional.jpg) – פרסומת רגשית רומנטית עם תאורת שקיעה ואווירה קולנועית לשקופית 19.
- דיאגרמות וקטוריות מקוריות בפורמט SVG לשקופיות 3, 4, 5, 6, 7, 11, 12, 15, 17.

---

## 📂 תיעוד תהליך הפיתוח (Prompts Documentation)

בתיקיית `prompts/` שמור תיעוד מפורט של כל שלבי העבודה והפרומפטים ששימשו בפיתוח:

1. [`01_PRD_Planning.md`](file:///c:/Users/shams/OneDrive/Documents/GitHub/SHM-2026/prompts/01_PRD_Planning.md) – אפיון דרישות המוצר, סילבוס השקופיות ומטרות הפרויקט.
2. [`02_Presentation_Skeleton.md`](file:///c:/Users/shams/OneDrive/Documents/GitHub/SHM-2026/prompts/02_Presentation_Skeleton.md) – הקמת שלד ה-HTML, מערכת העיצוב ב-CSS ומנגנון הניווט.
3. [`03_Visuals_And_Slide1_Update.md`](file:///c:/Users/shams/OneDrive/Documents/GitHub/SHM-2026/prompts/03_Visuals_And_Slide1_Update.md) – יצירת נכסים חזותיים ושדרוג שקופית השער.
4. [`04_ThreeJS_Brain.md`](file:///c:/Users/shams/OneDrive/Documents/GitHub/SHM-2026/prompts/04_ThreeJS_Brain.md) – פיתוח מודל מוח תלת-ממדי מבוסס חלקיקים ב-Three.js בשקופית 8.
5. [`05_Audio_Improvements.md`](file:///c:/Users/shams/OneDrive/Documents/GitHub/SHM-2026/prompts/05_Audio_Improvements.md) – שדרוג מערכת השמע ואיזון צלילי האזורים המוחיים.
6. [`06_Ambient_Music.md`](file:///c:/Users/shams/OneDrive/Documents/GitHub/SHM-2026/prompts/06_Ambient_Music.md) – פיתוח מוזיקת רקע Ambient עתידנית ב-Web Audio API.
7. [`07_Python_Anchoring.md`](file:///c:/Users/shams/OneDrive/Documents/GitHub/SHM-2026/prompts/07_Python_Anchoring.md) – הטמעת מנוע Pyodide WebAssembly וחישוב אפקט העיגון בשקופית 14.
8. [`08_Anchoring_UI.md`](file:///c:/Users/shams/OneDrive/Documents/GitHub/SHM-2026/prompts/08_Anchoring_UI.md) – ליטוש ממשק אפקט העיגון, ניקוי קוד גולמי ושמירה על חישוב רקע אמיתי.
9. [`09_Prospect_Theory_UI.md`](file:///c:/Users/shams/OneDrive/Documents/GitHub/SHM-2026/prompts/09_Prospect_Theory_UI.md) – פיתוח סימולציית תורת הסיכויים ועקומת S בשקופית 13.
10. [`10_Emotional_Advertising.md`](file:///c:/Users/shams/OneDrive/Documents/GitHub/SHM-2026/prompts/10_Emotional_Advertising.md) – פיתוח מעבדת הפרסום הרגשי מול הניטרלי בשקופית 19.
11. [`11_Slide1_Final_Update.md`](file:///c:/Users/shams/OneDrive/Documents/GitHub/SHM-2026/prompts/11_Slide1_Final_Update.md) – עדכון סופי של שקופית 1: שמות הסטודנטיות, שיוך לאוניברסיטת חיפה ותמונת Hero.
12. [`12_Scarcity_Effect.md`](file:///c:/Users/shams/OneDrive/Documents/GitHub/SHM-2026/prompts/12_Scarcity_Effect.md) – פיתוח מעבדת אפקט המחסור ו-FOMO בשקופית 9.
13. [`13_Choice_Paradox.md`](file:///c:/Users/shams/OneDrive/Documents/GitHub/SHM-2026/prompts/13_Choice_Paradox.md) – פיתוח ניסוי פרדוקס הבחירה והסטופר הדיגיטלי בשקופית 10.
14. [`14_Ethical_Marketing_Dark_Patterns.md`](file:///c:/Users/shams/OneDrive/Documents/GitHub/SHM-2026/prompts/14_Ethical_Marketing_Dark_Patterns.md) – פיתוח מעבדת שיווק אתי ודפוסי חושך בשקופית 16.
15. [`15_Final_Project_Review.md`](file:///c:/Users/shams/OneDrive/Documents/GitHub/SHM-2026/prompts/15_Final_Project_Review.md) – סקירה סופית ומקיפה, בקרת איכות (QA) ותיעוד פרויקט לקראת הגשה.
16. [`16_PRD_Upgrade.md`](file:///c:/Users/shams/OneDrive/Documents/GitHub/SHM-2026/prompts/16_PRD_Upgrade.md) – שדרוג מקיף ואקדמי של מסמך אפיון דרישות המוצר ([`PRD.md`](file:///c:/Users/shams/OneDrive/Documents/GitHub/SHM-2026/PRD.md) גרסה 2.0).

---

## ⚠️ מגבלות ידועות והערות מתודולוגיות (Known Limitations)

1. **טעינת Pyodide ברשת מול סביבה מנותקת:**
   - ספריית Pyodide נטענת מ-CDN (`cdn.jsdelivr.net`). בעת הפעלה ראשונית בסביבה נטולת אינטרנט לחלוטין, מנועי החישוב עוברים אוטומטית למנוע גיבוי ב-JavaScript (<bdi>Client Fallback</bdi>) המחשב את התוצאות במדויק מבלי להציג שגיאות למשתמש.
2. **מדיניות השמע של דפדפנים (Autoplay Policy):**
   - דפדפנים מודרניים חוסמים השמעת אודיו אוטומטית לפני אינטראקציה יזומה. לכן, כלל הצלילים ומוזיקת הרקע מושתקים כברירת מחדל ומופעלים אך ורק בלחיצה מפורשת של המשתמש.
3. **הבחנה בין סימולציה לימודית למחקר מעבדה:**
   - הדירוגים והמדידות בסימולציות (מחסור, פרדוקס הבחירה, פרסום רגשי) נועדו להמחיש עקרונות פסיכולוגיים למשתתף יחיד, ואינם מהווים ניסוי אמפירי מבוקר בעל מובהקות סטטיסטית. הדבר מצוין בהבלטה בכל שקופית אינטראקטיבית.

---

## 📚 מקורות אקדמיים מאומתים (Academic References)

- **Ariely, D. (2008).** *Predictably Irrational: The Hidden Forces That Shape Our Decisions*. HarperCollins.
- **Brignull, H. (2010).** *Dark Patterns: Deception vs. Honesty in UI Design*. A List Apart.
- **Cialdini, R. B. (2006).** *Influence: The Psychology of Persuasion*. Harper Business.
- **Damasio, A. R. (1994).** *Descartes' Error: Emotion, Reason, and the Human Brain*. Putnam.
- **Holbrook, M. B., & Batra, R. (1987).** Assessing the role of emotions in consumer response to advertising. *Journal of Consumer Research*, 14(3), 404-420.
- **Iyengar, S. S., & Lepper, M. R. (2000).** When choice is demotivating: Can one desire too much of a good thing? *Journal of Personality and Social Psychology*, 79(6), 995-1006.
- **Johnson, E. J., & Goldstein, D. (2003).** Do defaults save lives? *Science*, 302(5649), 1338-1339.
- **Kahneman, D. (2011).** *Thinking, Fast and Slow*. Farrar, Straus and Giroux.
- **Kahneman, D., & Tversky, A. (1979).** Prospect Theory: An Analysis of Decision under Risk. *Econometrica*, 47(2), 263-291.
- **Petty, R. E., & Cacioppo, J. T. (1986).** The Elaboration Likelihood Model of persuasion. *Advances in Experimental Social Psychology*, 19, 123-205.
- **Prelec, D., & Loewenstein, G. (1998).** The red and the black: Mental accounting of savings and debt. *Marketing Science*, 17(1), 4-28.
- **Schwartz, B. (2004).** *The Paradox of Choice: Why More Is Less*. Ecco / HarperCollins.
- **Thaler, R. H., & Sunstein, C. R. (2008).** *Nudge: Improving Decisions About Health, Wealth, and Happiness*. Yale University Press.
- **Tversky, A., & Kahneman, D. (1974).** Judgment under Uncertainty: Heuristics and Biases. *Science*, 185(4157), 1124-1131.
- **Worchel, S., Lee, J., & Adewole, A. (1975).** Effects of supply and demand on ratings of object value. *Journal of Personality and Social Psychology*, 32(5), 906-914.
- **Zajonc, R. B. (1980).** Feeling and thinking: Preferences need no inferences. *American Psychologist*, 35(2), 151-175.
