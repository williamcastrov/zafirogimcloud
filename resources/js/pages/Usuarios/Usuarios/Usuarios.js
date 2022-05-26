import React, { useEffect, useState } from "react";
import axios from "axios";
import MaterialTable from "material-table";
import { Modal, TextField, Button, Select, MenuItem, FormControl, InputLabel, Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import swal from 'sweetalert';
import Moment from 'moment';
import SaveIcon from '@material-ui/icons/Save';
import firebase from "../../../server/firebase";
import "firebase/auth";

import usuariosServices from "../../../services/Usuarios";
import paisServices from "../../../services/Parameters/Paises";
import ciudadServices from "../../../services/Parameters/Ciudades";
import estadosServices from "../../../services/Parameters/Estados";
import unidadesServices from "../../../services/Parameters/Unidades";

const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: 600,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  iconos: {
    cursor: 'pointer'
  },
  inputMaterial: {
    width: '100%'
  },
  formControl: {
    margin: theme.spacing(0),
    minWidth: 250,
    maxWidth: 250,
  },
  typography: {
    fontSize: 16,
    color   : "#ff3d00"
  }
}));

function Usuarios() {
  const styles = useStyles();
  const [listarUsuarios, setListUsuarios] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar]     = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [formError, setFormError]         = useState(false);
  const [listarPaises, setListarPaises]   = useState([]);

  const [listarCiudades, setListarCiudades] = useState([]);
  const [listarEstados, setListarEstados] = useState([]);
  const fechaactual = Moment(new Date()).format('YYYY-MM-DD');
  const [actualiza, setActualiza] = useState(false);
  const [listarUnidades, setListarUnidades] = useState([]);
  const [grabar, setGrabar] = useState(false);
  const [email, setEmail] = useState('');
  const [uid, setUid] = useState('');

  const [usuariosSeleccionado, setUsuarioSeleccionado] = useState({
      'cedula_usu': "",
	    'nombre_usu': "",
	    'email_usu' : email,
	    'pais_usu'  : "",
	    'ciudad_usu': "",
	    'uidfirebase_usu': uid,
	    'tipo_usu': "",
	    'foto_usu': "",
	    'celular_usu': "", 
	    'estado_usu': ""
  })

  useEffect(() => {
    firebase.auth().onAuthStateChanged(currentUser => {
        if (currentUser) {
            setEmail(currentUser.email);
            setUid(currentUser.metadata.a);
        }
    }) 
  }, [])

  useEffect(() => {
    async function fetchDataUsuarios() {
      const res = await usuariosServices.listUsuarios();
      setListUsuarios(res.data);
    }
    setActualiza(false);
    fetchDataUsuarios();
  }, [actualiza])
  
  useEffect(() => {
    async function fetchDataUnidades() {
      const res = await unidadesServices.listTipousuarios();
      setListarUnidades(res.data)
      console.log(res.data);
    }
    fetchDataUnidades();
  }, [])

  useEffect (() => {
    async function fetchDataEstados() {
    const res = await estadosServices.listEstadosGenerales();
    setListarEstados(res.data) 
    //console.log(res.data);
  }
  fetchDataEstados();
  }, [])

  useEffect(() => {
    async function fetchDataPais() {
      const res = await paisServices.listPaises();
      //console.log(res.data);
      setListarPaises(res.data)
      //console.log(listarPaises);
    }
    fetchDataPais();
  }, [])

  useEffect(() => {
    async function fetchDataCiudad() {
      const res = await ciudadServices.listCiudades();
      setListarCiudades(res.data)
      //console.log(res.data);
    }
    fetchDataCiudad();
  }, [])

  const handleChange = e => {
    const { name, value } = e.target;

    setUsuarioSeleccionado(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const seleccionarUsuario = (usuario, caso) => {
    setUsuarioSeleccionado(usuario);
    (caso === "Editar") ? abrirCerrarModalEditar() : abrirCerrarModalEliminar()
  }

  const abrirCerrarModalInsertar = () => {
    setModalInsertar(!modalInsertar);
  }

  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
  }

  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
  }

  const grabarUsuario = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;

    setGrabar(true);

    if (!usuariosSeleccionado.cedula_usu) {
      errors.cedula_usu = true;
      formOk = false;
    }

    if (!usuariosSeleccionado.nombre_usu) {
      errors.nombre_usu = true;
      formOk = false;
    }
