import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const toaster = {
  success(msg, options = {}) {
    toast.success(msg, { position: "top-right", autoClose: 5000, ...options });
  },
  error(msg, options = {}) {
    toast.error(msg, { position: "top-right", autoClose: 5000, ...options });
  },
  info(msg, options = {}) {
    toast.info(msg, { position: "top-right", autoClose: 5000, ...options });
  },
  warning(msg, options = {}) {
    toast.warning(msg, { position: "top-right", autoClose: 5000, ...options });
  }
};

export default toaster;
