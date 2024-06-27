import { toast } from "react-toastify";

export const showToast = (message) =>
    toast.success(message, {
      position: "bottom-right",
      autoClose: 2000,
    });