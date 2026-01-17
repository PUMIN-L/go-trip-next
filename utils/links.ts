type NavLink = {
  id: string
  href: string
  label: string
}

export const linksSignedOut: NavLink[] = [
  { id: "home", href: "/", label: "home" },
  { id: "contecUs", href: "/contect", label: "contec us" },
  { id: "products", href: "/products", label: "products" }
]

export const linksSignedIn: NavLink[] = [
  { id: "home", href: "/", label: "home" },
  { id: "contecUs", href: "/contect", label: "contec us" },
  { id: "products", href: "/products", label: "products" },
  { id: "cart", href: "/cart", label: "cart" },
  { id: "orders", href: "/orders", label: "my orders" },
  { id: "myReviews", href: "/my-reviews", label: "my reviews" }
]

export const adminDropdownLinks: NavLink[] = [
  { id: "home", href: "/", label: "home" },
  { id: "contecUs", href: "/contect", label: "contec us" },
  { id: "products", href: "/products", label: "products" },
  { id: "cart", href: "/cart", label: "cart" },
  { id: "orders", href: "/orders", label: "my orders" },
  { id: "adminSales", href: "/admin/sales", label: "sales" },
  {
    id: "adminProductsDropdown",
    href: "/admin/products",
    label: "my products"
  },
  {
    id: "adminProductsCreateDropdown",
    href: "/admin/products/create",
    label: "create product"
  },
  { id: "adminProducts", href: "/admin/products", label: "dashboard" },
  { id: "myReviews", href: "/my-reviews", label: "my reviews" }
]
