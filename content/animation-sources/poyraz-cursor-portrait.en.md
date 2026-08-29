---
title: "How to Build an AI Avatar That Follows the Pointer"
slug: "poyraz-cursor-portrait"
excerpt: "Build the effect from start to finish with the prompts, Wiro AI and MiniMax H3 video workflow, FFmpeg preparation, and React integration I used."
coverImage: "/animation-sources/poyraz-cursor-portrait/avatar-mouse-follow.gif"
platform: "Web"
tools:
  - "Wiro AI"
  - "MiniMax H3"
  - "FFmpeg"
  - "React"
date: "2026-08-29"
author: "Poyraz Avsever"
lang: "en"
---

The portrait at the bottom-right is not playing like a normal video. It remains paused while the pointer's vertical position controls the video timeline. At the bottom of the screen the portrait looks down-left, in the middle it looks horizontally left, and at the top it looks up-left.

I generated the video with the **MiniMax H3** model through **Wiro AI** in a **1:1 square format**. I then prepared it for frequent seeking with FFmpeg and connected its `currentTime` to the pointer's Y position in React.

Every prompt on this page is copyable and can be adapted to your portrait, avatar, or brand character.

## How to use the `[[...]]` fields

Double square brackets mark values you must replace. Do not leave `[[OUTFIT]]` in the final prompt; replace it with a concrete value such as `plain red polo shirt`.

| Variable | What it means | Value in this project |
| --- | --- | --- |
| `[[SUBJECT]]` | Person or character | young male software creator |
| `[[OUTFIT]]` | Clothing | plain red polo shirt |
| `[[BACKGROUND_COLOR]]` | Flat background | pure white, `#FFFFFF` |
| `[[EXPRESSION]]` | Fixed expression | calm, natural, neutral |
| `[[ASPECT_RATIO]]` | Generation ratio | `1:1` |
| `[[HEAD_DIRECTION]]` | Fixed horizontal angle | about 60 degrees left |
| `[[VIDEO_PATH]]` | Public video path | `/media/cursor-portrait/poyraz-bottom-right.mp4` |
| `[[POSTER_PATH]]` | Public poster path | `/media/cursor-portrait/poyraz-bottom-right-poster.webp` |
| `[[FRAMEWORK]]` | Application stack | Next.js, React, TypeScript |
| `[[STYLING_SYSTEM]]` | Styling stack | Tailwind CSS |

Search for every `[[...]]` field before submitting a prompt and make sure no unresolved variable remains.

## How the effect works

The reliable way to control a single video in real time is to treat it as a short **motion-control plate**, not as an autoplaying clip.

The four-second timeline in this project:

1. `0.00–0.25`: hold the down-left pose.
2. `0.25–3.75`: move from down-left to up-left.
3. Around `2.00`: reach the neutral horizontal-left pose.
4. `3.75–4.00`: hold the up-left pose.

Moving the pointer vertically scrubs this active range forward or backward. Pointer X is intentionally ignored because the generated video contains only one controlled motion axis.

> A single video is reliable only along the motion axis it contains. For true horizontal and vertical tracking, use a consistent 3×3 set of directional stills instead of inventing a second axis in code.

## Production workflow

1. Select a clear, front-facing identity reference.
2. Prepare a consistent 1:1 master frame with fixed clothing, light, and background.
3. Upload the master frame to Wiro AI and generate the motion with MiniMax H3.
4. Regenerate with the repair prompt if the face, camera, or background drifts.
5. Convert the result into a seek-friendly 720×720 H.264 web asset.
6. Map pointer Y to the video's active time range.
7. Test desktop, reduced-motion, dark-theme, and mobile behavior separately.

## 1. Master frame prompt

Upload a clear identity reference to your image-generation tool and replace every `[[...]]` field first.

```prompt
Use the uploaded image only as the identity reference for [[SUBJECT]].
Create a new photorealistic, production-ready 1:1 studio portrait for an
interactive website animation. Preserve the exact recognizable identity,
facial proportions, skin tone, hairstyle, hairline, eyebrows, eye shape,
nose, lips, jawline, age, and overall appearance.

Composition:
- Square [[ASPECT_RATIO]] frame.
- Medium close-up from [[CROP_POINT]] upward.
- Keep the full head, hair, ears, neck, shoulders, and visible upper torso
  safely inside the frame.
- Keep comfortable negative space around the hair and shoulders.
- The shoulders remain stable and the head is turned approximately
  [[HEAD_DIRECTION]].
- Expression: [[EXPRESSION]].
- Outfit: [[OUTFIT]].

Background and light:
- Perfectly flat, seamless [[BACKGROUND_COLOR]] background.
- No gradient, texture, horizon line, furniture, props, text, watermark,
  logo, border, or visible cast shadow.
- Soft, bright studio lighting with natural skin texture.
- Keep hair, ears, face, shoulders, and clothing edges clean.

Continuity constraints:
- Do not beautify, age, de-age, stylize, or reinterpret the person.
- Do not change facial hair, outfit, accessories, body proportions, or light.
- Do not crop the hair, ears, shoulders, or upper torso.
- Generate one person and one clean master frame only.
```

