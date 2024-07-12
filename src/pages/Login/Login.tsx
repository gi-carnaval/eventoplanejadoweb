import LoginButton from "@components/Atoms/LoginButton/LoginButton";

export default function Login() {
  return(
    <div className="bg-slate-600/20 rounded-xl md:p-10 p-5 md:w-6/12 flex flex-col justify-center items-center gap-8 backdrop-blur-sm border border-gray-400/20">
      <h1 className="text-4xl font-medium">Bem vindo ao Evento Planejado</h1>
      <p className="text-lg">Faça login ou cadastre-se usando sua conta do Google para começar a organizar seus eventos de forma fácil e rápida.</p>
      <LoginButton className="w-full"/>
    </div>
  )
}