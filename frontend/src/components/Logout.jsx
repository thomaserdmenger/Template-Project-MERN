import React, { useContext } from "react"
import { backendUrl } from "../api/api"
import { UserContext } from "../context/UserContext"
import { LoggedInContext } from "../context/LoggedInContext"

const Logout = () => {
  const { setUser } = useContext(UserContext)
  const { setLoggedIn } = useContext(LoggedInContext)

  const handleLogout = async () => {
    const res = await fetch(`${backendUrl}/api/v1/users/logout`, {
      method: "POST",
      credentials: "include",
    })

    const data = await res.json()

    setUser({})
    setLoggedIn(false)
  }

  return (
    <button
      onClick={handleLogout}
      className="bg-blue-600 text-white py-1 px-2 rounded border border-blue-600 hover:bg-white hover:text-blue-600 transition">
      Logout
    </button>
  )
}

export default Logout
