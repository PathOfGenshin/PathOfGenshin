import { DropdownSelector } from "@/components/genshin/dropdown"
import { Ascension } from "@/generated/model/ascension"
import { Weapon } from "@/generated/model/weapon"
import { CharacterConfig } from "@/store/party/characterConfig"

interface MaxLevelDropdownProps {
  config: CharacterConfig
  weapon: Weapon
  onSelectedAscension: (ascension: Ascension) => void
}

export const MaxLevelDropdown: React.FC<MaxLevelDropdownProps> = ({
  config,
  weapon,
  onSelectedAscension,
}: MaxLevelDropdownProps) => {
  const ascensionLevelValue = (a: Ascension): number => a.maxLevel
  return (
    <DropdownSelector
      label="Max Level"
      width="sm"
      selected={
        weapon.ascensions.find(
          (a: Ascension) => a.maxLevel === config.weaponMaxLevel,
        ) ?? weapon.ascensions[0]
      }
      options={weapon.ascensions}
      onSelected={onSelectedAscension}
      buttonValue={ascensionLevelValue}
      optionValue={ascensionLevelValue}
    />
  )
}
