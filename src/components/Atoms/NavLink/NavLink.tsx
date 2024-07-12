import { cn } from "@src/lib/utils";
import { Link, LinkProps, useLocation } from "react-router-dom";

interface NavLinkProps extends LinkProps {
  currentPath: string
}

export function NavLink({ children, className, currentPath,...rest }: NavLinkProps) {

  const location = useLocation();

  const isMenuItemActive = (menuItemPath: string) => {
    return location.pathname === menuItemPath;

  };
  return (
    <Link {...rest} className={cn(`hover:text-[#858bf5] px-8 py-1 ${isMenuItemActive(currentPath) ? 'text-[#858bf5]' : 'text-gray-400'}`, className)}>{children}</Link>
  )
}