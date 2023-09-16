export const apiRoutes = {
  getCategories: '/categories',
  getCategory: '/categories/:slug',
  getProduct: '/products/:slug',
  addReview: '/reviews/:productId',
  getCartData: '/cart',
  addToCart: '/cart/add',
  updateCartProduct: '/cart/edit',
  deleteCartProduct: '/cart',
  signIn: '/auth/sign-in',
  signUp: '/auth/sign-up',
  signOut: '/auth/sign-out',
  getMe: '/auth/profile',
  getUser: '/users/:userId',
  updateUser: '/users/:userId',
  getOrders: '/orders/user/:userId'
};
