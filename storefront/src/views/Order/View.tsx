import React from "react";
import {MetaWrapper} from "@temp/components";
import Page from "@temp/views/Order/Page";
import {useOrder} from "@sdk/queries/order";
import {getDBIdFromGraphqlId} from "@temp/core/utils";
import {useParams} from "react-router";

const View:React.FC = () => {
    const {token} = useParams<{token: string}>();
    const {data, loading} = useOrder({
        variables: {
            token
        }
    });
    const pk = getDBIdFromGraphqlId(data?.orderByToken?.id, "Order");
    console.log(data);
    return(
        <MetaWrapper meta={{
            title: `Заказ №${pk || ''}`
        }}>
            <Page order={data?.orderByToken} loading={loading}/>
        </MetaWrapper>
    )
};

export default View;