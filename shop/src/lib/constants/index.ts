import { atom } from 'jotai';
import routes from '@/config/routes';

export const CART_KEY = 'pixer-cart';
export const CHECKOUT = 'pixer-checkout';
export const PRODUCTS_PER_PAGE = 30;
export const RTL_LANGUAGES: ReadonlyArray<string> = ['ar', 'he'];
export const LIMIT_HUNDRED = 100;
export const SUPER_ADMIN = 'super_admin';
export const STORE_OWNER = 'store_owner';
export const STAFF = 'staff';
export const TOKEN = 'AUTH_CRED';
export const PERMISSIONS = 'permissions';
export const AUTH_CRED = 'AUTH_CRED_SHOP';
export const checkIsMaintenanceModeComing = atom(false);
export const checkIsMaintenanceModeStart = atom(false);
export const RESPONSIVE_WIDTH = 1024 as number;
export const isMultiLangEnable =
  process.env.NEXT_PUBLIC_ENABLE_MULTI_LANG === 'true' &&
  !!process.env.NEXT_PUBLIC_AVAILABLE_LANGUAGES;
export const checkIsScrollingStart = atom(false);
export const NEWSLETTER_POPUP_MODAL_KEY = 'SEEN_POPUP';

export function getDirection(language: string | undefined) {
  if (!language) return 'ltr';
  return RTL_LANGUAGES.includes(language) ? 'rtl' : 'ltr';
}

export const AuthorizedMenuItems = [
  {
    label: 'text-auth-profile',
    path: routes.profile,
  },
  {
    label: 'text-auth-purchase',
    path: routes.purchases,
  },
  {
    label: 'text-auth-wishlist',
    path: routes.wishlists,
  },
  {
    label: 'text-followed-authors',
    path: routes.followedShop,
  },
  {
    label: 'text-auth-password',
    path: routes.password,
  },
];
