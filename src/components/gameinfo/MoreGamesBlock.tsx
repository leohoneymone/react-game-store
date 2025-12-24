import React, { useEffect, useState } from "react";
import { Game, getDLCforGame, getGamesByDeveloper, getGamesByPublisher, getSeriesForGame } from "../../utils/api";
import GameTile from "../common/GameTile";

// Типы пропсов для контейнера с играми
type MoreGamesBlockProps = {
    type: 'dlc' | 'series' | 'developer' | 'publisher';
    slug: string,
    name?: string,
}

const MoreGamesBlock = ({type, slug, name}: MoreGamesBlockProps) => {
    
    // Состояния
    const [loading, setLoading] = useState<boolean>(true);
    const [games, setGames] = useState<Game[]>([]);

    // Поиск игр в зависимости от выбранного критерия
    useEffect(() => {
        switch(type){
            case 'dlc': 
                getDLCforGame(slug).then(data => setGames(data));
                break;
            case 'series':
                getSeriesForGame(slug).then(data => setGames(data));
                break;
            case 'developer':
                getGamesByDeveloper(slug).then(data => setGames(data));
                break;
            case 'publisher':
                getGamesByPublisher(slug).then(data => setGames(data));
                break; 
        }

        setLoading(false);
    }, [])

    /**
     * Функция для указания названия блока с играми
     * 
     * @returns строка с названием
     */
    const setBlockTitle = ():string => {
        let title = "";
        switch(type){
            case 'dlc': 
                title = `Дополнения к ${name}`; 
                break;
            case 'series': 
                title = `Другие части серии`; 
                break;
            case 'developer': 
                title = `Игры от разработчика ${name}`; 
                break;
            case 'publisher': 
                title = `Игры от издателя ${name}`; 
                break;    
        }
        return title;
    }

    return games.length ? <div className="info-page-row more-games-block">
        <h3>{setBlockTitle()}</h3>
        <div className="more-games-list">
            {games.map(item => <GameTile key={item.slug} {...item} />)}
        </div>
    </div> : null;
}

export default MoreGamesBlock;