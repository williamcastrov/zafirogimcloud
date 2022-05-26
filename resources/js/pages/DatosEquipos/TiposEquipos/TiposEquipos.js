import React, { useEffect, useState } from "react";
import axios from "axios";
import MaterialTable from "material-table";
import {Modal, TextField, Button, Select, MenuItem, FormControl, InputLabel, Typography } from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import SaveIcon from '@material-ui/icons/Save';
import swal from 'sweetalert';

// Componentes de Conexion con el Backend
import tiposequiposServices from "../../../services/DatosEquipos/TiposEquipos"
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
  typography: {
    fontSize: 16,
    color: "#ff3d00"
  }
}));

function TiposEquipos() {
  const styles = useStyles();
  const [listarTiposEquipos, setListarTiposEquipos] = useState([]);
  const [modalInsertar, setModalInsertar ] = useState(false);
  const [modalEditar, setModalEditar]= useState(false);
  const [modalEliminar, setModalEliminar]= useState(false);
  const [formError, setFormError] = useState(false);
  const [listarEmpresas, setListarEmpresas] = useState([]);
  const [listarEstados, setListarEstados] = useState([]);
  const [tiposequiposSeleccionado, setTiposEquiposSeleccionado ] = useState({
    'id_tequ'         : "",
    'descripcion_tequ': "",
    'observacion_tequ': "",
    'empresa_tequ'    : "",
    'estado_tequ'     : "",
  })

  useEffect (() => {
      async function fetchDataTiposEquipos() {
      const res = await tiposequiposServices.listTiposEquipos();
      setListarTiposEquipos(res.data) 
      console.log(res.data);
    }
    fetchDataTiposEquipos();
  }, [])

  useEffect (() => {
    async function fetchDataEstados() {
    const res = await estadosServices.listEstados();
    setListarEstados(res.data) 
    //console.log(res.data);
  }
  fetchDataEstados();
  }, [])

  useEffect(() => {
    async function fetchDataEmpresas() {
      const res = await empresasServices.listEmpresas();
      setListarEmpresas(res.data)
      //console.log(res.data);
    }
    fetchDataEmpresas();
  }, [])

  const handleChange = e => {
    const {name, value} = e.target;

    setTiposEquiposSeleccionado( prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const seleccionarTiposEquipos=(especialidad, caso)=>{
    setTiposEquiposSeleccionado(especialidad);
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

  const grabarTipoEquipo = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;

    if (!tiposequiposSeleccionado.descripcion_tequ) {
      errors.descripcion_tequ = true;
      formOk = false;
    }
    
    if (!tiposequiposSeleccionado.observacion_tequ) {
      errors.observacion_tequ = true;
      formOk = false;
    }

    if (!tiposequiposSeleccionado.empresa_tequ) {
      errors.empresa_tequ = true;
      formOk = false;
    }

    if (!tiposequiposSeleccionado.estado_tequ) {
      errors.estado_tequ = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
      //console.log(tiposequiposSeleccionado);
      const res = await tiposequiposServices.save(tiposequiposSeleccionado);

      if (res.success) {
        swal( "Tipos Equipos", "Tipo de Equipo Creado de forma Correcta!", "success", { button: "Aceptar" });
        console.log(res.message)
        abrirCerrarModalInsertar();
        delete tiposequiposSeleccionado.descripcion_tequ;
        delete tiposequiposSeleccionado.observacion_tequ;
        delete tiposequiposSeleccionado.empresa_tequ;
        delete tiposequiposSeleccionado.estado_tequ;
      } else
      {
        swal( "Tipos Equipos", "Error Creando el Tipo de Equipo!", "error", { button: "Aceptar" });
        console.log(res.message);
        abrirCerrarModalInsertar();
      }
    }
    else {
      swal( "Tipos Equipos", "Debe Ingresar Todos los Datos, Revisar Información!", "warning", { button: "Aceptar" });
      //console.log(tiposequiposSeleccionado);
      console.log(res.message);
      abrirCerrarModalInsertar();
    }
  }

  const actualizarTipoEquipo = async () => {
  
    setFormError({});
    let errors = {};
    let formOk = true;
    
    if (!tiposequiposSeleccionado.descripcion_tequ) {
      errors.descripcion_tequ = true;
      formOk = false;
    }
    
    if (!tiposequiposSeleccionado.observacion_tequ) {
      errors.observacion_tequ = true;
      formOk = false;
    }

    if (!tiposequiposSeleccionado.empresa_tequ) {
      errors.empresa_tequ = true;
      formOk = false;
    }

    if (!tiposequiposSeleccionado.estado_tequ) {
      errors.estado_tequ = true;
      formOk = false;
    }
    setFormError(errors);

    if (formOk) {
    
    const res = await tiposequiposServices.update(tiposequiposSeleccionado);

    if (res.success) {
        swal( "Tipos Equipos", "Tipo de Equipo actualizado de forma Correcta!", "success", { button: "Aceptar" });
        console.log(res.message)
        abrirCerrarModalEditar();
        delete tiposequiposSeleccionado.descripcion_tequ;
        delete tiposequiposSeleccionado.observacion_tequ;
        delete tiposequiposSeleccionado.empresa_tequ;
        delete tiposequiposSeleccionado.estado_tequ;
    } else
    {
        swal( "Tipos Equipos", "Error Actualizando el Tipo de Equipo!", "error", { button: "Aceptar" });
        console.log(res.message);
        abrirCerrarModalEditar();
    }
    }
    else {
      swal( "Tipos Equipos", "Debe Ingresar Todos los Datos, Revisar Información!", "warning", { button: "Aceptar" });
      console.log(res.message);
      abrirCerrarModalEditar();
    } 
  }

  const borrarTipoEquipo = async()=>{
   
    const res = await tiposequiposServices.delete(tiposequiposSeleccionado.id_tequ);

    if (res.success) {
        swal( "Tipos Equipos", "El Tipo de Equipo Borrado de forma Correcta!", "success", { button: "Aceptar" });
        console.log(res.message)
        abrirCerrarModalEliminar();
    }
    else {
        alert("");
        swal( "Tipos Equipos", "Error Borrando el Tipo de Equipo!", "error", { button: "Aceptar" });
        console.log(res.message);
        abrirCerrarModalEliminar();
    }
    
  }
 // "string","boolean","numeric","date","datetime","time","currency"
  const columnas = [
    {
      title: 'Id',
      field: 'id_tequ'
    },
    {
      title: 'Descripción',
      field: 'descripcion_tequ',
      cellStyle: { minWidth: 300 }
    },
    {
      title: 'Codigo Empresa',
      field: 'empresa_tequ'
    },
    {
      title: 'Nombre Empresa',
      field: 'nombre_emp'
    },
    {
      title: 'Estado',
      field: 'nombre_est'
    },
    {
      title: 'Observación',
      field: 'observacion_tequ',
      cellStyle: { minWidth: 600 }
    }
  ]

  const tiposequiposInsertar = (
    <div className={styles.modal}>
      <Typography align="center" className={styles.typography} variant="button" display="block">Agregar Nuevo Tipo de Equipo</Typography>
      <TextField className={styles.inputMaterial} label="Descripción" name="descripcion_tequ" onChange={handleChange} />          
      <br />
      <FormControl className={styles.formControl}>
        <InputLabel id="idselectEstado">Estado</InputLabel>
        <Select
          labelId="selectEstado"
          name="estado_tequ"
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
          name="empresa_tequ"
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
      <TextField className={styles.inputMaterial} label="Observación" name="observacion_tequ" onChange={handleChange} />
      <br /><br />
      <div align="right">    
        <Button color="primary" onClick = { () => grabarTipoEquipo() } >Insertar</Button>
        <Button onClick={()=> abrirCerrarModalInsertar()} >Cancelar</Button>
      </div>
    </div>
  )

  const tiposequiposEditar=(
    <div className={styles.modal}>
      <Typography align="center" className={styles.typography} variant="button" display="block">Actualizar Tipo de Equipo</Typography>
      <TextField className={styles.inputMaterial} label="Descripción" name="descripcion_tequ" onChange={handleChange} value={tiposequiposSeleccionado&&tiposequiposSeleccionado.descripcion_tequ}/>
      <br />
      <FormControl className={styles.formControl}>
        <InputLabel id="idselectEstado">Estado</InputLabel>
        <Select
          labelId="selectEstado"
          name="estado_tequ"
          id="idselectEstado"
          onChange={handleChange}
          value={tiposequiposSeleccionado&&tiposequiposSeleccionado.estado_tequ}
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
          name="empresa_tequ"
          id="idselectEmpresa"
          onChange={handleChange}
          value={tiposequiposSeleccionado&&tiposequiposSeleccionado.empresa_tequ}
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
      <TextField className={styles.inputMaterial} label="Observación" name="observacion_tequ" 
      onChange={handleChange}value={tiposequiposSeleccionado&&tiposequiposSeleccionado.observacion_tequ} />
      <br /><br />
      <div align="right">
        <Button color="primary"  onClick={()=>actualizarTipoEquipo()} >Editar</Button>
        <Button onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  const tiposequiposEliminar = (
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar el Tipo de Equipo <b>{tiposequiposSeleccionado && tiposequiposSeleccionado.descripcion_tequ}</b>? </p>
      <div align="right">
        <Button color="secondary" onClick = {() => borrarTipoEquipo() }> Confirmar </Button>
        <Button onClick={()=>abrirCerrarModalEliminar()}> Cancelar </Button>
      </div>
    </div>
  )

  return (
    <div className="App">
      <br />
      <Button variant="contained" startIcon={<SaveIcon />} color="primary" onClick={()=> abrirCerrarModalInsertar() } >Agregar Tipo de Equipo</Button>
      <MaterialTable
        columns={columnas}
        data={listarTiposEquipos}
        title="TIPOS DE EQUIPOS"
        actions={[
          {
            icon     : 'edit',
            tooltip  : 'Editar Tipo de Equipo',
            onClick  : (event, rowData) => seleccionarTiposEquipos(rowData, "Editar")
          },
          {
            icon     : 'delete',
            tooltip  : 'Borrar tipo de Equipo',
            onClick  : (event, rowData) =>   seleccionarTiposEquipos(rowData, "Eliminar")
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
      {tiposequiposInsertar}
    </Modal>

    <Modal
      open={modalEditar}
      onClose={abrirCerrarModalEditar}
    >
      {tiposequiposEditar}
    </Modal>

    <Modal
      open={modalEliminar}
      onClose={abrirCerrarModalEliminar}
    >
      {tiposequiposEliminar}
    </Modal>
    </div>
  );
}

export default TiposEquipos;