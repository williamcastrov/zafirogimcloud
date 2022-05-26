import React, { useEffect, useState } from "react";
import axios from "axios";
import MaterialTable from "material-table";
import {Modal, TextField, Button, Select, MenuItem, FormControl, InputLabel, Grid, Typography  } from "@material-ui/core";
import { green, blue, blueGrey, red } from '@material-ui/core/colors';
import {makeStyles} from "@material-ui/core/styles";
import SaveIcon from '@material-ui/icons/Save';
import swal from 'sweetalert';
import Moment from 'moment';

// Componentes de Conexion con el Backend
import empleadosServices from "../../../services/Interlocutores/Empleados";
import ciudadesServices from "../../../services/Parameters/Ciudades";
import estadosServices from "../../../services/Parameters/Estados";
import empresasServices from "../../../services/Empresa";
import especialidadesServices from "../../../services/Interlocutores/Especialidades";

//Componentes Gestion de Contactos
import MenuContactos from "../MenuContactos";

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
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  iconos:{
    cursor: 'pointer'
  }, 
  inputMaterial:{
    width: '100%'
  },
  formControl: {
    margin: theme.spacing(0),
    minWidth: 250,
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

function Empleados() {
  const styles = useStyles();
  const [listarEmpleados, setListarEmpleados] = useState([]);
  const [modalInsertar, setModalInsertar ] = useState(false);
  const [modalEditar, setModalEditar]= useState(false);
  const [modalEliminar, setModalEliminar]= useState(false);
  const [formError, setFormError] = useState(false);
  const [listarEstados, setListarEstados] = useState([]);
  const [listarCiudades, setListarCiudades] = useState([]);
  const [listarEmpresas, setListarEmpresas] = useState([]);
  const [listarEspecialidades, setListarEspecialidades] = useState([]);
  const fechaactual = Moment(new Date()).format('YYYY-MM-DD');
  const horaactual = Moment(new Date()).format('HH:mm:ss');
  const [actualiza, setActualiza] = useState(false);
  const [empleadosSeleccionado, setEmpleadosSeleccionado] = useState({
    id_emp: "",
    codigo_tipo_emp: 3,
    nit_emp: "",
    digitochequeo_emp: 0,
    estado_emp: "",
    primer_nombre_emp: "", 
    segundo_nombre_emp: "",
    primer_apellido_emp: "",
    segundo_apellido_emp: "",
    razonsocial_emp: "",
    ciudad_emp: "",
    direccion_emp: "",
    telefono_emp: "",
    email_emp: "",
    empresa_emp: "",
    fecha_creacion_emp: fechaactual,
    fecha_modificacion_emp: fechaactual, 
    especialidad_emp: ""
  })

  useEffect(() => {
    async function fetchDataEmpleados() {
      const res = await empleadosServices.listEmpleados();
      setListarEmpleados(res.data);
      console.log(res.data)
      setActualiza(false);
    }
    fetchDataEmpleados();
  }, [actualiza])

  useEffect (() => {
      async function fetchDataEmpresas() {
      const res = await empresasServices.listEmpresas();
      setListarEmpresas(res.data) 
      //console.log(res.data);
    }
    fetchDataEmpresas();
  }, [])

  useEffect (() => {
    async function fetchDataEstados() {
    const res = await estadosServices.listEstadosGenerales();
    setListarEstados(res.data) 
    //console.log(res.data);
  }
  fetchDataEstados();
  }, [])
  
  useEffect (() => {
    async function fetchDataCiudades() {
    const res = await ciudadesServices.listCiudades();
    setListarCiudades(res.data) 
    //console.log(res.data);
  }
  fetchDataCiudades();
  }, [])
  
  useEffect (() => {
    async function fetchDataEspecialidades() {
    const res = await especialidadesServices.listEspecialidades();
    setListarEspecialidades(res.data) 
    //console.log(res.data);
  }
  fetchDataEspecialidades();
  }, [])

  const handleChange = e => {
    const {name, value} = e.target;

    setEmpleadosSeleccionado( prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const seleccionarEmpleado=(empleado, caso)=>{
    setEmpleadosSeleccionado(empleado);
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

  const grabarEmpleado = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;

    if (!empleadosSeleccionado.codigo_tipo_emp) {
      errors.codigo_tipo_emp = true;
      formOk = false;
    }

    if (!empleadosSeleccionado.nit_emp) {
      errors.nit_emp = true;
      formOk = false;
    }

    if (!empleadosSeleccionado.estado_emp) {
      errors.estado_emp = true;
      formOk = false;
    }

    if (!empleadosSeleccionado.primer_nombre_emp) {
      errors.primer_nombre_emp = true;
      formOk = false;
    }

    if (!empleadosSeleccionado.segundo_nombre_emp) {
      errors.segundo_nombre_emp = true;
      formOk = false;
    }

    if (!empleadosSeleccionado.primer_apellido_emp) {
      errors.primer_apellido_emp = true;
      formOk = false;
    }

    if (!empleadosSeleccionado.segundo_apellido_emp) {
      errors.segundo_apellido_emp = true;
      formOk = false;
    }

    if (!empleadosSeleccionado.ciudad_emp) {
      errors.ciudad_emp = true;
      formOk = false;
    }

    if (!empleadosSeleccionado.direccion_emp) {
      errors.direccion_emp = true;
      formOk = false;
    }

    if (!empleadosSeleccionado.telefono_emp) {
      errors.telefono_emp = true;
      formOk = false;
    }

    if (!empleadosSeleccionado.email_emp) {
      errors.email_emp = true;
      formOk = false;
    }
    
    if (!empleadosSeleccionado.empresa_emp) {
      errors.empresa_emp = true;
      formOk = false;
    }

    if (!empleadosSeleccionado.fecha_creacion_emp) {
      errors.fecha_creacion_emp = true;
      formOk = false;
    }

    if (!empleadosSeleccionado.fecha_modificacion_emp) {
      errors.fecha_modificacion_emp = true;
      formOk = false;
    }

    if (!empleadosSeleccionado.especialidad_emp) {
      errors.especialidad_emp = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
      console.log(empleadosSeleccionado);
      const res = await empleadosServices.save(empleadosSeleccionado);

      if (res.success) {
        swal("Empleado", "Creado de forma Correcta!", "success", { button: "Aceptar" });
        console.log(res.message)
        abrirCerrarModalInsertar();
        delete empleadosSeleccionado.codigo_tipo_emp;
        delete empleadosSeleccionado.nit_emp;
        delete empleadosSeleccionado.estado_emp;
        delete empleadosSeleccionado.primer_nombre_emp; 
        delete empleadosSeleccionado.segundo_nombre_emp;
        delete empleadosSeleccionado.primer_apellido_emp;
        delete empleadosSeleccionado.segundo_apellido_emp; 
        delete empleadosSeleccionado.ciudad_emp;
        delete empleadosSeleccionado.direccion_emp;
        delete empleadosSeleccionado.telefono_emp;
        delete empleadosSeleccionado.email_emp;
        delete empleadosSeleccionado.empresa_emp;
        delete empleadosSeleccionado.fecha_creacion_emp;
        delete empleadosSeleccionado.fecha_modificacion_emp; 
        delete empleadosSeleccionado.especialidad_emp;
      } else
      {
        swal("Empleado", "Error Creando el Empleado!", "error", { button: "Aceptar" });
        console.log(res.message);
        abrirCerrarModalInsertar();
      }
    }
    else {
      swal("Empleado", "Debe Ingresar Todos los Datos, Error!", "warning", { button: "Aceptar" });
      console.log(empleadosSeleccionado);
      console.log(res.message);
      abrirCerrarModalInsertar();
    }
    setActualiza(true);
  }

  const actualizarEmpleado = async () => {
  
    setFormError({});
    let errors = {};
    let formOk = true;

    if (!empleadosSeleccionado.codigo_tipo_emp) {
      errors.codigo_tipo_emp = true;
      formOk = false;
    }

    if (!empleadosSeleccionado.nit_emp) {
      errors.nit_emp = true;
      formOk = false;
    }

    if (!empleadosSeleccionado.estado_emp) {
      errors.estado_emp = true;
      formOk = false;
    }

    if (!empleadosSeleccionado.primer_nombre_emp) {
      errors.primer_nombre_emp = true;
      formOk = false;
    }

    if (!empleadosSeleccionado.segundo_nombre_emp) {
      errors.segundo_nombre_emp = true;
      formOk = false;
    }

    if (!empleadosSeleccionado.primer_apellido_emp) {
      errors.primer_apellido_emp = true;
      formOk = false;
    }

    if (!empleadosSeleccionado.segundo_apellido_emp) {
      errors.segundo_apellido_emp = true;
      formOk = false;
    }
    
    if (!empleadosSeleccionado.ciudad_emp) {
      errors.ciudad_emp = true;
      formOk = false;
    }

    if (!empleadosSeleccionado.direccion_emp) {
      errors.direccion_emp = true;
      formOk = false;
    }

    if (!empleadosSeleccionado.telefono_emp) {
      errors.telefono_emp = true;
      formOk = false;
    }

    if (!empleadosSeleccionado.email_emp) {
      errors.email_emp = true;
      formOk = false;
    }
    
    if (!empleadosSeleccionado.empresa_emp) {
      errors.empresa_emp = true;
      formOk = false;
    }

    if (!empleadosSeleccionado.fecha_creacion_emp) {
      errors.fecha_creacion_emp = true;
      formOk = false;
    }

    if (!empleadosSeleccionado.fecha_modificacion_emp) {
      errors.fecha_modificacion_emp = true;
      formOk = false;
    }

    if (!empleadosSeleccionado.especialidad_emp) {
      errors.especialidad_emp = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
    
    const res = await empleadosServices.update(empleadosSeleccionado);

    if (res.success) {
        swal("Empleado", "Creado forma Correcta!", "success", { button: "Aceptar" });
        console.log(res.message)
        abrirCerrarModalEditar();
        delete empleadosSeleccionado.codigo_tipo_emp;
        delete empleadosSeleccionado.nit_emp;
        delete empleadosSeleccionado.estado_emp;
        delete empleadosSeleccionado.primer_nombre_emp; 
        delete empleadosSeleccionado.segundo_nombre_emp;
        delete empleadosSeleccionado.primer_apellido_emp;
        delete empleadosSeleccionado.segundo_apellido_emp; 
        delete empleadosSeleccionado.ciudad_emp;
        delete empleadosSeleccionado.direccion_emp;
        delete empleadosSeleccionado.telefono_emp;
        delete empleadosSeleccionado.email_emp;
        delete empleadosSeleccionado.empresa_emp;
        delete empleadosSeleccionado.fecha_creacion_emp;
        delete empleadosSeleccionado.fecha_modificacion_emp; 
        delete empleadosSeleccionado.especialidad_emp;
    } else
    {
        swal("Empleado", "Error Actualizando el Empleado!", "error", { button: "Aceptar" });
        console.log(res.message);
        abrirCerrarModalEditar();
    }
    }
    else {
      swal("Empleado", "Debe Ingresar Todos los Datos, Error!", "warning", { button: "Aceptar" });
      abrirCerrarModalEditar();
    } 
    setActualiza(true);
  }

  const borrarEmpleado = async()=>{
   
    const res = await empleadosServices.delete(empleadosSeleccionado.id_emp);

    if (res.success) {
        swal("Empleado", "Borrado de forma Correcta!", "success", { button: "Aceptar" });
        console.log(res.message)
        abrirCerrarModalEliminar();
    }
    else {
        swal("Empleado", "Error Borrando el Empleado!", "error", { button: "Aceptar" });
        console.log(res.message);
        abrirCerrarModalEliminar();
    }
    setActualiza(true);
  }
 
  // "string","boolean","numeric","date","datetime","time","currency"
  const columnas = [
  {
    field: 'nit_emp',
    title: 'Nit',
    cellStyle : { minWidth: 100}
  },
  {
    field: 'digitochequeo_emp',
    title: 'DC'
  },
  {
    field: 'nombre_est',
    title: 'Estado'
  },
  {
    field: 'primer_nombre_emp',
    title: 'Primero Nombre',
    cellStyle : { minWidth: 100}
  },
  {
    field: 'segundo_nombre_emp',
    title: 'Segundo Nombre',
    cellStyle : { minWidth: 100}
  },
  {
    field: 'primer_apellido_emp',
    title: 'Primer Apelllido',
    cellStyle : { minWidth: 100}
  },
  {
    field: 'segundo_apellido_emp',
    title: 'Segundo Apellido',
    cellStyle : { minWidth: 100}
  },
  {
    field: 'nombre_ciu',
    title: 'Ciudad'
  },
  {
    field: 'direccion_emp',
    title: 'Dirección',
    cellStyle : { minWidth: 175}
  },
  {
    field: 'telefono_emp',
    title: 'Teléfono',
    cellStyle : { minWidth: 130}
  },
  {
    field: 'email_emp',
    title: 'Email',
    width: '400'
  }
  ]
  
  const empleadoInsertar=(
    <div className={styles.modal}>
      <Typography align="center" className={styles.typography} variant="button" display="block">Agregar Nuevo Empleado</Typography>
      <Grid container spacing={2} > 
        <Grid item xs={12} md={6}> <TextField  name="codigo_tipo_emp" label="Tipo Interlocutor" defaultValue="3" disabled="true"
         fullWidth onChange={handleChange} /> </Grid>
        <Grid item xs={12} md={6}> <TextField  name="nit_emp" label="Nit del Interlocutor" fullWidth onChange={handleChange} /> </Grid>
      </Grid>
      <Grid container spacing={2} > 
        <Grid item xs={12} md={6}> 
        <FormControl className={styles.formControl}>
        <InputLabel id="idselectEstado"  >Estado</InputLabel>
          <Select
            labelId="selectEstado"
            name="estado_emp"
            id="idselectEstado"
            fullWidth 
            onChange={handleChange}
          >
          <MenuItem value=""> <em>None</em> </MenuItem>
          {
            listarEstados.map((itemselect) => {
              return (
                <MenuItem value={itemselect.id_est }>{itemselect.nombre_est}</MenuItem>
              )
            })
          }
          </Select>
        </FormControl>
        </Grid>
        <Grid item xs={12} md={6}> <TextField  name="primer_nombre_emp" label="Primero Nombre" fullWidth onChange={handleChange} /> </Grid>
      </Grid>
      <Grid container spacing={2} > 
        <Grid item xs={12} md={6}> <TextField  name="segundo_nombre_emp" label="Segundo Nombre" fullWidth onChange={handleChange} /> </Grid>
        <Grid item xs={12} md={6}> <TextField  name="primer_apellido_emp" label="Primer Apellido" fullWidth onChange={handleChange} /> </Grid>
      </Grid>
      <Grid container spacing={2} > 
        <Grid item xs={12} md={6}> <TextField  name="segundo_apellido_emp" label="Segundo Apellido" onChange={handleChange} fullWidth /> </Grid>
      </Grid>
      <Grid container spacing={2} > 
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectCiudad"  >Ciudad</InputLabel>
              <Select
                labelId="selecCiudad"
                name="ciudad_emp"
                id="idselectCiudad"
                fullWidth 
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
        <Grid item xs={12} md={6}> <TextField  name="direccion_emp" label="Direccion" onChange={handleChange} fullWidth /> </Grid>
      </Grid>
      <Grid container spacing={2} > 
        <Grid item xs={12} md={6}> <TextField  name="telefono_emp" label="Telefono" fullWidth onChange={handleChange} /> </Grid>
        <Grid item xs={12} md={6}> <TextField  name="email_emp" label="Email" fullWidth onChange={handleChange} /> </Grid>
      </Grid>     
      <Grid container spacing={2} > 
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectCiudad" >Empresa</InputLabel>
              <Select
                labelId="selecEmpresa"
                name="empresa_emp"
                id="idselectEmpresa"
                fullWidth 
                onChange={handleChange}
              >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarEmpresas.map((itemselect) => {
                return (
                  <MenuItem value={itemselect.id_emp }>{itemselect.nombre_emp}</MenuItem>
                )
                })
              }
              </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField type="date" InputLabelProps={{ shrink: true }} name="fecha_creacion_emp"
          defaultValue={Moment(empleadosSeleccionado.fechaactual).format('YYYY-MM-DD')} label="Fecha de Creación"
          fullWidth onChange={handleChange} />
        </Grid>
      </Grid>
      <Grid container spacing={2} > 
        <Grid item xs={12} md={6}> 
          <TextField type="date" InputLabelProps={{ shrink: true }} name="fecha_modificacion_emp"
          defaultValue={Moment(empleadosSeleccionado.fechaactual).format('YYYY-MM-DD')} label="Fecha Modificación"
          fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={6}> 
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectEspecialidad" >Especialidad</InputLabel>
              <Select
                labelId="selecEspecialidad"
                name="especialidad_emp"
                id="idselectEspecialidad"
                fullWidth 
                onChange={handleChange}
              >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarEspecialidades.map((itemselect) => {
                return (
                  <MenuItem value={itemselect.id_esp }>{itemselect.descripcion_esp}</MenuItem>
                )
                })
              }
              </Select>
          </FormControl>
        </Grid>
      </Grid>      
      <br /><br />
      <div align="right">    
        <Button className={styles.button} color="primary" onClick = { () => grabarEmpleado() } >Insertar</Button>
        <Button className={styles.button2} onClick={()=> abrirCerrarModalInsertar()} >Cancelar</Button>
      </div>
    </div>
  )

  const empleadoEditar=(
    <div className={styles.modal}>
      <Typography align="center" className={styles.typography} variant="button" display="block">Actualizar Empleado</Typography>
      <Grid container spacing={2} > 
        <Grid item xs={12} md={6}> <TextField  name="codigo_tipo_emp" label="Tipo Interlocutor" fullWidth disabled="true"
          onChange={handleChange} value={empleadosSeleccionado&&empleadosSeleccionado.codigo_tipo_emp} /> </Grid>
        <Grid item xs={12} md={6}> <TextField  name="nit_emp" label="Nit del Interlocutor" fullWidth 
          onChange={handleChange} value={empleadosSeleccionado&&empleadosSeleccionado.nit_emp} /> </Grid>
      </Grid>
      <Grid container spacing={2} > 
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectEstado"  >Estado</InputLabel>
              <Select
                labelId="selectEstado"
                name="estado_emp"
                id="idselectEstado"
                fullWidth 
                onChange={handleChange} value={empleadosSeleccionado&&empleadosSeleccionado.estado_emp}
              >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarEstados.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_est }>{itemselect.nombre_est}</MenuItem>
                  )
                })
              }
          </Select>
        </FormControl>
        </Grid>
        <Grid item xs={12} md={6}> <TextField  name="primer_nombre_emp" label="Primero Nombre" fullWidth 
          onChange={handleChange} value={empleadosSeleccionado&&empleadosSeleccionado.primer_nombre_emp} /> </Grid>
      </Grid>
      <Grid container spacing={2} > 
        <Grid item xs={12} md={6}> <TextField  name="segundo_nombre_emp" label="Segundo Nombre" fullWidth 
          onChange={handleChange} value={empleadosSeleccionado&&empleadosSeleccionado.segundo_nombre_emp} /> </Grid>
        <Grid item xs={12} md={6}> <TextField  name="primer_apellido_emp" label="Primer Apellido" fullWidth 
          onChange={handleChange} value={empleadosSeleccionado&&empleadosSeleccionado.primer_apellido_emp} /> </Grid>
      </Grid>
      <Grid container spacing={2} > 
        <Grid item xs={12} md={6}> <TextField  name="segundo_apellido_emp" label="Segundo Apellido" fullWidth 
          onChange={handleChange} value={empleadosSeleccionado&&empleadosSeleccionado.segundo_apellido_emp} /> </Grid>
      </Grid>
      <Grid container spacing={2} > 
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectCiudad"  >Ciudad</InputLabel>
              <Select
                labelId="selecCiudad"
                name="ciudad_emp"
                id="idselectCiudad"
                fullWidth 
                onChange={handleChange} value={empleadosSeleccionado&&empleadosSeleccionado.ciudad_emp}
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
        <Grid item xs={12} md={6}> <TextField  name="direccion_emp" label="Direccion" fullWidth 
          onChange={handleChange} value={empleadosSeleccionado&&empleadosSeleccionado.direccion_emp} /> </Grid>
      </Grid>
      <Grid container spacing={2} > 
        <Grid item xs={12} md={6}> <TextField  name="telefono_emp" label="Telefono" fullWidth 
          onChange={handleChange} value={empleadosSeleccionado&&empleadosSeleccionado.telefono_emp} /> </Grid>
        <Grid item xs={12} md={6}> <TextField  name="email_emp" label="Email" fullWidth 
          onChange={handleChange} value={empleadosSeleccionado&&empleadosSeleccionado.email_emp} /> </Grid>
      </Grid>
      <Grid container spacing={2} > 
        <Grid item xs={12} md={6}> 
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectCiudad" >Empresa</InputLabel>
              <Select
                labelId="selecEmpresa"
                name="empresa_emp"
                id="idselectEmpresa"
                fullWidth 
                onChange={handleChange} value={empleadosSeleccionado&&empleadosSeleccionado.empresa_emp}
              >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarEmpresas.map((itemselect) => {
                return (
                  <MenuItem value={itemselect.id_emp }>{itemselect.nombre_emp}</MenuItem>
                )
                })
              }
              </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}> 
          <TextField type="date" type="date" InputLabelProps={{ shrink: true }} name="fecha_creacion_emp" label="Fecha de Creación"
          defaultValue={Moment(empleadosSeleccionado.fechaactual).format('YYYY-MM-DD')}
          InputLabelProps={{ shrink: true}} fullWidth onChange={handleChange} />
        </Grid>  
      </Grid>
      <Grid container spacing={2} > 
        <Grid item xs={12} md={6}>
          <TextField type="date" type="date" InputLabelProps={{ shrink: true }} name="fecha_modificacion_emp" label="Fecha de Modificación"
          defaultValue={Moment(empleadosSeleccionado.fechaactual).format('YYYY-MM-DD')}
          InputLabelProps={{ shrink: true}} fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={6}> 
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectEspecialidad" >Especialidad</InputLabel>
              <Select
                labelId="selecEspecialidad"
                name="especialidad_emp"
                id="idselectEspecialidad"
                fullWidth 
                onChange={handleChange} value={empleadosSeleccionado&&empleadosSeleccionado.especialidad_emp}
              >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarEspecialidades.map((itemselect) => {
                return (
                  <MenuItem value={itemselect.id_esp }>{itemselect.descripcion_esp}</MenuItem>
                )
                })
              }
              </Select>
          </FormControl>
        </Grid>
      </Grid>           
      <br /><br />
      <div align="right">
        <Button className={styles.button} color="primary"  onClick={()=>actualizarEmpleado()} >Editar</Button>
        <Button className={styles.button2} onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  const empleadoEliminar = (
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar el CLiente <b>{empleadosSeleccionado && empleadosSeleccionado.primer_nombre_emp}</b>? </p>
      <div align="right">
        <Button className={styles.button} color="secondary" onClick = {() => borrarEmpleado() }> Confirmar </Button>
        <Button className={styles.button2} onClick={()=>abrirCerrarModalEliminar()}> Cancelar </Button>
      </div>
    </div>
  )

  return (
    <div className="App">
      <br />
      <Button variant="contained" startIcon={<SaveIcon />} color="primary" onClick={() => abrirCerrarModalInsertar()} >Agregar Empleado</Button>
      <MaterialTable
        columns={columnas}
        data={listarEmpleados}
        title="MAESTRA DE EMPLEADOS"
        actions={[
          {
            icon     : 'edit',
            tooltip  : 'Editar Empleado',
            onClick  : (event, rowData) => seleccionarEmpleado(rowData, "Editar")
          },
          {
            icon     : 'delete',
            tooltip  : 'Borrar Empleado',
            onClick  : (event, rowData) =>   seleccionarEmpleado(rowData, "Eliminar")
          } 
        ]}
        options={{
         actionsColumnIndex: 12
        }}
        localization={{
          header: {
            actions: "Acciones"
          }
        }}
        detailPanel={[
          {
            tooltip: 'Datos de Fechas',
            render: rowData => {
              return (
                <div
                  style={{
                    fontSize: 14,
                    textAlign: 'center',
                    color: 'white',
                    backgroundColor: '#9e9e9e',
                  }}
                >
                  <Button variant="contained">Fecha de Creación : {rowData.fecha_creacion_emp}</Button> { }
                  <Button variant="contained">Fecha de Modificación  : {rowData.fecha_modificacion_emp}</Button> { }
                </div>
              )
            },
          },
        ]}
      />
      {}

      <Modal
        open={modalInsertar}
        onClose={abrirCerrarModalInsertar}
      >
        {empleadoInsertar}
      </Modal>

      <Modal
        open={modalEditar}
        onClose={abrirCerrarModalEditar}
      >
        {empleadoEditar}
      </Modal>

      <Modal
        open={modalEliminar}
        onClose={abrirCerrarModalEliminar}
      >
        {empleadoEliminar}
      </Modal>
    </div>
  );
}

export default Empleados;

