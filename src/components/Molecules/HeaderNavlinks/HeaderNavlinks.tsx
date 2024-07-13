import { NavLink } from "@src/components/Atoms/NavLink";

interface HeaderNavlinksProps {
  hasUser: boolean
}

export default function HeaderNavlinks({ hasUser }: HeaderNavlinksProps) {

  if (!hasUser) return null;

  return (
    <nav className="hidden md:flex gap-6">
      <NavLink to="/app" currentPath="/app">Home</NavLink>
      <NavLink to="/eventos" currentPath="/eventos">Organizar evento</NavLink>
      <NavLink to="/requests" currentPath="/requests">Minhas solicitações</NavLink>
    </nav>
  )
}