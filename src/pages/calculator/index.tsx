import CalculatorLayout from "@/components/layouts/calculator"
import { ComponentWithLayout } from "@/components/layouts/types"

export const CalculatorWelcome: React.FC & ComponentWithLayout = () => {
  return (
    <div className="flex relative mx-auto w-full max-w-5xl">
      Welcome to Path of Genshin! Try adding a new character to your party by clicking
      the&nbsp;<strong>+</strong>&nbsp;button at the top.
    </div>
  )
}

CalculatorWelcome.Layout = CalculatorLayout

export default CalculatorWelcome
