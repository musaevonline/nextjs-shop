import './scss/index.scss';

import React, {useContext, useState} from "react";
import SVG from 'react-inlinesvg';
import {Container} from "@material-ui/core";
import Hidden from "@material-ui/core/Hidden";
import {Link} from "react-router-dom";
import CloseIcon from '@material-ui/icons/Close';
import SwipeableViews from 'react-swipeable-views';
import {
    blogPath,
    callBackModalUrl, baseUrl, userProfileFavoritesUrl, getPageUrl
} from "@temp/app/routes";

import Logo from "../../images/logo.svg";
import Badge from "@material-ui/core/Badge";
import {Menu} from "@temp/components/Menu";
import {Search} from "@temp/components/Search";
import {MenuMobile} from "@temp/components/MenuMobile";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import {useQuery} from "@apollo/client";
import {categoriesQuery} from "@sdk/queries/category";
import {Overlay, OverlayContext} from "@temp/components";
import {CartRightPanel} from "@temp/components/CartRightPanel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {Categories, CategoriesVariables} from "@sdk/queries/types/Categories";
import Drawer from "@material-ui/core/Drawer";
import {AuthenticatedPage, ForgotPasswordPage, LoginPage, SignUpPage} from "@temp/components/Auth";
import Divider from "@material-ui/core/Divider";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import {useTheme} from "@material-ui/core/styles";
import TabPanel from "@temp/components/TabPanel";
import {UserContext} from "@temp/components/User/context";
import {CheckoutContext} from "@temp/components/CheckoutProvider/context";
import {usePages} from "@sdk/queries/page";
import { Sticky } from 'react-sticky';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import useShop from "@temp/hooks/useShop";
import {BsAlarm, BsHeart, BsPhone, BsSearch, BsBag} from "react-icons/bs";
import AccountIcon from "@temp/icons/Account";


