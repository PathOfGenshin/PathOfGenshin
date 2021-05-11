export interface Route {
  name: string
  path: string
}

export const routes: Route[] = [
  {
    name: "Calculator",
    path: "/calculator",
  },
  {
    name: "About",
    path: "/about",
  },
]
