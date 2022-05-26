import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import {Modal, TextField, Button, Select, MenuItem, FormControl, InputLabel, Typography } from "@material-ui/core";
import { green, blue, blueGrey, red } from '@material-ui/core/colors';
import {makeStyles} from "@material-ui/core/styles";
import SaveIcon from '@material-ui/icons/Save';
import swal from 'sweetalert';

// Componentes de Conexion con el Backend
import tipocostovariableServices from "../../../services/Costos/TipoCostoVariable";
import estadosServices from "../../../services/Parameters/Estados";

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

function TipoCostoVariable() {
  const styles = useStyles();
  const [listTipoCostoVariable, setListTipoCostoVariable] = useState([]);
  const [modalInsertar, setModalInsertar ] = useState(false);
  const [modalEditar, setModalEditar]= useState(false);
  const [modalEliminar, setModalEliminar]= useState(false);
  const [formError, setFormError] = useState(false);
  const [listarEmpresas, setListarEmpresas] = useState([]);
  const [listarEstados, setListarEstados] = useState([]);
  const [actualiza, setActualiza] = useState(false);
  const [tipoCostoVariableSeleccionado, setTipoCostoVariableSeleccionado] = useState({
    id_tcv: "",
    descripcion_tcv: "",
    estado_tcv: ""
  })

  useEffect(() => {
    async function fetchDataTipoCostoVariable() {
      const res = await tipocostovariableServices.listtipocostovariable();
      setListTipoCostoVariable(res.data);
      setActualiza(false);
    }
    fetchDataTipoCostoVariable();
  }, [actualiza])

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

    setTipoCostoVariableSeleccionado( prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const seleccionarTipoCostoVariable = (tipocosto, caso)=>{
    setTipoCostoVariableSeleccionado(tipocosto);
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

  const grabarTipoCostoVariable = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;

    if (!tipoCostoVariableSeleccionado.descripcion_tcv) {
      errors.descripcion_tcv = true;
      formOk = false;
    }

    if (!tipoCostoVariableSeleccionado.estado_tcv) {
      errors.estado_tcv = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
      console.log("TIPO COSTO : ", tipoCostoVariableSeleccionado);
      const res = await tipocostovariableServices.save(tipoCostoVariableSeleccionado);

      if (res.success) {
        swal("Tipo Costo Variable", "Creada de forma Correcta!", "success", { button: "Aceptar" });
        console.log(res.message)
        abrirCerrarModalInsertar();
        delete tipoCostoVariableSeleccionado.descripcion_tcv;
        delete tipoCostoVariableSeleccionado.estado_tcv;
      } else
      {
        swal("Tipo Costo Variable", "Error Creando el Tipo Costo Variable!", "error", { button: "error" });
        console.log(res.message);
        abrirCerrarModalInsertar();
      }
    }
    else {
      swal("Tipo Costo Variable", "Debe Ingresar Todos los Datos, Revisar Información!", "warning", { button: "Aceptar" });
      console.log(res.message);
      abrirCerrarModalInsertar();
    }
    setActualiza(true);
  }

  const actualizarTipoCostoVariable = async () => {
  
    setFormError({});
    let errors = {};
    let formOk = true;

    if (!tipoCostoVariableSeleccionado.descripcion_tcv) {
      errors.descripcion_tcv = true;
      formOk = false;
    }

    if (!tipoCostoVariableSeleccionado.estado_tcv) {
      errors.estado_tcv = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
    
    const res = await tipocostovariableServices.update(tipoCostoVariableSeleccionado);

    if (res.success) {
        swal("Tipo Costo Variable", "Actualizada de forma Correcta!", "success", { button: "Aceptar" });
        console.log(res.message)
        abrirCerrarModalEditar();
        delete tipoCostoVariableSeleccionado.descripcion_tcv;
        delete tipoCostoVariableSeleccionado.empresa_tcv;
        delete tipoCostoVariableSeleccionado.estado_tcv;
    } else
    {
        swal("Tipo Costo Variable", "Error Actualizando el Tipo Costo Variable!", "error", { button: "Aceptar" });
        console.log(res.message);
        abrirCerrarModalEditar();
    }
    }
    else {
      swal("Tipo Costo Variable", "Debe Ingresar Todos los Revisar Información!", "warning", { button: "Aceptar" });
      console.log("DATOS ACTIVIDAD ", tipoCostoVariableSeleccionado);
      console.log(res.message);
      abrirCerrarModalEditar();
    } 
    setActualiza(true);
  }

  const borrarTipoCostoVariable = async()=>{
   
    const res = await tipocostovariableServices.delete(tipoCostoVariableSeleccionado.id_tcv);

    if (res.success) {
        swal("Tipo Costo Variable", "Borrada de forma Correcta!", "success", { button: "Aceptar" });
        console.log(res.message)
        abrirCerrarModalEliminar();
    }
    else {
        swal("Tipo Costo Variable", "Error Borrando el Tipo Costo Variable!", "error", { button: "Aceptar" });
        console.log(res.message);
        abrirCerrarModalEliminar();
    }
    setActualiza(true);
  }
 // "string","boolean","numeric","date","datetime","time","currency"
  const columnas = [
    {
      title: 'Id',
      field: 'id_tcv'
    },
    {
      title: 'Descripcion',
      field: 'descripcion_tcv'
    },
    {
      title: 'Estado',
      field: 'estado_tcv'
    },
    {
      title: 'Nombre Estado',
      field: 'nombre_est'
    }
  ]

  const TipoCostoVariableInsertar=(
    <div className={styles.modal}>
      <Typography align="center" className={styles.typography} variant="button" display="block">Agregar Dato Base Costos </Typography>
      <TextField className={styles.inputMaterial} label="Descripción" name="descripcion_tcv" onChange={handleChange} />          
      <br />
      <FormControl className={styles.formControl}>
        <InputLabel id="idselectEstado">Estado</InputLabel>
        <Select
          labelId="selectEstado"
          name="estado_tcv"
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
        <Button className={styles.button} color="primary" onClick = { () => grabarTipoCostoVariable() } >Insertar</Button>
        <Button className={styles.button2} onClick={()=> abrirCerrarModalInsertar()} >Cancelar</Button>
      </div>
    </div>
  )

  const TipoCostoVariableEditar = (
    <div className={styles.modal}>
      <Typography align="center" className={styles.typography} variant="button" display="block">Actualizar Dato Base Costos </Typography>
      <TextField className={styles.inputMaterial} label="Descripción" name="descripcion_tcv" onChange={handleChange}
       value={tipoCostoVariableSeleccionado&&tipoCostoVariableSeleccionado.descripcion_tcv}/>
      <br />
      <FormControl className={styles.formControl}>
        <InputLabel id="idselectEstado">Estado</InputLabel>
        <Select
          labelId="selectEstado"
          name="estado_tcv"
          id="idselectEstado"
          onChange={handleChange}
          value={tipoCostoVariableSeleccionado&&tipoCostoVariableSeleccionado.estado_tcv}
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
        <Button className={styles.button} color="primary"  onClick={()=>actualizarTipoCostoVariable()} >Editar</Button>
        <Button className={styles.button2} onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  const TipoCostoVariableEliminar = (
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar Dato Base Costo Variable <b>{tipoCostoVariableSeleccionado && tipoCostoVariableSeleccionado.descripcion_tcv}</b>? </p>
      <div align="right">
        <Button className={styles.button} color="secondary" onClick = {() => borrarTipoCostoVariable() }> Confirmar </Button>
        <Button className={styles.button2} onClick={()=>abrirCerrarModalEliminar()}> Cancelar </Button>
      </div>
    </div>
  )

  return (
    <div className="App">
     <br />
     <Button variant="contained" startIcon={<SaveIcon />} color="primary" onClick={() => abrirCerrarModalInsertar()} >Agregar Dato Base Costo</Button>
     <MaterialTable
       columns={columnas}
       data={listTipoCostoVariable  }
       title="DATOS BASE CALCULO COSTO REAL"
       actions={[
         {
           icon     : 'edit',
           tooltip  : 'Editar Tipo Falla',
           onClick  : (event, rowData) => seleccionarTipoCostoVariable(rowData, "Editar")
         },
         {
          icon     : 'delete',
          tooltip  : 'Borrar Tipo Falla',
          onClick  : (event, rowData) =>  seleccionarTipoCostoVariable(rowData, "Eliminar")
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
      {TipoCostoVariableInsertar}
    </Modal>

    <Modal
      open={modalEditar}
      onClose={abrirCerrarModalEditar}
    >
      {TipoCostoVariableEditar}
    </Modal>

    <Modal
      open={modalEliminar}
      onClose={abrirCerrarModalEliminar}
    >
      {TipoCostoVariableEliminar}
    </Modal>
    </div>
  );
}

export default TipoCostoVariable;