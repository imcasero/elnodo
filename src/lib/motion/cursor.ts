import { isCoarsePointer, prefersReducedMotion } from "@/lib/env";

const LAG = 0.16;

/**
 * Custom cursor: a crisp dot that tracks 1:1 and a ring that trails with
 * easing. Interactive elements grow the ring; `data-cursor-label` swaps it
 * for a filled pill with a caption.
 */
export function initCursor(): void {
  if (isCoarsePointer()) return;

  const dot = document.getElementById("cursor-dot");
  const ring = document.getElementById("cursor-ring");
  const label = document.getElementById("cursor-label");
  if (!dot || !ring || !label) return;

  const reduce = prefersReducedMotion();
  let mx = innerWidth / 2;
  let my = innerHeight / 2;
  let rx = mx;
  let ry = my;

  addEventListener("pointermove", (e) => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.transform = `translate(${mx}px, ${my}px)`;
    label.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
  });

  const tick = () => {
    rx += (mx - rx) * (reduce ? 1 : LAG);
    ry += (my - ry) * (reduce ? 1 : LAG);
    ring.style.transform = `translate(${rx}px, ${ry}px)`;
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);

  const interactive = "a, button, input, textarea, select, label, [data-cursor]";
  document.querySelectorAll<HTMLElement>(interactive).forEach((el) => {
    const caption = el.dataset.cursorLabel;
    el.addEventListener("pointerenter", () => {
      if (caption) {
        ring.dataset.variant = "label";
        label.textContent = caption;
        label.classList.add("is-visible");
      } else {
        ring.dataset.variant = "hover";
      }
    });
    el.addEventListener("pointerleave", () => {
      delete ring.dataset.variant;
      label.classList.remove("is-visible");
    });
  });

  addEventListener("mouseout", (e) => {
    if (e.relatedTarget) return;
    dot.style.opacity = "0";
    ring.style.opacity = "0";
  });
  addEventListener("mouseover", () => {
    dot.style.opacity = "1";
    ring.style.opacity = "1";
  });
}
