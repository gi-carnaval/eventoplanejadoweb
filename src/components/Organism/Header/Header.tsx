import EventoPlanejadoLogo from "@assets/eventoPlanejadoLogo.svg"
import { NavLink } from "@components/Atoms/NavLink"
import { useAuth } from "@hooks/useAuth"
import LoginPage from "@pages/loginPage"
import MobileSidebar from "@src/components/Molecules/MobileSidebar/MobileSidebar"
import useDeviceType from "@src/hooks/useDeviceType"
import { useState } from "react"
import { IoChevronDownSharp, IoNotificationsOutline } from "react-icons/io5"
import { RxHamburgerMenu } from "react-icons/rx"
import { Link, useLocation } from "react-router-dom"

export default function Header() {
  const [isSideBarOpen, setIsSideBarOpen] = useState<boolean>(false)
  const { user } = useAuth()
  const location = useLocation();

  const isMenuItemActive = (menuItemPath: string) => {
    return location.pathname === menuItemPath;
  };

  function toggleSideBar() {
    setIsSideBarOpen(prev => !prev)
  }

  const deviceType = useDeviceType();

  return (
    <>
      <header className='fixed top-0 left-0 w-full h-20 bg-slate-800/60 border-gray-400/20 flex justify-between px-6 md:px-12 items-center border-b backdrop-blur-xl z-10'>
        {deviceType !== "mobile" ? (
          <div className="flex gap-8 items-center">
            <Link to="/">
              <img src={EventoPlanejadoLogo} alt="" />
            </Link>
            {user && (
              <nav className="hidden md:flex gap-6">
                <NavLink to="/app" isActive={isMenuItemActive("/app")} >Home</NavLink>
                <NavLink to="/eventos" isActive={isMenuItemActive("/eventos")}>Organizar evento</NavLink>
              </nav>
            )}
          </div>
        ) : (
          <button>
            <RxHamburgerMenu className="text-xl" onClick={() => toggleSideBar()} />
          </button>
        )}

        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 bg-transparent text-gray-400 hover:text-[#858bf5] px-4 md:px-8 py-1 cursor-pointer">
            <IoNotificationsOutline className="text-xl" />
            {deviceType !== "mobile" ? (
              <span>
                Solicitações
              </span>

            ) : (
              null
            )}

            <IoChevronDownSharp />
          </button>
          <div className="hidden md:block border border-gray-400/20 bg-gray-400/20 backdrop-blur-sm rounded-lg overflow-hidden">
            <h3>Solicitações de Entrada</h3>
          </div>
          {deviceType !== "mobile" ? (
            <LoginPage />
          ) : (
            null
          )}
        </div>
      </header >
      <MobileSidebar isOpen={isSideBarOpen} onClose={toggleSideBar} />
    </>
  )
}