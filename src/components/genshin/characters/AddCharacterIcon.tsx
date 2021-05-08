import clsx from "clsx"

import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { selectCurrentTab, setTab, TabFocus } from "@/store/tab/tabSlice"
import { PlusIcon } from "@heroicons/react/solid"

interface AddCharacterIconProps {
  disabled?: boolean
}

const AddCharacterIcon: React.FC<AddCharacterIconProps> = ({
  disabled,
}: AddCharacterIconProps) => {
  const currentTab: TabFocus = useAppSelector(selectCurrentTab)
  const dispatch = useAppDispatch()

  const switchToCharacterSelection = (): void => {
    dispatch(setTab(TabFocus.PARTY_ADD_CHARACTER))
  }

  return (
    <button
      disabled={disabled}
      className={clsx(
        "flex relative justify-center items-center w-24 h-24 transition duration-100 transform text-g-dark-2 focus:outline-none focus:scale-110 focus:text-g-char-selected",
        currentTab === TabFocus.PARTY_ADD_CHARACTER ? "text-g-char-selected" : "",
        disabled
          ? "opacity-30"
          : "hover:text-g-char-selected hover:scale-110 opacity-100",
      )}
      onClick={switchToCharacterSelection}
    >
      <div className="flex justify-center items-center rounded-full border-4 border-current w-18 h-18">
        <PlusIcon className="w-8 h-8 text-g-dark-800 dark:text-g-dark-0" />
      </div>
    </button>
  )
}

export default AddCharacterIcon
