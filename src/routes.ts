export interface Route {
  name: string
  path: string
}

export const routes: Route[] = [
  {
    name: "Calculator",
    path: "/",
  },
  {
    name: "About",
    path: "/about",
  },
]