Values used for this implementation:

```text
[[SUBJECT]] = a young male software creator
[[ASPECT_RATIO]] = 1:1
[[CROP_POINT]] = mid-torso
[[HEAD_DIRECTION]] = 60 degrees toward screen-left
[[EXPRESSION]] = calm, natural, neutral expression
[[OUTFIT]] = plain red polo shirt
[[BACKGROUND_COLOR]] = pure white (#FFFFFF)
```

## 2. Wiro AI / MiniMax H3 video prompt

Use the master frame as the image reference in Wiro AI with the MiniMax H3 model. The goal is a technical plate that works frame by frame, not a cinematic scene.

```prompt
Animate the uploaded 1:1 master frame into a precise four-second motion-control
plate for an interactive website portrait. Preserve the exact identity, face,
hairstyle, red polo shirt, body proportions, lighting, colors, square framing,
and pure white background from the reference image.

Output:
- Duration: exactly 4.0 seconds.
- Aspect ratio: 1:1.
- One continuous shot with a completely locked, eye-level camera.
- No zoom, crop change, pan, tilt, dolly, reframing, or camera shake.
- No speech and no audio-dependent movement.

Head direction:
- Keep the subject turned approximately 60 degrees toward screen-left for
  the entire video.
- The horizontal head angle must not change.
- Never turn toward the camera and never rotate into a full side profile.

Exact motion timeline:
- 0.00–0.25 seconds: hold a clean down-left gaze and head-tilt pose.
- 0.25–3.75 seconds: move smoothly and continuously from down-left to up-left.
- At exactly 2.00 seconds: reach a neutral horizontal-left gaze.
- 3.75–4.00 seconds: hold the final up-left pose perfectly still.

Movement rules:
- Only the eyes and the minimum natural head/neck tilt required for the
  vertical gaze may move.
- Shoulders, torso, arms, clothing, body position, head scale, and horizontal
  head angle remain fixed.
- Keep the mouth closed and motionless.
- No talking, smiling, eyebrow movement, nodding, leaning, body sway,
  breathing motion, or secondary gesture.
- Movement must be slow, linear, anatomically coherent, and usable when
  scrubbed both forward and backward.

Continuity:
- Preserve the same recognizable face in every frame.
- Keep hair volume, hairline, ears, nose, jaw, skin texture, clothing folds,
  and lighting stable.
- No face drift, morphing, warped anatomy, flicker, or changing expression.
- Keep the background perfectly uniform pure white (#FFFFFF) in every frame.

This is not a cinematic scene. It is a deterministic frame-scrubbing asset
for a website and every intermediate frame must work as a clean still image.
```

Inspect the middle frames as carefully as the endpoints. Face shape, ears, hairline, and clothing edges must remain stable throughout the MiniMax H3 output.

## 3. Repair prompt

Describe the failed generation precisely in `[[OBSERVED_PROBLEMS]]`.

```prompt
Regenerate this clip as a strict technical motion plate. The previous result
is unusable because: [[OBSERVED_PROBLEMS]].

Lock every property except the intended vertical gaze and head-tilt movement:
- preserve the exact identity and facial proportions in every frame;
- keep the horizontal head angle fixed at approximately 60 degrees left;
- fixed camera, crop, focal length, scale, head position, shoulders, torso,
  arms, outfit, expression, lighting, and background;
- one slow linear movement from down-left to up-left;
- neutral horizontal-left pose at exactly two seconds;
- closed and motionless mouth;
- no speech, smile, blink during movement, eyebrow motion, body sway,
  zoom, parallax, lighting shift, background flicker, face morphing,
  hair change, ear deformation, or new objects;
- perfectly uniform pure white (#FFFFFF) background.

This clip will be paused and scrubbed frame by frame. Every intermediate frame
must remain anatomically coherent and visually consistent with the reference.
```

Example problem description:

```text
[[OBSERVED_PROBLEMS]] = the face changes near the final pose, the shoulders
move with the head, and the white background flickers between frames
```

## 4. Preparing the video for the web

AI video can play directly in a browser, but codec and keyframe interval matter when `currentTime` changes frequently. I prepared a 720×720, 30 FPS, silent H.264 file with every frame encoded as a keyframe.

