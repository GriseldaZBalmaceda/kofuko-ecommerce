"use client"

import Image from "next/image"
import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { CartModal } from "./CartModal"
import { useWixClient } from "../hooks/useWixClient"
import Cookies from "js-cookie"

const NavIcons = () => {
  const [isProfileOpen, setProfileOpen] = useState(false)
  const [isCartOpen, setCartOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  //Temp
  const router = useRouter()
  const pathname = usePathname()
  const wixClient = useWixClient()
  const isLoggedIn = wixClient.auth.loggedIn
  const handleProfile = () => {
    if (!isLoggedIn) {
      router.push("/login")
    } else {
      setProfileOpen((prev) => !prev)
    }
  }
  const handleLogout = async () => {
    setIsLoading(true)
    Cookies.remove("refreshToken")
    ///window.location.href may cause hydration
    const { logoutUrl } = await wixClient.auth.logout(window.location.href)
    router.push(logoutUrl)
    setIsLoading(false)
    setProfileOpen(false)
    router.push(logoutUrl)
  }
  // const wixClient = useWixClient()
  //super easy way to use wix clients login auth
  // const login = async () => {
  //   const loginRequestData = wixClient.auth.generateOAuthData(
  //     "http://localhost:3000"
  //   )
  //   localStorage.setItem("oAuthRedirectData", JSON.stringify(loginRequestData))
  //   const { authUrl } = await wixClient.auth.getAuthUrl(loginRequestData)
  //   window.location.href = authUrl
  // }
  return (
    <div className="flex items-center gap-4 xl:gap-6 relative">
      <Image
        alt=""
        src="/profile.png"
        width={22}
        height={22}
        className="cursor-pointer"
        // onClick={login}
        onClick={handleProfile}
      />
      {isProfileOpen && (
        <div className=" bg-white absolute p-4 rounded-md top-12 left-0 text-sm shadow-[0_3px_10px_rgb(0,0,0,0.2)] z-20">
          <Link href="/"> Profile</Link>
          <div className="mt-2 cursor-pointer" onClick={handleLogout}>
            {" "}
            {isLoading ? "Logging Out" : "Logout"}
          </div>
        </div>
      )}
      <Image
        alt=""
        src="/notification.png"
        width={22}
        height={22}
        className="cursor-pointer"
      />
      <div className="relative cursor-pointer">
        <Image
          alt=""
          src="/cart.png"
          width={22}
          height={22}
          className="cursor-pointer"
          onClick={() => setCartOpen(!isCartOpen)}
        />
        <div className="absolute -top-4 -right-4 w-6 bg-violet-300 rounded-full text-white text-sm flex items-center justify-center">
          2
        </div>
      </div>
      {isCartOpen && <CartModal />}
    </div>
  )
}

export default NavIcons
