import React from "react";
import { Link } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import { ListSubheader, List, ListItem, ListItemIcon, ListItemText, Collapse } from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import CenterFocusWeakIcon from '@material-ui/icons/CenterFocusWeak';
import BuildIcon from '@material-ui/icons/Build';
import ViewHeadlineIcon from '@material-ui/icons/ViewHeadline';
import CategoryIcon from '@material-ui/icons/Category';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Divider from '@material-ui/core/Divider';
import SyncIcon from '@material-ui/icons/Sync';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import PermDataSettingIcon from '@material-ui/icons/PermDataSetting';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import DonutSmallIcon from '@material-ui/icons/DonutSmall';
import CommuteIcon from '@material-ui/icons/Commute';
import CalendarViewDayIcon from '@material-ui/icons/CalendarViewDay';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import PrintIcon from '@material-ui/icons/Print';
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

function Mantenimiento() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openGA, setOpenGA] = React.useState(false);
  const [openGM, setOpenGM] = React.useState(false);
  const [openIM, setOpenIM] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleClickGA = () => {
    setOpenGA(!openGA);
  };

  const handleClickGM = () => {
    setOpenGM(!openGM);
  };

  const handleClickIM = () => {
    setOpenIM(!openIM);
  };

  return (
    <div>
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <BuildIcon />
        </ListItemIcon>
        <ListItemText primary="Mantenimiento" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>

          <ListItem button className={classes.nested} onClick={handleClickGA} >
            <ListItemIcon>
              <ViewHeadlineIcon />
            </ListItemIcon>
            <ListItemText primary="Parametros Mantenimiento" />
            {openGA ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openGA} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem component={Link} button to="/mantenimiento/estadosclientes" className={classes.nested}>
                <ListItemIcon>
                  <CenterFocusWeakIcon />
                </ListItemIcon>
                <ListItemText primary="Estados Clientes" />
              </ListItem>
              <ListItem component={Link} button to="/mantenimiento/estadosmtto" className={classes.nested}>
                <ListItemIcon>
                  <CenterFocusWeakIcon />
                </ListItemIcon>
                <ListItemText primary="Estados Mantenimiento" />
              </ListItem>
              <ListItem component={Link} button to="/mantenimiento/estadoscalidad" className={classes.nested}>
                <ListItemIcon>
                  <CenterFocusWeakIcon />
                </ListItemIcon>
                <ListItemText primary="Estados de Calidad" />
              </ListItem>
              <ListItem component={Link} button to="/mantenimiento/gruposequipos" className={classes.nested}>
                <ListItemIcon>
                  <CategoryIcon />
                </ListItemIcon>
                <ListItemText primary="Grupos de Equipos" />
              </ListItem>
              <ListItem component={Link} button to="/mantenimiento/subgrupospartes" className={classes.nested}>
                <ListItemIcon>
                  <CategoryIcon />
                </ListItemIcon>
                <ListItemText primary="SubGrupos de Partes" />
              </ListItem>
              <ListItem component={Link} button to="/mantenimiento/frecuencias" className={classes.nested}>
                <ListItemIcon>
                  <SyncIcon />
                </ListItemIcon>
                <ListItemText primary="Frecuencia" />
              </ListItem>
              <ListItem component={Link} button to="/mantenimiento/tipogarantia" className={classes.nested}>
                <ListItemIcon>
                  <SettingsApplicationsIcon />
                </ListItemIcon>
                <ListItemText primary="Tipos de Garantias" />
              </ListItem>
              <ListItem component={Link} button to="/mantenimiento/tiposllantas" className={classes.nested}>
                <ListItemIcon>
                  <DonutSmallIcon />
                </ListItemIcon>
                <ListItemText primary="Tipos de Ruedas" />
              </ListItem>
              <ListItem component={Link} button to="/mantenimiento/tiposequipos" className={classes.nested}>
                <ListItemIcon>
                  <SettingsApplicationsIcon />
                </ListItemIcon>
                <ListItemText primary="Tipos de Equipos" />
              </ListItem>
              <ListItem component={Link} button to="/mantenimiento/marcas" className={classes.nested}>
                <ListItemIcon>
                  <CommuteIcon />
                </ListItemIcon>
                <ListItemText primary="Marcas de Equipos" />
              </ListItem>
              <ListItem component={Link} button to="/mantenimiento/clasificacionABC" className={classes.nested}>
                <ListItemIcon>
                  <StarBorderIcon />
                </ListItemIcon>
                <ListItemText primary="Clasificación ABC" />
              </ListItem>
              <ListItem component={Link} button to="/mantenimiento/tiposfallas" className={classes.nested}>
                <ListItemIcon>
                  <StarBorderIcon />
                </ListItemIcon>
                <ListItemText primary="Tipos de Fallas" />
              </ListItem>
              <ListItem component={Link} button to="/mantenimiento/fallasmtto" className={classes.nested}>
                <ListItemIcon>
                  <StarBorderIcon />
                </ListItemIcon>
                <ListItemText primary="Fallas Mantenimiento" />
              </ListItem>
            </List>
          </Collapse>
          <Divider />

          <ListItem button className={classes.nested} onClick={handleClickGM} >
            <ListItemIcon>
              < PermDataSettingIcon />
            </ListItemIcon>
            <ListItemText primary="Gestión Mantenimiento" />
            {openGM ? <ExpandLess /> : <ExpandMore />}
          </ListItem>

          <Collapse in={openGM} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem component={Link} button to="/mantenimiento/equipos" className={classes.nested}>
                <ListItemIcon>
                  <LocalShippingIcon />
                </ListItemIcon>
                <ListItemText primary="Equipos" />
              </ListItem>
              <ListItem component={Link} button to="/mantenimiento/accesorios" className={classes.nested}>
                <ListItemIcon>
                  <CategoryIcon />
                </ListItemIcon>
                <ListItemText primary="Accesorios" />
              </ListItem>
              <ListItem component={Link} button to="/mantenimiento/usuariosequipos" className={classes.nested}>
                <ListItemIcon>
                  <CategoryIcon />
                </ListItemIcon>
                <ListItemText primary="Equipos por proveedor" />
              </ListItem>
              <ListItem component={Link} button to="/mantenimiento/bajasequiposhistoricos" className={classes.nested}>
                <ListItemIcon>
                  <CategoryIcon />
                </ListItemIcon>
                <ListItemText primary="Bajas Historicos" />
              </ListItem>
              <ListItem component={Link} button to="/mantenimiento/datoshorometro" className={classes.nested}>
                <ListItemIcon>
                  <GetAppIcon />
                </ListItemIcon>
                <ListItemText primary="Control Valor Horometro" />
              </ListItem>
             {/* <ListItem component={Link} button to="/mantenimiento/remisiones" className={classes.nested}>
                <ListItemIcon>
                  <CalendarViewDayIcon />
                </ListItemIcon>
                <ListItemText primary="Crear Remision" />
              </ListItem>
              */}
              <ListItem component={Link} button to="/mantenimiento/cambioelementos" className={classes.nested}>
                <ListItemIcon>
                  <CalendarViewDayIcon />
                </ListItemIcon>
                <ListItemText primary="Crear Carta Cambios" />
              </ListItem>
              <ListItem component={Link} button to="/mantenimiento/contrataciones" className={classes.nested}>
                <ListItemIcon>
                  <CalendarViewDayIcon />
                </ListItemIcon>
                <ListItemText primary="Contrataciones" />
              </ListItem>
              {/* 
              <ListItem component={Link} button to="/mantenimiento/incrementocanon" className={classes.nested}>
                <ListItemIcon>
                  <CalendarViewDayIcon />
                </ListItemIcon>
                <ListItemText primary="Incremento Canon" />
              </ListItem>
              */}
              <ListItem component={Link} button to="/mantenimiento/repuestos" className={classes.nested}>
                <ListItemIcon>
                  <CalendarViewDayIcon />
                </ListItemIcon>
                <ListItemText primary="Consumos Repuestos" />
              </ListItem>
            </List>
          </Collapse>

          <Divider />
          <ListItem button className={classes.nested} onClick={handleClickIM} >
            <ListItemIcon>
              < PrintIcon />
            </ListItemIcon>
            <ListItemText primary="Impresiones Mantenimiento" />
            {openIM ? <ExpandLess /> : <ExpandMore />}
          </ListItem>

          <Collapse in={openIM} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {/*
              <ListItem component={Link} button to="/pdf/imprimirremision" className={classes.nested}>
                <ListItemIcon>
                  <PictureAsPdfIcon />
                </ListItemIcon>
                <ListItemText primary="Imprimir Remisión" />
              </ListItem>
             */}
              <ListItem component={Link} button to="/pdf/imprimircambioelemento" className={classes.nested}>
                <ListItemIcon>
                  <PictureAsPdfIcon />
                </ListItemIcon>
                <ListItemText primary="Imprimir Carta Cambios" />
              </ListItem>
              <ListItem component={Link} button to="/pdf/imprimirincrementocanon" className={classes.nested}>
                <ListItemIcon>
                  <PictureAsPdfIcon />
                </ListItemIcon>
                <ListItemText primary="Imprimir Carta Alza" />
              </ListItem>
            </List>
          </Collapse>

        </List>
      </Collapse>
    </div>
  );
}

export default Mantenimiento;