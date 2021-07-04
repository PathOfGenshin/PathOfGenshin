import { useRouter } from "next/router"

import clsx from "clsx"
import { useQuery } from "react-query"

import { Accordion } from "@/components"
import { querySingleCharacter, querySingleSkillDepot, querySingleWeapon } from "@/db"
import { VisionType } from "@/generated/model/characters"
import { useAppSelector } from "@/store/hooks"
import { CharacterConfig } from "@/store/party/characterConfig"
import { SkillLevels } from "@/store/party/characterConfig"
import {
  CharacterData,
  selectCharacterConfig,
  selectCurrentCharacter,
  selectSkillLevels,
} from "@/store/party/partySlice"
import { selectAnimateAccordion } from "@/store/settings/settingsSlice"

import CharacterInfo from "./CharacterInfo"
import ConstellationInfo from "./ConstellationInfo"
import StatsInfo from "./StatsInfo"
import TalentInfo from "./TalentInfo"
import WeaponInfo from "./WeaponInfo"

export const StatusPanel: React.FC = () => {
  const { asPath } = useRouter()
  const currentCharacter: CharacterData | null = useAppSelector(selectCurrentCharacter)
  const config: CharacterConfig | null = useAppSelector(selectCharacterConfig)
  const skillLevels: SkillLevels = useAppSelector(selectSkillLevels)
  const { data: character } = useQuery(
    ["character", currentCharacter?.id],
    querySingleCharacter(currentCharacter?.id ?? null),
  )
  const { data: weapon } = useQuery(
    ["weapon", currentCharacter?.id, config?.weaponId ?? null],
    querySingleWeapon(config?.weaponId ?? null),
  )
  const { data: skillDepot } = useQuery(
    ["skillDepot", currentCharacter?.id, config?.skillDepot?.id ?? null],
    querySingleSkillDepot(config?.skillDepot?.id ?? null),
  )
  const animateAccordion = useAppSelector(selectAnimateAccordion)

  return (
    <div
      className={clsx(
        "flex overflow-y-auto flex-col flex-shrink-0 p-4 w-96 max-w-full opacity-100 transition-opacity duration-200",
        asPath.startsWith("/calculator/current") ? "" : "opacity-30",
      )}
    >
      <Accordion title="Character" animatedHeight={animateAccordion}>
        {character && config && (
          <CharacterInfo
            iconName={character.icon}
            charName={character.name}
            quality={character.quality}
            element={config.skillDepot?.element ?? VisionType.None}
            title={
              character && character.metadata.title
                ? character.metadata.title
                : "\u00A0"
            }
            description={character.metadata.description}
            birthday={
              character &&
              character.metadata.birthMonth > 0 &&
              character.metadata.birthDay > 0
                ? `${character.metadata.birthMonth}/${character.metadata.birthDay}`
                : "N/A"
            }
            affiliation={character.metadata.affiliation}
            vision={character.metadata.vision}
            constellationName={character.metadata.constellation}
            level={config.level}
            maxLevel={config.maxLevel}
          />
        )}
      </Accordion>
      <Accordion title="Constellations" animatedHeight={animateAccordion}>
        {config && skillDepot && (
          <ConstellationInfo
            constellations={skillDepot.constellations}
            constellationLevel={
              config.skillSets[skillDepot.id]?.constellationLevel ?? 0
            }
            element={skillDepot.element}
          />
        )}
        {config && !skillDepot && <p>None</p>}
      </Accordion>
      <Accordion title="Talents" animatedHeight={animateAccordion}>
        {config && skillDepot && (
          <TalentInfo skills={skillDepot.skills} levels={skillLevels} />
        )}
        {config && !skillDepot && <p>None</p>}
      </Accordion>
      <Accordion title="Weapon" animatedHeight={animateAccordion}>
        {config && weapon && (
          <WeaponInfo
            iconName={weapon.icon}
            awakenIconName={weapon.iconAwakened}
            quality={weapon.quality}
            weaponName={weapon.name}
            description={weapon.description}
            level={config.weaponLevel}
            maxLevel={config.weaponMaxLevel}
          />
        )}
      </Accordion>
      <Accordion title="Artifacts" animatedHeight={animateAccordion}>
        Currently none equipped
      </Accordion>
      <Accordion title="Stats" animatedHeight={animateAccordion}>
        {config && <StatsInfo config={config} />}
      </Accordion>
    </div>
  )
}
