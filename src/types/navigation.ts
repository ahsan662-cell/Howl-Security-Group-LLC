export interface NavItem {
  label: string;
  href: string;
  active?: boolean;
  badge?: string;
  external?: boolean;
}

export interface HeaderConfig {
  brandName: string;
  tagline: string;
  phone: string;
  phoneRaw: string;
  navItems: NavItem[];
}
