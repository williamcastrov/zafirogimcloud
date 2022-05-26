import React, { useEffect, useState } from "react";
import axios from "axios";
import MaterialTable from "material-table";
import { Modal, TextField, Button, Select, MenuItem, FormControl, InputLabel, Typography, Grid, InputAdornment} from "@material-ui/core";
import { green, blue, blueGrey, red } from '@material-ui/core/colors';
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from '@material-ui/icons/Save';
import swal from 'sweetalert';
import Moment from 'moment';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import NumberFormat from 'react-number-format';

// Componentes de Conexion con el Backend
import recepcionequiposServices from "../../../services/Almacenes/Inventarios";
import almacenesServices from "../../../services/Almacenes/Almacenes";
import tiposalmacenesServices from "../../../services/Almacenes/TiposAlmacenes";
import estadosServices from "../../../services/Parameters/Estados";
import tiposproductosServices from "../../../services/Almacenes/TiposProductos";

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
    minWidth: 515,
    maxWidth: 515,
  },
  formControl2: {
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

function NumberFormatCustom(props) {
  const { inputRef, ...other } = props;
  //console.log(inputRef);
  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      thousandSeparator={'.'}
      decimalSeparator={','}
    />
  );
}

function RecepcionAlmacen() {
  const styles = useStyles();
  const [listrecepcionEquipos, setListRecepcionEquipos] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [formError, setFormError] = useState(false);
  const [listarAlmacenes, setListarAlmacenes] = useState([]);
  const [listarTiposAlmacenes, setListarTiposAlmacenes] = useState([]);
  const [listarTiposProductos, setListarTiposProductos] = useState([]);
  const [listarEstados, setListarEstados] = useState([]);
  let tipoinventario = 4

  const [recepcionEquiposSeleccionado, setRecepcionEquiposSeleccionado] = useState({
    id_inv: "",
    tipooperacion_inv: 6,
    almacen_inv:  "",
    descripcion_inv:  "",
    referencia_inv:  "",
    tipoproducto_inv:  "",
    fechaactualizacion_inv:  "",
    horaactualizacion_inv:  "",
    existencia_inv:  0,
    costounitponderado_inv: 0,
    costototalponderado_inv: 0,
    estado_inv: "",
  })

  useEffect(() => {
    async function fetchDataRecepcionEquipos() {
      const res = await recepcionequiposServices.listRecepcionAlmacen();
      setListRecepcionEquipos(res.data);
    }
    fetchDataRecepcionEquipos();
  }, [])

  useEffect(() => {
    async function fetchDataAlmacenes() {
      const res = await almacenesServices.listAlmacenes();
      setListarAlmacenes(res.data);
    }
    fetchDataAlmacenes();
  }, [])

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
    async function fetchDataTiposProductos() {
      const res = await tiposproductosServices.listTiposproductos();
      setListarTiposProductos(res.data)
      //console.log(res.data);
    }
    fetchDataTiposProductos();
  }, [])

  const handleChange = e => {
    const { name, value } = e.target;

    setRecepcionEquiposSeleccionado(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const seleccionarRecepcionEquipos = (recepcionequipos, caso) => {
    setRecepcionEquiposSeleccionado(recepcionequipos);
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

  const grabarInventario = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;

    if (!recepcionEquiposSeleccionado.almacen_inv) {
      errors.almacen_inv = true;
      formOk = false;
    }

    if (!recepcionEquiposSeleccionado.descripcion_inv) {
      errors.descripcion_inv = true;
      formOk = false;
    }

    if (!recepcionEquiposSeleccionado.referencia_inv) {
      errors.referencia_inv = true;
      formOk = false;
    }

    if (!recepcionEquiposSeleccionado.tipoproducto_inv) {
      errors.tipoproducto_inv = true;
      formOk = false;
    }

    if (!recepcionEquiposSeleccionado.fechaactualizacion_inv) {
      errors.fechaactualizacion_inv = true;
      formOk = false;
    }

    if (!recepcionEquiposSeleccionado.horaactualizacion_inv) {
      errors.horaactualizacion_inv = true;
      formOk = false;
    }

    if (!recepcionEquiposSeleccionado.estado_inv) {
      errors.estado_inv = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
      console.log(recepcionEquiposSeleccionado);
      const res = await recepcionequiposServices.save(recepcionEquiposSeleccionado);

      if (res.success) {
        swal("Lista de Chequeo Recepción", "Creado de forma Correcta!", "success", { button: "Aceptar" });
        console.log(res.message)
        abrirCerrarModalInsertar();
        delete recepcionEquiposSeleccionado.almacen_inv;
        delete recepcionEquiposSeleccionado.descripcion_inv;
        delete recepcionEquiposSeleccionado.referencia_inv;
        delete recepcionEquiposSeleccionado.tipoproducto_inv;
        delete recepcionEquiposSeleccionado.fechaactualizacion_inv;
        delete recepcionEquiposSeleccionado.horaactualizacion_inv;
        delete recepcionEquiposSeleccionado.estado_inv;
      } else {
        swal("Lista de Chequeo", "Error Creando Lista de Chequeo Recepción Equipos!", "error", { button: "Aceptar" });
        console.log(res.message);
        abrirCerrarModalInsertar();
      }
    }
    else {
      swal("Lista de Chequeo Recepción", "Debe Ingresar Todos los Datos, Revisar Información!", "warning", { button: "Aceptar" });
      console.log(res.message);
      abrirCerrarModalInsertar();
    }
  }

  const actualizarInventario = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;

    
    if (!recepcionEquiposSeleccionado.almacen_inv) {
      errors.almacen_inv = true;
      formOk = false;
    }

    if (!recepcionEquiposSeleccionado.descripcion_inv) {
      errors.descripcion_inv = true;
      formOk = false;
    }

    if (!recepcionEquiposSeleccionado.referencia_inv) {
      errors.referencia_inv = true;
      formOk = false;
    }

    if (!recepcionEquiposSeleccionado.tipoproducto_inv) {
      errors.tipoproducto_inv = true;
      formOk = false;
    }

    if (!recepcionEquiposSeleccionado.fechaactualizacion_inv) {
      errors.fechaactualizacion_inv = true;
      formOk = false;
    }

    if (!recepcionEquiposSeleccionado.horaactualizacion_inv) {
      errors.horaactualizacion_inv = true;
      formOk = false;
    }

    if (!recepcionEquiposSeleccionado.estado_inv) {
      errors.estado_inv = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {

      const res = await recepcionequiposServices.update(recepcionEquiposSeleccionado);

      if (res.success) {
        swal("Lista de Chequeo Recepción", "Actualizado de forma Correcta!", "success", { button: "Aceptar" });
        console.log(res.message)
        abrirCerrarModalEditar();
        delete recepcionEquiposSeleccionado.almacen_inv;
        delete recepcionEquiposSeleccionado.descripcion_inv;
        delete recepcionEquiposSeleccionado.referencia_inv;
        delete recepcionEquiposSeleccionado.tipoproducto_inv;
        delete recepcionEquiposSeleccionado.fechaactualizacion_inv;
        delete recepcionEquiposSeleccionado.horaactualizacion_inv;
        delete recepcionEquiposSeleccionado.estado_inv;
      } else {
        swal("Lista de Chequeo Recepción", "Error Actualizando el Inventario!", "error", { button: "Aceptar" });
        console.log(res.message);
        abrirCerrarModalEditar();
      }
    }
    else {
      swal("Lista de Chequeo Recepción", "Debe Ingresar Todos los Datos, Revisar Información!", "warning", { button: "Aceptar" });
      console.log(res.message);
      abrirCerrarModalEditar();
    }
  }

  const borrarInventario = async () => {
    const res = await recepcionequiposServices.delete(recepcionEquiposSeleccionado.id_inv);

    if (res.success) {
      swal("Lista de Chequeo", "Borrado de forma Correcta!", "success", { button: "Aceptar" });
      console.log(res.message)
      abrirCerrarModalEliminar();
    }
    else {
      swal("Lista de Chequeo", "Error Borrando Lista de Chuequeo Recepción Equipos!", "error", { button: "Aceptar" });
      console.log(res.message);
      abrirCerrarModalEliminar();
    }
  }
  
  // "string","boolean","numeric","date","datetime","time","currency"
  const columnas = [
    {
      title: 'Tipo Actividad',
      field: 'descripcion_alm',
      cellStyle : { minWidth: 350}
    },
    {
      title: 'Descripción',
      field: 'descripcion_inv',
      cellStyle : { minWidth: 350}
    },
    {
      title: 'Referencia',
      field: 'referencia_inv'
    },
    {
      title: 'Tipo Producto',
      field: 'descripcion_tprd',
      cellStyle : { minWidth: 100}
    },
    {
      title: 'Fecha Actualizacion',
      field: 'fechaactualizacion_inv',
      type: 'date'
    },
    {
      title: 'Hora Actualización',
      field: 'horaactualizacion_inv',
      type: 'time'
    },
    {
      title: 'Estado',
      field: 'nombre_est',
      cellStyle : { minWidth: 50}
    }
  ]
  
  const RecepcionEquiposInsertar = (
    <div className={styles.modal}>
      <Typography align="center" className={styles.typography} variant="button" display="block">Agregar Item Recepción Almacen</Typography>
      <br />
      <Grid container spacing={2} >
        <Grid item xs={12} md={12}>
           <FormControl className={styles.formControl}>
            <InputLabel id="idselectalmacen_inv">Tipo Actividad</InputLabel>
            <Select
              defaultValue={90} 
              disabled="true"
              labelId="selectalmacen_inv"
              name="almacen_inv"
              id="idselectalmacen_inv"
              onChange={handleChange}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarAlmacenes.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_alm}>{itemselect.descripcion_alm}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField className={styles.inputMaterial} label="Descripcion" name="descripcion_inv" onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl2}>
            <InputLabel id="idselectEstado">Estado</InputLabel>
            <Select
              labelId="selectEstado"
              name="estado_inv"
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
          <TextField className={styles.inputMaterial} label="Referencia" name="referencia_inv" onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={6}>
           <FormControl className={styles.formControl2}>
            <InputLabel id="idselecttipoproducto_inv">Tipo de Producto</InputLabel>
            <Select
              labelId="selecttipoproducto_inv"
              name="tipoproducto_inv"
              id="idselecttipoproducto_inv"
              onChange={handleChange}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarTiposProductos.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_tprd}>{itemselect.descripcion_tprd}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}> <TextField type="date" InputLabelProps={{ shrink: true }} name="fechaactualizacion_inv"
          label="Fecha de Actualización del Inventario" fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={6}> <TextField type="time" InputLabelProps={{ shrink: true }} name="horaactualizacion_inv"
          label="Hora de Actualización del Inventario" fullWidth onChange={handleChange} />
        </Grid>
      </Grid>
      <div align="right">
        <Button className={styles.button} color="primary" onClick={() => grabarInventario()} >Insertar</Button>
        <Button className={styles.button2} onClick={() => abrirCerrarModalInsertar()} >Cancelar</Button>
      </div>
    </div>
  )
