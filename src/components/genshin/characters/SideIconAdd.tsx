import clsx from "clsx"

import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { selectCurrentTab, setTab, TabFocus } from "@/store/tab/tabSlice"
import { PlusIcon } from "@heroicons/react/solid"

const SideIconAdd: React.FC = () => {
  const currentTab: TabFocus = useAppSelector(selectCurrentTab)
  const dispatch = useAppDispatch()

  const switchToCharacterSelection = (): void => {
    dispatch(setTab(TabFocus.PARTY_ADD_CHARACTER))
  }

  return (
    <button
      className={clsx(
        "relative flex items-center justify-center w-24 h-24 transition duration-100 transform text-g-dark-2 hover:text-g-char-selected focus:outline-none hover:scale-110 focus:scale-110 focus:text-g-char-selected",
        currentTab === TabFocus.PARTY_ADD_CHARACTER ? "text-g-char-selected" : "",
      )}
      onClick={switchToCharacterSelection}
    >
      <div className="flex items-center justify-center border-4 border-current rounded-full w-18 h-18">
        <PlusIcon className="w-8 h-8 text-g-dark-800 dark:text-g-dark-0" />
      </div>
    </button>
  )
}

export default SideIconAdd
