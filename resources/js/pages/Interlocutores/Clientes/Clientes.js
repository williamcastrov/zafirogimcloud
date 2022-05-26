import React, { useEffect, useState } from "react";
import axios from "axios";
import MaterialTable from "material-table";
import { Modal, TextField, Button, Select, MenuItem, FormControl, InputLabel, Grid, Typography } from "@material-ui/core";
import { green, blue, blueGrey, red } from '@material-ui/core/colors';
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from '@material-ui/icons/Save';
import swal from 'sweetalert';

// Componentes de Conexion con el Backend
import clientesServices from "../../../services/Interlocutores/Clientes";
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

function Clientes() {
  const styles = useStyles();
  const [listarClientes, setListarClientes] = useState([]);
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
  const [clientesSeleccionado, setClientesSeleccionado] = useState({
    id_cli: "",
    codigo_tipo_cli: 2,
    nit_cli: "",
    digitochequeo_cli: 0,
    estado_cli: "",
    primer_nombre_cli: "",
    segundo_nombre_cli: "",
    primer_apellido_cli: "",
    segundo_apellido_cli: "",
    razonsocial_cli: "",
    ciudad_cli: "",
    direccion_cli: "",
    telefono_cli: "",
    email_cli: "",
    empresa_cli: "",
    fecha_creacion_cli: fechaHoy,
    fecha_modificacion_cli: fechaHoy,
    especialidad_cli: ""
  })

  useEffect(() => {
    async function fetchDataClientes() {
      const res = await clientesServices.listClientes();
      setListarClientes(res.data);
      setActualiza(false);
      //console.log(res.data)
    }
    fetchDataClientes();
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

    setClientesSeleccionado(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const seleccionarCliente = (cliente, caso) => {
    setClientesSeleccionado(cliente);
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

  const grabarCliente = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;
/*
    if (!clientesSeleccionado.codigo_tipo_cli) {
      errors.codigo_tipo_cli = true;
      formOk = false;
    }
*/
    if (!clientesSeleccionado.nit_cli) {
      errors.nit_cli = true;
      formOk = false;
    }

    if (!clientesSeleccionado.digitochequeo_cli) {
      errors.digitochequeo_cli = true;
      formOk = false;
    }

    if (!clientesSeleccionado.estado_cli) {
      errors.estado_cli = true;
      formOk = false;
    }

    if (!clientesSeleccionado.razonsocial_cli) {
      errors.razonsocial_cli = true;
      formOk = false;
    }

    if (!clientesSeleccionado.ciudad_cli) {
      errors.ciudad_cli = true;
      formOk = false;
    }

    if (!clientesSeleccionado.direccion_cli) {
      errors.direccion_cli = true;
      formOk = false;
    }

    if (!clientesSeleccionado.telefono_cli) {
      errors.telefono_cli = true;
      formOk = false;
    }

    if (!clientesSeleccionado.email_cli) {
      errors.email_cli = true;
      formOk = false;
    }

    if (!clientesSeleccionado.empresa_cli) {
      errors.empresa_cli = true;
      formOk = false;
    }

    if (!clientesSeleccionado.fecha_creacion_cli) {
      errors.fecha_creacion_cli = true;
      formOk = false;
    }

    if (!clientesSeleccionado.fecha_modificacion_cli) {
      errors.fecha_modificacion_cli = true;
      formOk = false;
    }

    if (!clientesSeleccionado.especialidad_cli) {
      errors.especialidad_cli = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
      //console.log(clientesSeleccionado);
      const res = await clientesServices.save(clientesSeleccionado);

      if (res.success) {
        swal("Cliente", "Creado de forma Correcta!", "success", { button: "Aceptar" });
        console.log(res.message)
        abrirCerrarModalInsertar();
        delete clientesSeleccionado.codigo_tipo_cli;
        delete clientesSeleccionado.nit_cli;
        delete clientesSeleccionado.digitochequeo_cli;
        delete clientesSeleccionado.estado_cli;
        delete clientesSeleccionado.razonsocial_cli;
        delete clientesSeleccionado.ciudad_cli;
        delete clientesSeleccionado.direccion_cli;
        delete clientesSeleccionado.telefono_cli;
        delete clientesSeleccionado.email_cli;
        delete clientesSeleccionado.empresa_cli;
        delete clientesSeleccionado.fecha_creacion_cli;
        delete clientesSeleccionado.fecha_modificacion_cli;
        delete clientesSeleccionado.especialidad_cli;
      } else {
        swal("Cliente", "Error Creando el Cliente!", "error", { button: "Aceptar" });
        console.log(res.message);
        abrirCerrarModalInsertar();
      }
    }
    else {
      swal("Cliente", "Debe Ingresar Todos los Datos, Error!", "warning", { button: "Aceptar" });
      console.log(clientesSeleccionado);
      console.log(res.message);
      abrirCerrarModalInsertar();
    }
    setActualiza(true);
  }

  const actualizarCliente = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;

    if (!clientesSeleccionado.codigo_tipo_cli) {
      errors.codigo_tipo_cli = true;
      formOk = false;
      alert("1")
    }

    if (!clientesSeleccionado.nit_cli) {
      errors.nit_cli = true;
      formOk = false;
      alert("2")
    }
/*
    if (!clientesSeleccionado.digitochequeo_cli) {
      errors.digitochequeo_cli = true;
      formOk = false;
      alert("3")
    }
*/
    if (!clientesSeleccionado.estado_cli) {
      errors.estado_cli = true;
      formOk = false;
      alert("4")
    }

    if (!clientesSeleccionado.razonsocial_cli) {
      errors.razonsocial_cli = true;
      formOk = false;
      alert("5")
    }

    if (!clientesSeleccionado.ciudad_cli) {
      errors.ciudad_cli = true;
      formOk = false;
      alert("6")
    }

    if (!clientesSeleccionado.direccion_cli) {
      errors.direccion_cli = true;
      formOk = false;
      alert("7")
    }

    if (!clientesSeleccionado.telefono_cli) {
      errors.telefono_cli = true;
      formOk = false;
      alert("8")
    }

    if (!clientesSeleccionado.email_cli) {
      errors.email_cli = true;
      formOk = false;
      alert("9")
    }

    if (!clientesSeleccionado.empresa_cli) {
      errors.empresa_cli = true;
      formOk = false;
      alert("10")
    }

    if (!clientesSeleccionado.fecha_creacion_cli) {
      errors.fecha_creacion_cli = true;
      formOk = false;
      alert("11")
    }

    if (!clientesSeleccionado.fecha_modificacion_cli) {
      errors.fecha_modificacion_cli = true;
      formOk = false;
      alert("12")
    }

    if (!clientesSeleccionado.especialidad_cli) {
      errors.especialidad_cli = true;
      formOk = false;
      alert("13")
    }

    setFormError(errors);

    if (formOk) {

      const res = await clientesServices.update(clientesSeleccionado);

      if (res.success) {
        swal("Cliente", "Actualizado de forma Correcta!", "success", { button: "Aceptar" });
        console.log(res.message)
        abrirCerrarModalEditar();
        delete clientesSeleccionado.codigo_tipo_cli;
        delete clientesSeleccionado.nit_cli;
        delete clientesSeleccionado.digitochequeo_cli;
        delete clientesSeleccionado.estado_cli;
        delete clientesSeleccionado.razonsocial_cli;
        delete clientesSeleccionado.ciudad_cli;
        delete clientesSeleccionado.direccion_cli;
        delete clientesSeleccionado.telefono_cli;
        delete clientesSeleccionado.email_cli;
        delete clientesSeleccionado.empresa_cli;
        delete clientesSeleccionado.fecha_creacion_cli;
        delete clientesSeleccionado.fecha_modificacion_cli;
        delete clientesSeleccionado.especialidad_cli;
      } else {
        swal("Cliente", "Error Actualizando el Cliente!", "error", { button: "Aceptar" });
        console.log(res.message);
        abrirCerrarModalEditar();
      }
    }
    else {
      swal("Cliente", "Debe Ingresar Todos los Datos, Error!", "warning", { button: "Aceptar" });
      console.log("DATOS CLIENTES ACTUALIZAR : ",clientesSeleccionado);
      console.log(res.message);
      abrirCerrarModalEditar();
    }
    setActualiza(true);
  }

  const borrarCliente = async () => {

    const res = await clientesServices.delete(clientesSeleccionado.id_cli);

    if (res.success) {
      swal("Cliente", "Borrado de forma Correcta!", "success", { button: "Aceptar" });
      console.log(res.message)
      abrirCerrarModalEliminar();
    }
    else {
      swal("Cliente", "Error Borrando el Cliente!", "error", { button: "Aceptar" });
      console.log(res.message);
      abrirCerrarModalEliminar();
    }
    setActualiza(true);
  }

  // "string","boolean","numeric","date","datetime","time","currency"
  const columnas = [
    {
      field: 'id_cli',
      title: 'Id'
    },
    {
      field: 'nit_cli',
      title: 'Nit'
    },
    {
      field: 'digitochequeo_cli',
      title: 'DC',
      cellStyle: { minWidth: 20 }
    },
    {
      field: 'nombre_est',
      title: 'Estado'
    },
    {
      field: 'razonsocial_cli',
      title: 'Razón Social',
      cellStyle: { minWidth: 180 }
    },
    {
      field: 'nombre_ciu',
      title: 'Ciudad'
    },
    {
      field: 'telefono_cli',
      title: 'Teléfono'
    },
    {
      field: 'email_cli',
      title: 'Email',
      width: '400'
    },
    {
      field: 'fecha_creacion_cli',
      title: 'Fecha de Creación',
      type: "date",
      cellStyle: { minWidth: 100 }
    },
    {
      field: 'fecha_modificacion_cli',
      title: 'Fecha de Modificación',
      type: "date",
      cellStyle: { minWidth: 100 }
    },
    {
      field: 'descripcion_esp',
      title: 'Especialidad'
    }
  ]

  const clienteInsertar = (
    <div className={styles.modal}>
      <Typography align="center" className={styles.typography} variant="button" display="block">Agregar Nuevo Cliente</Typography>
      <Grid container spacing={2} >
        <Grid item xs={12} md={4}> <TextField name="codigo_tipo_cli" label="Tipo Interlocutor" defaultValue="2" disabled="true"
          fullWidth onChange={handleChange} /> </Grid>
        <Grid item xs={12} md={6}> <TextField name="nit_cli" label="Nit del Interlocutor" fullWidth onChange={handleChange} /> </Grid>
        <Grid item xs={12} md={2}> <TextField name="digitochequeo_cli" label="Digito Chequeo" fullWidth onChange={handleChange} /> </Grid>
      </Grid>
      <Grid container spacing={2} >
        <Grid item xs={12} md={12}> <TextField name="razonsocial_cli" label="Razon Social" fullWidth onChange={handleChange} /> </Grid>
      </Grid>
      <Grid container spacing={2} >
        <Grid item xs={12} md={12}> <TextField name="direccion_cli" label="Direccion" onChange={handleChange} fullWidth /> </Grid>
      </Grid>
      <Grid container spacing={2} >
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectCiudad"  >Ciudad</InputLabel>
            <Select
              labelId="selecCiudad"
              name="ciudad_cli"
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
              name="estado_cli"
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
        <Grid item xs={12} md={6}> <TextField name="telefono_cli" label="Telefono" fullWidth onChange={handleChange} /> </Grid>
        <Grid item xs={12} md={6}> <TextField name="email_cli" label="Email" fullWidth onChange={handleChange} /> </Grid>
      </Grid>
      <Grid container spacing={2} >
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectCiudad" >Empresa</InputLabel>
            <Select
              labelId="selecEmpresa"
              name="empresa_cli"
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
        <Grid item xs={12} md={6}>
          <TextField type="date" InputLabelProps={{ shrink: true }} name="fecha_creacion_cli" label="Fecha Creación"
            fullWidth onChange={handleChange} />
        </Grid>
      </Grid>

      <Grid container spacing={2} >
        <Grid item xs={12} md={6}>
          <TextField type="date" InputLabelProps={{ shrink: true }} name="fecha_modificacion_cli" label="Fecha Modificación"
            fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectEspecialidad" >Especialidad</InputLabel>
            <Select
              labelId="selecEspecialidad"
              name="especialidad_cli"
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
        <Button className={styles.button} color="primary" onClick={() => grabarCliente()} >Insertar</Button>
        <Button className={styles.button2} onClick={() => abrirCerrarModalInsertar()} >Cancelar</Button>
      </div>
    </div>
  )

  const clienteEditar = (
    <div className={styles.modal}>
      <Typography align="center" className={styles.typography} variant="button" display="block">Actualizar Clientes</Typography>
      <Grid container spacing={2} >
        <Grid item xs={12} md={4}> <TextField name="codigo_tipo_cli" label="Tipo Interlocutor" fullWidth disabled="true"
          onChange={handleChange} value={clientesSeleccionado && clientesSeleccionado.codigo_tipo_cli} /> </Grid>
        <Grid item xs={12} md={6}> <TextField name="nit_cli" label="Nit del Interlocutor" fullWidth
          onChange={handleChange} value={clientesSeleccionado && clientesSeleccionado.nit_cli} /> </Grid>
        <Grid item xs={12} md={2}> <TextField name="digitochequeo_cli" label="Digito Chequeo" fullWidth onChange={handleChange}
          value={clientesSeleccionado && clientesSeleccionado.digitochequeo_cli} /> </Grid>
      </Grid>
      <Grid container spacing={2} >
        <Grid item xs={12} md={12}> <TextField name="razonsocial_cli" label="Razon Social" fullWidth
          onChange={handleChange} value={clientesSeleccionado && clientesSeleccionado.razonsocial_cli} />
        </Grid>
      </Grid>
      <Grid container spacing={2} >
        <Grid item xs={12} md={12}> <TextField name="direccion_cli" label="Direccion" fullWidth
          onChange={handleChange} value={clientesSeleccionado && clientesSeleccionado.direccion_cli} />
        </Grid>
      </Grid>
      <Grid container spacing={2} >
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectCiudad"  >Ciudad</InputLabel>
            <Select
              labelId="selecCiudad"
              name="ciudad_cli"
              id="idselectCiudad"
              fullWidth
              onChange={handleChange} value={clientesSeleccionado && clientesSeleccionado.ciudad_cli}
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
              name="estado_cli"
              id="idselectEstado"
              fullWidth
              onChange={handleChange} value={clientesSeleccionado && clientesSeleccionado.estado_cli}
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
        <Grid item xs={12} md={6}> <TextField name="telefono_cli" label="Telefono" fullWidth
          onChange={handleChange} value={clientesSeleccionado && clientesSeleccionado.telefono_cli} /> </Grid>
        <Grid item xs={12} md={6}> <TextField name="email_cli" label="Email" fullWidth
          onChange={handleChange} value={clientesSeleccionado && clientesSeleccionado.email_cli} /> </Grid>
      </Grid>
      <Grid container spacing={2} >
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectCiudad" >Empresa</InputLabel>
            <Select
              labelId="selecEmpresa"
              name="empresa_cli"
              id="idselectEmpresa"
              fullWidth
              onChange={handleChange} value={clientesSeleccionado && clientesSeleccionado.empresa_cli}
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
        <Grid item xs={12} md={6}> <TextField name="fecha_creacion_cli" label="Fecha Creacion" fullWidth
          onChange={handleChange} value={clientesSeleccionado && clientesSeleccionado.fecha_creacion_cli} /> </Grid>
      </Grid>
      <Grid container spacing={2} >
        <Grid item xs={12} md={6}> <TextField name="fecha_modificacion_cli" label="Fecha Modificación" fullWidth
          onChange={handleChange} value={clientesSeleccionado && clientesSeleccionado.fecha_modificacion_cli} />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectEspecialidad" >Especialidad</InputLabel>
            <Select
              labelId="selecEspecialidad"
              name="especialidad_cli"
              id="idselectEspecialidad"
              fullWidth
              onChange={handleChange} value={clientesSeleccionado && clientesSeleccionado.especialidad_cli}
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
        <Button className={styles.button} color="primary" onClick={() => actualizarCliente()} >Editar</Button>
        <Button className={styles.button2} onClick={() => abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
      <MenuContactos interlocutor={clientesSeleccionado.id_cli} nitCliente={clientesSeleccionado.nit_cli} />
    </div>
  )

  const clienteEliminar = (
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar el Cliente <b>{clientesSeleccionado && clientesSeleccionado.razonsocial_cli}</b>? </p>
      <div align="right">
        <Button className={styles.button} color="secondary" onClick={() => borrarCliente()}> Confirmar </Button>
        <Button className={styles.button2} onClick={() => abrirCerrarModalEliminar()}> Cancelar </Button>
      </div>
    </div>
  )

  return (
    <div className="App">
      <br />
      <Button variant="contained" startIcon={<SaveIcon />} color="primary" onClick={() => abrirCerrarModalInsertar()} >Agregrar Cliente</Button>
      <MaterialTable
        columns={columnas}
        data={listarClientes}
        title="MAESTRA DE CLIENTES"
        actions={[
          {
            icon: 'edit',
            tooltip: 'Editar Cliente',
            onClick: (event, rowData) => seleccionarCliente(rowData, "Editar")
          },
          {
            icon: 'delete',
            tooltip: 'Borrar Cliente',
            onClick: (event, rowData) => seleccionarCliente(rowData, "Eliminar")
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
            tooltip: 'Datos adicionales del Cliente',
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
                  <Button variant="contained">Dirección : {rowData.direccion_cli}</Button> {}
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
        {clienteInsertar}
      </Modal>

      <Modal
        open={modalEditar}
        onClose={abrirCerrarModalEditar}
      >
        {clienteEditar}
      </Modal>

      <Modal
        open={modalEliminar}
        onClose={abrirCerrarModalEliminar}
      >
        {clienteEliminar}
      </Modal>
    </div>
  );
}

export default Clientes;

