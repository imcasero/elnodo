import { prefersReducedMotion } from "@/lib/env";

/**
 * Translates `[data-parallax]` elements vertically on scroll. The attribute
 * value is the factor relative to scroll position (e.g. `0.06`, `-0.04`).
 */
export function initParallax(): void {
  if (prefersReducedMotion()) return;

  const items = document.querySelectorAll<HTMLElement>("[data-parallax]");
  if (!items.length) return;

  const update = () => {
    const y = window.scrollY;
    for (const el of items) {
      const factor = Number(el.dataset.parallax) || 0;
      el.style.transform = `translate3d(0, ${y * factor}px, 0)`;
    }
  };

  addEventListener("scroll", update, { passive: true });
  update();
}
