import React, { useEffect, useState } from "react";
import axios from "axios";
import MaterialTable from "material-table";
import { Modal, TextField, Button, Select, MenuItem, FormControl, InputLabel, Typography } from "@material-ui/core";
import { green, blue, blueGrey, red } from '@material-ui/core/colors';
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from '@material-ui/icons/Save';
import swal from 'sweetalert';

// Componentes de Conexion con el Backend
import conceptososervServices from "../../../../services/GestionOrdenes/TiposEstados";
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

function TiposEstados() {
  const styles = useStyles();
  const [listConceptosOserv, setListConceptosOserv] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [formError, setFormError] = useState(false);
  const [listarEmpresas, setListarEmpresas] = useState([]);
  const [listarEstados, setListarEstados] = useState([]);
  const [actualiza, setActualiza] = useState(false);
  
  const [conceptosOservSeleccionado, setConceptosOservSeleccionado] = useState({
    id_test: "",
    descripcion_test: "",
    empresa_test: "",
    estado_test: "",
  })

  useEffect(() => {
    async function fetchDataConceptosOserv() {
      const res = await conceptososervServices.listTiposEstados();
      setListConceptosOserv(res.data);
      setActualiza(false);
    }
    fetchDataConceptosOserv();
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

    setConceptosOservSeleccionado(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const seleccionarConceptosOserv = (conceptososerv, caso) => {
    setConceptosOservSeleccionado(conceptososerv);
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

  const grabarConceptosOserv = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;

    if (!conceptosOservSeleccionado.descripcion_test) {
      errors.descripcion_test = true;
      formOk = false;
    }

    if (!conceptosOservSeleccionado.empresa_test) {
      errors.empresa_test = true;
      formOk = false;
    }

    if (!conceptosOservSeleccionado.estado_test) {
      errors.estado_test = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
      console.log(conceptosOservSeleccionado);
      const res = await  conceptososervServices.save(conceptosOservSeleccionado);

      if (res.success) {
        swal("Conceptos Ordenes Servicio", "Creado de forma Correcta!", "success", { button: "Aceptar" });
        console.log(res.message)
        abrirCerrarModalInsertar();
        delete conceptosOservSeleccionado.descripcion_test;
        delete conceptosOservSeleccionado.empresa_test;
        delete conceptosOservSeleccionado.estado_test;
      } else {
        swal("Conceptos Ordenes Servicio", "Error Creando Conceptos Ordenes Servicio!", "error", { button: "Aceptar" });
        console.log(res.message);
        abrirCerrarModalInsertar();
      }
    }
    else {
      swal("Conceptos Ordenes Servicio", "Debe Ingresar Todos los Datos, Revisar Información!", "warning", { button: "Aceptar" });
      console.log(res.message);
      abrirCerrarModalInsertar();
    }
    setActualiza(true);
  }

  const actualizarConceptosOserv = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;

    if (!conceptosOservSeleccionado.descripcion_test) {
      errors.descripcion_test = true;
      formOk = false;
    }

    if (!conceptosOservSeleccionado.empresa_test) {
      errors.empresa_test = true;
      formOk = false;
    }

    if (!conceptosOservSeleccionado.estado_test) {
      errors.estado_test = true;
      formOk = false;
    }
    setFormError(errors);

    if (formOk) {

      const res = await  conceptososervServices.update(conceptosOservSeleccionado);

      if (res.success) {
        swal("Conceptos Ordenes Servicio", "Actualizado de forma Correcta!", "success", { button: "Aceptar" });
        console.log(res.message)
        abrirCerrarModalEditar();
        delete conceptosOservSeleccionado.descripcion_test;
        delete conceptosOservSeleccionado.empresa_test;
        delete conceptosOservSeleccionado.estado_test;
      } else {
        swal("Conceptos Ordenes Servicio", "Error Actualizando Conceptos Ordenes de Servicio!", "error", { button: "Aceptar" });
        console.log(res.message);
        abrirCerrarModalEditar();
      }
    }
    else {
      swal("Conceptos Ordenes Servicio", "Debe Ingresar Todos los Datos, Revisar Información!", "warning", { button: "Aceptar" });
      console.log(res.message);
      abrirCerrarModalEditar();
    }
    setActualiza(true);
  }

  const borrarConceptosOserv = async () => {

    const res = await  conceptososervServices.delete(conceptosOservSeleccionado.id_test);

    if (res.success) {
      swal("Conceptos Ordenes Servicio", "Borrado de forma Correcta!", "success", { button: "Aceptar" });
      console.log(res.message)
      abrirCerrarModalEliminar();
    }
    else {
      swal("Conceptos Ordenes Servicio", "Error Borrando Conceptos Ordenes Servicio!", "error", { button: "Aceptar" });
      console.log(res.message);
      abrirCerrarModalEliminar();
    }
    setActualiza(true);
  }
  // "string","boolean","numeric","date","datetime","time","currency"
  const columnas = [
    {
      title: 'Id',
      field: 'id_test'
    },
    {
      title: 'Descripcion',
      field: 'descripcion_test'
    },
    {
      title: 'Código',
      field: 'empresa_test'
    },
    {
      title: 'Nombre Empresa',
      field: 'nombre_emp'
    },
    {
      title: 'Codigo',
      field: 'estado_test'
    },
    {
      title: 'Estado',
      field: 'nombre_est'
    }
  ]

  const ConceptosOservInsertar = (
    <div className={styles.modal}>
      <Typography align="center" className={styles.typography} variant="button" display="block">Agregar Conceptos Ordenes Servicio</Typography>
      <TextField className={styles.inputMaterial} label="Descripcion" name="descripcion_test" onChange={handleChange} />
      <br />
      <FormControl className={styles.formControl}>
        <InputLabel id="idselectEmpresa">Empresa</InputLabel>
        <Select
          labelId="selectEmpresa"
          name="empresa_test"
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
          name="estado_test"
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
        <Button className={styles.button} color="primary" onClick={() => grabarConceptosOserv()} >Insertar</Button>
        <Button className={styles.button2} onClick={() => abrirCerrarModalInsertar()} >Cancelar</Button>
      </div>
    </div>
  )

  const ConceptosOservEditar = (
    <div className={styles.modal}>
       <Typography align="center" className={styles.typography} variant="button" display="block">Actualizar Conceptos Ordenes Servicio</Typography>
      <TextField className={styles.inputMaterial} label="Descripcion" name="descripcion_test" onChange={handleChange} value={conceptosOservSeleccionado && conceptosOservSeleccionado.descripcion_test} />
      <br />
      <FormControl className={styles.formControl}>
        <InputLabel id="idselectEmpresa">Empresa</InputLabel>
        <Select
          labelId="selectEmpresa"
          name="empresa_test"
          id="idselectEmpresa"
          onChange={handleChange}
          value={conceptosOservSeleccionado && conceptosOservSeleccionado.empresa_test}
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
          name="estado_test"
          id="idselectEstado"
          onChange={handleChange}
          value={conceptosOservSeleccionado && conceptosOservSeleccionado.estado_test}
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
        <Button className={styles.button} color="primary" onClick={() => actualizarConceptosOserv()} >Editar</Button>
        <Button className={styles.button2} onClick={() => abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  const ConceptosOservEliminar = (
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar el Concepto de Mantenimiento <b>{conceptosOservSeleccionado && conceptosOservSeleccionado.descripcion_test}</b>? </p>
      <div align="right">
        <Button className={styles.button} color="secondary" onClick={() => borrarConceptosOserv()}> Confirmar </Button>
        <Button className={styles.button2} onClick={() => abrirCerrarModalEliminar()}> Cancelar </Button>
      </div>
    </div>
  )

  return (
    <div className="App">
      <br />
      <Button variant="contained" startIcon={<SaveIcon />} color="primary" onClick={() => abrirCerrarModalInsertar()} >Agregar Tipo Estado</Button>
      <MaterialTable
        columns={columnas}
        data={listConceptosOserv}
        title="TIPOS DE ESTADOS"
        actions={[
          {
            icon: 'edit',
            tooltip: 'Editar Tipos Estados',
            onClick: (event, rowData) => seleccionarConceptosOserv(rowData, "Editar")
          },
          {
            icon: 'delete',
            tooltip: 'Borrar  Tipos Estados',
            onClick: (event, rowData) => seleccionarConceptosOserv(rowData, "Eliminar")
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
        {ConceptosOservInsertar}
      </Modal>

      <Modal
        open={modalEditar}
        onClose={abrirCerrarModalEditar}
      >
        {ConceptosOservEditar}
      </Modal>

      <Modal
        open={modalEliminar}
        onClose={abrirCerrarModalEliminar}
      >
        {ConceptosOservEliminar}
      </Modal>
    </div>
  );
}

export default TiposEstados;