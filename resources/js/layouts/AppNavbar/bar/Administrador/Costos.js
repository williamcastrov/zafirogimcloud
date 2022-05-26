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
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import GetAppIcon from '@material-ui/icons/GetApp';

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

function Costos() {
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
        <ListItemText primary="Costos" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
   
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          
          <ListItem button className={classes.nested} onClick={handleClickPA} >
            <ListItemIcon>
              <ViewHeadlineIcon />
            </ListItemIcon>
            <ListItemText primary="Parametros Costos" />
            {openPA ? <ExpandLess /> : <ExpandMore />}
          </ListItem>

          <Collapse in={openPA} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
            <ListItem component={Link} button to="/costos/tipocostovariable" className={classes.nested}>
                <ListItemIcon>
                  <StoreIcon />
                </ListItemIcon>
                <ListItemText primary="Datos Base Costos" />
              </ListItem>
              <ListItem component={Link} button to="/costos/costosvariables" className={classes.nested}>
                <ListItemIcon>
                  <StoreIcon />
                </ListItemIcon>
                <ListItemText primary="Datos Base x Periodo" />
              </ListItem>

            </List>
          </Collapse>
          <Divider />
          
          <ListItem button className={classes.nested}  onClick={handleClickIF} >
            <ListItemIcon>
              <ViewHeadlineIcon />
            </ListItemIcon>
            <ListItemText primary="Informes Costos" />
            {openIF ? <ExpandLess /> : <ExpandMore />}  
          </ListItem>
          <Collapse in={openIF} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem component={Link} button to="/costos/costorealperiodo" className={classes.nested} >
                <ListItemIcon>
                  <ViewHeadlineIcon />
                </ListItemIcon>
                <ListItemText primary="Informe Costo Real" />
              </ListItem>
              <ListItem component={Link} button to="/costos/costorealequipoacumulado" className={classes.nested} >
                <ListItemIcon>
                  <ViewHeadlineIcon />
                </ListItemIcon>
                <ListItemText primary="Informe Costo Acumulado x Equipo" />
              </ListItem>
              <ListItem component={Link} button to="/costos/consumosrepuestos" className={classes.nested} >
                <ListItemIcon>
                  <ViewHeadlineIcon />
                </ListItemIcon>
                <ListItemText primary="Consumos Repuestos" />
              </ListItem>
              <ListItem component={Link} button to="/costos/contrataciones" className={classes.nested} >
                <ListItemIcon>
                  <ViewHeadlineIcon />
                </ListItemIcon>
                <ListItemText primary="Costos Contrataciones" />
              </ListItem>
              
            </List>
          </Collapse>
        </List>
      </Collapse>
      </div>
  );
}

export default Costos;