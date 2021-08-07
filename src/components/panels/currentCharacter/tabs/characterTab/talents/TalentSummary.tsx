import { CharacterSkill, SkillType } from "@/generated/model/character_skills"
import { CharacterSkillDepot } from "@/generated/model/characters"
import {
  CharacterConfig,
  CharacterSkillDepotConfig,
} from "@/store/party/characterConfig"

import { TalentEntry } from "./TalentEntry"

interface TalentSummaryProps {
  config: CharacterConfig
  skillDepot: CharacterSkillDepot | null
}

const getSkillLevel = (
  skillType: SkillType,
  skillDepotConfig: CharacterSkillDepotConfig | undefined,
): number => {
  if (!skillDepotConfig) return 1
  switch (skillType) {
    case SkillType.Normal:
      return skillDepotConfig.levelTalentAttack
    case SkillType.Skill:
      return skillDepotConfig.levelTalentSkill
    case SkillType.Burst:
      return skillDepotConfig.levelTalentBurst
    default:
      return 1
  }
}

export const TalentSummary: React.FC<TalentSummaryProps> = ({
  config,
  skillDepot,
}: TalentSummaryProps) => {
  return (
    <ul>
      {skillDepot &&
        skillDepot.skills.map((skill: CharacterSkill) => (
          <TalentEntry
            key={skill.id}
            skill={skill}
            level={getSkillLevel(skill.type, config.skillSets[skillDepot.id])}
          />
        ))}
    </ul>
  )
}
