import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { BackButton } from "@src/components/Atoms/BackButton";
import { notifyError, notifySuccess } from "@src/lib/toastsNotifier";
import { getRefreshToken } from "@src/lib/tokenService";
import eventRepository from "@src/repositories/eventRepository";
import { axiosErrorHandler } from "@src/utils/axiosErrorHandler";
import { Scanner, useDevices } from "@yudiel/react-qr-scanner";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface MessageErrorProps {
  title: string
  message: string
}

export default function EventValidator() {
  const [qrCodeResult, setQrCodeResult] = useState<string>()
  const [deviceId, setDeviceId] = useState<string | undefined>(undefined);
  const [messageError, setMessageError] = useState<MessageErrorProps>()

  const devices = useDevices();
  const { eventId } = useParams()

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (qrCodeResult === undefined) {
      return;
    }

    validateGuest(qrCodeResult);
  }, [qrCodeResult]);

  const validateGuest = async (eventUserId: string) => {
    try {
      const refresh_token = getRefreshToken()

      if (!refresh_token) return
      if (!eventId) return
      const { userId } = refresh_token
      const response = await eventRepository.validateGuestInvite(eventId, eventUserId, userId)
      notifySuccess(response.data)
    } catch (e) {
      const errorCode = e as AxiosError
      console.log(errorCode)
      const errorMessage = axiosErrorHandler(e)
      if (errorCode.response?.status === 409) {
        setMessageError({
          title: errorMessage,
          message: "Este convidado já foi validado anteriormente."
        })
      }
      if (errorCode.response?.status === 404) {
        setMessageError({
          title: errorMessage,
          message: "Convidado não encontrado na lista de convidados."
        })

      }
      handleClickOpen()
      notifyError(errorMessage)
    }
  }

  return (
    <>
      <BackButton route={`/organizer/${eventId}`} />
      <div className="w-full flex flex-col items-center gap-6">
        <h1 className='text-3xl'>Validar convidados</h1>
        <p className="infoText">
          Escaneie o Código QR do convidado para validar o convite.
        </p>
        {
          devices && (
            <div className="w-full flex justify-start items-center gap-4">
              <span>Cameras: </span>
              <select className="px-4 py-2 bg-slate-600 rounded-lg" onChange={(e) => setDeviceId(e.target.value)}>
                <option value={undefined}>Selecione uma camera</option>
                {devices.map((device, index) => (
                  <option key={index} value={device.deviceId}>
                    {device.label}
                  </option>
                ))}
              </select>
            </div>
          )
        }
        <Scanner
          onScan={(result) => setQrCodeResult(result[0].rawValue)}
          scanDelay={300}
          constraints={{
            deviceId: deviceId
          }}
        />
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
          
        >
          <DialogTitle id="responsive-dialog-title">
            {messageError?.title}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              {messageError?.message}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} autoFocus >
              <span className="text-yellow-500">Voltar</span>
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  )
}