import clsx from "clsx"

import { Switch as HeadlessSwitch } from "@headlessui/react"

interface SwitchProps {
  name: string
  enabled: boolean
  onChange: (checked: boolean) => void
  enabledStyle?: string
  defaultStyle?: string
  label?: string
}

const Switch: React.FC<SwitchProps> = ({
  name,
  enabled,
  onChange,
  enabledStyle,
  defaultStyle,
  label,
}) => {
  return (
    <HeadlessSwitch.Group>
      <div className="flex items-center p-1">
        <HeadlessSwitch
          checked={enabled}
          onChange={onChange}
          className={clsx(
            "inline-flex relative flex-shrink-0 w-12 h-6 rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-g-dark-1",
            enabled ? enabledStyle ?? "bg-g-char" : defaultStyle ?? "bg-g-dark-500",
          )}
        >
          <span className="sr-only">{name}</span>
          <span
            aria-hidden="true"
            className={clsx(
              "inline-block w-5 h-5 rounded-full ring-0 shadow-lg transition duration-200 ease-in-out transform pointer-events-none bg-g-dark-1",
              enabled ? "translate-x-6" : "translate-x-0",
            )}
          />
        </HeadlessSwitch>
        {label && <HeadlessSwitch.Label className="ml-4">{label}</HeadlessSwitch.Label>}
      </div>
    </HeadlessSwitch.Group>
  )
}

export default Switch
