import { useAppDispatch } from "@/store/hooks"
import { setTab, TabFocus } from "@/store/tab/tabSlice"
import { PlusIcon } from "@heroicons/react/solid"

const SideIconAdd: React.FC = () => {
  const dispatch = useAppDispatch()
  const switchToCharacterSelection = (): void => {
    dispatch(setTab(TabFocus.PARTY_ADD_CHARACTER))
  }

  return (
    <button
      className="relative flex items-center justify-center w-24 h-24 transition-transform duration-100 transform focus:outline-none hover:scale-110"
      onClick={switchToCharacterSelection}
    >
      <div className="flex items-center justify-center border-4 rounded-full border-g-dark-2 w-18 h-18">
        <PlusIcon className="w-8 h-8 text-g-dark-800 dark:text-g-dark-0" />
      </div>
    </button>
  )
}

export default SideIconAdd
