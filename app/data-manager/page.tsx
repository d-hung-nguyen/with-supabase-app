import { AtlasLayout } from "@/components/atlas-layout"
import DataManager from "@/components/data-manager"

export default function Page() {
  return (
    <AtlasLayout activeItem="Database Manager">
      <DataManager />
    </AtlasLayout>
  )
}
