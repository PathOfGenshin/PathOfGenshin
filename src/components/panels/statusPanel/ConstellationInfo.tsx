import { ConstellationIcon } from "@/components/genshin/characters/ConstellationIcon"
import { CharacterConstellation } from "@/generated/model/character_skills"
import { VisionType } from "@/generated/model/characters"

interface ConstellationInfoProps {
  constellations: CharacterConstellation[]
  constellationLevel: number
  element: VisionType
}

const ConstellationInfo: React.FC<ConstellationInfoProps> = ({
  constellations,
  constellationLevel,
  element,
}: ConstellationInfoProps) => {
  return (
    <div className="flex justify-between w-full">
      {constellations.map((constellation: CharacterConstellation, index: number) => (
        <ConstellationIcon
          key={constellation.id}
          constellationName={constellation.name}
          iconName={constellation.icon}
          disabled={index + 1 > constellationLevel}
          element={element}
        />
      ))}
    </div>
  )
}

export default ConstellationInfo
