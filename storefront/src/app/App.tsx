import "../globalStyles/scss/index.scss";

import React from "react";
import { RouteComponentProps } from "react-router";

import { Routes } from "./routes";
import {Header} from "@temp/components/Header";
import {Footer} from "@temp/components/Footer";
import {ScrollTopButton} from "@temp/components/ScrollTopButton";
import ScrollToTop from "@temp/components/ScrollToTop/ScrollToTop";
import { StickyContainer } from 'react-sticky';
import {Overlay, OverlayContext} from "@temp/components";

const App: React.FC<RouteComponentProps> = ({history: {location: { pathname }}}) => {
    const overlay = React.useContext(OverlayContext);
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
                <Overlay context={overlay}/>
            </StickyContainer>
        </>
    );
};

export default App;