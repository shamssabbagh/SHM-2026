/**
 * המוח הצרכני – הפסיכולוגיה שמאחורי החלטות קנייה
 * שקופית 9: אפקט המחסור (Scarcity Effect Simulation)
 * ניתוח השוואתי בין מוצר במלאי שוטף לבין מצב מחסור דוחק ("נותרו רק 2 יחידות!")
 * שילוב מנוע Python בדפדפן (Pyodide WebAssembly) ברקע
 */

(function () {
  'use strict';

  // מצב הסימולציה
  const state = {
    currentStep: 'step_a', // 'step_a' | 'step_b' | 'step_results'
    ratingsA: {
      desire: 4,
      urgency: 3,
      fomo: 3
    },
    ratingsB: {
      desire: 8,
      urgency: 9,
      fomo: 8
    }
  };

  // מאגר אלמנטים
  const elements = {};

  function cacheDOMElements() {
    // שלבי מעקב (Pills)
    elements.trackerStepA = document.getElementById('scarcityTrackerStepA');
    elements.trackerStepB = document.getElementById('scarcityTrackerStepB');
    elements.trackerStepRes = document.getElementById('scarcityTrackerStepRes');

    // פאנלים
    elements.panelStepA = document.getElementById('scarcityPanelStepA');
    elements.panelStepB = document.getElementById('scarcityPanelStepB');
    elements.panelStepResults = document.getElementById('scarcityPanelStepResults');

    // כפתורי מעבר
    elements.btnGoToStepB = document.getElementById('scarcityBtnGoToStepB');
    elements.btnBackToStepA = document.getElementById('scarcityBtnBackToStepA');
    elements.btnGoToResults = document.getElementById('scarcityBtnGoToResults');
    elements.btnRestartSim = document.getElementById('scarcityBtnRestartSim');

    // סליידרים שלב א' (מלאי רגיל)
    elements.sliderDesireA = document.getElementById('scarcityRatingDesireA');
    elements.sliderUrgencyA = document.getElementById('scarcityRatingUrgencyA');
    elements.sliderFomoA = document.getElementById('scarcityRatingFomoA');

    elements.valBadgeDesireA = document.getElementById('scarcityValBadgeDesireA');
    elements.valBadgeUrgencyA = document.getElementById('scarcityValBadgeUrgencyA');
    elements.valBadgeFomoA = document.getElementById('scarcityValBadgeFomoA');

    // סליידרים שלב ב' (נותרו 2 יחידות)
    elements.sliderDesireB = document.getElementById('scarcityRatingDesireB');
    elements.sliderUrgencyB = document.getElementById('scarcityRatingUrgencyB');
    elements.sliderFomoB = document.getElementById('scarcityRatingFomoB');

    elements.valBadgeDesireB = document.getElementById('scarcityValBadgeDesireB');
    elements.valBadgeUrgencyB = document.getElementById('scarcityValBadgeUrgencyB');
    elements.valBadgeFomoB = document.getElementById('scarcityValBadgeFomoB');

    // רכיבי תוצאות (גרף השוואתי)
    elements.barResDesireA = document.getElementById('scarcityBarResDesireA');
    elements.barResDesireB = document.getElementById('scarcityBarResDesireB');
    elements.valResDesireA = document.getElementById('scarcityValResDesireA');
    elements.valResDesireB = document.getElementById('scarcityValResDesireB');
    elements.diffDesireBadge = document.getElementById('scarcityDiffDesireBadge');

    elements.barResUrgencyA = document.getElementById('scarcityBarResUrgencyA');
    elements.barResUrgencyB = document.getElementById('scarcityBarResUrgencyB');
    elements.valResUrgencyA = document.getElementById('scarcityValResUrgencyA');
    elements.valResUrgencyB = document.getElementById('scarcityValResUrgencyB');
    elements.diffUrgencyBadge = document.getElementById('scarcityDiffUrgencyBadge');

    elements.barResFomoA = document.getElementById('scarcityBarResFomoA');
    elements.barResFomoB = document.getElementById('scarcityBarResFomoB');
    elements.valResFomoA = document.getElementById('scarcityValResFomoA');
    elements.valResFomoB = document.getElementById('scarcityValResFomoB');
    elements.diffFomoBadge = document.getElementById('scarcityDiffFomoBadge');
  }

  // =========================================================================
  // ניהול שלבים (Wizard State)
  // =========================================================================

  function setStep(step) {
    state.currentStep = step;

    // עדכון תצוגת פאנלים
    if (elements.panelStepA) elements.panelStepA.style.display = step === 'step_a' ? 'block' : 'none';
    if (elements.panelStepB) elements.panelStepB.style.display = step === 'step_b' ? 'block' : 'none';
    if (elements.panelStepResults) elements.panelStepResults.style.display = step === 'step_results' ? 'block' : 'none';

    // עדכון תגיות מעקב
    if (elements.trackerStepA) elements.trackerStepA.classList.toggle('active', step === 'step_a');
    if (elements.trackerStepB) elements.trackerStepB.classList.toggle('active', step === 'step_b');
    if (elements.trackerStepRes) elements.trackerStepRes.classList.toggle('active', step === 'step_results');

    if (step === 'step_results') {
      renderResults();
    }
  }

  // =========================================================================
  // שקלול תוצאות והפעלת חישוב Python
  // =========================================================================

  function renderResults() {
    const a = state.ratingsA;
    const b = state.ratingsB;

    let res = null;

    // ניסיון הרצת החישוב האמיתי ב-Python דרך Pyodide
    if (typeof window.calculateScarcityPython === 'function') {
      try {
        res = window.calculateScarcityPython(a, b);
      } catch (err) {
        console.warn('[Scarcity Simulation] Python runner call warning, using local math:', err);
      }
    }

    // חישוב מקומי מדויק וזהה במידה ו-Python עדיין נטען או בהמתנה
    if (!res) {
      const diffDesire = b.desire - a.desire;
      const diffUrgency = b.urgency - a.urgency;
      const diffFomo = b.fomo - a.fomo;

      const pctDesire = Math.round(((diffDesire) / Math.max(1, a.desire)) * 100);
      const pctUrgency = Math.round(((diffUrgency) / Math.max(1, a.urgency)) * 100);
      const pctFomo = Math.round(((diffFomo) / Math.max(1, a.fomo)) * 100);

      res = {
        state_a: { desire: a.desire, urgency: a.urgency, fomo: a.fomo },
        state_b: { desire: b.desire, urgency: b.urgency, fomo: b.fomo },
        differences: { desire: diffDesire, urgency: diffUrgency, fomo: diffFomo },
        percentages: { desire: pctDesire, urgency: pctUrgency, fomo: pctFomo }
      };
    }

    // עדכון עמודות הגרף
    updateBarGroup('Desire', res.state_a.desire, res.state_b.desire, res.differences.desire, res.percentages.desire);
    updateBarGroup('Urgency', res.state_a.urgency, res.state_b.urgency, res.differences.urgency, res.percentages.urgency);
    updateBarGroup('Fomo', res.state_a.fomo, res.state_b.fomo, res.differences.fomo, res.percentages.fomo);
  }

  function updateBarGroup(metricKey, valA, valB, diff, pct) {
    const barA = elements[`barRes${metricKey}A`];
    const barB = elements[`barRes${metricKey}B`];
    const valTextA = elements[`valRes${metricKey}A`];
    const valTextB = elements[`valRes${metricKey}B`];
    const diffBadge = elements[`diff${metricKey}Badge`];

    // נרמול סולם 1-10 ל-100% רוחב
    if (barA) barA.style.width = `${(valA / 10) * 100}%`;
    if (barB) barB.style.width = `${(valB / 10) * 100}%`;

    if (valTextA) valTextA.textContent = `${valA}/10`;
    if (valTextB) valTextB.textContent = `${valB}/10`;

    if (diffBadge) {
      const sign = diff >= 0 ? '+' : '';
      const pctSign = pct >= 0 ? '+' : '';
      diffBadge.textContent = `${sign}${diff} נקודות (${pctSign}${pct}%)`;

      diffBadge.className = 'scarcity-diff-badge';
      if (diff > 0) {
        diffBadge.classList.add('positive');
      } else if (diff < 0) {
        diffBadge.classList.add('negative');
      } else {
        diffBadge.classList.add('neutral');
      }
    }
  }

  // =========================================================================
  // חיבור מאזיני אירועים
  // =========================================================================

  function bindEvents() {
    // סליידרים שלב א'
    if (elements.sliderDesireA) {
      elements.sliderDesireA.addEventListener('input', (e) => {
        const val = parseInt(e.target.value, 10);
        state.ratingsA.desire = val;
        if (elements.valBadgeDesireA) elements.valBadgeDesireA.textContent = `${val}/10`;
      });
    }
    if (elements.sliderUrgencyA) {
      elements.sliderUrgencyA.addEventListener('input', (e) => {
        const val = parseInt(e.target.value, 10);
        state.ratingsA.urgency = val;
        if (elements.valBadgeUrgencyA) elements.valBadgeUrgencyA.textContent = `${val}/10`;
      });
    }
    if (elements.sliderFomoA) {
      elements.sliderFomoA.addEventListener('input', (e) => {
        const val = parseInt(e.target.value, 10);
        state.ratingsA.fomo = val;
        if (elements.valBadgeFomoA) elements.valBadgeFomoA.textContent = `${val}/10`;
      });
    }

    // סליידרים שלב ב'
    if (elements.sliderDesireB) {
      elements.sliderDesireB.addEventListener('input', (e) => {
        const val = parseInt(e.target.value, 10);
        state.ratingsB.desire = val;
        if (elements.valBadgeDesireB) elements.valBadgeDesireB.textContent = `${val}/10`;
      });
    }
    if (elements.sliderUrgencyB) {
      elements.sliderUrgencyB.addEventListener('input', (e) => {
        const val = parseInt(e.target.value, 10);
        state.ratingsB.urgency = val;
        if (elements.valBadgeUrgencyB) elements.valBadgeUrgencyB.textContent = `${val}/10`;
      });
    }
    if (elements.sliderFomoB) {
      elements.sliderFomoB.addEventListener('input', (e) => {
        const val = parseInt(e.target.value, 10);
        state.ratingsB.fomo = val;
        if (elements.valBadgeFomoB) elements.valBadgeFomoB.textContent = `${val}/10`;
      });
    }

    // כפתור מעבר משלב א' לשלב ב'
    if (elements.btnGoToStepB) {
      elements.btnGoToStepB.addEventListener('click', () => {
        setStep('step_b');
      });
    }

    // כפתור חזרה משלב ב' לשלב א'
    if (elements.btnBackToStepA) {
      elements.btnBackToStepA.addEventListener('click', () => {
        setStep('step_a');
      });
    }

    // כפתור מעבר לתוצאות
    if (elements.btnGoToResults) {
      elements.btnGoToResults.addEventListener('click', () => {
        setStep('step_results');
      });
    }

    // כפתור אתחול מחדש
    if (elements.btnRestartSim) {
      elements.btnRestartSim.addEventListener('click', () => {
        // איפוס לברירות מחדל
        state.ratingsA = { desire: 4, urgency: 3, fomo: 3 };
        state.ratingsB = { desire: 8, urgency: 9, fomo: 8 };

        if (elements.sliderDesireA) elements.sliderDesireA.value = 4;
        if (elements.sliderUrgencyA) elements.sliderUrgencyA.value = 3;
        if (elements.sliderFomoA) elements.sliderFomoA.value = 3;
        if (elements.valBadgeDesireA) elements.valBadgeDesireA.textContent = '4/10';
        if (elements.valBadgeUrgencyA) elements.valBadgeUrgencyA.textContent = '3/10';
        if (elements.valBadgeFomoA) elements.valBadgeFomoA.textContent = '3/10';

        if (elements.sliderDesireB) elements.sliderDesireB.value = 8;
        if (elements.sliderUrgencyB) elements.sliderUrgencyB.value = 9;
        if (elements.sliderFomoB) elements.sliderFomoB.value = 8;
        if (elements.valBadgeDesireB) elements.valBadgeDesireB.textContent = '8/10';
        if (elements.valBadgeUrgencyB) elements.valBadgeUrgencyB.textContent = '9/10';
        if (elements.valBadgeFomoB) elements.valBadgeFomoB.textContent = '8/10';

        setStep('step_a');
      });
    }
  }

  // אתחול כשה-DOM מוכן
  function init() {
    cacheDOMElements();
    bindEvents();
    setStep('step_a');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