```bash
ffmpeg -i INPUT.mp4 \
  -vf "scale=720:720:force_original_aspect_ratio=decrease,pad=720:720:(ow-iw)/2:(oh-ih)/2:color=white,fps=30" \
  -an -c:v libx264 -preset slow -crf 20 -pix_fmt yuv420p \
  -g 1 -keyint_min 1 -sc_threshold 0 -movflags +faststart \
  public/media/cursor-portrait/poyraz-bottom-right.mp4
```

Key decisions:

- `-an` removes audio completely.
- `yuv420p` improves Safari and Chromium compatibility.
- `faststart` moves MP4 metadata to the beginning.
- `-g 1` makes every frame independently seekable.
- `scale + pad` preserves proportions on a square white surface.

### Media optimization agent prompt

```prompt
Prepare [[INPUT_VIDEO_PATH]] as a web motion-control plate that will be scrubbed
forward and backward from pointer movement. Never overwrite the source file.

Outputs:
- Video: [[VIDEO_PATH]]
- Poster: [[POSTER_PATH]]
- Exact duration: 4.00 seconds
- Starting hold: 0.00–0.25
- Active motion: 0.25–3.75
- Final hold: 3.75–4.00
- Resolution: 720×720
- Frame rate: 30 FPS
- Codec: H.264 MP4, libx264, yuv420p
- Settings: preset slow, CRF 20, faststart, no audio
- Every frame, or at most every second frame, must be a keyframe

Do not distort the aspect ratio. Use #FFFFFF padding when needed. Do not crop
hair, face, ears, shoulders, or clothing. Verify duration, resolution, FPS,
codec, and file size. Visually inspect the first, middle, and final frames.
Do not modify unrelated project files.
```

## 5. Mapping pointer Y to video time

Pointer Y is `0` at the viewport top and `window.innerHeight` at the bottom. Invert and clamp it to `0–1`, then map it to the active video range.

```ts
const TOTAL_DURATION = 4;
const ACTIVE_START = 0.25;
const ACTIVE_END = 3.75;
const DEFAULT_TIME = 2;
const SMOOTHING = 0.12;

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(Math.max(value, minimum), maximum);
}

function mapPointerYToTime(pointerY: number, viewportHeight: number) {
  if (viewportHeight <= 0) return DEFAULT_TIME;

  const progress = clamp(1 - pointerY / viewportHeight, 0, 1);
  return ACTIVE_START + progress * (ACTIVE_END - ACTIVE_START);
}
```

| Pointer position | Progress | Video time | Gaze |
| --- | ---: | ---: | --- |
| Viewport bottom | `0` | `0.25` | down-left |
| Viewport middle | `0.5` | `2.00` | horizontal-left |
| Viewport top | `1` | `3.75` | up-left |

`pointerX` never enters this formula, so horizontal pointer movement does not change the frame.

## 6. Smooth scrubbing in React

Keep high-frequency values in refs instead of updating React state for every pointer event. A single `requestAnimationFrame` loop damps the current value toward the target.

```ts
const pointerYRef = useRef<number | null>(null);
const targetTimeRef = useRef(DEFAULT_TIME);
const currentTimeRef = useRef(DEFAULT_TIME);
const rafIdRef = useRef<number | null>(null);

function animate() {
  const difference = targetTimeRef.current - currentTimeRef.current;
  currentTimeRef.current += difference * SMOOTHING;

  const video = videoRef.current;
  if (video && Math.abs(video.currentTime - currentTimeRef.current) > 1 / 120) {
    video.currentTime = currentTimeRef.current;
  }

  if (Math.abs(difference) > 0.002) {
    rafIdRef.current = requestAnimationFrame(animate);
  } else {
    rafIdRef.current = null;
  }
}

function handlePointerMove(event: PointerEvent) {
  if (event.pointerType !== "mouse") return;

  pointerYRef.current = event.clientY;
  targetTimeRef.current = mapPointerYToTime(
    event.clientY,
    window.innerHeight,
  );

  if (rafIdRef.current === null) {
    rafIdRef.current = requestAnimationFrame(animate);
  }
}
```

Production code must also handle metadata readiness, optional video priming, tab visibility, and complete listener cleanup.

## 7. Ready-to-use coding-agent prompt

Replace the bracketed values and use this with a coding agent in an existing frontend project.

