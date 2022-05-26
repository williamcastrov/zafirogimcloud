import React from "react";
import { Link } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import { List, ListItem, ListItemIcon, ListItemText, Collapse } from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import ApartmentIcon from '@material-ui/icons/Apartment';
import BusinessIcon from '@material-ui/icons/Business';
import LanguageIcon from '@material-ui/icons/Language';
import NaturePeopleIcon from '@material-ui/icons/NaturePeople';
import PublicIcon from '@material-ui/icons/Public';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import ViewHeadlineIcon from '@material-ui/icons/ViewHeadline';
import CategoryIcon from '@material-ui/icons/Category';
import MoneyIcon from '@material-ui/icons/Money';

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

function Parametros() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <div>
            <ListItem button onClick={handleClick}>
                <ListItemIcon>
                    < ViewHeadlineIcon />
                </ListItemIcon>
                <ListItemText primary="Parametros del Sistema" />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>

                    <ListItem component={Link} button to="/parametros/paises" className={classes.nested} >
                        <ListItemIcon>
                            <LanguageIcon />
                        </ListItemIcon>
                        <ListItemText primary="Paises" />
                    </ListItem>
                    <ListItem component={Link} button to="/parametros/regiones" className={classes.nested}>
                        <ListItemIcon>
                            <PublicIcon />
                        </ListItemIcon>
                        <ListItemText primary="Regiones" />
                    </ListItem>
                    <ListItem component={Link} button to="/parametros/departamentos" className={classes.nested}>
                        <ListItemIcon>
                            <ApartmentIcon />
                        </ListItemIcon>
                        <ListItemText primary="Departamentos" />
                    </ListItem>
                    <ListItem component={Link} button to="/parametros/ciudades" className={classes.nested}>
                        <ListItemIcon>
                            <NaturePeopleIcon />
                        </ListItemIcon>
                        <ListItemText primary="Ciudades" />
                    </ListItem>
                    <ListItem component={Link} button to="/parametros/estados" className={classes.nested}>
                        <ListItemIcon>
                            < PlaylistAddCheckIcon />
                        </ListItemIcon>
                        <ListItemText primary="Estados" />
                    </ListItem>
                    <ListItem component={Link} button to="/parametros/unidades" className={classes.nested}>
                        <ListItemIcon>
                            <CategoryIcon />
                        </ListItemIcon>
                        <ListItemText primary="Unidades de Medida" />
                    </ListItem>
                    <ListItem component={Link} button to="/parametros/monedas" className={classes.nested}>
                        <ListItemIcon>
                            <MoneyIcon />
                        </ListItemIcon>
                        <ListItemText primary="Tipos de Moneda" />
                    </ListItem>
                    <ListItem component={Link} button to="/parametros/empresa" className={classes.nested}>
                        <ListItemIcon>
                            <BusinessIcon />
                        </ListItemIcon>
                        <ListItemText primary="Empresa" />
                    </ListItem>
                </List>
            </Collapse>
        </div>

    );
}

export default Parametros;

/*
 <ListItem component={Link} button to="/parametros/paises" className={classes.nested} >
                        <ListItemIcon>
                            <LanguageIcon />
                        </ListItemIcon>
                        <ListItemText primary="Paises" />
                    </ListItem>

*/