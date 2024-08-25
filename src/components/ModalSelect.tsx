import { CloseIcon } from '@/assets/images/svg';
import { MyModalSelect } from '@/models/interfaces/modalSelect';
import styles from '../styles/components/selectmodal.module.scss';

function ModalSelect(props: Readonly<MyModalSelect>) {
    return (
        <div className={`${styles.modalSelect} relative`}>
            <button className={`absolute w-[max-content] top-[2px] right-[10px]`} onClick={props.onClose}>
                <CloseIcon props={'text-[20px]'}/>
            </button>
            {props?.icon && <span className={styles.icon}>{props.icon}</span>}
            <div className={`${styles.title}`}>{props.title}</div>
            <div className={styles.buttons}>
                <button onClick={props.onSelectedOne} className={`${styles.button} btn-normal`}>
                    {props?.textSelectedOne}
                </button>
                <button onClick={props.onSelectedTwo} className={`${styles.button} btn-primary`}>
                    {props?.textSelectedTwo}
                </button>
            </div>
        </div>);
}

export default ModalSelect;