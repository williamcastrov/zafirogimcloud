import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import MaterialTable from "material-table";
import { Modal, Button, TextField, Select, MenuItem, FormControl, InputLabel, Grid, Typography } from "@material-ui/core";
import { green, blue, blueGrey, red } from '@material-ui/core/colors';
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from '@material-ui/icons/Save';
import NumberFormat from 'react-number-format';
import swal from 'sweetalert';
import { useHistory } from "react-router-dom";

// Componentes de Conexion con el Backend
import empresasServices from "../../../services/Empresa";
import estadosServices from "../../../services/Parameters/Estados";
import marcasServices from "../../../services/Mantenimiento/Marcas";
import frecuenciasServices from "../../../services/Mantenimiento/Frecuencias";
import propietariosServices from "../../../services/Interlocutores/Proveedores";
import gruposequiposServices from "../../../services/Mantenimiento/GruposEquipos";
import subgruposequiposServices from "../../../services/Mantenimiento/SubGruposPartes";
import equiposServices from "../../../services/Mantenimiento/Equipos";
import estadosclientesServices from "../../../services/Mantenimiento/EstadosClientes";
import estadosmttoServices from "../../../services/Mantenimiento/EstadosMtto";
import estadoscalidadServices from "../../../services/Mantenimiento/EstadosCalidad";
import unidadesServices from "../../../services/Parameters/Unidades";

