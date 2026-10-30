# Visual Redesign Plan: The Consumer Brain (`SHM-2026`)

- **Project:** The Consumer Brain: The Psychology Behind Purchasing Decisions (`המוח הצרכני: הפסיכולוגיה שמאחורי החלטות קנייה`)
- **Branch:** `malak-improvments`
- **Team:** Shams Sabag (Psychology) & Malak Faroji (Communication & Marketing), University of Haifa
- **Creative Concept:** *“You choose. Then discover what influenced your choice.”*
- **Status:** Approved warm ivory/burgundy direction implemented on **Slide 1** and **Slide 19** (`IMPLEMENTED — PILOT`); Slides 2–18 and Slide 20 are `PLANNED`.
- **Related Documents:** [`docs/slide19-improvement-plan.md`](slide19-improvement-plan.md) | [`docs/content-audit.md`](content-audit.md)

---

## 1. Approved Visual Direction & Design Tokens

The redesign replaces the previous dark navy/neon cyberpunk look with a warm, high-contrast **premium editorial and experiential learning** system:

| Role | Token | Hex | Accessibility & Contrast Notes |
| :--- | :--- | :--- | :--- |
| **Warm Ivory Background** | `--editorial-bg` | `#F7F3ED` | Primary slide canvas and page background |
| **Pale Blush Surface** | `--editorial-blush` | `#EBD9DF` | Supporting cards, sidebars, and expandable drawers |
| **Soft Ivory Surface** | `--editorial-card` | `#FCF9F5` | Elevated editorial frames and comparison panels |
| **Deep Burgundy Headings** | `--editorial-burgundy` | `#502638` | `10.1:1` contrast on `#F7F3ED` (WCAG AAA) |
| **Charcoal Body Text** | `--editorial-charcoal` | `#252329` | `14.3:1` contrast on `#F7F3ED` (WCAG AAA) |
| **Muted Editorial Text** | `--editorial-muted` | `#5A5258` | `6.6:1` contrast on `#F7F3ED` (WCAG AA) |
| **Coral Accent (Graphical)** | `--editorial-coral` | `#D85B49` | Used for data bars, active highlights, and borders |
| **Coral Accent (Accessible Text/CTA)** | `--editorial-coral-strong` | `#B83D2B` | Adjusted shade (`4.95:1` on `#F7F3ED`, `5.45:1` with `#FFFFFF`) for small text and primary buttons |

### Editorial Layout & Motion Principles
- **Large Hebrew Typography & Strict RTL:** Expressive `Heebo` headlines, generous line height (`Assistant` body text), and `<bdi>` isolation for all English terms and citations.
- **Editorial Restraint:** No neon glows, heavy dark glassmorphism, or decorative emoji clutter. Hierarchy is achieved through scale, whitespace, fine hairline dividers (`1px solid rgba(80, 38, 56, 0.14)`), and strong photography.
- **Purposeful Motion:** Subtle opacity and transform transitions (`200ms–300ms ease-out`), fully disabled when `@media (prefers-reduced-motion: reduce)` is active.

---

## 2. Verified Product Choice (`Gritti Tutù`) & Temporary Placeholder Policy

### A. Official Product Verification (`grittifragrances.com`)
We replaced the fictional `AURA Privée` product and `₪480` price with a real perfume owned by Malak: **Gritti Tutù**. All product details were verified against the official brand website (`grittifragrances.com`):

| Attribute | Verified Official Specification (`grittifragrances.com`) | Variant Guardrail |
| :--- | :--- | :--- |
| **Brand** | **Gritti** (`Gritti Fragrances` / `Gritti Venetia`, perfumer Luca Gritti, Italy) | Do not invent brand claims. |
| **Collection** | **White Collection** | Part of Luca Gritti's *White Collection*. |
| **Exact Product Name & Version** | **Gritti Tutù** (*Tutù Extrait de Parfum*) | Distinct from **Tutù Blanc** (which is an *Eau de Parfum* in a white bottle with a softer creamy-marshmallow profile). |
| **Concentration & Size** | **Extrait de Parfum**, **100 ml** (`100 מ"ל`) | Do not label as *Eau de Parfum*. |
| **Official Retail Price** | **€ 260** (official `grittifragrances.com` price for 100 ml) | Do not reuse the fictional `₪480` price. |
| **Top / Head Notes (`תווים עליונים`)** | Grapefruit (`אשכולית`), Black Currant (`דומדמניות שחורות`), Coconut (`קוקוס`), Pink Champagne (`שמפניה ורודה`) | Verified directly from `grittifragrances.com`. |
| **Heart / Middle Notes (`תווי לב`)** | Jasmine (`יסמין`), Rose (`ורד`), Heliotrope (`הליוטרופ`), Powder (`תווים פודרתיים`) | Verified directly from `grittifragrances.com`. |
| **Base Notes (`תווי בסיס`)** | Raspberry (`פטל`), Vanilla (`וניל`), Amber (`ענבר`), Musk (`מושק`) | Verified directly from `grittifragrances.com`. |

