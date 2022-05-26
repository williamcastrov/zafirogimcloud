import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import {Modal, TextField, Button, Select, MenuItem, FormControl, InputLabel, Typography } from "@material-ui/core";
import { green, blue, blueGrey, red } from '@material-ui/core/colors';
import {makeStyles} from "@material-ui/core/styles";
import SaveIcon from '@material-ui/icons/Save';
import swal from 'sweetalert';

// Componentes de Conexion con el Backend
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

function TiposFallas() {
  const styles = useStyles();
  const [listTiposFallas, setListTiposFallas] = useState([]);
  const [modalInsertar, setModalInsertar ] = useState(false);
  const [modalEditar, setModalEditar]= useState(false);
  const [modalEliminar, setModalEliminar]= useState(false);
  const [formError, setFormError] = useState(false);
  const [listarEmpresas, setListarEmpresas] = useState([]);
  const [listarEstados, setListarEstados] = useState([]);
  const [actualiza, setActualiza] = useState(false);
  const [tiposFallasSeleccionado, setTiposFallasSeleccionado] = useState({
    id_tfa: "",
    descripcion_tfa: "",
    empresa_tfa: "",
    estado_tfa: ""
  })

  useEffect(() => {
    async function fetchDataTiposFallas() {
      const res = await tiposFallasServices.listTiposFallas();
      setListTiposFallas(res.data);
      setActualiza(false);
    }
    fetchDataTiposFallas();
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

    setTiposFallasSeleccionado( prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const seleccionarTipoFalla=(tipofalla, caso)=>{
    setTiposFallasSeleccionado(tipofalla);
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

  const grabarTipoFalla = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;

    if (!tiposFallasSeleccionado.descripcion_tfa) {
      errors.descripcion_tfa = true;
      formOk = false;
    }

    if (!tiposFallasSeleccionado.empresa_tfa) {
      errors.empresa_tfa = true;
      formOk = false;
    }

    if (!tiposFallasSeleccionado.estado_tfa) {
      errors.estado_tfa = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
      console.log(tiposFallasSeleccionado);
      const res = await tiposFallasServices.save(tiposFallasSeleccionado);

      if (res.success) {
        swal("TipoFalla", "Creada de forma Correcta!", "success", { button: "Aceptar" });
        console.log(res.message)
        abrirCerrarModalInsertar();
        delete tiposFallasSeleccionado.descripcion_tfa;
        delete tiposFallasSeleccionado.empresa_tfa;
        delete tiposFallasSeleccionado.estado_tfa;
      } else
      {
        swal("Tipo Falla", "Error Creando el Tipo de Falla!", "error", { button: "error" });
        console.log(res.message);
        abrirCerrarModalInsertar();
      }
    }
    else {
      swal("Tipo Falla", "Debe Ingresar Todos los Datos, Revisar Información!", "warning", { button: "Aceptar" });
      console.log(res.message);
      abrirCerrarModalInsertar();
    }
    setActualiza(true);
  }

  const actualizarTipoFalla = async () => {
  
    setFormError({});
    let errors = {};
    let formOk = true;

    if (!tiposFallasSeleccionado.descripcion_tfa) {
      errors.descripcion_tfa = true;
      formOk = false;
    }

    if (!tiposFallasSeleccionado.empresa_tfa) {
      errors.empresa_tfa = true;
      formOk = false;
    }

    if (!tiposFallasSeleccionado.estado_tfa) {
      errors.estado_tfa = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
    
    const res = await tiposFallasServices.update(tiposFallasSeleccionado);

    if (res.success) {
        swal("Tipo Falla", "Actualizada de forma Correcta!", "success", { button: "Aceptar" });
        console.log(res.message)
        abrirCerrarModalEditar();
        delete tiposFallasSeleccionado.descripcion_tfa;
        delete tiposFallasSeleccionado.empresa_tfa;
        delete tiposFallasSeleccionado.estado_tfa;
    } else
    {
        swal("Tipo Falla", "Error Actualizando el Tipo de Falla!", "error", { button: "Aceptar" });
        console.log(res.message);
        abrirCerrarModalEditar();
    }
    }
    else {
      swal("Tipo Falla", "Debe Ingresar Todos los Revisar Información!", "warning", { button: "Aceptar" });
      console.log("DATOS ACTIVIDAD ", tiposFallasSeleccionado);
      console.log(res.message);
      abrirCerrarModalEditar();
    } 
    setActualiza(true);
  }

  const borrarTipoFalla = async()=>{
   
    const res = await tiposFallasServices.delete(tiposFallasSeleccionado.id_tfa);

    if (res.success) {
        swal("Tipo Falla", "Borrada de forma Correcta!", "success", { button: "Aceptar" });
        console.log(res.message)
        abrirCerrarModalEliminar();
    }
    else {
        swal("Tipo Falla", "Error Borrando el Tipo de Falla!", "error", { button: "Aceptar" });
        console.log(res.message);
        abrirCerrarModalEliminar();
    }
    setActualiza(true);
  }
 // "string","boolean","numeric","date","datetime","time","currency"
  const columnas = [
    {
      title: 'Id',
      field: 'id_tfa'
    },
    {
      title: 'Descripcion',
      field: 'descripcion_tfa'
    },
    {
      title: 'Código',
      field: 'empresa_tfa'
    },
    {
      title: 'Nombre Empresa',
      field: 'nombre_emp'
    },
    {
      title: 'Estado',
      field: 'estado_tfa'
    },
    {
      title: 'Nombre Estado',
      field: 'nombre_est'
    }
  ]

  const TipoFallaInsertar=(
    <div className={styles.modal}>
      <Typography align="center" className={styles.typography} variant="button" display="block">Agregar Actividad Realizada </Typography>
      <TextField className={styles.inputMaterial} label="Descripción" name="descripcion_tfa" onChange={handleChange} />          
      <br />
      <FormControl className={styles.formControl}>
        <InputLabel id="idselectEmpresa">Empresa</InputLabel>
        <Select
          labelId="selectEmpresa"
          name="empresa_tfa"
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
          name="estado_tfa"
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
        <Button className={styles.button} color="primary" onClick = { () => grabarTipoFalla() } >Insertar</Button>
        <Button className={styles.button2} onClick={()=> abrirCerrarModalInsertar()} >Cancelar</Button>
      </div>
    </div>
  )

  const TipoFallaEditar = (
    <div className={styles.modal}>
      <Typography align="center" className={styles.typography} variant="button" display="block">Actualizar Actividad Realizada </Typography>
      <TextField className={styles.inputMaterial} label="Descripción" name="descripcion_tfa" onChange={handleChange}
       value={tiposFallasSeleccionado&&tiposFallasSeleccionado.descripcion_tfa}/>
      <br />
      <FormControl className={styles.formControl}>
        <InputLabel id="idselectEmpresa">Empresa</InputLabel>
        <Select
          labelId="selectEmpresa"
          name="empresa_tfa"
          id="idselectEmpresa"
          onChange={handleChange}
          value={tiposFallasSeleccionado&&tiposFallasSeleccionado.empresa_tfa}
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
          name="estado_tfa"
          id="idselectEstado"
          onChange={handleChange}
          value={tiposFallasSeleccionado&&tiposFallasSeleccionado.estado_tfa}
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
        <Button className={styles.button} color="primary"  onClick={()=>actualizarTipoFalla()} >Editar</Button>
        <Button className={styles.button2} onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  const TipoFallaEliminar = (
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar el Tipo de Falla <b>{tiposFallasSeleccionado && tiposFallasSeleccionado.descripcion_tfa}</b>? </p>
      <div align="right">
        <Button className={styles.button} color="secondary" onClick = {() => borrarTipoFalla() }> Confirmar </Button>
        <Button className={styles.button2} onClick={()=>abrirCerrarModalEliminar()}> Cancelar </Button>
      </div>
    </div>
  )

  return (
    <div className="App">
     <br />
     <Button variant="contained" startIcon={<SaveIcon />} color="primary" onClick={() => abrirCerrarModalInsertar()} >Agregar Actividad Realizada</Button>
     <MaterialTable
       columns={columnas}
       data={listTiposFallas}
       title="TIPOS DE FALLAS DE MANTENIMIENTO"
       actions={[
         {
           icon     : 'edit',
           tooltip  : 'Editar Tipo Falla',
           onClick  : (event, rowData) => seleccionarTipoFalla(rowData, "Editar")
         },
         {
          icon     : 'delete',
          tooltip  : 'Borrar Tipo Falla',
          onClick  : (event, rowData) =>  seleccionarTipoFalla(rowData, "Eliminar")
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
      {TipoFallaInsertar}
    </Modal>

    <Modal
      open={modalEditar}
      onClose={abrirCerrarModalEditar}
    >
      {TipoFallaEditar}
    </Modal>

    <Modal
      open={modalEliminar}
      onClose={abrirCerrarModalEliminar}
    >
      {TipoFallaEliminar}
    </Modal>
    </div>
  );
}

export default TiposFallas;