import React, {useEffect, useState} from "react";
import { useNavigate, useParams } from "react-router-dom";

// API
import { Achievements, GameFullData, GameStore, getFullGameInfo, getGameAchievements, getGameScreenshots, getGameStores } from "../../utils/api";

// Компоненты
import ThemeToggler from "../common/ThemeToggler";
import Breadcrumbs from "../common/Breadcrumbs";
import Preloader from "../layout/Preloader";
import Screenshots from "../gameinfo/Screenshots";

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
            setStores(data);
        })

        // Достижения
        getGameAchievements(slug, 1).then(data => {
            setAchievements(data);
        }).then(data => {
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

                <Screenshots images={screenshots} />

                <div className="purchase-controls rigth-panel">

                </div>
            </div>

        </div>

        }

    </div>

}

export default GameInfoPage;