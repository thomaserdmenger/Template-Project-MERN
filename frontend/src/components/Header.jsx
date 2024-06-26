import { Link } from "react-router-dom"
import { useContext } from "react"
import Logout from "./Logout"
import { UserContext } from "../context/UserContext"
import { LoggedInContext } from "../context/LoggedInContext"

const Header = () => {
  const { user } = useContext(UserContext)
  const { loggedIn } = useContext(LoggedInContext)

  return (
    <header className="flex justify-between items-center mb-12 border-b-[1px] pb-6">
      <Link to="/">Company</Link>
      <nav>
        <div className="flex gap-4 items-center">
          {loggedIn && <Link to="/test">Test</Link>}

          {!user?.isVerified && <Link to="/register">Register</Link>}

          {loggedIn ? (
            <Logout />
          ) : (
            <Link
              to="/login"
              className="bg-blue-600 text-white py-1 px-2 rounded border border-blue-600 hover:bg-white hover:text-blue-600 transition">
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Header
