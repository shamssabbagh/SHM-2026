/**
 * המוח הצרכני – הפסיכולוגיה שמאחורי החלטות קנייה
 * שקופית 19: פעילות השוואתית בפרסום (Gritti Tutù — Extrait de Parfum)
 * חשיפה דו-שלבית ("דרגו את הרושם"), תוויות ניטרליות לפני דירוג ("מודעה א׳" / "מודעה ב׳"),
 * הגרלת סדר הצגה אקראי בכל פעילות חדשה, דרישת אישור מפורש לכל דירוג (כולל בחירת אמצע 5/10 ללא הזזת מחוון),
 * השוואה מבוססת אך ורק על דירוגי המשתתף, וחישוב Python בדפדפן (Pyodide) עם מנגנון גיבוי ב-JavaScript.
 */

(function () {
  'use strict';

  // תבניות התוכן של שתי הגישות הפרסומיות עבור אותו מוצר אמיתי ומאומת:
  // Gritti Tutù (White Collection, Extrait de Parfum, 100 ml, € 260, SKU: DGB00600)
  // מקור תמונות המוצר הרשמיות: https://www.grittifragrances.com/products/tutu-dgb00600
  const AD_APPROACH_TEMPLATES = {
    neutral: {
      approachKey: 'neutral',
      approachNameHe: 'הצגה עובדתית-אינפורמטיבית',
      shortLabelHe: 'עובדתית',
      imgSrc: 'assets/images/gritti_tutu_01.jpg',
      imgAlt: 'בקבוק הבושם המקורי Gritti Tutù Extrait de Parfum (100 ml) בתצלום סטודיו רשמי על רקע נקי',
      bodyHtml: `
        <div class="ad-specs-list">
          <div class="spec-item"><span class="spec-label">ריכוז ותכולה:</span> <span class="spec-val"><bdi>Extrait de Parfum</bdi> • 100 מ"ל (בית הבישום <bdi>Gritti Venetia — White Collection</bdi>)</span></div>
          <div class="spec-item"><span class="spec-label">תווים עליונים:</span> <span class="spec-val">אשכולית, דומדמניות שחורות, קוקוס ושמפניה ורודה</span></div>
          <div class="spec-item"><span class="spec-label">תווי לב ובסיס:</span> <span class="spec-val">יסמין, ורד, הליוטרופ ותווים פודרתיים • פטל, וניל, ענבר ומושק</span></div>
        </div>
        <p class="ad-neutral-note">תיאור מוצר: פירוט תיאורי הניחוח הרשמיים, ריכוז הבושם ותכולת הבקבוק (צילום רשמי: <bdi>Gritti Fragrances</bdi>).</p>
      `
    },
    emotional: {
      approachKey: 'emotional',
      approachNameHe: 'הצגה רגשית-סיפורית',
      shortLabelHe: 'רגשית-סיפורית',
      imgSrc: 'assets/images/gritti_tutu_03.jpg',
      imgAlt: 'בקבוק הבושם המקורי Gritti Tutù Extrait de Parfum (100 ml) על כן מוזהב מוקף עלי ורדים בתאורה רכה',
      bodyHtml: `
        <p class="ad-story-quote">
          "הדקה השקטה שלפני הרגע הגדול: נשימה עמוקה מול המראה, מגע של משי, והתחושה המדויקת של נוכחות, חן ורוך שנשארים איתך לאורך כל הערב."
        </p>
        <div class="ad-specs-list emotional-meta-box">
          <div class="spec-item"><span class="spec-label">ריכוז ותכולה:</span> <span class="spec-val"><bdi>Extrait de Parfum</bdi> • 100 מ"ל (בית הבישום <bdi>Gritti Venetia — White Collection</bdi>)</span></div>
        </div>
        <p class="ad-neutral-note">תיאור מוצר: חיבור הבושם לרגע אישי של התארגנות וציפייה לקראת רגע משמעותי (צילום רשמי: <bdi>Gritti Fragrances</bdi>).</p>
      `
    }
  };

  // מצב הפעילות (ללא הטיה מוקדמת וללא מוזיקה אוטומטית)
  const state = {
    currentStep: 'step_a', // 'step_a' | 'step_b' | 'step_results'
    // סדר הצגת המודעות מוגרל פעם אחת בכל פעילות חדשה:
    // איבר 0 מוצג כ"מודעה א׳", איבר 1 מוצג כ"מודעה ב׳"
    adOrder: ['neutral', 'emotional'],
    // האם המשתמש לחץ על "דרגו את הרושם" כדי לחשוף את שאלות הדירוג בכל שלב
    revealedStepA: false,
    revealedStepB: false,
    // דירוגים לפי שלב התצוגה (מודעה א׳ ומודעה ב׳) — מתחילים בנקודת האמצע 5/10
    stepRatingsA: { emotion: 5, brand: 5, intent: 5 },
    stepRatingsB: { emotion: 5, brand: 5, intent: 5 },
    // מעקב אישור מפורש לכל שאלה בכל שלב
    confirmedStepA: { emotion: false, brand: false, intent: false },
    confirmedStepB: { emotion: false, brand: false, intent: false },
    // דירוגים ממופים לפי גישת הפרסום האמיתית (ratingsA = עובדתית/neutral, ratingsB = רגשית/emotional)
    ratingsA: { emotion: 5, brand: 5, intent: 5 },
    ratingsB: { emotion: 5, brand: 5, intent: 5 },
    isMusicPlaying: false
  };

  // אלמנטי DOM
  let elements = {};

  function cacheDOMElements() {
    elements = {
      // שלבים וסרגל מעקב
      panelStepA: document.getElementById('panelStepA'),
      panelStepB: document.getElementById('panelStepB'),
      panelStepResults: document.getElementById('panelStepResults'),
      trackerStepA: document.getElementById('trackerStepA'),
      trackerStepB: document.getElementById('trackerStepB'),
      trackerStepRes: document.getElementById('trackerStepRes'),
      trackerLabelStepA: document.getElementById('trackerLabelStepA'),
      trackerLabelStepB: document.getElementById('trackerLabelStepB'),

      // כרטיסיות מודעה וחשיפת דירוג
      adGridStepA: document.getElementById('adGridStepA'),
      adGridStepB: document.getElementById('adGridStepB'),
      adBadgeStepA: document.getElementById('adBadgeStepA'),
      adBadgeStepB: document.getElementById('adBadgeStepB'),
      adImgStepA: document.getElementById('adImgStepA'),
      adImgStepB: document.getElementById('adImgStepB'),
      adBodySlotA: document.getElementById('adBodySlotA'),
      adBodySlotB: document.getElementById('adBodySlotB'),
      btnRevealRatingA: document.getElementById('btnRevealRatingA'),
      btnRevealRatingB: document.getElementById('btnRevealRatingB'),
      ratingCardA: document.getElementById('ratingCardA'),
      ratingCardB: document.getElementById('ratingCardB'),

      // מחוונים וכפתורי אישור שלב א' (מודעה א׳)
      sliderEmotionA: document.getElementById('ratingEmotionA'),
      sliderBrandA: document.getElementById('ratingBrandA'),
      sliderIntentA: document.getElementById('ratingIntentA'),
      valBadgeEmotionA: document.getElementById('valBadgeEmotionA'),
      valBadgeBrandA: document.getElementById('valBadgeBrandA'),
      valBadgeIntentA: document.getElementById('valBadgeIntentA'),
      btnConfirmEmotionA: document.getElementById('btnConfirmEmotionA'),
      btnConfirmBrandA: document.getElementById('btnConfirmBrandA'),
      btnConfirmIntentA: document.getElementById('btnConfirmIntentA'),
      ratingGateHintA: document.getElementById('ratingGateHintA'),

      // מחוונים וכפתורי אישור שלב ב' (מודעה ב׳)
      sliderEmotionB: document.getElementById('ratingEmotionB'),
      sliderBrandB: document.getElementById('ratingBrandB'),
      sliderIntentB: document.getElementById('ratingIntentB'),
      valBadgeEmotionB: document.getElementById('valBadgeEmotionB'),
      valBadgeBrandB: document.getElementById('valBadgeBrandB'),
      valBadgeIntentB: document.getElementById('valBadgeIntentB'),
      btnConfirmEmotionB: document.getElementById('btnConfirmEmotionB'),
      btnConfirmBrandB: document.getElementById('btnConfirmBrandB'),
      btnConfirmIntentB: document.getElementById('btnConfirmIntentB'),
      ratingGateHintB: document.getElementById('ratingGateHintB'),

      // כפתורי ניווט בין שלבים
      btnGoToStepB: document.getElementById('btnGoToStepB'),
      btnBackToStepA: document.getElementById('btnBackToStepA'),
      btnBackToStepAFromCard: document.getElementById('btnBackToStepAFromCard'),
      btnGoToResults: document.getElementById('btnGoToResults'),
      btnRestartSim: document.getElementById('btnRestartSim'),

      // תוצאות וגרף בשלב 3
      orderRevealNote: document.getElementById('emotOrderRevealNote'),
      diffEmotionBadge: document.getElementById('diffEmotionBadge'),
      diffBrandBadge: document.getElementById('diffBrandBadge'),
      diffIntentBadge: document.getElementById('diffIntentBadge'),
      labelResEmotionA: document.getElementById('labelResEmotionA'),
      labelResEmotionB: document.getElementById('labelResEmotionB'),
      labelResBrandA: document.getElementById('labelResBrandA'),
      labelResBrandB: document.getElementById('labelResBrandB'),
      labelResIntentA: document.getElementById('labelResIntentA'),
      labelResIntentB: document.getElementById('labelResIntentB'),
      barResEmotionA: document.getElementById('barResEmotionA'),
      barResEmotionB: document.getElementById('barResEmotionB'),
      valResEmotionA: document.getElementById('valResEmotionA'),
      valResEmotionB: document.getElementById('valResEmotionB'),
      barResBrandA: document.getElementById('barResBrandA'),
      barResBrandB: document.getElementById('barResBrandB'),
      valResBrandA: document.getElementById('valResBrandA'),
      valResBrandB: document.getElementById('valResBrandB'),
      barResIntentA: document.getElementById('barResIntentA'),
      barResIntentB: document.getElementById('barResIntentB'),
      valResIntentA: document.getElementById('valResIntentA'),
      valResIntentB: document.getElementById('valResIntentB'),
      calcEngineBadge: document.getElementById('emotCalcEngineBadge'),
      dynamicSummary: document.getElementById('emotDynamicSummary')
    };
  }

  // =========================================================================
  // הגרלת סדר הצגת המודעות ומיפוי הדירוגים לפי גישה פרסומית
  // =========================================================================

  function randomizeAdOrder() {
    state.adOrder = Math.random() < 0.5
      ? ['neutral', 'emotional']
      : ['emotional', 'neutral'];
  }

  function applyAdOrderToCards() {
    const firstKey = state.adOrder[0];
    const secondKey = state.adOrder[1];
    const firstTpl = AD_APPROACH_TEMPLATES[firstKey];
    const secondTpl = AD_APPROACH_TEMPLATES[secondKey];

    // תוויות ניטרליות לפני הדירוג ("מודעה א׳" ו-"מודעה ב׳")
    if (elements.trackerLabelStepA) elements.trackerLabelStepA.textContent = 'מודעה א׳';
    if (elements.trackerLabelStepB) elements.trackerLabelStepB.textContent = 'מודעה ב׳';
    if (elements.adBadgeStepA) elements.adBadgeStepA.textContent = 'מודעה א׳';
    if (elements.adBadgeStepB) elements.adBadgeStepB.textContent = 'מודעה ב׳';

    if (elements.adImgStepA && firstTpl) {
      elements.adImgStepA.src = firstTpl.imgSrc;
      elements.adImgStepA.alt = firstTpl.imgAlt;
    }
    if (elements.adBodySlotA && firstTpl) {
      elements.adBodySlotA.innerHTML = firstTpl.bodyHtml;
    }

    if (elements.adImgStepB && secondTpl) {
      elements.adImgStepB.src = secondTpl.imgSrc;
      elements.adImgStepB.alt = secondTpl.imgAlt;
    }
    if (elements.adBodySlotB && secondTpl) {
      elements.adBodySlotB.innerHTML = secondTpl.bodyHtml;
    }
  }

  /**
   * ממפה את הדירוגים שהוזנו במודעה א׳ ובמודעה ב׳ אל המודעה העובדתית (ratingsA)
   * ואל המודעה הרגשית-סיפורית (ratingsB), ללא תלות בסדר ההצגה.
   */
  function syncRatingsByApproach() {
    if (state.adOrder[0] === 'neutral') {
      state.ratingsA = { ...state.stepRatingsA };
      state.ratingsB = { ...state.stepRatingsB };
    } else {
      state.ratingsA = { ...state.stepRatingsB };
      state.ratingsB = { ...state.stepRatingsA };
    }
  }

  function getDisplayStepLabelForApproach(approachKey) {
    return state.adOrder[0] === approachKey ? 'מודעה א׳' : 'מודעה ב׳';
  }

  // =========================================================================
  // חשיפה דו-שלבית ("דרגו את הרושם") וניהול אישור מפורש לכל דירוג
  // =========================================================================

  function revealRatingPanel(stepLetter) {
    if (stepLetter === 'A') {
      state.revealedStepA = true;
      if (elements.adGridStepA) {
        elements.adGridStepA.classList.remove('rating-collapsed');
        elements.adGridStepA.classList.add('rating-expanded');
      }
      if (elements.ratingCardA) {
        elements.ratingCardA.hidden = false;
        elements.ratingCardA.style.display = 'flex';
      }
      if (elements.btnRevealRatingA) {
        elements.btnRevealRatingA.setAttribute('aria-expanded', 'true');
        elements.btnRevealRatingA.classList.add('is-revealed');
      }
    } else if (stepLetter === 'B') {
      state.revealedStepB = true;
      if (elements.adGridStepB) {
        elements.adGridStepB.classList.remove('rating-collapsed');
        elements.adGridStepB.classList.add('rating-expanded');
      }
      if (elements.ratingCardB) {
        elements.ratingCardB.hidden = false;
        elements.ratingCardB.style.display = 'flex';
      }
      if (elements.btnRevealRatingB) {
        elements.btnRevealRatingB.setAttribute('aria-expanded', 'true');
        elements.btnRevealRatingB.classList.add('is-revealed');
      }
    }
  }

  function isStepFullyConfirmed(stepLetter) {
    const conf = stepLetter === 'A' ? state.confirmedStepA : state.confirmedStepB;
    return Boolean(conf.emotion && conf.brand && conf.intent);
  }

  function updateMetricControlUI(stepLetter, metricKey) {
    const capMetric = metricKey.charAt(0).toUpperCase() + metricKey.slice(1);
    const stepRatings = stepLetter === 'A' ? state.stepRatingsA : state.stepRatingsB;
    const stepConfirmed = stepLetter === 'A' ? state.confirmedStepA : state.confirmedStepB;

    const val = stepRatings[metricKey];
    const isConfirmed = stepConfirmed[metricKey];

    const badgeEl = elements[`valBadge${capMetric}${stepLetter}`];
    const confirmBtnEl = elements[`btnConfirm${capMetric}${stepLetter}`];

    if (badgeEl) {
      badgeEl.textContent = isConfirmed ? `✓ ${val}/10` : `${val}/10 (ממתין)`;
      badgeEl.classList.toggle('confirmed', isConfirmed);
      badgeEl.classList.toggle('unconfirmed', !isConfirmed);
    }

    if (confirmBtnEl) {
      confirmBtnEl.classList.toggle('is-confirmed', isConfirmed);
      confirmBtnEl.setAttribute('aria-pressed', isConfirmed ? 'true' : 'false');
      confirmBtnEl.textContent = isConfirmed ? `✓ אושר (${val}/10)` : `אשר ${val}/10`;
    }
  }

  function updateStepGateUI(stepLetter) {
    const conf = stepLetter === 'A' ? state.confirmedStepA : state.confirmedStepB;
    const confirmedCount = [conf.emotion, conf.brand, conf.intent].filter(Boolean).length;
    const allConfirmed = confirmedCount === 3;

    if (stepLetter === 'A') {
      if (elements.btnGoToStepB) {
        elements.btnGoToStepB.disabled = !allConfirmed;
        elements.btnGoToStepB.setAttribute('aria-disabled', allConfirmed ? 'false' : 'true');
      }
      if (elements.ratingGateHintA) {
        elements.ratingGateHintA.textContent = allConfirmed
          ? '✓ כל 3 הדירוגים עבור מודעה א׳ אושרו — ניתן להמשיך למודעה ב׳.'
          : `אושר ${confirmedCount} מתוך 3: יש לבחור או לאשר ציון בכל 3 השאלות כדי להמשיך.`;
        elements.ratingGateHintA.classList.toggle('ready', allConfirmed);
      }
    } else {
      if (elements.btnGoToResults) {
        elements.btnGoToResults.disabled = !allConfirmed;
        elements.btnGoToResults.setAttribute('aria-disabled', allConfirmed ? 'false' : 'true');
      }
      if (elements.ratingGateHintB) {
        elements.ratingGateHintB.textContent = allConfirmed
          ? '✓ כל 3 הדירוגים עבור מודעה ב׳ אושרו — ניתן להציג את ההשוואה.'
          : `אושר ${confirmedCount} מתוך 3: יש לבחור או לאשר ציון בכל 3 השאלות כדי להציג את ההשוואה.`;
        elements.ratingGateHintB.classList.toggle('ready', allConfirmed);
      }
    }
  }

  function recordRating(stepLetter, metricKey, rawValue) {
    const val = Math.max(1, Math.min(10, parseInt(rawValue, 10) || 5));
    const capMetric = metricKey.charAt(0).toUpperCase() + metricKey.slice(1);
    const sliderEl = elements[`slider${capMetric}${stepLetter}`];
    if (sliderEl && parseInt(sliderEl.value, 10) !== val) {
      sliderEl.value = String(val);
    }

    if (stepLetter === 'A') {
      state.stepRatingsA[metricKey] = val;
      state.confirmedStepA[metricKey] = true;
    } else {
      state.stepRatingsB[metricKey] = val;
      state.confirmedStepB[metricKey] = true;
    }

    syncRatingsByApproach();
    updateMetricControlUI(stepLetter, metricKey);
    updateStepGateUI(stepLetter);
  }

  // =========================================================================
  // ניהול שלבי הפעילות והמעברים
  // =========================================================================

  function setStep(step) {
    // אכיפת אישור מפורש של כל הדירוגים לפני התקדמות קדימה
    if (step === 'step_b' && !isStepFullyConfirmed('A')) {
      revealRatingPanel('A');
      updateStepGateUI('A');
      return;
    }
    if (step === 'step_results' && (!isStepFullyConfirmed('A') || !isStepFullyConfirmed('B'))) {
      if (!isStepFullyConfirmed('A')) {
        state.currentStep = 'step_a';
        revealRatingPanel('A');
        updateStepGateUI('A');
      } else {
        state.currentStep = 'step_b';
        revealRatingPanel('B');
        updateStepGateUI('B');
      }
      return;
    }

    state.currentStep = step;

    if (elements.panelStepA) elements.panelStepA.style.display = step === 'step_a' ? 'block' : 'none';
    if (elements.panelStepB) elements.panelStepB.style.display = step === 'step_b' ? 'block' : 'none';
    if (elements.panelStepResults) elements.panelStepResults.style.display = step === 'step_results' ? 'block' : 'none';

    if (elements.trackerStepA) elements.trackerStepA.classList.toggle('active', step === 'step_a');
    if (elements.trackerStepB) elements.trackerStepB.classList.toggle('active', step === 'step_b');
    if (elements.trackerStepRes) elements.trackerStepRes.classList.toggle('active', step === 'step_results');

    // חשיפת הגישות הפרסומיות בסרגל הצעדים רק לאחר סיום הדירוג (בשלב 3)
    if (step === 'step_results') {
      const firstTpl = AD_APPROACH_TEMPLATES[state.adOrder[0]];
      const secondTpl = AD_APPROACH_TEMPLATES[state.adOrder[1]];
      if (elements.trackerLabelStepA && firstTpl) {
        elements.trackerLabelStepA.textContent = `מודעה א׳ (${firstTpl.shortLabelHe})`;
      }
      if (elements.trackerLabelStepB && secondTpl) {
        elements.trackerLabelStepB.textContent = `מודעה ב׳ (${secondTpl.shortLabelHe})`;
      }
      renderResults();
    } else {
      if (elements.trackerLabelStepA) elements.trackerLabelStepA.textContent = 'מודעה א׳';
      if (elements.trackerLabelStepB) elements.trackerLabelStepB.textContent = 'מודעה ב׳';
    }
  }

  // =========================================================================
  // שקלול תוצאות והפעלת חישוב Python
  // =========================================================================

  function renderResults() {
    syncRatingsByApproach();
    const a = state.ratingsA; // תמיד המודעה העובדתית (neutral)
    const b = state.ratingsB; // תמיד המודעה הרגשית-סיפורית (emotional)

    let res = null;
    let usedPython = false;

    // ניסיון הרצת החישוב האמיתי ב-Python דרך Pyodide
    if (typeof window.calculateEmotionalAdPython === 'function') {
      try {
        res = window.calculateEmotionalAdPython(a, b);
        if (res && res.ad_a && res.ad_b) usedPython = true;
      } catch (err) {
        console.warn('[Emotional Ad] Python runner failed, using local computation:', err);
      }
    }

    // חישוב מקומי מדויק וזהה במידה ו-Python עדיין נטען או ברקע
    if (!res) {
      const diffEmotion = b.emotion - a.emotion;
      const diffBrand = b.brand - a.brand;
      const diffIntent = b.intent - a.intent;

      const pctEmotion = Math.round(((diffEmotion) / Math.max(1, a.emotion)) * 100);
      const pctBrand = Math.round(((diffBrand) / Math.max(1, a.brand)) * 100);
      const pctIntent = Math.round(((diffIntent) / Math.max(1, a.intent)) * 100);

      res = {
        ad_a: { emotion: a.emotion, brand: a.brand, intent: a.intent },
        ad_b: { emotion: b.emotion, brand: b.brand, intent: b.intent },
        differences: { emotion: diffEmotion, brand: diffBrand, intent: diffIntent },
        percentages: { emotion: pctEmotion, brand: pctBrand, intent: pctIntent }
      };
    }

    if (elements.calcEngineBadge) {
      elements.calcEngineBadge.textContent = usedPython
        ? 'חושב באמצעות Python'
        : 'חושב במנגנון גיבוי (JavaScript)';
    }

    // עדכון תוויות הגרף והודעת חשיפת הסדר בהתאם לסדר שבו הוצגו המודעות למשתתף
    const neutralStepLabel = getDisplayStepLabelForApproach('neutral');
    const emotionalStepLabel = getDisplayStepLabelForApproach('emotional');

    if (elements.orderRevealNote) {
      if (state.adOrder[0] === 'neutral') {
        elements.orderRevealNote.innerHTML = '<strong>חשיפת הגישות הפרסומיות לאחר הדירוג:</strong> בסבב זה <strong>מודעה א׳</strong> הציגה מפרט עובדתי ו<strong>מודעה ב׳</strong> הציגה מסגור רגשי-סיפורי.';
      } else {
        elements.orderRevealNote.innerHTML = '<strong>חשיפת הגישות הפרסומיות לאחר הדירוג:</strong> בסבב זה <strong>מודעה א׳</strong> הציגה מסגור רגשי-סיפורי ו<strong>מודעה ב׳</strong> הציגה מפרט עובדתי.';
      }
    }

    const neutralBarLabel = `עובדתית (${neutralStepLabel}):`;
    const emotionalBarLabel = `רגשית (${emotionalStepLabel}):`;

    if (elements.labelResEmotionA) elements.labelResEmotionA.textContent = neutralBarLabel;
    if (elements.labelResEmotionB) elements.labelResEmotionB.textContent = emotionalBarLabel;
    if (elements.labelResBrandA) elements.labelResBrandA.textContent = neutralBarLabel;
    if (elements.labelResBrandB) elements.labelResBrandB.textContent = emotionalBarLabel;
    if (elements.labelResIntentA) elements.labelResIntentA.textContent = neutralBarLabel;
    if (elements.labelResIntentB) elements.labelResIntentB.textContent = emotionalBarLabel;

    // עדכון נתוני הגרף ב-DOM
    updateBarGroup('Emotion', res.ad_a.emotion, res.ad_b.emotion, res.differences.emotion, res.percentages.emotion);
    updateBarGroup('Brand', res.ad_a.brand, res.ad_b.brand, res.differences.brand, res.percentages.brand);
    updateBarGroup('Intent', res.ad_a.intent, res.ad_b.intent, res.differences.intent, res.percentages.intent);

    updateDynamicSummary(res, neutralStepLabel, emotionalStepLabel);
  }

  function updateDynamicSummary(res, neutralStepLabel, emotionalStepLabel) {
    if (!elements.dynamicSummary || !res) return;
    const sumA = res.ad_a.emotion + res.ad_a.brand + res.ad_a.intent;
    const sumB = res.ad_b.emotion + res.ad_b.brand + res.ad_b.intent;
    const diffBrand = res.differences.brand;
    const diffIntent = res.differences.intent;

    let leadText = '';
    if (sumB > sumA) {
      leadText = `בדירוג שלכם, ההצגה הרגשית-סיפורית (שהופיעה כ<strong>${emotionalStepLabel}</strong>) קיבלה ציון כולל גבוה יותר מההצגה העובדתית (<strong>${neutralStepLabel}</strong>), אף שמדובר באותו הבושם (<bdi>Gritti Tutù, 100 ml</bdi>) ובאותו המחיר (<bdi>€ 260</bdi>).`;
    } else if (sumA > sumB) {
      leadText = `בדירוג שלכם, ההצגה העובדתית-אינפורמטיבית (שהופיעה כ<strong>${neutralStepLabel}</strong>) קיבלה ציון כולל גבוה יותר מההצגה הרגשית-סיפורית (<strong>${emotionalStepLabel}</strong>) — דוגמה לכך שפירוט תווי ניחוח ברור וישיר עשוי לדבר אל הצרכן יותר מאשר סיפור אווירה.`;
    } else {
      leadText = `בדירוג שלכם, ההצגה העובדתית (<strong>${neutralStepLabel}</strong>) וההצגה הרגשית-סיפורית (<strong>${emotionalStepLabel}</strong>) קיבלו ציון כולל זהה — המחשה לכך שמסגור רגשי אינו גובר אוטומטית על מפרט עובדתי נקי.`;
    }

    let gapText = '';
    if (diffBrand !== diffIntent) {
      gapText = ` שימו לב להבדל בין הפער בחיבור המדווח למותג (${diffBrand >= 0 ? '+' : ''}${diffBrand}) לבין הפער בכוונת הקנייה המוצהרת (${diffIntent >= 0 ? '+' : ''}${diffIntent}): עמדה חיובית כלפי מודעה אינה מתורגמת בהכרח לכוונת רכישה באותה עוצמה.`;
    } else {
      gapText = ' זכרו כי גם עמדה חיובית וגם כוונת קנייה כאן הן הצהרות בדיווח עצמי, ואינן מדידה של רכישה בפועל או הוכחה לסיבתיות.';
    }

    elements.dynamicSummary.innerHTML = `<strong>סיכום הדירוג שלכם:</strong> ${leadText}${gapText}`;
  }

  function updateBarGroup(metricKey, valA, valB, diff, pct) {
    const barA = elements[`barRes${metricKey}A`];
    const barB = elements[`barRes${metricKey}B`];
    const valTextA = elements[`valRes${metricKey}A`];
    const valTextB = elements[`valRes${metricKey}B`];
    const diffBadge = elements[`diff${metricKey}Badge`];

    if (barA) barA.style.width = `${(valA / 10) * 100}%`;
    if (barB) barB.style.width = `${(valB / 10) * 100}%`;

    if (valTextA) valTextA.textContent = `${valA}/10`;
    if (valTextB) valTextB.textContent = `${valB}/10`;

    if (diffBadge) {
      const sign = diff > 0 ? '+' : '';
      const pctSign = pct > 0 ? '+' : '';
      diffBadge.textContent = `${sign}${diff} נקודות (${pctSign}${pct}%)`;

      diffBadge.className = 'metric-diff-badge';
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
  // איפוס מלא לפעילות חדשה
  // =========================================================================

  function resetActivity(customOrder) {
    if (Array.isArray(customOrder) && customOrder.length === 2) {
      state.adOrder = [customOrder[0], customOrder[1]];
    } else {
      randomizeAdOrder();
    }

    state.revealedStepA = false;
    state.revealedStepB = false;
    state.stepRatingsA = { emotion: 5, brand: 5, intent: 5 };
    state.stepRatingsB = { emotion: 5, brand: 5, intent: 5 };
    state.confirmedStepA = { emotion: false, brand: false, intent: false };
    state.confirmedStepB = { emotion: false, brand: false, intent: false };
    syncRatingsByApproach();

    applyAdOrderToCards();

    // הסתרת כרטיסיות הדירוג עד ללחיצה על "דרגו את הרושם"
    if (elements.adGridStepA) {
      elements.adGridStepA.classList.add('rating-collapsed');
      elements.adGridStepA.classList.remove('rating-expanded');
    }
    if (elements.ratingCardA) {
      elements.ratingCardA.hidden = true;
      elements.ratingCardA.style.display = 'none';
    }
    if (elements.btnRevealRatingA) {
      elements.btnRevealRatingA.setAttribute('aria-expanded', 'false');
      elements.btnRevealRatingA.classList.remove('is-revealed');
    }

    if (elements.adGridStepB) {
      elements.adGridStepB.classList.add('rating-collapsed');
      elements.adGridStepB.classList.remove('rating-expanded');
    }
    if (elements.ratingCardB) {
      elements.ratingCardB.hidden = true;
      elements.ratingCardB.style.display = 'none';
    }
    if (elements.btnRevealRatingB) {
      elements.btnRevealRatingB.setAttribute('aria-expanded', 'false');
      elements.btnRevealRatingB.classList.remove('is-revealed');
    }

    // איפוס המחוונים לנקודת האמצע 5/10 ומצב ממתין לאישור
    ['A', 'B'].forEach((stepLetter) => {
      ['emotion', 'brand', 'intent'].forEach((metricKey) => {
        const capMetric = metricKey.charAt(0).toUpperCase() + metricKey.slice(1);
        const sliderEl = elements[`slider${capMetric}${stepLetter}`];
        if (sliderEl) sliderEl.value = '5';
        updateMetricControlUI(stepLetter, metricKey);
      });
      updateStepGateUI(stepLetter);
    });

    setStep('step_a');
  }

  // =========================================================================
  // חיבור מאזיני אירועים
  // =========================================================================

  function bindSliderAndConfirmEvents(stepLetter, metricKey) {
    const capMetric = metricKey.charAt(0).toUpperCase() + metricKey.slice(1);
    const sliderEl = elements[`slider${capMetric}${stepLetter}`];
    const confirmBtnEl = elements[`btnConfirm${capMetric}${stepLetter}`];

    if (sliderEl) {
      // הזזת מחוון או שינוי ערך מאשרת את הדירוג
      sliderEl.addEventListener('input', (e) => {
        recordRating(stepLetter, metricKey, e.target.value);
      });
      sliderEl.addEventListener('change', (e) => {
        recordRating(stepLetter, metricKey, e.target.value);
      });
      // לחיצה על המחוון עצמו (אפילו בנקודת האמצע 5/10 ללא גרירה) מאשרת את הציון הנוכחי
      sliderEl.addEventListener('click', (e) => {
        recordRating(stepLetter, metricKey, e.target.value);
      });
    }

    if (confirmBtnEl) {
      // כפתור אישור מפורש המאפשר בחירת נקודת האמצע (5/10) בלחיצה אחת ללא הזזת המחוון
      confirmBtnEl.addEventListener('click', () => {
        const currentVal = sliderEl ? sliderEl.value : 5;
        recordRating(stepLetter, metricKey, currentVal);
      });
    }
  }

  function bindEvents() {
    // כפתורי "דרגו את הרושם" לחשיפת 3 שאלות הדירוג
    if (elements.btnRevealRatingA) {
      elements.btnRevealRatingA.addEventListener('click', () => {
        revealRatingPanel('A');
      });
    }
    if (elements.btnRevealRatingB) {
      elements.btnRevealRatingB.addEventListener('click', () => {
        revealRatingPanel('B');
      });
    }

    // חיבור 3 השאלות במודעה א׳ ובמודעה ב׳
    ['A', 'B'].forEach((stepLetter) => {
      ['emotion', 'brand', 'intent'].forEach((metricKey) => {
        bindSliderAndConfirmEvents(stepLetter, metricKey);
      });
    });

    // כפתורי מעבר שלבים
    if (elements.btnGoToStepB) {
      elements.btnGoToStepB.addEventListener('click', () => setStep('step_b'));
    }
    if (elements.btnBackToStepA) {
      elements.btnBackToStepA.addEventListener('click', () => setStep('step_a'));
    }
    if (elements.btnBackToStepAFromCard) {
      elements.btnBackToStepAFromCard.addEventListener('click', () => setStep('step_a'));
    }
    if (elements.btnGoToResults) {
      elements.btnGoToResults.addEventListener('click', () => setStep('step_results'));
    }

    // כפתור איפוס (מגריל סדר הצגה חדש)
    if (elements.btnRestartSim) {
      elements.btnRestartSim.addEventListener('click', () => {
        resetActivity();
      });
    }
  }

  // חשיפת בקר לבדיקות אוטומטיות ואימות בקונסול
  window.EmotionalAdController = {
    getState: () => ({
      currentStep: state.currentStep,
      adOrder: [...state.adOrder],
      revealedStepA: state.revealedStepA,
      revealedStepB: state.revealedStepB,
      stepRatingsA: { ...state.stepRatingsA },
      stepRatingsB: { ...state.stepRatingsB },
      confirmedStepA: { ...state.confirmedStepA },
      confirmedStepB: { ...state.confirmedStepB },
      ratingsA: { ...state.ratingsA },
      ratingsB: { ...state.ratingsB }
    }),
    resetWithOrder: (order) => resetActivity(order),
    revealRatingPanel,
    recordRating,
    setStep
  };

  function init() {
    cacheDOMElements();
    bindEvents();
    resetActivity();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
