import React, { SetStateAction, createContext, useState, useContext, useEffect, Dispatch } from "react";

import { Game } from "./api";

// Тип темы
export type Themes = 'light' | 'dark';

// Тип игры в корзине
export interface GameInCart extends Omit<Game, 'platforms'>{
    cartslug: string,
    platforms: string,
}

type CtxTypes = {
    theme: Themes,
    setTheme: (theme: Themes) => void

    cart: GameInCart[],
    setCart: (game: GameInCart[]) => void,

    favorites: Game[],
    setFavorites: (game: Game[]) => void,

    toast: string,
    setToast: (msg: string) => void
}

const storeCtx = createContext<CtxTypes | undefined>(undefined);

export default function StoreContext({children}){

    const[theme, setTheme] = useLocalStorage<Themes>('theme', 'dark');
    const[toast, setToast] = useState<string>("");
    const[cart, setCart] = useLocalStorage<GameInCart[]>('cart', []);
    const[favorites, setFavorites] = useLocalStorage<Game[]>('favorites', []);

    const value = {
        theme, setTheme,
        toast, setToast,
        cart, setCart,
        favorites, setFavorites,
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

/**
 * Кастомный хук для сохранения данных в localStorage. Является шаблонной функцией (generic)
 * 
 * @param {string} key ключ, к которому в localStorage будут привязаны данные
 * @param {T[]} initValue значение по умолчанию
 * @returns кортеж типа useState для инициализации состояния
 */
function useLocalStorage<T>(key: string, initValue: T): [T, Dispatch<SetStateAction<T>>]{
    const valueStr: string | null = localStorage.getItem(key);
    const [value, setValue] = useState<T>(valueStr ? JSON.parse(valueStr) : initValue);

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
}