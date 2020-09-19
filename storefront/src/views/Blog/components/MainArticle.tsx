import React from "react";
import {Link} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import ThumbUpOutlinedIcon from "@material-ui/icons/ThumbUpOutlined";
import ThumbDownAltOutlinedIcon from "@material-ui/icons/ThumbDownAltOutlined";
import Skeleton from "@material-ui/lab/Skeleton";
import {getBlogArticleUrl} from "@temp/app/routes";
import {makeStyles} from "@material-ui/core/styles";
import {BlogArticleList_blogArticleList_edges_node} from "@sdk/queries/types/BlogArticleList";

const useStyles = makeStyles(theme => ({
    root: {
        position: "relative",
        '& a':{
            textDecoration: "none"
        },
        "&:hover $title":{
            textDecoration: "underline",
            color: "#020c6d"
        },
        "&:hover $icons": {
            opacity: 1
        }
    },
    image: {
        maxWidth: "100%",
        objectFit: "cover",
        height: 400,
        width: "100%",
        [theme.breakpoints.down('xs')]: {
            height: 250
        }
    },
    title: {
        padding: "18px 0 12px 0"
    },
    body:{
        paddingBottom: 24,
        fontSize: 16,
        lineHeight: "20px"
    },
    author: {
        color: "#656969"
    },
    icons: {
        opacity: 0,
        position: "absolute",
        marginTop: 6,
        display: "flex",
        flexDirection: "column",
        width: 28,
        right: 20,
        top: 10,
        transition: "opacity .3s ease",
    },
    icon: {
        marginBottom: 6,
        border: "1px solid #DCDEDD",
        backgroundColor: "#fff",
        transition: "transform .1s ease",
        "&:hover":{
            backgroundColor: "#fff",
            transform: "scale(1.05)"
        },
        '& svg': {
            width: 14,
            height: 14
        },
        '&[data-active=true]':{
            color: "#F97B62"
        }
    },

}));

interface IProps {
    article: BlogArticleList_blogArticleList_edges_node | null,
    loading: boolean;
}

const MainArticleCard: React.FC<IProps> = ({article, loading}) => {
    const classes = useStyles();
    const categorySlug = article?.category.slug;

    return (
        <div className={classes.root}>
            {!article && loading &&
            <>
                <Skeleton className={classes.image} variant="rect"/>
                <Skeleton variant="text" width="60%"/>
                <Skeleton variant="text" width="30%"/>
            </>
            }
            {article &&
            <>
                <Link to={getBlogArticleUrl(categorySlug, article.slug)}>
                    <div>
                        <img className={classes.image} src={article.thumbnail?.url} alt={article.title}/>
                    </div>
                    <div>
                        <Typography className={classes.title} variant="h5">{article.title}</Typography>
                    </div>
                    <div className={classes.body}>{article.subtitle}</div>
                    <div className={classes.author}>By {article.authorName}</div>
                </Link>
                <div className={classes.icons}>
                    <Tooltip title="More like this" enterDelay={300}>
                        <IconButton size="small"
                                    className={classes.icon}
                                    onClick={e => {console.log('update measure like')}}
                                    data-active={false}
                        >
                            <ThumbUpOutlinedIcon/>
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Less like this" enterDelay={300}>
                        <IconButton size="small"
                                    className={classes.icon}
                                    onClick={e => {console.log('update measure dislike')}}
                                    data-active={false}
                        >
                            <ThumbDownAltOutlinedIcon/>
                        </IconButton>
                    </Tooltip>
                </div>
            </>
            }
        </div>
    )
};

export default MainArticleCard;
