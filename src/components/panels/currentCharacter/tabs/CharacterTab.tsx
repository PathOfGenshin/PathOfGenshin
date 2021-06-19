import { identity, range } from "lodash"
import { useQuery } from "react-query"

import { ASCENSION_MAX_TALENT_LEVEL } from "@/components/genshin/characters/ascensions/maxTalentLevel"
import DropdownSelector from "@/components/genshin/dropdown"
import { querySingleSkillDepot, querySkillDepots } from "@/db"
import { Ascension } from "@/generated/model/ascension"
import { SkillType } from "@/generated/model/character_skills"
import { CharacterSkillDepot, VisionType } from "@/generated/model/characters"
import { useAppDispatch } from "@/store/hooks"
import { ConstellationLevel } from "@/store/party/characterConfig"
import {
  setAscension,
  setConstellationLevel,
  setLevel,
  setSkillDepot,
  setSkillLevel,
} from "@/store/party/partySlice"

import SkillDepotValue from "../SkillDepotValue"
import { TabContentProps } from "../TabContent"

const skillDepotOptions = (
  availableSkillDepots: CharacterSkillDepot[],
): Array<CharacterSkillDepot | null> => [null, ...availableSkillDepots]

const CharacterTab: React.FC<TabContentProps> = ({
  character,
  config,
}: TabContentProps) => {
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
        ascensionLevel: ascension.ascensionLevel,
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

  const onSelectedSkillLevel = (skillType: SkillType): ((level: number) => void) => {
    return (level: number): void => {
      dispatch(
        setSkillLevel({
          skillType,
          level,
        }),
      )
    }
  }

  return (
    <div className="space-y-4 w-full">
      <h2 className="text-2xl tracking-tight">Character Settings</h2>
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
      <div className="flex flex-wrap items-center space-x-8">
        {skillDepotLoaded && (
          <>
            <DropdownSelector
              label="Normal Attack"
              width="sm"
              selected={
                skillDepot && config.skillDepot
                  ? config.skillSets[config.skillDepot.id].levelTalentAttack
                  : 1
              }
              options={range(
                1,
                skillDepot ? ASCENSION_MAX_TALENT_LEVEL[config.ascensionLevel] + 1 : 2,
              )}
              onSelected={onSelectedSkillLevel(SkillType.Normal)}
              buttonValue={identity}
              optionValue={identity}
            />
            <DropdownSelector
              label="Skill Attack"
              width="sm"
              selected={
                skillDepot && config.skillDepot
                  ? config.skillSets[config.skillDepot.id].levelTalentSkill
                  : 1
              }
              options={range(
                1,
                skillDepot ? ASCENSION_MAX_TALENT_LEVEL[config.ascensionLevel] + 1 : 2,
              )}
              onSelected={onSelectedSkillLevel(SkillType.Skill)}
              buttonValue={identity}
              optionValue={identity}
            />
            <DropdownSelector
              label="Burst Attack"
              width="sm"
              selected={
                skillDepot && config.skillDepot
                  ? config.skillSets[config.skillDepot.id].levelTalentBurst
                  : 1
              }
              options={range(
                1,
                skillDepot ? ASCENSION_MAX_TALENT_LEVEL[config.ascensionLevel] + 1 : 2,
              )}
              onSelected={onSelectedSkillLevel(SkillType.Burst)}
              buttonValue={identity}
              optionValue={identity}
            />
          </>
        )}
      </div>
    </div>
  )
}

export default CharacterTab
