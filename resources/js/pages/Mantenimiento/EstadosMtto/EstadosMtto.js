import React, { useEffect, useState } from "react";
import axios from "axios";
import MaterialTable from "material-table";
import { Modal, TextField, Button, Select, MenuItem, FormControl, InputLabel, Typography } from "@material-ui/core";
import { green, blue, blueGrey, red } from '@material-ui/core/colors';
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from '@material-ui/icons/Save';
import swal from 'sweetalert';

// Componentes de Conexion con el Backend
import estadosmttoServices from "../../../services/Mantenimiento/EstadosMtto";
import empresasServices from "../../../services/Empresa";

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

function EstadosMtto() {
  const styles = useStyles();
  const [listEstados, setListEstados] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [formError, setFormError] = useState(false);
  const [listarEmpresas, setListarEmpresas] = useState([]);
  const [actualiza, setActualiza] = useState(false);
  const [estadoSeleccionado, setEstadoSeleccionado] = useState({
    id_estmtto: "",
    nombre_estmtto: "",
    empresa_estmtto: "",
    observacion_estmtto: ""
  })

  useEffect(() => {
    async function fetchDataEstados() {
      const res = await estadosmttoServices.listEstadosMtto();
      setListEstados(res.data);
      setActualiza(false);
    }
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

    if (!estadoSeleccionado.nombre_estmtto) {
      errors.nombre_estmtto = true;
      formOk = false;
    }

    if (!estadoSeleccionado.empresa_estmtto) {
      errors.empresa_estmtto = true;
      formOk = false;
    }

    if (!estadoSeleccionado.observacion_estmtto) {
      errors.observacion_estmtto = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
      console.log(estadoSeleccionado);
      const res = await estadosmttoServices.save(estadoSeleccionado);

      if (res.success) {
        swal("Estados Mantenimiento", "Estado Creado de forma Correcta!", "success", { button: "Aceptar" });
        console.log(res.message)
        abrirCerrarModalInsertar();
        delete estadoSeleccionado.nombre_estmtto;
        delete estadoSeleccionado.empresa_estmtto;
        delete estadoSeleccionado.observacion_estmtto;
      } else {
        alert("");
        swal("Estados Mantenimiento", "Estado Creado de forma Correcta!", "error", { button: "Aceptar" });
        console.log(res.message);
        abrirCerrarModalInsertar();
      }
    }
    else {
      swal("Estados Mantenimiento", "Debe Ingresar Todos los Datos, Revisar INformación!", "warning", { button: "Aceptar" });
      console.log(res.message);
      abrirCerrarModalInsertar();
    }
    setActualiza(true);
  }

  const actualizarEstado = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;

    if (!estadoSeleccionado.nombre_estmtto) {
      errors.nombre_estmtto = true;
      formOk = false;
    }

    if (!estadoSeleccionado.empresa_estmtto) {
      errors.empresa_estmtto = true;
      formOk = false;
    }

    if (!estadoSeleccionado.observacion_estmtto) {
      errors.observacion_estmtto = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {

      const res = await estadosmttoServices.update(estadoSeleccionado);

      if (res.success) {
        swal("Estados Mantenimiento", "Actualizado de forma Correcta!", "success", { button: "Aceptar" });
        console.log(res.message)
        abrirCerrarModalEditar();
        delete estadoSeleccionado.nombre_estmtto;
        delete estadoSeleccionado.empresa_estmtto;
        delete estadoSeleccionado.observacion_estmtto;
      } else {
        swal("Estados Mantenimiento", "Error Creando Estado!", "error", { button: "Aceptar" });
        console.log(res.message);
        abrirCerrarModalEditar();
      }
    }
    else {
      swal("Estados Mantenimiento", "Debe Ingresar Todos los Datos, Revisar Información!", "", { button: "Aceptar" });
      console.log(res.message);
      abrirCerrarModalEditar();
    }
    setActualiza(true);
  }

  const borrarEstado = async () => {

    const res = await estadosmttoServices.delete(estadoSeleccionado.id_estmtto);

    if (res.success) {
      swal("Estados Mantenimiento", "Estado Creado de forma Correcta!", "success", { button: "Aceptar" });
      console.log(res.message)
      abrirCerrarModalEliminar();
    }
    else {
      swal("Estados Mantenimiento", "Error Creando Estado!", "success", { button: "Aceptar" });
      console.log(res.message);
      abrirCerrarModalEliminar();
    }
    setActualiza(true);
  }
  // "string","boolean","numeric","date","datetime","time","currency"
  const columnas = [
    {
      title: 'Id',
      field: 'id_estmtto'
    },
    {
      title: 'Descripción',
      field: 'nombre_estmtto'
    },
    {
      title: 'Observación',
      field: 'observacion_estmtto',
      cellStyle: { minWidth: 300 }
    },
    {
      title: 'Codigo Empresa',
      field: 'empresa_estmtto'
    },
    {
      title: 'Nombre Empresa',
      field: 'empresa.nombre_emp'
    }
  ]

  const estadoInsertar = (
    <div className={styles.modal}>
      <Typography align="center" className={styles.typography} variant="button" display="block">
        Agregar Estado Equipos
      </Typography>
      <TextField className={styles.inputMaterial} label="Descripción" name="nombre_estmtto" onChange={handleChange} />
      <br />
      <TextField className={styles.inputMaterial} label="Observación" name="observacion_estmtto" onChange={handleChange} />
      <FormControl className={styles.formControl}>
        <InputLabel id="idselectEmpresa"> Empresa </InputLabel>
        <Select
          labelId="selectEmpresa"
          name="empresa_estmtto"
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
      <Typography align="center" className={styles.typography} variant="button" display="block">
        Actualizar Estado  Equipos
      </Typography>
      <TextField className={styles.inputMaterial} label="Descripción" name="nombre_estmtto" onChange={handleChange} 
          value={estadoSeleccionado && estadoSeleccionado.nombre_estmtto} />
      <br />
      <TextField className={styles.inputMaterial} label="Observación" name="observacion_estmtto" onChange={handleChange}
          value={estadoSeleccionado && estadoSeleccionado.observacion_estmtto} />
      <FormControl className={styles.formControl} >
        <InputLabel id="idselectEmpresa">Empresa</InputLabel>
        <Select
          labelId="selectEmpresa"
          name="empresa_estmtto"
          id="idselectEmpresa"
          onChange={handleChange}
          value={estadoSeleccionado && estadoSeleccionado.empresa_estmtto}
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
      <p>Estás seguro que deseas eliminar el Estado de Mantenimiento<b>{estadoSeleccionado && estadoSeleccionado.nombre_estmtto}</b>? </p>
      <div align="right">
        <Button className={styles.button} color="secondary" onClick={() => borrarEstado()}> Confirmar </Button>
        <Button className={styles.button2} onClick={() => abrirCerrarModalEliminar()}> Cancelar </Button>

      </div>

    </div>
  )

  return (
    <div className="App">
      <br />
      <Button variant="contained" startIcon={<SaveIcon />} color="primary" onClick={() => abrirCerrarModalInsertar()} >Agregar Estado Mantenimiento</Button>
      <MaterialTable
        columns={columnas}
        data={listEstados}
        title="ESTADOS DE MANTENIMIENTO"
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

export default EstadosMtto;