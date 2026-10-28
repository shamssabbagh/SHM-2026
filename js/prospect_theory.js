/**
 * המוח הצרכני – הפסיכולוגיה שמאחורי החלטות קנייה
 * שקופית 13: סימולציית תורת הסיכויים (Prospect Theory - Kahneman & Tversky)
 * ממשק אינטראקטיבי, גרף עקומת S א-סימטרית, וחישוב פסיכולוגי בזמן אמת.
 */

(function () {
  'use strict';

  // מצב הסימולציה
  const state = {
    mode: 'gain', // 'gain' | 'loss'
    amount: 200,   // סכום ברירת מחדל בש"ח (0 עד 500)
    alpha: 0.88,   // מעריך רגישות פוחתת
    lambda: 2.25   // מקדם שנאת הפסד של כהנמן וטברסקי
  };

  // מאגר אלמנטי DOM
  let elements = {};

  function cacheDOMElements() {
    elements = {
      controlCard: document.getElementById('prospectControlCard'),
      btnGainMode: document.getElementById('btnGainMode'),
      btnLossMode: document.getElementById('btnLossMode'),
      slider: document.getElementById('prospectSlider'),
      amountDisplay: document.getElementById('prospectAmountDisplay'),
      expCard: document.getElementById('prospectExpCard'),
      iconWrap: document.getElementById('prospectIconWrap'),
      mainIcon: document.getElementById('prospectMainIcon'),
      faceIcon: document.getElementById('prospectFaceIcon'),
      expMessage: document.getElementById('prospectExpMessage'),
      ratioBadge: document.getElementById('prospectRatioBadge'),
      valMonetaryText: document.getElementById('valMonetaryText'),
      barMonetary: document.getElementById('barMonetary'),
      valPsychologicalText: document.getElementById('valPsychologicalText'),
      barPsychological: document.getElementById('barPsychological'),
      // אלמנטי גרף SVG
      svgLossPath: document.getElementById('svgLossPath'),
      svgGainPath: document.getElementById('svgGainPath'),
      svgGuideX: document.getElementById('svgGuideX'),
      svgGuideY: document.getElementById('svgGuideY'),
      svgActivePointGroup: document.getElementById('svgActivePointGroup'),
      svgActiveDot: document.getElementById('svgActiveDot'),
      svgTooltipBg: document.getElementById('svgTooltipBg'),
      svgTooltipText: document.getElementById('svgTooltipText'),
      // סרגל תוצאות
      readoutAmount: document.getElementById('readoutAmount'),
      readoutPsychVal: document.getElementById('readoutPsychVal'),
      readoutRatio: document.getElementById('readoutRatio'),
      readoutImpactBox: document.getElementById('readoutImpactBox')
    };
  }

  /**
   * חישוב ערך תורת הסיכויים (Kahneman & Tversky Value Function)
   * עבור רווח: v(x) = x^0.88
   * עבור הפסד: v(x) = -2.25 * (-x)^0.88
   */
  function calculateProspectValue(amount, isLoss) {
    const x = Math.max(0, Math.min(500, parseFloat(amount) || 0));
    if (x === 0) {
      return {
        amount: 0,
        isLoss: isLoss,
        value: 0,
        intensity: 0,
        ratio: 1.0,
        message: 'בנקודת הייחוס (0 ₪) אין תחושת רווח או הפסד'
      };
    }

    if (isLoss) {
      const basePower = Math.pow(x, state.alpha);
      const val = -state.lambda * basePower;
      const intensity = Math.abs(val);
      return {
        amount: x,
        isLoss: true,
        value: val,
        intensity: intensity,
        ratio: state.lambda,
        message: 'ההפסד נתפס בעוצמה רגשית גבוהה יותר מאשר רווח מקביל'
      };
    } else {
      const val = Math.pow(x, state.alpha);
      return {
        amount: x,
        isLoss: false,
        value: val,
        intensity: val,
        ratio: 1.0,
        message: 'הרווח נתפס כחיובי, אך בעוצמה מתונה יחסית'
      };
    }
  }

  /**
   * ציור עקומת תורת הסיכויים ב-SVG
   * ממדים: viewBox 0 0 540 320
   * מרכז הצירים: (270, 165)
   */
  function drawProspectCurves() {
    if (!elements.svgLossPath || !elements.svgGainPath) return;

    const originX = 270;
    const originY = 165;
    const maxDomain = 500;
    const spanX = 220; // 270 +- 220 => X מ-50 עד 490

    // סקאלת Y
    // ב-x = 500, v_gain = 500^0.88 ~ 237.3 => גובה Y ~ 95px
    // ב-x = -500, v_loss = -2.25 * 237.3 ~ -534.0 => גובה Y ~ 118px
    const maxGainVal = Math.pow(maxDomain, state.alpha); // ~237.3
    const maxLossVal = state.lambda * maxGainVal;        // ~534.0
    const gainPxHeight = 95;
    const lossPxHeight = 118;

    // 1. בניית עקומת הפסדים (משמאל למרכז)
    // x רץ מ-500- עד 0
    const lossSteps = 35;
    let lossPathData = '';
    for (let i = 0; i <= lossSteps; i++) {
      const norm = i / lossSteps; // 0 עד 1
      const xVal = -maxDomain * (1 - norm); // -500 עד 0
      const curLoss = -xVal;
      const val = curLoss === 0 ? 0 : -state.lambda * Math.pow(curLoss, state.alpha);
      const pxX = originX + (xVal / maxDomain) * spanX;
      const pxY = originY + (Math.abs(val) / maxLossVal) * lossPxHeight;

      if (i === 0) {
        lossPathData += `M ${pxX.toFixed(1)},${pxY.toFixed(1)}`;
      } else {
        lossPathData += ` L ${pxX.toFixed(1)},${pxY.toFixed(1)}`;
      }
    }
    elements.svgLossPath.setAttribute('d', lossPathData);

    // 2. בניית עקומת רווחים (מימין למרכז)
    // x רץ מ-0 עד 500
    const gainSteps = 35;
    let gainPathData = '';
    for (let i = 0; i <= gainSteps; i++) {
      const norm = i / gainSteps; // 0 עד 1
      const xVal = maxDomain * norm; // 0 עד 500
      const val = xVal === 0 ? 0 : Math.pow(xVal, state.alpha);
      const pxX = originX + (xVal / maxDomain) * spanX;
      const pxY = originY - (val / maxGainVal) * gainPxHeight;

      if (i === 0) {
        gainPathData += `M ${pxX.toFixed(1)},${pxY.toFixed(1)}`;
      } else {
        gainPathData += ` L ${pxX.toFixed(1)},${pxY.toFixed(1)}`;
      }
    }
    elements.svgGainPath.setAttribute('d', gainPathData);
  }

  /**
   * עדכון הממשק והגרף בהתאם למצב הנוכחי
   */
  function updateUI() {
    const isLoss = state.mode === 'loss';
    const amount = state.amount;
    const calc = calculateProspectValue(amount, isLoss);

    // קריאה לרקע ב-Python WebAssembly אם זמין
    if (typeof window.calculateProspectPython === 'function') {
      try {
        window.calculateProspectPython(amount, isLoss);
      } catch (e) {
        // שגיאה שקטה ברקע
      }
    }

    // 1. עדכון כפתורי המצב
    if (elements.btnGainMode && elements.btnLossMode) {
      if (isLoss) {
        elements.btnGainMode.classList.remove('active-gain');
        elements.btnGainMode.setAttribute('aria-pressed', 'false');
        elements.btnLossMode.classList.add('active-loss');
        elements.btnLossMode.setAttribute('aria-pressed', 'true');
      } else {
        elements.btnGainMode.classList.add('active-gain');
        elements.btnGainMode.setAttribute('aria-pressed', 'true');
        elements.btnLossMode.classList.remove('active-loss');
        elements.btnLossMode.setAttribute('aria-pressed', 'false');
      }
    }

    // 2. מחלקות כרטיסים ומסגרות
    if (elements.controlCard) {
      elements.controlCard.classList.toggle('mode-gain', !isLoss);
      elements.controlCard.classList.toggle('mode-loss', isLoss);
    }
    if (elements.expCard) {
      elements.expCard.classList.toggle('gain', !isLoss);
      elements.expCard.classList.toggle('loss', isLoss);
    }

    // 3. תגית הסכום
    if (elements.amountDisplay) {
      elements.amountDisplay.className = `prospect-amount-tag ${isLoss ? 'loss' : 'gain'}`;
      elements.amountDisplay.textContent = isLoss ? `- ₪ ${amount}` : `+ ₪ ${amount}`;
    }

    // 4. כרטיס החוויה הפסיכולוגית: אייקונים ומסר
    if (elements.mainIcon && elements.faceIcon && elements.expMessage) {
      if (isLoss) {
        elements.mainIcon.textContent = amount > 250 ? '💸' : '👛';
        elements.faceIcon.textContent = amount === 0 ? '😐' : (amount > 300 ? '😫' : '😟');
        elements.expMessage.textContent = amount === 0
          ? 'בנקודת הייחוס אין תחושת רווח או הפסד'
          : 'ההפסד נתפס בעוצמה רגשית גבוהה יותר מאשר רווח מקביל';
      } else {
        elements.mainIcon.textContent = amount > 250 ? '🛍️' : '🪙';
        elements.faceIcon.textContent = amount === 0 ? '😐' : (amount > 300 ? '🤩' : '😊');
        elements.expMessage.textContent = amount === 0
          ? 'בנקודת הייחוס אין תחושת רווח או הפסד'
          : 'הרווח נתפס כחיובי, אך בעוצמה מתונה יחסית';
      }
    }

    // 5. השוואת עוצמה (סרגלים)
    if (elements.ratioBadge) {
      elements.ratioBadge.className = `intensity-ratio-badge ${isLoss ? 'loss' : 'gain'}`;
      elements.ratioBadge.textContent = isLoss
        ? (amount === 0 ? 'ללא שינוי (0x)' : 'עוצמה כפולה (פי ~2.25!)')
        : (amount === 0 ? 'ללא שינוי (0x)' : 'עוצמה מתונה (1.0x)');
    }

    if (elements.valMonetaryText) {
      elements.valMonetaryText.textContent = `${amount} ₪`;
    }
    if (elements.barMonetary) {
      const monetaryPct = (amount / 500) * 100;
      elements.barMonetary.style.width = `${monetaryPct.toFixed(1)}%`;
    }

    if (elements.valPsychologicalText) {
      const sign = isLoss ? '-' : '+';
      const pts = Math.abs(calc.value).toFixed(1);
      const intensityDesc = isLoss ? '(כאב כפול)' : '(ערך מתון)';
      elements.valPsychologicalText.textContent = amount === 0 ? '0 נקודות' : `${sign}${pts} נק' ${intensityDesc}`;
    }

    if (elements.barPsychological) {
      // נורמליזציה של סרגל העוצמה לפי המקסימום האפשרי (הפסד של 500 ₪ = ~534 נקודות)
      const maxIntensity = state.lambda * Math.pow(500, state.alpha); // ~534
      const psychPct = (calc.intensity / maxIntensity) * 100;
      elements.barPsychological.style.width = `${psychPct.toFixed(1)}%`;
      elements.barPsychological.className = `intensity-bar-fill psychological ${isLoss ? 'loss' : 'gain'}`;
    }

    // 6. סרגל נתונים תחתון (Readout)
    if (elements.readoutAmount) {
      elements.readoutAmount.textContent = isLoss ? `- ₪ ${amount}` : `+ ₪ ${amount}`;
      elements.readoutAmount.style.color = isLoss ? 'var(--accent-rose)' : 'var(--accent-emerald)';
    }
    if (elements.readoutPsychVal) {
      const sign = isLoss ? '-' : '+';
      elements.readoutPsychVal.textContent = amount === 0 ? '0 נקודות' : `${sign} ${Math.abs(calc.value).toFixed(1)} נקודות`;
      elements.readoutPsychVal.style.color = isLoss ? '#fecdd3' : '#d1fae5';
    }
    if (elements.readoutRatio) {
      elements.readoutRatio.textContent = isLoss
        ? (amount === 0 ? 'ניטרלי' : 'הפסד כואב פי 2.25!')
        : (amount === 0 ? 'ניטרלי' : 'עוצמה מתונה (1.0x)');
    }
    if (elements.readoutImpactBox) {
      elements.readoutImpactBox.style.borderColor = isLoss ? 'rgba(244, 63, 94, 0.45)' : 'rgba(52, 211, 153, 0.45)';
      elements.readoutImpactBox.style.background = isLoss ? 'rgba(244, 63, 94, 0.08)' : 'rgba(52, 211, 153, 0.08)';
    }

    // 7. עדכון מיקום הנקודה והקווים בגרף SVG
    updateGraphPosition(amount, isLoss, calc);
  }

  /**
   * עדכון המיקום של הנקודה הפעילה על גבי הגרף
   */
  function updateGraphPosition(amount, isLoss, calc) {
    if (!elements.svgActivePointGroup || !elements.svgActiveDot) return;

    const originX = 270;
    const originY = 165;
    const maxDomain = 500;
    const spanX = 220;

    const maxGainVal = Math.pow(maxDomain, state.alpha); // ~237.3
    const maxLossVal = state.lambda * maxGainVal;        // ~534.0
    const gainPxHeight = 95;
    const lossPxHeight = 118;

    let pxX, pxY;
    if (amount === 0) {
      pxX = originX;
      pxY = originY;
    } else if (isLoss) {
      pxX = originX - (amount / maxDomain) * spanX;
      pxY = originY + (calc.intensity / maxLossVal) * lossPxHeight;
    } else {
      pxX = originX + (amount / maxDomain) * spanX;
      pxY = originY - (calc.intensity / maxGainVal) * gainPxHeight;
    }

    // הזזת קבוצת הנקודה
    elements.svgActivePointGroup.setAttribute('transform', `translate(${pxX.toFixed(1)}, ${pxY.toFixed(1)})`);

    // צבע הנקודה והמסגרת
    const dotColor = isLoss ? '#ef4444' : '#34d399';
    elements.svgActiveDot.setAttribute('fill', dotColor);
    if (elements.svgTooltipBg) {
      elements.svgTooltipBg.setAttribute('stroke', dotColor);
    }
    if (elements.svgTooltipText) {
      const sign = isLoss ? '- ₪ ' : '+ ₪ ';
      elements.svgTooltipText.textContent = `${sign}${amount}`;
    }

    // עדכון קווי העזר המקווקוים לצירים
    if (elements.svgGuideX && elements.svgGuideY) {
      // קו עזר אנכי לציר ה-X
      elements.svgGuideX.setAttribute('x1', pxX.toFixed(1));
      elements.svgGuideX.setAttribute('y1', originY);
      elements.svgGuideX.setAttribute('x2', pxX.toFixed(1));
      elements.svgGuideX.setAttribute('y2', pxY.toFixed(1));

      // קו עזר אופקי לציר ה-Y
      elements.svgGuideY.setAttribute('x1', originX);
      elements.svgGuideY.setAttribute('y1', pxY.toFixed(1));
      elements.svgGuideY.setAttribute('x2', pxX.toFixed(1));
      elements.svgGuideY.setAttribute('y2', pxY.toFixed(1));
    }
  }

  /**
   * חיבור מאזיני אירועים
   */
  function bindEvents() {
    if (elements.btnGainMode) {
      elements.btnGainMode.addEventListener('click', () => {
        state.mode = 'gain';
        updateUI();
      });
    }

    if (elements.btnLossMode) {
      elements.btnLossMode.addEventListener('click', () => {
        state.mode = 'loss';
        updateUI();
      });
    }

    if (elements.slider) {
      elements.slider.addEventListener('input', (e) => {
        state.amount = parseInt(e.target.value, 10) || 0;
        updateUI();
      });
    }

    // האזנה למעבר שקופיות להבטחת ציור תקין
    document.addEventListener('slideChanged', (e) => {
      const slideNum = e.detail ? e.detail.slideNumber : 1;
      if (slideNum === 13) {
        drawProspectCurves();
        updateUI();
      }
    });

    // התאמה לשינוי גודל חלון
    window.addEventListener('resize', () => {
      drawProspectCurves();
      updateUI();
    });
  }

  // אתחול
  function init() {
    cacheDOMElements();
    bindEvents();
    drawProspectCurves();
    updateUI();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
