'use client'
import { Electron } from '@/assets/images/svg';
import { loginApi } from '@/server/auth';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useEffect } from 'react';
import { useFormState } from 'react-dom';
import { toast } from 'sonner';
import '../../../../../../styles/global/noScroll.scss';
import styles from '../../../../../../styles/pages/auth.module.scss';
import ButtonLogin from './ButtonLogin';
const initialState = {
    message: '',
}
function FormLogin() {
    const t = useTranslations('Auth');
    const [state, formAction] = useFormState(loginApi, initialState)
    useEffect(() => {
        if (state.message) {
            toast(state.message);
        }
    }, [state.message])
    return (
        <form action={formAction} className={`h-[100%] flex flex-col items-center gap-[20px] backdrop-blur-[5px] rounded-[10px] py-[50px] px-[100px]`}>
            <div className={`${styles.logoImage} flex flex-col gap-2 justify-start items-center`}>
                <Electron props={'text-[60px]'} />
            </div>
            <div className='mb-[30px] flex flex-col justify-start items-center'>
                <span className='text-[23px] font-bold text-font-primary'>{t('login')}</span>
                <span className='text-[16px] font-normal text-gray-500 text-font-primary'>Welcome Back to Herb Edu</span>
            </div>
            <div className={`username`}>
                <input
                    className={`${styles.input} w-[350px] h-[46px] rounded-[10px] outline-none px-[20px] text-font-primary`}
                    type="text"
                    name='identifier'
                    placeholder='Email'
                />
            </div>
            <div className={`password`}>
                <input
                    className={`${styles.input} w-[350px] h-[46px] rounded-[10px] outline-none px-[20px] text-font-primary`}
                    type="password"
                    name='password'
                    placeholder={t('password')}
                />
            </div>
            <div className={`${styles.forgot} w-full flex justify-end`}>
                <Link href={"/forgot-password"}>
                    <span className="forgotNavi text-[14px] underline text-font-thin">{t('forgotPassword')}</span>
                </Link>
            </div>
            <ButtonLogin />
        </form>
    );
}

export default FormLogin;