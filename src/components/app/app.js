import React from 'react';
import {MainPage, AddTodo, Registration} from '../pages';
import AppHeader from '../app-header';
import {BrowserRouter, Routes, Route} from "react-router-dom";


const App = () => {
    if (!localStorage.getItem("idToken") && !localStorage.getItem("timeSessionLeft") > 0) {
        return <Registration/>
    }
    return (
        <BrowserRouter>
            <div className="app">
                <AppHeader/>
                <Routes>
                    <Route path="/" element={<MainPage/>} />
                    <Route path="/add_note" element={<AddTodo/>} />
                    <Route path="/registration" element={<Registration/>} />
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App;