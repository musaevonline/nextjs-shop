import React from "react";
import {UserReviews_me_reviews} from "@sdk/queries/types/UserReviews";
import Loader from "@temp/components/Loader";
import {Typography} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import InfiniteScroll from 'react-infinite-scroller';
import Grid from "@material-ui/core/Grid";
import {Link} from "react-router-dom";
import {getProductUrl} from "@temp/app/routes";
import Rating from "@material-ui/lab/Rating";

const RATING = {
    A_1: 1,
    A_2: 2,
    A_3: 3,
    A_4: 4,
    A_5: 5,
};

const Page:React.FC<{
    reviews: UserReviews_me_reviews | null,
    loading: boolean,
    loadMore(): void
}> = ({reviews, loading, loadMore}) => {

    return(
        <div>
            <div className="mb-20">
                <Typography variant="h4">Мои отзывы</Typography>
            </div>
            {!reviews && loading && <Loader/>}
            {reviews &&
            <div>
                <InfiniteScroll
                    pageStart={0}
                    loadMore={loadMore}
                    hasMore={reviews.pageInfo.hasNextPage}
                    loader={<Loader key={0}/>}
                >
                    <Grid container spacing={1}>
                        {reviews.edges.map(edge => {
                            const node = edge.node;
                            const product = node.orderLine.variant.product;
                            return(
                                <Grid key={node.id} xs={12} item>
                                    <Card className="hover:shadow-lg">
                                        <div className="flex item-center p-10">
                                            <div>
                                                <Link to={getProductUrl(product.slug, product.id)}>
                                                    <img src={node.orderLine.thumbnail.url}
                                                         alt={node.orderLine.productName}
                                                         className="max-w-64 rounded-sm border border-solid border-gray-300"
                                                    />
                                                </Link>
                                            </div>
                                            <div className="flex-1 pl-10">
                                                <div className="mb-5">
                                                    <Typography component={Link}
                                                                variant="button"
                                                                color="primary"
                                                                to={getProductUrl(product.slug, product.id)}>
                                                        {node.orderLine.productName}
                                                    </Typography>
                                                </div>
                                                <div className="text-lg font-medium mb-5">{node.title}</div>
                                                <Rating
                                                    size="small"
                                                    name="review"
                                                    disabled
                                                    value={RATING[node.rating]}
                                                />
                                                <div>{node.content}</div>
                                            </div>
                                        </div>
                                    </Card>
                                </Grid>
                            )
                        })}
                    </Grid>
                </InfiniteScroll>
            </div>
            }
        </div>
    )
};

export default Page;