import { BrowserRouter, Routes, Route } from "react-router-dom"
import Homepage from "./pages/Homepage"
import Layout from "./components/Layout"
import RegisterPage from "./pages/RegisterPage"
import LoginPage from "./pages/LoginPage"
import { LoggedInContext, UserContext } from "./context/Context"
import { useState } from "react"
import VerifyEmailPage from "./pages/VerifyEmailPage"
import AuthRequired from "./components/AuthRequired"
import TestPage from "./pages/TestPage"

function App() {
  const [user, setUser] = useState({})
  const [loggedIn, setLoggedIn] = useState(false)
  console.log(loggedIn)

  return (
    <LoggedInContext.Provider value={{ loggedIn, setLoggedIn }}>
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
            <Route
              path="/test"
              element={
                <AuthRequired>
                  <Layout>
                    <TestPage />
                  </Layout>
                </AuthRequired>
              }
            />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </LoggedInContext.Provider>
  )
}

export default App
