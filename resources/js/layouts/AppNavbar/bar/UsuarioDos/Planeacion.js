import React from "react";
import { Link } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import { ListSubheader, List, ListItem, ListItemIcon, ListItemText, Collapse } from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import ViewHeadlineIcon from '@material-ui/icons/ViewHeadline';
import CategoryIcon from '@material-ui/icons/Category';
import Divider from '@material-ui/core/Divider';
import SyncIcon from '@material-ui/icons/Sync';
import PermDataSettingIcon from '@material-ui/icons/PermDataSetting';
import ReceiptIcon from '@material-ui/icons/Receipt';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import FindInPageIcon from '@material-ui/icons/FindInPage';
import ReportIcon from '@material-ui/icons/Report';
import CropLandscapeIcon from '@material-ui/icons/CropLandscape';

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

function Planeacion() {
  const classes = useStyles();
  const [open,    setOpen]    = React.useState(false);
  const [openPO,  setOpenPO]  = React.useState(false);
  const [openGO,  setOpenGO]  = React.useState(false);
  const [openIN,  setOpenIN]  = React.useState(false);
  const [openRP,  setOpenRP]  = React.useState(false);

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
          <CropLandscapeIcon />
        </ListItemIcon>
        <ListItemText primary="Planeación" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>

          <ListItem button className={classes.nested} button onClick={handleClickPO} >
            <ListItemIcon>
              <ViewHeadlineIcon />
            </ListItemIcon>
            <ListItemText primary="Parametros" />
            {openPO ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openPO} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <SyncIcon />
                </ListItemIcon>
                <ListItemText primary="Por Asignar" />
              </ListItem>
            </List>
          </Collapse>
          <Divider />

          <ListItem button className={classes.nested} button onClick={handleClickGO} >
            <ListItemIcon>
              < PermDataSettingIcon />
            </ListItemIcon>
            <ListItemText primary="Planificación" />
            {openGO ? <ExpandLess /> : <ExpandMore />}
          </ListItem>

          <Collapse in={openGO} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
            <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <LocalShippingIcon  />
                </ListItemIcon>
                <ListItemText primary="Pendiente por Asignar" />
              </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <ReceiptIcon />
                </ListItemIcon>
                <ListItemText primary="Pendiente por Asignar" />
              </ListItem>
            </List>
          </Collapse>
          <Divider />

          <ListItem button className={classes.nested} button onClick={handleClickIN} >
            <ListItemIcon>
              < FindInPageIcon />
            </ListItemIcon>
            <ListItemText primary="Programación" />
            {openIN ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openIN} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <LocalShippingIcon  />
                </ListItemIcon>
                <ListItemText primary="Por Asignar" />
              </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <LocalShippingIcon  />
                </ListItemIcon>
                <ListItemText primary="Por Asignar" />
              </ListItem>
            </List>
          </Collapse>
          <Divider />

          <ListItem button className={classes.nested} button onClick={handleClickRP} >
            <ListItemIcon>
              < ReportIcon />
            </ListItemIcon>
            <ListItemText primary="Gantt" />
            {openRP ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openRP} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
            <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <LocalShippingIcon  />
                </ListItemIcon>
                <ListItemText primary="Por Asignar" />
              </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <ReceiptIcon />
                </ListItemIcon>
                <ListItemText primary="Por Asignar" />
              </ListItem>
            </List>
          </Collapse>

        </List>
      </Collapse>
    </div>
  );
}

export default Planeacion;