import React, {useEffect, useState} from "react";
import { useNavigate, useParams } from "react-router-dom";

// API
import { Achievements, GameFullData, GameStore, getFullGameInfo, getGameAchievements, getGameScreenshots, getGameStores } from "../../utils/api";
import { formatDate } from "../../utils/misc";

// Иконки
import cart from '../../assets/icons/cart.png';
import star from '../../assets/icons/star.png';
import steam from '../../assets/icons/steam.png';
import ps from '../../assets/icons/ps.png';
import xbox from '../../assets/icons/xbox.png';
import nswitch from '../../assets/icons/switch.png';
import mobile from '../../assets/icons/mobile.png';

// Компоненты
import ThemeToggler from "../common/ThemeToggler";
import Breadcrumbs from "../common/Breadcrumbs";
import Preloader from "../layout/Preloader";
import Screenshots from "../gameinfo/Screenshots";
import Ratings from "../gameinfo/Ratings";
import Achievement from "../gameinfo/Achievement";
import MoreGamesBlock from "../gameinfo/MoreGamesBlock";

const GameInfoPage = () => {

    // Для навигаци
    const nav = useNavigate();

    // Cостояние загрузки
    const[loading, setLoading] = useState<boolean>(true);

    // Алиас для поиска данных о игре
    const slug: string = useParams().slug || "";

    // Состояния для хранения информации о игре
    const[gameInfo, setGameInfo] = useState<GameFullData | undefined>(undefined);
    const[screenshots, setScreenshots] = useState<string[]>([]);
    const[stores, setStores] = useState<GameStore[]>([]);
    const[achievements, setAchievements] = useState<Achievements>({count: 0, items: []});

    // Загрузка основных данных о игре
    useEffect(() => {
        getFullGameInfo(slug).then(data => {
            setGameInfo(data);
        });
    }, []);

    // Загрузка дополнительных данных о игре
    useEffect(() => {

        // Скриншоты
        getGameScreenshots(slug).then(data => {
            setScreenshots(data);
        })

        // Ссылки на магазины
        getGameStores(slug).then(data => {
            setStores(data.sort((a, b) => (a.id - b.id)));
        })

        // Достижения
        getGameAchievements(slug, 1).then(data => {
            setAchievements(data);
        }).then(() => {
            setLoading(false); 
        })

    }, [gameInfo]);

    return <div className="page-content">
        
        {loading ? <Preloader /> : <div className="game-info-page-content">

            <div className="info-page-row">
                <Breadcrumbs url={`/game/${slug}`} name={gameInfo?.name || ""}/>

                <a className="go-back" onClick={() => {nav(-1)}}> ← Назад</a>
            </div>

            <div className="info-page-row">
                <h1>{gameInfo?.name}</h1>

                    <ThemeToggler />
            </div>

            <div className="info-page-row">

                <div className="info-page-column left">

                    <Screenshots images={screenshots} />

                    <div className="game-info-block description-block">
                        <h2>Описание</h2>
                        <p>{gameInfo?.description}</p>
                    </div>

                    <div className="game-info-block">
                        <h2>Информация о игре</h2>
                        <p><b>Дата релиза:</b> {formatDate(gameInfo?.release || '')}</p>
                        <p><b>Разрботчик:</b> {gameInfo?.developers.map((item, index) => gameInfo.developers.length - 1 !== index ? `${item.name} / `: item.name)}</p>
                        <p className="with-mb"><b>Издатель:</b> {gameInfo?.publishers.map((item, index) => gameInfo.publishers.length - 1 !== index ? `${item.name} / `: item.name)}</p>
                        <p className="with-mb"><b>Жанры:</b> {gameInfo?.genres.map((item, index) => gameInfo.genres.length - 1 !== index ? `${item} / `: item)} </p>
                        
                        <div className="tags-container"><b>Теги:</b> 
                            {gameInfo?.tags.map(item => <span key={item} className="tag-item">{item}</span>)}
                        </div>
                        {gameInfo?.website ? <a className="game-website" href={gameInfo.website} target="_blank" rel="noreferrer">{gameInfo.website}</a> : null}
                    </div>

                </div>
                
                <div className="info-page-column right">

                    <div className="purchase-options">

                        <button> <img src={star} alt="star" /> В избранное</button>
                        <button> <img src={cart} alt="cart" /> Добавить в корзину</button>

                        <h4>Официальные магазины</h4>

                        {stores.map(item => {
                            switch(item.id){
                                
                                // Ссылки на магазины
                                case 1: return <a href={item.url} target="_blank" rel="noreferrer" key={item.url} className="store-link"> <img src={steam} alt="steam"/> Steam</a>
                                case 2: return <a href={item.url} target="_blank" rel="noreferrer" key={item.url} className="store-link"> <img src={xbox} alt="xbox"/> Microsoft Store</a>               
                                case 3: return <a href={item.url} target="_blank" rel="noreferrer" key={item.url} className="store-link"> <img src={ps} alt="ps"/> PlayStation Store</a>
                                case 6: return <a href={item.url} target="_blank" rel="noreferrer" key={item.url} className="store-link"> <img src={nswitch} alt="nswitch"/> Nintendo E-Shop</a>
                                case 4: return <a href={item.url} target="_blank" rel="noreferrer" key={item.url} className="store-link"> <img src={mobile} alt="mobile"/> App Store</a>
                                case 8: return <a href={item.url} target="_blank" rel="noreferrer" key={item.url} className="store-link"> <img src={mobile} alt="mobile"/> Play Market</a>
                                
                                // Дополнительный ID для магазина Microsoft (Xbox)
                                case 7: return stores.find(i => i.id === 2) ? null : <a href={item.url} target="_blank" rel="noreferrer" key={item.url} className="store-link"> <img src={xbox} alt="xbox"/> Microsoft Store</a>
                                default: return null;
                            }
                        })}

                    </div>

                    {(gameInfo?.rating) ? <Ratings rates={gameInfo.rating}/>: null}

                    <div className="achievements-block">
                        <h3>Достижения <span className="achievements-count">{achievements.count}</span></h3>

                        {achievements.items.slice(0, 5).map(item => <Achievement key={item.id} {...item}/>)}

                        <button>Посмотреть все</button>
                    </div>

                </div>

            </div>

            <MoreGamesBlock name={gameInfo?.name} type="dlc" slug={slug}/>

            <MoreGamesBlock type="series" slug={slug}/>

            {gameInfo?.developers.map(item => <MoreGamesBlock name={item.name} type="developer" slug={item.slug}/>)}

            {gameInfo?.publishers.map(item => gameInfo?.developers.find(i => i.name === item.name) ? null : <MoreGamesBlock name={item.name} type="publisher" slug={item.slug}/>)}

        </div>

        }

    </div>

}

export default GameInfoPage;