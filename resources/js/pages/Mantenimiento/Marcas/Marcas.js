import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import {Modal, TextField, Button, Select, MenuItem, FormControl, InputLabel, Typography } from "@material-ui/core";
import { green, blue, blueGrey, red } from '@material-ui/core/colors';
import {makeStyles} from "@material-ui/core/styles";
import SaveIcon from '@material-ui/icons/Save';
import swal from 'sweetalert';

// Componentes de Conexion con el Backend
import marcasServices from "../../../services/Mantenimiento/Marcas";
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

function Marcas() {
  const styles = useStyles();
  const [listMarcas, setListMarcas] = useState([]);
  const [modalInsertar, setModalInsertar ] = useState(false);
  const [modalEditar, setModalEditar]= useState(false);
  const [modalEliminar, setModalEliminar]= useState(false);
  const [formError, setFormError] = useState(false);
  const [listarEmpresas, setListarEmpresas] = useState([]);
  const [listarEstados, setListarEstados] = useState([]);
  const [actualiza, setActualiza] = useState(false);
  const [marcasSeleccionado, setMarcasSeleccionado] = useState({
    id_mar: "",
    descripcion_mar: "",
    empresa_mar: "",
    estado_mar: ""
  })

  useEffect(() => {
    async function fetchDataMarcas() {
      const res = await marcasServices.listMarcas();
      setListMarcas(res.data);
      setActualiza(false);
    }
    fetchDataMarcas();
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

    setMarcasSeleccionado( prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const seleccionarMarcas=(marca, caso)=>{
    setMarcasSeleccionado(marca);
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

  const grabarMarca = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;

    if (!marcasSeleccionado.descripcion_mar) {
      errors.descripcion_mar = true;
      formOk = false;
    }

    if (!marcasSeleccionado.empresa_mar) {
      errors.empresa_mar = true;
      formOk = false;
    }

    if (!marcasSeleccionado.estado_mar) {
      errors.estado_mar = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
      console.log(marcasSeleccionado);
      const res = await marcasServices.save(marcasSeleccionado);

      if (res.success) {
        swal("Marca", "Creada de forma Correcta!", "success", { button: "Aceptar" });
        console.log(res.message)
        abrirCerrarModalInsertar();
        delete marcasSeleccionado.descripcion_mar;
        delete marcasSeleccionado.empresa_mar;
        delete marcasSeleccionado.estado_mar;
      } else
      {
        swal("Marca", "Error Creando la Marca!", "error", { button: "error" });
        console.log(res.message);
        abrirCerrarModalInsertar();
      }
    }
    else {
      swal("Marca", "Debe Ingresar Todos los Datos, Revisar Información!", "warning", { button: "Aceptar" });
      console.log(res.message);
      abrirCerrarModalInsertar();
    }
    setActualiza(true);
  }

  const actualizarMarca = async () => {
  
    setFormError({});
    let errors = {};
    let formOk = true;

    if (!marcasSeleccionado.descripcion_mar) {
      errors.descripcion_mar = true;
      formOk = false;
      alert("1")
    }

    if (!marcasSeleccionado.empresa_mar) {
      errors.empresa_mar = true;
      formOk = false;
      alert("2")
    }

    if (!marcasSeleccionado.estado_mar) {
      errors.estado_mar = true;
      formOk = false;
      alert("3")
    }

    setFormError(errors);

    if (formOk) {
    
    const res = await marcasServices.update(marcasSeleccionado);

    if (res.success) {
        swal("Marca", "Actualizada de forma Correcta!", "success", { button: "Aceptar" });
        console.log(res.message)
        abrirCerrarModalEditar();
        delete marcasSeleccionado.nombre_mar;
        delete marcasSeleccionado.empresa_mar;
        delete marcasSeleccionado.estado_mar;
    } else
    {
        swal("Marca", "Error Actualizando la Marca!", "error", { button: "Aceptar" });
        console.log(res.message);
        abrirCerrarModalEditar();
    }
    }
    else {
      swal("Marca", "Debe Ingresar Todos los Revisar Información!", "warning", { button: "Aceptar" });
      console.log(res.message);
      abrirCerrarModalEditar();
    }
    setActualiza(true);
  }

  const borrarMarca = async()=>{
   
    const res = await marcasServices.delete(marcasSeleccionado.id_mar);

    if (res.success) {
        swal("Marca", "Borrada de forma Correcta!", "success", { button: "Aceptar" });
        console.log(res.message)
        abrirCerrarModalEliminar();
    }
    else {
        swal("Marca", "Error Borrando la Marca!", "error", { button: "Aceptar" });
        console.log(res.message);
        abrirCerrarModalEliminar();
    }
    setActualiza(true);
  }
 // "string","boolean","numeric","date","datetime","time","currency"
  const columnas = [
    {
      title: 'Id',
      field: 'id_mar'
    },
    {
      title: 'Descripcion',
      field: 'descripcion_mar'
    },
    {
      title: 'Código',
      field: 'empresa_mar'
    },
    {
      title: 'Nombre Empresa',
      field: 'nombre_emp'
    },
    {
      title: 'Estado',
      field: 'estado_mar'
    },
    {
      title: 'Nombre Estado',
      field: 'nombre_est'
    }
  ]

  const marcaInsertar=(
    <div className={styles.modal}>
      <Typography align="center" className={styles.typography} variant="button" display="block">Agregar Marca de Equipo </Typography>
      <TextField className={styles.inputMaterial} label="Descripción" name="descripcion_mar" onChange={handleChange} />          
      <br />
      <FormControl className={styles.formControl}>
        <InputLabel id="idselectEmpresa">Empresa</InputLabel>
        <Select
          labelId="selectEmpresa"
          name="empresa_mar"
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
          name="estado_mar"
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
        <Button className={styles.button} color="primary" onClick = { () => grabarMarca() } >Insertar</Button>
        <Button className={styles.button2} onClick={()=> abrirCerrarModalInsertar()} >Cancelar</Button>
      </div>
    </div>
  )

  const marcaEditar = (
    <div className={styles.modal}>
      <Typography align="center" className={styles.typography} variant="button" display="block">Actualizar Marca de Equipo </Typography>
      <TextField className={styles.inputMaterial} label="Descripción" name="descripcion_mar" onChange={handleChange} value={marcasSeleccionado&&marcasSeleccionado.descripcion_mar}/>
      <br />
      <FormControl className={styles.formControl}>
        <InputLabel id="idselectEmpresa">Empresa</InputLabel>
        <Select
          labelId="selectEmpresa"
          name="empresa_mar"
          id="idselectEmpresa"
          onChange={handleChange}
          value={marcasSeleccionado&&marcasSeleccionado.empresa_mar}
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
          name="estado_mar"
          id="idselectEstado"
          onChange={handleChange}
          value={marcasSeleccionado&&marcasSeleccionado.estado_mar}
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
        <Button className={styles.button} color="primary"  onClick={()=>actualizarMarca()} >Editar</Button>
        <Button className={styles.button2} onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  const marcaEliminar = (
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar la Marca <b>{marcasSeleccionado && marcasSeleccionado.descripcion_mar}</b>? </p>
      <div align="right">
        <Button className={styles.button} color="secondary" onClick = {() => borrarMarca() }> Confirmar </Button>
        <Button className={styles.button2} onClick={()=>abrirCerrarModalEliminar()}> Cancelar </Button>
      </div>
    </div>
  )

  return (
    <div className="App">
     <br />
     <Button variant="contained" startIcon={<SaveIcon />} color="primary" onClick={() => abrirCerrarModalInsertar()} >Agregar Marca del Equipo</Button>
     <MaterialTable
       columns={columnas}
       data={listMarcas}
       title="MARCAS DE EQUIPOS"
       actions={[
         {
           icon     : 'edit',
           tooltip  : 'Editar Marca',
           onClick  : (event, rowData) => seleccionarMarcas(rowData, "Editar")
         },
         {
          icon     : 'delete',
          tooltip  : 'Borrar Marca',
          onClick  : (event, rowData) =>   seleccionarMarcas(rowData, "Eliminar")
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
      {marcaInsertar}
    </Modal>

    <Modal
      open={modalEditar}
      onClose={abrirCerrarModalEditar}
    >
      {marcaEditar}
    </Modal>

    <Modal
      open={modalEliminar}
      onClose={abrirCerrarModalEliminar}
    >
      {marcaEliminar}
    </Modal>
    </div>
  );
}

export default Marcas;