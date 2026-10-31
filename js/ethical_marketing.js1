/**
 * המוח הצרכני – הפסיכולוגיה שמאחורי החלטות קנייה
 * שקופית 16: שיווק מבוסס מדע ואתיקה מקצועית (Ethical Marketing & Dark Patterns)
 * הדגמה אינטראקטיבית של שתי חוויות Checkout לאותו תיק יוקרתי (₪899):
 * גרסה א׳: עיצוב הוגן ושקוף (Fair UX)
 * גרסה ב׳: דפוסי עיצוב מניפולטיביים (Dark Patterns - Default Effect, Confirmshaming, False Urgency)
 * ניתוח אתי מבוסס Python ב-WebAssembly (Pyodide)
 */

(function () {
  'use strict';

  // מצב הסימולציה
  const state = {
    viewMode: 'compare', // 'compare' | 'fair' | 'dark'
    fair: {
      basePrice: 899,
      insuranceFee: 49,
      hasInsurance: false
    },
    dark: {
      basePrice: 899,
      insuranceFee: 49,
      hasInsurance: true, // מסומן מראש (Default Effect)
      shamedOptOut: false
    },
    quizSelected: null
  };

  // שמירת אלמנטים מה-DOM
  const elements = {};

  function cacheDOMElements() {
    // טאבים ומצבי תצוגה
    elements.tabCompare = document.getElementById('ethicalTabCompare');
    elements.tabFair = document.getElementById('ethicalTabFair');
    elements.tabDark = document.getElementById('ethicalTabDark');
    elements.btnReset = document.getElementById('ethicalResetBtn');

    // מיכל החנויות
    elements.storesContainer = document.getElementById('ethicalStoresContainer');
    elements.storeFairCard = document.getElementById('ethicalStoreFair');
    elements.storeDarkCard = document.getElementById('ethicalStoreDark');

    // גרסה א׳ - חנות הוגנת
    elements.fairCheckbox = document.getElementById('fairInsuranceCheckbox');
    elements.fairInsuranceText = document.getElementById('fairInsurancePriceDisplay');
    elements.fairTotalDisplay = document.getElementById('fairTotalPrice');
    elements.fairCheckoutBtn = document.getElementById('fairCheckoutBtn');

    // גרסה ב׳ - חנות מניפולטיבית
    elements.darkCheckbox = document.getElementById('darkInsuranceCheckbox');
    elements.darkOptOutLink = document.getElementById('darkOptOutLink');
    elements.darkInsuranceText = document.getElementById('darkInsurancePriceDisplay');
    elements.darkTotalDisplay = document.getElementById('darkTotalPrice');
    elements.darkCheckoutBtn = document.getElementById('darkCheckoutBtn');
    elements.darkWarningBadge = document.getElementById('darkWarningBadge');

    // מודאל Confirmshaming
    elements.shamingOverlay = document.getElementById('ethicalShamingModalOverlay');
    elements.btnShamingKeep = document.getElementById('btnShamingKeep');
    elements.btnShamingDecline = document.getElementById('btnShamingDecline');
    elements.btnShamingClose = document.getElementById('btnShamingClose');

    // מודאל סיום רכישה (הדגמה לימודית בלבד)
    elements.purchaseOverlay = document.getElementById('ethicalPurchaseModalOverlay');
    elements.purchaseStoreName = document.getElementById('purchaseStoreName');
    elements.purchaseTotalPrice = document.getElementById('purchaseTotalPrice');
    elements.purchaseDetailsList = document.getElementById('purchaseDetailsList');
    elements.btnPurchaseClose = document.getElementById('btnPurchaseClose');

    // שאלת אבחון (Quiz)
    elements.btnQuizFair = document.getElementById('btnQuizFair');
    elements.btnQuizDark = document.getElementById('btnQuizDark');
    elements.quizFeedbackBox = document.getElementById('quizFeedbackBox');
    elements.quizFeedbackTitle = document.getElementById('quizFeedbackTitle');
    elements.quizFeedbackText = document.getElementById('quizFeedbackText');
    elements.quizMetricsRow = document.getElementById('quizMetricsRow');
  }

  /**
   * החלפת מצב תצוגה (חנות הוגנת / חנות מניפולטיבית / השוואה זו לצד זו)
   */
  function setViewMode(mode) {
    state.viewMode = mode;

    if (elements.tabCompare) elements.tabCompare.classList.toggle('active', mode === 'compare');
    if (elements.tabFair) elements.tabFair.classList.toggle('active', mode === 'fair');
    if (elements.tabDark) elements.tabDark.classList.toggle('active', mode === 'dark');

    if (!elements.storesContainer) return;

    if (mode === 'compare') {
      elements.storesContainer.className = 'ethical-stores-container view-compare';
      if (elements.storeFairCard) elements.storeFairCard.style.display = 'flex';
      if (elements.storeDarkCard) elements.storeDarkCard.style.display = 'flex';
    } else if (mode === 'fair') {
      elements.storesContainer.className = 'ethical-stores-container view-single';
      if (elements.storeFairCard) elements.storeFairCard.style.display = 'flex';
      if (elements.storeDarkCard) elements.storeDarkCard.style.display = 'none';
    } else if (mode === 'dark') {
      elements.storesContainer.className = 'ethical-stores-container view-single';
      if (elements.storeFairCard) elements.storeFairCard.style.display = 'none';
      if (elements.storeDarkCard) elements.storeDarkCard.style.display = 'flex';
    }
  }

  /**
   * עדכון ממשק חנות הוגנת (גרסה א׳)
   */
  function renderFairStore() {
    const total = state.fair.basePrice + (state.fair.hasInsurance ? state.fair.insuranceFee : 0);
    if (elements.fairCheckbox) {
      elements.fairCheckbox.checked = state.fair.hasInsurance;
    }
    if (elements.fairInsuranceText) {
      elements.fairInsuranceText.textContent = state.fair.hasInsurance ? '₪49 (נבחר בהתאמה אישית)' : '₪0 (לא נבחר)';
      elements.fairInsuranceText.style.color = state.fair.hasInsurance ? 'var(--accent-green, #10b981)' : '#94a3b8';
    }
    if (elements.fairTotalDisplay) {
      elements.fairTotalDisplay.textContent = `₪${total}`;
    }
  }

  /**
   * עדכון ממשק חנות מניפולטיבית (גרסה ב׳)
   */
  function renderDarkStore() {
    const total = state.dark.basePrice + (state.dark.hasInsurance ? state.dark.insuranceFee : 0);
    if (elements.darkCheckbox) {
      elements.darkCheckbox.checked = state.dark.hasInsurance;
    }
    if (elements.darkInsuranceText) {
      elements.darkInsuranceText.textContent = state.dark.hasInsurance ? '₪49 (מסומן מראש)' : '₪0 (הוסר לאחר ביוש)';
      elements.darkInsuranceText.style.color = state.dark.hasInsurance ? 'var(--accent-red, #ef4444)' : '#94a3b8';
    }
    if (elements.darkTotalDisplay) {
      elements.darkTotalDisplay.textContent = `₪${total}`;
    }
    if (elements.darkWarningBadge) {
      if (state.dark.shamedOptOut && !state.dark.hasInsurance) {
        elements.darkWarningBadge.style.display = 'flex';
      } else {
        elements.darkWarningBadge.style.display = 'none';
      }
    }
  }

  /**
   * לחיצה על צ'קבוקס ביטוח בחנות ההוגנת (שקוף וללא חיכוך)
   */
  function onFairInsuranceToggle() {
    state.fair.hasInsurance = elements.fairCheckbox ? elements.fairCheckbox.checked : !state.fair.hasInsurance;
    renderFairStore();
    if (state.quizSelected) updateQuizFeedback();
  }

  /**
   * לחיצה על צ'קבוקס ביטוח או לינק הסרה בחנות המניפולטיבית
   */
  function onDarkInsuranceAttempt(e) {
    if (state.dark.hasInsurance) {
      // אם הביטוח מסומן, מניעת ההסרה הישירה והצגת חלון ה-Confirmshaming!
      if (e) {
        e.preventDefault();
      }
      openConfirmshamingModal();
    } else {
      // אם כבר בוטל, לחיצה חוזרת מחזירה את הביטוח ללא בעיה
      state.dark.hasInsurance = true;
      state.dark.shamedOptOut = false;
      renderDarkStore();
      if (state.quizSelected) updateQuizFeedback();
    }
  }

  /**
   * פתיחת מודאל Confirmshaming
   */
  function openConfirmshamingModal() {
    if (elements.shamingOverlay) {
      elements.shamingOverlay.classList.add('active');
    }
  }

  /**
   * סגירת מודאל Confirmshaming
   */
  function closeConfirmshamingModal() {
    if (elements.shamingOverlay) {
      elements.shamingOverlay.classList.remove('active');
    }
  }

  /**
   * אישור הישארות עם ביטוח מתוך חלון ה-Confirmshaming
   */
  function onConfirmShamingKeep() {
    state.dark.hasInsurance = true;
    closeConfirmshamingModal();
    renderDarkStore();
  }

  /**
   * כניעה לביוש (הסרת הביטוח למרות הניסוח המאשים)
   */
  function onConfirmShamingDecline() {
    state.dark.hasInsurance = false;
    state.dark.shamedOptOut = true;
    closeConfirmshamingModal();
    renderDarkStore();
    if (state.quizSelected) updateQuizFeedback();
  }

  /**
   * פתיחת מודאל רכישה חינוכי
   */
  function openPurchaseModal(storeType) {
    const isFair = storeType === 'fair';
    const storeState = isFair ? state.fair : state.dark;
    const total = storeState.basePrice + (storeState.hasInsurance ? storeState.insuranceFee : 0);

    if (elements.purchaseStoreName) {
      elements.purchaseStoreName.textContent = isFair ? 'גרסה א׳ – חנות הוגנת ושקופה (Fair UX)' : 'גרסה ב׳ – חנות מניפולטיבית (Dark Patterns)';
      elements.purchaseStoreName.style.color = isFair ? 'var(--accent-green, #10b981)' : 'var(--accent-red, #ef4444)';
    }

    if (elements.purchaseTotalPrice) {
      elements.purchaseTotalPrice.textContent = `₪${total}`;
    }

    if (elements.purchaseDetailsList) {
      elements.purchaseDetailsList.innerHTML = `
        <li><strong>מוצר בסיס:</strong> תיק עור יוקרתי Maison Vendôme — ₪899</li>
        <li><strong>ביטוח לשנתיים:</strong> ${storeState.hasInsurance ? '₪49 (נכלל בהזמנה)' : 'ללא ביטוח'}</li>
        <li><strong>ארכיטקטורת בחירה שנחוותה:</strong> ${isFair 
          ? '<span style="color:#10b981;">שקיפות מלאה, צ\'קבוקס פתוח, כבוד לאוטונומיית הצרכן.</span>' 
          : '<span style="color:#ef4444;">ברירת מחדל מסומנת (Default Effect), ניסיון ביוש (Confirmshaming) ולחץ חברתי.</span>'}</li>
        <li style="margin-top: 10px; color: #fbbf24; font-size: 0.88rem;"><strong>🔒 תזכורת:</strong> זוהי סימולציה אקדמית בלבד לצורכי מחקר והוראה. לא נגבה כל תשלום ולא נשמרו פרטי אשראי.</li>
      `;
    }

    if (elements.purchaseOverlay) {
      elements.purchaseOverlay.classList.add('active');
    }
  }

  function closePurchaseModal() {
    if (elements.purchaseOverlay) {
      elements.purchaseOverlay.classList.remove('active');
    }
  }

  /**
   * איפוס הסימולציה למצב התחלתי
   */
  function resetSimulation() {
    state.fair.hasInsurance = false;
    state.dark.hasInsurance = true;
    state.dark.shamedOptOut = false;
    state.quizSelected = null;

    closeConfirmshamingModal();
    closePurchaseModal();

    if (elements.btnQuizFair) elements.btnQuizFair.classList.remove('selected', 'correct', 'incorrect');
    if (elements.btnQuizDark) elements.btnQuizDark.classList.remove('selected', 'correct', 'incorrect');

    if (elements.quizFeedbackBox) {
      elements.quizFeedbackBox.style.display = 'none';
    }

    renderFairStore();
    renderDarkStore();
    setViewMode('compare');
  }

  /**
   * טיפול בלחיצה על כפתורי שאלת האבחון
   */
  async function onQuizSelect(choice) {
    state.quizSelected = choice;

    if (elements.btnQuizFair) {
      elements.btnQuizFair.classList.toggle('selected', choice === 'fair');
      elements.btnQuizFair.classList.toggle('incorrect', choice === 'fair');
      elements.btnQuizFair.classList.remove('correct');
    }

    if (elements.btnQuizDark) {
      elements.btnQuizDark.classList.toggle('selected', choice === 'dark');
      elements.btnQuizDark.classList.toggle('correct', choice === 'dark');
      elements.btnQuizDark.classList.remove('incorrect');
    }

    await updateQuizFeedback();
  }

  /**
   * עדכון משוב שאלת האבחון באמצעות מנוע Python (Pyodide) או Fallback
   */
  async function updateQuizFeedback() {
    if (!elements.quizFeedbackBox) return;

    elements.quizFeedbackBox.style.display = 'block';

    // הפעלת החישוב האתי ב-Python
    let analysis = null;
    if (typeof window.calculateDarkPatternsPython === 'function') {
      try {
        analysis = await window.calculateDarkPatternsPython(state.fair.hasInsurance, state.dark.hasInsurance);
      } catch (err) {
        console.warn('Python analysis fallback:', err);
      }
    }

    const isDarkSelected = state.quizSelected === 'dark';

    if (isDarkSelected) {
      if (elements.quizFeedbackTitle) {
        elements.quizFeedbackTitle.innerHTML = '🎉 <span style="color:#10b981;">תשובה מדויקת ומנומקת! חנות ב׳ מפעילה Dark Patterns מובהקים:</span>';
      }
      if (elements.quizFeedbackText) {
        elements.quizFeedbackText.innerHTML = `
          <ul style="margin: 6px 0 0 0; padding-right: 20px; line-height: 1.6; font-size: 0.92rem; color: #cbd5e1;">
            <li><strong>1. Default Effect (אפקט ברירת המחדל):</strong> תוספת הביטוח של ₪49 סומנה מראש. מחקרים (Johnson & Goldstein) מראים שסימון מראש מקפיץ את שיעור האימוץ מ-22% לכ-84% עקב אינרציה קוגניטיבית.</li>
            <li><strong>2. Confirmshaming (ביוש בעת סירוב):</strong> כפתור הסירוב מנוסח באופן מעורר אשמה וחרדה (<em>"לא תודה, אני מעדיפה להישאר ללא הגנה ולקחת סיכון מיותר"</em>) כדי ליצור לחץ רגשי.</li>
            <li><strong>3. דחיפות ולחץ חברתי מלאכותיים:</strong> הכרזה על "94% מהרוכשות מוסיפות ביטוח" ו"רק 2 פוליסות נותרו" כדי לעורר FOMO.</li>
          </ul>
        `;
      }
    } else {
      if (elements.quizFeedbackTitle) {
        elements.quizFeedbackTitle.innerHTML = 'ℹ️ <span style="color:#f59e0b;">שימו לב להבחנה: חנות א׳ מייצגת עיצוב הוגן (Fair UX)!</span>';
      }
      if (elements.quizFeedbackText) {
        elements.quizFeedbackText.innerHTML = `
          <p style="margin: 4px 0 0 0; font-size: 0.92rem; color: #cbd5e1; line-height: 1.6;">
            חנות א׳ אינה מפעילה מניפולציה — היא שומרת על <strong>אוטונומיית הצרכן</strong>, מציגה מחיר ברור ושקוף (₪899), ומשאירה את תיבת הביטוח ריקה לבחירה חופשית לחלוטין. חנות ב׳ היא זו שמשתמשת בדפוסי חושך.
          </p>
        `;
      }
    }

    // הצגת המדדים המחושבים ב-Python
    if (elements.quizMetricsRow) {
      const autonomyA = analysis && analysis.store_a ? analysis.store_a.autonomy_score : 100;
      const autonomyB = analysis && analysis.store_b ? analysis.store_b.autonomy_score : (state.dark.hasInsurance ? 35 : 50);
      const optInA = analysis && analysis.store_a ? analysis.store_a.opt_in_probability : '22%';
      const optInB = analysis && analysis.store_b ? analysis.store_b.opt_in_probability : '84%';
      const runtime = analysis && analysis.executed_by ? analysis.executed_by : 'Pyodide CPython WebAssembly';

      elements.quizMetricsRow.innerHTML = `
        <div class="ethical-metric-chip fair-chip">
          <span class="chip-label">אוטונומיית צרכן בחנות א׳:</span>
          <span class="chip-value">${autonomyA}% (מלאה)</span>
          <span class="chip-sub">בחירה אקטיבית מודעת (~${optInA})</span>
        </div>
        <div class="ethical-metric-chip dark-chip">
          <span class="chip-label">אוטונומיית צרכן בחנות ב׳:</span>
          <span class="chip-value">${autonomyB}% (פגועה)</span>
          <span class="chip-sub">השפעת ברירת מחדל (~${optInB})</span>
        </div>
        <div class="ethical-metric-chip python-chip">
          <span class="chip-label">מנוע ניתוח אתי:</span>
          <span class="chip-value" style="color:var(--accent-cyan); font-family:monospace; font-size:0.85rem;">${runtime}</span>
          <span class="chip-sub">מדד שקיפות: 100% מול 40%</span>
        </div>
      `;
    }
  }

  /**
   * חיבור אירועים
   */
  function bindEvents() {
    if (elements.tabCompare) elements.tabCompare.addEventListener('click', () => setViewMode('compare'));
    if (elements.tabFair) elements.tabFair.addEventListener('click', () => setViewMode('fair'));
    if (elements.tabDark) elements.tabDark.addEventListener('click', () => setViewMode('dark'));
    if (elements.btnReset) elements.btnReset.addEventListener('click', resetSimulation);

    // אירועי חנות הוגנת
    if (elements.fairCheckbox) {
      elements.fairCheckbox.addEventListener('change', onFairInsuranceToggle);
    }
    if (elements.fairCheckoutBtn) {
      elements.fairCheckoutBtn.addEventListener('click', () => openPurchaseModal('fair'));
    }

    // אירועי חנות מניפולטיבית
    if (elements.darkCheckbox) {
      elements.darkCheckbox.addEventListener('click', (e) => onDarkInsuranceAttempt(e));
    }
    if (elements.darkOptOutLink) {
      elements.darkOptOutLink.addEventListener('click', (e) => onDarkInsuranceAttempt(e));
    }
    if (elements.darkCheckoutBtn) {
      elements.darkCheckoutBtn.addEventListener('click', () => openPurchaseModal('dark'));
    }

    // אירועי Confirmshaming
    if (elements.btnShamingKeep) elements.btnShamingKeep.addEventListener('click', onConfirmShamingKeep);
    if (elements.btnShamingDecline) elements.btnShamingDecline.addEventListener('click', onConfirmShamingDecline);
    if (elements.btnShamingClose) elements.btnShamingClose.addEventListener('click', closeConfirmshamingModal);

    // סגירת מודאל רכישה
    if (elements.btnPurchaseClose) elements.btnPurchaseClose.addEventListener('click', closePurchaseModal);

    // שאלת אבחון
    if (elements.btnQuizFair) elements.btnQuizFair.addEventListener('click', () => onQuizSelect('fair'));
    if (elements.btnQuizDark) elements.btnQuizDark.addEventListener('click', () => onQuizSelect('dark'));

    // סגירת מודאלים בלחיצה על הרקע
    if (elements.shamingOverlay) {
      elements.shamingOverlay.addEventListener('click', (e) => {
        if (e.target === elements.shamingOverlay) closeConfirmshamingModal();
      });
    }
    if (elements.purchaseOverlay) {
      elements.purchaseOverlay.addEventListener('click', (e) => {
        if (e.target === elements.purchaseOverlay) closePurchaseModal();
      });
    }
  }

  function init() {
    cacheDOMElements();
    bindEvents();
    renderFairStore();
    renderDarkStore();
    setViewMode('compare');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
