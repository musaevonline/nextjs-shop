import React from "react";
import {MetaWrapper} from "@temp/components";
import Page from "@temp/views/Page/Page";
import {usePage} from "@sdk/queries/page";
import {useParams} from "react-router";

const View:React.FC = () => {
    const {slug} = useParams();
    const {data: pageData, loading: pageLoading} = usePage({
        variables: {
            slug
        }
    });
    return(
        <MetaWrapper meta={{}}>
            <Page page={pageData?.page} loading={pageLoading}/>
        </MetaWrapper>
    )
};

export default View;