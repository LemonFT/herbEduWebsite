import '../../../../../../styles/global/noScroll.scss';
import styles from '../../../../../../styles/pages/auth.module.scss';
import FormLogin from './FormLogin';
function LoginPage() {
    return (<div className={`${styles.login} h-full w-full`}>
        <div className={`${styles.formLogin} w-full h-4/5 flex justify-center items-center mt-[30px]`}>
            <FormLogin />
        </div>
    </div>);
}

export default LoginPage;