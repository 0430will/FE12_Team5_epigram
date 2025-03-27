import { ToastContainer, toast, Slide, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ToastProvider() {
  return (
    <ToastContainer
      position="bottom-center"
      autoClose={1500000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      transition={Slide}
      limit={3}
    />
  );
}

interface NotifyData {
  message: string;
  type?: 'success' | 'error' | 'info';
}

export function Notify(data: NotifyData, options?: ToastOptions) {
  if (!data?.message) {
    return;
  }

  switch (data.type) {
    case 'success':
      toast.success(data.message, options);
      break;
    case 'error':
      toast.error(data.message, options);
      break;
    case 'info':
      toast.info(data.message, options);
      break;
    default:
      toast(data.message, options);
  }
}
