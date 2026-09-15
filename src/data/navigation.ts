import type { NavLink } from "@/types";
import { hasProjects } from "@/data/projects";

export const navLinks: NavLink[] = [
  { href: "#nosotros", label: "Nosotros" },
  { href: "#servicios", label: "Servicios" },
  ...(hasProjects ? [{ href: "#proyectos", label: "Proyectos" }] : []),
  { href: "#proceso", label: "Proceso" },
  { href: "#contacto", label: "Contacto" },
];
