import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from 'react-router-dom';
import { ListSubheader, List, ListItem, ListItemIcon, ListItemText, Collapse } from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import ViewHeadlineIcon from '@material-ui/icons/ViewHeadline';
import Divider from '@material-ui/core/Divider';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ReceiptIcon from '@material-ui/icons/Receipt';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import LibraryAddCheckIcon from '@material-ui/icons/LibraryAddCheck';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';

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

function ListaChequeo() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openPA, setOpenPA] = React.useState(false);
  const [openGA, setOpenGA] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleClickPA = () => {
    setOpenPA(!openPA);
  };

  const handleClickGA = () => {
    setOpenGA(!openGA);
  };

  return (
    <div>
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <PlaylistAddCheckIcon />
        </ListItemIcon>
        <ListItemText primary="Lista de Chequeo" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested} button onClick={handleClickPA} >
            <ListItemIcon>
              <ViewHeadlineIcon />
            </ListItemIcon>
            <ListItemText primary="Parametros de Chequeo" />
            {openPA ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openPA} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem component={Link} button to="/listachequeo/entregaequipos" className={classes.nested}>
                <ListItemIcon>
                  <ArrowBackIcon/>
                </ListItemIcon>
                <ListItemText primary="Actividades de Entrega" />
              </ListItem>
              <ListItem component={Link} button to="/listachequeo/recepcionequipos" className={classes.nested}>
                <ListItemIcon>
                  <ArrowForwardIcon />
                </ListItemIcon>
                <ListItemText primary="Actividades de Recepción" />
              </ListItem>
            </List>
          </Collapse>
          <Divider />
          <ListItem button className={classes.nested} button onClick={handleClickGA} >
            <ListItemIcon>
              <LibraryAddCheckIcon />
            </ListItemIcon>
            <ListItemText primary="Gestionar E/S Equipos" />
            {openGA ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openGA} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem component={Link} button to="/listachequeo/panellistachequeo" className={classes.nested}>
                <ListItemIcon>
                  <AddBoxOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Crear/Listar/Modificar" />
              </ListItem>
              <ListItem  component={Link} button to="/pdf/imprimirotchequeo" className={classes.nested}>
                <ListItemIcon>
                  <ReceiptIcon />
                </ListItemIcon>
                <ListItemText primary="Imprimir/Descargar" />
              </ListItem>
            </List>
          </Collapse>
        </List>
      </Collapse>
    </div>
  );
}

export default ListaChequeo;