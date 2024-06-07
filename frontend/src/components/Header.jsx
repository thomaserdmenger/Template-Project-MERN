import { Link } from "react-router-dom"

const Header = () => {
  return (
    <header className="flex justify-between items-center mb-12">
      <Link to="/">Company</Link>
      <nav>
        <div className="flex gap-4 items-center">
          <Link to="/register">Register</Link>
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