### B. Temporary Development Placeholder Policy (Until Malak's Bottle Photo Is Provided)
- The existing local files `assets/images/perfume_neutral.jpg` and `assets/images/perfume_emotional.jpg` depict a black-and-gold bottle labeled `AURA Privée`.
- **Strict Honesty Rule:** We **never** relabel the `AURA` bottle as `Gritti Tutù` and **never** present these placeholder images as finished work.
- Until Malak provides her photograph of her `Gritti Tutù` bottle, both image frames display a prominent, high-contrast **Temporary Development Placeholder badge (`תמונת ממלא מקום זמנית לפיתוח — תוחלף בצילום הבקבוק המקורי של Gritti Tutù`)** and accurate `alt` attributes stating that the image is a temporary development placeholder.

---

## 3. Creative Image Plan for Slide 19 (Student-Created Concepts for `Gritti Tutù`)

> **Important Provenance Note:** The three concepts below are **student-created educational advertising concepts** designed for our university course experiment—they are **not** official advertisements by Gritti Fragrances, and **no new images have been produced yet**. Once Malak provides a photo of her `Gritti Tutù` bottle, we will pair a clean factual studio presentation of the bottle against the chosen emotional concept below while keeping the exact same bottle, size (`100 ml`), and price (`€ 260`) across both ads.

### Concept 1: A Travel Memory (`זיכרון ממסע`)
- **Visual Composition:** Malak's `Gritti Tutù` bottle resting on a sunlit stone balcony or linen-draped table beside an open travel journal, a vintage postcard, and soft morning light filtering through shutters.
- **Copy Direction:** *"רגעים ממסע רחוק שנשמרים קרוב: אור בוקר רך, רוח קלה מהחלון, וניחוח אחד שמחזיר אותך מיד אל המקום שבו הרגשת חופשייה באמת."*
- **Psychological Mechanism:** **Autobiographical Episodic Memory & Nostalgia** (`Herz & Engen, 1996`; `Holbrook & Schindler, 2003`) — linking scent cues to personal travel memories and escapism.

### Concept 2: Getting Ready for a Meaningful Occasion (`התארגנות לקראת רגע משמעותי`) — **[RECOMMENDED]**
- **Visual Composition:** Malak's `Gritti Tutù` bottle in warm evening dressing-table light beside a silk scarf or jewelry tray, a soft mirror reflection in the background, capturing the quiet, poised final moment before stepping out to an important evening.
- **Copy Direction:** *"הדקה השקטה שלפני הרגע הגדול: נשימה עמוקה מול המראה, מגע של משי, והתחושה המדויקת של נוכחות, ביטחון ורוך שנשארים איתך לאורך כל הערב."*
- **Psychological Mechanism:** **Self-Concept, Poise & Anticipatory Affect** (`Holbrook & Batra, 1987`; `Petty & Cacioppo, 1986`) — connecting the fragrance to the ritual of self-assurance, grace, and emotional readiness.

### Concept 3: A Gift with a Handwritten Note (`מתנה אישית עם פתק בכתב יד`)
- **Visual Composition:** Malak's `Gritti Tutù` bottle nestled beside its cream textured box, a ribbon, and a warmivory card bearing a short handwritten note in ink.
- **Copy Direction:** *"יש מילים שנשארות על הנייר, ויש מחוות שנשארות באוויר. מתנה שנבחרה במחשבה אישית — כדי להזכיר בכל יום כמה את משמעותית."*
- **Psychological Mechanism:** **Interpersonal Warmth, Gratitude & Symbolic Gift-Giving** (`Sherry, 1983`; `Zajonc, 1980`) — evoking social connection and emotional reciprocity.

