import { memo } from "react"

import { range } from "lodash"

import { parseDescription } from "@/components/dynamic/ColoredText"
import { ConstellationIcon } from "@/components/genshin/characters/ConstellationIcon"
import { CharacterConstellation } from "@/generated/model/character_skills"
import {
  Character,
  CharacterSkillDepot,
  VisionType,
} from "@/generated/model/characters"
import { CharacterConfig } from "@/store/party/characterConfig"

interface ConstellationSummaryProps {
  config: CharacterConfig
  character: Character
  skillDepot: CharacterSkillDepot | null
}

interface ConstellationEntryProps {
  level: number
  constellation: CharacterConstellation
  element: VisionType
}

const ConstellationEntry: React.FC<ConstellationEntryProps> = ({
  level,
  constellation,
  element,
}: ConstellationEntryProps) => {
  return (
    <li className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-g-dark-800">
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
          {parseDescription(constellation.description).map((output) => output)}
        </span>
      </div>
    </li>
  )
}

const MemoizedConstellationEntry = memo(ConstellationEntry)

export const ConstellationSummary: React.FC<ConstellationSummaryProps> = ({
  config,
  skillDepot,
}: ConstellationSummaryProps) => {
  const constellationLevels: number[] = range(
    0,
    skillDepot && config.skillDepot
      ? config.skillSets[config.skillDepot.id].constellationLevel
      : 0,
  )

  return (
    <div>
      <h3>
        {constellationLevels.length} constellation
        {constellationLevels.length === 1 ? "" : "s"} unlocked.
      </h3>
      <ul>
        {skillDepot &&
          constellationLevels.length > 0 &&
          constellationLevels.map((levelIndex: number) => (
            <MemoizedConstellationEntry
              key={levelIndex}
              level={levelIndex + 1}
              constellation={skillDepot.constellations[levelIndex]}
              element={skillDepot.element}
            />
          ))}
      </ul>
    </div>
  )
}
