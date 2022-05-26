import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ListSubheader, List } from "@material-ui/core";
import Parametros from "./Parametros";
import Usuarios from "./Usuarios";
import Interlocutores from "./Interlocutores";
import Activos from "./Activos";
import Almacenes from "./Almacenes";
import Mantenimiento from "./Mantenimiento";
import Ordenes from "./Ordenes";
import SubirArchivos from "./SubirArchivos";
import ListaChequeo from "./ListaChequeo";
import Informes from "./Informes";

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

function Administrador() {
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
                    ADMINISTRADOR
                </ListSubheader>
            }
            className={classes.root}
        >
            <Parametros />
            <Usuarios />
            <Interlocutores />
            <Activos />
            <Almacenes />
            <Mantenimiento />
            <Ordenes />
            <ListaChequeo />
            <SubirArchivos />
            <Informes />
        </List>
    );
}

export default Administrador;

