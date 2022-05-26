import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import {Modal, TextField, Button, Select, MenuItem, FormControl, InputLabel, Typography } from "@material-ui/core";
import { green, blue, blueGrey, red } from '@material-ui/core/colors';
import {makeStyles} from "@material-ui/core/styles";
import SaveIcon from '@material-ui/icons/Save';
import swal from 'sweetalert';

// Componentes de Conexion con el Backend
import proveedorServices from "../../../services/Interlocutores/Proveedores";
import equiposServices from "../../../services/Mantenimiento/Equipos";
import estadosServices from "../../../services/Parameters/Estados";
import usuariosServices from "../../../services/Usuarios";
import usuariosEquiposServices from "../../../services/Mantenimiento/UsuariosEquipos";

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

function UsuariosEquipos() {
  const styles = useStyles();
  const [lisUsuariosEquipos, setLisUsuariosEquipos] = useState([]);
  const [modalInsertar, setModalInsertar ] = useState(false);
  const [modalEditar, setModalEditar]= useState(false);
  const [modalEliminar, setModalEliminar]= useState(false);
  const [formError, setFormError] = useState(false);
  const [listarUsuarios, setListarUsuarios] = useState([]);
  const [listarEquipos, setListarEquipos] = useState([]);
  const [listarEstados, setListarEstados] = useState([]);
  const [listarProveedores, setListarProveedores] = useState([]);
  const [actualiza, setActualiza] = useState(false);
  const [usuariosEquiposSeleccionado, setUsuariosEquiposSeleccionado] = useState({
    id_eus: 0,
    usuario_eus: 0,
    equipo_eus: 0,
    proveedor_eus: 0,
    estado_eus: 0
  })

  useEffect(() => {
    async function fetchDataUsuariosEquipos() {
      const res = await usuariosEquiposServices.listar_usuariosporequipo();
      setLisUsuariosEquipos(res.data);
      setActualiza(false);
    }
    fetchDataUsuariosEquipos();
  }, [actualiza])

  useEffect (() => {
    async function fetchDataEstados() {
    const res = await estadosServices.listEstadosGenerales();
    setListarEstados(res.data) 
    console.log(res.data);
  }
  fetchDataEstados();
  }, [])

  useEffect (() => {
    async function fetchDataUsuarios() {
    const res = await usuariosServices.listar_usuariosservicios();
    //console.log("USUARIOS SERVICIOS : ", res.data);
    setListarUsuarios(res.data) 
  }
  fetchDataUsuarios();
  }, [])

  useEffect (() => {
    async function fetchDataProveedores() {
    const res = await proveedorServices.listProveedoresServMtto();
    setListarProveedores(res.data) 
    console.log(res.data);
  }
  fetchDataProveedores();
  }, [])

  useEffect (() => {
    async function fetchDataEquipos() {
    const res = await equiposServices.listEquiposMontacargas();
    setListarEquipos (res.data) 
    console.log(res.data);
  }
  fetchDataEquipos();
  }, [])

  const handleChange = e => {
    const {name, value} = e.target;

    setUsuariosEquiposSeleccionado( prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const seleccionarUsuariosEquipos=(usuario, caso)=>{
    //console.log("USUARIO : ", usuario)
    setUsuariosEquiposSeleccionado(usuario);
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

  const grabarUsuariosEquipos = async () => {
    setFormError({});
    let errors = {};
    let formOk = true;

    if (!usuariosEquiposSeleccionado.usuario_eus) {
      errors.usuario_eus = true;
      formOk = false;
    }

    if (!usuariosEquiposSeleccionado.equipo_eus) {
      errors.equipo_eus = true;
      formOk = false;
    }

    if (!usuariosEquiposSeleccionado.proveedor_eus) {
      errors.proveedor_eus = true;
      formOk = false;
    }

    if (!usuariosEquiposSeleccionado.estado_eus) {
      errors.estado_eus = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
      console.log(usuariosEquiposSeleccionado);
      const res = await usuariosEquiposServices.save(usuariosEquiposSeleccionado);

      if (res.success) {
        swal("Registro Equipo a Usuario", "Creada de forma Correcta!", "success", { button: "Aceptar" });
        console.log(res.message)
        abrirCerrarModalInsertar();
        delete usuariosEquiposSeleccionado.usuario_eus;
        delete usuariosEquiposSeleccionado.equipo_eus;
        delete usuariosEquiposSeleccionado.proveedor_eus;
        delete usuariosEquiposSeleccionado.estado_eus;
      } else
      {
        swal("Registro Equipo a Usuario", "Error Creando Registro Equipo a Usuario!", "error", { button: "error" });
        console.log(res.message);
        abrirCerrarModalInsertar();
      }
    }
    else {
      swal("Registro Equipo a Usuario", "Debe Ingresar Todos los Datos, Revisar Información!", "warning", { button: "Aceptar" });
      console.log(res.message);
      abrirCerrarModalInsertar();
    }
    setActualiza(true);
  }

  const actualizarUsuariosEquipos = async () => {
  
    setFormError({});
    let errors = {};
    let formOk = true;

    if (!usuariosEquiposSeleccionado.usuario_eus) {
      errors.usuario_eus = true;
      formOk = false;
    }

    if (!usuariosEquiposSeleccionado.equipo_eus) {
      errors.equipo_eus = true;
      formOk = false;
    }

    if (!usuariosEquiposSeleccionado.proveedor_eus) {
      errors.proveedor_eus = true;
      formOk = false;
    }

    if (!usuariosEquiposSeleccionado.estado_eus) {
      errors.estado_eus = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
    
    const res = await usuariosEquiposServices.update(usuariosEquiposSeleccionado);

    if (res.success) {
        swal("Registro Equipo a Usuario", "Actualizada de forma Correcta!", "success", { button: "Aceptar" });
        console.log(res.message)
        abrirCerrarModalEditar();
        delete usuariosEquiposSeleccionado.usuario_eus;
        delete usuariosEquiposSeleccionado.equipo_eus;
        delete usuariosEquiposSeleccionado.proveedor_eus;
        delete usuariosEquiposSeleccionado.estado_eus;
    } else
    {
        swal("Registro Equipo a Usuario", "Error Actualizando Registro Equipo a Usuario!", "error", { button: "Aceptar" });
        console.log(res.message);
        abrirCerrarModalEditar();
    }
    }
    else {
      swal("Registro Equipo a Usuario", "Debe Ingresar Todos los Revisar Información!", "warning", { button: "Aceptar" });
      //console.log("DATOS ACTIVIDAD ", usuariosEquiposSeleccionado);
      console.log(res.message);
      abrirCerrarModalEditar();
    } 
    setActualiza(true);
  }

  const borrarRegistroEquipoUsuario = async()=>{
   
    const res = await usuariosEquiposServices.delete(usuariosEquiposSeleccionado.id_eus);

    if (res.success) {
        swal("Registro Equipo a Usuario", "Borrada de forma Correcta!", "success", { button: "Aceptar" });
        console.log(res.message)
        abrirCerrarModalEliminar();
    }
    else {
        swal("Registro Equipo a Usuario", "Error Borrando Registro Equipo a Usuario!", "error", { button: "Aceptar" });
        console.log(res.message);
        abrirCerrarModalEliminar();
    }
    setActualiza(true);
  }
 // "string","boolean","numeric","date","datetime","time","currency"
  const columnas = [
    {
      title: 'Usuario',
      field: 'nombre_usu'
    },
    {
      title: 'Equipo',
      field: 'codigo_equ'
    },
    {
      title: 'Proveedor',
      field: 'razonsocial_int'
    },
    {
      title: 'Estado',
      field: 'nombre_est'
    }
  ]

  const RegistroEquipoUsuarioInsertar=(
    <div className={styles.modal}>
      <Typography align="center" className={styles.typography} variant="button" display="block">Agregar Registro Equipo a Usuario </Typography>
      <FormControl className={styles.formControl}>
        <InputLabel id="idselectusuario">Seleccionar Usuario</InputLabel>
        <Select
          labelId="selectUsuario"
          name="usuario_eus"
          id="idselectusuario_eus"
          onChange={handleChange}
        >
          <MenuItem value="">  <em>None</em> </MenuItem>
          {
            listarUsuarios && listarUsuarios.map((itemselect) => {
              return (
                <MenuItem value={itemselect.id_usu }>{itemselect.nombre_usu}</MenuItem>
              )
            })
          }
        </Select>
      </FormControl>
      <br />
      <FormControl className={styles.formControl}>
        <InputLabel id="idselectEquipos">Seleccionar Equipo</InputLabel>
        <Select
          labelId="selectEquipo"
          name="equipo_eus"
          id="idselectequipo_eus"
          onChange={handleChange}
        >
          <MenuItem value="">  <em>None</em> </MenuItem>
          {
            listarEquipos && listarEquipos.map((itemselect) => {
              return (
                <MenuItem value={itemselect.id_equ }>{itemselect.codigo_equ}</MenuItem>
              )
            })
          }
        </Select>
      </FormControl>          
      <br />
      <FormControl className={styles.formControl}>
        <InputLabel id="idselectProveedor">Proveedor Servicio</InputLabel>
        <Select
          labelId="selectProveedor"
          name="proveedor_eus"
          id="idselectProveedor"
          onChange={handleChange}
        >
          <MenuItem value="">  <em>None</em> </MenuItem>
          {
            listarProveedores && listarProveedores.map((itemselect) => {
              return (
                <MenuItem value={itemselect.id_int }>{itemselect.razonsocial_int}</MenuItem>
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
          name="estado_eus"
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
        <Button className={styles.button} color="primary" onClick = { () => grabarUsuariosEquipos() } >Insertar</Button>
        <Button className={styles.button2} onClick={()=> abrirCerrarModalInsertar()} >Cancelar</Button>
      </div>
    </div>
  )

  //   value={usuariosEquiposSeleccionado&&usuariosEquiposSeleccionado.equipo_eus}/>

  const RegistroEquipoUsuarioEditar = (
    <div className={styles.modal}>
      <Typography align="center" className={styles.typography} variant="button" display="block">Actualizar Usuario por Equipo</Typography>
      <FormControl className={styles.formControl}>
        <InputLabel id="idselectusuario">Seleccionar Usuario</InputLabel>
        <Select
          labelId="selectUsuario"
          name="usuario_eus"
          id="idselectusuario_eus"
          onChange={handleChange}
          value={usuariosEquiposSeleccionado && usuariosEquiposSeleccionado.usuario_eus}
        >
          <MenuItem value="">  <em>None</em> </MenuItem>
          {
            listarUsuarios && listarUsuarios.map((itemselect) => {
              return (
                <MenuItem value={itemselect.id_usu }>{itemselect.nombre_usu}</MenuItem>
              )
            })
          }
        </Select>
      </FormControl>
      <br />
      <FormControl className={styles.formControl}>
        <InputLabel id="idselectEquipos">Seleccionar Equipo</InputLabel>
        <Select
          labelId="selectEquipo"
          name="equipo_eus"
          id="idselectequipo_eus"
          onChange={handleChange}
          value={usuariosEquiposSeleccionado && usuariosEquiposSeleccionado.equipo_eus}
        >
          <MenuItem value="">  <em>None</em> </MenuItem>
          {
            listarEquipos && listarEquipos.map((itemselect) => {
              return (
                <MenuItem value={itemselect.id_equ }>{itemselect.codigo_equ}</MenuItem>
              )
            })
          }
        </Select>
      </FormControl>          
      <br />
      <FormControl className={styles.formControl}>
        <InputLabel id="idselectProveedor">Proveedor Servicio</InputLabel>
        <Select
          labelId="selectProveedor"
          name="proveedor_eus"
          id="idselectProveedor"
          onChange={handleChange}
          value={usuariosEquiposSeleccionado && usuariosEquiposSeleccionado.proveedor_eus}
        >
          <MenuItem value="">  <em>None</em> </MenuItem>
          {
            listarProveedores && listarProveedores.map((itemselect) => {
              return (
                <MenuItem value={itemselect.id_int }>{itemselect.razonsocial_int}</MenuItem>
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
          name="estado_eus"
          id="idselectEstado"
          onChange={handleChange}
          value={usuariosEquiposSeleccionado && usuariosEquiposSeleccionado.estado_eus}
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
      <br />
      <div align="right">
        <Button className={styles.button} color="primary"  onClick={()=>actualizarUsuariosEquipos()} >Editar</Button>
        <Button className={styles.button2} onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  const RegistroEquipoUsuarioEliminar = (
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar la Registro Equipo a Usuario<b>{usuariosEquiposSeleccionado && usuariosEquiposSeleccionado.equipo_eus}</b>? </p>
      <div align="right">
        <Button className={styles.button} color="secondary" onClick = {() => borrarRegistroEquipoUsuario() }> Confirmar </Button>
        <Button className={styles.button2} onClick={()=>abrirCerrarModalEliminar()}> Cancelar </Button>
      </div>
    </div>
  )

  return (
    <div className="App">
     <br />
     <Button variant="contained" startIcon={<SaveIcon />} color="primary" onClick={() => abrirCerrarModalInsertar()} >Agregar Equipo a Proveedor</Button>
     <MaterialTable
       columns={columnas}
       data={lisUsuariosEquipos}
       title="EQUIPOS PROVEEDOR MTTO"
       actions={[
         {
           icon     : 'edit',
           tooltip  : 'Editar Registro Equipo a Usuario',
           onClick  : (event, rowData) => seleccionarUsuariosEquipos(rowData, "Editar")
         },
         {
          icon     : 'delete',
          tooltip  : 'Borrar Registro Equipo a Usuario',
          onClick  : (event, rowData) =>  seleccionarUsuariosEquipos(rowData, "Eliminar")
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
      {RegistroEquipoUsuarioInsertar}
    </Modal>

    <Modal
      open={modalEditar}
      onClose={abrirCerrarModalEditar}
    >
      {RegistroEquipoUsuarioEditar}
    </Modal>

    <Modal
      open={modalEliminar}
      onClose={abrirCerrarModalEliminar}
    >
      {RegistroEquipoUsuarioEliminar}
    </Modal>
    </div>
  );
}

export default UsuariosEquipos;