import { IoReturnDownBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

interface BackButtonProps {
  route?: string
}

export default function BackButton({route = "/app"}: BackButtonProps) {
  const navigate = useNavigate()
  return (
    <button
      onClick={() => navigate(route)}
      className="relative bg-transparent rounded-lg w-32 left-5 flex justify-center items-center gap-4"
    >
      <IoReturnDownBack className="text-2xl" />
      voltar
    </button>
  )
}