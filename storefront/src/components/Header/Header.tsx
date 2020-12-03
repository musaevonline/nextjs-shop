import './scss/index.scss';

import React, {useContext, useState} from "react";
import { ReactSVG } from 'react-svg'
import {Container} from "@material-ui/core";
import Hidden from "@material-ui/core/Hidden";
import {Link} from "react-router-dom";
import CloseIcon from '@material-ui/icons/Close';
import SwipeableViews from 'react-swipeable-views';
import {
    blogPath,
    baseUrl, userProfileFavoritesUrl, getPageUrl
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
import {CartRightPanel} from "@temp/components/CartRightPanel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {Categories, CategoriesVariables} from "@sdk/queries/types/Categories";
import Drawer from "@material-ui/core/Drawer";
import {AuthenticatedPage, ForgotPasswordPage, LoginPage, SignUpPage} from "@temp/components/Auth";
import Divider from "@material-ui/core/Divider";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import {makeStyles, useTheme} from "@material-ui/core/styles";
import TabPanel from "@temp/components/TabPanel";
import {UserContext} from "@temp/components/User/context";
import {CheckoutContext} from "@temp/components/CheckoutProvider/context";
import {usePages} from "@sdk/queries/page";
import { Sticky } from 'react-sticky';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import useShop from "@temp/hooks/useShop";
import {BsAlarm, BsHeart, BsPhone, BsSearch, BsBag} from "react-icons/bs";
import AccountIcon from "@temp/icons/Account";
import PhoneIcon from '@material-ui/icons/Phone';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import SvgIcon from '@material-ui/core/SvgIcon';

const useStyles = makeStyles(theme => ({
    largeBagIcon: {
        padding: 0
    },
    logo: {
        '& svg': {
            height: 70,
            fill: theme.palette.secondary.main
        }
    },
    logoMobile: {
        '& svg': {
            height: 35,
            fill: theme.palette.secondary.main
        }
    },
    utilityIcon: {
        "& svg":{
            fontSize: 30
        }
    }
}))

const Header: React.FC = () =>{
    const classes = useStyles();
    const theme = useTheme();
    const shop = useShop();
    const xs = useMediaQuery(theme.breakpoints.down('xs'));
    const [isActiveSearch, setIsActiveSearch] = useState(false);
    const [isOpenCartPanel, setOpenCartPanel] = useState(false);
    const [accountDrawerState, setAccountDrawerState] = useState(false);
    const [tabIndex, setTabIndex] = useState(0);
    const [forgotPassword, setForgotPassword] = useState(false);
    const [isOpenContactsDialog, setOpenContactsDialog] = useState(false);

    const {quantity:checkoutQuantity} = useContext(CheckoutContext);
    const user = useContext(UserContext);
    const authenticated = !!user.user;
    const {data:dataCategories} = useQuery<Categories, CategoriesVariables>(categoriesQuery, {
        variables: {level: 0},
        nextFetchPolicy: "cache-first"
    });
    const {data:pagesData} = usePages({
        variables: {
            first: 5
        }
    })
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

    const handleOpenContactsDialog = (e) => {
        setOpenContactsDialog(true);
    }

    return(
        <>
            {/*Pages Block*/}
            <Hidden xsDown>
                <div className="header__top">
                    <Container maxWidth="lg">
                        <div className="header__top_left flex items-center truncate flex-1 justify-between">
                            <div className="mr-5 header-phone">
                                <Button size="small"
                                        variant="text"
                                        color="inherit"
                                        startIcon={<PhoneIcon/>}
                                        endIcon={<KeyboardArrowDownIcon/>}
                                        onClick={handleOpenContactsDialog}
                                >
                                    {shop?.companyAddress.phone}
                                </Button>
                            </div>
                            <ul className="header-links">
                                <li><Link to={blogPath}>Блог</Link></li>
                                {pagesData?.pages?.edges.map(edge => <li key={edge.node.id}>
                                        <Link to={getPageUrl(edge.node.slug)}>{edge.node.title}</Link>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </Container>
                </div>
            </Hidden>


            <Hidden smDown>
                <Container maxWidth="lg">
                    <div className="flex justify-between items-center">
                        <div className="logo">
                            <Link to={baseUrl}>
                                <ReactSVG className={classes.logo} src={Logo} alt="СтройЛюкс" title="СтройЛюкс"/>
                            </Link>
                        </div>
                        <div className="flex items-center">
                            <div className="text-6xl">
                                <SvgIcon color="secondary" component="span" fontSize="inherit">
                                    <BsPhone />
                                </SvgIcon>
                            </div>
                            <div className="mobile__body pl-10">
                                <Typography variant="h6"><span className="text-base font-semibold">{shop?.companyAddress.phone}</span></Typography>
                                <div className="mobile__call">
                                    <Button size="small"
                                            color="primary"
                                            variant="text"
                                    >
                                        <span className="normal-case">Заказать</span>
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="text-6xl">
                                <SvgIcon color="secondary" component="span" fontSize="inherit">
                                    <BsAlarm/>
                                </SvgIcon>
                            </div>
                            <div className="work_time__body pl-10">
                                <Typography variant="h6"><span className="font-semibold">Режим работы</span></Typography>
                                <div className="text-sm">
                                    <div>ПН - ПТ: с 9:00 до 18:00</div>
                                    <div>СБ: с 9:00 до 15:00</div>
                                </div>
                            </div>

                        </div>
                    </div>
                </Container>

                <div className="bg-white">
                    <Container maxWidth="lg">
                        <div className="relative flex items-center header__line">
                            <div className="header__categories">
                                <Menu categories={dataCategories?.categories}/>
                            </div>
                            <div className="flex-1">
                                <div className="header__search">
                                    <Search />
                                </div>
                            </div>
                            <div className="w-200 flex justify-between">
                                <IconButton onClick={e => {setAccountDrawerState(true)}} className={classes.utilityIcon}>
                                    <AccountIcon fillRule="evenodd"/>
                                </IconButton>
                                <Link to={userProfileFavoritesUrl}>
                                    <IconButton className={classes.utilityIcon}>
                                        <BsHeart/>
                                    </IconButton>
                                </Link>
                                <Badge badgeContent={checkoutQuantity} color="primary" showZero max={100000}>
                                    <IconButton onClick={toggleCartDrawer(true)} className={classes.utilityIcon}>
                                        <BsBag/>
                                    </IconButton>
                                </Badge>
                            </div>
                        </div>
                    </Container>
                </div>
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
                                        <ReactSVG className={classes.logoMobile} src={Logo} alt="СтройЛюкс" title="СтройЛюкс"/>
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
            <Dialog open={isOpenContactsDialog}
                    onClose={e => setOpenContactsDialog(false)}
                    maxWidth="xs"
                    fullWidth
            >
                <DialogTitle disableTypography>
                    <Typography variant="h3" className="flex-1"><strong>Контактные телефоны</strong></Typography>
                    <span className="absolute" style={{top: 10, right: 5}}>
                        <IconButton aria-label="close"
                                    onClick={e => setOpenContactsDialog(false)}
                        >
                            <CloseIcon />
                        </IconButton>
                        </span>
                </DialogTitle>
                <DialogContent dividers>
                    <div className="mb-20">
                        <Typography gutterBottom variant="h5">Консультации и заказ:</Typography>
                        <a className="pl-5 hover:underline text-xl" href={`tel:${shop?.companyAddress.phone}`}>{shop?.companyAddress.phone}</a>
                    </div>
                    <div className="text-lg leading-10">
                        <Typography gutterBottom variant="h5">График работы:</Typography>
                        <div className="pl-5 flex items-center justify-between"><span>В будние:</span> <span>с 9:00 до 18:00</span></div>
                        <div className="pl-5 flex items-center justify-between"><span>Суббота:</span> <span>с 9:00 до 15:00</span></div>
                        <div className="pl-5 flex items-center justify-between"><span>Воскресенье:</span> <span>выходной</span></div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default React.memo(Header);