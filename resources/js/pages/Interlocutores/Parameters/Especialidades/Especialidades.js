import React, { useEffect, useState } from "react";
import axios from "axios";
import MaterialTable from "material-table";
import {Modal, TextField, Button, Select, MenuItem, FormControl, InputLabel,Typography } from "@material-ui/core";
import { green, blue, blueGrey, red } from '@material-ui/core/colors';
import {makeStyles} from "@material-ui/core/styles";
import SaveIcon from '@material-ui/icons/Save';
import swal from 'sweetalert';

// Componentes de Conexion con el Backend
import especialidadesServices from "../../../../services/Interlocutores/Especialidades";
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
  iconos:{
    cursor: 'pointer'
  }, 
  inputMaterial:{
    width: '100%'
  },
  formControl: {
    margin: theme.spacing(0),
    minWidth: 315,
  },
  typography: {
    fontSize: 16,
    color   : "#ff3d00"
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

function Especialidades() {
  const styles = useStyles();
  const [listEspecialidades, setListEspecialidades] = useState([]);
  const [modalInsertar, setModalInsertar ] = useState(false);
  const [modalEditar, setModalEditar]= useState(false);
  const [modalEliminar, setModalEliminar]= useState(false);
  const [formError, setFormError] = useState(false);
  const [listarEmpresas, setListarEmpresas] = useState([]);
  const [listarEstados, setListarEstados] = useState([]);
  const [actualiza, setActualiza] = useState(false);
  const [especialidadesSeleccionado, setEspecialidadesSeleccionado] = useState({
    id_esp: "",
    codigo_esp: "",
    nombre_esp: "",
    estado_esp: ""
  })

  useEffect (() => {
      async function fetchDataEspecialidad() {
      const res = await especialidadesServices.listEspecialidades();
      setListEspecialidades(res.data) 
      setActualiza(false);
      //console.log(res.data);
    }
    fetchDataEspecialidad();
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
    async function fetchDataEmpresa() {
      const res = await empresasServices.listEmpresas();
      setListarEmpresas(res.data)
      console.log(res.data);
    }
    fetchDataEmpresa();
  }, [])

  const handleChange = e => {
    const {name, value} = e.target;

    setEspecialidadesSeleccionado( prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const seleccionarEspecialidad=(especialidad, caso)=>{
    setEspecialidadesSeleccionado(especialidad);
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

  useEffect(() => {
    async function fetchDataEspecialidad() {
      const res = await especialidadesServices.listEspecialidades();
      setListEspecialidades(res.data);
    }
    fetchDataEspecialidad();
  }, [])

  const grabarEspecialidad = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;

    if (!especialidadesSeleccionado.descripcion_esp) {
      errors.descripcion_esp = true;
      formOk = false;
    }

    if (!especialidadesSeleccionado.empresa_esp) {
      errors.empresa_esp = true;
      formOk = false;
    }

    if (!especialidadesSeleccionado.estado_esp) {
      errors.estado_esp = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
      console.log(especialidadesSeleccionado);
      const res = await especialidadesServices.save(especialidadesSeleccionado);

      if (res.success) {
        swal({
          title: "Especialidad",
          text: "Creada de forma Correcta!",
          icon: "success",
          button: "Aceptar"
        });
        console.log(res.message)
        abrirCerrarModalInsertar();
        delete especialidadesSeleccionado.descripcion_esp;
        delete especialidadesSeleccionado.empresa_esp;
        delete especialidadesSeleccionado.estado_esp;
      } else
      {
        swal({
          title: "Especialidad",
          text: "Error Creando la Especialidad del Interlocutor!",
          icon: "error",
          button: "Aceptar"
        });
        console.log(res.message);
        abrirCerrarModalInsertar();
      }
    }
    else {
      swal({
        title: "Especialidad",
        text: "Debe Ingresar Todos los Datos, Error Creando el Especialidad del Interlocutor!",
        icon: "warning",
        button: "Aceptar"
      });
      console.log(res.message);
      abrirCerrarModalInsertar();
    }
    setActualiza(true);
  }

  const actualizarEspecialidad = async () => {
  
    setFormError({});
    let errors = {};
    let formOk = true;

    if (!especialidadesSeleccionado.descripcion_esp) {
      errors.descripcion_esp = true;
      formOk = false;
    }

    if (!especialidadesSeleccionado.empresa_esp) {
      errors.empresa_esp = true;
      formOk = false;
    }

    if (!especialidadesSeleccionado.estado_esp) {
      errors.estado_esp = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
    
    const res = await especialidadesServices.update(especialidadesSeleccionado);

    if (res.success) {
          swal({
          title:  "Especialidad",
          text:   "Actualizada de forma Correcta!",
          icon:   "success",
          button: "Aceptar"
        });
        console.log(res.message)
        abrirCerrarModalEditar();
        delete especialidadesSeleccionado.descripcion_esp;
        delete especialidadesSeleccionado.empresa_esp;
        delete especialidadesSeleccionado.estado_esp;
    } else
    {
          swal({
          title:  "Especialidad",
          text:   "Error Actualizando la Especialidad del Interlocutor!",
          icon:   "error",
          button: "Aceptar"
        });
        console.log(res.message);
        abrirCerrarModalEditar();
    }
    }
    else {
      swal({
        title:  "Especialidad",
        text:   "Debe Ingresar Todos los Datos, Error Actualizando la Especialidad del Interlocutor!",
        icon:   "warning",
        button: "Aceptar"
      });
      console.log(res.message);
      abrirCerrarModalEditar();
    } 
    setActualiza(true);
  }

  const borrarEspecialidad = async()=>{
   
    const res = await especialidadesServices.delete(especialidadesSeleccionado.id_esp);

    if (res.success) {
        swal({
          title: "Especialidad",
          text: "Especialidad del Interlocutor Borrada de forma Correcta!",
          icon: "success",
          button: "Aceptar"
        });
        console.log(res.message)
        abrirCerrarModalEliminar();
    }
    else {
        swal({
          title: "Especialidad",
          text: "Error Borrando la Especiliada del Interlocutor!",
          icon: "error",
          button: "Aceptar"
        });
        console.log(res.message);
        abrirCerrarModalEliminar();
    }
    setActualiza(true);
  }
 // "string","boolean","numeric","date","datetime","time","currency"
  const columnas = [
    {
      title: 'Id',
      field: 'id_esp'
    },
    {
      title: 'Descripción',
      field: 'descripcion_esp'
    },
    {
      title: 'Codigo Empresa',
      field: 'empresa_esp'
    },
    {
      title: 'Nombre Empresa',
      field: 'nombre_emp'
    },
    {
      title: 'Estado',
      field: 'estado_esp'
    }
  ]

  const especialidadesInsertar = (
    <div className={styles.modal}>
      <Typography  align="center" className={ styles.typography } variant="button" display="block" >
        Agregar Nueva Especialidad del Interlocutor
      </Typography>
      <TextField className={styles.inputMaterial} label="Descripción" name="descripcion_esp" onChange={handleChange} />          
      <br />
      <FormControl className={styles.formControl}>
        <InputLabel id="idselectEstado">Estado</InputLabel>
        <Select
          labelId="selectEstado"
          name="estado_esp"
          id="idselectEstado"
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
      <br />
      <FormControl className={styles.formControl}>
        <InputLabel id="idselectEmpresa">Empresa</InputLabel>
        <Select
          labelId="selectEmpresa"
          name="empresa_esp"
          id="idselectEmpresa"
          onChange={handleChange}
        >
          <MenuItem value="">  <em>None</em> </MenuItem>
          {
            listarEmpresas.map((itemselect) => {
              return (
                <MenuItem value={itemselect.id_emp }>{itemselect.nombre_emp}</MenuItem>
              )
            })
          }
        </Select>
      </FormControl>
      <br /><br />
      <div align="right">    
        <Button className={styles.button} color="primary" onClick = { () => grabarEspecialidad() } >Insertar</Button>
        <Button className={styles.button2} onClick={()=> abrirCerrarModalInsertar()} >Cancelar</Button>
      </div>
    </div>
  )

  const especialidadesEditar=(
    <div className={styles.modal}>
      <Typography  align="center" className={ styles.typography } variant="button" display="block" >
        Actualizar Especialidad del Interlocutor
      </Typography>
      <TextField className={styles.inputMaterial} label="Descripción" name="descripcion_esp" onChange={handleChange} value={especialidadesSeleccionado&&especialidadesSeleccionado.descripcion_esp}/>
      <br />
      <FormControl className={styles.formControl}>
        <InputLabel id="idselectEstado">Estado</InputLabel>
        <Select
          labelId="selectEstado"
          name="estado_esp"
          id="idselectEstado"
          onChange={handleChange}
          value={especialidadesSeleccionado&&especialidadesSeleccionado.estado_esp}
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
      <br />
      <FormControl className={styles.formControl} >
        <InputLabel id="idselectEmpresa">Empresa</InputLabel>
        <Select
          labelId="selectEmpresa"
          name="empresa_esp"
          id="idselectEmpresa"
          onChange={handleChange}
          value={especialidadesSeleccionado&&especialidadesSeleccionado.empresa_esp}
        >
          <MenuItem value="">  <em>None</em> </MenuItem>
          {
            listarEmpresas.map((itemselect) => {
              return (
                <MenuItem value={itemselect.id_emp }>{itemselect.nombre_emp}</MenuItem>
              )
            })
          }
        </Select>
      </FormControl>
      <br /><br />
      <div align="right">
        <Button className={styles.button} color="primary"  onClick={()=>actualizarEspecialidad()} >Editar</Button>
        <Button className={styles.button2} onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  const especialidadesEliminar = (
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar la Especialidad del Interlocutor <b>{especialidadesSeleccionado && especialidadesSeleccionado.nombre_esp}</b>? </p>
      <div align="right">
        <Button className={styles.button} color="secondary" onClick = {() => borrarEspecialidad() }> Confirmar </Button>
        <Button className={styles.button2} onClick={()=>abrirCerrarModalEliminar()}> Cancelar </Button>

      </div>

    </div>
  )

  return (
    <div className="App">
      <br />
      <Button variant="contained" startIcon={<SaveIcon />} color="primary" onClick={()=> abrirCerrarModalInsertar() } >Agregar Especialidad del Interlocutor</Button>
      <MaterialTable
        columns={columnas}
        data={listEspecialidades}
        title="ESPECIALIDADES DEL INTERLOCUTOR"
        actions={[
          {
            icon     : 'edit',
            tooltip  : 'Editar Especialidad',
            onClick  : (event, rowData) => seleccionarEspecialidad(rowData, "Editar")
          },
          {
            icon     : 'delete',
            tooltip  : 'Borrar Especialidad',
            onClick  : (event, rowData) =>   seleccionarEspecialidad(rowData, "Eliminar")
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
      {especialidadesInsertar}
    </Modal>

    <Modal
      open={modalEditar}
      onClose={abrirCerrarModalEditar}
    >
      {especialidadesEditar}
    </Modal>

    <Modal
      open={modalEliminar}
      onClose={abrirCerrarModalEliminar}
    >
      {especialidadesEliminar}
    </Modal>
    </div>
  );
}

export default Especialidades;