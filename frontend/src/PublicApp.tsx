import React from "react"

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom"

import "./App.css"
import { AuthActions } from "./pages/Account/AuthActions"
import { ForgotPassword } from "./pages/Account/ForgotPassword"

import { SignIn } from "./pages/Account/SignIn"
import { SignUp } from "./pages/Account/SignUp"
import PrivateApp from "./PrivateApp"
import { useAuthContext } from "./utils/auth"
import { ThemeContextProvider } from "./utils/darkmode"

function App() {
  const authContext = useAuthContext()

  return (
    <div>
      <ThemeContextProvider>
        <Router>
          <Routes>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot-pass" element={<ForgotPassword />} />
            <Route path="/auth/action" element={<AuthActions />} />
            {authContext && <Route path="/app/*" element={<PrivateApp />} />}
            <Route path="*" element={<Navigate to="/signin" />} />
          </Routes>
        </Router>
      </ThemeContextProvider>
    </div>
  )
}

export default App
