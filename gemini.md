Act as a Senior Creative Frontend Developer. I have deleted all my previous components and need to start fresh. 

I have attached an image of a layout I want to recreate. 

### Task 1: Initialize the App Structure
- Create a clean `App.jsx` that acts as the main wrapper. Do not use the Bootstrap CSS framework; use only Tailwind CSS v4.
- **The Scroll Architecture:** To achieve a "Scrollytelling" effect, make the main container extremely tall (e.g., `h-[300vh]`). Inside it, create a wrapper with `position: sticky; top: 0; h-screen; overflow: hidden;` so the view stays locked while the user scrolls down the tall container.

### Task 2: Apply My Brand Guidelines (CRITICAL)
- Read my `gemini.md` and `brand-guideline.md` files.
- Do NOT use the colors from the attached image. You MUST use my new palette: 
  - Prussian Blue (`#003049`) for the main background.
  - Vivid Orange (`#F77F00`) and Deep Red (`#D62828`) for accents, glowing borders, and buttons.
  - Pure White or Off-White for text readability.
- Apply 'Inter' for headings and 'Roboto' for paragraph text.

## 3. Site Architecture & Layout Strategy
- **Layout Source of Truth:** The specific visual layout (columns, grids, placement of elements) will be provided via UI screenshots in the prompt. You MUST replicate the structure of the provided screenshots exactly.
- **Global Background (`<ParticleBackground />`):** An interactive, fixed HTML5 Canvas (`z-index: -1`).
- **Component Structure:** - Break the provided screenshot down into modular React components (e.g., `<Navbar />`, `<Hero />`, `<About />`).
  - `App.jsx` serves as the main layout wrapper containing the background and rendering the scrollytelling sections.
- **UI Style:** Apply a premium glassmorphism aesthetic (translucent cards with heavy blur and subtle borders) to the structural elements you pull from the screenshot.

### Task 4: Build the "Scrollytelling" Components
- Break the layout in the attached image down into functional React components (e.g., `<Hero />`, `<About />`, `<Skills />`).
- **Scroll Animations:** Use Framer Motion's `useScroll` and `useTransform` hooks. Map the `scrollYProgress` of the main container to the `opacity`, `scale`, and `y` positions of these components.
  - As the user scrolls down, the Hero text should fade out and scale up.
  - The next sections (About, Skills) should slide in smoothly from the bottom or sides as the scroll progresses.
- Wrap the cards in a dark glassmorphism style (e.g., `bg-white/5 backdrop-blur-md border border-[#F77F00]/20`) so the deep blue space background shows through beautifully.

Please provide the code for `App.jsx`, `<ParticleBackground />`, and the scroll-animated layout components based on the attached image.