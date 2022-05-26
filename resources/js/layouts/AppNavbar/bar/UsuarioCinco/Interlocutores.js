import React from "react";
import {Link} from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import {ListSubheader, List, ListItem, ListItemIcon, ListItemText, Collapse } from "@material-ui/core";
import {ExpandLess, ExpandMore} from "@material-ui/icons";
import PeopleIcon from '@material-ui/icons/People';
import SettingsBackupRestoreIcon from '@material-ui/icons/SettingsBackupRestore';
import ContactsIcon from '@material-ui/icons/Contacts';
import RecentActorsIcon from '@material-ui/icons/RecentActors';
import DialerSipIcon from '@material-ui/icons/DialerSip';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import ViewHeadlineIcon from '@material-ui/icons/ViewHeadline';
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

function Interlocutores() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openPI, setOpenPI] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleClickPI = () => {
    setOpenPI(!openPI);
  };

  return (     
      <div>
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <RecentActorsIcon />
        </ListItemIcon>
        <ListItemText primary="Interlocutores" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
   
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested} button onClick={handleClickPI} >
            <ListItemIcon>
              <ViewHeadlineIcon />
            </ListItemIcon>
            <ListItemText primary="Parametros Interlocutores" />
            {openPI ? <ExpandLess /> : <ExpandMore />}  
          </ListItem>
          <Collapse in={openPI} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>  
              <ListItem component={Link} button to="/interlocutores/tipointerlocutores" className={classes.nested}>
                <ListItemIcon>
                  <DialerSipIcon />
                </ListItemIcon>
                <ListItemText primary="Tipo de Interlocutores" />
              </ListItem>
              <ListItem component={Link} button to="/interlocutores/especialidades" className={classes.nested}>
                <ListItemIcon>
                  <AssignmentIndIcon />
                </ListItemIcon>
                <ListItemText primary="Especialidades" />
              </ListItem>
            </List>
          </Collapse>
          <Divider />
          <ListItem component={Link} button to="/interlocutores/proveedores" className={classes.nested}>
            <ListItemIcon>
              <SettingsBackupRestoreIcon />
            </ListItemIcon>
            <ListItemText primary="Proveedores" />
          </ListItem>
          <Divider />
          <ListItem component={Link} button to="/interlocutores/clientes" className={classes.nested} >
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Clientes" />
          </ListItem>
          <Divider />                        
          <ListItem component={Link} button to="/interlocutores/empleados" className={classes.nested}>
            <ListItemIcon>
              <ContactsIcon />
            </ListItemIcon>
            <ListItemText primary="Empleados" />
          </ListItem>  
          <ListItem component={Link} button to="/interlocutores/contactos" className={classes.nested}>
            <ListItemIcon>
              <ContactsIcon />
            </ListItemIcon>
            <ListItemText primary="Contactos" />
          </ListItem>  
        </List>
      </Collapse>
      </div>
  );
}

export default Interlocutores;