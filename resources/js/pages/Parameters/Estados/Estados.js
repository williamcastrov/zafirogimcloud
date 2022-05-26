import React, { useEffect, useState } from "react";
import axios from "axios";
import MaterialTable from "material-table";
import { Modal, TextField, Button, Select, MenuItem, FormControl, InputLabel, Typography } from "@material-ui/core";
import { green, blue, blueGrey, red } from '@material-ui/core/colors';
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from '@material-ui/icons/Save';
import swal from 'sweetalert';

// Componentes de Conexion con el Backend
import estadosServices from "../../../services/Parameters/Estados";
import empresasServices from "../../../services/Empresa";
import tiposestadosServices from "../../../services/GestionOrdenes/TiposEstados";

const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: 400,
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
    minWidth: 315,
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

function Estados() {
  const styles = useStyles();
  const [listEstados, setListEstados] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [formError, setFormError] = useState(false);
  const [listarEmpresas, setListarEmpresas] = useState([]);
  const [listarTipoOperacion, setListarTipoOperacion] = useState([]);
  const [actualiza, setActualiza] = useState(false);
  const [estadoSeleccionado, setEstadoSeleccionado] = useState({
    id_est: "",
    tipooperacion_est: "",
    nombre_est: "",
    empresa_est: "",
    observacion_est: ""
  })

  useEffect(() => {
    async function fetchDataEstados() {
      const res = await estadosServices.listEstados();
      setListEstados(res.data);
    }
    setActualiza(false);
    fetchDataEstados();
  }, [actualiza])

  useEffect(() => {
    async function fetchDataEmpresas() {
      const res = await empresasServices.listEmpresas();
      setListarEmpresas(res.data)
      console.log(res.data);
    }
    fetchDataEmpresas();
  }, [])

  useEffect(() => {
    async function fetchDataTipoOperacion() {
      const res = await tiposestadosServices.listTiposEstados();
      setListarTipoOperacion(res.data);
      console.log("TIPOS ESTADOS : ", res.data)
    }
    fetchDataTipoOperacion();
  }, [])

  const handleChange = e => {
    const { name, value } = e.target;

    setEstadoSeleccionado(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const seleccionarEstado = (estado, caso) => {
    setEstadoSeleccionado(estado);
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

  const grabarEstado = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;

    if (!estadoSeleccionado.nombre_est) {
      errors.nombre_est = true;
      formOk = false;
    }

    if (!estadoSeleccionado.tipooperacion_est) {
      errors.tipooperacion_est = true;
      formOk = false;
    }

    if (!estadoSeleccionado.empresa_est) {
      errors.empresa_est = true;
      formOk = false;
    }

    if (!estadoSeleccionado.observacion_est) {
      errors.observacion_est = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
      console.log(estadoSeleccionado);
      const res = await estadosServices.save(estadoSeleccionado);

      if (res.success) {
        swal({
          title: "Estado",
          text: "Creado de forma Correcta!",
          icon: "success",
          button: "Aceptar"
        });
        console.log(res.message)
        abrirCerrarModalInsertar();
        delete estadoSeleccionado.nombre_est;
        delete estadoSeleccionado.tipooperacion_est;
        delete estadoSeleccionado.empresa_est;
        delete estadoSeleccionado.observacion_est;
      } else {
        swal({
          title: "Estado",
          text: "Error Creando el Estado!",
          icon: "error",
          button: "Aceptar"
        });
        console.log(res.message);
        abrirCerrarModalInsertar();
      }
    }
    else {
      swal({
        title: "Estado",
        text: "Debe Ingresar Todos los Datos, Error Creando el Estado!",
        icon: "warning",
        button: "Aceptar"
      });
      console.log(res.message);
      abrirCerrarModalInsertar();
    }
    setActualiza(true);
  }

  const actualizarEstado = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;

    if (!estadoSeleccionado.nombre_est) {
      errors.nombre_est = true;
      formOk = false;
    }

    if (!estadoSeleccionado.tipooperacion_est) {
      errors.tipooperacion_est = true;
      formOk = false;
    }

    if (!estadoSeleccionado.empresa_est) {
      errors.empresa_est = true;
      formOk = false;
    }

    if (!estadoSeleccionado.observacion_est) {
      errors.observacion_est = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {

      const res = await estadosServices.update(estadoSeleccionado);

      if (res.success) {
        swal({
          title: "Estado",
          text: "Actualizado de forma Correcta!",
          icon: "success",
          button: "Aceptar"
        });
        console.log(res.message)
        abrirCerrarModalEditar();
        delete estadoSeleccionado.nombre_est;
        delete estadoSeleccionado.tipooperacion_est;
        delete estadoSeleccionado.empresa_est;
        delete estadoSeleccionado.observacion_est;
      } else {
        swal({
          title: "Estado",
          text: "Error Actualizando el Estado!",
          icon: "error",
          button: "Aceptar"
        });
        console.log(res.message);
        abrirCerrarModalEditar();
      }
    }
    else {
      swal({
        title: "Estado",
        text: "Debe Ingresar Todos los Datos, Error Actualizando el Estado!",
        icon: "warning",
        button: "Aceptar"
      });
      console.log(res.message);
      abrirCerrarModalEditar();
    }
    setActualiza(true);
  }

  const borrarEstado = async () => {

    const res = await estadosServices.delete(estadoSeleccionado.id_est);

    if (res.success) {
      swal({
        title: "Estado",
        text: "Borrado de forma Correcta!",
        icon: "success",
        button: "Aceptar"
      });
      console.log(res.message)
      abrirCerrarModalEliminar();
    }
    else {
      swal({
        title: "Estado",
        text: "Error Brorrando el Estado!",
        icon: "error",
        button: "Aceptar"
      });
      console.log(res.message);
      abrirCerrarModalEliminar();
    }
    setActualiza(true);
  }
  // "string","boolean","numeric","date","datetime","time","currency"
  const columnas = [
    {
      title: 'Id',
      field: 'id_est'
    },
    {
      title: 'Descripción',
      field: 'nombre_est'
    },
    {
      title: 'Tipos Estados',
      field: 'descripcion_test'
    },
    {
      title: 'Observación',
      field: 'observacion_est',
      cellStyle: { minWidth: 400 }
    },
    {
      title: 'Codigo Empresa',
      field: 'empresa_est'
    },
    {
      title: 'Nombre Empresa',
      field: 'nombre_emp'
    }
  ]

  const estadoInsertar = (
    <div className={styles.modal}>
      <Typography align="center" className={styles.typography} variant="button" display="block" >
        Agregar Nuevo Estado
      </Typography>
      <FormControl className={styles.formControl}>
        <InputLabel id="idselecttipooperacion_est">Tipo de Estado</InputLabel>
        <Select
          labelId="selecttipooperacion_est"
          name="tipooperacion_est"
          id="idselecttipooperacion_est"
          fullWidth
          onChange={handleChange}
        >
          <MenuItem value=""> <em>None</em> </MenuItem>
          {
            listarTipoOperacion.map((itemselect) => {
              return (
                <MenuItem value={itemselect.id_test}>{itemselect.descripcion_test}</MenuItem>
              )
            })
          }
        </Select>
      </FormControl>
      <TextField className={styles.inputMaterial} label="Nombre del Estado" name="nombre_est" onChange={handleChange} />
      <br />
      <TextField className={styles.inputMaterial} label="Descripción" name="observacion_est" onChange={handleChange} />
      <br />
      <FormControl className={styles.formControl}>
        <InputLabel id="idselectEmpresa"> Empresa </InputLabel>
        <Select
          labelId="selectEmpresa"
          name="empresa_est"
          id="idselectEmpresa"
          onChange={handleChange}
        >
          <MenuItem value="">  <em>None</em> </MenuItem>
          {
            listarEmpresas.map((itemselect) => {
              return (
                <MenuItem value={itemselect.id_emp}>{itemselect.nombre_emp}</MenuItem>
              )
            })
          }
        </Select>
      </FormControl>
      <br /><br />
      <div align="right">
        <Button className={styles.button} color="primary" onClick={() => grabarEstado()} >Insertar</Button>
        <Button className={styles.button2} onClick={() => abrirCerrarModalInsertar()} >Cancelar</Button>
      </div>
    </div>
  )

  const estadoEditar = (
    <div className={styles.modal}>
      <Typography align="center" className={styles.typography} variant="button" display="block" >
        Actualizar Estado
      </Typography>
      <FormControl className={styles.formControl}>
        <InputLabel id="idselecttipooperacion_est">Tipo de Estado</InputLabel>
        <Select
          labelId="selecttipooperacion_est"
          name="tipooperacion_est"
          id="idselecttipooperacion_est"
          fullWidth
          onChange={handleChange}
          value={estadoSeleccionado && estadoSeleccionado.tipooperacion_est}
        >
          <MenuItem value=""> <em>None</em> </MenuItem>
          {
            listarTipoOperacion.map((itemselect) => {
              return (
                <MenuItem value={itemselect.id_test}>{itemselect.descripcion_test}</MenuItem>
              )
            })
          }
        </Select>
      </FormControl>
      <TextField className={styles.inputMaterial} label="Nombre del Estado" name="nombre_est" onChange={handleChange} value={estadoSeleccionado && estadoSeleccionado.nombre_est} />
      <br />
      <TextField className={styles.inputMaterial} label="Descripción" name="observacion_est" onChange={handleChange} 
        value={estadoSeleccionado && estadoSeleccionado.observacion_est} />
      <br />
      <FormControl className={styles.formControl} >
        <InputLabel id="idselectEmpresa">Empresa</InputLabel>
        <Select
          labelId="selectEmpresa"
          name="empresa_est"
          id="idselectEmpresa"
          onChange={handleChange}
          value={estadoSeleccionado && estadoSeleccionado.empresa_est}
        >
          <MenuItem value="">  <em>None</em> </MenuItem>
          {
            listarEmpresas.map((itemselect) => {
              return (
                <MenuItem value={itemselect.id_emp}>{itemselect.nombre_emp}</MenuItem>
              )
            })
          }
        </Select>
      </FormControl>
      <br /><br />
      <div align="right">
        <Button className={styles.button} color="primary" onClick={() => actualizarEstado()} >Editar</Button>
        <Button className={styles.button2} onClick={() => abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  const estadoEliminar = (
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar el Estado <b>{estadoSeleccionado && estadoSeleccionado.nombre_est}</b>? </p>
      <div align="right">
        <Button className={styles.button} color="secondary" onClick={() => borrarEstado()}> Confirmar </Button>
        <Button className={styles.button2} onClick={() => abrirCerrarModalEliminar()}> Cancelar </Button>

      </div>

    </div>
  )

  return (
    <div className="App">
      <br />
      <Button variant="contained" startIcon={<SaveIcon />} color="primary" onClick={() => abrirCerrarModalInsertar()} >Agregar Estado</Button>
      <MaterialTable
        columns={columnas}
        data={listEstados}
        title="MAESTRA DE ESTADOS"
        actions={[
          {
            icon: 'edit',
            tooltip: 'Editar Estado',
            onClick: (event, rowData) => seleccionarEstado(rowData, "Editar")
          },
          {
            icon: 'delete',
            tooltip: 'Borrar Estado',
            onClick: (event, rowData) => seleccionarEstado(rowData, "Eliminar")
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
        {estadoInsertar}
      </Modal>

      <Modal
        open={modalEditar}
        onClose={abrirCerrarModalEditar}
      >
        {estadoEditar}
      </Modal>

      <Modal
        open={modalEliminar}
        onClose={abrirCerrarModalEliminar}
      >
        {estadoEliminar}
      </Modal>
    </div>
  );
}

export default Estados;