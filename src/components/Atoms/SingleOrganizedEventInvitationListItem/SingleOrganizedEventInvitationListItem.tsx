import useDeviceType from "@src/hooks/useDeviceType";
import { FaCheck } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

interface SingleOrganizedEventInvitationListItemProps {
  user: {
    name: string;
    picture: string;
  };
  onApprove: () => void;
  onReject: () => void;
}

export default function SingleOrganizedEventInvitationListItem({ user, onApprove, onReject }: SingleOrganizedEventInvitationListItemProps) {

  const deviceType = useDeviceType()

  return (
    <div title={user.name} className="bg-slate-600/20 rounded-xl md:px-10 md:py-4 p-2 w-full flex justify-between items-center md:gap-8 gap-4 backdrop-blur-sm border  border-gray-400/20 text-lg">
      <img key={user.name} className="rounded-full md:w-1/12 w-[12%] md:h-1/12" src={user.picture} alt={user.name} title={user.name} />
      <h2 className="font-semibold md:text-inherit text-base text-ellipsis overflow-hidden ">{user.name}</h2>
      <div className="flex gap-4">
        {deviceType === "mobile" ? (
          <>
            <button className="bg-green-700 hover:scale-[0.99] cursor-pointer w-12 h-12 p-3 flex justify-center items-center rounded-full text-lg" onClick={onApprove}>
              <FaCheck className="w-4 h-4" />
            </button>
            <button className="bg-red-700 hover:scale-[0.99] cursor-pointer w-12 h-12 p-3 flex justify-center items-center rounded-full" onClick={onReject}>
              <IoClose className="w-9 h-9" />
            </button>
          </>
        ) : (
          <>
            <button className="bg-green-700 hover:scale-[0.99] cursor-pointer" onClick={onApprove}>
              Aprovar
            </button>
            <button className="bg-red-700 hover:scale-[0.99] cursor-pointer" onClick={onReject}>
              Recusar
            </button>
          </>

        )}
      </div>
    </div>
  )
}