import Link from "next/link"
import { Menu } from "./Menu"
import Image from "next/image"
import { SearchBar } from "./SearchBar"
import { NavIcons } from "./NavIcons"
export const Navbar = () => (
  <div className="h-20 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 ">
    <div className="flex h-full items-center justify-between md:hidden">
      <Link href="/">
        <div className="text-2xl tracking-wide">Kofuko</div>
      </Link>
      <Menu />
    </div>
    <div className="hidden md:flex items-center h-full justify-between gap-8">
      <div className="w-1/3 xl:w-1/2 flex items-center gap-12">
        <Link href="/" className="flex gap-3">
          <Image alt="" src="/logo.png" width={24} height={24} />
          <div className="text-2xl tracking-wide">Kofuko</div>
        </Link>
        <div className="hidden xl:flex gap-4">
          <Link href="/">Homepage</Link>
          <Link href="/">Sonny Angel</Link>
          <Link href="/">Miffy</Link>
          <Link href="/">MochiChi</Link>
          <Link href="">Login</Link>
        </div>
      </div>
      <div className="w-2/3 xl:w-1/2 flex items-center justify-between gap-8">
        <SearchBar />
        <NavIcons />
      </div>
    </div>
  </div>
)
