import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ListSubheader, List } from "@material-ui/core";
import Mantenimiento from "./Mantenimiento";
import Ordenes from "./Ordenes";


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));

function UsuarioOcho() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };
    
    return (
        <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    VENTAS
                </ListSubheader>
            }
            className={classes.root}
        >
        
            <Ordenes />
        
        </List>
    );
}

export default UsuarioOcho;