const Header: React.FC = () =>{
    const theme = useTheme();
    const shop = useShop();
    const xs = useMediaQuery(theme.breakpoints.down('xs'));
    const [isActiveSearch, setIsActiveSearch] = useState(false);
    const [isOpenCartPanel, setOpenCartPanel] = useState(false);
    const [accountDrawerState, setAccountDrawerState] = useState(false);
    const [tabIndex, setTabIndex] = useState(0);
    const [forgotPassword, setForgotPassword] = useState(false);

    const {quantity:checkoutQuantity} = useContext(CheckoutContext);
    const user = useContext(UserContext);
    const authenticated = !!user.user;
    const {data:dataCategories} = useQuery<Categories, CategoriesVariables>(categoriesQuery, {
        variables: {level: 0}
    });
    const {data:pagesData} = usePages({
        variables: {
            first: 5
        }
    })

    const overlay = useContext(OverlayContext);
    const toggleCartDrawer = (open: boolean) => (
        event: React.KeyboardEvent | React.MouseEvent,
    ) => {
        if (
            event &&
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
                (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }
        setOpenCartPanel( open );
    };

    const handleChangeTab = (event: React.ChangeEvent<{}>, newValue: number) => {
        setTabIndex(newValue);
    };

    return(
        <>
            {overlay.type && <Overlay context={overlay}/>}
            <CartRightPanel isOpen={isOpenCartPanel} toggleCartDrawer={toggleCartDrawer}/>
            <Drawer anchor="right"
                    PaperProps={{
                        className: "w-400 max-w-full"
                    }}
                    open={accountDrawerState}
                    onClose={e => setAccountDrawerState(false)}>

                <div className="flex flex-1 flex-col">
                    <div>
                        <div className="pl-24 py-5 flex items-center justify-between w-full">
                            {!authenticated &&
                            <Typography variant="h5">Аккаунт</Typography>
                            }
                            {authenticated &&
                            <Typography variant="h5">
                                {(user.user.firstName || user.user.lastName) &&
                                <>
                                    {user.user.firstName} {user.user.lastName}
                                </>
                                }
                                {!(user.user.firstName || user.user.lastName) &&
                                <>
                                    Аккаунт
                                </>
                                }
                            </Typography>
                            }
                            <IconButton onClick={e => setAccountDrawerState(false)}>
                                <CloseIcon/>
                            </IconButton>
                        </div>
                        <Divider variant="fullWidth"/>
                    </div>
                    {authenticated &&
                    <div className="px-24 pb-15 mt-10 flex flex-1">
                        <AuthenticatedPage onClickLink={() => setAccountDrawerState(false)}/>
                    </div>
                    }
                    {!authenticated && !forgotPassword &&
                    <div>
                        <Tabs
                            value={tabIndex}
                            onChange={handleChangeTab}
                            indicatorColor="primary"
                            textColor="primary"
                            aria-label="account-tabs"
                            className="bg-gray-100 mb-20"
                        >
                            <Tab label="Авторизация" className="w-1/2 h-60" id="login-tab"/>
                            <Tab label="Регистрация" className="w-1/2 h-60" id="sign-up-tab"/>
                        </Tabs>
                        < div className="px-24">
                            <SwipeableViews
                                axis='x'
                                index={tabIndex}
                                onChangeIndex={index => setTabIndex(index)}
                            >
                                <TabPanel value={tabIndex} index={0} dir={theme.direction}>
                                    <LoginPage onForgotPassword={() => setForgotPassword(true)}/>
                                </TabPanel>
                                <TabPanel value={tabIndex} index={1} dir={theme.direction}><SignUpPage/></TabPanel>
                            </SwipeableViews>
                        </div>
                    </div>
                    }
                    {!authenticated && forgotPassword &&
                    <div className="px-24">
                        <ForgotPasswordPage back={() => setForgotPassword(false)} />
                    </div>
                    }
                </div>
            </Drawer>


            <Hidden xsDown>
                <div className="header__top">
                    <Container maxWidth="xl">
                        <div className="header__top_left">
                            <ul className="list_inline">
                                {pagesData?.pages?.edges.map(edge => <li key={edge.node.id}><Link
                                    to={getPageUrl(edge.node.slug)}>{edge.node.title}</Link></li>)}
                            </ul>
                        </div>
                        <div className="header__top_right">
                            <ul className="list_inline">
                                <li><Link to={blogPath}>Блог</Link></li>
                                {/*<li><Link to={galleryUrl}>Фотогалерея</Link></li>*/}
                            </ul>
                        </div>
                    </Container>
                </div>
            </Hidden>
            <Hidden smDown>
                <Container maxWidth="xl">
                    <div className="header__center">
                        <div className="logo">
                            <Link to={baseUrl}>
                                <SVG src={Logo} alt="СтройЛюксДрев"/>
                            </Link>
                        </div>
                        <div className="mobile">
                            <BsPhone/>
                            <div className="mobile__body">
                                <Typography variant="h6">{shop?.companyAddress.phone}</Typography>
                                <div className="mobile__call">
                                    <Button component={Link}
                                            to={callBackModalUrl}
                                            size="small"
                                            color="primary">Заказать звонок</Button>
                                </div>
                            </div>
                        </div>
                        <div className="work_time">
                            <BsAlarm/>
                            <div className="work_time__body">
                                <Typography variant="h6">Режим работы</Typography>
                                <div className="work_time__schedule">
                                    <div>ПН - ПТ: с 9:00 до 18:00</div>
                                    <div>СБ: с 9:00 до 15:00</div>
                                </div>
                            </div>

                        </div>
                        <div className="cart-icon">
                            <Badge badgeContent={checkoutQuantity} color="primary" showZero max={100000}>
                                <IconButton onClick={toggleCartDrawer(true)}>
                                    <BsBag />
                                </IconButton>
                            </Badge>
                        </div>
                    </div>
                </Container>
                <Sticky topOffset={140}>
                    {({
                          style,
                          isSticky
                      }) => (
                        <div className={`header__bottom bg-white ${isSticky ? "shadow-lg": "" }`} style={style}>
                            <Container maxWidth="xl">
                                <div className="flex items-center h-60">
                                    <div className="w-300">
                                        <div className="header__categories">
                                            <Menu categories={dataCategories?.categories}/>
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <div className="header__search">
                                            <Search />
                                        </div>
                                    </div>
                                    <div className="w-200 flex">
                                        <IconButton onClick={e => {setAccountDrawerState(true)}}>
                                            <AccountIcon fillRule="evenodd"/>
                                        </IconButton>
                                        <Link to={userProfileFavoritesUrl}>
                                            <IconButton>
                                                <BsHeart/>
                                            </IconButton>
                                        </Link>
                                        {isSticky &&
                                        <Badge badgeContent={checkoutQuantity} color="primary" showZero max={100000}>
                                            <IconButton onClick={toggleCartDrawer(true)}>
                                                <BsBag/>
                                            </IconButton>
                                        </Badge>
                                        }
                                    </div>
                                </div>
                            </Container>
                        </div>
                    )}
                </Sticky>
            </Hidden>
            <Hidden mdUp>
                <Sticky topOffset={xs ? 0 : 50}>
                    {({
                          style,
                          isSticky
                      }) => (
                        <Container maxWidth="lg" style={style} className={`bg-white ${isSticky ? "shadow-lg": "" }`}>
                            <div className="mobile-header">
                                <div className="menu">
                                    <MenuMobile categories={dataCategories?.categories}/>
                                </div>
                                <div className="mobile-header__logo flex-1">
                                    <Link to={baseUrl}>
                                        <img src={Logo} alt="СтройЛюксДрев"/>
                                    </Link>
                                </div>
                                <div className="mobile-header__utilities">
                                    <div className="mobile-header__search-icon">
                                        <IconButton onClick={e => {setIsActiveSearch(prev => !prev)}}>
                                            {isActiveSearch ? <CloseIcon/> : <BsSearch/>}
                                        </IconButton>
                                    </div>
                                    <div className="mobile-header__account-icon">
                                        <IconButton onClick={e => setAccountDrawerState(true)}>
                                            <AccountIcon fillRule="evenodd"/>
                                        </IconButton>
                                    </div>
                                    <div className="mobile-header__cart">
                                        <IconButton onClick={toggleCartDrawer(true)}>
                                            <Badge badgeContent={checkoutQuantity} color="primary" showZero max={100000}>
                                                <BsBag />
                                            </Badge>
                                        </IconButton>
                                    </div>
                                </div>
                            </div>
                            <Collapse in={isActiveSearch}>
                                <Search />
                            </Collapse>
                        </Container>
                    )}
                </Sticky>
            </Hidden>
        </>
    );
};

export default React.memo(Header);