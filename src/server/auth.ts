'use server'
import HttpCall from "@/configs/http.config";
import { removeAllWhitespace, validateEmail } from "@/helpers/logic";
import { setCookie } from "@/helpers/logic/security";
import { getTranslations } from "next-intl/server";

const chanel_auth = process.env.CHANEL_AUTH;

export async function verifycationEmailApi(prevState: any, formData: FormData): Promise<any> {
    const t = await getTranslations("Auth");
    const email = formData.get('email')?.toString();
    if (!validateEmail(email ?? '')) {
        return { status: 400, message: t('email_notincorrect_format') };
    }
    const res = await HttpCall({
        method: 'POST',
        url: `${chanel_auth}/verifycation-email`,
        body: {
            email: email
        }
    })
    const response = await res?.json();
    if (response?.status === 200) {
        return {
            status: 200,
            message: t('sent_code_success'),
        };
    } else if (response?.status === 419) {
        return {
            status: 419,
            message: t('email_already_exist')
        };
    } else {
        return {
            status: 500,
            message: t('email_doesnt_exist')
        };
    }

}
export async function sendVerifyCodeApi(prevState: any, formData: FormData): Promise<any> {
    const t = await getTranslations("Auth");
    const email = removeAllWhitespace(formData.get('email')?.toString() ?? '');
    const code = formData.get('codeVerify')?.toString();
    if (code?.length !== 6) {
        return { status: 400, message: t('code_notincorrect_format') };
    }
    const res = await HttpCall({
        method: 'POST',
        url: `${chanel_auth}/compare-code`,
        body: {
            email: email,
            verificationCode: formData.get('codeVerify')?.toString()
        }
    })
    const response = await res?.json();
    if (response?.status === 200) {
        return {
            status: 200,
        };
    } else {
        return {
            status: 400,
            message: t('verification_code_incorrect')
        };
    }
}

export async function registerApi(prevState: any, formData: FormData): Promise<any> {
    const t = await getTranslations("Auth");
    const email = removeAllWhitespace(formData.get('email')?.toString() ?? '');
    const code = formData.get('codeVerify')?.toString();
    const pass = formData.get('pass')?.toString();
    const passcf = formData.get('passcf')?.toString();
    if (pass !== passcf) {
        return { status: 400, message: t('pass_not_match') };
    }
    const res = await HttpCall({
        method: 'POST',
        url: `${chanel_auth}/register`,
        body: {
            email: email,
            password: pass,
            verificationCode: code,
            role: {
                id: 1,
                name: 'user'
            }
        }
    });
    const response = await res?.json();
    if (response?.status === 200) {
        return {
            status: 200,
            message: t('register_success')
        };
    } else {
        return {
            status: 400,
            message: t('server_not_responding')
        };
    }
}

export async function loginApi(prevState: any, formData: FormData): Promise<any> {
    const identifier = formData.get('identifier')?.toString();
    const password = formData.get('password')?.toString();

    const res = await HttpCall({
        method: 'POST',
        url: `${chanel_auth}/login`,
        body: {
            identifier: identifier,
            password: password
        }
    });
    if (await res?.status === 200) {
        const userRes = await res.json();
        setCookie({
            key: 'access_token',
            value: userRes?.jwtToken?.accessToken,
            expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
            path: '/',
            httpOnly: true,
            secure: false,
            maxAge: Number(process.env.EXPIRES_ACCESS_TOKEN)
        })
        setCookie({
            key: 'refresh_token',
            value: userRes?.jwtToken?.refreshToken,
            expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
            path: '/',
            httpOnly: true,
            secure: false,
            maxAge: Number(process.env.EXPIRES_REFRESH_TOKEN)
        })
        return { message: 'User created successfully!' };
    } else {
        return { message: 'User created failed ok!' };
    }
}