import { Character } from "@/generated/model/characters"

import {
  CharacterConfig,
  CharacterSkillDepotConfig,
  SkillDepotIdentifier,
} from "./characterConfig"

const copyTravelerSkillDepot = (
  prevSkillDepot: SkillDepotIdentifier | null,
  newSkillDepotIds: number[],
): SkillDepotIdentifier | null => {
  if (prevSkillDepot === null) return null

  const newId = newSkillDepotIds.find(
    (id: number) => id % 10 === prevSkillDepot.id % 10,
  )

  if (newId) {
    return {
      id: newId,
      element: prevSkillDepot.element,
    }
  }
  return null
}

const copyTravelerSkillSets = (
  prevSkillSets: Record<number, CharacterSkillDepotConfig>,
  newSkillDepotIds: number[],
): Record<number, CharacterSkillDepotConfig> => {
  const newIdMapping: Record<string, number> = Object.fromEntries(
    newSkillDepotIds.map((id) => [id % 10, id]),
  )
  const newEntries = Object.fromEntries(
    Object.entries(prevSkillSets).map(([id, skillSet]) => {
      return [
        newIdMapping[parseInt(id) % 10],
        {
          constellationLevel: skillSet.constellationLevel,
          levelTalentAttack: skillSet.levelTalentAttack,
          levelTalentSkill: skillSet.levelTalentSkill,
          levelTalentBurst: skillSet.levelTalentBurst,
        },
      ]
    }),
  )
  return newEntries
}

export const copyTravelerConfig = (
  config: Readonly<Record<number, CharacterConfig>>,
  targetTraveler: Readonly<Character>,
  prevTraveler: Readonly<Character>,
): CharacterConfig => {
  const prevConfig = config[prevTraveler.id]
  const newConfig: CharacterConfig = {
    level: prevConfig.level,
    ascensionLevel: prevConfig.ascensionLevel,
    lowerMaxLevel: prevConfig.lowerMaxLevel,
    maxLevel: prevConfig.maxLevel,
    weaponId: prevConfig.weaponId,
    weaponAscensionLevel: prevConfig.weaponAscensionLevel,
    weaponLevel: prevConfig.weaponLevel,
    weaponLowerMaxLevel: prevConfig.weaponLowerMaxLevel,
    weaponMaxLevel: prevConfig.weaponMaxLevel,
    weaponRefinement: prevConfig.weaponRefinement,
    flower: prevConfig.flower,
    plume: prevConfig.plume,
    sands: prevConfig.sands,
    goblet: prevConfig.goblet,
    circlet: prevConfig.circlet,
    skillDepot: copyTravelerSkillDepot(
      prevConfig.skillDepot,
      targetTraveler.skillDepotIds,
    ),
    skillSets: copyTravelerSkillSets(
      prevConfig.skillSets,
      targetTraveler.skillDepotIds,
    ),
  }
  return newConfig
}
