/**
 * המוח הצרכני – הפסיכולוגיה שמאחורי החלטות קנייה
 * מנוע מוזיקת אווירה סינתטית אופציונלית (Web Audio API Ambient Synthesizer)
 *
 * הבהרה הנדסית ומדעית:
 * קובץ זה מייצר מוזיקת רקע סינתטית פרוצדורלית באמצעות Web Audio API
 * (אקורד A-Minor מתמשך וצלילי פעמון פנטטוניים עדינים).
 * הצלילים אינם הקלטה של פעילות מוחית (EEG / fMRI) ואינם "תדרי מוח" מאומתים מדעית.
 * שקופית 8 שקטה כברירת מחדל, וצלילי אזורי המוח (Region Tones) הוסרו כדי למנוע מצג שווא מדעי.
 */

(function () {
  'use strict';

  // מצב מערכת השמע — שקט לחלוטין כברירת מחדל עד לפעולה יזומה של המשתמש
  const state = {
    ctx: null,
    isMuted: true,
    userActivated: false,
    musicVolume: 0.7,
    sfxVolume: 0.0,
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

  // סולם מלודי פנטטוני רגוע (A-Minor: A4, C5, D5, E5, G5, A5) — סינתזה מוזיקלית בלבד
  const AMBIENT_SCALE = [440.00, 523.25, 587.33, 659.25, 783.99, 880.00, 659.25, 523.25];

  /**
   * אתחול ה-AudioContext מתוך פעולת משתמש יזומה בלבד
   */
  function getOrCreateContext() {
    if (!state.ctx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        state.ctx = new AudioContextClass();

        masterGain = state.ctx.createGain();
        masterGain.gain.setValueAtTime(state.isMuted ? 0 : 1, state.ctx.currentTime);
        masterGain.connect(state.ctx.destination);

        ambientMusicGain = state.ctx.createGain();
        ambientMusicGain.gain.setValueAtTime(state.musicVolume * 0.32, state.ctx.currentTime);
        ambientMusicGain.connect(masterGain);

        sfxGain = state.ctx.createGain();
        sfxGain.gain.setValueAtTime(0, state.ctx.currentTime);
        sfxGain.connect(masterGain);

        delayNode = state.ctx.createDelay();
        delayNode.delayTime.setValueAtTime(0.38, state.ctx.currentTime);

        delayFeedback = state.ctx.createGain();
        delayFeedback.gain.setValueAtTime(0.32, state.ctx.currentTime);

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
   * הפעלת מוזיקת אווירה סינתטית אופציונלית (רק לאחר הפעלה יזומה של המשתמש)
   */
  function startAmbientMusic() {
    if (state.isMuted || !state.userActivated) return;
    const ctx = getOrCreateContext();
    if (!ctx) return;

    if (state.isAmbientPlaying) {
      stopAmbientMusic(true);
    }

    const now = ctx.currentTime;

    try {
      // אקורד A-Minor סינתטי: A2 (110Hz), E3 (164.81Hz), A3 (220Hz), C4 (261.63Hz), E4 (329.63Hz)
      const chordFreqs = [110.0, 164.81, 220.0, 261.63, 329.63];
      const oscillators = [];

      const padFilter = ctx.createBiquadFilter();
      padFilter.type = 'lowpass';
      padFilter.frequency.setValueAtTime(420, now);
      padFilter.Q.setValueAtTime(1.5, now);

      const padLfo = ctx.createOscillator();
      padLfo.frequency.setValueAtTime(0.08, now);

      const padLfoGain = ctx.createGain();
      padLfoGain.gain.setValueAtTime(140, now);

      padLfo.connect(padLfoGain);
      padLfoGain.connect(padFilter.frequency);

      const padGain = ctx.createGain();
      padGain.gain.setValueAtTime(0.001, now);
      padGain.gain.linearRampToValueAtTime(0.65, now + 1.8);

      chordFreqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, now);
        osc.detune.setValueAtTime((idx - 2) * 4.0, now);

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
      startMelodySequencer();
    } catch (err) {
      console.warn('Could not start ambient music:', err);
    }
  }

  function startMelodySequencer() {
    if (state.melodyTimer) {
      clearInterval(state.melodyTimer);
      state.melodyTimer = null;
    }

    state.melodyIndex = 0;
    playAmbientMelodyNote();

    state.melodyTimer = setInterval(() => {
      if (!state.isAmbientPlaying || state.isMuted) {
        clearInterval(state.melodyTimer);
        state.melodyTimer = null;
        return;
      }
      playAmbientMelodyNote();
    }, 2600);
  }

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

      noteGain.gain.setValueAtTime(0.001, now);
      noteGain.gain.linearRampToValueAtTime(0.18, now + 0.08);
      noteGain.gain.exponentialRampToValueAtTime(0.001, now + 2.1);

      noteOsc.connect(noteGain);
      noteGain.connect(ambientMusicGain);
      if (delayNode) {
        noteGain.connect(delayNode);
      }

      noteOsc.start(now);
      noteOsc.stop(now + 2.2);
    } catch (e) {
      // התעלמות משגיאות נקודתיות
    }
  }

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
    const fadeDuration = immediate ? 0.05 : 0.5;

    try {
      pads.padGain.gain.setValueAtTime(pads.padGain.gain.value, now);
      pads.padGain.gain.linearRampToValueAtTime(0.001, now + fadeDuration);

      setTimeout(() => {
        try {
          pads.oscillators.forEach((osc) => {
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
   * צלילי האזורים (Region Tones) הוסרו משקופית 8:
   * התדרים הקודמים (523.25Hz, 392Hz, 329.63Hz, 659.25Hz) היו תווים מוזיקליים סינתטיים (C5, G4, E4, E5)
   * ולא שיקפו תדרים נוירולוגיים או מדידה מוחית. הפונקציה נשמרת כ-No-Op לתאימות לאחור בלבד.
   */
  function playRegionTone() {
    return;
  }

  function setMusicVolume(val01) {
    state.musicVolume = Math.max(0, Math.min(1, val01));
    if (ambientMusicGain && state.ctx) {
      ambientMusicGain.gain.setValueAtTime(state.musicVolume * 0.32, state.ctx.currentTime);
    }
    updateAudioUI();
  }

  function setSfxVolume(val01) {
    state.sfxVolume = Math.max(0, Math.min(1, val01));
    updateAudioUI();
  }

  /**
   * הפעלה / כיבוי יזום של מוזיקת האווירה הסינתטית האופציונלית
   */
  function toggleMute() {
    const ctx = getOrCreateContext();
    if (!ctx) return;

    state.userActivated = true;
    state.isMuted = !state.isMuted;

    const now = ctx.currentTime;

    if (state.isMuted) {
      if (masterGain) {
        masterGain.gain.setValueAtTime(masterGain.gain.value, now);
        masterGain.gain.linearRampToValueAtTime(0, now + 0.1);
      }
      stopAmbientMusic(true);
    } else {
      if (masterGain) {
        masterGain.gain.setValueAtTime(0, now);
        masterGain.gain.linearRampToValueAtTime(1.0, now + 0.15);
      }
      if (state.currentSlide === 8) {
        startAmbientMusic();
      }
    }

    updateAudioUI();
  }

  function updateAudioUI() {
    const btnSound = document.getElementById('btnToggleSound');
    const musicSlider = document.getElementById('musicVolumeSlider');
    const musicValText = document.getElementById('musicValText');

    const musicPct = Math.round(state.musicVolume * 100);

    if (musicSlider) musicSlider.value = state.isMuted ? 0 : musicPct;
    if (musicValText) musicValText.textContent = state.isMuted ? 'כבוי' : `${musicPct}%`;

    if (btnSound) {
      if (state.isMuted) {
        btnSound.innerHTML = '<span>🔇</span><span>מוזיקת אווירה סינתטית: כבויה</span>';
        btnSound.classList.remove('sound-active');
        btnSound.setAttribute('aria-pressed', 'false');
        btnSound.setAttribute('title', 'אופציונלי: הפעלת מוזיקת רקע סינתטית (Web Audio API — אינה תדר מוחי)');
      } else {
        btnSound.innerHTML = '<span>🔊</span><span>מוזיקת אווירה סינתטית: פועלת</span>';
        btnSound.classList.add('sound-active');
        btnSound.setAttribute('aria-pressed', 'true');
        btnSound.setAttribute('title', 'לחץ לכיבוי מוזיקת האווירה הסינתטית');
      }
    }
  }

  function bindEvents() {
    const btnSound = document.getElementById('btnToggleSound');
    if (btnSound) {
      btnSound.addEventListener('click', toggleMute);
    }

    const musicSlider = document.getElementById('musicVolumeSlider');
    if (musicSlider) {
      musicSlider.addEventListener('input', (e) => {
        const val = parseFloat(e.target.value) / 100;
        if (state.isMuted && val > 0) {
          state.userActivated = true;
          state.isMuted = false;
          const ctx = getOrCreateContext();
          if (masterGain && ctx) {
            masterGain.gain.setValueAtTime(1.0, ctx.currentTime);
          }
          if (state.currentSlide === 8) {
            startAmbientMusic();
          }
        } else if (!state.isMuted && val === 0) {
          state.isMuted = true;
          stopAmbientMusic(true);
        }
        setMusicVolume(val);
      });
    }

    document.addEventListener('slideChanged', (e) => {
      const slideNum = e.detail ? e.detail.slideNumber : 1;
      state.currentSlide = slideNum;

      if (slideNum === 8) {
        if (state.userActivated && !state.isMuted) {
          startAmbientMusic();
        }
      } else {
        stopAmbientMusic(false);
      }
    });
  }

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
