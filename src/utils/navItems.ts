export interface NavItem {
  label: string
  path: string
  showOnHome?: boolean
  showOnDefault?: boolean
}

export const navItems: NavItem[] = [
  { label: 'Home', path: '/', showOnDefault: true },
  { label: 'About Me', path: '/about', showOnHome: true, showOnDefault: true },
  { label: 'Projects', path: '/projects', showOnHome: true, showOnDefault: true },
  { label: 'Research', path: '/research', showOnHome: true, showOnDefault: true },
  { label: 'Contact', path: '/contact', showOnHome: true, showOnDefault: true },
  { label: 'Log in', path: '/login', showOnHome: true, showOnDefault: true },
  { label: 'Mi perfil', path: '/profile', showOnHome: true, showOnDefault: true }
]