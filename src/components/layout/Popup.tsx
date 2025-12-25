import React, { Children, ReactNode } from "react";

// Типы для пропсов 
type PopupProps = {
    close: () => void,
    children?: ReactNode,
}

/**
 * Компонент - всплывающее окно для разделов приложения
 * 
 * @param {PopupProps} props пропсы
 * @param {() => void} close функция для закрытия всплывающего окна
 * @param {ReactNode} children разметка внутри всплывающего окна
 * @returns JSX-разметка всплывающего окна
 */
const Popup = ({close, children}: PopupProps) => {

    return <div className="popup-background-overlay">
        <div className="popup-window">
            <span className="popup-close" onClick={close}>×</span>
            {children}
        </div>
    </div>
}

export default Popup;