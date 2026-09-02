import { initCursor } from "@/lib/motion/cursor";
import { initMagnetic } from "@/lib/motion/magnetic";
import { initParallax } from "@/lib/motion/parallax";
import { initReveal } from "@/lib/motion/reveal";
import { initTeamCardWipe } from "@/lib/motion/team-card-wipe";
import { initHeader } from "@/lib/ui/header";

function start(): void {
  initHeader();
  initReveal();
  initParallax();
  initCursor();
  initMagnetic();
  initTeamCardWipe();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", start, { once: true });
} else {
  start();
}
