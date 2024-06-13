import { createContext, useEffect, useState } from "react"

export const LoggedInContext = createContext()

export const LoggedInProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    const loggedInLocalStorage = JSON.parse(localStorage.getItem("loggedIn"))

    if (loggedInLocalStorage) {
      setLoggedIn(loggedInLocalStorage)
    }
  }, [])

  return (
    <LoggedInContext.Provider value={{ loggedIn, setLoggedIn }}>
      {children}
    </LoggedInContext.Provider>
  )
}
