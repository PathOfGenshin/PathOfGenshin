import Link from "next/link"

import { AnimatePresence, motion, usePresence, Variant } from "framer-motion"
import { useQuery } from "react-query"

import AddCharacterIcon from "@/components/genshin/characters/AddCharacterIcon"
import AvatarSideIcon from "@/components/genshin/characters/AvatarSideIcon"
import { isTravelerId } from "@/components/genshin/characters/traveler"
import { queryCharacters } from "@/db"
import { Character } from "@/generated/model/characters"
import { useAppSelector } from "@/store/hooks"
import {
  CharacterData,
  MAX_PARTY_SIZE,
  selectCharacters,
  selectCurrentCharacter,
} from "@/store/party/partySlice"

interface AnimatedListItemProps {
  children: React.ReactNode
}

type VariantType = "in" | "out"
const variants: Record<VariantType, Variant> = {
  in: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.2 },
  },
  out: {
    scale: 0,
    opacity: 0,
    transition: { duration: 0.2 },
  },
}

const AnimatedListItem: React.FC<AnimatedListItemProps> = ({
  children,
}: AnimatedListItemProps) => {
  const [isPresent, safeToRemove] = usePresence()

  return (
    <motion.div
      layout
      initial="out"
      animate={isPresent ? "in" : "out"}
      exit="out"
      variants={variants}
      onAnimationComplete={() => !isPresent && safeToRemove && safeToRemove()}
    >
      {children}
    </motion.div>
  )
}

export const PartyPanel: React.FC = () => {
  const party: CharacterData[] = useAppSelector(selectCharacters)
  const currentCharacter: CharacterData | null = useAppSelector(selectCurrentCharacter)
  const { data: partyCharacters } = useQuery(
    ["partyCharacters", party],
    queryCharacters(party.map((c: CharacterData) => c.id)),
  )

  const characterItems =
    partyCharacters?.map((char: Character) => (
      <AnimatedListItem key={isTravelerId(char.id) ? char.name : char.id}>
        <Link href={`/calculator/current#${char.name}`} passHref>
          <AvatarSideIcon
            iconName={char.sideIcon}
            charName={char.name}
            quality={char.quality}
            element={char.metadata.vision}
            isSelected={currentCharacter?.id === char.id}
          />
        </Link>
      </AnimatedListItem>
    )) ?? []

  const items = [
    ...characterItems,
    <AnimatedListItem key="addCharacter">
      <Link href="/calculator/party" passHref>
        <AddCharacterIcon disabled={party.length >= MAX_PARTY_SIZE} />
      </Link>
    </AnimatedListItem>,
  ]

  return (
    <div className="flex flex-row justify-center items-center py-2 max-w-full">
      <AnimatePresence>{items.map((item) => item)}</AnimatePresence>
    </div>
  )
}
