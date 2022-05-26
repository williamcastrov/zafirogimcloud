import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Modal, TextField, Button, Select, MenuItem, FormControl, InputLabel, Typography, Grid, ButtonGroup } from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles, lighten } from "@material-ui/core/styles";
import { green, blue, blueGrey, red } from '@material-ui/core/colors';
import NumberFormat from 'react-number-format';
import swal from 'sweetalert';
import Moment from 'moment';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import shortid from "shortid";
import Images from "../../Images";

// Componentes de Conexion con el Backend
import inventariosServices from "../../../services/Almacenes/Inventarios";
import cumplimientooservServices from "../../../services/GestionOrdenes/CumplimientoOserv";
import tipooperacionServices from "../../../services/GestionOrdenes/TipoOperacion";
import actividadrealizadaServices from "../../../services/GestionOrdenes/ActividadRealizada";
import crearordenesServices from "../../../services/GestionOrdenes/CrearOrdenes";
import tiposFallasServices from "../../../services/Mantenimiento/TiposFallas";
import fallasMttoServices from "../../../services/Mantenimiento/FallasMtto";
import datoshorometroServices from "../../../services/Mantenimiento/DatosHorometro";
import estadosServices from "../../../services/Parameters/Estados";
import firmarotServices from "../../../services/GestionOrdenes/FirmarOT";

