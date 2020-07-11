import "./scss/index.scss";

import * as React from "react";
import { Link } from "react-router-dom";
import {Container} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

interface NotFoundProps {
    message?: string;
}

const NotFound: React.FC<NotFoundProps> = () => (
    <div className="not-found-page">
        <Container maxWidth="xl">
            <Typography variant="h2"
                        color="primary"
                        className="not-found-page__header">
                404
            </Typography>
            <div className="not-found-page__ruler" />
            <div className="not-found-page__message">
                <p>Page not found</p>
            </div>
            <div className="not-found-page__button">
                <Button component={Link}
                        to={'/'}
                        fullWidth
                        color="primary"
                        variant="contained">Home</Button>
            </div>
        </Container>
    </div>
);

export default NotFound;