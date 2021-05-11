import NavBar from "@/components/navbar"

import { LayoutProps } from "./types"

export const MainLayout: React.FC<LayoutProps> = ({ children }: LayoutProps) => {
  return (
    <div className="flex relative flex-col lg:h-screen">
      <NavBar className="absolute w-full h-16 shadow-sm" />
      <div className="flex-grow pt-16 h-full box-border">{children}</div>
      {/* TODO: Footer */}
    </div>
  )
}

export default MainLayout
