import Dexie from "dexie"

import { Artifact } from "@/generated/model/artifacts"
import { CharacterExpLevel } from "@/generated/model/character_exp_levels"
import { Character, CharacterSkillDepot } from "@/generated/model/characters"
import { ManualTextMapping } from "@/generated/model/manual_text_mapping"
import { PartyResonance } from "@/generated/model/party_resonance"
import { StatCurve } from "@/generated/model/stat_curves"
import { Weapon, WeaponType } from "@/generated/model/weapon"
import { WeaponExpLevel } from "@/generated/model/weapon_exp_levels"
import { CharacterData } from "@/store/party/partySlice"
import { CURRENT_GAME_VERSION, DATABASE_SCHEMA_VERSION } from "@/version"

const DATABASE_NAME = "genshindata"

const GAME_VERSION_KEY = "gameVersion"
const GAME_VERSION_NUMBER = "value"

enum TableName {
  characters = "characters",
  characterExpLevels = "characterExpLevels",
  partyResonance = "partyResonance",
  artifacts = "artifacts",
  weapons = "weapons",
  weaponExpLevels = "weaponExpLevels",
  skillDepots = "skillDepots",
  statCurves = "statCurves",
  manualTextMappings = "manualTextMappings",
  metadata = "metadata",
}

interface MetadataObject {
  [GAME_VERSION_KEY]: string
  [GAME_VERSION_NUMBER]: number
}

// Every time the table index schema is updated, the database schema version also needs
// to be bumped up
const tableIndexSchema: Record<TableName, string> = {
  [TableName.characters]: "id,name,quality",
  [TableName.characterExpLevels]: "level",
  [TableName.partyResonance]: "id,name",
  [TableName.artifacts]: "id",
  [TableName.weapons]: "id,name,quality",
  [TableName.weaponExpLevels]: "[quality+level]",
  [TableName.skillDepots]: "id",
  [TableName.statCurves]: "[curveId+level]",
  [TableName.manualTextMappings]: "key,type",
  [TableName.metadata]: `${GAME_VERSION_KEY}`,
}

class GenshinDatabase extends Dexie {
  public readonly [TableName.characters]: Dexie.Table<Character, number>
  public readonly [TableName.characterExpLevels]: Dexie.Table<CharacterExpLevel, number>
  public readonly [TableName.partyResonance]: Dexie.Table<PartyResonance, number>
  public readonly [TableName.artifacts]: Dexie.Table<Artifact, number>
  public readonly [TableName.weapons]: Dexie.Table<Weapon, number>
  public readonly [TableName.weaponExpLevels]: Dexie.Table<Weapon, [number, number]>
  public readonly [TableName.skillDepots]: Dexie.Table<CharacterSkillDepot, number>
  public readonly [TableName.statCurves]: Dexie.Table<StatCurve, [string, number]>
  public readonly [TableName.manualTextMappings]: Dexie.Table<ManualTextMapping, string>
  public readonly [TableName.metadata]: Dexie.Table<MetadataObject, string>

  constructor() {
    super(DATABASE_NAME)
    this.version(DATABASE_SCHEMA_VERSION).stores(tableIndexSchema)

    this[TableName.characters] = this.table(TableName.characters)
    this[TableName.characterExpLevels] = this.table(TableName.characterExpLevels)
    this[TableName.partyResonance] = this.table(TableName.partyResonance)
    this[TableName.artifacts] = this.table(TableName.artifacts)
    this[TableName.weapons] = this.table(TableName.weapons)
    this[TableName.weaponExpLevels] = this.table(TableName.weaponExpLevels)
    this[TableName.skillDepots] = this.table(TableName.skillDepots)
    this[TableName.statCurves] = this.table(TableName.statCurves)
    this[TableName.manualTextMappings] = this.table(TableName.manualTextMappings)
    this[TableName.metadata] = this.table(TableName.metadata)
  }
}

const db = new GenshinDatabase()

db.on("ready", () => {
  console.log("Connected to local database.")
})

async function saveBulk(tableName: TableName, data: unknown[]): Promise<void> {
  const table = db.table(tableName)
  await db.transaction("rw", table, async () => {
    await table.clear()
    await table.bulkPut(data)
    console.log(`Saved data to local database table: ${tableName}`)
  })
}

// *******************************************************
// Deal with the game version whenever the game is updated
// *******************************************************

async function getGameVersion(): Promise<number | undefined> {
  const value: MetadataObject | undefined = await db.metadata.get(GAME_VERSION_KEY)
  return value?.[GAME_VERSION_NUMBER]
}

export async function setGameVersion(gameVersion: number): Promise<void> {
  const versionObject: MetadataObject = {
    gameVersion: GAME_VERSION_KEY,
    value: gameVersion,
  }
  await db.metadata.put(versionObject)
}

