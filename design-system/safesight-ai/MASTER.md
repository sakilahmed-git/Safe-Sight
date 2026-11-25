# SafeSight AI — Master Design System

> Applied from the supplied `ui-ux-pro-max` workflow. The supplied Markdown describes a searchable local design database and a `search.py` executable, but neither the database nor script was included with the uploaded file. No database match is claimed. This system uses the supplied priority table's built-in defaults as the documented fallback.

## Product and audience

- **Product:** research workspace / computer-vision experiment dashboard.
- **Audience:** student researchers and reviewers inspecting dataset provenance, training state, camera-domain evaluation and reproducibility.
- **Primary tasks:** understand project status, prepare datasets, configure a baseline, compare camera viewpoints and inspect measured metrics.
- **Stack detected from repository:** Next.js App Router, React, TypeScript, CSS modules/global CSS, FastAPI backend.

## Visual direction

- **Style:** precise, restrained research SaaS dashboard; light surfaces, strong hierarchy, calm blue accent, compact but readable data layouts.
- **Density:** standard dashboard density. Use generous spacing around primary decisions and compact rows for repeated metadata.
- **Variance:** low-to-medium. Prefer consistent cards, predictable navigation and restrained emphasis over decorative asymmetry.
- **Motion:** subtle micro-interactions only. Motion communicates hover, focus, selection and navigation state; respect reduced-motion preferences.
- **Theme:** light mode only for this product build.

## Color tokens

| Token | Value | Purpose |
|---|---|---|
| Primary | `#315BDC` | Main actions, active navigation, links |
| Primary strong | `#2448BD` | Hover and pressed primary state |
| Primary soft | `#EDF2FF` | Selected surfaces and icon backgrounds |
| Ink | `#17243B` | Headings and primary text |
| Text | `#34445E` | Secondary content |
| Muted | `#64748B` | Supporting copy |
| Subtle | `#8B98AB` | Tertiary metadata |
| Border | `#E1E7F0` | Card and divider boundaries |
| Background | `#F5F7FB` | Application canvas |
| Surface | `#FFFFFF` | Cards, panels, navigation |
| Success | `#13795B` | Confirmed state only |
| Warning | `#9A5A12` | Pending / attention state |

Use semantic tokens rather than arbitrary color literals in component styling. Never communicate a status using color alone; pair color with a text label.

## Typography

- **UI / headings:** Manrope, with system sans-serif fallback.
- **Technical labels / metadata:** DM Mono, with monospace fallback.
- **Body baseline:** 16px, line-height 1.5.
- **Supporting text:** normally 12px or larger; do not shrink important explanatory copy to fit.
- Use weight and spacing for hierarchy; avoid excessive all-caps text.

## Layout and components

- Fixed desktop sidebar with a sticky top bar; content area is fluid and constrained to a readable maximum width.
- Responsive sidebar becomes an accessible off-canvas navigation on narrow screens.
- Use 12–14px card radii, subtle borders and very restrained shadows.
- Primary actions use filled blue buttons; secondary actions use white surfaces with visible borders.
- Status labels are explicit text. Keep blank metrics blank until backed by actual evaluation data.
- Empty states explain what is missing and what action unlocks the next step.
- Tables remain readable and horizontally scrollable on small screens.

## Interaction and accessibility

- All controls have accessible names and keyboard focus indicators.
- Target minimum interactive height is 44px.
- Provide a skip link and semantic landmarks.
- Use `aria-current` for the active navigation destination and `aria-expanded` for the mobile menu.
- Do not rely on hover-only interactions.
- Respect `prefers-reduced-motion`.
- Maintain readable contrast; muted text must remain legible on white surfaces.
- File selection is clearly described as local staging only until a real upload endpoint exists.

## Data integrity UX

- Never invent dataset counts, model status, performance metrics or completed experiments.
- Label the app as a prototype until the pipeline is connected.
- Show the evaluation domain and its status in text.
- Preserve the distinction between training domain, unseen viewpoints and distance shift.
- A metric appears only when its source run, dataset split and checkpoint can be traced.

## Anti-patterns to avoid

- Fake charts, fabricated percentages or placeholder values that resemble real results.
- Tiny low-contrast body copy.
- Icon-only controls without accessible labels.
- Buttons that appear active but do not perform an action.
- Fixed-width layouts that overflow on mobile.
- Motion that cannot be reduced.
- Emoji used as interface icons.
- Decorative gradients or glass effects that weaken contrast or hierarchy.
