import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
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
import inventariosServices from "../../../services/Almacenes/Inventarios";
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
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      prefix="$"
    />
  );
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

function Inventarios() {
  const styles = useStyles();
  const [listInventarios, setListInventarios] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [formError, setFormError] = useState(false);
  const [listarAlmacenes, setListarAlmacenes] = useState([]);
  const [listarTiposAlmacenes, setListarTiposAlmacenes] = useState([]);
  const [listarTiposProductos, setListarTiposProductos] = useState([]);
  const [actualiza, setActualiza] = useState(false);
  const [listarEstados, setListarEstados] = useState([]);
  let tipoinventario = 1

  const [inventariosSeleccionado, setInventariosSeleccionado] = useState({
    id_inv: "",
    tipooperacion_inv: 1,
    almacen_inv:  "",
    descripcion_inv:  "",
    referencia_inv:  "",
    tipoproducto_inv:  "",
    fechaactualizacion_inv:  "",
    horaactualizacion_inv:  "",
    existencia_inv:  "",
    costounitponderado_inv:  "",
    costototalponderado_inv:  "",
    estado_inv: "",
  })

  useEffect(() => {
    async function fetchDataInventarios() {
      const res = await inventariosServices.listSaldosalmacen();
      setListInventarios(res.data);
      setActualiza(false);
    }
    fetchDataInventarios();
  }, [actualiza])

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

    setInventariosSeleccionado(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const seleccionarInventarios = (inventarios, caso) => {
    setInventariosSeleccionado(inventarios);
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

    if (!inventariosSeleccionado.almacen_inv) {
      errors.almacen_inv = true;
      formOk = false;
    }

    if (!inventariosSeleccionado.descripcion_inv) {
      errors.descripcion_inv = true;
      formOk = false;
    }

    if (!inventariosSeleccionado.referencia_inv) {
      errors.referencia_inv = true;
      formOk = false;
    }

    if (!inventariosSeleccionado.tipoproducto_inv) {
      errors.tipoproducto_inv = true;
      formOk = false;
    }

    if (!inventariosSeleccionado.fechaactualizacion_inv) {
      errors.fechaactualizacion_inv = true;
      formOk = false;
    }

    if (!inventariosSeleccionado.horaactualizacion_inv) {
      errors.horaactualizacion_inv = true;
      formOk = false;
    }

    if (!inventariosSeleccionado.existencia_inv) {
      errors.existencia_inv = true;
      formOk = false;
    }
    
    if (!inventariosSeleccionado.costounitponderado_inv) {
      errors.costounitponderado_inv = true;
      formOk = false;
    }
    
    if (!inventariosSeleccionado.costototalponderado_inv) {
      errors.costototalponderado_inv = true;
      formOk = false;
    }
    
    if (!inventariosSeleccionado.estado_inv) {
      errors.estado_inv = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
      console.log(inventariosSeleccionado);
      const res = await inventariosServices.save(inventariosSeleccionado);

      if (res.success) {
        swal("Inventario", "Creado de forma Correcta!", "success", { button: "Aceptar" });
        console.log(res.message)
        abrirCerrarModalInsertar();
        delete inventariosSeleccionado.almacen_inv;
        delete inventariosSeleccionado.descripcion_inv;
        delete inventariosSeleccionado.referencia_inv;
        delete inventariosSeleccionado.tipoproducto_inv;
        delete inventariosSeleccionado.fechaactualizacion_inv;
        delete inventariosSeleccionado.horaactualizacion_inv;
        delete inventariosSeleccionado.existencia_inv;
        delete inventariosSeleccionado.costounitponderado_inv;
        delete inventariosSeleccionado.costototalponderado_inv;
        delete inventariosSeleccionado.estado_inv;
      } else {
        swal("Inventario", "Error Creando el Inventarios!", "error", { button: "Aceptar" });
        console.log(res.message);
        abrirCerrarModalInsertar();
      }
    }
    else {
      swal("Inventario", "Debe Ingresar Todos los Datos, Revisar Información!", "warning", { button: "Aceptar" });
      console.log(res.message);
      abrirCerrarModalInsertar();
    }
    setActualiza(true);
  }

  const actualizarInventario = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;

    
    if (!inventariosSeleccionado.almacen_inv) {
      errors.almacen_inv = true;
      formOk = false;
    }

    if (!inventariosSeleccionado.descripcion_inv) {
      errors.descripcion_inv = true;
      formOk = false;
    }

    if (!inventariosSeleccionado.referencia_inv) {
      errors.referencia_inv = true;
      formOk = false;
    }

    if (!inventariosSeleccionado.tipoproducto_inv) {
      errors.tipoproducto_inv = true;
      formOk = false;
    }

    if (!inventariosSeleccionado.fechaactualizacion_inv) {
      errors.fechaactualizacion_inv = true;
      formOk = false;
    }

    if (!inventariosSeleccionado.horaactualizacion_inv) {
      errors.horaactualizacion_inv = true;
      formOk = false;
    }

    if (!inventariosSeleccionado.existencia_inv) {
      errors.existencia_inv = true;
      formOk = false;
    }
    
    if (!inventariosSeleccionado.costounitponderado_inv) {
      errors.costounitponderado_inv = true;
      formOk = false;
    }
    
    if (!inventariosSeleccionado.costototalponderado_inv) {
      errors.costototalponderado_inv = true;
      formOk = false;
    }
    
    if (!inventariosSeleccionado.estado_inv) {
      errors.estado_inv = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {

      const res = await inventariosServices.update(inventariosSeleccionado);

      if (res.success) {
        swal("Inventario", "Actualizado de forma Correcta!", "success", { button: "Aceptar" });
        console.log(res.message)
        abrirCerrarModalEditar();
        delete inventariosSeleccionado.almacen_inv;
        delete inventariosSeleccionado.descripcion_inv;
        delete inventariosSeleccionado.referencia_inv;
        delete inventariosSeleccionado.tipoproducto_inv;
        delete inventariosSeleccionado.fechaactualizacion_inv;
        delete inventariosSeleccionado.horaactualizacion_inv;
        delete inventariosSeleccionado.existencia_inv;
        delete inventariosSeleccionado.costounitponderado_inv;
        delete inventariosSeleccionado.costototalponderado_inv;
        delete inventariosSeleccionado.estado_inv;
      } else {
        swal("Inventario", "Error Actualizando el Inventario!", "error", { button: "Aceptar" });
        console.log(res.message);
        abrirCerrarModalEditar();
      }
    }
    else {
      swal("Inventario", "Debe Ingresar Todos los Datos, Revisar Información!", "warning", { button: "Aceptar" });
      console.log(res.message);
      abrirCerrarModalEditar();
    }
    setActualiza(true);
  }

  const borrarInventario = async () => {
    const res = await inventariosServices.delete(inventariosSeleccionado.id_inv);

    if (res.success) {
      swal("Inventario", "Borrado de forma Correcta!", "success", { button: "Aceptar" });
      console.log(res.message)
      abrirCerrarModalEliminar();
    }
    else {
      swal("Inventarios", "Error Borrando el Inventario!", "error", { button: "Aceptar" });
      console.log(res.message);
      abrirCerrarModalEliminar();
    }
    setActualiza(true);
  }
  
  // "string","boolean","numeric","date","datetime","time","currency"
  const columnas = [
    {
      title: 'Almacen',
      field: 'descripcion_alm',
      cellStyle : { minWidth: 250}
    },
    {
      title: 'Descripción',
      field: 'descripcion_inv',
      cellStyle : { minWidth: 250}
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
      title: 'Existencias',
      field: 'existencia_inv',
      cellStyle : { minWidth: 50}
    },
    {
      title: 'Costo Unitario',
      field: 'costounitponderado_inv',
      cellStyle : { minWidth: 50}
    },
    {
      title: 'Costo Total',
      field: 'costototalponderado_inv',
      cellStyle : { minWidth: 50}
    },
    {
      title: 'Estado',
      field: 'nombre_est',
      cellStyle : { minWidth: 50}
    }
  ]
  
  const InventariosInsertar = (
    <div className={styles.modal}>
      <Typography align="center" className={styles.typography} variant="button" display="block">Agregar Inventarios</Typography>
      <br />
      <Grid container spacing={2} >
        <Grid item xs={12} md={12}>
           <FormControl className={styles.formControl}>
            <InputLabel id="idselectalmacen_inv">Almacen</InputLabel>
            <Select
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
        <Grid item xs={12} md={6}> 
          <TextField type="number" name="existencia_inv" label="Existencias" InputLabelProps={{ shrink: true }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
              </InputAdornment>
            ),
          }}
          fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={6}> 
          <TextField type="number" name="costounitponderado_inv" label="Costo Unitario" InputLabelProps={{ shrink: true }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                < AttachMoneyIcon />
              </InputAdornment>
            ),
          }}
          fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={6}> 
          <TextField type="number" name="costototalponderado_inv" label="Costo Total" InputLabelProps={{ shrink: true }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                < AttachMoneyIcon />
              </InputAdornment>
            ),
          }}
          fullWidth onChange={handleChange} />
        </Grid>
      </Grid>
      <div align="right">
        <Button className={styles.button} color="primary" onClick={() => grabarInventario()} >Insertar</Button>
        <Button className={styles.button2} onClick={() => abrirCerrarModalInsertar()} >Cancelar</Button>
      </div>
    </div>
  )
