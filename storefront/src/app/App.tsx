import "../globalStyles/scss/index.scss";
import './editor-styles';

import React from "react";
import { RouteComponentProps } from "react-router";

import { Routes } from "./routes";
import {Header} from "@temp/components/Header";
import {Footer} from "@temp/components/Footer";
import {ScrollTopButton} from "@temp/components/ScrollTopButton";
import ScrollToTop from "@temp/components/ScrollToTop/ScrollToTop";
import { StickyContainer } from 'react-sticky';

const App: React.FC<RouteComponentProps> = ({history: {location: { pathname }}}) => {

    return (
        <>
            <ScrollToTop/>
            <StickyContainer>
                <header className="header"><Header /></header>
                <main className="main">
                    <Routes />
                </main>
                <ScrollTopButton/>
                <Footer/>
            </StickyContainer>
        </>
    );
};

export default App;