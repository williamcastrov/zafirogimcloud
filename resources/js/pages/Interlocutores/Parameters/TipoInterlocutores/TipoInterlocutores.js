import React, { useEffect, useState } from "react";
import axios from "axios";
import MaterialTable from "material-table";
import { Modal, TextField, Button, Select, MenuItem, FormControl, InputLabel, Typography } from "@material-ui/core";
import { green, blue, blueGrey, red } from '@material-ui/core/colors';
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from '@material-ui/icons/Save';
import swal from 'sweetalert';

// Componentes de Conexion con el Backend
import tipointerlocutoresServices from "../../../../services/Interlocutores/TipoInterlocutores";
import estadosServices from "../../../../services/Parameters/Estados";
import empresasServices from "../../../../services/Empresa";

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

function TipoInterlocutores() {
  const styles = useStyles();
  const [listTipoInterlocutores, setListTipoInterlocutores] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [formError, setFormError] = useState(false);
  const [listarEmpresas, setListarEmpresas] = useState([]);
  const [listarEstados, setListarEstados] = useState([]);
  const [actualiza, setActualiza] = useState(false);
  const [tipointerlocutorSeleccionado, setTipoInterlocutorSeleccionado] = useState({
    id_tint: "",
    nombre_tint: "",
    empresa_tint: "",
    estado_tint: "",
  })

  useEffect(() => {
    async function fetchDataTipoInterlocutores() {
      const res = await tipointerlocutoresServices.listTipoInterlocutor();
      setListTipoInterlocutores(res.data);
      setActualiza(false);
    }
    fetchDataTipoInterlocutores();
  }, [actualiza])

  useEffect(() => {
    async function fetchDataEmpresa() {
      const res = await empresasServices.listEmpresas();
      console.log(res.data);
      setListarEmpresas(res.data);
    }
    fetchDataEmpresa();
  }, [])

  useEffect(() => {
    async function fetchDataEstados() {
      const res = await estadosServices.listEstadosGenerales();
      setListarEstados(res.data)
      console.log(res.data);
    }
    fetchDataEstados();
  }, [])

  const handleChange = e => {
    const { name, value } = e.target;

    setTipoInterlocutorSeleccionado(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const seleccionarTipoInterlocutores = (tipointerlocutor, caso) => {
    setTipoInterlocutorSeleccionado(tipointerlocutor);
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

  const grabarTipoInterlocutores = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;

    if (!tipointerlocutorSeleccionado.descripcion_tint) {
      errors.descripcion_tint = true;
      formOk = false;
    }

    if (!tipointerlocutorSeleccionado.empresa_tint) {
      errors.empresa_tint = true;
      formOk = false;
    }

    if (!tipointerlocutorSeleccionado.estado_tint) {
      errors.estado_tint = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
      console.log(tipointerlocutorSeleccionado);
      const res = await tipointerlocutoresServices.save(tipointerlocutorSeleccionado);

      if (res.success) {
        swal("Tipos Interlocutores", "Creado de forma Correcta!", "success", { button: "Aceptar" });
        console.log(res.message)
        abrirCerrarModalInsertar();
        delete tipointerlocutorSeleccionado.nombre_tint;
        delete tipointerlocutorSeleccionado.empresa_tint;
        delete tipointerlocutorSeleccionado.estado_tint;
      } else {
        swal("Tipos Interlocutores", "Error Creando el Tipo de Interlocutor!", "error", { button: "Aceptar" });
        console.log(res.message);
        abrirCerrarModalInsertar();
      }
    }
    else {
      swal("Tipos Interlocutores", "Debe Ingresar Todos los Datos, Revisar Información!", "warning", { button: "Aceptar" });
      console.log(res.message);
      abrirCerrarModalInsertar();
    }
    setActualiza(true);
  }

  const actualizarTipoInterlocutor = async () => {
    console.log("NTRE")
    setFormError({});
    let errors = {};
    let formOk = true;

    if (!tipointerlocutorSeleccionado.descripcion_tint) {
      errors.descripcion_tint = true;
      formOk = false;
    }

    if (!tipointerlocutorSeleccionado.empresa_tint) {
      errors.empresa_tint = true;
      formOk = false;
    }

    if (!tipointerlocutorSeleccionado.estado_tint) {
      errors.estado_tint = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {

      const res = await tipointerlocutoresServices.update(tipointerlocutorSeleccionado);

      if (res.success) {
        swal("Tipos Interlocutores", "Actualizado de forma Correcta!", "success", { button: "Aceptar" });
        console.log(res.message)
        abrirCerrarModalEditar();
        delete tipointerlocutorSeleccionado.nombre_tint;
        delete tipointerlocutorSeleccionado.empresa_tint;
        delete tipointerlocutorSeleccionado.estado_tint;
      } else {
        swal("Tipos Interlocutores", "Error Actualizando el Tipo de Interlocutor!", "error", { button: "Aceptar" });
        console.log(res.message);
        abrirCerrarModalEditar();
      }
    }
    else {
      swal("Tipos Interlocutores", "Debe Ingresar Todos los Datos, Revisar Información!", "warning", { button: "Aceptar" });
      console.log("TIPO INTER : ", tipointerlocutorSeleccionado);
      console.log(res.message);
      abrirCerrarModalEditar();
    }
    setActualiza(true);
  }

  const borrarTipoInterlocutor = async () => {

    const res = await tipointerlocutoresServices.delete(tipointerlocutorSeleccionado.id_tint);

    if (res.success) {
      swal("Tipos Interlocutores", "Borrado de forma Correcta!", "success", { button: "Aceptar" });
      console.log(res.message)
      abrirCerrarModalEliminar();
    }
    else {
      swal("Tipos Interlocutores", "Error Borrando el Tipo de Interlocutor!", "error", { button: "Aceptar" });
      console.log(res.message);
      abrirCerrarModalEliminar();
    }
    setActualiza(true);
  }
  // "string","boolean","numeric","date","datetime","time","currency"
  const columnas = [
    {
      title: 'Id',
      field: 'id_tint'
    },
    {
      title: 'Descripción',
      field: 'descripcion_tint'
    },
    {
      title: 'Codigo Empresa',
      field: 'empresa_tint'
    },
    {
      title: 'Nombre Empresa',
      field: 'nombre_emp'
    },
    {
      title: 'Estado',
      field: 'nombre_est'
    },
  ]

  const tipointerlocutorInsertar = (
    <div className={styles.modal}>
      <Typography align="center" className={styles.typography} variant="button" display="block">
        Agregar Nuevo Tipo Interlocutor
      </Typography>
      <TextField className={styles.inputMaterial} label="Descripción" name="descripcion_tint" onChange={handleChange} />
      <br />
      <FormControl className={styles.formControl}>
        <InputLabel id="idselectEmpresa">Empresa</InputLabel>
        <Select
          labelId="selectEmpresa"
          name="empresa_tint"
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
      <FormControl className={styles.formControl}>
        <InputLabel id="idselectEstado">Estado</InputLabel>
        <Select
          labelId="selectEstado"
          name="estado_tint"
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
      <br /><br />
      <div align="right">
        <Button className={styles.button} color="primary" onClick={() => grabarTipoInterlocutores()} >Insertar</Button>
        <Button className={styles.button2} onClick={() => abrirCerrarModalInsertar()} >Cancelar</Button>
      </div>
    </div>
  )

  const tipointerlocutorEditar = (
    <div className={styles.modal}>
      <Typography align="center" className={styles.typography} variant="button" display="block">
        Actualizar Tipo Interlocutor
      </Typography>
      <TextField className={styles.inputMaterial} label="Ciudad" name="descripcion_tint" onChange={handleChange} value={tipointerlocutorSeleccionado && tipointerlocutorSeleccionado.descripcion_tint} />
      <br />
      <FormControl className={styles.formControl}>
        <InputLabel id="idselectEmpresa">Empresa</InputLabel>
        <Select
          labelId="selectEmpresa"
          name="empresa_tint"
          id="idselectEmpresa"
          onChange={handleChange}
          value={tipointerlocutorSeleccionado && tipointerlocutorSeleccionado.empresa_tint}
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
      <FormControl className={styles.formControl}>
        <InputLabel id="idselectEstado">Estado</InputLabel>
        <Select
          labelId="selectEstado"
          name="estado_tint"
          id="idselectEstado"
          onChange={handleChange}
          value={tipointerlocutorSeleccionado && tipointerlocutorSeleccionado.estado_tint}
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
      <br /><br />
      <div align="right">
        <Button className={styles.button} color="primary" onClick={() => actualizarTipoInterlocutor()} >Editar</Button>
        <Button className={styles.button2} onClick={() => abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  const tipointerlocutorEliminar = (
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar el Tipo de Interlocutor <b>{tipointerlocutorSeleccionado && tipointerlocutorSeleccionado.descripcion_tint}</b>? </p>
      <div align="right">
        <Button className={styles.button} color="secondary" onClick={() => borrarTipoInterlocutor()}> Confirmar </Button>
        <Button className={styles.button2} onClick={() => abrirCerrarModalEliminar()}> Cancelar </Button>

      </div>

    </div>
  )

  return (
    <div className="App">
      <br />
      <Button variant="contained" startIcon={<SaveIcon />} color="primary" onClick={() => abrirCerrarModalInsertar()} >Agregar Tipo Interlocutor</Button>
      <MaterialTable
        columns={columnas}
        data={listTipoInterlocutores}
        title="TIPOS DE INTERLOCUTORES"
        actions={[
          {
            icon: 'edit',
            tooltip: 'Editar Tipos de Interlocutores',
            onClick: (event, rowData) => seleccionarTipoInterlocutores(rowData, "Editar")
          },
          {
            icon: 'delete',
            tooltip: 'Borrar Tipos de Interlocutores',
            onClick: (event, rowData) => seleccionarTipoInterlocutores(rowData, "Eliminar")
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
        {tipointerlocutorInsertar}
      </Modal>

      <Modal
        open={modalEditar}
        onClose={abrirCerrarModalEditar}
      >
        {tipointerlocutorEditar}
      </Modal>

      <Modal
        open={modalEliminar}
        onClose={abrirCerrarModalEliminar}
      >
        {tipointerlocutorEliminar}
      </Modal>
    </div>
  );
}

export default TipoInterlocutores;