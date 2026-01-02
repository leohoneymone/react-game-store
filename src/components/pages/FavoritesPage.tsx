import React, { useState } from "react";
import { useStoreContext } from "../../utils/context";
import { useNavigate } from "react-router-dom";

import Breadcrumbs from "../common/Breadcrumbs";
import ThemeToggler from "../common/ThemeToggler";
import Popup from "../layout/Popup";

import star from "../../assets/icons/star.png";
import GameTile from "../common/GameTile";
import FavItem from "../common/FavItem";

const FavoritesPage = () => {

    // Контекст
    const {setToast, favorites, setFavorites } = useStoreContext();

    // Навигация
    const nav = useNavigate();

    // Установка ширины сетки
    const setGridWidth = ():string => {
        if(favorites.length >= 4){
            return 'auto';
        }

        switch (favorites.length){
            case 1: return '25%';
            case 2: return '50%';
            case 3: return '75%';
            default: return 'auto';
        }
    } 

    return <div className="page-content">
        
        <div className="page-content-wrap">

            <div className="content-row">
                
                <Breadcrumbs url="" name="Избранное"/>
                
                <a className="go-back" onClick={() => {nav(-1)}}> ← Назад</a>

            </div>
            
            <div className="content-row">

                <h1>Избранное</h1>

                <ThemeToggler />

            </div>

            {favorites.length ? <div className="fav-block">
                <div className="control-row">
                    <h3>Игр в избранном: {favorites.length}</h3>
                    <button className="fav-clear">Очистить</button>
                </div>

                <div className="fav-grid" style={{width: setGridWidth()}}>
                    {favorites.map(item => <FavItem key={item.slug} {...item}/>)}
                </div>
            </div>

            : <div className="favorites-placeholder">
                <div className="fp-imgs">
                    <img src={star} alt="star"/>
                    <img src={star} alt="star"/>
                    <img src={star} alt="star"/>
                </div>
                <h1>Нет избранных игр</h1>
            </div>}

        </div>
        
    </div>
}

export default FavoritesPage;