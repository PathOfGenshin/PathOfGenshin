import { TabContentProps } from "../TabContent"

export const PartyTab: React.FC<TabContentProps> = () => {
  return (
    <div className="space-y-4 w-full">
      <h2 className="text-2xl font-genshin">Party Settings</h2>
      <div>Party</div>
    </div>
  )
}
