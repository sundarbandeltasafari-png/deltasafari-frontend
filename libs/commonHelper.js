import { Bounce, toast } from "react-toastify";

export const phoneValidation = (number) => {
    return /^\d{10,10}$/.test(number);
}
export const emailValidation = (email) => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
}

export const passwordValidation = (email) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(email);
}

export const showMessage = (type, message) => {
    const toastOption = {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
    }
    switch (type) {
        case 'info':
            return toast.info(message, toastOption);
            break;
        case 'success':
            return toast.success(message, toastOption);
            break;
        case 'error':
            return toast.error(message, toastOption);
            break;
        case 'warning':
            return toast.warn(message, toastOption);
            break;
        default:
            return toast.warn(message, toastOption);
    }
}