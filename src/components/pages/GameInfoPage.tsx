import React, {useEffect} from "react";
import { useParams } from "react-router-dom";


const GameInfoPage = () => {

    // Алиас для поиска данных о игре
    const slug: string = useParams().slug || "";

    return <h2 style={{color: 'white'}}>{slug}</h2>

}

export default GameInfoPage;