import { MemoizedColoredText } from "@/components/dynamic/ColoredText"
import { ConstellationIcon } from "@/components/genshin/characters/ConstellationIcon"
import { CharacterConstellation } from "@/generated/model/character_skills"
import { VisionType } from "@/generated/model/characters"

interface ConstellationEntryProps {
  level: number
  constellation: CharacterConstellation
  element: VisionType
}

export const ConstellationEntry: React.FC<ConstellationEntryProps> = ({
  level,
  constellation,
  element,
}: ConstellationEntryProps) => {
  return (
    <li className="p-2 rounded-md hover:bg-gray-300 dark:hover:bg-g-dark-800">
      <h2 className="mb-1 font-genshin">
        {constellation.name} ({level})
      </h2>
      <div className="flex items-center space-x-4">
        <ConstellationIcon
          key={constellation.id}
          constellationName={constellation.name}
          iconName={constellation.icon}
          element={element}
        />
        <span>
          <MemoizedColoredText id={constellation.id} text={constellation.description} />
        </span>
      </div>
    </li>
  )
}
