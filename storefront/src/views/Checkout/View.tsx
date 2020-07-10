import * as React from "react";

import { MetaWrapper } from "../../components";
import Page from "./Page";


const View: React.FC = () => {
    return(
        <MetaWrapper
            meta={{
                description: "Оформление заказа",
                title: "Оформление заказа",
            }}
        >
                <Page/>
        </MetaWrapper>
    );
};

export default View;