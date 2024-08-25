import HttpCall from '@/configs/http.config';
import CryptoJS from 'crypto-js';
import { jwtDecode } from 'jwt-decode';
import { cookies } from 'next/headers';
const getToken = () => {
    return '';
}

const expiredCheck =  (token: string) => {
    const currentTimePlus = Date.now() + 10000;
    if(token){
        const expiredTime = jwtDecode(token).exp;
        if(expiredTime && expiredTime * 1000 > currentTimePlus){
            return true;
        }
    }
    return false;
}

const refreshToken = async (refreshToken: string) => {
    const res: any = await HttpCall({
        method: 'POST',
        url: '/auth/refresh',
        headers: {
            Authorization: `Bearer ${refreshToken}`,
        },
    })
    if (res.status === 200) {
        const data = res.json();
        setCookie({
            key: 'access_token',
            value: data.access_token,
            path: '/',
            httpOnly: true,
            secure: false,
            maxAge: Number(process.env.EXPIRES_ACCESS_TOKEN) || 0,
            expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        });
        setCookie({
            key: 'refresh_token',
            value: data.refresh_token,
            path: '/',
            httpOnly: true,
            secure: false,
            maxAge: Number(process.env.EXPIRES_REFRESH_TOKEN) || 0,
            expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        });
        return data.access_token;
    }
}

const setCookie = ({ key, value, path, httpOnly=true, secure = false, maxAge, expires}: {
    key: string,
    value: string,
    path: string,
    httpOnly: boolean,
    secure: boolean,
    maxAge: number,
    expires: Date,
}) => {
    console.log(expires);
    console.log(maxAge);
    
    cookies().set(key, value, {
        path,
        httpOnly,
        secure,
        maxAge,
        expires,
    })
}

function encryptString(plaintext: string, secretKey: string) {
    return CryptoJS.AES.encrypt(plaintext, secretKey).toString();
}

function decryptString(ciphertext: string, secretKey: string) {
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
}

function compareString(plaintext: string, hashedValue: string, secretKey: string) {
    const decryptedValue = decryptString(hashedValue, secretKey);
    return plaintext === decryptedValue;
}

export { compareString, decryptString, encryptString, expiredCheck, getToken, refreshToken, setCookie };
