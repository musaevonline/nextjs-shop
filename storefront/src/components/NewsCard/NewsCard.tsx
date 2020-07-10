import './scss/index.scss';

import React from "react";
import {Link} from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import ArrowForwardOutlinedIcon from '@material-ui/icons/ArrowForwardOutlined';
import {Typography} from "@material-ui/core";

export interface INews {
    id: string | number,
    created: string,
    img: string,
    title: string,
    text: string
}

interface NewsCardProps {
    news: INews
}

const NewsCard:React.FC<NewsCardProps> = ({news}) =>{
    const {id, created, img, text, title} = news;

    return(
        <div className="news-card">
            <div className="news-card__created">
                <span>{created}</span>
            </div>
            <div className="news-card__img">
                <img src={img} alt="Описание статьи"/>
            </div>
            <div className="news-card__title">
                <Link to={`/news/${id}`}>
                    <Typography variant="h6">{title}</Typography>
                </Link>
            </div>
            <div className="news-card__text">
                <Typography variant="body1">{text}</Typography>
                <Link to={`/news/${id}`}>
                    <IconButton title="Читать далее">
                        <ArrowForwardOutlinedIcon fontSize="small"/>
                    </IconButton>
                </Link>
            </div>
        </div>
    );
};

export default NewsCard;