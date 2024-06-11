import { createContext, useState } from "react"

export const LoggedInContext = createContext()

export const LoggedInProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false)

  return (
    <LoggedInContext.Provider value={{ loggedIn, setLoggedIn }}>
      {children}
    </LoggedInContext.Provider>
  )
}
