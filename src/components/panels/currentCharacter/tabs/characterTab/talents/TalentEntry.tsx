import { MemoizedFlavouredText } from "@/components/dynamic/FlavouredText"
import { TalentIcon } from "@/components/genshin/characters/TalentIcon"
import { CharacterSkill, SkillLevel } from "@/generated/model/character_skills"

import { MemoizedTalentSkillAttributes } from "./TalentSkillAttributes"

interface TalentEntryProps {
  level: number
  skill: CharacterSkill
}

export const TalentEntry: React.FC<TalentEntryProps> = ({
  level,
  skill,
}: TalentEntryProps) => {
  if (level < 1 || level > 15) return null
  const skillLevel: SkillLevel = skill.levels[level - 1]
  return (
    <li className="p-2 rounded-md hover:bg-gray-300 dark:hover:bg-g-dark-800">
      <div className="grid grid-cols-2 space-x-2">
        {/* Left column */}
        <div>
          <div className="flex flex-row">
            <TalentIcon skillName={skill.name} iconName={skill.icon} isLarge />
            <div className="flex flex-col justify-center pl-2 h-16 font-genshin">
              <p>{skill.name}</p>
              <p>Lv. {level}</p>
            </div>
          </div>
          <div>
            <MemoizedFlavouredText id={skill.id} text={skill.description} />
          </div>
        </div>
        {/* Right column */}
        <div>
          <h2 className="text-center font-genshin text-g-dark-1">Skill Attributes</h2>
          <MemoizedTalentSkillAttributes
            level={skillLevel.level}
            params={skillLevel.params}
          />
        </div>
      </div>
    </li>
  )
}
