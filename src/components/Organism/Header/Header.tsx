import EventoPlanejadoLogo from "@assets/eventoPlanejadoLogo.svg"
import { useAuth } from "@hooks/useAuth"
import LoginPage from "@pages/loginPage"
import HeaderNavlinks from "@src/components/Molecules/HeaderNavlinks/HeaderNavlinks"
import { MobileMenu } from "@src/components/Molecules/MobileMenu"
import MobileSidebar from "@src/components/Molecules/MobileSidebar/MobileSidebar"
import useDeviceType from "@src/hooks/useDeviceType"
import { useState } from "react"
import { RxHamburgerMenu } from "react-icons/rx"
import { Link } from "react-router-dom"

export default function Header() {
  const [isSideBarOpen, setIsSideBarOpen] = useState<boolean>(false)
  const { user } = useAuth()
  const deviceType = useDeviceType();

  function toggleSideBar() {
    setIsSideBarOpen(prev => !prev)
  }

  return (
    <>
      <header className='fixed top-0 left-0 w-full h-20 bg-slate-800/60 border-gray-400/20 flex justify-between px-6 md:px-12 items-center border-b backdrop-blur-xl z-10'>
        {deviceType !== "mobile" && (
          <div className="flex gap-8 items-center">
            <Link to="/">
              <img src={EventoPlanejadoLogo} alt="" />
            </Link>
            <HeaderNavlinks hasUser={!!user} />
          </div>
        )}
        <div className={`flex  ${deviceType === "mobile" ? 'w-full justify-between' : ''} items-center gap-4`}>
          {deviceType === "mobile" && (
            <button>
              <RxHamburgerMenu className="text-xl" onClick={() => toggleSideBar()} />
            </button>)
          }
          <MobileMenu />
          {deviceType !== "mobile" && (
            <LoginPage />
          )}
        </div>
      </header >
      <MobileSidebar isOpen={isSideBarOpen} onClose={toggleSideBar} />
    </>
  )
}