import NavBar from "@/components/navbar"

export interface LayoutProps {
  children: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }: LayoutProps) => {
  return (
    <div className="relative flex flex-col lg:h-screen">
      <NavBar className="absolute w-full h-16 shadow-sm" />
      <div className="box-border flex-grow h-full pt-16">{children}</div>
    </div>
  )
}

export default Layout
