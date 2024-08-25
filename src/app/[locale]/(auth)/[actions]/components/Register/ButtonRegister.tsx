import Button from '@/components/Button';
import { Typography } from 'antd';
import { useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import '../../../../../../styles/global/noScroll.scss';
import styles from '../../../../../../styles/pages/auth.module.scss';
const { Title } = Typography;
function ButtonRegister({ props }: any) {
    const { t, step, disableEmail, backStep } = props;
    const formStatus = useFormStatus();
    const getTextButtonByStep = (step: string) => {
        switch (step) {
            case 'stepVerifyEmail':
                return t('continue');
            case 'stepVerifyCode':
                return t('verify');
            default:
                return t('register');
        }
    }
    useEffect(() => {
        disableEmail(formStatus.pending);
    }, [formStatus])
    return (
        <>
            <div className={`${styles.btnRegister} submit flex justify-center items-center w-[350px] mt-[35px]`}>
                {
                    (step === 'stepRegister' || step === 'stepVerifyCode') &&
                    <Button
                        type='button'
                        text={t('back')}
                        className='btn btn-normal w-[100px]'
                        onclick={backStep}
                    />
                }
                <Button
                    type='submit'
                    text={getTextButtonByStep(step)}
                    className="btn btn-primary flex-1"
                    loading={formStatus.pending}
                    exprixeTime={step === 'stepVerifyCode' ? 120 : undefined}
                    handleExprixeTime={step === 'stepVerifyCode' ? backStep : undefined}
                />
            </div>
        </>
    );
}

export default ButtonRegister;