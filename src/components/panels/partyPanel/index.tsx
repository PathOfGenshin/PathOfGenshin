import SideIcon from "@/components/genshin/characters/SideIcon"
import SideIconAdd from "@/components/genshin/characters/SideIconAdd"
import { useAppSelector } from "@/store/hooks"
import { MAX_PARTY_SIZE, selectPartySize } from "@/store/party/partySlice"

export const PartyPanel: React.FC = () => {
  const partySize: number = useAppSelector(selectPartySize)

  return (
    <div className="relative flex flex-row items-center justify-center py-2">
      <SideIcon image="/static/avatar_icon/UI_AvatarIcon_Side_Keqing.png" isSelected />
      {partySize < MAX_PARTY_SIZE && <SideIconAdd />}
    </div>
  )
}
