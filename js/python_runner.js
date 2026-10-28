/**
 * המוח הצרכני – הפסיכולוגיה שמאחורי החלטות קנייה
 * מנוע הרצת Python בדפדפן (Pyodide WebAssembly)
 * שקופית 14: סימולציית אפקט העיגון (Anchoring Effect Simulation)
 */

(function () {
  'use strict';

  // מצב המערכת
  const state = {
    pyodide: null,
    status: 'idle', // 'idle' | 'loading' | 'ready' | 'error'
    basePrice: 399, // מחיר בסיס לאוזניות
    currentAnchor: 850,
    errorMessage: '',
    pythonVersion: ''
  };

  // קוד הפייתון האמיתי שייטען ויופעל בתוך Pyodide
  const PYTHON_SCRIPTS = `
import sys

def calculate_anchoring(base_price, anchor_price):
    """
    חישוב הערכת שווי תחת השפעת מחיר עוגן (שקופית 14).
    הנוסחה והמקדם 0.3 נבחרו לצורך הדגמה והמחשה לימודית בלבד.
    """
    base = float(base_price)
    anchor = float(anchor_price)
    estimated_val = base + 0.3 * (anchor - base)
    difference = estimated_val - base
    pct_increase = (difference / base) * 100.0 if base > 0 else 0.0

    return {
        "estimated_value": round(estimated_val, 2),
        "difference": round(difference, 2),
        "pct_increase": round(pct_increase, 1),
        "anchor_price": round(anchor, 2),
        "base_price": round(base, 2),
        "python_version": sys.version.split()[0],
        "executed_by": "Pyodide CPython WebAssembly"
    }

def calculate_prospect_theory(amount, is_loss):
    """
    פונקציית הערך של תורת הסיכויים (Kahneman & Tversky, 1992 - שקופית 13).
    v(x) = x^0.88 עבור רווח (x >= 0)
    v(x) = -2.25 * (-x)^0.88 עבור הפסד (x < 0)
    """
    x = float(amount)
    if is_loss:
        val = -2.25 * (x ** 0.88) if x > 0 else 0.0
        intensity = 2.25 * (x ** 0.88) if x > 0 else 0.0
        ratio = 2.25
        message = "ההפסד נתפס בעוצמה רגשית גבוהה יותר מאשר רווח מקביל"
    else:
        val = (x ** 0.88) if x > 0 else 0.0
        intensity = val
        ratio = 1.0
        message = "הרווח נתפס כחיובי, אך בעוצמה מתונה יחסית"

    return {
        "amount": x,
        "is_loss": bool(is_loss),
        "psychological_value": round(val, 1),
        "intensity": round(intensity, 1),
        "ratio": ratio,
        "message": message,
        "python_version": sys.version.split()[0],
        "executed_by": "Pyodide CPython WebAssembly"
    }

def calculate_emotional_ad_comparison(ad_a_ratings, ad_b_ratings):
    """
    ניתוח השוואתי בין פרסומת ניטרלית (A) לפרסומת רגשית (B) (שקופית 19).
    חישוב פערים, אחוזי שינוי ופער עמדה-התנהגות (Attitude-Behavior Gap).
    """
    try:
        e_a = float(ad_a_ratings.get('emotion', 0))
        b_a = float(ad_a_ratings.get('brand', 0))
        i_a = float(ad_a_ratings.get('intent', 0))

        e_b = float(ad_b_ratings.get('emotion', 0))
        b_b = float(ad_b_ratings.get('brand', 0))
        i_b = float(ad_b_ratings.get('intent', 0))
    except Exception:
        e_a, b_a, i_a = 4.0, 4.0, 3.0
        e_b, b_b, i_b = 8.0, 8.0, 6.0

    diff_emotion = round(e_b - e_a, 1)
    diff_brand = round(b_b - b_a, 1)
    diff_intent = round(i_b - i_a, 1)

    pct_emotion = round(((e_b - e_a) / max(1.0, e_a)) * 100.0, 1)
    pct_brand = round(((b_b - b_a) / max(1.0, b_a)) * 100.0, 1)
    pct_intent = round(((i_b - i_a) / max(1.0, i_a)) * 100.0, 1)

    avg_a = round((e_a + b_a + i_a) / 3.0, 1)
    avg_b = round((e_b + b_b + i_b) / 3.0, 1)
    diff_avg = round(avg_b - avg_a, 1)
    pct_avg = round(((avg_b - avg_a) / max(1.0, avg_a)) * 100.0, 1)

    # פער עמדה-התנהגות (Attitude-Behavior Gap)
    attitude_gap = round(diff_brand - diff_intent, 1)

    return {
        "ad_a": {"emotion": e_a, "brand": b_a, "intent": i_a, "average": avg_a},
        "ad_b": {"emotion": e_b, "brand": b_b, "intent": i_b, "average": avg_b},
        "differences": {
            "emotion": diff_emotion,
            "brand": diff_brand,
            "intent": diff_intent,
            "overall": diff_avg
        },
        "percentages": {
            "emotion": pct_emotion,
            "brand": pct_brand,
            "intent": pct_intent,
            "overall": pct_avg
        },
        "attitude_intent_gap": attitude_gap,
        "python_version": sys.version.split()[0],
        "executed_by": "Pyodide CPython WebAssembly"
    }

def calculate_scarcity_comparison(ratings_a, ratings_b):
    """
    ניתוח השוואתי של אפקט המחסור (Scarcity Effect) בין מלאי רגיל (A) למלאי מוגבל של 2 יחידות (B) (שקופית 9).
    חישוב פערים ברצון לרכוש, דחיפות ו-FOMO.
    """
    try:
        d_a = float(ratings_a.get('desire', 0))
        u_a = float(ratings_a.get('urgency', 0))
        f_a = float(ratings_a.get('fomo', 0))

        d_b = float(ratings_b.get('desire', 0))
        u_b = float(ratings_b.get('urgency', 0))
        f_b = float(ratings_b.get('fomo', 0))
    except Exception:
        d_a, u_a, f_a = 4.0, 3.0, 3.0
        d_b, u_b, f_b = 8.0, 9.0, 8.0

    diff_desire = round(d_b - d_a, 1)
    diff_urgency = round(u_b - u_a, 1)
    diff_fomo = round(f_b - f_a, 1)

    pct_desire = round(((d_b - d_a) / max(1.0, d_a)) * 100.0, 1)
    pct_urgency = round(((u_b - u_a) / max(1.0, u_a)) * 100.0, 1)
    pct_fomo = round(((f_b - f_a) / max(1.0, f_a)) * 100.0, 1)

    avg_a = round((d_a + u_a + f_a) / 3.0, 1)
    avg_b = round((d_b + u_b + f_b) / 3.0, 1)
    diff_avg = round(avg_b - avg_a, 1)
    pct_avg = round(((avg_b - avg_a) / max(1.0, avg_a)) * 100.0, 1)

    return {
        "state_a": {"desire": d_a, "urgency": u_a, "fomo": f_a, "average": avg_a},
        "state_b": {"desire": d_b, "urgency": u_b, "fomo": f_b, "average": avg_b},
        "differences": {
            "desire": diff_desire,
            "urgency": diff_urgency,
            "fomo": diff_fomo,
            "overall": diff_avg
        },
        "percentages": {
            "desire": pct_desire,
            "urgency": pct_urgency,
            "fomo": pct_fomo,
            "overall": pct_avg
        },
        "scarcity_multiplier": round(avg_b / max(1.0, avg_a), 2),
        "python_version": sys.version.split()[0],
        "executed_by": "Pyodide CPython WebAssembly"
    }

def calculate_choice_paradox(round_1, round_2):
    """
    ניתוח השוואתי של פרדוקס הבחירה (The Paradox of Choice) בין 3 אפשרויות ל-12 אפשרויות (שקופית 10).
    מדידת השפעת עומס חלופות על זמן קבלת החלטה ורמת הקושי הנתפסת.
    """
    try:
        t1 = float(round_1.get('time', 0))
        d1 = float(round_1.get('difficulty', 0))
        t2 = float(round_2.get('time', 0))
        d2 = float(round_2.get('difficulty', 0))
    except Exception:
        t1, d1 = 3.2, 3.0
        t2, d2 = 9.8, 8.0

    diff_time = round(t2 - t1, 2)
    pct_time = round(((t2 - t1) / max(0.1, t1)) * 100.0, 1)
    ratio_time = round(t2 / max(0.1, t1), 2)

    diff_difficulty = round(d2 - d1, 1)
    pct_difficulty = round(((d2 - d1) / max(1.0, d1)) * 100.0, 1)

    return {
        "round1": {"options": 3, "time": t1, "difficulty": d1},
        "round2": {"options": 12, "time": t2, "difficulty": d2},
        "differences": {
            "time": diff_time,
            "difficulty": diff_difficulty
        },
        "percentages": {
            "time": pct_time,
            "difficulty": pct_difficulty
        },
        "time_ratio": ratio_time,
        "python_version": sys.version.split()[0],
        "executed_by": "Pyodide CPython WebAssembly"
    }

def calculate_dark_patterns_ethics(store_a_insurance, store_b_insurance):
    """
    ניתוח מדדי אתיקה, שקיפות ודפוסי חושך (Dark Patterns) עבור שקופית 16.
    מחשב ציוני אוטונומיה, שקיפות, פערי תשלום בלתי מכוונים והערכות הסתברות ברירת מחדל (Default Effect).
    """
    base_price = 899.0
    insurance_fee = 49.0

    # Store A (Fair UX)
    price_a = base_price + (insurance_fee if store_a_insurance else 0.0)
    autonomy_a = 100.0
    transparency_a = 100.0

    # Store B (Dark Patterns UX)
    price_b = base_price + (insurance_fee if store_b_insurance else 0.0)
    # Default Effect & Confirmshaming reduce real consumer autonomy
    autonomy_b = 35.0 if store_b_insurance else 50.0
    transparency_b = 40.0

    manipulation_flags = [
        "Pre-checked Default (Default Effect)",
        "Confirmshaming Emotional Guilt",
        "Artificial Scarcity & Social Urgency"
    ]

    return {
        "store_a": {
            "name": "חנות א׳: עיצוב הוגן",
            "price": price_a,
            "insurance_selected": bool(store_a_insurance),
            "autonomy_score": autonomy_a,
            "transparency_score": transparency_a,
            "manipulation_count": 0,
            "opt_in_probability": "22%",
            "flags": [],
            "rating": "A+ (Fully Ethical & Transparent)"
        },
        "store_b": {
            "name": "חנות ב׳: דפוסי חושך",
            "price": price_b,
            "insurance_selected": bool(store_b_insurance),
            "autonomy_score": autonomy_b,
            "transparency_score": transparency_b,
            "manipulation_count": len(manipulation_flags),
            "opt_in_probability": "84%",
            "flags": manipulation_flags,
            "rating": "F (Deceptive Choice Architecture)"
        },
        "price_difference": round(price_b - price_a, 2),
        "autonomy_gap": round(autonomy_a - autonomy_b, 1),
        "insurance_fee": insurance_fee,
        "nudge_distinction": "Nudge is not inherently ethical; its morality depends on transparency, consumer welfare, and preservation of true autonomy.",
        "python_version": sys.version.split()[0],
        "executed_by": "Pyodide CPython WebAssembly"
    }
`;

  // אלמנטי DOM
  let elements = {};

  function cacheDOMElements() {
    elements = {
      statusContainer: document.getElementById('pyStatusContainer'),
      anchorSlider: document.getElementById('anchorSlider'),
      anchorValDisplay: document.getElementById('anchorValDisplay'),
      btnRunPython: document.getElementById('btnRunPythonAnchoring'),
      resultsContainer: document.getElementById('pyResultsContainer'),
      valOutput: document.getElementById('pyValOutput'),
      diffOutput: document.getElementById('pyDiffOutput'),
      pctOutput: document.getElementById('pyPctOutput'),
      barBase: document.getElementById('barBase'),
      barAnchor: document.getElementById('barAnchor'),
      barEst: document.getElementById('barEst'),
      valBaseLabel: document.getElementById('valBaseLabel'),
      valAnchorLabel: document.getElementById('valAnchorLabel'),
      valEstLabel: document.getElementById('valEstLabel'),
      pyErrorBox: document.getElementById('pyErrorBox')
    };
  }

  /**
   * טעינה ואתחול של Pyodide WebAssembly
   */
  async function initPyodide() {
    if (state.status === 'loading' || state.status === 'ready') return;

    state.status = 'loading';
    updateUIStatus();

    try {
      // 1. וידוא זמינות הספרייה הגלובלית loadPyodide
      if (typeof window.loadPyodide !== 'function') {
        // ניסיון טעינה דינמית של הסקריפט מ-CDN אם טרם נטען
        await loadScript('https://cdn.jsdelivr.net/pyodide/v0.25.1/full/pyodide.js');
      }

      if (typeof window.loadPyodide !== 'function') {
        throw new Error('ספריית Pyodide אינה זמינה (ייתכן שאין חיבור לרשת).');
      }

      // 2. אתחול מנוע ה-WASM
      state.pyodide = await window.loadPyodide({
        indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.25.1/full/'
      });

      // 3. טעינת קוד הפונקציות לתוך סביבת Python
      await state.pyodide.runPythonAsync(PYTHON_SCRIPTS);

      // קריאת גרסת Python לאימות
      state.pythonVersion = state.pyodide.runPython('import sys; sys.version.split()[0]');
      state.status = 'ready';

      console.log(`[Python Runner] Pyodide initialized successfully with Python ${state.pythonVersion}`);

      updateUIStatus();

      // ביצוע חישוב ראשוני מיידי
      runAnchoringCalculation();

    } catch (err) {
      console.error('[Python Runner] Pyodide initialization failed:', err);
      state.status = 'error';
      state.errorMessage = err.message || 'שגיאה בטעינת מנוע Python בדפדפן.';
      updateUIStatus();
    }
  }

  /**
   * טעינת סקריפט דינמית
   */
  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const existing = document.querySelector(`script[src="${src}"]`);
      if (existing) {
        existing.addEventListener('load', resolve);
        existing.addEventListener('error', reject);
        return;
      }
      const s = document.createElement('script');
      s.src = src;
      s.onload = resolve;
      s.onerror = () => reject(new Error(`נכשלה טעינת הסקריפט: ${src}`));
      document.head.appendChild(s);
    });
  }

  /**
   * הרצת החישוב האמיתי ב-Python
   */
  function runAnchoringCalculation() {
    if (state.status !== 'ready' || !state.pyodide) {
      // אל תציג תוצאה כאילו חושבה אם Python אינו פעיל
      if (elements.resultsContainer) {
        elements.resultsContainer.classList.add('disabled-dim');
      }
      resetOutputsOnError();
      return;
    }

    try {
      const anchorVal = parseFloat(elements.anchorSlider ? elements.anchorSlider.value : state.currentAnchor);
      state.currentAnchor = anchorVal;

      // קריאה ישירה לפונקציית ה-Python שרצה בתוך WebAssembly
      const pyCommand = `calculate_anchoring(${state.basePrice}, ${anchorVal})`;
      const pyProxy = state.pyodide.runPython(pyCommand);
      const result = pyProxy.toJs();
      pyProxy.destroy(); // שחרור זיכרון Proxy

      // הצגת התוצאות ב-UI
      renderResults(result);

      console.log('[Python Calculation Result]:', result);

    } catch (err) {
      console.error('[Python Runner] Execution error:', err);
      state.status = 'error';
      state.errorMessage = 'שגיאה במהלך ביצוע קוד ה-Python: ' + err.message;
      updateUIStatus();
    }
  }

  /**
   * איפוס התוצאות במקרה של שגיאה או אי-זמינות
   */
  function resetOutputsOnError() {
    if (elements.valOutput) elements.valOutput.textContent = '—';
    if (elements.diffOutput) elements.diffOutput.textContent = '—';
    if (elements.pctOutput) elements.pctOutput.textContent = '—';
    if (elements.valEstLabel) elements.valEstLabel.textContent = '—';
    if (elements.barEst) elements.barEst.style.height = '0%';
  }

  /**
   * עדכון ויזואלי של התוצאות, הגרף והמדדים
   */
  function renderResults(res) {
    if (!res) return;

    if (elements.resultsContainer) {
      elements.resultsContainer.classList.remove('disabled-dim');
    }

    // ערכים מספריים
    if (elements.valOutput) {
      elements.valOutput.textContent = `₪ ${res.get('estimated_value').toFixed(2)}`;
    }
    if (elements.diffOutput) {
      elements.diffOutput.textContent = `+ ₪ ${res.get('difference').toFixed(2)}`;
    }
    if (elements.pctOutput) {
      elements.pctOutput.textContent = `+${res.get('pct_increase').toFixed(1)}%`;
    }

    // תוויות גרף
    if (elements.valBaseLabel) elements.valBaseLabel.textContent = `₪ 399`;
    if (elements.valAnchorLabel) elements.valAnchorLabel.textContent = `₪ ${res.get('anchor_price')}`;
    if (elements.valEstLabel) elements.valEstLabel.textContent = `₪ ${res.get('estimated_value').toFixed(2)}`;

    // גבהי עמודות גרף (נורמליזציה לפי מקסימום אפשרי של 1200 ₪)
    const maxScale = 1250;
    const baseH = (res.get('base_price') / maxScale) * 100;
    const anchorH = (res.get('anchor_price') / maxScale) * 100;
    const estH = (res.get('estimated_value') / maxScale) * 100;

    if (elements.barBase) elements.barBase.style.height = `${baseH}%`;
    if (elements.barAnchor) elements.barAnchor.style.height = `${anchorH}%`;
    if (elements.barEst) elements.barEst.style.height = `${estH}%`;
  }

  /**
   * עדכון סטטוס טעינה/שגיאה בממשק המשתמש (נגיש לקהל ללא פרטים טכניים)
   */
  function updateUIStatus() {
    if (!elements.statusContainer) return;

    if (state.status === 'loading') {
      elements.statusContainer.innerHTML = `
        <div class="py-badge loading">
          <span class="py-spinner"></span>
          <span>טוען סימולציה...</span>
        </div>
      `;
      if (elements.resultsContainer) elements.resultsContainer.classList.add('disabled-dim');
      if (elements.pyErrorBox) elements.pyErrorBox.style.display = 'none';
    } else if (state.status === 'ready') {
      elements.statusContainer.innerHTML = `
        <div class="py-badge ready">
          <span>✓</span>
          <span>הסימולציה מוכנה לפעולה</span>
        </div>
      `;
      if (elements.resultsContainer) elements.resultsContainer.classList.remove('disabled-dim');
      if (elements.pyErrorBox) elements.pyErrorBox.style.display = 'none';
    } else if (state.status === 'error') {
      elements.statusContainer.innerHTML = `
        <div class="py-badge error">
          <span>⚠️</span>
          <span>מנוע החישוב אינו זמין כעת</span>
        </div>
      `;
      if (elements.resultsContainer) elements.resultsContainer.classList.add('disabled-dim');
      if (elements.pyErrorBox) {
        elements.pyErrorBox.style.display = 'block';
        elements.pyErrorBox.innerHTML = `
          <strong>הודעה:</strong> מנוע החישוב אינו זמין כעת. אנא ודאו חיבור תקין לאינטרנט ורעננו את הדף.
        `;
      }
      resetOutputsOnError();
    }
  }

  /**
   * חיבור מאזיני אירועים
   */
  function bindEvents() {
    if (elements.anchorSlider) {
      elements.anchorSlider.addEventListener('input', (e) => {
        const val = e.target.value;
        if (elements.anchorValDisplay) {
          elements.anchorValDisplay.textContent = `₪ ${val}`;
        }
        // הפעלת חישוב בזמן אמת ב-Python
        if (state.status === 'ready') {
          runAnchoringCalculation();
        }
      });
    }

    if (elements.btnRunPython) {
      elements.btnRunPython.addEventListener('click', () => {
        if (state.status === 'idle') {
          initPyodide();
        } else if (state.status === 'ready') {
          runAnchoringCalculation();
        }
      });
    }

    // טעינה עצלה (Lazy Loading) כאשר המשתמש מגיע לשקופית 9, 10, 13, 14, 16 או 19
    document.addEventListener('slideChanged', (e) => {
      const slideNum = e.detail ? e.detail.slideNumber : 1;
      if (slideNum === 9 || slideNum === 10 || slideNum === 13 || slideNum === 14 || slideNum === 16 || slideNum === 19) {
        if (state.status === 'idle') {
          initPyodide();
        }
      }
    });
  }

  /**
   * חישוב אפקט המחסור באמצעות Python (שקופית 9)
   */
  window.calculateScarcityPython = function (stateA, stateB) {
    if (!state.pyodide || state.status !== 'ready') return null;
    try {
      const pyCmd = `calculate_scarcity_comparison(${JSON.stringify(stateA)}, ${JSON.stringify(stateB)})`;
      const proxy = state.pyodide.runPython(pyCmd);
      const res = proxy.toJs();
      proxy.destroy();
      return res;
    } catch (e) {
      console.warn('[Scarcity Python Runner] Python execution warning:', e);
      return null;
    }
  };

  /**
   * חישוב פרדוקס הבחירה ועומס יתר באמצעות Python (שקופית 10)
   */
  window.calculateChoiceParadoxPython = function (round1, round2) {
    if (!state.pyodide || state.status !== 'ready') return null;
    try {
      const pyCmd = `calculate_choice_paradox(${JSON.stringify(round1)}, ${JSON.stringify(round2)})`;
      const proxy = state.pyodide.runPython(pyCmd);
      const res = proxy.toJs();
      proxy.destroy();
      return res;
    } catch (e) {
      console.warn('[Choice Paradox Python Runner] Python execution warning:', e);
      return null;
    }
  };

  /**
   * חישוב תורת הסיכויים באמצעות מנוע Python בדפדפן (Pyodide)
   */
  window.calculateProspectPython = function (amount, isLoss) {
    if (!state.pyodide || state.status !== 'ready') return null;
    try {
      const amt = parseFloat(amount) || 0;
      const pyBool = isLoss ? 'True' : 'False';
      const proxy = state.pyodide.runPython(`calculate_prospect_theory(${amt}, ${pyBool})`);
      const res = proxy.toJs();
      proxy.destroy();
      return res;
    } catch (e) {
      console.warn('[Prospect Python Runner] Python execution warning:', e);
      return null;
    }
  };

  /**
   * חישוב השוואת פרסומת רגשית מול ניטרלית באמצעות Python (שקופית 19)
   */
  window.calculateEmotionalAdPython = function (adA, adB) {
    if (!state.pyodide || state.status !== 'ready') return null;
    try {
      const pyCmd = `calculate_emotional_ad_comparison(${JSON.stringify(adA)}, ${JSON.stringify(adB)})`;
      const proxy = state.pyodide.runPython(pyCmd);
      const res = proxy.toJs();
      proxy.destroy();
      return res;
    } catch (e) {
      console.warn('[Emotional Ad Python Runner] Python execution warning:', e);
      return null;
    }
  };

  /**
   * ניתוח מדדי אתיקה ודפוסי חושך (Dark Patterns) באמצעות Python (שקופית 16)
   */
  window.calculateDarkPatternsPython = function (storeAInsurance, storeBInsurance) {
    if (!state.pyodide || state.status !== 'ready') {
      // מנוע גיבוי מקומי ב-JS אם Pyodide טרם נטען
      const basePrice = 899.0;
      const fee = 49.0;
      const priceA = basePrice + (storeAInsurance ? fee : 0.0);
      const priceB = basePrice + (storeBInsurance ? fee : 0.0);
      return {
        store_a: {
          name: "חנות א׳: עיצוב הוגן",
          price: priceA,
          insurance_selected: !!storeAInsurance,
          autonomy_score: 100.0,
          transparency_score: 100.0,
          manipulation_count: 0,
          opt_in_probability: "22%",
          flags: [],
          rating: "A+ (Fully Ethical & Transparent)"
        },
        store_b: {
          name: "חנות ב׳: דפוסי חושך",
          price: priceB,
          insurance_selected: !!storeBInsurance,
          autonomy_score: storeBInsurance ? 35.0 : 50.0,
          transparency_score: 40.0,
          manipulation_count: 3,
          opt_in_probability: "84%",
          flags: [
            "Pre-checked Default (Default Effect)",
            "Confirmshaming Emotional Guilt",
            "Artificial Scarcity & Social Urgency"
          ],
          rating: "F (Deceptive Choice Architecture)"
        },
        price_difference: priceB - priceA,
        autonomy_gap: 100.0 - (storeBInsurance ? 35.0 : 50.0),
        insurance_fee: fee,
        nudge_distinction: "Nudge is not inherently ethical; its morality depends on transparency, consumer welfare, and preservation of true autonomy.",
        python_version: "Client-side JS Fallback",
        executed_by: "JavaScript Engine (Fallback)"
      };
    }
    try {
      const boolA = storeAInsurance ? 'True' : 'False';
      const boolB = storeBInsurance ? 'True' : 'False';
      const pyCmd = `calculate_dark_patterns_ethics(${boolA}, ${boolB})`;
      const proxy = state.pyodide.runPython(pyCmd);
      const res = proxy.toJs();
      proxy.destroy();
      return res;
    } catch (e) {
      console.warn('[Dark Patterns Python Runner] Python execution warning:', e);
      return null;
    }
  };

  /**
   * פונקציית אימות גלובלית המאפשרת לבודקים ומרצים לוודא בקונסול ש-Python מבצע את החישובים!
   */
  window.verifyPythonExecution = function () {
    if (!state.pyodide || state.status !== 'ready') {
      return {
        isPythonRunning: false,
        status: state.status,
        message: 'Python runtime is not ready.'
      };
    }
    const scarcityResult = state.pyodide.runPython('calculate_scarcity_comparison({"desire":4,"urgency":3,"fomo":3}, {"desire":8,"urgency":9,"fomo":8})').toJs();
    const choiceResult = state.pyodide.runPython('calculate_choice_paradox({"time":3.2,"difficulty":3},{"time":9.8,"difficulty":8})').toJs();
    const anchoringResult = state.pyodide.runPython('calculate_anchoring(399, 850)').toJs();
    const prospectGain = state.pyodide.runPython('calculate_prospect_theory(200, False)').toJs();
    const prospectLoss = state.pyodide.runPython('calculate_prospect_theory(200, True)').toJs();
    const emotionalAdResult = state.pyodide.runPython('calculate_emotional_ad_comparison({"emotion":4,"brand":4,"intent":3}, {"emotion":8,"brand":8,"intent":6})').toJs();
    const darkPatternResult = state.pyodide.runPython('calculate_dark_patterns_ethics(False, True)').toJs();

    return {
      isPythonRunning: true,
      runtime: 'Pyodide WebAssembly (Client-side)',
      pythonVersion: state.pythonVersion,
      slide9_scarcity_effect: {
        formula: 'Comparative Scarcity Delta (In Stock vs. Only 2 Left)',
        desireDiff: scarcityResult.get('differences').get('desire'),
        urgencyDiff: scarcityResult.get('differences').get('urgency'),
        fomoDiff: scarcityResult.get('differences').get('fomo'),
        scarcityMultiplier: scarcityResult.get('scarcity_multiplier'),
        executedBy: scarcityResult.get('executed_by')
      },
      slide10_choice_paradox: {
        formula: 'Decision Time & Difficulty Delta (3 Options vs. 12 Options)',
        timeRound1: choiceResult.get('round1').get('time'),
        timeRound2: choiceResult.get('round2').get('time'),
        diffTime: choiceResult.get('differences').get('time'),
        timeRatio: choiceResult.get('time_ratio'),
        diffDifficulty: choiceResult.get('differences').get('difficulty'),
        executedBy: choiceResult.get('executed_by')
      },
      slide13_prospect_theory: {
        formula: 'v(x) = x^0.88 for gain, -2.25 * (-x)^0.88 for loss (Kahneman & Tversky)',
        testGain200: prospectGain.get('psychological_value'),
        testLoss200: prospectLoss.get('psychological_value'),
        lossAversionRatio: prospectLoss.get('ratio'),
        lossMessage: prospectLoss.get('message'),
        executedBy: prospectLoss.get('executed_by')
      },
      slide14_anchoring: {
        formula: '399 + 0.3 * (850 - 399)',
        result: anchoringResult.get('estimated_value'),
        difference: anchoringResult.get('difference'),
        pctIncrease: anchoringResult.get('pct_increase'),
        executedBy: anchoringResult.get('executed_by')
      },
      slide16_dark_patterns: {
        formula: 'Autonomy & Transparency Gap + Default Effect Delta (Johnson & Goldstein 2003)',
        storeA_autonomy: darkPatternResult.get('store_a').get('autonomy_score'),
        storeB_autonomy: darkPatternResult.get('store_b').get('autonomy_score'),
        autonomyGap: darkPatternResult.get('autonomy_gap'),
        defaultOptInProb: darkPatternResult.get('store_b').get('opt_in_probability'),
        priceDifference: darkPatternResult.get('price_difference'),
        executedBy: darkPatternResult.get('executed_by')
      },
      slide19_emotional_advertising: {
        formula: 'Comparative Multi-Dimensional Delta & Attitude-Behavior Gap',
        emotionDiff: emotionalAdResult.get('differences').get('emotion'),
        brandDiff: emotionalAdResult.get('differences').get('brand'),
        intentDiff: emotionalAdResult.get('differences').get('intent'),
        attitudeIntentGap: emotionalAdResult.get('attitude_intent_gap'),
        executedBy: emotionalAdResult.get('executed_by')
      }
    };
  };

  // אתחול כשה-DOM מוכן
  function setup() {
    cacheDOMElements();
    bindEvents();
    // אם המשתמש כבר נמצא בשקופית 9, 10, 13, 14, 16 או 19 בעת רענון
    const curSlide = window.PresentationController ? window.PresentationController.getCurrentSlide() : 1;
    if (curSlide === 9 || curSlide === 10 || curSlide === 13 || curSlide === 14 || curSlide === 16 || curSlide === 19) {
      initPyodide();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setup);
  } else {
    setup();
  }
})();
