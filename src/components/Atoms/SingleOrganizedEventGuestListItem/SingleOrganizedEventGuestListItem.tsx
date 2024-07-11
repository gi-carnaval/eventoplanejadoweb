interface SingleOrganizedEventGuestListItem {
  user: {
    name: string;
    picture: string;
    email: string;
  };
  role: string;
  getUserRole: (role: string) => string;
}

export default function SingleOrganizedEventGuestListItem({ user, role, getUserRole }: SingleOrganizedEventGuestListItem) {
  return (
    <div title={user.name} className="bg-slate-600/20 rounded-xl px-10 py-4 w-full flex justify-between items-center gap-8 backdrop-blur-sm border  border-gray-400/20 text-lg">
      <img key={user.name} className="rounded-full w-1/12 h-1/12" src={user.picture} alt={user.name} title={user.name} />
      <div className="flex flex-col gap-1">
        <h2 className="font-semibold">{user.name}</h2>
        <h3 className="text-sm text-zinc-500">{user.email}</h3>
      </div>
      <h2 className="text-zinc-500">{getUserRole(role)}</h2>
    </div>
  )
}