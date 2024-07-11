interface SingleOrganizedEventInvitationListItemProps {
  user: {
    name: string;
    picture: string;
  };
  onApprove: () => void;
  onReject: () => void;
}

export default function SingleOrganizedEventInvitationListItem({ user, onApprove, onReject }: SingleOrganizedEventInvitationListItemProps) {
  return (
    <div title={user.name} className="bg-slate-600/20 rounded-xl px-10 py-4 w-full flex justify-between items-center gap-8 backdrop-blur-sm border  border-gray-400/20 text-lg">
      <img key={user.name} className="rounded-full w-1/12 h-1/12" src={user.picture} alt={user.name} title={user.name} />
      <h2 className="font-semibold">{user.name}</h2>
      <div className="flex gap-4">
        <button className="bg-green-700 hover:scale-[0.99] cursor-pointer" onClick={onApprove}>Aprovar</button>
        <button className="bg-red-700 hover:scale-[0.99] cursor-pointer" onClick={onReject}>Recusar</button>
      </div>
    </div>
  )
}