export enum TravelerID {
  MALE = 10000005,
  FEMALE = 10000007,
}

export const isTravelerId = (id: number): boolean =>
  id === TravelerID.MALE || id === TravelerID.FEMALE
