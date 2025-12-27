import React from "react";
import { useStoreContext } from "../../utils/context";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "../common/Breadcrumbs";
import ThemeToggler from "../common/ThemeToggler";
import CartItem from "../common/CartItem";

const CartPage = () => {

    // Контекст
    const {setToast, cart, setCart} = useStoreContext();

    // Навигация
    const nav = useNavigate();

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

                {cart.map(item => <CartItem key={`${item.slug}-${item.platforms}`} {...item} />)}

            </div>

        </div>
        
    </div>
}

export default CartPage;