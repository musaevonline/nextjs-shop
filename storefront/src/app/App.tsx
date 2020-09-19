import "../globalStyles/scss/index.scss";

import React from "react";
import { RouteComponentProps } from "react-router";

import { Routes } from "./routes";
import {Header} from "@temp/components/Header";
import {Footer} from "@temp/components/Footer";
import {ScrollTopButton} from "@temp/components/ScrollTopButton";
import ScrollToTop from "@temp/components/ScrollToTop/ScrollToTop";
// import {Scrollbars} from 'react-custom-scrollbars';

const App: React.FC<RouteComponentProps> = ({history: {location: { pathname }}}) => {

    return (
        <>
            {/*<Scrollbars autoHide*/}
            {/*            autoHideTimeout={1000}*/}
            {/*            autoHideDuration={200}>*/}
            <ScrollToTop/>
            <header className="header"><Header/></header>
            <Routes />
            <ScrollTopButton/>
            <Footer/>
            {/*</Scrollbars>*/}
        </>
    );
};

export default App;