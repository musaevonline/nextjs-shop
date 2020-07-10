import "./scss/index.scss";

import * as React from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../core/config";
import {Container} from "@material-ui/core";
import Button from "@material-ui/core/Button";

interface NotFoundProps {
    message?: string;
}

const NotFound: React.FC<NotFoundProps> = () => (
    <div className="not-found-page">
        <Container maxWidth="xl">
            <h2 className="not-found-page__header">404</h2>
            <div className="not-found-page__ruler" />
            <div className="not-found-page__message">
                <p>Извините, такой странички у нас нет.</p>
                <p>Воспользуйтесь навигацией или поиском, расположенными вверху, чтобы найти нужный вам товар.</p>
            </div>
            <div className="not-found-page__button">
                <Button component={Link}
                        to={BASE_URL}
                        fullWidth
                        color="primary"
                        variant="contained">Главная страница</Button>
            </div>
        </Container>
    </div>
);

export default NotFound;