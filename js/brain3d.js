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
      colorHex: '#6B2D46',
      colorNum: 0x6b2d46,
      emissiveNum: 0x3a1524,
      isDeep: false,
      depthBadge: 'קליפת המוח הקדמית (מבט חיצוני)',
      position: { x: 0.572, y: -0.428, z: 1.177 },
      altPosition: { x: -0.535, y: -0.473, z: 1.159 },
      defaultView: { rotX: 0.14, rotY: -0.38 },
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
      colorNum: 0xd85b49,
      emissiveNum: 0x5c1f16,
      isDeep: true,
      depthBadge: 'מבנה תת-קורטיקלי עמוק (מוצג בשקיפות חתך)',
      position: { x: 0.530, y: -0.690, z: 0.114 },
      altPosition: { x: -0.557, y: -0.662, z: 0.104 },
      defaultView: { rotX: 0.18, rotY: -0.45 },
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
      colorHex: '#C26D2D',
      colorNum: 0xc26d2d,
      emissiveNum: 0x4f280b,
      isDeep: true,
      depthBadge: 'קליפה פנימית קבורה במעמקי החריץ הצידי (שקיפות חתך)',
      position: { x: 0.827, y: -0.395, z: 0.402 },
      altPosition: { x: -0.836, y: -0.323, z: 0.341 },
      defaultView: { rotX: 0.12, rotY: -0.62 },
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
      colorNum: 0x9e3b66,
      emissiveNum: 0x421327,
      isDeep: true,
      depthBadge: 'גרעין תת-קורטיקלי עמוק (מוצג בשקיפות חתך)',
      position: { x: 0.198, y: -0.487, z: 0.486 },
      altPosition: { x: -0.207, y: -0.453, z: 0.470 },
      defaultView: { rotX: 0.16, rotY: -0.32 },
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
  let scene, camera, renderer, brainGroup;
  let lhMesh = null;
  let rhMesh = null;
  const regionMeshes = {};
  const hotspotMeshes = [];
  const interactiveMeshes = [];
  let animationFrameId = null;
  let isRotating = true;
  let isCutawayMode = false;
  let manualCutawayOverride = null; // null = אוטומטי לפי אזור עמוק/חיצוני, boolean = בחירה ידנית של המשתמש
  let isPointerDown = false;
  let pointerMovedDistance = 0;
  let pointerStart = { x: 0, y: 0 };
  let currentRotation = { x: 0.14, y: -0.38 };
  let targetRotation = { x: 0.14, y: -0.38 };
  let selectedRegionId = 'pfc';
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  // אלמנטי DOM
  let container, infoCardEl, btnRotate, btnCutaway, btnReset, viewModeBadgeEl, fallbackEl;

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

      // חישוב צבע אנטומי לפי עומק החריצים (Sulci) והקמטים (Gyri)
      const s = sulcQuant ? sulcQuant[i] / 100.0 : 0;
      if (colorMode === 'cortex') {
        // t=0 בעומק החריץ (Sulcus), t=1 בראש הקמט (Gyrus)
        const t = Math.max(0, Math.min(1, (s + 0.85) / 1.7));
        // גווני שנהב-אנטומי חם על הקמטים (Gyri) וטאופ-ורדרד עמוק בחריצים (Sulci)
        colors[i3] = 0.62 + 0.32 * t;     // R: 0.62 -> 0.94
        colors[i3 + 1] = 0.52 + 0.36 * t; // G: 0.52 -> 0.88
        colors[i3 + 2] = 0.50 + 0.34 * t; // B: 0.50 -> 0.84
      } else {
        const t = Math.max(0, Math.min(1, (s + 0.9) / 1.8));
        const shade = 0.78 + 0.22 * t;
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

  /**
   * יצירת חומר תלת-ממדי מותאם לתאורה רכה (עם גיבוי לסביבות בדיקה ללא MeshPhongMaterial)
   */
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
    viewModeBadgeEl = document.getElementById('brainViewModeBadge');

    if (!container) return;

    try {
      scene = new THREE.Scene();

      const initWidth = container.clientWidth || 720;
      const initHeight = container.clientHeight || 430;
      const aspect = initWidth / initHeight;
      camera = new THREE.PerspectiveCamera(40, aspect, 0.1, 100);
      camera.position.set(0, 0.15, 4.75);

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(initWidth, initHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setClearColor(0x000000, 0);
      container.appendChild(renderer.domElement);

      // תאורה אנטומית רכה (Soft Studio Anatomical Lighting)
      const ambientLight = new THREE.AmbientLight(0xfff8f2, 0.72);
      scene.add(ambientLight);

      if (THREE.HemisphereLight) {
        const hemiLight = new THREE.HemisphereLight(0xfffaf5, 0x6d4c56, 0.55);
        hemiLight.position.set(0, 6, 0);
        scene.add(hemiLight);
      }

      const DirLightCtor = THREE.DirectionalLight || THREE.PointLight;
      const keyLight = new DirLightCtor(0xfff6ed, 0.78);
      keyLight.position.set(4.5, 5.5, 5.5);
      scene.add(keyLight);

      const fillLight = new DirLightCtor(0xf5e1e6, 0.42);
      fillLight.position.set(-5.0, 2.0, 3.5);
      scene.add(fillLight);

      const rimLight = new DirLightCtor(0xd85b49, 0.25);
      rimLight.position.set(0.0, -4.0, -5.0);
      scene.add(rimLight);

      brainGroup = new THREE.Group();
      scene.add(brainGroup);

      createBrainGeometry(brainGroup);
      createHotspots(brainGroup);
      bindEvents();

      // בחירת אזור ברירת מחדל (הרשת הקדם-מצחית) ללא הפעלת צליל כלשהו
      selectRegion('pfc');

      startAnimation();
    } catch (err) {
      console.error('Failed to initialize Three.js brain scene:', err);
      showFallback('אירעה שגיאה באתחול המנוע הגרפי: ' + err.message);
    }
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

    // 1. שתי ההמיספרות של קליפת המוח (Left & Right Cerebral Cortex)
    const lhGeo = buildBufferGeometryFromData(anatomy.hemispheres.lh, 'cortex');
    const rhGeo = buildBufferGeometryFromData(anatomy.hemispheres.rh, 'cortex');

    const lhMat = createLitMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.96,
      shininess: 18,
      specular: 0x2a1e22
    });
    const rhMat = createLitMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.96,
      shininess: 18,
      specular: 0x2a1e22
    });

    lhMesh = new THREE.Mesh(lhGeo, lhMat);
    rhMesh = new THREE.Mesh(rhGeo, rhMat);
    lhMesh.name = 'left_cerebral_hemisphere';
    rhMesh.name = 'right_cerebral_hemisphere';

    parentGroup.add(lhMesh);
    parentGroup.add(rhMesh);

    // 2. ארבעת האזורים / הרשתות האנטומיות באותו מרחב קואורדינטות סטריאוטקסי
    Object.keys(BRAIN_REGIONS).forEach((regionId) => {
      const regionCfg = BRAIN_REGIONS[regionId];
      const regionMeshData = anatomy.regions[regionId];
      if (!regionMeshData) return;

      // עדכון מיקומי סיכות האינטראקציה לפי הצנטרואידים האנטומיים המדויקים מהאטלס
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
        opacity: 0.88,
        shininess: 28,
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
   * יצירת סמני מיקום אנטומיים דו-צדדיים (Hotspots) ללחיצה קלה בעכבר ובמגע
   */
  function createHotspots(parentGroup) {
    hotspotMeshes.length = 0;

    Object.values(BRAIN_REGIONS).forEach((region) => {
      const sphereGeo = new THREE.SphereGeometry(0.085, 16, 16);
      const sphereMat = new THREE.MeshBasicMaterial({
        color: region.colorNum,
        transparent: true,
        opacity: 0.95,
        depthTest: false
      });
      const mesh = new THREE.Mesh(sphereGeo, sphereMat);
      mesh.position.set(region.position.x, region.position.y, region.position.z);
      mesh.renderOrder = 10;
      mesh.userData = { regionId: region.id, isHotspot: true };

      const ringGeo = new THREE.RingGeometry(0.115, 0.15, 24);
      const ringMat = new THREE.MeshBasicMaterial({
        color: region.colorNum,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.75,
        depthTest: false
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      mesh.add(ringMesh);
      mesh.userData.ring = ringMesh;

      const hitSphereGeo = new THREE.SphereGeometry(0.24, 8, 8);
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
   * עדכון שקיפות קליפת המוח (Cutaway / Cortical Transparency) לחשיפת מבנים עמוקים
   */
  function applyCutawayVisibility(enableCutaway) {
    isCutawayMode = !!enableCutaway;

    const cortexOpacity = isCutawayMode ? 0.22 : 0.96;
    const cortexDepthWrite = !isCutawayMode;

    [lhMesh, rhMesh].forEach((hemiMesh) => {
      if (hemiMesh && hemiMesh.material) {
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
        ? 'מבט חתך שקוף: קליפת המוח שקופה לחשיפת מבנים תת-קורטיקליים וקליפת האינסולה בעומק המוח'
        : 'מבט אנטומי חיצוני: קליפת המוח המלאה (Desikan-Killiany Atlas)';
      viewModeBadgeEl.classList.toggle('cutaway-active', isCutawayMode);
    }
  }

  /**
   * בחירת אזור, עדכון הדגשת ה-Mesh התלת-ממדי, הפעלת שקיפות חתך לאזורים עמוקים והצגת הכרטיסייה
   */
  function selectRegion(regionId) {
    const region = BRAIN_REGIONS[regionId];
    if (!region) return;

    selectedRegionId = regionId;

    // אם המשתמש לא כפה מצב ידני, מפעילים שקיפות חתך אוטומטית עבור מבנים עמוקים (אמיגדלה, אינסולה, אקומבנס)
    const shouldUseCutaway =
      manualCutawayOverride !== null ? manualCutawayOverride : region.isDeep;
    applyCutawayVisibility(shouldUseCutaway);

    // הדגשת ה-Mesh האנטומי התלת-ממדי של האזור הנבחר
    Object.keys(regionMeshes).forEach((id) => {
      const rMesh = regionMeshes[id];
      const rCfg = BRAIN_REGIONS[id];
      if (!rMesh || !rMesh.material) return;

      if (id === regionId) {
        rMesh.material.opacity = 0.98;
        rMesh.material.emissive = new THREE.Color(rCfg.colorNum);
        if (typeof rMesh.material.emissiveIntensity === 'number') {
          rMesh.material.emissiveIntensity = 0.35;
        }
        rMesh.renderOrder = 5;
      } else {
        rMesh.material.opacity = isCutawayMode ? 0.32 : 0.18;
        rMesh.material.emissive = new THREE.Color(rCfg.emissiveNum);
        if (typeof rMesh.material.emissiveIntensity === 'number') {
          rMesh.material.emissiveIntensity = 0.12;
        }
        rMesh.renderOrder = 2;
      }
      rMesh.material.needsUpdate = true;
    });

    // הדגשת סיכות המיקום הדו-צדדיות
    hotspotMeshes.forEach((mesh) => {
      const isSelected = mesh.userData.regionId === regionId;
      if (isSelected) {
        mesh.scale.set(1.32, 1.32, 1.32);
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

    // עדכון כפתורי הבחירה
    document.querySelectorAll('.brain-region-btn').forEach((btn) => {
      const bId = btn.getAttribute('data-region');
      const isActive = bId === regionId;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });

    // עדכון כרטיס המידע העריכתי התמציתי (RTL)
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
  }

  /**
   * טיפול בלחיצה על אזור בסצנה התלת-ממדית (Raycasting על סיכות ועל ה-Mesh האנטומי)
   */
  function onPointerClick(event) {
    if (!renderer || !camera || pointerMovedDistance > 6) return;

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
        selectRegion(hitObj.userData.regionId);
      }
    }
  }

  function animate() {
    animationFrameId = requestAnimationFrame(animate);

    if (isRotating && !isPointerDown) {
      targetRotation.y += 0.0042;
    }

    currentRotation.x += (targetRotation.x - currentRotation.x) * 0.08;
    currentRotation.y += (targetRotation.y - currentRotation.y) * 0.08;

    if (brainGroup) {
      brainGroup.rotation.x = currentRotation.x;
      brainGroup.rotation.y = currentRotation.y;

      const time = performance.now() * 0.003;
      hotspotMeshes.forEach((mesh) => {
        if (mesh.userData.ring && camera) {
          const scale = 1.0 + 0.12 * Math.sin(time * 2.0);
          mesh.userData.ring.scale.set(scale, scale, scale);
          if (typeof mesh.userData.ring.lookAt === 'function') {
            mesh.userData.ring.lookAt(camera.position);
          }
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

    domEl.addEventListener('mousedown', (e) => {
      isPointerDown = true;
      pointerMovedDistance = 0;
      pointerStart.x = e.clientX;
      pointerStart.y = e.clientY;
    });

    window.addEventListener('mousemove', (e) => {
      if (!isPointerDown) return;
      const dx = e.clientX - pointerStart.x;
      const dy = e.clientY - pointerStart.y;
      pointerMovedDistance += Math.abs(dx) + Math.abs(dy);
      pointerStart.x = e.clientX;
      pointerStart.y = e.clientY;

      targetRotation.y += dx * 0.008;
      targetRotation.x += dy * 0.008;
      targetRotation.x = Math.max(-0.85, Math.min(0.85, targetRotation.x));
    });

    window.addEventListener('mouseup', () => {
      isPointerDown = false;
    });

    domEl.addEventListener(
      'touchstart',
      (e) => {
        if (e.touches.length === 1) {
          isPointerDown = true;
          pointerMovedDistance = 0;
          pointerStart.x = e.touches[0].clientX;
          pointerStart.y = e.touches[0].clientY;
        }
      },
      { passive: true }
    );

    window.addEventListener(
      'touchmove',
      (e) => {
        if (!isPointerDown || e.touches.length !== 1) return;
        const dx = e.touches[0].clientX - pointerStart.x;
        const dy = e.touches[0].clientY - pointerStart.y;
        pointerMovedDistance += Math.abs(dx) + Math.abs(dy);
        pointerStart.x = e.touches[0].clientX;
        pointerStart.y = e.touches[0].clientY;

        targetRotation.y += dx * 0.01;
        targetRotation.x += dy * 0.01;
        targetRotation.x = Math.max(-0.85, Math.min(0.85, targetRotation.x));
      },
      { passive: true }
    );

    window.addEventListener('touchend', () => {
      isPointerDown = false;
    });

    domEl.addEventListener('click', onPointerClick);

    domEl.addEventListener(
      'wheel',
      (e) => {
        e.preventDefault();
        camera.position.z += e.deltaY * 0.003;
        camera.position.z = Math.max(3.1, Math.min(7.0, camera.position.z));
      },
      { passive: false }
    );

    if (btnRotate) {
      btnRotate.addEventListener('click', () => {
        isRotating = !isRotating;
        btnRotate.setAttribute('aria-pressed', isRotating ? 'true' : 'false');
        btnRotate.innerHTML = isRotating
          ? '<span>⏸</span><span>עצור סיבוב</span>'
          : '<span>▶</span><span>הפעל סיבוב</span>';
      });
    }

    if (btnCutaway) {
      btnCutaway.addEventListener('click', () => {
        const nextState = !isCutawayMode;
        manualCutawayOverride = nextState;
        applyCutawayVisibility(nextState);
        // רענון שקיפות ה-Meshes הפנימיים בהתאם למצב החדש
        selectRegion(selectedRegionId);
      });
    }

    if (btnReset) {
      btnReset.addEventListener('click', () => {
        manualCutawayOverride = null;
        targetRotation.x = 0.14;
        targetRotation.y = -0.38;
        camera.position.set(0, 0.15, 4.75);
        selectRegion('pfc');
      });
    }

    document.querySelectorAll('.brain-region-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const regionId = btn.getAttribute('data-region');
        manualCutawayOverride = null;
        const regionCfg = BRAIN_REGIONS[regionId];
        if (regionCfg && regionCfg.defaultView) {
          targetRotation.x = regionCfg.defaultView.rotX;
        }
        selectRegion(regionId);
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
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    setTimeout(init, 50);
  }
})();