### Recommendation & Connection to the Lesson
- **Recommended Concept:** **Concept 2 — Getting Ready for a Meaningful Occasion (`התארגנות לקראת רגע משמעותי`)**.
- **Why It Best Serves the Lesson:**
  1. **Direct Fit with `Gritti Tutù`'s Identity:** Luca Gritti created *Tutù* around the poise, grace, and quiet strength of a dancer preparing to step onto the stage. Concept 2 translates that exact emotional ritual into everyday consumer life without inventing false product claims.
  2. **Clean Experimental Contrast:** Unlike a couple silhouette or a gift from someone else (which can introduce external social variables depending on the viewer's relationship status), the personal ritual of getting ready for an important moment is **universally relatable** and directly tests whether framing the **exact same bottle (`Gritti Tutù, 100 ml, € 260`)** around *emotional self-assurance and anticipation* shifts self-reported emotion, brand attitude, and purchase intention compared to a factual olfactory pyramid.
  3. **Feasible Student Production:** Malak can photograph her real `Gritti Tutù` bottle on the same neutral surface in two controlled setups: (a) clean, even daylight with no props for the factual ad, and (b) warm lamp light with a simple silk fabric/mirror accent for the emotional ad.

---

## 4. Three Creative Options for Key Experiences

### A. Opening Experience (Slide 1)
1. **Option A1 — "The Editorial Object & Question" (Asymmetric Magazine Cover) [RECOMMENDED & IMPLEMENTED IN PILOT]**
   - **Concept:** Opens directly with the provocative question *"מי באמת מחליט מה נקנה?"* set in oversized deep burgundy typography against warm ivory `#F7F3ED`, a `"בואו נבדוק"` entry CTA, equal academic bylines for Shams Sabag and Malak Faroji, and an editorial product frame (currently showing the temporary placeholder image with an explicit placeholder badge).
2. **Option A2 — "The Split-Second Choice" (Interactive Micro-Poll Cover) [PROPOSED]**
3. **Option A3 — "Typographic Manifesto" (Full-Bleed Kinetic Type) [PROPOSED]**

### B. 3D Brain Sequence (Slide 8)
1. **Option B1 — "Warm Sculptural Atlas" (Ivory Studio WebGL + Editorial Case Cards) [RECOMMENDED — PLANNED]**
2. **Option B2 — "Choice-to-Brain Storyboard" (Stepwise Scenario Trigger) [PROPOSED]**
3. **Option B3 — "Split Anatomy & Audio Lab" (Minimalist Wireframe + Frequency Bar) [PROPOSED]**

### C. Emotional Advertising Activity (Slide 19)
1. **Option C1 — "Two-Phase Blind Exposure (`מודעה א׳` / `מודעה ב׳`) + Unbiased Comparison + Expandable Theory" [RECOMMENDED & IMPLEMENTED]**
   - **Flow:**
     1. Shows the first ad prominently (using neutral label `"מודעה א׳"` and randomized presentation order) with a `"דרגו את הרושם"` button.
     2. Clicking `"דרגו את הרושם"` reveals the 3 clearly labelled rating questions (`1–10`), requiring an explicit answer/confirmation for every question (with one-click midpoint `5/10` confirmation so users never have to drag a slider away and back).
     3. Repeats the exact same flow for the second ad (`"מודעה ב׳"`).
     4. Shows a side-by-side comparison based **only** on the visitor's submitted ratings, revealing the intended advertising approaches (*factual specification* vs. *emotional narrative*) only **after** rating, while mapping all ratings accurately to each ad regardless of display order.
     5. Offers an expandable theoretical and methodological limitations drawer explaining how multiple differences in image/copy, prior brand familiarity with a real perfume (`Gritti Tutù`), and seeing both ads sequentially limit causal interpretation.
2. **Option C2 — "Full-Screen Magazine Flipbook" (Overlay Rating Drawer) [PROPOSED]**
3. **Option C3 — "Side-by-Side Ad Critique Studio" (Simultaneous Dual View) [PROPOSED]**

---

## 5. Slide-by-Slide Redesign Plan (All 20 Slides)

| Slide | Status | 1. Essential Learning Objective | 2. Concise Headline (Hebrew) | 3. Visual or Interactive Teaching Idea | 4. Academic Detail & Citations to Keep Available |
| :---: | :---: | :--- | :--- | :--- | :--- |
| **1** | **IMPLEMENTED (PILOT)** | Hook the learner with the core question of consumer agency vs. unconscious influence. | **מי באמת מחליט מה נקנה?** | Asymmetric magazine cover with editorial product focal point (marked as temporary placeholder), concise team byline, and `"בואו נבדוק"` entry CTA. | Equal credit for **שמס סבאג** (Psychology) & **מלאק פרוג'ה** (Communication & Marketing), University of Haifa, Course: AI Agents & Vibe Coding (Assignment 1). |
| **2** | `PLANNED` | Distinguish empirical consumer psychology from popular "buy-button" neuromarketing myths. | **אין "כפתור קנייה" במוח: מדע מול מיתוס** | Editorial two-column "Myth vs. Empirical Reality" comparison strips in pale blush `#EBD9DF` and burgundy `#502638`. | Academic transparency disclaimer (`fMRI/EEG` limitations), Bounded Rationality (`Simon, 1955; Kahneman, 2011`), subliminal priming limits. |
| **3** | `PLANNED` | Contrast fast, associative intuition (System 1) with slow, effortful deliberation (System 2). | **שתי מערכות, החלטה אחת: אינטואיציה מול חשיבה** | Redesigned warm editorial SVG comparing System 1 (coral `#D85B49`) and System 2 (burgundy `#502638`) across speed, effort, and retail triggers. | Dual-Process Theory (`Stanovich & West, 2000; Kahneman, 2011; Kahneman & Tversky`). |
| **4** | `PLANNED` | Show how visual saliency and scanning patterns filter what shoppers actually notice. | **איפה העין עוצרת? קשב חזותי וסלקטיביות** | Warm editorial e-commerce page wireframe with a saliency & gaze heatmap overlay in coral and burgundy tones. | Bottom-up vs. Top-down visual attention (`Itti & Koch, 2001`), Perceptual Saliency, `F-Pattern` vs. e-commerce scanning (`Nielsen, 2006`). |
| **5** | `PLANNED` | Explain how multisensory cues (scent, weight, sound, touch, color) shape perceived product quality. | **חמשת החושים של המחיר: שיווק חושי** | Editorial 5-sense radial diagram on `#F7F3ED` linking sensory cues to perceived luxury and quality. | Sensory Marketing & Cross-Modal Congruence (`Krishna, 2012; Spence, 2011`). |
| **6** | `PLANNED` | Teach how bodily-emotional signals ("gut feelings") guide choices before conscious reasoning. | **תחושת בטן לפני חישוב: סמנים סומטיים** | Clean horizontal editorial pathway showing Stimulus → Somatic Marker → Rapid Filtering → Choice. | Somatic Marker Hypothesis (`Damasio, 1994; Bechara et al., 1997`). |
| **7** | `PLANNED` | Illustrate how brand associations spread through semantic memory networks at the moment of need. | **איך מותג קופץ לזיכרון? רשתות אסוציאטיביות** | Warm node-and-link network diagram showing spreading activation from a need cue to brand attributes. | Spreading Activation (`Collins & Loftus, 1975`) & Associative Brand Networks (`Keller, 1993`). |
| **8** | `PLANNED` | Map 4 conceptual brain regions involved in value, urgency, payment pain, and reward. | **ארבעה מוקדים בהחלטת הקנייה: מודל תלת-ממדי** | Warm-palette Three.js 3D particle brain (`PFC`, `Amygdala`, `Insula`, `NAcc`) with interactive region focus and Web Audio tones. | Conceptual roles of `PFC`, `Amygdala`, `Insula`, `NAcc` (`Knutson et al., 2007`) + explicit scientific notice that this is a conceptual model, not medical neuroimaging (`fMRI/EEG`). |
| **9** | `PLANNED` | Let users experience how low-stock warnings ("Only 2 left!") amplify urgency and FOMO. | **"נותרו רק 2 במלאי": למה מחסור מאיץ החלטות?** | Two-step A/B product lab (`Maison Vendôme` handbag) comparing routine stock vs. scarcity cue, backed by Python (`Pyodide`) comparison bars. | Scarcity Effect (`Worchel, Lee, & Adewole, 1975; Cialdini, 2006`), Psychological Reactance (`Brehm, 1966`), Anticipated Regret, ethical warning against fake scarcity. |
| **10** | `PLANNED` | Measure firsthand how expanding from 3 to 12 options increases decision time and perceived difficulty. | **כששפע משתק: ניסוי פרדוקס הבחירה** | Live `performance.now()` stopwatch experiment comparing choice from 3 vs. 12 luxury perfumes + Python time-ratio analysis. | Choice Overload & Analysis Paralysis (`Iyengar & Lepper, 2000; Schwartz, 2004; Chernev et al., 2015`), order-effects methodological note. |
| **11** | `PLANNED` | Show how adding an asymmetrically dominated "decoy" option steers buyers toward the premium tier. | **אפקט הפיתיון: האפשרות שלא נועדה להימכר** | Three-column pricing tier comparison highlighting how the decoy makes the target option look superior. | Asymmetric Dominance / Decoy Effect (`Huber, Payne, & Puto, 1982; Ariely, 2008`). |
| **12** | `PLANNED` | Explain how reviews, ratings, and crowd signals reduce uncertainty and drive conformity. | **כולם קונים את זה: הוכחה חברתית בקנייה** | Editorial breakdown of normative cues (ratings, review counts, live viewer badges) on a product card. | Social Proof & Normative Influence (`Cialdini, 2006; Maslowska et al., 2017`). |
| **13** | `PLANNED` | Demonstrate loss aversion: why losing ₪200 hurts ~2.25× more than gaining ₪200 feels good. | **למה הפסד צורב יותר מרווח? תורת הסיכויים** | Interactive SVG S-curve ($v(x)$) on warm ivory canvas with Gain/Loss toggle, ₪0–₪500 slider, and Python calculation. | Prospect Theory & Loss Aversion (`Kahneman & Tversky, 1979; Tversky & Kahneman, 1992`: $v(x)=x^{0.88}$ vs. $-2.25(-x)^{0.88}$). |
| **14** | `PLANNED` | Show how an initial reference price ("anchor") pulls subjective valuation upward. | **המחיר הראשון קובע: מעבדת אפקט העיגון** | Interactive anchor slider (₪400–₪1,200 vs. ₪399 base headphones) with live Python (`Pyodide`) valuation bars. | Anchoring & Adjustment Heuristic (`Tversky & Kahneman, 1974; Ariely et al., 2003`) + explicit note that the `0.3` adjustment coefficient is an illustrative educational formula. |
| **15** | `PLANNED` | Explain how digital wallets and 1-Click checkout decouple payment from the immediate pain of paying. | **לשלם בלי להרגיש: כאב התשלום וארנקים דיגיטליים** | Editorial friction scale comparing physical cash, card swipe, and 1-Click biometric checkout. | Pain of Paying & Coupling/Decoupling (`Prelec & Loewenstein, 1998; Schomburgk et al., 2024`), Insula attenuation. |
| **16** | `PLANNED` | Empower users to distinguish transparent choice architecture (ethical nudge) from deceptive dark patterns. | **עיצוב הוגן מול מניפולציה: אתיקה ודפוסי חושך** | Interactive dual-checkout lab (Fair UX vs. Pre-checked Default + Confirmshaming modal) + diagnostic quiz and Python autonomy metrics. | Nudge (`Thaler & Sunstein, 2008`), Dark Patterns & Confirmshaming (`Brignull, 2010; Luguri & Strahilevitz, 2021`), Default Effect (`Johnson & Goldstein, 2003`), non-payment educational disclaimer. |
| **17** | `PLANNED` | Explore how autonomous AI shopping agents and algorithmic personalization reshape consumer choice. | **כשהאלגוריתם קונה בשבילנו: סוכני AI והעתיד** | Editorial loop diagram tracing behavioral sensing, bias prediction, and machine-to-machine purchasing. | Machine Customers, Hyper-Personalization (`Matz et al., 2017`), and algorithmic choice architecture. |
| **18** | `PLANNED` | Synthesize practical takeaways for both ethical marketers and critical consumers. | **מה לוקחים מכאן? כללים לצרכן החכם ולמשווק ההוגן** | Two-column editorial manifesto: principles for transparent marketing vs. habits for mindful purchasing. | Integrative synthesis of System 1/2, choice architecture, and consumer autonomy. |
| **19** | **IMPLEMENTED (PILOT)** | Test how factual vs. emotional framing of **Gritti Tutù** shapes self-reported emotion, brand attitude, and purchase intent. | **כשהפרסומת מעוררת רגש – האם נקנה יותר?** | Blind-labeled (`מודעה א׳`/`מודעה ב׳`), randomized-order, two-phase (`"דרגו את הרושם"`) ad activity for **Gritti Tutù (`100 ml, € 260`)** with explicit rating confirmation, unbiased comparison, and expandable theory/limitations drawer. | Affective Priming (`Zajonc, 1980`), Emotions in Advertising (`Holbrook & Batra, 1987`), Theory of Reasoned Action (`Ajzen & Fishbein`), ELM (`Petty & Cacioppo, 1986`), Attitude–Intention gap, and within-subject / familiarity methodological limitations. |
| **20** | `PLANNED` | Provide complete, verified academic references (APA) and transparent asset/software credits. | **מקורות אקדמיים, קרדיטים ורישוי** | Clean two-column editorial reference index with APA citations and asset provenance. | All 16 APA academic references + recommended additions from [`docs/content-audit.md`](content-audit.md). |
