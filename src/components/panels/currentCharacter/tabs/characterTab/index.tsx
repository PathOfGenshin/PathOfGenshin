import { useQuery } from "react-query"

import { querySingleSkillDepot, querySkillDepots } from "@/db"
import { Ascension } from "@/generated/model/ascension"
import { SkillType } from "@/generated/model/character_skills"
import { CharacterSkillDepot } from "@/generated/model/characters"
import { useAppDispatch } from "@/store/hooks"
import { ConstellationLevel } from "@/store/party/characterConfig"
import {
  setAscension,
  setConstellationLevel,
  setLevel,
  setSkillDepot,
  setSkillLevel,
} from "@/store/party/partySlice"

import { TabContentProps } from "../../TabContent"
import { AscensionLevelDropdown } from "./AscensionLevelDropdown"
import {
  BurstAttackLevelDropdown,
  NormalAttackLevelDropdown,
  SkillAttackLevelDropdown,
} from "./AttackLevelDropdown"
import { ConstellationDropdown } from "./ConstellationDropdown"
import { LevelDropdown } from "./LevelDropdown"
import { SkillSetDropdown } from "./SkillSetDropdown"
import { ConstellationSummary } from "./constellations/ConstellationSummary"
import { TalentSummary } from "./talents/TalentSummary"

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
    useQuery(
      ["availableSkillDepots", character.id],
      querySkillDepots(character.skillDepotIds),
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
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-genshin">Character Settings</h2>
        {availableSkillDepotsLoaded && availableSkillDepots && (
          <SkillSetDropdown
            config={config}
            availableSkillDepots={availableSkillDepots}
            onSelectedSkillDepot={onSelectedSkillDepot}
          />
        )}
        <div className="flex flex-wrap justify-start items-center">
          <LevelDropdown config={config} onSelectedLevel={onSelectedLevel} />
          <AscensionLevelDropdown
            config={config}
            character={character}
            onSelectedAscension={onSelectedAscension}
          />
          {skillDepotLoaded && (
            <ConstellationDropdown
              config={config}
              skillDepot={skillDepot ?? null}
              onSelectedConstellationLevel={onSelectedConstellationLevel}
            />
          )}
        </div>
        <div className="flex flex-wrap justify-start items-center">
          {skillDepotLoaded && (
            <>
              <NormalAttackLevelDropdown
                config={config}
                skillDepot={skillDepot ?? null}
                onSelectedLevel={onSelectedSkillLevel(SkillType.Normal)}
              />
              <SkillAttackLevelDropdown
                config={config}
                skillDepot={skillDepot ?? null}
                onSelectedLevel={onSelectedSkillLevel(SkillType.Skill)}
              />
              <BurstAttackLevelDropdown
                config={config}
                skillDepot={skillDepot ?? null}
                onSelectedLevel={onSelectedSkillLevel(SkillType.Burst)}
              />
            </>
          )}
        </div>
      </div>
      <div className="space-y-4">
        <h2 className="text-2xl font-genshin">Constellations</h2>
        <ConstellationSummary
          config={config}
          character={character}
          skillDepot={skillDepot ?? null}
        />
      </div>
      <div className="space-y-4">
        <h2 className="text-2xl font-genshin">Talents</h2>
        <TalentSummary config={config} skillDepot={skillDepot ?? null} />
      </div>
      <div className="space-y-4">
        <h2 className="text-2xl font-genshin">Passives</h2>
      </div>
    </div>
  )
}

export default CharacterTab
