import "./scss/index.scss";

import React from 'react';
import SwipeableViews from 'react-swipeable-views';
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
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index: number) => {
        setValue(index);
    };

    return(
        <div className="product-tabs">
            <Card>
                <CardContent>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        aria-label="product-tabs"
                    >
                        <Tab label="Описание" {...a11yProps(0)} />
                        <Tab label="Характеристики" {...a11yProps(1)} />
                        <Tab label="Отзывы" {...a11yProps(2)} />
                    </Tabs>
                    <SwipeableViews
                        axis='x'
                        index={value}
                        onChangeIndex={handleChangeIndex}
                    >
                        <TabPanel value={value} index={0} dir={theme.direction}>
                            <Card>
                                <CardContent>
                                    <div className="product-tabs__description text-small"
                                         dangerouslySetInnerHTML={{__html: product.description}}
                                    />
                                </CardContent>
                            </Card>
                        </TabPanel>
                        <TabPanel value={value} index={1} dir={theme.direction}>
                            <Card>
                                <CardContent>
                                    <Grid container spacing={3}>
                                        {product.attributes.map(attr => {
                                            return(
                                                <Grid key={attr.attribute.id} item xs={12} sm={6}>
                                                    <div className="flex justify-between">
                                                        <div className="font-medium">{attr.attribute.name}:</div>
                                                        <div>{attr.values[0]?.name}</div>
                                                    </div>
                                                </Grid>

                                            )
                                        })}
                                    </Grid>
                                </CardContent>
                            </Card>
                        </TabPanel>
                        <TabPanel value={value} index={2} dir={theme.direction}>
                            <Card>
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
                            </Card>
                        </TabPanel>
                    </SwipeableViews>
                </CardContent>
            </Card>
        </div>
    );
};

export default ProductTabs;