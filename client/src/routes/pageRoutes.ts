export const pageRoutes = {
  root: () => '/',
  categories: (slug: string) => `/categories/${slug}`,
  products: (slug: string) => `/products/${slug}`,
  singIn: () => '/sign-in',
  signUp: () => '/sign-up',
  cart: () => '/cart',
  checkout: () => '/checkout',
  forgotPassword: () => '/forgot-password',
  accountDetails: () => '/account-details',
  editAccountDetails: () => '/account-details/edit',
};
