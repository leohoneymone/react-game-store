import React from "react";

import StoreContext from "./utils/context";

import Header from "./components/layout/Header";
import Main from "./components/layout/Main";
import Footer from "./components/layout/Footer";

const App = () => {
    
    return <>
        <Header />
        <StoreContext>
            <Main />
        </StoreContext>
        <Footer />
    </>
}

export default App;