"use client"

import { useState } from "react"
import { useWixClient } from "../hooks/useWixClient"

enum MODE {
  LOGIN = "LOGIN",
  REGISTER = "REGISTER",
  RESET_PASSWORD = "RESET_PASSWORD",
  EMAIL_VERIFICATION = "EMAIL_VERIFICATION",
}

const LoginPage = () => {
  const [mode, setMode] = useState(MODE.LOGIN)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [emailCode, setEmailCode] = useState("")
  const [isLoading, setIsLoading] = useState("")
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")

  const formTitle =
    mode === MODE.LOGIN
      ? "Log in"
      : mode === MODE.REGISTER
        ? "Register"
        : mode === MODE.RESET_PASSWORD
          ? "Reset Your Password"
          : "Verify your email"
  const buttonTitle =
    mode === MODE.LOGIN
      ? "Log in"
      : mode === MODE.REGISTER
        ? "Register"
        : mode === MODE.RESET_PASSWORD
          ? "Reset"
          : "Verify"

  const wixClient = useWixClient()

  return (
    <div className="h-[calc(100vh-80px)] px=4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 flex items-center justify-center">
      <form className="flex flex-col gap-8">
        <h1 className="text-2xl font-semibold">{formTitle}</h1>
        {mode === MODE.REGISTER ? (
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              placeholder="chuck"
              className="ring-2 ring-gray-300 rounded-md p-4"
            ></input>
          </div>
        ) : null}
        {mode !== MODE.EMAIL_VERIFICATION ? (
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-700">Email</label>
            <input
              type="text"
              name="username"
              placeholder="chuck@gmail.com"
              className="ring-2 ring-gray-300 rounded-md p-4"
            ></input>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-700">Verification Code</label>
            <input
              type="text"
              name="emailCode"
              placeholder="Code"
              className="ring-2 ring-gray-300 rounded-md p-4"
            ></input>
          </div>
        )}
        {mode === MODE.LOGIN || mode === MODE.REGISTER ? (
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="ring-2 ring-gray-300 rounded-md p-4"
            ></input>
          </div>
        ) : null}
        {mode === MODE.LOGIN && (
          <div
            className="text-sm underline cursor-pointer"
            onClick={() => setMode(MODE.RESET_PASSWORD)}
          >
            Forgot Password ?
          </div>
        )}
        <button className="bg-pink-400 text-white p-2 rounded-md disabled:bg-pink-200 disabled:cursor-not-allowed">
          {isLoading ? "Loading..." : buttonTitle}
        </button>
        {error && <div className="text-red-600">{error}</div>}
        {mode === MODE.LOGIN && (
          <div
            className="text-sm underline cursor-pointer"
            onClick={() => setMode(MODE.REGISTER)}
          >
            Don't have an account?
          </div>
        )}
        {mode == MODE.REGISTER && (
          <div
            className="text-sm underline cursor-pointer"
            onClick={() => setMode(MODE.LOGIN)}
          >
            Have an account?
          </div>
        )}
        {mode === MODE.RESET_PASSWORD && (
          <div
            className="text-sm underline cursor-pointer"
            onClick={() => setMode(MODE.LOGIN)}
          >
            Go back to Login Page
          </div>
        )}
        {message && <div className="text-green-600 text-sm">{message}</div>}
      </form>
    </div>
  )
}

export default LoginPage
