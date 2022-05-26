import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import {Modal, TextField, Button, Select, MenuItem, FormControl, InputLabel,Typography } from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import SaveIcon from '@material-ui/icons/Save';
import swal from 'sweetalert';

// Componentes de Conexion con el Backend
import cencostosServices from "../../../services/Activos/Cencostos";
import areasServices from "../../../services/Activos/Areas";
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

function Cencostos() {
  const styles = useStyles();
  const [listCencostos, setListCencostos] = useState([]);
  const [modalInsertar, setModalInsertar ] = useState(false);
  const [modalEditar, setModalEditar]= useState(false);
  const [modalEliminar, setModalEliminar]= useState(false);
  const [formError, setFormError] = useState(false);
  const [listarEmpresas, setListarEmpresas] = useState([]);
  const [listarEstados, setListarEstados] = useState([]);
  const [listarAreas, setListarAreas] = useState([]);
  const [cencostosSeleccionado, setCencostosSeleccionado] = useState({
    id_cco: "",
    codigo_cco: "",
    descripcion_cco: "",
    area_cco: "",
    empresa_cco: "",
    estado_cco: ""
  })

  useEffect(() => {
    async function fetchDataCencostos() {
      const res = await cencostosServices.listCencostos();
      setListCencostos(res.data);
      //console.log("CENTOS DE COSTOS : ",res.data)
    }
    fetchDataCencostos();
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

  useEffect(() => {
    async function fetchDataAreas() {
      const res = await areasServices.listAreas();
      setListarAreas(res.data);
    }
    fetchDataAreas();
  }, [])

  const handleChange = e => {
    const {name, value} = e.target;

    setCencostosSeleccionado( prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const seleccionarCencostos=(cencosto, caso)=>{
    setCencostosSeleccionado(cencosto);
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

  const grabarCencosto = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;

    if (!cencostosSeleccionado.codigo_cco) {
      errors.codigo_cco = true;
      formOk = false;
    }

    if (!cencostosSeleccionado.descripcion_cco) {
      errors.nombre_cco = true;
      formOk = false;
    }

    if (!cencostosSeleccionado.area_cco) {
      errors.area_cco = true;
      formOk = false;
    }

    if (!cencostosSeleccionado.empresa_cco) {
      errors.empresa_cco = true;
      formOk = false;
    }

    if (!cencostosSeleccionado.estado_cco) {
      errors.estado_cco = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
      console.log(cencostosSeleccionado);
      const res = await cencostosServices.save(cencostosSeleccionado);

      if (res.success) {
        swal({
          title: "Centro de Costo",
          text: "Creado de forma Correcta!",
          icon: "success",
          button: "Aceptar"
        });
        console.log(res.message)
        abrirCerrarModalInsertar();
        delete cencostosSeleccionado.codigo_cco;
        delete cencostosSeleccionado.descripcion_cco;
        delete cencostosSeleccionado.empresa_cco;
        delete cencostosSeleccionado.empresa_cco;
        delete cencostosSeleccionado.estado_cco;
      } else
      {
        swal({
          title : "Centro de Costo",
          text  : "Error Creando el Centro de Costo!",
          icon  : "error",
          button: "Aceptar"
        });
        console.log(res.message);
        abrirCerrarModalInsertar();
      }
    }
    else {
      swal({
        title : "Centro de Costo",
        text  : "Debe ingresar todos los datos, Error creando el Centro de costo!",
        icon  : "warning",
        button: "Aceptar"
      });
      console.log(res.message);
      abrirCerrarModalInsertar();
    }
  }

  const actualizarCencosto = async () => {
  
    setFormError({});
    let errors = {};
    let formOk = true;

    if (!cencostosSeleccionado.codigo_cco) {
      errors.codigo_cco = true;
      formOk = false;
    }

    if (!cencostosSeleccionado.descripcion_cco) {
      errors.nombre_cco = true;
      formOk = false;
    }

    if (!cencostosSeleccionado.area_cco) {
      errors.area_cco = true;
      formOk = false;
    }

    if (!cencostosSeleccionado.empresa_cco) {
      errors.empresa_cco = true;
      formOk = false;
    }

    if (!cencostosSeleccionado.estado_cco) {
      errors.estado_cco = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
    
    const res = await cencostosServices.update(cencostosSeleccionado);

    if (res.success) {
        swal({
          title: "Centro de Costo",
          text: "Actualizado de forma Correcta!",
          icon: "success",
          button: "Aceptar"
        });
        console.log(res.message)
        abrirCerrarModalEditar();
        delete cencostosSeleccionado.codigo_cco;
        delete cencostosSeleccionado.descripcion_cco;
        delete cencostosSeleccionado.empresa_cco;
        delete cencostosSeleccionado.empresa_cco;
        delete cencostosSeleccionado.estado_cco;
    } else
    {     
          swal({
          title : "Centro de Costo",
          text  : "Error Actualizando el Centro de Costo!",
          icon  : "error",
          button: "Aceptar"
        });
        console.log(res.message);
        abrirCerrarModalEditar();
    }
    }
    else {
      swal({
        title : "Centro de Costo",
        text  : "Debe Ingresar Todos los Datos, Error Actualizando el Centro de cost!",
        icon  : "success",
        button: "Aceptar"
      });
      console.log(res.message);
      abrirCerrarModalEditar();
    } 
  }

  const borrarCencosto = async()=>{
   
    const res = await cencostosServices.delete(cencostosSeleccionado.id_cco);

    if (res.success) {
        swal({
          title : "Centro de Costo",
          text  : "Centro de costo Borrado de forma Correctaa!",
          icon  : "success",
          button: "Aceptar"
        });
        console.log(res.message)
        abrirCerrarModalEliminar();
    }
    else {
        swal({
          title : "Centro de Costo",
          text  : "Error Borrando el Centro de costo!",
          icon  : "success",
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
      field: 'id_cco'
    },
    {
      title: 'Código',
      field: 'codigo_cco'
    },
    {
      title: 'Descripcion',
      field: 'descripcion_cco'
    },
    {
      title: 'Area',
      field: 'area_cco'
    },
    {
      title: 'Nombre Area',
      field: 'descripcion_are'
    },
    {
      title: 'Código',
      field: 'empresa_cco'
    },
    {
      title: 'Nombre Empresa',
      field: 'nombre_emp'
    },
    {
      title: 'Estado',
      field: 'estado_cco'
    },
    {
      title: 'Nombre Estado',
      field: 'nombre_est'
    }
  ]

  const cencostoInsertar = (
    <div className={styles.modal}>
      <Typography  align="center" className={ styles.typography } variant="button" display="block" >
        Agregar Nuevo Centro de Cost
      </Typography>
      <TextField className={styles.inputMaterial} label="Código" name="codigo_cco" onChange={handleChange} />
      <br />
      <TextField className={styles.inputMaterial} label="Descripción" name="descripcion_cco" onChange={handleChange} />          
      <br />
      <FormControl className={styles.formControl}>
        <InputLabel id="idselectArea">Area</InputLabel>
        <Select
          labelId="selectArea"
          name="area_cco"
          id="idselectArea"
          onChange={handleChange}
        >
          <MenuItem value="">  <em>None</em> </MenuItem>
          {
            listarAreas.map((itemselect) => {
              return (
                <MenuItem value={itemselect.id_are }>{itemselect.descripcion_are}</MenuItem>
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
          name="empresa_cco"
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
          name="estado_cco"
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
        <Button color="primary" onClick = { () => grabarCencosto() } >Insertar</Button>
        <Button onClick={()=> abrirCerrarModalInsertar()} >Cancelar</Button>
      </div>
    </div>
  )

  const cencostoEditar = (
    <div className={styles.modal}>
      <Typography  align="center" className={ styles.typography } variant="button" display="block" >
        Actualizar Centro de Costo
      </Typography>
      <TextField className={styles.inputMaterial} label="Código" name="codigo_cco" onChange={handleChange} value={cencostosSeleccionado&&cencostosSeleccionado.codigo_cco}/>
      <br />
      <TextField className={styles.inputMaterial} label="Descripción" name="descripcion_cco" onChange={handleChange} value={cencostosSeleccionado&&cencostosSeleccionado.descripcion_cco}/>
      <br />
      <FormControl className={styles.formControl}>
        <InputLabel id="idselectArea">Area</InputLabel>
        <Select
          labelId="selectArea"
          name="area_cco"
          id="idselectArea"
          onChange={handleChange}
          value={cencostosSeleccionado&&cencostosSeleccionado.area_cco}
        >
          <MenuItem value="">  <em>None</em> </MenuItem>
          {
            listarAreas.map((itemselect) => {
              return (
                <MenuItem value={itemselect.id_are }>{itemselect.descripcion_are}</MenuItem>
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
          name="empresa_cco"
          id="idselectEmpresa"
          onChange={handleChange}
          value={cencostosSeleccionado&&cencostosSeleccionado.empresa_cco}
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
          name="estado_cco"
          id="idselectEstado"
          onChange={handleChange}
          value={cencostosSeleccionado&&cencostosSeleccionado.estado_cco}
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
        <Button color="primary"  onClick={()=>actualizarCencosto()} >Editar</Button>
        <Button onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  const cencostoEliminar = (
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar el Centro de Costo <b>{cencostosSeleccionado && cencostosSeleccionado.nombre_cco}</b>? </p>
      <div align="right">
        <Button color="secondary" onClick = {() => borrarCencosto() }> Confirmar </Button>
        <Button onClick={()=>abrirCerrarModalEliminar()}> Cancelar </Button>
      </div>
    </div>
  )

  return (
    <div className="App">
    <br />
    <Button variant="contained" startIcon={<SaveIcon />} color="primary" onClick={() => abrirCerrarModalInsertar()} >Agregar Centro de Costo</Button>
     <MaterialTable
       columns={columnas}
       data={listCencostos}
       title="MAESTRA CENTROS DE COSTO"
       actions={[
         {
           icon     : 'edit',
           tooltip  : 'Editar Centro de Costo',
           onClick  : (event, rowData) => seleccionarCencostos(rowData, "Editar")
         },
         {
          icon     : 'delete',
          tooltip  : 'Borrar Centro de Costo',
          onClick  : (event, rowData) =>   seleccionarCencostos(rowData, "Eliminar")
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
      {cencostoInsertar}
    </Modal>

    <Modal
      open={modalEditar}
      onClose={abrirCerrarModalEditar}
    >
      {cencostoEditar}
    </Modal>

    <Modal
      open={modalEliminar}
      onClose={abrirCerrarModalEliminar}
    >
      {cencostoEliminar}
    </Modal>
    </div>
  );
}

export default Cencostos;