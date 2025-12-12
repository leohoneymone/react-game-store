import React, { useLayoutEffect } from "react";

import { useStoreContext } from "../../utils/context";
import Toast from "./Toast";

const Main = ({children}) => {

    const {theme, toast} = useStoreContext();

    // Установка темы
    useLayoutEffect(() => {
        document.querySelector('html')?.setAttribute("theme", theme);
    }, [theme])

    return <main>
        {children}
        {toast ? <Toast /> : null}
    </main>
}

export default Main;
