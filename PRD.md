## Overview
This project is an interactive birthday card designed to deliver a warm, playful, and emotional experience through animations and simple interactions.

Instead of a static message, the card unfolds step by step, guiding the recipient through a small narrative journey.

**[Role & Goal]**

You are an expert Full Stack Developer specializing in Next.js and AI integrations.

We are building a web page called "birthday_interactive"- a simple e-birthday card.

The goal: to show birthday blessings and memory galleries, with transitions from one page to another.

**[UX]**
* **Design:** Bauhaus. Warm colors dominated.
* **Feeling:** Calm, joyful, soothing 
* **Transitions:** Use 'framer-motion' for smooth transitions when users click on buttons

**[Tech Stack]**
* **Framework:** Next.js (React)
* **Styling:** Tailwind CSS+ shadcn UI.
* **Animations:** Framer Motion
* **State** Local state (React hooks)
* **Data:** Static content (JSON/constants)
* **Auth:** None
* **Backend:** None
* **Deployment:** Vercel

**[Implementaion Plan]**
* **StepByStep:** 
A 6-step experience:
0) Landing screen with title + “Open”
1) Envelope reveal animation (click to open)
2) Show letter in the envelope (then Next button)
3) "Memory Wall" + "Open" -> show photos in memory wall
4) User can click on each photo (with 'flip' animation effect), the flip side will show text messages associated with the photo
5) Final screen with “Replay” and optional confetti animation

* **Required Files:** 
- app/page.tsx
- renders <CardFlow />
- components/CardFlow.tsx
- single source of truth for state machine (step)
- handles transitions with AnimatePresence
- components/Landing.tsx (Step 0)
- components/EnvelopeReveal.tsx (Step 1)
- components/Letter.tsx (Step 2)
- components/MemoryWallIntro.tsx (Step 3)
- components/MemoryWall.tsx (Step 4)
- components/PhotoFlipCard.tsx (used by MemoryWall)
- components/Final.tsx (Step 5)
- data/memories.ts
- array of { id, imgSrc, backText, ... }
- public/memories/*
- photos used in memory wall
- public/audio/* (optional)
- background music / click sound

###### Optional but recommended:
- data/letter.ts (letter text)
- lib/utils.ts (helpers)

* **State Logic**
Use a single state machine in CardFlow:

   Step meanings:
        0: Landing
        1: Envelope Reveal
        2: Letter
        3: MemoryWall Intro
        4: MemoryWall Interactive
        5: Final

    Actions:
    - onOpen() (Landing CTA) → setStep(1)
    - onEnvelopeOpened() (reveal complete / click) → setStep(2)
    - onNextFromLetter() → setStep(3)
    - onOpenMemoryWall() → setStep(4)
    - onFinish() (button on MemoryWall) → setStep(5)
    - onReplay() → setStep(0) and reset any local states (like flipped cards)

    Memory Wall local state:
    - Track flip state per memory card:
        - Either flippedId: string | null (only one open at a time)
        - Or flipped: Record<string, boolean> (multiple cards can stay flipped)

* **Animation Requirement**
A. Step transitions (global)
    - Use AnimatePresence mode="wait" so steps don’t overlap.
    - Each step scene should:
        - fade in
        - translateY from ~8–16px to 0
        - small duration (0.25–0.45s)
    - Prevent rapid skipping:
        - disable CTA during transition OR use onExitComplete to re-enable.

    B. Envelope reveal (Step 1)
    - Envelope closed state → opened state on click.
    - Visuals:
        - envelope flap rotates up (3D-ish) OR slides open
        - letter peeks slightly (optional)
    - When reveal completes, either:
        - auto-advance to step 2 after animation
        - OR show “Continue” button (safer)

    C. Letter view (Step 2)
    - Letter slides up from envelope or fades in like paper.
    - Text appears nicely (stagger lines optional).

    D. Memory Wall intro (Step 3)
    - Background wall fades in.
    - CTA “Open” triggers transition to step 4.

    E. Photo flip (Step 4)

    Implement flip effect per PhotoFlipCard:

    - On click:
        - rotateY 180deg
        - back face shows text message

    - Use CSS 3D transforms + Motion for smoothness:
        - transform-style: preserve-3d
        - backface-visibility: hidden

    - Ensure click works on mobile (tap target >= 44px).

    F. Final scene + confetti (Step 5)
    - Show “Replay” button.
    - Optional confetti:
        - use a lightweight confetti library OR a simple animated overlay
        - confetti triggers on mount once (not infinite)

* **Edge Cases/UX Rules:** 
    - No horizontal scrolling on mobile.
    - Repeated clicking should not:
        - skip steps
        - break animations
    - If images fail to load:
        - show placeholder gradient and still allow flip text

* **Styling Requirements:**
General:
    - Mobile-first responsive layout
    - Centered card container:
        - max-w-md (or 420–520px)
        - generous padding
        - rounded-2xl
        - soft shadow

    Typography:
    - Title large (2xl/3xl)
    - Body comfortable line-height

    Use shadcn components:
    - Button, Card, Dialog (optional)

    Step-specific styling:
    - Step 0–3: single card layout with illustration/emoji
    - Step 4: grid layout:
        - grid-cols-2 on mobile, grid-cols-3 on desktop
        - consistent spacing
    - Step 5: calm finale + strong final message

    Assets:
    - store images under public/memories/
    - reference with /memories/xx.jpg

* **Acceptance Criteria (Done When):**
    - npm run dev runs with no errors   
    - User can complete Step 0 → 5 smoothly
    - Memory Wall:
        - grid renders
        - each photo flips correctly
        - text readable on back
    - Replay returns to Step 0 and resets flips
    - Deployed to Vercel and shareable via a single link 