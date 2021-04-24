import { Divider } from "@/components/Divider"
import { PartyPanel } from "@/components/panels/partyPanel"
import { RightPanel } from "@/components/panels/rightPanel"
import { StatusPanel } from "@/components/panels/statusPanel"
import { TabbedPanel } from "@/components/panels/tabbedPanel"

export default function Calculator(): React.ReactNode {
  return (
    <div className="flex h-full">
      <StatusPanel />
      <Divider />
      <div className="flex flex-col flex-grow">
        <PartyPanel />
        <Divider horizontal />
        <TabbedPanel />
      </div>
      <Divider />
      <RightPanel />
    </div>
  )
}
