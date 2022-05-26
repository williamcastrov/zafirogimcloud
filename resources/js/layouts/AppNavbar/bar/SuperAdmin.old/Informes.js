import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from 'react-router-dom';
import {ListSubheader, List, ListItem, ListItemIcon, ListItemText, Collapse } from "@material-ui/core";
import {ExpandLess, ExpandMore, StarBorder } from "@material-ui/icons";
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import ReorderIcon from '@material-ui/icons/Reorder';
import ListAltIcon from '@material-ui/icons/ListAlt';
import Divider from '@material-ui/core/Divider';

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

function Informes() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openOT, setOpenOT] = React.useState(false);
  const [openEQ, setOpenEQ] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleClickOT = () => {
    setOpenOT(!openOT);
  };

  const handleClickEQ = () => {
    setOpenEQ(!openEQ);
  };

  return (     
      <div>
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <FormatListNumberedIcon />
        </ListItemIcon>
        <ListItemText primary="Informes" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
   
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          
          <ListItem button className={classes.nested} button onClick={handleClickOT} >
            <ListItemIcon>
              <ReorderIcon />
            </ListItemIcon>
            <ListItemText primary="Flota Renta" />
            {openOT ? <ExpandLess /> : <ExpandMore />}  
          </ListItem>
          <Collapse in={openOT} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem component={Link} button to="/flotarenta/activosrenta" className={classes.nested} >
                <ListItemIcon>
                  <ReorderIcon />
                </ListItemIcon>
                <ListItemText primary="Activos en Renta" />
              </ListItem>
              <ListItem component={Link} button to="/flotarenta/informeseguros" className={classes.nested}>
                <ListItemIcon>
                  <ReorderIcon />
                </ListItemIcon>
                <ListItemText primary="Informe Seguros" />
              </ListItem>
            </List>
          </Collapse>

          <Divider />
          
          <ListItem button className={classes.nested} button onClick={handleClickEQ} >
            <ListItemIcon>
              < ListAltIcon />
            </ListItemIcon>
            <ListItemText primary="Informes MT" />
            {openEQ ? <ExpandLess /> : <ExpandMore />}  
          </ListItem>

          <Collapse in={openEQ} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem component={Link} button to="/activos/areas" className={classes.nested}>
                <ListItemIcon>
                  < ListAltIcon />
                </ListItemIcon>
                <ListItemText primary="Listar Información de la MT" />
              </ListItem>
              <ListItem component={Link} button to="/activos/areas" className={classes.nested} >
                <ListItemIcon>
                  < ListAltIcon />
                </ListItemIcon>
                <ListItemText primary="Listar Todas las MT" />
              </ListItem>
              <ListItem component={Link} button to="/activos/cencostos" className={classes.nested}>
                <ListItemIcon>
                  < ListAltIcon />
                </ListItemIcon>
                <ListItemText primary="Listar Todos los Accesorios" />
              </ListItem>
            </List>
          </Collapse>

        </List>
      
      
      
      
      </Collapse>
      </div>
  );
}

export default Informes;