// ********************************************
// Add to database from fetched game data json
// ********************************************

function notUndefined<T>(x: T | undefined): x is T {
  return x !== undefined
}

export async function addCharacters(characters: Character[]): Promise<void> {
  return await saveBulk(TableName.characters, characters)
}

export async function addCharacterExpLevels(
  characterExpLevels: CharacterExpLevel[],
): Promise<void> {
  return await saveBulk(TableName.characterExpLevels, characterExpLevels)
}

export async function addPartyResonance(
  partyResonance: PartyResonance[],
): Promise<void> {
  return await saveBulk(TableName.partyResonance, partyResonance)
}

export async function addSkillDepots(
  skillDepots: CharacterSkillDepot[],
): Promise<void> {
  return await saveBulk(TableName.skillDepots, skillDepots)
}

export async function addArtifacts(artifacts: Artifact[]): Promise<void> {
  return await saveBulk(TableName.artifacts, artifacts)
}

export async function addWeapons(weapons: Weapon[]): Promise<void> {
  return await saveBulk(TableName.weapons, weapons)
}

export async function addWeaponExpLevels(
  weaponExpLevels: WeaponExpLevel[],
): Promise<void> {
  return await saveBulk(TableName.weaponExpLevels, weaponExpLevels)
}

export async function addStatCurves(statCurves: StatCurve[]): Promise<void> {
  return await saveBulk(TableName.statCurves, statCurves)
}

export async function addManualTextMappings(
  manualTextMappings: ManualTextMapping[],
): Promise<void> {
  return await saveBulk(TableName.manualTextMappings, manualTextMappings)
}

// ******************************************************************
// Asynchronous query functions for retrieving data from the database
// ******************************************************************

export const queryAllCharacters = (): Promise<Character[]> => db.characters.toArray()

export const queryAllWeapons = (): Promise<Weapon[]> => db.weapons.toArray()

export const queryDefaultWeapons = async (): Promise<Record<WeaponType, Weapon>> => {
  const weapons: Weapon[] = await db.weapons.where("quality").equals(1).toArray()
  return Object.fromEntries(
    weapons.map((weapon) => [weapon.weaponType, weapon]),
  ) as Record<WeaponType, Weapon>
}

export const queryCharacters =
  (characterDatas: CharacterData[]) => async (): Promise<Character[]> => {
    const characters = (
      await db.characters.bulkGet(characterDatas.map((char) => char.id))
    ).filter(notUndefined)
    return characters
  }

export const querySingleCharacter =
  (characterData: CharacterData | null) => async (): Promise<Character | null> => {
    if (characterData === null) return null

    const character = await db.characters.get(characterData.id)
    return character ?? null
  }

export const querySingleWeapon =
  (weaponId: number | null) => async (): Promise<Weapon | null> => {
    if (weaponId === null) return null

    const weapon = await db.weapons.get(weaponId)
    return weapon ?? null
  }

export const querySingleSkillDepot =
  (skillDepotId: number | null) => async (): Promise<CharacterSkillDepot | null> => {
    if (skillDepotId === null) return null

    const skillDepot = await db.skillDepots.get(skillDepotId)
    return skillDepot ?? null
  }

export const querySkillDepots =
  (skillDepotIds: number[]) => async (): Promise<CharacterSkillDepot[]> => {
    const skillDepots = (await db.skillDepots.bulkGet(skillDepotIds)).filter(
      notUndefined,
    )
    return skillDepots
  }

export const queryTextMappings =
  (keys: string[]) => async (): Promise<Record<string, string>> => {
    const textMappings = (await db.manualTextMappings.bulkGet(keys)).filter(
      notUndefined,
    )
    return Object.fromEntries(textMappings.map((entry) => [entry.key, entry.value]))
  }

export interface DatabaseVersion {
  valid: boolean
  upgradeReason: string
}

/**
 * Connects to the IndexedDB database and returns the native database version.
 * This database version represents the schema version and not the version of the game
 * data.
 *
 * @returns the schema version of the IndexedDB database
 */
export async function connectToDatabase(): Promise<DatabaseVersion> {
  await db.open()
  const schemaVersion: number = db.verno
  const gameVersion: number | undefined = await getGameVersion()

  if (gameVersion === undefined) {
    return { valid: false, upgradeReason: "Setting up database for the first time." }
  } else if (gameVersion < CURRENT_GAME_VERSION) {
    return {
      valid: false,
      upgradeReason: `Game data is outdated. Current database version: ${gameVersion}, latest version: ${CURRENT_GAME_VERSION}`,
    }
  } else if (schemaVersion < DATABASE_SCHEMA_VERSION) {
    return { valid: false, upgradeReason: "The database schema has been updated." }
  } else {
    return { valid: true, upgradeReason: "" }
  }
}
