import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { RootState } from "../"

export const MAX_PARTY_SIZE = 4

export interface CharacterData {
  id: number
  name: string
}

interface PartyState {
  // The characters (ids, names) in the party
  charactersInParty: CharacterData[]

  // The currently highlighted character
  currentCharacter: CharacterData
}

const initialState: PartyState = {
  charactersInParty: [],
  currentCharacter: null,
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
      if (state.charactersInParty.length >= MAX_PARTY_SIZE) {
        return
      }

      const id: number = action.payload.id
      const name: string = action.payload.name
      if (
        !state.charactersInParty.some((char) => char.id === id && char.name === name)
      ) {
        state.charactersInParty.push({ id, name })
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
        state.charactersInParty = state.charactersInParty.splice(index, 1)
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
  },
})

export const { addCharacter, removeCharacterById, setCurrentCharacter } =
  partySlice.actions

export const selectCharacters = (state: RootState): CharacterData[] =>
  state.party.charactersInParty

export const selectCurrentCharacter = (state: RootState): CharacterData | null =>
  state.party.currentCharacter ?? null

export default partySlice.reducer
