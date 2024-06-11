import { useContext } from "react"
import { LoggedInContext } from "../context/Context"
import { Navigate } from "react-router-dom"

const AuthRequired = ({ children }) => {
  const { loggedIn } = useContext(LoggedInContext)
  return loggedIn ? children : <Navigate to="/login" />
}

export default AuthRequired
