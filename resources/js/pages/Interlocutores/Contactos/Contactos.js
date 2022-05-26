import React, { useEffect, useState } from "react";
import axios from "axios";
import MaterialTable from "material-table";
import { Modal, TextField, Button, Select, MenuItem, FormControl, InputLabel, Grid, Typography } from "@material-ui/core";
import { green, blue, blueGrey, red } from '@material-ui/core/colors';
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from '@material-ui/icons/Save';
import CachedIcon from '@material-ui/icons/Cached';
import swal from 'sweetalert';
import Moment from 'moment';

// Componentes de Conexion con el Backend
import ciudadesServices from "../../../services/Parameters/Ciudades";
import estadosServices from "../../../services/Parameters/Estados";
import contactosServices from "../../../services/Interlocutores/Contactos";

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
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
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
  },
  typography: {
    fontSize: 16,
    color: "#ff3d00"
  },
  button: {
    color: theme.palette.getContrastText(blueGrey[500]),
    backgroundColor: green[700],
    margin: theme.spacing(1),
    fontSize: 12,
    '&:hover': {
      backgroundColor: blue[700],
    },
  },
  button2: {
    color: theme.palette.getContrastText(blueGrey[500]),
    backgroundColor: red[700],
    margin: theme.spacing(1),
    fontSize: 12,
    '&:hover': {
      backgroundColor: blue[700],
    },
  },
}));

