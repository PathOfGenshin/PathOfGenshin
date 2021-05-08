import { MouseEventHandler } from "react"

import { Rarity } from "@/assets/static"

export interface AvatarIconProps {
  "data-id"?: number
  "data-name"?: string
  "data-index"?: number
  iconName: string
  charName: string
  rarity: Rarity
  isSelected?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
  disabled?: boolean
}
