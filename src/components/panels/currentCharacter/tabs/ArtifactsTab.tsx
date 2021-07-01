import { TabContentProps } from "../TabContent"

export const ArtifactsTab: React.FC<TabContentProps> = () => {
  return (
    <div className="space-y-4 w-full">
      <h2 className="text-2xl font-genshin">Artifact Settings</h2>
      <div>Artifacts</div>
    </div>
  )
}
