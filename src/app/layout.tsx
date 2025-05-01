import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navbar } from "./components/Navbar"
import { FooterPage } from "./components/Footer"
import { WixClientContextProvider } from "./context/wixContext"
import FairyDustCursor from "./components/fairDust"
const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Toy store",
  description: "A complete e-commerce application with Next.js and Wix",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <FairyDustCursor />
        <WixClientContextProvider>
          <Navbar />
          {children}
          <FooterPage />
        </WixClientContextProvider>
      </body>
    </html>
  )
}
