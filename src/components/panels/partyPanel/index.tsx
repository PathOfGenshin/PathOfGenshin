import SideIcon from "@/components/genshin/characters/SideIcon"
import SideIconAdd from "@/components/genshin/characters/SideIconAdd"
import { useAppSelector } from "@/store/hooks"
import { MAX_PARTY_SIZE, selectPartySize } from "@/store/party/partySlice"

export const PartyPanel: React.FC = () => {
  const partySize: number = useAppSelector(selectPartySize)

  return (
    <div className="relative flex flex-row items-center justify-center py-2">
      <SideIcon
        iconName="UI_AvatarIcon_Side_Keqing"
        charName="Keqing"
        isSelected
        rarity={5}
      />
      {partySize < MAX_PARTY_SIZE && <SideIconAdd />}
    </div>
  )
}
