import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";

import StoreContext from "./utils/context";

import Header from "./components/layout/Header";
import Main from "./components/layout/Main";
import Footer from "./components/layout/Footer";

import StorePage from "./components/pages/StorePage";

const App = () => {
    
    return <HashRouter>
        <Header />
        <StoreContext>
            <Main>
                <Routes>
                    <Route path="/" element={<StorePage />}/>
                </Routes>
            </Main>
        </StoreContext>
        <Footer />
    </HashRouter>
}

export default App;