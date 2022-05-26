import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import {Modal, TextField, Button, Select, MenuItem, FormControl, InputLabel, Typography } from "@material-ui/core";
import { green, blue, blueGrey, red } from '@material-ui/core/colors';
import {makeStyles} from "@material-ui/core/styles";
import SaveIcon from '@material-ui/icons/Save';
import swal from 'sweetalert';

// Componentes de Conexion con el Backend
import tiposservicioServices from "../../../../services/GestionOrdenes/TiposServicio";
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

function TiposServicio() {
  const styles = useStyles();
  const [listTiposServicio, setListTiposServicio] = useState([]);
  const [modalInsertar, setModalInsertar ] = useState(false);
  const [modalEditar, setModalEditar]= useState(false);
  const [modalEliminar, setModalEliminar]= useState(false);
  const [formError, setFormError] = useState(false);
  const [listarEmpresas, setListarEmpresas] = useState([]);
  const [listarEstados, setListarEstados] = useState([]);
  const [actualiza, setActualiza] = useState(false);
  const [tiposServicioSeleccionado, setTiposServicioSeleccionado] = useState({
    id_tser: "",
    descripcion_tser: "",
    empresa_tser: "",
    estado_tser: ""
  })

  useEffect(() => {
    async function fetchDataTiposServicio() {
      const res = await tiposservicioServices.listTiposservicio();
      setListTiposServicio(res.data);
      setActualiza(false);
    }
    fetchDataTiposServicio();
  }, [actualiza])

  useEffect (() => {
      async function fetchDataEmpresas() {
      const res = await empresasServices.listEmpresas();
      setListarEmpresas(res.data) 
      console.log(res.data);
    }
    fetchDataEmpresas();
  }, [])

  useEffect (() => {
    async function fetchDataEstados() {
    const res = await estadosServices.listEstadosGenerales();
    setListarEstados(res.data) 
    console.log(res.data);
  }
  fetchDataEstados();
  }, [])

  const handleChange = e => {
    const {name, value} = e.target;

    setTiposServicioSeleccionado( prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const seleccionarTiposServicio=(tiposservicio, caso)=>{
    setTiposServicioSeleccionado(tiposservicio);
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

  const grabarTiposServicio = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;

    if (!tiposServicioSeleccionado.descripcion_tser) {
      errors.nombre_tser = true;
      formOk = false;
    }

    if (!tiposServicioSeleccionado.empresa_tser) {
      errors.empresa_tser = true;
      formOk = false;
    }

    if (!tiposServicioSeleccionado.estado_tser) {
      errors.estado_tser = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
      console.log(tiposServicioSeleccionado);
      const res = await tiposservicioServices.save(tiposServicioSeleccionado);

      if (res.success) {
        swal("Tipo de Servicio", "Creado de forma Correcta!", "success", { button: "Aceptar" });
        console.log(res.message)
        abrirCerrarModalInsertar();
        delete tiposServicioSeleccionado.descripcion_tser;
        delete tiposServicioSeleccionado.empresa_tser;
        delete tiposServicioSeleccionado.estado_tser;
      } else
      {
        alert("");
        swal("Tipo de Servicio", "Error Creando el Tipo de Servicio!", "error", { button: "Aceptar" });
        console.log(res.message);
        abrirCerrarModalInsertar();
      }
    }
    else {
      swal("Tipo de Servicio", "Debe Ingresar Todos los Datos, Revisar la Información!", "warning", { button: "Aceptar" });
      console.log(res.message);
      abrirCerrarModalInsertar();
    }
    setActualiza(true);
  }

  const actualizarTiposServicio = async () => {
  
    setFormError({});
    let errors = {};
    let formOk = true;

    if (!tiposServicioSeleccionado.descripcion_tser) {
      errors.descripcion_tser = true;
      formOk = false;
    }

    if (!tiposServicioSeleccionado.empresa_tser) {
      errors.empresa_tser = true;
      formOk = false;
    }

    if (!tiposServicioSeleccionado.estado_tser) {
      errors.estado_tser = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
    
    const res = await tiposservicioServices.update(tiposServicioSeleccionado);

    if (res.success) {
        swal("Tipo de Servicio", "Actualizada de forma Correcta!", "success", { button: "Aceptar" });
        console.log(res.message)
        abrirCerrarModalEditar();
        delete tiposServicioSeleccionado.descripcion_tser;
        delete tiposServicioSeleccionado.empresa_tser;
        delete tiposServicioSeleccionado.estado_tser;
    } else
    {
        swal("Tipo de Servicio", "Error Actualizando el Tipo de Servicio!", "error", { button: "Aceptar" });
        console.log(res.message);
        abrirCerrarModalEditar();
    }
    }
    else {
      swal("Tipo de Servicio", "Debe Ingresar Todos los Datos, Revisar la Información!", "warning", { button: "Aceptar" });
      console.log(res.message);
      abrirCerrarModalEditar();
    } 
    setActualiza(true);
  }

  const borrarTiposServicio = async()=>{
   
    const res = await tiposservicioServices.delete(tiposServicioSeleccionado.id_tser);

    if (res.success) {
        swal("Tipo de Servicio", "Actualizadaode forma Correcta!", "success", { button: "Aceptar" });
        console.log(res.message)
        abrirCerrarModalEliminar();
    }
    else {
        swal("Tipo de Servicio", "Creada de forma Correcta!", "error", { button: "Aceptar" });
        console.log(res.message);
        abrirCerrarModalEliminar();
    }
    setActualiza(true);
  }
 // "string","boolean","numeric","date","datetime","time","currency"
  const columnas = [
    {
      title: 'Id',
      field: 'id_tser',
      type: 'numeric'
    },
    {
      title: 'Descripcion',
      field: 'descripcion_tser'
    },
    {
      title: 'Código',
      field: 'empresa_tser'
    },
    {
      title: 'Nombre Empresa',
      field: 'nombre_emp'
    },
    {
      title: 'Estado',
      field: 'estado_tser'
    },
    {
      title: 'Nombre Estado',
      field: 'nombre_est'
    }
  ]

  const tiposservicioInsertar=(
    <div className={styles.modal}>
      <Typography align="center" className={styles.typography} variant="button" display="block" >
      Agregar Tipo de Servicio
      </Typography>
      <br />
      <TextField className={styles.inputMaterial} label="Descripción" name="descripcion_tser" onChange={handleChange} />          
      <br />
      <FormControl className={styles.formControl}>
        <InputLabel id="idselectEmpresa">Empresa</InputLabel>
        <Select
          labelId="selectEmpresa"
          name="empresa_tser"
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
      <br />
      <FormControl className={styles.formControl}>
        <InputLabel id="idselectEstado">Estado</InputLabel>
        <Select
          labelId="selectEstado"
          name="estado_tser"
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
      <br /><br />
      <div align="right">    
        <Button className={styles.button} color="primary" onClick = { () => grabarTiposServicio() } >Insertar</Button>
        <Button className={styles.button2} onClick={()=> abrirCerrarModalInsertar()} >Cancelar</Button>
      </div>
    </div>
  )

  const tiposservicioEditar = (
    <div className={styles.modal}>
      <Typography align="center" className={styles.typography} variant="button" display="block" >
        Actualizar Tipo de Servicio
      </Typography>
      <br />
      <TextField className={styles.inputMaterial} label="Descripción" name="descripcion_tser" onChange={handleChange} value={tiposServicioSeleccionado&&tiposServicioSeleccionado.descripcion_tser}/>
      <br />
      <FormControl className={styles.formControl}>
        <InputLabel id="idselectEmpresa">Empresa</InputLabel>
        <Select
          labelId="selectEmpresa"
          name="empresa_tser"
          id="idselectEmpresa"
          onChange={handleChange}
          value={tiposServicioSeleccionado&&tiposServicioSeleccionado.empresa_tser}
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
      <br />
      <FormControl className={styles.formControl}>
        <InputLabel id="idselectEstado">Estado</InputLabel>
        <Select
          labelId="selectEstado"
          name="estado_tser"
          id="idselectEstado"
          onChange={handleChange}
          value={tiposServicioSeleccionado&&tiposServicioSeleccionado.estado_tser}
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
      <br /><br />
      <div align="right">
        <Button className={styles.button} color="primary"  onClick={()=>actualizarTiposServicio()} >Editar</Button>
        <Button className={styles.button2} onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  const tiposservicioEliminar = (
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar el Tipo de Servicio <b>{tiposServicioSeleccionado && tiposServicioSeleccionado.descripcion_tser}</b>? </p>
      <div align="right">
        <Button className={styles.button} color="secondary" onClick = {() => borrarTiposServicio() }> Confirmar </Button>
        <Button className={styles.button2} onClick={()=>abrirCerrarModalEliminar()}> Cancelar </Button>
      </div>
    </div>
  )

  return (
    <div className="App">
    <br />
    <Button variant="contained" startIcon={<SaveIcon />} color="primary" onClick={()=> abrirCerrarModalInsertar() } >Agregar Tipo de Servicio</Button>
     <MaterialTable
       columns={columnas}
       data={listTiposServicio}
       title="MAESTRA TIPOS DE SERVICIOS"
       actions={[
         {
           icon     : 'edit',
           tooltip  : 'Editar Tipo de Servicio',
           onClick  : (event, rowData) => seleccionarTiposServicio(rowData, "Editar")
         },
         {
          icon     : 'delete',
          tooltip  : 'Borrar Tipo de Servicio',
          onClick  : (event, rowData) =>   seleccionarTiposServicio(rowData, "Eliminar")
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
      {tiposservicioInsertar}
    </Modal>

    <Modal
      open={modalEditar}
      onClose={abrirCerrarModalEditar}
    >
      {tiposservicioEditar}
    </Modal>

    <Modal
      open={modalEliminar}
      onClose={abrirCerrarModalEliminar}
    >
      {tiposservicioEliminar}
    </Modal>
    </div>
  );
}

export default TiposServicio;