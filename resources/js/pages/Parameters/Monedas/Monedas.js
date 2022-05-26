import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import {Modal, TextField, Button, Select, MenuItem, FormControl, InputLabel, Typography } from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import SaveIcon from '@material-ui/icons/Save';
import swal from 'sweetalert';

// Componentes de Conexion con el Backend
import monedasServices from "../../../services/Parameters/Monedas";
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
    color   : "#ff3d00"
  }
}));

function Monedas() {
  const styles = useStyles();
  const [listMonedas, setListMonedas] = useState([]);
  const [modalInsertar, setModalInsertar ] = useState(false);
  const [modalEditar, setModalEditar]= useState(false);
  const [modalEliminar, setModalEliminar]= useState(false);
  const [formError, setFormError] = useState(false);
  const [listarEmpresas, setListarEmpresas] = useState([]);
  const [listarEstados, setListarEstados] = useState([]);
  const [monedasSeleccionado, setMonedasSeleccionado] = useState({
    id_mon: "",
    nombre_mon: "",
    empresa_mon: "",
    estado_mon: ""
  })

  useEffect(() => {
    async function fetchDataMonedas() {
      const res = await monedasServices.listMonedas();
      setListMonedas(res.data);
      //console.log(res.data)
    }
    fetchDataMonedas();
  }, [])

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
    const res = await estadosServices.listEstados();
    setListarEstados(res.data) 
    //console.log(res.data);
  }
  fetchDataEstados();
  }, [])

  const handleChange = e => {
    const {name, value} = e.target;

    setMonedasSeleccionado( prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const seleccionarMonedas=(moneda, caso)=>{
    setMonedasSeleccionado(moneda);
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

  const grabarMoneda = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;

    if (!monedasSeleccionado.descripcion_mon) {
      errors.descripcion_mon = true;
      formOk = false;
    }

    if (!monedasSeleccionado.empresa_mon) {
      errors.empresa_mon = true;
      formOk = false;
    }

    if (!monedasSeleccionado.estado_mon) {
      errors.estado_mon = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
      console.log(monedasSeleccionado);
      const res = await monedasServices.save(monedasSeleccionado);

      if (res.success) {
        swal({
          title : "Moneda",
          text  : "Creada de forma Correcta!",
          icon  : "success",
          button: "Aceptar"
        });
        console.log(res.message)
        abrirCerrarModalInsertar();
        delete monedasSeleccionado.descripcion_mon;
        delete monedasSeleccionado.empresa_mon;
        delete monedasSeleccionado.estado_mon;
      } else
      {
        swal({
          title : "Moneda",
          text  : "Error Creando la Moneda!",
          icon  : "error",
          button: "Aceptar"
        });
        console.log(res.message);
        abrirCerrarModalInsertar();
      }
    }
    else {
      swal({
        title : "Moneda",
        text  : "Debe Ingresar Todos los Datos, Error Creando la Moneda!",
        icon  : "error",
        button: "Aceptar"
      });
      console.log(res.message);
      abrirCerrarModalInsertar();
    }
  }

  const actualizarMoneda = async () => {
  
    setFormError({});
    let errors = {};
    let formOk = true;

    if (!monedasSeleccionado.descripcion_mon) {
      errors.descripcion_mon = true;
      formOk = false;
    }

    if (!monedasSeleccionado.empresa_mon) {
      errors.empresa_mon = true;
      formOk = false;
    }

    if (!monedasSeleccionado.estado_mon) {
      errors.estado_mon = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
    
    const res = await monedasServices.update(monedasSeleccionado);

    if (res.success) {
        swal({
          title : "Moneda",
          text  : "Actualizada de forma Correcta!",
          icon  : "success",
          button: "Aceptar"
        });
        console.log(res.message)
        abrirCerrarModalEditar();
        delete monedasSeleccionado.descripcion_mon;
        delete monedasSeleccionado.empresa_mon;
        delete monedasSeleccionado.estado_mon;
    } else
    {
        swal({
          title : "Moneda",
          text  : "Error Actualizando el tipo de Moneda!",
          icon  : "error",
          button: "Aceptar"
        });
        console.log(res.message);
        abrirCerrarModalEditar();
    }
    }
    else {
      swal({
        title : "Moneda",
        text  : "Debe Ingresar Todos los Datos, Error Actualizando el tipo de Moneda!",
        icon  : "warning",
        button: "Aceptar"
      });
      console.log(res.message);
      abrirCerrarModalEditar();
    } 
  }

  const borrarMoneda = async()=>{
   
    const res = await monedasServices.delete(monedasSeleccionado.id_mon);

    if (res.success) {
        swal({
          title : "Moneda",
          text  : "Borrada de forma Correcta!",
          icon  : "error",
          button: "Aceptar"
        });
        console.log(res.message)
        abrirCerrarModalEliminar();
    }
    else {
        swal({
          title : "Moneda",
          text  : "Error Borrando el Tipo de Moneda!",
          icon  : "error",
          button: "Aceptar"
        });
        console.log(res.message);
        abrirCerrarModalEliminar();
    }
    
  }
 // "string","boolean","numeric","date","datetime","time","currency"
  const columnas = [
    {
      title: 'Id',
      field: 'id_mon'
    },
    {
      title: 'Descripcion',
      field: 'descripcion_mon'
    },
    {
      title: 'Código',
      field: 'empresa_mon'
    },
    {
      title: 'Nombre Empresa',
      field: 'nombre_emp'
    },
    {
      title: 'Estado',
      field: 'estado_mon'
    },
    {
      title: 'Nombre Estado',
      field: 'nombre_est'
    }
  ]

  const monedaInsertar=(
    <div className={styles.modal}>
      <Typography  align="center" className={ styles.typography } variant="button" display="block" >
        Agregar Nuevo Tipo de Moneda
      </Typography>
      <TextField className={styles.inputMaterial} label="Descripción" name="descripcion_mon" onChange={handleChange} />          
      <br />
      <FormControl className={styles.formControl}>
        <InputLabel id="idselectEmpresa">Empresa</InputLabel>
        <Select
          labelId="selectEmpresa"
          name="empresa_mon"
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
          name="estado_mon"
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
        <Button color="primary" onClick = { () => grabarMoneda() } >Insertar</Button>
        <Button onClick={()=> abrirCerrarModalInsertar()} >Cancelar</Button>
      </div>
    </div>
  )

  const monedaEditar = (
    <div className={styles.modal}>
      <Typography  align="center" className={ styles.typography } variant="button" display="block" >
        Actualizar Tipo de Moneda
      </Typography>
      <TextField className={styles.inputMaterial} label="Descripción" name="descripcion_mon" onChange={handleChange}
        value={monedasSeleccionado&&monedasSeleccionado.descripcion_mon}/>
      <br />
      <FormControl className={styles.formControl}>
        <InputLabel id="idselectEmpresa">Empresa</InputLabel>
        <Select
          labelId="selectEmpresa"
          name="empresa_mon"
          id="idselectEmpresa"
          onChange={handleChange}
          value={monedasSeleccionado&&monedasSeleccionado.empresa_mon}
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
          name="estado_mon"
          id="idselectEstado"
          onChange={handleChange}
          value={monedasSeleccionado&&monedasSeleccionado.estado_mon}
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
        <Button color="primary"  onClick={()=>actualizarMoneda()} >Editar</Button>
        <Button onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  const monedaEliminar = (
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar el tipo de Moneda <b>{monedasSeleccionado && monedasSeleccionado.descripcion_mon}</b>? </p>
      <div align="right">
        <Button color="secondary" onClick = {() => borrarMoneda() }> Confirmar </Button>
        <Button onClick={()=>abrirCerrarModalEliminar()}> Cancelar </Button>
      </div>
    </div>
  )

  return (
    <div className="App">
    <br />
    <Button variant="contained" startIcon={<SaveIcon />} color="primary" onClick={()=> abrirCerrarModalInsertar() } >Insertar Tipo de Moneda</Button>
     <MaterialTable
       columns={columnas}
       data={listMonedas}
       title="MAESTRA TIPOS DE MONEDA"
       actions={[
         {
           icon     : 'edit',
           tooltip  : 'Editar Tipo de Moneda',
           onClick  : (event, rowData) => seleccionarMonedas(rowData, "Editar")
         },
         {
          icon     : 'delete',
          tooltip  : 'Borrar Tipo de Moneda',
          onClick  : (event, rowData) =>   seleccionarMonedas(rowData, "Eliminar")
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
      {monedaInsertar}
    </Modal>

    <Modal
      open={modalEditar}
      onClose={abrirCerrarModalEditar}
    >
      {monedaEditar}
    </Modal>

    <Modal
      open={modalEliminar}
      onClose={abrirCerrarModalEliminar}
    >
      {monedaEliminar}
    </Modal>
    </div>
  );
}

export default Monedas;