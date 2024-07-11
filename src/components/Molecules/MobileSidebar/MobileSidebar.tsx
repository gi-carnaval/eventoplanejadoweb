import { NavLink } from '@src/components/Atoms/NavLink';
import LoginPage from '@src/pages/loginPage';
import React from 'react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const isMenuItemActive = (menuItemPath: string) => {
  return location.pathname === menuItemPath;
};

const MobileSidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    isOpen &&
    <div className="fixed z-50 inset-0 overflow-y-auto lg:hidden ">
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm dark:bg-slate-900/80"></div>
      <div className={`relative bg-white w-80 max-w-[calc(100%-3rem)] p-6 dark:bg-slate-800 h-full ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300`}>
        <button onClick={onClose} type="button" className="absolute z-10 top-5 right-5 w-8 h-8 flex items-center justify-center text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300">
          <svg viewBox="0 0 10 10" className="w-2.5 h-2.5 overflow-visible">
            <path d="M0 0L10 10M10 0L0 10" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path>
          </svg>
        </button>
        <h2>Menu</h2>
        <div className="flex flex-col h-full justify-between items-center py-10 text-xl">
          <nav className="flex flex-col gap-2">
            <NavLink to="/app" isActive={isMenuItemActive("/app")}>Home</NavLink>
            <NavLink to="/eventos" isActive={isMenuItemActive("/eventos")}>Organizar evento</NavLink>
          </nav>
          <LoginPage />
        </div>
      </div>
    </div>
  );
};

export default MobileSidebar;
