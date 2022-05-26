import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import {Modal, TextField, Button, Select, MenuItem, FormControl, InputLabel, Typography } from "@material-ui/core";
import { green, blue, blueGrey, red } from '@material-ui/core/colors';
import {makeStyles} from "@material-ui/core/styles";
import SaveIcon from '@material-ui/icons/Save';
import swal from 'sweetalert';

// Componentes de Conexion con el Backend
import fallasMttoServices from "../../../services/Mantenimiento/FallasMtto";
import tiposFallasServices from "../../../services/Mantenimiento/TiposFallas";
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

function FallasMtto() {
  const styles = useStyles();
  const [listFallasMtto, setListFallasMtto] = useState([]);
  const [modalInsertar, setModalInsertar ] = useState(false);
  const [modalEditar, setModalEditar]= useState(false);
  const [modalEliminar, setModalEliminar]= useState(false);
  const [formError, setFormError] = useState(false);
  const [listarTiposFallas, setListarTiposFallas] = useState([]);
  const [listarEmpresas, setListarEmpresas] = useState([]);
  const [listarEstados, setListarEstados] = useState([]);
  const [actualiza, setActualiza] = useState(false);
  const [fallasMttoSeleccionado, setFallasMttoSeleccionado] = useState({
    id_fmt: "",
    tipodefalla_fmt: "",
    descripcion_fmt: "",
    empresa_fmt: "",
    estado_fmt: ""
  })

  useEffect(() => {
    async function fetchDataFallasMtto() {
      const res = await fallasMttoServices.listfallasmtto();
      setListFallasMtto(res.data);
      setActualiza(false);
    }
    fetchDataFallasMtto();
  }, [actualiza])

  useEffect(() => {
    async function fetchDataTiposFallasMtto() {
      const res = await tiposFallasServices.listTiposFallas();
      setListarTiposFallas(res.data);
      setActualiza(false);
    }
    fetchDataTiposFallasMtto();
  }, [])

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

    setFallasMttoSeleccionado( prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const seleccionarFallaMtto=(fallamtto, caso)=>{
    setFallasMttoSeleccionado(fallamtto);
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

  const grabarFallaMtto = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;

    if (!fallasMttoSeleccionado.tipodefalla_fmt) {
      errors.tipodefalla_fmt = true;
      formOk = false;
    }

    if (!fallasMttoSeleccionado.descripcion_fmt) {
      errors.descripcion_fmt = true;
      formOk = false;
    }

    if (!fallasMttoSeleccionado.empresa_fmt) {
      errors.empresa_fmt = true;
      formOk = false;
    }

    if (!fallasMttoSeleccionado.estado_fmt) {
      errors.estado_fmt = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
      console.log(fallasMttoSeleccionado);
      const res = await fallasMttoServices.save(fallasMttoSeleccionado);

      if (res.success) {
        swal("Falla de Mtto", "Creada de forma Correcta!", "success", { button: "Aceptar" });
        console.log(res.message)
        abrirCerrarModalInsertar();
        delete fallasMttoSeleccionado.tipodefalla_fmt;
        delete fallasMttoSeleccionado.descripcion_fmt;
        delete fallasMttoSeleccionado.empresa_fmt;
        delete fallasMttoSeleccionado.estado_fmt;
      } else
      {
        swal("Falla de Mtto", "Error Creando Falla de Mantenimiento!", "error", { button: "error" });
        console.log(res.message);
        abrirCerrarModalInsertar();
      }
    }
    else {
      swal("Falla de Mtto", "Debe Ingresar Todos los Datos, Revisar Información!", "warning", { button: "Aceptar" });
      console.log(res.message);
      abrirCerrarModalInsertar();
    }
    setActualiza(true);
  }

  const actualizarFallaMtto = async () => {
  
    setFormError({});
    let errors = {};
    let formOk = true;

    if (!fallasMttoSeleccionado.tipodefalla_fmt) {
      errors.tipodefalla_fmt = true;
      formOk = false;
    }

    if (!fallasMttoSeleccionado.descripcion_fmt) {
      errors.descripcion_fmt = true;
      formOk = false;
    }

    if (!fallasMttoSeleccionado.empresa_fmt) {
      errors.empresa_fmt = true;
      formOk = false;
    }

    if (!fallasMttoSeleccionado.estado_fmt) {
      errors.estado_fmt = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
    
    const res = await fallasMttoServices.update(fallasMttoSeleccionado);

    if (res.success) {
        swal("Falla de Mtto", "Actualizada de forma Correcta!", "success", { button: "Aceptar" });
        console.log(res.message)
        abrirCerrarModalEditar();
        delete fallasMttoSeleccionado.tipodefalla_fmt;
        delete fallasMttoSeleccionado.descripcion_fmt;
        delete fallasMttoSeleccionado.empresa_fmt;
        delete fallasMttoSeleccionado.estado_fmt;
    } else
    {
        swal("Falla de Mtto", "Error Actualizando Falla de Mantenimiento!", "error", { button: "Aceptar" });
        console.log(res.message);
        abrirCerrarModalEditar();
    }
    }
    else {
      swal("Falla de Mtto", "Debe Ingresar Todos los Revisar Información!", "warning", { button: "Aceptar" });
      //console.log("DATOS ACTIVIDAD ", fallasMttoSeleccionado);
      console.log(res.message);
      abrirCerrarModalEditar();
    } 
    setActualiza(true);
  }

  const borrarFallaMtto = async()=>{
   
    const res = await fallasMttoServices.delete(fallasMttoSeleccionado.id_fmt);

    if (res.success) {
        swal("Falla de Mtto", "Borrada de forma Correcta!", "success", { button: "Aceptar" });
        console.log(res.message)
        abrirCerrarModalEliminar();
    }
    else {
        swal("Falla de Mtto", "Error Borrando Falla de Mantenimiento!", "error", { button: "Aceptar" });
        console.log(res.message);
        abrirCerrarModalEliminar();
    }
    setActualiza(true);
  }
 // "string","boolean","numeric","date","datetime","time","currency"
  const columnas = [
    {
      title: 'Id',
      field: 'id_fmt'
    },
    {
      title: 'Descripcion',
      field: 'descripcion_fmt'
    },
    {
      title: 'Tipo de Falla',
      field: 'descripcion_tfa'
    },
    {
      title: 'Código',
      field: 'empresa_fmt'
    },
    {
      title: 'Nombre Empresa',
      field: 'nombre_emp'
    },
    {
      title: 'Estado',
      field: 'estado_fmt'
    },
    {
      title: 'Nombre Estado',
      field: 'nombre_est'
    }
  ]

  const fallaMttoInsertar=(
    <div className={styles.modal}>
      <Typography align="center" className={styles.typography} variant="button" display="block">Agregar Falla de Mtto </Typography>
      <TextField className={styles.inputMaterial} label="Descripción" name="descripcion_fmt" onChange={handleChange} />
      <br />
      <FormControl className={styles.formControl}>
        <InputLabel id="idselectTipoFalla">Tipo de Falla Mtto</InputLabel>
        <Select
          labelId="selectTipoFalla"
          name="tipodefalla_fmt"
          id="idselecttipodefalla_fmt"
          onChange={handleChange}
        >
          <MenuItem value="">  <em>None</em> </MenuItem>
          {
            listarTiposFallas.map((itemselect) => {
              return (
                <MenuItem value={itemselect.id_tfa }>{itemselect.descripcion_tfa}</MenuItem>
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
          name="empresa_fmt"
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
          name="estado_fmt"
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
        <Button className={styles.button} color="primary" onClick = { () => grabarFallaMtto() } >Insertar</Button>
        <Button className={styles.button2} onClick={()=> abrirCerrarModalInsertar()} >Cancelar</Button>
      </div>
    </div>
  )

  //   value={fallasMttoSeleccionado&&fallasMttoSeleccionado.descripcion_fmt}/>

  const fallaMttoEditar = (
    <div className={styles.modal}>
      <Typography align="center" className={styles.typography} variant="button" display="block">Actualizar Falla Mtto</Typography>
      
      <br />
      <div align="right">
        <Button className={styles.button} color="primary"  onClick={()=>actualizarFallaMtto()} >Editar</Button>
        <Button className={styles.button2} onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  const fallaMttoEliminar = (
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar la Falla de Mantenimiento<b>{fallasMttoSeleccionado && fallasMttoSeleccionado.descripcion_fmt}</b>? </p>
      <div align="right">
        <Button className={styles.button} color="secondary" onClick = {() => borrarfallaMtto() }> Confirmar </Button>
        <Button className={styles.button2} onClick={()=>abrirCerrarModalEliminar()}> Cancelar </Button>
      </div>
    </div>
  )

  return (
    <div className="App">
     <br />
     <Button variant="contained" startIcon={<SaveIcon />} color="primary" onClick={() => abrirCerrarModalInsertar()} >Agregar Falla de Mtto</Button>
     <MaterialTable
       columns={columnas}
       data={listFallasMtto}
       title="FALLAS DE MANTENIMIENTO"
       actions={[
         {
           icon     : 'edit',
           tooltip  : 'Editar Falla de Mtto',
           onClick  : (event, rowData) => seleccionarFallaMtto(rowData, "Editar")
         },
         {
          icon     : 'delete',
          tooltip  : 'Borrar Falla de Mtto',
          onClick  : (event, rowData) =>  seleccionarFallaMtto(rowData, "Eliminar")
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
      {fallaMttoInsertar}
    </Modal>

    <Modal
      open={modalEditar}
      onClose={abrirCerrarModalEditar}
    >
      {fallaMttoEditar}
    </Modal>

    <Modal
      open={modalEliminar}
      onClose={abrirCerrarModalEliminar}
    >
      {fallaMttoEliminar}
    </Modal>
    </div>
  );
}

export default FallasMtto;