//value={inventariosSeleccionado && inventariosSeleccionado.id_alm} 
  const InventariosEditar = (
    <div className={styles.modal}>
      <Typography align="center" className={styles.typography} variant="button" display="block">Actualizar Inventarios</Typography>
      <br />
      <Grid container spacing={2} >
        <Grid item xs={12} md={12}>
           <FormControl className={styles.formControl}>
            <InputLabel id="idselectalmacen_inv">Almacen</InputLabel>
            <Select
              labelId="selectalmacen_inv"
              name="almacen_inv"
              id="idselectalmacen_inv"
              onChange={handleChange}
              value={inventariosSeleccionado && inventariosSeleccionado.almacen_inv}
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
                      value={inventariosSeleccionado && inventariosSeleccionado.descripcion_inv}  />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl2}>
            <InputLabel id="idselectEstado">Estado</InputLabel>
            <Select
              labelId="selectEstado"
              name="estado_inv"
              id="idselectEstado"
              onChange={handleChange}
              value={inventariosSeleccionado && inventariosSeleccionado.estado_inv}
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
                      value={inventariosSeleccionado && inventariosSeleccionado.referencia_inv} />
        </Grid>
        <Grid item xs={12} md={6}>
           <FormControl className={styles.formControl2}>
            <InputLabel id="idselecttipoproducto_inv">Tipo de Producto</InputLabel>
            <Select
              labelId="selecttipoproducto_inv"
              name="tipoproducto_inv"
              id="idselecttipoproducto_inv"
              onChange={handleChange}
              value={inventariosSeleccionado && inventariosSeleccionado.tipoproducto_inv}
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
          defaultValue={Moment(inventariosSeleccionado.fechaactualizacion_inv).format('YYYY-MM-DD')}
          label="Fecha de Actualización del Inventario" fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={6}> <TextField type="time" InputLabelProps={{ shrink: true }} name="horaactualizacion_inv"
          label="Hora de Actualización del Inventario" fullWidth onChange={handleChange} 
          value={inventariosSeleccionado && inventariosSeleccionado.horaactualizacion_inv} />
        </Grid>
        <Grid item xs={12} md={6}> 
          <TextField className={styles.inputMaterial}  tname="existencia_inv" label="Existencias"
           InputLabelProps={{ shrink: true }} fullWidth onChange={handleChange}
          value={inventariosSeleccionado && inventariosSeleccionado.existencia_inv} />
        </Grid>
        <Grid item xs={12} md={6}> 
          <TextField  className={styles.inputMaterial} name="costounitponderado_inv" label="Costo Unitario"
           InputLabelProps={{ shrink: true }}
           InputProps={{ inputComponent: NumberFormatCustom, }}
          fullWidth onChange={handleChange}
          value={inventariosSeleccionado && inventariosSeleccionado.costounitponderado_inv } />
        </Grid>
        <Grid item xs={12} md={6}> 
          <TextField name="costototalponderado_inv" label="Costo Total" InputLabelProps={{ shrink: true }}
          InputProps={{ inputComponent: NumberFormatCustom, }}
          fullWidth onChange={handleChange} 
          value={inventariosSeleccionado && inventariosSeleccionado.costototalponderado_inv }/>
        </Grid>
      </Grid>
      <br />
      <div align="right">
        <Button className={styles.button} color="primary" onClick={() => actualizarInventario()} >Editar</Button>
        <Button className={styles.button2} onClick={() => abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  const InventariosEliminar = (
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar el Inventario <b>{inventariosSeleccionado && inventariosSeleccionado.descripcion_inv}</b>? </p>
      <div align="right">
        <Button className={styles.button} color="secondary" onClick={() => borrarInventario()}> Confirmar </Button>
        <Button className={styles.button2} onClick={() => abrirCerrarModalEliminar()}> Cancelar </Button>
      </div>
    </div>
  )

  return (
    <div className="App">
      <br />
      <Button variant="contained" startIcon={<SaveIcon />} color="primary" onClick={() => abrirCerrarModalInsertar()} >Agregar Inventario</Button>
      <MaterialTable
        columns={columnas}
        data={listInventarios}
        title="SALDOS DE INVENTARIO"
        actions={[
          {
            icon: 'edit',
            tooltip: 'Editar Inventario',
            onClick: (event, rowData) => seleccionarInventarios(rowData, "Editar")
          },
          {
            icon: 'delete',
            tooltip: 'Borrar Inventario',
            onClick: (event, rowData) => seleccionarInventarios(rowData, "Eliminar")
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
        {InventariosInsertar}
      </Modal>

      <Modal
        open={modalEditar}
        onClose={abrirCerrarModalEditar}
      >
        {InventariosEditar}
      </Modal>

      <Modal
        open={modalEliminar}
        onClose={abrirCerrarModalEliminar}
      >
        {InventariosEliminar}
      </Modal>
    </div>
  );
}

export default Inventarios;