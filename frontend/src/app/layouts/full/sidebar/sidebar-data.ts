import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Dashboard',
    iconName: 'solar:atom-line-duotone',
    route: '/dashboard',
    roles: ['user', 'manager', 'mecanicien']
  },
  {
    displayName: 'Rendez-vous',
    iconName: 'solar:atom-line-duotone',
    route: '/client/appointments',
    roles: ['user']
  },
  {
    displayName: 'Rendez-vous',
    iconName: 'solar:atom-line-duotone',
    route: '/manager/appointments',
    roles: ['manager']
  },
  {
    displayName: 'Services',
    iconName: 'solar:atom-line-duotone',
    route: '/manager/services',
    roles: ['manager']
  },
  {
    navCap: 'Equipe',
    divider: true,
    roles: ['manager']
  },
  {
    displayName: 'Mécaniciens',
    iconName: 'solar:archive-minimalistic-line-duotone',
    route: '/manager/mechanics',
    roles: ['manager']
  },
];
