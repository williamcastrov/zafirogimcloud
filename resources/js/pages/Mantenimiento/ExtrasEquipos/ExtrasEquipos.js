import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import MaterialTable from "material-table";
import { Modal, Button, TextField, Select, MenuItem, FormControl, InputLabel, Grid, Typography } from "@material-ui/core";
import { green, blue, blueGrey, red } from '@material-ui/core/colors';
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from '@material-ui/icons/Save';
import NumberFormat from 'react-number-format';
import swal from 'sweetalert';

// Componentes de Conexion con el Backend
import empresasServices from "../../../services/Empresa";
import estadosServices from "../../../services/Parameters/Estados";
import marcasServices from "../../../services/Mantenimiento/Marcas";
import frecuenciasServices from "../../../services/Mantenimiento/Frecuencias";
import propietariosServices from "../../../services/Interlocutores/Proveedores";
import gruposequiposServices from "../../../services/Mantenimiento/GruposEquipos";
import subgruposequiposServices from "../../../services/Mantenimiento/SubGruposPartes";
import equiposServices from "../../../services/Mantenimiento/Equipos";
import extrasequiposServices from "../../../services/Mantenimiento/ExtrasEquipos";
import estadosclientesServices from "../../../services/Mantenimiento/EstadosClientes";
import estadosmttoServices from "../../../services/Mantenimiento/EstadosMtto";

// Datos Adicionales de los Equipos
//import MenuEquipos from "../../DatosEquipos/MenuEquipos";

