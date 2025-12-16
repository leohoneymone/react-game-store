import React, { useEffect } from "react";

import { Game } from "../../utils/api";

// Иконки платформ
import steam from '../../assets/icons/steam.png';
import ps from '../../assets/icons/ps.png';
import xbox from '../../assets/icons/xbox.png';
import nswitch from '../../assets/icons/switch.png';
import mobile from '../../assets/icons/mobile.png';

/**
 * Функция, форматирующая строку из формата ISO 8601 в более человекопонятный вид для отображения внутри тайла ("плитки")
 * 
 * @param {string} str - дата в формате ISO 8601
 * @returns - возвращаемая строка даты и времени на русском языке
 */
const formatDate = (str: string): string => {
    return new Date(str).toLocaleDateString("ru", {year: 'numeric',  month: 'short',  day: 'numeric'});
}

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
const GameTile = ({ name, slug, genres, tags, background, screenshots, platforms, release }: Game) => {

    return <div className="game-tile">
        <img className="thumbnail" src={background} alt={slug} />
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
                <button>Подробнее</button>
            </div>
        </div>
    </div>
}

export default GameTile;