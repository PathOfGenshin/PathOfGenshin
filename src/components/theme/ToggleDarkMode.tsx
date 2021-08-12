import { useCallback } from "react"
import { useTheme } from "next-themes"
import clsx from "clsx"
import { MoonIcon, SunIcon } from "@heroicons/react/solid"

export const ToggleDarkMode: React.FC = () => {
  const { theme, setTheme } = useTheme()

  const isLightTheme = theme === "light"

  const toggleTheme = useCallback(() => {
    setTheme(isLightTheme ? "dark" : "light")
  }, [isLightTheme, setTheme])

  return (
    <button
      className="p-1 text-gray-400 bg-gray-800 rounded-full dark:bg-g-dark-800 dark:hover:bg-g-dark-700 hover:text-white dark:text-g-dark-2 dark:hover:text-g-dark-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
      onClick={toggleTheme}
    >
      <span className="sr-only">Toggle Dark Mode</span>
      <SunIcon className={clsx(isLightTheme ? "hidden" : "block", "h-8 w-8")} />
      <MoonIcon className={clsx(isLightTheme ? "block" : "hidden", "h-8 w-8")} />
    </button>
  )
}
