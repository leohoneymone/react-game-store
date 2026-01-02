import React, { useState } from "react";
import { useStoreContext } from "../../utils/context";
import { useNavigate } from "react-router-dom";

import Breadcrumbs from "../common/Breadcrumbs";
import ThemeToggler from "../common/ThemeToggler";
import CartItem from "../common/CartItem";
import Popup from "../layout/Popup";

const CartPage = () => {

    // Контекст
    const {setToast, cart, setCart} = useStoreContext();
    const [orderPopup, setOrderPopup] = useState<boolean>(false);

    // Навигация
    const nav = useNavigate();

    // Очистка корзины
    const handleClearCart = () => {
        setCart([]);
        setToast('Корзина успешно очищена');
    }

    return <div className="page-content">
        
        <div className="page-content-wrap">

            <div className="content-row">
                
                <Breadcrumbs url="" name="Корзина"/>
                
                <a className="go-back" onClick={() => {nav(-1)}}> ← Назад</a>

            </div>
            
            <div className="content-row">

                <h1>Корзина</h1>

                <ThemeToggler />

            </div>
                    
            <div className="content-row cart-row">

                <div className="cart-items">
                    {cart.map(item => <CartItem key={item.cartslug} {...item} />)}
                </div>

                <div className="cart-control-menu">
                    <h3>Товаров в корзине: {cart.length}</h3>

                    <div className="cart-control-buttons">
                        <button className="order-btn" onClick={() => {setOrderPopup(true)}}>Оформить заказ</button>
                        <button className="clear-cart-btn" onClick={() => handleClearCart()}>Очистить корзину</button>
                    </div>
                </div>

            </div>

        </div>

        {orderPopup ? <Popup close={() => {setOrderPopup(false); setCart([]);}}>
            <h3>Информация о заказе</h3>
            
            <div className="order-info">
                <h1>Заказ успешно оформлен</h1>
                <ul>
                    {cart.map(item => <li key={`${item.cartslug}-li`}>{item.name} ({item.platforms})</li>)}
                </ul>
                <h3>Ваша заявка оставлена. В течение 3-5 рабочих дней с Вами свяжутся для получения подробностей, а также продолжения работы с заказом (не свяжутся)</h3>
                <button onClick={() => {setOrderPopup(false); setCart([]);}}>ОК</button>
            </div>

        </Popup> : null}
        
    </div>
}

export default CartPage;