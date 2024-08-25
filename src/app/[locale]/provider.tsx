'use client'
import { ErrorIcon, InfoIcon, SuccessIcon, WarningIcon } from "@/assets/images/svg";
import store from "@/stores";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { Toaster } from "sonner";

function StoreProvider({children}:any) {
    const theme = localStorage.getItem('theme');
    useEffect(() => {
        document.body.classList.add(theme === 'darkTheme' ? 'darkTheme' : 'lightTheme');
        if(theme === 'darkTheme'){
            localStorage.setItem('theme', 'darkTheme');
        }else{
            localStorage.setItem('theme', 'lightTheme');
        }
    })
    return (
        <Provider store={store}>
            {children}
            <Toaster
                richColors={true}
                expand={false}
                position="bottom-right"
                toastOptions={{
                  className: 'toaster-toast',
                }}
                closeButton
                duration={30000}
                icons={{
                    success: <SuccessIcon props={'text-[26px]'} />,
                    warning: <WarningIcon props={'text-[26px]'}/>,
                    info: <InfoIcon props={'text-[26px]'} />,
                    error: <ErrorIcon props={'text-[26px]'} />
                }}
                theme={theme === 'darkTheme' ? 'dark' : 'light'}
              />
        </Provider>
    );
}

export default StoreProvider;