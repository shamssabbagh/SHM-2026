/**
 * המוח הצרכני – הפסיכולוגיה שמאחורי החלטות קנייה
 * מנוע סאונד מבוסס Web Audio API (צליל רקע עתידני, אפקטים ושליטה בעוצמה)
 */

(function () {
  'use strict';

  // מצב מערכת השמע
  const state = {
    ctx: null,
    isMuted: true,              // ברירת מחדל: מושתק לחלוטין לפי הדרישה!
    userActivated: false,       // האם המשתמש הפעיל צליל באופן יזום לפחות פעם אחת
    masterVolume: 0.7,          // עוצמת שמע כללית (0.0 עד 1.0)
    isAmbientPlaying: false,
    currentSlide: 1
  };

  // צומתי Web Audio
  let masterGain = null;
  let ambientNodes = null;

  /**
   * אתחול ה-AudioContext מתוך אינטראקציית משתמש (תואם Chromium ו-Microsoft Edge)
   */
  function getOrCreateContext() {
    if (!state.ctx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        state.ctx = new AudioContextClass();
        masterGain = state.ctx.createGain();
        masterGain.gain.setValueAtTime(state.isMuted ? 0 : state.masterVolume, state.ctx.currentTime);
        masterGain.connect(state.ctx.destination);
      }
    }

    if (state.ctx && state.ctx.state === 'suspended') {
      state.ctx.resume();
    }

    return state.ctx;
  }

  /**
   * יצירה והפעלה של צליל רקע עתידני מתמשך (Ambient Futuristic Drone)
   * מסונתז ב-100% באמצעות Web Audio API (ללא קבצים חיצוניים וללא בעיות רישוי)
   */
  function startAmbientDrone() {
    const ctx = getOrCreateContext();
    if (!ctx || state.isMuted) return;

    // מניעת שכפול: אם כבר מתנגן צליל רקע, נעצור אותו תחילה
    if (state.isAmbientPlaying && ambientNodes) {
      stopAmbientDrone(true);
    }

    const now = ctx.currentTime;

    try {
      // 1. מתנדים ליצירת מרקם הרמוני עמוק ועתידני
      const osc1 = ctx.createOscillator(); // תדר בסיס 110Hz (A2)
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(110, now);

      const osc2 = ctx.createOscillator(); // הרמוניה חמישית 164.8Hz (E3) עם Detune קל
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(164.81, now);
      osc2.detune.setValueAtTime(3.5, now); // אפקט Chorus עדין

      const osc3 = ctx.createOscillator(); // צליל תת-בסיס חם 55Hz (A1)
      osc3.type = 'sine';
      osc3.frequency.setValueAtTime(55, now);

      // 2. מסנן Lowpass לנשימה נוירונלית
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(340, now);
      filter.Q.setValueAtTime(2.2, now);

      // 3. מתנד תדר נמוך (LFO) המווסת את המסנן בקצב פעימה איטי (נשימת מוח)
      const lfo = ctx.createOscillator();
      lfo.frequency.setValueAtTime(0.12, now); // מחזור של כ-8 שניות

      const lfoGain = ctx.createGain();
      lfoGain.gain.setValueAtTime(120, now); // משרעת השינוי בתדר המסנן (בין 220Hz ל-460Hz)

      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);

      // 4. בקרת עוצמה של צליל הרקע עם כניסה הדרגתית רכה (Fade In)
      const ambientGain = ctx.createGain();
      ambientGain.gain.setValueAtTime(0.001, now);
      ambientGain.gain.linearRampToValueAtTime(0.08, now + 1.8); // עוצמה עדינה ומרגיעה ברקע

      // חיבור הצמתים
      osc1.connect(filter);
      osc2.connect(filter);
      osc3.connect(filter);
      filter.connect(ambientGain);
      ambientGain.connect(masterGain);

      // הפעלה
      osc1.start(now);
      osc2.start(now);
      osc3.start(now);
      lfo.start(now);

      state.isAmbientPlaying = true;

      // שמירת הפניות לצמתים כדי לעצור אותם בצורה נקייה
      ambientNodes = {
        osc1, osc2, osc3, lfo, lfoGain, filter, ambientGain
      };
    } catch (e) {
      console.warn('Could not start ambient drone:', e);
    }
  }

  /**
   * עצירת צליל הרקע עם דעיכה חלקה (Fade Out) ומניעת זליגת זיכרון
   * @param {boolean} immediate - האם לעצור מיידית ללא דעיכה
   */
  function stopAmbientDrone(immediate = false) {
    if (!state.isAmbientPlaying || !ambientNodes || !state.ctx) {
      state.isAmbientPlaying = false;
      return;
    }

    const nodes = ambientNodes;
    ambientNodes = null;
    state.isAmbientPlaying = false;

    const ctx = state.ctx;
    const now = ctx.currentTime;
    const fadeDuration = immediate ? 0.05 : 0.8;

    try {
      nodes.ambientGain.gain.setValueAtTime(nodes.ambientGain.gain.value, now);
      nodes.ambientGain.gain.linearRampToValueAtTime(0.001, now + fadeDuration);

      setTimeout(() => {
        try {
          nodes.osc1.stop();
          nodes.osc2.stop();
          nodes.osc3.stop();
          nodes.lfo.stop();
          nodes.osc1.disconnect();
          nodes.osc2.disconnect();
          nodes.osc3.disconnect();
          nodes.lfo.disconnect();
          nodes.lfoGain.disconnect();
          nodes.filter.disconnect();
          nodes.ambientGain.disconnect();
        } catch (ignored) {}
      }, fadeDuration * 1000 + 50);
    } catch (e) {
      console.warn('Error while stopping ambient drone:', e);
    }
  }

  /**
   * השמעת אפקט קולי קצר והרמוני בעת בחירת אזור מוחי (Chime)
   * @param {number} freq - תדר הצליל בהרץ
   */
  function playRegionTone(freq) {
    if (state.isMuted) return;

    const ctx = getOrCreateContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      // מעטפת צליל רכה ומהירה (Fast attack, gentle exponential decay)
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.18, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

      osc.connect(gain);
      gain.connect(masterGain);

      osc.start(now);
      osc.stop(now + 0.65);
    } catch (e) {
      console.warn('Error playing region tone:', e);
    }
  }

  /**
   * שינוי עוצמת השמע הראשית
   * @param {number} volume01 - ערך בין 0.0 ל-1.0
   */
  function setMasterVolume(volume01) {
    state.masterVolume = Math.max(0, Math.min(1, volume01));

    if (masterGain && state.ctx && !state.isMuted) {
      masterGain.gain.setValueAtTime(state.masterVolume, state.ctx.currentTime);
    }

    // עדכון סליידר וטקסט ב-UI
    updateAudioUI();
  }

  /**
   * החלפת מצב השתקה (Mute / Unmute)
   * משתיק/מפעיל הן את צליל הרקע והן את האפקטים הקוליים
   */
  function toggleMute() {
    const ctx = getOrCreateContext();
    if (!ctx) return;

    state.userActivated = true; // לחיצה יזומה נרשמה
    state.isMuted = !state.isMuted;

    const now = ctx.currentTime;

    if (state.isMuted) {
      // השתקה מלאה
      if (masterGain) {
        masterGain.gain.setValueAtTime(masterGain.gain.value, now);
        masterGain.gain.linearRampToValueAtTime(0, now + 0.15);
      }
      stopAmbientDrone(true);
    } else {
      // הפעלת שמע
      if (masterGain) {
        masterGain.gain.setValueAtTime(0, now);
        masterGain.gain.linearRampToValueAtTime(state.masterVolume, now + 0.15);
      }
      // אם אנחנו כרגע בשקופית 8 – נתחיל את צליל הרקע
      if (state.currentSlide === 8) {
        startAmbientDrone();
      }
      // נשמיע צליל אישור עדין
      playRegionTone(523.25);
    }

    updateAudioUI();
  }

  /**
   * עדכון אלמנטי ממשק המשתמש של השמע
   */
  function updateAudioUI() {
    const btnSound = document.getElementById('btnToggleSound');
    const slider = document.getElementById('audioVolumeSlider');
    const volText = document.getElementById('volValueText');
    const volIcon = document.getElementById('volIcon');

    const pct = Math.round(state.masterVolume * 100);

    if (slider) {
      slider.value = state.isMuted ? 0 : pct;
    }
    if (volText) {
      volText.textContent = state.isMuted ? 'מושתק' : `${pct}%`;
    }

    if (volIcon) {
      if (state.isMuted || pct === 0) {
        volIcon.textContent = '🔇';
      } else if (pct < 40) {
        volIcon.textContent = '🔈';
      } else {
        volIcon.textContent = '🔊';
      }
    }

    if (btnSound) {
      if (state.isMuted) {
        btnSound.innerHTML = '<span>🔇</span><span>צליל מושתק</span>';
        btnSound.classList.remove('sound-active');
        btnSound.setAttribute('title', 'לחץ להפעלת שמע וצליל רקע');
      } else {
        btnSound.innerHTML = '<span>🔊</span><span>צליל מופעל</span>';
        btnSound.classList.add('sound-active');
        btnSound.setAttribute('title', 'לחץ להשתקת כל הצלילים');
      }
    }
  }

  /**
   * חיבור מאזיני אירועים ל-DOM ולניווט המצגת
   */
  function bindEvents() {
    // כפתור השתקה/הפעלה
    const btnSound = document.getElementById('btnToggleSound');
    if (btnSound) {
      btnSound.addEventListener('click', toggleMute);
    }

    // סליידר עוצמת שמע
    const slider = document.getElementById('audioVolumeSlider');
    if (slider) {
      slider.addEventListener('input', (e) => {
        const val = parseFloat(e.target.value) / 100;
        if (state.isMuted && val > 0) {
          state.isMuted = false;
        }
        setMasterVolume(val);
      });
    }

    // מעקב אחר מעבר שקופיות במצגת
    document.addEventListener('slideChanged', (e) => {
      const slideNum = e.detail ? e.detail.slideNumber : 1;
      state.currentSlide = slideNum;

      if (slideNum === 8) {
        // המשתמש הגיע לשקופית 8 (אנימציית המוח)
        // אם הצליל הופעל יזומה ואינו מושתק – נפעיל את צליל הרקע העדין
        if (state.userActivated && !state.isMuted) {
          startAmbientDrone();
        }
      } else {
        // עזיבת שקופית 8 – עצירה אוטומטית של צליל הרקע!
        stopAmbientDrone(false);
      }
    });
  }

  // חשיפת הממשק באופן גלובלי לטובת brain3d.js
  window.AudioEngine = {
    playRegionTone,
    toggleMute,
    setMasterVolume,
    startAmbientDrone,
    stopAmbientDrone,
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
