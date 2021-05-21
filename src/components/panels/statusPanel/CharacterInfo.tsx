import { GenshinElement, Rarity } from "@/assets/static"
import { AvatarIcon } from "@/components/genshin/characters/AvatarIcon"

interface CharacterInfoProps {
  iconName: string
  charName: string
  rarity: Rarity
  element: GenshinElement
  title: string
  description: string
  birthday: string
  affiliation: string
  vision: string
  constellationName: string
}

const CharacterInfo: React.FC<CharacterInfoProps> = ({
  iconName,
  charName,
  rarity,
  element,
  title,
  description,
  birthday,
  affiliation,
  vision,
  constellationName,
}: CharacterInfoProps) => {
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row space-x-2">
        <AvatarIcon
          iconName={iconName}
          charName={charName}
          rarity={rarity}
          element={element}
          label={"80 / 90"} // TODO: level for current char
        />
        <div className="flex flex-col text-sm">
          <h2 className="text-lg tracking-tight leading-6 font-genshin">{charName}</h2>
          <p className="text-xs tracking-tight leading-6 font-genshin">{title}</p>
          <p className="my-0.5">Birthday: {birthday}</p>
          <p className="my-0.5">Affiliation: {affiliation}</p>
          <p className="my-0.5">Vision: {vision}</p>
          <p className="my-0.5">Constellation: {constellationName}</p>
        </div>
      </div>
      <p className="mt-2 text-sm italic">{description}</p>
    </div>
  )
}

export default CharacterInfo
