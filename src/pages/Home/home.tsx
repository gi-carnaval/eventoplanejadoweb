import { useAuth } from "@hooks/useAuth";
import { Link } from "react-router-dom";

export default function Home() {

  const { user } = useAuth()

  return (
    <div className="flex">
      <div className="md:w-2/4 flex flex-col items-center gap-10">
        <h1 className="md:text-5xl text-4xl text-left font-bold leading-[125%]">Crie seus eventos e festas, convide quem você quiser e tenha o controle de tudo em suas mãos!</h1>
        {user ? (
          <Link to="/app" className="w-full px-12 py-3 bg-yellow-500 rounded-lg hover:scale-[0.98] active:scale-[0.94] text-gray-700 hover:text-indigo-600 transition-all">Acessar Dashboard</Link>
        ) : (
          <>

            <p className="text-left w-full">Faça o login para poder criar seus eventos ou entrar em um.</p>
            <Link className="w-3/5 px-12 py-3 bg-yellow-500 rounded-lg hover:scale-[0.98] active:scale-[0.94] text-gray-700 hover:text-indigo-600 transition-all" to="/login">Fazer Login</Link>
          </>
        )}
        <p className="text-left">Após criar seu evento, você poderá convidar outras pessoas por meio de um link personalizado ou através de um código único 🚀</p>
      </div>
      <div></div>
    </div>
  )
}