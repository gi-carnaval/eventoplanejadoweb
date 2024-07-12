import { IoReturnDownBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function BackButton() {
  const navigate = useNavigate()
  return (
    <button
      onClick={() => navigate("/app")}
      className="relative bg-transparent rounded-lg w-32 -left-5 -top-5 flex justify-center items-center gap-4"
    >
      <IoReturnDownBack className="text-2xl" />
      voltar
    </button>
  )
}