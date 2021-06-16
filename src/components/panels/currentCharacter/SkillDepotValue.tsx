import Image from "next/image"

import { elementalIcon } from "@/assets/static"
import { VisionType } from "@/generated/model/characters"

interface SkillDepotValueProps {
  element: VisionType
}

const SkillDepotValue: React.FC<SkillDepotValueProps> = ({
  element,
}: SkillDepotValueProps) => {
  return (
    <span className="flex items-center min-w-0">
      <span className="flex-shrink-0 w-5 h-5">
        <Image src={elementalIcon(element)} width={32} height={32} />
      </span>
      <span className="px-2 truncate">{element}</span>
    </span>
  )
}

export default SkillDepotValue
