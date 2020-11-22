import './scss/index.scss';

import React from "react";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {Link} from "react-router-dom";
import {getCategoryUrl} from "@temp/app/routes";
import {Categories_categories} from "@sdk/queries/types/Categories";
import {Button} from "@material-ui/core";
import {BsFillGridFill} from "react-icons/bs";
import {makeStyles} from "@material-ui/core/styles";
import {ReactSVG} from "react-svg";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import {OverlayContext, OverlayType} from "@temp/components";

const useStyles = makeStyles(theme => ({
  menuWrapper: {
    position: "absolute",
    zIndex: 999,
    top: "100%",
    left: 0,
    display: "none",
    marginTop: -8,
    borderRadius: 5,
    backgroundColor: "#fff",
    "&::before": {
      display: "inline-block",
      position: "absolute",
      top: -6,
      left: 161,
      zIndex: 1000,
      width: 0,
      height: 0,
      borderStyle: "solid",
      borderWidth: "0 8px 8px",
      borderColor: "transparent transparent #fff",
      transition: "opacity .5s ease-in-out",
      content: "''",
    }
  },
  menu: {
    padding: "24px 0"
  },
  menuCategories: {
    position: "relative",
    width: 345,
    maxWidth: 1920,
    borderRadius: 3,
    padding: "24px 0",
    margin: 0,
    backgroundColor: "#fff",
    boxShadow: "0 2px 20px rgba(0,0,0,.2)",
    border: "1px solid #d2d2d2",
    '& > li': {
      borderRadius: "5px 5px 0 0",
      overflow: "hidden"
    },
    "& a:not($submenuLink)": {
      color: "#3e77aa"
    },
    "& a:hover": {
      textDecoration: "underline",
      color: "#f84147"
    }
  },
  menuCategoriesLink: {
    width: "100%",
    position: "relative",
    zIndex: 10,
    display: "inline-block",
    verticalAlign: "bottom",
    paddingLeft: 15,
    paddingRight: 24,
    fontSize: 14,
    lineHeight: "31px",
    transition: "all .3s ease",
    '&.active': {
      backgroundColor: "#fcfcee"
    }
  },
  menuCategoriesIcon: {
    position: "relative",
    display: "inline-block",
    verticalAlign: "middle",
    marginTop: -4,
    marginRight: 8,
    textAlign: "center",
    width: 24,
    height: 24,
    "& > div > div": {
      display: "flex"
    },
    '& svg': {
      width: "2.4rem",
      height: "2.4rem",
      fill: "#9e9e9e"
    }
  },
  chevronRight: {
    position: "absolute",
    right: 5,
    top: 9,
    fill: "currentColor",
    fontSize: 18
  },
  menuContent: {
    position: "absolute",
    left: 0,
    top: 0,
    width: "calc(100vw - 50px)",
    display: "none",
    flexDirection: "row",
    height: "100%",
    padding: "8px 8px 8px 345px",
    borderRadius: 3,
    backgroundColor: "#fff",
    overflow: "hidden",
    boxShadow: "0 2px 20px rgba(0,0,0,.2)",
    border: "1px solid #d2d2d2",
    "&.active": {
      display: "flex"
    }
  },
  submenu: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%",
  },
  subcategories: {
    position: "relative",
    width: "100%",
    flex: 1,
    overflow: "hidden",
    columnCount: 3,
    columnFill: "auto"
  },
  subCategoriesTitle: {
    position: "relative",
    display: "block",
    marginBottom: 4,
    paddingLeft: 12,
    paddingRight: 12,
    fontSize: 16,
    lineHeight: "18px",
    marginTop: 10
  },
  submenuLink: {
    position: "relative",
    display: "inline-block",
    verticalAlign: "bottom",
    width: "100%",
    padding: "2px 12px",
    overflow: "hidden",
    fontSize: 13,
    lineHeight: "15px",
    whiteSpace: "nowrap",
    color: "#333"
  }
}));

interface MenuProps {
  categories: Categories_categories | null
}

const Menu:React.FC<MenuProps> = ({categories}) =>{
  const overlay = React.useContext(OverlayContext);
  const classes = useStyles();
  const [isActiveMenu, setActiveMenu] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(0);

  React.useEffect(() => {
    if (isActiveMenu){
      overlay.show(OverlayType.mainMenuNav)
    }else{
      overlay.hide()
    }
  }, [isActiveMenu])

  const handleClickLink = () => {
    setActiveMenu(false);
  }

  return(
      <ClickAwayListener onClickAway={e => setActiveMenu(false)}>
        <div className="mr-10 mb-5">
          <Button variant="outlined"
                  size="large"
                  startIcon={<BsFillGridFill/>}
                  onClick={e => setActiveMenu(prev => !prev)}
          >
            Каталог товаров
          </Button>
          <div>
            <div className={classes.menuWrapper} style={{display: isActiveMenu ? "block" : "none"}}>
              <ul className={classes.menuCategories}>
                {categories?.edges.map((edge, i) => {
                  const node = edge.node;
                  return (
                      <li key={i}>
                        <Link to={getCategoryUrl(node.slug, node.id)}
                              className={`${classes.menuCategoriesLink} ${i === activeIndex ? 'active' : ''}`}
                              onMouseEnter={e => setActiveIndex(i)}
                              onClick={handleClickLink}
                        >
                          <span className={classes.menuCategoriesIcon}>
                            {node.backgroundImage?.url &&
                            <ReactSVG src={node.backgroundImage?.url}
                                      title={node.name}
                                      className="flex items-center"
                            />
                            }
                          </span>
                          {node.name}
                          {node.children.edges.length > 0 &&
                          <ChevronRightIcon className={classes.chevronRight}/>
                          }
                        </Link>
                        {node.children.edges.length > 0 &&
                        <div className={`${classes.menuContent} ${i === activeIndex ? 'active' : ''}`}>
                          <div className={classes.submenu}>
                            <div className={classes.subcategories}>
                              <ul className="list-none p-0">
                                {node.children.edges.map((childEdge, i) => {
                                  const childNode1 = childEdge.node;
                                  return(
                                      <li key={i}>
                                        <Link to={getCategoryUrl(childNode1.slug, childNode1.id)}
                                              className={classes.subCategoriesTitle}
                                              onClick={handleClickLink}
                                        >
                                          {childNode1.name}
                                        </Link>
                                        {!!childNode1.children.edges.length &&
                                        <ul className="list-none p-0">
                                          {childNode1.children.edges.map((childEdge2, i) => {
                                            const childNode2 = childEdge2.node;
                                            return(
                                                <li key={i}>
                                                  <Link to={getCategoryUrl(childNode2.slug, childNode2.id)}
                                                        className={classes.submenuLink}
                                                        onClick={handleClickLink}
                                                  >
                                                    {childNode2.name}
                                                  </Link>
                                                </li>
                                            )
                                          })}
                                        </ul>
                                        }
                                      </li>
                                  )
                                })}
                              </ul>
                            </div>
                            <div className="h-40 flex items-center">
                              <Link to={getCategoryUrl(node.slug, node.id)} className={classes.subCategoriesTitle}>Все категории</Link>
                            </div>
                          </div>
                        </div>
                        }
                      </li>
                  )
                })
                }
              </ul>
            </div>
          </div>
        </div>
      </ClickAwayListener>
  )
};

export default Menu;