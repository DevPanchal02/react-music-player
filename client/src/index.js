import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Homepage from './components/Homepage/Index';
import Signup from './components/Sign-Up';
import Login from './components/Log-In/index';
import UpdatePassword from './components/UpdatePassword/index';
import Mainpage from './components/Main/index';
import {Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
    <Routes>
        <Route path="/" exact element={<Homepage />}></Route>
        <Route path="/main" exact element ={<Mainpage />}></Route>
        <Route path= "/signup" exact element ={<Signup />}></Route>
        <Route path='/signin' exact element = {<Login />}></Route>
        <Route path='/update-password' exact element = {<UpdatePassword />}></Route> 
        <Route path= "/" exact element = {<Navigate replace to = "/signin" />}></Route>
    </Routes>
    </BrowserRouter>
    
);
