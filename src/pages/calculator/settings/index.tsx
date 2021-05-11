import CalculatorLayout from "@/components/layouts/calculator"
import { ComponentWithLayout } from "@/components/layouts/types"

export const SettingsPage: React.FC & ComponentWithLayout = () => {
  return <div className="flex justify-center w-full max-w-5xl">Settings</div>
}
SettingsPage.Layout = CalculatorLayout

export default SettingsPage
