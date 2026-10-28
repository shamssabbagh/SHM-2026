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

    // טעינה עצלה (Lazy Loading) כאשר המשתמש מגיע לשקופית 13 או 14
    document.addEventListener('slideChanged', (e) => {
      const slideNum = e.detail ? e.detail.slideNumber : 1;
      if (slideNum === 13 || slideNum === 14) {
        if (state.status === 'idle') {
          initPyodide();
        }
      }
    });
  }

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
    const anchoringResult = state.pyodide.runPython('calculate_anchoring(399, 850)').toJs();
    const prospectGain = state.pyodide.runPython('calculate_prospect_theory(200, False)').toJs();
    const prospectLoss = state.pyodide.runPython('calculate_prospect_theory(200, True)').toJs();

    return {
      isPythonRunning: true,
      runtime: 'Pyodide WebAssembly (Client-side)',
      pythonVersion: state.pythonVersion,
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
      }
    };
  };

  // אתחול כשה-DOM מוכן
  function setup() {
    cacheDOMElements();
    bindEvents();
    // אם המשתמש כבר נמצא בשקופית 13 או 14 בעת רענון
    const curSlide = window.PresentationController ? window.PresentationController.getCurrentSlide() : 1;
    if (curSlide === 13 || curSlide === 14) {
      initPyodide();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setup);
  } else {
    setup();
  }
})();
