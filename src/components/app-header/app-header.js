import React from 'react';
import {Link} from "react-router-dom";

import './app-header.scss';

import exitPic from "./exit_pic.svg";


const AppHeader = () => {
    function exitFromApp() {
        localStorage.clear()
        window.location.reload()
    }
    return (
        <header className="header">
            <Link className="header__link" to="/">
                DegrodApp
            </Link>
            <Link className="header__link_exit" to="/" onClick={exitFromApp}>
                <img src={exitPic} alt="exit"/>
                <p>Exit</p>
            </Link>
        </header>
    )
};

export default AppHeader;