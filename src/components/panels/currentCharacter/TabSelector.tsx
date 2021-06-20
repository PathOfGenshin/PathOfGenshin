import Image from "next/image"

import clsx from "clsx"

import { uiIcon } from "@/assets/static"
import { setCurrentTab } from "@/store/currentTab/currentTabSlice"
import { useAppDispatch } from "@/store/hooks"

import { TabType } from "./tabs/tabType"

interface TabSelectorProps {
  tab: TabType
  label: string
  isActive?: boolean
  icon: string
}

const TabSelector: React.FC<TabSelectorProps> = ({
  tab,
  label,
  isActive,
  icon,
}: TabSelectorProps) => {
  const dispatch = useAppDispatch()
  const setTab = (): void => {
    dispatch(setCurrentTab(tab))
  }

  return (
    <button
      className={clsx(
        "py-2 px-3 m-1 h-10 text-sm align-middle rounded-sm border-transparent shadow-sm transition duration-100 font-genshin focus:outline-none border-b-3 hover:border-b-3 hover:border-g-dark-2 focus:border-b-3 focus:border-g-dark-1",
        isActive
          ? "text-white border-g-dark-1 hover:border-g-dark-1 focus:border-g-dark-1 bg-g-dark-600"
          : "text-g-paper bg-g-dark-500",
      )}
      onClick={setTab}
    >
      <div className="flex flex-row justify-center items-center">
        <div className="block mr-1 w-6 h-6">
          <Image src={uiIcon(icon)} width={32} height={32} alt={label} />
        </div>
        <span className="font-genshin">{label}</span>
      </div>
    </button>
  )
}

export default TabSelector
