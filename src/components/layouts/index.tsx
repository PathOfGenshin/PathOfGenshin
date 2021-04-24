import NavBar from "@/components/navbar"
import ThemeProvider from "@/components/theme/themeContext"

export interface LayoutProps {
  children: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }: LayoutProps) => {
  return (
    <ThemeProvider>
      <div className="flex flex-col h-screen">
        <NavBar />
        <div className="flex-grow bg-gray-200 dark:bg-g-dark-900 dark:text-g-dark-0">
          {children}
        </div>
      </div>
    </ThemeProvider>
  )
}

export default Layout
