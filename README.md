# mohanbalaji.in

Personal portfolio of **Badri Mohan Balaji**, full-stack & systems engineer.

Built with React 19, Vite and Tailwind CSS v4. No UI kit and no animation library: the motion, the 3D scene and the project visuals are hand-written.

## Highlights

- **Isometric sandbox cluster** in the hero: a simulated CodeArena scheduler rendered as an orthographic CSS 3D scene. Jobs drop into a 3×3 grid of isolated containers, run, and pass or get killed by their cgroup limits, with a live log underneath. No canvas, no WebGL.
- **Bespoke project visuals**: animated SVG/HTML illustrations for each project (an execution log with a job queue, an accelerometer trace with a pothole spike, a zero-port tunnel topology, a booking UI with conflict detection).
- **Case-study drawer** with focus trapping, Escape to close and previous/next navigation.
- **⌘K command palette** with keyboard navigation, sections, projects and actions.
- **Light and dark themes** from a single token set, switched with a View Transitions circular reveal.
- Respects `prefers-reduced-motion` throughout.

## Develop

```bash
npm install
npm run dev
```

```bash
npm run build && npm run preview
```

## Editing content

All copy lives in [`src/data/portfolio.js`](src/data/portfolio.js): profile, projects, recognition, about, toolkit and lab.

To show a **Résumé** button, add your PDF as `public/resume.pdf` and set `profile.resume = '/resume.pdf'`.

## Structure

```
src/
  data/portfolio.js      content
  lib/                   theme, toast, hooks
  components/
    ui/                  Section, Reveal, Chip, Icons, Toaster
    visuals/             per-project illustrations
    Hero, Work, Recognition, About, Toolkit, Lab, Contact, …
```
# about
