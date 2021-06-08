import { useCallback } from "react"

import { identity, range } from "lodash"
import { useQuery } from "react-query"

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

  const selectedSkillDepotValue = useCallback(
    (skillDepot) => skillDepot?.element ?? VisionType.None,
    [],
  )

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

  const onSelectedConstellationLevel = useCallback(
    (constellationLevel: ConstellationLevel): void => {
      dispatch(setConstellationLevel(constellationLevel))
    },
    [dispatch],
  )

  const onSelectedSkillDepot = useCallback(
    (skillDepot: CharacterSkillDepot | null): void => {
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
    },
    [dispatch],
  )

  return (
    <div className="relative space-y-4 w-full font-genshin">
      <div className="flex flex-wrap justify-between items-center w-full">
        <h2 className="text-2xl tracking-tight">Character Settings</h2>
        <RemoveFromPartyButton characterId={character.id} />
      </div>
      {availableSkillDepotsLoaded && availableSkillDepots && (
        <>
          <div>Skill Set</div>
          <DropdownSelector
            selected={
              availableSkillDepots.find(
                (skillDepot) => skillDepot.id === config.skillDepot?.id,
              ) ?? null
            }
            options={skillDepotOptions(availableSkillDepots)}
            onSelected={onSelectedSkillDepot}
            buttonValue={selectedSkillDepotValue}
            optionValue={selectedSkillDepotValue}
          />
        </>
      )}
      <div className="flex flex-wrap items-center space-x-8">
        <div className="flex flex-row items-center space-x-4">
          <span>Level</span>
          <DropdownSelector<number>
            selected={config.level}
            options={range(config.lowerMaxLevel, config.maxLevel + 1)}
            onSelected={onSelectedLevel}
            buttonValue={identity}
            optionValue={identity}
          />
        </div>
        <div className="flex flex-row items-center space-x-4">
          <span>Max Level</span>
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
        {skillDepotLoaded && (
          <div className="flex flex-row items-center space-x-4">
            <span>Constellations</span>
            <DropdownSelector<ConstellationLevel>
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
          </div>
        )}
      </div>
    </div>
  )
}

export default CharacterSettings
