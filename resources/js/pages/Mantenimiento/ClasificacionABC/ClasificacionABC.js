import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import {Modal, TextField, Button, Select, MenuItem, FormControl, InputLabel } from "@material-ui/core";
import { green, blue, blueGrey, red } from '@material-ui/core/colors';
import {makeStyles} from "@material-ui/core/styles";
import SaveIcon from '@material-ui/icons/Save';

// Componentes de Conexion con el Backend
import abcServices from "../../../services/Mantenimiento/ClasificacionABC";
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

function ClasificacionABC() {
  const styles = useStyles();
  const [listABC, setListABC] = useState([]);
  const [modalInsertar, setModalInsertar ] = useState(false);
  const [modalEditar, setModalEditar]= useState(false);
  const [modalEliminar, setModalEliminar]= useState(false);
  const [formError, setFormError] = useState(false);
  const [listarEmpresas, setListarEmpresas] = useState([]);
  const [listarEstados, setListarEstados] = useState([]);
  const [abcSeleccionado, setABCSeleccionado] = useState({
    id_abc: "",
    codigo_abc: "",
    descripcion_abc: "",
    empresa_abc: "",
    estado_abc: ""
  })

  useEffect(() => {
    async function fetchDataABC() {
      const res = await abcServices.listClasificacionabc();
      setListABC(res.data);
    }
    fetchDataABC();
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
    const res = await estadosServices.listEstados();
    setListarEstados(res.data) 
    console.log(res.data);
  }
  fetchDataEstados();
  }, [])

  const handleChange = e => {
    const {name, value} = e.target;

    setABCSeleccionado( prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const seleccionarABC=(abc, caso)=>{
    setABCSeleccionado(abc);
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

  const grabarABC = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;

    if (!abcSeleccionado.codigo_abc) {
      errors.codigo_abc = true;
      formOk = false;
    }

    if (!abcSeleccionado.descripcion_abc) {
      errors.descripcion_abc = true;
      formOk = false;
    }

    if (!abcSeleccionado.empresa_abc) {
      errors.empresa_abc = true;
      formOk = false;
    }

    if (!abcSeleccionado.estado_abc) {
      errors.estado_abc = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
      console.log(abcSeleccionado);
      const res = await abcServices.save(abcSeleccionado);

      if (res.success) {
        alert("Clasificación ABC Creada de forma Correcta")
        console.log(res.message)
        abrirCerrarModalInsertar();
        delete abcSeleccionado.codigo_abc;
        delete abcSeleccionado.nombre_abc;
        delete abcSeleccionado.empresa_abc;
        delete abcSeleccionado.estado_abc;
      } else
      {
        alert("Error Creando Clasificación ABC");
        console.log(res.message);
        abrirCerrarModalInsertar();
      }
    }
    else {
      alert("Debe Ingresar Todos los Datos, Error Creando Clasificación ABC");
      console.log(res.message);
      abrirCerrarModalInsertar();
    }
  }

  const actualizarABC = async () => {
  
    setFormError({});
    let errors = {};
    let formOk = true;

    if (!abcSeleccionado.codigo_abc) {
      errors.codigo_abc = true;
      formOk = false;
    }

    if (!abcSeleccionado.descripcion_abc) {
      errors.descripcion_abc = true;
      formOk = false;
    }

    if (!abcSeleccionado.empresa_abc) {
      errors.empresa_abc = true;
      formOk = false;
    }

    if (!abcSeleccionado.estado_abc) {
      errors.estado_abc = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
    
    const res = await abcServices.update(abcSeleccionado);

    if (res.success) {
        alert("Clasificación ABC actualizada de forma Correcta")
        console.log(res.message)
        abrirCerrarModalEditar();
        delete abcSeleccionado.codigo_abc;
        delete abcSeleccionado.descripcion_abc;
        delete abcSeleccionado.empresa_abc;
        delete abcSeleccionado.estado_abc;
    } else
    {
        alert("Error Actualizando la Marca");
        console.log(res.message);
        abrirCerrarModalEditar();
    }
    }
    else {
      alert("Debe Ingresar Todos los Datos, Error Actualizando Clasificación ABC");
      console.log(res.message);
      abrirCerrarModalEditar();
    } 
  }

  const borrarABC = async()=>{
   
    const res = await abcServices.delete(abcSeleccionado.id_abc);

    if (res.success) {
        alert("Clasificación ABC Borrada de forma Correcta")
        console.log(res.message)
        abrirCerrarModalEliminar();
    }
    else {
        alert("Error Borrando Clasificación ABC");
        console.log(res.message);
        abrirCerrarModalEliminar();
    }
    
  }
 // "string","boolean","numeric","date","datetime","time","currency"
  const columnas = [
    {
      title: 'Id',
      field: 'id_abc'
    },
    {
      title: 'Código',
      field: 'codigo_abc'
    },
    {
      title: 'Descripcion',
      field: 'descripcion_abc'
    },
    {
      title: 'Código',
      field: 'empresa_abc'
    },
    {
      title: 'Nombre Empresa',
      field: 'nombre_emp'
    },
    {
      title: 'Estado',
      field: 'estado_abc'
    },
    {
      title: 'Nombre Estado',
      field: 'nombre_est'
    }
  ]

  const abcInsertar=(
    <div className={styles.modal}>
      <h3>Agregar Clasificación ABC</h3>
      <TextField className={styles.inputMaterial} label="Código" name="codigo_abc" onChange={handleChange} />
      <br />
      <TextField className={styles.inputMaterial} label="Descripción" name="descripcion_abc" onChange={handleChange} />          
      <br />
      <FormControl className={styles.formControl}>
        <InputLabel id="idselectEmpresa">Empresa</InputLabel>
        <Select
          labelId="selectEmpresa"
          name="empresa_abc"
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
          name="estado_abc"
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
        <Button className={styles.button} color="primary" onClick = { () => grabarABC() } >Insertar</Button>
        <Button className={styles.button2} onClick={()=> abrirCerrarModalInsertar()} >Cancelar</Button>
      </div>
    </div>
  )

  const abcEditar = (
    <div className={styles.modal}>
      <h3 align="center" >Actualizar Clasificación ABC</h3>
      <TextField className={styles.inputMaterial} label="Código" name="codigo_abc" onChange={handleChange} value={abcSeleccionado&&abcSeleccionado.codigo_abc}/>
      <br />
      <TextField className={styles.inputMaterial} label="Descripción" name="descripcion_abc" onChange={handleChange} value={abcSeleccionado&&abcSeleccionado.descripcion_abc}/>
      <br />
      <FormControl className={styles.formControl}>
        <InputLabel id="idselectEmpresa">Empresa</InputLabel>
        <Select
          labelId="selectEmpresa"
          name="empresa_abc"
          id="idselectEmpresa"
          onChange={handleChange}
          value={abcSeleccionado&&abcSeleccionado.empresa_abc}
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
          name="estado_abc"
          id="idselectEstado"
          onChange={handleChange}
          value={abcSeleccionado&&abcSeleccionado.estado_abc}
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
        <Button className={styles.button} color="primary"  onClick={()=>actualizarABC()} >Editar</Button>
        <Button className={styles.button2} onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  const abcEliminar = (
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar Clasificación ABC <b>{abcSeleccionado && abcSeleccionado.descripcion_abc}</b>? </p>
      <div align="right">
        <Button className={styles.button} color="secondary" onClick = {() => borrarABC() }> Confirmar </Button>
        <Button className={styles.button2} onClick={()=>abrirCerrarModalEliminar()}> Cancelar </Button>
      </div>
    </div>
  )

  return (
    <div className="App">
     <br />
     <Button variant="contained" startIcon={<SaveIcon />} color="primary" onClick={() => abrirCerrarModalInsertar()} >Agregar Clasificación ABC</Button>
     <MaterialTable
       columns={columnas}
       data={listABC}
       title="Maestra Clasificación ABC"
       actions={[
         {
           icon     : 'edit',
           tooltip  : 'Editar Clasificación ABC',
           onClick  : (event, rowData) => seleccionarABC(rowData, "Editar")
         },
         {
          icon     : 'delete',
          tooltip  : 'Borrar Clasificación ABC',
          onClick  : (event, rowData) =>   seleccionarABC(rowData, "Eliminar")
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
      {abcInsertar}
    </Modal>

    <Modal
      open={modalEditar}
      onClose={abrirCerrarModalEditar}
    >
      {abcEditar}
    </Modal>

    <Modal
      open={modalEliminar}
      onClose={abrirCerrarModalEliminar}
    >
      {abcEliminar}
    </Modal>
    </div>
  );
}

export default ClasificacionABC;