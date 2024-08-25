'use client'
import { Electron, EyeOff, EyeOn } from '@/assets/images/svg';
import { containsNonWhitespaceCharacters } from '@/helpers/logic';
import { useRouter } from '@/navigation';
import { registerApi, sendVerifyCodeApi, verifycationEmailApi } from '@/server/auth';
import type { GetProp } from 'antd';
import { Flex, Input, Typography } from 'antd';
import { OTPProps } from 'antd/es/input/OTP';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useFormState } from 'react-dom';
import { toast } from 'sonner';
import { useTranslations } from 'use-intl';
import '../../../../../../styles/global/noScroll.scss';
import styles from '../../../../../../styles/pages/auth.module.scss';
import ButtonRegister from './ButtonRegister';
const { Title } = Typography;
const initialStateEmail = {
    message: '',
    status: '',
}
const initialStateCode = {
    message: '',
    status: '',
}
const initialStateRegister = {
    message: '',
    status: '',
    email: '',
    password: '',
    confirmPassword: '',
}
function FormRegister() {
    const t = useTranslations("Auth");
    const router = useRouter();
    const emailRef = useRef<HTMLInputElement>(null);
    const [step, setStep] = useState<'stepVerifyEmail' | 'stepVerifyCode' | 'stepRegister'>('stepRegister')
    const [stateEmail, formActionEmail] = useFormState(verifycationEmailApi, initialStateEmail)
    const [stateCode, formActionCode] = useFormState(sendVerifyCodeApi, initialStateCode)
    const [stateRegister, formActionRegister] = useFormState(registerApi, initialStateRegister)
    const [codeVerify, setCodeVerify] = useState<string>('-')
    const [disableCodeVerify, setDisableCodeVerify] = useState<boolean>(true);
    const [disableEmail, setDisableEmail] = useState<boolean>(false);
    const [passwordShow, setPasswordShow] = useState<boolean>(false);
    const [passwordConfirmShow, setPasswordConfirmShow] = useState<boolean>(false);
    // focus email when mounted
    useEffect(() => {
        handleFocusEmail()
    }, [])
    const handleFocusEmail = () => {
        emailRef?.current?.focus()
    }
    const closeCodeVerify = (): void => {
        setCodeVerify('-')
        setDisableCodeVerify(true)
    }
    const handleEmailUpdate = (event: ChangeEvent<HTMLInputElement>) => {
        if (!disableCodeVerify) {
            closeCodeVerify()
            setStep('stepVerifyEmail')
        }
    }
    //

    // handle with response when verifycation email
    useEffect(() => {
        if (stateEmail.status === 200) {
            openCodeVerify();
            setStep('stepVerifyCode')
            containsNonWhitespaceCharacters(stateEmail.message) && toast.success(stateEmail.message)
        } else {
            containsNonWhitespaceCharacters(stateEmail.message) && toast.warning(stateEmail.message)
        }
    }, [stateEmail])

    const openCodeVerify = (): void => {
        setCodeVerify('')
        setDisableCodeVerify(false)
        handleFocusCodeVerify()
    }
    //

    // handle with response when verifycation code
    useEffect(() => {
        if (stateCode.status === 200) {
            setStep('stepRegister')
        } else {
            containsNonWhitespaceCharacters(stateCode.message) && toast.warning(stateCode.message)
        }
    }, [stateCode])
    //

    // handle with response when register
    useEffect(() => {
        if (stateRegister.status === 200) {
            containsNonWhitespaceCharacters(stateRegister.message) && toast.success(stateRegister.message)
            router.replace('/login')
        } else {
            containsNonWhitespaceCharacters(stateRegister.message) && toast.warning(stateRegister.message)
        }
    }, [stateRegister])
    //

    // handle UI OTP
    const handleFocusCodeVerify = () => {
        const inputElement = document.querySelector('.ant-input') as HTMLInputElement;
        if (inputElement) {
            inputElement.focus();
        }
    }

    const onChange: GetProp<typeof Input.OTP, 'onChange'> = (otp) => {
        setCodeVerify(otp)
    };

    const sharedProps: OTPProps = {
        onChange,
    };
    //

    // get form action by step
    const getFormActionByStep = () => {
        switch (step) {
            case 'stepVerifyEmail':
                return formActionEmail;
            case 'stepVerifyCode':
                return formActionCode;
            case 'stepRegister':
                return formActionRegister;
        }
    }

    return (
        <form action={getFormActionByStep()} className={`h-[80%] flex flex-col justify-start items-center gap-[10px] backdrop-blur-[5px] rounded-[10px] pt-[30px] pb-[50px] px-[150px]`}>
            <div className={`${styles.logoImage} flex flex-col gap-2 justify-center items-center `}>
                <Electron props={'text-[60px]'} />
            </div>
            <div className='mb-[30px] flex flex-col justify-start items-center'>
                <span className='text-[23px] font-bold text-font-primary'>{t('register')}</span>
                <span className='text-[16px] font-normal text-gray-500 text-font-primary'>Your Learning Journey with Herb Edu</span>
            </div>
            <div className={`email w-[350px] relative flex justify-center items-center ${(step === 'stepRegister' || step === 'stepVerifyCode') && 'hidden'}`}>
                <input
                    disabled={disableEmail}
                    ref={emailRef}
                    className={`${styles.input} w-[350px] h-[46px] rounded-[10px] outline-none pl-[20px] pr-[60px] text-font-primary`}
                    type="text"
                    name='email'
                    placeholder='Email'
                    onChange={(event) => handleEmailUpdate(event)}
                />
            </div>
            <input type='text' name='codeVerify' className='hidden' value={codeVerify} />
            {
                (step === 'stepVerifyCode') &&
                <Flex style={{
                    opacity: disableCodeVerify ? '.5' : '1',
                    pointerEvents: disableCodeVerify ? 'none' : 'auto',
                    userSelect: disableCodeVerify ? 'none' : 'auto',
                    width: '100%',
                    justifyContent: 'space-between',
                }}
                    vertical
                >
                    <Title style={{
                        fontFamily: "'Courier New', Courier, monospace",
                        fontSize: "15px",
                        textAlign: 'center',
                        width: '100%',
                        fontWeight: '500',
                        color: 'rgb(11 12 13)'
                    }} level={5}>{t('requestEnterCode')}</Title>
                    <Input.OTP
                        value={codeVerify}
                        style={{ height: '46px' }}
                        formatter={(str) => str.toUpperCase()}
                        {...sharedProps}
                    />
                </Flex>
            }
            <div className={`pass w-[350px] relative flex justify-center items-center ${step !== 'stepRegister' && 'hidden'}`}>
                <input
                    className={`${styles.input} w-[350px] h-[46px] rounded-[10px] outline-none pl-[20px] pr-[60px] text-font-primary`}
                    type={passwordShow ? 'text' : 'password'}
                    name='pass'
                    placeholder={t('password')}
                />
                <span
                    className='absolute right-5 top-[50%] translate-y-[-50%]'
                    onClick={() => {
                        setPasswordShow(!passwordShow);
                    }}
                >
                    {
                        passwordShow ? <span><EyeOff props={'text-[23px]'} /></span> : <span><EyeOn props={'text-[23px]'} /></span>
                    }
                </span>
            </div>
            <div className={`passconfirm w-[350px] relative flex justify-center items-center ${step !== 'stepRegister' && 'hidden'}`}>
                <input
                    className={`${styles.input} w-[350px] h-[46px] rounded-[10px] outline-none pl-[20px] pr-[60px] text-font-primary`}
                    type={passwordConfirmShow ? 'text' : 'password'}
                    name='passcf'
                    placeholder={t('password_confirmation')}
                />
                <span
                    className='absolute right-5 top-[50%] translate-y-[-50%]'
                    onClick={() => {
                        setPasswordConfirmShow(!passwordConfirmShow);
                    }}
                >
                    {
                        passwordConfirmShow ? <span><EyeOff props={'text-[23px]'} /></span> : <span><EyeOn props={'text-[23px]'} /></span>
                    }
                </span>
            </div>
            <ButtonRegister props={{
                t,
                step,
                disableEmail: (status: boolean) => {
                    setDisableEmail(status);
                },
                backStep: () => {
                    setStep('stepVerifyEmail');
                }
            }}
            />
        </form>
    );
}

export default FormRegister;