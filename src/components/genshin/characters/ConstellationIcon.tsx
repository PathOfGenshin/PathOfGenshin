import Image from "next/image"
import clsx from "clsx"

import { constellationIcon } from "@/assets/static"
import { VisionType } from "@/generated/model/characters"
import elements from "@/styles/elements.module.scss"
import image from "@/styles/image.module.scss"

interface ConstellationIconProps {
  constellationName: string
  iconName: string
  disabled?: boolean
  element: VisionType
}

export const ConstellationIcon: React.FC<ConstellationIconProps> = ({
  constellationName,
  iconName,
  disabled,
  element,
}: ConstellationIconProps) => {
  return (
    <div title={constellationName}>
      <span className="sr-only">{constellationName} Icon</span>
      <div
        className={clsx(
          "box-content w-12 h-12 rounded-full border-2 pointer-events-none select-none",
          disabled ? "opacity-30" : "opacity-100",
          elements[element],
        )}
      >
        <Image
          className={clsx("pointer-events-none select-none", image.crisp)}
          src={constellationIcon(iconName)}
          alt={constellationName}
          quality={100}
          width={128}
          height={128}
        />
      </div>
    </div>
  )
}
