import { len_verify_emails, value_otp_default_v1 } from "@/constants/others";

export const validateEmail = (value: string) => {
    return /\S+@\S+\.\S+/.test(value);
};
export const isNumberHasLen = (value: string, lenAllow: number) => {
    const regex = new RegExp(`^\\d{${lenAllow}}$`);
    return regex.test(value) && value.length === lenAllow;
};
export const validateFormatDefaultOtp = (otp: string) => {
    return !otp.includes(value_otp_default_v1) && otp.length === len_verify_emails;
};
export const clearCharactersNotSupported = (input: string) => {
    const regex = /[^a-z0-9_\-!@#$%^&*()+=\[\]{};':"\\|,.<>\/?]/g;
    const cleanedInput = input?.replace(regex, '');
    return cleanedInput;
};
export const containsNonWhitespaceCharacters = (input: string) => {
    const regex = /\S/;
    return regex.test(input);
};
export const removeAllWhitespace = (input: string) => {
    const regex = /\s+/g;
    return input.replace(regex, '');
};
export const _useDebounce = (fucntion: Function, delay: number = 1000) => {
    let _idFunctional: any = null;
    return (...args: any[]) => {
        clearTimeout(_idFunctional);
        _idFunctional = setTimeout(() => fucntion(...args), delay);
    };
}
export const navigateUrlWithWindow = (url: string, type: 'push' | 'replace') => {
    if (type === 'push') {
        window.history.pushState({}, '', url);
    } else {
        window.history.replaceState({}, '', url);
    }
}
