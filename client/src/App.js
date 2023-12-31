import React, { useState } from "react";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { Container } from '@material-ui/core';

import NavBar from './components/NavBar/NavBar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import PostDetails from "./components/PostDetails/PostDetails";

const App = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    return (
        <BrowserRouter>
            <Container maxwidth="xl">
                <NavBar />
                <Routes>
                    <Route path="/" exact element={<Navigate replace to="/posts" /> } />
                    <Route path="/posts" exact element={<Home />} />
                    <Route path="/posts/search" exact element={<Home />} />
                    <Route path="/posts/:id" element={<PostDetails />}/>
                    <Route path="/auth" exact element={ (user?.result ? <Navigate replace to="/posts" /> : <Auth />)} />
                </Routes>
            </Container>
        </BrowserRouter>
    )
}

export default App;
