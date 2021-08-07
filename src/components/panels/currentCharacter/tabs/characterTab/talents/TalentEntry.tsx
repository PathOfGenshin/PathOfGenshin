import { MemoizedColoredText } from "@/components/dynamic/ColoredText"
import { TalentIcon } from "@/components/genshin/characters/TalentIcon"
import { CharacterSkill } from "@/generated/model/character_skills"

interface TalentEntryProps {
  level: number
  skill: CharacterSkill
}

export const TalentEntry: React.FC<TalentEntryProps> = ({
  level,
  skill,
}: TalentEntryProps) => {
  return (
    <li className="p-2 rounded-md hover:bg-gray-300 dark:hover:bg-g-dark-800">
      <div className="grid grid-cols-2">
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
            <MemoizedColoredText id={skill.id} text={skill.description} />
          </div>
        </div>
        {/* Right column */}
        <div>{/* TODO: stats for each talent level */}</div>
      </div>
    </li>
  )
}
