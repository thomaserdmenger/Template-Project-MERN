import { Link } from "react-router-dom"
import { UserContext } from "../context/Context"
import { useContext } from "react"

const Header = () => {
  const { user } = useContext(UserContext)

  return (
    <header className="flex justify-between items-center mb-12 border-b-[1px] pb-6">
      <Link to="/">Company</Link>
      <nav>
        <div className="flex gap-4 items-center">
          {!user.isVerified && <Link to="/register">Register</Link>}

          <Link
            to="/login"
            className="bg-blue-600 text-white py-1 px-2 rounded border border-blue-600 hover:bg-white hover:text-blue-600 transition">
            Login
          </Link>
        </div>
      </nav>
    </header>
  )
}

export default Header
