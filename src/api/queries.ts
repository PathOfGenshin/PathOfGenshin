import { AxiosResponse } from "axios"

import { client } from "@/api/client"
import {
  DATA_ARTIFACTS,
  DATA_CHARACTERS,
  DATA_CHARACTER_EXP_LEVELS,
  DATA_MANUAL_TEXT_MAPPINGS,
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
  addManualTextMappings,
  addPartyResonance,
  addSkillDepots,
  addStatCurves,
  addWeaponExpLevels,
  addWeapons,
} from "@/db"
import type { Artifact } from "@/generated/model/artifacts"
import { CharacterExpLevel } from "@/generated/model/character_exp_levels"
import type { Character, CharacterSkillDepot } from "@/generated/model/characters"
import { ManualTextMapping } from "@/generated/model/manual_text_mapping"
import { PartyResonance } from "@/generated/model/party_resonance"
import { StatCurve } from "@/generated/model/stat_curves"
import type { Weapon } from "@/generated/model/weapon"
import { WeaponExpLevel } from "@/generated/model/weapon_exp_levels"

export const fetchCharacters = async (): Promise<void> => {
  const resp: AxiosResponse<Character[]> = await client.get(DATA_CHARACTERS)
  return await addCharacters(resp.data)
}

export const fetchCharacterExpLevels = async (): Promise<void> => {
  const resp: AxiosResponse<CharacterExpLevel[]> = await client.get(
    DATA_CHARACTER_EXP_LEVELS,
  )
  return await addCharacterExpLevels(resp.data)
}

export const fetchPartyResonance = async (): Promise<void> => {
  const resp: AxiosResponse<PartyResonance[]> = await client.get(DATA_PARTY_RESONANCE)
  return await addPartyResonance(resp.data)
}

export const fetchSkillDepots = async (): Promise<void> => {
  const resp: AxiosResponse<CharacterSkillDepot[]> = await client.get(DATA_SKILL_DEPOTS)
  return await addSkillDepots(resp.data)
}

export const fetchArtifacts = async (): Promise<void> => {
  const resp: AxiosResponse<Artifact[]> = await client.get(DATA_ARTIFACTS)
  return await addArtifacts(resp.data)
}

export const fetchWeapons = async (): Promise<void> => {
  const resp: AxiosResponse<Weapon[]> = await client.get(DATA_WEAPONS)
  return await addWeapons(resp.data)
}

export const fetchWeaponExpLevels = async (): Promise<void> => {
  const resp: AxiosResponse<WeaponExpLevel[]> = await client.get(DATA_WEAPON_EXP_LEVELS)
  return await addWeaponExpLevels(resp.data)
}

export const fetchStatCurves = async (): Promise<void> => {
  const resp: AxiosResponse<StatCurve[]> = await client.get(DATA_STAT_CURVES)
  return await addStatCurves(resp.data)
}

export const fetchManualTextMappings = async (): Promise<void> => {
  const resp: AxiosResponse<ManualTextMapping[]> = await client.get(
    DATA_MANUAL_TEXT_MAPPINGS,
  )
  return await addManualTextMappings(resp.data)
}
