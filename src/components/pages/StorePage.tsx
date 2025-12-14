import React, { useEffect, useState } from "react";

import { useStoreContext } from "../../utils/context";

// API
import { SearchTerm, getGenres, getTags } from "../../utils/api";

import { customSelectSortingOptions, releaseOptionsList } from "../../utils/misc";

// Иконки
import gamepad from '../../assets/icons/gamepad.png';
import steam from '../../assets/icons/steam.png';
import ps from '../../assets/icons/ps.png';
import xbox from '../../assets/icons/xbox.png';
import nswitch from '../../assets/icons/switch.png';
import mobile from '../../assets/icons/mobile.png';
import sun from '../../assets/icons/sun.png';
import moon from '../../assets/icons/moon.png';
import dice from '../../assets/icons/dice.png';
import cart from '../../assets/icons/cart.png';

// Компоненты
import SelectBlock from "../store/SelectBlock";
import Preloader from "../layout/Preloader";
import CustomSelect from "../store/CustomSelect";

const StorePage = () => {
    // Контекст для управления темой
    const {theme, setTheme} = useStoreContext();

    // Состояния для работы с выборкой
    const[genres, setGenres] = useState<SearchTerm[]>([]);
    const[tags, setTags] = useState<SearchTerm[]>([]);

    // Работа с выборкой
    const[selGenres, selectGenres] = useState<number[]>([]);
    const[selTags, selectTags] = useState<number[]>([]);
    const[selDates, selectDates] = useState<number[]>([]);

    // Сортировка
    const[sort, setSort] = useState<string>(customSelectSortingOptions[0].value);
 
    // Подгрузка элементов выборки
    // Дополнительная обработка текста для лучшего отображения в полях
    useEffect(() => {
        getGenres().then(data => setGenres(data.map(item => item.name === "Massively Multiplayer" ? {...item, name: "MMO"} : item)));

        getTags().then(data => setTags(data.map(item => item.name === "steam-trading-cards" ? {...item, name: "Steam Cards"} : item)));
    }, []);

    return <div className="page-content">

        <div className="store-control-row">
            <div className="switch-block">
                <label htmlFor="all" className="switch-options"><input type="radio" name="platform" id="all" defaultChecked={true}/>
                    <img src={gamepad} alt="gamepad"/> Все
                </label>
                <label htmlFor="steam" className="switch-options"><input type="radio" name="platform" id="steam"/>
                    <img src={steam} alt="steam"/> Steam
                </label>
                <label htmlFor="ps" className="switch-options"><input type="radio" name="platform" id="ps"/>
                    <img src={ps} alt="ps"/> PS5
                </label>
                <label htmlFor="xbox" className="switch-options"><input type="radio" name="platform" id="xbox"/>
                    <img src={xbox} alt="xbox"/> Xbox
                </label>
                <label htmlFor="switch" className="switch-options"><input type="radio" name="platform" id="switch"/>
                    <img src={nswitch} alt="nswitch"/> Switch
                </label>
                <label htmlFor="mobile" className="switch-options"><input type="radio" name="platform" id="mobile"/>
                    <img src={mobile} alt="mobile"/> Мобильные
                </label>
            </div>

            <input type="text" placeholder="Поиск игры..." className="search-bar"/>

            <a href="#" className="store-control-links"> <img src={cart} alt="cart" /> Корзина</a>

            <a href="#" className="store-control-links">Приобретённые</a>

            <div className="switch-block">
                <label htmlFor="light" className="switch-options"><input type="radio" name="theme" id="light" checked={theme === "light"} onChange={() => {setTheme("light")}}/>
                    <img src={sun} alt="sun" />
                </label>
                <label htmlFor="dark" className="switch-options"><input type="radio" name="theme" id="dark" checked={theme === "dark"} onChange={() => {setTheme("dark")}}/>
                    <img src={moon} alt="moon" />
                </label>
            </div>
        </div>

        <div className="store-content-block">

            <div className="store-select-panel">

                <button className="get-lucky-btn"> 
                    <img src={dice} alt="dice" /> Мне повезёт!
                </button>

                <SelectBlock title={"Дата выхода"} data={releaseOptionsList} select={selectDates} toggleable={false}/>

                <SelectBlock title={"Жанры"} data={genres} select={selectGenres} toggleable={true}/>

                <SelectBlock title={"Теги"} data={tags} select={selectTags} toggleable={true}/>
            </div>

            <div className="store-tile-container">

                <div className="tile-control-row background">

                    <CustomSelect data={customSelectSortingOptions} value={sort} select={setSort} />

                </div>

            </div>

        </div>

    </div>
}

export default StorePage;