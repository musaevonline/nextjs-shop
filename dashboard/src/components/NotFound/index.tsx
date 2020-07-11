import * as React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import InlineSVG from "react-inlinesvg";
import NotFoundImg from "@assets/images/not-found-404.svg";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import {FormattedMessage} from "react-intl";

const useStyles = makeStyles(theme => ({
    root:{
        height: "calc(100vh - 180px)",
        display: "flex",
        alignItems: "center"
    },
    container:{
        [theme.breakpoints.down("md")]:{
            width: "100%",
            padding: 24,
            gridTemplateColumns: "1fr"
        },
        width: 830,
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "1fr 487px"
    },
    text:{
        [theme.breakpoints.down("md")]:{
            order: 1,
            textAlign: "center"
        },
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    },
    img:{
        "& svg":{
            width: "100%"
        }
    },
    btn:{
        width: "auto",
        marginTop: 20
    }
}));

interface NotFoundProps {
    message?: string;
}

const NotFound: React.FC<NotFoundProps> = () => {
    const classes = useStyles();

    return(
        <div className={classes.root}>
            <div className={classes.container}>
                <div className={classes.text}>
                    <Typography variant="h3">
                        <FormattedMessage id="oops" defaultMessage="Ooops"/>!...
                    </Typography>
                    <Typography variant="h4">
                         <FormattedMessage id="missing" defaultMessage="Something's missing"/>
                    </Typography>
                    <Typography variant="body1">
                         <FormattedMessage id="page_not_found" defaultMessage="Sorry, the page was not found"/>
                    </Typography>

                    <div className={classes.btn}>
                        <Button component={Link}
                                to={'/'}
                                size="large"
                                color="primary"
                                variant="contained">
                            <FormattedMessage id="back_home" defaultMessage="Go back to home"/>
                        </Button>
                    </div>
                </div>
                <div className={classes.img}>
                    <InlineSVG src={NotFoundImg} viewBox="0 0 487 257"/>
                </div>
            </div>
        </div>
    )
};

export default NotFound;