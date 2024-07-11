import { toast } from "react-toastify";

export function notifyDefault(message: string, timer: number = 5000) {
  toast(message, {
    autoClose: timer
  });
}

export function notifyError(message: string, timer: number = 5000) {
  toast.error(message, {
    autoClose: timer
  });
}
export function notifySuccess(message: string, timer: number = 5000) {
  toast.success(message, {
    autoClose: timer
  });
}
export function notifyInfo(message: string, timer: number = 5000) {
  toast.info(message, {
    autoClose: timer
  });
}