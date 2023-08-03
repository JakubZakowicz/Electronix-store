export const routes = {
  root: () => "/",
  categories: (id: number) => `/categories/${id}`,
  products: (id: number) => `/products/${id}`,
  singIn: () => "/sing-in",
  cart: () => "/cart",
  checkout: () => "/checkout"
}