// Datos Adicionales de los Equipos
import MenuEquipos from "../../DatosEquipos/MenuEquipos";

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
  modal2: {
    position: 'absolute',
    width: 500,
    maxWidth: 500,
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
    maxWidth: 300,
  },
  formControlEstados: {
    margin: theme.spacing(0),
    minWidth: 200,
  },
  formControlManeja: {
    margin: theme.spacing(0),
    minWidth: 140,
  },
  formControl2: {
    margin: theme.spacing(0),
    minWidth: 430,
  },
  formControlEstados: {
    margin: theme.spacing(0),
    minWidth: 200,
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

function Accesorios(props) {
  const { metadata, idUsu } = props;
  console.log("ID USUARIO : ", idUsu)
  const styles = useStyles();
  const history = useHistory();

  const [listarEquipos, setListarEquipos] = useState([]);
  const [listarSubEquipos, setListarSubEquipos] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [formError, setFormError] = useState(false);
  const [grabar, setGrabar] = useState(false);
  const [modalCodigoEquipo, setModalCodigoEquipo] = useState(false);
  const [listarEmpresas, setListarEmpresas] = useState([]);
  const [listarEstados, setListarEstados] = useState([]);
  const [listarEstadosClientes, setListarEstadosClientes] = useState([]);
  const [listarEstadosMtto, setListarEstadosMtto] = useState([]);
  const [listarEstadosCalidad, setListarEstadosCalidad] = useState([]);
  const [modalEditarTipoEquipo, setModalEditarTipoEquipo] = useState(false);
  const [listarFrecuencias, setListarFrecuencias] = useState([]);
  const [listarPropietarios, setListarPropietarios] = useState([]);
  const [listarMarcas, setListarMarcas] = useState([]);
  const [listarGruposEquipos, setListarGruposEquipos] = useState([]);
  const [listarSubGruposEquipos, setListarSubGruposEquipos] = useState([]);
  const [fechaHoy, setFechaHoy] = useState(new Date());
  const [actualiza, setActualiza] = useState(false);
  const [listarUnidades, setListarUnidades] = useState([]);
  const [control, setControl] = useState(true);
  const [consecutivo, setConsecutivo] = useState(0);
  const [prefijo, setPrefijo] = useState("");
  const [tipo, setTipo] = useState("AC");

  let frecuencia = 1;

  const [equiposSeleccionado, setEquiposSeleccionado] = useState({
    'id_equ': "",
    'codigo_equ': "",
    'tipo_equ': 9,
    'descripcion_equ': "",
    'empresa_equ': 1,
    'frecuencia_equ': frecuencia,
    'propietario_equ': "",
    'marca_equ': "",
    'antiguedad_equ': "",
    'grupoequipo_equ': "",
    'subgrupoparte_equ': "",
    'valoradquisicion_equ': "",
    'estadocontable_equ': "",
    'estadocliente_equ': "",
    'estadomtto_equ': "",
    'estadocalidad_equ': "",
    'ctacontable_equ': "",
    'ctadepreciacion_equ': "",
    'manejamatricula_equ': "",
    'manejamarcacion_equ': "",
    'fecharetornaequipo_equ': "",
    'combogrupo_equ': 0,
    'datoauxiliarpropietario_equ': 0,
    'datoauxiliaradmon_equ': 0,
    'datoauxiliarcontabilidad_equ': 0,
    'datoauxiliaralza_equ': 0,
    'datoauxiliaraquimejora_equ': 0,
    'datoauxiliarcalidad_equ': 0
  })


  useEffect(() => {
    async function fetchDataEquipos() {
      const res = await equiposServices.listEquiposAccesorios();
      setListarEquipos(res.data);
      setActualiza(false);
      //console.log(res.data)
    }
    fetchDataEquipos();
  }, [actualiza])
  /*
    useEffect(() => {
      async function fetchDataEquipos() {
        const res = await equiposServices.listEquipos();
        setListarSubEquipos(res.equipo);
        console.log(res.equipo)
      }
      fetchDataEquipos();
    }, [])
  */
  useEffect(() => {
    async function fetchDataEmpresas() {
      const res = await empresasServices.listEmpresas();
      setListarEmpresas(res.data)
      //console.log(res.data);
    }
    fetchDataEmpresas();
  }, [])

  useEffect(() => {
    async function fetchDataUnidades() {
      const res = await unidadesServices.listTiposEquipos();
      setListarUnidades(res.data)
    }
    fetchDataUnidades();
  }, [])

  useEffect(() => {
    async function fetchDataEstados() {
      const res = await estadosServices.listEstadosEquipos();
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
    async function fetchDataEstadosCalidad() {
      const res = await estadoscalidadServices.listEstadosCalidad();
      setListarEstadosCalidad(res.data)
      //console.log(res.data);
    }
    fetchDataEstadosCalidad();
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
      const res = await subgruposequiposServices.listSubGrupospartescomponentes();
      setListarSubGruposEquipos(res.data)
      //console.log(res.data);
    }
    fetchDataSubGruposEquipos();
  }, [])

  const handleChange = e => {
    const { name, value } = e.target;

    setEquiposSeleccionado(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const leerDatosEquipos = () => {
    leerModalCodigoEquipo();
  }

  const DatosEquipos = (subgrupo) => {
    console.log("SUBGRUPO : ", subgrupo)
    setControl(false);

    async function fetchLeerDatoSubGrupo() {
      const res = await subgruposequiposServices.listUnSubGrupopartes(subgrupo);
      //setListarSubGruposEquipos(res.data);
      //setCliente(res.data[0].cliente_ctr);
      //setEquipo(res.data[0].codigo_equ);
      //setContacto(res.data[0].id_con);
      //setCiudad(res.data[0].ciudad_con);
      //setSubGrupoEquipo(res.data[0].subgrupoparte_equ);
      let valor = res.data[0].tipoconsecutivo_sgre + (res.data[0].consecutivo_sgre + 1);
      setConsecutivo(valor)
      setPrefijo(res.data[0].tipoconsecutivo_sgre)
      console.log("TIPO CONSECUTIVO : ", res.data[0].tipoconsecutivo_sgre)
    }
    fetchLeerDatoSubGrupo();

  }

  const leerModalCodigoEquipo = () => {
    setModalCodigoEquipo(!modalCodigoEquipo);
  }

  const seleccionarEquipo = (equipo, caso) => {
    setEquiposSeleccionado(equipo);
    if (idUsu === 2) {
      (caso === "Editar") ? abrirCerrarModalEditarTipoEquipo() : abrirCerrarModalEliminar()
    }
    else {
      (caso === "Editar") ? abrirCerrarModalEditar() : abrirCerrarModalEliminar()
    }
  }

  const abrirCerrarModalInsertar = () => {
    if (control) {
      swal("SubGrupo", "Debe Seleccionar el SubGrupo del accesorio antes de continuar!", "warning", { button: "Aceptar" });
    } else {
      setModalInsertar(!modalInsertar);
    }
  }

  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
  }

  const abrirCerrarModalEditarTipoEquipo = () => {
    setModalEditarTipoEquipo(!modalEditarTipoEquipo);
  }

  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
  }

  useEffect(() => {
    async function grabarEquipo() {

      if (grabar) {
        console.log("COMPONENTE SELECCIONADO : ", equiposSeleccionado)

        const res = await equiposServices.save(equiposSeleccionado[0]);

        if (res.success) {

          swal("Componente", "Componente Creado de forma Correcta!", "success", { button: "Aceptar" });

          const result = await subgruposequiposServices.actualizaConsecutivo(prefijo);

          if (result.success)
            swal("Consecutivo", "Consecutivo Componente Actualizado de forma Correcta!", "success", { button: "Aceptar" });
          else
            swal("Consecutivo", "Error Actualizado Consecutivo Componente - Revisar!", "error", { button: "Aceptar" });

          console.log(res.message)
          /*delete equiposSeleccionado.codigo_equ;
          delete equiposSeleccionado.descripcion_equ;
          delete equiposSeleccionado.empresa_equ;
          delete equiposSeleccionado.frecuencia_equ;
          delete equiposSeleccionado.propietario_equ;
          delete equiposSeleccionado.marca_equ;
          delete equiposSeleccionado.antiguedad_equ;
          delete equiposSeleccionado.grupoequipo_equ;
          delete equiposSeleccionado.subgrupoparte_equ;
          delete equiposSeleccionado.valoradquisicion_equ;
          delete equiposSeleccionado.estadocontable_equ;
          delete equiposSeleccionado.estadocliente_equ;
          delete equiposSeleccionado.estadomtto_equ;
          delete equiposSeleccionado.estadocaliad_equ;
          delete equiposSeleccionado.ctacontable_equ;
          delete equiposSeleccionado.manejamatricula_equ;
          delete equiposSeleccionado.manejamarcacion_equ;
          */
          console.log(res.message)
        } else {
          swal("Componente", "Error Creando el Equipo!", "error", { button: "Aceptar" });
          console.log(res.message);
        }
        setGrabar(false);
        setActualiza(true);
        history.push("/gim");
        abrirCerrarModalInsertar();
      }
    }
    grabarEquipo();
  }, [grabar])

  const actualizaEstadoEquipo = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;

    if (!equiposSeleccionado.descripcion_equ) {
      alert("1");
      errors.descripcion_equ = true;
      formOk = false;
    }

    if (!equiposSeleccionado.frecuencia_equ) {
      alert("2");
      errors.frecuencia_equ = true;
      formOk = false;
    }

    if (!equiposSeleccionado.propietario_equ) {
      alert("3");
      errors.propietario_equ = true;
      formOk = false;
    }

    if (!equiposSeleccionado.marca_equ) {
      alert("4");
      errors.marca_equ = true;
      formOk = false;
    }

    if (!equiposSeleccionado.antiguedad_equ) {
      alert("5");
      errors.antiguedad_equ = true;
      formOk = false;
    }

    if (!equiposSeleccionado.grupoequipo_equ) {
      alert("6");
      errors.grupoequipo_equ = true;
      formOk = false;
    }

    if (!equiposSeleccionado.subgrupoparte_equ) {
      alert("7");
      errors.subgrupoparte_equ = true;
      formOk = false;
    }

    if (!equiposSeleccionado.valoradquisicion_equ) {
      alert("8");
      errors.valoradquisicion_equ = true;
      formOk = false;
    }

    if (!equiposSeleccionado.estadocontable_equ) {
      alert("9");
      errors.estadocontable_equ = true;
      formOk = false;
    }

    if (!equiposSeleccionado.estadocliente_equ) {
      errors.estadocliente_equ = true;
      alert("10");
      formOk = false;
    }

    if (!equiposSeleccionado.estadomtto_equ) {
      alert("11");
      errors.estadomtto_equ = true;
      formOk = false;
    }

    if (!equiposSeleccionado.estadocalidad_equ) {
      alert("12");
      errors.estadocalidad_equ = true;
      formOk = false;
    }

    if (!equiposSeleccionado.ctacontable_equ) {
      alert("13");
      errors.ctacontable_equ = true;
      formOk = false;
    }

    if (!equiposSeleccionado.manejamatricula_equ) {
      alert("14");
      errors.manejamatricula_equ = true;
      formOk = false;
    }

    if (!equiposSeleccionado.manejamarcacion_equ) {
      alert("15");
      errors.manejamarcacion_equ = true;
      formOk = false;
    }

    setFormError(errors);

    if (!formOk) {
      //console.log(equiposSeleccionado);
      swal("Componente", "Debe Ingresar Todos los Datos, Error Creando el Equipo!", "warning", { button: "Aceptar" });
      //console.log(equiposSeleccionado);
      //console.log(res.message);
      abrirCerrarModalInsertar();
    }

    {
      setEquiposSeleccionado([{
        id_equ: equiposSeleccionado.id_equ,
        codigo_equ: consecutivo,
        tipo_equ: equiposSeleccionado.tipo_equ,
        descripcion_equ: equiposSeleccionado.descripcion_equ,
        empresa_equ: equiposSeleccionado.empresa_equ,
        frecuencia_equ: frecuencia,
        propietario_equ: equiposSeleccionado.propietario_equ,
        marca_equ: equiposSeleccionado.marca_equ,
        antiguedad_equ: equiposSeleccionado.antiguedad_equ,
        grupoequipo_equ: equiposSeleccionado.grupoequipo_equ,
        subgrupoparte_equ: equiposSeleccionado.subgrupoparte_equ,
        valoradquisicion_equ: equiposSeleccionado.valoradquisicion_equ,
        estadocontable_equ: equiposSeleccionado.estadocontable_equ,
        estadocliente_equ: equiposSeleccionado.estadocliente_equ,
        estadomtto_equ: equiposSeleccionado.estadomtto_equ,
        estadocalidad_equ: equiposSeleccionado.estadocalidad_equ,
        ctacontable_equ: equiposSeleccionado.ctacontable_equ,
        manejamatricula_equ: equiposSeleccionado.manejamatricula_equ,
        manejamarcacion_equ: equiposSeleccionado.manejamatricula_equ,
        fecharetornaequipo_equ: "",
        combogrupo_equ: equiposSeleccionado.combogrupo_equ,
        datoauxiliarpropietario_equ: equiposSeleccionado.datoauxiliarpropietario_equ,
        datoauxiliaradmon_equ: equiposSeleccionado.datoauxiliaradmon_equ,
        datoauxiliarcontabilidad_equ: equiposSeleccionado.datoauxiliarcontabilidad_equ,
        datoauxiliaralza_equ: equiposSeleccionado.datoauxiliaralza_equ,
        datoauxiliaraquimejora_equ: equiposSeleccionado.datoauxiliaraquimejora_equ,
        datoauxiliarcalidad_equ: equiposSeleccionado.datoauxiliarcalidad_equ
      }]);
    }
    setGrabar(true);
  }

  const actualizarEquipo = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;

    setFormError(errors);

    if (formOk) {
      console.log(equiposSeleccionado.codigo_equ);
      const res = await equiposServices.update(equiposSeleccionado);

      if (res.success) {
        swal("Componente", "Equipo Actualizado de forma Correcta!", "success", { button: "Aceptar" });
        console.log(res.message)

        if (idUsu === 3 || idUsu === 2)
          abrirCerrarModalEditarTipoEquipo();
        else
          abrirCerrarModalEditar();
        /*
      delete equiposSeleccionado.codigo_equ;
      delete equiposSeleccionado.descripcion_equ;
      delete equiposSeleccionado.empresa_equ;
      delete equiposSeleccionado.frecuencia_equ;
      delete equiposSeleccionado.propietario_equ;
      delete equiposSeleccionado.marca_equ;
      delete equiposSeleccionado.antiguedad_equ;
      delete equiposSeleccionado.grupoequipo_equ;
      delete equiposSeleccionado.subgrupoparte_equ;
      delete equiposSeleccionado.valoradquisicion_equ;
      delete equiposSeleccionado.estadocontable_equ;
      delete equiposSeleccionado.estadocliente_equ;
      delete equiposSeleccionado.estadomtto_equ;
      delete equiposSeleccionado.ctacontable_equ;
      */
      } else {
        swal("Componente", "Error Actualizando el Equipo!", "error", { button: "Aceptar" });
        console.log(res.message);

        if (idUsu === 3 || idUsu === 2)
          abrirCerrarModalEditarTipoEquipo();
        else
          abrirCerrarModalEditar();
      }
    }
    else {
      swal("Componente", "Debe Ingresar Todos los Datos, Error Actualizando el Equipo!", "warning", { button: "Aceptar" });
      console.log(res.message);

      if (idUsu === 3 || idUsu === 2)
        abrirCerrarModalEditarTipoEquipo();
      else
        abrirCerrarModalEditar();
    }
    setActualiza(true);
  }

  const borrarEquipo = async () => {

    const res = await equiposServices.delete(equiposSeleccionado.id_equ);

    if (res.success) {
      swal("Equipo", "Equipo Borrado de forma Correcta!", "success", { button: "Aceptar" });
      console.log(res.message)
      abrirCerrarModalEliminar();
    }
    else {
      swal("Equipo", "Error Borrando el Equipo!", "error", { button: "Aceptar" });
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
      title: 'Descripción  del Componente',
      cellStyle: { minWidth: 220 }
    },
    {
      field: 'nombre_emp',
      title: 'Propietario',
      cellStyle: { minWidth: 150 }
    },
    {
      field: 'razonsocial_int',
      title: 'Propietario',
      cellStyle: { minWidth: 150 }
    },
    {
      field: 'descripcion_mar',
      title: 'Marca del Equipo'
    },
    {
      field: 'combogrupo_equ',
      title: 'Combo',
      cellStyle: { minWidth: 50 }
    },
    {
      field: 'antiguedad_equ',
      title: 'Antiguedad Años',
      cellStyle: { width: 10, maxWidth: 10 },
      headerStyle: { width: 10, maxWidth: 10 }

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
      title: 'Costo con IVA',
    }
  ]

  const equipoInsertar = (
    <div className={styles.modal}>
      <Typography align="center" className={styles.typography} variant="button" display="block"> Agregar Nuevo Componente </Typography>
      <Grid container spacing={2} >
        <Grid item xs={12} md={3}> <TextField name="codigo_equ" label="Codigo Componente"
          fullWidth defaultValue={consecutivo} onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={3}>
          <FormControl className={styles.formControlManeja}>
            <InputLabel id="idselectFrecuencia">Frecuencia</InputLabel>
            <Select
              labelId="selectFrecuencia"
              name="frecuencia_equ"
              id="idselectFrecuencia"
              fullWidth
              disabled="true"
              defaultValue={frecuencia}
              onChange={handleChange}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarFrecuencias.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_fre}>{itemselect.descripcion_fre}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={3}>
          <FormControl className={styles.formControlManeja}>
            <InputLabel id="idselectMatricula" >Matricula</InputLabel>
            <Select
              labelId="selecMatricula"
              name="manejamatricula_equ"
              id="idselectMatricula"
              fullWidth
              onChange={handleChange}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              <MenuItem value="S">Matricula Si</MenuItem>
              <MenuItem value="N">Matricula No</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={3}>
          <FormControl className={styles.formControlManeja}>
            <InputLabel id="idselectDNI" >Marcación</InputLabel>
            <Select
              labelId="selectDNI"
              name="manejamarcacion_equ"
              id="idselectDNI"
              fullWidth
              onChange={handleChange}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              <MenuItem value="S">Marcado Si</MenuItem>
              <MenuItem value="N">Marcado No</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectPropietario">Propietario</InputLabel>
            <Select
              labelId="selectPropietario"
              name="propietario_equ"
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
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectGrupoEquipo">Grupos de Componentes</InputLabel>
            <Select
              labelId="selectGrupoEquipo"
              name="grupoequipo_equ"
              id="idselectGrupoEquipo"
              fullWidth
              onChange={handleChange}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarGruposEquipos.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_grp}>{itemselect.descripcion_grp}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectSubGrupoParte">SubGrupo Equipo</InputLabel>
            <Select
              labelId="selectSubGrupoParte"
              name="subgrupoparte_equ"
              id="idselectSubGrupoParte"
              fullWidth
              onChange={handleChange}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarSubGruposEquipos && listarSubGruposEquipos.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_sgre}>{itemselect.descripcion_sgre}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={3}>
          <FormControl className={styles.formControlManeja}>
            <InputLabel id="idselectMarca">Marca</InputLabel>
            <Select
              labelId="selectMarca"
              name="marca_equ"
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
        <Grid item xs={12} md={3}> <TextField name="antiguedad_equ" label="Antiguedad" fullWidth onChange={handleChange} /> </Grid>
        <Grid item xs={12} md={4}> <TextField name="ctacontable_equ" label="Cuenta Contable" fullWidth onChange={handleChange} /> </Grid>
        <Grid item xs={12} md={4}> <TextField name="ctadepreciacion_equ" label="Cuenta Depreciación" fullWidth onChange={handleChange} /> </Grid>
        <Grid item xs={12} md={4}> <TextField name="combogrupo_equ" label="Grupo o Combo" fullWidth onChange={handleChange} /> </Grid>
        <Grid item xs={12} md={4}>
          <TextField className={styles.inputMaterial} name="valoradquisicion_equ" label="Costo con IVA" fullWidth
            InputLabelProps={{ shrink: true }} InputProps={{ inputComponent: NumberFormatCustom, }}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={8}> <TextField name="descripcion_equ" label="Descripción del Componente"
          fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl className={styles.formControlEstados}>
            <InputLabel id="idselectEstadoCalidad">Estado Calidad</InputLabel>
            <Select
              labelId="selectEstadoCalidad"
              name="estadocalidad_equ"
              id="idselectEstadoCalidad"
              fullWidth
              onChange={handleChange}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarEstadosCalidad.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_estcal}>{itemselect.nombre_estcal}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl className={styles.formControlEstados}>
            <InputLabel id="idselectEstadoContable">Estado del Componente</InputLabel>
            <Select
              labelId="selectEstadoContable"
              name="estadocontable_equ"
              id="idselectEstadoContable"
              fullWidth
              onChange={handleChange}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarEstados && listarEstados.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_est}>{itemselect.nombre_est}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl className={styles.formControlEstados}>
            <InputLabel id="idselectEstadoCliente">Estado del Cliente</InputLabel>
            <Select
              labelId="selectEstadoCliente"
              name="estadocliente_equ"
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
        <Grid item xs={12} md={4}>
          <FormControl className={styles.formControlEstados}>
            <InputLabel id="idselectEstadoMtto">Estado de Mantenimiento</InputLabel>
            <Select
              labelId="selectEstadoMtto"
              name="estadomtto_equ"
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
        <Grid item xs={12} md={8}> <TextField name="datoauxiliarpropietario_equ" label="Dato Auxiliar Propietario"
          fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={6}> <TextField name="datoauxiliaradmon_equ" label="Dato Auxiliar Admon"
          fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={6}> <TextField name="datoauxiliarcontabilidad_equ" label="Dato Auxiliar Contabilidad"
          fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={6}> <TextField name="datoauxiliaralza_equ" label="Dato Auxiliar Alza"
          fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={6}> <TextField name="datoauxiliaraquimejora_equ" label="Dato Auxiliar Equipo Mejora"
          fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={6}> <TextField name="datoauxiliarcalidad_equ" label="Dato Auxiliar de Calidad"
          fullWidth onChange={handleChange} value={equiposSeleccionado && equiposSeleccionado.datoauxiliarcalidad_equ} />
        </Grid>
      </Grid>
      <div align="right">
        <Button className={styles.button} color="primary" onClick={() => actualizaEstadoEquipo()} >Insertar</Button>
        <Button className={styles.button2} onClick={() => abrirCerrarModalInsertar()} >Cancelar</Button>
      </div>
    </div>
  )

  const equipoEditar = (
    <div className={styles.modal}>
      <Typography align="center" className={styles.typography} variant="button" display="block" > Actualizar Componente </Typography>
      <Grid container spacing={2} >
        <Grid item xs={12} md={3}> <TextField name="codigo_equ" label="Codigo Equipo"
          fullWidth onChange={handleChange} value={equiposSeleccionado && equiposSeleccionado.codigo_equ} />
        </Grid>
        <Grid item xs={12} md={3}>
          <FormControl className={styles.formControlManeja}>
            <InputLabel id="idselectFrecuencia">Frecuencia</InputLabel>
            <Select
              labelId="selectFrecuencia"
              name="frecuencia_equ"
              id="idselectFrecuencia"
              fullWidth

              onChange={handleChange}
              value={equiposSeleccionado && equiposSeleccionado.frecuencia_equ}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarFrecuencias.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_fre}>{itemselect.descripcion_fre}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={3}>
          <FormControl className={styles.formControlManeja}>
            <InputLabel id="idselectMatricula" >Maneja Matricula</InputLabel>
            <Select
              labelId="selecMatricula"
              name="manejamatricula_equ"
              id="idselectMatricula"
              fullWidth
              onChange={handleChange}
              value={equiposSeleccionado && equiposSeleccionado.manejamatricula_equ}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              <MenuItem value="S">Maneja Matricula S</MenuItem>
              <MenuItem value="N">Maneja Matricula N</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={3}>
          <FormControl className={styles.formControlManeja}>
            <InputLabel id="idselectDNI" >Tiene Marcación</InputLabel>
            <Select
              labelId="selectDNI"
              name="manejamarcacion_equ"
              id="idselectDNI"
              fullWidth
              onChange={handleChange}
              value={equiposSeleccionado && equiposSeleccionado.manejamarcacion_equ}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              <MenuItem value="S">Esta Marcado</MenuItem>
              <MenuItem value="N">No esta Marcado</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectPropietario">Propietario</InputLabel>
            <Select
              labelId="selectPropietario"
              name="propietario_equ"
              id="idselectPropietario"
              fullWidth
              onChange={handleChange}
              value={equiposSeleccionado && equiposSeleccionado.propietario_equ}
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
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectGrupoEquipo">Grupos de Equipos</InputLabel>
            <Select
              labelId="selectGrupoEquipo"
              name="grupoequipo_equ"
              id="idselectGrupoEquipo"
              fullWidth
              onChange={handleChange}
              value={equiposSeleccionado && equiposSeleccionado.grupoequipo_equ}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarGruposEquipos.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_grp}>{itemselect.descripcion_grp}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectSubGrupoParte">SubGrupo Equipo</InputLabel>
            <Select
              labelId="selectSubGrupoParte"
              name="subgrupoparte_equ"
              id="idselectSubGrupoParte"
              fullWidth
              onChange={handleChange}
              value={equiposSeleccionado && equiposSeleccionado.subgrupoparte_equ}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarSubGruposEquipos && listarSubGruposEquipos.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_sgre}>{itemselect.descripcion_sgre}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={3}>
          <FormControl className={styles.formControlManeja}>
            <InputLabel id="idselectMarca">Marca</InputLabel>
            <Select
              labelId="selectMarca"
              name="marca_equ"
              id="idselectMarca"
              fullWidth
              onChange={handleChange}
              value={equiposSeleccionado && equiposSeleccionado.marca_equ}
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
        <Grid item xs={12} md={3}>
          <TextField name="antiguedad_equ" label="Antiguedad" fullWidth onChange={handleChange}
            value={equiposSeleccionado && equiposSeleccionado.antiguedad_equ} />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField name="ctacontable_equ" label="Cuenta Contable" fullWidth onChange={handleChange}
            value={equiposSeleccionado && equiposSeleccionado.ctacontable_equ} />
        </Grid>
        <Grid item xs={12} md={4}> <TextField name="ctadepreciacion_equ" label="Cuenta Depreciación" fullWidth onChange={handleChange}
          value={equiposSeleccionado && equiposSeleccionado.ctadepreciacion_equ} />
        </Grid>
        <Grid item xs={12} md={4}> <TextField name="combogrupo_equ" label="Grupo o Combo" fullWidth onChange={handleChange}
          value={equiposSeleccionado && equiposSeleccionado.combogrupo_equ} />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField className={styles.inputMaterial} name="valoradquisicion_equ" label="Costo con IVA" fullWidth
            InputLabelProps={{ shrink: true }} InputProps={{ inputComponent: NumberFormatCustom, }}
            onChange={handleChange} value={equiposSeleccionado && equiposSeleccionado.valoradquisicion_equ}
          />
        </Grid>
        <Grid item xs={12} md={8}> <TextField name="descripcion_equ" label="Descripción del Equipo"
          fullWidth onChange={handleChange} value={equiposSeleccionado && equiposSeleccionado.descripcion_equ} />
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl className={styles.formControlEstados}>
            <InputLabel id="idselectEstadoCalidad">Estado Calidad</InputLabel>
            <Select
              labelId="selectEstadoCalidad"
              name="estadocalidad_equ"
              id="idselectEstadoCalidad"
              fullWidth
              onChange={handleChange}
              value={equiposSeleccionado && equiposSeleccionado.estadocalidad_equ}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarEstadosCalidad.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_estcal}>{itemselect.nombre_estcal}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl className={styles.formControlEstados}>
            <InputLabel id="idselectEstadoContable">Estado del Equipo</InputLabel>
            <Select
              labelId="selectEstadoContable"
              name="estadocontable_equ"
              id="idselectEstadoContable"
              fullWidth
              onChange={handleChange}
              value={equiposSeleccionado && equiposSeleccionado.estadocontable_equ}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarEstados && listarEstados.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_est}>{itemselect.nombre_est}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl className={styles.formControlEstados}>
            <InputLabel id="idselectEstadoCliente">Estado del Cliente</InputLabel>
            <Select
              labelId="selectEstadoCliente"
              name="estadocliente_equ"
              id="idselectEstadoCliente"
              fullWidth
              onChange={handleChange}
              value={equiposSeleccionado && equiposSeleccionado.estadocliente_equ}
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
        <Grid item xs={12} md={4}>
          <FormControl className={styles.formControlEstados}>
            <InputLabel id="idselectEstadoMtto">Estado de Mantenimiento</InputLabel>
            <Select
              labelId="selectEstadoMtto"
              name="estadomtto_equ"
              id="idselectEstadoMantenimiento"
              fullWidth
              onChange={handleChange}
              value={equiposSeleccionado && equiposSeleccionado.estadomtto_equ}
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
        <Grid item xs={12} md={8}> <TextField name="datoauxiliarpropietario_equ" label="Dato Auxiliar Propietario"
          fullWidth onChange={handleChange} value={equiposSeleccionado && equiposSeleccionado.datoauxiliarpropietario_equ} />
        </Grid>
        <Grid item xs={12} md={6}> <TextField name="datoauxiliaradmon_equ" label="Dato Auxiliar Admon"
          fullWidth onChange={handleChange} value={equiposSeleccionado && equiposSeleccionado.datoauxiliaradmon_equ} />
        </Grid>
        <Grid item xs={12} md={6}> <TextField name="datoauxiliarcontabilidad_equ" label="Dato Auxiliar Contabilidad"
          fullWidth onChange={handleChange} value={equiposSeleccionado && equiposSeleccionado.datoauxiliarcontabilidad_equ} />
        </Grid>
        <Grid item xs={12} md={6}> <TextField name="datoauxiliaralza_equ" label="Dato Auxiliar Alza"
          fullWidth onChange={handleChange} value={equiposSeleccionado && equiposSeleccionado.datoauxiliaralza_equ} />
        </Grid>
        <Grid item xs={12} md={6}> <TextField name="datoauxiliaraquimejora_equ" label="Dato Auxiliar Equipo Mejora"
          fullWidth onChange={handleChange} value={equiposSeleccionado && equiposSeleccionado.datoauxiliaraquimejora_equ} />
        </Grid>
        <Grid item xs={12} md={6}> <TextField name="datoauxiliarcalidad_equ" label="Dato Auxiliar de Calidad"
          fullWidth onChange={handleChange} value={equiposSeleccionado && equiposSeleccionado.datoauxiliarcalidad_equ} />
        </Grid>
      </Grid>
      <div align="right">
        {
          idUsu == 54 ?
            null
            :
          <Button className={styles.button} color="primary" onClick={() => actualizarEquipo()} >Editar</Button>
        }
        <Button className={styles.button2} onClick={() => abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
      <MenuEquipos equipoID={equiposSeleccionado.id_equ} equipoCodigo={equiposSeleccionado.codigo_equ} tipo={tipo} idUsu={idUsu} />
    </div>
  )

  const equipoEditarTipoEquipo = (
    <div className={styles.modal}>
      <Typography align="center" className={styles.typography} variant="button" display="block" > Actualizar Componente </Typography>
      <Grid container spacing={2} >
        <Grid item xs={12} md={3}> <TextField name="codigo_equ" label="Codigo Equipo"
          fullWidth onChange={handleChange} value={equiposSeleccionado && equiposSeleccionado.codigo_equ} />
        </Grid>
        <Grid item xs={12} md={3}>
          <FormControl className={styles.formControlManeja}>
            <InputLabel id="idselectFrecuencia">Frecuencia</InputLabel>
            <Select
              labelId="selectFrecuencia"
              name="frecuencia_equ"
              id="idselectFrecuencia"
              fullWidth

              onChange={handleChange}
              value={equiposSeleccionado && equiposSeleccionado.frecuencia_equ}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarFrecuencias.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_fre}>{itemselect.descripcion_fre}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={3}>
          <FormControl className={styles.formControlManeja}>
            <InputLabel id="idselectMatricula" >Maneja Matricula</InputLabel>
            <Select
              labelId="selecMatricula"
              name="manejamatricula_equ"
              id="idselectMatricula"
              fullWidth
              onChange={handleChange}
              value={equiposSeleccionado && equiposSeleccionado.manejamatricula_equ}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              <MenuItem value="S">Maneja Matricula S</MenuItem>
              <MenuItem value="N">Maneja Matricula N</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={3}>
          <FormControl className={styles.formControlManeja}>
            <InputLabel id="idselectDNI" >Tiene Marcación</InputLabel>
            <Select
              labelId="selectDNI"
              name="manejamarcacion_equ"
              id="idselectDNI"
              fullWidth
              onChange={handleChange}
              value={equiposSeleccionado && equiposSeleccionado.manejamarcacion_equ}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              <MenuItem value="S">Esta Marcado</MenuItem>
              <MenuItem value="N">No esta Marcado</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectPropietario">Propietario</InputLabel>
            <Select
              labelId="selectPropietario"
              name="propietario_equ"
              id="idselectPropietario"
              fullWidth
              onChange={handleChange}
              value={equiposSeleccionado && equiposSeleccionado.propietario_equ}
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
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectGrupoEquipo">Grupos de Equipos</InputLabel>
            <Select
              labelId="selectGrupoEquipo"
              name="grupoequipo_equ"
              id="idselectGrupoEquipo"
              fullWidth
              onChange={handleChange}
              value={equiposSeleccionado && equiposSeleccionado.grupoequipo_equ}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarGruposEquipos.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_grp}>{itemselect.descripcion_grp}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={8}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectSubGrupoParte">SubGrupo Equipo</InputLabel>
            <Select
              labelId="selectSubGrupoParte"
              name="subgrupoparte_equ"
              id="idselectSubGrupoParte"
              fullWidth
              onChange={handleChange}
              value={equiposSeleccionado && equiposSeleccionado.subgrupoparte_equ}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarSubGruposEquipos && listarSubGruposEquipos.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_sgre}>{itemselect.descripcion_sgre}</MenuItem>
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
              name="marca_equ"
              id="idselectMarca"
              fullWidth
              onChange={handleChange}
              value={equiposSeleccionado && equiposSeleccionado.marca_equ}
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
          <TextField name="antiguedad_equ" label="Antiguedad" fullWidth onChange={handleChange}
            value={equiposSeleccionado && equiposSeleccionado.antiguedad_equ} />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField name="ctacontable_equ" label="Cuenta Contable" fullWidth onChange={handleChange}
            value={equiposSeleccionado && equiposSeleccionado.ctacontable_equ} />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField className={styles.inputMaterial} name="valoradquisicion_equ" label="Costo con IVA" fullWidth
            InputLabelProps={{ shrink: true }} InputProps={{ inputComponent: NumberFormatCustom, }}
            onChange={handleChange} value={equiposSeleccionado && equiposSeleccionado.valoradquisicion_equ}
          />
        </Grid>
        <Grid item xs={12} md={8}> <TextField name="descripcion_equ" label="Descripción del Equipo"
          fullWidth onChange={handleChange} value={equiposSeleccionado && equiposSeleccionado.descripcion_equ} />
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl className={styles.formControlEstados}>
            <InputLabel id="idselectEstadoCalidad">Estado Calidad</InputLabel>
            <Select
              labelId="selectEstadoCalidad"
              name="estadocalidad_equ"
              id="idselectEstadoCalidad"
              fullWidth
              onChange={handleChange}
              value={equiposSeleccionado && equiposSeleccionado.estadocalidad_equ}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarEstadosCalidad.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_estcal}>{itemselect.nombre_estcal}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl className={styles.formControlEstados}>
            <InputLabel id="idselectEstadoContable">Estado del Equipo</InputLabel>
            <Select
              labelId="selectEstadoContable"
              name="estadocontable_equ"
              id="idselectEstadoContable"
              fullWidth
              onChange={handleChange}
              value={equiposSeleccionado && equiposSeleccionado.estadocontable_equ}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarEstados && listarEstados.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_est}>{itemselect.nombre_est}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl className={styles.formControlEstados}>
            <InputLabel id="idselectEstadoCliente">Estado del Cliente</InputLabel>
            <Select
              labelId="selectEstadoCliente"
              name="estadocliente_equ"
              id="idselectEstadoCliente"
              fullWidth
              onChange={handleChange}
              value={equiposSeleccionado && equiposSeleccionado.estadocliente_equ}
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
        <Grid item xs={12} md={4}>
          <FormControl className={styles.formControlEstados}>
            <InputLabel id="idselectEstadoMtto">Estado de Mantenimiento</InputLabel>
            <Select
              labelId="selectEstadoMtto"
              name="estadomtto_equ"
              id="idselectEstadoMantenimiento"
              fullWidth
              onChange={handleChange}
              value={equiposSeleccionado && equiposSeleccionado.estadomtto_equ}
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
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectTipoEquipo"> Tipo de Equipo </InputLabel>
            <Select
              labelId="selectTipoEquipo"
              name="tipo_equ"
              id="idselecttipo_equ"
              fullWidth
              onChange={handleChange}
              value={equiposSeleccionado && equiposSeleccionado.tipo_equ}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarUnidades.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_und}>{itemselect.descripcion_und}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={8}> <TextField name="datoauxiliarpropietario_equ" label="Dato Auxiliar Propietario"
          fullWidth onChange={handleChange} value={equiposSeleccionado && equiposSeleccionado.datoauxiliarpropietario_equ} />
        </Grid>
        <Grid item xs={12} md={6}> <TextField name="datoauxiliaradmon_equ" label="Dato Auxiliar Admon"
          fullWidth onChange={handleChange} value={equiposSeleccionado && equiposSeleccionado.datoauxiliaradmon_equ} />
        </Grid>
        <Grid item xs={12} md={6}> <TextField name="datoauxiliarcontabilidad_equ" label="Dato Auxiliar Contabilidad"
          fullWidth onChange={handleChange} value={equiposSeleccionado && equiposSeleccionado.datoauxiliarcontabilidad_equ} />
        </Grid>
        <Grid item xs={12} md={6}> <TextField name="datoauxiliaralza_equ" label="Dato Auxiliar Alza"
          fullWidth onChange={handleChange} value={equiposSeleccionado && equiposSeleccionado.datoauxiliaralza_equ} />
        </Grid>
        <Grid item xs={12} md={6}> <TextField name="datoauxiliaraquimejora_equ" label="Dato Auxiliar Equipo Mejora"
          fullWidth onChange={handleChange} value={equiposSeleccionado && equiposSeleccionado.datoauxiliaraquimejora_equ} />
        </Grid>
        <Grid item xs={12} md={6}> <TextField name="datoauxiliarcalidad_equ" label="Dato Auxiliar de Calidad"
          fullWidth onChange={handleChange} value={equiposSeleccionado && equiposSeleccionado.datoauxiliarcalidad_equ} />
        </Grid>
      </Grid>
      <div align="right">
        <Button className={styles.button} color="primary" onClick={() => actualizarEquipo()} >Editar</Button>
        <Button className={styles.button2} onClick={() => abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
      <MenuEquipos equipoID={equiposSeleccionado.id_equ} equipoCodigo={equiposSeleccionado.codigo_equ} tipo={tipo} />
    </div>
  )

  const equipoEliminar = (
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar el Equipo <b>{equiposSeleccionado && equiposSeleccionado.descripcion_equ}</b>? </p>
      <div align="right">
        <Button className={styles.button} color="secondary" onClick={() => borrarEquipo()}> Confirmar </Button>
        <Button className={styles.button2} onClick={() => abrirCerrarModalEliminar()}> Cancelar </Button>
      </div>
    </div>
  )

  const codigoEquipo = (
    <div className="App" >
      <div className={styles.modal2}>
        <Typography align="center" className={styles.typography} variant="button" display="block" >
          Seleccionar Codigo SubGrupo
        </Typography>
        <Grid item xs={12} md={4}>
          <FormControl className={styles.formControl2}>
            <InputLabel id="idselectsubgrupoparte_equ">SubGrupo</InputLabel>
            <Select
              labelId="selectsubgrupoparte_equ"
              name="subgrupoparte_equ"
              id="idselectsubgrupoparte_equ"
              fullWidth
              onChange={handleChange}
              onClick={(e) => DatosEquipos(e.target.value)}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarSubGruposEquipos && listarSubGruposEquipos.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_sgre}>{itemselect.tipoconsecutivo_sgre}{"-"}{itemselect.descripcion_sgre}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <br />
        <div align="center">
          <Button className={styles.button} variant="contained" startIcon={<SaveIcon />} color="primary"
            onClick={() => abrirCerrarModalInsertar()}>  Crear Accesorio de la Maquina
          </Button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="App">
      <br />
      <Button variant="contained" startIcon={<SaveIcon />} color="primary" onClick={() => leerDatosEquipos()} >Agregar Componente</Button>
      <MaterialTable
        columns={columnas}
        data={listarEquipos}
        title="COMPONENTES ADICIONALES A EQUIPOS"
        actions={[
          {
            icon: 'edit',
            tooltip: 'Editar Componente',
            onClick: (event, rowData) => seleccionarEquipo(rowData, "Editar")
          },
          {
            icon: 'delete',
            tooltip: 'Borrar Componente',
            onClick: (event, rowData) => seleccionarEquipo(rowData, "Eliminar")
          }
        ]}
        options={{
          actionsColumnIndex: 11,
          exportButton: true
        }}
        localization={{
          header: {
            actions: "Acciones"
          }
        }}
        detailPanel={[
          {
            tooltip: 'Estados del Equipo',
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
                  <Button variant="contained">Estado Contable : {rowData.nombre_est}</Button> { }
                  <Button variant="contained">Estado Cliente  : {rowData.nombre_estcli}</Button> { }
                  <Button variant="contained">Estado Mantenimiento :{rowData.nombre_estmtto}</Button>
                </div>
              )
            },
          },
        ]}
      />
      { }
      <Modal
        open={modalInsertar}
        onClose={abrirCerrarModalInsertar}
      >
        {equipoInsertar}
      </Modal>
      <Modal
        open={modalEditarTipoEquipo}
        onClose={abrirCerrarModalEditarTipoEquipo}
      >
        {equipoEditarTipoEquipo}
      </Modal>
      <Modal
        open={modalEditar}
        onClose={abrirCerrarModalEditar}
      >
        {equipoEditar}
      </Modal>
      <Modal
        open={modalEliminar}
        onClose={abrirCerrarModalEliminar}
      >
        {equipoEliminar}
      </Modal>
      <Modal
        open={modalCodigoEquipo}
        onClose={leerModalCodigoEquipo}
      >
        {codigoEquipo}
      </Modal>
    </div>
  );
}

export default Accesorios;

/*
  <Fab variant="extended">
        <NavigationIcon className={styles.extendedIcon} />
        Datos Adicionales Equipos
        onClick
      </Fab>
*/