import { toast } from "react-toastify";
export const toastError = (error) => {
  let message = null;
  if (typeof error === "object" && error.message ) {
    message = error.message;
  }
  if (message !== null && typeof message !== "undefined" && message !== "")
    toast.error('🦄 '+message);
};

export const toastWarn = (success) => {
  let message = null;
  if (typeof success === "string" || success.message) {
    message = success;

    if (message !== null && typeof message !== "undefined" && message !== "")
      toast.warn('🦄 '+message);
  }
};

export const toastSuccess = (success) => {
  let message = null;
  if (typeof success === "string" || success.message) {
    message = success;

    if (message !== null && typeof message !== "undefined" && message !== "")
      toast.info('🦄 ' + message);
  }
};