const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: 700,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
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
    maxWidth: 300
  },
  formControlEstados: {
    margin: theme.spacing(0),
    minWidth: 200,
  },
  formControlFull: {
    margin: theme.spacing(0),
    minWidth: 617,
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
    margin: 0,
    top: 'auto',
    left: 20,
    bottom: 20,
    right: 'auto',
    position: 'fixed',
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


function ExtrasEquipos(props) {
  const { equipoID, equipoCodigo } = props;
  //console.log("ID EQUIPO : ",equipoID)
  //console.log("CODIGO EQUIPO : ",equipoCodigo)

  const styles = useStyles();
  const [listarExtrasEquipos, setListarExtrasEquipos] = useState([]);
  const [listarEquipos, setListarEquipos] = useState([]);
  const [listarUnEquipo, setListarUnEquipo] = useState([]);
  const [listarSubEquipos, setListarSubEquipos] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [formError, setFormError] = useState(false);
  const [codigogrupo, setCodigoGrupo] = useState(0);
  const [codigoSubBrupo, setCodigoSubGrupo] = useState(0);
  const [grabar, setGrabar] = React.useState(false);
  const [actualizar, setActualizar] = React.useState(false);

  const [listarEmpresas, setListarEmpresas] = useState([]);
  const [listarEstados, setListarEstados] = useState([]);
  const [listarEstadosClientes, setListarEstadosClientes] = useState([]);
  const [listarEstadosMtto, setListarEstadosMtto] = useState([]);
  const [listarFrecuencias, setListarFrecuencias] = useState([]);
  const [listarPropietarios, setListarPropietarios] = useState([]);
  const [listarMarcas, setListarMarcas] = useState([]);
  const [listarGruposEquipos, setListarGruposEquipos] = useState([]);
  const [listarSubGruposEquipos, setListarSubGruposEquipos] = useState([]);
  const [fechaHoy, setFechaHoy] = useState(new Date());
  const [actualiza, setActualiza] = useState(false)
  const [extrasequiposSeleccionado, setExtrasequiposSeleccionado] = useState({
    'id_ext': "",
    'codigo_ext': "",
    'equipo_ext': equipoCodigo,
    'tipo_ext': "ACM",
    'descripcion_ext': "",
    'empresa_ext': "",
    'frecuencia_ext': 1,
    'propietario_ext': "",
    'marca_ext': "",
    'antiguedad_ext': "",
    'grupoequipo_ext': "",
    'subgrupoparte_ext': "",
    'valoradquisicion_ext': "",
    'estadocontable_ext': "",
    'estadocliente_ext': "",
    'estadomtto_ext': "",
    'ctacontable_ext': ""
  })

  useEffect(() => {
    async function fetchDataEquipos() {
      const res = await equiposServices.listEquiposAccesorios();
      setListarEquipos(res.data);
      //console.log("ACCESORIO : ",res.data)
    }
    fetchDataEquipos();
  }, [])

  useEffect(() => {
    async function fetchDataExtrasEquipos() {
      let equipo = '"'+equipoCodigo+'"'
      //console.log("BUSCAR EQUIPO : ", equipo)
      const res = await equiposServices.listar_combogrupoequipo(equipo);
      setListarExtrasEquipos(res.data);
      //console.log("ACCESORIOS EQUIPO : ",res.data)
      //setActualiza(false);
      
    }
    fetchDataExtrasEquipos();
  }, [actualiza])

  useEffect(() => {
    async function fetchDataEmpresas() {
      const res = await empresasServices.listEmpresas();
      setListarEmpresas(res.data)
      //console.log(res.data);
    }
    fetchDataEmpresas();
  }, [])

  useEffect(() => {
    async function fetchDataEstados() {
      const res = await estadosServices.listEstados();
      setListarEstados(res.data)
      //console.log(res.data);
    }
    fetchDataEstados();
  }, [])

  useEffect(() => {
    async function fetchDataEstadosClientes() {
      const res = await estadosclientesServices.listEstadosClientes();
      setListarEstadosClientes(res.data)
      //console.log(res.data);
    }
    fetchDataEstadosClientes();
  }, [])

  useEffect(() => {
    async function fetchDataEstadosMtto() {
      const res = await estadosmttoServices.listEstadosMtto();
      setListarEstadosMtto(res.data)
      //console.log(res.data);
    }
    fetchDataEstadosMtto();
  }, [])

  useEffect(() => {
    async function fetchDataFrecuencias() {
      const res = await frecuenciasServices.listFrecuencias();
      setListarFrecuencias(res.data)
      //console.log(res.data);
    }
    fetchDataFrecuencias();
  }, [])

  useEffect(() => {
    async function fetchDataPropietarios() {
      const res = await propietariosServices.listProveedores();
      setListarPropietarios(res.data)
      //console.log(res.data);
    }
    fetchDataPropietarios();
  }, [])

  useEffect(() => {
    async function fetchDataMarcas() {
      const res = await marcasServices.listMarcas();
      setListarMarcas(res.data)
      //console.log(res.data);
    }
    fetchDataMarcas();
  }, [])

  useEffect(() => {
    async function fetchDataGruposEquipos() {
      const res = await gruposequiposServices.listGruposequipos();
      setListarGruposEquipos(res.data)
      //console.log(res.data);
    }
    fetchDataGruposEquipos();
  }, [])

  useEffect(() => {
    async function fetchDataSubGruposEquipos() {
      const res = await subgruposequiposServices.listSubGrupospartesequipos();
      setListarSubGruposEquipos(res.data)
      //console.log(res.data);
    }
    fetchDataSubGruposEquipos();
  }, [])

  const handleChange = e => {
    const { name, value } = e.target;

    setExtrasequiposSeleccionado(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const asignarValores = (accesorio) => {
    console.log("VALOR DEL ACCESORIO : ", accesorio)
    async function fetchDataEquipos() {
      const res = await equiposServices.listUnEquipo(accesorio);
      setListarUnEquipo(res.data);
      setCodigoGrupo(res.data[0].id_grp);
      setCodigoSubGrupo(res.data[0].id_sgre);
    }
    fetchDataEquipos();
  }

  const seleccionarExtrasEquipo = (extrasequipo, caso) => {
    setExtrasequiposSeleccionado(extrasequipo);
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

  const grabarExtraEquipo = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;

    if (!extrasequiposSeleccionado.codigo_ext) {
      errors.codigo_ext = true;
      formOk = false;
    }

    if (!extrasequiposSeleccionado.equipo_ext) {
      errors.equipo_ext = true;
      formOk = false;
    }

    if (!extrasequiposSeleccionado.descripcion_ext) {
      errors.descripcion_ext = true;
      formOk = false;
    }

    if (!extrasequiposSeleccionado.empresa_ext) {
      errors.empresa_ext = true;
      formOk = false;
    }

    if (!extrasequiposSeleccionado.frecuencia_ext) {
      errors.frecuencia_ext = true;
      formOk = false;
    }

    if (!extrasequiposSeleccionado.propietario_ext) {
      errors.propietario_ext = true;
      formOk = false;
    }

    if (!extrasequiposSeleccionado.marca_ext) {
      errors.marca_ext = true;
      formOk = false;
    }

    if (!extrasequiposSeleccionado.antiguedad_ext) {
      errors.antiguedad_ext = true;
      formOk = false;
    }

    if (!extrasequiposSeleccionado.valoradquisicion_ext) {
      errors.valoradquisicion_ext = true;
      formOk = false;
    }

    if (!extrasequiposSeleccionado.estadocontable_ext) {
      errors.estadocontable_ext = true;
      formOk = false;
    }

    if (!extrasequiposSeleccionado.estadocliente_ext) {
      errors.estadocliente_ext = true;
      formOk = false;
    }

    if (!extrasequiposSeleccionado.estadomtto_ext) {
      errors.estadomtto_ext = true;
      formOk = false;
    }

    if (!extrasequiposSeleccionado.ctacontable_ext) {
      errors.ctacontable_ext = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
      datosGrabarExtraEquipo();
    }
    else {
      swal("Extras Equipo", "Debe Ingresar Todos los Datos, Error Creando el Equipo!", "warning", { button: "Aceptar" });
      console.log(extrasequiposSeleccionado);
      console.log(res.message);
      abrirCerrarModalInsertar();
    }
  }

  const datosGrabarExtraEquipo = async () => {
    {
      setExtrasequiposSeleccionado([{
        codigo_ext: extrasequiposSeleccionado.codigo_ext,
        equipo_ext: extrasequiposSeleccionado.equipo_ext,
        tipo_ext: 'ACM',
        descripcion_ext: extrasequiposSeleccionado.descripcion_ext,
        empresa_ext: extrasequiposSeleccionado.empresa_ext,
        frecuencia_ext: 1,
        propietario_ext: extrasequiposSeleccionado.propietario_ext,
        marca_ext: extrasequiposSeleccionado.marca_ext,
        antiguedad_ext: extrasequiposSeleccionado.antiguedad_ext,
        grupoequipo_ext: codigogrupo,
        subgrupoparte_ext: codigoSubBrupo,
        valoradquisicion_ext: extrasequiposSeleccionado.valoradquisicion_ext,
        estadocontable_ext: extrasequiposSeleccionado.estadocontable_ext,
        estadocliente_ext: extrasequiposSeleccionado.estadocliente_ext,
        estadomtto_ext: extrasequiposSeleccionado.estadomtto_ext,
        ctacontable_ext: extrasequiposSeleccionado.ctacontable_ext
      }]);
    }
    setGrabar(true);
  }

  useEffect(() => {
    async function grabarAccesorio() {
      if (grabar) {
        //console.log("DATOS ACCESORIOS : ", extrasequiposSeleccionado[0])

        const res = await extrasequiposServices.save(extrasequiposSeleccionado[0]);

        if (res.success) {
          swal("Actividades Orden de Servicio", "Creada de forma Correcta!", "success", { button: "Aceptar" });
          console.log(res.message)
        } else {
          swal("Actividades Orden de Servicio", "Error registrando la Actividad!", "error", { button: "Aceptar" });
          console.log(res.message);
        }
        setGrabar(false);
        setActualiza(true);
        abrirCerrarModalInsertar();
      }
    }
    grabarAccesorio();
  }, [grabar])

  const actualizarExtraEquipo = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;

    if (!extrasequiposSeleccionado.codigo_ext) {
      errors.codigo_ext = true;
      formOk = false;
    }

    if (!extrasequiposSeleccionado.equipo_ext) {
      errors.equipo_ext = true;
      formOk = false;
    }

    if (!extrasequiposSeleccionado.descripcion_ext) {
      errors.descripcion_ext = true;
      formOk = false;
    }

    if (!extrasequiposSeleccionado.empresa_ext) {
      errors.empresa_ext = true;
      formOk = false;
    }

    if (!extrasequiposSeleccionado.frecuencia_ext) {
      errors.frecuencia_ext = true;
      formOk = false;
    }

    if (!extrasequiposSeleccionado.propietario_ext) {
      errors.propietario_ext = true;
      formOk = false;
    }

    if (!extrasequiposSeleccionado.marca_ext) {
      errors.marca_ext = true;
      formOk = false;
    }

    if (!extrasequiposSeleccionado.antiguedad_ext) {
      errors.antiguedad_ext = true;
      formOk = false;
    }

    if (!extrasequiposSeleccionado.valoradquisicion_ext) {
      errors.valoradquisicion_ext = true;
      formOk = false;
    }

    if (!extrasequiposSeleccionado.estadocontable_ext) {
      errors.estadocontable_ext = true;
      formOk = false;
    }

    if (!extrasequiposSeleccionado.estadocliente_ext) {
      errors.estadocliente_ext = true;
      formOk = false;
    }

    if (!extrasequiposSeleccionado.estadomtto_ext) {
      errors.estadomtto_ext = true;
      formOk = false;
    }

    if (!extrasequiposSeleccionado.ctacontable_ext) {
      errors.ctacontable_ext = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
      datosActualizarExtraEquipo();
    }
    else {
      swal("Extras Equipo", "Debe Ingresar Todos los Datos, Error Actualizando el Equipo!", "warning", { button: "Aceptar" });
      console.log(res.message);
      abrirCerrarModalEditar();
    }
  }

  const datosActualizarExtraEquipo = async () => {
    {
      setExtrasequiposSeleccionado([{
        codigo_ext: extrasequiposSeleccionado.codigo_ext,
        equipo_ext: extrasequiposSeleccionado.equipo_ext,
        tipo_ext: 'ACM',
        descripcion_ext: extrasequiposSeleccionado.descripcion_ext,
        empresa_ext: extrasequiposSeleccionado.empresa_ext,
        frecuencia_ext: 1,
        propietario_ext: extrasequiposSeleccionado.propietario_ext,
        marca_ext: extrasequiposSeleccionado.marca_ext,
        antiguedad_ext: extrasequiposSeleccionado.antiguedad_ext,
        grupoequipo_ext: codigogrupo,
        subgrupoparte_ext: codigoSubBrupo,
        valoradquisicion_ext: extrasequiposSeleccionado.valoradquisicion_ext,
        estadocontable_ext: extrasequiposSeleccionado.estadocontable_ext,
        estadocliente_ext: extrasequiposSeleccionado.estadocliente_ext,
        estadomtto_ext: extrasequiposSeleccionado.estadomtto_ext,
        ctacontable_ext: extrasequiposSeleccionado.ctacontable_ext
      }]);
    }
    setActualizar(true);
  }
  
  useEffect(() => {
    async function actualizarAccesorio() {
      if (actualizar) {
       /* console.log("DATOS ACCESORIOS : ", extrasequiposSele|ccionado[0]) */

        const res = await extrasequiposServices.update(extrasequiposSeleccionado[0]);      

        if (res.success) {
          swal("Actividades Orden de Servicio", "Creada de forma Correcta!", "success", { button: "Aceptar" });
          console.log(res.message)
        } else {
          swal("Actividades Orden de Servicio", "Error registrando la Actividad!", "error", { button: "Aceptar" });
          console.log(res.message);
        }
        setActualizarExtraEquipo(false);
        setActualiza(true);
        abrirCerrarModalEditar();
      }
    }
    actualizarAccesorio();
  }, [actualizar])


  const borrarEquipo = async () => {

    const res = await extrasequiposServices.delete(extrasequiposSeleccionado.id_ext);

    if (res.success) {
      swal("Extras Equipo", "Equipo Borrado de forma Correcta!", "success", { button: "Aceptar" });
      console.log(res.message)
      abrirCerrarModalEliminar();
    }
    else {
      swal("Extras Equipo", "Error Borrando el Equipo!", "error", { button: "Aceptar" });
      console.log(res.message);
      abrirCerrarModalEliminar();
    }
    setActualiza(true);
  }

  // "string","boolean","numeric","date","datetime","time","currency"
  const columnas = [
    {
      field: 'codigo_equ',
      title: 'Codigo',
      cellStyle: { minWidth: 50 }
    },
    {
      field: 'descripcion_equ',
      title: 'Descripción Accesorio',
      cellStyle: { minWidth: 220 }
    },
    {
      field: 'combogrupo_equ',
      title: 'Combo',
      cellStyle: { minWidth: 50 }
    },
    {
      field: 'descripcion_sgre',
      title: 'SubGrupo',
      cellStyle: { minWidth: 100 }
    },
    {
      field: 'descripcion_mar',
      title: 'Marca Accesorio'
    },
    
    {
      field: 'codigogrupo_grp',
      title: 'Grupo Equipo',
      cellStyle: { minWidth: 50 }
    },
    {
      field: 'descripcion_grp',
      title: 'Descripción del Grupo del Equipo',
      cellStyle: { minWidth: 180 }
    },
    {
      field: 'valoradquisicion_equ',
      title: 'Valor Adquisición',
      cellStyle: { width: 10, maxWidth: 10 }
    }
  ]

  const extraequipoInsertar = (
    <div className={styles.modal}>
      <Typography align="center" className={styles.typography} variant="button" display="block"> Agregar Nuevo Accesorio </Typography>
      <Grid container spacing={2} >
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectEquipo">Codigo del Accesorio</InputLabel>
            <Select
              labelId="selectAccesorio"
              name="codigo_ext"
              id="idselectAccesorio"
              fullWidth
              onChange={handleChange}
              onClick={(e) => asignarValores(e.target.value)}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarEquipos.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_equ}>{itemselect.codigo_equ}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            name="equipo_ext" label="Codigo Equipo" fullWidth onChange={handleChange} defaultValue={equipoCodigo} disabled="true" />
        </Grid>
        <Grid item xs={12} md={12}>
          <FormControl className={styles.formControlFull}>
            <Select
              labelId="selectdescripcion_ext"
              name="descripcion_ext"
              id="nvoselectdescripcion_ext"
              fullWidth
              onChange={handleChange}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarEquipos.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.descripcion_equ}>{itemselect.codigo_equ}{" "}{itemselect.descripcion_equ}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectEmpresa" >Empresa</InputLabel>
            <Select
              labelId="selecEmpresa"
              name="empresa_ext"
              id="idselectEmpresa"
              fullWidth
              onChange={handleChange}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarEmpresas.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_emp}>{itemselect.nombre_emp}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectPropietario">Propietario</InputLabel>
            <Select
              labelId="selectPropietario"
              name="propietario_ext"
              id="idselectPropietario"
              fullWidth
              onChange={handleChange}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarPropietarios.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_int}>{itemselect.razonsocial_int}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl className={styles.formControlEstados}>
            <InputLabel id="idselectMarca">Marca</InputLabel>
            <Select
              labelId="selectMarca"
              name="marca_ext"
              id="idselectMarca"
              fullWidth
              onChange={handleChange}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarMarcas.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_mar}>{itemselect.descripcion_mar}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}> <TextField name="antiguedad_ext" label="Antiguedad" fullWidth onChange={handleChange} /> </Grid>
        <Grid item xs={12} md={4}> <TextField name="ctacontable_ext" label="Cuenta Contable" fullWidth onChange={handleChange} /> </Grid>
        <Grid item xs={12} md={6}>
          <TextField className={styles.inputMaterial} name="valoradquisicion_ext" label="Valor de Compra" fullWidth
            InputLabelProps={{ shrink: true }} InputProps={{ inputComponent: NumberFormatCustom, }}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectEstadoContable">Estado en Contabilidad</InputLabel>
            <Select
              labelId="selectEstadoContable"
              name="estadocontable_ext"
              id="idselectEstadoContable"
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
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectEstadoCliente">Estado del Cliente</InputLabel>
            <Select
              labelId="selectEstadoCliente"
              name="estadocliente_ext"
              id="idselectEstadoCliente"
              fullWidth
              onChange={handleChange}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarEstadosClientes.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_estcli}>{itemselect.nombre_estcli}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectEstadoMtto">Estado de Mantenimiento</InputLabel>
            <Select
              labelId="selectEstadoMtto"
              name="estadomtto_ext"
              id="idselectEstadoMantenimiento"
              fullWidth
              onChange={handleChange}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarEstadosMtto.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_estmtto}>{itemselect.nombre_estmtto}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <br /><br />
      <div align="right">
        <Button className={styles.button} color="primary" onClick={() => grabarExtraEquipo()} >Insertar</Button>
        <Button className={styles.button2} onClick={() => abrirCerrarModalInsertar()} >Cancelar</Button>
      </div>
    </div>
  )

  //value={extrasequiposSeleccionado && extrasequiposSeleccionado.codigo_ext} 

  const extraequipoEditar = (
    <div className={styles.modal}>
      <Typography align="center" className={styles.typography} variant="button" display="block" > Actualizar Accesorio </Typography>
      <Grid container spacing={2} >
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectEquipo">Codigo del Accesorio</InputLabel>
            <Select
              labelId="selectAccesorio"
              name="codigo_ext"
              id="idselectAccesorio"
              fullWidth
              onChange={handleChange}
              onClick={(e) => asignarValores(e.target.value)}
              value={extrasequiposSeleccionado && extrasequiposSeleccionado.codigo_ext} 
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarEquipos.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_equ}>{itemselect.codigo_equ}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            name="equipo_ext" label="Codigo Equipo" fullWidth onChange={handleChange} defaultValue={equipoCodigo} disabled="true" 
            value={extrasequiposSeleccionado && extrasequiposSeleccionado.equipo_ext}  />
        </Grid>
        <Grid item xs={12} md={12}>
          <FormControl className={styles.formControlFull}>
            <Select
              labelId="selectdescripcion_ext"
              name="descripcion_ext"
              id="nvoselectdescripcion_ext"
              fullWidth
              onChange={handleChange}
              value={extrasequiposSeleccionado && extrasequiposSeleccionado.descripcion_ext} 
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarEquipos.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.descripcion_equ}>{itemselect.codigo_equ}{" "}{itemselect.descripcion_equ}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectEmpresa" >Empresa</InputLabel>
            <Select
              labelId="selecEmpresa"
              name="empresa_ext"
              id="idselectEmpresa"
              fullWidth
              onChange={handleChange}
              value={extrasequiposSeleccionado && extrasequiposSeleccionado.empresa_ext}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarEmpresas.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_emp}>{itemselect.nombre_emp}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectPropietario">Propietario</InputLabel>
            <Select
              labelId="selectPropietario"
              name="propietario_ext"
              id="idselectPropietario"
              fullWidth
              onChange={handleChange}
              value={extrasequiposSeleccionado && extrasequiposSeleccionado.propietario_ext}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarPropietarios.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_int}>{itemselect.razonsocial_int}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl className={styles.formControlEstados}>
            <InputLabel id="idselectMarca">Marca</InputLabel>
            <Select
              labelId="selectMarca"
              name="marca_ext"
              id="idselectMarca"
              fullWidth
              onChange={handleChange}
              value={extrasequiposSeleccionado && extrasequiposSeleccionado.marca_ext}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarMarcas.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_mar}>{itemselect.descripcion_mar}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}> 
          <TextField name="antiguedad_ext" label="Antiguedad" fullWidth onChange={handleChange}
          value={extrasequiposSeleccionado && extrasequiposSeleccionado.antiguedad_ext} /> 
        </Grid>
        <Grid item xs={12} md={4}> 
          <TextField name="ctacontable_ext" label="Cuenta Contable" fullWidth onChange={handleChange} 
           value={extrasequiposSeleccionado && extrasequiposSeleccionado.ctacontable_ext} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField className={styles.inputMaterial} name="valoradquisicion_ext" label="Valor de Compra" fullWidth
            InputLabelProps={{ shrink: true }} InputProps={{ inputComponent: NumberFormatCustom, }}
            onChange={handleChange} value={extrasequiposSeleccionado && extrasequiposSeleccionado.valoradquisicion_ext}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectEstadoContable">Estado en Contabilidad</InputLabel>
            <Select
              labelId="selectEstadoContable"
              name="estadocontable_ext"
              id="idselectEstadoContable"
              fullWidth
              onChange={handleChange}
              value={extrasequiposSeleccionado && extrasequiposSeleccionado.estadocontable_ext}
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
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectEstadoCliente">Estado del Cliente</InputLabel>
            <Select
              labelId="selectEstadoCliente"
              name="estadocliente_ext"
              id="idselectEstadoCliente"
              fullWidth
              onChange={handleChange}
              value={extrasequiposSeleccionado && extrasequiposSeleccionado.estadocliente_ext}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarEstadosClientes.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_estcli}>{itemselect.nombre_estcli}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectEstadoMtto">Estado de Mantenimiento</InputLabel>
            <Select
              labelId="selectEstadoMtto"
              name="estadomtto_ext"
              id="idselectEstadoMantenimiento"
              fullWidth
              onChange={handleChange}
              value={extrasequiposSeleccionado && extrasequiposSeleccionado.estadomtto_ext}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarEstadosMtto.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_estmtto}>{itemselect.nombre_estmtto}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <br /><br />
      <div align="right">
        <Button className={styles.button} color="primary" onClick={() => actualizarExtraEquipo()} >Editar</Button>
        <Button className={styles.button2} onClick={() => abrirCerrarModalEditar()}>Cancelar</Button>
      </div>

    </div>
  )
  //<MenuEquipos equipoID={extrasequiposSeleccionado.id_ext} equipoCodigo={extrasequiposSeleccionado.codigo_ext} />

  const extraequipoEliminar = (
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar el Accesorio del Equipo <b>{extrasequiposSeleccionado && extrasequiposSeleccionado.descripcion_ext}</b>? </p>
      <div align="right">
        <Button className={styles.button} color="secondary" onClick={() => borrarEquipo()}> Confirmar </Button>
        <Button className={styles.button2} onClick={() => abrirCerrarModalEliminar()}> Cancelar </Button>
      </div>
    </div>
  )

  return (
    <div className="App">
      <br />
      <Button variant="contained" startIcon={<SaveIcon />} color="primary" onClick={() => abrirCerrarModalInsertar()} >Agregar Accesorio</Button>
      <MaterialTable
        columns={columnas}
        data={listarExtrasEquipos}
        title="ACCESORIOS ADICIONALES A LOS EQUIPOS"
        /*actions={[
          {
            icon: 'edit',
            tooltip: 'Editar Accesorio',
            onClick: (event, rowData) => seleccionarExtrasEquipo(rowData, "Editar")
          },
          {
            icon: 'delete',
            tooltip: 'Borrar Accesorio',
            onClick: (event, rowData) => seleccionarExtrasEquipo(rowData, "Eliminar")
          }
        ]}*/
        options={{
          actionsColumnIndex: 11
        }}
        localization={{
          header: {
            actions: "Acciones"
          }
        }}
        detailPanel={[
          {
            tooltip: 'Estados de los accesorios',
            render: rowData => {
              return (
                <div
                  style={{
                    fontSize: 14,
                    textAlign: 'center',
                    color: 'white',
                    backgroundColor: '#0277bd',
                  }}
                >
                  <Button variant="contained">Estado Contable : {rowData.nombre_est}</Button> {}
                  <Button variant="contained">Estado Cliente  : {rowData.nombre_estcli}</Button> {}
                  <Button variant="contained">Estado Mantenimiento :{rowData.nombre_estmtto}</Button>
                </div>
              )
            },
          },
        ]}
      />
      {}
      <Modal
        open={modalInsertar}
        onClose={abrirCerrarModalInsertar}
      >
        {extraequipoInsertar}
      </Modal>
      <Modal
        open={modalEditar}
        onClose={abrirCerrarModalEditar}
      >
        {extraequipoEditar}
      </Modal>
      <Modal
        open={modalEliminar}
        onClose={abrirCerrarModalEliminar}
      >
        {extraequipoEliminar}
      </Modal>
    </div>
  );
}

export default ExtrasEquipos;

/*
  <Fab variant="extended">
        <NavigationIcon className={styles.extendedIcon} />
        Datos Adicionales Equipos
        onClick
      </Fab>
*/