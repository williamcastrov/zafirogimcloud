import React, { useEffect, useState } from "react";
import axios from "axios";
import MaterialTable from "material-table";
import { Modal, TextField, Button, Select, MenuItem, FormControl, InputLabel, Typography, Grid } from "@material-ui/core";
import { green, blue, blueGrey, red } from '@material-ui/core/colors';
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from '@material-ui/icons/Save';
import swal from 'sweetalert';

// Componentes de Conexion con el Backend
import lineasproductosServices from "../../../services/Almacenes/TiposProductos";
import estadosServices from "../../../services/Parameters/Estados";
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

function LineasProductos() {
  const styles = useStyles();
  const [listLineasProductos, setListLineasProductos] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [formError, setFormError] = useState(false);
  const [listarEmpresas, setListarEmpresas] = useState([]);
  const [listarEstados, setListarEstados] = useState([]);
  const [actualiza, setActualiza] = useState(false);

  const [lineasProductosSeleccionado, setLineasProductosSeleccionado] = useState({
    id_tprd: "",
    descripcion_tprd: "",
    empresa_tprd: "",
    estado_tprd: "",
  })

  useEffect(() => {
    async function fetchDataLineasProductos() {
      const res = await lineasproductosServices.listTiposproductos();
      setListLineasProductos(res.data);
      setActualiza(false);
    }
    fetchDataLineasProductos();
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
      const res = await estadosServices.listEstados();
      setListarEstados(res.data)
      console.log(res.data);
    }
    fetchDataEstados();
  }, [])

  const handleChange = e => {
    const { name, value } = e.target;

    setLineasProductosSeleccionado(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const seleccionarLineasProductos = (tipoproducto, caso) => {
    setLineasProductosSeleccionado(tipoproducto);
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

  const grabarLineaProducto = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;

    if (!lineasProductosSeleccionado.descripcion_tprd) {
      errors.descripcion_tprd = true;
      formOk = false;
    }

    if (!lineasProductosSeleccionado.empresa_tprd) {
      errors.empresa_tprd = true;
      formOk = false;
    }

    if (!lineasProductosSeleccionado.estado_tprd) {
      errors.estado_tprd = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
      //console.log(lineasProductosSeleccionado);
      const res = await lineasproductosServices.save(lineasProductosSeleccionado);

      if (res.success) {
        swal("Linea de Producto", "Creado de forma Correcta!", "success", { button: "Aceptar" });
        console.log(res.message)
        abrirCerrarModalInsertar();
        delete lineasProductosSeleccionado.descripcion_tprd;
        delete lineasProductosSeleccionado.empresa_tprd;
        delete lineasProductosSeleccionado.estado_tprd;
      } else {
        swal("Linea de Producto", "Error Creando el Linea de Producto!", "error", { button: "Aceptar" });
        console.log(res.message);
        abrirCerrarModalInsertar();
      }
    }
    else {
      swal("Linea de Producto", "Debe Ingresar Todos los Datos, Revisar Información!", "warning", { button: "Aceptar" });
      console.log(res.message);
      abrirCerrarModalInsertar();
    }
    setActualiza(true);
  }

  const actualizarLineaProducto = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;

    if (!lineasProductosSeleccionado.descripcion_tprd) {
      errors.descripcion_tprd = true;
      formOk = false;
    }

    if (!lineasProductosSeleccionado.empresa_tprd) {
      errors.empresa_tprd = true;
      formOk = false;
    }

    if (!lineasProductosSeleccionado.estado_tprd) {
      errors.estado_tprd = true;
      formOk = false;
    }
    setFormError(errors);

    if (formOk) {

      const res = await lineasproductosServices.update(lineasProductosSeleccionado);

      if (res.success) {
        swal("Linea de Producto", "Actualizado de forma Correcta!", "success", { button: "Aceptar" });
        console.log(res.message)
        abrirCerrarModalEditar();
        delete lineasProductosSeleccionado.descripcion_tprd;
        delete lineasProductosSeleccionado.empresa_tprd;
        delete lineasProductosSeleccionado.estado_tprd;
      } else {
        swal("Linea de Producto", "Error Actualizando Linea de Producto!", "error", { button: "Aceptar" });
        console.log(res.message);
        abrirCerrarModalEditar();
      }
    }
    else {
      swal("Linea de Producto", "Debe Ingresar Todos los Datos, Revisar Información!", "warning", { button: "Aceptar" });
      console.log(res.message);
      abrirCerrarModalEditar();
    }
    setActualiza(true);
  }

  const borrarLineaProducto = async () => {

    const res = await lineasproductosServices.delete(lineasProductosSeleccionado.id_tprd);

    if (res.success) {
      swal("Linea de Producto", "Borrado de forma Correcta!", "success", { button: "Aceptar" });
      console.log(res.message)
      abrirCerrarModalEliminar();
    }
    else {
      swal("Linea de Producto", "Error Borrando el Linea de Producto!", "error", { button: "Aceptar" });
      console.log(res.message);
      abrirCerrarModalEliminar();
    }
    setActualiza(true);
  }
  // "string","boolean","numeric","date","datetime","time","currency"
  const columnas = [
    {
      title: 'Id',
      field: 'id_tprd'
    },
    {
      title: 'Descripcion',
      field: 'descripcion_tprd'
    },
    {
      title: 'Código',
      field: 'empresa_tprd'
    },
    {
      title: 'Nombre Empresa',
      field: 'nombre_emp'
    },
    {
      title: 'Codigo',
      field: 'estado_tprd'
    },
    {
      title: 'Estado',
      field: 'nombre_est'
    }
  ]

  const lineaProductoInsertar = (
    <div className={styles.modal}>
      <Typography align="center" className={styles.typography} variant="button" display="block">
        Agregar Linea de Producto
      </Typography>
      <br />
      <Grid container spacing={2} >
        <Grid item xs={12} md={12}>
          <TextField name="id_tprd" label="Linea de Producto" disabled="true"
            fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField className={styles.inputMaterial} label="Descripcion" name="descripcion_tprd" onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={12}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectEmpresa">Empresa</InputLabel>
            <Select
              labelId="selectEmpresa"
              name="empresa_tprd"
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
        </Grid>
        <Grid item xs={12} md={12}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectEstado">Estado</InputLabel>
            <Select
              labelId="selectEstado"
              name="estado_tprd"
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
      </Grid>
      <div align="right">
        <Button className={styles.button} color="primary" onClick={() => grabarLineaProducto()} >Insertar</Button>
        <Button className={styles.button2} onClick={() => abrirCerrarModalInsertar()} >Cancelar</Button>
      </div>
    </div>
  )

  const lineaProductoEditar = (
    <div className={styles.modal}>
      <Typography align="center" className={styles.typography} variant="button" display="block">Actualizar Linea de Producto</Typography>
      <br />
      <Grid container spacing={2} >
        <Grid item xs={12} md={12}>
          <TextField name="id_tprd" label="Linea de Producto" disabled="true" fullWidth onChange={handleChange} 
           value={lineasProductosSeleccionado && lineasProductosSeleccionado.id_tprd} />
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField className={styles.inputMaterial} label="Descripcion" name="descripcion_tprd" onChange={handleChange}
           value={lineasProductosSeleccionado && lineasProductosSeleccionado.descripcion_tprd} />
        </Grid>
        <Grid item xs={12} md={12}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectEmpresa">Empresa</InputLabel>
            <Select
              labelId="selectEmpresa"
              name="empresa_tprd"
              id="idselectEmpresa"
              onChange={handleChange}
              value={lineasProductosSeleccionado && lineasProductosSeleccionado.empresa_tprd}
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
        </Grid>
        <Grid item xs={12} md={12}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectEstado">Estado</InputLabel>
            <Select
              labelId="selectEstado"
              name="estado_tprd"
              id="idselectEstado"
              onChange={handleChange}
              value={lineasProductosSeleccionado && lineasProductosSeleccionado.estado_tprd}
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
      <div align="right">
        <Button className={styles.button} color="primary" onClick={() => actualizarLineaProducto()} >Editar</Button>
        <Button className={styles.button2} onClick={() => abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  const lineaProductoEliminar = (
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar la Linea de Producto <b>{lineasProductosSeleccionado && lineasProductosSeleccionado.nombre_tprd}</b>? </p>
      <div align="right">
        <Button className={styles.button} color="secondary" onClick={() => borrarLineaProducto()}> Confirmar </Button>
        <Button className={styles.button2} onClick={() => abrirCerrarModalEliminar()}> Cancelar </Button>
      </div>
    </div>
  )

  return (
    <div className="App">
      <br />
      <Button variant="contained" startIcon={<SaveIcon />} color="primary" onClick={() => abrirCerrarModalInsertar()} >Agregar Lineas de Productos</Button>
      <MaterialTable
        columns={columnas}
        data={listLineasProductos}
        title="LINEAS DE PRODUCTOS"
        actions={[
          {
            icon: 'edit',
            tooltip: 'Editar Linea de Producto',
            onClick: (event, rowData) => seleccionarLineasProductos(rowData, "Editar")
          },
          {
            icon: 'delete',
            tooltip: 'Borrar Linea de Producto',
            onClick: (event, rowData) => seleccionarLineasProductos(rowData, "Eliminar")
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
        {lineaProductoInsertar}
      </Modal>

      <Modal
        open={modalEditar}
        onClose={abrirCerrarModalEditar}
      >
        {lineaProductoEditar}
      </Modal>

      <Modal
        open={modalEliminar}
        onClose={abrirCerrarModalEliminar}
      >
        {lineaProductoEliminar}
      </Modal>
    </div>
  );
}

export default LineasProductos;