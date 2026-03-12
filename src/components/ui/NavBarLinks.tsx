export interface NavBarLink {
  name: string;
  path: string;
}

export const NavBarLinks: NavBarLink[] = [
  { name: "About", path: "/about" },
  { name: "Platform's policy", path: "/platformpolicy" },
  { name: "Privacy Policy", path: "/privacy" },
];