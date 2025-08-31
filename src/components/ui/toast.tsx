import { ReactNode } from "react";
import { toast, ToastPosition, TypeOptions } from "react-toastify";
type Props = {
  type: TypeOptions;
  message?: string;
  customMessageComp?: ReactNode;
  position?: ToastPosition;
  time?: number;
};
const ShowToast = ({
  type,
  message,
  position = "top-right",
  time = 3000,
  customMessageComp,
}: Props) => {
  return toast(message ?? customMessageComp, {
    position: position,
    autoClose: time,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    type: type,
  });
};

export default ShowToast;
