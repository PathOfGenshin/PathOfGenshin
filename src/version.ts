/**
 * This database version will be used by the Dexie model to check if a new version of
 * the database schema needs to be used
 */
export const DATABASE_SCHEMA_VERSION = 1

/**
 * The game version, which represents the version of the game that the data is most
 * recently up to date with. Represented as a three digit number for major.minor.patch
 *
 * Note that the "patch" number can only be between 0-9, as we operate under the
 * assumption that there will be very little changes to the actual game data for every
 * new game patch.
 */
export const CURRENT_GAME_VERSION = 200
