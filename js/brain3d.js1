/**
 * המוח הצרכני – הפסיכולוגיה שמאחורי החלטות קנייה
 * מודל מוח תלת-ממדי אנטומי אינטראקטיבי באמצעות Three.js (שקופית 8)
 *
 * מקור המודל התלת-ממדי ורישוי:
 * - Brainder.org ("Brain for Blender" מאת Dr. Anderson M. Winkler, MD, PhD)
 *   https://brainder.org/research/brain-for-blender/
 * - רישיון: Creative Commons Attribution-ShareAlike 3.0 Unported (CC BY-SA 3.0)
 *   https://creativecommons.org/licenses/by-sa/3.0/
 * - מבוסס על שחזור MRI אנושי ב-FreeSurfer (Fischl, 2012), חלוקת קליפת המוח לפי אטלס
 *   Desikan-Killiany (Desikan et al., 2006) וסגמנטציה תת-קורטיקלית ASEG (Fischl et al., 2002).
 */

(function () {
  'use strict';

  if (typeof THREE === 'undefined') {
    console.error('Three.js library is not loaded.');
    showFallback('ספריית Three.js לא אותרה. יש לוודא טעינת js/vendor/three.min.js.');
    return;
  }

  function isWebGLAvailable() {
    try {
      const canvas = document.createElement('canvas');
      return !!(
        window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
      );
    } catch (e) {
      return false;
    }
  }

  if (!isWebGLAvailable()) {
    showFallback('הדפדפן אינו תומך בהאצת חומרה (WebGL) הדרושה להרצת המודל התלת-ממדי.');
    return;
  }

  // גבולות זום הגיוניים ובטוחים
  const DEFAULT_ZOOM_Z = 4.05;
  const MIN_ZOOM_Z = 2.65;
  const MAX_ZOOM_Z = 6.20;
  const ZOOM_STEP = 0.42;

  // זווית התחלתית אנטומית ברורה (מבט תלת-רבעי קדמי-עליון-צידי החושף את שתי ההמיספרות והקמטים)
  const INITIAL_ROT_X = 0.24;
  const INITIAL_ROT_Y = -0.54;
  const MAX_PITCH_RAD = 1.15;

  /**
   * נתוני 4 האזורים / הרשתות המוחיות — מנוסחים לפי ספרות מדעי המוח ונוירו-כלכלה מבוקרת עמיתים.
   * כל אזור מוצג כחלק מרשת מוחית מבוזרת (ולא כ"כפתור קנייה" בודד או כזהות של מערכת 1 / מערכת 2).
   * מבנים עמוקים (אמיגדלה, אינסולה, גרעין האקומבנס) ממוקמים בעומק המוח האנטומי ומוצגים באמצעות שקיפות חתך (Cutaway).
   */
  const BRAIN_REGIONS = {
    pfc: {
      id: 'pfc',
      nameHe: 'הרשת הקדם-מצחית',
      nameEn: 'Prefrontal Network (vmPFC / OFC & dlPFC)',
      colorHex: '#502638',
      highlightHex: '#7A2E4D',
      colorNum: 0x7a2e4d,
      emissiveNum: 0x381222,
      isDeep: false,
      depthBadge: 'קליפת המוח הקדמית (מבט חיצוני)',
      position: { x: 0.572, y: -0.428, z: 1.177 },
      altPosition: { x: -0.535, y: -0.473, z: 1.159 },
      defaultView: { rotX: 0.20, rotY: -0.36 },
      shortExplanation:
        'אזורים קדם-מצחיים אינם פועלים לבדם כ"מערכת 2", אלא משתתפים ברשתות מבוזרות של אינטגרציית ערך סובייקטיבי (vmPFC/OFC) ושל בקרה קוגניטיבית ווויסות קשב (dlPFC) המשקללות תועלת, מחיר ומטרות ארוכות טווח.',
      consumerExample:
        'כאשר צרכן משווה בין בושם יוקרה במחיר 260€ לחלופה זולה יותר, הרשת הקדם-מצחית משלבת בין אותות החשק והרגש לבין אילוצי התקציב וההצדקה הצרכנית.',
      anatomicalLocation:
        'ממוקמת בחלק הקדמי של האונות המצחיות בשתי ההמיספרות: האזור הגחוני-אמצעי והארובותי (vmPFC / mOFC) בבסיס האונה המצחית, והאזור הגבי-צידי (dlPFC) על הקמטים המצחיים החיצוניים.',
      scientificDetail:
        'מחקרי הדמיה תפקודית (fMRI) מראים כי ה-vmPFC מקודד "מטבע משותף" של ערך סובייקטיבי משוקלל על בסיס קלט מאזורי תגמול, זיכרון ורגש, בעוד ה-dlPFC תומך בשליטה עצמית ועיכוב תגובה. מערכות 1 ו-2 של כהנמן הן מודל קוגניטיבי-התנהגותי של דפוסי חשיבה ואינן ממופות למבנה אנטומי בודד.',
      sources: [
        'Bartra, O., McGuire, J. T., & Kable, J. W. (2013). The valuation system: A coordinate-based meta-analysis of BOLD fMRI experiments examining neural correlates of subjective value. NeuroImage, 76, 412–427.',
        'Hare, T. A., Camerer, C. F., & Rangel, A. (2009). Self-control in decision-making involves modulation of the vmPFC valuation system. Science, 324(5927), 646–648.',
        'Miller, E. K., & Cohen, J. D. (2001). An integrative theory of prefrontal cortex function. Annual Review of Neuroscience, 24, 167–202.'
      ]
    },
    amygdala: {
      id: 'amygdala',
      nameHe: 'האמיגדלה (רשת הבולטות הרגשית)',
      nameEn: 'Amygdala (Salience & Affective Network)',
      colorHex: '#D85B49',
      highlightHex: '#E0533C',
      colorNum: 0xd85b49,
      emissiveNum: 0x5c1f16,
      isDeep: true,
      depthBadge: 'מבנה תת-קורטיקלי עמוק (מוצג בשקיפות חתך)',
      position: { x: 0.530, y: -0.690, z: 0.114 },
      altPosition: { x: -0.557, y: -0.662, z: 0.104 },
      defaultView: { rotX: 0.22, rotY: -0.58 },
      shortExplanation:
        'האמיגדלה אינה "כפתור פחד" מבודד, אלא צומת מרכזי ברשת הבולטות (Salience Network) המזהה במהירות גירויים בעלי חשיבות רגשית — חיובית או שלילית — ומווסת קשב ועוררות בשיתוף עם קליפת המוח הקדם-מצחית והאינסולה.',
      consumerExample:
        'התראה על מלאי אוזל ("נותרו 2 יחידות בלבד") או מסגור של הפסד פוטנציאלי מעוררים קשב רגשי מוגבר ברשת הבולטות, המגביר את תחושת הדחיפות לפני הערכה אנליטית מלאה.',
      anatomicalLocation:
        'מבנה תת-קורטיקלי עמוק בצורת שקד הממוקם בעומק האונה הרקתית התיכונה (Medial Temporal Lobe), קדמית להיפוקמפוס — ולכן אינו נמצא על פני קליפת המוח החיצונית ומוצג כאן דרך שקיפות ההמיספרות.',
      scientificDetail:
        'האמיגדלה מקיימת קשרים דו-כיווניים הדוקים עם ה-vmPFC, האינסולה והסטריאטום. בנוירו-כלכלה נמצא כי היא תורמת לאפקט המסגור (Framing Effect) ולזיהוי רלוונטיות רגשית של גירויים, אך ההחלטה הסופית מתגבשת מתוך האינטראקציה הרשתית עם אזורי הבקרה והערך הקורטיקליים.',
      sources: [
        'Phelps, E. A. (2006). Emotion and cognition: Insights from studies of the human amygdala. Annual Review of Psychology, 57, 27–53.',
        'De Martino, B., Kumaran, D., Seymour, B., & Dolan, R. J. (2006). Frames, biases, and rational decision-making in the human brain. Science, 313(5787), 684–687.',
        'Janak, P. H., & Tye, K. M. (2015). From circuits to behaviour in the amygdala. Nature, 517(7534), 284–292.'
      ]
    },
    insula: {
      id: 'insula',
      nameHe: 'קליפת האינסולה (אינטרוספציה ועלות)',
      nameEn: 'Insular Cortex (Interoception & Salience Network)',
      colorHex: '#B85A2B',
      highlightHex: '#CC6835',
      colorNum: 0xcc6835,
      emissiveNum: 0x4f240d,
      isDeep: true,
      depthBadge: 'קליפה פנימית קבורה במעמקי החריץ הצידי (שקיפות חתך)',
      position: { x: 0.827, y: -0.395, z: 0.402 },
      altPosition: { x: -0.836, y: -0.323, z: 0.341 },
      defaultView: { rotX: 0.16, rotY: -0.78 },
      shortExplanation:
        'האינסולה משלבת אותות גופניים פנימיים (אינטרוספציה) עם הערכה רגשית של אי-ודאות, סיכון וחוסר הוגנות, ומהווה צומת מרכזי ברשת הבולטות המאזנת מול אותות התגמול.',
      consumerExample:
        'חשיפה למחיר שנתפס כמופקע או לדמי משלוח מפתיעים בקופה מעוררת תגובת דחייה רגשית המכונה בנוירו-כלכלה "כאב התשלום" (Pain of Paying), שעשויה לבלום את הרכישה.',
      anatomicalLocation:
        'קליפת מוח "איית" (Insular Cortex) הקבורה עמוק בתוך החריץ הצידי (Lateral / Sylvian Sulcus) ומוסתרת מבחוץ על ידי קפלי האונות המצחית, הקודקודית והרקתית (Opercula) — לכן היא נחשפת במודל באמצעות שקיפות קליפת המוח.',
      scientificDetail:
        'מחקרי קנייה ב-fMRI (כגון Knutson et al., 2007) הראו כי פעילות מוגברת באינסולה הקדמית בזמן הצגת המחיר מנבאת ויתור על קנייה, כחלק משקלול רשתי מול ה-NAcc וה-vmPFC. עם זאת, האינסולה מופעלת במגוון רחב של מצבי עוררות גופנית ובולטות, ואינה אזור ייעודי לתמחור בלבד.',
      sources: [
        'Knutson, B., Rick, S., Wimmer, G. E., Prelec, D., & Loewenstein, G. (2007). Neural predictors of purchases. Neuron, 53(1), 147–156.',
        'Craig, A. D. (2009). How do you feel—now? The anterior insula and human awareness. Nature Reviews Neuroscience, 10(1), 59–70.',
        'Prelec, D., & Loewenstein, G. (1998). The red and the black: Mental accounting of savings and debt. Marketing Science, 17(1), 4–28.'
      ]
    },
    nacc: {
      id: 'nacc',
      nameHe: 'גרעין האקומבנס (הסטריאטום הגחוני)',
      nameEn: 'Nucleus Accumbens (NAcc / Ventral Striatum)',
      colorHex: '#9E3B66',
      highlightHex: '#B84376',
      colorNum: 0xb84376,
      emissiveNum: 0x451229,
      isDeep: true,
      depthBadge: 'גרעין תת-קורטיקלי עמוק (מוצג בשקיפות חתך)',
      position: { x: 0.198, y: -0.487, z: 0.486 },
      altPosition: { x: -0.207, y: -0.453, z: 0.470 },
      defaultView: { rotX: 0.20, rotY: -0.28 },
      shortExplanation:
        'גרעין האקומבנס הוא צומת מרכזי במסלול המזולימבי הדופמינרגי המקודד ציפייה לתגמול, טעות חיזוי תגמול (Reward Prediction Error) ובולטות תמריצית ("רצייה" / Wanting) — אך אינו פועל כ"כפתור קנייה" עצמאי.',
      consumerExample:
        'חשיפה לאריזת בושם יוקרתית או להצעה מפתיעה לטובה מעוררת ציפייה לתגמול בסטריאטום הגחוני, המועברת להערכה משוקללת ברשת הקדם-מצחית בטרם קבלת החלטה.',
      anatomicalLocation:
        'ממוקם עמוק בסטריאטום הגחוני (Ventral Striatum) בבסיס המוח הקדמי, סמוך לקו האמצע משני צידי המחיצה הבין-חדרית — עמוק מתחת לקליפת המוח החיצונית.',
      scientificDetail:
        'מחקרי נוירו-מדעי ההחלטה מבחינים בין "רצייה" תמריצית (Incentive Salience / Wanting) המתווכת על ידי מערכות דופמינרגיות בסטריאטום הגחוני, לבין "הנאה" חושית בפועל (Liking) ולהערכת כדאיות ב-vmPFC. פעילות ב-NAcc משקפת ציפייה לתועלת חיובית כחלק מרשת הערך המוחית.',
      sources: [
        'Knutson, B., Adams, C. M., Fong, G. W., & Hommer, D. (2001). Anticipation of increasing monetary reward selectively recruits nucleus accumbens. Journal of Neuroscience, 21(16), RC159.',
        'Berridge, K. C., & Robinson, T. E. (2016). Liking, wanting, and the incentive-sensitization theory of addiction. American Psychologist, 71(8), 670–679.',
        'Schultz, W., Dayan, P., & Montague, P. R. (1997). A neural substrate of prediction and reward. Science, 275(5306), 1593–1599.'
      ]
    }
  };

  // משתני Three.js ומצב הסצנה
  let scene, camera, renderer, orbitPitchGroup, brainGroup;
  let lhMesh = null;
  let rhMesh = null;
  const regionMeshes = {};
  const hotspotMeshes = [];
  const interactiveMeshes = [];
  const pathwayPulses = [];
  let animationFrameId = null;
  let isRotating = true;
  let isCutawayMode = false;
  let manualCutawayOverride = null;
  let isPointerDown = false;
  let isPinching = false;
  let pinchStartDist = 0;
  let pinchStartZoomZ = DEFAULT_ZOOM_Z;
  let pointerMovedDistance = 0;
  let pointerStart = { x: 0, y: 0 };
  let currentRotation = { x: INITIAL_ROT_X, y: INITIAL_ROT_Y };
  let targetRotation = { x: INITIAL_ROT_X, y: INITIAL_ROT_Y };
  let currentZoomZ = DEFAULT_ZOOM_Z;
  let targetZoomZ = DEFAULT_ZOOM_Z;
  let selectedRegionId = 'pfc';
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  // אלמנטי DOM
  let container,
    infoCardEl,
    btnRotate,
    btnCutaway,
    btnReset,
    btnZoomIn,
    btnZoomOut,
    zoomReadoutEl,
    viewModeBadgeEl,
    fallbackEl;

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
   * טעינת גיבוי אוטומטית של נתוני המודל האנטומי אם הקובץ לא נטען מראש ב-HTML
   */
  function ensureAnatomyDataLoaded(callback) {
    if (window.BRAIN_ANATOMY_DATA && window.BRAIN_ANATOMY_DATA.hemispheres) {
      callback();
      return;
    }
    if (typeof document !== 'undefined' && document.createElement) {
      const script = document.createElement('script');
      script.src = 'js/vendor/brain_mesh_data.js?v=20261030_s8_v2';
      script.onload = () => callback();
      script.onerror = () => {
        if (typeof fetch === 'function') {
          fetch('assets/models/brain_fsaverage_dk.json')
            .then((r) => r.json())
            .then((data) => {
              window.BRAIN_ANATOMY_DATA = data;
              callback();
            })
            .catch((err) => showFallback('שגיאה בטעינת מודל המוח התלת-ממדי: ' + err.message));
        } else {
          showFallback('נתוני המודל האנטומי (js/vendor/brain_mesh_data.js) לא נטענו.');
        }
      };
      if (document.head) {
        document.head.appendChild(script);
      } else {
        callback();
      }
    } else {
      callback();
    }
  }

  /**
   * בניית BufferGeometry מנתוני ה-Mesh המכווצים (Brainder / FreeSurfer CC BY-SA 3.0)
   */
  function buildBufferGeometryFromData(meshData, colorMode) {
    const posQuant = meshData.positions;
    const sulcQuant = meshData.sulc;
    const indices = meshData.indices;
    const vCount = meshData.vertexCount;

    const positions = new Float32Array(vCount * 3);
    const colors = new Float32Array(vCount * 3);

    for (let i = 0; i < vCount; i++) {
      const i3 = i * 3;
      positions[i3] = posQuant[i3] / 1000.0;
      positions[i3 + 1] = posQuant[i3 + 1] / 1000.0;
      positions[i3 + 2] = posQuant[i3 + 2] / 1000.0;

      // חישוב צבע אנטומי עם ניגודיות תלת-ממדית ברורה בין חריצים (Sulci) לקמטים (Gyri)
      const s = sulcQuant ? sulcQuant[i] / 100.0 : 0;
      if (colorMode === 'cortex') {
        const t = Math.max(0, Math.min(1, (s + 0.65) / 1.30));
        const smoothT = t * t * (3 - 2 * t); // Smoothstep להדגשת עומק החריצים הקורטיקליים
        // בחריצים העמוקים (Sulci): גוון בורגונדי-רוז מוצל; בראשי הקמטים (Gyri): שנהב-סומק אנטומי חם
        colors[i3] = 0.38 + 0.50 * smoothT;     // R: 0.38 -> 0.88
        colors[i3 + 1] = 0.23 + 0.53 * smoothT; // G: 0.23 -> 0.76
        colors[i3 + 2] = 0.27 + 0.46 * smoothT; // B: 0.27 -> 0.73
      } else {
        const t = Math.max(0, Math.min(1, (s + 0.65) / 1.30));
        const smoothT = t * t * (3 - 2 * t);
        const shade = 0.46 + 0.54 * smoothT;
        colors[i3] = shade;
        colors[i3 + 1] = shade;
        colors[i3 + 2] = shade;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    if (typeof geometry.setIndex === 'function') {
      geometry.setIndex(indices);
    }
    if (typeof geometry.computeVertexNormals === 'function') {
      geometry.computeVertexNormals();
    }
    return geometry;
  }

  function createLitMaterial(opts) {
    const MaterialCtor =
      THREE.MeshPhongMaterial || THREE.MeshLambertMaterial || THREE.MeshBasicMaterial;
    return new MaterialCtor(opts);
  }

  /**
   * אתחול הסצנה התלת-ממדית
   */
  function init() {
    container = document.getElementById('brain3d-canvas-container');
    infoCardEl = document.getElementById('brainRegionCard');
    btnRotate = document.getElementById('btnToggleRotate');
    btnCutaway = document.getElementById('btnToggleCutaway');
    btnReset = document.getElementById('btnResetView');
    btnZoomIn = document.getElementById('btnZoomIn');
    btnZoomOut = document.getElementById('btnZoomOut');
    zoomReadoutEl = document.getElementById('brainZoomReadout');
    viewModeBadgeEl = document.getElementById('brainViewModeBadge');

    if (!container) return;

    ensureAnatomyDataLoaded(() => {
      try {
        scene = new THREE.Scene();

        const initWidth = container.clientWidth || 760;
        const initHeight = container.clientHeight || 430;
        const aspect = initWidth / initHeight;
        camera = new THREE.PerspectiveCamera(38, aspect, 0.1, 100);
        camera.position.set(0, 0.08, DEFAULT_ZOOM_Z);

        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
        renderer.setSize(initWidth, initHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.setClearColor(0x000000, 0);
        container.appendChild(renderer.domElement);

        // מערך תאורה תלת-ממדית מכויל להדגשת נפח הקמטים והחריצים הקורטיקליים (ללא רוויית יתר לבנה)
        const ambientLight = new THREE.AmbientLight(0xf3e4dc, 0.26);
        scene.add(ambientLight);

        if (THREE.HemisphereLight) {
          const hemiLight = new THREE.HemisphereLight(0xfff5ed, 0x3d1a28, 0.26);
          hemiLight.position.set(0, 7, 0);
          scene.add(hemiLight);
        }

        const DirLightCtor = THREE.DirectionalLight || THREE.PointLight;
        const keyLight = new DirLightCtor(0xfff6ee, 0.50);
        keyLight.position.set(4.8, 6.2, 5.8);
        scene.add(keyLight);

        const fillLight = new DirLightCtor(0xe8cdd6, 0.20);
        fillLight.position.set(-5.5, 1.8, 3.8);
        scene.add(fillLight);

        const rimLight = new DirLightCtor(0xd85b49, 0.16);
        rimLight.position.set(0.5, -4.5, -5.5);
        scene.add(rimLight);

        // קבוצת הטיה אנכית (Pitch) העוטפת את קבוצת הסיבוב האופקי (Yaw) לגרירה אינטואיטיבית לכל כיוון
        orbitPitchGroup = new THREE.Group();
        orbitPitchGroup.name = 'orbit_pitch_group';
        scene.add(orbitPitchGroup);

        brainGroup = new THREE.Group();
        brainGroup.name = 'brain_yaw_group';
        orbitPitchGroup.add(brainGroup);

        createBrainGeometry(brainGroup);
        createNetworkPathways(brainGroup);
        createHotspots(brainGroup);
        bindEvents();
        updateZoomUI();

        // בחירת אזור ברירת מחדל (הרשת הקדם-מצחית) ללא הפעלת צליל כלשהו
        selectRegion('pfc', false);

        startAnimation();
      } catch (err) {
        console.error('Failed to initialize Three.js brain scene:', err);
        showFallback('אירעה שגיאה באתחול המנוע הגרפי: ' + err.message);
      }
    });
  }

  /**
   * בניית ההמיספרות הקורטיקליות ו-4 האזורים האנטומיים מתוך נתוני FreeSurfer / Brainder
   */
  function createBrainGeometry(parentGroup) {
    const anatomy = window.BRAIN_ANATOMY_DATA;
    if (!anatomy || !anatomy.hemispheres || !anatomy.regions) {
      throw new Error(
        'נתוני המודל האנטומי (js/vendor/brain_mesh_data.js) לא נטענו.'
      );
    }

    const lhGeo = buildBufferGeometryFromData(anatomy.hemispheres.lh, 'cortex');
    const rhGeo = buildBufferGeometryFromData(anatomy.hemispheres.rh, 'cortex');

    const lhMat = createLitMaterial({
      vertexColors: true,
      transparent: false,
      opacity: 1.0,
      shininess: 34,
      specular: 0x3d2830
    });
    const rhMat = createLitMaterial({
      vertexColors: true,
      transparent: false,
      opacity: 1.0,
      shininess: 34,
      specular: 0x3d2830
    });

    lhMesh = new THREE.Mesh(lhGeo, lhMat);
    rhMesh = new THREE.Mesh(rhGeo, rhMat);
    lhMesh.name = 'left_cerebral_hemisphere';
    rhMesh.name = 'right_cerebral_hemisphere';

    parentGroup.add(lhMesh);
    parentGroup.add(rhMesh);

    Object.keys(BRAIN_REGIONS).forEach((regionId) => {
      const regionCfg = BRAIN_REGIONS[regionId];
      const regionMeshData = anatomy.regions[regionId];
      if (!regionMeshData) return;

      if (regionMeshData.rightCentroid) {
        regionCfg.position = {
          x: regionMeshData.rightCentroid[0],
          y: regionMeshData.rightCentroid[1],
          z: regionMeshData.rightCentroid[2]
        };
      }
      if (regionMeshData.leftCentroid) {
        regionCfg.altPosition = {
          x: regionMeshData.leftCentroid[0],
          y: regionMeshData.leftCentroid[1],
          z: regionMeshData.leftCentroid[2]
        };
      }

      const regGeo = buildBufferGeometryFromData(regionMeshData, 'region');
      const regMat = createLitMaterial({
        color: regionCfg.colorNum,
        emissive: regionCfg.emissiveNum,
        vertexColors: true,
        transparent: true,
        opacity: 0.9,
        shininess: 42,
        specular: 0x664450,
        polygonOffset: true,
        polygonOffsetFactor: -1,
        polygonOffsetUnits: -1
      });

      const regMesh = new THREE.Mesh(regGeo, regMat);
      regMesh.name = `region_mesh_${regionId}`;
      regMesh.userData = { regionId: regionId, isRegionMesh: true };

      parentGroup.add(regMesh);
      regionMeshes[regionId] = regMesh;
      interactiveMeshes.push(regMesh);
    });
  }

  /**
   * יצירת מסלולים עצביים תלת-ממדיים ופולסים נעים בין צומתי הרשת (להמחשת רשתות מבוזרות ועומק תלת-ממדי)
   */
  function createNetworkPathways(parentGroup) {
    pathwayPulses.length = 0;
    if (!THREE.CatmullRomCurve3 || !THREE.TubeGeometry) return;

    const pairs = [
      // מסלול מזולימבי-קורטיקלי: NAcc <-> vmPFC (ימין ושמאל)
      {
        from: BRAIN_REGIONS.nacc.position,
        to: BRAIN_REGIONS.pfc.position,
        midOffset: { x: 0.12, y: 0.15, z: 0.08 },
        color: 0x9e3b66
      },
      {
        from: BRAIN_REGIONS.nacc.altPosition,
        to: BRAIN_REGIONS.pfc.altPosition,
        midOffset: { x: -0.12, y: 0.15, z: 0.08 },
        color: 0x9e3b66
      },
      // מסלול בולטות רגשית: Amygdala <-> vmPFC
      {
        from: BRAIN_REGIONS.amygdala.position,
        to: BRAIN_REGIONS.pfc.position,
        midOffset: { x: 0.16, y: 0.10, z: 0.05 },
        color: 0xd85b49
      },
      {
        from: BRAIN_REGIONS.amygdala.altPosition,
        to: BRAIN_REGIONS.pfc.altPosition,
        midOffset: { x: -0.16, y: 0.10, z: 0.05 },
        color: 0xd85b49
      },
      // מסלול אינטרוספציה ובולטות: Insula <-> PFC
      {
        from: BRAIN_REGIONS.insula.position,
        to: BRAIN_REGIONS.pfc.position,
        midOffset: { x: 0.18, y: 0.18, z: 0.05 },
        color: 0xcc6835
      },
      {
        from: BRAIN_REGIONS.insula.altPosition,
        to: BRAIN_REGIONS.pfc.altPosition,
        midOffset: { x: -0.18, y: 0.18, z: 0.05 },
        color: 0xcc6835
      }
    ];

    pairs.forEach((pair, idx) => {
      const p0 = new THREE.Vector3(pair.from.x, pair.from.y, pair.from.z);
      const p2 = new THREE.Vector3(pair.to.x, pair.to.y, pair.to.z);
      const p1 = new THREE.Vector3(
        (p0.x + p2.x) * 0.5 + pair.midOffset.x,
        (p0.y + p2.y) * 0.5 + pair.midOffset.y,
        (p0.z + p2.z) * 0.5 + pair.midOffset.z
      );

      const curve = new THREE.CatmullRomCurve3([p0, p1, p2]);
      const tubeGeo = new THREE.TubeGeometry(curve, 20, 0.014, 8, false);
      const tubeMat = new THREE.MeshBasicMaterial({
        color: pair.color,
        transparent: true,
        opacity: 0.42,
        depthWrite: false
      });
      const tubeMesh = new THREE.Mesh(tubeGeo, tubeMat);
      tubeMesh.name = `pathway_tube_${idx}`;
      tubeMesh.renderOrder = 3;
      parentGroup.add(tubeMesh);

      // כדור פולס נע לאורך המסלול התלת-ממדי
      const pulseGeo = new THREE.SphereGeometry(0.036, 10, 10);
      const pulseMat = new THREE.MeshBasicMaterial({
        color: 0xfff5eb,
        transparent: true,
        opacity: 0.92,
        depthTest: false
      });
      const pulseMesh = new THREE.Mesh(pulseGeo, pulseMat);
      pulseMesh.name = `pathway_pulse_${idx}`;
      pulseMesh.renderOrder = 8;
      parentGroup.add(pulseMesh);

      pathwayPulses.push({
        curve,
        mesh: pulseMesh,
        tube: tubeMesh,
        phase: (idx * 0.19) % 1.0,
        speed: 0.0045 + (idx % 3) * 0.0008
      });
    });
  }

  /**
   * יצירת סמני מיקום אנטומיים דו-צדדיים (Hotspots) ללחיצה קלה בעכבר ובמגע
   */
  function createHotspots(parentGroup) {
    hotspotMeshes.length = 0;

    Object.values(BRAIN_REGIONS).forEach((region) => {
      const sphereGeo = new THREE.SphereGeometry(0.088, 16, 16);
      const sphereMat = new THREE.MeshBasicMaterial({
        color: region.colorNum,
        transparent: true,
        opacity: 0.96,
        depthTest: false
      });
      const mesh = new THREE.Mesh(sphereGeo, sphereMat);
      mesh.position.set(region.position.x, region.position.y, region.position.z);
      mesh.renderOrder = 10;
      mesh.userData = { regionId: region.id, isHotspot: true };

      const ringGeo = new THREE.RingGeometry(0.12, 0.16, 24);
      const ringMat = new THREE.MeshBasicMaterial({
        color: region.colorNum,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.8,
        depthTest: false
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      mesh.add(ringMesh);
      mesh.userData.ring = ringMesh;

      const hitSphereGeo = new THREE.SphereGeometry(0.26, 8, 8);
      const hitSphereMat = new THREE.MeshBasicMaterial({ visible: false });
      const hitMesh = new THREE.Mesh(hitSphereGeo, hitSphereMat);
      mesh.add(hitMesh);

      parentGroup.add(mesh);
      hotspotMeshes.push(mesh);
      interactiveMeshes.push(mesh);

      if (region.altPosition) {
        const altMesh = mesh.clone();
        altMesh.position.set(
          region.altPosition.x,
          region.altPosition.y,
          region.altPosition.z
        );
        altMesh.userData = {
          regionId: region.id,
          isHotspot: true,
          isAlt: true,
          ring: altMesh.children[0]
        };
        parentGroup.add(altMesh);
        hotspotMeshes.push(altMesh);
        interactiveMeshes.push(altMesh);
      }
    });
  }

  /**
   * עדכון מצב הסיבוב האוטומטי והכפתור הגלוי
   */
  function setAutoRotate(enabled) {
    isRotating = !!enabled;
    if (btnRotate) {
      btnRotate.setAttribute('aria-pressed', isRotating ? 'true' : 'false');
      btnRotate.classList.toggle('active-mode', isRotating);
      btnRotate.innerHTML = isRotating
        ? '<span>⏸</span><span>עצור סיבוב</span>'
        : '<span>▶</span><span>הפעל סיבוב</span>';
    }
  }

  /**
   * שינוי זום בגבולות בטוחים ועדכון החיווי בממשק
   */
  function setTargetZoom(newZoomZ) {
    targetZoomZ = Math.max(MIN_ZOOM_Z, Math.min(MAX_ZOOM_Z, newZoomZ));
    updateZoomUI();
  }

  function updateZoomUI() {
    const pct = Math.round((DEFAULT_ZOOM_Z / targetZoomZ) * 100);
    if (zoomReadoutEl) {
      zoomReadoutEl.textContent = `${pct}%`;
    }
    if (btnZoomIn) {
      btnZoomIn.disabled = targetZoomZ <= MIN_ZOOM_Z + 0.05;
    }
    if (btnZoomOut) {
      btnZoomOut.disabled = targetZoomZ >= MAX_ZOOM_Z - 0.05;
    }
  }

  /**
   * עדכון שקיפות קליפת המוח (Cutaway / Cortical Transparency) לחשיפת מבנים עמוקים
   */
  function applyCutawayVisibility(enableCutaway) {
    isCutawayMode = !!enableCutaway;

    const cortexOpacity = isCutawayMode ? 0.22 : 0.96;
    const cortexDepthWrite = !isCutawayMode;

    [lhMesh, rhMesh].forEach((hemiMesh) => {
      if (hemiMesh && hemiMesh.material) {
        hemiMesh.material.transparent = true;
        hemiMesh.material.opacity = cortexOpacity;
        hemiMesh.material.depthWrite = cortexDepthWrite;
        hemiMesh.material.needsUpdate = true;
      }
    });

    if (btnCutaway) {
      btnCutaway.setAttribute('aria-pressed', isCutawayMode ? 'true' : 'false');
      btnCutaway.classList.toggle('active-mode', isCutawayMode);
      btnCutaway.innerHTML = isCutawayMode
        ? '<span>🔍</span><span>מבט חתך שקוף: פעיל</span>'
        : '<span>🧠</span><span>מבט עומק (שקיפות חתך)</span>';
    }

    if (viewModeBadgeEl) {
      viewModeBadgeEl.textContent = isCutawayMode
        ? 'מבט חתך שקוף פעיל: קליפת המוח שקופה לחשיפת האמיגדלה, האינסולה וגרעין האקומבנס בעומק המוח'
        : 'מבט אנטומי חיצוני: קליפת המוח המלאה (Desikan-Killiany Atlas) — לחצו על מבנה עמוק או על "מבט עומק" לשקיפות';
      viewModeBadgeEl.classList.toggle('cutaway-active', isCutawayMode);
    }
  }

  /**
   * בחירת אזור, עדכון הדגשת ה-Mesh התלת-ממדי, הפעלת שקיפות חתך לאזורים עמוקים והצגת הכרטיסייה
   */
  function selectRegion(regionId, focusCamera = true) {
    const region = BRAIN_REGIONS[regionId];
    if (!region) return;

    selectedRegionId = regionId;

    const shouldUseCutaway =
      manualCutawayOverride !== null ? manualCutawayOverride : region.isDeep;
    applyCutawayVisibility(shouldUseCutaway);

    if (focusCamera && region.defaultView) {
      targetRotation.x = region.defaultView.rotX;
      targetRotation.y = region.defaultView.rotY;
    }

    Object.keys(regionMeshes).forEach((id) => {
      const rMesh = regionMeshes[id];
      const rCfg = BRAIN_REGIONS[id];
      if (!rMesh || !rMesh.material) return;

      if (id === regionId) {
        rMesh.material.opacity = 0.98;
        rMesh.material.emissive = new THREE.Color(rCfg.emissiveNum);
        if (typeof rMesh.material.emissiveIntensity === 'number') {
          rMesh.material.emissiveIntensity = 0.22;
        }
        rMesh.renderOrder = 6;
      } else {
        rMesh.material.opacity = isCutawayMode ? 0.38 : 0.22;
        rMesh.material.emissive = new THREE.Color(rCfg.emissiveNum);
        if (typeof rMesh.material.emissiveIntensity === 'number') {
          rMesh.material.emissiveIntensity = 0.06;
        }
        rMesh.renderOrder = 2;
      }
      rMesh.material.needsUpdate = true;
    });

    hotspotMeshes.forEach((mesh) => {
      const isSelected = mesh.userData.regionId === regionId;
      if (isSelected) {
        mesh.scale.set(1.36, 1.36, 1.36);
        mesh.material.opacity = 1.0;
        if (mesh.userData.ring) {
          mesh.userData.ring.material.opacity = 0.95;
        }
      } else {
        mesh.scale.set(0.88, 0.88, 0.88);
        mesh.material.opacity = 0.55;
        if (mesh.userData.ring) {
          mesh.userData.ring.material.opacity = 0.35;
        }
      }
    });

    document.querySelectorAll('.brain-region-btn').forEach((btn) => {
      const bId = btn.getAttribute('data-region');
      const isActive = bId === regionId;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });

    if (infoCardEl) {
      const sourcesHtml = region.sources
        .map((src) => `<li><bdi>${src}</bdi></li>`)
        .join('');

      infoCardEl.innerHTML = `
        <div class="region-detail-header" style="border-right-color: ${region.colorHex};">
          <div class="region-title-wrap">
            <h3>${region.nameHe}</h3>
            <span class="region-sub-en"><bdi>${region.nameEn}</bdi></span>
          </div>
          <span class="region-badge-pill">${region.depthBadge}</span>
        </div>

        <div class="region-detail-body">
          <div class="region-block">
            <h5>תרומה לרשת המוחית המבוזרת</h5>
            <p class="region-desc-summary">${region.shortExplanation}</p>
          </div>

          <div class="region-block consumer-example-block">
            <h5>דוגמה בהחלטת קנייה</h5>
            <p>${region.consumerExample}</p>
          </div>

          <details class="editorial-theory-drawer brain-sci-drawer">
            <summary class="editorial-theory-summary">
              <span>פירוט מדעי, מיקום אנטומי ומקורות</span>
            </summary>
            <div class="editorial-theory-content">
              <div class="psych-concept-box">
                <strong>מיקום אנטומי ואופן הצגה במודל:</strong>
                <p>${region.anatomicalLocation}</p>
              </div>
              <div class="psych-concept-box warning">
                <strong>הקשר מחקרי ורשתי (ללא "כפתור קנייה" בודד):</strong>
                <p>${region.scientificDetail}</p>
              </div>
              <div class="psych-concept-box">
                <strong>מקורות מדעיים (Peer-Reviewed):</strong>
                <ul class="brain-sci-sources-list">${sourcesHtml}</ul>
              </div>
            </div>
          </details>
        </div>
      `;
    }

    if (renderer && scene && camera) {
      renderer.render(scene, camera);
    }
  }

  /**
   * טיפול בלחיצה על אזור בסצנה התלת-ממדית (Raycasting על סיכות ועל ה-Mesh האנטומי)
   */
  function onPointerClick(event) {
    if (!renderer || !camera || pointerMovedDistance > 7) return;

    const rect = renderer.domElement.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(interactiveMeshes, true);

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

  function animate() {
    animationFrameId = requestAnimationFrame(animate);

    if (isRotating && !isPointerDown && !isPinching) {
      targetRotation.y += 0.0042;
    }

    currentRotation.x += (targetRotation.x - currentRotation.x) * 0.12;
    currentRotation.y += (targetRotation.y - currentRotation.y) * 0.12;
    currentZoomZ += (targetZoomZ - currentZoomZ) * 0.14;

    if (camera) {
      camera.position.z = currentZoomZ;
    }

    if (orbitPitchGroup) {
      orbitPitchGroup.rotation.x = currentRotation.x;
    }
    if (brainGroup) {
      brainGroup.rotation.x = currentRotation.x;
      brainGroup.rotation.y = currentRotation.y;

      const time = performance.now() * 0.003;
      hotspotMeshes.forEach((mesh) => {
        if (mesh.userData.ring && camera) {
          const scale = 1.0 + 0.14 * Math.sin(time * 2.1);
          mesh.userData.ring.scale.set(scale, scale, scale);
          if (typeof mesh.userData.ring.lookAt === 'function') {
            mesh.userData.ring.lookAt(camera.position);
          }
        }
      });

      // עדכון תנועת פולסים עצביים תלת-ממדיים לאורך מסלולי הרשת
      pathwayPulses.forEach((p) => {
        p.phase = (p.phase + p.speed) % 1.0;
        const pos = p.curve.getPointAt(p.phase);
        if (pos && p.mesh) {
          p.mesh.position.set(pos.x, pos.y, pos.z);
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

  function bindEvents() {
    const domEl = renderer.domElement;

    const handleDragStart = (clientX, clientY, event) => {
      if (event && typeof event.preventDefault === 'function') {
        event.preventDefault();
      }
      isPointerDown = true;
      pointerMovedDistance = 0;
      pointerStart.x = clientX;
      pointerStart.y = clientY;
      if (container && container.classList) {
        container.classList.add('is-dragging');
      }
    };

    const handleDragMove = (clientX, clientY) => {
      if (!isPointerDown || isPinching) return;
      const dx = clientX - pointerStart.x;
      const dy = clientY - pointerStart.y;
      const stepDist = Math.abs(dx) + Math.abs(dy);
      pointerMovedDistance += stepDist;
      pointerStart.x = clientX;
      pointerStart.y = clientY;

      // אם המשתמש גורר בפועל, עוצרים סיבוב אוטומטי כדי לאפשר בחינה חופשית של הזווית הנבחרת
      if (pointerMovedDistance > 5 && isRotating) {
        setAutoRotate(false);
      }

      targetRotation.y += dx * 0.0095;
      targetRotation.x += dy * 0.0095;
      targetRotation.x = Math.max(-MAX_PITCH_RAD, Math.min(MAX_PITCH_RAD, targetRotation.x));
    };

    const handleDragEnd = () => {
      isPointerDown = false;
      isPinching = false;
      if (container && container.classList) {
        container.classList.remove('is-dragging');
      }
    };

    // אירועי עכבר (Mouse Drag)
    domEl.addEventListener('mousedown', (e) => {
      handleDragStart(e.clientX, e.clientY, e);
    });

    window.addEventListener('mousemove', (e) => {
      handleDragMove(e.clientX, e.clientY);
    });

    window.addEventListener('mouseup', () => {
      handleDragEnd();
    });

    // אירועי מגע לטלפונים וטאבלטים (1-Finger Drag + 2-Finger Pinch Zoom)
    domEl.addEventListener(
      'touchstart',
      (e) => {
        if (e.touches.length === 1) {
          isPinching = false;
          handleDragStart(e.touches[0].clientX, e.touches[0].clientY, e);
        } else if (e.touches.length === 2) {
          if (typeof e.preventDefault === 'function') e.preventDefault();
          isPointerDown = false;
          isPinching = true;
          const dx = e.touches[0].clientX - e.touches[1].clientX;
          const dy = e.touches[0].clientY - e.touches[1].clientY;
          pinchStartDist = Math.hypot(dx, dy) || 1;
          pinchStartZoomZ = targetZoomZ;
        }
      },
      { passive: false }
    );

    domEl.addEventListener(
      'touchmove',
      (e) => {
        if (e.touches.length === 1 && isPointerDown && !isPinching) {
          if (typeof e.preventDefault === 'function') e.preventDefault();
          handleDragMove(e.touches[0].clientX, e.touches[0].clientY);
        } else if (e.touches.length === 2 && isPinching) {
          if (typeof e.preventDefault === 'function') e.preventDefault();
          const dx = e.touches[0].clientX - e.touches[1].clientX;
          const dy = e.touches[0].clientY - e.touches[1].clientY;
          const dist = Math.hypot(dx, dy) || 1;
          const scaleRatio = pinchStartDist / dist;
          setTargetZoom(pinchStartZoomZ * scaleRatio);
        }
      },
      { passive: false }
    );

    domEl.addEventListener('touchend', () => {
      handleDragEnd();
    });

    domEl.addEventListener('click', onPointerClick);

    // זום באמצעות גלגלת עכבר או משטח מגע (Trackpad)
    domEl.addEventListener(
      'wheel',
      (e) => {
        if (typeof e.preventDefault === 'function') e.preventDefault();
        const delta = e.deltaY * 0.0035;
        setTargetZoom(targetZoomZ + delta);
      },
      { passive: false }
    );

    // כפתורי זום גלויים (+ / -)
    if (btnZoomIn) {
      btnZoomIn.addEventListener('click', () => {
        setTargetZoom(targetZoomZ - ZOOM_STEP);
      });
    }

    if (btnZoomOut) {
      btnZoomOut.addEventListener('click', () => {
        setTargetZoom(targetZoomZ + ZOOM_STEP);
      });
    }

    // כפתור עצור / הפעל סיבוב אוטומטי
    if (btnRotate) {
      btnRotate.addEventListener('click', () => {
        setAutoRotate(!isRotating);
      });
    }

    // כפתור שקיפות חתך (Cutaway)
    if (btnCutaway) {
      btnCutaway.addEventListener('click', () => {
        const nextState = !isCutawayMode;
        manualCutawayOverride = nextState;
        applyCutawayVisibility(nextState);
        selectRegion(selectedRegionId, false);
      });
    }

    // כפתור איפוס מבט, זום וסיבוב
    if (btnReset) {
      btnReset.addEventListener('click', () => {
        manualCutawayOverride = null;
        targetRotation.x = INITIAL_ROT_X;
        targetRotation.y = INITIAL_ROT_Y;
        setTargetZoom(DEFAULT_ZOOM_Z);
        setAutoRotate(true);
        selectRegion('pfc', false);
      });
    }

    // כפתורי בחירת 4 האזורים / הרשתות המוחיות
    document.querySelectorAll('.brain-region-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const regionId = btn.getAttribute('data-region');
        manualCutawayOverride = null;
        selectRegion(regionId, true);
      });
    });

    window.addEventListener('resize', onWindowResize);

    document.addEventListener('slideChanged', (e) => {
      if (e.detail && e.detail.slideNumber === 8) {
        onWindowResize();
        setTimeout(onWindowResize, 0);
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
    if (scene && camera) {
      renderer.render(scene, camera);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    setTimeout(init, 50);
  }
})();
