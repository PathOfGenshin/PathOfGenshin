import { range } from "lodash"

import { Character, CharacterSkillDepot } from "@/generated/model/characters"
import { CharacterConfig } from "@/store/party/characterConfig"

import { ConstellationEntry } from "./ConstellationEntry"

interface ConstellationSummaryProps {
  config: CharacterConfig
  character: Character
  skillDepot: CharacterSkillDepot | null
}

export const ConstellationSummary: React.FC<ConstellationSummaryProps> = ({
  config,
  skillDepot,
}: ConstellationSummaryProps) => {
  const constellationLevels: number[] = range(
    0,
    skillDepot && config.skillDepot
      ? config.skillSets[config.skillDepot.id]?.constellationLevel
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
            <ConstellationEntry
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
