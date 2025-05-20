import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Navbar from '../components/Navbar';

// Dummy Page Components for Routing
import Home from './Home';
import {OwasRoutes} from './evaluation-pages/owas/Owas';
import About from './About';
import UserPage from './UserPage';
import {OwasProvider} from "../context/OwasContext";
import OwasReportPage from "./evaluation-pages/owas/OwasReportPage";
import Login from "./Login";
import {MainProvider} from "../context/MainContext";

const MainPage = () => {

    return (
        <MainProvider>
            <Router>
                <Navbar/>
                <div className="content">
                    <Routes>
                        <Route path="/" element={<Home/>}/>

                        <Route path="/signin" element={<Login/>}/>

                        <Route path="/home" element={<Home/>}/>

                        <Route path="/evaluations">
                            <Route path="owas/*" element={<OwasProvider><OwasRoutes/></OwasProvider>}/>
                        </Route>

                        <Route path="/about" element={<About/>}/>

                        <Route path="/user">
                            <Route path="profile/*" element={<UserPage tab={"profile"}/>}/>
                            <Route path="history/*" element={<UserPage tab={"history"}/>}/>
                            <Route path="history/evaluation-owas" element={<OwasReportPage/>}/>
                        </Route>
                    </Routes>
                </div>
            </Router>
        </MainProvider>
    );
};

export default MainPage;

