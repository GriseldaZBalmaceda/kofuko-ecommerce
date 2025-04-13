"use client" 
import Image from "next/image"
import Link from "next/link"

export const FooterPage = () => {
    return (
        <div className="py-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 bg-gray-100 text-sm mt-24"> 
        {/*TOP*/}
            <div className="flex justify-between gap-24">
                {/*LEFT*/}
                <div className="w-full md:w-1/2 lg:w-1/4 flex flex-col gap-8">
                    <Link href="/">
                        <div className="text-2xl tracking-wide">Kofuko</div>
                    </Link>
                    <p>12343 Address, Brooklyn, NY 1126</p>
                    <span className="font-semibold">hello@email.com</span>
                    <span  className="font-semibold">+1 303 494 4043</span>
                    <div className="flex gap-6">
                        <Image src="/facebook.png" alt="" width={16} height={16} />
                        <Image src="/instagram.png" alt="" width={16} height={16} />
                        <Image src="/youtube.png" alt="" width={16} height={16} />
                        <Image src="/pinterest.png" alt="" width={16} height={16} />
                        <Image src="/x.png" alt="" width={16} height={16} />
                    </div>
                </div>
                {/*CENTER*/}
                <div className="w-1/2 hidden lg:flex justify-between"></div>
                {/*RIGHT*/}
                <div className="w-full md:w-1/2 lg:w-1/4 flex flex-col gap-8">
                    <h1 className="font-medium text-lg">SUBSCRIBE</h1>
                    <p>Be the first to get the latest news</p>
                    <div>
                        <input type="text" placeholder="Email Address" className="p-4 w-3/4" ></input>
                        <button> className</button>
                    </div>
                </div>
            </div>
            {/*BOTTOM*/}
            <div></div>
        </div>
    )
}
