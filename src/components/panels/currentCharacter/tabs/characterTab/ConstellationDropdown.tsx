import { identity, range } from "lodash"

import { DropdownSelector } from "@/components/genshin/dropdown"
import { CharacterSkillDepot } from "@/generated/model/characters"
import { CharacterConfig, ConstellationLevel } from "@/store/party/characterConfig"

interface ConstellationDropdownProps {
  config: CharacterConfig
  skillDepot: CharacterSkillDepot | null
  onSelectedConstellationLevel: (constellationLevel: ConstellationLevel) => void
}

export const ConstellationDropdown: React.FC<ConstellationDropdownProps> = ({
  config,
  skillDepot,
  onSelectedConstellationLevel,
}: ConstellationDropdownProps) => {
  return (
    <DropdownSelector
      label="Constellations"
      width="sm"
      selected={
        skillDepot && config.skillDepot
          ? config.skillSets[config.skillDepot.id]?.constellationLevel
          : 0
      }
      options={
        range(0, (skillDepot?.constellations.length ?? 0) + 1) as ConstellationLevel[]
      }
      onSelected={onSelectedConstellationLevel}
      buttonValue={identity}
      optionValue={identity}
    />
  )
}
