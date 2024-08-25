import { redirect } from "@/navigation";
import styles from "../../../../styles/pages/auth.module.scss";
import Header from "./components/Header/Header";
import LoginPage from "./components/Login/Login";
import RegisterPage from "./components/Register/Register";
function Auth(props: any) {
    if (props?.params?.actions !== 'login' && props?.params?.actions !== 'register') {
        redirect('/')
    }
    return (
        <div className={`${styles.auth} h-full w-full`}>
            <div className={`${styles.header} w-full h-[80px] flex justify-end flex-wrap px-[30px] overflow-hidden`}>
                <div className="groupButton w-full flex justify-end items-center">
                    <Header />
                </div>
            </div>
            {
                props?.params?.actions === 'login' &&
                <LoginPage />
            }
            {
                props?.params?.actions === 'register' &&
                <RegisterPage />
            }
        </div>
    );
}

export default Auth;