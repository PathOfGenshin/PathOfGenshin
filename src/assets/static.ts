import { VisionType } from "@/generated/model/characters"
import { StarQuality } from "@/generated/model/type_aliases"

export const avatarIcon = (icon: string): string => `/static/avatar_icon/${icon}.png`
export const weaponIcon = (icon: string): string => `/static/equip_icon/${icon}.png`
export const qualityStars = (quality: StarQuality): string =>
  `/static/quality/star${quality}.png`
export const qualityBackground = (quality: StarQuality): string =>
  `/static/quality/background${quality}.png`
export const qualityBackgroundSquare = (quality: StarQuality): string =>
  `/static/quality/background${quality}_square.png`
export const elementalIcon = (element: VisionType): string =>
  `/static/elements/${element}.png`
export const elementalIconWhite = (element: VisionType): string =>
  `/static/elements/${element}_White.png`
export const constellationIcon = (icon: string): string =>
  `/static/constellation_icon/${icon}.png`
export const skillIcon = (icon: string): string => `/static/skill_icon/${icon}.png`
export const propertyIcon = (icon: string): string =>
  `/static/property_icon/${icon}.png`
export const uiIcon = (icon: string): string => `/static/ui/${icon}.png`
