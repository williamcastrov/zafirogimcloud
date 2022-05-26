import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import {Modal, TextField, Button, Select, MenuItem, FormControl, InputLabel, Typography } from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import SaveIcon from '@material-ui/icons/Save';
import swal from 'sweetalert';

// Componentes de Conexion con el Backend
import regionesServices from "../../../services/Parameters/Regiones";
import paisServices from "../../../services/Parameters/Paises";

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
  }
}));

function Regiones() {
  const styles = useStyles();
  const [listRegiones, setListRegiones] = useState([]);
  const [modalInsertar, setModalInsertar ] = useState(false);
  const [modalEditar, setModalEditar]= useState(false);
  const [modalEliminar, setModalEliminar]= useState(false);
  const [formError, setFormError] = useState(false);
  const [listarPaises, setListarPaises] = useState([]);
  const [regionSeleccionado, setRegionSeleccionado] = useState({
    id_reg: "",
    codigo_reg: "",
    nombre_reg: "",
    pais_reg: ""
  })

  useEffect (() => {
      async function fetchDataPais() {
      const res = await paisServices.listPaises();
      setListarPaises(res.data) 
      console.log(res.data);
    }
    fetchDataPais();
  }, [])

  const handleChange = e => {
    const {name, value} = e.target;

    setRegionSeleccionado( prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const seleccionarRegiones=(regiones, caso)=>{
    setRegionSeleccionado(regiones);
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
    async function fetchDataRegiones() {
      const res = await regionesServices.listRegiones();
      setListRegiones(res.data);
    }
    fetchDataRegiones();
  }, [])

  const grabarRegion = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;

    if (!regionSeleccionado.nombre_reg) {
      errors.nombre_reg = true;
      formOk = false;
    }

    if (!regionSeleccionado.pais_reg) {
      errors.pais_reg = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
      const res = await regionesServices.save(regionSeleccionado);

      if (res.success) {
        swal("Región", "Region Creada de forma Correcta!", "success", { button: "Aceptar" });
        console.log(res.message)
        e.target.reset();
        abrirCerrarModalInsertar();
        delete regionSeleccionado.codigo_reg;
        delete regionSeleccionado.nombre_reg;
        delete regionSeleccionado.pais_reg;
      } else
      {
        swal( "Región", "Error Creando la Region!", "error", { button: "Aceptar" });
        console.log(res.message);
        abrirCerrarModalInsertar();
      }
    }
    else {
      swal( "Región", "Debe Ingresar Todos los Datos, Error Creando la Región!", "warning", { button: "Aceptar" });
      console.log(res.message);
      abrirCerrarModalInsertar();
    }
  }

  const actualizarRegion = async () => {
  
    setFormError({});
    let errors = {};
    let formOk = true;

    if (!regionSeleccionado.nombre_reg) {
      errors.nombre_reg = true;
      formOk = false;
    }

    if (!regionSeleccionado.pais_reg) {
      errors.pais_reg = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
    
    const res = await regionesServices.update(regionSeleccionado);

    if (res.success) {
        swal( "Región", "Region Actualizada de forma Correcta!", "success", {button: "Aceptar"} );
        console.log(res.message)
        abrirCerrarModalEditar();
        delete regionSeleccionado.codigo_reg;
        delete regionSeleccionado.nombre_reg;
        delete regionSeleccionado.pais_reg;
    } else
    { 
      swal( "Región", "Error Actualizando la Región!", "error", {button: "Aceptar"});
      console.log(res.message);
      abrirCerrarModalEditar();
    }
    }
    else {
      swal( "Región", "Debe Ingresar Todos los Datos, Error Actualizando la Región!", "warning", { button: "Aceptar" });
      console.log(res.message);
      abrirCerrarModalEditar();
    } 
  }

  const borrarRegion = async()=>{
   
    const res = await regionesServices.delete(regionSeleccionado.id_reg);

    if (res.success) {
        swal("Región", "Región Borrada de forma Correcta!", "success", {button: "Aceptar"});
        console.log(res.message)
        abrirCerrarModalEliminar();
    }
    else {
        swal( "Región", "Error Borrando la Región!", "error", { button: "Aceptar" });
        console.log(res.message);
        abrirCerrarModalEliminar(); 
    }
    
  }
 // "string","boolean","numeric","date","datetime","time","currency"
  const columnas = [
    {
      title: 'Id',
      field: 'id_reg',
      type: 'numeric'
    },
    {
      title: 'Región',
      field: 'nombre_reg'
    },
    {
      title: 'Cod País',
      field: 'pais_reg'
    },
    {
      title: 'Nombre País',
      field: 'pais.nombre_pai'
    }
  ]

  const regionInsertar=(
    <div className={styles.modal}>
      <Typography  align="center" className={ styles.typography } variant="button" display="block" >
        Agregar Nueva Región
      </Typography>
      <TextField className={styles.inputMaterial} label="Región" name="nombre_reg" onChange={handleChange} />          
      <br />
      <FormControl className={styles.formControl}>
        <InputLabel id="idselectPais">País</InputLabel>
        <Select
          labelId="selectPaises"
          name="pais_reg"
          id="idselectPais"
          onChange={handleChange}
        >
          <MenuItem value="">  <em>None</em> </MenuItem>
          {
            listarPaises.map((itemselect) => {
              return (
                <MenuItem value={itemselect.id_pai }>{itemselect.nombre_pai}</MenuItem>
              )
            })
          }
        </Select>
      </FormControl>
      <br /><br />
      <div align="right">    
        <Button color="primary" onClick = { () => grabarRegion() } >Insertar</Button>
        <Button onClick={()=> abrirCerrarModalInsertar()} >Cancelar</Button>
      </div>
    </div>
  )

  const regionEditar=(
    <div className={styles.modal}>
      <Typography  align="center" className={ styles.typography } variant="button" display="block" >
        Actualizar Regiones
      </Typography>
      <TextField className={styles.inputMaterial} label="Región" name="nombre_reg" onChange={handleChange} value={regionSeleccionado&&regionSeleccionado.nombre_reg}/>
      <br />
      <FormControl className={styles.formControl}>
        <InputLabel id="idselectPais">País</InputLabel>
        <Select
          labelId="selectPaises"
          name="pais_reg"
          id="idselectPais"
          onChange={handleChange}
          value={regionSeleccionado&&regionSeleccionado.pais_reg}
        >
          <MenuItem value="">  <em>None</em> </MenuItem>
          {
            listarPaises.map((itemselect) => {
              return (
                <MenuItem value={itemselect.id_pai }>{itemselect.nombre_pai}</MenuItem>
              )
            })
          }
        </Select>
      </FormControl>         
      <br /><br />
      <div align="right">
        <Button color="primary"  onClick={()=>actualizarRegion()} >Editar</Button>
        <Button onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  const regionEliminar = (
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar la Región <b>{regionSeleccionado && regionSeleccionado.nombre_reg}</b>? </p>
      <div align="right">
        <Button color="secondary" onClick = {() => borrarRegion() }> Confirmar </Button>
        <Button onClick={()=>abrirCerrarModalEliminar()}> Cancelar </Button>

      </div>

    </div>
  )

  return (
    <div className="App">
    <br />
    <Button variant="contained" startIcon={<SaveIcon />} color="primary" onClick={()=> abrirCerrarModalInsertar() } >Agregar Región</Button>
     <MaterialTable
       columns={columnas}
       data={listRegiones}
       title="MAESTRA DE REGIONES"
       actions={[
         {
           icon     : 'edit',
           tooltip  : 'Editar Región',
           onClick  : (event, rowData) => seleccionarRegiones(rowData, "Editar")
         },
         {
          icon     : 'delete',
          tooltip  : 'Borrar Regiones',
          onClick  : (event, rowData) => seleccionarRegiones(rowData, "Eliminar")
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
      {regionInsertar}
    </Modal>
    <Modal
      open={modalEditar}
      onClose={abrirCerrarModalEditar}
    >
      {regionEditar}
    </Modal>
    <Modal
      open={modalEliminar}
      onClose={abrirCerrarModalEliminar}
    >
      {regionEliminar}
    </Modal>
    </div>
  );
}

export default Regiones;