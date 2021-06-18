export enum TravelerGender {
  MALE = 10000005,
  FEMALE = 10000007,
}

export const isTravelerId = (id: number): boolean =>
  id === TravelerGender.MALE || id === TravelerGender.FEMALE

export const flipGender = (gender: TravelerGender): TravelerGender =>
  gender === TravelerGender.MALE ? TravelerGender.FEMALE : TravelerGender.MALE
