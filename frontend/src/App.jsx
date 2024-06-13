import { BrowserRouter, Routes, Route } from "react-router-dom"
import Homepage from "./pages/Homepage"
import Layout from "./components/Layout"
import RegisterPage from "./pages/RegisterPage"
import LoginPage from "./pages/LoginPage"
import VerifyEmailPage from "./pages/VerifyEmailPage"
import AuthRequired from "./components/AuthRequired"
import TestPage from "./pages/TestPage"
import { LoggedInContext, LoggedInProvider } from "./context/LoggedInContext"
import { UserContext, UserProvider } from "./context/UserContext"
import { useContext, useEffect } from "react"

function App() {
  // const { setLoggedIn } = useContext(LoggedInContext)
  // const { setUser } = useContext(UserContext)

  // useEffect(() => {
  //   const userLocalStorage = JSON.parse(localStorage.getItem("user"))
  //   const loggedInLocalStorage = JSON.parse(localStorage.getItem("loggedIn"))

  //   if (userLocalStorage) {
  //     setUser(userLocalStorage)
  //   }

  //   if (loggedInLocalStorage) {
  //     setLoggedIn(loggedInLocalStorage)
  //   }
  // }, [])

  return (
    <LoggedInProvider>
      <UserProvider>
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
      </UserProvider>
    </LoggedInProvider>
  )
}

export default App
