import React, { useEffect, useLayoutEffect, useState } from "react";

import { useStoreContext } from "../../utils/context";
import Toast from "./Toast";

const Main = ({children}) => {

    const {theme, toast} = useStoreContext();

    const [scroll, setScroll] = useState<number>(0);

    // Установка темы
    useLayoutEffect(() => {
        document.querySelector('html')?.setAttribute("theme", theme);
    }, [theme]);

    // Работа со скроллом
    const handleScroll = ():void => {
        setScroll(window.scrollY);
    }

    // Установка обработчика на скролл
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    }, []);

    return <main>
        {children}
        {toast ? <Toast /> : null}

        {scroll > 300 ? <button className="scroll-top" onClick={() => {window.scrollTo(0,0)}}>^</button> : null}
    </main>
}

export default Main;
