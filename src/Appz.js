import { ListItem, ListItemIcon } from '@material-ui/core';
import React from 'react';



const useStyle = makeStyle({

});

export default function TemporaryDrawer() {
    const classes = useStyle();
    const [state, setState] = React.useState({
        top: false,
        right: false,
        bottom: false,
        left: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fulllist]: anchor === 'top' || anchor === 'bottom',
            })}
            role='presentation'
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <list>
                {['Inbox', 'Starred', 'send email', 'Drafts'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemIcon primary={text}></ListItemIcon>
                    </ListItem>
                ))}
            </list>
        </div>
    )



};