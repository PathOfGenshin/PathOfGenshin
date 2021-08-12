import clsx from "clsx"

import { Footer, NavBar } from "@/components"
import { useAppSelector } from "@/store/hooks"
import { selectUseCustomCursor } from "@/store/settings/settingsSlice"
import cursor from "@/styles/cursor.module.scss"

import { LayoutProps } from "./types"

export const MainLayout: React.FC<LayoutProps> = ({ children }: LayoutProps) => {
  const customCursor: boolean = useAppSelector(selectUseCustomCursor)

  return (
    <div
      className={clsx(
        "flex relative flex-col min-h-screen lg:min-h-0 lg:h-screen",
        customCursor ? cursor.cursor : "",
      )}
    >
      <NavBar className="absolute w-full h-16 shadow-sm" />
      <div className="flex-1 pt-16 pb-12 h-full box-border">{children}</div>
      <Footer className="absolute bottom-0 w-full lg:h-12" />
    </div>
  )
}
