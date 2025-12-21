import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import { Achievements, GameFullData, GameStore, getFullGameInfo, getGameAchievements, getGameScreenshots, getGameStores } from "../../utils/api";
import Breadcrumbs from "../common/Breadcrumbs";


const GameInfoPage = () => {

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
            setStores(data);
        })

        // Достижения
        getGameAchievements(slug, 1).then(data => {
            setAchievements(data);
        })

    }, [gameInfo]);

    return <div className="page-content">
        <Breadcrumbs url={`/#/game/${slug}`} name={gameInfo?.name || ""}/>
    </div>

}

export default GameInfoPage;