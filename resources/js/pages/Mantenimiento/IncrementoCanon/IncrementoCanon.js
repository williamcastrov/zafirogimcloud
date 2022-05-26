import React, { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from 'prop-types';
import MaterialTable from "material-table";
import {Modal, TextField, Button, Select, MenuItem, FormControl, InputLabel, Grid, Typography } from "@material-ui/core";
import { green, blue, blueGrey, red } from '@material-ui/core/colors';
import {makeStyles} from "@material-ui/core/styles";
import NumberFormat from 'react-number-format';
import SaveIcon from '@material-ui/icons/Save';
import Moment from 'moment';
import swal from 'sweetalert';

// Componentes de Conexion con el Backend
import incrementocanonServices from "../../../services/Mantenimiento/IncrementoCanon";
import ciudadesServices from "../../../services/Parameters/Ciudades";
import estadosServices from "../../../services/Parameters/Estados";
import clientesServices from "../../../services/Interlocutores/Clientes";
import equiposServices from "../../../services/Mantenimiento/Equipos";

const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: 600,
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
    minWidth: 515,
    maxWidth: 515
  },
  formControl2: {
    margin: theme.spacing(0),
    minWidth: 245,
    maxWidth: 245
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
  typography: {
    fontSize: 16,
    color: "#ff3d00"
  },
}));

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      prefix="$"
    />
  );
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

