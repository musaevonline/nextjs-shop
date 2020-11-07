import "./scss/index.scss";

import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {ProductReview} from "@temp/components/ProductReview";
import {CardContent} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import TabPanel from "../TabPanel";
import {ProductDetails_product} from "@sdk/queries/types/ProductDetails";
import Grid from "@material-ui/core/Grid";
import {ProductReviews_productReviews} from "@sdk/queries/types/ProductReviews";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import DOMPurify from 'dompurify';
import {useQueryParams, NumberParam} from "use-query-params";
import {getProductVariantsAttributes} from "@temp/views/ProductDetails/utils";
import Typography from "@material-ui/core/Typography";


function a11yProps(index: any) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}



const ProductTabs:React.FC<{
    product: ProductDetails_product,
    reviews: ProductReviews_productReviews | null,
    reviewsLoading: boolean,
    loadMoreReviews():void
}> = ({ product, reviews, reviewsLoading, loadMoreReviews }) =>{
    const theme = useTheme();
    const [query, setQuery] = useQueryParams({tab: NumberParam});

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setQuery({...query, tab: newValue});
    };
    const tab = query.tab || 0;
    const attrs = getProductVariantsAttributes(product);
    return(
        <div className="product-tabs">
            <Card>
                <CardContent>
                    <Tabs
                        value={tab}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        aria-label="product-tabs"
                    >
                        <Tab label="Описание" {...a11yProps(0)} />
                        <Tab label="Характеристики" {...a11yProps(1)} />
                        <Tab label={`Отзывы ${reviews?.edges.length || ''}`} {...a11yProps(2)} />
                    </Tabs>
                    <Paper elevation={0}>
                        <TabPanel value={tab} index={0} dir={theme.direction}>
                            <CardContent>
                                <div className="product-tabs__description text-small"
                                     dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(product.description)}}
                                />
                            </CardContent>
                        </TabPanel>
                        <TabPanel value={tab} index={1} dir={theme.direction}>
                            <CardContent>
                                <Grid container spacing={3}>
                                    {product.attributes.map(attr => {
                                        return(
                                            <Grid key={attr.attribute.id} item xs={12} sm={6}>
                                                <div className="flex justify-between">
                                                    <Typography variant="h6"><strong>{attr.attribute.name}:</strong></Typography>
                                                    <ul className="text-right m-0">
                                                        {attr.values.map(val =>
                                                            <Typography key={val.id}
                                                                        variant="body1"
                                                                        component="li"
                                                                        className="font-medium list-none">
                                                                {val.name}
                                                            </Typography>
                                                        )}
                                                    </ul>
                                                </div>
                                            </Grid>

                                        )
                                    })}
                                    {attrs.map(attr => {
                                        return(
                                            <Grid key={attr.id} item xs={12} sm={6}>
                                                <div className="flex justify-between">
                                                    <Typography variant="h6"><strong>{attr.name}:</strong></Typography>
                                                    <ul className="text-right m-0">
                                                        {attr.values.map(val =>
                                                            <Typography key={val.id}
                                                                        variant="body1"
                                                                        component="li"
                                                                        className="font-medium list-none">
                                                                {val.name}
                                                            </Typography>
                                                        )}
                                                    </ul>
                                                </div>
                                            </Grid>

                                        )
                                    })}
                                </Grid>
                            </CardContent>
                        </TabPanel>
                        <TabPanel value={tab} index={2} dir={theme.direction}>
                            <CardContent>
                                {reviews &&
                                <div className="text-small">
                                    {reviews.edges.map((edge, i) => <ProductReview key={i}
                                                                                   review={edge.node}/>)}
                                    {reviews.edges.length === 0 && <div>Пока нет</div>}
                                    {reviews.pageInfo.hasNextPage &&
                                    <div className="my-10">
                                        <Button size="small"
                                                disabled={reviewsLoading}
                                                onClick={e => loadMoreReviews()}>Еще</Button>
                                    </div>
                                    }
                                </div>
                                }
                            </CardContent>
                        </TabPanel>
                    </Paper>
                </CardContent>
            </Card>
        </div>
    );
};

export default ProductTabs;