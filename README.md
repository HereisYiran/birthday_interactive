# Birthday Interactive Card 🎂

An interactive birthday card built with Next.js, featuring smooth animations and a memory gallery experience.

## Features

- 🎨 Beautiful Bauhaus-inspired design with warm colors
- ✨ Smooth transitions using Framer Motion
- 📸 Interactive memory wall with flip cards
- 🎉 Confetti animation on final screen
- 📱 Fully responsive mobile-first design

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

## Project Structure

```
birthday_interactive/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx             # Main page
│   └── globals.css          # Global styles
├── components/
│   ├── CardFlow.tsx         # State machine for card flow
│   ├── Landing.tsx          # Step 0: Landing screen
│   ├── EnvelopeReveal.tsx   # Step 1: Envelope animation
│   ├── Letter.tsx           # Step 2: Letter view
│   ├── MemoryWallIntro.tsx  # Step 3: Memory wall intro
│   ├── MemoryWall.tsx       # Step 4: Interactive memory wall
│   ├── PhotoFlipCard.tsx    # Flip card component
│   ├── Final.tsx            # Step 5: Final screen
│   └── ui/
│       └── button.tsx       # Button component
├── data/
│   ├── memories.ts          # Memory data
│   └── letter.ts            # Letter content
├── lib/
│   └── utils.ts             # Utility functions
└── public/
    └── memories/            # Memory images (add your photos here)
```

## Adding Your Content

### Memory Images

1. Add your photos to `public/memories/`
2. Name them: `memory1.jpg`, `memory2.jpg`, etc.
3. Update `data/memories.ts` with your custom messages

### Letter Content

Edit `data/letter.ts` to customize the letter text.

### Memory Messages

Edit the `backText` field in `data/memories.ts` for each memory card.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **UI Components:** Custom shadcn-style components
- **TypeScript:** Full type safety

## Deployment

Deploy to Vercel:

```bash
npm install -g vercel
vercel
```

Or connect your GitHub repository to Vercel for automatic deployments.

## License

MIT

