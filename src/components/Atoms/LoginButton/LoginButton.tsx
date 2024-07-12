import { useGoogleLogin } from "@react-oauth/google";
import { FaGoogle } from "react-icons/fa";
import { useAuth } from "@hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { getRouterHistory } from "@lib/tokenService";
import { notifySuccess } from "@src/lib/toastsNotifier";
import { cn } from "@src/lib/utils";


interface LoginButtonProps{
  className?: string
}

export default function LoginButton({className}: LoginButtonProps) {
  const { login } = useAuth()

  const navigate = useNavigate()
  const routerHistory = getRouterHistory() || '/app'

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      const accessToken = codeResponse.access_token
      login(accessToken)
      notifySuccess("Entrando", 2000)
      setTimeout(() => {
        navigate(routerHistory)
      }, 2000)
      return
    },
    onError: (error) => console.error('Login Failed:', error)
  });

  return (
    <>
      <button
        className={cn(`flex flex-row justify-center items-center gap-2 p-6 right-8 w-4/5 bg-yellow-500 text-zinc-900 hover:text-indigo-950 border hover:scale-[0.98] hover:brightness-105 active:scale-[0.94] transition-all`, className)}
        onClick={() => handleGoogleLogin()}
      >
        <FaGoogle className="text-2xl" />
        Fazer login com Google 🚀
      </button>
    </>
  )
}