const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: 800,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  modalcumplimiento: {
    position: 'absolute',
    width: 1400,
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
    minWidth: 155,
    maxWidth: 155,
  },
  formControl2: {
    margin: theme.spacing(0),
    minWidth: 220,
    maxWidth: 220,
  },
  typography: {
    fontSize: 13,
    color: "#ff3d00"
  },
  typography2: {
    fontSize: 16,
    color: "#f44336"
  },
  button: {
    color: theme.palette.getContrastText(blueGrey[200]),
    margin: theme.spacing(0.3),
    '&:hover': {
      backgroundColor: blueGrey[200],
    },
  },
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  button1: {
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
    backgroundColor: blue[900],
    margin: theme.spacing(1),
    fontSize: 12,
    '&:hover': {
      backgroundColor: blue[900],
    },
  },
  button3: {
    color: theme.palette.getContrastText(blueGrey[500]),
    backgroundColor: red[700],
    margin: theme.spacing(1),
    fontSize: 12,
    '&:hover': {
      backgroundColor: red[700],
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

function ActividadesOserv(props) {
  const { id_otr, nombre_emp, razonsocial_cli, telefono_cli, nombre_ciu, email_cli, descripcion_mar, modelo_dequ,
    fechainicia_otr, descripcion_tser, descripcion_tmt, serie_dequ, codigo_equ, descripcion_con, primer_apellido_con,
    primer_nombre_con, horometro_otr, iniciatransporte_otr, finaltransporte_otr, tiempotransporte_otr, tiempoorden_otr,
    estado_otr
  } = props.ordenSeleccionado;

  const { operario } = props;
  const { idUsuario } = props;

  console.log("ES UN OPERARIO : ", operario)

  const { tipoRegistro } = props;

  //console.log("TIPO REGISTRO : ", tipoRegistro);

  const styles = useStyles();
  const [value, setValue] = useState(false);
  const [listUnaOrden, setListUnaOrden] = useState([]);
  const [listInventarios, setListInventarios] = useState([]);
  const [listUnCumplimiento, setListUnCumplimiento] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEliminarActividad, setModalEliminarActividad] = useState(false);
  const [modalCumplimiento, setModalCumplimiento] = useState(false);
  const [modalFotos, setModalFotos] = useState(false);
  const [modalActualizarCumplimiento, setModalActualizarCumplimiento] = useState(false);
  const [modalCerrarOrden, setModalCerrarOrden] = useState(false);
  const [modalGrabarHorometro, setModalGrabarHorometro] = useState(false);
  const [modalRevisarCumplimiento, setModalRevisarCumplimiento] = useState(false);
  const [formError, setFormError] = useState(false);
  const [listarTipoOperacion, setListarTipoOperacion] = useState([]);
  const [listarActividadRealizada, setListarActividadRealizada] = useState([]);
  const [listarFallasMtto, setListarFallasMtto] = useState([]);
  const [listarTiposFallas, setListarTiposFallas] = useState([]);
  const [listarEstados, setListarEstados] = useState([]);
  const [grabar, setGrabar] = React.useState(false);
  const [grabarCambios, setGrabarCambios] = React.useState(false);
  const [controlHorometro, setControlHorometro] = React.useState(false);
  const fechaactual = Moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
  const horaactual = Moment(new Date()).format('HH:mm:ss');
  const [activo, setActivo] = useState(false);
  const [activaCumplimiento, setActivaCumplimiento] = useState(false);
  const [actualiza, setActualiza] = useState(false);

  const [idCumplimiento, setIdCumplimiento] = useState(0);
  const [tipooperacion, setTipoOperacion] = useState(0);
  const [referencia, setReferencia] = useState(0);
  const [fallamtto, setFallaMtto] = useState(0);
  const [actividadrealizada, setActividadrealizada] = useState(0);
  const [fechainicial, setFechainicial] = useState(fechaactual);
  const [fechafinal, setFechafinal] = useState(fechaactual);
  const [tiempoActividad, setTiempoActividad] = useState(0);
  const [horainicial, setHorainicial] = useState(horaactual);
  const [horafinal, setHorafinal] = useState(horaactual);
  const [cantidad, setCantidad] = useState(0);
  const [valorunitario, setValorunitario] = useState(0);
  const [valortotal, setValortotal] = useState(0);
  const [serviciorealizado, setServicioRealizado] = useState(1);
  const [estado, setEstado] = useState(0);
  const [estadoOperacionEquipos, setEstadoOperacionEquipos] = useState(0);
  const [observacion, setObservacion] = useState(0);
  const [datoHorometro, setDatoHorometro] = useState(0);
  const [horometro, setHorometro] = useState(horometro_otr);
  const [tiempoTransporte, setTiempoTransporte] = useState(tiempotransporte_otr);
  const [fechaIniciaTransporte, setFechaIniciaTransporte] = useState(iniciatransporte_otr);
  const [fechaFinalTransporte, setFechaFinalTransporte] = useState(finaltransporte_otr);
  const [inventariosSeleccionado, setInventariosSeleccionado] = useState([]);
  const [orden, setOrden] = useState([]);

  let servicio = 1;

  const [cumplimientoSeleccionado, setCumplimientoSeleccionado] = useState({
    id: "",
    id_cosv: "",
    descripcion_cosv: observacion,
    tipooperacion_cosv: "",
    tipofallamtto_cosv: "",
    referencia_cosv: "",
    fechainicia_cosv: "",
    fechafinal_cosv: "",
    cantidad_cosv: "",
    valorunitario_cosv: "",
    valortotal_cosv: "",
    servicio_cosv: servicio,
    observacion_cosv: observacion,
    tiempoactividad_cosv: 0,
    idcomponente: 0,
    seriecomponente: 0,
    voltajecomponente: 0,
    voltajesalidasulfatacion: 0,
    amperajecomponente: 0,
    celdasreferenciacomponente: 0,
    cofreseriecomponentes: 0,
    estadocomponentes: 0,
    estadooperacionequipo_cosv: 81,
  });

  const [horometroSeleccionado, setHorometroSeleccionado] = useState({
    id_dhr: "",
    codigoequipo_dhr: "",
    valorhorometro_dhr: ""
  });

  useEffect(() => {
    async function fetchDataInventarios() {
      const res = await inventariosServices.listInventarios();
      setListInventarios(res.data);
      if (res.data) {
        setActivaCumplimiento(true)
      } else { setActivaCumplimiento(false) }
    }
    fetchDataInventarios();
  }, [])

  useEffect(() => {
    async function fetchDataFallasMtto() {
      const res = await fallasMttoServices.listfallasmtto();
      setListarFallasMtto(res.data);
    }
    fetchDataFallasMtto();
  }, [])

  useEffect(() => {
    async function fetchDataTiposFallasMtto() {
      const res = await tiposFallasServices.listTiposFallas();
      setListarTiposFallas(res.data);
      setActualiza(false);
    }
    fetchDataTiposFallasMtto();
  }, [])

  useEffect(() => {
    async function fetchDataTipoOperacion() {
      const res = await tipooperacionServices.listTipooperacion();
      setListarTipoOperacion(res.data);
    }
    fetchDataTipoOperacion();
  }, [])

  useEffect(() => {
    async function fetchDataActividadRealizada() {
      const res = await actividadrealizadaServices.listActividadrealizada();
      setListarActividadRealizada(res.data);
      //console.log("ACTIVIDAD REALIZADA : ", res.data)
    }
    fetchDataActividadRealizada();
  }, [])

  useEffect(() => {
    async function fetchDataEstados() {
      const res = await estadosServices.listEstadosEquiposOperacion();
      setListarEstados(res.data);
      //console.log("ESATDOS : ", res.data)
    }
    fetchDataEstados();
  }, [])

  useEffect(() => {
    async function fetchDataUnCumplimiento() {
      const res = await cumplimientooservServices.listUnCumplimiento(id_otr);
      setListUnCumplimiento(res.data);
      setActualiza(false);
      if (res.data) {
        setActivo(true)
      } else { setActivo(false) }
    }
    fetchDataUnCumplimiento();
  }, [actualiza])

  const actualizarValoresOrden = () => {
    async function fetchDataOrdenes() {
      const res = await crearordenesServices.listUnaOrden(id_otr);
      setListUnaOrden(res.data);
    }
    fetchDataOrdenes();
  }

  const handleChange = e => {
    const { name, value } = e.target;

    setCumplimientoSeleccionado(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const seleccionarCumplimiento = (cumplimiento, caso) => {
    //console.log(cumplimiento)
    setCumplimientoSeleccionado(cumplimiento);
    (caso === "Editar") ? abrirCerrarModalActualizarCumplimiento() : abrirCerrarModalEliminarActividad()
  }

  const iniciarCumplimiento = () => {
    //console.log("REFERENCIA SELECCIONADA : ", value);
    handleOnSelect(value)
  }

  const abrirCerrarModalInsertar = () => {
    setModalInsertar(!modalInsertar);
  }

  const abrirCerrarModalEliminarActividad = () => {
    setModalEliminarActividad(!modalEliminarActividad);
  }

  const abrirCerrarModalCumplimiento = () => {
    setModalCumplimiento(!modalCumplimiento);
  }

  const abrirCerrarModalFotos = () => {
    setModalFotos(!modalFotos);
  }

  const abrirCerrarModalActualizarCumplimiento = () => {
    setModalActualizarCumplimiento(!modalActualizarCumplimiento);
  }

  const consultarCumplimiento = () => {
    async function fetchDataUnCumplimiento() {
      const res = await cumplimientooservServices.listUnCumplimiento(id_otr);
      setListUnCumplimiento(res.data);
      if (res.data) {
        setActivo(true)
      } else { setActivo(false) }
      abrirCerrarModalRevisarCumplimiento();
    }
    fetchDataUnCumplimiento();
  }

  const pasarARevision = async () => {
    console.log("VALOR ACTUALIZADO ORDEN", listUnaOrden[0].horometro_otr);
    if (!listUnaOrden[0].horometro_otr) {
      swal("Horometro", "El valor del Horometro no puede ser CERO", "warning", { button: "Aceptar" });
    }

    if (listUnaOrden[0].horometro_otr === 0) {
      swal("Horometro", "El valor del Horometro no puede ser CERO", "warning", { button: "Aceptar" });
    } else {
      const res = await crearordenesServices.pasararevision(id_otr);

      if (res.success) {
        swal("Orden de Servicio", "Estado de la Orden paso a Revisión!", "success", { button: "Aceptar" });

        const res = await crearordenesServices.sumartiempoactividades(id_otr);

        if (res.success) {
          swal("Orden de Servicio", "Tiempo de Actividades de la Orden Actualizados!", "success", { button: "Aceptar" });
        }
        else
          swal("Orden de Servicio", "Error Actualizando tiempo de actividad de la Orden!", "error", { button: "Aceptar" });
      }
      else
        swal("Orden de Servicio", "Error Estado de la Orden no puede ser Actualizada!", "error", { button: "Aceptar" });

      console.log(res.message)
    }

  }

  const cerrarOrden = async () => {
    const rest = await firmarotServices.listfirmasot(id_otr);
    console.log("FIRMAS : ", rest.data.length)
    if (rest.data.length === 0) {
      swal("Estado Orden", "La OT no Registra Firma, no se puede CERRAR", "warning", { button: "Aceptar" });
    }
    else {
      if (estado_otr === 24 || estado_otr === 27) {
        swal("Estado Orden", "El estado de la orden no permite CERRAR", "warning", { button: "Aceptar" });
      } else {
        if (!horometro_otr) {
          swal("Horometro", "El valor del Horometro no puede ser CERO", "warning", { button: "Aceptar" });
        } else {
          const res = await crearordenesServices.cerrarot(id_otr);

          if (res.success) {
            swal("Orden de Servicio", "Orden de Trabajo Cerrada!", "success", { button: "Aceptar" });
            window.location.reload();
          }
          else {
            swal("Orden de Servicio", "Error Cerrando la Orden de Trabajo!", "success", { button: "Aceptar" });
            window.location.reload();
          }
          setActualiza(true);
          console.log(res.message);
        }
      }
    }
  }

  const abrirCerrarModalRevisarCumplimiento = () => {
    setModalRevisarCumplimiento(!modalRevisarCumplimiento);
  }

  const abrirCerrarModalCerrarOrden = () => {
    setModalCerrarOrden(!modalCerrarOrden);
  }

  const abrirCerrarModalGrabarHorometro = () => {
    setModalGrabarHorometro(!modalGrabarHorometro);
  }

  const seleccionarFallaMtto = (tipomtto) => {
    //console.log("FALLA DE MANTENIMIENTO", tipomtto);

    async function fetchDataFallasMtto() {
      const res = await fallasMttoServices.leerFallaTipo(tipomtto);
      setListarFallasMtto(res.data);
      //console.log("FALLAS POR TIPO : ", res.data);
    }
    fetchDataFallasMtto();
  }

  const grabarValorHorometro = async () => {
    const res = await datoshorometroServices.listUnDatoHorometro(props.ordenSeleccionado.equipo_otr);

    console.log("DATOS HOROMETERO : ", res.data)

    if (!res.data) {
      {
        setHorometroSeleccionado([{
          id_dhr: 0,
          codigoequipo_dhr: props.ordenSeleccionado.equipo_otr,
          valorhorometro_dhr: horometro
        }]);
      }
      setDatoHorometro(1);
    } else {
      if (horometro <= res.data[0].valorhorometro_dhr) {
        swal("Control Horometro", "Valor Ingresado al Horometero no puede ser Menor al Anterior!", "error", { button: "Aceptar" });
        console.log("VALOR HOROMETRO GUARDADO : ", res.data[0].valorhorometro_dhr);
        return
      }
      setDatoHorometro(2);
    }

    if (res.data) {
      setHorometroSeleccionado([{
        id_dhr: res.data[0].id_dhr,
        codigoequipo_dhr: props.ordenSeleccionado.equipo_otr,
        valorhorometro_dhr: horometro
      }]);
    }

    const a = Date.parse(fechaFinalTransporte);
    const b = Date.parse(fechaIniciaTransporte);
    setTiempoTransporte(Math.trunc(((a - b) * 0.0166667) / 1000));

    let tiempo = (Math.trunc(((a - b) * 0.0166667) / 1000))
    //console.log("TIEMPO TRANSPORTE : ", days);



    setOrden([{
      id_otr: props.ordenSeleccionado.id_otr,
      estado_otr: props.ordenSeleccionado.estado_otr,
      tipo_otr: props.ordenSeleccionado.tipo_otr,
      tipooperacion_otr: props.ordenSeleccionado.tipooperacion_otr,
      tiposervicio_otr: props.ordenSeleccionado.tiposervicio_otr,
      fechaprogramada_otr: props.ordenSeleccionado.fechaprogramada_otr,
      fechainicia_otr: props.ordenSeleccionado.fechainicia_otr,
      fechafinal_otr: props.ordenSeleccionado.fechafinal_otr,
      diasoperacion_otr: 0,
      equipo_otr: props.ordenSeleccionado.equipo_otr,
      proveedor_otr: props.ordenSeleccionado.proveedor_otr,
      cliente_otr: props.ordenSeleccionado.cliente_otr,
      operario_otr: props.ordenSeleccionado.operario_otr,
      contactocliente_otr: props.ordenSeleccionado.contactocliente_otr,
      subgrupoequipo_otr: props.ordenSeleccionado.subgrupoequipo_otr,
      ciudad_otr: props.ordenSeleccionado.ciudad_otr,
      resumenorden_otr: props.ordenSeleccionado.resumenorden_otr,
      prioridad_otr: props.ordenSeleccionado.prioridad_otr,
      empresa_otr: props.ordenSeleccionado.empresa_otr,
      horometro_otr: horometro,
      iniciatransporte_otr: fechaIniciaTransporte,
      finaltransporte_otr: fechaFinalTransporte,
      tiempotransporte_otr: tiempo,
      tiempoorden_otr: 0
    }]);
    setControlHorometro(true);
  }

  useEffect(() => {
    async function grabarValorHorometro() {

      if (controlHorometro) {
        console.log("CONTROL DEL HOROMETRO : ", horometroSeleccionado[0])
        console.log("ACTUALIZA O GRABA : ", datoHorometro)

        const res = await crearordenesServices.update(orden[0]);

        if (res.success) {
          swal("Horometro", "Valor del Horometro Actualizado!", "success", { button: "Aceptar" });
          console.log(res.message)

          if (datoHorometro === 1) {
            const rest = await datoshorometroServices.save(horometroSeleccionado[0]);
            if (rest.success) {
              swal("Control Horometro", "Control del Horometro Grabado!", "success", { button: "Aceptar" });
              console.log(res.message)
            } else {
              swal("Control Horometro", "Error Grabando Control del Horometro!", "error", { button: "Aceptar" });
              console.log(res.message);
            }
          } else {
            if (datoHorometro === 2) {
              const rest = await datoshorometroServices.update(horometroSeleccionado[0]);
              if (rest.success) {
                swal("Control Horometro", "Control del Horometro Actualizado!", "success", { button: "Aceptar" });
                console.log(res.message)
              } else {
                swal("Control Horometro", "Error Actualizando Control del Horometro!", "error", { button: "Aceptar" });
                console.log(res.message);
              }
            }
          }
        } else {
          swal("Horometro", "Error Actualizando Valor del Horometro!", "error", { button: "Aceptar" });
          console.log(res.message);
        }
        setControlHorometro(false);
        setActualiza(true);
        abrirCerrarModalGrabarHorometro();
      }
    }
    grabarValorHorometro();
    actualizarValoresOrden();
  }, [controlHorometro])


  const grabarCumplimiento = async () => {

    const a = Date.parse(fechafinal);
    const b = Date.parse(fechainicial);
    setTiempoActividad(Math.trunc(((a - b) * 0.0166667) / 1000));

    let tiempo = (Math.trunc(((a - b) * 0.0166667) / 1000))

    setFormError({});
    let errors = {};
    let formOk = true;

    {
      let resultado = (cantidad * valorunitario)
      //Asignar Valores al Estado Cumplimiento
      setCumplimientoSeleccionado([{
        id: idCumplimiento,
        id_cosv: props.ordenSeleccionado.id_otr,
        descripcion_cosv: actividadrealizada,
        tipooperacion_cosv: tipooperacion,
        tipofallamtto_cosv: fallamtto,
        referencia_cosv: referencia,
        fechainicia_cosv: fechainicial,
        fechafinal_cosv: fechafinal,
        cantidad_cosv: cantidad,
        valorunitario_cosv: valorunitario,
        valortotal_cosv: resultado,
        servicio_cosv: serviciorealizado,
        observacion_cosv: observacion,
        tiempoactividad_cosv: tiempo,
        estadooperacionequipo_cosv: estadoOperacionEquipos
      }]);
    }
    setGrabar(true);
  }

  const guardarCambiosCumplimiento = async () => {

    const a = Date.parse(cumplimientoSeleccionado.fechafinal_cosv);
    const b = Date.parse(cumplimientoSeleccionado.fechainicia_cosv);
    setTiempoActividad(Math.trunc(((a - b) * 0.0166667) / 1000));

    let tiempo = (Math.trunc(((a - b) * 0.0166667) / 1000))

    {
      let resultado = (cumplimientoSeleccionado.cantidad_cosv * cumplimientoSeleccionado.valorunitario_cosv)
      //Asignar Valores al Estado Cumplimiento
      setCumplimientoSeleccionado([{
        id: cumplimientoSeleccionado.id,
        id_cosv: props.ordenSeleccionado.id_otr,
        descripcion_cosv: cumplimientoSeleccionado.descripcion_cosv,
        tipooperacion_cosv: cumplimientoSeleccionado.tipooperacion_cosv,
        tipofallamtto_cosv: cumplimientoSeleccionado.tipofallamtto_cosv,
        referencia_cosv: cumplimientoSeleccionado.referencia_cosv,
        fechainicia_cosv: cumplimientoSeleccionado.fechainicia_cosv,
        fechafinal_cosv: cumplimientoSeleccionado.fechafinal_cosv,
        cantidad_cosv: cumplimientoSeleccionado.cantidad_cosv,
        valorunitario_cosv: cumplimientoSeleccionado.valorunitario_cosv,
        valortotal_cosv: resultado,
        servicio_cosv: cumplimientoSeleccionado.servicio_cosv,
        observacion_cosv: cumplimientoSeleccionado.observacion_cosv,
        tiempoactividad_cosv: tiempo,
        estadooperacionequipo_cosv: cumplimientoSeleccionado.estadooperacionequipo_cosv
      }]);
    }
    setGrabarCambios(true);
  }

  const borraActividadOrden = async () => {

    const res = await cumplimientooservServices.delete(cumplimientoSeleccionado.id);

    if (res.success) {
      swal("Actividad de la Orden", "Borrada de forma Correcta!", "success", { button: "Aceptar" });
      console.log(res.message)
      abrirCerrarModalEliminarActividad();

      delete cumplimientoSeleccionado.descripcion_cosv;
      delete cumplimientoSeleccionado.tipooperacion_cosv;
      delete cumplimientoSeleccionado.referencia_cosv;
      delete cumplimientoSeleccionado.tipofallamtto_cosv;
      delete cumplimientoSeleccionado.fechainicia_cosv;
      delete cumplimientoSeleccionado.fechafinal_cosv;
      delete cumplimientoSeleccionado.cantidad_cosv;
      delete cumplimientoSeleccionado.valorunitario_cosv;
      delete cumplimientoSeleccionado.valortotal_cosv;
      delete cumplimientoSeleccionado.servicio_cosv;
      delete cumplimientoSeleccionado.observacion_cosv;
    }
    else {
      swal("Actividad de la Orden", "Error Borrando Actividad de la Orden!", "error", { button: "Aceptar" });
      console.log(res.message);
      abrirCerrarModalEliminarActividad();
    }
    setActualiza(true);
  }

  useEffect(() => {
    async function guardarCambiosCumplimiento() {
      if (grabarCambios) {

        const res = await cumplimientooservServices.update(cumplimientoSeleccionado[0]);

        if (res.success) {
          swal("Orden de Servicio", "Orden de Servicio Actualizada de forma Correcta!", "success", { button: "Aceptar" });
          console.log(res.message)
          delete cumplimientoSeleccionado.descripcion_cosv;
          delete cumplimientoSeleccionado.tipooperacion_cosv;
          delete cumplimientoSeleccionado.referencia_cosv;
          delete cumplimientoSeleccionado.tipofallamtto_cosv;
          delete cumplimientoSeleccionado.fechainicia_cosv;
          delete cumplimientoSeleccionado.fechafinal_cosv;
          delete cumplimientoSeleccionado.cantidad_cosv;
          delete cumplimientoSeleccionado.valorunitario_cosv;
          delete cumplimientoSeleccionado.valortotal_cosv;
          delete cumplimientoSeleccionado.servicio_cosv;
          delete cumplimientoSeleccionado.observacion_cosv;
          abrirCerrarModalActualizarCumplimiento();
        } else {
          swal("Orden de Servicio", "Error Actualizando la Orden de Servicio!", "error", { button: "Aceptar" });
          console.log(res.message);
          abrirCerrarModalActualizarCumplimiento();
        }
        setGrabarCambios(false);
        setActualiza(true);
        abrirCerrarModalActualizarCumplimiento();
      }
    }
    guardarCambiosCumplimiento();
  }, [grabarCambios])

  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    //console.log(string, results)
  }

  useEffect(() => {
    async function grabarCumplimiento() {

      if (grabar) {
        const res = await cumplimientooservServices.save(cumplimientoSeleccionado[0]);

        if (res.success) {

          swal("Actividades Orden de Servicio", "Creada de forma Correcta!", "success", { button: "Aceptar" });
          delete cumplimientoSeleccionado.descripcion_cosv;
          delete cumplimientoSeleccionado.tipooperacion_cosv;
          delete cumplimientoSeleccionado.referencia_cosv;
          delete cumplimientoSeleccionado.tipofallamtto_cosv;
          delete cumplimientoSeleccionado.fechainicia_cosv;
          delete cumplimientoSeleccionado.fechafinal_cosv;
          delete cumplimientoSeleccionado.cantidad_cosv;
          delete cumplimientoSeleccionado.valorunitario_cosv;
          delete cumplimientoSeleccionado.valortotal_cosv;
          delete cumplimientoSeleccionado.servicio_cosv;
          delete cumplimientoSeleccionado.observacion_cosv;
          actualizarEstadoProgramada();
          console.log(res.message)
        } else {
          swal("Actividades Orden de Servicio", "Error registrando la Actividad!", "error", { button: "Aceptar" });
          console.log(res.message);
        }
        setGrabar(false);
        setActualiza(true);
        abrirCerrarModalCumplimiento();
      }
    }
    grabarCumplimiento();
  }, [grabar])

  const actualizarEstadoProgramada = async () => {
    const res = await crearordenesServices.ordenprogramada(cumplimientoSeleccionado[0].id_cosv);

    if (res.success)
      swal("Orden de Servicio", "Orden Programada de forma correcta OK!", "success", { button: "Aceptar" });
    else
      swal("Orden de Servicio", "Error en Proceso de Programación!", "success", { button: "Aceptar" });

    console.log(res.message)
  }

  const handleOnSelect = (item) => {
    // the item selected
    {
      setIdCumplimiento(shortid());
      setTipoOperacion(item.tipooperacion_inv);
      setReferencia(item.referencia_inv);
      setFallaMtto(48);
      setActividadrealizada(item.descripcion_inv);
      setFechainicial(fechaactual);
      setFechafinal(fechaactual);
      setHorainicial(horaactual);
      setHorafinal(horaactual);
      setCantidad(0);
      setValorunitario(item.costounitponderado_inv);
      setValortotal(0);

      //item.map((asignar) => (
      setCumplimientoSeleccionado([{
        id: idCumplimiento,
        id_cosv: id_otr,
        descripcion_cosv: item.descripcion_inv,
        tipooperacion_cosv: item.tipooperacion_inv,
        tipofallamtto_cosv: 48,
        referencia_cosv: item.referencia_inv,
        fechainicia_cosv: fechaactual,
        fechafinal_cosv: fechaactual,
        cantidad_cosv: 0,
        valorunitario_cosv: item.costounitponderado_inv,
        valortotal_cosv: 0,
        servicio_cosv: servicio,
        observacion_cosv: observacion,
        tiempoactividad_cosv: 0,
        estadooperacionequipo_cosv: cumplimientoSeleccionado.estadooperacionequipo_cosv
      }]);
    }
    abrirCerrarModalCumplimiento();
  };

  const agregarFotos = () => {
    abrirCerrarModalFotos();
  }

  const agregarCumplimientoOperacion = () => {
    //console.log("LLEGUE : ", item.inputProps)
    // the item selected
    {
      setIdCumplimiento(shortid());
      setTipoOperacion(8);
      setReferencia("OperacionMantenimiento");
      setFallaMtto(48),
        setActividadrealizada("");
      setFechainicial(fechaactual);
      setFechafinal(fechaactual);
      setHorainicial(horaactual);
      setHorafinal(horaactual);
      setCantidad(0);
      setValorunitario(0);
      setValortotal(0);

      //item.map((asignar) => (
      setCumplimientoSeleccionado([{
        id: idCumplimiento,
        id_cosv: id_otr,
        descripcion_cosv: "",
        tipooperacion_cosv: 8,
        tipofallamtto_cosv: 48,
        referencia_cosv: "OperacionMantenimiento",
        fechainicia_cosv: fechaactual,
        fechafinal_cosv: fechaactual,
        cantidad_cosv: 0,
        valorunitario_cosv: 0,
        valortotal_cosv: 0,
        servicio_cosv: servicio,
        observacion_cosv: observacion,
        tiempoactividad_cosv: 0,
        estadooperacionequipo_cosv: cumplimientoSeleccionado.estadooperacionequipo_cosv
      }]);
    }
    abrirCerrarModalCumplimiento();
  };

  const cumplimiento = [
    {
      title: '# OT',
      field: 'id_cosv',
      cellStyle: { minWidth: 50 }
    },
    {
      title: 'Actividad',
      field: 'descripcion_cosv',
      cellStyle: { minWidth: 250 }
    },
    {
      title: 'Referencia',
      field: 'referencia_cosv',
      cellStyle: { minWidth: 100 }
    },
    {
      title: 'Fecha Inicia',
      field: 'fechainicia_cosv',
      type: "date",
      cellStyle: { minWidth: 100 }
    },
    {
      title: 'Fecha Fin',
      field: 'fechafinal_cosv',
      type: "date",
      cellStyle: { minWidth: 100 }
    },
    {
      title: 'Cantidad',
      field: 'cantidad_cosv',
      cellStyle: { minWidth: 50 }
    },
    {
      title: 'Valor Unitario',
      field: 'valorunitario_cosv',
      cellStyle: { minWidth: 100 }
    },
    {
      title: 'Valor Total',
      field: 'valortotal_cosv',
      cellStyle: { minWidth: 100 }
    },
    {
      title: 'Estado Equipo',
      field: 'nombre_est'
    }
  ]

  const CumplimientoOrden = (
    <div className="App" >
      <div className={styles.modal}>
        <Typography align="center" className={styles.typography} variant="button" display="block" >
          Registrar Actividad a la Orden de Servicio
        </Typography>
        <br />
        <Grid container spacing={2} >
          <Grid item xs={12} md={4}>
            <TextField name="id" label="Id Cumplimiento" disabled="true"
              defaultValue={idCumplimiento}
              fullWidth onChange={handleChange} value={cumplimientoSeleccionado && cumplimientoSeleccionado.id} />
          </Grid>
          <Grid item xs={12} md={4}> <TextField name="id_cosv" label="# Orden de Servicio" disabled="true"
            defaultValue={id_otr}
            fullWidth onChange={handleChange} value={cumplimientoSeleccionado && cumplimientoSeleccionado.id_cosv} />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl className={styles.formControl2}>
              <InputLabel id="idselecttipooperacion_cosv">Tipo</InputLabel>
              <Select
                disabled="true"
                labelId="selecttipooperacion_cosv"
                name="tipooperacion_cosv"
                id="idselecttipooperacion_cosv"
                value={tipooperacion}
                onChange={(e) => setOperario(e.target.value)}
                fullWidth onChange={handleChange}
              >
                <MenuItem value=""> <em>None</em> </MenuItem>
                {
                  listarTipoOperacion && listarTipoOperacion.map((itemselect) => {
                    return (
                      <MenuItem value={itemselect.id_tope}>{itemselect.descripcion_tope}</MenuItem>
                    )
                  })
                }
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField name="referencia_cosv" label="Referencia Producto"
              value={referencia}
              onChange={(e) => setReferencia(e.target.value)}
              fullWidth
              disabled="true"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl className={styles.formControl2}>
              <InputLabel id="tipofallamtto">Tipo de Falla</InputLabel>
              <Select
                labelId="selecttipofallamtto"
                name="tipofallamtto"
                id="idselecttipofallamtto"
                onClick={(e) => seleccionarFallaMtto(e.target.value)}
                onChange={handleChange}
              >
                <MenuItem value=""> <em>None</em> </MenuItem>
                {
                  listarTiposFallas && listarTiposFallas.map((itemselect) => {
                    return (
                      <MenuItem value={itemselect.id_tfa}>{itemselect.descripcion_tfa}</MenuItem>
                    )
                  })
                }
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl className={styles.formControl2}>
              <InputLabel id="fallamtto_cosv">Falla del Equipo</InputLabel>
              <Select
                labelId="selecttfallamtto_cosv"
                name="tipofallamtto_cosv"
                id="idselectfallamtto_cosv"
                onChange={(e) => setFallaMtto(e.target.value)}
              >
                <MenuItem value=""> <em>None</em> </MenuItem>
                {
                  listarFallasMtto && listarFallasMtto.map((itemselect) => {
                    return (
                      <MenuItem value={itemselect.id_fmt}>{itemselect.descripcion_fmt}</MenuItem>
                    )
                  })
                }
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField className={styles.inputMaterial} label="Actividad Realizada" name="descripcion_cosv"
              value={actividadrealizada} fullWidth
              onChange={(e) => setActividadrealizada(e.target.value)} />
          </Grid>
          <Grid item xs={12} md={4}> <TextField type="datetime-local" InputLabelProps={{ shrink: true }} name="fechainicia_cosv"
            defaultValue={Moment(inventariosSeleccionado.fechaactual).format('YYYY-MM-DD HH:mm:ss')}
            label="Fecha Inicia Actividad" fullWidth
            value={fechainicial}
            onChange={(e) => setFechainicial(e.target.value)} />
          </Grid>
          <Grid item xs={12} md={4}> <TextField type="datetime-local" InputLabelProps={{ shrink: true }} name="fechafinal_cosv"
            defaultValue={Moment(inventariosSeleccionado.fechaactual).format('YYYY-MM-DD HH:mm:ss')}
            label="Fecha Finaliza Actividad" fullWidth
            value={fechafinal}
            onChange={(e) => setFechafinal(e.target.value)} />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl className={styles.formControl2}>
              <InputLabel id="servicio_cosv">Servicio Realizado</InputLabel>
              <Select
                labelId="selectservicio_cosv"
                name="servicio_cosv"
                id="idselectservicio_cosv"
                defaultValue={servicio}
                onChange={(e) => setServicioRealizado(e.target.value)}
              >
                <MenuItem value=""> <em>None</em> </MenuItem>
                {
                  listarActividadRealizada && listarActividadRealizada.map((itemselect) => {
                    return (
                      <MenuItem value={itemselect.id_are}>{itemselect.descripcion_are}</MenuItem>
                    )
                  })
                }
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField className={styles.inputMaterial} name="cantidad_cosv" InputLabelProps={{ shrink: true }}
              value={cantidad} onChange={(e) => setCantidad(e.target.value)} label="Cantidad" fullWidth />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField className={styles.inputMaterial} name="valorunitario_cosv" label="Valor Unitario" fullWidth
              InputLabelProps={{ shrink: true }} InputProps={{ inputComponent: NumberFormatCustom, }}
              value={valorunitario} onChange={(e) => setValorunitario(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField className={styles.inputMaterial} type="numeric" name="valortotal_cosv" label="Valor Total"
              InputLabelProps={{ shrink: true }} fullWidt />
          </Grid>
          <Grid item xs={12} md={8}>
            <TextField className={styles.inputMaterial} label="Observaciones o Comentarios" name="observacion_cosv"
              value={observacion} onChange={(e) => setObservacion(e.target.value)} />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl className={styles.formControl2}>
              <InputLabel id="estadooperacionequipo_cosv">Estado del Equipo</InputLabel>
              <Select
                labelId="selectestadooperacionequipo_cosv"
                name="estadooperacionequipo_cosv"
                id="idselectestadooperacionequipo_cosv"
                onChange={(e) => setEstadoOperacionEquipos(e.target.value)}
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
        </Grid>
        <br />
        <div align="right">
          <Button className={styles.button} color="primary" onClick={() => grabarCumplimiento()} >Guardar</Button>
          <Button className={styles.button2} onClick={() => abrirCerrarModalCumplimiento()}>Cancelar</Button>
        </div>
      </div>
    </div >
  )

  const actualizarCumplimiento = (
    <div className="App" >
      <div className={styles.modal}>
        <Typography align="center" className={styles.typography} variant="button" display="block" >
          Actualizar Cumplimiento
        </Typography>
        <br />
        <Grid container spacing={2} >
          <Grid item xs={12} md={4}>
            <TextField className={styles.inputMaterial} name="id" label="Id Cumplimiento" disabled="true"
              defaultValue={idCumplimiento}
              fullWidth onChange={handleChange} value={cumplimientoSeleccionado && cumplimientoSeleccionado.id} />
          </Grid>
          <Grid item xs={12} md={4}> <TextField name="id_cosv" label="# Orden de Servicio" disabled="true"
            defaultValue={id_otr}
            fullWidth onChange={handleChange} value={cumplimientoSeleccionado && cumplimientoSeleccionado.id_cosv} />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl className={styles.formControl2}>
              <InputLabel id="idselecttipooperacion_cosv">Tipo</InputLabel>
              <Select
                disabled="true"
                labelId="selecttipooperacion_cosv"
                name="tipooperacion_cosv"
                id="idselecttipooperacion_cosv"
                value={tipooperacion}
                onChange={handleChange}
                fullWidth onChange={handleChange}
                value={cumplimientoSeleccionado && cumplimientoSeleccionado.tipooperacion_cosv}
              >
                <MenuItem value=""> <em>None</em> </MenuItem>
                {
                  listarTipoOperacion && listarTipoOperacion.map((itemselect) => {
                    return (
                      <MenuItem value={itemselect.id_tope}>{itemselect.descripcion_tope}</MenuItem>
                    )
                  })
                }
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField name="referencia_cosv" label="Referencia Producto"
              value={referencia}
              onChange={handleChange}
              fullWidth
              disabled="true"
              value={cumplimientoSeleccionado && cumplimientoSeleccionado.referencia_cosv}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl className={styles.formControl2}>
              <InputLabel id="tipofallamtto">Tipo de Falla</InputLabel>
              <Select
                labelId="selecttipofallamtto"
                name="tipofallamtto"
                id="idselecttipofallamtto"
                onClick={(e) => seleccionarFallaMtto(e.target.value)}
                onChange={handleChange}
              //value={cumplimientoSeleccionado && cumplimientoSeleccionado.tipofallamtto_cosv}
              >
                <MenuItem value=""> <em>None</em> </MenuItem>
                {
                  listarTiposFallas && listarTiposFallas.map((itemselect) => {
                    return (
                      <MenuItem value={itemselect.id_tfa}>{itemselect.descripcion_tfa}</MenuItem>
                    )
                  })
                }
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl className={styles.formControl2}>
              <InputLabel id="fallamtto_cosv">Falla del Equipo</InputLabel>
              <Select
                labelId="selecttfallamtto_cosv"
                name="tipofallamtto_cosv"
                id="idselectfallamtto_cosv"
                onChange={handleChange}
                value={cumplimientoSeleccionado && cumplimientoSeleccionado.tipofallamtto_cosv}
              >
                <MenuItem value=""> <em>None</em> </MenuItem>
                {
                  listarFallasMtto && listarFallasMtto.map((itemselect) => {
                    return (
                      <MenuItem value={itemselect.id_fmt}>{itemselect.descripcion_fmt}</MenuItem>
                    )
                  })
                }
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField className={styles.inputMaterial} label="Actividad Realizada" name="descripcion_cosv"
              value={actividadrealizada} onChange={handleChange}
              value={cumplimientoSeleccionado && cumplimientoSeleccionado.descripcion_cosv} />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl className={styles.formControl2}>
              <InputLabel id="servicio_cosv">Servicio Realizado</InputLabel>
              <Select
                labelId="selectservicio_cosv"
                name="servicio_cosv"
                id="idselectservicio_cosv"
                onChange={handleChange}
                value={cumplimientoSeleccionado && cumplimientoSeleccionado.servicio_cosv}
              >
                <MenuItem value=""> <em>None</em> </MenuItem>
                {
                  listarActividadRealizada && listarActividadRealizada.map((itemselect) => {
                    return (
                      <MenuItem value={itemselect.id_are}>{itemselect.descripcion_are}</MenuItem>
                    )
                  })
                }
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}> <TextField type="datetime" InputLabelProps={{ shrink: true }} name="fechainicia_cosv"
            defaultValue={Moment(cumplimientoSeleccionado.fechainicia_cosv).format('YYYY-MM-DD HH:mm:ss')}
            label="Fecha Inicia Actividad" fullWidth onChange={handleChange} />
          </Grid>
          <Grid item xs={12} md={4}> <TextField type="datetime" InputLabelProps={{ shrink: true }} name="fechafinal_cosv"
            defaultValue={Moment(cumplimientoSeleccionado.fechafinal_cosv).format('YYYY-MM-DD HH:mm:ss')}
            label="Fecha Finaliza Actividad" fullWidth onChange={handleChange} />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField className={styles.inputMaterial} name="cantidad_cosv" InputLabelProps={{ shrink: true }}
              value={cantidad} onChange={handleChange} label="Cantidad" fullWidth
              value={cumplimientoSeleccionado && cumplimientoSeleccionado.cantidad_cosv} />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField className={styles.inputMaterial} name="valorunitario_cosv" label="Valor Unitario" fullWidth
              InputLabelProps={{ shrink: true }} value={valorunitario} InputProps={{ inputComponent: NumberFormatCustom, }}
              onChange={handleChange} value={cumplimientoSeleccionado && cumplimientoSeleccionado.valorunitario_cosv} />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField className={styles.inputMaterial} type="numeric" name="valortotal_cosv" label="Valor Total"
              InputLabelProps={{ shrink: true }} fullWidt InputProps={{ inputComponent: NumberFormatCustom, }}
              value={cumplimientoSeleccionado && cumplimientoSeleccionado.valortotal_cosv} />
          </Grid>
          <Grid item xs={12} md={8}>
            <TextField className={styles.inputMaterial} label="Observaciones o Comentarios" name="observacion_cosv"
              value={observacion} onChange={handleChange}
              value={cumplimientoSeleccionado && cumplimientoSeleccionado.observacion_cosv} />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl className={styles.formControl2}>
              <InputLabel id="estadooperacionequipo_cosv">Estado del Equipo</InputLabel>
              <Select
                labelId="selectestadooperacionequipo_cosv"
                name="estadooperacionequipo_cosv"
                id="idselectestadooperacionequipo_cosv"
                onChange={(e) => setEstadoOperacionEquipos(e.target.value)}
                value={cumplimientoSeleccionado && cumplimientoSeleccionado.estadooperacionequipo_cosv}
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
        </Grid>
        <br />
        <div align="right">
          <Button className={styles.button} color="primary" onClick={() => guardarCambiosCumplimiento()} >Guardar</Button>
          <Button className={styles.button2} onClick={() => abrirCerrarModalActualizarCumplimiento()}>Cancelar</Button>
        </div>
      </div>
    </div>
  )

  const FotosOrden = (
    <Images numeroorden={id_otr} operario={operario} />
  )

  const RevisarCumplimiento = (
    <div className={styles.modalcumplimiento}>
      <br />
      <MaterialTable
        columns={cumplimiento}
        data={listUnCumplimiento}
        title="CONSULTA CUMPLIMIENTO ORDEN DE SERVICIO"
        actions={[
          {
            icon: 'edit',
            tooltip: 'Editar Item',
            onClick: (event, rowData) => seleccionarCumplimiento(rowData, "Editar")
          },
          {
            icon: 'delete',
            tooltip: 'Eliminar Item',
            onClick: (event, rowData) => seleccionarCumplimiento(rowData, "Eliminar")
          }
        ]}
        options={{
          actionsColumnIndex: -1,
          exportButton: true
        }}
        localization={{
          header: {
            actions: "Acciones"
          }
        }}

      />
    </div>
  )

  const CerrarOrden = (
    <div className={styles.modal}>
      <p>Estás seguro que desea Cerrar la Orden de Servicio <b> {id_otr} </b>? </p>
      <div align="right">
        <Button className={styles.button1} color="secondary" onClick={() => cerrarOrden()} > Confirmar </Button>
        <Button className={styles.button2} onClick={() => abrirCerrarModalCerrarOrden()}> Cancelar </Button>
      </div>
    </div>
  )

  const grabarHorometro = (
    <div className={styles.modal}>
      <Typography align="center" className={styles.typography} variant="button" display="block" >
        INGRESAR VALOR DEL HOROMETRO # {props.ordenSeleccionado.codigo_equ}
      </Typography>
      <br />
      <Grid container spacing={2} >
        <Grid item xs={12} md={4}>
          <TextField type="numeric" name="id" label="Ingresar Valor del Horometro"
            onChange={(e) => setHorometro(e.target.value)} fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField type="datetime-local" InputLabelProps={{ shrink: true }} name="iniciatransporte_otr"
            label="Hora Inicia Transporte" fullWidth defaultValue={Moment(fechaactual).format('YYYY-MM-DD HH:mm:ss')}
            onChange={(e) => setFechaIniciaTransporte(e.target.value)} />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField type="datetime-local" InputLabelProps={{ shrink: true }} name="finaltransporte_otr"
            label="Hora Finaliza Transporte" fullWidth defaultValue={Moment(fechaactual).format('YYYY-MM-DD HH:mm:ss')}
            onChange={(e) => setFechaFinalTransporte(e.target.value)} />
        </Grid>
      </Grid>
      <div align="right">
        <Button className={styles.button1} color="secondary" onClick={() => grabarValorHorometro()} > Confirmar </Button>
        <Button className={styles.button2} onClick={() => abrirCerrarModalGrabarHorometro()}> Cancelar </Button>
      </div>
    </div>
  )

  const ActividadEliminar = (
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar el Cumplimiento de la Orden <b>{cumplimientoSeleccionado && cumplimientoSeleccionado.id}</b>? </p>
      <div align="right">
        <Button className={styles.button} color="secondary" onClick={() => borraActividadOrden()}> Confirmar </Button>
        <Button className={styles.button2} onClick={() => abrirCerrarModalEliminarActividad()}> Cancelar </Button>
      </div>
    </div>
  )

  return (
    <div className="App">
      <br />
      <Typography align="center" className={styles.typography} variant="button" display="block" >
        - ORDEN DE SERVICIO # {props.ordenSeleccionado.id_otr}
      </Typography>

      <ButtonGroup orientation="vertical" className={styles.button} color="primary" aria-label="outlined primary button group">
        <Button>EMPRESA : {nombre_emp} </Button>
        <Button>CLIENTE : {razonsocial_cli} </Button>
        <Button>TELEFONO : {telefono_cli} </Button>
      </ButtonGroup>

      <ButtonGroup orientation="vertical" className={styles.button} color="primary" aria-label="outlined primary button group" >
        <Button text-align="right" >CONTACTO :{primer_apellido_con}{" "}{primer_nombre_con} </Button>
        <Button >CIUDAD : {nombre_ciu} </Button>
        <Button >CORREO : {email_cli} </Button>
      </ButtonGroup>

      <ButtonGroup orientation="vertical" className={styles.button} color="primary" aria-label="outlined primary button group">
        <Button >MARCA : {descripcion_mar} </Button>
        <Button >MODELO : {modelo_dequ} </Button>
        <Button >FECHA : {fechainicia_otr} </Button>
      </ButtonGroup>
      <ButtonGroup orientation="vertical" className={styles.button} color="primary" aria-label="outlined primary button group">
        <Button >SERIE : {serie_dequ}  </Button>
        <Button >ID INTERNO : {codigo_equ}  </Button>
        <Button variant="contained" color="primary" onClick={() => abrirCerrarModalGrabarHorometro()} >
          HOROMETRO : {horometro} </Button>
      </ButtonGroup>
      <ButtonGroup className={styles.button} color="primary" aria-label="outlined primary button group">
        <Button >TIPO DE SERVICIO : {descripcion_tser} </Button>
        <Button >TIPO DE ACTIVIDAD : {descripcion_tmt}  </Button>
      </ButtonGroup>
      <ButtonGroup className={styles.button} color="primary" aria-label="outlined primary button group">
        <Button variant="contained" color="primary" onClick={() => abrirCerrarModalGrabarHorometro()} >
          INICIA TRANSPORTE : {fechaIniciaTransporte}
        </Button>
        <Button variant="contained" color="primary" onClick={() => abrirCerrarModalGrabarHorometro()} >
          FINALIZA TRANSPORTE : {fechaFinalTransporte}
        </Button>
        <Button > TIEMPO DE TRANSPORTE : {tiempoTransporte} </Button>
        <Button > TIEMPO DE LA ORDEN : {tiempoorden_otr} </Button>
      </ButtonGroup>

      <Typography align="center" className={styles.typography} variant="button" display="block" >
        Dar Click sobre el Item que quieres agregar al Cumplimiento de la Orden de Servicio
      </Typography>

      <div style={{ placeholderColor: "grey" }}>
        <Autocomplete
          id="combo-box"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          options={listInventarios}
          getOptionLabel={(option) => option.referencia_inv}
          style={{ width: 810, marginLeft: 100 }}
          renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" />}
        />
      </div>
      <div>
        {
          <div className="App" >
            {
              !tipoRegistro ?
                (
                  <div>
                    <Button className={styles.button1} onClick={() => iniciarCumplimiento()} >Registrar Consumos </Button>
                    <Button className={styles.button1} onClick={() => agregarCumplimientoOperacion()} >Agregar Item </Button>
                    <Button className={styles.button2} onClick={() => agregarFotos()} >Agregar Fotos </Button>
                  </div>

                )
                :
                (
                  <div>
                    {
                      value ?
                        (
                          <Button className={styles.button1} onClick={() => iniciarCumplimiento()} >Iniciar Cumplimiento </Button>
                        )
                        :
                        (
                          console.log("Hasta no seleccionar un registro no se activa la opción de cumplimiento")
                        )
                    }
                    <Button className={styles.button1} onClick={() => agregarCumplimientoOperacion()} >Agregar Item </Button>
                    <Button className={styles.button2} onClick={() => agregarFotos()} >Agregar Fotos </Button>
                    {
                      activo ? (
                        <div>
                          <Button className={styles.button2} onClick={() => consultarCumplimiento()} >Revisar Cumplimiento </Button>
                          {
                            !operario ?
                              (
                                idUsuario != 7 ?
                                  <Button className={styles.button3} onClick={() => abrirCerrarModalCerrarOrden()} >Cerrar Orden </Button>
                                  :
                                  null
                              )
                              :
                              (
                                null
                              )
                          }
                          <Button className={styles.button1} onClick={() => pasarARevision()} >Pasar a Revisión </Button>
                        </div>
                      )
                        :
                        (
                          console.log("NO hay registros de cumplimiento")
                        )

                    }
                  </div>
                )

            }

          </div>
        }
      </div>

      <Modal
        open={modalCumplimiento}
        onClose={abrirCerrarModalCumplimiento}
      >
        {CumplimientoOrden}
      </Modal>

      <Modal
        open={modalFotos}
        onClose={abrirCerrarModalFotos}
      >
        {FotosOrden}
      </Modal>

      <Modal
        open={modalRevisarCumplimiento}
        onClose={abrirCerrarModalRevisarCumplimiento}
      >
        {RevisarCumplimiento}
      </Modal>

      <Modal
        open={modalCerrarOrden}
        onClose={abrirCerrarModalCerrarOrden}
      >
        {CerrarOrden}
      </Modal>

      <Modal
        open={modalGrabarHorometro}
        onClose={abrirCerrarModalGrabarHorometro}
      >
        {grabarHorometro}
      </Modal>

      <Modal
        open={modalActualizarCumplimiento}
        onClose={abrirCerrarModalActualizarCumplimiento}
      >
        {actualizarCumplimiento}
      </Modal>

      <Modal
        open={modalEliminarActividad}
        onClose={abrirCerrarModalEliminarActividad}
      >
        {ActividadEliminar}
      </Modal>

    </div>
  );
}

export default ActividadesOserv;