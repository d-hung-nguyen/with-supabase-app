import { AtlasLayout } from "@/components/atlas-layout"
import { DataManager } from "@/components/platform-kit/data-manager"

export default function dataManagerPage() {
  return (
    <AtlasLayout activeItem="Database Manager">
      <DataManager />
    </AtlasLayout>
  )
}
