import { TabContentProps } from "../TabContent"

export const WeaponsTab: React.FC<TabContentProps> = () => {
  return (
    <div className="space-y-4 w-full">
      <h2 className="text-2xl tracking-tight">Weapon Settings</h2>
      <div>Weapons</div>
    </div>
  )
}
