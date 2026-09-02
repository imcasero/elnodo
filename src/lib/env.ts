/** Shared client-side environment queries. */
export const prefersReducedMotion = (): boolean =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const isCoarsePointer = (): boolean =>
  window.matchMedia("(hover: none), (pointer: coarse)").matches;

/** Shared fluid easing curve, mirrors the CSS `--ease-fluid` token. */
export const EASE_FLUID = "cubic-bezier(.16, 1, .3, 1)";
