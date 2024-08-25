"use client"
import { Loader } from "@/assets/images/svg";
import { useRouter } from "@/navigation";
import { useEffect, useState } from "react";

interface PropsType {
    type?: 'submit' | 'reset' | 'button';
    text?: string;
    icon?: React.ReactNode;
    className: string;
    link?: string;
    typeNavi?: 'push' | 'replace';
    loading?: boolean;
    onclick?: () => void;
    exprixeTime?: number | undefined;
    handleExprixeTime?: () => void | undefined;
}
const Button: React.FC<Readonly<PropsType>> = (props) => {

    const router = useRouter();
    const [timeLeft, setTimeLeft] = useState<number | undefined>(undefined);

    useEffect(() => {
        if(timeLeft){
            if (timeLeft > 0) {
                const timerId = setInterval(() => {
                    setTimeLeft((prevTime) => {
                        if(prevTime){
                            return prevTime - 1;
                        }
                    });
                }, 1000);
                return () => clearInterval(timerId);
            }else{
                (props.exprixeTime && props.handleExprixeTime) && props.handleExprixeTime();
            }
        }
    }, [timeLeft]);

    useEffect(() => {
        if(props.exprixeTime){
            setTimeLeft(props.exprixeTime);
        }
    }, [props.exprixeTime])

    return (
        <button
            type={props.type || 'button'}
            className={`${props.className} flex justify-center items-center gap-[10px]`}
            onClick={() => {
                if (props?.onclick) {
                    props?.onclick()
                }
                if (props.typeNavi && props.link) {
                    props.typeNavi === 'push' ? router.push(props.link) : router.replace(props.link);
                }
            }}
            style={{
                opacity: props.loading ? '.5' : '1',
                pointerEvents: props.loading ? 'none' : 'auto',
                userSelect: props.loading ? 'none' : 'auto',
            }}
        >
            {
                props.icon && <span>{props.icon}</span>
            }
            {props.text}
            {
                (props.exprixeTime && timeLeft && timeLeft >= 0 && !props.loading) &&
                <span className="text-font-primary">{timeLeft}</span>
            }
            {props.loading &&
                <span>
                    <Loader props={"text-[30px] text-white loader"} />
                </span>
            }
        </button>
    );
}

export default Button;