import React, {useEffect, useRef, useState} from "react";
import { useNavigate, useParams } from "react-router-dom";

// API
import { Achievements, GameFullData, GameStore, getFullGameInfo, getGameAchievements, getGameScreenshots, getGameStores, Game } from "../../utils/api";
import { formatDate } from "../../utils/misc";
import { useStoreContext, GameInCart } from "../../utils/context";

// Иконки
import cartImg from '../../assets/icons/cart.png';
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
import Popup from "../layout/Popup";

const GameInfoPage = () => {

    // Для навигаци
    const nav = useNavigate();

    // Контекст
    const {cart, setCart, favorites, setFavorites, setToast} = useStoreContext();

    // Cостояние загрузки
    const[loading, setLoading] = useState<boolean>(false);

    // Реф для "дозагрузки" достижений
    const AchievementLenRef = useRef(0);

    // Алиас для поиска данных о игре
    const slug: string = useParams().slug || "";

    // Состояния для хранения информации о игре
    const[gameInfo, setGameInfo] = useState<GameFullData | undefined>(undefined);
    const[screenshots, setScreenshots] = useState<string[]>([]);
    const[stores, setStores] = useState<GameStore[]>([]);
    const[achievements, setAchievements] = useState<Achievements>({count: 0, items: []});

    // Флаги для открытия всплывающих окон
    const[cartAddPopup, setCartAddPopup] = useState<boolean>(false); 
    const[achievementsPopup, setAchievementsPopup] = useState<boolean>(false);

    // Загрузка основных данных о игре
    useEffect(() => {
        setLoading(true);
        getFullGameInfo(slug).then(data => {
            setGameInfo(data);
        });
    }, [slug]);

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
            AchievementLenRef.current = data.items.length;
        }).then(() => {
            setLoading(false); 
        })


    }, [gameInfo]);

    // "Дозагрузка" достижений
    useEffect(() => {
        const achievementsFetchCycle = async () => {
            let pg = 2;

            while(AchievementLenRef.current < achievements.count){
                try{
                    const data = await getGameAchievements(slug, pg);
                    setAchievements(prev => ({...prev, items: [...prev.items, ...data.items]}));
                    AchievementLenRef.current += data.items.length;
                    pg++;
                } catch (err) {
                    console.error(`Fetch loop error: ${err}`);
                    break;
                }
            }
        }        

        if(achievementsPopup) {
            achievementsFetchCycle();
        }

    }, [achievementsPopup]);

    // Добавление игры в избранное
    const handleAddToFavorites = ():void => {
        if(favorites.find(item => item.slug === slug)){
            setToast(`${gameInfo?.name} уже в избранном`);
            return;
        }

        const gameToFav: Game = {
            name: gameInfo?.name || "",
            slug: slug,
            genres: gameInfo?.genres || [],
            tags: gameInfo?.tags || [],
            screenshots: gameInfo?.screenshots || [],
            platforms: gameInfo?.platforms || [],
            release: gameInfo?.release || "",
        }

        setFavorites([...favorites, gameToFav]);
        setToast(`${gameInfo?.name} добавлена в избранное`);
    }

    // Добавление игры в корзину
    const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>): void => {
        if(!e.currentTarget.value){
            console.error(`Error: Cannot find value property of selected platform`);
            return;
        }

        if(cart.find(item => item.slug === slug && item.platforms === e.currentTarget.value)){
            setCartAddPopup(false);
            setToast(`${gameInfo?.name} (${e.currentTarget.value}) уже в корзине`);
            return;
        }

        const gameToCart: GameInCart = {
            name: gameInfo?.name || "",
            cartslug: `${slug}-${e.currentTarget.value}`,
            slug: slug,
            genres: gameInfo?.genres || [],
            tags: gameInfo?.tags || [],
            screenshots: gameInfo?.screenshots || [],
            platforms: e.currentTarget.value,
            release: gameInfo?.release || "",
        }

        setCart([...cart, gameToCart]);
        setCartAddPopup(false);
        setToast(`${gameInfo?.name} (${e.currentTarget.value}) добавлена в корзину`);
    }

    return <div className="page-content">
        
        {loading ? <Preloader /> : <div className="page-content-wrap game-info-page-content">

            <div className="content-row">
                <Breadcrumbs url={`/game/${slug}`} name={gameInfo?.name || ""}/>

                <a className="go-back" onClick={() => {nav(-1)}}> ← Назад</a>
            </div>

            <div className="content-row">
                <h1>{gameInfo?.name}</h1>

                    <ThemeToggler />
            </div>

            <div className="content-row main">

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

                        <button onClick={() => {handleAddToFavorites()}}> <img src={star} alt="star"/> Добавить в избранное</button>
                        <button onClick={() => {setCartAddPopup(true)}}> <img src={cartImg} alt="cart" /> Добавить в корзину</button>

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

                    {achievements.items.length ? <div className="achievements-block">
                        <h3>Достижения <span className="achievements-count">{achievements.count}</span></h3>

                        {achievements.items.slice(0, 5).map(item => <Achievement key={item.id} {...item}/>)}

                        <button onClick={() => {setAchievementsPopup(true)}}>Посмотреть все</button>
                    </div> : null}

                </div>

            </div>

            <MoreGamesBlock name={gameInfo?.name} type="dlc" slug={slug}/>

            <MoreGamesBlock type="series" slug={slug}/>

            {gameInfo?.developers.map(item => <MoreGamesBlock key={`developer-${item.slug}`} name={item.name} type="developer" slug={item.slug}/>)}

            {gameInfo?.publishers.map(item => gameInfo?.developers.find(i => i.name === item.name) ? null : <MoreGamesBlock key={`publisher-${item.slug}`} name={item.name} type="publisher" slug={item.slug}/>)}

        </div>

        }

        {cartAddPopup ? <Popup close={() => {setCartAddPopup(false)}}> 
            
            <div className="popup-platform-selector">
                <h1>Выберите платформу</h1>
                <div className="platforms-list">

                    {gameInfo?.platforms.map(item => {
                        switch(item){
                            case 'PC': return <button onClick={handleAddToCart} key={'select-platform-'+item} value={item}> <img src={steam} alt="steam"/> Steam </button>;
                            case 'PlayStation': return <button onClick={handleAddToCart} key={'select-platform-'+item} value={item}> <img src={ps} alt="ps"/> PlayStation </button>;
                            case 'Xbox': return <button onClick={handleAddToCart} key={'select-platform-'+item} value={item}> <img src={xbox} alt="xbox"/> XBOX </button>;
                            case 'Nintendo': return <button onClick={handleAddToCart} key={'select-platform-'+item} value={item}> <img src={nswitch} alt="nswitch"/> Nintendo Switch </button>;
                            case 'Android': return <button onClick={handleAddToCart} key={'select-platform-'+item} value={item}> <img src={mobile} alt="Android"/> Android </button>;
                            default: return null;
                        }
                    })}

                </div>
            </div>

        </Popup> : null}

        {achievementsPopup ? <Popup close={() => {setAchievementsPopup(false)}}>
            <h2>Достижения {gameInfo?.name}</h2>

            <div className="popup-achievements">
                {achievements.items.map(item => <Achievement key={item.id} {...item}/>)}
            </div>
        </Popup> : null}

    </div>

}

export default GameInfoPage;