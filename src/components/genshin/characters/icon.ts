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
  "data-id": number
  "data-name": string
  "data-weapon-id": number
  onClick?: MouseEventHandler<HTMLButtonElement>
  disabled?: boolean
}
