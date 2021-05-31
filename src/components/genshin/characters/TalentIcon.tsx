import Image from "next/image"

import clsx from "clsx"

import { skillIcon } from "@/assets/static"
import image from "@/styles/image.module.scss"

interface TalentIconProps {
  skillName: string
  iconName: string
}

export const TalentIcon: React.FC<TalentIconProps> = ({
  skillName,
  iconName,
}: TalentIconProps) => {
  return (
    <div title={skillName}>
      <span className="sr-only">{skillName} Icon</span>
      <div
        className={clsx(
          "box-content w-14 h-14 rounded-full pointer-events-none select-none",
        )}
      >
        <Image
          className={clsx("pointer-events-none select-none", image.crisp)}
          src={skillIcon(iconName)}
          alt={skillName}
          quality={100}
          width={128}
          height={128}
        />
      </div>
    </div>
  )
}
