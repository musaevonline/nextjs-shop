import React from "react";
import _ from 'lodash';
import {Container} from "@material-ui/core";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import {Link} from "react-router-dom";
import {baseUrl, blogPath, getBlogCategoryUrl} from "@temp/app/routes";
import {BlogArticle_blogArticle} from "@sdk/queries/types/BlogArticle";
import {makeStyles} from "@material-ui/core/styles";
import {Skeleton} from "@material-ui/lab";
import Typography from "@material-ui/core/Typography";
import {dateToShortString} from "@temp/core/utils";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import ThumbUpOutlinedIcon from "@material-ui/icons/ThumbUpOutlined";
import ThumbDownAltOutlinedIcon from "@material-ui/icons/ThumbDownAltOutlined";
import Divider from "@material-ui/core/Divider";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import DOMPurify from 'dompurify';

const useStyles = makeStyles(theme => ({
  header: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    paddingBottom: 35,
    '& h4': {
      color: "#282828",
      fontWeight: 600,
      marginBottom: 6,
      padding: "14px 18.5px"
    },
    '& h5': {
      color: "#282828",
    }
  },
  mainImg: {
    textAlign: "center",
    position: "relative",
    '& img': {
      maxWidth: "100%",
      maxHeight: 500,
      width: "100%",
      objectFit: "cover"
    },
    '&:hover $icons': {
      opacity: 1
    }
  },
  additionalInfo:{
    display: "flex",
    margin: "10px 0",
    color: "#656969",
    '& span': {
      padding: "0 5px",
      '&:not(:last-of-type)': {
        borderRight: '1px solid #656969'
      }
    }
  },
  body: {
    '& img': {
      maxWidth: "100%"
    }
  },
  icons: {
    opacity: 0,
    position: "absolute",
    marginTop: 6,
    display: "flex",
    flexDirection: "column",
    width: 28,
    right: 15,
    top: 0,
    transition: "opacity .3s ease",
    [theme.breakpoints.down('sm')]: {
      position: 'relative',
      opacity: 1,
      flexDirection: "row",
      width: "100%",
      marginRight: 6,
      justifyContent: "flex-end",
      right: 0

    }
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
      width: 14
    },
    [theme.breakpoints.down('sm')]: {
      marginRight: 6,
      '&:last-of-type': {
        marginRight: 0
      },
      '& svg': {
        width: 24
      },
    },
    '&[data-active=true]':{
      color: "#F97B62"
    }
  },
}));

const BlogArticleSkeleton:React.FC = () => {
  const classes = useStyles();

  return(
      <Container maxWidth="lg" disableGutters>
        <>
          <div className={classes.header}>
            <Skeleton variant="text" width="70%"/>
            <Skeleton variant="text" width="60%"/>
          </div>
          <div className={classes.mainImg}>
            <Skeleton variant="rect" height={500}/>
          </div>
          <div className={classes.additionalInfo}>
            <Skeleton variant="text" width={100}/>
          </div>
          <div>
            {_.range(10).map(i => <Skeleton key={i} variant="text" width={`${_.random(30, 90)}%`}/>)
            }
          </div>
        </>
      </Container>
  )
};

interface IProps {
  article: BlogArticle_blogArticle | null;
  loading: boolean;
}

const BlogArticlePage:React.FC<IProps> = ({article, loading}) => {
  const classes = useStyles();

  return(
      <Container maxWidth="xl">
        {article &&
        <div className="my-20">
          <Breadcrumbs separator="›" aria-label="breadcrumb">
            <Link color="inherit" to={baseUrl}>
              Главная
            </Link>
            <Link color="inherit" to={blogPath}>
              Блог
            </Link>
            <Link color="inherit" to={getBlogCategoryUrl(article.category.slug)}>
              {article.category.name}
            </Link>
            <span>{article.title}</span>
          </Breadcrumbs>
        </div>
        }
        <Card>
          <CardContent>
            <Container maxWidth="lg" disableGutters>
              {!article && loading && <BlogArticleSkeleton/>}
              {article &&
              <>
                <div className={classes.header}>
                  <Typography variant="h4">
                    {article.title}
                  </Typography>
                  <Typography variant="h6">
                    {article.subtitle}
                  </Typography>
                </div>
                <div className={classes.additionalInfo}>
                  <span>{dateToShortString(article.dateAdded)}</span>
                  <span>{article.authorName}</span>
                  <span>{article.category.name}</span>
                </div>
                <div className={classes.mainImg}>
                  <img src={article.thumbnail?.url} alt={article.title}/>
                  <div className={classes.icons}>
                    <Tooltip title="More like this" enterDelay={300}>
                      <IconButton size="small"
                                  className={classes.icon}
                                  onClick={e => {
                                    console.log('update measure like')
                                  }}
                                  data-active={false}
                      >
                        <ThumbUpOutlinedIcon/>
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Less like this" enterDelay={300}>
                      <IconButton size="small"
                                  className={classes.icon}
                                  onClick={e => {
                                    console.log('update measure like')
                                  }}
                                  data-active={false}
                      >
                        <ThumbDownAltOutlinedIcon/>
                      </IconButton>
                    </Tooltip>
                  </div>
                </div>
              </>
              }
            </Container>
            <div className="mt-20"/>
            <Divider/>
            <div className="mt-20"/>
            {article &&
            <Container maxWidth="lg">
              <Typography variant="h6" align="center" paragraph>Описание</Typography>
              <div className={classes.body}>
                <span dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(article.body)}}/>
              </div>
            </Container>
            }
          </CardContent>
        </Card>
      </Container>
  )
};

export default BlogArticlePage