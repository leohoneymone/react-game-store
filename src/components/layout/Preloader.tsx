import React from "react";

import Logo from "../layout/Logo";

const Preloader = () => {
    return <div className="preloader">
        <Logo />
        <h2>Загрузка...</h2>
    </div>  
}

export default Preloader;