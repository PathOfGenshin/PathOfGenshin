import { DropdownSelector } from "@/components/genshin/dropdown"
import { CharacterSkillDepot, VisionType } from "@/generated/model/characters"
import { CharacterConfig } from "@/store/party/characterConfig"

import { SkillDepotValue } from "../../SkillDepotValue"

interface SkillSetDropdownProps {
  config: CharacterConfig
  availableSkillDepots: CharacterSkillDepot[]
  onSelectedSkillDepot: (skillDepot: CharacterSkillDepot | null) => void
}

export const SkillSetDropdown: React.FC<SkillSetDropdownProps> = ({
  config,
  availableSkillDepots,
  onSelectedSkillDepot,
}: SkillSetDropdownProps) => {
  const skillDepotOptions = (
    availableSkillDepots: CharacterSkillDepot[],
  ): Array<CharacterSkillDepot | null> => [null, ...availableSkillDepots]

  const selectedSkillDepotValue = (
    skillDepot: CharacterSkillDepot | null,
  ): React.ReactNode => (
    <SkillDepotValue element={skillDepot?.element ?? VisionType.None} />
  )

  return (
    <DropdownSelector
      label="Skill Set"
      width="md"
      selected={
        availableSkillDepots.find(
          (skillDepot: CharacterSkillDepot) => skillDepot.id === config.skillDepot?.id,
        ) ?? null
      }
      options={skillDepotOptions(availableSkillDepots)}
      onSelected={onSelectedSkillDepot}
      buttonValue={selectedSkillDepotValue}
      optionValue={selectedSkillDepotValue}
      disabled={availableSkillDepots.length <= 1}
    />
  )
}
