const SCROLLED_AT = 40;
const SCROLLED_CLASSES = ["bg-dark/70", "backdrop-blur-xl", "border-b", "border-white/10"];

function initScrollState(): void {
  const header = document.getElementById("site-header");
  if (!header) return;

  const sync = () => {
    const scrolled = window.scrollY > SCROLLED_AT;
    SCROLLED_CLASSES.forEach((cls) => header.classList.toggle(cls, scrolled));
  };

  addEventListener("scroll", sync, { passive: true });
  sync();
}

function initMobileMenu(): void {
  const openBtn = document.getElementById("menu-open") as HTMLButtonElement | null;
  const closeBtn = document.getElementById("menu-close") as HTMLButtonElement | null;
  const menu = document.getElementById("mobile-menu");
  if (!openBtn || !closeBtn || !menu) return;

  const setOpen = (open: boolean) => {
    menu.classList.toggle("hidden", !open);
    menu.setAttribute("aria-hidden", String(!open));
    openBtn.setAttribute("aria-expanded", String(open));
    (open ? closeBtn : openBtn).focus();
  };

  openBtn.addEventListener("click", () => setOpen(true));
  closeBtn.addEventListener("click", () => setOpen(false));
  menu.querySelectorAll("a").forEach((link) =>
    link.addEventListener("click", () => setOpen(false)),
  );

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !menu.classList.contains("hidden")) setOpen(false);
  });

  // Focus trap
  menu.addEventListener("keydown", (e) => {
    if (e.key !== "Tab") return;
    const focusable = menu.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });
}

export function initHeader(): void {
  initScrollState();
  initMobileMenu();
}
