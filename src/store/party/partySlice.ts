import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { RootState } from "../"

export const MAX_PARTY_SIZE = 4

interface PartyState {
  characterIds: number[]
  currentCharacterId: number | null
}

const initialState: PartyState = {
  characterIds: [],
  currentCharacterId: null,
}

export const partySlice = createSlice({
  name: "party",
  initialState,
  reducers: {
    // Add character to party if character does not exist in party
    addCharacter: (state, action: PayloadAction<number>) => {
      if (state.characterIds.length >= MAX_PARTY_SIZE) {
        return
      }

      const id: number = action.payload
      if (!state.characterIds.includes(id)) {
        state.characterIds.push(id)
      }
    },

    // Remove character from party if the current character id exists in party
    removeCharacter: (state, action: PayloadAction<number>) => {
      if (state.characterIds.length === 0) {
        return
      }

      const id: number = action.payload
      const index: number = state.characterIds.indexOf(id)
      if (index > -1) {
        state.characterIds = state.characterIds.splice(index, 1)
      }
    },

    // Set current character
    setCurrentCharacter: (state, action: PayloadAction<number>) => {
      const partyIndex: number = action.payload
      if (partyIndex < state.characterIds.length) {
        const characterIdAtIndex: number = state.characterIds[partyIndex]
        state.currentCharacterId = characterIdAtIndex
      }
    },
  },
})

export const { addCharacter, removeCharacter, setCurrentCharacter } = partySlice.actions

export const selectCharacterIds = (state: RootState): number[] =>
  state.party.characterIds

export const selectCurrentCharacter = (state: RootState): number =>
  state.party.currentCharacterId

export default partySlice.reducer