/*
    if (!usuariosSeleccionado.email_usu) {
      errors.email_usu = true;
      formOk = false;
    }
*/
    if (!usuariosSeleccionado.pais_usu) {
      errors.pais_usu = true;
      formOk = false;
    }

    if (!usuariosSeleccionado.ciudad_usu) {
      errors.ciudad_usu = true;
      formOk = false;
    }
/*
    if (!usuariosSeleccionado.uidfirebase_usu) {
      errors.uidfirebase_usu = true;
      formOk = false;
    }
*/
    if (!usuariosSeleccionado.tipo_usu) {
      errors.tipo_usu = true;
      formOk = false;
    }

    if (!usuariosSeleccionado.celular_usu) {
      errors.celular_usu = true;
      formOk = false;
    }

    if (!usuariosSeleccionado.estado_usu) {
      errors.estado_usu = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
      const res = await usuariosServices.save(usuariosSeleccionado);

      if (res.success) {
       swal({
          title: "Usuario",
          text: "Creado de forma Correcta!",
          icon: "success",
          button: "Aceptar"
        });
        console.log(res.message)
        abrirCerrarModalInsertar();
        delete usuariosSeleccionado.id_usu;
        delete usuariosSeleccionado.cedula_usu;
	      delete usuariosSeleccionado.nombre_usu;
	      delete usuariosSeleccionado.email_usu;
	      delete usuariosSeleccionado.pais_usu;
	      delete usuariosSeleccionado.ciudad_usu;
	      delete usuariosSeleccionado.uidfirebase_usu;
	      delete usuariosSeleccionado.tipo_usu;
	      delete usuariosSeleccionado.foto_usu;
	      delete usuariosSeleccionado.celular_usu; 
	      delete usuariosSeleccionado.estado_usu; 
      } else {
        swal({
          title: "Usuario",
          text: "Error Creando el Usuario!",
          icon: "error",
          button: "Aceptar"
        });
        console.log(res.message);
        abrirCerrarModalInsertar();
      }
    }
    else {
      swal({
        title: "Usuario",
        text: "Debe Ingresar Todos los Datos, Error Creando el Usuario!",
        icon: "warning",
        button: "Aceptar"
      });
      console.log(usuariosSeleccionado)
      console.log(res.message);
      abrirCerrarModalInsertar();
    }
    setActualiza(true);
  }

  const actualizarUsuario = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;

    if (!usuariosSeleccionado.cedula_usu) {
      errors.cedula_usu = true;
      formOk = false;
    }

    if (!usuariosSeleccionado.nombre_usu) {
      errors.nombre_usu = true;
      formOk = false;
    }

    if (!usuariosSeleccionado.email_usu) {
      errors.email_usu = true;
      formOk = false;
    }

    if (!usuariosSeleccionado.pais_usu) {
      errors.pais_usu = true;
      formOk = false;
    }

    if (!usuariosSeleccionado.ciudad_usu) {
      errors.ciudad_usu = true;
      formOk = false;
    }

    if (!usuariosSeleccionado.uidfirebase_usu) {
      errors.uidfirebase_usu = true;
      formOk = false;
    }

    if (!usuariosSeleccionado.tipo_usu) {
      errors.tipo_usu = true;
      formOk = false;
    }

    if (!usuariosSeleccionado.celular_usu) {
      errors.celular_usu = true;
      formOk = false;
    }

    if (!usuariosSeleccionado.estado_usu) {
      errors.estado_usu = true;
      formOk = false;
    }
    
    setFormError(errors);

    if (formOk) {
      const res = await usuariosServices.update(usuariosSeleccionado);

      if (res.success) {
        swal({
          title: "Usuario",
          text: "Actualizado de forma Correcta!",
          icon: "success",
          button: "Aceptar"
        });
        console.log(res.message)
        abrirCerrarModalEditar();
        delete usuariosSeleccionado.id_usu;
        delete usuariosSeleccionado.cedula_usu;
	      delete usuariosSeleccionado.nombre_usu;
	      delete usuariosSeleccionado.email_usu;
	      delete usuariosSeleccionado.pais_usu;
	      delete usuariosSeleccionado.ciudad_usu;
	      delete usuariosSeleccionado.uidfirebase_usu;
	      delete usuariosSeleccionado.tipo_usu;
	      delete usuariosSeleccionado.foto_usu;
	      delete usuariosSeleccionado.celular_usu; 
	      delete usuariosSeleccionado.estado_usu; 
      } else {
        swal({
          title: "Usuario",
          text: "Error Actualizando el Usuario!",
          icon: "error",
          button: "Aceptar"
        });
        console.log(res.message);
        abrirCerrarModalEditar();
      }
    }
    else {;
      swal({
        title: "Usuario",
        text: "Debe Ingresar Todos los Datos, Error Actualizando el Usuario!",
        icon: "warning",
        button: "Aceptar"
      });
      console.log(res.message);
      abrirCerrarModalEditar();
    }
    setActualiza(true);
  }

  const borrarUsuario = async () => {

    const res = await usuariosServices.delete(usuariosSeleccionado.id_usu);

    if (res.success) {
      swal({
        title: "Usuario",
        text: "Borrada de forma Correcta!",
        icon: "success",
        button: "Aceptar"
      });
      console.log(res.message)
      abrirCerrarModalEliminar();
    }
    else {
      swal({
        title: "Usuario",
        text: "Error Borrando el Usuario!",
        icon: "error",
        button: "Aceptar"
      });
      console.log(res.message);
      abrirCerrarModalEliminar();
    }
    setActualiza(true);
  }

  const columnas = [
    {
      title: 'Cedula',
      field: 'cedula_usu'
    },
    {
      title: 'Nombre',
      field: 'nombre_usu'
    },
    {
      title: 'Email',
      field: 'email_usu'
    },
    {
      title: 'Ciudad',
      field: 'nombre_ciu'
    },
    {
      title: 'Tipo Usuario',
      field: 'descripcion_und',
      cellStyle: { minWidth: 300 }
    },
    {
      title: 'Celular',
      field: 'celular_usu'
    },
    {
      title: 'Estado',
      field: 'nombre_est'
    }
  ]

  const usuarioInsertar = (
    <div className={styles.modal}>
      <Typography  align="center" className={ styles.typography } variant="button" display="block" >
        Agregar Nuevo Usuario
      </Typography>
      <Grid container spacing={2} >
        <Grid item xs={12} md={6}>
          <TextField className={styles.inputMaterial} name="email_usu" label="Email"  defaultValue={email}
           fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField className={styles.inputMaterial} label="ID Interno" name="uidfirebase_usu" fullWidth 
            defaultValue={uid} onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField className={styles.inputMaterial} label="Identificación" name="cedula_usu" fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField className={styles.inputMaterial} label="Nombre usuario" name="nombre_usu" fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectpais_usu" >Pais</InputLabel>
              <Select
                labelId="selectpais_usu"
                name="pais_usu"
                id="idselectpais_usu"
                fullWidth 
                onChange={handleChange}
              >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarPaises.map((itemselect, index) => {
                  return (
                    <MenuItem key={index} value={itemselect.id_pai }>{itemselect.nombre_pai}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectciudad_usu" >Ciudad</InputLabel>
              <Select
                labelId="selectciudad_usu"
                name="ciudad_usu"
                id="idselectciudad_usu"
                fullWidth 
                onChange={handleChange}
              >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarCiudades.map((itemselect, index) => {
                  return (
                    <MenuItem key={index} value={itemselect.id_ciu }>{itemselect.nombre_ciu}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselecttipo_usu" >Tipo de usuario</InputLabel>
              <Select
                labelId="selecttipo_usu"
                name="tipo_usu"
                id="idselecttipo_usu"
                fullWidth 
                onChange={handleChange}
              >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarUnidades.map((itemselect, index) => {
                  return (
                    <MenuItem key={index} value={itemselect.id_und }>{itemselect.descripcion_und}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField className={styles.inputMaterial} label="Celular" name="celular_usu" fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselecttipo_usu" >Estados</InputLabel>
              <Select
                labelId="selectestado_usu"
                name="estado_usu"
                id="idselectestado_usu"
                fullWidth 
                onChange={handleChange}
              >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarEstados.map((itemselect, index) => {
                  return (
                    <MenuItem key={index} value={itemselect.id_est }>{itemselect.nombre_est}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <br />
      <div align="right">
        <Button color="primary" onClick={() => grabarUsuario()} >Insertar</Button>
        <Button onClick={() => abrirCerrarModalInsertar()} >Cancelar</Button>
      </div>
    </div>
  )

  const usuarioEditar = (
    <div className={styles.modal}>
      <Typography  align="center" className={ styles.typography } variant="button" display="block" >
      Actualizar Datos de la Usuario
      </Typography>
      <br/>
      <Grid container spacing={2} >
        <Grid item xs={12} md={6}>
          <TextField className={styles.inputMaterial} name="email_usu" label="Email"  defaultValue={email}
           fullWidth onChange={handleChange} value={usuariosSeleccionado&&usuariosSeleccionado.email_usu} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField className={styles.inputMaterial} label="ID Interno" name="uidfirebase_usu" fullWidth 
            defaultValue={uid} onChange={handleChange}  value={usuariosSeleccionado&&usuariosSeleccionado.uidfirebase_usu} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField className={styles.inputMaterial} label="Identificación" name="cedula_usu" fullWidth onChange={handleChange}
            value={usuariosSeleccionado&&usuariosSeleccionado.cedula_usu} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField className={styles.inputMaterial} label="Nombre usuario" name="nombre_usu" fullWidth onChange={handleChange} 
           value={usuariosSeleccionado&&usuariosSeleccionado.nombre_usu} />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectpais_usu" >Pais</InputLabel>
              <Select
                labelId="selectpais_usu"
                name="pais_usu"
                id="idselectpais_usu"
                fullWidth 
                onChange={handleChange}
                value={usuariosSeleccionado&&usuariosSeleccionado.pais_usu}
              >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarPaises.map((itemselect, index) => {
                  return (
                    <MenuItem key={index} value={itemselect.id_pai }>{itemselect.nombre_pai}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectciudad_usu" >Ciudad</InputLabel>
              <Select
                labelId="selectciudad_usu"
                name="ciudad_usu"
                id="idselectciudad_usu"
                fullWidth 
                onChange={handleChange}
                value={usuariosSeleccionado&&usuariosSeleccionado.ciudad_usu}
              >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarCiudades.map((itemselect, index) => {
                  return (
                    <MenuItem key={index} value={itemselect.id_ciu }>{itemselect.nombre_ciu}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselecttipo_usu" >Tipo de usuario</InputLabel>
              <Select
                labelId="selecttipo_usu"
                name="tipo_usu"
                id="idselecttipo_usu"
                fullWidth 
                onChange={handleChange}
                value={usuariosSeleccionado&&usuariosSeleccionado.tipo_usu}
              >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarUnidades.map((itemselect, index) => {
                  return (
                    <MenuItem key={index} value={itemselect.id_und }>{itemselect.descripcion_und}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField className={styles.inputMaterial} label="Celular" name="celular_usu" fullWidth onChange={handleChange} 
             value={usuariosSeleccionado&&usuariosSeleccionado.celular_usu} />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselecttipo_usu" >Estados</InputLabel>
              <Select
                labelId="selectestado_usu"
                name="estado_usu"
                id="idselectestado_usu"
                fullWidth 
                onChange={handleChange}
                value={usuariosSeleccionado&&usuariosSeleccionado.estado_usu}
              >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarEstados.map((itemselect, index) => {
                  return (
                    <MenuItem key={index} value={itemselect.id_est }>{itemselect.nombre_est}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <div align="right">
        <Button color="primary" onClick={() => actualizarUsuario()} >Editar</Button>
        <Button onClick={() => abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  const usuarioEliminar = (
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar el Usuario <b>{usuariosSeleccionado && usuariosSeleccionado.nombre_usu}</b>? </p>
      <div align="right">
        <Button color="secondary" onClick={() => borrarUsuario()}> Confirmar </Button>
        <Button onClick={() => abrirCerrarModalEliminar()}> Cancelar </Button>

      </div>

    </div>
  )

  return (
    <div className="App">
      <br />
      <Button variant="contained" startIcon={<SaveIcon />} color="primary" onClick={() => abrirCerrarModalInsertar()} >Agregar Usuario</Button>
      <MaterialTable
        columns={columnas}
        data={listarUsuarios}
        title="MAESTRA DE USUARIOS"
        actions={[
          {
            icon: 'edit',
            tooltip: 'Editar Usuario',
            onClick: (event, rowData) => seleccionarUsuario(rowData, "Editar")
          },
          {
            icon: 'delete',
            tooltip: 'Borrar Usuario',
            onClick: (event, rowData) => seleccionarUsuario(rowData, "Eliminar")
          }
        ]}
        options={{
          actionsColumnIndex: -1
        }}
        localization={{
          header: {
            actions: "Acciones"
          }
        }}
      />{ }
      <Modal
        open={modalInsertar}
        onClose={abrirCerrarModalInsertar}
      >
        {usuarioInsertar}
      </Modal>

      <Modal
        open={modalEditar}
        onClose={abrirCerrarModalEditar}
      >
        {usuarioEditar}
      </Modal>

      <Modal
        open={modalEliminar}
        onClose={abrirCerrarModalEliminar}
      >
        {usuarioEliminar}
      </Modal>
    </div>
  );
}

export default Usuarios;