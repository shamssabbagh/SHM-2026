/**
 * המוח הצרכני – הפסיכולוגיה שמאחורי החלטות קנייה
 * שקופית 10: פרדוקס הבחירה ועומס יתר (The Paradox of Choice & Choice Overload)
 * ניסוי אינטראקטיבי: מדידת זמני קבלת החלטה ודירוגי קושי (3 אפשרויות מול 12 אפשרויות)
 * מדידת זמן אמת בדפדפן וחישוב סטטיסטי באמצעות Python (Pyodide WebAssembly)
 */

(function () {
  'use strict';

  // מאגר 12 בשמים יוקרתיים
  const PERFUMES_DATA = [
    { id: 'p1', name: 'Ambre Impérial', house: 'Maison Vendôme', notes: 'ענבר, וניל בורבון ואלגום', price: '₪ 450', color: '#f59e0b', icon: '✨' },
    { id: 'p2', name: 'Émeraude Royale', house: 'Aura Privée', notes: 'ברגמוט, מרווה ויסמין לילי', price: '₪ 460', color: '#10b981', icon: '🌿' },
    { id: 'p3', name: 'Velours Pourpre', house: 'Atelier Céleste', notes: 'ורד דמשקאי, פצ\'ולי וקטורת', price: '₪ 440', color: '#c084fc', icon: '💜' },
    { id: 'p4', name: 'Diamant Blanc', house: 'Maison Vendôme', notes: 'נרולי, פרזיה ומאסק לבן', price: '₪ 470', color: '#38bdf8', icon: '💎' },
    { id: 'p5', name: 'Saphir Noir', house: 'L\'Étoile Noire', notes: 'פלפל שחור, וטיבר ועור', price: '₪ 460', color: '#6366f1', icon: '🌌' },
    { id: 'p6', name: 'Rose Éternelle', house: 'Atelier Céleste', notes: 'מי ורדים, גרניום ופירות יער', price: '₪ 430', color: '#f43f5e', icon: '🌹' },
    { id: 'p7', name: 'Oud Mystique', house: 'Aura Privée', notes: 'עץ עוד מלכותי, ארז וטבק', price: '₪ 480', color: '#d97706', icon: '🪵' },
    { id: 'p8', name: 'Fleur d\'Oranger', house: 'Maison Vendôme', notes: 'פריחת הדרים, מנדרינה ודבש', price: '₪ 420', color: '#fb923c', icon: '🍊' },
    { id: 'p9', name: 'Cuir Sublime', house: 'L\'Étoile Noire', notes: 'עור נאפה, איריס ובלסאם', price: '₪ 460', color: '#a855f7', icon: '🖤' },
    { id: 'p10', name: 'Soleil Doré', house: 'Atelier Céleste', notes: 'ילנג-ילנג, קוקוס ופרנג\'יפאני', price: '₪ 440', color: '#eab308', icon: '☀️' },
    { id: 'p11', name: 'Iris Précieux', house: 'Aura Privée', notes: 'שורש איריס פלורנטיני וסיגלית', price: '₪ 450', color: '#818cf8', icon: '🌸' },
    { id: 'p12', name: 'Nectar Céleste', house: 'Maison Vendôme', notes: 'תאנה שחורה, ליקר שקדים ומור', price: '₪ 460', color: '#ec4899', icon: '🍯' }
  ];

  // מצב המערכת
  const state = {
    step: 'intro', // 'intro' | 'round1' | 'rating1' | 'round2' | 'rating2' | 'results'
    startTime: 0,
    timerInterval: null,
    timeRound1: 0,
    timeRound2: 0,
    selectedPerfume1: null,
    selectedPerfume2: null,
    difficultyRound1: 3,
    difficultyRound2: 8
  };

  const elements = {};

  function cacheDOMElements() {
    // פאנלים
    elements.panelIntro = document.getElementById('choicePanelIntro');
    elements.panelRound1 = document.getElementById('choicePanelRound1');
    elements.panelRating1 = document.getElementById('choicePanelRating1');
    elements.panelRound2 = document.getElementById('choicePanelRound2');
    elements.panelRating2 = document.getElementById('choicePanelRating2');
    elements.panelResults = document.getElementById('choicePanelResults');

    // טראקר
    elements.trackerIntro = document.getElementById('choiceTrackerIntro');
    elements.trackerR1 = document.getElementById('choiceTrackerR1');
    elements.trackerR2 = document.getElementById('choiceTrackerR2');
    elements.trackerRes = document.getElementById('choiceTrackerRes');

    // שעוני עצר
    elements.timerDisplayR1 = document.getElementById('choiceTimerDisplayR1');
    elements.timerDisplayR2 = document.getElementById('choiceTimerDisplayR2');

    // מכולות כרטיסי בשמים
    elements.cardsContainerR1 = document.getElementById('choiceCardsContainerR1');
    elements.cardsContainerR2 = document.getElementById('choiceCardsContainerR2');

    // סליידרים
    elements.sliderDiff1 = document.getElementById('choiceSliderDiff1');
    elements.valBadgeDiff1 = document.getElementById('choiceValBadgeDiff1');
    elements.sliderDiff2 = document.getElementById('choiceSliderDiff2');
    elements.valBadgeDiff2 = document.getElementById('choiceValBadgeDiff2');

    // כפתורי מעבר
    elements.btnStartExp = document.getElementById('choiceBtnStartExp');
    elements.btnGoToR2 = document.getElementById('choiceBtnGoToR2');
    elements.btnGoToResults = document.getElementById('choiceBtnGoToResults');
    elements.btnRestartExp = document.getElementById('choiceBtnRestartExp');

    // רכיבי תוצאות
    elements.resTime1 = document.getElementById('choiceResTime1');
    elements.resTime2 = document.getElementById('choiceResTime2');
    elements.barTime1 = document.getElementById('choiceBarTime1');
    elements.barTime2 = document.getElementById('choiceBarTime2');
    elements.diffTimeBadge = document.getElementById('choiceDiffTimeBadge');

    elements.resDiff1 = document.getElementById('choiceResDiff1');
    elements.resDiff2 = document.getElementById('choiceResDiff2');
    elements.barDiff1 = document.getElementById('choiceBarDiff1');
    elements.barDiff2 = document.getElementById('choiceBarDiff2');
    elements.diffDiffBadge = document.getElementById('choiceDiffDiffBadge');

    elements.summaryRatioBadge = document.getElementById('choiceSummaryRatioBadge');
  }

  // =========================================================================
  // מדידת זמן אמת (Stopwatch)
  // =========================================================================

  function startTimer(displayElement) {
    stopTimer();
    state.startTime = performance.now();
    updateTimerText(displayElement, 0);

    state.timerInterval = setInterval(() => {
      const elapsedSec = (performance.now() - state.startTime) / 1000;
      updateTimerText(displayElement, elapsedSec);
    }, 40);
  }

  function stopTimer() {
    if (state.timerInterval) {
      clearInterval(state.timerInterval);
      state.timerInterval = null;
    }
    if (state.startTime > 0) {
      const finalSec = ((performance.now() - state.startTime) / 1000);
      state.startTime = 0;
      return Math.max(0.4, parseFloat(finalSec.toFixed(2)));
    }
    return 0;
  }

  function updateTimerText(element, sec) {
    if (!element) return;
    element.textContent = `${sec.toFixed(2)} שנ'`;
  }

  // =========================================================================
  // רינדור כרטיסי בשמים ב-DOM
  // =========================================================================

  function renderPerfumeCards(container, items, roundNum) {
    if (!container) return;
    container.innerHTML = '';

    items.forEach((perfume) => {
      const card = document.createElement('div');
      card.className = 'choice-perfume-card';
      card.setAttribute('data-perfume-id', perfume.id);

      card.innerHTML = `
        <div class="perfume-visual-head">
          <span class="editorial-perfume-photo" role="img" aria-label="${perfume.name}" style="background-position: ${((Number(perfume.id.slice(1)) - 1) % 4) * 100 / 3}% ${Math.floor((Number(perfume.id.slice(1)) - 1) / 4) * 50}%"></span>
        </div>
        <div class="perfume-card-body">
          <span class="perfume-house-tag">${perfume.house}</span>
          <h4 class="perfume-title">${perfume.name}</h4>
          <p class="perfume-notes">${perfume.notes}</p>
          <div class="perfume-footer">
            <span class="perfume-price">${perfume.price}</span>
            <button type="button" class="btn-select-perfume">בחר בושם זה ✓</button>
          </div>
        </div>
      `;

      card.addEventListener('click', () => {
        onPerfumeSelected(perfume, roundNum, card);
      });

      container.appendChild(card);
    });
  }

  function onPerfumeSelected(perfume, roundNum, cardEl) {
    if (roundNum === 1 && state.step !== 'round1') return;
    if (roundNum === 2 && state.step !== 'round2') return;

    // עצירת זמן
    const measuredTime = stopTimer();

    if (roundNum === 1) {
      state.timeRound1 = measuredTime;
      state.selectedPerfume1 = perfume;
      if (elements.timerDisplayR1) updateTimerText(elements.timerDisplayR1, state.timeRound1);
    } else {
      state.timeRound2 = measuredTime;
      state.selectedPerfume2 = perfume;
      if (elements.timerDisplayR2) updateTimerText(elements.timerDisplayR2, state.timeRound2);
    }

    // סימון ויזואלי של הכרטיס שנבחר
    const parent = cardEl.parentElement;
    if (parent) {
      parent.querySelectorAll('.choice-perfume-card').forEach((c) => c.classList.remove('selected'));
    }
    cardEl.classList.add('selected');

    // מעבר קצר לשאלת הדירוג
    setTimeout(() => {
      setStep(roundNum === 1 ? 'rating1' : 'rating2');
    }, 350);
  }

  // =========================================================================
  // ניהול שלבי הניסוי (State Transitions)
  // =========================================================================

  function setStep(step) {
    state.step = step;

    // הצגת/הסתרת פאנלים
    if (elements.panelIntro) elements.panelIntro.style.display = step === 'intro' ? 'block' : 'none';
    if (elements.panelRound1) elements.panelRound1.style.display = step === 'round1' ? 'block' : 'none';
    if (elements.panelRating1) elements.panelRating1.style.display = step === 'rating1' ? 'block' : 'none';
    if (elements.panelRound2) elements.panelRound2.style.display = step === 'round2' ? 'block' : 'none';
    if (elements.panelRating2) elements.panelRating2.style.display = step === 'rating2' ? 'block' : 'none';
    if (elements.panelResults) elements.panelResults.style.display = step === 'results' ? 'block' : 'none';

    // עדכון סרגל מעקב שלבים
    if (elements.trackerIntro) elements.trackerIntro.classList.toggle('active', step === 'intro');
    if (elements.trackerR1) elements.trackerR1.classList.toggle('active', step === 'round1' || step === 'rating1');
    if (elements.trackerR2) elements.trackerR2.classList.toggle('active', step === 'round2' || step === 'rating2');
    if (elements.trackerRes) elements.trackerRes.classList.toggle('active', step === 'results');

    // הפעלת לוגיקה לפי שלב
    if (step === 'round1') {
      renderPerfumeCards(elements.cardsContainerR1, PERFUMES_DATA.slice(0, 3), 1);
      startTimer(elements.timerDisplayR1);
    } else if (step === 'round2') {
      renderPerfumeCards(elements.cardsContainerR2, PERFUMES_DATA, 2);
      startTimer(elements.timerDisplayR2);
    } else if (step === 'results') {
      renderResults();
    }
  }

  // =========================================================================
  // שקלול תוצאות והפעלת מנוע Python
  // =========================================================================

  function renderResults() {
    const t1 = state.timeRound1 || 3.2;
    const t2 = state.timeRound2 || 9.8;
    const d1 = state.difficultyRound1;
    const d2 = state.difficultyRound2;

    let res = null;

    // ניסיון קריאה ל-Python באמצעות Pyodide
    if (typeof window.calculateChoiceParadoxPython === 'function') {
      try {
        res = window.calculateChoiceParadoxPython(
          { time: t1, difficulty: d1, options: 3 },
          { time: t2, difficulty: d2, options: 12 }
        );
      } catch (err) {
        console.warn('[Choice Paradox] Python call warning, using local math:', err);
      }
    }

    if (!res) {
      const diffTime = parseFloat((t2 - t1).toFixed(2));
      const pctTime = Math.round(((t2 - t1) / Math.max(0.1, t1)) * 100);
      const ratioTime = parseFloat((t2 / Math.max(0.1, t1)).toFixed(1));
      const diffDifficulty = d2 - d1;
      const pctDifficulty = Math.round(((d2 - d1) / Math.max(1, d1)) * 100);

      res = {
        round1: { time: t1, difficulty: d1, options: 3 },
        round2: { time: t2, difficulty: d2, options: 12 },
        differences: { time: diffTime, difficulty: diffDifficulty },
        percentages: { time: pctTime, difficulty: pctDifficulty },
        time_ratio: ratioTime
      };
    }

    // עדכון טקסטים
    if (elements.resTime1) elements.resTime1.textContent = `${res.round1.time.toFixed(1)} שניות`;
    if (elements.resTime2) elements.resTime2.textContent = `${res.round2.time.toFixed(1)} שניות`;
    if (elements.resDiff1) elements.resDiff1.textContent = `${res.round1.difficulty}/10`;
    if (elements.resDiff2) elements.resDiff2.textContent = `${res.round2.difficulty}/10`;

    // עדכון עמודות גרף (נרמול זמנים עד מקסימום 20 שניות, וקושי מ-1 עד 10)
    const maxTime = Math.max(15, res.round1.time, res.round2.time);
    if (elements.barTime1) elements.barTime1.style.width = `${Math.min(100, (res.round1.time / maxTime) * 100)}%`;
    if (elements.barTime2) elements.barTime2.style.width = `${Math.min(100, (res.round2.time / maxTime) * 100)}%`;

    if (elements.barDiff1) elements.barDiff1.style.width = `${(res.round1.difficulty / 10) * 100}%`;
    if (elements.barDiff2) elements.barDiff2.style.width = `${(res.round2.difficulty / 10) * 100}%`;

    // תגיות הפרש
    if (elements.diffTimeBadge) {
      const sign = res.differences.time >= 0 ? '+' : '';
      elements.diffTimeBadge.textContent = `${sign}${res.differences.time} שניות (+${res.percentages.time}%)`;
    }
    if (elements.diffDiffBadge) {
      const sign = res.differences.difficulty >= 0 ? '+' : '';
      elements.diffDiffBadge.textContent = `${sign}${res.differences.difficulty} נקודות (+${res.percentages.difficulty}%)`;
    }

    // תגית יחס
    if (elements.summaryRatioBadge) {
      elements.summaryRatioBadge.textContent = `זמן ההחלטה התארך פי ${res.time_ratio}!`;
    }
  }

  // =========================================================================
  // חיבור מאזיני אירועים
  // =========================================================================

  function bindEvents() {
    // התחלת ניסוי
    if (elements.btnStartExp) {
      elements.btnStartExp.addEventListener('click', () => {
        setStep('round1');
      });
    }

    // סליידר קושי סבב 1
    if (elements.sliderDiff1) {
      elements.sliderDiff1.addEventListener('input', (e) => {
        state.difficultyRound1 = parseInt(e.target.value, 10);
        if (elements.valBadgeDiff1) elements.valBadgeDiff1.textContent = `${state.difficultyRound1}/10`;
      });
    }

    // מעבר לסבב 2
    if (elements.btnGoToR2) {
      elements.btnGoToR2.addEventListener('click', () => {
        setStep('round2');
      });
    }

    // סליידר קושי סבב 2
    if (elements.sliderDiff2) {
      elements.sliderDiff2.addEventListener('input', (e) => {
        state.difficultyRound2 = parseInt(e.target.value, 10);
        if (elements.valBadgeDiff2) elements.valBadgeDiff2.textContent = `${state.difficultyRound2}/10`;
      });
    }

    // מעבר לתוצאות
    if (elements.btnGoToResults) {
      elements.btnGoToResults.addEventListener('click', () => {
        setStep('results');
      });
    }

    // נסה שוב
    if (elements.btnRestartExp) {
      elements.btnRestartExp.addEventListener('click', () => {
        stopTimer();
        state.timeRound1 = 0;
        state.timeRound2 = 0;
        state.selectedPerfume1 = null;
        state.selectedPerfume2 = null;
        state.difficultyRound1 = 3;
        state.difficultyRound2 = 8;

        if (elements.sliderDiff1) elements.sliderDiff1.value = 3;
        if (elements.sliderDiff2) elements.sliderDiff2.value = 8;
        if (elements.valBadgeDiff1) elements.valBadgeDiff1.textContent = '3/10';
        if (elements.valBadgeDiff2) elements.valBadgeDiff2.textContent = '8/10';

        setStep('intro');
      });
    }
  }

  function init() {
    cacheDOMElements();
    bindEvents();
    setStep('intro');
    // Decode the shared catalog before a timed round can start.
    const button = elements.btnStartExp;
    if (button) {
      button.disabled = true;
      button.setAttribute('aria-busy', 'true');
      const status = document.getElementById('choiceImageStatus');
      const catalog = new Image();
      const finish = (loaded) => {
        button.disabled = false;
        button.removeAttribute('aria-busy');
        if (status) status.textContent = loaded
          ? 'תמונות להמחשה שנוצרו ב-AI · מותגים ומוצרים דמיוניים'
          : 'תמונות המוצרים לא נטענו. אפשר להמשיך לפי התיאורים או לרענן את העמוד.';
      };
      catalog.onload = async () => {
        try { if (catalog.decode) await catalog.decode(); } catch (_) { /* loaded image remains usable */ }
        finish(true);
      };
      catalog.onerror = () => finish(false);
      catalog.src = 'assets/images/perfume_catalog_editorial.png';
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
