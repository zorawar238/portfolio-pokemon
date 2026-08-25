# AI Agent Rules for This Project

These rules apply to any AI coding agent working on this portfolio project.

## Core Promise

I will preserve the project’s intent:

- A Pokémon-inspired developer portfolio
- Interactive, polished, and memorable
- Professional first, playful second
- Responsive-first and accessibility-aware

---

## Non-Negotiable Rules

1. Preserve existing behavior unless the user explicitly asks to change it.
2. Make the smallest change that solves the task.
3. Do not remove features unless they are broken or the user requests removal.
4. Do not invent content, projects, awards, links, or personal details.
5. Do not invent assets, artwork, icons, images, sounds, or logos.
6. Do not silently change the visual direction of the project.
7. Do not introduce unnecessary complexity.
8. Do not make destructive changes without explicit permission.
9. Ask before ambiguous changes that could affect content, structure, or data meaning.
10. Treat all placeholder content as temporary and clearly separate it from final content.

---

## Product and Design Rules

1. Keep the Pokémon-inspired concept recognizable throughout the experience.
2. Preserve the trainer / dex / journey framing.
3. Keep the interface elegant, not childish.
4. Use motion with purpose, not decoration for its own sake.
5. Ensure the desktop experience is rich and deliberate.
6. Ensure the mobile experience remains fully usable and uncluttered.
7. Avoid generic portfolio patterns when the project can support a more distinctive approach.
8. Maintain visual hierarchy so content is always easy to scan.
9. Protect readability before stylization.
10. Make interactive states obvious and consistent.

---

## Responsive-First Rules

1. Design for mobile and small screens first, then enhance for larger screens.
2. Never rely on hover as the only way to reveal important information.
3. Never require precise pointer movement for essential actions.
4. Use layouts that naturally collapse to a single-column flow when needed.
5. Keep touch targets comfortably large.
6. Make text readable without zooming.
7. Test awkward screen widths and not just common breakpoints.

---

## Accessibility Rules

1. Use semantic HTML and sensible heading order.
2. Maintain visible focus indicators for keyboard users.
3. Ensure color contrast stays readable in all states.
4. Provide labels for form fields, controls, and icon-only actions.
5. Support reduced-motion preferences.
6. Never trap keyboard focus unless the UI intentionally opens a modal or drawer and handles it correctly.
7. Do not depend on color alone to convey status.
8. Make screen-reader behavior intentional, not accidental.

---

## Performance Rules

1. Prefer lightweight implementation over heavy effects.
2. Avoid unnecessary rerenders and expensive work in the main interaction path.
3. Load non-critical visuals lazily when appropriate.
4. Optimize images and media before shipping them.
5. Keep animation smooth and bounded.
6. Do not add libraries unless they clearly solve a real problem.
7. Do not let decorative effects slow down navigation or content access.

---

## Content Integrity Rules

1. Never fabricate experience, employers, certifications, awards, or project outcomes.
2. Never assume missing data.
3. Mark unknown values as placeholders instead of guessing.
4. If project details are incomplete, ask for the missing information or add explicit TODO placeholders.
5. Keep personal contact data private and intentional.
6. Treat all external links as user-provided facts that must be verified before use.

---

## Code Quality Rules

1. Keep components focused and reusable.
2. Name things clearly and consistently.
3. Prefer readable code over clever code.
4. Avoid duplication when a small abstraction improves clarity.
5. Keep data and presentation separated when possible.
6. Write code that is easy to extend with new projects, skills, and timeline entries.
7. Preserve consistency across sections, cards, and detail views.

---

## Testing and Verification Rules

1. Verify the changed behavior after each meaningful edit.
2. Test responsive behavior, especially at mobile widths.
3. Check keyboard navigation for any interactive UI.
4. Validate that animations do not break usability.
5. Verify that links, buttons, and navigation targets still work.
6. Confirm that content still renders correctly with placeholder and final data.
7. If a change affects layout, inspect both desktop and mobile states.

---

## Security Rules

1. Do not add insecure patterns just to move faster.
2. Sanitize or safely render any user-supplied content.
3. Avoid exposing secrets, tokens, or private data in the UI.
4. Treat forms and external inputs carefully.
5. Do not weaken security or privacy for aesthetic reasons.

---

## Change Management Rules

1. Make changes incrementally.
2. Explain the impact of non-trivial changes.
3. Before broad structural edits, confirm the intended direction if the request is ambiguous.
4. Before deleting, replacing, or rewriting major sections, ask first unless the user explicitly requested it.
5. Prefer additive edits when the intent is unclear.
6. Do not silently reshape the architecture.
7. Keep diffs focused and reviewable.

---

## When to Stop and Ask

Ask the user before proceeding if:

1. A requested change could remove existing functionality.
2. The change depends on missing content or missing design direction.
3. A change would alter the site’s concept, tone, or structure in a material way.
4. The edit requires choosing between multiple valid interpretations with different outcomes.
5. The change would require destructive file operations or data loss.

---

## Implementation Promise

When working on this project, I promise to:

- Respect the portfolio concept
- Protect usability
- Preserve existing work
- Keep changes incremental
- Avoid hallucinated details
- Deliver clean, maintainable code
- Verify behavior before considering work complete

