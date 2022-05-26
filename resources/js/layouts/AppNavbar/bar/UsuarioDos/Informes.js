import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from 'react-router-dom';
import {ListSubheader, List, ListItem, ListItemIcon, ListItemText, Collapse } from "@material-ui/core";
import {ExpandLess, ExpandMore, StarBorder } from "@material-ui/icons";
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import AssessmentIcon from '@material-ui/icons/Assessment';

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

  const handleClick = () => {
    setOpen(!open);
  };

  return (     
      <div>
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <VerifiedUserIcon />
        </ListItemIcon>
        <ListItemText primary="Informes" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>

   
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem component={Link} button to="/informes/clientes" className={classes.nested}>
            <ListItemIcon>
              <AssessmentIcon />
            </ListItemIcon>
            <ListItemText primary="Activos en Renta" />
          </ListItem>
          <ListItem component={Link} button to="/pdf/PrincipalPDF" className={classes.nested}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Generar PDF" />
          </ListItem>
          <ListItem component={Link} button className={classes.nested}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Montacargas" />
          </ListItem>
          
        </List>
      </Collapse>
      </div>
   
  );
}

export default Informes;