function Contactos(props) {
  const { interlocutor, nitCliente } = props;
  console.log("NIT CLIENTE : ",nitCliente)

  const styles = useStyles();
  const [listarContactos, setListarContactos] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [formError, setFormError] = useState(false);
  const [listarEstados, setListarEstados] = useState([]);
  const [listarCiudades, setListarCiudades] = useState([]);
  const [fechaHoy, setFechaHoy] = useState(new Date());
  const fechaactual = Moment(new Date()).format('YYYY-MM-DD');
  const [actualiza, setActualiza] = useState(false);
  const horaactual = Moment(new Date()).format('HH:mm:ss');
  let contacto = 10
  let estado   = 1
  let blanco = "."

  const [contactosSeleccionado, setContactosSeleccionado] = useState({
    id_con: "",
    idinterlocutor_con: interlocutor,
    nitinterlocutor_con: nitCliente,
    identificacion_con: "",
    primer_nombre_con: blanco,
    segundo_nombre_con: blanco,
    primer_apellido_con: blanco,
    segundo_apellido_con:blanco,
    ciudad_con: "",
    direccion_con: "",
    telefono_con: "",
    email_con: "",
    fecha_creacion_con: fechaactual,
    fecha_modificacion_con: fechaactual,
    estado_con: estado,
  })

  useEffect(() => {
    //console.log("CODIGO CONTACTO : ", interlocutor)
    async function fetchDataContactos() {
      const res = await contactosServices.contactosClientes(nitCliente);
      setListarContactos(res.data);
      console.log("DATOS CONTACTOS : ",res.data)
      setActualiza(false);
    }
    fetchDataContactos();
  }, [actualiza])

  const leerContactos = () => {
    async function fetchDataContactos() {
      const res = await contactosServices.contactosClientes(nitCliente);
      setListarContactos(res.data);
      console.log("DATOS CONTACTOS : ",res.data)
    }
    fetchDataContactos();
  }


  useEffect(() => {
    async function fetchDataEstados() {
      const res = await estadosServices.listEstadosGenerales();
      setListarEstados(res.data)
      //console.log(res.data);
    }
    fetchDataEstados();
  }, [])

  useEffect(() => {
    async function fetchDataCiudades() {
      const res = await ciudadesServices.listCiudades();
      setListarCiudades(res.data)
      //console.log(res.data);
    }
    fetchDataCiudades();
  }, [])

  const handleChange = e => {
    const { name, value } = e.target;

    setContactosSeleccionado(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const seleccionarContacto = (contacto, caso) => {
    setContactosSeleccionado(contacto);
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

  const grabarContacto = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;

    if (!contactosSeleccionado.idinterlocutor_con) {
      errors.idinterlocutor_con = true;
      formOk = false;
    }

    if (!contactosSeleccionado.identificacion_con) {
      errors.identificacion_con = true;
      formOk = false;
    }

    if (!contactosSeleccionado.primer_nombre_con) {
      errors.primer_nombre_con = true;
      formOk = false;
    }

    if (!contactosSeleccionado.segundo_nombre_con) {
      errors.segundo_nombre_con = true;
      formOk = false;
    }

    if (!contactosSeleccionado.primer_apellido_con) {
      errors.primer_apellido_con = true;
      formOk = false;
    }

    if (!contactosSeleccionado.segundo_apellido_con) {
      errors.segundo_apellido_con = true;
      formOk = false;
    }

    if (!contactosSeleccionado.ciudad_con) {
      errors.ciudad_con = true;
      formOk = false;
    }

    if (!contactosSeleccionado.direccion_con) {
      errors.direccion_con = true;
      formOk = false;
    }

    if (!contactosSeleccionado.telefono_con) {
      errors.telefono_con = true;
      formOk = false;
    }

    if (!contactosSeleccionado.email_con) {
      errors.email_con = true;
      formOk = false;
    }

    if (!contactosSeleccionado.fecha_creacion_con) {
      errors.fecha_creacion_con = true;
      formOk = false;
    }

    if (!contactosSeleccionado.fecha_modificacion_con) {
      errors.fecha_modificacion_con = true;
      formOk = false;
    }

    if (!contactosSeleccionado.estado_con) {
      errors.estado_con = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
      console.log(contactosSeleccionado);
      const res = await contactosServices.save(contactosSeleccionado);

      if (res.success) {
        swal("Contacto", "Creado de forma Correcta!", "success", { button: "Aceptar" });
        console.log(res.message)
        abrirCerrarModalInsertar();
        delete contactosSeleccionado.id_con;
        delete contactosSeleccionado.idinterlocutor_con;
        delete contactosSeleccionado.identificacion_con;
        delete contactosSeleccionado.primer_nombre_con;
        delete contactosSeleccionado.segundo_nombre_con;
        delete contactosSeleccionado.primer_apellido_con;
        delete contactosSeleccionado.segundo_apellido_con;
        delete contactosSeleccionado.ciudad_con;
        delete contactosSeleccionado.direccion_con;
        delete contactosSeleccionado.telefono_con;
        delete contactosSeleccionado.email_con;
        delete contactosSeleccionado.fecha_creacion_con;
        delete contactosSeleccionado.fecha_modificacion_con;
        delete contactosSeleccionado.estado_con;
      } else {
        swal("Contacto", "Error Creando el Contacto!", "error", { button: "Aceptar" });
        console.log(res.message);
        abrirCerrarModalInsertar();
      }
    }
    else {
      swal("Contacto", "Debe Ingresar Todos los Datos, Revisar Información!", "warning", { button: "Aceptar" });
      console.log(contactosSeleccionado);
      console.log(res.message);
      abrirCerrarModalInsertar();
    }
    setActualiza(true);
  }

  const actualizarContacto = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;

    if (!contactosSeleccionado.idinterlocutor_con) {
      errors.idinterlocutor_con = true;
      formOk = false;
    }

    if (!contactosSeleccionado.identificacion_con) {
      errors.identificacion_con = true;
      formOk = false;
    }

    if (!contactosSeleccionado.primer_nombre_con) {
      errors.primer_nombre_con = true;
      formOk = false;
    }

    if (!contactosSeleccionado.segundo_nombre_con) {
      errors.segundo_nombre_con = true;
      formOk = false;
    }

    if (!contactosSeleccionado.primer_apellido_con) {
      errors.primer_apellido_con = true;
      formOk = false;
    }

    if (!contactosSeleccionado.segundo_apellido_con) {
      errors.segundo_apellido_con = true;
      formOk = false;
    }

    if (!contactosSeleccionado.ciudad_con) {
      errors.ciudad_con = true;
      formOk = false;
    }

    if (!contactosSeleccionado.direccion_con) {
      errors.direccion_con = true;
      formOk = false;
    }

    if (!contactosSeleccionado.telefono_con) {
      errors.telefono_con = true;
      formOk = false;
    }

    if (!contactosSeleccionado.email_con) {
      errors.email_con = true;
      formOk = false;
    }

    if (!contactosSeleccionado.fecha_creacion_con) {
      errors.fecha_creacion_con = true;
      formOk = false;
    }

    if (!contactosSeleccionado.fecha_modificacion_con) {
      errors.fecha_modificacion_con = true;
      formOk = false;
    }

    if (!contactosSeleccionado.estado_con) {
      errors.estado_con = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {

      const res = await contactosServices.update(contactosSeleccionado);

      if (res.success) {
        swal("Contacto", "Creado de forma Correcta!", "success", { button: "Aceptar" });
        console.log(res.message)
        abrirCerrarModalEditar();
        delete contactosSeleccionado.id_con;
        delete contactosSeleccionado.idinterlocutor_con;
        delete contactosSeleccionado.identificacion_con;
        delete contactosSeleccionado.primer_nombre_con;
        delete contactosSeleccionado.segundo_nombre_con;
        delete contactosSeleccionado.primer_apellido_con;
        delete contactosSeleccionado.segundo_apellido_con;
        delete contactosSeleccionado.ciudad_con;
        delete contactosSeleccionado.direccion_con;
        delete contactosSeleccionado.telefono_con;
        delete contactosSeleccionado.email_con;
        delete contactosSeleccionado.fecha_creacion_con;
        delete contactosSeleccionado.fecha_modificacion_con;
        delete contactosSeleccionado.estado_con;
      } else {
        swal("Contacto", "Error Creando el Contacto, Revisar Información!", "error", { button: "Aceptar" });
        console.log(res.message);
        abrirCerrarModalEditar();
      }
    }
    else {
      swal("Contacto", "Debe Ingresar Todos los Datos, Revisar Inormación!", "warning", { button: "Aceptar" });
      console.log(contactosSeleccionado);
      console.log(res.message);
      abrirCerrarModalEditar();
    }
    setActualiza(true);
  }

  const borrarContacto = async () => {

    const res = await contactosServices.delete(contactosSeleccionado.id_con);

    if (res.success) {
      swal("Contacto", "Borrado de forma Correcta!", "success", { button: "Aceptar" });
      console.log(res.message)
      abrirCerrarModalEliminar();
    }
    else {
      swal("Contacto", "Error Borrando el Contacto!", "error", { button: "Aceptar" });
      console.log(res.message);
      abrirCerrarModalEliminar();
    }
    setActualiza(true);
  }

  // "string","boolean","numeric","date","datetime","time","currency"
  const columnas = [
    {
      field: 'identificacion_con',
      title: 'Identificacion'
    },
    {
      field: 'primer_nombre_con',
      title: 'Primero Nombre'
     },
    {
      field: 'segundo_nombre_con',
      title: 'Segundo Nombre',
    },
    {
      field: 'primer_apellido_con',
      title: 'Primer Apelllido',
    },
    {
      field: 'segundo_apellido_con',
      title: 'Segundo Apellido',
    },
    {
      field: 'nombre_ciu',
      title: 'Ciudad'
    },
    {
      field: 'direccion_con',
      cellStyle: { minWidth: 150 },
      title: 'Dirección',
    },
    {
      field: 'telefono_con',
      title: 'Teléfono',
      cellStyle: { minWidth: 120 }
    },
    {
      field: 'email_con',
      title: 'Email',
      cellStyle: { minWidth: 130 }
    },
    {
      field: 'fecha_creacion_con',
      title: 'Fecha Creación',
      type: "date",
      cellStyle: { minWidth: 100 }
    },
    {
      field: 'fecha_modificacion_con',
      title: 'Fecha Creación',
      type: "date",
      cellStyle: { minWidth: 100 }
    },
    {
      field: 'nombre_est',
      title: 'Estado'
    }
  ]

  const contactoInsertar = (
    <div className={styles.modal}>
      <Typography align="center" className={styles.typography} variant="button" display="block" >
        Agregar Nuevo Contacto
      </Typography>
      <br />
      <Grid container spacing={2} >
        <Grid item xs={12} md={6}>
          <TextField name="idinterlocutor_con" label="ID Contacto" defaultValue={interlocutor} disabled="true"
            fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField name="nitinterlocutor_con" label="Nit del Cliente" fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField name="identificacion_con" label="Identificación del Contacto" fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField name="primer_nombre_con" label="Primero Nombre" fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField name="segundo_nombre_con" label="Segundo Nombre" fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField name="primer_apellido_con" label="Primer Apellido" fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField name="segundo_apellido_con" label="Segundo Apellido" onChange={handleChange} fullWidth />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectCiudad"  >Ciudad</InputLabel>
            <Select
              labelId="selecCiudad"
              name="ciudad_con"
              id="idselectCiudad"
              fullWidth
              onChange={handleChange}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarCiudades.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_ciu}>{itemselect.nombre_ciu}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField name="telefono_con" label="Telefono" fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField name="email_con" label="Email" fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField type="date" InputLabelProps={{ shrink: true }} name="fecha_creacion_con" label="Fecha Creación" fullWidth
            defaultValue={Moment(fechaactual).format('YYYY-MM-DD')} onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField type="date" InputLabelProps={{ shrink: true }} name="fecha_modificacion_con" label="Fecha Ultima Modificación" fullWidth
            defaultValue={Moment(fechaactual).format('YYYY-MM-DD')} onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectEstado"  >Estado</InputLabel>
            <Select
              labelId="selectEstado"
              name="estado_con"
              id="idselectEstado"
              defaultValue={estado}
              fullWidth
              onChange={handleChange}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarEstados.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_est}>{itemselect.nombre_est}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField name="direccion_con" label="Direccion" onChange={handleChange} fullWidth />
        </Grid>
      </Grid>
      <div align="right">
        <Button className={styles.button} color="primary" onClick={() => grabarContacto()} >Insertar</Button>
        <Button className={styles.button2} onClick={() => abrirCerrarModalInsertar()} >Cancelar</Button>
      </div>
    </div>
  )

  const contactoEditar = (
    <div className={styles.modal}>
      <Typography align="center" className={styles.typography} variant="button" display="block" >
        Actualizar Contacto
      </Typography>
      <Grid container spacing={2} >
        <Grid item xs={12} md={6}>
          <TextField name="idinterlocutor_con" label="ID Contacto" defaultValue={contacto} disabled="true"
            fullWidth onChange={handleChange} value={contactosSeleccionado&&contactosSeleccionado.idinterlocutor_con} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField name="identificacion_con" label="Identificación del Contacto" fullWidth onChange={handleChange}
                     value={contactosSeleccionado&&contactosSeleccionado.identificacion_con} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField name="nitinterlocutor_con" label="Nit del Cliente" fullWidth onChange={handleChange}
                     value={contactosSeleccionado&&contactosSeleccionado.nitinterlocutor_con} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField name="primer_nombre_con" label="Primero Nombre" fullWidth onChange={handleChange} 
                     value={contactosSeleccionado&&contactosSeleccionado.primer_nombre_con} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField name="segundo_nombre_con" label="Segundo Nombre" fullWidth onChange={handleChange} 
                     value={contactosSeleccionado&&contactosSeleccionado.segundo_nombre_con} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField name="primer_apellido_con" label="Primer Apellido" fullWidth onChange={handleChange} 
                     value={contactosSeleccionado&&contactosSeleccionado.primer_apellido_con}/>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField name="segundo_apellido_con" label="Segundo Apellido" onChange={handleChange} fullWidth
                     value={contactosSeleccionado&&contactosSeleccionado.segundo_apellido_con} />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectCiudad"  >Ciudad</InputLabel>
            <Select
              labelId="selecCiudad"
              name="ciudad_con"
              id="idselectCiudad"
              fullWidth
              onChange={handleChange}
              value={contactosSeleccionado&&contactosSeleccionado.ciudad_con}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarCiudades.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_ciu}>{itemselect.nombre_ciu}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField name="telefono_con" label="Telefono" fullWidth onChange={handleChange}
                     value={contactosSeleccionado&&contactosSeleccionado.telefono_con} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField name="email_con" label="Email" fullWidth onChange={handleChange} 
                     value={contactosSeleccionado&&contactosSeleccionado.email_con} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField type="date" InputLabelProps={{ shrink: true }} name="fecha_creacion_con" label="Fecha Creación" fullWidth
            defaultValue={Moment(contactosSeleccionado.fecha_creacion_con).format('YYYY-MM-DD')} onChange={handleChange}   />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField type="date" InputLabelProps={{ shrink: true }} name="fecha_modificacion_con" label="Fecha Ultima Modificación" fullWidth
            defaultValue={Moment(contactosSeleccionado.fecha_modificacion_con).format('YYYY-MM-DD')} onChange={handleChange}  />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectEstado"  >Estado</InputLabel>
            <Select
              labelId="selectEstado"
              name="estado_con"
              id="idselectEstado"
              defaultValue={estado}
              fullWidth
              onChange={handleChange}
              value={contactosSeleccionado&&contactosSeleccionado.estado_con}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarEstados.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_est}>{itemselect.nombre_est}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField name="direccion_con" label="Direccion" onChange={handleChange} fullWidth 
                     value={contactosSeleccionado&&contactosSeleccionado.direccion_con} />
        </Grid>
      </Grid>
      <div align="right">
        <Button className={styles.button} color="primary" onClick={() => actualizarContacto()} >Editar</Button>
        <Button className={styles.button2} onClick={() => abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  const contactoEliminar = (
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar el Contacto <b>{contactosSeleccionado && contactosSeleccionado.primer_nombre_con}</b>? </p>
      <div align="right">
        <Button className={styles.button} color="secondary" onClick={() => borrarContacto()}> Confirmar </Button>
        <Button className={styles.button2} onClick={() => abrirCerrarModalEliminar()}> Cancelar </Button>
      </div>
    </div>
  )

  return (
    <div className="App">
      <br />
      <Button variant="contained" startIcon={<SaveIcon />} color="primary" onClick={() => abrirCerrarModalInsertar()} >Agregar Contacto</Button>
      <Button variant="contained" startIcon={<CachedIcon />} color="primary" onClick={() => leerContactos()} >Actualizar Contactos</Button>
      <MaterialTable
        columns={columnas}
        data={listarContactos}
        title="GESTIONAR INFORMACION DEL CONTACTO"
        actions={[
          {
            icon: 'edit',
            tooltip: 'Editar Contacto',
            onClick: (event, rowData) => seleccionarContacto(rowData, "Editar")
          },
          {
            icon: 'delete',
            tooltip: 'Borrar Contacto',
            onClick: (event, rowData) => seleccionarContacto(rowData, "Eliminar")
          }
        ]}
        options={{
          actionsColumnIndex: 12
        }}
        localization={{
          header: {
            actions: "Acciones"
          }
        }}
      />
      {}

      <Modal
        open={modalInsertar}
        onClose={abrirCerrarModalInsertar}
      >
        {contactoInsertar}
      </Modal>

      <Modal
        open={modalEditar}
        onClose={abrirCerrarModalEditar}
      >
        {contactoEditar}
      </Modal>

      <Modal
        open={modalEliminar}
        onClose={abrirCerrarModalEliminar}
      >
        {contactoEliminar}
      </Modal>
    </div>
  );
}

export default Contactos;

