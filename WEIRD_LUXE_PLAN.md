# Implementation Plan: UI Overhaul - The Weird-Luxe Pivot (2026)

## 1. Vision & Narrative
Transform the Illinois Cannabis Directory from a sterile SaaS dashboard into a **"Weird-Luxe" cultural repository**. This aesthetic merges high-fidelity glassmorphism with 1970s psychedelic grit, creating a vibe that feels like a vintage high-end headshop in deep space.

## 2. Design Tokens (The Palette)
- **Base**: `luxe-midnight` (#0a0b10) - A deep, murky "Bong Water" blue-black.
- **Neon Primary**: `weird-lime` (#b7ff00) - Fluorescent green for primary accents and "QC Stamps".
- **Luxe Accent**: `trippy-pink` (#ff00d4) - Bubblegum pink for micro-highlights and "Liquid" hover states.
- **Texture**: 10% opacity SVG noise overlay to simulate 70s film grain.

## 3. Component Architecture Refactor
### A. The "Sticker-Wall" Grid
- **Columns**: Maintain the 2-column masonry grid.
- **Staggering**: Every nth card will have a `rotate-[1deg]` or `rotate-[-1deg]`.
- **Borders**: 4px heavy offset borders (`shadow-[4px_4px_0px_0px_rgba(183,255,0,0.3)]`).

### B. Cultivator Cards (Frosted Glass)
- **Glassmorphism**: Increase blur and reduce background opacity.
- **Hover Micro-Interaction**: Implementation of the `ripple` keyframe. On hover, the card will scale, rotate slightly, and cycle through a subtle `hue-rotate`.

### C. Groovy Iconography
- Replace Lucide icons with custom SVG paths or decorative doodle elements:
    - **Website**: A melting globe.
    - **Instagram**: A retro camera with a third eye.
    - **LinkedIn**: A wizard mascot in a business suit.

## 4. Source of Truth (Data Protection)
- **QC Stamps**: The `(Partner)` suffix will be wrapped in a custom component that mimics a physical "Quality Control" stamp from a 1975 laboratory.
- **Constraint**: No data from `market-data.json` will be altered; only the visual presentation of these strings will change.

## 5. Implementation Steps
1. **CSS Root Update**: Inject the new color tokens and keyframes into `index.css`.
2. **Global Noise Filter**: Add a fixed background overlay for the film-grain effect.
3. **Typography Injection**: Import a psychedelic-inspired font (e.g., "Bungee" or "Syne" with custom warping).
4. **Card Refactor**: Update `CultivatorCard` in `App.tsx` with the new border-accent and liquid hover logic.
5. **Validator Verification**: Run `validate_data.py` to ensure branding strings remain compliant.
