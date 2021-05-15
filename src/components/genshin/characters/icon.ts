import { MouseEventHandler } from "react"

import { GenshinElement, Rarity } from "@/assets/static"

export interface AvatarIconProps {
  "data-id"?: number
  "data-name"?: string
  iconName: string
  charName: string
  rarity: Rarity
  element: GenshinElement
  isSelected?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
  disabled?: boolean
}
