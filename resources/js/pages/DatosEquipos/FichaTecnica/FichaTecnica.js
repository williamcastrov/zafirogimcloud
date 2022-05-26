import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { Modal, TextField, Button, Select, MenuItem, FormControl, InputLabel, Grid, ButtonGroup, Typography } from "@material-ui/core";
import { green, blue, blueGrey, red } from '@material-ui/core/colors';
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from '@material-ui/icons/Save';
import NumberFormat from 'react-number-format';
import swal from 'sweetalert';

// Componentes de Conexion con el Backend
import fichatecnicaServices from "../../../services/DatosEquipos/FichaTecnica";
import proveedoresServices from "../../../services/Interlocutores/Proveedores";
import tiposllantasServices from "../../../services/DatosEquipos/TiposLlantas";
import tiposequiposServices from "../../../services/DatosEquipos/TiposEquipos";

//Estilos 
import "./FichaTecnica.css";

const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: 1000,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  iconos: {
    cursor: 'pointer'
  },
  inputMaterial: {
    width: '100%'
  },
  formControl: {
    margin: theme.spacing(0),
    minWidth: 300,
  },
  formControl2: {
    margin: theme.spacing(0),
    minWidth: 455,
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

function NumberFormatCustom(props) {
  const { inputRef, ...other } = props;
  //console.log(inputRef);
  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      thousandSeparator={'.'}
      decimalSeparator={','}
      prefix={'$'}
    />
  );
}

