import { client } from "@/api/client"
import {
  DATA_ARTIFACTS,
  DATA_CHARACTERS,
  DATA_CHARACTER_EXP_LEVELS,
  DATA_PARTY_RESONANCE,
  DATA_SKILL_DEPOTS,
  DATA_STAT_CURVES,
  DATA_WEAPONS,
  DATA_WEAPON_EXP_LEVELS,
} from "@/api/endpoints"
import {
  addArtifacts,
  addCharacterExpLevels,
  addCharacters,
  addPartyResonance,
  addSkillDepots,
  addStatCurves,
  addWeaponExpLevels,
  addWeapons,
} from "@/db"
import type { Artifact } from "@/generated/model/artifacts"
import { CharacterExpLevel } from "@/generated/model/character_exp_levels"
import type { Character, CharacterSkillDepot } from "@/generated/model/characters"
import { PartyResonance } from "@/generated/model/party_resonance"
import { StatCurve } from "@/generated/model/stat_curves"
import type { Weapon } from "@/generated/model/weapon"
import { WeaponExpLevel } from "@/generated/model/weapon_exp_levels"

export const fetchCharacters = async (): Promise<void> => {
  const resp = await client.get(DATA_CHARACTERS)
  const characters: Character[] = resp.data as Character[]
  return await addCharacters(characters)
}

export const fetchCharacterExpLevels = async (): Promise<void> => {
  const resp = await client.get(DATA_CHARACTER_EXP_LEVELS)
  const characterExpLevels: CharacterExpLevel[] = resp.data as CharacterExpLevel[]
  return await addCharacterExpLevels(characterExpLevels)
}

export const fetchPartyResonance = async (): Promise<void> => {
  const resp = await client.get(DATA_PARTY_RESONANCE)
  const partyResonance: PartyResonance[] = resp.data as PartyResonance[]
  return await addPartyResonance(partyResonance)
}

export const fetchSkillDepots = async (): Promise<void> => {
  const resp = await client.get(DATA_SKILL_DEPOTS)
  const skillDepots: CharacterSkillDepot[] = resp.data as CharacterSkillDepot[]
  return await addSkillDepots(skillDepots)
}

export const fetchArtifacts = async (): Promise<void> => {
  const resp = await client.get(DATA_ARTIFACTS)
  const artifacts: Artifact[] = resp.data as Artifact[]
  return await addArtifacts(artifacts)
}

export const fetchWeapons = async (): Promise<void> => {
  const resp = await client.get(DATA_WEAPONS)
  const weapons: Weapon[] = resp.data as Weapon[]
  return await addWeapons(weapons)
}

export const fetchWeaponExpLevels = async (): Promise<void> => {
  const resp = await client.get(DATA_WEAPON_EXP_LEVELS)
  const weaponExpLevels: WeaponExpLevel[] = resp.data as WeaponExpLevel[]
  return await addWeaponExpLevels(weaponExpLevels)
}

export const fetchStatCurves = async (): Promise<void> => {
  const resp = await client.get(DATA_STAT_CURVES)
  const statCurves: StatCurve[] = resp.data as StatCurve[]
  return await addStatCurves(statCurves)
}
