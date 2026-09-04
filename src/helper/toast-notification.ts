import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



// ✅ Success toast
export const showSuccess = (message?: string) => {
  toast.success(message, {
    position: "top-center",
    autoClose: 3000,
    theme: "colored",
  });
};

// ✅ Error toast
export const showError = (message: string) => {
  toast.error(message, {
    position: "bottom-left",
    autoClose: 4000,
    theme: "colored",
  });
};
