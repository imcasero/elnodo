/**
 * Adds `is-in` to `.reveal` / `.reveal-lines` elements as they enter the
 * viewport, once. The actual transitions live in CSS.
 */
export function initReveal(): void {
  const els = document.querySelectorAll(".reveal, .reveal-lines");
  if (!els.length) return;

  if (!("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("is-in"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-in");
        observer.unobserve(entry.target);
      }
    },
    { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
  );

  els.forEach((el) => observer.observe(el));
}
