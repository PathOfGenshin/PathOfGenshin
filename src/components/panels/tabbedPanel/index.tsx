import React from "react"

import { CurrentCharacterTab } from "@/components/tabs/CurrentCharacterTab"
import { PartyAddCharacterTab } from "@/components/tabs/PartyAddCharacterTab"
import { WelcomeTab } from "@/components/tabs/WelcomeTab"
import { useAppSelector } from "@/store/hooks"
import { selectCurrentTab, TabFocus } from "@/store/tab/tabSlice"

const TAB_FOCUS_MAPPING: Record<TabFocus, React.FC> = {
  [TabFocus.WELCOME]: WelcomeTab,
  [TabFocus.PARTY_ADD_CHARACTER]: PartyAddCharacterTab,
  [TabFocus.WEAPON]: WelcomeTab,
  [TabFocus.ARTIFACTS]: WelcomeTab,
  [TabFocus.CURRENT_CHARACTER]: CurrentCharacterTab,
}

export const TabbedPanel: React.FC = () => {
  const currentTab: TabFocus = useAppSelector(selectCurrentTab)

  const CurrentTab = TAB_FOCUS_MAPPING[currentTab]

  return (
    <div className="flex flex-grow m-4 overflow-y-scroll">
      <CurrentTab />
    </div>
  )
}
