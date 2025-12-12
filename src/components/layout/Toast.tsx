import React, { useEffect } from "react";
import { useStoreContext } from "../../utils/context";

const Toast = () => { 

    const {toast, setToast} = useStoreContext();

    // useEffect(() => {
    //     const toastTimeout = setTimeout(() => {
    //         setToast("");
    //     }, 2000)
 
    //     return () => {
    //         clearTimeout(toastTimeout);
    //     }
    // }, [])

    return <div className="toast-container">
        <span className="close" onClick={() => {setToast("")}}>✖</span>
        <h3>Оповещение</h3>
        <p>{toast}</p>
    </div>
}

export default Toast;