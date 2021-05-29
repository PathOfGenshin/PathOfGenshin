import { SkillType } from "@/generated/model/character_skills"

export interface SkillLevels {
  [SkillType.Normal]: number
  [SkillType.Skill]: number
  [SkillType.Burst]: number
  [SkillType.AlternateSprint]: 1
}
