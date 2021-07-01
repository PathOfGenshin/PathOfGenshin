import { Character, VisionType } from "@/generated/model/characters"

export interface AddCharacterPayload {
  id: number
  name: string
  defaultWeaponId: number
  defaultSkillDepotId: number | null
  vision: VisionType
}

export interface ToggleTravelerPayload {
  target: Character
  previous: Character
}
