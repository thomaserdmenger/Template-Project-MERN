import { BrowserRouter, Routes, Route } from "react-router-dom"
import Homepage from "./pages/Homepage"
import Layout from "./components/Layout"
import RegisterPage from "./pages/RegisterPage"
import LoginPage from "./pages/LoginPage"
import { UserContext } from "./context/Context"
import { useState } from "react"
import VerifyEmailPage from "./pages/VerifyEmailPage"

function App() {
  const [user, setUser] = useState({})
  console.log(user)

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <Homepage />
              </Layout>
            }
          />
          <Route
            path="/register"
            element={
              <Layout>
                <RegisterPage />
              </Layout>
            }
          />
          <Route
            path="/verify-email"
            element={
              <Layout>
                <VerifyEmailPage />
              </Layout>
            }
          />
          <Route
            path="/login"
            element={
              <Layout>
                <LoginPage />
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  )
}

export default App
