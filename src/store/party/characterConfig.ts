import { SkillType } from "@/generated/model/character_skills"
import { VisionType } from "@/generated/model/characters"

// TODO: put this interface in the inventory slice instead
export interface InventoryReference {
  type: string
  itemBaseId: number
  inventoryId: number
}

export interface AscensionLevel {
  ascensionLevel: number
  maxLevel: number
  lowerMaxLevel: number
}

export interface SkillLevels {
  [SkillType.Normal]: number
  [SkillType.Skill]: number
  [SkillType.Burst]: number
  [SkillType.AlternateSprint]: 1
}

export interface SkillDepotIdentifier {
  // Skill depot id & element type
  id: number
  element: VisionType
}

export interface SkillDepotSetLevel {
  skillType: SkillType
  level: number
}

export interface CharacterSkillDepotConfig {
  // How many constellations the character has unlocked for this skill depot
  constellationLevel: ConstellationLevel
  // Talent levels
  levelTalentAttack: number
  levelTalentSkill: number
  levelTalentBurst: number
}

export type ConstellationLevel = 0 | 1 | 2 | 3 | 4 | 5 | 6

export interface CharacterConfig {
  // Level range from 1 to 90
  level: number
  ascensionLevel: number
  lowerMaxLevel: number
  maxLevel: number
  // Equipped weapon
  weaponId: number
  weaponLevel: number
  weaponAscensionLevel: number
  weaponLowerMaxLevel: number
  weaponMaxLevel: number
  weaponRefinement: number
  // Artifacts
  flower: InventoryReference | null
  plume: InventoryReference | null
  sands: InventoryReference | null
  goblet: InventoryReference | null
  circlet: InventoryReference | null
  // Skill depot id & element type
  skillDepot: SkillDepotIdentifier | null
  skillSets: Record<number, CharacterSkillDepotConfig>
}

export function createDefaultSkillDepotConfig(
  skillDepotId: number | null,
): Record<number, CharacterSkillDepotConfig> {
  return skillDepotId
    ? {
        [skillDepotId]: {
          constellationLevel: 0,
          levelTalentAttack: 1,
          levelTalentSkill: 1,
          levelTalentBurst: 1,
        },
      }
    : {}
}

export function createDefaultCharacterConfig(
  weaponId: number,
  skillDepotId: number | null,
  vision: VisionType,
): CharacterConfig {
  return {
    level: 1,
    ascensionLevel: 0,
    lowerMaxLevel: 1,
    maxLevel: 20,
    weaponId,
    weaponLevel: 1,
    weaponAscensionLevel: 0,
    weaponLowerMaxLevel: 1,
    weaponMaxLevel: 20,
    weaponRefinement: 1,
    flower: null,
    plume: null,
    sands: null,
    goblet: null,
    circlet: null,
    skillDepot: skillDepotId
      ? {
          element: vision,
          id: skillDepotId,
        }
      : null,
    skillSets: createDefaultSkillDepotConfig(skillDepotId),
  }
}
