/**
 * המוח הצרכני – הפסיכולוגיה שמאחורי החלטות קנייה
 * מנוע סאונד ומוזיקת רקע Ambient עתידנית (Web Audio API Synthesizer)
 * 100% מקורי, ללא קובצי MP3 חיצוניים, ללא בעיות רישוי, תואם דפדפן Microsoft Edge
 */

(function () {
  'use strict';

  // מצב מערכת השמע
  const state = {
    ctx: null,
    isMuted: true,              // ברירת מחדל: מושתק לחלוטין עד לאישור יזום
    userActivated: false,       // האם המשתמש לחץ להפעלת שמע
    musicVolume: 0.7,           // עוצמת מוזיקת רקע (0.0 עד 1.0)
    sfxVolume: 0.85,            // עוצמת אפקטים קוליים (0.0 עד 1.0)
    isAmbientPlaying: false,
    currentSlide: 1,
    melodyTimer: null,
    melodyIndex: 0
  };

  // צומתי Web Audio
  let masterGain = null;
  let ambientMusicGain = null;
  let sfxGain = null;
  let delayNode = null;
  let delayFeedback = null;
  let activePads = null;

  // סולם מלודי פנטטוני רגוע (A-Minor Ethereal: A4, C5, D5, E5, G5, A5)
  const AMBIENT_SCALE = [440.00, 523.25, 587.33, 659.25, 783.99, 880.00, 659.25, 523.25];

  /**
   * אתחול ה-AudioContext מתוך פעולת משתמש (תואם Chromium ו-Microsoft Edge)
   */
  function getOrCreateContext() {
    if (!state.ctx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        state.ctx = new AudioContextClass();

        // 1. צומת Master ראשי
        masterGain = state.ctx.createGain();
        masterGain.gain.setValueAtTime(state.isMuted ? 0 : 1, state.ctx.currentTime);
        masterGain.connect(state.ctx.destination);

        // 2. צומת שליטה נפרד במוזיקת הרקע
        ambientMusicGain = state.ctx.createGain();
        ambientMusicGain.gain.setValueAtTime(state.musicVolume * 0.35, state.ctx.currentTime);
        ambientMusicGain.connect(masterGain);

        // 3. צומת שליטה נפרד באפקטים קוליים
        sfxGain = state.ctx.createGain();
        sfxGain.gain.setValueAtTime(state.sfxVolume * 0.9, state.ctx.currentTime);
        sfxGain.connect(masterGain);

        // 4. מעגל Delay/Reverb מרחבי למוזיקת הרקע
        delayNode = state.ctx.createDelay();
        delayNode.delayTime.setValueAtTime(0.38, state.ctx.currentTime);

        delayFeedback = state.ctx.createGain();
        delayFeedback.gain.setValueAtTime(0.35, state.ctx.currentTime);

        delayNode.connect(delayFeedback);
        delayFeedback.connect(delayNode);
        delayNode.connect(ambientMusicGain);
      }
    }

    if (state.ctx && state.ctx.state === 'suspended') {
      state.ctx.resume();
    }

    return state.ctx;
  }

  /**
   * יצירה והפעלה של מוזיקת רקע Ambient עתידנית עשירה ומלודית
   */
  function startAmbientMusic() {
    const ctx = getOrCreateContext();
    if (!ctx || state.isMuted) return;

    // מניעת שכפול: עצירת מופעים קודמים
    if (state.isAmbientPlaying) {
      stopAmbientMusic(true);
    }

    const now = ctx.currentTime;

    try {
      // -------------------------------------------------------------
      // שכבה 1: משטח הרמוני חם (Warm Ethereal Chord Pad)
      // -------------------------------------------------------------
      // תדרי אקורד פתוח: A2 (110Hz), E3 (164.8Hz), A3 (220Hz), C4 (261.6Hz), E4 (329.6Hz)
      const chordFreqs = [110.0, 164.81, 220.0, 261.63, 329.63];
      const oscillators = [];

      // מסנן תדרים Lowpass עם LFO עדין (Breathing filter)
      const padFilter = ctx.createBiquadFilter();
      padFilter.type = 'lowpass';
      padFilter.frequency.setValueAtTime(450, now);
      padFilter.Q.setValueAtTime(1.8, now);

      const padLfo = ctx.createOscillator();
      padLfo.frequency.setValueAtTime(0.08, now); // פעימה איטית מאוד של 12 שניות

      const padLfoGain = ctx.createGain();
      padLfoGain.gain.setValueAtTime(160, now);

      padLfo.connect(padLfoGain);
      padLfoGain.connect(padFilter.frequency);

      const padGain = ctx.createGain();
      padGain.gain.setValueAtTime(0.001, now);
      padGain.gain.linearRampToValueAtTime(0.7, now + 2.0); // כניסה רכה

      chordFreqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        // שילוב גלי משולש וסינוס לחום אקוסטי
        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, now);
        // Detune קל ליצירת מרקם מקהלה שמימי
        osc.detune.setValueAtTime((idx - 2) * 4.5, now);

        osc.connect(padFilter);
        osc.start(now);
        oscillators.push(osc);
      });

      padFilter.connect(padGain);
      padGain.connect(ambientMusicGain);
      padLfo.start(now);

      activePads = {
        oscillators,
        padFilter,
        padLfo,
        padLfoGain,
        padGain
      };

      state.isAmbientPlaying = true;

      // -------------------------------------------------------------
      // שכבה 2: מנגינה קריסטלית מרגיעה (Generative Ambient Sequence)
      // -------------------------------------------------------------
      startMelodySequencer();

    } catch (err) {
      console.warn('Could not start ambient music:', err);
    }
  }

  /**
   * רצף מלודי עדין המתנגן ברקע (צלילי פעמון רכים וחלליים)
   */
  function startMelodySequencer() {
    if (state.melodyTimer) {
      clearInterval(state.melodyTimer);
      state.melodyTimer = null;
    }

    state.melodyIndex = 0;

    // נגינת צליל ראשון מיד
    playAmbientMelodyNote();

    // מחזור מנגינה עדין כל 2.4 שניות
    state.melodyTimer = setInterval(() => {
      if (!state.isAmbientPlaying || state.isMuted) {
        clearInterval(state.melodyTimer);
        state.melodyTimer = null;
        return;
      }
      playAmbientMelodyNote();
    }, 2400);
  }

  /**
   * נגינת תו מלודי יחיד של מוזיקת הרקע
   */
  function playAmbientMelodyNote() {
    if (!state.ctx || state.isMuted) return;

    const ctx = state.ctx;
    const now = ctx.currentTime;
    const freq = AMBIENT_SCALE[state.melodyIndex % AMBIENT_SCALE.length];
    state.melodyIndex++;

    try {
      const noteOsc = ctx.createOscillator();
      const noteGain = ctx.createGain();

      noteOsc.type = 'sine';
      noteOsc.frequency.setValueAtTime(freq, now);

      // מעטפת צליל רכה (Soft Attack, Long Bell Decay)
      noteGain.gain.setValueAtTime(0.001, now);
      noteGain.gain.linearRampToValueAtTime(0.22, now + 0.08);
      noteGain.gain.exponentialRampToValueAtTime(0.001, now + 2.2);

      noteOsc.connect(noteGain);
      // חיבור ישיר למוזיקה וגם למעגל ה-Delay לקבלת עומק מרחבי
      noteGain.connect(ambientMusicGain);
      if (delayNode) {
        noteGain.connect(delayNode);
      }

      noteOsc.start(now);
      noteOsc.stop(now + 2.3);
    } catch (e) {
      // התעלמות משגיאות נקודתיות
    }
  }

  /**
   * עצירת מוזיקת הרקע והמנגינה בדעיכה חלקה (Fade Out)
   */
  function stopAmbientMusic(immediate = false) {
    if (state.melodyTimer) {
      clearInterval(state.melodyTimer);
      state.melodyTimer = null;
    }

    if (!state.isAmbientPlaying || !activePads || !state.ctx) {
      state.isAmbientPlaying = false;
      return;
    }

    const pads = activePads;
    activePads = null;
    state.isAmbientPlaying = false;

    const ctx = state.ctx;
    const now = ctx.currentTime;
    const fadeDuration = immediate ? 0.05 : 0.7;

    try {
      pads.padGain.gain.setValueAtTime(pads.padGain.gain.value, now);
      pads.padGain.gain.linearRampToValueAtTime(0.001, now + fadeDuration);

      setTimeout(() => {
        try {
          pads.oscillators.forEach(osc => {
            osc.stop();
            osc.disconnect();
          });
          pads.padLfo.stop();
          pads.padLfo.disconnect();
          pads.padLfoGain.disconnect();
          pads.padFilter.disconnect();
          pads.padGain.disconnect();
        } catch (ignored) {}
      }, fadeDuration * 1000 + 40);
    } catch (e) {
      console.warn('Error stopping ambient music:', e);
    }
  }

  /**
   * השמעת אפקט קולי קצר, מודגש והרמוני בעת בחירת אזור מוחי (Chimes)
   * בולט יותר ממוזיקת הרקע כדי שיישמע ברור מעליה
   */
  function playRegionTone(fundamentalFreq) {
    if (state.isMuted) return;

    const ctx = getOrCreateContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    try {
      // צליל יסוד
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(fundamentalFreq, now);

      gain1.gain.setValueAtTime(0.001, now);
      gain1.gain.linearRampToValueAtTime(0.35, now + 0.015);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

      // הרמוניה עליונה (אוקטבה) לצליל קריסטלי בולט
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(fundamentalFreq * 2, now);

      gain2.gain.setValueAtTime(0.001, now);
      gain2.gain.linearRampToValueAtTime(0.18, now + 0.015);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

      osc1.connect(gain1);
      gain1.connect(sfxGain);

      osc2.connect(gain2);
      gain2.connect(sfxGain);

      osc1.start(now);
      osc1.stop(now + 0.6);

      osc2.start(now);
      osc2.stop(now + 0.45);
    } catch (e) {
      console.warn('Error playing region tone:', e);
    }
  }

  /**
   * שינוי עוצמת מוזיקת הרקע בנפרד
   */
  function setMusicVolume(val01) {
    state.musicVolume = Math.max(0, Math.min(1, val01));
    if (ambientMusicGain && state.ctx) {
      ambientMusicGain.gain.setValueAtTime(state.musicVolume * 0.35, state.ctx.currentTime);
    }
    updateAudioUI();
  }

  /**
   * שינוי עוצמת האפקטים הקוליים בנפרד
   */
  function setSfxVolume(val01) {
    state.sfxVolume = Math.max(0, Math.min(1, val01));
    if (sfxGain && state.ctx) {
      sfxGain.gain.setValueAtTime(state.sfxVolume * 0.9, state.ctx.currentTime);
    }
    updateAudioUI();
  }

  /**
   * כפתור Mute כללי – משתיק/מפעיל את כלל הצלילים (מוזיקה + אפקטים)
   */
  function toggleMute() {
    const ctx = getOrCreateContext();
    if (!ctx) return;

    state.userActivated = true;
    state.isMuted = !state.isMuted;

    const now = ctx.currentTime;

    if (state.isMuted) {
      // השתקה מלאה מיידית
      if (masterGain) {
        masterGain.gain.setValueAtTime(masterGain.gain.value, now);
        masterGain.gain.linearRampToValueAtTime(0, now + 0.1);
      }
      stopAmbientMusic(true);
    } else {
      // הפעלת שמע
      if (masterGain) {
        masterGain.gain.setValueAtTime(0, now);
        masterGain.gain.linearRampToValueAtTime(1.0, now + 0.15);
      }
      // אם אנחנו כרגע בשקופית 8 – נתחיל את מוזיקת הרקע
      if (state.currentSlide === 8) {
        startAmbientMusic();
      }
      // צליל אישור קצר
      playRegionTone(523.25);
    }

    updateAudioUI();
  }

  /**
   * עדכון ממשק המשתמש (כפתור Mute וסליידרים נפרדים)
   */
  function updateAudioUI() {
    const btnSound = document.getElementById('btnToggleSound');
    const musicSlider = document.getElementById('musicVolumeSlider');
    const sfxSlider = document.getElementById('sfxVolumeSlider');
    const musicValText = document.getElementById('musicValText');
    const sfxValText = document.getElementById('sfxValText');

    const musicPct = Math.round(state.musicVolume * 100);
    const sfxPct = Math.round(state.sfxVolume * 100);

    if (musicSlider) musicSlider.value = state.isMuted ? 0 : musicPct;
    if (sfxSlider) sfxSlider.value = state.isMuted ? 0 : sfxPct;

    if (musicValText) musicValText.textContent = state.isMuted ? 'מושתק' : `${musicPct}%`;
    if (sfxValText) sfxValText.textContent = state.isMuted ? 'מושתק' : `${sfxPct}%`;

    if (btnSound) {
      if (state.isMuted) {
        btnSound.innerHTML = '<span>🔇</span><span>צליל מושתק</span>';
        btnSound.classList.remove('sound-active');
        btnSound.setAttribute('title', 'לחץ להפעלת מוזיקת רקע ואפקטים');
      } else {
        btnSound.innerHTML = '<span>🔊</span><span>שמע מופעל</span>';
        btnSound.classList.add('sound-active');
        btnSound.setAttribute('title', 'לחץ להשתקת כל הצלילים');
      }
    }
  }

  /**
   * חיבור מאזיני אירועים
   */
  function bindEvents() {
    // כפתור השתקה/הפעלה
    const btnSound = document.getElementById('btnToggleSound');
    if (btnSound) {
      btnSound.addEventListener('click', toggleMute);
    }

    // סליידר מוזיקת רקע
    const musicSlider = document.getElementById('musicVolumeSlider');
    if (musicSlider) {
      musicSlider.addEventListener('input', (e) => {
        const val = parseFloat(e.target.value) / 100;
        if (state.isMuted && val > 0) {
          state.isMuted = false;
          if (masterGain && state.ctx) {
            masterGain.gain.setValueAtTime(1.0, state.ctx.currentTime);
          }
          if (state.currentSlide === 8) {
            startAmbientMusic();
          }
        }
        setMusicVolume(val);
      });
    }

    // סליידר אפקטים קוליים
    const sfxSlider = document.getElementById('sfxVolumeSlider');
    if (sfxSlider) {
      sfxSlider.addEventListener('input', (e) => {
        const val = parseFloat(e.target.value) / 100;
        if (state.isMuted && val > 0) {
          state.isMuted = false;
          if (masterGain && state.ctx) {
            masterGain.gain.setValueAtTime(1.0, state.ctx.currentTime);
          }
        }
        setSfxVolume(val);
      });
    }

    // מעקב אחר מעבר שקופיות במצגת
    document.addEventListener('slideChanged', (e) => {
      const slideNum = e.detail ? e.detail.slideNumber : 1;
      state.currentSlide = slideNum;

      if (slideNum === 8) {
        // המשתמש נמצא בשקופית 8: אם השמע הופעל יזומה ואינו מושתק – מפעילים מוזיקת רקע
        if (state.userActivated && !state.isMuted) {
          startAmbientMusic();
        }
      } else {
        // עזיבת שקופית 8: עצירה מיידית וחלקה של מוזיקת הרקע
        stopAmbientMusic(false);
      }
    });
  }

  // חשיפת הממשק באופן גלובלי
  window.AudioEngine = {
    playRegionTone,
    toggleMute,
    setMusicVolume,
    setSfxVolume,
    startAmbientMusic,
    stopAmbientMusic,
    isMuted: () => state.isMuted,
    isAmbientPlaying: () => state.isAmbientPlaying
  };

  // אתחול כשה-DOM נטען
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      bindEvents();
      updateAudioUI();
    });
  } else {
    bindEvents();
    updateAudioUI();
  }
})();
