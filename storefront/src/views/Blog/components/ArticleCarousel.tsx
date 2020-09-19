import React from "react";
import Carousel from 'react-multi-carousel';
import {makeStyles} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";
import ThumbUpOutlinedIcon from "@material-ui/icons/ThumbUpOutlined";
import ThumbDownAltOutlinedIcon from "@material-ui/icons/ThumbDownAltOutlined";
import {
  BlogCategoryListWithArticles_blogCategoryList_edges_node
} from "@sdk/queries/types/BlogCategoryListWithArticles";
import {getBlogArticleUrl, getBlogCategoryUrl} from "@temp/app/routes";
import {dateToShortString} from "@temp/core/utils";

const useArrowsStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    position: "absolute",
    right: 0,
    width: 100,
    top: 10,
    '& button':{
      border: `1px solid transparent`
    },
    "& button:hover": {
      borderColor: theme.palette.secondary.main
    },
    [theme.breakpoints.down('xs')]: {
      display: "none"
    }
  },
  arrows: {
    display: "flex"
  },
  arrowLeft: {
    marginRight: 20
  },
  arrowRight: {

  }
}));

const CarouselArrows: React.FC<any> = ({ next, previous, carouselState })=>{
  const classes = useArrowsStyles();
  const hasNextSlides = (carouselState.slidesToShow + carouselState.currentSlide) < carouselState.totalItems;
  const hasPrevSlides = carouselState.currentSlide > 0;
  return(
      <div className={classes.root}>
        <div className={classes.arrows}>
          <IconButton disabled={!hasPrevSlides} className={classes.arrowLeft} color="secondary" onClick={previous}>
            <ChevronLeftIcon/>
          </IconButton>
          <IconButton disabled={!hasNextSlides} className={classes.arrowRight} color="secondary" onClick={next}>
            <ChevronRightIcon/>
          </IconButton>
        </div>
      </div>
  );

};

const useStyles = makeStyles(theme => ({
  root: {
    position: "relative",
    paddingTop: 20
  },
  carousel: {
    // backgroundColor: "red"
    '& .react-multi-carousel-track': {
      margin: '0 auto'
    }
  },
  item: {
    position: "relative",
    padding: "0 10px",
    // transition: "box-shadow .5s ease-in-out",
    // "&:hover": {
    //   "box-shadow": "0 0 20px 0 rgba(0, 0, 0, 0.35)"
    // },
    '& a': {
      textDecoration: "none"
    },
    '&:hover a': {
      textDecoration: "underline"
    },
    "&:hover $icons": {
      opacity: 1
    }
  },
  image: {
    maxWidth: "100%",
    objectFit: "cover",
    height: 160,
    width: "100%",
    marginBottom: 15
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
      width: 14,
      height: 14
    },
    [theme.breakpoints.down('sm')]: {
      marginRight: 6,
      '&:last-of-type': {
        marginRight: 0
      },
      '& svg': {
        width: 24,
        height: 24
      },
    },
    '&[data-active=true]':{
      color: "#F97B62"
    }
  },
  title: {
    margin: "20px 0",
    height: "70px",
    display: "-webkit-box",
    overflow: "hidden",
    textOverflow: "ellipsis",
    "-moz-box-orient": "vertical",
    "-moz-line-clamp": 3,
    "-webkit-box-orient": "vertical",
    "-webkit-line-clamp": 3
  },
  dateAdded: {
    color: "#656969",
    fontSize: 10
  },
  subtitle: {
    color: "#9B9E9E",
    height: 60,
    display: "-webkit-box",
    overflow: "hidden",
    fontSize: "14px",
    marginTop: "10px",
    lineHeight: "20px",
    marginBottom: "24px",
    textOverflow: "ellipsis",
    "-moz-box-orient": "vertical",
    "-moz-line-clamp": 3,
    "-webkit-box-orient": "vertical",
    "-webkit-line-clamp": 3
  },
  header:{
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    padding: "0 10px 10px 10px",
    width: "calc(100% - 100px)",
    '& h6': {
      marginRight: 10,
      fontWeight: 600,
      textTransform: "uppercase"
    },
    [theme.breakpoints.down('xs')]: {
      flexDirection: "column",
      alignItems: "flex-start",
      width: "100%",
    }
  }
}));

interface IArticleCarouselProps {
  category: BlogCategoryListWithArticles_blogCategoryList_edges_node
}

const ArticleCarousel:React.FC<IArticleCarouselProps> = ({category}) => {
  const classes = useStyles();
  const mobileMatches = useMediaQuery('(max-width:600px)');
  const responsive = {
    large:{
      breakpoint: { max: 3000, min: 1376 },
      items: 5,
      slidesToSlide: 5
    },
    desktop: {
      breakpoint: { max: 1376, min: 1024 },
      items: 4,
      slidesToSlide: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 500 },
      items: 2,
      slidesToSlide: 2
    },
    mobile: {
      breakpoint: { max: 500, min: 0 },
      items: 1,
      slidesToSlide: 1
    }
  };

  const edges = category.articles.edges;
  return(
      <div className={classes.root}>
        <div className={classes.header}>
          <Typography variant="h6">{category.name}</Typography>
          <Link to={getBlogCategoryUrl(category.slug)}>Discover more {'>'}</Link>
        </div>
        <Carousel responsive={responsive}
                  className={classes.carousel}
                  renderButtonGroupOutside={true}
                  customButtonGroup={<CarouselArrows />}
                  customTransition="transform 300ms ease-in-out"
                  transitionDuration={500}
                  containerClass="carousel-container"
                  arrows={false}
                  showDots={mobileMatches}
                  draggable={false}
                  partialVisible={true}
        >
          {edges.map((edge, i) => {
            const article = edge.node;

            return(
                <div key={i} className={classes.item}>
                  <Link to={getBlogArticleUrl(category.slug, article.slug)}>
                    <img className={classes.image} src={article.thumbnail?.url} alt={article.title}/>
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
                                  onClick={e => {console.log('update measure like')}}
                                  data-active={false}
                      >
                        <ThumbDownAltOutlinedIcon/>
                      </IconButton>
                    </Tooltip>
                  </div>

                  <Link to={getBlogArticleUrl(category.slug, article.slug)}>
                    <Typography variant="body2" className={classes.title} paragraph>{article.title}</Typography>
                  </Link>
                  <div className={classes.dateAdded}>{dateToShortString(article.dateAdded)}</div>
                  <Typography variant="body1" className={classes.subtitle} paragraph>{article.subtitle}</Typography>
                  <Typography className={classes.author} variant="caption">By {article.authorName}</Typography>

                </div>
            )
          })}
        </Carousel>
      </div>
  )
};

export default ArticleCarousel;
