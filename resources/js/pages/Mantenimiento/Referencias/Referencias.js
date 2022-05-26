import React, { useEffect, useState } from "react";
import axios from "axios";
import MaterialTable from "material-table";
import {Modal, TextField, Button, Select, MenuItem, FormControl, InputLabel, Grid, Typography } from "@material-ui/core";
import { green, blue, blueGrey, red } from '@material-ui/core/colors';
import {makeStyles} from "@material-ui/core/styles";
import SaveIcon from '@material-ui/icons/Save';

// Componentes de Conexion con el Backend
import referenciasServices from "../../../services/Mantenimiento/Referencias";
import tiposequiposServices from "../../../services/Mantenimiento/GruposEquipos";
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

function Referencias() {
  const styles = useStyles();
  const [listReferencias, setListReferencias] = useState([]);
  const [modalInsertar, setModalInsertar ] = useState(false);
  const [modalEditar, setModalEditar]= useState(false);
  const [modalEliminar, setModalEliminar]= useState(false);
  const [formError, setFormError] = useState(false);
  const [listarEstados, setListarEstados] = useState([]);
  const [listarEmpresas, setListarEmpresas] = useState([]);
  const [listarTiposequipos, setListarTiposequipos] = useState([]);

  const [referenciasSeleccionado, setReferenciasSeleccionado] = useState({
    id_ref: "",
    codigo_ref: "",
    empresa_ref: "",
    nombre_ref: "",
    tipoequipo_ref: "",
    estado_ref: ""
  })

  useEffect(() => {
    async function fetchDataReferencias() {
      const res = await referenciasServices.listReferencias();
      setListReferencias(res.data);
    }
    fetchDataReferencias();
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

  useEffect (() => {
    async function fetchDataTiposequipos() {
    const res = await tiposequiposServices.listTiposequipos();
    setListarTiposequipos(res.data) 
    console.log(res.data);
  }
  fetchDataTiposequipos();
  }, [])

  const handleChange = e => {
    const {name, value} = e.target;

    setReferenciasSeleccionado( prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const seleccionarReferencia = (referencias, caso)=>{
    setReferenciasSeleccionado(referencias);
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

  const grabarReferencia = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;

    if (!referenciasSeleccionado.codigo_ref) {
      errors.codigo_ref = true;
      formOk = false;
    }

    if (!referenciasSeleccionado.nombre_ref) {
      errors.nombre_ref = true;
      formOk = false;
    }

    if (!referenciasSeleccionado.empresa_ref) {
      errors.empresa_ref = true;
      formOk = false;
    }

    if (!referenciasSeleccionado.tipoequipo_ref) {
      errors.tipoequipo_ref = true;
      formOk = false;
    }

    if (!referenciasSeleccionado.estado_ref) {
      errors.estado_ref = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
      console.log(referenciasSeleccionado);
      const res = await referenciasServices.save(referenciasSeleccionado);

      if (res.success) {
        alert("Referencia Creada de forma Correcta")
        console.log(res.message)
        abrirCerrarModalInsertar();
        delete referenciasSeleccionado.codigo_ref;
        delete referenciasSeleccionado.nombre_ref;
        delete referenciasSeleccionado.empresa_ref;
        delete referenciasSeleccionado.tipoequipo_ref;
        delete referenciasSeleccionado.estado_ref;
      } else
      {
        alert("Error Creando la Referencia");
        console.log(res.message);
        abrirCerrarModalInsertar();
      }
    }
    else {
      alert("Debe Ingresar Todos los Datos, Error Creando la Referencia");
      console.log(referenciasSeleccionado)
      console.log(res.message);
      abrirCerrarModalInsertar();
    }
  }

  const actualizarReferencia = async () => {
  
    setFormError({});
    let errors = {};
    let formOk = true;

    if (!referenciasSeleccionado.codigo_ref) {
      errors.codigo_ref = true;
      formOk = false;
    }

    if (!referenciasSeleccionado.nombre_ref) {
      errors.nombre_ref = true;
      formOk = false;
    }

    if (!referenciasSeleccionado.empresa_ref) {
      errors.empresa_ref = true;
      formOk = false;
    }

    if (!referenciasSeleccionado.tipoequipo_ref) {
      errors.tipoequipo_ref = true;
      formOk = false;
    }

    if (!referenciasSeleccionado.estado_ref) {
      errors.estado_ref = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
    
    const res = await referenciasServices.update(referenciasSeleccionado);

    if (res.success) {
        alert("Referencia actualizada de forma Correcta")
        console.log(res.message)
        abrirCerrarModalEditar();
        delete referenciasSeleccionado.codigo_ref;
        delete referenciasSeleccionado.nombre_ref;
        delete referenciasSeleccionado.empresa_ref;
        delete referenciasSeleccionado.tipoequipo_ref;
        delete referenciasSeleccionado.estado_ref;
    } else
    {
        alert("Error Actualizando la Frecuencia");
        console.log(res.message);
        abrirCerrarModalEditar();
    }
    }
    else {
      alert("Debe Ingresar Todos los Datos, Error Actualizando la Referencia");
      console.log(res.message);
      abrirCerrarModalEditar();
    } 
  }

  const borrarReferencia = async()=>{
   
    const res = await referenciasServices.delete(referenciasSeleccionado.id_ref);

    if (res.success) {
        alert("Referencia Borrada de forma Correcta")
        console.log(res.message)
        abrirCerrarModalEliminar();
    }
    else {
        alert("Error Borrando la Referencia");
        console.log(res.message);
        abrirCerrarModalEliminar();
    }
    
  }
 // "string","boolean","numeric","date","datetime","time","currency"
  const columnas = [
    {
      title: 'Id',
      field: 'id_ref'
    },
    {
      title: 'Codigo',
      field: 'codigo_ref'
    },
    {
      title: 'Descripción',
      field: 'nombre_ref',
      cellStyle: { minWidth: 250 }
    },
    {
      title: 'Nombre Empresa',
      field: 'nombre_emp'
    },
    {
      title: 'Descripción',
      field: 'nombre_tequ',
      cellStyle: { minWidth: 120 }
    },
    {
      title: 'Código Estado',
      field: 'estado_ref',
      cellStyle : { minWidth: 50},
      headerStyle: { minWidth: 50}
    },
    {
      title: 'Nombre Estado',
      field: 'nombre_est'
    }
  ]

  const referenciaInsertar=(
    <div className={styles.modal}>
      <br />
      <Typography align="center" className={styles.typography} variant="button" display="block">Agregar Nuevo Estado del Cliente </Typography>
      <Grid container spacing={2} > 
        <Grid item xs={12} md={12}>
          <TextField className={styles.inputMaterial} label="Código" name="codigo_ref" fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={12}> 
          <TextField className={styles.inputMaterial} label="Descripción" name="nombre_ref" fullWidth onChange={handleChange} />  
        </Grid>
        <Grid item xs={12} md={12}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectEmpresa">Empresa</InputLabel>
            <Select
              labelId="selectEmpresa"
              name="empresa_ref"
              id="idselectEmpresa"
              onChange={handleChange}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarEmpresas.map((itemselect) => {
                  return (
                  <MenuItem value={itemselect.id_emp }>{itemselect.nombre_emp}</MenuItem>
                )
              })
            }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={12}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectTipoequipo">Estado</InputLabel>
            <Select
              labelId="selectTipoequipoo"
              name="tipoequipo_ref"
               id="idselectTipoequipo"
               onChange={handleChange}
            >
            <MenuItem value=""> <em>None</em> </MenuItem>
            {
              listarTiposequipos.map((itemselect) => {
                return (
                  <MenuItem value={itemselect.id_tequ }>{itemselect.nombre_tequ}</MenuItem>
                )
              })
            }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={12}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectEstado">Estado</InputLabel>
            <Select
              labelId="selectEstado"
              name="estado_ref"
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
        </Grid>
      </Grid>
      <br /><br />
      <div align="right">    
        <Button color="primary" onClick = { () => grabarReferencia() } >Insertar</Button>
        <Button onClick={()=> abrirCerrarModalInsertar()} >Cancelar</Button>
      </div>
    </div>
  )

  const referenciaEditar = (
    <div className={styles.modal}>
      <h3 align="center" >Actualizar Referencia del Equipo</h3>
      <Grid container spacing={2} > 
        <Grid item xs={12} md={12}>
          <TextField className={styles.inputMaterial} label="Código" name="codigo_ref" fullWidth onChange={handleChange} 
           value={referenciasSeleccionado&&referenciasSeleccionado.codigo_ref} />
        </Grid>
        <Grid item xs={12} md={12}> 
          <TextField className={styles.inputMaterial} label="Descripción" name="nombre_ref" fullWidth onChange={handleChange}
            value={referenciasSeleccionado&&referenciasSeleccionado.nombre_ref} />  
        </Grid>
        <Grid item xs={12} md={12}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectEmpresa">Empresa</InputLabel>
            <Select
              labelId="selectEmpresa"
              name="empresa_ref"
              id="idselectEmpresa"
              onChange={handleChange}
              value={referenciasSeleccionado&&referenciasSeleccionado.empresa_ref}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarEmpresas.map((itemselect) => {
                  return (
                  <MenuItem value={itemselect.id_emp }>{itemselect.nombre_emp}</MenuItem>
                )
              })
            }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={12}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectTipoequipo">Tipo de Equipo</InputLabel>
            <Select
              labelId="selectTipoequipoo"
              name="tipoequipo_ref"
               id="idselectTipoequipo"
               onChange={handleChange}
               value={referenciasSeleccionado&&referenciasSeleccionado.tipoequipo_ref}
            >
            <MenuItem value=""> <em>None</em> </MenuItem>
            {
              listarTiposequipos.map((itemselect) => {
                return (
                  <MenuItem value={itemselect.id_tequ }>{itemselect.nombre_tequ}</MenuItem>
                )
              })
            }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={12}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectEstado">Estado</InputLabel>
            <Select
              labelId="selectEstado"
              name="estado_ref"
               id="idselectEstado"
               onChange={handleChange}
               value={referenciasSeleccionado&&referenciasSeleccionado.estado_ref}
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
        </Grid>
      </Grid> 
      <br /><br />
      <div align="right">
        <Button color="primary"  onClick={()=>actualizarReferencia()} >Editar</Button>
        <Button onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  const referenciaEliminar = (
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar la Referencia <b>{referenciasSeleccionado && referenciasSeleccionado.nombre_ref}</b>? </p>
      <div align="right">
        <Button color="secondary" onClick = {() => borrarReferencia() }> Confirmar </Button>
        <Button onClick={()=>abrirCerrarModalEliminar()}> Cancelar </Button>

      </div>

    </div>
  )

  return (
    <div className="App">
    <br />
    <Button variant="contained" startIcon={<SaveIcon />} color="primary" onClick={() => abrirCerrarModalInsertar()} >Agregar Referencia Equipo</Button>
     <MaterialTable
       columns={columnas}
       data={listReferencias}
       title="Maestra de Referencias de Equipos"
       actions={[
         {
           icon     : 'edit',
           tooltip  : 'Editar Referencia',
           onClick  : (event, rowData) => seleccionarReferencia(rowData, "Editar")
         },
         {
          icon     : 'delete',
          tooltip  : 'Borrar Referencia',
          onClick  : (event, rowData) =>   seleccionarReferencia(rowData, "Eliminar")
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
      {referenciaInsertar}
    </Modal>

    <Modal
      open={modalEditar}
      onClose={abrirCerrarModalEditar}
    >
      {referenciaEditar}
    </Modal>

    <Modal
      open={modalEliminar}
      onClose={abrirCerrarModalEliminar}
    >
      {referenciaEliminar}
    </Modal>
    </div>
  );
}

export default Referencias;