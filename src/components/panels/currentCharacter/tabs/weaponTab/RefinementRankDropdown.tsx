import { identity, range } from "lodash"

import DropdownSelector from "@/components/genshin/dropdown"
import { CharacterConfig } from "@/store/party/characterConfig"

interface RefinementRankDropdownProps {
  config: CharacterConfig
  onSelectedRank: (rank: number) => void
}

export const RefinementRankDropdown: React.FC<RefinementRankDropdownProps> = ({
  config,
  onSelectedRank,
}: RefinementRankDropdownProps) => {
  return (
    <DropdownSelector
      label="Refinement Rank"
      width="sm"
      selected={config.weaponRefinement}
      options={range(1, 6)}
      onSelected={onSelectedRank}
      buttonValue={identity}
      optionValue={identity}
    />
  )
}
