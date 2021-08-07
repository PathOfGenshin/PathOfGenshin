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
  skillDepotConfig: CharacterSkillDepotConfig,
): number => {
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
    <div className="flex flex-col space-y-8 w-full">
      {skillDepot &&
        skillDepot.skills.map((skill: CharacterSkill) => (
          <div key={skill.id} className="flex">
            <TalentEntry
              skill={skill}
              level={getSkillLevel(skill.type, config.skillSets[skillDepot.id])}
            />
          </div>
        ))}
    </div>
  )
}
