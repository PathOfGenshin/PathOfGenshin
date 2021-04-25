import { client } from "@/api/client"
import { DATA_ARTIFACTS, DATA_CHARACTERS, DATA_WEAPONS } from "@/api/endpoints"
import { addArtifacts, addCharacters, addWeapons } from "@/db"
import type { Artifact } from "@/generated/model/artifacts"
import type { Character } from "@/generated/model/characters"
import type { Weapon } from "@/generated/model/weapon"

export const cacheCharacters = async (): Promise<void> => {
  const resp = await client.get(DATA_CHARACTERS)
  const characters: Character[] = resp.data as Character[]
  return await addCharacters(characters)
}

export const cacheArtifacts = async (): Promise<void> => {
  const resp = await client.get(DATA_ARTIFACTS)
  const artifacts: Artifact[] = resp.data as Artifact[]
  return await addArtifacts(artifacts)
}

export const cacheWeapons = async (): Promise<void> => {
  const resp = await client.get(DATA_WEAPONS)
  const weapons: Weapon[] = resp.data as Weapon[]
  return await addWeapons(weapons)
}
