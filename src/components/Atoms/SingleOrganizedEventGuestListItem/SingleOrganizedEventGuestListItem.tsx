import useDeviceType from "@src/hooks/useDeviceType";

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

  const deviceType = useDeviceType()

  return (
    <div title={user.name} className="bg-slate-600/20 rounded-xl md:px-10 md:py-4 p-2 w-full flex justify-between items-center gap-8 backdrop-blur-sm border  border-gray-400/20 text-lg">
      <img key={user.name} className="rounded-full md:w-1/12 w-1/6 md:h-1/12 h-full" src={user.picture} alt={user.name} title={user.name} />
      <div className="flex flex-col gap-1">
        <h2 className="font-semibold md:text-inherit text-base">{user.name}</h2>
        {deviceType !== "mobile" && <h3 className="text-sm text-zinc-500">{user.email}</h3>}
      </div>
      <h2 className="text-zinc-500 text-sm">{getUserRole(role)}</h2>
    </div>
  )
}