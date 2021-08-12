import { identity, range } from "lodash"

import { DropdownSelector } from "@/components/genshin/dropdown"
import { Weapon } from "@/generated/model/weapon"
import { CharacterConfig } from "@/store/party/characterConfig"

interface RefinementRankDropdownProps {
  config: CharacterConfig
  weapon: Weapon
  onSelectedRank: (rank: number) => void
}

export const RefinementRankDropdown: React.FC<RefinementRankDropdownProps> = ({
  config,
  weapon,
  onSelectedRank,
}: RefinementRankDropdownProps) => {
  return (
    <DropdownSelector
      label="Refinement Rank"
      width="sm"
      selected={config.weaponRefinement}
      options={range(1, weapon.maxRefinement + 1)}
      onSelected={onSelectedRank}
      buttonValue={identity}
      optionValue={identity}
      disabled={weapon.maxRefinement === 1}
    />
  )
}
