import { clamp } from "lodash"

import { VisionType } from "@/generated/model/characters"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { RootState } from "../"
import {
  CharacterConfig,
  ConstellationLevel,
  createDefaultCharacterConfig,
  SkillDepotIdentifier,
} from "./characterConfig"
import { AscensionLevel } from "./partyModels"

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
      if (config) {
        // Update max level
        config.maxLevel = action.payload.maxLevel
        config.lowerMaxLevel = action.payload.lowerMaxLevel

        // Clamp level to the current ascension
        config.level = clamp(
          config.level,
          action.payload.lowerMaxLevel,
          action.payload.maxLevel,
        )
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
} = partySlice.actions

export const selectCharacters = (state: RootState): CharacterData[] =>
  state.party.charactersInParty

export const selectCurrentCharacter = (state: RootState): CharacterData | null =>
  state.party.currentCharacter ?? null

export const selectCharacterConfig = (state: RootState): CharacterConfig | null =>
  state.party.currentCharacter
    ? state.party.characterConfig[state.party.currentCharacter.id]
    : null

export default partySlice.reducer
