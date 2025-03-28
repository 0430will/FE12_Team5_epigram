import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ToastCustom.css';

export default function ToastProvider() {
  return (
    <ToastContainer
      position="bottom-center"
      autoClose={1500}
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
