import { clamp } from "lodash"

import { ASCENSION_MAX_TALENT_LEVEL } from "@/components/genshin/characters/ascensions/maxTalentLevel"
import { isTravelerId } from "@/components/genshin/characters/traveler"
import { SkillType } from "@/generated/model/character_skills"
import { Character, VisionType } from "@/generated/model/characters"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { RootState } from "../"
import {
  CharacterConfig,
  ConstellationLevel,
  createDefaultCharacterConfig,
  SkillDepotIdentifier,
  SkillDepotSetLevel,
} from "./characterConfig"
import { AscensionLevel, SkillLevels } from "./partyModels"
import { copyTravelerConfig } from "./travelerDraft"

export const MAX_PARTY_SIZE = 4

export interface CharacterData {
  id: number
  name: string
}

interface PartyState {
  // The characters (ids, names) in the party
  charactersInParty: CharacterData[]

  // The currently selected character
  currentCharacter: CharacterData | null

  // Character specific configuration, keyed by character id
  characterConfig: Record<number, CharacterConfig>
}

const initialState: PartyState = {
  charactersInParty: [],
  currentCharacter: null,
  characterConfig: {},
}

interface AddCharacterPayload {
  id: number
  name: string
  defaultWeaponId: number
  defaultSkillDepotId: number | null
  vision: VisionType
}

interface ToggleTravelerPayload {
  target: Character
  previous: Character
}

const getCurrentConfig = (state: Readonly<PartyState>): CharacterConfig | null =>
  state.currentCharacter ? state.characterConfig[state.currentCharacter.id] : null

