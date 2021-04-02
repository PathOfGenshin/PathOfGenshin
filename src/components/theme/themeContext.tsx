import { createContext, useContext, useEffect, useState } from "react"

type Theme = "light" | "dark"
const defaultTheme: Theme = "dark"

function getInitialTheme(): Theme {
  if (typeof window !== "undefined" && window.localStorage) {
    const storedPrefs = window.localStorage.getItem("theme")
    if (typeof storedPrefs === "string") {
      return storedPrefs as Theme
    }

    const userMedia = window.matchMedia("(prefers-color-scheme: dark)")
    if (userMedia.matches) {
      return "dark"
    }
  }

  return defaultTheme
}

type ThemeProviderProps = {
  initialTheme?: string
  children: React.ReactNode
}

interface ThemeContextProps {
  theme?: Theme
  setTheme?: (theme: Theme) => void
}

export const ThemeContext = createContext<ThemeContextProps>({})

export const useTheme = (): ThemeContextProps => useContext(ThemeContext)

function ThemeProvider({
  initialTheme,
  children,
}: ThemeProviderProps): React.ReactElement {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => rawSetTheme(theme), [theme])

  const rawSetTheme = (theme: string): void => {
    const root = window.document.documentElement
    const isDark = theme === "dark"
    root.classList.remove(isDark ? "light" : "dark")
    root.classList.add(theme)
    localStorage.setItem("theme", theme)
  }

  if (initialTheme) {
    rawSetTheme(initialTheme)
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
