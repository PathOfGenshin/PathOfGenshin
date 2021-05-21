import { MouseEventHandler } from "react"

import { GenshinElement, Rarity } from "@/assets/static"

export interface AvatarIconProps {
  iconName: string
  charName: string
  rarity: Rarity
  element: GenshinElement
  isSelected?: boolean
  label?: string
}

export interface AvatarIconButtonProps extends AvatarIconProps {
  "data-id"?: number
  "data-name"?: string
  onClick?: MouseEventHandler<HTMLButtonElement>
  disabled?: boolean
}
