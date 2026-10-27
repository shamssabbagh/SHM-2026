/**
 * המוח הצרכני – הפסיכולוגיה שמאחורי החלטות קנייה
 * מנוע ניווט והצגת שקופיות (JavaScript)
 */

(function () {
  'use strict';

  // מצב המערכת
  const state = {
    currentSlide: 1,
    totalSlides: 19,
    storageKey: 'shm_2026_current_slide'
  };

  // תפיסת אלמנטים ב-DOM
  const elements = {
    slides: document.querySelectorAll('.slide'),
    progressBar: document.getElementById('progressBar'),
    slideCounter: document.getElementById('slideCounter'),
    btnPrev: document.getElementById('btnPrev'),
    btnNext: document.getElementById('btnNext'),
    btnToc: document.getElementById('btnToc'),
    tocModal: document.getElementById('tocModal'),
    btnCloseToc: document.getElementById('btnCloseToc'),
    tocGrid: document.getElementById('tocGrid')
  };

  /**
   * אתחול המצגת
   */
  function init() {
    state.totalSlides = elements.slides.length || 19;

    // טעינת שקופית אחרונה משמירה מקומית או ברירת מחדל לשקופית 1
    const savedSlide = parseInt(sessionStorage.getItem(state.storageKey), 10);
    if (!isNaN(savedSlide) && savedSlide >= 1 && savedSlide <= state.totalSlides) {
      state.currentSlide = savedSlide;
    } else {
      state.currentSlide = 1;
    }

    buildTocGrid();
    bindEvents();
    renderSlide(state.currentSlide);
  }

  /**
   * הצגת שקופית לפי מספר (1 עד 19)
   * @param {number} slideNumber 
   */
  function renderSlide(slideNumber) {
    if (slideNumber < 1) slideNumber = 1;
    if (slideNumber > state.totalSlides) slideNumber = state.totalSlides;

    state.currentSlide = slideNumber;
    sessionStorage.setItem(state.storageKey, slideNumber);

    // עדכון תצוגת שקופיות ב-DOM
    elements.slides.forEach((slide, index) => {
      const isTarget = index + 1 === slideNumber;
      if (isTarget) {
        slide.classList.add('active');
        // גלילה חלקה לראש השקופית
        slide.scrollTop = 0;
      } else {
        slide.classList.remove('active');
      }
    });

    // עדכון פס התקדמות עליון
    const progressPercent = (slideNumber / state.totalSlides) * 100;
    if (elements.progressBar) {
      elements.progressBar.style.width = `${progressPercent}%`;
    }

    // עדכון מונה שקופיות
    if (elements.slideCounter) {
      elements.slideCounter.textContent = `שקופית ${slideNumber} מתוך ${state.totalSlides}`;
    }

    // עדכון כפתורי ניווט (ביטול/הפעלה בקצוות)
    if (elements.btnPrev) {
      elements.btnPrev.disabled = slideNumber === 1;
    }
    if (elements.btnNext) {
      elements.btnNext.disabled = slideNumber === state.totalSlides;
    }

    // עדכון סימון בשולחן תוכן העניינים
    updateTocSelection(slideNumber);

    // שליחת אירוע גלובלי לטובת מודולים כגון Three.js או Pyodide
    document.dispatchEvent(new CustomEvent('slideChanged', { detail: { slideNumber } }));
  }

  /**
   * מעבר לשקופית הבאה
   */
  function nextSlide() {
    if (state.currentSlide < state.totalSlides) {
      renderSlide(state.currentSlide + 1);
    }
  }

  /**
   * מעבר לשקופית הקודמת
   */
  function prevSlide() {
    if (state.currentSlide > 1) {
      renderSlide(state.currentSlide - 1);
    }
  }

  /**
   * בניית רשת תוכן עניינים (TOC) באופן דינמי משמות השקופיות
   */
  function buildTocGrid() {
    if (!elements.tocGrid) return;
    elements.tocGrid.innerHTML = '';

    elements.slides.forEach((slide, index) => {
      const slideNum = index + 1;
      const titleEl = slide.querySelector('.slide-title-group h2, .cover-title');
      let titleText = titleEl ? titleEl.textContent.trim() : `שקופית ${slideNum}`;

      // ניקוי תגיות ורווחים
      titleText = titleText.replace(/\s+/g, ' ');

      const item = document.createElement('div');
      item.className = 'toc-item';
      item.setAttribute('data-slide-index', slideNum);
      item.innerHTML = `
        <span class="toc-num">${slideNum}</span>
        <span class="toc-text">${titleText}</span>
      `;

      item.addEventListener('click', () => {
        renderSlide(slideNum);
        closeToc();
      });

      elements.tocGrid.appendChild(item);
    });
  }

  /**
   * עדכון השקופית הנבחרת בתוך תוכן העניינים
   * @param {number} activeNum 
   */
  function updateTocSelection(activeNum) {
    if (!elements.tocGrid) return;
    const items = elements.tocGrid.querySelectorAll('.toc-item');
    items.forEach((item) => {
      const idx = parseInt(item.getAttribute('data-slide-index'), 10);
      if (idx === activeNum) {
        item.classList.add('current');
      } else {
        item.classList.remove('current');
      }
    });
  }

  /**
   * פתיחת חלונית תוכן העניינים
   */
  function openToc() {
    if (elements.tocModal) {
      elements.tocModal.classList.add('open');
    }
  }

  /**
   * סגירת חלונית תוכן העניינים
   */
  function closeToc() {
    if (elements.tocModal) {
      elements.tocModal.classList.remove('open');
    }
  }

  /**
   * חיבור מאזיני אירועים (מקלדת, לחיצות)
   */
  function bindEvents() {
    // כפתורי ניווט
    if (elements.btnNext) {
      elements.btnNext.addEventListener('click', nextSlide);
    }
    if (elements.btnPrev) {
      elements.btnPrev.addEventListener('click', prevSlide);
    }

    // כפתור תוכן עניינים וסגירה
    if (elements.btnToc) {
      elements.btnToc.addEventListener('click', openToc);
    }
    if (elements.btnCloseToc) {
      elements.btnCloseToc.addEventListener('click', closeToc);
    }

    // סגירת מודל בלחיצה על הרקע הכהה
    if (elements.tocModal) {
      elements.tocModal.addEventListener('click', (e) => {
        if (e.target === elements.tocModal) {
          closeToc();
        }
      });
    }

    // ניווט במקלדת
    document.addEventListener('keydown', (e) => {
      // אם המודל של תוכן העניינים פתוח ומקישים Esc - נסגור אותו
      if (e.key === 'Escape') {
        if (elements.tocModal && elements.tocModal.classList.contains('open')) {
          closeToc();
          return;
        }
      }

      // חצים ומקשים למעבר שקופיות
      // בתפיסה ישראלית/RTL: חץ שמאלה מקדם קדימה, אך נתמוך במקשים אוניברסליים
      switch (e.key) {
        case 'ArrowLeft': // מקובל ב-RTL כהתקדמות קדימה
        case 'ArrowDown':
        case 'PageDown':
        case ' ': // רווח
          if (!elements.tocModal || !elements.tocModal.classList.contains('open')) {
            nextSlide();
          }
          break;

        case 'ArrowRight': // מקובל ב-RTL כחזרה אחורה
        case 'ArrowUp':
        case 'PageUp':
          if (!elements.tocModal || !elements.tocModal.classList.contains('open')) {
            prevSlide();
          }
          break;

        case 'Home':
          renderSlide(1);
          break;

        case 'End':
          renderSlide(state.totalSlides);
          break;
      }
    });

    // כפתור "התחל מצגת" בשקופית השער
    const btnStart = document.getElementById('btnStartPresentation');
    if (btnStart) {
      btnStart.addEventListener('click', () => {
        renderSlide(2);
      });
    }
  }

  // חשיפת פונקציות גלובליות לשליטה חיצונית בעת הצורך
  window.PresentationController = {
    renderSlide,
    nextSlide,
    prevSlide,
    openToc,
    closeToc,
    getCurrentSlide: () => state.currentSlide
  };

  // אתחול כשה-DOM נטען
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
