import './scss/index.scss';

import React from "react";
import MenuIcon from '@material-ui/icons/Menu';
import {SwipeableDrawer} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";

const MenuMobile:React.FC = () =>{
    const [state, setState] = React.useState(false);

    const toggleDrawer = (open: boolean) => (
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
        setState( open );
    };

    return(
        <div className="menu-mobile">
            <IconButton onClick={toggleDrawer(true)}>
                <MenuIcon />
            </IconButton>
            <SwipeableDrawer
                anchor={"left"}
                open={state}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
            >
                <div className="menu-mobile__body">
                    <ul className="menu-mobile__list">
                        <li>1</li>
                        <li>2</li>
                    </ul>
                </div>
            </SwipeableDrawer>
        </div>
    )
};

export default MenuMobile;