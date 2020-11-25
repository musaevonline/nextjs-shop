import './scss/index.scss';

import React from "react";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {Link} from "react-router-dom";
import {getCategoryUrl} from "@temp/app/routes";
import {Categories_categories} from "@sdk/queries/types/Categories";
import {Button} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import {OverlayContext, OverlayType} from "@temp/components";
import AppsIcon from '@material-ui/icons/Apps';
import CategoryPlaceHolder from "images/category_menu_placeholder.png";

const useStyles = makeStyles(theme => ({
  menuWrapper: {
    position: "absolute",
    zIndex: 999,
    top: "calc(100% + 8px)",
    left: 0,
    display: "none",
    marginTop: -8,
    borderRadius: 5,
    backgroundColor: "#fff",
    width: 272,
    boxShadow: "0 1px 6px 0 rgba(0,0,0,.4)",
    border: "1px solid #e0e0e0",
    "&::before": {
      display: "inline-block",
      position: "absolute",
      top: -6,
      left: 28,
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
  menuCategories: {
    position: "relative",
    borderRadius: 3,
    padding: "10px 0",
    margin: 0,
    backgroundColor: "#fff",
    boxShadow: "0 2px 20px rgba(0,0,0,.2)",
    border: "1px solid #d2d2d2",
    listStyleType: "none",
    minHeight: 350,
    '& > li': {
      borderRadius: "5px 5px 0 0",
    },
    "& > a:not($submenuLink)": {
      color: "#595959",
      fontSize: 14
    },
    "& > a:hover": {
      fontWeight: 700,
      letterSpacing: 0
    }
  },
  menuCategoriesLink: {
    width: "100%",
    position: "relative",
    zIndex: 10,
    display: "flex",
    alignItems: "center",
    verticalAlign: "bottom",
    paddingLeft: 15,
    paddingRight: 0,
    fontSize: 14,
    lineHeight: "28px",
    transition: "all .3s ease",
    '&.active': {
      boxShadow: "4px 1px 7px -2px #c5c5c5, 0 2px 7px -2px #c5c5c5"
    }
  },
  menuCategoriesIcon: {
    position: "relative",
    display: "inline-block",
    verticalAlign: "middle",
    marginRight: 8,
    textAlign: "center",
    width: 20,
    height: 20
  },
  chevronRight: {
    fill: "currentColor",
    fontSize: 18
  },
  menuContent: {
    position: "absolute",
    left: 0,
    top: 0,
    width: 1232,
    maxWidth: "95vw",
    display: "none",
    flexDirection: "row",
    minHeight: 350,
    height: "100%",
    padding: "8px 8px 8px 300px",
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
    display: "inline-block",
    color: "#5285cc",
    fontSize: 14,
    fontWeight: 700,
    letterSpacing: 0,
    lineHeight: 1.3,
    textDecoration: "inherit",
    paddingLeft: 5,
    paddingBottom: 5,
    "&:hover": {
      textDecoration: "underline"
    }
  },
  submenuList: {
    position: "relative",
    paddingTop: 5,
    paddingBottom: 5,
    "&::before": {
      content: "''",
      display: "block",
      position: "absolute",
      top: 0,
      left: 2,
      width: 175,
      height: 1,
      backgroundColor: "#dadada",
    }
  },
  submenuLink: {
    display: "inline-block",
    color: "#595959",
    fontSize: 12,
    lineHeight: "20px",
    letterSpacing: 0,
    padding: "0 2px 0 5px",
    textDecoration: "inherit",
    "&:hover": {
      textDecoration: "underline"
    }
  }
}));

interface MenuProps {
  categories: Categories_categories | null
}

const Menu:React.FC<MenuProps> = ({categories}) =>{
  const overlay = React.useContext(OverlayContext);
  const classes = useStyles();
  const [isActiveMenu, setActiveMenu] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(-1);

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
        <div className="menu__btn">
          <Button variant="contained"
                  size="medium"
                  startIcon={<AppsIcon/>}
                  color="secondary"
                  onClick={e => setActiveMenu(prev => !prev)}
                  fullWidth
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
                              className={`${classes.menuCategoriesLink} ${i === activeIndex ? 'active' : ''} flex`}
                              onMouseEnter={e => setActiveIndex(i)}
                              onClick={handleClickLink}
                        >
                          <span className={classes.menuCategoriesIcon}>
                            <img src={node.backgroundImage?.url || CategoryPlaceHolder}
                                 alt={node.name}
                                 className="flex items-center w-20 h-20"
                            />
                          </span>
                          <span className="flex-1">
                          {node.name}
                          </span>
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
                                        <ul className={`list-none p-0 ${classes.submenuList}`}>
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