//value={recepcionEquiposSeleccionado && recepcionEquiposSeleccionado.id_alm} 
  const RecepcionEquiposEditar = (
    <div className={styles.modal}>
      <Typography align="center" className={styles.typography} variant="button" display="block">Actualizar Item Recepción Almacen</Typography>
      <br />
      <Grid container spacing={2} >
        <Grid item xs={12} md={12}>
           <FormControl className={styles.formControl}>
            <InputLabel id="idselectalmacen_inv">Tipo Actividad</InputLabel>
            <Select
              labelId="selectalmacen_inv"
              defaultValue={90} 
              disabled="true"
              name="almacen_inv"
              id="idselectalmacen_inv"
              onChange={handleChange}
              value={recepcionEquiposSeleccionado && recepcionEquiposSeleccionado.almacen_inv}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarAlmacenes.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_alm}>{itemselect.descripcion_alm}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField className={styles.inputMaterial} label="Descripcion" name="descripcion_inv" onChange={handleChange}
                      value={recepcionEquiposSeleccionado && recepcionEquiposSeleccionado.descripcion_inv}  />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl2}>
            <InputLabel id="idselectEstado">Estado</InputLabel>
            <Select
              labelId="selectEstado"
              name="estado_inv"
              id="idselectEstado"
              onChange={handleChange}
              value={recepcionEquiposSeleccionado && recepcionEquiposSeleccionado.estado_inv}
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
          <TextField className={styles.inputMaterial} label="Referencia" name="referencia_inv" onChange={handleChange}
                      value={recepcionEquiposSeleccionado && recepcionEquiposSeleccionado.referencia_inv} />
        </Grid>
        <Grid item xs={12} md={6}>
           <FormControl className={styles.formControl2}>
            <InputLabel id="idselecttipoproducto_inv">Tipo de Producto</InputLabel>
            <Select
              labelId="selecttipoproducto_inv"
              name="tipoproducto_inv"
              id="idselecttipoproducto_inv"
              onChange={handleChange}
              value={recepcionEquiposSeleccionado && recepcionEquiposSeleccionado.tipoproducto_inv}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarTiposProductos.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_tprd}>{itemselect.descripcion_tprd}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}> <TextField type="date" InputLabelProps={{ shrink: true }} name="fechaactualizacion_inv"
          defaultValue={Moment(recepcionEquiposSeleccionado.fechaactualizacion_inv).format('YYYY-MM-DD')}
          label="Fecha de Actualización del Inventario" fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={6}> <TextField type="time" InputLabelProps={{ shrink: true }} name="horaactualizacion_inv"
          label="Hora de Actualización del Inventario" fullWidth onChange={handleChange} 
          value={recepcionEquiposSeleccionado && recepcionEquiposSeleccionado.horaactualizacion_inv} />
        </Grid>
      </Grid>
      <br />
      <div align="right">
        <Button className={styles.button} color="primary" onClick={() => actualizarInventario()} >Editar</Button>
        <Button className={styles.button2} onClick={() => abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  const RecepcionEquiposEliminar = (
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar el Inventario <b>{recepcionEquiposSeleccionado && recepcionEquiposSeleccionado.descripcion_inv}</b>? </p>
      <div align="right">
        <Button className={styles.button} color="secondary" onClick={() => borrarInventario()}> Confirmar </Button>
        <Button className={styles.button2} onClick={() => abrirCerrarModalEliminar()}> Cancelar </Button>
      </div>
    </div>
  )

  return (
    <div className="App">
      <br />
      <Button variant="contained" startIcon={<SaveIcon />} color="primary" onClick={() => abrirCerrarModalInsertar()} >Agregar Item a Lista de Chequeo</Button>
      <MaterialTable
        columns={columnas}
        data={listrecepcionEquipos}
        title="LISTA DE CHEQUEO RECEPCION ALMACEN"
        actions={[
          {
            icon: 'edit',
            tooltip: 'Editar Lista',
            onClick: (event, rowData) => seleccionarRecepcionEquipos(rowData, "Editar")
          },
          {
            icon: 'delete',
            tooltip: 'Borrar Lista',
            onClick: (event, rowData) => seleccionarRecepcionEquipos(rowData, "Eliminar")
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
        {RecepcionEquiposInsertar}
      </Modal>

      <Modal
        open={modalEditar}
        onClose={abrirCerrarModalEditar}
      >
        {RecepcionEquiposEditar}
      </Modal>

      <Modal
        open={modalEliminar}
        onClose={abrirCerrarModalEliminar}
      >
        {RecepcionEquiposEliminar}
      </Modal>
    </div>
  );
}

export default RecepcionAlmacen;