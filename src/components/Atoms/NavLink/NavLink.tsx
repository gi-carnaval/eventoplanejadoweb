import { Link, LinkProps } from "react-router-dom";

interface NavLinkProps extends LinkProps {
  isActive: boolean
}

export function NavLink({ isActive, children, ...rest }: NavLinkProps) {
  return (
    <Link {...rest} className={`hover:text-[#858bf5] px-8 py-1 ${isActive ? 'text-[#858bf5]' : 'text-gray-400'}`}>{children}</Link>
  )
}