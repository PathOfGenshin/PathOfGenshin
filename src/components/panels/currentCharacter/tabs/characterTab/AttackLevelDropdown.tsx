import { identity, range } from "lodash"

import { ASCENSION_MAX_TALENT_LEVEL } from "@/components/genshin/characters/ascensions/maxTalentLevel"
import DropdownSelector from "@/components/genshin/dropdown"
import { CharacterConfig, SkillDepotIdentifier } from "@/store/party/characterConfig"

interface AttackLevelDropdownProps {
  config: CharacterConfig
  skillDepot: SkillDepotIdentifier | null
  onSelectedLevel: (level: number) => void
}

export const NormalAttackLevelDropdown: React.FC<AttackLevelDropdownProps> = ({
  config,
  skillDepot,
  onSelectedLevel,
}: AttackLevelDropdownProps) => {
  return (
    <DropdownSelector
      label="Normal Attack Lv."
      width="sm"
      selected={
        skillDepot && config.skillDepot
          ? config.skillSets[config.skillDepot.id]?.levelTalentAttack
          : 1
      }
      options={range(
        1,
        skillDepot ? ASCENSION_MAX_TALENT_LEVEL[config.ascensionLevel] + 1 : 2,
      )}
      onSelected={onSelectedLevel}
      buttonValue={identity}
      optionValue={identity}
    />
  )
}

export const SkillAttackLevelDropdown: React.FC<AttackLevelDropdownProps> = ({
  config,
  skillDepot,
  onSelectedLevel,
}: AttackLevelDropdownProps) => {
  return (
    <DropdownSelector
      label="Skill Lv."
      width="sm"
      selected={
        skillDepot && config.skillDepot
          ? config.skillSets[config.skillDepot.id]?.levelTalentSkill
          : 1
      }
      options={range(
        1,
        skillDepot ? ASCENSION_MAX_TALENT_LEVEL[config.ascensionLevel] + 1 : 2,
      )}
      onSelected={onSelectedLevel}
      buttonValue={identity}
      optionValue={identity}
    />
  )
}

export const BurstAttackLevelDropdown: React.FC<AttackLevelDropdownProps> = ({
  config,
  skillDepot,
  onSelectedLevel,
}: AttackLevelDropdownProps) => {
  return (
    <DropdownSelector
      label="Burst Lv."
      width="sm"
      selected={
        skillDepot && config.skillDepot
          ? config.skillSets[config.skillDepot.id]?.levelTalentBurst
          : 1
      }
      options={range(
        1,
        skillDepot ? ASCENSION_MAX_TALENT_LEVEL[config.ascensionLevel] + 1 : 2,
      )}
      onSelected={onSelectedLevel}
      buttonValue={identity}
      optionValue={identity}
    />
  )
}
