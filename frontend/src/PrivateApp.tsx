import React from "react"

import { Route, Routes, Navigate } from "react-router-dom"

import "./App.css"

import PageWrapper from "src/components/organisms/PageWrapper"
import { Profile } from "./pages/Profile/Profile"
import { Home } from "./pages/Home/Home"
import { useAuthContext } from "./utils/auth"
import { LogoHeader } from "./components/Logo"

function App() {
  const authContext = useAuthContext()

  if (!authContext?.user.emailVerified) {
    return (
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-lg w-full space-y-8">
          <LogoHeader title="Please verify your email address" />
        </div>
      </div>
    )
  }

  return (
    <PageWrapper>
      <Routes>
        <Route path="/profile" element={<Profile />} />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<Navigate to="/app/home" />} />
      </Routes>
    </PageWrapper>
  )
}

export default App
