import React from "react";
import {Container, Grid} from "@material-ui/core";
import {BlogArticleList_blogArticleList} from "@sdk/queries/types/BlogArticleList";
import {ArticleCard} from "@temp/components/ArticleCard";
import {IArticleCard} from "@temp/components/ArticleCard/ArticleCard";
import {dateToShortString} from "@temp/core/utils";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import {Link} from "react-router-dom";
import {baseUrl, blogPath} from "@temp/app/routes";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

interface IProps {
    articles: BlogArticleList_blogArticleList;
    categoryName: string;
    loading: boolean;
}

const BlogCategoryPage:React.FC<IProps> = ({articles, categoryName, loading}) => {
    if (loading && !articles) return null;

    return(
        <Container maxWidth="lg">
            <div className="my-20">
                <Breadcrumbs separator="/" aria-label="breadcrumb">
                    <Link color="inherit" to={baseUrl}>
                        Главная
                    </Link>
                    <Link color="inherit" to={blogPath}>
                        Блог
                    </Link>
                    <span>{categoryName}</span>
                </Breadcrumbs>
            </div>
            <Card>
                <CardContent>
                    <Grid container spacing={1}>
                        {articles?.edges.map((edge, i) => {
                            const node = edge.node;
                            const article: IArticleCard = {
                                articleSlug: node.slug,
                                id: node.id,
                                categorySlug: node.category.slug,
                                created: dateToShortString(node.dateAdded),
                                img: node.thumbnail?.url,
                                keywords: node.keywords,
                                status: node.status,
                                subtitle: node.subtitle,
                                tags: node.tags,
                                text: node.body,
                                title: node.title
                            }
                            return(
                                <Grid item key={i} xs={12} sm={6} md={4} lg={3} xl={2}>
                                    <ArticleCard article={article} />
                                </Grid>
                            )
                        })}
                        {articles?.edges.length === 0 &&
                        <Grid item xs={12}>
                            <Typography variant="h5">Список пуст</Typography>
                        </Grid>
                        }
                    </Grid>
                </CardContent>
            </Card>


        </Container>
    )
};

export default BlogCategoryPage