import React from 'react';
import {Route, Routes} from "react-router-dom";
import Home from "../pages/home";

import "./index.scss"

const App = () => {
    return (
        <main>
            <Routes>
                <Route path="/" element={<Home />}/>
            </Routes>
        </main>
    );
};

export default App;