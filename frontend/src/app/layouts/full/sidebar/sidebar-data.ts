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
  {
    navCap: 'Ui Components',
    divider: true,
    roles: ['user', 'mecanicien']
  },
  {
    displayName: 'Badge',
    iconName: 'solar:archive-minimalistic-line-duotone',
    route: '/ui-components/badge',
    roles: ['user', 'mecanicien']
  },
  {
    displayName: 'Chips',
    iconName: 'solar:danger-circle-line-duotone',
    route: '/ui-components/chips',
    roles: ['user', 'mecanicien']
  },
  {
    displayName: 'Lists',
    iconName: 'solar:bookmark-square-minimalistic-line-duotone',
    route: '/ui-components/lists',
    roles: ['user', 'mecanicien']
  },
  {
    displayName: 'Menu',
    iconName: 'solar:file-text-line-duotone',
    route: '/ui-components/menu',
    roles: ['user', 'mecanicien']
  },
  {
    displayName: 'Tooltips',
    iconName: 'solar:text-field-focus-line-duotone',
    route: '/ui-components/tooltips',
    roles: ['user', 'mecanicien']
  },
  {
    displayName: 'Forms',
    iconName: 'solar:file-text-line-duotone',
    route: '/ui-components/forms',
    roles: ['user', 'mecanicien']
  },
  {
    displayName: 'Tables',
    iconName: 'solar:tablet-line-duotone',
    route: '/ui-components/tables',
    roles: ['user', 'mecanicien']
  },

  {
    navCap: 'Extra',
    divider: true,
    roles: ['manager']
  },
  {
    displayName: 'Icons',
    iconName: 'solar:sticker-smile-circle-2-line-duotone',
    route: '/extra/icons',
    roles: ['manager']
  },
  {
    displayName: 'Sample Page',
    iconName: 'solar:planet-3-line-duotone',
    route: '/extra/sample-page',
    roles: ['manager']
  },

  {
    divider: true,
    navCap: 'Auth',
  },
  {
    displayName: 'Login',
    iconName: 'solar:lock-keyhole-minimalistic-line-duotone',
    route: '/authentication',
    children: [
      {
        displayName: 'Login',
         subItemIcon: true,
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: '/authentication/login',
      },
    ],
  },
  {
    displayName: 'Register',
    iconName: 'solar:user-plus-rounded-line-duotone',
    route: '/authentication',
    children: [
      {
        displayName: 'Register',
         subItemIcon: true,
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: '/authentication/register',
      },
    ],
  },
];