function FichaTecnica(props) {
  const { equipoID, equipoCodigo } = props;
  //console.log(equipoCodigo);

  //const valorcontrato_ctr = 1480900123.9898

  const styles = useStyles();
  const [listFichaTecnica, setListFichaTecnica] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [formError, setFormError] = useState(false);
  const [listarProveedores, setListarProveedores] = useState([]);
  const [listarTiposLlantas, setListarTiposLlantas] = useState([]);
  const [listarTiposEquipos, setListarTiposEquipos] = useState([]);
  const [actualiza, setActualiza] = useState(false);
  const [fichatecnicaSeleccionado, setFichaTecnicaSeleccionado] = useState({
    id_fit: equipoID,
		peso_fit: "",
		largo_fit: "",
		ancho_fit: "",
		capacidad_fit: "",
		alturamaximaelevacion_fit: "",
		alturamastilcolapsado_fit: "",
		centrodecarga_fit: "",
		tipodeoperacion_fit: "",
		anchointerno_fit: "",
		anchoexterno_fit: "",
	  altura_fit: "",
		sideshift_fit: "",
		bateriatraccion_fit: "",
		cargador_fit: "",
		medidacofrelargo_fit: "",
		mediacofreancho_fit: "",
		mediacofrealto_fit: "",
		tipoderuedafrontal_fit: "",
		tipoderuedatrasera_fit: "",
		tipoderuedadegiro_fit: ""
  })

  useEffect(() => {
    async function fetchDataFichaTecnica() {
      const res = await fichatecnicaServices.listUnaFichaTecnica(equipoID);
      setListFichaTecnica(res.data);
      setActualiza(false);
    }
    fetchDataFichaTecnica();
  }, [actualiza])

  useEffect(() => {
    async function fetchDataProveedores() {
      const res = await proveedoresServices.listProveedores();
      setListarProveedores(res.data)
      //console.log(res.data);
    }
    fetchDataProveedores();
  }, [])

  useEffect(() => {
    async function fetchDataTiposLlantas() {
      const res = await tiposllantasServices.listTiposLlantas();
      setListarTiposLlantas(res.data)
      //console.log(res.data);
    }
    fetchDataTiposLlantas();
  }, [])

  useEffect(() => {
    async function fetchDataTiposEquipos() {
      const res = await tiposequiposServices.listTiposEquipos();
      setListarTiposEquipos(res.data)
      //console.log(res.data);
    }
    fetchDataTiposEquipos();
  }, [])

  const handleChange = e => {
    const { name, value } = e.target;

    setFichaTecnicaSeleccionado(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const seleccionarFichaTecnica = (fichatecnica, caso) => {
    setFichaTecnicaSeleccionado(fichatecnica);
    (caso === "Editar") ? abrirCerrarModalEditar() : abrirCerrarModalEliminar()
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

  const grabarFichaTecnica = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;

    if (!fichatecnicaSeleccionado.id_fit) {
      errors.id_fit = true;
      formOk = false;
    }

    if (!fichatecnicaSeleccionado.peso_fit) {
      errors.peso_fit = true;
      formOk = false;
    }

    if (!fichatecnicaSeleccionado.dimensiones_fit) {
      errors.dimensiones_fit = true;
      formOk = false;
    }

    if (!fichatecnicaSeleccionado.codigoinventario_fit) {
      errors.codigoinventario_fit = true;
      formOk = false;
    }

    if (!fichatecnicaSeleccionado.capacidad_fit) {
      errors.capacidad_fit = true;
      formOk = false;
    }

    if (!fichatecnicaSeleccionado.alturamaximaelevacion_fit) {
      errors.alturamaximaelevacion_fit = true;
      formOk = false;
    }

    if (!fichatecnicaSeleccionado.alturamastilcolapsado_fit) {
      errors.alturamastilcolapsado_fit = true;
      formOk = false;
    }

    if (!fichatecnicaSeleccionado.horquillas_fit) {
      errors.horquillas_fit = true;
      formOk = false;
    }

    if (!fichatecnicaSeleccionado.centrodecarga_fit) {
      errors.centrodecarga_fit = true;
      formOk = false;
    }

    if (!fichatecnicaSeleccionado.tipodeoperacion_fit) {
      errors.tipodeoperacion_fit = true;
      formOk = false;
    }

    if (!fichatecnicaSeleccionado.separacionbrazos_fit) {
      errors.separacionbrazos_fit = true;
      formOk = false;
    }

    if (!fichatecnicaSeleccionado.alturabrazos_fit) {
      errors.alturabrazos_fit = true;
      formOk = false;
    }

    if (!fichatecnicaSeleccionado.sideshift_fit) {
      errors.sideshift_fit = true;
      formOk = false;
    }

    if (!fichatecnicaSeleccionado.bateriatraccion_fit) {
      errors.bateriatraccion_fit = true;
      formOk = false;
    }

    if (!fichatecnicaSeleccionado.cargador_fit) {
      errors.cargador_fit = true;
      formOk = false;
    }

    if (!fichatecnicaSeleccionado.medidacofrebateria_fit) {
      errors.medidacofrebateria_fit = true;
      formOk = false;
    }

    if (!fichatecnicaSeleccionado.tipoderuedafrontal_fit) {
      errors.tipoderuedafrontal_fit = true;
      formOk = false;
    }

    if (!fichatecnicaSeleccionado.tipoderuedatrasera_fit) {
      errors.tipoderuedatrasera_fit = true;
      formOk = false;
    }

    if (!fichatecnicaSeleccionado.tipoderuedadegiro_fit) {
      errors.tipoderuedadegiro_fit = true;
      formOk = false;
    }

    if (!fichatecnicaSeleccionado.proveedor_fit) {
      errors.proveedor_fit = true;
      formOk = false;
    }

    if (!fichatecnicaSeleccionado.denominacion_fit) {
      errors.denominacion_fit = true;
      formOk = false;
    }

    if (!fichatecnicaSeleccionado.numerofabricante_fit) {
      errors.numerofabricante_fit = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
      const res = await fichatecnicaServices.save(fichatecnicaSeleccionado);

      if (res.success) {
        swal( "Ficha Técnica", "Creada de forma Correcta!", "success", { button: "Aceptar" });
        //console.log(res.message)
        abrirCerrarModalInsertar();

        delete fichatecnicaSeleccionado.id_fit;
        delete fichatecnicaSeleccionado.peso_fit;
        delete fichatecnicaSeleccionado.dimensiones_fit;
        delete fichatecnicaSeleccionado.codigoinventario_fit;
        delete fichatecnicaSeleccionado.capacidad_fit;
        delete fichatecnicaSeleccionado.alturamaximaelevacion_fit;
        delete fichatecnicaSeleccionado.alturamastilcolapsado_fit;
        delete fichatecnicaSeleccionado.horquillas_fit;
        delete fichatecnicaSeleccionado.centrodecarga_fit;
        delete fichatecnicaSeleccionado.tipodeoperacion_fit;
        delete fichatecnicaSeleccionado.separacionbrazos_fit;
        delete fichatecnicaSeleccionado.alturabrazos_fit;
        delete fichatecnicaSeleccionado.sideshift_fit;
        delete fichatecnicaSeleccionado.bateriatraccion_fit;
        delete fichatecnicaSeleccionado.cargador_fit;
        delete fichatecnicaSeleccionado.medidacofrebateria_fit;
        delete fichatecnicaSeleccionado.tipoderuedafrontal_fit;
        delete fichatecnicaSeleccionado.tipoderuedatrasera_fit;
        delete fichatecnicaSeleccionado.tipoderuedadegiro_fit;
        delete fichatecnicaSeleccionado.proveedor_fit;
        delete fichatecnicaSeleccionado.denominacion_fit;
        delete fichatecnicaSeleccionado.numerofabricante_fit;
      } else {
        swal( "Ficha Técnica", "Error Crando la Fecha Técnica!", "error", { button: "Aceptar" });
        console.log(res.success);
        abrirCerrarModalInsertar();
      }
    }
    else {
      swal( "Ficha Técnica", "Debe Ingresar todos los Datos!, Revisar Información", "warning", { button: "Aceptar" });
      //console.log(fichatecnicaSeleccionado);
      //console.log(res.message);
      abrirCerrarModalInsertar();
    }
    setActualiza(true);
  }

  const actualizarFichaTecnica = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;

    if (!fichatecnicaSeleccionado.id_fit) {
      errors.id_fit = true;
      formOk = false;
    }

    if (!fichatecnicaSeleccionado.peso_fit) {
      errors.peso_fit = true;
      formOk = false;
    }

    if (!fichatecnicaSeleccionado.dimensiones_fit) {
      errors.dimensiones_fit = true;
      formOk = false;
    }

    if (!fichatecnicaSeleccionado.codigoinventario_fit) {
      errors.codigoinventario_fit = true;
      formOk = false;
    }

    if (!fichatecnicaSeleccionado.capacidad_fit) {
      errors.capacidad_fit = true;
      formOk = false;
    }

    if (!fichatecnicaSeleccionado.alturamaximaelevacion_fit) {
      errors.alturamaximaelevacion_fit = true;
      formOk = false;
    }

    if (!fichatecnicaSeleccionado.alturamastilcolapsado_fit) {
      errors.alturamastilcolapsado_fit = true;
      formOk = false;
    }

    if (!fichatecnicaSeleccionado.horquillas_fit) {
      errors.horquillas_fit = true;
      formOk = false;
    }

    if (!fichatecnicaSeleccionado.centrodecarga_fit) {
      errors.centrodecarga_fit = true;
      formOk = false;
    }

    if (!fichatecnicaSeleccionado.tipodeoperacion_fit) {
      errors.tipodeoperacion_fit = true;
      formOk = false;
    }

    if (!fichatecnicaSeleccionado.separacionbrazos_fit) {
      errors.separacionbrazos_fit = true;
      formOk = false;
    }

    if (!fichatecnicaSeleccionado.alturabrazos_fit) {
      errors.alturabrazos_fit = true;
      formOk = false;
    }

    if (!fichatecnicaSeleccionado.sideshift_fit) {
      errors.sideshift_fit = true;
      formOk = false;
    }

    if (!fichatecnicaSeleccionado.bateriatraccion_fit) {
      errors.bateriatraccion_fit = true;
      formOk = false;
    }

    if (!fichatecnicaSeleccionado.cargador_fit) {
      errors.cargador_fit = true;
      formOk = false;
    }

    if (!fichatecnicaSeleccionado.medidacofrebateria_fit) {
      errors.medidacofrebateria_fit = true;
      formOk = false;
    }

    if (!fichatecnicaSeleccionado.tipoderuedafrontal_fit) {
      errors.tipoderuedafrontal_fit = true;
      formOk = false;
    }

    if (!fichatecnicaSeleccionado.tipoderuedatrasera_fit) {
      errors.tipoderuedatrasera_fit = true;
      formOk = false;
    }

    if (!fichatecnicaSeleccionado.tipoderuedadegiro_fit) {
      errors.tipoderuedadegiro_fit = true;
      formOk = false;
    }

    if (!fichatecnicaSeleccionado.proveedor_fit) {
      errors.proveedor_fit = true;
      formOk = false;
    }

    if (!fichatecnicaSeleccionado.denominacion_fit) {
      errors.denominacion_fit = true;
      formOk = false;
    }

    if (!fichatecnicaSeleccionado.numerofabricante_fit) {
      errors.numerofabricante_fit = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {

      const res = await fichatecnicaServices.update(fichatecnicaSeleccionado);
      console.log(fichatecnicaSeleccionado);

      if (res.success) {
        swal( "Ficha Técnica", "Actualizada de forma Correcta!", "success", { button: "Aceptar" });
        //console.log(res.message)
        abrirCerrarModalEditar();
        delete fichatecnicaSeleccionado.id_fit;
        delete fichatecnicaSeleccionado.peso_fit;
        delete fichatecnicaSeleccionado.dimensiones_fit;
        delete fichatecnicaSeleccionado.codigoinventario_fit;
        delete fichatecnicaSeleccionado.capacidad_fit;
        delete fichatecnicaSeleccionado.alturamaximaelevacion_fit;
        delete fichatecnicaSeleccionado.alturamastilcolapsado_fit;
        delete fichatecnicaSeleccionado.horquillas_fit;
        delete fichatecnicaSeleccionado.centrodecarga_fit;
        delete fichatecnicaSeleccionado.tipodeoperacion_fit;
        delete fichatecnicaSeleccionado.separacionbrazos_fit;
        delete fichatecnicaSeleccionado.alturabrazos_fit;
        delete fichatecnicaSeleccionado.sideshift_fit;
        delete fichatecnicaSeleccionado.bateriatraccion_fit;
        delete fichatecnicaSeleccionado.cargador_fit;
        delete fichatecnicaSeleccionado.medidacofrebateria_fit;
        delete fichatecnicaSeleccionado.tipoderuedafrontal_fit;
        delete fichatecnicaSeleccionado.tipoderuedatrasera_fit;
        delete fichatecnicaSeleccionado.tipoderuedadegiro_fit;
        delete fichatecnicaSeleccionado.proveedor_fit;
        delete fichatecnicaSeleccionado.denominacion_fit;
        delete fichatecnicaSeleccionado.numerofabricante_fit;
      } else {
        swal( "Ficha Técnica", "Error Actualizando Ficha Ténica!", "error", { button: "Aceptar" });
        //console.log(res.message);
        abrirCerrarModalEditar();
      }
    }
    else {
      swal( "Ficha Técnica", "Debe Ingresar Todos los Datos, Revisar Información!", "warning", { button: "Aceptar" });
      //console.log(res.message);
      abrirCerrarModalEditar();
    }
    setActualiza(true);
  }

  const borrarFichaTecnica = async () => {

    const res = await fichatecnicaServices.delete(fichatecnicaSeleccionado.id_fit);

    if (res.success) {
      swal( "Ficha Técnica", "Borrada de forma Correcta!", "error", { button: "Aceptar" });
      //console.log(res.message)
      abrirCerrarModalEliminar();
    }
    else {
      swal( "Ficha Técnica", "Error Borrando la Ficha Técnica!", "success", { button: "Aceptar" });
      //console.log(res.message);
      abrirCerrarModalEliminar();
    }
    setActualiza(true);
  }
  // "string","boolean","numeric","date","datetime","time","currency"

  const columnas = [
    {
      title: 'Proveedor',
      field: 'razonsocial_int'
    },
    {
      title: 'Peso',
      field: 'peso_fit',
      cellStyle: { minWidth: 70 }
    },
    {
      title: 'Dimensiones',
      field: 'dimensiones_fit'
    },
    {
      title: 'Capacidad',
      field: 'capacidad_fit'
    },
    {
      title: 'Altura Maxima Elevación',
      field: 'alturamaximaelevacion_fit'
    },
    {
      title: 'Altura Mastil Colapsado',
      field: 'alturamastilcolapsado_fit',
      type: 'date'
    },
    {
      title: 'Horquillas',
      field: 'horquillas_fit',
      cellStyle: { minWidth: 80 }
    },
    {
      title: 'Denominación',
      field: 'denominacion_fit',
      cellStyle: { minWidth: 100 }
    }
  ]

  const fichatecnicaInsertar = (
    <div className={styles.modal}>
      <Typography align="center" className={styles.typography} variant="button" display="block">
        Agregar Ficha Técnica del Equipo { } {equipoCodigo} 
      </Typography>
      <Grid container spacing={2} >
        <Grid item xs={12} md={3}> <TextField name="id_fit" label="ID Ficha Técnica" defaultValue={equipoID} disabled="true"
          fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={3}> <TextField type="number" name="peso_fit" label="Peso del Equipo"
          fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={3}> <TextField name="largo_fit" label="Longitud Equipo"
          fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={3}> <TextField name="ancho_fit" label="Ancho Equipo"
          fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={3}> <TextField type="number" name="capacidad_fit" label="Capacidad del Equipo"
          fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={3}> <TextField type="number" name="alturamaximaelevacion_fit" label="Altura Maxima de Elevación"
          fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={3}> <TextField type="number" name="alturamastilcolapsado_fit" label="Altura Mastil Colapsado"
          fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={3}> <TextField name="centrodecarga_fit" label="Centro de Carga"
          fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={3}> <TextField name="anchointerno_fit" label="Ancho Interno"
          fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={3}> <TextField name="anchoexterno_fit" label="Ancho Externo"
          fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={3}> <TextField name="altura_fit" label="Altura"
          fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={3}> <TextField name="sideshift_fit" label="Side-Shift"
          fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={4}> <TextField name="medidacofrelargo_fit" label="Largo del Cofre Batería"
          fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={4}> <TextField name="mediacofreancho_fit" label="Ancho del Cofre Batería"
          fullWidth onChange={handleChange} />
        </Grid> 
        <Grid item xs={12} md={4}> <TextField name="mediacofrealto_fit" label="Alto del Cofre Batería"
          fullWidth onChange={handleChange} />
        </Grid>
       
        <Grid item xs={12} md={4}> <TextField name="bateriatraccion_fit" label="Información de la Bateria del Equipo"
          fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={4}> <TextField name="cargador_fit" label="Información del Cargador de la Bateria"
          fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselecttipodeoperacion_fit" >Tipo de Operación definida para el equipo</InputLabel>
            <Select
              labelId="selecttipodeoperacion_fit"
              name="tipodeoperacion_fit"
              id="idselecttipodeoperacion_fit"
              fullWidth
              onChange={handleChange}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarTiposEquipos.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_tequ}>{itemselect.descripcion_tequ}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselecttipoderuedafrontal_fit" >Ingresar Datos Rueda Frontal</InputLabel>
            <Select
              labelId="selecttipoderuedafrontal_fit"
              name="tipoderuedafrontal_fit"
              id="idselecttipoderuedafrontal_fit"
              fullWidth
              onChange={handleChange}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarTiposLlantas.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_llan}>{itemselect.descripcion_llan}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselecttipoderuedatrasera_fit" >Ingresar Datos Rueda Trasera</InputLabel>
            <Select
              labelId="selecttipoderuedatrasera_fit"
              name="tipoderuedatrasera_fit"
              id="idselecttipoderuedatrasera_fit"
              fullWidth
              onChange={handleChange}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarTiposLlantas.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_llan}>{itemselect.descripcion_llan}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselecttipoderuedadegiro_fit" >Ingresar Datos Rueda de Giro</InputLabel>
            <Select
              labelId="selecttipoderuedadegiro_fit"
              name="tipoderuedadegiro_fit"
              id="idselecttipoderuedadegiro_fit"
              fullWidth
              onChange={handleChange}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarTiposLlantas.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_llan}>{itemselect.descripcion_llan}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <br /><br />
      <div align="right">
        <Button className={styles.button} color="primary" onClick={() => grabarFichaTecnica()} >Insertar</Button>
        <Button className={styles.button2} onClick={() => abrirCerrarModalInsertar()} >Cancelar</Button>
      </div>
    </div>
  )

  const fichatecnicaEditar = (
    <div className={styles.modal}>
      <Typography align="center" className={styles.typography} variant="button" display="block">
        Modificar Ficha Técnica del Equipo { } {equipoCodigo} 
      </Typography>
      <Grid container spacing={2} >
        <Grid item xs={12} md={3}> <TextField name="id_fit" label="ID Ficha Técnica" defaultValue={equipoID} disabled="true"
          fullWidth onChange={handleChange} value={fichatecnicaSeleccionado && fichatecnicaSeleccionado.id_fit} 
        />
        </Grid>
        <Grid item xs={12} md={3}> <TextField type="number" name="peso_fit" label="Peso del Equipo"
          fullWidth onChange={handleChange} value={fichatecnicaSeleccionado && fichatecnicaSeleccionado.peso_fit} />
        </Grid>
        <Grid item xs={12} md={3}> <TextField name="largo_fit" label="Longitud Equipo"
          fullWidth onChange={handleChange} value={fichatecnicaSeleccionado && fichatecnicaSeleccionado.largo_fit} />
        </Grid>
        <Grid item xs={12} md={3}> <TextField name="ancho_fit" label="Ancho Equipo"
          fullWidth onChange={handleChange} value={fichatecnicaSeleccionado && fichatecnicaSeleccionado.ancho_fit} />
        </Grid>
        <Grid item xs={12} md={3}> <TextField type="number" name="capacidad_fit" label="Capacidad del Equipo"
          fullWidth onChange={handleChange} value={fichatecnicaSeleccionado && fichatecnicaSeleccionado.capacidad_fit} />
        </Grid>
        <Grid item xs={12} md={3}> <TextField type="number" name="alturamaximaelevacion_fit" label="Altura Maxima de Elevación"
          fullWidth onChange={handleChange} value={fichatecnicaSeleccionado && fichatecnicaSeleccionado.alturamaximaelevacion_fit} />
        </Grid>
        <Grid item xs={12} md={3}> <TextField type="number" name="alturamastilcolapsado_fit" label="Altura Mastil Colapsado"
          fullWidth onChange={handleChange} value={fichatecnicaSeleccionado && fichatecnicaSeleccionado.alturamastilcolapsado_fit} />
        </Grid>
        <Grid item xs={12} md={3}> <TextField name="centrodecarga_fit" label="Centro de Carga"
          fullWidth onChange={handleChange}  value={fichatecnicaSeleccionado && fichatecnicaSeleccionado.centrodecarga_fit} />
        </Grid>
        <Grid item xs={12} md={3}> <TextField name="anchointerno_fit" label="Ancho Interno"
          fullWidth onChange={handleChange}  value={fichatecnicaSeleccionado && fichatecnicaSeleccionado.anchointerno_fit} />
        </Grid>
        <Grid item xs={12} md={3}> <TextField name="anchoexterno_fit" label="Ancho Externo"
          fullWidth onChange={handleChange}  value={fichatecnicaSeleccionado && fichatecnicaSeleccionado.anchoexterno_fit} />
        </Grid>
        <Grid item xs={12} md={3}> <TextField name="altura_fit" label="Altura"
          fullWidth onChange={handleChange} value={fichatecnicaSeleccionado && fichatecnicaSeleccionado.altura_fit} />
        </Grid>
        <Grid item xs={12} md={3}> <TextField name="sideshift_fit" label="Side-Shift"
          fullWidth onChange={handleChange} value={fichatecnicaSeleccionado && fichatecnicaSeleccionado.sideshift_fit} />
        </Grid>
        <Grid item xs={12} md={4}> <TextField name="medidacofrelargo_fit" label="Largo del Cofre Batería"
          fullWidth onChange={handleChange} value={fichatecnicaSeleccionado && fichatecnicaSeleccionado.medidacofrelargo_fit} />
        </Grid>
        <Grid item xs={12} md={4}> <TextField name="mediacofreancho_fit" label="Ancho del Cofre Batería"
          fullWidth onChange={handleChange} value={fichatecnicaSeleccionado && fichatecnicaSeleccionado.mediacofreancho_fit} />
        </Grid> 
        <Grid item xs={12} md={4}> <TextField name="mediacofrealto_fit" label="Alto del Cofre Batería"
          fullWidth onChange={handleChange} value={fichatecnicaSeleccionado && fichatecnicaSeleccionado.mediacofrealto_fit} />
        </Grid>
        <Grid item xs={12} md={4}> <TextField name="bateriatraccion_fit" label="Información de la Bateria del Equipo"
          fullWidth onChange={handleChange} value={fichatecnicaSeleccionado && fichatecnicaSeleccionado.bateriatraccion_fit} />
        </Grid>
        <Grid item xs={12} md={4}> <TextField name="cargador_fit" label="Información del Cargador de la Bateria"
          fullWidth onChange={handleChange} value={fichatecnicaSeleccionado && fichatecnicaSeleccionado.cargador_fit} />
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselecttipodeoperacion_fit" >Tipo de Operación definida para el equipo</InputLabel>
            <Select
              labelId="selecttipodeoperacion_fit"
              name="tipodeoperacion_fit"
              id="idselecttipodeoperacion_fit"
              fullWidth
              onChange={handleChange}
              value={fichatecnicaSeleccionado && fichatecnicaSeleccionado.tipodeoperacion_fit}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarTiposEquipos.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_tequ}>{itemselect.descripcion_tequ}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselecttipoderuedafrontal_fit" >Ingresar Datos Rueda Frontal</InputLabel>
            <Select
              labelId="selecttipoderuedafrontal_fit"
              name="tipoderuedafrontal_fit"
              id="idselecttipoderuedafrontal_fit"
              fullWidth
              onChange={handleChange}
              value={fichatecnicaSeleccionado && fichatecnicaSeleccionado.tipoderuedafrontal_fit}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarTiposLlantas.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_llan}>{itemselect.descripcion_llan}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselecttipoderuedatrasera_fit" >Ingresar Datos Rueda Trasera</InputLabel>
            <Select
              labelId="selecttipoderuedatrasera_fit"
              name="tipoderuedatrasera_fit"
              id="idselecttipoderuedatrasera_fit"
              fullWidth
              onChange={handleChange}
              value={fichatecnicaSeleccionado && fichatecnicaSeleccionado.tipoderuedatrasera_fit}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarTiposLlantas.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_llan}>{itemselect.descripcion_llan}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselecttipoderuedadegiro_fit" >Ingresar Datos Rueda de Giro</InputLabel>
            <Select
              labelId="selecttipoderuedadegiro_fit"
              name="tipoderuedadegiro_fit"
              id="idselecttipoderuedadegiro_fit"
              fullWidth
              onChange={handleChange}
              value={fichatecnicaSeleccionado && fichatecnicaSeleccionado.tipoderuedadegiro_fit}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarTiposLlantas.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_llan}>{itemselect.descripcion_llan}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <br /><br />
      <div align="right">
        <Button className={styles.button} color="primary" onClick={() => actualizarFichaTecnica()} >Editar</Button>
        <Button className={styles.button2} onClick={() => abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  const fichatecnicaEliminar = (
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar la Ficha Técnica del Equipo <b>{fichatecnicaSeleccionado && fichatecnicaSeleccionado.denominacion_fit}</b>? </p>
      <div align="right">
        <Button className={styles.button} color="secondary" onClick={() => borrarFichaTecnica()}> Confirmar </Button>
        <Button className={styles.button2} onClick={() => abrirCerrarModalEliminar()}> Cancelar </Button>
      </div>
    </div>
  )

  return (
    <div className="App">
      <br />
      <Button variant="contained" startIcon={<SaveIcon />} color="primary" onClick={() => abrirCerrarModalInsertar()} >Agregar Ficha Técnica</Button>
      <div className="datosequipos">
        <MaterialTable
          columns={columnas}
          data={listFichaTecnica}
          title="FICHA TECNICA DEL EQUIPO"
          actions={[
            {
              icon: 'edit',
              tooltip: 'Editar Ficha Técnica',
              onClick: (event, rowData) => seleccionarFichaTecnica(rowData, "Editar")
            },
            {
              icon: 'delete',
              tooltip: 'Borrar Ficha Técnica',
              onClick: (event, rowData) => seleccionarFichaTecnica(rowData, "Eliminar")
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
          detailPanel={[
            {
              icon: 'assignment',
              tooltip: 'Mas Información Ficha Técnica',
              render: rowData => {
                return (
                  <div
                    style={{
                      fontSize: 16,
                      color: 'white',
                      backgroundColor: '#9e9e9e',
                    }}
                  >
                    <ButtonGroup variant="contained" color="primary">
                      <Button>Centro de Carga      : {rowData.centrodecarga_fit} </Button>
                      <Button>Tipo de Operacion    : {rowData.descripcion_tequ} </Button>
                      <Button>Separacion de Brazos : {rowData.separacionbrazos_fit} </Button>
                      <Button>Altura de Brazos  : {rowData.alturabrazos_fit} </Button>
                    </ButtonGroup>
                  </div>
                )
              },
            },
            {
              icon: 'assignment_return',
              tooltip: 'Mas Información Ficha Técnica',
              render: rowData => {
                return (
                  <div
                    style={{
                      fontSize: 16,
                      color: 'white',
                      backgroundColor: '#9e9e9e',
                    }}
                  >
                    <ButtonGroup variant="contained" color="primary" >
                      <Button> SideShift : {rowData.sideshift_fit} </Button>
                      <Button> Código Inventario : {rowData.codigoinventario_fit} </Button>
                      <Button> Bateria Tracción : {rowData.bateriatraccion_fit} </Button>
                      <Button> Cargador : {rowData.cargador_fit} </Button>
                    </ButtonGroup>
                  </div>
                )
              },
            },
            {
              icon: 'assignment_turned_in',
              tooltip: 'Mas Información Ficha Técnica',
              render: rowData => {
                return (
                  <div
                    style={{
                      fontSize: 16,
                      color: 'white',
                      backgroundColor: '#9e9e9e',
                    }}
                  >
                    <ButtonGroup variant="contained" color="primary" >
                      <Button> Media Cofre Batería : {rowData.medidacofrebateria_fit} </Button>
                      <Button> Número Fabricante : {rowData.numerofabricante_fit} </Button>
                    </ButtonGroup>
                  </div>
                )
              },
            },
          ]}
        />{ }
      </div>

      <Modal
        open={modalInsertar}
        onClose={abrirCerrarModalInsertar}
      >
        {fichatecnicaInsertar}
      </Modal>

      <Modal
        open={modalEditar}
        onClose={abrirCerrarModalEditar}
      >
        {fichatecnicaEditar}
      </Modal>

      <Modal
        open={modalEliminar}
        onClose={abrirCerrarModalEliminar}
      >
        {fichatecnicaEliminar}
      </Modal>
    </div>
  );
}

export default FichaTecnica;