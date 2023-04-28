import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import MaterialTable from "material-table";
import { Modal, TextField, Button, Select, MenuItem, FormControl, InputLabel, Typography, Grid, InputAdornment } from "@material-ui/core";
import { green, blue, blueGrey, red } from '@material-ui/core/colors';
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from '@material-ui/icons/Save';
import swal from 'sweetalert';
import Moment from 'moment';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import NumberFormat from 'react-number-format';
import axios from "axios";

// Componentes de Conexion con el Backend
import movimientosServices from "../../../services/Almacenes/Inventarios";
import almacenesServices from "../../../services/Almacenes/Almacenes";
import tiposalmacenesServices from "../../../services/Almacenes/TiposAlmacenes";
import estadosServices from "../../../services/Parameters/Estados";
import tiposproductosServices from "../../../services/Almacenes/TiposProductos";
import equiposServices from "../../../services/Mantenimiento/Equipos";
import ciudadesServices from "../../../services/Parameters/Ciudades";
import propietariosServices from "../../../services/Interlocutores/Proveedores";

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
  modal2: {
    position: 'absolute',
    width: 800,
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
    minWidth: 350,
    maxWidth: 350,
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

function Movimientos() {
  const styles = useStyles();
  const [listInventarios, setListInventarios] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [formError, setFormError] = useState(false);
  const [listarAlmacenes, setListarAlmacenes] = useState([]);
  const [listarTiposAlmacenes, setListarTiposAlmacenes] = useState([]);
  const [listarTiposProductos, setListarTiposProductos] = useState([]);
  const [listarMovimientos, setListarMovimientos] = useState([]);
  const [listarPropietarios, setListarPropietarios] = useState([]);
  const [listarTipoOperacion, setListarTipoOperacion] = useState([]);
  const [listarTipoDesembolso, setListarTipoDesembolso] = useState([]);
  const [listarEquipos, setListarEquipos] = useState([]);
  const [actualiza, setActualiza] = useState(false);
  const [listarCiudades, setListarCiudades] = useState([]);
  const [listarEstados, setListarEstados] = useState([]);
  const [valorTotal, setValorTotal] = useState(0);
  const [grabar, setGrabar] = useState(false);
  let tipoinventario = 1

  const [movimientoSeleccionado, setMovimientoSeleccionado] = useState({
    id_mov: "",
    tipooperacion_mov: 1,
    almacen_mov: "",
    tipodesembolso_mov: "",
    ordendecompra_mov: "",
    proveedor_mov: "",
    descripcion_mov: "",
    referencia_mov: "",
    maquina_mov: "",
    ciudad_mov: "",
    aprobo_mov: "",
    cantidad_mov: "",
    costounitario_mov: "",
    valormovimiento_mov: "",
    fecha_mov: "",
    estado_mov: ""
  })

  useEffect(() => {
    const leeMovimientos = async () => {
      const data = { username: 'example' };

      fetch("https://api.gimcloud.com/gimcloudzafiro/api/5")
        .then((response) => response.json())
        .then((data) => {
          console.log('Success:', data);
          setListarMovimientos(data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    };
    leeMovimientos();
  }, [])

  useEffect(() => {
    const leeTipoOperacion = async () => {
      const data = { username: 'example' };

      fetch("https://api.gimcloud.com/gimcloudzafiro/api/6")
        .then((response) => response.json())
        .then((data) => {
          console.log('Success:', data);
          setListarTipoOperacion(data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    };
    leeTipoOperacion();
  }, [])

  useEffect(() => {
    const leeTipoOperacion = async () => {
      const data = { username: 'example' };

      fetch("https://api.gimcloud.com/gimcloudzafiro/api/7")
        .then((response) => response.json())
        .then((data) => {
          console.log('Success:', data);
          setListarTipoDesembolso(data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    };
    leeTipoOperacion();
  }, [])

  useEffect(() => {
    async function fetchDataEquipos() {
      const res = await equiposServices.listEquiposMontacargas();
      setListarEquipos(res.data);
    }
    fetchDataEquipos();
  }, [])

  useEffect(() => {
    async function fetchDataCiudades() {
      const res = await ciudadesServices.listCiudades();
      setListarCiudades(res.data);
    }
    fetchDataCiudades();
  }, [])

  useEffect(() => {
    let valor = parseInt(movimientoSeleccionado.costounitario_mov) * 
                parseInt(movimientoSeleccionado.cantidad_mov);
    setValorTotal(valor);
  }, [movimientoSeleccionado.costounitario_mov, movimientoSeleccionado.cantidad_mov])

  useEffect(() => {
    async function fetchDataInventarios() {
      const res = await movimientosServices.listSaldosalmacen();
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
      const res = await estadosServices.listar_estadoscompras();
      setListarEstados(res.data)
      //console.log(res.data);
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

  useEffect(() => {
    async function fetchDataPropietarios() {
      const res = await propietariosServices.listProveedores();
      setListarPropietarios(res.data)
      //console.log(res.data);
    }
    fetchDataPropietarios();
  }, [])

  const handleChange = e => {
    const { name, value } = e.target;

    setMovimientoSeleccionado(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const seleccionarMovimiento = (movimientos, caso) => {
    setMovimientoSeleccionado(movimientos);
    (caso === "Editar") ? abrirCerrarModalEditar() : abrirCerrarModalEliminar()
  }

  const abrirCerrarModalInsertar = () => {
    setGrabar(false);
    setModalInsertar(!modalInsertar);
  }

  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
  }

  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
  }

  const grabarMovimiento = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;

    if (!movimientoSeleccionado.almacen_mov) {
      alert("1")
      errors.almacen_mov = true;
      formOk = false;
    }

    if (!movimientoSeleccionado.descripcion_mov) {
      alert("2")
      errors.descripcion_mov = true;
      formOk = false;
    }

    if (!movimientoSeleccionado.referencia_mov) {
      alert("3")
      errors.referencia_mov = true;
      formOk = false;
    }

    if (!movimientoSeleccionado.tipooperacion_mov) {
      alert("4")
      errors.tipooperacion_mov = true;
      formOk = false;
    }

    if (!movimientoSeleccionado.tipodesembolso_mov) {
      alert("5")
      errors.tipodesembolso_mov = true;
      formOk = false;
    }

    if (!movimientoSeleccionado.fecha_mov) {
      alert("6")
      errors.fecha_mov = true;
      formOk = false;
    }

    if (!movimientoSeleccionado.proveedor_mov) {
      alert("7")
      errors.proveedor_mov = true;
      formOk = false;
    }

    if (!movimientoSeleccionado.maquina_mov) {
      alert("8")
      errors.maquina_mov = true;
      formOk = false;
    }

    if (!movimientoSeleccionado.ordendecompra_mov) {
      alert("9")
      errors.ordendecompra_mov = true;
      formOk = false;
    }

    if (!movimientoSeleccionado.aprobo_mov) {
      alert("10")
      errors.aprobo_mov = true;
      formOk = false;
    }

    if (!movimientoSeleccionado.cantidad_mov) {
      alert("11")
      errors.cantidad_mov = true;
      formOk = false;
    }

    if (!movimientoSeleccionado.costounitario_mov) {
      alert("12")
      errors.costounitario_mov = true;
      formOk = false;
    }

    if (!movimientoSeleccionado.estado_mov) {
      alert("13")
      errors.estado_mov = true;
      formOk = false;
    }

    setFormError(errors);

    if (!formOk) {
      swal("Movimientos", "Debe Ingresar Todos los Datos, Revisar Información!", "warning", { button: "Aceptar" });
      console.log(res.message);
      abrirCerrarModalInsertar();
    } else {

      let newDet = [];

      let item = {
        tipooperacion_mov: movimientoSeleccionado.tipooperacion_mov,
        almacen_mov: movimientoSeleccionado.almacen_mov,
        tipodesembolso_mov: movimientoSeleccionado.tipodesembolso_mov,
        ordendecompra_mov: movimientoSeleccionado.ordendecompra_mov,
        proveedor_mov: movimientoSeleccionado.proveedor_mov,
        descripcion_mov: movimientoSeleccionado.descripcion_mov,
        referencia_mov: movimientoSeleccionado.referencia_mov,
        maquina_mov: movimientoSeleccionado.maquina_mov,
        ciudad_mov: movimientoSeleccionado.ciudad_mov,
        aprobo_mov: movimientoSeleccionado.aprobo_mov,
        cantidad_mov: movimientoSeleccionado.cantidad_mov,
        costounitario_mov: movimientoSeleccionado.costounitario_mov,
        valormovimiento_mov: valorTotal,
        fecha_mov: movimientoSeleccionado.fecha_mov,
        estado_mov: movimientoSeleccionado.estado_mov
      }
      newDet.push(item);
      //console.log("ITEM : ", newDet)
  
      setMovimientoSeleccionado(newDet);
      setGrabar(true);
    }

  }

  useEffect(() => {
    if (grabar) {
      async function grabarMvto() {
        //console.log(movimientoSeleccionado);
        //return
        const res = await almacenesServices.createMvto(movimientoSeleccionado[0]);

        if (res.success) {
          swal("Movimientos", "Creado de forma Correcta!", "success", { button: "Aceptar" });
          console.log(res.message)
          setActualiza(true);
          setGrabar(false);
          abrirCerrarModalInsertar();
        } else {
          swal("Movimientos", "Error Creando el Movimientos!", "error", { button: "Aceptar" });
          console.log(res.message);
          abrirCerrarModalInsertar();
          setGrabar(false);
        }

      }
      grabarMvto();
    }
  }, [grabar])

  const actualizarInventario = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;

    setFormError(errors);

    if (formOk) {

      const res = await movimientosServices.update(movimientoSeleccionado);

      if (res.success) {
        swal("Movimientos", "Actualizado de forma Correcta!", "success", { button: "Aceptar" });
        console.log(res.message)
        abrirCerrarModalEditar();
      } else {
        swal("Movimientos", "Error Actualizando el Inventario!", "error", { button: "Aceptar" });
        console.log(res.message);
        abrirCerrarModalEditar();
      }
    }
    else {
      swal("Movimientos", "Debe Ingresar Todos los Datos, Revisar Información!", "warning", { button: "Aceptar" });
      console.log(res.message);
      abrirCerrarModalEditar();
    }
    setActualiza(true);
  }

  const borrarMovimiento = async () => {
    const res = await movimientosServices.delete(movimientoSeleccionado.id_inv);

    if (res.success) {
      swal("Movimientos", "Borrado de forma Correcta!", "success", { button: "Aceptar" });
      console.log(res.message)
      abrirCerrarModalEliminar();
    }
    else {
      swal("Movimientos", "Error Borrando el Inventario!", "error", { button: "Aceptar" });
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
      cellStyle: { minWidth: 150 }
    },
    {
      title: 'Desembolso',
      field: 'descripcion_tope',
      cellStyle: { minWidth: 50 }
    },
    {
      title: 'Proveedor',
      field: 'razonsocial_int',
      cellStyle: { minWidth: 100 }
    },
    {
      title: 'Descripción',
      field: 'descripcion_mov',
      cellStyle: { minWidth: 200 }
    },
    {
      title: 'Repuesto',
      field: 'referencia_mov',
      cellStyle: { minWidth: 100 }
    },
    {
      title: 'Maquina',
      field: 'maquina_mov',
      cellStyle: { minWidth: 50 }
    },
    {
      title: 'Ciudad',
      field: 'nombre_ciu',
      cellStyle: { minWidth: 50 }
    },
    {
      title: 'Aprobo',
      field: 'aprobo_mov',
      cellStyle: { minWidth: 50 }
    },
    {
      title: 'Cantidad',
      field: 'cantidad_mov',
      cellStyle: { minWidth: 50 }
    },
    {
      title: 'Costo unitario',
      field: 'costounitario_mov',
      cellStyle: { minWidth: 50 }
    },
    {
      title: 'Valor total',
      field: 'valormovimiento_mov',
      cellStyle: { minWidth: 50 }
    },
    {
      title: 'Fecha',
      field: 'fecha_mov',
      cellStyle: { minWidth: 100 }
    }
  ]

  const MovimientoInsertar = (
    <div className={styles.modal2}>
      <Typography align="center" className={styles.typography} variant="button" display="block">Agregar Movimientos</Typography>
      <br />
      <Grid container spacing={2} >
        <Grid item xs={6} md={6}>
          <FormControl className={styles.formControl2}>
            <InputLabel id="tipooperacion_mov">Tipo de movimiento</InputLabel>
            <Select
              labelId="selecttipooperacion_mov"
              name="tipooperacion_mov"
              id="tipooperacion_mov"
              onChange={handleChange}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarTipoOperacion && listarTipoOperacion.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_tope}>{itemselect.descripcion_tope}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} md={6}>
          <FormControl className={styles.formControl2}>
            <InputLabel id="tipodesembolso_mov">Tipo de desembolso</InputLabel>
            <Select
              labelId="selecttipodesembolso_mov"
              name="tipodesembolso_mov"
              id="tipodesembolso_mov"
              onChange={handleChange}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarTipoDesembolso && listarTipoDesembolso.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_dese}>{itemselect.descripcion_dese}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} md={6}>
          <FormControl className={styles.formControl2}>
            <InputLabel id="idselectalmacen_mov">Almacen</InputLabel>
            <Select
              labelId="selectalmacen_mov"
              name="almacen_mov"
              id="idselectalmacen_mov"
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
        <Grid item xs={6} md={6}>
          <FormControl className={styles.formControl2}>
            <TextField className={styles.inputMaterial} label="#Orden de compra" name="ordendecompra_mov" onChange={handleChange} />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField className={styles.inputMaterial} label="Descripción" name="descripcion_mov" onChange={handleChange} />
        </Grid>
        <Grid item xs={6} md={6}>
          <FormControl className={styles.formControl2}>
            <TextField className={styles.inputMaterial} label="Referencia" name="referencia_mov" onChange={handleChange} />
          </FormControl>
        </Grid>
        <Grid item xs={6} md={6}>
          <FormControl className={styles.formControl2}>
            <InputLabel id="idselectmaquina_mov">Maquina</InputLabel>
            <Select
              labelId="selectmaquina_mov"
              name="maquina_mov"
              id="idselectmaquina_mov"
              onChange={handleChange}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarEquipos && listarEquipos.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_equ}>{itemselect.codigo_equ}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl2}>
            <InputLabel id="idproveedor_mov">Proveedor del repuesto/insumo</InputLabel>
            <Select
              labelId="selectproveedor_mov"
              name="proveedor_mov"
              id="idselectproveedor_mov"
              fullWidth
              onChange={handleChange}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarPropietarios.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_int}>{itemselect.razonsocial_int}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} md={6}>
          <FormControl className={styles.formControl2}>
            <InputLabel id="idselectciudad_mov">Ciudad</InputLabel>
            <Select
              labelId="selectciudad_mov"
              name="ciudad_mov"
              id="idselectciudad_mov"
              onChange={handleChange}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarCiudades && listarCiudades.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_ciu}>{itemselect.nombre_ciu}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} md={12}>
          <TextField className={styles.inputMaterial} label="Quién aprobo la compra" name="aprobo_mov" onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField type="number" name="cantidad_mov" label="Cantidad" InputLabelProps={{ shrink: true }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                </InputAdornment>
              ),
            }}
            fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField type="number" name="costounitario_mov" label="Costo Unitario" InputLabelProps={{ shrink: true }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  < AttachMoneyIcon />
                </InputAdornment>
              ),
            }}
            fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            type="number"
            disabled="true"
            name="valormovimiento_mov"
            value={valorTotal}
            label="Costo Total"
            InputLabelProps={{ shrink: true }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  < AttachMoneyIcon />
                </InputAdornment>
              ),
            }}
          //fullWidth onChange={handleChange} 
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            type="date" InputLabelProps={{ shrink: true }}
            name="fecha_mov"
            label="Fecha Compra"
            fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl2}>
            <InputLabel id="idselectestado_mov">Estado</InputLabel>
            <Select
              labelId="selectestado_mov"
              name="estado_mov"
              id="idselectestado_mov"
              onChange={handleChange}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarEstados && listarEstados.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_est}>{itemselect.nombre_est}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
      </Grid >
      <div align="right">
        <Button className={styles.button} color="primary" onClick={() => grabarMovimiento()} >Insertar</Button>
        <Button className={styles.button2} onClick={() => abrirCerrarModalInsertar()} >Cancelar</Button>
      </div>
    </div >
  )
  //value={movimientoSeleccionado && movimientoSeleccionado.id_alm} 
  const MovimientoEditar = (
    <div className={styles.modal2}>
      <Typography align="center" className={styles.typography} variant="button" display="block">Actualizar Movimiento</Typography>
      <br />
      <Grid container spacing={2} >
        <Grid item xs={6} md={6}>
          <FormControl className={styles.formControl2}>
            <InputLabel id="tipooperacion_mov">Tipo de movimiento</InputLabel>
            <Select
              labelId="selecttipooperacion_mov"
              name="tipooperacion_mov"
              id="tipooperacion_mov"
              onChange={handleChange}
              value={movimientoSeleccionado && movimientoSeleccionado.tipooperacion_mov} 
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarTipoOperacion && listarTipoOperacion.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_tope}>{itemselect.descripcion_tope}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} md={6}>
          <FormControl className={styles.formControl2}>
            <InputLabel id="tipodesembolso_mov">Tipo de desembolso</InputLabel>
            <Select
              labelId="selecttipodesembolso_mov"
              name="tipodesembolso_mov"
              id="tipodesembolso_mov"
              onChange={handleChange}
              value={movimientoSeleccionado && movimientoSeleccionado.tipodesembolso_mov} 
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarTipoDesembolso && listarTipoDesembolso.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_dese}>{itemselect.descripcion_dese}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} md={6}>
          <FormControl className={styles.formControl2}>
            <InputLabel id="idselectalmacen_mov">Almacen</InputLabel>
            <Select
              labelId="selectalmacen_mov"
              name="almacen_mov"
              id="idselectalmacen_mov"
              onChange={handleChange}
              value={movimientoSeleccionado && movimientoSeleccionado.almacen_mov} 
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
        <Grid item xs={6} md={6}>
          <FormControl className={styles.formControl2}>
            <TextField 
              className={styles.inputMaterial} 
              label="#Orden de compra" 
              name="ordendecompra_mov" 
              onChange={handleChange} 
              value={movimientoSeleccionado && movimientoSeleccionado.ordendecompra_mov}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField 
            className={styles.inputMaterial} 
            label="Descripción" 
            name="descripcion_mov" 
            onChange={handleChange}
            value={movimientoSeleccionado && movimientoSeleccionado.descripcion_mov} 
          />
        </Grid>
        <Grid item xs={6} md={6}>
          <FormControl className={styles.formControl2}>
            <TextField 
              className={styles.inputMaterial} 
              label="Referencia" 
              name="referencia_mov" 
              onChange={handleChange} 
              value={movimientoSeleccionado && movimientoSeleccionado.referencia_mov} 
            />
          </FormControl>
        </Grid>
        <Grid item xs={6} md={6}>
          <FormControl className={styles.formControl2}>
            <InputLabel id="idselectmaquina_mov">Maquina</InputLabel>
            <Select
              labelId="selectmaquina_mov"
              name="maquina_mov"
              id="idselectmaquina_mov"
              onChange={handleChange}
              value={movimientoSeleccionado && movimientoSeleccionado.maquina_mov} 
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarEquipos && listarEquipos.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_equ}>{itemselect.codigo_equ}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl2}>
            <InputLabel id="idproveedor_mov">Proveedor del repuesto/insumo</InputLabel>
            <Select
              labelId="selectproveedor_mov"
              name="proveedor_mov"
              id="idselectproveedor_mov"
              fullWidth
              onChange={handleChange}
              value={movimientoSeleccionado && movimientoSeleccionado.proveedor_mov} 
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarPropietarios.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_int}>{itemselect.razonsocial_int}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} md={6}>
          <FormControl className={styles.formControl2}>
            <InputLabel id="idselectciudad_mov">Ciudad</InputLabel>
            <Select
              labelId="selectciudad_mov"
              name="ciudad_mov"
              id="idselectciudad_mov"
              onChange={handleChange}
              value={movimientoSeleccionado && movimientoSeleccionado.ciudad_mov}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarCiudades && listarCiudades.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_ciu}>{itemselect.nombre_ciu}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} md={12}>
          <TextField className={styles.inputMaterial} label="Quién aprobo la compra" name="aprobo_mov" onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField 
            type="number" 
            name="cantidad_mov" 
            label="Cantidad" 
            InputLabelProps={{ shrink: true }}
            value={movimientoSeleccionado && movimientoSeleccionado.cantidad_mov}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                </InputAdornment>
              ),
            }}
            fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField 
            type="number" 
            name="costounitario_mov" 
            label="Costo Unitario" 
            InputLabelProps={{ shrink: true }}
            value={movimientoSeleccionado && movimientoSeleccionado.costounitario_mov}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  < AttachMoneyIcon />
                </InputAdornment>
              ),
            }}
            fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            type="number"
            disabled="true"
            name="valormovimiento_mov"
            value={valorTotal}
            label="Costo Total"
            InputLabelProps={{ shrink: true }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  < AttachMoneyIcon />
                </InputAdornment>
              ),
            }}
          //fullWidth onChange={handleChange} 
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            type="date" InputLabelProps={{ shrink: true }}
            name="fecha_mov"
            label="Fecha Compra"
            fullWidth onChange={handleChange} 
            value={movimientoSeleccionado && movimientoSeleccionado.fecha_mov}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl2}>
            <InputLabel id="idselectestado_mov">Estado</InputLabel>
            <Select
              labelId="selectestado_mov"
              name="estado_mov"
              id="idselectestado_mov"
              onChange={handleChange}
              value={movimientoSeleccionado && movimientoSeleccionado.estado_mov}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarEstados && listarEstados.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_est}>{itemselect.nombre_est}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
      </Grid >
      <br />
      <div align="right">
        <Button className={styles.button} color="primary" onClick={() => actualizarInventario()} >Editar</Button>
        <Button className={styles.button2} onClick={() => abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  const MovimientoEliminar = (
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar el Movimiento <b>{movimientoSeleccionado && movimientoSeleccionado.descripcion_mov}</b>? </p>
      <div align="right">
        <Button className={styles.button} color="secondary" onClick={() => borrarMovimiento()}> Confirmar </Button>
        <Button className={styles.button2} onClick={() => abrirCerrarModalEliminar()}> Cancelar </Button>
      </div>
    </div>
  )

  return (
    <div className="App">
      <br />
      <Button variant="contained" startIcon={<SaveIcon />} color="primary" onClick={() => abrirCerrarModalInsertar()} >Agregar Movimiento</Button>
      <MaterialTable
        columns={columnas}
        data={listarMovimientos}
        title="MOVIMIENTOS ALMACEN"
        actions={[
          {
            icon: 'edit',
            tooltip: 'Editar Inventario',
            onClick: (event, rowData) => seleccionarMovimiento(rowData, "Editar")
          },
          {
            icon: 'delete',
            tooltip: 'Borrar Inventario',
            onClick: (event, rowData) => seleccionarMovimiento(rowData, "Eliminar")
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
        {MovimientoInsertar}
      </Modal>

      <Modal
        open={modalEditar}
        onClose={abrirCerrarModalEditar}
      >
        {MovimientoEditar}
      </Modal>

      <Modal
        open={modalEliminar}
        onClose={abrirCerrarModalEliminar}
      >
        {MovimientoEliminar}
      </Modal>
    </div>
  );
}

export default Movimientos;