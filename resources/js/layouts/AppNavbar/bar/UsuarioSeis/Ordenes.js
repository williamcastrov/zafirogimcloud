import React from "react";
import { Link } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import { List, ListItem, ListItemIcon, ListItemText, Collapse } from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import ViewHeadlineIcon from '@material-ui/icons/ViewHeadline';
import Divider from '@material-ui/core/Divider';
import SyncIcon from '@material-ui/icons/Sync';
import PermDataSettingIcon from '@material-ui/icons/PermDataSetting';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import ReceiptIcon from '@material-ui/icons/Receipt';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import FindInPageIcon from '@material-ui/icons/FindInPage';
import ReportIcon from '@material-ui/icons/Report';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import CategoryIcon from '@material-ui/icons/Category';
import EmailIcon from '@material-ui/icons/Email';

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
          <ListItem button className={classes.nested} onClick={handleClickGO} >
            <ListItemIcon>
              < PermDataSettingIcon />
            </ListItemIcon>
            <ListItemText primary="Gestión" />
            {openGO ? <ExpandLess /> : <ExpandMore />}
          </ListItem>

          <Collapse in={openGO} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem  component={Link} button to="/pdf/imprimirotcliente" className={classes.nested}>
                <ListItemIcon>
                  <ReceiptIcon />
                </ListItemIcon>
                <ListItemText primary="ImprimirOTCliente" />
              </ListItem>
              <ListItem  component={Link} button to="/email/enviaremailotcliente" className={classes.nested}>
                <ListItemIcon>
                  <EmailIcon />
                </ListItemIcon>
                <ListItemText primary="Enviar Email OT Cliente" />
              </ListItem>
            </List>
          </Collapse>
          <Divider />

          <ListItem button className={classes.nested} onClick={handleClickIN} >
            <ListItemIcon>
              < FindInPageIcon />
            </ListItemIcon>
            <ListItemText primary="Indicadores" />
            {openIN ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openIN} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <LocalShippingIcon />
                </ListItemIcon>
                <ListItemText primary="Generadas" />
              </ListItem>
            </List>
          </Collapse>

          <Divider />

          <ListItem button className={classes.nested} onClick={handleClickRP} >
            <ListItemIcon>
              < ReportIcon />
            </ListItemIcon>
            <ListItemText primary="Informes" />
            {openRP ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openRP} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <LocalShippingIcon />
                </ListItemIcon>
                <ListItemText primary="Correctivo" />
              </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <ReceiptIcon />
                </ListItemIcon>
                <ListItemText primary="Preventivo" />
              </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <ReceiptIcon />
                </ListItemIcon>
                <ListItemText primary="Predictivo" />
              </ListItem>
            </List>
          </Collapse>

        </List>
      </Collapse>
    </div>
  );
}

export default Ordenes;