import { useCallback } from "react"

import { useRouter } from "next/router"

import { identity, range } from "lodash"

import DropdownSelector from "@/components/genshin/dropdown"
import { Ascension } from "@/generated/model/ascension"
import { Character } from "@/generated/model/characters"
import { useAppDispatch } from "@/store/hooks"
import { CharacterConfig } from "@/store/party/characterConfig"
import { removeCharacterById, setAscension, setLevel } from "@/store/party/partySlice"
import { ArchiveIcon } from "@heroicons/react/solid"

interface CharacterSettingsProps {
  character: Character
  config: CharacterConfig
}

interface RemoveFromPartyButtonProps {
  characterId: number
}

const RemoveFromPartyButton: React.FC<RemoveFromPartyButtonProps> = ({
  characterId,
}: RemoveFromPartyButtonProps) => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const removeFromParty = useCallback(() => {
    dispatch(removeCharacterById(characterId))
    router.back()
  }, [dispatch, characterId, router])

  return (
    <button
      className="py-2 px-4 my-2 h-10 text-sm rounded-full ring-inset transition duration-100 font-genshin text-g-paper bg-g-dark-600 hover:ring hover:ring-g-button-hover focus:outline-none focus:ring focus:ring-g-button-focus-ring focus:bg-g-button-focus focus:text-g-button-focus"
      onClick={removeFromParty}
    >
      <span>
        <ArchiveIcon className="inline-block pr-1 w-5 h-5" /> Remove from party
      </span>
    </button>
  )
}

export const CharacterSettings: React.FC<CharacterSettingsProps> = ({
  character,
  config,
}: CharacterSettingsProps) => {
  const dispatch = useAppDispatch()

  const onSelectedAscension = useCallback(
    (ascension: Ascension): void => {
      const prevIndex: number = ascension.ascensionLevel - 1
      dispatch(
        setAscension({
          maxLevel: ascension.maxLevel,
          lowerMaxLevel: prevIndex >= 0 ? character.ascensions[prevIndex].maxLevel : 1,
        }),
      )
    },
    [character.ascensions, dispatch],
  )

  const onSelectedLevel = useCallback(
    (level: number): void => {
      dispatch(setLevel(level))
    },
    [dispatch],
  )

  const ascensionLevelValue = useCallback((a: Ascension): number => a.maxLevel, [])

  return (
    <div className="relative w-full">
      <div className="flex flex-wrap justify-between items-center w-full">
        <h2 className="my-2 text-2xl tracking-tight font-genshin">
          Character Settings
        </h2>
        <RemoveFromPartyButton characterId={character.id} />
      </div>
      <div className="flex flex-row items-center py-2">
        <span className="pr-4">Level</span>
        <DropdownSelector<number>
          selected={config.level}
          options={range(config.lowerMaxLevel, config.maxLevel + 1)}
          onSelected={onSelectedLevel}
          buttonValue={identity}
          optionValue={identity}
        />
        <span className="pr-4 pl-8">Max Level</span>
        <DropdownSelector<Ascension>
          selected={
            character.ascensions.find((a) => a.maxLevel === config.maxLevel) ??
            character.ascensions[0]
          }
          options={character.ascensions}
          onSelected={onSelectedAscension}
          buttonValue={ascensionLevelValue}
          optionValue={ascensionLevelValue}
        />
      </div>
      <div>Constellations</div>
    </div>
  )
}
