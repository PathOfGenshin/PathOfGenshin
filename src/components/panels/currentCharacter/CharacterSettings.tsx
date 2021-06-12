import Image from "next/image"

import { identity, range } from "lodash"
import { useQuery } from "react-query"

import { elementalIcon } from "@/assets/static"
import DropdownSelector from "@/components/genshin/dropdown"
import { querySingleSkillDepot, querySkillDepots } from "@/db"
import { Ascension } from "@/generated/model/ascension"
import {
  Character,
  CharacterSkillDepot,
  VisionType,
} from "@/generated/model/characters"
import { useAppDispatch } from "@/store/hooks"
import { CharacterConfig, ConstellationLevel } from "@/store/party/characterConfig"
import {
  setAscension,
  setConstellationLevel,
  setLevel,
  setSkillDepot,
} from "@/store/party/partySlice"

import RemoveFromPartyButton from "./RemoveFromPartyButton"

interface CharacterSettingsProps {
  character: Character
  config: CharacterConfig
}

const skillDepotOptions = (
  availableSkillDepots: CharacterSkillDepot[],
): Array<CharacterSkillDepot | null> => [null, ...availableSkillDepots]

interface SkillDepotValueProps {
  element: VisionType
}

const SkillDepotValue: React.FC<SkillDepotValueProps> = ({
  element,
}: SkillDepotValueProps) => {
  return (
    <span className="flex items-center min-w-0">
      <span className="flex-shrink-0 w-5 h-5">
        <Image src={elementalIcon(element)} width={32} height={32} />
      </span>
      <span className="px-2 truncate">{element}</span>
    </span>
  )
}

const CharacterSettings: React.FC<CharacterSettingsProps> = ({
  character,
  config,
}: CharacterSettingsProps) => {
  const dispatch = useAppDispatch()
  const { data: skillDepot, isSuccess: skillDepotLoaded } = useQuery(
    ["skillDepot", character.id, config.skillDepot?.id ?? null],
    querySingleSkillDepot(config?.skillDepot?.id ?? null),
  )

  const { data: availableSkillDepots, isSuccess: availableSkillDepotsLoaded } =
    useQuery(["skillDepots", character.id], querySkillDepots(character.skillDepotIds))

  const selectedSkillDepotValue = (
    skillDepot: CharacterSkillDepot | null,
  ): React.ReactNode => (
    <SkillDepotValue element={skillDepot?.element ?? VisionType.None} />
  )

  const onSelectedAscension = (ascension: Ascension): void => {
    const prevIndex: number = ascension.ascensionLevel - 1
    dispatch(
      setAscension({
        maxLevel: ascension.maxLevel,
        lowerMaxLevel: prevIndex >= 0 ? character.ascensions[prevIndex].maxLevel : 1,
      }),
    )
  }

  const onSelectedLevel = (level: number): void => {
    dispatch(setLevel(level))
  }

  const ascensionLevelValue = (a: Ascension): number => a.maxLevel

  const onSelectedConstellationLevel = (
    constellationLevel: ConstellationLevel,
  ): void => {
    dispatch(setConstellationLevel(constellationLevel))
  }

  const onSelectedSkillDepot = (skillDepot: CharacterSkillDepot | null): void => {
    dispatch(
      setSkillDepot(
        skillDepot
          ? {
              id: skillDepot.id,
              element: skillDepot.element,
            }
          : null,
      ),
    )
  }

  return (
    <div className="relative space-y-4 w-full font-genshin">
      <div className="flex flex-wrap justify-between items-center w-full">
        <h2 className="text-2xl tracking-tight">Character Settings</h2>
        <RemoveFromPartyButton characterId={character.id} />
      </div>
      {availableSkillDepotsLoaded && availableSkillDepots ? (
        <DropdownSelector
          label="Skill Set"
          width="md"
          selected={
            availableSkillDepots.find(
              (skillDepot) => skillDepot.id === config.skillDepot?.id,
            ) ?? null
          }
          options={skillDepotOptions(availableSkillDepots)}
          onSelected={onSelectedSkillDepot}
          buttonValue={selectedSkillDepotValue}
          optionValue={selectedSkillDepotValue}
          disabled={availableSkillDepots.length <= 1}
        />
      ) : (
        <div className="h-10" />
      )}
      <div className="flex flex-wrap items-center space-x-8">
        <DropdownSelector
          label="Level"
          width="sm"
          selected={config.level}
          options={range(config.lowerMaxLevel, config.maxLevel + 1)}
          onSelected={onSelectedLevel}
          buttonValue={identity}
          optionValue={identity}
        />
        <DropdownSelector
          label="Max Level"
          width="sm"
          selected={
            character.ascensions.find((a) => a.maxLevel === config.maxLevel) ??
            character.ascensions[0]
          }
          options={character.ascensions}
          onSelected={onSelectedAscension}
          buttonValue={ascensionLevelValue}
          optionValue={ascensionLevelValue}
        />
        {skillDepotLoaded && (
          <DropdownSelector
            label="Constellations"
            width="sm"
            selected={
              skillDepot && config.skillDepot
                ? config.skillSets[config.skillDepot.id].constellationLevel
                : 0
            }
            options={
              range(
                0,
                (skillDepot?.constellations.length ?? 0) + 1,
              ) as ConstellationLevel[]
            }
            onSelected={onSelectedConstellationLevel}
            buttonValue={identity}
            optionValue={identity}
          />
        )}
      </div>
    </div>
  )
}

export default CharacterSettings
