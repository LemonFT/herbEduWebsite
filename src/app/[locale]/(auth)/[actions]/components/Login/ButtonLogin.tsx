import { useTranslations } from 'next-intl';
import styles from '../../../../../../styles/pages/auth.module.scss';
function ButtonLogin() {
    const t = useTranslations('Auth');
    return (
        <div className={`${styles.btnLogin} submit w-[350px] flex justify-center items-center`}>
            <button className="btn btn-primary w-full mt-[50px]">{t('login')}</button>
        </div>
    );
}

export default ButtonLogin;