import { NavItem } from "@/types/navigation";

export const MAIN_NAV_ITEMS: NavItem[] = [
  { label: "HOME", href: "/" },
  { label: "FOUNDER", href: "/about" },
  { label: "PROVEN OPERATIONS", href: "/services", active: true },
  { label: "CONTACT", href: "/contact" },
  { label: "CAREERS", href: "/careers" },
  { label: "VTKF & SG", href: "/training" },
  { label: "AERIAL RECON", href: "/aerial" },
];

export const FOOTER_SECTIONS = [
  {
    title: "OPERATIONS & SERVICES",
    links: [
      { label: "Aerial Reconnaissance & Drone Overwatch", href: "/aerial" },
      { label: "Executive & VIP Close Protection", href: "/services#executive-protection" },
      { label: "High-Stakes Combat & Event Security (BKFC)", href: "/services#event-security" },
      { label: "Commercial & Maritime Asset Patrol", href: "/services#commercial-patrol" },
      { label: "Rapid Armed Tactical Dispatch", href: "/dispatch" },
      { label: "Threat Assessment & Vulnerability Audit", href: "/consultation" },
    ],
  },
  {
    title: "ACADEMY & COMBATIVES",
    links: [
      { label: "Ving Tsun Law Enforcement Combatives", href: "/training" },
      { label: "Edged & Impact Weapon Defenses", href: "/training" },
      { label: "Executive Protection Agent Certification", href: "/training" },
      { label: "Firearms Transition & CQB Tactics", href: "/training" },
    ],
  },
  {
    title: "ORGANIZATION",
    links: [
      { label: "Founder Ethos & Ranger Lineage", href: "/#founder" },
      { label: "Operational Readiness Matrix", href: "/operations" },
      { label: "Veteran Careers & Vetting", href: "/careers" },
      { label: "Situational Field Intel", href: "/intel" },
    ],
  },
];
