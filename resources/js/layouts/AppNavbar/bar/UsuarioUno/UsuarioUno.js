import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ListSubheader, List } from "@material-ui/core";
import Mantenimiento from "./Mantenimiento";
import Ordenes from "./Ordenes";
import ListaChequeo from "./ListaChequeo";

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

function UsuarioUno() {
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
                    USUARIO UNO
                </ListSubheader>
            }
            className={classes.root}
        >
            <Ordenes />
            <ListaChequeo />
        </List>
    );
}

/* <Parametros />
   <Usuarios />
   <Activos />

*/

export default UsuarioUno;