```prompt
Add a reusable `PointerPortraitFollower` component to the existing [[FRAMEWORK]]
project. It must stay at the bottom-right of the viewport and react only to the
pointer's Y position. Styling system: [[STYLING_SYSTEM]].

Assets:
- Video: [[VIDEO_PATH]]
- Poster: [[POSTER_PATH]]

System constants:
- TOTAL_DURATION = 4
- ACTIVE_START = 0.25
- ACTIVE_END = 3.75
- DEFAULT_TIME = 2
- SMOOTHING = 0.12

Behavior:
- Keep the video paused; never autoplay it normally.
- Use pointerY only. pointerX must never affect video timing.
- progress = clamp(1 - pointerY / window.innerHeight, 0, 1)
- targetTime = ACTIVE_START + progress * (ACTIVE_END - ACTIVE_START)
- Use a global pointermove listener without React state updates per event.
- Store pointerY, targetTime, and currentTime in refs.
- Apply damping in one requestAnimationFrame loop.
- Limit seeks to about 30–60 Hz and skip tiny time differences.
- Return smoothly to the neutral 2.00-second pose when the pointer leaves the
  window or the window loses focus.

Video element:
- muted, playsInline, preload="auto", no controls, no autoplay
- seek to 2.00 after loadedmetadata
- prime muted playback briefly on the first real pointer move only if required
- show the poster instead of a broken media icon after an asset error

Placement:
- position: fixed; right: [[RIGHT_OFFSET]]; bottom: [[BOTTOM_OFFSET]]
- width: [[DESKTOP_WIDTH]]; aspect-ratio: 1 / 1; z-index: [[Z_INDEX]]
- object-fit: contain; background: [[BACKGROUND_COLOR]]
- pointer-events: none; user-select: none; aria-hidden: true
- no border, radius, shadow, or horizontal mirroring

Responsive and lifecycle:
- disable animation on pointer: coarse and narrow viewports
- never interpret touch as mouse tracking
- honor prefers-reduced-motion
- do not block CTA, link, or menu interaction
- never access window/document during SSR
- stop RAF and seeking while the tab is hidden
- clean pointermove, pointerleave, blur, resize, visibilitychange, and RAF on
  unmount; never start multiple RAF loops

Separate mapping and clamp into pure typed helpers. Add boundary tests when a
test setup exists. Do not add a heavy animation dependency. Run build,
typecheck, lint, and existing tests after implementation.
```

Values from this implementation:

```text
[[FRAMEWORK]] = Next.js App Router, React, TypeScript
[[STYLING_SYSTEM]] = Tailwind CSS and Poyraz UI
[[VIDEO_PATH]] = /media/cursor-portrait/poyraz-bottom-right.mp4
[[POSTER_PATH]] = /media/cursor-portrait/poyraz-bottom-right-poster.webp
[[RIGHT_OFFSET]] = 24px
[[BOTTOM_OFFSET]] = 0px
[[DESKTOP_WIDTH]] = clamp(110px, 11vw, 170px)
[[Z_INDEX]] = 40
[[BACKGROUND_COLOR]] = #FFFFFF
```

## 8. Mobile, accessibility, and fallback

This effect is meaningful on desktop with a mouse. Treating touch movement as pointer tracking hurts usability and wastes decoding work.

My choices:

- Do not render the component on `pointer: coarse` devices.
- Hide it completely below `840px`.
- Honor `prefers-reduced-motion`.
- Hide the white-background asset in dark mode.
- Keep it decorative with `pointer-events: none` and `aria-hidden="true"`.
- Show the poster if video loading fails.

## 9. Quality checklist

### Video

- Is it the same person in the first, middle, and final frames?
- Does the head stay turned about 60 degrees left?
- Are the poses down-left, horizontal-left, and up-left in the correct order?
- Do hair, ears, jaw, and facial features remain stable?
- Do shoulders and clothing stay still?
- Does the camera, light, or white background flicker?
- Does the motion remain natural when scrubbed backward?

### Web

- Does the video remain paused before pointer input?
- Does it scrub in the correct direction on vertical movement?
- Does horizontal-only movement leave the frame unchanged?
- Is there a seek queue or visible lag during fast movement?
- Does the portrait return to neutral after leaving the window?
- Are links and CTA controls still clickable?
- Is animation disabled on mobile and reduced-motion?
- Does the poster appear after a video error?
- Are listeners and RAF cleaned up after navigation?

## Adapt it to your project

Five steps are enough to reuse the system:

1. Replace every `[[...]]` variable for your character.
2. Produce a consistent 1:1 master frame on a flat background.
3. Describe only one intended motion axis in the MiniMax H3 prompt.
4. Map that same axis to the active video range.
5. Connect the optimized video and poster to the component.

The main rule is simple: do not invent motion in code that does not exist in the generated video. Treating the AI output as a controlled motion plate makes the effect more natural, deterministic, and testable.
