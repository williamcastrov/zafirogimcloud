import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Tabs, Tab, Typography, Box, Button } from '@material-ui/core';
import Ordenes from "./Ordenes";
import OrdenesTecnicos from './OrdenesTecnicos';
import firebase from "../../../server/firebase";
import "firebase/auth";

import usuariosServices from "../../../services/Usuarios";


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

function LeeUsuarioOrdenes() {
  const classes = useStyles();
  const [value, setValue] = React.useState('1');
  const [listarUsuarios, setListUsuarios] = useState([]);
  const [operario, setOperario] = useState(false);
  const [tipooperario, setTipoOperario] = useState(0);
  const [idUsuario, setIdUsuario] = useState(0);
  const [metadata, setMetadata] = useState("");
  const [user, setUser] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  firebase.auth().onAuthStateChanged(currentUser => {
    if (currentUser) {
      setMetadata(currentUser.metadata.a);
      //console.log("CURRENT USER : ", metadata);
      setUser(true);
    } else {
      setUser(false);
    }
  });

  useEffect(() => {
    async function fetchDataUsuarios() {
      const res = await usuariosServices.leerUsuario(metadata);
      setListUsuarios(res.data);
      //console.log("DATOS DEL USUARIO : ", res.data[0].id_usu)
      setIdUsuario(res.data[0].id_usu);
      
      if (res.data[0].tipo_usu === 11) {
        setOperario(true)
        setTipoOperario(1)
      }
      else {
        if (res.data[0].tipo_usu === 13 || res.data[0].tipo_usu === 10){
          setOperario(false)
          setTipoOperario(2)
        }
        else
        {
          setOperario(true)
          setTipoOperario(3)
        }
      }
      //console.log("INFORMACION DEL USUARIO : ", res.data[0].tipo_usu)
    }
    fetchDataUsuarios();
  }, [user])

  return (
    <div className={classes.root}>
      {
        tipooperario === 1 ?
        <OrdenesTecnicos operario={operario} idUsuario={idUsuario} />
        :
        <Ordenes operario={operario} idUsuario={idUsuario} />
      }
    </div>
  );
}

export default LeeUsuarioOrdenes;



