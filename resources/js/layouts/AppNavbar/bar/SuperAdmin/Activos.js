import React from "react";
import {Link} from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import {ListSubheader, List, ListItem, ListItemIcon, ListItemText, Collapse } from "@material-ui/core";
import {ExpandLess, ExpandMore} from "@material-ui/icons";
import CenterFocusWeakIcon from '@material-ui/icons/CenterFocusWeak';
import StoreIcon from '@material-ui/icons/Store';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import VerticalAlignCenterIcon from '@material-ui/icons/VerticalAlignCenter';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import ViewHeadlineIcon from '@material-ui/icons/ViewHeadline';
import Divider from '@material-ui/core/Divider';
import CallMissedIcon from '@material-ui/icons/CallMissed';

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

function Activos() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openPA, setOpenPA] = React.useState(false);
  const [openGA, setOpenGA] = React.useState(false);
  const [openIF, setOpenIF] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleClickPA = () => {
    setOpenPA(!openPA);
  };

  const handleClickGA = () => {
    setOpenGA(!openGA);
  };

  const handleClickIF = () => {
    setOpenIF(!openIF);
  };


  return (     
      <div>
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <MonetizationOnIcon />
        </ListItemIcon>
        <ListItemText primary="Activos" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
   
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>    
          <Collapse in={openPA} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <StoreIcon />
                </ListItemIcon>
                <ListItemText primary="Bodegas" />
              </ListItem>
              <ListItem component={Link} button to="/activos/areas" className={classes.nested} >
                <ListItemIcon>
                  <VerticalAlignCenterIcon />
                </ListItemIcon>
                <ListItemText primary="Areas" />
              </ListItem>
              <ListItem component={Link} button to="/activos/cencostos" className={classes.nested}>
                <ListItemIcon>
                  <CenterFocusWeakIcon />
                </ListItemIcon>
                <ListItemText primary="Centros de costos" />
              </ListItem>
            </List>
          </Collapse>
          <Divider />
          
          <ListItem button className={classes.nested} onClick={handleClickGA} >
            <ListItemIcon>
              <MonetizationOnIcon />
            </ListItemIcon>
            <ListItemText primary="Gestión Activos" />
            {openGA ? <ExpandLess /> : <ExpandMore />}  
          </ListItem>
          <Collapse in={openGA} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem component={Link} button to="/activos/plandecuentas" className={classes.nested} >
                <ListItemIcon>
                  <StoreIcon />
                </ListItemIcon>
                <ListItemText primary="Plan de Cuentas" />
              </ListItem>
              <ListItem component={Link} button to="/activos/activos" className={classes.nested} >
                <ListItemIcon>
                  <LocalShippingIcon/>
                </ListItemIcon>
                <ListItemText primary="Activos" />
              </ListItem>
              <ListItem component={Link} button to="/activos/depreciacion" className={classes.nested} >
                <ListItemIcon>
                  <CallMissedIcon />
                </ListItemIcon>
                <ListItemText primary="Calcular Depreciación" />
              </ListItem>
            </List>
          </Collapse>
          <Divider />
          <ListItem button className={classes.nested} onClick={handleClickIF} >
            <ListItemIcon>
              <MonetizationOnIcon />
            </ListItemIcon>
            <ListItemText primary="Informes" />
            {openIF ? <ExpandLess /> : <ExpandMore />}  
          </ListItem>
          <Collapse in={openIF} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem component={Link} button to="/activos/exportardepreciacion" className={classes.nested} >
                <ListItemIcon>
                  <StoreIcon />
                </ListItemIcon>
                <ListItemText primary="Exportar Depreciación" />
              </ListItem>
              <ListItem component={Link} button to="" className={classes.nested} >
                <ListItemIcon>
                  <LocalShippingIcon/>
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

export default Activos;