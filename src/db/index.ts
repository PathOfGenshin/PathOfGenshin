import Dexie from "dexie"

import { Artifact } from "@/generated/model/artifacts"
import { Character, CharacterSkillDepot } from "@/generated/model/characters"
import { Weapon } from "@/generated/model/weapon"
import { DATABASE_SCHEMA_VERSION } from "@/version"

const db = new Dexie("genshindata")

const GAME_VERSION_KEY = "gameVersion"
const GAME_VERSION_NUMBER = "value"

enum TableName {
  CHARACTERS = "characters",
  ARTIFACTS = "artifacts",
  WEAPONS = "weapons",
  SKILL_DEPOTS = "skillDepots",
  METADATA = "metadata",
}

interface MetadataObject {
  [GAME_VERSION_KEY]: string
  [GAME_VERSION_NUMBER]: number
}

db.version(DATABASE_SCHEMA_VERSION).stores({
  [TableName.CHARACTERS]: "id,name",
  [TableName.ARTIFACTS]: "id",
  [TableName.WEAPONS]: "id",
  [TableName.SKILL_DEPOTS]: "id",
  [TableName.METADATA]: `${GAME_VERSION_KEY}`,
})

db.on("ready", () => {
  console.log("Connected to local database.")
})

async function saveBulk(tableName: TableName, data: unknown[]): Promise<void> {
  const table = db.table(tableName)
  const count = await table.count()
  if (data.length !== count) {
    await db.transaction("rw", table, async () => {
      await table.bulkPut(data)
      console.log(`Saved data to local database table: ${tableName}`)
    })
  }
}

export async function getGameVersion(): Promise<number | undefined> {
  const table = db.table(TableName.METADATA)
  const value: MetadataObject | undefined = await table.get(GAME_VERSION_KEY)
  return value?.[GAME_VERSION_NUMBER]
}

export async function setGameVersion(gameVersion: number): Promise<void> {
  const table = db.table(TableName.METADATA)
  const versionObject: MetadataObject = {
    gameVersion: GAME_VERSION_KEY,
    value: gameVersion,
  }
  await table.put(versionObject)
}

export async function addCharacters(characters: Character[]): Promise<void> {
  return await saveBulk(TableName.CHARACTERS, characters)
}

export async function addSkillDepots(
  skillDepots: CharacterSkillDepot[],
): Promise<void> {
  return await saveBulk(TableName.SKILL_DEPOTS, skillDepots)
}

export async function addArtifacts(artifacts: Artifact[]): Promise<void> {
  return await saveBulk(TableName.ARTIFACTS, artifacts)
}

export async function addWeapons(weapons: Weapon[]): Promise<void> {
  return await saveBulk(TableName.WEAPONS, weapons)
}

export const queryAllCharacters = (): Promise<Character[]> =>
  db.table("characters").toArray()

/**
 * Connects to the IndexedDB database and returns the native database version.
 * This database version represents the schema version and not the version of the game
 * data.
 *
 * @returns the schema version of the IndexedDB database
 */
export async function connectToDatabase(): Promise<number> {
  await db.open()
  return db.verno
}
