import { AvatarIcon } from "@/components/genshin/characters/AvatarIcon"
import { VisionType } from "@/generated/model/characters"
import { StarQuality } from "@/generated/model/type_aliases"

interface CharacterInfoProps {
  iconName: string
  charName: string
  quality: StarQuality
  element: VisionType
  title: string
  description: string
  birthday: string
  affiliation: string
  vision: string
  constellationName: string
  level: number
  maxLevel: number
}

const CharacterInfo: React.FC<CharacterInfoProps> = ({
  iconName,
  charName,
  quality,
  element,
  title,
  description,
  birthday,
  affiliation,
  vision,
  constellationName,
  level,
  maxLevel,
}: CharacterInfoProps) => {
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row space-x-2">
        <AvatarIcon
          iconName={iconName}
          charName={charName}
          quality={quality}
          element={element}
          label={`Lv. ${level} / ${maxLevel}`}
        />
        <div className="flex flex-col text-sm">
          <h2 className="text-lg font-genshin">{charName}</h2>
          <p className="font-genshin">{title}</p>
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
