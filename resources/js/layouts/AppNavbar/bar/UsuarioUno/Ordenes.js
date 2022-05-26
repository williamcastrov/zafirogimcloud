import React from "react";
import { Link } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import { List, ListItem, ListItemIcon, ListItemText, Collapse } from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import PermDataSettingIcon from '@material-ui/icons/PermDataSetting';
import ReceiptIcon from '@material-ui/icons/Receipt';
import BorderColorIcon from '@material-ui/icons/BorderColor';
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

function Ordenes() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openPO, setOpenPO] = React.useState(false);
  const [openGO, setOpenGO] = React.useState(false);
  const [openIN, setOpenIN] = React.useState(false);
  const [openRP, setOpenRP] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleClickPO = () => {
    setOpenPO(!openPO);
  };

  const handleClickGO = () => {
    setOpenGO(!openGO);
  };

  const handleClickIN = () => {
    setOpenIN(!openIN);
  };

  const handleClickRP = () => {
    setOpenRP(!openRP);
  };


  return (
    <div>
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <BorderColorIcon />
        </ListItemIcon>
        <ListItemText primary="Ordenes de Trabajo" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>

          <ListItem button className={classes.nested} button onClick={handleClickGO} >
            <ListItemIcon>
              < PermDataSettingIcon />
            </ListItemIcon>
            <ListItemText primary="Gestión" />
            {openGO ? <ExpandLess /> : <ExpandMore />}
          </ListItem>

          <Collapse in={openGO} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem component={Link} button to="/gestionordenes/ordenes" className={classes.nested}>
                <ListItemIcon>
                  <AddBoxOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Crear/Listar/Modificar" />
              </ListItem>
              <ListItem  component={Link} button to="/pdf/imprimirotcliente" className={classes.nested}>
                <ListItemIcon>
                  <ReceiptIcon />
                </ListItemIcon>
                <ListItemText primary="ImprimirOTCliente" />
              </ListItem>
            </List>
          </Collapse>
        </List>
      </Collapse>
    </div>
  );
}

export default Ordenes;