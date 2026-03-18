# Agents & Libraries

## Styling

CSS modules are the default styling approach for the active `v2` surface.

### Usage pattern
- Colocate a `*.module.css` file with each component when the styling is component-specific.
- Use `src/app/styles.css` only for global tokens, resets, and truly app-wide primitives.
- Prefer native HTML elements for simple interactions such as links, icon buttons, and forms unless a more specialized accessibility primitive is clearly needed.

---

## lucide-react

[lucide-react](https://lucide.dev) is installed and is the preferred source for all icons in this project. Do not write inline SVGs when a Lucide icon exists for the purpose.

### Why
Lucide provides a consistent, well-maintained icon set with a clean, minimal stroke style that fits the design aesthetic. Icons are tree-shaken — only imported icons are bundled.

### Usage pattern
Import named icons directly. Size is controlled via props and visual styling should come from CSS modules or direct `className` hooks.

```tsx
import { ChevronLeft, Play, ArrowDown } from "lucide-react";

<ChevronLeft size={16} className={styles.icon} />
<Play size={20} className={styles.playIcon} />
<ArrowDown size={20} className={styles.scrollIcon} />
```

### When NOT to use it
- Brand/platform logos (YouTube, Spotify, Instagram, etc.) — use the `/public/*.svg` asset files via `next/image`, as Lucide does not include brand icons.

### Current usage in this project
- `HeroSection.tsx` — `ArrowDown` for the scroll indicator
- `VideoCard.tsx` — `Play` for the thumbnail hover overlay
- `VideosSection.tsx` — `ChevronLeft`, `ChevronRight` for carousel prev/next buttons
