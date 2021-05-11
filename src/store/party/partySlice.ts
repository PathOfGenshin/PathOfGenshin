import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { RootState } from "../"

export const MAX_PARTY_SIZE = 4

interface PartyState {
  characterIds: number[] | null
  characterNames: string[] | null
  currentCharacterId: number | null
  currentCharacterName: string | null
}

const initialState: PartyState = {
  characterIds: [],
  characterNames: [],
  currentCharacterId: null,
  currentCharacterName: null,
}

interface AddCharacterPayload {
  id: number
  name: string
}

export const partySlice = createSlice({
  name: "party",
  initialState,
  reducers: {
    // Add character to party if character does not exist in party
    addCharacter: (state, action: PayloadAction<AddCharacterPayload>) => {
      if (state.characterIds.length >= MAX_PARTY_SIZE) {
        return
      }

      const id: number = action.payload.id
      const name: string = action.payload.name
      if (!state.characterIds.includes(id) && !state.characterNames.includes(name)) {
        state.characterIds.push(id)
        state.characterNames.push(name)
      }
    },

    // Remove character from party if the current character id exists in party
    removeCharacterById: (state, action: PayloadAction<number>) => {
      if (state.characterIds.length === 0) {
        return
      }

      const id: number = action.payload
      const index: number = state.characterIds.indexOf(id)
      if (index > -1) {
        state.characterIds = state.characterIds.splice(index, 1)
        state.characterNames = state.characterNames.splice(index, 1)
      }

      if (state.characterIds.length === 0) {
        state.currentCharacterId = null
        state.currentCharacterName = null
      }
    },

    // Set current character
    setCurrentCharacter: (state, action: PayloadAction<string>) => {
      const charName: string = action.payload
      const index: number = state.characterNames.indexOf(charName)
      if (index > -1) {
        state.currentCharacterId = state.characterIds[index]
        state.currentCharacterName = charName
      }
    },
  },
})

export const { addCharacter, removeCharacterById, setCurrentCharacter } =
  partySlice.actions

export const selectCharacterIds = (state: RootState): number[] =>
  state.party.characterIds

export const selectCharacterNames = (state: RootState): string[] =>
  state.party.characterNames

export const selectCurrentCharacterId = (state: RootState): number | null =>
  state.party.currentCharacterId

export const selectCurrentCharacterName = (state: RootState): string =>
  state.party.currentCharacterName

export default partySlice.reducer
