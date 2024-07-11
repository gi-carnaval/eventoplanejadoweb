import { useAuth } from "@hooks/useAuth";
import { notifyInfo } from "@src/lib/toastsNotifier";
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {

  const { user, logout } = useAuth()
  const navigate = useNavigate()
  
  function handleLogout(){
    logout()
    notifyInfo("Saindo...", 1500)
    setTimeout(() => {
      navigate("/login")
    }, 1500)
  } 

  return (
    <>
      {user ? (
        <>
          <button
            onClick={() => handleLogout()}
            className="flex flex-row items-center gap-4 right-8"
          >
            <img className="rounded-full w-8" src={user?.picture} alt="" />
            {user?.name.split(" ")[0]}
            <IoClose />
          </button>
        </>
      ) : (
        <Link className="px-12 py-3 bg-yellow-500 rounded-lg hover:scale-[0.98] active:scale-[0.94] text-gray-700 hover:text-indigo-600 transition-all" to="/login">Entrar</Link>
      )}
    </>
  );

}