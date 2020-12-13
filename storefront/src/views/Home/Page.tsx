import "./scss/index.scss";

import React from "react";
import _ from 'lodash';

import { homeStructuredData } from "../../core/SEO/homeStructuredData";
import {Container} from "@material-ui/core";
import {HomeCarousel} from "@temp/components/HomeCarousel";
import {NewsCarousel} from "@temp/components/NewsCarousel";
import {ProductCard} from "@temp/components/ProductCard";
import Typography from "@material-ui/core/Typography";
import {ProductsCardDetails_products} from "@sdk/queries/types/ProductsCardDetails";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import {BlogArticleList_blogArticleList_edges} from "@sdk/queries/types/BlogArticleList";
import {IArticleCard} from "@temp/components/ArticleCard/ArticleCard";
import {dateToShortString} from "@temp/core/utils";
import {Skeleton} from "@material-ui/lab";
import {ShopInfo_shop} from "@sdk/queries/types/ShopInfo";
import {logoStructuredData} from "@temp/core/SEO/logoStructuredData";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';

SwiperCore.use([Navigation]);

const breakPoints = {
    0: {
        slidesPerView: 1,
        slidesPerGroup: 1
    },
    500: {
        slidesPerView: 2,
        slidesPerGroup: 1
    },
    1024: {
        slidesPerView: 4,
        slidesPerGroup: 1
    },
    1376: {
        slidesPerView: 5,
        slidesPerGroup: 1
    }
}

const CarouselSkeleton: React.FC = () => {
    const items = _.fill(new Array(5), 1);

    return(
        <Swiper spaceBetween={10}
                slidesPerView={1}
                navigation
                breakpoints={breakPoints}
        >
            {items.map((item, i) =>
                <SwiperSlide key={i}>
                    <div className="w-full">
                        <Skeleton variant="rect" height={250}/>
                        <Skeleton variant="text" width="40%"/>
                        <Skeleton variant="text" width="60%"/>
                        <Skeleton variant="rect" width="100%" height={25} className="my-15"/>
                        <Skeleton variant="text" width="25%"/>
                    </div>
                </SwiperSlide>
            )}
        </Swiper>
    )
};

const Page: React.FC<{
    loading: boolean;
    shop: ShopInfo_shop,
    newProducts: ProductsCardDetails_products,
    popularProducts: ProductsCardDetails_products,
    articlesEdges: BlogArticleList_blogArticleList_edges[],
    articlesLoading: boolean;

}> = ({
          loading, shop, newProducts,
          popularProducts, articlesEdges, articlesLoading
      }) => {
    const news: IArticleCard[] = articlesEdges?.map(edge => ({
        id: edge.node.id,
        categorySlug: edge.node.category.slug,
        articleSlug: edge.node.slug,
        title: edge.node.title,
        text: edge.node.body,
        created: dateToShortString(edge.node.dateAdded),
        img: edge.node.thumbnail.url,
        subtitle: edge.node.subtitle,
        status: edge.node.status,
        keywords: edge.node.keywords,
        tags: edge.node.tags
    })) || [];

    return (
        <div className="home-page">
            <script className="structured-data-list" type="application/ld+json">
                {shop ? homeStructuredData(shop) : ''}
            </script>
            <script className="structured-data-list" type="application/ld+json">
                {logoStructuredData()}
            </script>
            <div className="bg-white mt-20">
                <Container maxWidth="lg" disableGutters>
                    <HomeCarousel images={shop?.images}/>
                </Container>
            </div>
            <Container maxWidth="lg">

                <Card className="my-20">
                    <CardContent>
                        <Typography variant="h3" className="pt-20 pb-10 text-center">Новинки</Typography>
                        <div className="separator max-w-300"/>
                        {newProducts?.edges.length > 0 &&
                        <div className="swiper-products">
                            <Swiper spaceBetween={0}
                                    slidesPerView={1}
                                    navigation
                                    breakpoints={breakPoints}
                            >
                                {newProducts.edges.map((edge, i) => {
                                    return(
                                        <SwiperSlide key={i}>
                                            <ProductCard key={i} item={edge.node}/>
                                        </SwiperSlide>
                                    )}
                                )}
                            </Swiper>
                        </div>
                        }
                        {!newProducts?.edges.length &&
                        <CarouselSkeleton/>
                        }
                    </CardContent>
                </Card>
                <Card className="my-20">
                    <CardContent>
                        <Typography variant="h3" className="pt-20 pb-10 text-center">Лучшие предложения</Typography>
                        <div className="separator max-w-500"/>
                        {popularProducts?.edges.length > 0 &&
                        <div className="swiper-products">
                            <Swiper spaceBetween={0}
                                    slidesPerView={1}
                                    navigation
                                    breakpoints={breakPoints}
                            >
                                {popularProducts.edges.map((edge, i) => {
                                    return(
                                        <SwiperSlide key={i}>
                                            <ProductCard key={i} item={edge.node}/>
                                        </SwiperSlide>
                                    )}
                                )}
                            </Swiper>
                        </div>
                        }
                        {!popularProducts?.edges.length &&
                        <CarouselSkeleton/>
                        }
                    </CardContent>
                </Card>
                {(articlesLoading || !!news.length) &&
                <Card className="my-20">
                    <CardContent>
                        <Typography variant="h3" className="pt-20 pb-5 text-center">Новости</Typography>
                        <div className="separator max-w-300"/>
                        {!!news.length &&
                        <NewsCarousel news={news}/>
                        }
                        {!news.length &&
                        <CarouselSkeleton/>
                        }
                    </CardContent>
                </Card>
                }
            </Container>
        </div>
    );
};

export default Page;