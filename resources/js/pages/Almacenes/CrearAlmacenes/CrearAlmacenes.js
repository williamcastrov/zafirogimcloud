import React, { useEffect, useState } from "react";
import axios from "axios";
import MaterialTable from "material-table";
import { Modal, TextField, Button, Select, MenuItem, FormControl, InputLabel, Typography, Grid } from "@material-ui/core";
import { green, blue, blueGrey, red } from '@material-ui/core/colors';
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from '@material-ui/icons/Save';
import swal from 'sweetalert';
import Moment from 'moment';

// Componentes de Conexion con el Backend
import almacenesServices from "../../../services/Almacenes/Almacenes";
import tiposalmacenesServices from "../../../services/Almacenes/TiposAlmacenes";
import estadosServices from "../../../services/Parameters/Estados";
import proveedoresServices from "../../../services/Interlocutores/Proveedores";

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

function CrearAlmacenes() {
  const styles = useStyles();
  const [listAlmacenes, setListAlmacenes] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [formError, setFormError] = useState(false);
  const [listarEmpresas, setListarEmpresas] = useState([]);
  const [listarTiposAlmacenes, setListarTiposAlmacenes] = useState([]);
  const [listarProveedores, setListarProveedores] = useState([]);
  const [listarEstados, setListarEstados] = useState([]);
  const [actualiza, setActualiza] = useState(false);

  const [almacenesSeleccionado, setAlmacenesSeleccionado] = useState({
    id_alm: "",
    tipoalmacen_alm: "",
    descripcion_alm: "",
    consignacion_alm: "",
    interlocutor_alm: "",
    fechacreacion_alm: "",
    estado_alm: "",
    observacion_alm: ""
  })

  useEffect(() => {
    async function fetchDataAlmacenes() {
      const res = await almacenesServices.listAlmacenes();
      setListAlmacenes(res.data);
      setActualiza(false);
    }
    fetchDataAlmacenes();
  }, [actualiza])

  useEffect(() => {
    async function fetchDataTiposAlmacenes() {
      const res = await tiposalmacenesServices.listTiposalmacenes();
      setListarTiposAlmacenes(res.data);
    }
    fetchDataTiposAlmacenes();
  }, [])

  useEffect(() => {
    async function fetchDataEstados() {
      const res = await estadosServices.listEstados();
      setListarEstados(res.data)
      console.log(res.data);
    }
    fetchDataEstados();
  }, [])

  useEffect(() => {
    async function fetchDataProveedores() {
      const res = await proveedoresServices.listProveedores();
      setListarProveedores(res.data)
      //console.log(res.data);
    }
    fetchDataProveedores();
  }, [])


  const handleChange = e => {
    const { name, value } = e.target;

    setAlmacenesSeleccionado(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const seleccionarAlmacenes = (almacen, caso) => {
    setAlmacenesSeleccionado(almacen);
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

  const grabarAlmacen = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;

    if (!almacenesSeleccionado.tipoalmacen_alm) {
      errors.tipoalmacen_alm = true;
      formOk = false;
    }

    if (!almacenesSeleccionado.descripcion_alm) {
      errors.descripcion_alm = true;
      formOk = false;
    }

    if (!almacenesSeleccionado.consignacion_alm) {
      errors.consignacion_alm = true;
      formOk = false;
    }

    if (!almacenesSeleccionado.interlocutor_alm) {
      errors.interlocutor_alm = true;
      formOk = false;
    }

    if (!almacenesSeleccionado.fechacreacion_alm) {
      errors.fechacreacion_alm = true;
      formOk = false;
    }

    if (!almacenesSeleccionado.estado_alm) {
      errors.estado_alm = true;
      formOk = false;
    }

    if (!almacenesSeleccionado.observacion_alm) {
      errors.observacion_alm = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
      console.log(almacenesSeleccionado);
      const res = await almacenesServices.save(almacenesSeleccionado);

      if (res.success) {
        swal("Almacen", "Creado de forma Correcta!", "success", { button: "Aceptar" });
        console.log(res.message)
        abrirCerrarModalInsertar();
        delete almacenesSeleccionado.descripcion_alm;
        delete almacenesSeleccionado.tipoalmacen_alm;
        delete almacenesSeleccionado.consignacion_alm;
        delete almacenesSeleccionado.interlocutor_alm;
        delete almacenesSeleccionado.fechacreacion_alm;
        delete almacenesSeleccionado.estado_alm;
        delete almacenesSeleccionado.observacion_alm;
      } else {
        swal("Almacen", "Error Creando el Almacen!", "error", { button: "Aceptar" });
        console.log(res.message);
        abrirCerrarModalInsertar();
      }
    }
    else {
      swal("Almacen", "Debe Ingresar Todos los Datos, Revisar Información!", "warning", { button: "Aceptar" });
      console.log(res.message);
      abrirCerrarModalInsertar();
    }
    setActualiza(true);
  }

  const actualizarAlmacen = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;

    if (!almacenesSeleccionado.tipoalmacen_alm) {
      errors.tipoalmacen_alm = true;
      formOk = false;
    }

    if (!almacenesSeleccionado.descripcion_alm) {
      errors.descripcion_alm = true;
      formOk = false;
    }

    if (!almacenesSeleccionado.consignacion_alm) {
      errors.consignacion_alm = true;
      formOk = false;
    }

    if (!almacenesSeleccionado.interlocutor_alm) {
      errors.interlocutor_alm = true;
      formOk = false;
    }

    if (!almacenesSeleccionado.fechacreacion_alm) {
      errors.fechacreacion_alm = true;
      formOk = false;
    }

    if (!almacenesSeleccionado.estado_alm) {
      errors.estado_alm = true;
      formOk = false;
    }

    if (!almacenesSeleccionado.observacion_alm) {
      errors.observacion_alm = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {

      const res = await almacenesServices.update(almacenesSeleccionado);

      if (res.success) {
        swal("Almacen", "Actualizado de forma Correcta!", "success", { button: "Aceptar" });
        console.log(res.message)
        abrirCerrarModalEditar();
        delete almacenesSeleccionado.descripcion_alm;
        delete almacenesSeleccionado.tipoalmacen_alm;
        delete almacenesSeleccionado.consignacion_alm;
        delete almacenesSeleccionado.interlocutor_alm;
        delete almacenesSeleccionado.fechacreacion_alm;
        delete almacenesSeleccionado.estado_alm;
        delete almacenesSeleccionado.observacion_alm;
      } else {
        swal("Almacen", "Error Actualizando el Almacen!", "error", { button: "Aceptar" });
        console.log(res.message);
        abrirCerrarModalEditar();
      }
    }
    else {
      swal("Almacen", "Debe Ingresar Todos los Datos, Revisar Información!", "warning", { button: "Aceptar" });
      console.log(res.message);
      abrirCerrarModalEditar();
    }
    setActualiza(true);
  }

  const borrarAlmacen = async () => {

    const res = await almacenesServices.delete(almacenesSeleccionado.id_alm);

    if (res.success) {
      swal("Almacen", "Borrado de forma Correcta!", "success", { button: "Aceptar" });
      console.log(res.message)
      abrirCerrarModalEliminar();
    }
    else {
      swal("Almacen", "Error Borrando el Almacen!", "error", { button: "Aceptar" });
      console.log(res.message);
      abrirCerrarModalEliminar();
    }
    setActualiza(true);
  }
  // "string","boolean","numeric","date","datetime","time","currency"
  const columnas = [
    {
      title: 'Id',
      field: 'id_alm'
    },
    {
      title: 'Descripcion',
      field: 'descripcion_alm',
      cellStyle : { minWidth: 300}
    },
    {
      title: 'Tipo Almacen',
      field: 'descripcion_talm'
    },
    {
      title: 'Consignación',
      field: 'consignacion_alm'
    },
    {
      title: 'Propietario',
      field: 'razonsocial_int'
    },
    {
      title: 'Fecha Creación',
      field: 'fechacreacion_alm',
      type: 'date'
    },
    {
      title: 'Estado',
      field: 'nombre_est'
    },
    {
      title: 'Obervación',
      field: 'observacion_alm',
      cellStyle : { minWidth: 350}
    }
  ]

  const AlmacenInsertar = (
    <div className={styles.modal}>
      <Typography align="center" className={styles.typography} variant="button" display="block">Agregar Almacen</Typography>
      <br />
      <Grid container spacing={2} >
        <Grid item xs={12} md={6}> <TextField name="id_alm" label="#Bodega" disabled="true"
          fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectEstado">Estado</InputLabel>
            <Select
              labelId="selectEstado"
              name="estado_alm"
              id="idselectEstado"
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
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselecttipoalmacen_alm">Tipo de Almacen</InputLabel>
            <Select
              labelId="selecttipoalmacen_alm"
              name="tipoalmacen_alm"
              id="idselecttipoalmacen_alm"
              onChange={handleChange}
            >
              <MenuItem value="">  <em>None</em> </MenuItem>
              {
                listarTiposAlmacenes.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_talm}>{itemselect.descripcion_talm}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}> <TextField type="date" InputLabelProps={{ shrink: true }} name="fechacreacion_alm"
          label="Fecha de Creación del Almacen" fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField className={styles.inputMaterial} label="Descripcion" name="descripcion_alm" onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectconsignacion_alm">Almacen de Consignación</InputLabel>
            <Select
              labelId="selectconsignacion_alm"
              name="consignacion_alm"
              id="idselectconsignacion_alm"
              onChange={handleChange}
            >
              <MenuItem value="Si"> Si </MenuItem>
              <MenuItem value="No"> No </MenuItem>
             
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectinterlocutor_alm">Empresa</InputLabel>
            <Select
              labelId="selectinterlocutor_alm"
              name="interlocutor_alm"
              id="idselectinterlocutor_alm"
              onChange={handleChange}
            >
              <MenuItem value="">  <em>None</em> </MenuItem>
              {
                listarProveedores.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_int}>{itemselect.razonsocial_int}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField className={styles.inputMaterial} label="Observación sobre el almacen" name="observacion_alm"
            onChange={handleChange} />
        </Grid>
      </Grid>
      <div align="right">
        <Button className={styles.button} color="primary" onClick={() => grabarAlmacen()} >Insertar</Button>
        <Button className={styles.button2} onClick={() => abrirCerrarModalInsertar()} >Cancelar</Button>
      </div>
    </div>
  )


  const AlmacenEditar = (
    <div className={styles.modal}>
      <Typography align="center" className={styles.typography} variant="button" display="block">Actualizar Almacen</Typography>
      <Grid container spacing={2} >
        <Grid item xs={12} md={6}> <TextField name="id_alm" label="#Bodega" disabled="true"
          fullWidth onChange={handleChange} value={almacenesSeleccionado && almacenesSeleccionado.id_alm}  />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectEstado">Estado</InputLabel>
            <Select
              labelId="selectEstado"
              name="estado_alm"
              id="idselectEstado"
              onChange={handleChange}
              value={almacenesSeleccionado && almacenesSeleccionado.estado_alm} 
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
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselecttipoalmacen_alm">Tipo de Almacen</InputLabel>
            <Select
              labelId="selecttipoalmacen_alm"
              name="tipoalmacen_alm"
              id="idselecttipoalmacen_alm"
              onChange={handleChange}
              value={almacenesSeleccionado && almacenesSeleccionado.tipoalmacen_alm} 
            >
              <MenuItem value="">  <em>None</em> </MenuItem>
              {
                listarTiposAlmacenes.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_talm}>{itemselect.descripcion_talm}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}> <TextField type="date" InputLabelProps={{ shrink: true }} name="fechacreacion_alm"
              label="Fecha de Creación del Almacen" fullWidth onChange={handleChange} 
              defaultValue={Moment(almacenesSeleccionado.fechacreacion_alm).format('YYYY-MM-DD')} />
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField className={styles.inputMaterial} label="Descripcion" name="descripcion_alm" onChange={handleChange} 
                     value={almacenesSeleccionado && almacenesSeleccionado.descripcion_alm} />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectconsignacion_alm">Almacen de Consignacion</InputLabel>
            <Select
              labelId="selectconsignacion_alm"
              name="consignacion_alm"
              id="idselectconsignacion_alm"
              onChange={handleChange}
              value={almacenesSeleccionado && almacenesSeleccionado.consignacion_alm} 
            >
              <MenuItem value="Si"> Si </MenuItem>
              <MenuItem value="No"> No </MenuItem>
             
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectinterlocutor_alm">Empresa</InputLabel>
            <Select
              labelId="selectinterlocutor_alm"
              name="interlocutor_alm"
              id="idselectinterlocutor_alm"
              onChange={handleChange}
              value={almacenesSeleccionado && almacenesSeleccionado.interlocutor_alm} 
            >
              <MenuItem value="">  <em>None</em> </MenuItem>
              {
                listarProveedores.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_int}>{itemselect.razonsocial_int}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField className={styles.inputMaterial} label="Observación sobre el almacen" name="observacion_alm"
            onChange={handleChange} value={almacenesSeleccionado && almacenesSeleccionado.observacion_alm}  />
        </Grid>
      </Grid>
      <br />
      <div align="right">
        <Button className={styles.button} color="primary" onClick={() => actualizarAlmacen()} >Editar</Button>
        <Button className={styles.button2} onClick={() => abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  const AlmacenEliminar = (
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar el Almacen <b>{almacenesSeleccionado && almacenesSeleccionado.descripcion_alm}</b>? </p>
      <div align="right">
        <Button className={styles.button} color="secondary" onClick={() => borrarAlmacen()}> Confirmar </Button>
        <Button className={styles.button2} onClick={() => abrirCerrarModalEliminar()}> Cancelar </Button>
      </div>
    </div>
  )

  return (
    <div className="App">
      <br />
      <Button variant="contained" startIcon={<SaveIcon />} color="primary" onClick={() => abrirCerrarModalInsertar()} >Agregar Almacen</Button>
      <MaterialTable
        columns={columnas}
        data={listAlmacenes}
        title="ALMACENES"
        actions={[
          {
            icon: 'edit',
            tooltip: 'Editar Almacen',
            onClick: (event, rowData) => seleccionarAlmacenes(rowData, "Editar")
          },
          {
            icon: 'delete',
            tooltip: 'Borrar Almacen',
            onClick: (event, rowData) => seleccionarAlmacenes(rowData, "Eliminar")
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
        {AlmacenInsertar}
      </Modal>

      <Modal
        open={modalEditar}
        onClose={abrirCerrarModalEditar}
      >
        {AlmacenEditar}
      </Modal>

      <Modal
        open={modalEliminar}
        onClose={abrirCerrarModalEliminar}
      >
        {AlmacenEliminar}
      </Modal>
    </div>
  );
}

export default CrearAlmacenes;