export const partySlice = createSlice({
  name: "party",
  initialState,
  reducers: {
    // Add character to party if character does not exist in party
    addCharacter: (state, action: PayloadAction<AddCharacterPayload>) => {
      if (state.charactersInParty.length >= MAX_PARTY_SIZE) {
        return
      }

      const id: number = action.payload.id
      const name: string = action.payload.name
      if (
        !state.charactersInParty.some((char) => char.id === id && char.name === name)
      ) {
        state.charactersInParty.push({ id, name })

        // Add new default character config if character was not previously added before
        if (!(id in state.characterConfig)) {
          state.characterConfig[id] = createDefaultCharacterConfig(
            action.payload.defaultWeaponId,
            action.payload.defaultSkillDepotId,
            action.payload.vision,
          )
        }
      }
    },

    // Remove character from party if the current character id exists in party
    removeCharacterById: (state, action: PayloadAction<number>) => {
      if (state.charactersInParty.length === 0) {
        return
      }

      const id: number = action.payload
      const index: number = state.charactersInParty.findIndex((char) => char.id === id)
      if (index > -1) {
        state.charactersInParty.splice(index, 1)
      }

      if (state.charactersInParty.length === 0) {
        state.currentCharacter = null
      }
    },

    // Set current character
    setCurrentCharacter: (state, action: PayloadAction<string>) => {
      const charName: string = action.payload
      const index: number = state.charactersInParty.findIndex(
        (char) => char.name === charName,
      )
      if (index > -1) {
        state.currentCharacter = {
          id: state.charactersInParty[index].id,
          name: charName,
        }
      }
    },

    // Set max level for current character
    setAscension: (state, action: PayloadAction<AscensionLevel>) => {
      const config = getCurrentConfig(state)
      const ascensionLevel = action.payload.ascensionLevel
      if (config) {
        // Update ascension level
        config.ascensionLevel = ascensionLevel

        // Update max level
        config.maxLevel = action.payload.maxLevel
        config.lowerMaxLevel = action.payload.lowerMaxLevel

        // Clamp level to the current ascension
        config.level = clamp(
          config.level,
          action.payload.lowerMaxLevel,
          action.payload.maxLevel,
        )

        // Clamp skill levels to current ascension
        if (config.skillDepot) {
          const levels = config.skillSets[config.skillDepot.id]
          const maxLevel = ASCENSION_MAX_TALENT_LEVEL[ascensionLevel]
          levels.levelTalentAttack = clamp(levels.levelTalentAttack, 1, maxLevel)
          levels.levelTalentSkill = clamp(levels.levelTalentSkill, 1, maxLevel)
          levels.levelTalentBurst = clamp(levels.levelTalentBurst, 1, maxLevel)
        }
      }
    },

    // Set current level for current character
    setLevel: (state, action: PayloadAction<number>) => {
      const config = getCurrentConfig(state)
      if (config) {
        config.level = action.payload
      }
    },

    // Set constellation level for current character
    setConstellationLevel: (state, action: PayloadAction<ConstellationLevel>) => {
      const config = getCurrentConfig(state)
      if (config && config.skillDepot) {
        const skillDepotConfig = config.skillSets[config.skillDepot.id]
        if (skillDepotConfig) {
          skillDepotConfig.constellationLevel = action.payload
        }
      }
    },

    // Set the skill depot for current character
    setSkillDepot: (state, action: PayloadAction<SkillDepotIdentifier | null>) => {
      const config = getCurrentConfig(state)
      if (config) {
        // Create default skill set config for the given skill depot if it does not
        // already exist. This defaults the constellation level to 0 and talent levels
        // to 1.
        if (action.payload && !(action.payload.id in config.skillSets)) {
          config.skillSets[action.payload.id] = {
            constellationLevel: 0,
            levelTalentAttack: 1,
            levelTalentSkill: 1,
            levelTalentBurst: 1,
          }
        }

        config.skillDepot = action.payload
      }
    },

    // Set the skill level for the current character and skill set
    setSkillLevel: (state, action: PayloadAction<SkillDepotSetLevel>) => {
      const config = getCurrentConfig(state)
      if (config && config.skillDepot) {
        const skillSet = config.skillSets[config.skillDepot.id]
        switch (action.payload.skillType) {
          case SkillType.Normal:
            skillSet.levelTalentAttack = action.payload.level
            break
          case SkillType.Skill:
            skillSet.levelTalentSkill = action.payload.level
            break
          case SkillType.Burst:
            skillSet.levelTalentBurst = action.payload.level
            break
        }
      }
    },

    // Toggle the traveler gender if in party, do nothing otherwise
    // action is the DESIRED gender
    setTraveler: (state, action: PayloadAction<ToggleTravelerPayload>) => {
      const { target: targetTraveler, previous: prevTraveler } = action.payload

      // We need to copy over the whole character config, but do a bit of additional
      // processing on the skill depot configs since the skill depot ids are unique
      if (state.characterConfig[prevTraveler.id]) {
        const copiedConfig: CharacterConfig = copyTravelerConfig(
          state.characterConfig,
          targetTraveler,
          prevTraveler,
        )
        state.characterConfig[targetTraveler.id] = copiedConfig
      }

      // Handle swapping for party icons
      const index = state.charactersInParty.findIndex((char) => isTravelerId(char.id))
      if (index > -1) {
        state.charactersInParty.splice(index, 1, {
          id: targetTraveler.id,
          name: targetTraveler.name,
        })
      }

      // Handle swapping for status panel
      if (state.currentCharacter && isTravelerId(state.currentCharacter.id)) {
        state.currentCharacter = {
          id: targetTraveler.id,
          name: targetTraveler.name,
        }
      }
    },
  },
})

export const {
  addCharacter,
  removeCharacterById,
  setCurrentCharacter,
  setAscension,
  setLevel,
  setConstellationLevel,
  setSkillDepot,
  setSkillLevel,
  setTraveler,
} = partySlice.actions

export const selectCharacters = (state: RootState): CharacterData[] =>
  state.party.charactersInParty

export const selectCurrentCharacter = (state: RootState): CharacterData | null =>
  state.party.currentCharacter ?? null

export const selectCharacterConfig = (state: RootState): CharacterConfig | null =>
  state.party.currentCharacter
    ? state.party.characterConfig[state.party.currentCharacter.id]
    : null

export const selectSkillLevels = (state: RootState): SkillLevels => {
  const config = getCurrentConfig(state.party)
  if (config && config.skillDepot) {
    const levels = config.skillSets[config.skillDepot.id]
    return {
      Normal: levels.levelTalentAttack,
      Skill: levels.levelTalentSkill,
      Burst: levels.levelTalentBurst,
      AlternateSprint: 1,
    }
  } else {
    return {
      Normal: 1,
      Skill: 1,
      Burst: 1,
      AlternateSprint: 1,
    }
  }
}

export default partySlice.reducer
