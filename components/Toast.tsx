import React, { useEffect, useState } from 'react';
import { CheckCircleIcon, XCircleIcon, InfoIcon, CloseIcon } from './icons';

type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
}

const toastConfig = {
  success: {
    icon: <CheckCircleIcon className="w-6 h-6 text-white" />,
    bgClass: 'bg-emeraldGreen',
  },
  error: {
    icon: <XCircleIcon className="w-6 h-6 text-white" />,
    bgClass: 'bg-errorRed',
  },
  info: {
    icon: <InfoIcon className="w-6 h-6 text-white" />,
    bgClass: 'bg-electricBlue',
  },
};

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
    const timer = setTimeout(() => {
      setShow(false);
      setTimeout(onClose, 300); // allow for fade out animation
    }, 2700);
    return () => clearTimeout(timer);
  }, [onClose]);

  const config = toastConfig[type];

  return (
    <div 
      className={`flex items-start p-4 rounded-lg shadow-lg w-full max-w-sm transition-all duration-300 transform text-white ${config.bgClass} ${show ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}
    >
      <div className="flex-shrink-0">{config.icon}</div>
      <div className="ml-3 flex-1">
        <p className="text-sm font-medium">{message}</p>
      </div>
      <button onClick={onClose} className="ml-4 p-1 rounded-md text-white/70 hover:text-white focus:outline-none">
        <CloseIcon className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Toast;