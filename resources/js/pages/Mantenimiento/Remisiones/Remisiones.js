import React, { useEffect, useState } from "react";
import axios from "axios";
import MaterialTable from "material-table";
import {Modal, TextField, Button, Select, MenuItem, FormControl, InputLabel, Grid, Typography } from "@material-ui/core";
import { green, blue, blueGrey, red } from '@material-ui/core/colors';
import {makeStyles} from "@material-ui/core/styles";
import SaveIcon from '@material-ui/icons/Save';
import Moment from 'moment';
import swal from 'sweetalert';

// Componentes de Conexion con el Backend
import remisionesServices from "../../../services/Mantenimiento/Remisiones";
import ciudadesServices from "../../../services/Parameters/Ciudades";
import estadosServices from "../../../services/Parameters/Estados";
import clientesServices from "../../../services/Interlocutores/Clientes";
import equiposServices from "../../../services/Mantenimiento/Equipos";

const useStyles = makeStyles((theme) => ({
  modal: {
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
  iconos:{
    cursor: 'pointer'
  }, 
  inputMaterial:{
    width: '100%'
  },
  formControl: {
    margin: theme.spacing(0),
    minWidth: 350,
    maxWidth: 350,
  },
  formControl2: {
    margin: theme.spacing(0),
    minWidth: 225,
    maxWidth: 225,
  },
  formControl3: {
    margin: theme.spacing(0),
    minWidth: 165,
    maxWidth: 165,
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
  typography: {
    fontSize: 16,
    color: "#ff3d00"
  },
}));

function Remisiones() {
  const styles = useStyles();
  const [listRemision, setListRemision] = useState([]);
  const [modalInsertar, setModalInsertar ] = useState(false);
  const [modalEditar, setModalEditar]= useState(false);
  const [modalEliminar, setModalEliminar]= useState(false);
  const [formError, setFormError] = useState(false);
  const [listarEstados, setListarEstados] = useState([]);
  const [listarCiudades, setListarCiudades] = useState([]);
  const [listarClientes, setListarClientes] = useState([]);
  const [listarEquipos, setListarEquipos] = useState([]);
  const fechaactual = Moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
  const [actualiza, setActualiza] = useState(false);
  let equipo = 0;

  const [remisionesSeleccionado, setRemisionesSeleccionado] = useState({
    id_rem: "",
    cliente_rem: "",
    ordencompra_rem: "",
    ciudad_rem: "",
    direccion_rem: "",
    contacto_rem: "",
    telefono_rem: "",
    fechacreacion_rem: "",
    horometro_rem: equipo,
    estado_rem: "",
    equipo1_rem: equipo,
    equipo2_rem: equipo,
    equipo3_rem: equipo,
    equipo4_rem: equipo,
    lucesdetrabajo_rem:"",
		luzstrober_rem:"",
		camara_rem:"",
		sensordeimpacto_rem:"",
		alarmadereservsa_rem:"",
		camasdebateria_rem:""
  })

  useEffect(() => {
    async function fetchDataRemisiones() {
      const res = await remisionesServices.listremision();
      setListRemision(res.data);
      setActualiza(false);
    }
    fetchDataRemisiones();
  }, [actualiza])

  useEffect (() => {
    async function fetchDataEstados() {
    const res = await estadosServices.listEstadosGenerales();
    setListarEstados(res.data) 
    console.log(res.data);
    }
    fetchDataEstados();
  }, [])

  useEffect(() => {
    async function fetchDataCiudades() {
      const res = await ciudadesServices.listCiudades();
      setListarCiudades(res.data);
      //console.log(res.data)
    }
    fetchDataCiudades();
  }, [])

  useEffect(() => {
    async function fetchDataClientes() {
      const res = await clientesServices.listClientes();
      setListarClientes(res.data)
      console.log("DATOS CLIENTES : ",res.data);
    }
    fetchDataClientes();
  }, [])

  useEffect(() => {
    async function fetchDataEquipos() {
      const res = await equiposServices.listEquipos();
      setListarEquipos(res.data);
    }
    fetchDataEquipos();
  }, [])

  const handleChange = e => {
    const {name, value} = e.target;

    setRemisionesSeleccionado( prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const seleccionarRemision = (remision, caso)=>{
    setRemisionesSeleccionado(remision);
    (caso==="Editar") ? abrirCerrarModalEditar() : abrirCerrarModalEliminar()
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

  const grabarRemision = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;

    if (!remisionesSeleccionado.cliente_rem) {
      alert("1")
      errors.cliente_rem = true;
      formOk = false;
    }

    if (!remisionesSeleccionado.ordencompra_rem) {
      alert("2")
      errors.ordencompra_rem = true;
      formOk = false;
    }

    if (!remisionesSeleccionado.ciudad_rem) {
      alert("3")
      errors.ciudad_rem = true;
      formOk = false;
    }

    if (!remisionesSeleccionado.direccion_rem) {
      alert("4")
      errors.direccion_rem = true;
      formOk = false;
    }

    if (!remisionesSeleccionado.contacto_rem) {
      alert("5")
      errors.contacto_rem = true;
      formOk = false;
    }

    if (!remisionesSeleccionado.telefono_rem) {
      alert("6")
      errors.contacto_rem = true;
      formOk = false;
    }

    if (!remisionesSeleccionado.fechacreacion_rem) {
      alert("8")
      errors.fechacreacion_rem = true;
      formOk = false;
    }

    if (!remisionesSeleccionado.estado_rem) {
      alert("9")
      errors.estado_rem = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
      console.log(remisionesSeleccionado);
      const res = await remisionesServices.save(remisionesSeleccionado);

      if (res.success) {
        swal("Remisión", "Creada de forma correcta!", "success", { button: "Aceptar" });
        console.log(res.message)
        abrirCerrarModalInsertar();
        delete remisionesSeleccionado.cliente_rem;
        delete remisionesSeleccionado.ordencompra_rem;
        delete remisionesSeleccionado.ciudad_rem;
        delete remisionesSeleccionado.direccion_rem;
        delete remisionesSeleccionado.contacto_rem;
        delete remisionesSeleccionado.telefono_rem;
        delete remisionesSeleccionado.fechacreacion_rem;
        delete remisionesSeleccionado.estado_rem;
      } else
      {
        swal("Remisión", "Error creando la remisión!", "error", { button: "Aceptar" });
        console.log(res.message);
        abrirCerrarModalInsertar();
      }
    }
    else {
      swal("Remisión", "Debe Ingresar todos los datos!", "warning", { button: "Aceptar" });
      //console.log(remisionesSeleccionado)
      console.log(res.message);
      abrirCerrarModalInsertar();
    }
    setActualiza(true);
  }

  const actualizarRemision = async () => {
  
    setFormError({});
    let errors = {};
    let formOk = true;

    if (!remisionesSeleccionado.cliente_rem) {
      errors.cliente_rem = true;
      formOk = false;
    }

    if (!remisionesSeleccionado.ordencompra_rem) {
      errors.ordencompra_rem = true;
      formOk = false;
    }

    if (!remisionesSeleccionado.ciudad_rem) {
      errors.ciudad_rem = true;
      formOk = false;
    }

    if (!remisionesSeleccionado.direccion_rem) {
      errors.direccion_rem = true;
      formOk = false;
    }

    if (!remisionesSeleccionado.contacto_rem) {
      errors.contacto_rem = true;
      formOk = false;
    }

    if (!remisionesSeleccionado.telefono_rem) {
      errors.contacto_rem = true;
      formOk = false;
    }

    if (!remisionesSeleccionado.fechacreacion_rem) {
      errors.fechacreacion_rem = true;
      formOk = false;
    }

    if (!remisionesSeleccionado.estado_rem) {
      errors.estado_rem = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
    
    const res = await remisionesServices.update(remisionesSeleccionado);

    if (res.success) {
        swal("Remisión", "Remisión Actualiza de forma correcta!", "success", { button: "Aceptar" });
        console.log(res.message);
        abrirCerrarModalEditar();
        delete remisionesSeleccionado.cliente_rem;
        delete remisionesSeleccionado.ordencompra_rem;
        delete remisionesSeleccionado.ciudad_rem;
        delete remisionesSeleccionado.direccion_rem;
        delete remisionesSeleccionado.contacto_rem;
        delete remisionesSeleccionado.telefono_rem;
        delete remisionesSeleccionado.fechacreacion_rem;
        delete remisionesSeleccionado.estado_rem;
    } else
    {
        swal("Remisión", "Error Actualizando la Remisión!", "error", { button: "Aceptar" });
        console.log(res.message);
        abrirCerrarModalEditar();
    }
    }
    else {
      swal("Remisión", "Debe ingresar todos los datos, Revisar!", "warning", { button: "Aceptar" });
      console.log(res.message);
      abrirCerrarModalEditar();
    } 
    setActualiza(true);
  }

  const borrarRemision = async()=>{
   
    const res = await remisionesServices.delete(remisionesSeleccionado.id_rem);

    if (res.success) {
        swal("Remisión", "Borrado de forma correcta!", "success", { button: "Aceptar" });
        console.log(res.message)
        abrirCerrarModalEliminar();
    }
    else {
        swal("Remisión", "Error Borrando la Remisión!", "success", { button: "Aceptar" });
        console.log(res.message);
        abrirCerrarModalEliminar();
    }
    setActualiza(true);
  }
 // "string","boolean","numeric","date","datetime","time","currency"
  const columnas = [
    {
      title: 'Id',
      field: 'id_rem'
    },
    {
      title: 'Cliente',
      field: 'razonsocial_cli',
      cellStyle: { minWidth: 200 }
    },
    {
      title: 'Orde de Compra',
      field: 'ordencompra_rem',
      cellStyle: { minWidth: 70 }
    },
    {
      title: 'Ciudad',
      field: 'nombre_ciu'
    },
    {
      title: 'Dirección',
      field: 'direccion_rem',
      cellStyle: { minWidth: 200 }
    },
    {
      title: 'Contacto',
      field: 'contacto_rem',
      cellStyle : { minWidth: 100}
    },
    {
      title: 'Telefono',
      field: 'telefono_rem'
    },
    {
      title: 'Telefono',
      field: 'fechacreacion_rem',
      type: "date"
    },
    {
      title: 'Horometro',
      field: 'horometro_rem'
    },
    {
      title: 'Estado',
      field: 'nombre_est'
    }
  ]

  const remisionInsertar=(
    <div className={styles.modal}>
      <br />
      <Typography align="center" className={styles.typography} variant="button" display="block">Agregar Nueva Remision </Typography>
      <Grid container spacing={2} > 
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectcliente_rem">Cliente</InputLabel>
            <Select
              labelId="selectcliente_rem"
              name="cliente_rem"
              id="idselectcliente_rem"
              onChange={handleChange}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarClientes.map((itemselect) => {
                  return (
                  <MenuItem value={itemselect.id_cli }>{itemselect.razonsocial_cli}</MenuItem>
                )
              })
            }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={2}>
          <TextField className={styles.inputMaterial} label="Orden de Compra" name="ordencompra_rem" fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={2}>
          <FormControl className={styles.formControl2}>
            <InputLabel id="idselectciudad_rem">Ciudad</InputLabel>
            <Select
              labelId="selectciudad_rem"
              name="ciudad_rem"
               id="idselectciudad_rem"
               onChange={handleChange}
            >
            <MenuItem value=""> <em>None</em> </MenuItem>
            {
              listarCiudades.map((itemselect) => {
                return (
                  <MenuItem value={itemselect.id_ciu }>{itemselect.nombre_ciu}</MenuItem>
                )
              })
            }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={8}> 
          <TextField className={styles.inputMaterial} label="Dirección" name="direccion_rem" fullWidth onChange={handleChange} />  
        </Grid>
        <Grid item xs={12} md={4}> 
          <TextField className={styles.inputMaterial} label="Telefono" name="telefono_rem" fullWidth onChange={handleChange} />  
        </Grid>
        <Grid item xs={12} md={4}> 
          <TextField className={styles.inputMaterial} label="Contacto" name="contacto_rem" fullWidth onChange={handleChange} />  
        </Grid>
        <Grid item xs={12} md={4}> <TextField type="date" InputLabelProps={{ shrink: true }} name="fechacreacion_rem"
          defaultValue={Moment(remisionesSeleccionado.fechacreacion_rem).format('YYYY-MM-DD')} 
          label="Fecha de Creación de la Remisión" fullWidth onChange={handleChange} />
        </Grid> 
        <Grid item xs={12} md={4}>
          <FormControl className={styles.formControl2}>
            <InputLabel id="idselectestado_rem">Estado</InputLabel>
            <Select
              labelId="selectestado_rem"
              name="estado_rem"
              id="idselectestado_rem"
              fullWidth
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
        <Grid item xs={12} md={3}>
          <FormControl className={styles.formControl3}>
            <InputLabel id="idselectequipo1_rem">Elemento Uno</InputLabel>
            <Select
              labelId="selectequipo1_rem"
              name="equipo1_rem"
              id="idselectequipo1_rem"
              fullWidth
              onChange={handleChange}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarEquipos.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_equ}>{itemselect.codigo_equ}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>  
        <Grid item xs={12} md={3}>
          <TextField type="numeric" className={styles.inputMaterial} label="Valor Horometro" name="horometro_rem"
          fullWidth onChange={handleChange} />  
        </Grid> 
        <Grid item xs={12} md={3}>
          <FormControl className={styles.formControl3}>
            <InputLabel id="idselectequipo2_rem">Elemento Dos</InputLabel>
            <Select
              labelId="selectequipo2_rem"
              name="equipo2_rem"
              id="idselectequipo2_rem"
              fullWidth
              onChange={handleChange}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarEquipos.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_equ}>{itemselect.codigo_equ}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid> 
        <Grid item xs={12} md={3}>
          <FormControl className={styles.formControl3}>
            <InputLabel id="idselectequipo3_rem">Elemento Tres</InputLabel>
            <Select
              labelId="selectequipo3_rem"
              name="equipo3_rem"
              id="idselectequipo3_rem"
              fullWidth
              onChange={handleChange}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarEquipos.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_equ}>{itemselect.codigo_equ}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>  
        <Grid item xs={12} md={3}>
          <FormControl className={styles.formControl3}>
            <InputLabel id="idselectequipo4_rem">Elemento Cuatro</InputLabel>
            <Select
              labelId="selectequipo4_rem"
              name="equipo4_rem"
              id="idselectequipo4_rem"
              fullWidth
              onChange={handleChange}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarEquipos.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_equ}>{itemselect.codigo_equ}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={3}>
          <FormControl className={styles.formControl3}>
            <InputLabel id="idselectlucesdetrabajo_rem">Luces de Trabajo</InputLabel>
            <Select
              labelId="selectlucesdetrabajo_rem"
              name="lucesdetrabajo_rem"
              id="idselectlucesdetrabajo_rem"
              fullWidth
              onChange={handleChange}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              <MenuItem value="S">Marcado Si</MenuItem>
              <MenuItem value="N">Marcado No</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={3}>
          <FormControl className={styles.formControl3}>
            <InputLabel id="idselectluzstrober_rem">Luz Strober</InputLabel>
            <Select
              labelId="selectluzstrober_rem"
              name="luzstrober_rem"
              id="idselectluzstrober_rem"
              fullWidth
              onChange={handleChange}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              <MenuItem value="S">Marcado Si</MenuItem>
              <MenuItem value="N">Marcado No</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={3}>
          <FormControl className={styles.formControl3}>
            <InputLabel id="idselectcamara_rem">Camara</InputLabel>
            <Select
              labelId="selectcamara_rem"
              name="camara_rem"
              id="idselectcamara_rem"
              fullWidth
              onChange={handleChange}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              <MenuItem value="S">Marcado Si</MenuItem>
              <MenuItem value="N">Marcado No</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={3}>
          <FormControl className={styles.formControl3}>
            <InputLabel id="idselectsensordeimpacto_rem">Sensor Impacto</InputLabel>
            <Select
              labelId="selectsensordeimpacto_rem"
              name="sensordeimpacto_rem"
              id="idselectsensordeimpacto_rem"
              fullWidth
              onChange={handleChange}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              <MenuItem value="S">Marcado Si</MenuItem>
              <MenuItem value="N">Marcado No</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={3}>
          <FormControl className={styles.formControl3}>
            <InputLabel id="idselectalarmadereservsa_rem">Alarma Revsersa</InputLabel>
            <Select
              labelId="selectalarmadereservsa_rem"
              name="alarmadereservsa_rem"
              id="idselectalarmadereservsa_rem"
              fullWidth
              onChange={handleChange}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              <MenuItem value="S">Marcado Si</MenuItem>
              <MenuItem value="N">Marcado No</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={3}>
          <FormControl className={styles.formControl3}>
            <InputLabel id="idselectcamasdebateria_rem">Camas Batería</InputLabel>
            <Select
              labelId="selectcamasdebateria_rem"
              name="camasdebateria_rem"
              id="idselectcamasdebateria_rem"
              fullWidth
              onChange={handleChange}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              <MenuItem value="S">Marcado Si</MenuItem>
              <MenuItem value="N">Marcado No</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <br /><br />
      <div align="right">    
        <Button color="primary" onClick = { () => grabarRemision() } >Insertar</Button>
        <Button onClick={()=> abrirCerrarModalInsertar()} >Cancelar</Button>
      </div>
    </div>
  )
