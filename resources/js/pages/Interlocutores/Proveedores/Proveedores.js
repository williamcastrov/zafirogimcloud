import React, { useEffect, useState } from "react";
import axios from "axios";
import MaterialTable from "material-table";
import { Modal, TextField, Button, Select, MenuItem, FormControl, InputLabel, Grid, Typography } from "@material-ui/core";
import { green, blue, blueGrey, red } from '@material-ui/core/colors';
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from '@material-ui/icons/Save';
import DatePicker from "react-datepicker";
import Moment from 'moment';
import "react-datepicker/dist/react-datepicker.css";
import swal from 'sweetalert';

// Componentes de Conexion con el Backend
import proveedoresServices from "../../../services/Interlocutores/Proveedores";
import ciudadesServices from "../../../services/Parameters/Ciudades";
import estadosServices from "../../../services/Parameters/Estados";
import empresasServices from "../../../services/Empresa";
import especialidadesServices from "../../../services/Interlocutores/Especialidades";

//Componentes Gestion de Contactos
import MenuContactos from "../MenuContactos";

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
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
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

function Proveedores() {
  const styles = useStyles();
  const [startDate, setStartDate] = useState(new Date());
  const [listarProveedores, setListarProveedores] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [formError, setFormError] = useState(false);
  const [listarEstados, setListarEstados] = useState([]);
  const [listarCiudades, setListarCiudades] = useState([]);
  const [listarEmpresas, setListarEmpresas] = useState([]);
  const [listarEspecialidades, setListarEspecialidades] = useState([]);
  const [fechaHoy, setFechaHoy] = useState(new Date());
  const [actualiza, setActualiza] = useState(false);
  const [proveedoresSeleccionado, setProveedoresSeleccionado] = useState({
    id_int: "",
    codigo_tipo_int: 1,
    nit_int: "",
    digitochequeo_int: "",
    estado_int: "",
    primer_nombre_int: "",
    segundo_nombre_int: "",
    primer_apellido_int: "",
    segundo_apellido_int: "",
    razonsocial_int: "",
    ciudad_int: "",
    direccion_int: "",
    telefono_int: "",
    email_int: "",
    empresa_int: "",
    fecha_creacion_int: fechaHoy,
    fecha_modificacion_int: fechaHoy,
    especialidad_int: ""
  })

  useEffect(() => {
    async function fetchDataProveedores() {
      const res = await proveedoresServices.listProveedores();
      setListarProveedores(res.data);
      console.log(res.data)
      setActualiza(false);
    }
    fetchDataProveedores();
  }, [actualiza])

  useEffect(() => {
    async function fetchDataEmpresas() {
      const res = await empresasServices.listEmpresas();
      setListarEmpresas(res.data)
      //console.log(res.data);
    }
    fetchDataEmpresas();
  }, [])

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

  useEffect(() => {
    async function fetchDataEspecialidades() {
      const res = await especialidadesServices.listEspecialidades();
      setListarEspecialidades(res.data)
      //console.log(res.data);
    }
    fetchDataEspecialidades();
  }, [])

  const handleChange = e => {
    const { name, value } = e.target;

    setProveedoresSeleccionado(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const seleccionarProveedor = (proveedor, caso) => {
    setProveedoresSeleccionado(proveedor);
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

  const grabarProveedor = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;

    if (!proveedoresSeleccionado.codigo_tipo_int) {
      errors.codigo_tipo_int = true;
      formOk = false;
    }

    if (!proveedoresSeleccionado.nit_int) {
      errors.nit_int = true;
      formOk = false;
    }

    if (!proveedoresSeleccionado.digitochequeo_int) {
      errors.digitochequeo_int = true;
      formOk = false;
    }

    if (!proveedoresSeleccionado.estado_int) {
      errors.estado_int = true;
      formOk = false;
    }

    if (!proveedoresSeleccionado.razonsocial_int) {
      errors.razonsocial_int = true;
      formOk = false;
    }

    if (!proveedoresSeleccionado.ciudad_int) {
      errors.ciudad_int = true;
      formOk = false;
    }

    if (!proveedoresSeleccionado.direccion_int) {
      errors.direccion_int = true;
      formOk = false;
    }

    if (!proveedoresSeleccionado.telefono_int) {
      errors.telefono_int = true;
      formOk = false;
    }

    if (!proveedoresSeleccionado.email_int) {
      errors.email_int = true;
      formOk = false;
    }

    if (!proveedoresSeleccionado.empresa_int) {
      errors.empresa_int = true;
      formOk = false;
    }

    if (!proveedoresSeleccionado.fecha_creacion_int) {
      errors.fecha_creacion_int = true;
      formOk = false;
    }

    if (!proveedoresSeleccionado.fecha_modificacion_int) {
      errors.fecha_modificacion_int = true;
      formOk = false;
    }

    if (!proveedoresSeleccionado.especialidad_int) {
      errors.especialidad_int = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
      console.log(proveedoresSeleccionado);
      const res = await proveedoresServices.save(proveedoresSeleccionado);

      if (res.success) {
        swal("Proveedor", "Creado de forma Correcta!", "success", { button: "Aceptar" });
        console.log(res.message)
        abrirCerrarModalInsertar();
        delete proveedoresSeleccionado.codigo_tipo_int;
        delete proveedoresSeleccionado.nit_int;
        delete proveedoresSeleccionado.digitochequeo_int;
        delete proveedoresSeleccionado.estado_int;
        delete proveedoresSeleccionado.razonsocial_int;
        delete proveedoresSeleccionado.ciudad_int;
        delete proveedoresSeleccionado.direccion_int;
        delete proveedoresSeleccionado.telefono_int;
        delete proveedoresSeleccionado.email_int;
        delete proveedoresSeleccionado.empresa_int;
        delete proveedoresSeleccionado.fecha_creacion_int;
        delete proveedoresSeleccionado.fecha_modificacion_int;
        delete proveedoresSeleccionado.especialidad_int;
      } else {
        swal("Proveedor", "Error Creando el Proveedor!", "error", { button: "Aceptar" });
        console.log(res.message);
        abrirCerrarModalInsertar();
      }
    }
    else {
      swal("Proveedor", "Debe Ingresar Todos los Datos, Error!", "warning", { button: "Aceptar" });
      console.log(proveedoresSeleccionado);
      console.log(res.message);
      abrirCerrarModalInsertar();
    }
    setActualiza(true);
  }

  const actualizarProveedor = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;

    if (!proveedoresSeleccionado.codigo_tipo_int) {
      errors.codigo_tipo_int = true;
      formOk = false;
    }

    if (!proveedoresSeleccionado.nit_int) {
      errors.nit_int = true;
      formOk = false;
    }
/*
    if (!proveedoresSeleccionado.digitochequeo_int) {
      errors.digitochequeo_int = true;
      formOk = false;
    }
*/
    if (!proveedoresSeleccionado.estado_int) {
      errors.estado_int = true;
      formOk = false;
    }

    if (!proveedoresSeleccionado.razonsocial_int) {
      errors.razonsocial_int = true;
      formOk = false;
    }

    if (!proveedoresSeleccionado.ciudad_int) {
      errors.ciudad_int = true;
      formOk = false;
    }

    if (!proveedoresSeleccionado.direccion_int) {
      errors.direccion_int = true;
      formOk = false;
    }

    if (!proveedoresSeleccionado.telefono_int) {
      errors.telefono_int = true;
      formOk = false;
    }

    if (!proveedoresSeleccionado.email_int) {
      errors.email_int = true;
      formOk = false;
    }

    if (!proveedoresSeleccionado.empresa_int) {
      errors.empresa_int = true;
      formOk = false;
    }

    if (!proveedoresSeleccionado.fecha_creacion_int) {
      errors.fecha_creacion_int = true;
      formOk = false;
    }

    if (!proveedoresSeleccionado.fecha_modificacion_int) {
      errors.fecha_modificacion_int = true;
      formOk = false;
    }

    if (!proveedoresSeleccionado.especialidad_int) {
      errors.especialidad_int = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {

      const res = await proveedoresServices.update(proveedoresSeleccionado);

      if (res.success) {
        swal("Proveedor", "Creado forma Correcta!", "success", { button: "Aceptar" });
        console.log(res.message)
        abrirCerrarModalEditar();
        delete proveedoresSeleccionado.codigo_tipo_int;
        delete proveedoresSeleccionado.nit_int;
        delete proveedoresSeleccionado.digitochequeo_int;
        delete proveedoresSeleccionado.estado_int;
        delete proveedoresSeleccionado.razonsocial_int;
        delete proveedoresSeleccionado.ciudad_int;
        delete proveedoresSeleccionado.direccion_int;
        delete proveedoresSeleccionado.telefono_int;
        delete proveedoresSeleccionado.email_int;
        delete proveedoresSeleccionado.empresa_int;
        delete proveedoresSeleccionado.fecha_creacion_int;
        delete proveedoresSeleccionado.fecha_modificacion_int;
        delete proveedoresSeleccionado.especialidad_int;
      } else {
        swal("Proveedor", "Error Actualizando el Proveedor!", "error", { button: "Aceptar" });
        console.log(res.message);
        abrirCerrarModalEditar();
      }
    }
    else {
      swal("Proveedor", "Debe Ingresar Todos los Datos, Error!", "warning", { button: "Aceptar" });
      console.log(res.message);
      abrirCerrarModalEditar();
    }
    setActualiza(true);
  }

  const borrarProveedor = async () => {

    const res = await proveedoresServices.delete(proveedoresSeleccionado.id_int);

    if (res.success) {
      swal("Proveedor", "Borrado de forma Correcta!", "success", { button: "Aceptar" });
      console.log(res.message)
      abrirCerrarModalEliminar();
    }
    else {
      swal("Proveedor", "Error Borrando el Proveedor!", "error", { button: "Aceptar" });
      console.log(res.message);
      abrirCerrarModalEliminar();
    }
    setActualiza(true);
  }

  // "string","boolean","numeric","date","datetime","time","currency"
  const columnas = [
    {
      field: 'id_int',
      title: 'Id'
    },
    {
      field: 'nit_int',
      title: 'Nit'
    },
    {
      field: 'digitochequeo_int',
      title: 'DC'
    },
    {
      field: 'nombre_est',
      title: 'Estado'
    },
    {
      field: 'razonsocial_int',
      title: 'Razón Social',
      cellStyle: { minWidth: 180 }
    },
    {
      field: 'nombre_ciu',
      title: 'Ciudad'
    },
    {
      field: 'telefono_int',
      title: 'Teléfono'
    },
    {
      field: 'email_int',
      title: 'Email',
      width: '400'
    },
    {
      field: 'fecha_creacion_int',
      title: 'Fecha de Creación',
      type: 'date',
      cellStyle: { minWidth: 100 }
    },
    {
      field: 'fecha_modificacion_int',
      title: 'Fecha de Modificación',
      type: 'date',
      cellStyle: { minWidth: 100 }
    },
    {
      field: 'descripcion_esp',
      title: 'Especialidad'
    }
  ]

  const proveedorInsertar = (
    <div className={styles.modal}>
      <Typography align="center" className={styles.typography} variant="button" display="block">Agregar Nuevo Proveedor</Typography>
      <br />
      <Grid container spacing={2} >
        <Grid item xs={12} md={4}> <TextField name="codigo_tipo_int" label="Tipo Interlocutor" defaultValue="1" disabled="true"
          fullWidth onChange={handleChange} /> </Grid>
        <Grid item xs={12} md={6}> <TextField name="nit_int" label="Nit del Interlocutor" fullWidth onChange={handleChange} /> </Grid>
        <Grid item xs={12} md={2}> <TextField name="digitochequeo_int" label="Digito Chequeo" fullWidth onChange={handleChange} /> </Grid>
      </Grid>
      <Grid container spacing={2} >
        <Grid item xs={12} md={12}> <TextField name="razonsocial_int" label="Razon Social" fullWidth onChange={handleChange} /> </Grid>
      </Grid>
      <Grid container spacing={2} >
        <Grid item xs={12} md={12}> <TextField name="direccion_int" label="Direccion" onChange={handleChange} fullWidth /> </Grid>
      </Grid>
      <Grid container spacing={2} >
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectCiudad"  >Ciudad</InputLabel>
            <Select
              labelId="selecCiudad"
              name="ciudad_int"
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
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectEstado"  >Estado</InputLabel>
            <Select
              labelId="selectEstado"
              name="estado_int"
              id="idselectEstado"
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
      </Grid>
      <Grid container spacing={2} >
        <Grid item xs={12} md={6}> <TextField name="telefono_int" label="Telefono" fullWidth onChange={handleChange} /> </Grid>
        <Grid item xs={12} md={6}> <TextField name="email_int" label="Email" fullWidth onChange={handleChange} /> </Grid>
      </Grid>
      <Grid container spacing={2} >
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectCiudad" >Empresa</InputLabel>
            <Select
              labelId="selecEmpresa"
              name="empresa_int"
              id="idselectEmpresa"
              fullWidth
              onChange={handleChange}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarEmpresas.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_emp}>{itemselect.nombre_emp}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} >
          <TextField type="date" name="fecha_creacion_int" label="Fecha de Creación"
            InputLabelProps={{ shrink: true }} fullWidth onChange={handleChange} />
        </Grid>
      </Grid>
      <Grid container spacing={2} >
        <Grid item xs={12} md={6}>
          <TextField type="date" name="fecha_modificacion_int" label="Fecha Modificación"
            InputLabelProps={{ shrink: true }} fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectEspecialidad" >Especialidad</InputLabel>
            <Select
              labelId="selecEspecialidad"
              name="especialidad_int"
              id="idselectEspecialidad"
              fullWidth
              onChange={handleChange}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarEspecialidades.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_esp}>{itemselect.descripcion_esp}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <br /><br />
      <div align="right">
        <Button className={styles.button} color="primary" onClick={() => grabarProveedor()} >Insertar</Button>
        <Button className={styles.button2} onClick={() => abrirCerrarModalInsertar()} >Cancelar</Button>
      </div>
    </div>
  )

  const proveedorEditar = (
    <div className={styles.modal}>
      <Typography align="center" className={styles.typography} variant="button" display="block">Actualizar Proveedor</Typography>
      <br />
      <Grid container spacing={2} >
        <Grid item xs={12} md={4}> <TextField name="codigo_tipo_int" label="Tipo Interlocutor" fullWidth disabled="true"
          onChange={handleChange} value={proveedoresSeleccionado && proveedoresSeleccionado.codigo_tipo_int} /> </Grid>
        <Grid item xs={12} md={6}> <TextField name="nit_int" label="Nit del Interlocutor" fullWidth
          onChange={handleChange} value={proveedoresSeleccionado && proveedoresSeleccionado.nit_int} /> </Grid>
        <Grid item xs={12} md={2}> <TextField name="digitochequeo_int" label="Digito Chequeo" fullWidth onChange={handleChange} 
          value={proveedoresSeleccionado && proveedoresSeleccionado.digitochequeo_int} /> </Grid>
      </Grid>
      <Grid container spacing={2} >
        <Grid item xs={12} md={12}> <TextField name="razonsocial_int" label="Razon Social" fullWidth
          onChange={handleChange} value={proveedoresSeleccionado && proveedoresSeleccionado.razonsocial_int} />
        </Grid>
      </Grid>
      <Grid container spacing={2} >
        <Grid item xs={12} md={12}> <TextField name="direccion_int" label="Direccion" fullWidth
          onChange={handleChange} value={proveedoresSeleccionado && proveedoresSeleccionado.direccion_int} />
        </Grid>
      </Grid>
      <Grid container spacing={2} >
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectCiudad"  >Ciudad</InputLabel>
            <Select
              labelId="selecCiudad"
              name="ciudad_int"
              id="idselectCiudad"
              fullWidth
              onChange={handleChange} value={proveedoresSeleccionado && proveedoresSeleccionado.ciudad_int}
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
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectEstado"  >Estado</InputLabel>
            <Select
              labelId="selectEstado"
              name="estado_int"
              id="idselectEstado"
              fullWidth
              onChange={handleChange} value={proveedoresSeleccionado && proveedoresSeleccionado.estado_int}
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
      </Grid>
      <Grid container spacing={2} >
        <Grid item xs={12} md={6}> <TextField name="telefono_int" label="Telefono" fullWidth
          onChange={handleChange} value={proveedoresSeleccionado && proveedoresSeleccionado.telefono_int} /> </Grid>
        <Grid item xs={12} md={6}> <TextField name="email_int" label="Email" fullWidth
          onChange={handleChange} value={proveedoresSeleccionado && proveedoresSeleccionado.email_int} /> </Grid>
      </Grid>
      <Grid container spacing={2} >
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectCiudad" >Empresa</InputLabel>
            <Select
              labelId="selecEmpresa"
              name="empresa_int"
              id="idselectEmpresa"
              fullWidth
              onChange={handleChange} value={proveedoresSeleccionado && proveedoresSeleccionado.empresa_int}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarEmpresas.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_emp}>{itemselect.nombre_emp}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField type="date" type="date" InputLabelProps={{ shrink: true }} name="fecha_creacion_int" label="Fecha de Creación"
            defaultValue={Moment(proveedoresSeleccionado.fecha_creacion_int).format('YYYY-MM-DD')}
            InputLabelProps={{ shrink: true }} fullWidth onChange={handleChange} />
        </Grid>
      </Grid>
      <Grid container spacing={2} >
        <Grid item xs={12} md={6}>
          <TextField type="date" type="date" InputLabelProps={{ shrink: true }} name="fecha_modificacion_int" label="Fecha de Modificación"
            defaultValue={Moment(proveedoresSeleccionado.fecha_modificacion_int).format('YYYY-MM-DD')}
            InputLabelProps={{ shrink: true }} fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectEspecialidad" >Especialidad</InputLabel>
            <Select
              labelId="selecEspecialidad"
              name="especialidad_int"
              id="idselectEspecialidad"
              fullWidth
              onChange={handleChange} value={proveedoresSeleccionado && proveedoresSeleccionado.especialidad_int}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarEspecialidades.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_esp}>{itemselect.descripcion_esp}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <br /><br />
      <div align="right">
        <Button className={styles.button} color="primary" onClick={() => actualizarProveedor()} >Editar</Button>
        <Button className={styles.button2} onClick={() => abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
      <MenuContactos interlocutor={proveedoresSeleccionado.id_int} />
    </div>
  )

  const proveedorEliminar = (
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar el Proveedor <b>{proveedoresSeleccionado && proveedoresSeleccionado.razonsocial_int}</b>? </p>
      <div align="right">
        <Button className={styles.button}color="secondary" onClick={() => borrarProveedor()}> Confirmar </Button>
        <Button className={styles.button2} onClick={() => abrirCerrarModalEliminar()}> Cancelar </Button>
      </div>
    </div>
  )

  return (
    <div className="App">
      <br />
      <Button variant="contained" startIcon={<SaveIcon />} color="primary" onClick={() => abrirCerrarModalInsertar()} >Agregar Proveedor</Button>
      <MaterialTable
        columns={columnas}
        data={listarProveedores}
        title="MAESTRA DE PROVEEDORES"
        actions={[
          {
            icon: 'edit',
            tooltip: 'Editar Proveedor',
            onClick: (event, rowData) => seleccionarProveedor(rowData, "Editar")
          },
          {
            icon: 'delete',
            tooltip: 'Borrar Proveedor',
            onClick: (event, rowData) => seleccionarProveedor(rowData, "Eliminar")
          }
        ]}
        options={{
          actionsColumnIndex: 11
        }}
        localization={{
          header: {
            actions: "Acciones"
          }
        }}
        detailPanel={[
          {
            tooltip: 'Datos adicionales del Proveedor',
            render: rowData => {
              return (
                <div
                  style={{
                    fontSize: 14,
                    textAlign: 'center',
                    color: 'white',
                    backgroundColor: '#0277bd',
                  }}
                >
                  <Button variant="contained">Dirección : {rowData.direccion_int}</Button> {}
                </div>
              )
            },
          },
        ]}
      />
      {}

      <Modal
        open={modalInsertar}
        onClose={abrirCerrarModalInsertar}
      >
        {proveedorInsertar}
      </Modal>

      <Modal
        open={modalEditar}
        onClose={abrirCerrarModalEditar}
      >
        {proveedorEditar}
      </Modal>

      <Modal
        open={modalEliminar}
        onClose={abrirCerrarModalEliminar}
      >
        {proveedorEliminar}
      </Modal>
    </div>
  );
}

export default Proveedores;

