import { useRouter } from "next/router"

import { useAppDispatch } from "@/store/hooks"
import { removeCharacterById } from "@/store/party/partySlice"
import { ArchiveIcon } from "@heroicons/react/solid"

interface RemoveFromPartyButtonProps {
  characterId: number
}

const RemoveFromPartyButton: React.FC<RemoveFromPartyButtonProps> = ({
  characterId,
}: RemoveFromPartyButtonProps) => {
  const dispatch = useAppDispatch()
  const router = useRouter()

  const removeFromParty = (): void => {
    dispatch(removeCharacterById(characterId))
    router.back()
  }

  return (
    <button
      className="py-2 px-4 h-10 text-sm rounded-full ring-inset transition duration-100 font-genshin text-g-paper bg-g-dark-600 hover:ring hover:ring-g-button-hover focus:outline-none focus:ring focus:ring-g-button-focus-ring focus:bg-g-button-focus focus:text-g-button-focus"
      onClick={removeFromParty}
    >
      <span>
        <ArchiveIcon className="inline-block pr-1 w-5 h-5" /> Remove from party
      </span>
    </button>
  )
}

export default RemoveFromPartyButton
