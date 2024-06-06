import { Link } from "react-router-dom"

const Header = () => {
  return (
    <header className="flex justify-between">
      <Link to="/">Company</Link>
      <nav>
        <div className="flex gap-2">
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </div>
      </nav>
    </header>
  )
}

export default Header
