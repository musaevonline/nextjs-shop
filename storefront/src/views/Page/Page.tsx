import React from "react";
import {Container} from "@material-ui/core";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import {Link} from "react-router-dom";
import {baseUrl} from "@temp/app/routes";
import {Page_page} from "@sdk/queries/types/Page";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import DOMPurify from 'dompurify';

const Page:React.FC<{
    page: Page_page | null;
    loading: boolean;
}> = ({loading, page}) => {

    return(
        <div>
            <Container maxWidth="lg">
                <div className="mt-20 mb-10">
                    <Breadcrumbs separator="/" aria-label="breadcrumb">
                        <Link color="inherit" to={baseUrl}>
                            Главная
                        </Link>
                        <span>{page?.title}</span>
                    </Breadcrumbs>
                </div>
                <Card>
                    <CardContent>
                        {page &&
                        <div className="ck-content" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(page.content)}}/>
                        }
                    </CardContent>

                </Card>
            </Container>
        </div>
    )
};

export default Page;