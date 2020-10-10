import './scss/index.scss';

import React from "react";
import MenuIcon from '@material-ui/icons/Menu';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {Link} from "react-router-dom";
import {getCategoryUrl} from "@temp/app/routes";
import {Categories_categories} from "@sdk/queries/types/Categories";

interface MenuProps {
    categories: Categories_categories | null
}

const Menu:React.FC<MenuProps> = ({categories}) =>{

    return(
        <div className="menu">
            <div className="menu__head">
                <MenuIcon />
                <div className="menu__caption">Каталог товаров</div>
                <div className="menu__toggle">
                    <KeyboardArrowDownIcon />
                </div>
            </div>
            {categories &&
            <ul className="menu__list">
                {categories.edges.map(edge => {
                    const node = edge.node;
                    return (
                        <li key={node.id}>
                            <Link to={getCategoryUrl(node.slug, node.id)}>{node.name}</Link>
                            {node.children.edges.length > 0 &&
                            <>
                                <ChevronRightIcon/>
                                <ul className="submenu" data-level={1}>
                                    {node.children.edges.map(childEdge1 => {
                                        const childNode1 = childEdge1.node;
                                        return (
                                            <li key={childNode1.id}>
                                                <Link
                                                    to={getCategoryUrl(childNode1.slug, childNode1.id)}>{childNode1.name}</Link>
                                                {childNode1.children.edges.map(childEdge2 =>
                                                    <Link key={childEdge2.node.id} className="submenu__link"
                                                          to={getCategoryUrl(childEdge2.node.slug, childEdge2.node.id)}>
                                                        {childEdge2.node.name}
                                                    </Link>
                                                )}
                                            </li>
                                        )
                                    })}
                                </ul>
                            </>
                            }
                        </li>
                    )
                })}
            </ul>
            }
        </div>
    )
};

export default Menu;