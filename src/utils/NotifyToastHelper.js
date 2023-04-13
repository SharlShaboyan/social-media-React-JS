import { toast } from 'react-toastify';

export function successMessage(text) {
    return toast.success(text)
}

export function warningMessage(text) {
    return toast.warning(text)
}

export function errorMessage(text) {
    return toast.error(text)
}