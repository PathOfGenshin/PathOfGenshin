import { TalentIcon } from "@/components/genshin/characters/TalentIcon"
import { CharacterSkill } from "@/generated/model/character_skills"
import { SkillLevels } from "@/store/party/characterConfig"

interface TalentInfoProps {
  skills: CharacterSkill[]
  levels: SkillLevels
}

export const TalentInfo: React.FC<TalentInfoProps> = ({
  skills,
  levels,
}: TalentInfoProps) => {
  return (
    <div className="flex flex-col w-full">
      {skills.map((skill: CharacterSkill) => (
        <div key={skill.id} className="flex">
          <TalentIcon skillName={skill.name} iconName={skill.icon} />
          <div className="flex flex-col justify-between py-1 pl-2 h-14">
            <p>{skill.name}</p>
            <p className="font-bold">Lv. {levels[skill.type]}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
