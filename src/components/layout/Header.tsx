import React from "react";

import Logo from "./Logo";

const Header = () => {
    return <header>
            <div className="background"></div>
            <div className="header-container">
                <div className="header-content">
                    <h1>CLD GAMES</h1>
                    <a className="logo-link" href="#"><Logo /></a>
                    <div className="header-description">
                        <h2>Pet-project Store</h2>
                        <p>Powered by React + TS</p>
                    </div>
                </div>
            </div>
    </header>
}

export default Header;