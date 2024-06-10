import { useContext, useState } from "react"
import { backendUrl } from "../api/api"
import { UserContext } from "../context/Context"
import { useNavigate } from "react-router-dom"

const RegisterPage = () => {
  const { setUser } = useContext(UserContext)
  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState(false)
  const [successMessage, setSuccessMassage] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    setErrorMessage(false)
    setSuccessMassage(false)

    if (!firstname || !lastname || !username || !email || !password) {
      return setErrorMessage(true)
    }

    const res = await fetch(`${backendUrl}/api/v1/users/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstname,
        lastname,
        username,
        email,
        password,
      }),
    })

    const data = await res.json()
    setUser(data.user)

    setTimeout(() => {
      navigate("/verify-email")
    }, 2000)

    setSuccessMassage(true)
    setErrorMessage(false)
    setFirstname("")
    setLastname("")
    setUsername("")
    setEmail("")
    setPassword("")
  }

  return (
    <main className="flex flex-col justify-center">
      <h1 className="font-bold mb-4">Register</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-96">
        <input
          type="text"
          name="firstname"
          id="firstname"
          placeholder="Firstname"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          className="border-[1px] border-blue-600 py-1 px-2 rounded-lg text-blue-600 placeholder:text-blue-600"
        />
        <input
          type="text"
          name="lastname"
          id="lastname"
          placeholder="Lastname"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          className="border-[1px] border-blue-600 py-1 px-2 rounded-lg text-blue-600 placeholder:text-blue-600"
        />
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border-[1px] border-blue-600 py-1 px-2 rounded-lg text-blue-600 placeholder:text-blue-600"
        />
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
          value="Register"
          className="bg-blue-600 text-white py-1 px-2 rounded-lg border border-blue-600 hover:bg-white hover:text-blue-600 transition"
        />
      </form>
      <div className="flex max-w-96 justify-center mt-4 text-red-500 font-semibold">
        {errorMessage && <p>All fields must be filled in.</p>}
      </div>
      <div className="flex max-w-96 justify-center mt-4 text-green-500 font-semibold">
        {successMessage && <p>Registration was successful.</p>}
      </div>
    </main>
  )
}

export default RegisterPage
