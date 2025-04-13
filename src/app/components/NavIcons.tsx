"use client"

import Image from "next/image"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { CartModal } from "./CartModal"
export const NavIcons = () => {
    const [isProfileOpen, setProfileOpen] = useState(false)
    const [isCartOpen, setCartOpen] = useState(false)
    console.log(isCartOpen)
    //Temp
    const router = useRouter()
    const isLoggedIn = false
    const handleProfile = ()=>{
     if(!isLoggedIn){
        // router.push("/login")
        setProfileOpen((prev)=>!prev)
     }
    }

return (
<div className="flex items-center gap-4 xl:gap-6 relative">
<Image alt="" src="/profile.png" width={22} height={22} className="cursor-pointer" onClick={handleProfile}/>
{isProfileOpen && 
<div className=" absolute p-4 rounded-md top-12 left-0 text-sm shadow-[0_3px_10px_rgb(0,0,0,0.2)] z-20">
    <Link href="/"> Profile</Link>
    <div className="mt-2 cursor-pointer"> Logout </div>
</div>}
<Image alt="" src="/notification.png" width={22} height={22} className="cursor-pointer"/>
<div className="relative cursor-pointer">
<Image alt="" src="/cart.png" width={22} height={22} className="cursor-pointer" onClick={()=>setCartOpen(!isCartOpen)}/>
<div className="absolute -top-4 -right-4 w-6 bg-violet-300 rounded-full text-white text-sm flex items-center justify-center">2</div>
</div>
{isCartOpen && <CartModal/>}
</div>)
}

