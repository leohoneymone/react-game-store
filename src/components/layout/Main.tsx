import React, { useEffect } from "react";

import { useStoreContext } from "../../utils/context";

const Main = () => {

    const {theme, setTheme} = useStoreContext();
    
    useEffect(() => {
        document.querySelector('html')?.setAttribute('theme', theme);
    }, [theme])

    return <main>
        {theme}
        <button onClick={() => {setTheme(theme === 'light' ? 'dark' : 'light')}}>Сменить тему</button>
    </main>
}

export default Main;
