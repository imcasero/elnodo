import { prefersReducedMotion } from "@/lib/env";

const HIDDEN = {
  top: "inset(0 0 100% 0)",
  bottom: "inset(100% 0 0 0)",
  left: "inset(0 100% 0 0)",
  right: "inset(0 0 0 100%)",
} as const;
const SHOWN = "inset(0 0 0 0)";

type Edge = keyof typeof HIDDEN;

/** Nearest edge of `el` to the pointer event — the direction the wipe enters/exits from. */
function nearestEdge(e: PointerEvent, el: HTMLElement): Edge {
  const r = el.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width - 0.5;
  const y = (e.clientY - r.top) / r.height - 0.5;
  if (Math.abs(x) > Math.abs(y)) return x > 0 ? "right" : "left";
  return y > 0 ? "bottom" : "top";
}

/**
 * Directional clip-path wipe on `.team-card`: the pre-rendered dark copy
 * (`.team-card__hover`) is revealed from the edge the pointer crossed, so
 * the text flips crisply with the wipe. CSS handles the reduced-motion and
 * no-JS fallbacks.
 */
export function initTeamCardWipe(): void {
  if (prefersReducedMotion()) return;

  document.querySelectorAll<HTMLElement>(".team-card").forEach((card) => {
    const layer = card.querySelector<HTMLElement>(".team-card__hover");
    if (!layer) return;

    card.addEventListener("pointerenter", (e) => {
      layer.style.transition = "none";
      layer.style.clipPath = HIDDEN[nearestEdge(e, card)];
      void layer.offsetWidth; // flush the start position before animating
      layer.style.transition = "";
      layer.style.clipPath = SHOWN;
    });

    card.addEventListener("pointerleave", (e) => {
      layer.style.clipPath = HIDDEN[nearestEdge(e, card)];
    });
  });
}
