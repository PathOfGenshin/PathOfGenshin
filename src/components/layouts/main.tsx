import { NavBar, Footer } from "@/components"

import { LayoutProps } from "./types"

const MainLayout: React.FC<LayoutProps> = ({ children }: LayoutProps) => {
  return (
    <div className="flex relative flex-col min-h-screen lg:min-h-0 lg:h-screen">
      <NavBar className="absolute w-full h-16 shadow-sm" />
      <div className="flex-1 pt-16 pb-12 h-full box-border">{children}</div>
      <Footer className="absolute bottom-0 w-full lg:h-12" />
    </div>
  )
}

export default MainLayout
