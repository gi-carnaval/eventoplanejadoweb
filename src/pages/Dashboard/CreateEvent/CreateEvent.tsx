import CreateEventFormInput from "@components/Atoms/CreateEventFormInput/CreateEventFormInput"
import eventRepository from "../../../repositories/eventRepository"
import { SubmitHandler, useForm } from "react-hook-form"
import { CreateEventProps } from "src/types/event"
import { getRefreshToken } from "@lib/tokenService"
import dayjs from "dayjs"
import { BackButton } from "@src/components/Atoms/BackButton"

export default function CreateEvent() {
  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateEventProps>()

  const onSubmit: SubmitHandler<CreateEventProps> = async (data) => {
    const startDateTime = dayjs(data.startDateTime).toISOString()
    const endDateTime = dayjs(data.endDateTime).toISOString()

    const eventData = {
      name: data.name,
      description: data.description,
      address: data.address,
      startDateTime,
      endDateTime,
      cartName: data.cartName
    }

    try {
      const refreshToken = getRefreshToken()
      if (refreshToken) {
        await eventRepository.saveEvent(refreshToken?.userId, eventData)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <BackButton />
      <h1>Cadastrar Evento</h1>
      <div className="flex w-full">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-8">
          <div className="w-full flex flex-col gap-8">
            {/* Nome do evento */}
            <CreateEventFormInput>
              <label className="text-lg font-bold" htmlFor="name">Nome do seu evento</label>
              <input
                className="w-full py-2 px-4 text-xl bg-slate-600/20 rounded-xl  backdrop-blur-sm border border-gray-400/20"
                id="name"
                {...register("name", {
                  required: "Nome do evento obrigatório",
                  pattern: {
                    value: /^\w{3}/,
                    message: "Nome precisa de no mínimo 3 letras"
                  }
                })} />
              {errors.name && <span>{errors.name.message}</span>}
            </CreateEventFormInput>
            {/* Descrição do evento */}
            <CreateEventFormInput>
              <label className="text-lg font-bold" htmlFor="description">Descrição do seu evento</label>
              <input
                className="w-full py-2 px-4 text-xl bg-slate-600/20 rounded-xl  backdrop-blur-sm border border-gray-400/20"
                id="description"
                {...register("description", {
                  required: "Descrição do evento obrigatório",
                  pattern: {
                    value: /^[A-Z][a-zA-Z0-9\s.,!?-áàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]{10,20}/,
                    message: "A descrição deve ter entre 10 e 200 caracteres e começar com uma letra maiúscula."
                  }
                })} />
              {errors.description && <span>{errors.description.message}</span>}
            </CreateEventFormInput>
            {/* Endereço do evento */}
            <CreateEventFormInput>
              <label className="text-lg font-bold" htmlFor="address">Endereço</label>
              <input
                className="w-full py-2 px-4 text-xl bg-slate-600/20 rounded-xl  backdrop-blur-sm border border-gray-400/20"
                id="address"
                {...register("address", {
                  required: "Endereço do evento é obrigatório",
                  pattern: {
                    value: /^[a-zA-Z0-9\s.\-,!?áàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]{10,200}$/,
                    message: "Endereço deve ter entre 10 e 200 caracteres."
                  }
                })} />
              {errors.address && <span>{errors.address.message}</span>}
            </CreateEventFormInput>
          </div>
          <div className="flex md:flex-row flex-col justify-between md:gap-20 gap-10">
            {/* Data de início do evento */}
            <CreateEventFormInput>
              <label className="text-lg font-bold" htmlFor="startDateTime">Data e hora de início</label>
              <input
                className="w-full py-2 px-4 text-xl bg-slate-600/20 rounded-xl  backdrop-blur-sm border border-gray-400/20"
                id="startDateTime"
                type="datetime-local"
                {...register("startDateTime", {
                  required: "Data de início obrigatória",
                })} />
              {errors.startDateTime && <span>{errors.startDateTime.message}</span>}
            </CreateEventFormInput>
            {/* Data de início do evento */}
            <CreateEventFormInput>
              <label className="text-lg font-bold" htmlFor="endDateTime">Data e hora de término</label>
              <input
                className="w-full py-2 px-4 text-xl bg-slate-600/20 rounded-xl  backdrop-blur-sm border border-gray-400/20"
                id="endDateTime"
                type="datetime-local"
                {...register("endDateTime", {
                  required: "Data de início obrigatória",
                })} />
              {errors.endDateTime && <span>{errors.endDateTime.message}</span>}
            </CreateEventFormInput>
          </div >
          <div className="flex justify-center">
            <input className="w-3/5 px-12 py-3 bg-yellow-500 rounded-lg hover:scale-[0.98] cursor-pointer active:scale-[0.94] text-gray-700 hover:text-indigo-600 transition-all" type="submit" value="Começar a Organizar" />
          </div>
        </form >
      </div >
    </>
  )
}