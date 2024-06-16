import React, { useContext } from 'react'

interface ThemeState {
  theme: string
  toggleTheme: (checked: boolean) => void
}

const ThemeContext = React.createContext<ThemeState>({
  theme: 'light',
  toggleTheme: (checked: boolean) => {},
})

export function useThemeContext() {
  return useContext(ThemeContext)
}

function setLightTheme() {
  const root = document.documentElement

  root.classList.remove('dark')
  localStorage.theme = 'light'
}

function setDarkTheme() {
  const root = document.documentElement

  root.classList.add('dark')
  localStorage.theme = 'dark'
}

function initializeThemeState() {
  const storedTheme = localStorage.theme
  const themeIsStored = storedTheme != null
  const userPrefersDarkMode = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches

  let themeState
  if (themeIsStored) {
    // Use whatever the user picked previously
    themeState = { theme: storedTheme }
    storedTheme === 'light' ? setLightTheme() : setDarkTheme()
  } else if (userPrefersDarkMode) {
    // Respect the browser's or operating system's configured preference
    themeState = { theme: 'dark' }
    setDarkTheme()
  } else {
    themeState = { theme: 'light' }
    setLightTheme()
  }

  return themeState
}

export function ThemeContextProvider(props: React.PropsWithChildren<{}>) {
  const [themeState, setThemeState] = React.useState(initializeThemeState)
  const { theme } = themeState

  const toggleTheme = () => {
    if (theme === 'light') {
      setDarkTheme()
      setThemeState({ theme: 'dark' })
    } else {
      setLightTheme()
      setThemeState({ theme: 'light' })
    }
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {props.children}
    </ThemeContext.Provider>
  )
}
