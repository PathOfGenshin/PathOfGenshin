import { CharacterPassive } from "@/generated/model/character_skills"
import { CharacterSkillDepot } from "@/generated/model/characters"
import { CharacterConfig } from "@/store/party/characterConfig"

import { PassiveEntry } from "./PassiveEntry"

interface PassiveSummaryProps {
  config: CharacterConfig
  skillDepot: CharacterSkillDepot | null
}

export const PassiveSummary: React.FC<PassiveSummaryProps> = ({
  config,
  skillDepot,
}: PassiveSummaryProps) => {
  return (
    <ul>
      {skillDepot &&
        skillDepot.passives
          .filter(
            (passive: CharacterPassive) =>
              passive.requiredAscensionLevel <= config.ascensionLevel,
          )
          .map((passive: CharacterPassive) => (
            <PassiveEntry key={passive.groupId} passive={passive} />
          ))}
    </ul>
  )
}
