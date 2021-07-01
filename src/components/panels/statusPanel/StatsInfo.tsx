import { useQuery } from "react-query"

import PropertyIcon from "@/components/genshin/stats/PropertyIcon"
import { queryTextMappings } from "@/db"
import { CharacterConfig } from "@/store/party/characterConfig"

interface StatsInfoProps {
  config: CharacterConfig
}

interface StatRow {
  key: string
  icon?: string
}

const BASE_STAT_ROWS: StatRow[] = [
  { key: "FIGHT_PROP_MAX_HP", icon: "UI_Icon_MaxHp" },
  { key: "FIGHT_PROP_CUR_ATTACK", icon: "UI_Icon_CurAttack" },
  { key: "FIGHT_PROP_CUR_DEFENSE", icon: "UI_Icon_CurDefense" },
  { key: "FIGHT_PROP_ELEMENT_MASTERY", icon: "UI_Icon_Element" },
  { key: "PROP_MAX_STAMINA", icon: "UI_Icon_MaxStamina" },
]

const ADVANCED_STAT_ROWS: StatRow[] = [
  { key: "FIGHT_PROP_CRITICAL", icon: "UI_Icon_Critical" },
  { key: "FIGHT_PROP_CRITICAL_HURT" },
  { key: "FIGHT_PROP_HEAL_ADD", icon: "UI_Icon_Heal" },
  { key: "FIGHT_PROP_HEALED_ADD" },
  { key: "FIGHT_PROP_CHARGE_EFFICIENCY", icon: "UI_Icon_ChargeEfficiency" },
  { key: "FIGHT_PROP_SKILL_CD_MINUS_RATIO", icon: "UI_Icon_CDReduce" },
  { key: "FIGHT_PROP_SHIELD_COST_MINUS_RATIO", icon: "UI_Icon_ShieldCostMinus" },
]

const ELEMENTAL_STAT_ROWS: StatRow[] = [
  { key: "FIGHT_PROP_FIRE_ADD_HURT", icon: "UI_Icon_Element_Fire" },
  { key: "FIGHT_PROP_FIRE_SUB_HURT" },
  { key: "FIGHT_PROP_WATER_ADD_HURT", icon: "UI_Icon_Element_Water" },
  { key: "FIGHT_PROP_WATER_SUB_HURT" },
  { key: "FIGHT_PROP_GRASS_ADD_HURT", icon: "UI_Icon_Element_Grass" },
  { key: "FIGHT_PROP_GRASS_SUB_HURT" },
  { key: "FIGHT_PROP_ELEC_ADD_HURT", icon: "UI_Icon_Element_Electric" },
  { key: "FIGHT_PROP_ELEC_SUB_HURT" },
  { key: "FIGHT_PROP_WIND_ADD_HURT", icon: "UI_Icon_Element_Wind" },
  { key: "FIGHT_PROP_WIND_SUB_HURT" },
  { key: "FIGHT_PROP_ICE_ADD_HURT", icon: "UI_Icon_Element_Ice" },
  { key: "FIGHT_PROP_ICE_SUB_HURT" },
  { key: "FIGHT_PROP_ROCK_ADD_HURT", icon: "UI_Icon_Element_Rock" },
  { key: "FIGHT_PROP_ROCK_SUB_HURT" },
  { key: "FIGHT_PROP_PHYSICAL_ADD_HURT", icon: "UI_Icon_PhysicalAttackUp" },
  { key: "FIGHT_PROP_PHYSICAL_SUB_HURT" },
]

const StatsInfo: React.FC<StatsInfoProps> = ({ config }: StatsInfoProps) => {
  const rows = [BASE_STAT_ROWS, ADVANCED_STAT_ROWS, ELEMENTAL_STAT_ROWS]
  const { data: textMappings } = useQuery(
    "fightPropTextMappings",
    queryTextMappings(rows.flat().map((entry) => entry.key)),
  )

  return (
    <div className="space-y-2">
      {config.skillDepot?.element /* TODO calculate stats using config */}
      {textMappings &&
        rows.map((statRow: StatRow[], index: number) => (
          <ul key={index}>
            {statRow.map((entry: StatRow) => (
              <li
                className="flex flex-row items-center h-6 text-sm leading-6 font-genshin"
                key={entry.key}
              >
                <div className="flex justify-center items-center w-6 h-6">
                  {entry.icon && (
                    <PropertyIcon
                      iconName={entry.icon}
                      property={textMappings[entry.key]}
                    />
                  )}
                </div>
                <div className="ml-1 h-6">{textMappings[entry.key]}</div>
              </li>
            ))}
          </ul>
        ))}
    </div>
  )
}

export default StatsInfo
