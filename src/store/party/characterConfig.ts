import { VisionType } from "@/generated/model/characters"

// TODO: put this interface in the inventory slice instead
export interface InventoryReference {
  type: string
  itemBaseId: number
  inventoryId: number
}

export interface CharacterSkillDepotConfig {
  id: number
  element: VisionType
}

export interface CharacterConfig {
  // How many constellations the character has unlocked
  constellationLevel: 0 | 1 | 2 | 3 | 4 | 5 | 6
  // Level range from 1 to 90
  level: number
  maxLevel: number
  // Talent levels
  levelTalentAttack: number
  levelTalentSkill: number
  levelTalentBurst: number
  // Equipped weapon
  weaponId: number
  weaponLevel: number
  weaponMaxLevel: number
  weaponRefinement: number
  // Artifacts
  flower: InventoryReference | null
  plume: InventoryReference | null
  sands: InventoryReference | null
  goblet: InventoryReference | null
  circlet: InventoryReference | null
  // Skill depot id & element type
  skillDepot: CharacterSkillDepotConfig | null
}

export function createDefaultCharacterConfig(
  weaponId: number,
  skillDepotId: number | null,
  vision: VisionType,
): CharacterConfig {
  return {
    constellationLevel: 0,
    level: 1,
    maxLevel: 20,
    levelTalentAttack: 1,
    levelTalentSkill: 1,
    levelTalentBurst: 1,
    weaponId,
    weaponLevel: 1,
    weaponMaxLevel: 20,
    weaponRefinement: 1,
    flower: null,
    plume: null,
    sands: null,
    goblet: null,
    circlet: null,
    skillDepot: skillDepotId ? { element: vision, id: skillDepotId } : null,
  }
}
