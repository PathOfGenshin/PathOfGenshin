import { MemoizedFlavouredText } from "@/components/dynamic/FlavouredText"
import { TalentIcon } from "@/components/genshin/characters/TalentIcon"
import { CharacterPassive } from "@/generated/model/character_skills"

interface PassiveEntryProps {
  passive: CharacterPassive
}

export const PassiveEntry: React.FC<PassiveEntryProps> = ({
  passive,
}: PassiveEntryProps) => {
  return (
    <li className="p-2 rounded-md hover:bg-gray-300 dark:hover:bg-g-dark-800">
      <div className="flex flex-row">
        <TalentIcon skillName={passive.name} iconName={passive.icon} isLarge />
        <div className="flex flex-col justify-center pl-2 h-16 font-genshin">
          <p>{passive.name}</p>
        </div>
      </div>
      <div>
        <MemoizedFlavouredText id={passive.groupId} text={passive.description} />
      </div>
    </li>
  )
}
