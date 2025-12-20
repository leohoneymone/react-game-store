import React, { useEffect, useState, useRef } from "react";

import { useStoreContext } from "../../utils/context";

// API
import { SearchTerm, Game, GameData, getGenres, getTags, getGames } from "../../utils/api";

import { customSelectSortingOptions, customSelectTilesPerPageOptions, releaseOptionsList } from "../../utils/misc";

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
import Pagination from "../store/Pagination";
import GameTile from "../store/GameTile";

const StorePage = () => {
    // Контекст для управления темой
    const {theme, setTheme} = useStoreContext();

    // Cостояние загрузки
    const[loading, setLoading] = useState<boolean>(false);

    // Состояния для работы с выборкой
    const[search, setSearch] = useState<string>(""); 
    const[platform, setPlatform] = useState<string>('0');
    const[genres, setGenres] = useState<SearchTerm[]>([]);
    const[tags, setTags] = useState<SearchTerm[]>([]);

    // Работа с выборкой
    const[selGenres, selectGenres] = useState<number[]>([]);
    const[selTags, selectTags] = useState<number[]>([]);
    const[selDates, selectDates] = useState<number[]>([]);

    // Сортировка
    const[sort, setSort] = useState<string>(customSelectSortingOptions[0].value);

    // Пагинация
    const[tpp, setTpp] = useState<string>(customSelectTilesPerPageOptions[0].value);
    const[page, selectPage] = useState<number>(1);

    // Результаты выборки
    const[gamesCount, setGamesCount] = useState<number>(0);
    const[pagesNum, setPagesNum] = useState<number>(0);
    const[games, setGames] = useState<Game[]>([]);

    // Реф поля поиска игр
    const searchRef = useRef<HTMLInputElement>(null);
 
    // Подгрузка элементов выборки
    // Дополнительная обработка текста для лучшего отображения в полях
    useEffect(() => {
        setLoading(true);

        getGenres().then(data => setGenres(data.map(item => item.name === "Massively Multiplayer" ? {...item, name: "MMO"} : item)));

        getTags().then(data => setTags(data.map(item => item.name === "steam-trading-cards" ? {...item, name: "Steam Cards"} : item).filter(item => item.name !== "Partial Controller Support")));

    }, []);


    // Функция для получения данных с сервера по заданным параметрам
    const gamesRequest = ():void => {
        getGames(+tpp, page, platform, selDates, selGenres, selTags, sort, search).then(data => {
            setGamesCount(data.count);
            setGames(data.games);
            setPagesNum(Math.ceil(data.count / +tpp));
            setLoading(false);
        });
    }

    // Пагинация 
    useEffect(() => {
        setLoading(true);
        gamesRequest();
    }, [page, tpp]);

    // Сброс на первую страницу при изменении параметров поиска. Также вызывает поиск по заданным параметрам
    useEffect(() => {
        setLoading(true);
        if(page !== 1){
            selectPage(1);
        } else {
            gamesRequest();
        }
    }, [platform, selDates, selGenres, selTags, sort, search]); 

    // Работа с поисковой строкой
    const handleSearchBar = (e:React.KeyboardEvent<HTMLInputElement>): void => {
        if(e.key !== "Enter") return;
        setSearch(searchRef.current ? searchRef.current.value : "");
    }

    return <div className="page-content">

        <div className="store-control-row">
            <div className="switch-block">
                <label htmlFor="all" className="switch-options"><input type="radio" name="platform" id="all"  onChange={() => {setPlatform('0')}} defaultChecked={true}/>
                    <img src={gamepad} alt="gamepad"/> Все
                </label>
                <label htmlFor="steam" className="switch-options"><input type="radio" name="platform" id="steam" onChange={() => {setPlatform('1')}} />
                    <img src={steam} alt="steam"/> Steam
                </label>
                <label htmlFor="ps" className="switch-options"><input type="radio" name="platform" id="ps" onChange={() => {setPlatform('2')}} />
                    <img src={ps} alt="ps"/> PS5
                </label>
                <label htmlFor="xbox" className="switch-options"><input type="radio" name="platform" id="xbox" onChange={() => {setPlatform('3')}} />
                    <img src={xbox} alt="xbox"/> Xbox
                </label>
                <label htmlFor="switch" className="switch-options"><input type="radio" name="platform" id="switch" onChange={() => {setPlatform('7')}} />
                    <img src={nswitch} alt="nswitch"/> Switch
                </label>
                <label htmlFor="mobile" className="switch-options"><input type="radio" name="platform" id="mobile" onChange={() => {setPlatform("4,8")}} />
                    <img src={mobile} alt="mobile"/> Мобильные
                </label>
            </div>

            <input type="text" placeholder="Поиск (введите и нажмите Enter)" className="search-bar" onKeyDown={handleSearchBar} ref={searchRef}/>

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

                    <div className="tile-control-selects">
                        <CustomSelect data={customSelectSortingOptions} value={sort} select={setSort} />
                        <p className="tile-per-page-title">Игр на странице:</p>
                        <CustomSelect data={customSelectTilesPerPageOptions} value={tpp} select={setTpp} /> 
                    </div>

                    <Pagination page={page} total={pagesNum} select={selectPage}/>

                </div>

                { loading ? <Preloader /> : <div className="tile-content">
                    {games.map(item => <GameTile key={item.slug} {...item}/>)}
                </div>}

                <div className="tile-control-row under-tiles">
                    <Pagination page={page} total={pagesNum} select={selectPage}/>
                    <p className="results-count">Найдено {gamesCount} результатов</p>
                </div>

            </div>

        </div>

    </div>
}

export default StorePage;