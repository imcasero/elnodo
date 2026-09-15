export interface NavLink {
  href: string;
  label: string;
}

export interface SocialLink {
  name: string;
  href: string;
  /** Single SVG path `d` attribute, drawn in a 24×24 viewBox. */
  icon: string;
}

export interface Service {
  number: string;
  title: string;
  description: string;
  features: string[];
}

export interface Project {
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
  href: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  website?: string;
}

export interface Value {
  label: string;
  title: string;
  description: string;
}
