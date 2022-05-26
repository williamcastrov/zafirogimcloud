import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { Modal, TextField, Button, Select, MenuItem, FormControl, InputLabel, Typography } from "@material-ui/core";
import { green, blue, blueGrey, red } from '@material-ui/core/colors';
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from '@material-ui/icons/Save';
import swal from 'sweetalert';

// Componentes de Conexion con el Backend
import tipooperacionServices from "../../../../services/GestionOrdenes/TipoOperacion";
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

function TipoOperacion() {
  const styles = useStyles();
  const [listTipoOperacion, setListTipoOperacion] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [formError, setFormError] = useState(false);
  const [listarEmpresas, setListarEmpresas] = useState([]);
  const [listarEstados, setListarEstados] = useState([]);
  const [actualiza, setActualiza] = useState(false);
  const [tipooperacionSeleccionado, setTipoOperacionSeleccionado] = useState({
    id_tope: "",
    descripcion_tope: "",
    empresa_tope: "",
    estado_tope: ""
  })

  useEffect(() => {
    async function fetchDataTipoOperacion() {
      const res = await tipooperacionServices.listTipooperacion();
      setListTipoOperacion(res.data);
      setActualiza(false);
    }
    fetchDataTipoOperacion();
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

    setTipoOperacionSeleccionado(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const seleccionarTipoOperacion = (tipooperacion, caso) => {
    setTipoOperacionSeleccionado(tipooperacion);
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

  const grabarTipoOperacion = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;

    if (!tipooperacionSeleccionado.descripcion_tope) {
      errors.nombre_tope = true;
      formOk = false;
    }

    if (!tipooperacionSeleccionado.empresa_tope) {
      errors.empresa_tope = true;
      formOk = false;
    }

    if (!tipooperacionSeleccionado.estado_tope) {
      errors.estado_tope = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
      console.log(tipooperacionSeleccionado);
      const res = await tipooperacionServices.save(tipooperacionSeleccionado);

      if (res.success) {
        swal("Tipo Operación", "Creada de forma Correcta!", "success", { button: "Aceptar" });
        console.log(res.message)
        abrirCerrarModalInsertar();
        delete tipooperacionSeleccionado.descripcion_tope;
        delete tipooperacionSeleccionado.empresa_tope;
        delete tipooperacionSeleccionado.estado_tope;
      } else {
        alert("");
        swal("Tipo Operación", "Error Creando el Tipo de Operacion!", "error", { button: "Aceptar" });
        console.log(res.message);
        abrirCerrarModalInsertar();
      }
    }
    else {
      swal("Tipo Operación", "Debe Ingresar Todos los Datos, Revisar la Información!", "warning", { button: "Aceptar" });
      console.log(res.message);
      abrirCerrarModalInsertar();
    }
    setActualiza(true);
  }

  const actualizarTipoOperacion = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;

    if (!tipooperacionSeleccionado.descripcion_tope) {
      errors.descripcion_tope = true;
      formOk = false;
    }

    if (!tipooperacionSeleccionado.empresa_tope) {
      errors.empresa_tope = true;
      formOk = false;
    }

    if (!tipooperacionSeleccionado.estado_tope) {
      errors.estado_tope = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {

      const res = await tipooperacionServices.update(tipooperacionSeleccionado);

      if (res.success) {
        swal("Tipo Operación", "Actualizada de forma Correcta!", "success", { button: "Aceptar" });
        console.log(res.message)
        abrirCerrarModalEditar();
        delete tipooperacionSeleccionado.descripcion_tope;
        delete tipooperacionSeleccionado.empresa_tope;
        delete tipooperacionSeleccionado.estado_tope;
      } else {
        swal("Tipo Operación", "Error Actualizando el Tipo de Operacion!", "error", { button: "Aceptar" });
        console.log(res.message);
        abrirCerrarModalEditar();
      }
    }
    else {
      swal("Tipo Operación", "Debe Ingresar Todos los Datos, Revisar la Información!", "warning", { button: "Aceptar" });
      console.log(res.message);
      abrirCerrarModalEditar();
    }
    setActualiza(true);
  }

  const borrarTipoOperacion = async () => {

    const res = await tipooperacionServices.delete(tipooperacionSeleccionado.id_tope);

    if (res.success) {
      swal("Tipo Operación", "Actualizada de forma Correcta!", "success", { button: "Aceptar" });
      console.log(res.message)
      abrirCerrarModalEliminar();
    }
    else {
      swal("Tipo Operación", "Creada de forma Correcta!", "error", { button: "Aceptar" });
      console.log(res.message);
      abrirCerrarModalEliminar();
    }
    setActualiza(true);
  }
  // "string","boolean","numeric","date","datetime","time","currency"
  const columnas = [
    {
      title: 'Id',
      field: 'id_tope',
      type: 'numeric'
    },
    {
      title: 'Descripcion',
      field: 'descripcion_tope'
    },
    {
      title: 'Código',
      field: 'empresa_tope'
    },
    {
      title: 'Nombre Empresa',
      field: 'nombre_emp'
    },
    {
      title: 'Estado',
      field: 'estado_tope'
    },
    {
      title: 'Nombre Estado',
      field: 'nombre_est'
    }
  ]

  const tipooperacionInsertar = (
    <div className={styles.modal}>
      <Typography align="center" className={styles.typography} variant="button" display="block" >
        Agregar Tipo de Operación
      </Typography>
      <br />
      <TextField className={styles.inputMaterial} label="Descripción" name="descripcion_tope" onChange={handleChange} />
      <FormControl className={styles.formControl}>
        <InputLabel id="idselectEmpresa">Empresa</InputLabel>
        <Select
          labelId="selectEmpresa"
          name="empresa_tope"
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
          name="estado_tope"
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
      <br />
      <div align="right">
        <Button className={styles.button} color="primary" onClick={() => grabarTipoOperacion()} >Insertar</Button>
        <Button className={styles.button2} onClick={() => abrirCerrarModalInsertar()} >Cancelar</Button>
      </div>
    </div>
  )

  const tipooperacionEditar = (
    <div className={styles.modal}>
      <Typography align="center" className={styles.typography} variant="button" display="block" >
        Actualizar Tipo Operacion
      </Typography>
      <br />
      <TextField className={styles.inputMaterial} label="Descripción" name="descripcion_tope" onChange={handleChange} value={tipooperacionSeleccionado && tipooperacionSeleccionado.descripcion_tope} />
      <br />
      <FormControl className={styles.formControl}>
        <InputLabel id="idselectEmpresa">Empresa</InputLabel>
        <Select
          labelId="selectEmpresa"
          name="empresa_tope"
          id="idselectEmpresa"
          onChange={handleChange}
          value={tipooperacionSeleccionado && tipooperacionSeleccionado.empresa_tope}
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
          name="estado_tope"
          id="idselectEstado"
          onChange={handleChange}
          value={tipooperacionSeleccionado && tipooperacionSeleccionado.estado_tope}
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
        <Button className={styles.button} color="primary" onClick={() => actualizarTipoOperacion()} >Editar</Button>
        <Button className={styles.button2} nClick={() => abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  const tipooperacionEliminar = (
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar el Tipo de Operacion <b>{tipooperacionSeleccionado && tipooperacionSeleccionado.descripcion_tope}</b>? </p>
      <div align="right">
        <Button className={styles.button} color="secondary" onClick={() => borrarTipoOperacion()}> Confirmar </Button>
        <Button className={styles.button2} onClick={() => abrirCerrarModalEliminar()}> Cancelar </Button>
      </div>
    </div>
  )

  return (
    <div className="App">
      <br />
      <Button variant="contained" startIcon={<SaveIcon />} color="primary" onClick={() => abrirCerrarModalInsertar()} >Agregar Tipo Operación</Button>
      <MaterialTable
        columns={columnas}
        data={listTipoOperacion}
        title="MAESTRA TIPOS DE OPERACION"
        actions={[
          {
            icon: 'edit',
            tooltip: 'Editar Tipo Operación',
            onClick: (event, rowData) => seleccionarTipoOperacion(rowData, "Editar")
          },
          {
            icon: 'delete',
            tooltip: 'Borrar Tipo Operación',
            onClick: (event, rowData) => seleccionarTipoOperacion(rowData, "Eliminar")
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
        {tipooperacionInsertar}
      </Modal>

      <Modal
        open={modalEditar}
        onClose={abrirCerrarModalEditar}
      >
        {tipooperacionEditar}
      </Modal>

      <Modal
        open={modalEliminar}
        onClose={abrirCerrarModalEliminar}
      >
        {tipooperacionEliminar}
      </Modal>
    </div>
  );
}

export default TipoOperacion;