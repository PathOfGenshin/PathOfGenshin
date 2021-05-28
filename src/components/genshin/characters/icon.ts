import { MouseEventHandler } from "react"

import { GenshinElement } from "@/assets/static"
import { StarQuality } from "@/generated/model/type_aliases"

export interface AvatarIconProps {
  iconName: string
  charName: string
  quality: StarQuality
  element: GenshinElement
  isSelected?: boolean
  label?: string
}

export interface AvatarIconButtonProps extends AvatarIconProps {
  "data-id": number
  "data-name": string
  "data-weapon-id": number
  onClick?: MouseEventHandler<HTMLButtonElement>
  disabled?: boolean
}
