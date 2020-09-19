import './scss/index.scss';

import React from "react";
import {Link} from "react-router-dom";
import {Typography} from "@material-ui/core";
import {getBlogArticleUrl} from "@temp/app/routes";

export interface INews {
    id: string | number,
    subtitle: string,
    keywords: string,
    tags: string,
    status: string,
    categorySlug: string,
    articleSlug: string,
    created: string,
    img: string,
    title: string,
    text: string
}

interface NewsCardProps {
    news: INews
}

const NewsCard:React.FC<NewsCardProps> = ({news}) =>{
    const {created, img, title, articleSlug, categorySlug, subtitle} = news;

    return(
        <div className="news-card">
            <Link to={getBlogArticleUrl(categorySlug, articleSlug)}>
                <div className="news-card__img">
                    <img src={img} alt="Описание статьи"/>
                </div>
                <div className="news-card__content">
                    <div className="news-card__created">
                        <span>{created}</span>
                    </div>
                    <div className="news-card__title">
                        <Typography variant="body2">{title}</Typography>
                    </div>
                    <div className="news-card__text">
                        <Typography variant="body1">{subtitle}</Typography>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default NewsCard;