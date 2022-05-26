import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Tabs, Tab, Typography, Box, Button } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import PeopleIcon from '@material-ui/icons/People';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

// Paginas 
import CrearOrdenes from "../../GestionOrdenes/CrearOrdenes";
import CumplirOrden from "../../GestionOrdenes/CumplirOrden";
import CumplirOrdenTecnico from "../../GestionOrdenes/CumplirOrden/CumplirOrdenTecnico";
import RevisarAprobarOT from "../../GestionOrdenes/RevisarAprobarOT";
import OrdenesVencidas from '../../ListadoOrdenes/OrdenesVencidas.js';
import OrdenesVencenHoy from '../../ListadoOrdenes/OrdenesVencenHoy.js';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function selectTab(index) {
  return {
    id: `wrapped-tab-${index}`,
    'aria-controls': `wrapped-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,

    backgroundColor: theme.palette.background.paper,
  },
  tabs: {
    backgroundColor: '#9e9e9e',
    borderBottom: '5px solid #212121',
    padding: theme.spacing(0),
    color: 'white',
    width: '100%',
  }
}));

function OrdenesTecnicos(props) {
  const { operario, idUsuario } = props;
  console.log("ID USUARIO : ", idUsuario)

  const classes = useStyles();
  const [value, setValue] = React.useState('1');
  const [listarUsuarios, setListUsuarios] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <div>
        <div className={classes.tabs} >
          <Tabs variant="fullWidth" value={value} onChange={handleChange} aria-label="wrapped label tabs example">
            <Tab value="2" label="Cumplimiento" {...selectTab('2')} icon={<ExitToAppIcon />} />
          </Tabs>
        </div>
        <TabPanel value={value} index="2">
          <CumplirOrdenTecnico operario={operario} idUsuario={idUsuario} />
        </TabPanel>
      </div>
    </div>
  );
}

export default OrdenesTecnicos;



