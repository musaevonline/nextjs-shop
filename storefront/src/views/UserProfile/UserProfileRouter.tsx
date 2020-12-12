import React, {useContext} from "react";
import {Link, Redirect, Route, Switch} from "react-router-dom";
import {
    baseUrl,
    userProfileAddressesUrl, userProfileEmailChangeConfirmUrl,
    userProfileFavoritesUrl,
    userProfileOrdersUrl, userProfileReviewsUrl,
    userProfileSettingsUrl
} from "@temp/app/routes";
import {PersonalInformationPage} from "@temp/views/UserProfile/pages/PersonalInformation";
import {Container, Typography} from "@material-ui/core";
import NotFound from "@temp/components/NotFound";
import Hidden from "@material-ui/core/Hidden";
import Divider from "@material-ui/core/Divider";
import {makeStyles} from "@material-ui/core/styles";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import {UserContext} from "@temp/components/User/context";
import EmailChangeConfirm from "@temp/views/UserProfile/EmailChangeConfirm";
import {Addresses} from "@temp/views/UserProfile/pages/Addresses";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {OrdersPage} from "@temp/views/UserProfile/pages/Orders";
import {ReviewsPage} from "@temp/views/UserProfile/pages/Reviews";

enum BREADCRUMB_TITLE {
    SETTINGS= "Личные данные",
    ADDRESSES= "Список адресов",
    FAVORITES= "Избранное",
    ORDERS= "Мои заказы",
    REVIEWS= "Мои отзывы",
}

const useStyles = makeStyles(theme => ({
    link:{
        marginTop: 10,
        marginBottom: 10,
        "& a":{
            cursor: "pointer",
            display: "block",
            "&:hover":{
                color: theme.palette.primary.main
            }
        }
    },
    menu: {
        top: 20,
        marginRight: 24,
        height: 300,
        position: "sticky"
    }
}));

const UserProfileRouter:React.FC = () => {
    const classes = useStyles();

    const user = useContext(UserContext);

    const getBreadcrumbName = ():string => {
        const pathName = location.pathname;
        if (pathName.includes(userProfileSettingsUrl)){
            return BREADCRUMB_TITLE.SETTINGS
        }  else if (pathName.includes(userProfileAddressesUrl)){
            return BREADCRUMB_TITLE.ADDRESSES
        }  else if (pathName.includes(userProfileFavoritesUrl)){
            return BREADCRUMB_TITLE.FAVORITES
        }  else if (pathName.includes(userProfileOrdersUrl)){
            return BREADCRUMB_TITLE.ORDERS
        } else if (pathName.includes(userProfileReviewsUrl)){
            return BREADCRUMB_TITLE.REVIEWS
        }
        return BREADCRUMB_TITLE.SETTINGS
    };

    return(
        <>
            {!user.user && !user.loading && <Redirect to={baseUrl}/>}
            <Container maxWidth="lg">
                <div className="my-20">
                    <Breadcrumbs separator="/" aria-label="breadcrumb">
                        <Link color="inherit" to={baseUrl}>
                            Главная
                        </Link>
                        <span>{getBreadcrumbName()}</span>
                    </Breadcrumbs>
                </div>
                <div className="flex">
                    <Hidden smDown>
                        <Card className={classes.menu}>
                            <CardContent>
                                <div className="w-200">
                                    <div className={classes.link}>
                                        <Typography variant="subtitle2"
                                                    color={getBreadcrumbName() === BREADCRUMB_TITLE.SETTINGS ? "primary" : "inherit"}
                                                    component={Link}
                                                    to={userProfileSettingsUrl}>
                                            Личные данные
                                        </Typography>
                                    </div>
                                    <Divider variant="fullWidth"/>
                                    <div className={classes.link}>
                                        <Typography variant="subtitle2"
                                                    color={getBreadcrumbName() === BREADCRUMB_TITLE.ADDRESSES ? "primary" : "inherit"}
                                                    component={Link}
                                                    to={userProfileAddressesUrl}>
                                            Мой список адресов
                                        </Typography>
                                    </div>
                                    <Divider variant="fullWidth"/>
                                    <div className={classes.link}>
                                        <Typography variant="subtitle2"
                                                    className={classes.link}
                                                    color={getBreadcrumbName() === BREADCRUMB_TITLE.FAVORITES ? "primary" : "inherit"}
                                                    component={Link}
                                                    to={userProfileFavoritesUrl}>
                                            Избранное
                                        </Typography>
                                    </div>
                                    <Divider variant="fullWidth"/>
                                    <div className={classes.link}>
                                        <Typography variant="subtitle2"
                                                    className={classes.link}
                                                    color={getBreadcrumbName() === BREADCRUMB_TITLE.ORDERS ? "primary" : "inherit"}
                                                    component={Link}
                                                    to={userProfileOrdersUrl}>
                                            Мои заказы
                                        </Typography>
                                    </div>
                                    <Divider variant="fullWidth"/>
                                    <div className={classes.link}>
                                        <Typography variant="subtitle2"
                                                    className={classes.link}
                                                    color={getBreadcrumbName() === BREADCRUMB_TITLE.REVIEWS ? "primary" : "inherit"}
                                                    component={Link}
                                                    to={userProfileReviewsUrl}>
                                            Мои отзывы
                                        </Typography>
                                    </div>
                                    <Divider variant="fullWidth"/>
                                </div>
                            </CardContent>
                        </Card>

                    </Hidden>
                    < div className="flex-1">
                        <Switch>
                            <Route exact path={userProfileSettingsUrl} component={PersonalInformationPage}/>
                            <Route exact path={userProfileAddressesUrl} component={Addresses}/>
                            <Route exact path={userProfileOrdersUrl} component={OrdersPage}/>
                            <Route exact path={userProfileReviewsUrl} component={ReviewsPage}/>
                            <Route exact path={userProfileEmailChangeConfirmUrl} component={EmailChangeConfirm}/>
                            <Route component={NotFound}/>
                        </Switch>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default UserProfileRouter;