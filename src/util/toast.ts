import { toast, ToastOptions } from 'react-toastify';

interface NotifyData {
  message: string;
  type?: 'success' | 'error' | 'info';
}

export function notify(data: NotifyData, options?: ToastOptions) {
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
