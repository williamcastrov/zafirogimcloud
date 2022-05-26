import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from 'react-router-dom';
import { ListSubheader, List, ListItem, ListItemIcon, ListItemText, Collapse } from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import StoreIcon from '@material-ui/icons/Store';
import ViewHeadlineIcon from '@material-ui/icons/ViewHeadline';
import CategoryIcon from '@material-ui/icons/Category';
import Divider from '@material-ui/core/Divider';
import BusinessIcon from '@material-ui/icons/Business';
import ReorderIcon from '@material-ui/icons/Reorder';

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

function Almacenes() {
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
          <StoreIcon />
        </ListItemIcon>
        <ListItemText primary="Almacenes" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested} button onClick={handleClickPA} >
            <ListItemIcon>
              <ViewHeadlineIcon />
            </ListItemIcon>
            <ListItemText primary="Parametros Almacenes" />
            {openPA ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openPA} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem component={Link} button to="/almacenes/tiposalmacenes" className={classes.nested}>
                <ListItemIcon>
                  <StoreIcon />
                </ListItemIcon>
                <ListItemText primary="Tipos de Almacenes" />
              </ListItem>
              <ListItem component={Link} button to="/almacenes/lineasproductos" className={classes.nested}>
                <ListItemIcon>
                  <CategoryIcon />
                </ListItemIcon>
                <ListItemText primary="Lineas de Productos" />
              </ListItem>
              <ListItem component={Link} button to="/almacenes/crearalmacenes" className={classes.nested}>
                <ListItemIcon>
                  <ReorderIcon />
                </ListItemIcon>
                <ListItemText primary="Almacenes" />
              </ListItem>
            </List>
          </Collapse>
          <Divider />
          <ListItem button className={classes.nested} button onClick={handleClickGA} >
            <ListItemIcon>
              <ViewHeadlineIcon />
            </ListItemIcon>
            <ListItemText primary="Gestión de Almaceness" />
            {openGA ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openGA} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem component={Link} button to="/almacenes/inventarios" className={classes.nested}>
                <ListItemIcon>
                  <BusinessIcon />
                </ListItemIcon>
                <ListItemText primary="Inventarios" />
              </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <CategoryIcon />
                </ListItemIcon>
                <ListItemText primary="Sin Asignar" />
              </ListItem>
            </List>
          </Collapse>
        </List>
      </Collapse>
    </div>
  );
}

export default Almacenes;