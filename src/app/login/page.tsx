"use client"

import { useState } from "react"
import { useWixClient } from "../hooks/useWixClient"
import { LoginState } from "@wix/sdk"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"
enum MODE {
  LOGIN = "LOGIN",
  REGISTER = "REGISTER",
  RESET_PASSWORD = "RESET_PASSWORD",
  EMAIL_VERIFICATION = "EMAIL_VERIFICATION",
}

const LoginPage = () => {
  const wixClient = useWixClient()
  const router = useRouter()
  const isLoggedIn = wixClient.auth.loggedIn()

  if (isLoggedIn) {
    router.push("/")
  }
  const [mode, setMode] = useState(MODE.LOGIN)
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [emailCode, setEmailCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")

  const pathName = window.location.href
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      let response
      switch (mode) {
        case MODE.LOGIN:
          response = await wixClient.auth.login({
            email,
            password,
          })
          break
        case MODE.REGISTER:
          response = await wixClient.auth.register({
            email,
            password,
            profile: { nickname: username },
          })
          break
        case MODE.RESET_PASSWORD:
          response = await wixClient.auth.sendPasswordResetEmail(
            email,
            pathName
          )
          setMessage("Password email sent. Please check your email")
          break
        case MODE.EMAIL_VERIFICATION:
          response = await wixClient.auth.processVerification({
            verificationCode: emailCode,
          })
          break
        default:
          break
      }
      switch (response?.loginState) {
        case LoginState.SUCCESS:
          setMessage("Susccesful! You are being redirected")
          const tokens = await wixClient.auth.getMemberTokensForDirectLogin(
            response.data.sessionToken
          )
          console.log(tokens)
          Cookies.set("refreshToken", JSON.stringify(tokens.refreshToken), {
            expires: 2,
          })

          wixClient.auth.setTokens(tokens)
          router.push("/")
          break
        case LoginState.FAILURE:
          if (
            response.errorCode === "invalidEmail" ||
            response.errorCode === "invalidPassword"
          ) {
            setError("Invalid email or password")
          } else if (response.errorCode === "emailAlreadyExists") {
            setError("Email already exists")
          } else if (response.errorCode === "resetPassword") {
            setError("You need to reset your password")
          } else {
            setError("Something went wrong ")
          }
          break
        case LoginState.EMAIL_VERIFICATION_REQUIRED:
          setMode(MODE.EMAIL_VERIFICATION)
          break
        case LoginState.OWNER_APPROVAL_REQUIRED:
          setMessage("Your account is pending")
          break
        default:
          break
      }
    } catch (err) {
      setError("something went wrong")
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div className="h-[calc(100vh-80px)] px=4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 flex items-center justify-center">
      <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-semibold">{formTitle}</h1>
        {mode === MODE.REGISTER ? (
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              placeholder="chuck"
              className="ring-2 ring-gray-300 rounded-md p-4"
              onChange={(e) => setUsername(e.target.value)}
            ></input>
          </div>
        ) : null}
        {mode !== MODE.EMAIL_VERIFICATION ? (
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-700">Email</label>
            <input
              type="text"
              name="email"
              placeholder="chuck@gmail.com"
              className="ring-2 ring-gray-300 rounded-md p-4"
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setEmailCode(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
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
            onClick={() => {
              setMode(MODE.REGISTER)
              setError("")
            }}
          >
            Don't have an account?
          </div>
        )}
        {mode == MODE.REGISTER && (
          <div
            className="text-sm underline cursor-pointer"
            onClick={() => {
              setMode(MODE.LOGIN)
              setError("")
            }}
          >
            Have an account?
          </div>
        )}
        {mode === MODE.RESET_PASSWORD && (
          <div
            className="text-sm underline cursor-pointer"
            onClick={() => {
              setMode(MODE.LOGIN)
              setError("")
            }}
          >
            Go back to Login Page
          </div>
        )}
        {message && (
          <div className="text-green-600 text-sm disabled:bg-pink-200 disabled:cursor-not-allowed">
            {message}
          </div>
        )}
      </form>
    </div>
  )
}

export default LoginPage
