/**
 * המוח הצרכני – הפסיכולוגיה שמאחורי החלטות קנייה
 * מודל מוח תלת-ממדי אינטראקטיבי באמצעות Three.js (שקופית 8)
 */

(function () {
  'use strict';

  // בדיקת קיום Three.js
  if (typeof THREE === 'undefined') {
    console.error('Three.js library is not loaded.');
    showFallback('ספריית Three.js לא אותרה. יש לוודא טעינת js/vendor/three.min.js.');
    return;
  }

  // בדיקת תמיכת WebGL
  function isWebGLAvailable() {
    try {
      const canvas = document.createElement('canvas');
      return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch (e) {
      return false;
    }
  }

  if (!isWebGLAvailable()) {
    showFallback('הדפדפן אינו תומך בהאצת חומרה (WebGL) הדרושה להרצת המודל התלת-ממדי.');
    return;
  }

  // נתוני 4 האזורים הקונספטואליים
  const BRAIN_REGIONS = {
    pfc: {
      id: 'pfc',
      nameHe: 'קליפת המוח הקדם-מצחית',
      nameEn: 'Prefrontal Cortex (PFC)',
      colorHex: '#38bdf8',
      colorNum: 0x38bdf8,
      position: { x: 0, y: 0.65, z: 1.55 },
      toneFreq: 523.25, // C5
      badge: 'בקרה רציונלית, חישוב ערך ותכנון',
      summary: 'אזור קורטיקלי מרכזי המקושר לחשיבה אנליטית (מערכת 2), ויסות דחפים ושקילת רווח והפסד.',
      consumerRole: 'בזמן קנייה, ה-PFC משמש כ"מבוגר האחראי" – שוקל כדאיות מחיר, מעכב רכישות אימפולסיביות ומחשב עלות-תועלת ותקציב ארוך טווח.',
      marketingImplication: 'אסטרטגיות שיווק לקניות מורכבות (כגון רכבים או מוצרי השקעה) מספקות ל-PFC טיעונים הגיוניים, מפרטים טכניים והשוואת מחירים.',
      academicNote: 'מודל קונספטואלי בלבד: בקרה רציונלית היא תולדה של רשת רחבה ולא של אזור בודד ומבודד.'
    },
    amygdala: {
      id: 'amygdala',
      nameHe: 'אמיגדלה',
      nameEn: 'Amygdala (Limbic System)',
      colorHex: '#fb7185',
      colorNum: 0xfb7185,
      position: { x: -0.65, y: -0.4, z: 0.25 },
      altPosition: { x: 0.65, y: -0.4, z: 0.25 }, // דו-צדדי
      toneFreq: 392.00, // G4
      badge: 'עיבוד רגשי מהיר, דחיפות ו-FOMO',
      summary: 'מבנה עמוק במערכת הלימבית המגיב במהירות לגירויים מאיימים, מעוררי חרדה או בעלי דחיפות קיומית.',
      consumerRole: 'מגיבה בעוצמה למסרי מחסור ("נשארו רק 2 פריטים במלאי!"), ספירות לאחור במבצעים ותחושת החמצה (Fear of Missing Out).',
      marketingImplication: 'טקטיקות דחיפות מייצרות תגובה לימבית מהירה (מערכת 1) שעוקפת את הבקרה הרציונלית האיטית של ה-PFC ומאיצה המרה מיידית.',
      academicNote: 'מודל קונספטואלי בלבד: האמיגדלה אינה "כפתור פחד" בלבד אלא מעבדת משמעות רגשית ובולטות של גירויים שונים.'
    },
    insula: {
      id: 'insula',
      nameHe: 'אינסולה',
      nameEn: 'Insula (Anterior Insular Cortex)',
      colorHex: '#fbbf24',
      colorNum: 0xfbbf24,
      position: { x: 1.15, y: 0.05, z: 0.35 },
      altPosition: { x: -1.15, y: 0.05, z: 0.35 },
      toneFreq: 329.63, // E4
      badge: 'כאב התשלום ודחיית מחירים מופקעים',
      summary: 'קפל קורטיקלי פנימי המעבד תחושות גופניות פנימיות (אינטרוספציה), גועל פיזי וסלידה חברתית.',
      consumerRole: 'במחקרי נוירו-כלכלה (Prelec & Loewenstein), האינסולה מופעלת בעת חשיפה למחיר בלתי הוגן או מופקע – תופעה המכונה "כאב התשלום".',
      marketingImplication: 'תשלומים דיגיטליים (Apple Pay, 1-Click Checkout) מנטרלים את החיכוך הפיזי של מזומן ומרדימים את תגובת האינסולה, דבר המגדיל את סל הקנייה.',
      academicNote: 'מודל קונספטואלי בלבד: פעילות באינסולה מעידה על עוררות גופנית רחבה ולא על כאב תשלום מבודד כשלעצמו.'
    },
    nacc: {
      id: 'nacc',
      nameHe: 'גרעין האקומבנס',
      nameEn: 'Nucleus Accumbens (NAcc / Ventral Striatum)',
      colorHex: '#c084fc',
      colorNum: 0xc084fc,
      position: { x: 0, y: -0.25, z: 0.65 },
      toneFreq: 659.25, // E5
      badge: 'ציפייה לתגמול, דופמין ועונג רכישה',
      summary: 'רכיב מפתח בציר התגמול הדופמינרגי של המוח המופעל בציפייה להנאה, תועלת או רווח עתידי.',
      consumerRole: 'ה-NAcc נדלק כאשר הצרכן רואה מוצר נחשק, מבצע הנחה משמעותי או פריט המשדר יוקרה ומעמד חברתי.',
      marketingImplication: 'צילום מושך של מוצרים, הבטחה לחוויה מהנה ומועדוני לקוחות מייצרים ציפייה לתגמול המניעה את הצרכן לעבר רכישה.',
      academicNote: 'מודל קונספטואלי בלבד: מופעל מתוך ציפייה לתגמול (Wanting) ולא בהכרח משביעות רצון בפועל מאיכות המוצר לאחר השימוש.'
    }
  };

  // אובייקט ניהול האודיו (Web Audio API)
  const soundManager = {
    ctx: null,
    isMuted: true, // ברירת מחדל מושתקת לחלוטין לפי הדרישה!
    init: function () {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    },
    playTone: function (freq) {
      if (this.isMuted) return;
      try {
        this.init();
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.5);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.5);
      } catch (err) {
        console.warn('Audio playback not supported or blocked:', err);
      }
    }
  };

  // משתני Three.js
  let scene, camera, renderer, brainGroup;
  let animationFrameId = null;
  let isRotating = true;
  let isPointerDown = false;
  let pointerStart = { x: 0, y: 0 };
  let pointerDelta = { x: 0, y: 0 };
  let currentRotation = { x: 0.15, y: -0.4 };
  let targetRotation = { x: 0.15, y: -0.4 };
  let selectedRegionId = null;
  const hotspotMeshes = [];
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  // אלמנטי DOM
  let container, infoCardEl, btnRotate, btnReset, btnSound, fallbackEl;

  /**
   * הצגת הודעת שגיאה / Fallback
   */
  function showFallback(message) {
    fallbackEl = document.getElementById('brain3d-fallback');
    if (fallbackEl) {
      fallbackEl.style.display = 'block';
      const msgEl = fallbackEl.querySelector('.fallback-msg');
      if (msgEl) msgEl.textContent = message;
    }
    const canvasContainer = document.getElementById('brain3d-canvas-container');
    if (canvasContainer) {
      canvasContainer.style.display = 'none';
    }
  }

  /**
   * אתחול הסצנה התלת-ממדית
   */
  function init() {
    container = document.getElementById('brain3d-canvas-container');
    infoCardEl = document.getElementById('brainRegionCard');
    btnRotate = document.getElementById('btnToggleRotate');
    btnReset = document.getElementById('btnResetView');
    btnSound = document.getElementById('btnToggleSound');

    if (!container) return;

    try {
      // 1. הגדרת Scene
      scene = new THREE.Scene();

      // 2. הגדרת Camera
      const aspect = container.clientWidth / container.clientHeight;
      camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 100);
      camera.position.set(0, 0, 5.2);

      // 3. הגדרת Renderer
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0); // רקע שקוף
      container.appendChild(renderer.domElement);

      // 4. תאורה
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
      scene.add(ambientLight);

      const pointLight1 = new THREE.PointLight(0x38bdf8, 2, 20);
      pointLight1.position.set(5, 5, 5);
      scene.add(pointLight1);

      const pointLight2 = new THREE.PointLight(0xc084fc, 2, 20);
      pointLight2.position.set(-5, -3, 3);
      scene.add(pointLight2);

      // 5. קבוצת המוח (Brain Group)
      brainGroup = new THREE.Group();
      scene.add(brainGroup);

      // בניית שתי ההמיספרות ומודל החלקיקים
      createBrainGeometry(brainGroup);

      // בניית 4 נקודות העניין (Hotspots)
      createHotspots(brainGroup);

      // 6. חיבור אירועי עכבר, מגע ורספונסיביות
      bindEvents();

      // בחירת אזור ברירת מחדל (PFC) לתצוגה ראשונית עשירה
      selectRegion('pfc', false);

      // התחלת לולאת הרנדור
      startAnimation();
    } catch (err) {
      console.error('Failed to initialize Three.js brain scene:', err);
      showFallback('אירעה שגיאה באתחול המנוע הגרפי: ' + err.message);
    }
  }

  /**
   * בניית מודל המוח הפרוצדורלי (Particles & Wireframe)
   */
  function createBrainGeometry(parentGroup) {
    const particleCount = 1400;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const baseColor1 = new THREE.Color(0x38bdf8); // Cyan
    const baseColor2 = new THREE.Color(0x818cf8); // Indigo
    const baseColor3 = new THREE.Color(0xc084fc); // Purple

    let index = 0;
    for (let i = 0; i < particleCount; i++) {
      // קביעת המיספרה: ימין (1) או שמאל (-1)
      const hemisphere = Math.random() > 0.5 ? 1 : -1;

      // קואורדינטות כדוריות עם חריץ אורך וקפלים קורטיקליים
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);

      // צורת אליפסואיד של חצי מוח
      let r = 1.35 + 0.12 * Math.sin(theta * 5.0) * Math.cos(phi * 4.0);
      
      let x = r * Math.sin(phi) * Math.cos(theta) * 0.85;
      let y = r * Math.sin(phi) * Math.sin(theta) * 0.95;
      let z = r * Math.cos(phi) * 1.25;

      // הזזת ההמיספרה לצד שלה ליצירת החריץ האורכי (Longitudinal Fissure)
      x = hemisphere * (Math.abs(x) + 0.08);

      // חידוד החלק הקדמי (Frontal) ועיגול האחורי (Occipital)
      if (z > 0) {
        y *= 1.05;
      } else {
        y *= 0.9;
        x *= 1.05;
      }

      positions[index * 3] = x;
      positions[index * 3 + 1] = y;
      positions[index * 3 + 2] = z;

      // ערבוב צבעים הרמוני לפי עומק וגובה
      const mixRatio = (z + 1.5) / 3.0;
      const pointColor = baseColor1.clone().lerp(baseColor3, mixRatio);
      if (y < 0) pointColor.lerp(baseColor2, 0.4);

      colors[index * 3] = pointColor.r;
      colors[index * 3 + 1] = pointColor.g;
      colors[index * 3 + 2] = pointColor.b;

      index++;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // יצירת טקסטורת נקודה זוהרת רכה (Canvas procedural circle)
    const particleTexture = createGlowTexture();

    const pMaterial = new THREE.PointsMaterial({
      size: 0.085,
      map: particleTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const particles = new THREE.Points(geometry, pMaterial);
    parentGroup.add(particles);

    // הוספת רשת פנימית דקה של קווים המחברים סינפסות
    const wireGeo = new THREE.IcosahedronGeometry(1.2, 2);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.12
    });
    const innerWire = new THREE.Mesh(wireGeo, wireMat);
    innerWire.scale.set(0.9, 0.9, 1.25);
    parentGroup.add(innerWire);
  }

  /**
   * יצירת טקסטורה מעגלית רכה עם זוהר לנקודות החלקיקים
   */
  function createGlowTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');

    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.3, 'rgba(56, 189, 248, 0.8)');
    grad.addColorStop(0.8, 'rgba(129, 140, 248, 0.2)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);

    return new THREE.CanvasTexture(canvas);
  }

  /**
   * יצירת 4 נקודות העניין (Hotspots) האינטראקטיביות
   */
  function createHotspots(parentGroup) {
    hotspotMeshes.length = 0;

    Object.values(BRAIN_REGIONS).forEach((region) => {
      // כדור מרכזי זוהר
      const sphereGeo = new THREE.SphereGeometry(0.12, 16, 16);
      const sphereMat = new THREE.MeshBasicMaterial({
        color: region.colorNum,
        transparent: true,
        opacity: 0.95
      });
      const mesh = new THREE.Mesh(sphereGeo, sphereMat);
      mesh.position.set(region.position.x, region.position.y, region.position.z);
      mesh.userData = { regionId: region.id, isHotspot: true };

      // טבעת פולס מסביב לנקודה
      const ringGeo = new THREE.RingGeometry(0.16, 0.20, 24);
      const ringMat = new THREE.MeshBasicMaterial({
        color: region.colorNum,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.7
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      mesh.add(ringMesh);
      mesh.userData.ring = ringMesh;

      // כדור פגיעה מוגדל בלתי נראה כדי להקל על לחיצה בעכבר ובמגע
      const hitSphereGeo = new THREE.SphereGeometry(0.28, 8, 8);
      const hitSphereMat = new THREE.MeshBasicMaterial({ visible: false });
      const hitMesh = new THREE.Mesh(hitSphereGeo, hitSphereMat);
      mesh.add(hitMesh);

      parentGroup.add(mesh);
      hotspotMeshes.push(mesh);

      // אם יש מיקום דו-צדדי משני (כמו באמיגדלה ואינסולה)
      if (region.altPosition) {
        const altMesh = mesh.clone();
        altMesh.position.set(region.altPosition.x, region.altPosition.y, region.altPosition.z);
        altMesh.userData = { regionId: region.id, isHotspot: true, isAlt: true };
        parentGroup.add(altMesh);
        hotspotMeshes.push(altMesh);
      }
    });
  }

  /**
   * בחירת אזור והצגת המידע בכרטיסייה
   */
  function selectRegion(regionId, playAudio = true) {
    const region = BRAIN_REGIONS[regionId];
    if (!region) return;

    selectedRegionId = regionId;

    // הפעלת צליל (אם המשתמש ביטל השתקה)
    if (playAudio && soundManager) {
      soundManager.playTone(region.toneFreq);
    }

    // הדגשה ויזואלית של נקודות העניין
    hotspotMeshes.forEach((mesh) => {
      const isSelected = mesh.userData.regionId === regionId;
      if (isSelected) {
        mesh.scale.set(1.4, 1.4, 1.4);
        if (mesh.userData.ring) {
          mesh.userData.ring.material.opacity = 1.0;
        }
      } else {
        mesh.scale.set(1.0, 1.0, 1.0);
        if (mesh.userData.ring) {
          mesh.userData.ring.material.opacity = 0.5;
        }
      }
    });

    // עדכון כפתורי האזורים
    document.querySelectorAll('.brain-region-btn').forEach((btn) => {
      const bId = btn.getAttribute('data-region');
      if (bId === regionId) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // עדכון כרטיס המידע
    if (infoCardEl) {
      infoCardEl.innerHTML = `
        <div class="region-detail-header" style="border-right-color: ${region.colorHex};">
          <div class="region-title-wrap">
            <h3 style="color: ${region.colorHex};">${region.nameHe}</h3>
            <span class="region-sub-en"><bdi>${region.nameEn}</bdi></span>
          </div>
          <span class="region-badge-pill" style="background: rgba(255,255,255,0.08); color: ${region.colorHex}; border: 1px solid ${region.colorHex}55;">
            ${region.badge}
          </span>
        </div>

        <div class="region-detail-body">
          <p class="region-desc-summary">${region.summary}</p>
          
          <div class="region-block">
            <h5>🛒 השפעה על החלטות קנייה:</h5>
            <p>${region.consumerRole}</p>
          </div>

          <div class="region-block">
            <h5>📊 יישום שיווקי ואסטרטגי:</h5>
            <p>${region.marketingImplication}</p>
          </div>

          <div class="region-academic-disclaimer">
            <strong>הערה מתודולוגית:</strong> ${region.academicNote}
          </div>
        </div>
      `;
    }
  }

  /**
   * טיפול בלחיצה על אזור בסצנה התלת-ממדית (Raycasting)
   */
  function onPointerClick(event) {
    if (!renderer || !camera) return;

    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(hotspotMeshes, true);

    if (intersects.length > 0) {
      let hitObj = intersects[0].object;
      while (hitObj && !hitObj.userData.regionId && hitObj.parent) {
        hitObj = hitObj.parent;
      }
      if (hitObj && hitObj.userData.regionId) {
        selectRegion(hitObj.userData.regionId, true);
      }
    }
  }

  /**
   * לולאת האנימציה (Render Loop)
   */
  function animate() {
    animationFrameId = requestAnimationFrame(animate);

    // סיבוב אוטומטי עדין
    if (isRotating && !isPointerDown) {
      targetRotation.y += 0.005;
    }

    // החלקת סיבוב (Inertia Damping)
    currentRotation.x += (targetRotation.x - currentRotation.x) * 0.08;
    currentRotation.y += (targetRotation.y - currentRotation.y) * 0.08;

    if (brainGroup) {
      brainGroup.rotation.x = currentRotation.x;
      brainGroup.rotation.y = currentRotation.y;

      // אנימציית פולס לטבעות הנקודות
      const time = performance.now() * 0.003;
      hotspotMeshes.forEach((mesh) => {
        if (mesh.userData.ring) {
          const scale = 1.0 + 0.15 * Math.sin(time * 2.0);
          mesh.userData.ring.scale.set(scale, scale, scale);
        }
      });
    }

    if (renderer && scene && camera) {
      renderer.render(scene, camera);
    }
  }

  function startAnimation() {
    if (!animationFrameId) {
      animate();
    }
  }

  function stopAnimation() {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
  }

  /**
   * חיבור מאזיני אירועים
   */
  function bindEvents() {
    // אירועי עכבר בגרירה על הקנבס
    const domEl = renderer.domElement;

    domEl.addEventListener('mousedown', (e) => {
      isPointerDown = true;
      pointerStart.x = e.clientX;
      pointerStart.y = e.clientY;
    });

    window.addEventListener('mousemove', (e) => {
      if (!isPointerDown) return;
      const dx = e.clientX - pointerStart.x;
      const dy = e.clientY - pointerStart.y;
      pointerStart.x = e.clientX;
      pointerStart.y = e.clientY;

      targetRotation.y += dx * 0.008;
      targetRotation.x += dy * 0.008;
      // הגבלת זווית אנכית
      targetRotation.x = Math.max(-0.8, Math.min(0.8, targetRotation.x));
    });

    window.addEventListener('mouseup', () => {
      isPointerDown = false;
    });

    // אירועי מגע (Mobile / Touch)
    domEl.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        isPointerDown = true;
        pointerStart.x = e.touches[0].clientX;
        pointerStart.y = e.touches[0].clientY;
      }
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (!isPointerDown || e.touches.length !== 1) return;
      const dx = e.touches[0].clientX - pointerStart.x;
      const dy = e.touches[0].clientY - pointerStart.y;
      pointerStart.x = e.touches[0].clientX;
      pointerStart.y = e.touches[0].clientY;

      targetRotation.y += dx * 0.01;
      targetRotation.x += dy * 0.01;
      targetRotation.x = Math.max(-0.8, Math.min(0.8, targetRotation.x));
    }, { passive: true });

    window.addEventListener('touchend', () => {
      isPointerDown = false;
    });

    // לחיצה על נקודת עניין
    domEl.addEventListener('click', onPointerClick);

    // זום עם גלגלת עכבר
    domEl.addEventListener('wheel', (e) => {
      e.preventDefault();
      camera.position.z += e.deltaY * 0.003;
      camera.position.z = Math.max(3.0, Math.min(7.5, camera.position.z));
    }, { passive: false });

    // כפתור הפעלת / עצירת סיבוב
    if (btnRotate) {
      btnRotate.addEventListener('click', () => {
        isRotating = !isRotating;
        btnRotate.innerHTML = isRotating ? '<span>⏸</span><span>עצור סיבוב</span>' : '<span>▶</span><span>הפעל סיבוב</span>';
      });
    }

    // כפתור איפוס מבט
    if (btnReset) {
      btnReset.addEventListener('click', () => {
        targetRotation.x = 0.15;
        targetRotation.y = -0.4;
        camera.position.set(0, 0, 5.2);
        selectRegion('pfc', true);
      });
    }

    // כפתור השתקת / הפעלת סאונד
    if (btnSound) {
      btnSound.addEventListener('click', () => {
        soundManager.isMuted = !soundManager.isMuted;
        if (!soundManager.isMuted) {
          soundManager.init();
          soundManager.playTone(523.25); // צליל אימות הפעלה
          btnSound.innerHTML = '<span>🔊</span><span>צליל מופעל</span>';
          btnSound.classList.add('sound-active');
        } else {
          btnSound.innerHTML = '<span>🔇</span><span>צליל מושתק</span>';
          btnSound.classList.remove('sound-active');
        }
      });
    }

    // כפתורי בחירת אזורים
    document.querySelectorAll('.brain-region-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const regionId = btn.getAttribute('data-region');
        selectRegion(regionId, true);
      });
    });

    // שינוי גודל חלון רספונסיבי
    window.addEventListener('resize', onWindowResize);

    // האזנה למעבר שקופיות: אם שקופית 8 פעילה - מפעילים רנדור; אחרת - משהים לשמירת ביצועים
    document.addEventListener('slideChanged', (e) => {
      if (e.detail && e.detail.slideNumber === 8) {
        onWindowResize();
        startAnimation();
      } else {
        stopAnimation();
      }
    });
  }

  function onWindowResize() {
    if (!container || !renderer || !camera) return;
    const width = container.clientWidth;
    const height = container.clientHeight;
    if (width === 0 || height === 0) return;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }

  // אתחול כשה-DOM מוכן
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    setTimeout(init, 50);
  }
})();
