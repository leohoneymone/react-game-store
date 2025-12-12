import React from "react";

// Логотип
const Logo = () => {
    return <svg width="75" height="75" xmlns="http://www.w3.org/2000/svg">
        <g className="svg-logo-color">
            <path xmlns="http://www.w3.org/2000/svg" transform="rotate(-180 37.5 40.6548)" strokeWidth="5" id="svg_3" d="m8.75,67.20238l28.75,-53.09523l28.75,53.09523l-57.5,0z" fill="none"/>
            <path xmlns="http://www.w3.org/2000/svg" id="svg_5" d="m16.96429,46.17687l20.53571,-39.88095l20.53571,39.88095l-41.07143,0z" strokeWidth="5" fill="none"/>
            <ellipse xmlns="http://www.w3.org/2000/svg" ry="5.41667" rx="5.41667" id="svg_8" cy="33.09524" cx="37.5" strokeWidth="5" fill="none"/>
        </g>
    </svg>
}

const Header = () => {
    return <header>
            <div className="background"></div>
            <div className="header-container">
                <div className="header-content">
                    <h1>CLD GAMES</h1>
                    <a href="#"><Logo /></a>
                    <div className="header-description">
                        <h2>Pet-project Store</h2>
                        <p>Powered by React + TS</p>
                    </div>
                </div>
            </div>
    </header>
}

export default Header;