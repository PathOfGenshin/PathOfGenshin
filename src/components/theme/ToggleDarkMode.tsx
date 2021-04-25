import clsx from "clsx"
import { useContext } from "react"

import { MoonIcon, SunIcon } from "@heroicons/react/solid"

import { ThemeContext } from "./themeContext"

export const ToggleDarkMode: React.FC = () => {
  const { theme, setTheme } = useContext(ThemeContext)

  const isDarkTheme = theme === "dark"

  const toggleTheme = (): void => {
    setTheme(isDarkTheme ? "light" : "dark")
  }

  return (
    <button
      className="p-1 text-gray-400 bg-gray-800 rounded-full dark:bg-g-dark-800 dark:hover:bg-g-dark-700 hover:text-white dark:text-g-dark-2 dark:hover:text-g-dark-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
      onClick={toggleTheme}
    >
      <span className="sr-only">Toggle Dark Mode</span>
      <MoonIcon className={clsx(isDarkTheme ? "block" : "hidden", "h-8 w-8")} />
      <SunIcon className={clsx(isDarkTheme ? "hidden" : "block", "h-8 w-8")} />
    </button>
  )
}
