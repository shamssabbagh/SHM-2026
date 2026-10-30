# Prompt Log 22: Hybrid Video Advertisements & Separate 3D Product Viewer Plan for Slide 19

- **Project:** `SHM-2026` — The Consumer Brain: The Psychology Behind Purchasing Decisions
- **Branch:** `malak-improvments`
- **Team:** Shams Sabag & Malak Faroji (University of Haifa)
- **Date:** October 30, 2026
- **File:** `prompts/22_Slide19_Hybrid_Video_And_3D_Plan.md`

---

## Prompt 10 in Session (Verbatim User Prompt — `2026-10-30T02:25:57+02:00` / repeated `02:31:13+02:00`)

```text
We have selected a hybrid experience for slide 19:
two photorealistic video advertisements plus a separate interactive
3D product viewer.

IMPORTANT DISTINCTION
The ads are cinematic videos with fixed camera viewpoints.
The product viewer is a real Three.js scene with orbit controls.
Do not describe a normal video as freely rotatable, 360°, or “6D”.
Do not simulate a 3D model by rotating a flat product image.

VISUAL REQUIREMENTS
Aim for live-action realism: natural human proportions, believable
skin, hands, lighting, materials, movement, and physical scale.
No cartoons, illustration, game-like characters, or plastic skin.
Use the correct Gritti Tutù bottle and preserve its identity.
AI-generated footage must be documented as synthetic footage,
not presented as an actual filmed event.

VIDEO CONCEPTS — approximately 25 seconds each
A. Informational:
Help the viewer understand the product using verified facts,
clear product close-ups, concentration, volume, and scent notes.
Describe notes as scent descriptors, not necessarily ingredients.
Do not invent longevity, performance, or psychological benefits.

B. Emotional — “Before they call your name”:
An adult university student prepares to present an important project.
Show rehearsal, anticipation, a brief perfume application as part
of getting ready, and the moment she enters the presentation room.
The perfume must not be portrayed as causing confidence or success.
End with this original student-written line:
"עוד לפני שמכירים את השם שלך — יש לך סיפור."

Use comparable duration, production quality, product visibility,
and playback controls. Explain that this activity compares two
complete ad executions and cannot isolate emotion as the cause.

3D PRODUCT VIEWER
First inspect available assets and tools.
Determine whether an accurate, usable, appropriately licensed
Gritti Tutù model is available.
If not, list the reference views needed to create one faithfully.
Do not invent the bottle's unseen back, label, or geometry.
Keep any approximate prototype explicitly labelled in development.
Provide drag-to-orbit, bounded zoom, and reset view when a model
is available. Make the viewer equally available after both ratings.

TASK FOR THIS STEP
1. Inspect the current project without overwriting existing changes.
2. Create docs/video-ad-production-plan.md containing:
   - A shot-by-shot storyboard and timing for each ad.
   - Hebrew on-screen copy and optional narration.
   - Required authentic product assets.
   - Available production tools and their limitations.
   - A feasible integration plan for video and the 3D viewer.
3. State clearly whether you can generate actual video and 3D assets.
   If not, prepare the briefs and integration requirements;
   do not substitute unrelated stock footage or claim completion.
4. Preserve the existing working slide while assets are prepared.
5. Save this exact prompt and update README with actual progress.
Do not commit, push, or merge.
```

---

## Prompt 11 in Session (Verbatim User Prompt — `2026-10-30T02:33:43+02:00`)

```text
Show the production details from docs/video-ad-production-plan.md
here in the chat, without editing any files:

1. The storyboard for both 25-second ads: each shot, its duration,
   action, Hebrew text, and audio.
2. Can you actually generate video files with your currently
   available tools? Name the tool if available.
3. Which authentic Gritti Tutù images have been obtained?
   Give their local paths and source URLs.
4. Is an actual 3D bottle model available, or only a plan?
5. List the exact missing assets required to proceed.

Distinguish existing files from proposed assets.
Do not create more planning documents or change code.
Keep the answer concise.
```

---

## Prompt 12 in Session (Verbatim User Prompt — `2026-10-30T02:39:41+02:00`)

```text
Read docs/video-ad-production-plan.md and report the current
production status here in the chat. Do not edit files.

1. Show the storyboard for both 25-second ads:
   each shot, duration, action, Hebrew text, and audio.

2. Can your currently available tools generate actual
   photorealistic video files? Name the tool if available.
   Distinguish video generation from editing existing footage.

3. List the authentic Gritti Tutù images already downloaded,
   with local file paths and source URLs.
   The preview still shows an AURA bottle with a Gritti title.
   Confirm whether this is still a temporary placeholder.

4. Is an actual interactive 3D bottle model available?
   Distinguish an existing model from a proposed one.

5. List the missing assets and recommend the next concrete
   production step using the tools actually available.

Do not invent assets, tool capabilities, or completed work.
Do not create more planning documents, change code, commit,
push, or merge. Keep the local presentation server running.
Reply concisely in simple English.
```

---

## Summary of Changes, Inspection Results, and Remaining Work (Labeled Summary)

### 1. What Was Changed and Why
- **Created `docs/video-ad-production-plan.md`:**
  - Documented the conceptual and technical distinction between the two fixed-camera ~25-second `<video>` advertisements and the separate post-rating Three.js WebGL 3D bottle viewer.
  - Created shot-by-shot storyboards (`25.0s` each) with Hebrew on-screen copy and optional narration for **Video A (Informational)** (framing scent notes as scent descriptors, not chemical ingredients) and **Video B (Emotional — "Before they call your name")** (adult university student preparing to present a project, ending with `"עוד לפני שמכירים את השם שלך — יש לך סיפור."`).
  - Specified the 6 orthographic reference views and physical millimeter measurements required to build an authentic 3D bottle model without inventing unseen back/label geometry.
  - Outlined the DOM and Three.js integration architecture while keeping the existing image-led Slide 19 fully functional.

### 2. Tool & Asset Inspection Performed
- Audited `assets/`, `js/vendor/three.min.js`, and local CLI tools (`which ffmpeg blender`).
- Confirmed honestly that this environment **cannot** generate photorealistic `.mp4` video files or `.glb` 3D meshes (`ffmpeg` and `blender` are not installed, and no AI video generator is available in this session).

### 3. Remaining Work & Limitations
- **Video Ads Status:** The two ~25-second video ads (`gritti_tutu_info.mp4` and `gritti_tutu_emotional.mp4`) are **still in production and have not yet been integrated into the presentation**.
- **3D Bottle Viewer Status:** Deferred until sufficient multi-angle reference views (back, sides, top, bottom) and verified physical measurements exist.
