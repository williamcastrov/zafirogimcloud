import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import {Modal, TextField, Button, Select, MenuItem, FormControl, InputLabel, Typography } from "@material-ui/core";
import { green, blue, blueGrey, red } from '@material-ui/core/colors';
import {makeStyles} from "@material-ui/core/styles";
import SaveIcon from '@material-ui/icons/Save';
import swal from 'sweetalert';

// Componentes de Conexion con el Backend
import actividadrealizadaServices from "../../../../services/GestionOrdenes/ActividadRealizada";
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

function ActividadRealizada() {
  const styles = useStyles();
  const [listActividadRealizada, setListActividadRealizada] = useState([]);
  const [modalInsertar, setModalInsertar ] = useState(false);
  const [modalEditar, setModalEditar]= useState(false);
  const [modalEliminar, setModalEliminar]= useState(false);
  const [formError, setFormError] = useState(false);
  const [listarEmpresas, setListarEmpresas] = useState([]);
  const [listarEstados, setListarEstados] = useState([]);
  const [actualiza, setActualiza] = useState(false);
  const [actividadRealizadaSeleccionado, setActividadRealizadaSeleccionado] = useState({
    id_are: "",
    descripcion_are: "",
    empresa_are: "",
    estado_are: ""
  })

  useEffect(() => {
    async function fetchDataActividadRealizada() {
      const res = await actividadrealizadaServices.listActividadrealizada();
      setListActividadRealizada(res.data);
      setActualiza(false);
    }
    fetchDataActividadRealizada();
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

    setActividadRealizadaSeleccionado( prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const seleccionarActividadRealizada=(actividadrealizada, caso)=>{
    setActividadRealizadaSeleccionado(actividadrealizada);
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

  const grabarActividadRealizada = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;

    if (!actividadRealizadaSeleccionado.descripcion_are) {
      errors.descripcion_are = true;
      formOk = false;
    }

    if (!actividadRealizadaSeleccionado.empresa_are) {
      errors.empresa_are = true;
      formOk = false;
    }

    if (!actividadRealizadaSeleccionado.estado_are) {
      errors.estado_are = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
      console.log(actividadRealizadaSeleccionado);
      const res = await actividadrealizadaServices.save(actividadRealizadaSeleccionado);

      if (res.success) {
        swal("ActividadRealizada", "Creada de forma Correcta!", "success", { button: "Aceptar" });
        console.log(res.message)
        abrirCerrarModalInsertar();
        delete actividadRealizadaSeleccionado.descripcion_are;
        delete actividadRealizadaSeleccionado.empresa_are;
        delete actividadRealizadaSeleccionado.estado_are;
      } else
      {
        swal("ActividadRealizada", "Error Creando la ActividadRealizada!", "error", { button: "error" });
        console.log(res.message);
        abrirCerrarModalInsertar();
      }
    }
    else {
      swal("ActividadRealizada", "Debe Ingresar Todos los Datos, Revisar Información!", "warning", { button: "Aceptar" });
      console.log(res.message);
      abrirCerrarModalInsertar();
    }
    setActualiza(true);
  }

  const actualizarActividadRealizada = async () => {
  
    setFormError({});
    let errors = {};
    let formOk = true;

    if (!actividadRealizadaSeleccionado.descripcion_are) {
      errors.descripcion_are = true;
      formOk = false;
    }

    if (!actividadRealizadaSeleccionado.empresa_are) {
      errors.empresa_are = true;
      formOk = false;
    }

    if (!actividadRealizadaSeleccionado.estado_are) {
      errors.estado_are = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
    
    const res = await actividadrealizadaServices.update(actividadRealizadaSeleccionado);

    if (res.success) {
        swal("ActividadRealizada", "Actualizada de forma Correcta!", "success", { button: "Aceptar" });
        console.log(res.message)
        abrirCerrarModalEditar();
        delete actividadRealizadaSeleccionado.descripcion_are;
        delete actividadRealizadaSeleccionado.empresa_are;
        delete actividadRealizadaSeleccionado.estado_are;
    } else
    {
        swal("ActividadRealizada", "Error Actualizando la ActividadRealizada!", "error", { button: "Aceptar" });
        console.log(res.message);
        abrirCerrarModalEditar();
    }
    }
    else {
      swal("ActividadRealizada", "Debe Ingresar Todos los Revisar Información!", "warning", { button: "Aceptar" });
      console.log("DATOS ACTIVIDAD ", actividadRealizadaSeleccionado);
      console.log(res.message);
      abrirCerrarModalEditar();
    } 
    setActualiza(true);
  }

  const borrarActividadRealizada = async()=>{
   
    const res = await actividadrealizadaServices.delete(actividadRealizadaSeleccionado.id_are);

    if (res.success) {
        swal("ActividadRealizada", "Borrada de forma Correcta!", "success", { button: "Aceptar" });
        console.log(res.message)
        abrirCerrarModalEliminar();
    }
    else {
        swal("ActividadRealizada", "Error Borrando la ActividadRealizada!", "error", { button: "Aceptar" });
        console.log(res.message);
        abrirCerrarModalEliminar();
    }
    setActualiza(true);
  }
 // "string","boolean","numeric","date","datetime","time","currency"
  const columnas = [
    {
      title: 'Id',
      field: 'id_are'
    },
    {
      title: 'Descripcion',
      field: 'descripcion_are'
    },
    {
      title: 'Código',
      field: 'empresa_are'
    },
    {
      title: 'Nombre Empresa',
      field: 'nombre_emp'
    },
    {
      title: 'Estado',
      field: 'estado_are'
    },
    {
      title: 'Nombre Estado',
      field: 'nombre_est'
    }
  ]

  const actividadRealizadaInsertar=(
    <div className={styles.modal}>
      <Typography align="center" className={styles.typography} variant="button" display="block">Agregar Actividad Realizada </Typography>
      <TextField className={styles.inputMaterial} label="Descripción" name="descripcion_are" onChange={handleChange} />          
      <br />
      <FormControl className={styles.formControl}>
        <InputLabel id="idselectEmpresa">Empresa</InputLabel>
        <Select
          labelId="selectEmpresa"
          name="empresa_are"
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
          name="estado_are"
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
        <Button className={styles.button} color="primary" onClick = { () => grabarActividadRealizada() } >Insertar</Button>
        <Button className={styles.button2} onClick={()=> abrirCerrarModalInsertar()} >Cancelar</Button>
      </div>
    </div>
  )

  const actividadRealizadaEditar = (
    <div className={styles.modal}>
      <Typography align="center" className={styles.typography} variant="button" display="block">Actualizar Actividad Realizada </Typography>
      <TextField className={styles.inputMaterial} label="Descripción" name="descripcion_are" onChange={handleChange}
       value={actividadRealizadaSeleccionado&&actividadRealizadaSeleccionado.descripcion_are}/>
      <br />
      <FormControl className={styles.formControl}>
        <InputLabel id="idselectEmpresa">Empresa</InputLabel>
        <Select
          labelId="selectEmpresa"
          name="empresa_are"
          id="idselectEmpresa"
          onChange={handleChange}
          value={actividadRealizadaSeleccionado&&actividadRealizadaSeleccionado.empresa_are}
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
          name="estado_are"
          id="idselectEstado"
          onChange={handleChange}
          value={actividadRealizadaSeleccionado&&actividadRealizadaSeleccionado.estado_are}
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
        <Button className={styles.button} color="primary"  onClick={()=>actualizarActividadRealizada()} >Editar</Button>
        <Button className={styles.button2} onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  const actividadRealizadaEliminar = (
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar la ActividadRealizada <b>{actividadRealizadaSeleccionado && actividadRealizadaSeleccionado.descripcion_are}</b>? </p>
      <div align="right">
        <Button className={styles.button} color="secondary" onClick = {() => borrarActividadRealizada() }> Confirmar </Button>
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
       data={listActividadRealizada}
       title="ACTIVIDADES REALIZADAS EN LAS ORDENES"
       actions={[
         {
           icon     : 'edit',
           tooltip  : 'Editar ActividadRealizada',
           onClick  : (event, rowData) => seleccionarActividadRealizada(rowData, "Editar")
         },
         {
          icon     : 'delete',
          tooltip  : 'Borrar ActividadRealizada',
          onClick  : (event, rowData) =>  seleccionarActividadRealizada(rowData, "Eliminar")
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
      {actividadRealizadaInsertar}
    </Modal>

    <Modal
      open={modalEditar}
      onClose={abrirCerrarModalEditar}
    >
      {actividadRealizadaEditar}
    </Modal>

    <Modal
      open={modalEliminar}
      onClose={abrirCerrarModalEliminar}
    >
      {actividadRealizadaEliminar}
    </Modal>
    </div>
  );
}

export default ActividadRealizada;