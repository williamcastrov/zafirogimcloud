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
import cambioelementosServices from "../../../services/Mantenimiento/CambioElementos";
import ciudadesServices from "../../../services/Parameters/Ciudades";
import estadosServices from "../../../services/Parameters/Estados";
import clientesServices from "../../../services/Interlocutores/Clientes";
import equiposServices from "../../../services/Mantenimiento/Equipos";

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
  iconos:{
    cursor: 'pointer'
  }, 
  inputMaterial:{
    width: '100%'
  },
  formControl: {
    margin: theme.spacing(0),
    minWidth: 320,
    maxWidth: 330,
  },
  formControl2: {
    margin: theme.spacing(0),
    minWidth: 260,
    maxWidth: 260,
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

function CambioElementos() {
  const styles = useStyles();
  const [listCambioElementos, setListCambioElementos] = useState([]);
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

  const [cambioelementosSeleccionado, setCambioElementosSeleccionado] = useState({
    id_cel: "",
    cliente_cel: "",
    ciudad_cel: "",
    direccion_cel: "",
    fechacreacion_cel: "",
    estado_cel: "",
    equipoentrega1_cel: "",
    equiporecibe1_cel: "",
    equipoentrega2_cel: "",
    equiporecibe2_cel: "",
    equipoentrega3_cel: "",
    equiporecibe3_cel: ""
  })

  useEffect(() => {
    async function fetchDataCambioElementos() {
      const res = await cambioelementosServices.listcambioelementos();
      setListCambioElementos(res.data);
      setActualiza(false);
    }
    fetchDataCambioElementos();
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

    setCambioElementosSeleccionado( prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const seleccionarCambioElementos = (cambio, caso)=>{
    setCambioElementosSeleccionado(cambio);
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

  const grabarCambioElementos = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;

    if (!cambioelementosSeleccionado.cliente_cel) {
      alert("1")
      errors.cliente_cel = true;
      formOk = false;
    }

    if (!cambioelementosSeleccionado.ciudad_cel) {
      alert("3")
      errors.ciudad_cel = true;
      formOk = false;
    }

    if (!cambioelementosSeleccionado.direccion_cel) {
      alert("4")
      errors.direccion_cel = true;
      formOk = false;
    }

    if (!cambioelementosSeleccionado.fechacreacion_cel) {
      alert("8")
      errors.fechacreacion_cel = true;
      formOk = false;
    }

    if (!cambioelementosSeleccionado.estado_cel) {
      alert("9")
      errors.estado_cel = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
      console.log(cambioelementosSeleccionado);
      const res = await cambioelementosServices.save(cambioelementosSeleccionado);

      if (res.success) {
        swal("Cambio Elementos", "Creada de forma correcta!", "success", { button: "Aceptar" });
        console.log(res.message)
        abrirCerrarModalInsertar();
        delete cambioelementosSeleccionado.cliente_cel;
        delete cambioelementosSeleccionado.ciudad_cel;
        delete cambioelementosSeleccionado.direccion_cel;
        delete cambioelementosSeleccionado.fechacreacion_cel;
        delete cambioelementosSeleccionado.estado_cel;
      } else
      {
        swal("Cambio Elementos", "Error creando el CambioElementos!", "error", { button: "Aceptar" });
        console.log(res.message);
        abrirCerrarModalInsertar();
      }
    }
    else {
      swal("Cambio Elementos", "Debe Ingresar todos los datos!", "warning", { button: "Aceptar" });
      //console.log(cambioelementosSeleccionado)
      console.log(res.message);
      abrirCerrarModalInsertar();
    }
    setActualiza(true);
  }

  const actualizarCambioElementos = async () => {
  
    setFormError({});
    let errors = {};
    let formOk = true;

    if (!cambioelementosSeleccionado.cliente_cel) {
      alert("1")
      errors.cliente_cel = true;
      formOk = false;
    }

    if (!cambioelementosSeleccionado.ciudad_cel) {
      alert("3")
      errors.ciudad_cel = true;
      formOk = false;
    }

    if (!cambioelementosSeleccionado.direccion_cel) {
      alert("4")
      errors.direccion_cel = true;
      formOk = false;
    }

    if (!cambioelementosSeleccionado.fechacreacion_cel) {
      alert("8")
      errors.fechacreacion_cel = true;
      formOk = false;
    }

    if (!cambioelementosSeleccionado.estado_cel) {
      alert("9")
      errors.estado_cel = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
    
    const res = await cambioelementosServices.update(cambioelementosSeleccionado);

    if (res.success) {
        swal("Cambio Elementos", "Cambio Elementos Actualiza de forma correcta!", "success", { button: "Aceptar" });
        console.log(res.message)
        abrirCerrarModalEditar();
        delete cambioelementosSeleccionado.cliente_cel;
        delete cambioelementosSeleccionado.ciudad_cel;
        delete cambioelementosSeleccionado.direccion_cel;
        delete cambioelementosSeleccionado.fechacreacion_cel;
        delete cambioelementosSeleccionado.estado_cel;
    } else
    {
        swal("Cambio Elementos", "Error Actualizando el Cambio Elementos!", "error", { button: "Aceptar" });
        console.log(res.message);
        abrirCerrarModalEditar();
    }
    }
    else {
      swal("Cambio Elementos", "Dege ingresar todos los datos, Revisar!", "warning", { button: "Aceptar" });
      console.log(res.message);
      abrirCerrarModalEditar();
    } 
    setActualiza(true);
  }

  const borrarCambioElementos = async()=>{
   
    const res = await cambioelementosServices.delete(cambioelementosSeleccionado.id_cel);

    if (res.success) {
        swal("Cambio Elementos", "Borrade de forma correcta!", "success", { button: "Aceptar" });
        console.log(res.message)
        abrirCerrarModalEliminar();
    }
    else {
        swal("Cambio Elementos", "Error Borrando el CambioElementos!", "success", { button: "Aceptar" });
        console.log(res.message);
        abrirCerrarModalEliminar();
    }
    setActualiza(true);
  }
 // "string","boolean","numeric","date","datetime","time","currency"
  const columnas = [
    {
      title: 'Id',
      field: 'id_cel'
    },
    {
      title: 'Cliente',
      field: 'razonsocial_cli',
      cellStyle: { minWidth: 200 }
    },
    {
      title: 'Ciudad',
      field: 'nombre_ciu'
    },
    {
      title: 'Dirección',
      field: 'direccion_cel',
      cellStyle: { minWidth: 200 }
    },
    {
      title: 'Fecha de Creación',
      field: 'fechacreacion_cel',
      type: "date"
    },
    {
      title: 'Estado',
      field: 'nombre_est'
    }
  ]

  const cambioelementosInsertar=(
    <div className={styles.modal}>
      <br />
      <Typography align="center" className={styles.typography} variant="button" display="block">Agregar Cambio Elemento </Typography>
      <Grid container spacing={2} > 
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl2}>
            <InputLabel id="idselectcliente_cel">Cliente</InputLabel>
            <Select
              labelId="selectcliente_cel"
              name="cliente_cel"
              id="idselectcliente_cel"
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
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl2}>
            <InputLabel id="idselectciudad_cel">Ciudad</InputLabel>
            <Select
              labelId="selectciudad_cel"
              name="ciudad_cel"
               id="idselectciudad_cel"
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
        <Grid item xs={12} md={12}> 
          <TextField className={styles.inputMaterial} label="Dirección" name="direccion_cel" fullWidth onChange={handleChange} />  
        </Grid>
        <Grid item xs={12} md={6}> <TextField type="date" InputLabelProps={{ shrink: true }} name="fechacreacion_cel"
          defaultValue={Moment(cambioelementosSeleccionado.fechacreacion_cel).format('YYYY-MM-DD')} 
          label="Fecha de Creación" fullWidth onChange={handleChange} />
        </Grid> 
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl2}>
            <InputLabel id="idselectestado_cel">Estado</InputLabel>
            <Select
              labelId="selectestado_cel"
              name="estado_cel"
              id="idselectestado_cel"
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
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl2}>
            <InputLabel id="idselectequipoentrega1_cel">Equipo Entregado</InputLabel>
            <Select
              labelId="selectequipoentrega1_cel"
              name="equipoentrega1_cel"
              id="idselectequipoentrega1_cel"
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
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl2}>
            <InputLabel id="idselectequiporecibe1_cel">Equipo Recibido</InputLabel>
            <Select
              labelId="selectequiporecibe1_cel"
              name="equiporecibe1_cel"
              id="idselectequiporecibe1_cel"
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
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl2}>
            <InputLabel id="idselectequipoentrega2_cel">Equipo Entregado</InputLabel>
            <Select
              labelId="selectequipoentrega2_cel"
              name="equipoentrega2_cel"
              id="idselectequipoentrega2_cel"
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
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl2}>
            <InputLabel id="idselectequiporecibe2_cel">Equipo Recibido</InputLabel>
            <Select
              labelId="selectequiporecibe2_cel"
              name="equiporecibe2_cel"
              id="idselectequiporecibe2_cel"
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
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl2}>
            <InputLabel id="idselectequipoentrega3_cel">Equipo Entregado</InputLabel>
            <Select
              labelId="selectequipoentrega3_cel"
              name="equipoentrega3_cel"
              id="idselectequipoentrega3_cel"
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
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl2}>
            <InputLabel id="idselectequiporecibe3_cel">Equipo Recibido</InputLabel>
            <Select
              labelId="selectequiporecibe3_cel"
              name="equiporecibe3_cel"
              id="idselectequiporecibe3_cel"
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
      </Grid>
      <br /><br />
      <div align="right">    
        <Button color="primary" onClick = { () => grabarCambioElementos() } >Insertar</Button>
        <Button onClick={()=> abrirCerrarModalInsertar()} >Cancelar</Button>
      </div>
    </div>
  )

  const cambioelementosEditar = (
    <div className={styles.modal}>
      <Typography align="center" className={styles.typography} variant="button" display="block">Actualizar Cambio Elemento</Typography>
      <br />
      <Grid container spacing={2} > 
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl2}>
            <InputLabel id="idselectcliente_cel">Cliente</InputLabel>
            <Select
              labelId="selectcliente_cel"
              name="cliente_cel"
              id="idselectcliente_cel"
              onChange={handleChange}
              value={cambioelementosSeleccionado && cambioelementosSeleccionado.cliente_cel}
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
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl2}>
            <InputLabel id="idselectciudad_cel">Ciudad</InputLabel>
            <Select
              labelId="selectciudad_cel"
              name="ciudad_cel"
               id="idselectciudad_cel"
               onChange={handleChange}
               value={cambioelementosSeleccionado && cambioelementosSeleccionado.ciudad_cel}
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
        <Grid item xs={12} md={12}> 
          <TextField className={styles.inputMaterial} label="Dirección" name="direccion_cel" fullWidth onChange={handleChange}
                       value={cambioelementosSeleccionado && cambioelementosSeleccionado.direccion_cel} />  
        </Grid>
        <Grid item xs={12} md={6}> <TextField type="date" InputLabelProps={{ shrink: true }} name="fechacreacion_cel"
          defaultValue={Moment(cambioelementosSeleccionado.fechacreacion_cel).format('YYYY-MM-DD')} 
          label="Fecha de Creación" fullWidth onChange={handleChange}  />
        </Grid> 
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl2}>
            <InputLabel id="idselectestado_cel">Estado</InputLabel>
            <Select
              labelId="selectestado_cel"
              name="estado_cel"
              id="idselectestado_cel"
              fullWidth
              onChange={handleChange}
              value={cambioelementosSeleccionado && cambioelementosSeleccionado.estado_cel}
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
          <FormControl className={styles.formControl2}>
            <InputLabel id="idselectequipoentrega1_cel">Equipo Entregado</InputLabel>
            <Select
              labelId="selectequipoentrega1_cel"
              name="equipoentrega1_cel"
              id="idselectequipoentrega1_cel"
              fullWidth
              onChange={handleChange}
              value={cambioelementosSeleccionado && cambioelementosSeleccionado.equipoentrega1_cel}
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
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl2}>
            <InputLabel id="idselectequiporecibe1_cel">Equipo Recibido</InputLabel>
            <Select
              labelId="selectequiporecibe1_cel"
              name="equiporecibe1_cel"
              id="idselectequiporecibe1_cel"
              fullWidth
              onChange={handleChange}
              value={cambioelementosSeleccionado && cambioelementosSeleccionado.equiporecibe1_cel}
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
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl2}>
            <InputLabel id="idselectequipoentrega2_cel">Equipo Entregado</InputLabel>
            <Select
              labelId="selectequipoentrega2_cel"
              name="equipoentrega2_cel"
              id="idselectequipoentrega2_cel"
              fullWidth
              onChange={handleChange}
              value={cambioelementosSeleccionado && cambioelementosSeleccionado.equipoentrega2_cel}
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
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl2}>
            <InputLabel id="idselectequiporecibe2_cel">Equipo Recibido</InputLabel>
            <Select
              labelId="selectequiporecibe2_cel"
              name="equiporecibe2_cel"
              id="idselectequiporecibe2_cel"
              fullWidth
              onChange={handleChange}
              value={cambioelementosSeleccionado && cambioelementosSeleccionado.equiporecibe2_cel}
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
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl2}>
            <InputLabel id="idselectequipoentrega3_cel">Equipo Entregado</InputLabel>
            <Select
              labelId="selectequipoentrega3_cel"
              name="equipoentrega3_cel"
              id="idselectequipoentrega3_cel"
              fullWidth
              onChange={handleChange}
              value={cambioelementosSeleccionado && cambioelementosSeleccionado.equipoentrega3_cel}
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
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl2}>
            <InputLabel id="idselectequiporecibe3_cel">Equipo Recibido</InputLabel>
            <Select
              labelId="selectequiporecibe3_cel"
              name="equiporecibe3_cel"
              id="idselectequiporecibe3_cel"
              fullWidth
              onChange={handleChange}
              value={cambioelementosSeleccionado && cambioelementosSeleccionado.equiporecibe3_cel}
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
      </Grid>
      <br/>
      <div align="right">
        <Button color="primary"  onClick={()=>actualizarCambioElementos()} >Editar</Button>
        <Button onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  const cambioelementosEliminar = (
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar el Registro <b>{cambioelementosSeleccionado && cambioelementosSeleccionado.nombre_cel}</b>? </p>
      <div align="right">
        <Button color="secondary" onClick = {() => borrarRemision() }> Confirmar </Button>
        <Button onClick={()=>abrirCerrarModalEliminar()}> Cancelar </Button>
      </div>
    </div>
  )

  return (
    <div className="App">
    <br />
    <Button variant="contained" startIcon={<SaveIcon />} color="primary" onClick={() => abrirCerrarModalInsertar()} >Agregar Cambio Elementos</Button>
     <MaterialTable
       columns={columnas}
       data={listCambioElementos}
       title="CONSULTA CARTAS DE CAMBIO"
       actions={[
         {
           icon     : 'edit',
           tooltip  : 'Editar Cambio Elementos',
           onClick  : (event, rowData) => seleccionarCambioElementos(rowData, "Editar")
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
      {cambioelementosInsertar}
    </Modal>

    <Modal
      open={modalEditar}
      onClose={abrirCerrarModalEditar}
    >
      {cambioelementosEditar}
    </Modal>

    <Modal
      open={modalEliminar}
      onClose={abrirCerrarModalEliminar}
    >
      {cambioelementosEliminar}
    </Modal>
    </div>
  );
}

export default CambioElementos;