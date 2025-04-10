import { toast } from "react-toastify";

const toastLoading = (id, status, message) => {
  toast.update(id, {
    type: status,
    render: message,
    autoClose: 3000,
    progress: undefined,
    draggable: true,
    closeButton: true,
    isLoading: false,
  });
};

export default toastLoading;
