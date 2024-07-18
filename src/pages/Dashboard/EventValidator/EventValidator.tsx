import { BackButton } from "@src/components/Atoms/BackButton";
import { notifyError } from "@src/lib/toastsNotifier";
import { axiosErrorHandler } from "@src/utils/axiosErrorHandler";
import { Scanner, useDevices } from "@yudiel/react-qr-scanner";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function EventValidator() {
  const [qrCodeResult, setQrCodeResult] = useState<string>()
  const [deviceId, setDeviceId] = useState<string | undefined>(undefined);

  const devices = useDevices();
  const { eventId } = useParams()

  useEffect(() => {
    if (qrCodeResult === undefined) {
      return;
    }

    validateGuest(qrCodeResult);
  }, [qrCodeResult]);

  const validateGuest = async (eventUserId: string) => {
    try {
      console.log(eventUserId)
    } catch (e) {
      const errorMessage = axiosErrorHandler(e)
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

      </div>
    </>
  )
}