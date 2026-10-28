export type Locale = "fr" | "en";

export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

export interface ClientLogo {
  name: string;
  src: string;
  width: number;
  height: number;
}

export interface Slide {
  image: string;
  alt: string;
  caption: string;
}

export interface FeatureStat {
  value?: number;
  suffix?: string;
  text: string;
}

export interface Step {
  label: string;
  title: string;
  text: string;
  tone: "light" | "dark";
}

export type PortageIcon = "shield" | "document" | "clock" | "exchange";

export interface PortageCard {
  icon: PortageIcon;
  title: string;
  text: string;
  tags?: string[];
}

export interface FeedbackItem {
  author: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  sector: string;
}
