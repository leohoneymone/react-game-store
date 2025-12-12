import React from "react";

import { useStoreContext } from "../../utils/context";

import gamepad from '../../assets/icons/gamepad.png';
import steam from '../../assets/icons/steam.png';
import ps from '../../assets/icons/ps.png';
import xbox from '../../assets/icons/xbox.png';
import nswitch from '../../assets/icons/switch.png';
import mobile from '../../assets/icons/mobile.png';

const StorePage = () => {

    const {theme, setTheme} = useStoreContext();

    return <div className="page-content">

        <div className="store-control-row">
            <div className="switch-block">
                <label htmlFor="all" className="switch-options"><input type="radio" name="platform" id="all" defaultChecked={true}/>
                    <img src={gamepad} alt="gamepad" /> Все
                </label>
                <label htmlFor="steam" className="switch-options"><input type="radio" name="platform" id="steam"/>
                    <img src={steam} alt="steam" /> Steam
                </label>
                <label htmlFor="ps" className="switch-options"><input type="radio" name="platform" id="ps"/>
                    <img src={ps} alt="ps" /> PS5
                </label>
                <label htmlFor="xbox" className="switch-options"><input type="radio" name="platform" id="xbox"/>
                    <img src={xbox} alt="xbox" /> Xbox
                </label>
                <label htmlFor="switch" className="switch-options"><input type="radio" name="platform" id="switch"/>
                    <img src={nswitch} alt="nswitch" /> Switch
                </label>
                <label htmlFor="mobile" className="switch-options"><input type="radio" name="platform" id="mobile"/>
                    <img src={mobile} alt="mobile" /> Мобильные
                </label>
            </div>

            <input type="text" placeholder="Поиск игры..." className="search-bar"/>

            <button>Корзина</button>

            <button>Товары</button>

            <div className="switch-block">
                <label htmlFor="light" className="switch-options"><input type="radio" name="theme" id="light" checked={theme === "light"} onClick={() => {setTheme("light")}}/>🌞</label>
                <label htmlFor="dark" className="switch-options"><input type="radio" name="theme" id="dark" checked={theme === "dark"} onClick={() => {setTheme("dark")}}/>🌑</label>
            </div>
        </div>

    </div>
}

export default StorePage;