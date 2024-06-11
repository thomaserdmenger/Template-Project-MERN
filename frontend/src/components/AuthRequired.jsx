import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { LoggedInContext } from "../context/LoggedInContext"

const AuthRequired = ({ children }) => {
  const { loggedIn } = useContext(LoggedInContext)
  return loggedIn ? children : <Navigate to="/login" />
}

export default AuthRequired
