import { useRouter } from "next/router"

import clsx from "clsx"
import { useLiveQuery } from "dexie-react-hooks"

import { querySingleCharacter, querySingleWeapon } from "@/db"
import { Character, VisionType } from "@/generated/model/characters"
import { Weapon } from "@/generated/model/weapon"
import { useAppSelector } from "@/store/hooks"
import { CharacterConfig } from "@/store/party/characterConfig"
import {
  CharacterData,
  selectCharacterConfig,
  selectCurrentCharacter,
} from "@/store/party/partySlice"
import { Disclosure, Transition } from "@headlessui/react"
import { ChevronUpIcon } from "@heroicons/react/solid"

import CharacterInfo from "./CharacterInfo"
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
          <Disclosure.Button className="flex justify-between py-1 my-1 text-xl tracking-tight leading-6 text-left font-genshin">
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
  const character: Character | null | undefined = useLiveQuery(
    querySingleCharacter(currentCharacter),
    [currentCharacter],
  )
  const weapon: Weapon | null | undefined = useLiveQuery(
    querySingleWeapon(config?.weaponId ?? null),
    [config],
  )

  return (
    <div
      className={clsx(
        "flex flex-col flex-shrink-0 p-4 w-96 max-w-full opacity-100 transition-opacity duration-200",
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
                ? `${character.metadata.birthDay}/${character.metadata.birthMonth}`
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
        {config && <div>{config.constellationLevel}</div>}
      </AccordionSection>
      <AccordionSection title="Talents">
        {config && (
          <>
            <div>{config.levelTalentAttack}</div>
            <div>{config.levelTalentSkill}</div>
            <div>{config.levelTalentBurst}</div>
          </>
        )}
      </AccordionSection>
      <AccordionSection title="Weapon">
        {weapon && (
          <WeaponInfo
            iconName={weapon.icon}
            awakenIconName={weapon.iconAwakened}
            quality={weapon.quality}
            weaponName={weapon.name}
            description={weapon.description}
            level={1}
            maxLevel={20}
          />
        )}
      </AccordionSection>
      <AccordionSection title="Artifacts">Currently none equipped</AccordionSection>
      <AccordionSection title="Stats">TODO</AccordionSection>
    </div>
  )
}
