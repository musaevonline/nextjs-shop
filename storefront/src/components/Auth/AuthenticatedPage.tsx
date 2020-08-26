import React, {useContext} from "react";
import {UserContext, UserContextInterface} from "@temp/components/User/context";
import Button from "@material-ui/core/Button";
import {Typography} from "@material-ui/core";
import {Link} from "react-router-dom";
import {
    userProfileAddressesUrl,
    userProfileFavoritesUrl,
    userProfileOrdersUrl, userProfileReviewsUrl,
    userProfileSettingsUrl
} from "@temp/app/routes";
import Divider from "@material-ui/core/Divider";
import {makeStyles} from "@material-ui/core/styles";
import {CheckoutContext} from "@temp/components/CheckoutProvider/context";

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
    }
}));

const AuthenticatedPage:React.FC<{
    onClickLink: () => void
}> = ({ onClickLink }) =>{
    const auth = useContext<UserContextInterface>(UserContext);
    const {resetCheckout} = useContext(CheckoutContext);
    const classes = useStyles();

    const logout = e => {
        auth.logout();
        resetCheckout();
        onClickLink();
    };

    return(
        <div id="authenticated-page" className="flex flex-1 flex-col">
            {/*<div>*/}
            {/*    {auth.user.email}*/}
            {/*</div>*/}
            <div className="flex-1">
                <div className={classes.link}>
                    <Typography variant="subtitle2"
                                component={Link}
                                onClick={e => onClickLink()}
                                to={userProfileSettingsUrl}>
                        Личные данные
                    </Typography>
                </div>
                <Divider variant="fullWidth"/>
                <div className={classes.link}>
                    <Typography variant="subtitle2"
                                component={Link}
                                onClick={e => onClickLink()}
                                to={userProfileAddressesUrl}>
                        Мой список адресов
                    </Typography>
                </div>
                <Divider variant="fullWidth"/>
                <div className={classes.link}>
                    <Typography variant="subtitle2"
                                className={classes.link}
                                component={Link}
                                onClick={e => onClickLink()}
                                to={userProfileFavoritesUrl}>
                        Избранное
                    </Typography>
                </div>
                <Divider variant="fullWidth"/>
                <div className={classes.link}>
                    <Typography variant="subtitle2"
                                className={classes.link}
                                component={Link}
                                onClick={e => onClickLink()}
                                to={userProfileOrdersUrl}>
                        Мои заказы
                    </Typography>
                </div>
                <Divider variant="fullWidth"/>
                <div className={classes.link}>
                    <Typography variant="subtitle2"
                                className={classes.link}
                                component={Link}
                                onClick={e => onClickLink()}
                                to={userProfileReviewsUrl}>
                        Мои отзывы
                    </Typography>
                </div>
                <Divider variant="fullWidth"/>
                {auth?.user?.isStaff &&
                <>
                    <div className={classes.link}>
                        <Typography variant="subtitle2"
                                    className={classes.link}
                                    component='a'
                                    href={process.env.DASHBOARD_URL || '/dashboard/'}>
                            Панель администратора
                        </Typography>
                    </div>
                    <Divider variant="fullWidth"/>
                </>
                }
            </div>
            <div>
                <Button variant="contained"
                        color="primary"
                        type="button"
                        onClick={logout}
                        fullWidth
                >
                    Выйти
                </Button>
            </div>
        </div>
    );
};
AuthenticatedPage.displayName = "AuthenticatedPage";
export default AuthenticatedPage;