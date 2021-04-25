import Dexie from "dexie"

import { Artifact } from "@/generated/model/artifacts"
import { Character } from "@/generated/model/characters"
import { Weapon } from "@/generated/model/weapon"

const db = new Dexie("genshindata")

db.version(1.4).stores({
  characters: "baseInfo.id",
  artifacts: "id",
  weapons: "baseInfo.id",
})

// Dexie will automatically call db.open() on first query to the database
db.on("ready", () => {
  console.log("Connected to local database.")
})

async function saveBulk(tableName: string, data: unknown[]): Promise<void> {
  const table = db.table(tableName)
  const count = await table.count()
  if (data.length !== count) {
    await db.transaction("rw", table, async () => {
      await table.bulkPut(data)
      console.log(`Saved data to local database table: ${tableName}`)
    })
  }
}

export async function addCharacters(characters: Character[]): Promise<void> {
  return await saveBulk("characters", characters)
}

export async function addArtifacts(artifacts: Artifact[]): Promise<void> {
  return await saveBulk("artifacts", artifacts)
}

export async function addWeapons(weapons: Weapon[]): Promise<void> {
  return await saveBulk("weapons", weapons)
}

export const queryAllCharacters = (): Promise<Character[]> =>
  db.table("characters").toArray()
