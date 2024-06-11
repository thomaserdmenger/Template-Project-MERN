import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../context/Context"
import { backendUrl } from "../api/api"

const VerifyEmailPage = () => {
  const { user, setUser } = useContext(UserContext)
  const [sixDigitCode, setSixDigitCode] = useState("")
  const [errorMessage, setErrorMessage] = useState(false)
  const [successMessage, setSuccessMassage] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    setErrorMessage(false)
    setSuccessMassage(false)

    if (!sixDigitCode) {
      return setErrorMessage(true)
    }

    const res = await fetch(`${backendUrl}/api/v1/users/verify-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: user.email,
        sixDigitCode,
      }),
    })

    const data = await res.json()
    setUser(data.user)

    if (!data.user.isVerified) {
      setSuccessMassage(false)
      setErrorMessage(true)
    }

    setSuccessMassage(true)
    setErrorMessage(false)

    setTimeout(() => {
      navigate("/login")
    }, 2000)

    setSixDigitCode("")
  }

  return (
    <main className="flex flex-col justify-center">
      <h1 className="font-bold mb-4">Verify your Email-Address</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-96">
        <input
          type="number"
          name="code"
          id="code"
          value={sixDigitCode}
          onChange={(e) => setSixDigitCode(e.target.value)}
          minLength={6}
          maxLength={6}
          placeholder="6DigitCode"
          className="border-[1px] border-blue-600 py-1 px-2 rounded-lg text-blue-600 placeholder:text-blue-600"
        />
        <input
          type="submit"
          value="Send Code"
          className="bg-blue-600 text-white py-1 px-2 rounded-lg border border-blue-600 hover:bg-white hover:text-blue-600 transition"
        />
      </form>
      <div className="flex max-w-96 justify-center mt-4 text-red-500 font-semibold">
        {errorMessage && <p>Wrong Code. Please try again.</p>}
      </div>
      <div className="flex max-w-96 justify-center mt-4 text-green-500 font-semibold">
        {successMessage && <p>Your Account is veryfied.</p>}
      </div>
    </main>
  )
}

export default VerifyEmailPage
