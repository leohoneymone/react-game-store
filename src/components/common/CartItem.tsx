import React from "react";
import { Link } from "react-router-dom";

import { GameInCart, useStoreContext } from "../../utils/context";

import placeholder from '../../assets/placeholder-img.png';

const CartItem = ({name, slug, screenshots, genres, platforms}: GameInCart) => {

    // Контекст
    const {setToast, cart, setCart} = useStoreContext();

    return <div className="cart-item">
        <img src={screenshots.length ? screenshots[0] : placeholder} alt={slug} />
        
        <div className="item-info">

            <h2>{name} ({platforms})</h2>

            <p className="genres">{genres.map((item, i) => i !== genres.length - 1 ? `${item} / `: item)}</p>

        </div>

        <div className="item-controls">

            <Link to={`/game/${slug}`}>Подробнее о игре</Link>
            <button className="remove-from-cart" > Убрать из корзины</button>

        </div>

    </div>
}

export default CartItem;