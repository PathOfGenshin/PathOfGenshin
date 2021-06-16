import { useRouter } from "next/router"

import clsx from "clsx"
import { useQuery } from "react-query"

import { querySingleCharacter, querySingleSkillDepot, querySingleWeapon } from "@/db"
import { VisionType } from "@/generated/model/characters"
import { useAppSelector } from "@/store/hooks"
import { CharacterConfig } from "@/store/party/characterConfig"
import { SkillLevels } from "@/store/party/partyModels"
import {
  CharacterData,
  selectCharacterConfig,
  selectCurrentCharacter,
  selectSkillLevels,
} from "@/store/party/partySlice"
import { Disclosure, Transition } from "@headlessui/react"
import { ChevronUpIcon } from "@heroicons/react/solid"

import CharacterInfo from "./CharacterInfo"
import ConstellationInfo from "./ConstellationInfo"
import StatsInfo from "./StatsInfo"
import TalentInfo from "./TalentInfo"
import WeaponInfo from "./WeaponInfo"

interface AccordionSectionProps {
  title: string
  children: React.ReactNode
}

const AccordionSection: React.FC<AccordionSectionProps> = ({
  title,
  children,
}: AccordionSectionProps) => {
  return (
    <Disclosure defaultOpen>
      {({ open }) => (
        <>
          <Disclosure.Button className="flex justify-between py-1 my-1 text-xl tracking-tight text-left font-genshin">
            <span>{title}</span>
            <ChevronUpIcon
              className={clsx("w-5 h-5", open ? "transform rotate-180" : "")}
            />
          </Disclosure.Button>
          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Disclosure.Panel>{children}</Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  )
}

export const StatusPanel: React.FC = () => {
  const { asPath } = useRouter()
  const currentCharacter: CharacterData | null = useAppSelector(selectCurrentCharacter)
  const config: CharacterConfig | null = useAppSelector(selectCharacterConfig)
  const skillLevels: SkillLevels = useAppSelector(selectSkillLevels)
  const { data: character } = useQuery(
    ["character", currentCharacter?.id],
    querySingleCharacter(currentCharacter),
  )
  const { data: weapon } = useQuery(
    ["weapon", currentCharacter?.id, config?.weaponId ?? null],
    querySingleWeapon(config?.weaponId ?? null),
  )
  const { data: skillDepot } = useQuery(
    ["skillDepot", currentCharacter?.id, config?.skillDepot?.id ?? null],
    querySingleSkillDepot(config?.skillDepot?.id ?? null),
  )

  return (
    <div
      className={clsx(
        "flex overflow-y-auto flex-col flex-shrink-0 p-4 w-96 max-w-full opacity-100 transition-opacity duration-200",
        asPath.startsWith("/calculator/current") ? "" : "opacity-30",
      )}
    >
      <AccordionSection title="Character">
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
      </AccordionSection>
      <AccordionSection title="Constellations">
        {config && skillDepot && (
          <ConstellationInfo
            constellations={skillDepot.constellations}
            constellationLevel={config.skillSets[skillDepot.id].constellationLevel}
            element={skillDepot.element}
          />
        )}
        {config && !skillDepot && <p>None</p>}
      </AccordionSection>
      <AccordionSection title="Talents">
        {config && skillDepot && (
          <TalentInfo skills={skillDepot.skills} levels={skillLevels} />
        )}
        {config && !skillDepot && <p>None</p>}
      </AccordionSection>
      <AccordionSection title="Weapon">
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
      </AccordionSection>
      <AccordionSection title="Artifacts">Currently none equipped</AccordionSection>
      <AccordionSection title="Stats">
        {config && <StatsInfo config={config} />}
      </AccordionSection>
    </div>
  )
}
