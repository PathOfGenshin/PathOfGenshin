export type Rarity = 1 | 2 | 3 | 4 | 5

export type GenshinElement =
  | "ANEMO"
  | "CRYO"
  | "HYDRO"
  | "DENDRO"
  | "PYRO"
  | "ELECTRO"
  | "GEO"
  | "NONE"

export const avatarIcon = (icon: string): string => `/static/avatar_icon/${icon}.png`
export const rarityStars = (rarity: Rarity): string =>
  `/static/rarity/star${rarity}.png`
export const rarityBackground = (rarity: Rarity): string =>
  `/static/rarity/background${rarity}.png`
export const rarityBackgroundSquare = (rarity: Rarity): string =>
  `/static/rarity/background${rarity}_square.png`
export const elementalIcon = (element: GenshinElement): string =>
  `/static/elements/${element}.png`
