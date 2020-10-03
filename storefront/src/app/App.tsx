import "../globalStyles/scss/index.scss";
import './editor-styles';

import React from "react";
import { RouteComponentProps } from "react-router";

import { Routes } from "./routes";
import {Header} from "@temp/components/Header";
import {Footer} from "@temp/components/Footer";
import {ScrollTopButton} from "@temp/components/ScrollTopButton";
import ScrollToTop from "@temp/components/ScrollToTop/ScrollToTop";

const App: React.FC<RouteComponentProps> = ({history: {location: { pathname }}}) => {

    return (
        <>
            <ScrollToTop/>
            <header className="header"><Header/></header>
            <Routes />
            <ScrollTopButton/>
            <Footer/>
        </>
    );
};

export default App;