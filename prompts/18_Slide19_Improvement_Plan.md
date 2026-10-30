# Prompt Log 18: Slide 19 Inspection and Staged Improvement Plan

- **Project:** `SHM-2026` — The Consumer Brain: The Psychology Behind Purchasing Decisions
- **Branch:** `malak-improvments`
- **Team:** Shams Sabag & Malak Faroji (University of Haifa)
- **Date:** October 30, 2026
- **File:** `prompts/18_Slide19_Improvement_Plan.md`

---

## Prompt 1 (Verbatim User Prompt)

```text
I am Malak, working with Shams on this university project.

First, inspect the project without changing any files.

1. Check the current folder, Git branch, and git status.
   The expected branch is malak-improvments.
2. Read README.md, PRD.md, js/python_runner.js,
   js/emotional_ad.js, and the slide 19 section in index.html.
3. Explain briefly what slide 19 does and identify any problems
   in how Python results reach its interface.
4. Suggest a small, staged improvement plan for slide 19.

Do not edit files, install packages, commit, or push.
Reply in short, simple English, at most 250 words.
```

### Summary of Inspection Response (Labeled Summary)
- Confirmed the working directory (`/Users/malakfaroji/SHM-2026`), active branch (`malak-improvments`), and clean `git status`.
- Inspected `README.md`, `PRD.md`, `js/python_runner.js`, `js/emotional_ad.js`, and Slide 19 in `index.html` without modifying any files.
- Identified that `calculateEmotionalAdPython` in `js/python_runner.js` returns a Pyodide `Map` via `proxy.toJs()`, whereas `renderResults()` in `js/emotional_ad.js` reads properties with dot notation (`res.ad_a.emotion`), causing a `TypeError` when Pyodide is ready, alongside unused Python output fields and a static calculation badge.

---

## Prompt 2 (Verbatim User Prompt)

```text
Before implementing anything, document our improvement plan.

Confirm we are on branch malak-improvments. If not, stop.

Create docs/slide19-improvement-plan.md with these stages:
1. Fix the Python Map-to-JavaScript conversion for slide 19
   without breaking other slides.
2. Display the actual calculation engine: Python or JavaScript.
3. Start both ads with equal rating defaults, require explicit
   ratings, and randomize which ad appears first.
4. Make the explanation reflect the user's actual results,
   including equal scores or preference for the neutral ad.
5. Review the Hebrew wording and verify the changes.

Important: brand attitude and purchase intention are self-reports.
Do not describe their difference as measured purchasing behavior
or claim this demonstration proves causation.

For each stage, list the affected files and a clear check for success.
Label every stage as PLANNED, not completed.

Save the actual prompts from this conversation in the next available
numbered file under prompts/. Preserve their wording where available;
clearly label any summaries. Do not invent past prompts.

Add a short link to this plan in README.md.
Do not change application code, commit, or push yet.
Summarize the files changed in simple English.
```

### Summary of Actions Taken for Prompt 2 (Labeled Summary)
- Verified that the active Git branch is `malak-improvments`.
- Created `docs/slide19-improvement-plan.md` documenting all 5 planned stages (`PLANNED`), methodological guardrails (self-reports vs. measured behavior, no causal claims), affected files, and checks for success.
- Saved the verbatim prompts from this conversation in `prompts/18_Slide19_Improvement_Plan.md`.
- Added a short link to `docs/slide19-improvement-plan.md` in `README.md`.
- Left all application code (`index.html`, `js/*`, `css/*`) untouched and did not commit or push.
