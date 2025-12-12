import React, { createContext, useState, useContext } from "react";

// типы
export type Themes = 'light' | 'dark';

type CtxTypes = {
    theme: Themes,
    setTheme: (theme: Themes) => void
}

const storeCtx = createContext<CtxTypes | undefined>(undefined);

export default function StoreContext({children}){

    const[theme, setTheme] = useState<Themes>('dark');

    const value = {
        theme, setTheme
    }

    return <storeCtx.Provider value={value}>
        {children}
    </storeCtx.Provider>
}

export const useStoreContext = () => {
    const ctx = useContext(storeCtx);
    if(typeof ctx === undefined || ctx === undefined){
        throw new Error("Ошибка контекста: не удалось загрузить. Убедитесь, что контекст используется внутри провайдера");
    }
    return ctx;
}