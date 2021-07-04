import { identity, range } from "lodash"

import DropdownSelector from "@/components/genshin/dropdown"
import { CharacterConfig } from "@/store/party/characterConfig"

interface LevelDropdownProps {
  config: CharacterConfig
  onSelectedLevel: (level: number) => void
}

export const LevelDropdown: React.FC<LevelDropdownProps> = ({
  config,
  onSelectedLevel,
}: LevelDropdownProps) => {
  return (
    <DropdownSelector
      label="Level"
      width="sm"
      selected={config.weaponLevel}
      options={range(config.weaponLowerMaxLevel, config.weaponMaxLevel + 1)}
      onSelected={onSelectedLevel}
      buttonValue={identity}
      optionValue={identity}
    />
  )
}