function IncrementoCanon() {
  const styles = useStyles();
  const [listIncrementoCanon, setListIncrementoCanon] = useState([]);
  const [modalInsertar, setModalInsertar ] = useState(false);
  const [modalEditar, setModalEditar]= useState(false);
  const [modalEliminar, setModalEliminar]= useState(false);
  const [formError, setFormError] = useState(false);
  const [listarEstados, setListarEstados] = useState([]);
  const [listarCiudades, setListarCiudades] = useState([]);
  const [listarClientes, setListarClientes] = useState([]);
  const [listarEquipos, setListarEquipos] = useState([]);
  const fechaactual = Moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
  const [actualiza, setActualiza] = useState(false);
  let equipo = 0;

  const [incrementoCanonSeleccionado, setIncrementoCanonSeleccionado] = useState({
    id_inc: "",
    cliente_inc: "",
    equipo_inc: "",
    ciudad_inc: "",
    variacion_inc: "",
    fechacreacion_inc: "",
    fechaincremento_inc: "",
    valorrentamensual_inc: "",
    nombrecontacto_inc: "",
    estado_inc: ""
  })

  useEffect(() => {
    async function fetchDataIncrementoCanon() {
      const res = await incrementocanonServices.listincrementocanon();
      setListIncrementoCanon(res.data);
      //console.log("INCREMENTO : ", res.data)
      setActualiza(false);
    }
    fetchDataIncrementoCanon();
  }, [actualiza])

  useEffect (() => {
    async function fetchDataEstados() {
    const res = await estadosServices.listEstadosGenerales();
    setListarEstados(res.data) 
    console.log(res.data);
    }
    fetchDataEstados();
  }, [])

  useEffect(() => {
    async function fetchDataCiudades() {
      const res = await ciudadesServices.listCiudades();
      setListarCiudades(res.data);
      //console.log(res.data)
    }
    fetchDataCiudades();
  }, [])

  useEffect(() => {
    async function fetchDataClientes() {
      const res = await clientesServices.listClientes();
      setListarClientes(res.data)
      //console.log("DATOS CLIENTES : ",res.data);
    }
    fetchDataClientes();
  }, [])

  useEffect(() => {
    async function fetchDataEquipos() {
      const res = await equiposServices.listEquipos();
      setListarEquipos(res.data);
    }
    fetchDataEquipos();
  }, [])

  const handleChange = e => {
    const {name, value} = e.target;

    setIncrementoCanonSeleccionado( prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const seleccionarIncrementoCanon = (cambio, caso)=>{
    setIncrementoCanonSeleccionado(cambio);
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

  const grabarIncrementoCanon = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;

    if (!incrementoCanonSeleccionado.cliente_inc) {
      alert("1")
      errors.cliente_inc = true;
      formOk = false;
    }

    if (!incrementoCanonSeleccionado.ciudad_inc) {
      alert("3")
      errors.ciudad_inc = true;
      formOk = false;
    }

    if (!incrementoCanonSeleccionado.variacion_inc) {
      alert("4")
      errors.variacion_inc = true;
      formOk = false;
    }

    if (!incrementoCanonSeleccionado.fechacreacion_inc) {
      alert("5")
      errors.fechacreacion_inc = true;
      formOk = false;
    }

    if (!incrementoCanonSeleccionado.fechaincremento_inc) {
      alert("6")
      errors.fechaincremento_inc = true;
      formOk = false;
    }

    if (!incrementoCanonSeleccionado.valorrentamensual_inc) {
      alert("7")
      errors.valorrentamensual_inc = true;
      formOk = false;
    }

    if (!incrementoCanonSeleccionado.nombrecontacto_inc) {
      alert("8")
      errors.nombrecontacto_inc = true;
      formOk = false;
    }

    if (!incrementoCanonSeleccionado.estado_inc) {
      alert("10")
      errors.estado_inc = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
      console.log(incrementoCanonSeleccionado);
      const res = await incrementocanonServices.save(incrementoCanonSeleccionado);

      if (res.success) {
        swal("Incremento Canon", "Creado de forma correcta!", "success", { button: "Aceptar" });
        console.log(res.message)
        abrirCerrarModalInsertar();
        delete incrementoCanonSeleccionado.cliente_inc;
        delete incrementoCanonSeleccionado.cliente_inc;
        delete incrementoCanonSeleccionado.ciudad_inc;
        delete incrementoCanonSeleccionado.variacion_inc;
        delete incrementoCanonSeleccionado.fechacreacion_inc;
        delete incrementoCanonSeleccionado.fechaincremento_inc;
        delete incrementoCanonSeleccionado.valorrentamensual_inc;
        delete incrementoCanonSeleccionado.nombrecontacto_inc;
        delete incrementoCanonSeleccionado.estado_inc;
      } else
      {
        swal("Incremento Canon", "Error creando el Incremento del Canon de Arrendamiento!", "error", { button: "Aceptar" });
        console.log(res.message);
        abrirCerrarModalInsertar();
      }
    }
    else {
      swal("Incremento Canon", "Debe Ingresar todos los datos!", "warning", { button: "Aceptar" });
      //console.log(incrementoCanonSeleccionado)
      console.log(res.message);
      abrirCerrarModalInsertar();
    }
    setActualiza(true);
  }

  const actualizarIncrementoCanon = async () => {
  
    setFormError({});
    let errors = {};
    let formOk = true;

    if (!incrementoCanonSeleccionado.cliente_inc) {
      alert("1")
      errors.cliente_inc = true;
      formOk = false;
    }

    if (!incrementoCanonSeleccionado.ciudad_inc) {
      alert("3")
      errors.ciudad_inc = true;
      formOk = false;
    }

    if (!incrementoCanonSeleccionado.variacion_inc) {
      alert("4")
      errors.variacion_inc = true;
      formOk = false;
    }

    if (!incrementoCanonSeleccionado.fechacreacion_inc) {
      alert("5")
      errors.fechacreacion_inc = true;
      formOk = false;
    }

    if (!incrementoCanonSeleccionado.fechaincremento_inc) {
      alert("6")
      errors.fechaincremento_inc = true;
      formOk = false;
    }

    if (!incrementoCanonSeleccionado.valorrentamensual_inc) {
      alert("7")
      errors.valorrentamensual_inc = true;
      formOk = false;
    }

    if (!incrementoCanonSeleccionado.nombrecontacto_inc) {
      alert("8")
      errors.nombrecontacto_inc = true;
      formOk = false;
    }

    if (!incrementoCanonSeleccionado.estado_inc) {
      alert("10")
      errors.estado_inc = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
    
    const res = await incrementocanonServices.update(incrementoCanonSeleccionado);

    if (res.success) {
        swal("Incremento Canon", "Actualizado de forma correcta!", "success", { button: "Aceptar" });
        console.log(res.message)
        abrirCerrarModalEditar();
        delete incrementoCanonSeleccionado.cliente_inc;
        delete incrementoCanonSeleccionado.cliente_inc;
        delete incrementoCanonSeleccionado.ciudad_inc;
        delete incrementoCanonSeleccionado.variacion_inc;
        delete incrementoCanonSeleccionado.fechacreacion_inc;
        delete incrementoCanonSeleccionado.fechaincremento_inc;
        delete incrementoCanonSeleccionado.valorrentamensual_inc;
        delete incrementoCanonSeleccionado.nombrecontacto_inc;
        delete incrementoCanonSeleccionado.estado_inc;
    } else
    {
        swal("Incremento Canon", "Error Actualizando el Incremento Canon!", "error", { button: "Aceptar" });
        console.log(res.message);
        abrirCerrarModalEditar();
    }
    }
    else {
      swal("Incremento Canon", "Dege ingresar todos los datos, Revisar!", "warning", { button: "Aceptar" });
      console.log(res.message);
      abrirCerrarModalEditar();
    } 
    setActualiza(true);
  }

  const borrarIncrementoCanon = async()=>{
   
    const res = await incrementocanonServices.delete(incrementoCanonSeleccionado.id_inc);

    if (res.success) {
        swal("Incremento Canon", "Borrade de forma correcta!", "success", { button: "Aceptar" });
        console.log(res.message)
        abrirCerrarModalEliminar();
    }
    else {
        swal("Incremento Canon", "Error Borrando el CambioElementos!", "success", { button: "Aceptar" });
        console.log(res.message);
        abrirCerrarModalEliminar();
    }
    setActualiza(true);
  }
 // "string","boolean","numeric","date","datetime","time","currency"
  const columnas = [
    {
      title: 'Id',
      field: 'id_inc'
    },
    {
      title: 'Cliente',
      field: 'razonsocial_cli',
      cellStyle: { minWidth: 150 }
    },
    {
      title: 'Equipo',
      field: 'codigo_equ',
      cellStyle: { minWidth: 80 }
    },
    {
      title: 'Contacto',
      field: 'nombrecontacto_inc',
      cellStyle: { minWidth: 150 }
    },
    {
      title: 'Ciudad',
      field: 'nombre_ciu'
    },
    {
      title: 'Fecha Creación',
      field: 'fechacreacion_inc',
      type: "date",
      cellStyle: { minWidth: 100 }
    },
    {
      title: 'Fecha Incremento',
      field: 'fechaincremento_inc',
      type: "date",
      cellStyle: { minWidth: 100 }
    },
    {
      title: 'Renta Mensual',
      field: 'valorrentamensual_inc'
    },
    {
      title: 'Estado',
      field: 'nombre_est'
    }
  ]

  const incrementoCanonInsertar=(
    <div className={styles.modal}>
      <br />
      <Typography align="center" className={styles.typography} variant="button" display="block">Agregar Incremento Canon </Typography>
      <Grid container spacing={2} > 
        <Grid item xs={12} md={12}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectcliente_inc">Cliente</InputLabel>
            <Select
              labelId="selectcliente_inc"
              name="cliente_inc"
              id="idselectcliente_inc"
              onChange={handleChange}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarClientes.map((itemselect) => {
                  return (
                  <MenuItem value={itemselect.id_cli }>{itemselect.razonsocial_cli}</MenuItem>
                )
              })
            }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField className={styles.inputMaterial} name="variacion_inc" label="Variación" fullWidth
            InputLabelProps={{ shrink: true }} InputProps={{ inputComponent: NumberFormatCustom, }}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField className={styles.inputMaterial} name="valorrentamensual_inc" label="Valor Renta Mensual" fullWidth
            InputLabelProps={{ shrink: true }} InputProps={{ inputComponent: NumberFormatCustom, }}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}> <TextField name="nombrecontacto_inc" label="Nombre Contacto" fullWidth onChange={handleChange} /> </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl2}>
            <InputLabel id="idselectequipo_inc">Equipo</InputLabel>
            <Select
              labelId="selectquipo_inc"
              name="equipo_inc"
              id="idselectequipo_inc"
              onChange={handleChange}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarEquipos.map((itemselect) => {
                  return (
                  <MenuItem value={itemselect.id_equ }>{itemselect.codigo_equ}</MenuItem>
                )
              })
            }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}> <TextField type="date" InputLabelProps={{ shrink: true }} name="fechacreacion_inc"
          defaultValue={Moment(incrementoCanonSeleccionado.fechacreacion_inc).format('YYYY-MM-DD')} 
          label="Fecha de Creación" fullWidth onChange={handleChange} />
        </Grid> 
        <Grid item xs={12} md={6}> <TextField type="date" InputLabelProps={{ shrink: true }} name="fechaincremento_inc"
          defaultValue={Moment(incrementoCanonSeleccionado.fechacreacion_inc).format('YYYY-MM-DD')} 
          label="Fecha de Incremento" fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl2}>
            <InputLabel id="idselectciudad_inc">Ciudad</InputLabel>
            <Select
              labelId="selectciudad_inc"
              name="ciudad_inc"
               id="idselectciudad_inc"
               onChange={handleChange}
            >
            <MenuItem value=""> <em>None</em> </MenuItem>
            {
              listarCiudades.map((itemselect) => {
                return (
                  <MenuItem value={itemselect.id_ciu }>{itemselect.nombre_ciu}</MenuItem>
                )
              })
            }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl2}>
            <InputLabel id="idselectestado_inc">Estado</InputLabel>
            <Select
              labelId="selectestado_inc"
              name="estado_inc"
              id="idselectestado_inc"
              fullWidth
              onChange={handleChange}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarEstados.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_est}>{itemselect.nombre_est}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>  
      </Grid>
      <br /><br />
      <div align="right">    
        <Button color="primary" onClick = { () => grabarIncrementoCanon() } >Insertar</Button>
        <Button onClick={()=> abrirCerrarModalInsertar()} >Cancelar</Button>
      </div>
    </div>
  )

  const incrementoCanonEditar = (
    <div className={styles.modal}>
      <Typography align="center" className={styles.typography} variant="button" display="block">Actualizar Incremento Canon</Typography>
      <Grid container spacing={2} > 
        <Grid item xs={12} md={12}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectcliente_inc">Cliente</InputLabel>
            <Select
              labelId="selectcliente_inc"
              name="cliente_inc"
              id="idselectcliente_inc"
              onChange={handleChange}
              value={incrementoCanonSeleccionado && incrementoCanonSeleccionado.cliente_inc}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarClientes.map((itemselect) => {
                  return (
                  <MenuItem value={itemselect.id_cli }>{itemselect.razonsocial_cli}</MenuItem>
                )
              })
            }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField className={styles.inputMaterial} name="variacion_inc" label="Variación" fullWidth
            InputLabelProps={{ shrink: true }} InputProps={{ inputComponent: NumberFormatCustom, }}
            onChange={handleChange} value={incrementoCanonSeleccionado && incrementoCanonSeleccionado.variacion_inc}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField className={styles.inputMaterial} name="valorrentamensual_inc" label="Valor Renta Mensual" fullWidth
            InputLabelProps={{ shrink: true }} InputProps={{ inputComponent: NumberFormatCustom, }}
            onChange={handleChange}  value={incrementoCanonSeleccionado && incrementoCanonSeleccionado.valorrentamensual_inc}
          />
        </Grid>
        <Grid item xs={12} md={6}> <TextField name="nombrecontacto_inc" label="Nombre Contacto" fullWidth onChange={handleChange} 
             value={incrementoCanonSeleccionado && incrementoCanonSeleccionado.nombrecontacto_inc}/>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl2}>
            <InputLabel id="idselectequipo_inc">Equipo</InputLabel>
            <Select
              labelId="selectequipo_inc"
              name="equipo_inc"
              id="idselectequipo_inc"
              onChange={handleChange}
              value={incrementoCanonSeleccionado && incrementoCanonSeleccionado.equipo_inc}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarEquipos.map((itemselect) => {
                  return (
                  <MenuItem value={itemselect.id_equ }>{itemselect.codigo_equ}</MenuItem>
                )
              })
            }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}> <TextField type="date" InputLabelProps={{ shrink: true }} name="fechacreacion_inc"
          defaultValue={Moment(incrementoCanonSeleccionado.fechacreacion_inc).format('YYYY-MM-DD')}   
          label="Fecha de Creación" fullWidth onChange={handleChange} />
        </Grid> 
        <Grid item xs={12} md={6}> <TextField type="date" InputLabelProps={{ shrink: true }} name="fechaincremento_inc"
          defaultValue={Moment(incrementoCanonSeleccionado.fechacreacion_inc).format('YYYY-MM-DD')} 
          label="Fecha de Incremento" fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl2}>
            <InputLabel id="idselectciudad_inc">Ciudad</InputLabel>
            <Select
              labelId="selectciudad_inc"
              name="ciudad_inc"
               id="idselectciudad_inc"
               onChange={handleChange}
               value={incrementoCanonSeleccionado && incrementoCanonSeleccionado.ciudad_inc}
            >
            <MenuItem value=""> <em>None</em> </MenuItem>
            {
              listarCiudades.map((itemselect) => {
                return (
                  <MenuItem value={itemselect.id_ciu }>{itemselect.nombre_ciu}</MenuItem>
                )
              })
            }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl2}>
            <InputLabel id="idselectestado_inc">Estado</InputLabel>
            <Select
              labelId="selectestado_inc"
              name="estado_inc"
              id="idselectestado_inc"
              fullWidth
              onChange={handleChange}
              value={incrementoCanonSeleccionado && incrementoCanonSeleccionado.estado_inc}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarEstados.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_est}>{itemselect.nombre_est}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>  
      </Grid>
      <br />
      <div align="right">
        <Button color="primary"  onClick={()=>actualizarIncrementoCanon()} >Editar</Button>
        <Button onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  const incrementoCanonEliminar = (
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar el Registro <b>{incrementoCanonSeleccionado && incrementoCanonSeleccionado.cliente_inc}</b>? </p>
      <div align="right">
        <Button color="secondary" onClick = {() => borrarIncrementoCanon() }> Confirmar </Button>
        <Button onClick={()=>abrirCerrarModalEliminar()}> Cancelar </Button>
      </div>
    </div>
  )

  return (
    <div className="App">
    <br />
    <Button variant="contained" startIcon={<SaveIcon />} color="primary" onClick={() => abrirCerrarModalInsertar()} >Agregar Incremento Canon</Button>
     <MaterialTable
       columns={columnas}
       data={listIncrementoCanon}
       title="CONSULTAR INCREMENTOS CANON ARRENDAMIENTO"
       actions={[
         {
           icon     : 'edit',
           tooltip  : 'Editar Incremento Canon',
           onClick  : (event, rowData) => seleccionarIncrementoCanon(rowData, "Editar")
         },
         {
          icon: 'delete',
          tooltip: 'Borrar Equipo',
          onClick: (event, rowData) => seleccionarIncrementoCanon(rowData, "Eliminar")
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
      {incrementoCanonInsertar}
    </Modal>

    <Modal
      open={modalEditar}
      onClose={abrirCerrarModalEditar}
    >
      {incrementoCanonEditar}
    </Modal>

    <Modal
      open={modalEliminar}
      onClose={abrirCerrarModalEliminar}
    >
      {incrementoCanonEliminar}
    </Modal>
    </div>
  );
}

export default IncrementoCanon;