// onChange={handleChange}
 
  const remisionEditar = (
    <div className={styles.modal}>
      <Typography align="center" className={styles.typography} variant="button" display="block">Actualizar Remision </Typography>
      <br />
      <Grid container spacing={2} > 
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectcliente_rem">Cliente</InputLabel>
            <Select
              labelId="selectcliente_rem"
              name="cliente_rem"
              id="idselectcliente_rem"
              onChange={handleChange}
              value={remisionesSeleccionado && remisionesSeleccionado.cliente_rem}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarClientes.map((itemselect) => {
                  return (
                  <MenuItem value={itemselect.id_cli }>{itemselect.razonsocial_cli}</MenuItem>
                )
              })
            }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={2}>
          <TextField className={styles.inputMaterial} label="Orden de Compra" name="ordencompra_rem" fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={2}>
          <FormControl className={styles.formControl2}>
            <InputLabel id="idselectciudad_rem">Ciudad</InputLabel>
            <Select
              labelId="selectciudad_rem"
              name="ciudad_rem"
               id="idselectciudad_rem"
               onChange={handleChange}
               value={remisionesSeleccionado && remisionesSeleccionado.ciudad_rem}
            >
            <MenuItem value=""> <em>None</em> </MenuItem>
            {
              listarCiudades.map((itemselect) => {
                return (
                  <MenuItem value={itemselect.id_ciu }>{itemselect.nombre_ciu}</MenuItem>
                )
              })
            }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={8}> 
          <TextField className={styles.inputMaterial} label="Dirección" name="direccion_rem" fullWidth onChange={handleChange} 
            value={remisionesSeleccionado && remisionesSeleccionado.direccion_rem} />  
        </Grid>
        <Grid item xs={12} md={4}> 
          <TextField className={styles.inputMaterial} label="Telefono" name="telefono_rem" fullWidth onChange={handleChange} 
            value={remisionesSeleccionado && remisionesSeleccionado.telefono_rem} />  
        </Grid>
        <Grid item xs={12} md={4}> 
          <TextField className={styles.inputMaterial} label="Contacto" name="contacto_rem" fullWidth onChange={handleChange} 
            value={remisionesSeleccionado && remisionesSeleccionado.contacto_rem} />  
        </Grid>
        <Grid item xs={12} md={4}> <TextField type="date" InputLabelProps={{ shrink: true }} name="fechacreacion_rem"
          defaultValue={Moment(remisionesSeleccionado.fechacreacion_rem).format('YYYY-MM-DD')} 
          label="Fecha de Creación de la Remisión" fullWidth onChange={handleChange}  />
        </Grid> 
        <Grid item xs={12} md={4}>
          <FormControl className={styles.formControl2}>
            <InputLabel id="idselectestado_rem">Estado</InputLabel>
            <Select
              labelId="selectestado_rem"
              name="estado_rem"
              id="idselectestado_rem"
              fullWidth
              onChange={handleChange}
              value={remisionesSeleccionado && remisionesSeleccionado.estado_rem}
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
        <Grid item xs={12} md={3}>
          <FormControl className={styles.formControl3}>
            <InputLabel id="idselectequipo1_rem">Elemento Uno</InputLabel>
            <Select
              labelId="selectequipo1_rem"
              name="equipo1_rem"
              id="idselectequipo1_rem"
              fullWidth
              onChange={handleChange}
              value={remisionesSeleccionado && remisionesSeleccionado.equipo1_rem}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarEquipos.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_equ}>{itemselect.codigo_equ}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>  
        <Grid item xs={12} md={3}>
          <TextField type="numeric" className={styles.inputMaterial} label="Valor Horometro" name="horometro_rem"
          fullWidth onChange={handleChange}  value={remisionesSeleccionado && remisionesSeleccionado.horometro_rem} />  
        </Grid> 
        <Grid item xs={12} md={3}>
          <FormControl className={styles.formControl3}>
            <InputLabel id="idselectequipo2_rem">Elemento Dos</InputLabel>
            <Select
              labelId="selectequipo2_rem"
              name="equipo2_rem"
              id="idselectequipo2_rem"
              fullWidth
              onChange={handleChange}
              value={remisionesSeleccionado && remisionesSeleccionado.equipo2_rem}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarEquipos.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_equ}>{itemselect.codigo_equ}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid> 
        <Grid item xs={12} md={3}>
          <FormControl className={styles.formControl3}>
            <InputLabel id="idselectequipo3_rem">Elemento Tres</InputLabel>
            <Select
              labelId="selectequipo3_rem"
              name="equipo3_rem"
              id="idselectequipo3_rem"
              fullWidth
              onChange={handleChange}
              value={remisionesSeleccionado && remisionesSeleccionado.equipo3_rem}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarEquipos.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_equ}>{itemselect.codigo_equ}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>  
        <Grid item xs={12} md={3}>
          <FormControl className={styles.formControl3}>
            <InputLabel id="idselectequipo4_rem">Elemento Cuatro</InputLabel>
            <Select
              labelId="selectequipo4_rem"
              name="equipo4_rem"
              id="idselectequipo4_rem"
              fullWidth
              onChange={handleChange}
              value={remisionesSeleccionado && remisionesSeleccionado.equipo4_rem}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarEquipos.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_equ}>{itemselect.codigo_equ}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={3}>
          <FormControl className={styles.formControl3}>
            <InputLabel id="idselectlucesdetrabajo_rem">Luces de Trabajo</InputLabel>
            <Select
              labelId="selectlucesdetrabajo_rem"
              name="lucesdetrabajo_rem"
              id="idselectlucesdetrabajo_rem"
              fullWidth
              onChange={handleChange}
              value={remisionesSeleccionado && remisionesSeleccionado.lucesdetrabajo_rem}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              <MenuItem value="S">Marcado Si</MenuItem>
              <MenuItem value="N">Marcado No</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={3}>
          <FormControl className={styles.formControl3}>
            <InputLabel id="idselectluzstrober_rem">Luz Strober</InputLabel>
            <Select
              labelId="selectluzstrober_rem"
              name="luzstrober_rem"
              id="idselectluzstrober_rem"
              fullWidth
              onChange={handleChange}
              value={remisionesSeleccionado && remisionesSeleccionado.luzstrober_rem}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              <MenuItem value="S">Marcado Si</MenuItem>
              <MenuItem value="N">Marcado No</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={3}>
          <FormControl className={styles.formControl3}>
            <InputLabel id="idselectcamara_rem">Camara</InputLabel>
            <Select
              labelId="selectcamara_rem"
              name="camara_rem"
              id="idselectcamara_rem"
              fullWidth
              onChange={handleChange}
              value={remisionesSeleccionado && remisionesSeleccionado.camara_rem}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              <MenuItem value="S">Marcado Si</MenuItem>
              <MenuItem value="N">Marcado No</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={3}>
          <FormControl className={styles.formControl3}>
            <InputLabel id="idselectsensordeimpacto_rem">Sensor Impacto</InputLabel>
            <Select
              labelId="selectsensordeimpacto_rem"
              name="sensordeimpacto_rem"
              id="idselectsensordeimpacto_rem"
              fullWidth
              onChange={handleChange}
              value={remisionesSeleccionado && remisionesSeleccionado.sensordeimpacto_rem}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              <MenuItem value="S">Marcado Si</MenuItem>
              <MenuItem value="N">Marcado No</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={3}>
          <FormControl className={styles.formControl3}>
            <InputLabel id="idselectalarmadereservsa_rem">Alarma Revsersa</InputLabel>
            <Select
              labelId="selectalarmadereservsa_rem"
              name="alarmadereservsa_rem"
              id="idselectalarmadereservsa_rem"
              fullWidth
              onChange={handleChange}
              value={remisionesSeleccionado && remisionesSeleccionado.alarmadereservsa_rem}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              <MenuItem value="S">Marcado Si</MenuItem>
              <MenuItem value="N">Marcado No</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={3}>
          <FormControl className={styles.formControl3}>
            <InputLabel id="idselectcamasdebateria_rem">Camas Batería</InputLabel>
            <Select
              labelId="selectcamasdebateria_rem"
              name="camasdebateria_rem"
              id="idselectcamasdebateria_rem"
              fullWidth
              onChange={handleChange}
              value={remisionesSeleccionado && remisionesSeleccionado.camasdebateria_rem}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              <MenuItem value="S">Marcado Si</MenuItem>
              <MenuItem value="N">Marcado No</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <div align="right">
        <Button color="primary"  onClick={()=>actualizarRemision()} >Editar</Button>
        <Button onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  const remisionEliminar = (
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar la Remision <b>{remisionesSeleccionado && remisionesSeleccionado.nombre_rem}</b>? </p>
      <div align="right">
        <Button color="secondary" onClick = {() => borrarRemision() }> Confirmar </Button>
        <Button onClick={()=>abrirCerrarModalEliminar()}> Cancelar </Button>
      </div>
    </div>
  )

  return (
    <div className="App">
    <br />
    <Button variant="contained" startIcon={<SaveIcon />} color="primary" onClick={() => abrirCerrarModalInsertar()} >Agregar Remision</Button>
     <MaterialTable
       columns={columnas}
       data={listRemision}
       title="CONSULTA DE REMISIONES"
       actions={[
         {
           icon     : 'edit',
           tooltip  : 'Editar Remision',
           onClick  : (event, rowData) => seleccionarRemision(rowData, "Editar")
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
    />{}
    <Modal
      open={modalInsertar}
      onClose={abrirCerrarModalInsertar}
    >
      {remisionInsertar}
    </Modal>

    <Modal
      open={modalEditar}
      onClose={abrirCerrarModalEditar}
    >
      {remisionEditar}
    </Modal>

    <Modal
      open={modalEliminar}
      onClose={abrirCerrarModalEliminar}
    >
      {remisionEliminar}
    </Modal>
    </div>
  );
}

export default Remisiones;