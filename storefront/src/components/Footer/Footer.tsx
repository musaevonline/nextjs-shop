import "./scss/index.scss";

import React, {useState} from "react";
import {Container} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import SvgIcon from '@material-ui/core/SvgIcon';
import PhoneOutlinedIcon from '@material-ui/icons/PhoneOutlined';
import MailOutlineOutlinedIcon from '@material-ui/icons/MailOutlineOutlined';
import QueryBuilderOutlinedIcon from '@material-ui/icons/QueryBuilderOutlined';
import {aboutUrl, baseUrl, contactsUrl, deliveryPaymentUrl, getCategoryUrl, helpUrl} from "@temp/app/routes";
import Logo from "images/logo.svg";
import FacebookLogo from 'images/facebook.svg';
import InstagramLogo from 'images/instagram.svg';
import VKLogo from 'images/vk.svg';
import {Link} from "react-router-dom";
import { ReactSVG } from 'react-svg'
import {useQuery} from "@apollo/client";
import {categoriesQuery} from "@sdk/queries/category";
import {Categories, CategoriesVariables} from "@sdk/queries/types/Categories";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';



const Footer:React.FC = () =>{
    const [isOpenAllCategories, setOpenAllCategories] = useState(false);
    const {data:dataCategories} = useQuery<Categories, CategoriesVariables>(categoriesQuery, {
        variables: {level: 0}
    });

    return(
        <footer className="footer">
            <Container maxWidth="xl">
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={6} md={3}>
                        <div className="footer__contacts flex flex-col">
                            <h5 className="divider-bottom relative pb-10 mb-10">Контакты:</h5>
                            <div className="flex align-center py-5">
                                <SvgIcon className="mr-10" fontSize="small">
                                    <PhoneOutlinedIcon/>
                                </SvgIcon>
                                <a href="tel:+375444979196">+375444979196</a>
                            </div>
                            <div className="flex align-center py-5">
                                <SvgIcon className="mr-10" fontSize="small">
                                    <MailOutlineOutlinedIcon/>
                                </SvgIcon>
                                <a href="mailto:vladimirsmeun@gmail.com">vladimirsmeun@gmail.com</a>
                            </div>
                            <div className="flex align-center py-5">
                                <SvgIcon className="mr-10" fontSize="small">
                                    <QueryBuilderOutlinedIcon/>
                                </SvgIcon>
                                <div className="flex flex-col">
                                    <div>Режим работы магазина:</div>
                                    <div>ПН - ПТ: с 9:30 до 17:30</div>
                                </div>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} className="footer__links">
                        <h5 className="divider-bottom relative pb-10 mb-10">О магазине:</h5>
                        <div><Link to={aboutUrl}>О нас</Link></div>
                        <div><Link to={deliveryPaymentUrl}>Доставка и оплата</Link></div>
                        <div><Link to={helpUrl}>Помощь</Link></div>
                        <div><Link to={contactsUrl}>Контакты</Link></div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} className="footer__categories">
                        <div className="categories-group">
                            <h5 className="divider-bottom relative pb-10 mb-10">Каталог товаров:</h5>
                            <Collapse in={isOpenAllCategories} collapsedHeight={200}>
                                <ul className="categories-group__list">
                                    {dataCategories?.categories.edges.map(edge => (
                                        <li key={edge.node.id}>
                                            <Link to={getCategoryUrl(edge.node.slug, edge.node.id)}
                                                  className="chevron-before relative">{edge.node.name}</Link>
                                        </li>
                                    ))
                                    }
                                </ul>
                            </Collapse>
                            {dataCategories?.categories.edges.length > 7 &&
                            <div className="mt-5 ml-20">
                                <IconButton size="small"
                                            color="inherit"
                                            disableRipple
                                            disableFocusRipple
                                            onClick={e => setOpenAllCategories(prev => !prev)}>
                                    {isOpenAllCategories ? <ExpandLessIcon fillRule="evenodd" clipRule="evenodd"/> :
                                        <ExpandMoreIcon fillRule="evenodd" clipRule="evenodd"/>
                                    }
                                </IconButton>
                            </div>
                            }
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} className="footer__links">
                        <div className="social">
                            <h5 className="social__title divider-bottom relative pb-10 mb-10">Мы в соцсетях:</h5>
                            <div className="flex align-center">
                                <a href="https://www.facebook.com/stroy.lux.by/?modal=admin_todo_tour" target="_blank" rel="noopener">
                                    <ReactSVG src={FacebookLogo} title="Facebook"/>
                                </a>
                                <a href="https://www.instagram.com/stroy_lux.by/" target="_blank" rel="noopener">
                                    <ReactSVG src={InstagramLogo} title="Instagram"/>
                                </a>
                                <a href="www.vk.com" target="_blank" rel="noopener">
                                    <ReactSVG src={VKLogo} title="VK"/>
                                </a>
                            </div>
                            <Link to={baseUrl}>
                                <img src={Logo} alt="СтройЛюксДрев"/>
                            </Link>
                        </div>
                    </Grid>
                </Grid>
                <div className="text-center copyright-text">
                    <span>©{new Date().getFullYear()} stroylux.by. Все права защищены</span>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;