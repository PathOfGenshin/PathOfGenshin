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
    <div className="flex flex-col">
      <div className="flex flex-row">
        <TalentIcon skillName={skill.name} iconName={skill.icon} isLarge />
        <div className="flex flex-col justify-center pl-2 h-16 font-genshin">
          <p>{skill.name}</p>
          <p>Lv. {level}</p>
        </div>
      </div>
      <div className="grid grid-cols-2">
        <div>
          <MemoizedColoredText id={skill.id} text={skill.description} as="span" />
        </div>
        <div>{/* TODO: skill levels based on current level */}</div>
      </div>
    </div>
  )
}
