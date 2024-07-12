import Drawer from '@mui/material/Drawer';
import { NavLink } from '@src/components/Atoms/NavLink';
import LoginPage from '@src/pages/loginPage';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TemporaryDrawer({ isOpen, onClose }: SidebarProps) {

  const DrawerList = (
    <div className={`relative w-dvw max-w-[calc(100dvw-5rem)] p-6 bg-slate-800 h-full text-white flex flex-col items-center`}>
      <button onClick={onClose} type="button" className="absolute z-10 top-5 right-5 w-8 h-8 flex items-center justify-center text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300">
        <svg viewBox="0 0 10 10" className="w-2.5 h-2.5 overflow-visible">
          <path d="M0 0L10 10M10 0L0 10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"></path>
        </svg>
      </button>
      <h2 className="text-xl">Páginas</h2>
      <div className="flex flex-col h-full w-full justify-between items-center py-10 text-xl">
        <nav className="flex flex-col w-full gap-2 items-start">
          <NavLink className="w-full pl-2" onClick={onClose} to="/app" currentPath="/app">Home</NavLink>
          <NavLink className="w-full pl-2" onClick={onClose} to="/eventos" currentPath="/eventos">Organizar evento</NavLink>
        </nav>
        <LoginPage />
      </div>
    </div>
  );

  return (
    <div>
      <Drawer open={isOpen} onClose={onClose} aria-checked="true" className=''>
        {DrawerList}
      </Drawer>
    </div>
  );
}
