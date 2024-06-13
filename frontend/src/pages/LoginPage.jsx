import { useContext, useState } from "react"
import { backendUrl } from "../api/api"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../context/UserContext"
import { LoggedInContext } from "../context/LoggedInContext"

const LoginPage = () => {
  const { setUser } = useContext(UserContext)
  const { setLoggedIn } = useContext(LoggedInContext)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState(false)
  const [successMessage, setSuccessMassage] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    setErrorMessage(false)
    setSuccessMassage(false)

    const res = await fetch(`${backendUrl}/api/v1/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        email,
        password,
      }),
    })

    const data = await res.json()

    if (typeof data === "string" && data?.toLowerCase().includes("incorrect password")) {
      setErrorMessage(true)
      setEmail("")
      setPassword("")
      setLoggedIn(false)
    }

    if (data.user) {
      setUser(data.user)
      setLoggedIn(true)
      setSuccessMassage(true)

      setEmail("")
      setPassword("")

      localStorage.setItem("user", JSON.stringify(data.user))
      localStorage.setItem("loggedIn", JSON.stringify(true))

      setTimeout(() => {
        navigate("/")
      }, 1000)
    }
  }

  return (
    <main className="flex flex-col justify-center">
      <h1 className="font-bold mb-4">Login to your account</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-96">
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border-[1px] border-blue-600 py-1 px-2 rounded-lg text-blue-600 placeholder:text-blue-600"
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border-[1px] border-blue-600 py-1 px-2 rounded-lg text-blue-600 placeholder:text-blue-600"
        />
        <input
          type="submit"
          value="Log in"
          className="bg-blue-600 text-white py-1 px-2 rounded-lg border border-blue-600 hover:bg-white hover:text-blue-600 transition"
        />
      </form>
      <div className="flex max-w-96 justify-center mt-4 text-red-500 font-semibold">
        {errorMessage && <p>Wrong Email or Password. Please try again.</p>}
      </div>
      <div className="flex max-w-96 justify-center mt-4 text-green-500 font-semibold">
        {successMessage && <p>You are logged in.</p>}
      </div>
    </main>
  )
}

export default LoginPage
