import { EASE_FLUID, isCoarsePointer, prefersReducedMotion } from "@/lib/env";

const DEFAULT_STRENGTH = 0.35;

/**
 * Pulls `[data-magnetic]` elements toward the pointer while hovered.
 * The attribute value (e.g. `data-magnetic="0.4"`) overrides the strength.
 */
export function initMagnetic(): void {
  if (isCoarsePointer() || prefersReducedMotion()) return;

  document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((el) => {
    const strength = Number(el.dataset.magnetic) || DEFAULT_STRENGTH;
    el.style.transition = `transform 0.4s ${EASE_FLUID}`;

    el.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    });
    el.addEventListener("pointerleave", () => {
      el.style.transform = "translate(0, 0)";
    });
  });
}
