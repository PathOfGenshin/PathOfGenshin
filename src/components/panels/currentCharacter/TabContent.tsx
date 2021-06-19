import React from "react"

import { TravelerGender } from "@/components/genshin/characters/traveler"
import { Character } from "@/generated/model/characters"
import { selectCurrentTab } from "@/store/currentTab/currentTabSlice"
import { useAppSelector } from "@/store/hooks"
import { CharacterConfig } from "@/store/party/characterConfig"
import { selectTravelerGender } from "@/store/settings/settingsSlice"

import RemoveFromPartyButton from "./RemoveFromPartyButton"
import TabSelector from "./TabSelector"
import { ArtifactsTab } from "./tabs/ArtifactsTab"
import { PartyTab } from "./tabs/PartyTab"
import { WeaponsTab } from "./tabs/WeaponsTab"
import CharacterTab from "./tabs/characterTab"
import { TabType } from "./tabs/tabType"

export interface TabContentProps {
  character: Character
  config: CharacterConfig
}

const TAB_MAPPING: Record<TabType, React.FC<TabContentProps>> = {
  [TabType.Character]: CharacterTab,
  [TabType.Weapon]: WeaponsTab,
  [TabType.Artifacts]: ArtifactsTab,
  [TabType.Party]: PartyTab,
}

const TabContent: React.FC<TabContentProps> = ({
  character,
  config,
}: TabContentProps) => {
  const travelerGender: TravelerGender | null = useAppSelector(selectTravelerGender)
  const currentTab: TabType = useAppSelector(selectCurrentTab)

  const CurrentTabComponent = TAB_MAPPING[currentTab]

  return (
    <div className="w-full font-genshin">
      {/* Tabs */}
      <div className="flex flex-col justify-between items-center mb-4 md:flex-row">
        <div className="flex flex-row flex-wrap justify-center 2xl:justify-between">
          <TabSelector
            tab={TabType.Character}
            isActive={currentTab === TabType.Character}
            label="Character"
            icon={
              travelerGender === TravelerGender.MALE
                ? "UI_BtnIcon_PlayerBoy"
                : "UI_BtnIcon_PlayerGirl"
            }
          />
          <TabSelector
            tab={TabType.Weapon}
            isActive={currentTab === TabType.Weapon}
            label="Weapon"
            icon="UI_BagTabIcon_Weapon"
          />
          <TabSelector
            tab={TabType.Artifacts}
            isActive={currentTab === TabType.Artifacts}
            label="Artifacts"
            icon="UI_BagTabIcon_Equip"
          />
          <TabSelector
            tab={TabType.Party}
            isActive={currentTab === TabType.Party}
            label="Party"
            icon="UI_Icon_TeamName"
          />
        </div>
        <RemoveFromPartyButton characterId={character.id} />
      </div>

      {/* Content */}
      <CurrentTabComponent character={character} config={config} />
    </div>
  )
}

export default TabContent
