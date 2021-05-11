import CalculatorLayout from "@/components/layouts/calculator"
import { ComponentWithLayout } from "@/components/layouts/types"
import { PartyAddCharacterTab } from "@/components/tabs/PartyAddCharacterTab"

export const PartyAdd: React.FC & ComponentWithLayout = () => {
  return <PartyAddCharacterTab />
}

PartyAdd.Layout = CalculatorLayout

export default PartyAdd
