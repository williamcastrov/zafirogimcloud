import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import {Modal, TextField, Button, Select, MenuItem, FormControl, InputLabel, Typography } from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import SaveIcon from '@material-ui/icons/Save';
import swal from 'sweetalert';

// Componentes de Conexion con el Backend
import unidadesServices from "../../../services/Parameters/Unidades";
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

function Unidades() {
  const styles = useStyles();
  const [listUnidades, setListUnidades] = useState([]);
  const [modalInsertar, setModalInsertar ] = useState(false);
  const [modalEditar, setModalEditar]= useState(false);
  const [modalEliminar, setModalEliminar]= useState(false);
  const [formError, setFormError] = useState(false);
  const [listarEmpresas, setListarEmpresas] = useState([]);
  const [listarEstados, setListarEstados] = useState([]);
  const [unidadesSeleccionado, setUnidadesSeleccionado] = useState({
    id_und: "",
    descripcion_und: "",
    tipo_und: "",
    empresa_und: "",
    estado_und: ""
  })

  useEffect(() => {
    async function fetchDataUnidades() {
      const res = await unidadesServices.listUnidades();
      setListUnidades(res.data);
    }
    fetchDataUnidades();
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

    setUnidadesSeleccionado( prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const seleccionarUnidades=(unidad, caso)=>{
    setUnidadesSeleccionado(unidad);
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

  const grabarUnidad = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;

    if (!unidadesSeleccionado.descripcion_und) {
      errors.nombre_und = true;
      formOk = false;
    }

    if (!unidadesSeleccionado.tipo_und) {
      errors.tipo_und = true;
      formOk = false;
    }

    if (!unidadesSeleccionado.empresa_und) {
      errors.empresa_und = true;
      formOk = false;
    }

    if (!unidadesSeleccionado.estado_und) {
      errors.estado_und = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
      console.log(unidadesSeleccionado);
      const res = await unidadesServices.save(unidadesSeleccionado);

      if (res.success) {
        swal({
          title: "Unidad de Medida",
          text: "Creada de forma Correcta!",
          icon: "success",
          button: "Aceptar"
        });
        console.log(res.message)
        abrirCerrarModalInsertar();
        delete unidadesSeleccionado.descripcion_und;
        delete unidadesSeleccionado.tipo_und;
        delete unidadesSeleccionado.empresa_und;
        delete unidadesSeleccionado.estado_und;
      } else
      {
        swal({
          title: "Unidad de Medida",
          text: "Error Creando la Unidad de Medida!",
          icon: "error",
          button: "Aceptar"
        });
        console.log(res.message);
        abrirCerrarModalInsertar();
      }
    }
    else {
      swal({
        title: "Unidad de Medida",
        text: "Debe Ingresar Todos los Datos, Error Creando la Unidad de Medida!",
        icon: "warning",
        button: "Aceptar"
      });
      console.log(res.message);
      abrirCerrarModalInsertar();
    }
  }

  const actualizarUnidad = async () => {
  
    setFormError({});
    let errors = {};
    let formOk = true;

    if (!unidadesSeleccionado.descripcion_und) {
      errors.nombre_und = true;
      formOk = false;
    }

    if (!unidadesSeleccionado.tipo_und) {
      errors.tipo_und = true;
      formOk = false;
    }

    if (!unidadesSeleccionado.empresa_und) {
      errors.empresa_und = true;
      formOk = false;
    }

    if (!unidadesSeleccionado.estado_und) {
      errors.estado_und = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
    
    const res = await unidadesServices.update(unidadesSeleccionado);

    if (res.success) {
        swal({
          title: "Unidad de Medida",
          text: "Actualizada de forma Correcta!",
          icon: "success",
          button: "Aceptar"
        });
        console.log(res.message)
        abrirCerrarModalEditar();
        delete unidadesSeleccionado.descripcion_und;
        delete unidadesSeleccionado.tipo_und;
        delete unidadesSeleccionado.empresa_und;
        delete unidadesSeleccionado.estado_und;
    } else
    {
        swal({
          title: "Unidad de Medida",
          text: "Error Actualizando el tipo la Unidad de Medida!",
          icon: "error",
          button: "Aceptar"
        });
        console.log(res.message);
        abrirCerrarModalEditar();
    }
    }
    else {
      swal({
        title: "Unidad de Medida",
        text: "Debe Ingresar Todos los Datos, Error Actualizando la Uniada de Medida!",
        icon: "warning",
        button: "Aceptar"
      });
      console.log(res.message);
      abrirCerrarModalEditar();
    } 
  }

  const borrarUnidad = async()=>{
   
    const res = await unidadesServices.delete(unidadesSeleccionado.id_und);

    if (res.success) {
        swal({
          title: "Unidad de Medida",
          text: "Borrada de forma Correcta!",
          icon: "success",
          button: "Aceptar"
        });
        console.log(res.message)
        abrirCerrarModalEliminar();
    }
    else {
        swal({
          title: "Unidad de Medida",
          text: "Error Borrando la Unidad de Medida!",
          icon: "success",
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
      field: 'id_und',
      type: 'numeric'
    },
    {
      title: 'Descripcion',
      field: 'descripcion_und'
    },
    {
      title: 'Tipo',
      field: 'tipo_und',
     },
    {
      title: 'Código',
      field: 'empresa_und'
    },
    {
      title: 'Nombre Empresa',
      field: 'nombre_emp'
    },
    {
      title: 'Estado',
      field: 'estado_und'
    },
    {
      title: 'Nombre Estado',
      field: 'nombre_est'
    }
  ]

  const unidadInsertar=(
    <div className={styles.modal}>
      <Typography  align="center" className={ styles.typography } variant="button" display="block" >
        Agregar Nueva Unidad de Control
      </Typography>
      <br />
      <TextField className={styles.inputMaterial} label="Descripción" name="descripcion_und" onChange={handleChange} />          
      <br />
      <TextField className={styles.inputMaterial} label="Tipo" name="tipo_und" onChange={handleChange} />          
      <br />
      <FormControl className={styles.formControl}>
        <InputLabel id="idselectEmpresa">Empresa</InputLabel>
        <Select
          labelId="selectEmpresa"
          name="empresa_und"
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
          name="estado_und"
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
        <Button color="primary" onClick = { () => grabarUnidad() } >Insertar</Button>
        <Button onClick={()=> abrirCerrarModalInsertar()} >Cancelar</Button>
      </div>
    </div>
  )

  const unidadEditar = (
    <div className={styles.modal}>
      <Typography  align="center" className={ styles.typography } variant="button" display="block" >
        Actualizar Unidad de Control
      </Typography>
      <br />
      <TextField className={styles.inputMaterial} label="Descripción" name="descripcion_und" onChange={handleChange} 
            value={unidadesSeleccionado&&unidadesSeleccionado.descripcion_und}/>
      <br />
      <TextField className={styles.inputMaterial} label="Tipo" name="tipo_und" onChange={handleChange} 
            value={unidadesSeleccionado&&unidadesSeleccionado.tipo_und}
      />          
      <br />   
      <FormControl className={styles.formControl}>
        <InputLabel id="idselectEmpresa">Empresa</InputLabel>
        <Select
          labelId="selectEmpresa"
          name="empresa_und"
          id="idselectEmpresa"
          onChange={handleChange}
          value={unidadesSeleccionado&&unidadesSeleccionado.empresa_und}
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
          name="estado_und"
          id="idselectEstado"
          onChange={handleChange}
          value={unidadesSeleccionado&&unidadesSeleccionado.estado_und}
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
        <Button color="primary"  onClick={()=>actualizarUnidad()} >Editar</Button>
        <Button onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  const unidadEliminar = (
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar la Unidad de Control <b>{unidadesSeleccionado && unidadesSeleccionado.descripcion_und}</b>? </p>
      <div align="right">
        <Button color="secondary" onClick = {() => borrarUnidad() }> Confirmar </Button>
        <Button onClick={()=>abrirCerrarModalEliminar()}> Cancelar </Button>
      </div>
    </div>
  )

  return (
    <div className="App">
    <br />
    <Button variant="contained" startIcon={<SaveIcon />} color="primary" onClick={()=> abrirCerrarModalInsertar() } >Agregar Unidad de Medida</Button>
     <MaterialTable
       columns={columnas}
       data={listUnidades}
       title="UNIDADES DE CONTROL"
       actions={[
         {
           icon     : 'edit',
           tooltip  : 'Editar Unidad de Medida',
           onClick  : (event, rowData) => seleccionarUnidades(rowData, "Editar")
         },
         {
          icon     : 'delete',
          tooltip  : 'Borrar Unidad de Medida',
          onClick  : (event, rowData) =>   seleccionarUnidades(rowData, "Eliminar")
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
      {unidadInsertar}
    </Modal>

    <Modal
      open={modalEditar}
      onClose={abrirCerrarModalEditar}
    >
      {unidadEditar}
    </Modal>

    <Modal
      open={modalEliminar}
      onClose={abrirCerrarModalEliminar}
    >
      {unidadEliminar}
    </Modal>
    </div>
  );
}

export default Unidades;