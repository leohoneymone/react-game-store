import React from "react";

import { useStoreContext } from "../../utils/context";

import sun from '../../assets/icons/sun.png';
import moon from '../../assets/icons/moon.png';

/**
 * Компонент, реализующий механизм переключения темы приложения 
 *
 * @returns JSX-разметка компмонента
 */
const ThemeToggler = () => {

    // Контекст для управления темой
    const {theme, setTheme} = useStoreContext();

    return <div className="switch-block theme-toggler">
    <label htmlFor="light" className="switch-options"><input type="radio" name="theme" id="light" checked={theme === "light"} onChange={() => {setTheme("light")}}/>
        <img src={sun} alt="sun" />
    </label>
    <label htmlFor="dark" className="switch-options"><input type="radio" name="theme" id="dark" checked={theme === "dark"} onChange={() => {setTheme("dark")}}/>
        <img src={moon} alt="moon" />
    </label>
</div>
}

export default ThemeToggler;