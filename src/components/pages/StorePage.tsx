import React from "react";

const StorePage = () => {

    return <div className="page-content">

        <div className="store-control-row">
            <div className="switch-block">
                <label htmlFor="all" className="switch-options"><input type="radio" name="platform" id="all"/>Все</label>
                <label htmlFor="steam" className="switch-options"><input type="radio" name="platform" id="steam"/>Steam</label>
                <label htmlFor="ps" className="switch-options"><input type="radio" name="platform" id="ps"/>PS5</label>
                <label htmlFor="xbox" className="switch-options"><input type="radio" name="platform" id="xbox"/>Xbox</label>
                <label htmlFor="switch" className="switch-options"><input type="radio" name="platform" id="switch"/>Switch</label>
                <label htmlFor="mobile" className="switch-options"><input type="radio" name="platform" id="mobile"/>Мобильные</label>
            </div>

            <input type="text" placeholder="Поиск игры..." className="search-bar"/>

            <button>Корзина</button>

            <button>Товары</button>

            <div className="switch-block">
                <label htmlFor="light" className="switch-options"><input type="radio" name="theme" id="light"/>🌞</label>
                <label htmlFor="dark" className="switch-options"><input type="radio" name="theme" id="dark"/>🌑</label>
            </div>
        </div>

    </div>
}

export default StorePage;