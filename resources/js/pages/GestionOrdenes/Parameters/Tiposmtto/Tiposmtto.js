import React, { useEffect, useState } from "react";
import axios from "axios";
import MaterialTable from "material-table";
import { Modal, TextField, Button, Select, MenuItem, FormControl, InputLabel, Typography } from "@material-ui/core";
import { green, blue, blueGrey, red } from '@material-ui/core/colors';
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from '@material-ui/icons/Save';
import swal from 'sweetalert';

// Componentes de Conexion con el Backend
import tiposmttoServices from "../../../../services/Mantenimiento/Tiposmtto";
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

function Tiposmtto() {
  const styles = useStyles();
  const [listTiposmtto, setListTiposmtto] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [formError, setFormError] = useState(false);
  const [listarEmpresas, setListarEmpresas] = useState([]);
  const [listarEstados, setListarEstados] = useState([]);
  const [actualiza, setActualiza] = useState(false);
  const [tiposmttoSeleccionado, setTiposmttoSeleccionado] = useState({
    id_tmt: "",
    descripcion_tmt: "",
    empresa_tmt: "",
    estado_tmt: "",
  })

  useEffect(() => {
    async function fetchDataTiposmtto() {
      const res = await tiposmttoServices.listTiposmtto();
      setListTiposmtto(res.data);
      setActualiza(false);
    }
    fetchDataTiposmtto();
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
    async function fetchDataEstados() {
      const res = await estadosServices.listEstadosGenerales();
      setListarEstados(res.data)
      console.log(res.data);
    }
    fetchDataEstados();
  }, [])

  const handleChange = e => {
    const { name, value } = e.target;

    setTiposmttoSeleccionado(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const seleccionarTipomtto = (tipomtto, caso) => {
    setTiposmttoSeleccionado(tipomtto);
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

  const grabarTipomtto = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;

    if (!tiposmttoSeleccionado.descripcion_tmt) {
      errors.descripcion_tmt = true;
      formOk = false;
    }

    if (!tiposmttoSeleccionado.empresa_tmt) {
      errors.empresa_tmt = true;
      formOk = false;
    }

    if (!tiposmttoSeleccionado.estado_tmt) {
      errors.estado_tmt = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
      console.log(tiposmttoSeleccionado);
      const res = await tiposmttoServices.save(tiposmttoSeleccionado);

      if (res.success) {
        swal("Tipo de Mantenimiento", "Creado de forma Correcta!", "success", { button: "Aceptar" });
        console.log(res.message)
        abrirCerrarModalInsertar();
        delete tiposmttoSeleccionado.descripcion_tmt;
        delete tiposmttoSeleccionado.empresa_tmt;
        delete tiposmttoSeleccionado.estado_tmt;
      } else {
        swal("Tipo de Mantenimiento", "Error Creando el Tipo de Mantenimiento!", "error", { button: "Aceptar" });
        console.log(res.message);
        abrirCerrarModalInsertar();
      }
    }
    else {
      swal("Tipo de Mantenimiento", "Debe Ingresar Todos los Datos, Revisar Información!", "warning", { button: "Aceptar" });
      console.log(res.message);
      abrirCerrarModalInsertar();
    }
    setActualiza(true);
  }

  const actualizarTipomtto = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;

    if (!tiposmttoSeleccionado.descripcion_tmt) {
      errors.descripcion_tmt = true;
      formOk = false;
    }

    if (!tiposmttoSeleccionado.empresa_tmt) {
      errors.empresa_tmt = true;
      formOk = false;
    }

    if (!tiposmttoSeleccionado.estado_tmt) {
      errors.estado_tmt = true;
      formOk = false;
    }
    setFormError(errors);

    if (formOk) {

      const res = await tiposmttoServices.update(tiposmttoSeleccionado);

      if (res.success) {
        swal("Tipo de Mantenimiento", "Actualizado de forma Correcta!", "success", { button: "Aceptar" });
        console.log(res.message)
        abrirCerrarModalEditar();
        delete tiposmttoSeleccionado.descripcion_tmt;
        delete tiposmttoSeleccionado.empresa_tmt;
        delete tiposmttoSeleccionado.estado_tmt;
      } else {
        swal("Tipo de Mantenimiento", "Error Actualizando el tipo de Mantenimiento!", "error", { button: "Aceptar" });
        console.log(res.message);
        abrirCerrarModalEditar();
      }
    }
    else {
      swal("Tipo de Mantenimiento", "Debe Ingresar Todos los Datos, Revisar Información!", "warning", { button: "Aceptar" });
      console.log(res.message);
      abrirCerrarModalEditar();
    }
    setActualiza(true);
  }

  const borrarTipomtto = async () => {

    const res = await tiposmttoServices.delete(tiposmttoSeleccionado.id_tmt);

    if (res.success) {
      swal("Tipo de Mantenimiento", "Borrado de forma Correcta!", "success", { button: "Aceptar" });
      console.log(res.message)
      abrirCerrarModalEliminar();
    }
    else {
      swal("Tipo de Mantenimiento", "Error Borrando el Tipo de Mantenimiento!", "error", { button: "Aceptar" });
      console.log(res.message);
      abrirCerrarModalEliminar();
    }
    setActualiza(true);
  }
  // "string","boolean","numeric","date","datetime","time","currency"
  const columnas = [
    {
      title: 'Id',
      field: 'id_tmt'
    },
    {
      title: 'Descripcion',
      field: 'descripcion_tmt'
    },
    {
      title: 'Código',
      field: 'empresa_tmt'
    },
    {
      title: 'Nombre Empresa',
      field: 'nombre_emp'
    },
    {
      title: 'Codigo',
      field: 'estado_tmt'
    },
    {
      title: 'Estado',
      field: 'nombre_est'
    }
  ]

  const tipomttoInsertar = (
    <div className={styles.modal}>
      <Typography align="center" className={styles.typography} variant="button" display="block">Agregar Tipo de Actividad</Typography>
      <TextField className={styles.inputMaterial} label="Descripcion" name="descripcion_tmt" onChange={handleChange} />
      <br />
      <FormControl className={styles.formControl}>
        <InputLabel id="idselectEmpresa">Empresa</InputLabel>
        <Select
          labelId="selectEmpresa"
          name="empresa_tmt"
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
      <br />
      <FormControl className={styles.formControl}>
        <InputLabel id="idselectEstado">Estado</InputLabel>
        <Select
          labelId="selectEstado"
          name="estado_tmt"
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
      <div align="right">
        <Button className={styles.button} color="primary" onClick={() => grabarTipomtto()} >Insertar</Button>
        <Button className={styles.button2} onClick={() => abrirCerrarModalInsertar()} >Cancelar</Button>
      </div>
    </div>
  )

  const tipomttoEditar = (
    <div className={styles.modal}>
       <Typography align="center" className={styles.typography} variant="button" display="block">Actualizar Tipo de Actividad</Typography>
      <TextField className={styles.inputMaterial} label="Descripcion" name="descripcion_tmt" onChange={handleChange} value={tiposmttoSeleccionado && tiposmttoSeleccionado.descripcion_tmt} />
      <br />
      <FormControl className={styles.formControl}>
        <InputLabel id="idselectEmpresa">Empresa</InputLabel>
        <Select
          labelId="selectEmpresa"
          name="empresa_tmt"
          id="idselectEmpresa"
          onChange={handleChange}
          value={tiposmttoSeleccionado && tiposmttoSeleccionado.empresa_tmt}
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
          name="estado_tmt"
          id="idselectEstado"
          onChange={handleChange}
          value={tiposmttoSeleccionado && tiposmttoSeleccionado.estado_tmt}
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
      <br />
      <div align="right">
        <Button className={styles.button} color="primary" onClick={() => actualizarTipomtto()} >Editar</Button>
        <Button className={styles.button2} onClick={() => abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  const tipomttoEliminar = (
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar el Tipo de Mantenimiento <b>{tiposmttoSeleccionado && tiposmttoSeleccionado.nombre_tmt}</b>? </p>
      <div align="right">
        <Button className={styles.button} color="secondary" onClick={() => borrarTipomtto()}> Confirmar </Button>
        <Button className={styles.button2} onClick={() => abrirCerrarModalEliminar()}> Cancelar </Button>
      </div>
    </div>
  )

  return (
    <div className="App">
      <br />
      <Button variant="contained" startIcon={<SaveIcon />} color="primary" onClick={() => abrirCerrarModalInsertar()} >Agregar Tipo de Actividad</Button>
      <MaterialTable
        columns={columnas}
        data={listTiposmtto}
        title="TIPOS DE ACTIVIDAD"
        actions={[
          {
            icon: 'edit',
            tooltip: 'Editar Tipo de Mantenimiento',
            onClick: (event, rowData) => seleccionarTipomtto(rowData, "Editar")
          },
          {
            icon: 'delete',
            tooltip: 'Borrar Tipo de Mantenimiento',
            onClick: (event, rowData) => seleccionarTipomtto(rowData, "Eliminar")
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
        {tipomttoInsertar}
      </Modal>

      <Modal
        open={modalEditar}
        onClose={abrirCerrarModalEditar}
      >
        {tipomttoEditar}
      </Modal>

      <Modal
        open={modalEliminar}
        onClose={abrirCerrarModalEliminar}
      >
        {tipomttoEliminar}
      </Modal>
    </div>
  );
}

export default Tiposmtto;