import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Game } from "../../utils/api";

import { formatDate } from "../../utils/misc";

// Иконки платформ
import steam from '../../assets/icons/steam.png';
import ps from '../../assets/icons/ps.png';
import xbox from '../../assets/icons/xbox.png';
import nswitch from '../../assets/icons/switch.png';
import mobile from '../../assets/icons/mobile.png';

/**
 * Компонент, реализующий логику работы тайла с игрой
 * 
 * @param {Game} props набор пропсов для работы поля
 * @param {string} name Название игры
 * @param {string} slug алиас игры. Используется для ссылок и в качестве значения key компонента 
 * @param {string[]} genres список жанров, к которым относится игра
 * @param {string[]} tags список пользовательских тегов, которые указаны для игры
 * @param {string} background URL изображения игры, используемое как картинка по умолчанию
 * @param {string[]} screenshots список URLов скриншотов, которые переключаются между игрой
 * @param {string[]} platforms список платформ, на которые вышла / выходит игра
 * @param {string} release дата выхода игры формата ISO 8601
 * @returns JSX разметка тайла с информацией о игре
 */
const GameTile = ({ name, slug, genres, tags, screenshots, platforms, release }: Game) => {

    // Состояние источника картинки
    const[imgIndex, setImgIndex] = useState<number>(0);

    // Реф интервала 
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    // Наведение на тайл
    const handleMouseEnter = ():void => {
        if(intervalRef.current) return;

        // Если скриншоты отстутствуют
        if(screenshots.length <= 1) return;

        setImgIndex(1);
        intervalRef.current = setInterval(() => {
            setImgIndex(prev => (prev + 1 < screenshots.length) ? prev + 1 : 1);
        }, 1000);
    }

    // Убирание наведения на тайл
    const handleMouseLeft = ():void => {
        if(intervalRef.current){
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        setImgIndex(0);
    }

    return <div className="game-tile" onMouseEnter={() => {handleMouseEnter()}} onMouseLeave={() => {handleMouseLeft()}}>
        <img className="thumbnail" src={screenshots[imgIndex]} alt={slug}/>
        <div className="game-tile-text">
            <h3 className="title">{name}</h3>
            <div className="platforms">
                {platforms.map(item => {
                    switch(item){
                        case "PC": return <img key={`${slug}-${item}`} className="platform-logo" src={steam} alt={item}/>;
                        case "PlayStation": return <img key={`${slug}-${item}`} className="platform-logo" src={ps} alt={item}/>;
                        case "Xbox": return <img key={`${slug}-${item}`} className="platform-logo" src={xbox} alt={item}/>;
                        case "Nintendo": return <img key={`${slug}-${item}`} className="platform-logo" src={nswitch} alt={item}/>;
                        case "iOS": return <img key={`${slug}-${item}`} className="platform-logo" src={mobile} alt={item}/>;
                        case "Android": return platforms.find(i => i === "iOS") ? null : <img key={`${slug}-${item}`} className="platform-logo" src={mobile} alt={item}/>;
                    }
                })}
            </div>
            <p className="genres">{genres.join(" / ")}</p>
            <p className="tags">{tags.slice(0, 5).join(" / ")}</p>
            <div className="last-row">
                <p className="date">{formatDate(release)}</p>
                <Link className="game-info-link" to={`/game/${slug}`}>Подробнее</Link>
            </div>
        </div>
    </div>
}

export default GameTile;