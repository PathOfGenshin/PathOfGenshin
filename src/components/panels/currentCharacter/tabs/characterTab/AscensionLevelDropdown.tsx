import DropdownSelector from "@/components/genshin/dropdown"
import { Ascension } from "@/generated/model/ascension"
import { Character } from "@/generated/model/characters"
import { CharacterConfig } from "@/store/party/characterConfig"

interface AscensionLevelDropdownProps {
  config: CharacterConfig
  character: Character
  onSelectedAscension: (ascension: Ascension) => void
}

export const AscensionLevelDropdown: React.FC<AscensionLevelDropdownProps> = ({
  config,
  character,
  onSelectedAscension,
}: AscensionLevelDropdownProps) => {
  const ascensionLevelValue = (a: Ascension): number => a.maxLevel
  return (
    <DropdownSelector
      label="Max Level"
      width="sm"
      selected={
        character.ascensions.find((a: Ascension) => a.maxLevel === config.maxLevel) ??
        character.ascensions[0]
      }
      options={character.ascensions}
      onSelected={onSelectedAscension}
      buttonValue={ascensionLevelValue}
      optionValue={ascensionLevelValue}
    />
  )
}
