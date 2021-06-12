import { MouseEventHandler } from "react"

import { VisionType } from "@/generated/model/characters"
import { StarQuality } from "@/generated/model/type_aliases"

export interface AvatarIconProps {
  iconName: string
  charName: string
  quality: StarQuality
  element: VisionType
  isSelected?: boolean
  label?: string
}

export interface AvatarIconButtonProps extends AvatarIconProps {
  onClick?: MouseEventHandler<HTMLButtonElement>
  disabled?: boolean
}
