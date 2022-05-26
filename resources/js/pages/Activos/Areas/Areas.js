import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import {Modal, TextField, Button, Select, MenuItem, FormControl, InputLabel, Typography } from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import SaveIcon from '@material-ui/icons/Save';
import swal from 'sweetalert';


// Componentes de Conexion con el Backend
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

function Areas() {
  const styles = useStyles();
  const [listAreas, setListAreas] = useState([]);
  const [modalInsertar, setModalInsertar ] = useState(false);
  const [modalEditar, setModalEditar]= useState(false);
  const [modalEliminar, setModalEliminar]= useState(false);
  const [formError, setFormError] = useState(false);
  const [listarEmpresas, setListarEmpresas] = useState([]);
  const [listarEstados, setListarEstados] = useState([]);
  const [areasSeleccionado, setAreasSeleccionado] = useState({
    id_are: "",
    codigo_are: "",
    nombre_are: "",
    empresa_are: "",
    estado_are: ""
  })

  useEffect(() => {
    async function fetchDataAreas() {
      const res = await areasServices.listAreas();
      setListAreas(res.data);
    }
    fetchDataAreas();
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

    setAreasSeleccionado( prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const seleccionarAreas=(area, caso)=>{
    setAreasSeleccionado(area);
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

  const grabarArea = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;

    if (!areasSeleccionado.codigo_are) {
      errors.codigo_are = true;
      formOk = false;
    }

    if (!areasSeleccionado.descripcion_are) {
      errors.nombre_are = true;
      formOk = false;
    }

    if (!areasSeleccionado.empresa_are) {
      errors.empresa_are = true;
      formOk = false;
    }

    if (!areasSeleccionado.estado_are) {
      errors.estado_are = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
      console.log(areasSeleccionado);
      const res = await areasServices.save(areasSeleccionado);

      if (res.success) {
        swal({
          title: "Gestión Areas",
          text: "Area Creada de forma Correcta!",
          icon: "success",
          button: "Aceptar"
        });
        console.log(res.message)
        abrirCerrarModalInsertar();
        delete areasSeleccionado.codigo_are;
        delete areasSeleccionado.descripcion_are;
        delete areasSeleccionado.empresa_are;
        delete areasSeleccionado.estado_are;
      } else
      {
        swal({
          title : "Gestión Areas",
          text  : "Error Creando el Area!",
          icon  : "error",
          button: "Aceptar"
        });
        console.log(res.message);
        abrirCerrarModalInsertar();
      }
    }
    else {
      swal({
        title : "Gestión Areas",
        text  : "Debe ingresar todos los datos, Error creando el Area!",
        icon  : "warning",
        button: "Aceptar"
      });
      console.log(res.message);
      abrirCerrarModalInsertar();
    }
  }

  const actualizarArea = async () => {
  
    setFormError({});
    let errors = {};
    let formOk = true;

    if (!areasSeleccionado.codigo_are) {
      errors.codigo_are = true;
      formOk = false;
    }

    if (!areasSeleccionado.descripcion_are) {
      errors.nombre_are = true;
      formOk = false;
    }

    if (!areasSeleccionado.empresa_are) {
      errors.empresa_are = true;
      formOk = false;
    }

    if (!areasSeleccionado.estado_are) {
      errors.estado_are = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
    
    const res = await areasServices.update(areasSeleccionado);

    if (res.success) {
        swal({
          title: "Gestión Areas",
          text: "Actualizada de forma Correcta!",
          icon: "success",
          button: "Aceptar"
        });
        console.log(res.message)
        abrirCerrarModalEditar();
        delete areasSeleccionado.codigo_are;
        delete areasSeleccionado.descripcion_are;
        delete areasSeleccionado.empresa_are;
        delete areasSeleccionado.estado_are;
    } else
    {
        swal({
          title : "Gestión Areas",
          text  : "Error Actualizando el Area!",
          icon  : "error",
          button: "Aceptar"
        });
        console.log(res.message);
        abrirCerrarModalEditar();
    }
    }
    else {
      swal({
        title : "Gestión Areas",
        text  : "Debe Ingresar Todos los Datos, Error Actualizando el Area!",
        icon  : "warning",
        button: "Aceptar"
      });
      console.log(res.message);
      abrirCerrarModalEditar();
    } 
  }

  const borrarArea = async()=>{
   
    const res = await areasServices.delete(areasSeleccionado.id_are);

    if (res.success) {
        swal({
          title : "Gestión Areas",
          text  : "Borrada de forma Correcta!",
          icon  : "success",
          button: "Aceptar"
        });

        console.log(res.message)
        abrirCerrarModalEliminar();
    }
    else {
          swal({
          title : "Gestión Areas",
          text  : "Error brorrando el Area!",
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
      field: 'id_are',
      type: 'numeric'
    },
    {
      title: 'Código',
      field: 'codigo_are'
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

  const areaInsertar = (
    <div className={styles.modal}>
      <Typography  align="center" className={ styles.typography } variant="button" display="block" >
        Agregar Nuevo Area
      </Typography>
      <TextField className={styles.inputMaterial} label="Código" name="codigo_are" onChange={handleChange} />
      <br />
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
        <Button color="primary" onClick = { () => grabarArea() } >Insertar</Button>
        <Button onClick={()=> abrirCerrarModalInsertar()} >Cancelar</Button>
      </div>
    </div>
  )

  const areaEditar = (
    <div className={styles.modal}>
      <Typography  align="center" className={ styles.typography } variant="button" display="block" >
        Actualizar Area
      </Typography>
      <TextField className={styles.inputMaterial} label="Código" name="codigo_are" onChange={handleChange} value={areasSeleccionado&&areasSeleccionado.codigo_are}/>
      <br />
      <TextField className={styles.inputMaterial} label="Descripción" name="descripcion_are" onChange={handleChange} value={areasSeleccionado&&areasSeleccionado.descripcion_are}/>
      <br />
      <FormControl className={styles.formControl}>
        <InputLabel id="idselectEmpresa">Empresa</InputLabel>
        <Select
          labelId="selectEmpresa"
          name="empresa_are"
          id="idselectEmpresa"
          onChange={handleChange}
          value={areasSeleccionado&&areasSeleccionado.empresa_are}
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
          value={areasSeleccionado&&areasSeleccionado.estado_are}
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
        <Button color="primary"  onClick={()=>actualizarArea()} >Editar</Button>
        <Button onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  const areaEliminar = (
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar el Area <b>{areasSeleccionado && areasSeleccionado.nombre_are}</b>? </p>
      <div align="right">
        <Button color="secondary" onClick = {() => borrarArea() }> Confirmar </Button>
        <Button onClick={()=>abrirCerrarModalEliminar()}> Cancelar </Button>
      </div>
    </div>
  )

  return (
    <div className="App">
    <br />
    <Button variant="contained" startIcon={<SaveIcon />} color="primary" onClick={() => abrirCerrarModalInsertar()} >Agregar Area</Button>
      <MaterialTable
       columns={columnas}
       data={listAreas}
       title="MAESTRA DE AREAS"
       actions={[
         {
           icon     : 'edit',
           tooltip  : 'Editar Area',
           onClick  : (event, rowData) => seleccionarAreas(rowData, "Editar")
         },
         {
          icon     : 'delete',
          tooltip  : 'Borrar Area',
          onClick  : (event, rowData) =>   seleccionarAreas(rowData, "Eliminar")
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
      {areaInsertar}
    </Modal>

    <Modal
      open={modalEditar}
      onClose={abrirCerrarModalEditar}
    >
      {areaEditar}
    </Modal>

    <Modal
      open={modalEliminar}
      onClose={abrirCerrarModalEliminar}
    >
      {areaEliminar}
    </Modal>
    </div>
  );
}

export default Areas;