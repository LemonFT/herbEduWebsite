import ModalSelect from "@/components/ModalSelect";
import { MyModalSelect } from "@/models/interfaces/modalSelect";
import { createRoot } from "react-dom/client";

export const showModal = (props: MyModalSelect): void => {
    document.getElementById('modal-container')?.remove();
    const modalElement = ModalSelect({
        ...props,
        onSelectedOne: props.onSelectedOne || (() => {
            root.unmount();
            modalContainer.remove();
        }),
        onClose: () => {
            root.unmount();
            modalContainer.remove();
        }
    })
    const modalContainer = document.createElement('div');
    modalContainer.classList.add('modal-container');
    modalContainer.id = 'modal-container';
    document.body.appendChild(modalContainer);
    const root = createRoot(modalContainer);
    root.render(modalElement);
}

export const turnOnScrollBody = (): void => {
    const styleElement = document.createElement("style");
    styleElement.setAttribute("id", "disable-scroll-style");
    styleElement.innerHTML = `
            body {
                overflow: hidden;
            }
        `;
    document.head.appendChild(styleElement);
}

export const turnOffScrollBody = (): void => {
    const styleElement = document.getElementById("disable-scroll-style");
    if (styleElement) {
        document.head.removeChild(styleElement);
    }
}