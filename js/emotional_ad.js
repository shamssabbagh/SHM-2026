/**
 * המוח הצרכני – הפסיכולוגיה שמאחורי החלטות קנייה
 * שקופית 20: סימולציית פרסום רגשי מול ניטרלי (Emotional Advertising Simulation)
 * ניתוח השוואתי, סינתזת מוזיקה רומנטית (Web Audio API), וחישוב Python בדפדפן (Pyodide).
 */

(function () {
  'use strict';

  // מצב הסימולציה
  const state = {
    currentStep: 'step_a', // 'step_a' | 'step_b' | 'step_results'
    ratingsA: {
      emotion: 4,
      brand: 4,
      intent: 3
    },
    ratingsB: {
      emotion: 8,
      brand: 8,
      intent: 6
    },
    isMusicPlaying: false
  };

  // מנוע אודיו מקומי עבור מוזיקת הרקע הרומנטית של פרסומת ב' (Web Audio API)
  let audioCtx = null;
  let musicGainNode = null;
  let musicTimer = null;
  let activeOscillators = [];

  // אלמנטי DOM
  let elements = {};

  function cacheDOMElements() {
    elements = {
      // שלבים
      panelStepA: document.getElementById('panelStepA'),
      panelStepB: document.getElementById('panelStepB'),
      panelStepResults: document.getElementById('panelStepResults'),
      trackerStepA: document.getElementById('trackerStepA'),
      trackerStepB: document.getElementById('trackerStepB'),
      trackerStepRes: document.getElementById('trackerStepRes'),

      // מחוונים שלב א'
      sliderEmotionA: document.getElementById('ratingEmotionA'),
      sliderBrandA: document.getElementById('ratingBrandA'),
      sliderIntentA: document.getElementById('ratingIntentA'),
      valBadgeEmotionA: document.getElementById('valBadgeEmotionA'),
      valBadgeBrandA: document.getElementById('valBadgeBrandA'),
      valBadgeIntentA: document.getElementById('valBadgeIntentA'),

      // מחוונים שלב ב'
      sliderEmotionB: document.getElementById('ratingEmotionB'),
      sliderBrandB: document.getElementById('ratingBrandB'),
      sliderIntentB: document.getElementById('ratingIntentB'),
      valBadgeEmotionB: document.getElementById('valBadgeEmotionB'),
      valBadgeBrandB: document.getElementById('valBadgeBrandB'),
      valBadgeIntentB: document.getElementById('valBadgeIntentB'),

      // כפתורים
      btnGoToStepB: document.getElementById('btnGoToStepB'),
      btnBackToStepA: document.getElementById('btnBackToStepA'),
      btnGoToResults: document.getElementById('btnGoToResults'),
      btnRestartSim: document.getElementById('btnRestartSim'),
      btnToggleAdMusic: document.getElementById('btnToggleAdMusic'),
      adMusicIcon: document.getElementById('adMusicIcon'),
      adMusicText: document.getElementById('adMusicText'),

      // תוצאות וגרף
      diffEmotionBadge: document.getElementById('diffEmotionBadge'),
      diffBrandBadge: document.getElementById('diffBrandBadge'),
      diffIntentBadge: document.getElementById('diffIntentBadge'),
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
      valResIntentB: document.getElementById('valResIntentB')
    };
  }

  // =========================================================================
  // מוזיקת רקע רומנטית ועדינה לפרסומת ב' (סינתזה 100% מקורית ב-Web Audio API)
  // =========================================================================

  function initAudioContext() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function startEmotionalMusic() {
    initAudioContext();
    if (!audioCtx) return;

    stopEmotionalMusic(); // איפוס קודם

    state.isMusicPlaying = true;
    updateMusicButtonUI();

    // מאסטר גיין של המוזיקה עם Fade-in רך
    musicGainNode = audioCtx.createGain();
    musicGainNode.gain.setValueAtTime(0.001, audioCtx.currentTime);
    musicGainNode.gain.exponentialRampToValueAtTime(0.28, audioCtx.currentTime + 1.2);
    musicGainNode.connect(audioCtx.destination);

    // מסנן Low-pass חם
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(850, audioCtx.currentTime);
    filter.Q.setValueAtTime(1.5, audioCtx.currentTime);
    filter.connect(musicGainNode);

    // מהלך אקורדים רומנטי יוקרתי (Fmaj9 -> Dm9 -> Bbmaj7 -> Csus4)
    const chords = [
      [174.61, 220.00, 261.63, 329.63, 392.00], // F3, A3, C4, E4, G4
      [146.83, 174.61, 220.00, 261.63, 329.63], // D3, F3, A3, C4, E4
      [116.54, 146.83, 174.61, 220.00, 293.66], // Bb2, D3, F3, A3, D4
      [130.81, 196.00, 261.63, 349.23, 392.00]  // C3, G3, C4, F4, G4
    ];

    let chordIndex = 0;

    function playChord() {
      if (!state.isMusicPlaying || !audioCtx) return;

      const now = audioCtx.currentTime;
      const currentChord = chords[chordIndex % chords.length];
      chordIndex++;

      // יצירת מתנדים חמים לאקורד (משטח פדים רומנטי)
      currentChord.forEach((freq, idx) => {
        const osc = audioCtx.createOscillator();
        const oscGain = audioCtx.createGain();

        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, now);

        // שינוי עדין (Detune) לאפקט עומק
        osc.detune.setValueAtTime((idx - 2) * 5, now);

        // מעטפת רכה
        oscGain.gain.setValueAtTime(0.001, now);
        oscGain.gain.linearRampToValueAtTime(0.08 / currentChord.length, now + 1.2);
        oscGain.gain.linearRampToValueAtTime(0.05 / currentChord.length, now + 3.2);
        oscGain.gain.exponentialRampToValueAtTime(0.0001, now + 4.2);

        osc.connect(oscGain);
        oscGain.connect(filter);

        osc.start(now);
        osc.stop(now + 4.3);

        activeOscillators.push(osc);
      });

      // צליל פעמון קריסטלי עדין על גבי האקורד
      const bellFreq = currentChord[currentChord.length - 1] * 2;
      const bellOsc = audioCtx.createOscillator();
      const bellGain = audioCtx.createGain();
      bellOsc.type = 'sine';
      bellOsc.frequency.setValueAtTime(bellFreq, now + 0.3);
      bellGain.gain.setValueAtTime(0.001, now + 0.3);
      bellGain.gain.linearRampToValueAtTime(0.035, now + 0.45);
      bellGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.5);

      bellOsc.connect(bellGain);
      bellGain.connect(musicGainNode);

      bellOsc.start(now + 0.3);
      bellOsc.stop(now + 2.6);
      activeOscillators.push(bellOsc);
    }

    playChord();
    musicTimer = setInterval(playChord, 3800);
  }

  function stopEmotionalMusic() {
    state.isMusicPlaying = false;
    updateMusicButtonUI();

    if (musicTimer) {
      clearInterval(musicTimer);
      musicTimer = null;
    }

    if (musicGainNode && audioCtx) {
      try {
        musicGainNode.gain.setValueAtTime(musicGainNode.gain.value, audioCtx.currentTime);
        musicGainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.4);
      } catch (e) {
        // התעלמות
      }
    }

    setTimeout(() => {
      activeOscillators.forEach((osc) => {
        try {
          osc.stop();
          osc.disconnect();
        } catch (e) {
          // כבר נעצר
        }
      });
      activeOscillators = [];
    }, 450);
  }

  function toggleEmotionalMusic() {
    if (state.isMusicPlaying) {
      stopEmotionalMusic();
    } else {
      startEmotionalMusic();
    }
  }

  function updateMusicButtonUI() {
    if (!elements.btnToggleAdMusic) return;
    if (state.isMusicPlaying) {
      elements.btnToggleAdMusic.classList.add('playing');
      if (elements.adMusicIcon) elements.adMusicIcon.textContent = '⏸️';
      if (elements.adMusicText) elements.adMusicText.textContent = 'השתק מוזיקה';
    } else {
      elements.btnToggleAdMusic.classList.remove('playing');
      if (elements.adMusicIcon) elements.adMusicIcon.textContent = '🎵';
      if (elements.adMusicText) elements.adMusicText.textContent = 'הפעל מוזיקת אווירה';
    }
  }

  // =========================================================================
  // ניהול שלבי הסימולציה והמעברים
  // =========================================================================

  function setStep(step) {
    state.currentStep = step;

    // עצירת מוזיקה אם עוזבים את פרסומת ב'
    if (step !== 'step_b' && state.isMusicPlaying) {
      stopEmotionalMusic();
    }

    // עדכון תצוגת הפאנלים
    if (elements.panelStepA) elements.panelStepA.style.display = step === 'step_a' ? 'block' : 'none';
    if (elements.panelStepB) elements.panelStepB.style.display = step === 'step_b' ? 'block' : 'none';
    if (elements.panelStepResults) elements.panelStepResults.style.display = step === 'step_results' ? 'block' : 'none';

    // עדכון סרגל מעקב הצעדים
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
    if (typeof window.calculateEmotionalAdPython === 'function') {
      try {
        res = window.calculateEmotionalAdPython(a, b);
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

    // עדכון נתוני הגרף ב-DOM
    updateBarGroup('Emotion', res.ad_a.emotion, res.ad_b.emotion, res.differences.emotion, res.percentages.emotion);
    updateBarGroup('Brand', res.ad_a.brand, res.ad_b.brand, res.differences.brand, res.percentages.brand);
    updateBarGroup('Intent', res.ad_a.intent, res.ad_b.intent, res.differences.intent, res.percentages.intent);
  }

  function updateBarGroup(metricKey, valA, valB, diff, pct) {
    const barA = elements[`barRes${metricKey}A`];
    const barB = elements[`barRes${metricKey}B`];
    const valTextA = elements[`valRes${metricKey}A`];
    const valTextB = elements[`valRes${metricKey}B`];
    const diffBadge = elements[`diff${metricKey}Badge`];

    // עדכון רוחבי העמודות (סולם 1 עד 10 מנורמל ל-100%)
    if (barA) barA.style.width = `${(valA / 10) * 100}%`;
    if (barB) barB.style.width = `${(valB / 10) * 100}%`;

    if (valTextA) valTextA.textContent = `${valA}/10`;
    if (valTextB) valTextB.textContent = `${valB}/10`;

    if (diffBadge) {
      const sign = diff >= 0 ? '+' : '';
      const pctSign = pct >= 0 ? '+' : '';
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
  // חיבור מאזיני אירועים
  // =========================================================================

  function bindEvents() {
    // סליידרים שלב א'
    if (elements.sliderEmotionA) {
      elements.sliderEmotionA.addEventListener('input', (e) => {
        const val = parseInt(e.target.value, 10);
        state.ratingsA.emotion = val;
        if (elements.valBadgeEmotionA) elements.valBadgeEmotionA.textContent = `${val}/10`;
      });
    }
    if (elements.sliderBrandA) {
      elements.sliderBrandA.addEventListener('input', (e) => {
        const val = parseInt(e.target.value, 10);
        state.ratingsA.brand = val;
        if (elements.valBadgeBrandA) elements.valBadgeBrandA.textContent = `${val}/10`;
      });
    }
    if (elements.sliderIntentA) {
      elements.sliderIntentA.addEventListener('input', (e) => {
        const val = parseInt(e.target.value, 10);
        state.ratingsA.intent = val;
        if (elements.valBadgeIntentA) elements.valBadgeIntentA.textContent = `${val}/10`;
      });
    }

    // סליידרים שלב ב'
    if (elements.sliderEmotionB) {
      elements.sliderEmotionB.addEventListener('input', (e) => {
        const val = parseInt(e.target.value, 10);
        state.ratingsB.emotion = val;
        if (elements.valBadgeEmotionB) elements.valBadgeEmotionB.textContent = `${val}/10`;
      });
    }
    if (elements.sliderBrandB) {
      elements.sliderBrandB.addEventListener('input', (e) => {
        const val = parseInt(e.target.value, 10);
        state.ratingsB.brand = val;
        if (elements.valBadgeBrandB) elements.valBadgeBrandB.textContent = `${val}/10`;
      });
    }
    if (elements.sliderIntentB) {
      elements.sliderIntentB.addEventListener('input', (e) => {
        const val = parseInt(e.target.value, 10);
        state.ratingsB.intent = val;
        if (elements.valBadgeIntentB) elements.valBadgeIntentB.textContent = `${val}/10`;
      });
    }

    // כפתורי מעבר שלבים
    if (elements.btnGoToStepB) {
      elements.btnGoToStepB.addEventListener('click', () => setStep('step_b'));
    }
    if (elements.btnBackToStepA) {
      elements.btnBackToStepA.addEventListener('click', () => setStep('step_a'));
    }
    if (elements.btnGoToResults) {
      elements.btnGoToResults.addEventListener('click', () => setStep('step_results'));
    }

    // כפתור נסה שוב
    if (elements.btnRestartSim) {
      elements.btnRestartSim.addEventListener('click', () => {
        state.ratingsA = { emotion: 4, brand: 4, intent: 3 };
        state.ratingsB = { emotion: 8, brand: 8, intent: 6 };

        if (elements.sliderEmotionA) elements.sliderEmotionA.value = 4;
        if (elements.sliderBrandA) elements.sliderBrandA.value = 4;
        if (elements.sliderIntentA) elements.sliderIntentA.value = 3;
        if (elements.valBadgeEmotionA) elements.valBadgeEmotionA.textContent = '4/10';
        if (elements.valBadgeBrandA) elements.valBadgeBrandA.textContent = '4/10';
        if (elements.valBadgeIntentA) elements.valBadgeIntentA.textContent = '3/10';

        if (elements.sliderEmotionB) elements.sliderEmotionB.value = 8;
        if (elements.sliderBrandB) elements.sliderBrandB.value = 8;
        if (elements.sliderIntentB) elements.sliderIntentB.value = 6;
        if (elements.valBadgeEmotionB) elements.valBadgeEmotionB.textContent = '8/10';
        if (elements.valBadgeBrandB) elements.valBadgeBrandB.textContent = '8/10';
        if (elements.valBadgeIntentB) elements.valBadgeIntentB.textContent = '6/10';

        setStep('step_a');
      });
    }

    // כפתור מוזיקה של פרסומת ב'
    if (elements.btnToggleAdMusic) {
      elements.btnToggleAdMusic.addEventListener('click', toggleEmotionalMusic);
    }

    // עצירת מוזיקה בעת מעבר שקופית
    document.addEventListener('slideChanged', (e) => {
      const slideNum = e.detail ? e.detail.slideNumber : 1;
      if (slideNum !== 20 && state.isMusicPlaying) {
        stopEmotionalMusic();
      }
    });

    // סגירת אודיו בחילופי דף/ריענון
    window.addEventListener('beforeunload', () => {
      stopEmotionalMusic();
    });
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
