import NavBar from "@/components/navbar"
import ThemeProvider from "@/components/theme/themeContext"

export interface LayoutProps {
  children: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }: LayoutProps) => {
  return (
    <ThemeProvider>
      <NavBar />
      <main className="bg-gray-200 dark:bg-g-dark-900 dark:text-g-dark-0 ">
        <div className="container p-4 mx-auto">{children}</div>
      </main>
    </ThemeProvider>
  )
}

export default Layout
