import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { Modal, TextField, Button, Select, MenuItem, FormControl, InputLabel, Typography, Grid, ButtonGroup } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DoneOutlineTwoToneIcon from '@material-ui/icons/DoneOutlineTwoTone';
import ErrorTwoToneIcon from '@material-ui/icons/ErrorTwoTone';
import EvStationIcon from '@material-ui/icons/EvStation';
import { green, blue, blueGrey, red } from '@material-ui/core/colors';
import NumberFormat from 'react-number-format';
import swal from 'sweetalert';
import Moment from 'moment';

// Componentes de Conexion con el Backend
import inventariosServices from "../../../services/Almacenes/Inventarios";
import cumplimientooservServices from "../../../services/GestionOrdenes/CumplimientoOserv";
import tipooperacionServices from "../../../services/GestionOrdenes/TipoOperacion";
import actividadrealizadaServices from "../../../services/GestionOrdenes/ActividadRealizada";
import crearordenesServices from "../../../services/GestionOrdenes/CrearOrdenes";

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
    minWidth: 515,
    maxWidth: 515,
  },
  formControl2: {
    margin: theme.spacing(0),
    minWidth: 220,
    maxWidth: 220,
  },
  typography: {
    fontSize: 14,
    color: "#ff3d00"
  },
  typography2: {
    fontSize: 14,
    color: "#d50000"
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
  button: {
    color: theme.palette.getContrastText(blueGrey[500]),
    backgroundColor: green[700],
    margin: theme.spacing(0.5),
    fontSize: 12,
    '&:hover': {
      backgroundColor: blue[700],
    },
  },
  button2: {
    color: theme.palette.getContrastText(blueGrey[500]),
    backgroundColor: red[700],
    margin: theme.spacing(0.5),
    fontSize: 12,
    '&:hover': {
      backgroundColor: blue[700],
    },
  },
  button3: {
    color: theme.palette.getContrastText(blueGrey[500]),
    backgroundColor: blue[700],
    margin: theme.spacing(0.5),
    fontSize: 12,
    '&:hover': {
      backgroundColor: blue[700],
    },
  }
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
    />
  );
}
function ActividadesOservChequeo(props) {
  const { id_otr, nombre_emp, razonsocial_cli, telefono_cli, nombre_ciu, email_cli, descripcion_mar, modelo_dequ,
    fechainicia_otr, descripcion_tser, descripcion_tmt, serie_dequ, codigo_equ, descripcion_con, tipooperacion_otr,
    referencia_dequ, horometro_otr, iniciatransporte_otr, finaltransporte_otr, tiempotransporte_otr, tiempoorden_otr,
    primer_apellido_con, primer_nombre_con, estado_otr
  } = props.ordenSeleccionado;

  const styles = useStyles();
  const [listInventarios, setListInventarios] = useState([]);
  const [listUnCumplimiento, setListUnCumplimiento] = useState([]);
  const [modalCumplimiento, setModalCumplimiento] = useState(false);
  const [modalCerrarOrden, setModalCerrarOrden] = useState(false);
  const [modalGrabarHorometro, setModalGrabarHorometro] = useState(false);
  const [modalRevisarCumplimiento, setModalRevisarCumplimiento] = useState(false);
  const [modalActualizarCumplimiento, setModalActualizarCumplimiento] = useState(false);
  const [formError, setFormError] = useState(false);
  const [listarTipoOperacion, setListarTipoOperacion] = useState([]);
  const [listarActividadRealizada, setListarActividadRealizada] = useState([]);
  const [grabar, setGrabar] = React.useState(false);
  const [controlHorometro, setControlHorometro] = React.useState(false);
  const [grabarCambios, setGrabarCambios] = React.useState(false)
  const fechaactual = Moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
  const horaactual = Moment(new Date()).format('HH:mm:ss');
  const [activo, setActivo] = useState(false);
  const [actualiza, setActualiza] = useState(false);

  const [modalCumplimientoBateria, setModalCumplimientoBateria] = useState(false);
  const [modalCumplimientoCargador, setModalCumplimientoCargador] = useState(false);
  const [listChequeoEntrega, setListChequeoEntrega] = useState([]);
  const [listChequeoRecepcion, setListChequeoRecepcion] = useState([]);
  const [listRecepcionAlmacen, setListRecepcionAlmacen] = useState([]);
  const [tipooperacion, setTipoOperacion] = useState(0);
  const [referencia, setReferencia] = useState(0);
  const [actividadrealizada, setActividadrealizada] = useState(0);
  const [cantidad, setCantidad] = useState(0);
  const [valorunitario, setValorunitario] = useState(0);
  const [horometro, setHorometro] = useState(horometro_otr);
  const [serviciorealizado, setServicioRealizado] = useState(4);
  const [observacion, setObservacion] = useState(0);

  const [idcomponente, setIdComponente] = useState(0);
  const [seriecomponente, setSerieComponente] = useState(0);
  const [voltajecomponente, setVoltajeComponente] = useState(0);
  const [voltajesalidasulfatacion, setVoltajeSalidaSulfatacion] = useState(0);
  const [amperajecomponente, setAmperajeComponente] = useState(0);
  const [celdasreferenciacomponente, setCeldasReferenciaComponente] = useState(0);
  const [cofreseriecomponentes, setCofreSerieComponentes] = useState(0);
  const [estadocomponentes, setEstadoComponentes] = useState(0);
  const [grabarBateria, setGrabarBateria] = React.useState(false);
  const [bateriaCargador, setBateriaCargador] = React.useState(false);

  const [tiempoTransporte, setTiempoTransporte] = useState(tiempotransporte_otr);
  const [idCumplimiento, setIdCumplimiento] = useState(0);
  const [fechaIniciaTransporte, setFechaIniciaTransporte] = useState(iniciatransporte_otr);
  const [fechaFinalTransporte, setFechaFinalTransporte] = useState(finaltransporte_otr);
  const [inventariosSeleccionado, setInventariosSeleccionado] = useState([]);
  const [orden, setOrden] = useState([]);

  let servicio = 4;
  let fallamtto = 0;

  const [cumplimientoSeleccionado, setCumplimientoSeleccionado] = useState({
    id: idCumplimiento,
    id_cosv: id_otr,
    descripcion_cosv: "",
    tipooperacion_cosv: tipooperacion_otr,
    tipofallamtto_cosv: fallamtto,
    tipofallamtto_cosv: 0,
    referencia_cosv: referencia_dequ,
    fechainicia_cosv: fechaactual,
    fechafinal_cosv: fechaactual,
    horainiciacosv: horaactual,
    horafinal_cosv: horaactual,
    cantidad_cosv: 0,
    valorunitario_cosv: 0,
    valortotal_cosv: 0,
    servicio_cosv: servicio,
    observacion_cosv: "",
    tiempoactividad_cosv: 0,
    idcomponente: 0,
    seriecomponente: 0,
    voltajecomponente: 0,
    voltajesalidasulfatacion: 0,
    amperajecomponente: 0,
    celdasreferenciacomponente: 0,
    cofreseriecomponentes: 0,
    estadocomponentes: 0
  });

  useEffect(() => {
    async function fetchDataListaChequeoEntrega() {
      const res = await inventariosServices.listEntregaEquipos();
      setListChequeoEntrega(res.data);
      setActualiza(false);
      //console.log("LISTA CHEQUEO ENTREGA : ", res.data);
    }
    fetchDataListaChequeoEntrega();
  }, [actualiza])

  useEffect(() => {
    async function fetchDataListaChequeoRecepcion() {
      const res = await inventariosServices.listRecepcionEquipos();
      setListChequeoRecepcion(res.data);
      setActualiza(false);
      //console.log("LISTA CHEQUEO RECEPCION : ", res.data);
    }
    fetchDataListaChequeoRecepcion();
  }, [actualiza])

  useEffect(() => {
    async function fetchDataRecepcionAlmacen() {
      const res = await inventariosServices.listRecepcionAlmacen();
      setListRecepcionAlmacen(res.data);
      //console.log("RECEPCION ALMACEN : ", res.data)
      setActualiza(false);
    }
    fetchDataRecepcionAlmacen();
  }, [])

  useEffect(() => {
    async function fetchDataInventarios() {
      const res = await inventariosServices.listInventarios();
      setListInventarios(res.data);
    }
    fetchDataInventarios();
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
    async function fetchDataUnCumplimiento() {
      const res = await cumplimientooservServices.listUnCumplimiento(id_otr);
      setListUnCumplimiento(res.data);
      if (res.data) {
        setActivo(true)
      } else { setActivo(false) }
      //console.log("UN CUMPLIMIENTO : ", listUnCumplimiento);
    }
    fetchDataUnCumplimiento();
  }, [actualiza])

  const pasarArevision = async () => {
    if (!horometro) {
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
    if (estado_otr === 24 || estado_otr === 27) {
      swal("Estado Orden", "El estado de la orden no permite CERRAR", "warning", { button: "Aceptar" });
    } else {
      if (!horometro_otr) {
        swal("Horometro", "El valor del Horometro no puede ser CERO", "warning", { button: "Aceptar" });
      } else {
        const res = await crearordenesServices.cerrarot(id_otr);

        if (res.success)
          swal("Orden de Servicio", "Orden de Trabajo Cerrada!", "success", { button: "Aceptar" });
        else
          swal("Orden de Servicio", "Error Cerrando la Orden de Trabajo!", "success", { button: "Aceptar" });

        setActualiza(true);
        console.log(res.message)
      }
    }
  }

  const grabarValorHorometro = async () => {

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
        //console.log("VALOR DEL HOROMETRO : ", orden[0])

        const res = await crearordenesServices.update(orden[0]);

        if (res.success) {
          swal("Horometro", "Valor del Horometro Actualizado!", "success", { button: "Aceptar" });
          console.log(res.message)
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
  }, [controlHorometro])

  const handleChange = e => {
    const { name, value } = e.target;

    setCumplimientoSeleccionado(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const chequeoOK = async (inventario) => {
    setFormError({});
    {
      let resultado = (cantidad * valorunitario)
      let nuevoid = id_otr + inventario.referencia_inv;

      setCumplimientoSeleccionado([{
        id: nuevoid,
        id_cosv: props.ordenSeleccionado.id_otr,
        descripcion_cosv: inventario.descripcion_inv,
        tipooperacion_cosv: tipooperacion_otr,
        tipofallamtto_cosv: 0,
        referencia_cosv: inventario.referencia_inv,
        fechainicia_cosv: fechaactual,
        fechafinal_cosv: fechaactual,
        horainiciacosv: horaactual,
        horafinal_cosv: horaactual,
        cantidad_cosv: 0,
        valorunitario_cosv: 0,
        valortotal_cosv: 0,
        servicio_cosv: serviciorealizado,
        observacion_cosv: 'Chequeo del componente en buen estado'
        //cumplimientoSeleccionado
      }]);
    }
    setGrabar(true);
  }

  const seleccionarInventarios = (inventarios, caso) => {
    if (estado_otr !== 21 && estado_otr !== 26 && estado_otr !== 34) {
      swal("Orden de Trabajo", "Estado de la Orden no permite ingresar actividad!", "warning", { button: "Aceptar" });
    } else {
      if (inventarios.referencia_inv === "DATOSBATERIA1" || inventarios.referencia_inv === "DATOSBATERIA2" ||
        inventarios.referencia_inv === "DATOSCARGADOR1" || inventarios.referencia_inv === "DATOSCARGADOR2") {
        swal("Orden de Trabajo", "Registro Información de Baterias y Cargadores No Valida!", "warning", { button: "Aceptar" });
      } else {
        setInventariosSeleccionado(inventarios);
        setActividadrealizada(inventarios.descripcion_inv);
        let nuevoid = id_otr + inventarios.referencia_inv;
        setReferencia(inventarios.referencia_inv);
        setIdCumplimiento(nuevoid);
        //console.log("NUEVO ID DE INVENTARIO : ", nuevoid);
        (caso === "chequeoOK") ? chequeoOK(inventarios) : abrirCerrarModalCumplimiento()
      }
    }
  }

  const seleccionarBateria = (inventarios, caso) => {
    if (estado_otr !== 21 && estado_otr !== 26 && estado_otr !== 34) {
      swal("Orden de Trabajo", "Estado de la Orden no permite ingresar actividad!", "warning", { button: "Aceptar" });
    } else {
      if (inventarios.referencia_inv !== "DATOSBATERIA1" && inventarios.referencia_inv !== "DATOSBATERIA2" &&
        inventarios.referencia_inv !== "DATOSCARGADOR1" && inventarios.referencia_inv !== "DATOSCARGADOR2") {
        swal("Orden de Trabajo", "Esta Opcion solo para Baterias y Cargadores!", "warning", { button: "Aceptar" });
      } else {
        //console.log("INVENTARIOS BATERIA : ", inventarios);
        setInventariosSeleccionado(inventarios);
        setActividadrealizada(inventarios.descripcion_inv);
        let nuevoid = id_otr + inventarios.referencia_inv;

        let componente = "Bateria";

        if (inventarios.referencia_inv === "DATOSBATERIA1" || inventarios.referencia_inv === "DATOSBATERIA2") {
          componente = "Bateria";
          setBateriaCargador(true);
        } else {
          if (inventarios.referencia_inv === "DATOSCARGADOR1" || inventarios.referencia_inv === "DATOSCARGADOR2") {
            componente = "Cargador";
            setBateriaCargador(true);
          }
        }
        setReferencia(inventarios.referencia_inv);
        setIdCumplimiento(nuevoid);
        //console.log("NUEVO ID DE INVENTARIO : ", nuevoid);
        (caso === componente) ? abrirCerrarModalCumplimientoBateria() : abrirCerrarModalCumplimientoCargador()
      }
    }
  }

  const seleccionarCumplimiento = (cumplimiento, caso) => {
    //console.log(cumplimiento)
    setCumplimientoSeleccionado(cumplimiento);
    setActividadrealizada(cumplimiento.descripcion_cosv);
    setObservacion(cumplimiento.observacion_cosv);
    (caso === "Editar") ? abrirCerrarModalCumplimiento() : abrirCerrarModalEliminarActividad()
  }

  const abrirCerrarModalCumplimientoBateria = () => {
    setModalCumplimientoBateria(!modalCumplimientoBateria);
  }

  const abrirCerrarModalCumplimientoCargador = () => {
    setModalCumplimientoCargador(!modalCumplimientoCargador);
  }

  const abrirCerrarModalCumplimiento = () => {
    setModalCumplimiento(!modalCumplimiento);
  }

  const abrirCerrarModalActualizarCumplimiento = () => {
    setModalActualizarCumplimiento(!modalActualizarCumplimiento);
  }

  const abrirCerrarModalGrabarHorometro = () => {
    setModalGrabarHorometro(!modalGrabarHorometro);
  }

  const consultarCumplimiento = () => {
    async function fetchDataUnCumplimiento() {
      const res = await cumplimientooservServices.listUnCumplimiento(props.ordenSeleccionado.id_otr);
      setListUnCumplimiento(res.data);
      //console.log("LEE DATOS CUMPLIMIENTO ORDEN : ", res.data)
      if (res.data) {
        setActivo(true)
      } else {
        setActivo(false)
      }
      abrirCerrarModalRevisarCumplimiento();
    }
    fetchDataUnCumplimiento();
  }

  const abrirCerrarModalRevisarCumplimiento = () => {
    setModalRevisarCumplimiento(!modalRevisarCumplimiento);
  }

  const abrirCerrarModalCerrarOrden = () => {
    setModalCerrarOrden(!modalCerrarOrden);
  }

  const adicionarCumplimiento = async () => {
    setFormError({});
    let errors = {};
    let formOk = true;

    {
      let resultado = (cantidad * valorunitario)

      setCumplimientoSeleccionado([{
        id: idCumplimiento,
        id_cosv: props.ordenSeleccionado.id_otr,
        descripcion_cosv: actividadrealizada,
        tipooperacion_cosv: tipooperacion_otr,
        tipofallamtto_cosv: 0,
        referencia_cosv: referencia,
        fechainicia_cosv: fechaactual,
        fechafinal_cosv: fechaactual,
        horainiciacosv: horaactual,
        horafinal_cosv: horaactual,
        cantidad_cosv: cantidad,
        valorunitario_cosv: valorunitario,
        valortotal_cosv: resultado,
        servicio_cosv: serviciorealizado,
        observacion_cosv: observacion
        //cumplimientoSeleccionado
      }]);
    }
    setGrabar(true);
    setActualiza(true);
  }

  const adicionarCumplimientoBateria = async () => {
    setFormError({});
    let errors = {};
    let formOk = true;
    //console.log("CUMPLIMIENTO BATERIA : ",cumplimientoSeleccionado)

    {
      let resultado = (cantidad * valorunitario)

      setCumplimientoSeleccionado([{
        id: idCumplimiento,
        id_cosv: props.ordenSeleccionado.id_otr,
        descripcion_cosv: actividadrealizada,
        tipooperacion_cosv: tipooperacion_otr,
        tipofallamtto_cosv: 0,
        referencia_cosv: referencia,
        fechainicia_cosv: fechaactual,
        fechafinal_cosv: fechaactual,
        horainiciacosv: horaactual,
        horafinal_cosv: horaactual,
        cantidad_cosv: cantidad,
        valorunitario_cosv: valorunitario,
        valortotal_cosv: resultado,
        servicio_cosv: serviciorealizado,
        observacion_cosv: observacion,
        idcomponente: idcomponente,
        seriecomponente: seriecomponente,
        voltajecomponente: voltajecomponente,
        voltajesalidasulfatacion: voltajesalidasulfatacion,
        amperajecomponente: amperajecomponente,
        celdasreferenciacomponente: celdasreferenciacomponente,
        cofreseriecomponentes: cofreseriecomponentes,
        estadocomponentes: estadocomponentes
      }]);
    }
    setGrabarBateria(true);
    setActualiza(true);
  }

  const guardarCambiosCumplimiento = async () => {
    {
      //console.log("DATOS A GRABAR EN CUMPLIMIENTO : ",cumplimientoSeleccionado)

      let resultado = (cantidad * valorunitario)
      //Asignar Valores al Estado Cumplimiento
      setCumplimientoSeleccionado([{
        id: cumplimientoSeleccionado.id,
        id_cosv: props.ordenSeleccionado.id_otr,
        descripcion_cosv: cumplimientoSeleccionado.descripcion_cosv,
        tipooperacion_cosv: cumplimientoSeleccionado.tipooperacion_cosv,
        tipofallamtto_cosv: 0,
        referencia_cosv: cumplimientoSeleccionado.referencia_cosv,
        fechainicia_cosv: cumplimientoSeleccionado.fechainicia_cosv,
        fechafinal_cosv: cumplimientoSeleccionado.fechafinal_cosv,
        horainiciacosv: cumplimientoSeleccionado.horainiciacosv,
        horafinal_cosv: cumplimientoSeleccionado.horafinal_cosv,
        cantidad_cosv: cantidad,
        valorunitario_cosv: valorunitario,
        valortotal_cosv: resultado,
        servicio_cosv: cumplimientoSeleccionado.servicio_cosv,
        observacion_cosv: cumplimientoSeleccionado.observacion_cosv
        //cumplimientoSeleccionado
      }]);
    }
    setGrabarCambios(true);
    setActualiza(true);
  }

  useEffect(() => {
    async function guardarCambiosCumplimiento() {
      if (grabarCambios) {

        const res = await cumplimientooservServices.update(cumplimientoSeleccionado[0]);

        if (res.success) {
          swal("Orden de Servicio", "Orden de Servicio Actualizada de forma Correcta!", "success", { button: "Aceptar" });
          delete cumplimientoSeleccionado.descripcion_cosv;
          delete cumplimientoSeleccionado.tipooperacion_cosv;
          delete cumplimientoSeleccionado.referencia_cosv;
          delete cumplimientoSeleccionado.fechainicia_cosv;
          delete cumplimientoSeleccionado.fechafinal_cosv;
          delete cumplimientoSeleccionado.horainiciacosv;
          delete cumplimientoSeleccionado.horafinal_cosv;
          delete cumplimientoSeleccionado.cantidad_cosv;
          delete cumplimientoSeleccionado.valorunitario_cosv;
          delete cumplimientoSeleccionado.valortotal_cosv;
          delete cumplimientoSeleccionado.servicio_cosv;
          delete cumplimientoSeleccionado.observacion_cosv;
          console.log(res.message);
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

  useEffect(() => {
    async function grabarCumplimiento() {
      if (grabar) {
        //console.log("VALIDAR DATOS A GRABAR : ",cumplimientoSeleccionado[0])

        const res = await cumplimientooservServices.save(cumplimientoSeleccionado[0]);

        if (res.success) {
          swal("Actividades Orden de Servicio", "Creada de forma Correcta!", "success", { button: "Aceptar" });
          delete cumplimientoSeleccionado.descripcion_cosv;
          delete cumplimientoSeleccionado.tipooperacion_cosv;
          delete cumplimientoSeleccionado.referencia_cosv;
          delete cumplimientoSeleccionado.fechainicia_cosv;
          delete cumplimientoSeleccionado.fechafinal_cosv;
          delete cumplimientoSeleccionado.horainiciacosv;
          delete cumplimientoSeleccionado.horafinal_cosv;
          delete cumplimientoSeleccionado.cantidad_cosv;
          delete cumplimientoSeleccionado.valorunitario_cosv;
          delete cumplimientoSeleccionado.valortotal_cosv;
          delete cumplimientoSeleccionado.servicio_cosv;
          delete cumplimientoSeleccionado.observacion_cosv;
          console.log(res.message)
        } else {
          swal("Actividades Orden de Servicio", "Error registrando la Actividad!", "error", { button: "Aceptar" });
          console.log(res.message);
        }
        setActualiza(true);
        setGrabar(false);
        //abrirCerrarModalCumplimiento();
      }
    }
    grabarCumplimiento();
  }, [grabar])

  useEffect(() => {
    async function grabarCumplimientoBateria() {
      if (grabarBateria) {
        //console.log("VALIDAR DATOS A GRABAR BATERIA: ",cumplimientoSeleccionado[0])

        const res = await cumplimientooservServices.save(cumplimientoSeleccionado[0]);

        if (res.success) {
          swal("Actividades Orden de Servicio", "Datos Batería Ingresados Correctamente!", "success", { button: "Aceptar" });
          delete cumplimientoSeleccionado.descripcion_cosv;
          delete cumplimientoSeleccionado.tipooperacion_cosv;
          delete cumplimientoSeleccionado.referencia_cosv;
          delete cumplimientoSeleccionado.fechainicia_cosv;
          delete cumplimientoSeleccionado.fechafinal_cosv;
          delete cumplimientoSeleccionado.horainiciacosv;
          delete cumplimientoSeleccionado.horafinal_cosv;
          delete cumplimientoSeleccionado.cantidad_cosv;
          delete cumplimientoSeleccionado.valorunitario_cosv;
          delete cumplimientoSeleccionado.valortotal_cosv;
          delete cumplimientoSeleccionado.servicio_cosv;
          delete cumplimientoSeleccionado.observacion_cosv;
          console.log(res.message)
        } else {
          swal("Actividades Orden de Servicio", "Error Datos Bateria!", "error", { button: "Aceptar" });
          console.log(res.message);
        }
        setActualiza(true);
        setGrabarBateria(false);
        if (bateriaCargador)
          abrirCerrarModalCumplimientoBateria();
        else
          abrirCerrarModalCumplimientoCargador();
      }
    }
    grabarCumplimientoBateria();
  }, [grabarBateria])

  const cumplimiento = [
    {
      title: 'Actividad',
      field: 'descripcion_inv',
      cellStyle: { minWidth: 200 }
    },
    {
      title: 'Referencia',
      field: 'referencia_inv',
      cellStyle: { minWidth: 300 }
    },
    {
      title: 'Fecha Inicia',
      field: 'fechaactualizacion_inv',
      type: "date",
      cellStyle: { minWidth: 100 }
    },
    {
      title: 'Fecha Fin',
      field: 'fechaactualizacion_inv',
      type: "date",
      cellStyle: { minWidth: 100 }
    },
    {
      title: 'Tipo Operación',
      field: 'descripcion_tprd',
      cellStyle: { minWidth: 100 }
    },
    {
      title: 'Descripción',
      field: 'descripcion_tope',
      cellStyle: { minWidth: 200 }
    }
  ]

  const consultacumplimiento = [
    {
      title: 'Id Cumplimiento',
      field: 'id',
      cellStyle: { minWidth: 80 }
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
      title: 'Servicio',
      field: 'servicio_cosv',
      cellStyle: { minWidth: 100 }
    },
    {
      title: 'Observación',
      field: 'observacion_cosv',
      cellStyle: { minWidth: 250 }
    }
  ]

  const CumplimientoOrden = (
    <div className="App" >
      <div className={styles.modal}>
        <Typography align="center" className={styles.typography} variant="button" display="block" >
          Registrar Actividades Lista de Chequeo
        </Typography>
        <br />
        <Grid container spacing={2} >
          <Grid item xs={12} md={2}> <TextField name="id" label="Id Cumplimiento" disabled="true"
            defaultValue={idCumplimiento}
            fullWidth onChange={handleChange} />
          </Grid>
          <Grid item xs={12} md={2}> <TextField name="id_cosv" label="# Orden de Servicio" disabled="true"
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
                defaultValue={tipooperacion_otr}
                onChange={(e) => setTipoOperacion(e.target.value)}
                fullWidth onChange={handleChange}
              >
                <MenuItem value=""> <em>None</em> </MenuItem>
                {
                  listarTipoOperacion.map((itemselect) => {
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
              defaultValue={referencia_dequ}
              onChange={(e) => setReferencia(e.target.value)}
              fullWidth
              disabled="true"
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <TextField className={styles.inputMaterial} label="Actividad Realizada" name="descripcion_cosv"
              value={actividadrealizada}
              onChange={(e) => setActividadrealizada(e.target.value)} />
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
                  listarActividadRealizada.map((itemselect) => {
                    return (
                      <MenuItem value={itemselect.id_are}>{itemselect.descripcion_are}</MenuItem>
                    )
                  })
                }
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}> <TextField type="date" InputLabelProps={{ shrink: true }} name="fechainicia_cosv"
            defaultValue={Moment(inventariosSeleccionado.fechaactual).format('YYYY-MM-DD')}
            label="Fecha Inicia Actividad" fullWidth
            value={fechaactual}
            onChange={handleChange} />
          </Grid>
          <Grid item xs={12} md={3}> <TextField type="date" InputLabelProps={{ shrink: true }} name="fechafinal_cosv"
            defaultValue={Moment(inventariosSeleccionado.fechaactual).format('YYYY-MM-DD')}
            label="Fecha Finaliza Actividad" fullWidth
            value={fechaactual}
            onChange={handleChange} />
          </Grid>
          <Grid item xs={12} md={3}> <TextField type="time" InputLabelProps={{ shrink: true }} name="horainiciacosv"
            label="Hora Inicia Actividad" fullWidth
            defaultValue={Moment(inventariosSeleccionado.horaactual).format('HH:mm:ss')}
            value={horaactual}
            onChange={handleChange} />
          </Grid>
          <Grid item xs={12} md={3}> <TextField type="time" InputLabelProps={{ shrink: true }} name="horafinal_cosv"
            label="Hora Final Actividad" fullWidth
            defaultValue={Moment(inventariosSeleccionado.horaactual).format('HH:mm:ss')}
            value={horaactual}
            onChange={handleChange} />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField className={styles.inputMaterial} label="Observación" name="observacion_cosv"
              onChange={(e) => setObservacion(e.target.value)} />
          </Grid>
        </Grid>
        <br />
        <div align="right">
          <Button className={styles.button} color="primary" onClick={() => adicionarCumplimiento()} >Guardar</Button>
          <Button className={styles.button2} onClick={() => abrirCerrarModalCumplimiento()}>Cancelar</Button>
        </div>
      </div>
    </div>
  )

  const CumplimientoOrdenBateria = (
    <div className="App" >
      <div className={styles.modal}>
        <Typography align="center" className={styles.typography} variant="button" display="block" >
          Registrar Datos Batería
        </Typography>
        <br />
        <Grid container spacing={2} >
          <Grid item xs={12} md={2}> <TextField name="id" label="Id Cumplimiento" disabled="true"
            defaultValue={idCumplimiento}
            fullWidth onChange={handleChange} />
          </Grid>
          <Grid item xs={12} md={2}> <TextField name="id_cosv" label="# Orden de Servicio" disabled="true"
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
                defaultValue={tipooperacion_otr}
                onChange={(e) => setTipoOperacion(e.target.value)}
                fullWidth onChange={handleChange}
              >
                <MenuItem value=""> <em>None</em> </MenuItem>
                {
                  listarTipoOperacion.map((itemselect) => {
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
              defaultValue={referencia_dequ}
              onChange={(e) => setReferencia(e.target.value)}
              fullWidth
              disabled="true"
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <TextField className={styles.inputMaterial} label="Actividad Realizada" name="descripcion_cosv"
              value={actividadrealizada}
              onChange={(e) => setActividadrealizada(e.target.value)} />
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
                  listarActividadRealizada.map((itemselect) => {
                    return (
                      <MenuItem value={itemselect.id_are}>{itemselect.descripcion_are}</MenuItem>
                    )
                  })
                }
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField className={styles.inputMaterial} label="ID Batería" name="idcomponente"
              onChange={(e) => setIdComponente(e.target.value)} />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField className={styles.inputMaterial} label="Serie Batería" name="seriecomponente"
              onChange={(e) => setSerieComponente(e.target.value)} />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField className={styles.inputMaterial} label="Voltaje" name="voltajecomponente"
              onChange={(e) => setVoltajeComponente(e.target.value)} />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField className={styles.inputMaterial} label="Amperaje" name="amperajecomponente"
              onChange={(e) => setAmperajeComponente(e.target.value)} />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField className={styles.inputMaterial} label="Celdas" name="celdasreferenciacomponente"
              onChange={(e) => setCeldasReferenciaComponente(e.target.value)} />

          </Grid>
          <Grid item xs={12} md={3}>
            <TextField className={styles.inputMaterial} label="Cofre" name="cofreseriecomponentes"
              onChange={(e) => setCofreSerieComponentes(e.target.value)} />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField className={styles.inputMaterial} label="Sulfatación" name="voltajesalidasulfatacion"
              onChange={(e) => setVoltajeSalidaSulfatacion(e.target.value)} />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField className={styles.inputMaterial} label="Estado" name="estadocomponentes"
              onChange={(e) => setEstadoComponentes(e.target.value)} />
          </Grid>
          <Grid item xs={12} md={8}>
            <TextField className={styles.inputMaterial} label="Observación" name="observacion_cosv"
              onChange={(e) => setObservacion(e.target.value)} />
          </Grid>
        </Grid>
        <br />
        <div align="right">
          <Button className={styles.button} color="primary" onClick={() => adicionarCumplimientoBateria()} >Guardar</Button>
          <Button className={styles.button2} onClick={() => abrirCerrarModalCumplimientoBateria()}>Cancelar</Button>
        </div>
      </div>
    </div>
  )

  const CumplimientoOrdenCargador = (
    <div className="App" >
      <div className={styles.modal}>
        <Typography align="center" className={styles.typography} variant="button" display="block" >
          Registrar Datos Cargador
        </Typography>
        <br />
        <Grid container spacing={2} >
          <Grid item xs={12} md={2}> <TextField name="id" label="Id Cumplimiento" disabled="true"
            defaultValue={idCumplimiento}
            fullWidth onChange={handleChange} />
          </Grid>
          <Grid item xs={12} md={2}> <TextField name="id_cosv" label="# Orden de Servicio" disabled="true"
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
                defaultValue={tipooperacion_otr}
                onChange={(e) => setTipoOperacion(e.target.value)}
                fullWidth onChange={handleChange}
              >
                <MenuItem value=""> <em>None</em> </MenuItem>
                {
                  listarTipoOperacion.map((itemselect) => {
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
              defaultValue={referencia_dequ}
              onChange={(e) => setReferencia(e.target.value)}
              fullWidth
              disabled="true"
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <TextField className={styles.inputMaterial} label="Actividad Realizada" name="descripcion_cosv"
              value={actividadrealizada}
              onChange={(e) => setActividadrealizada(e.target.value)} />
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
                  listarActividadRealizada.map((itemselect) => {
                    return (
                      <MenuItem value={itemselect.id_are}>{itemselect.descripcion_are}</MenuItem>
                    )
                  })
                }
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField className={styles.inputMaterial} label="ID Cargador" name="idcomponente"
              onChange={(e) => setIdComponente(e.target.value)} />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField className={styles.inputMaterial} label="Serie Cargador" name="seriecomponente"
              onChange={(e) => setSerieComponente(e.target.value)} />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField className={styles.inputMaterial} label="Voltaje Entrada" name="voltajecomponente"
              onChange={(e) => setVoltajeComponente(e.target.value)} />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField className={styles.inputMaterial} label="Voltaje Salida" name="voltajesalidasulfatacion"
              onChange={(e) => setVoltajeSalidaSulfatacion(e.target.value)} />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField className={styles.inputMaterial} label="Amperaje Salida" name="amperajecomponente"
              onChange={(e) => setAmperajeComponente(e.target.value)} />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField className={styles.inputMaterial} label="Referencia" name="celdasreferenciacomponente"
              onChange={(e) => setCeldasReferenciaComponente(e.target.value)} />

          </Grid>
          <Grid item xs={12} md={3}>
            <TextField className={styles.inputMaterial} label="Serie" name="cofreseriecomponentes"
              onChange={(e) => setCofreSerieComponentes(e.target.value)} />
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField className={styles.inputMaterial} label="Estado" name="estadocomponentes"
              onChange={(e) => setEstadoComponentes(e.target.value)} />
          </Grid>
          <Grid item xs={12} md={8}>
            <TextField className={styles.inputMaterial} label="Observación" name="observacion_cosv"
              onChange={(e) => setObservacion(e.target.value)} />
          </Grid>
        </Grid>
        <br />
        <div align="right">
          <Button className={styles.button} color="primary" onClick={() => adicionarCumplimientoBateria()} >Guardar</Button>
          <Button className={styles.button2} onClick={() => abrirCerrarModalCumplimientoCargador()}>Cancelar</Button>
        </div>
      </div>
    </div>
  )

  const actualizarCumplimiento = (
    <div className="App" >
      <div className={styles.modal}>
        <Typography align="center" className={styles.typography} variant="button" display="block" >
          Actualizar Cumplimiento
      </Typography>
        <br />
        <Grid container spacing={2} >
          <Grid item xs={12} md={2}>
            <TextField name="id" label="Id Cumplimiento" disabled="true"
              defaultValue={cumplimientoSeleccionado.id}
              fullWidth onChange={handleChange} value={cumplimientoSeleccionado && cumplimientoSeleccionado.id} />
          </Grid>
          <Grid item xs={12} md={2}> <TextField name="id_cosv" label="# Orden de Servicio" disabled="true"
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
                fullWidth
                onChange={handleChange}
                value={cumplimientoSeleccionado && cumplimientoSeleccionado.tipooperacion_cosv}
              >
                <MenuItem value=""> <em>None</em> </MenuItem>
                {
                  listarTipoOperacion.map((itemselect) => {
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
          <Grid item xs={12} md={8}>
            <TextField className={styles.inputMaterial} label="Actividad Realizada" name="descripcion_cosv"
              value={actividadrealizada} onChange={handleChange} />
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
                  listarActividadRealizada.map((itemselect) => {
                    return (
                      <MenuItem value={itemselect.id_are}>{itemselect.descripcion_are}</MenuItem>
                    )
                  })
                }
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}> <TextField type="date" InputLabelProps={{ shrink: true }} name="fechainicia_cosv"
            defaultValue={Moment(inventariosSeleccionado.fechainicia_cosv).format('YYYY-MM-DD')}
            label="Fecha Inicia Actividad" fullWidth onChange={handleChange} />
          </Grid>
          <Grid item xs={12} md={3}> <TextField type="date" InputLabelProps={{ shrink: true }} name="fechafinal_cosv"
            defaultValue={Moment(inventariosSeleccionado.fechafinal_cosv).format('YYYY-MM-DD')}
            label="Fecha Finaliza Actividad" fullWidth onChange={handleChange} />
          </Grid>
          <Grid item xs={12} md={3}> <TextField type="time" InputLabelProps={{ shrink: true }} name="horainiciacosv"
            label="Hora Inicia Actividad" fullWidth defaultValue={Moment(inventariosSeleccionado.horainiciacosv).format('HH:mm:ss')}
            onChange={handleChange} />
          </Grid>
          <Grid item xs={12} md={3}> <TextField type="time" InputLabelProps={{ shrink: true }} name="horafinal_cosv"
            label="Hora Final Actividad" fullWidth defaultValue={Moment(inventariosSeleccionado.horafinal_cosv).format('HH:mm:ss')}
            onChange={handleChange} />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField className={styles.inputMaterial} label="Observaciones o Comentarios" name="observacion_cosv"
              value={observacion} onChange={handleChange} value={cumplimientoSeleccionado && cumplimientoSeleccionado.observacion_cosv} />
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

  const RevisarCumplimiento = (
    <div className={styles.modalcumplimiento}>
      <br />
      <MaterialTable
        columns={consultacumplimiento}
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
          actionsColumnIndex: -1
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
  /*
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
  */

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
      </Grid>
      <div align="right">
        <Button className={styles.button} color="secondary" onClick={() => grabarValorHorometro()} > Confirmar </Button>
        <Button className={styles.button2} onClick={() => abrirCerrarModalGrabarHorometro()}> Cancelar </Button>
      </div>
    </div>
  )

  return (
    <div className="App">
      <Typography align="center" className={styles.typography} variant="button" display="block" >
        ORDEN DE SERVICIO # {props.ordenSeleccionado.id_otr}
      </Typography>
      <ButtonGroup>
        <Button variant="outlined" color="primary" >CLIENTE : {razonsocial_cli} </Button>
        <Button variant="outlined" color="primary" >TELEFONO : {telefono_cli}</Button>
        <Button variant="outlined" color="primary" >CIUDAD : {nombre_ciu}  </Button>
        <Button variant="outlined" color="primary" >FECHA : {fechainicia_otr} </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="outlined" color="primary" >CONTACTO : {primer_apellido_con}{" "}{primer_nombre_con} </Button>
        <Button variant="outlined" color="primary" >CORREO : {email_cli} </Button>
        <Button variant="outlined" color="primary">MODELO : {modelo_dequ} </Button>
        <Button variant="outlined" color="primary" >MARCA : {descripcion_mar} </Button>
      </ButtonGroup>

      <Typography align="center" className={styles.typography} variant="button" display="block" >
        Dar Click sobre el Item que quieres agregar al Cumplimiento de la Orden de Servicio
            </Typography>

      <div>
        {
          activo ? (
            <div>
              <ButtonGroup>
                <Button variant="outlined" color="primary" >SERIE : {serie_dequ} </Button>
                <Button variant="outlined" color="primary" >ID INTERNO : {codigo_equ} </Button>
                <Button variant="outlined" color="primary"> TIEMPO DE LA ORDEN : {tiempoorden_otr} </Button>
              </ButtonGroup>
              <ButtonGroup>
                <Button className={styles.button3} variant="outlined" color="primary" onClick={() => abrirCerrarModalGrabarHorometro()} >
                  HOROMETRO : {horometro}
                </Button>
                <Button className={styles.button3} variant="outlined" color="primary" onClick={() => consultarCumplimiento()} >Revisar Cumplimiento </Button>
                <Button className={styles.button2} variant="outlined" color="primary" onClick={() => abrirCerrarModalCerrarOrden()} >Cerrar Orden </Button>
                <Button className={styles.button} variant="outlined" color="primary" onClick={() => pasarArevision()} >Pasar a Revisión </Button>
              </ButtonGroup>
            </div>
          )
            :
            (
              <div>
                <ButtonGroup>
                  <Button variant="outlined" color="primary" >SERIE : {serie_dequ} </Button>
                  <Button variant="outlined" color="primary" >ID INTERNO : {codigo_equ} </Button>
                  <Button variant="contained" color="primary" onClick={() => abrirCerrarModalGrabarHorometro()} >
                    HOROMETRO : {horometro}
                  </Button>
                  <Button > TIEMPO DE LA ORDEN : {tiempoorden_otr} </Button>
                </ButtonGroup>
                <Typography align="center" className={styles.typography2} variant="button" display="block" >
                  No hay Registros de Actividades a la Orden # {props.ordenSeleccionado.id_otr}
                </Typography>
              </div>
            )
        }
      </div>

      {
        tipooperacion_otr === 3 ?
          (
            <MaterialTable
              columns={cumplimiento}
              data={listChequeoEntrega}
              title="ACTIVIDADES CHEQUEO ENTREGA"
              actions={[
                {
                  icon: DoneOutlineTwoToneIcon,
                  tooltip: 'Item OK',
                  onClick: (event, rowData) => seleccionarInventarios(rowData, "chequeoOK")
                },
                {
                  icon: ErrorTwoToneIcon,
                  tooltip: 'Item con Error',
                  onClick: (event, rowData) => seleccionarInventarios(rowData, "Editar")
                },
                {
                  icon: EvStationIcon,
                  tooltip: 'Cargador y Bateria',
                  onClick: (event, rowData) => seleccionarBateria(rowData, "Bateria")
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
            />
          )
          :
          (
            tipooperacion_otr === 4 ?
              (
                <MaterialTable
                  columns={cumplimiento}
                  data={listChequeoRecepcion}
                  title="ACTIVIDADES CHEQUEO RECEPCION"
                  actions={[
                    {
                      icon: DoneOutlineTwoToneIcon,
                      tooltip: 'Item OK',
                      onClick: (event, rowData) => seleccionarInventarios(rowData, "chequeoOK")
                    },
                    {
                      icon: ErrorTwoToneIcon,
                      tooltip: 'Item con Error',
                      onClick: (event, rowData) => seleccionarInventarios(rowData, "Editar")
                    },
                    {
                      icon: EvStationIcon,
                      tooltip: 'Cargador y Bateria',
                      onClick: (event, rowData) => seleccionarBateria(rowData, "Bateria")
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
                />
              )
              :
              (
                <MaterialTable
                  columns={cumplimiento}
                  data={listRecepcionAlmacen}
                  title="ACTIVIDADES RECEPCION ALMACEN"
                  actions={[
                    {
                      icon: DoneOutlineTwoToneIcon,
                      tooltip: 'Item OK',
                      onClick: (event, rowData) => seleccionarInventarios(rowData, "chequeoOK")
                    },
                    {
                      icon: ErrorTwoToneIcon,
                      tooltip: 'Item con Error',
                      onClick: (event, rowData) => seleccionarInventarios(rowData, "Editar")
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
                />
              )
          )
      }

      <Modal
        open={modalCumplimiento}
        onClose={abrirCerrarModalCumplimiento}
      >
        {CumplimientoOrden}
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
        open={modalCumplimientoBateria}
        onClose={abrirCerrarModalCumplimientoBateria}
      >
        {CumplimientoOrdenBateria}
      </Modal>

      <Modal
        open={modalCumplimientoCargador}
        onClose={abrirCerrarModalCumplimientoCargador}
      >
        {CumplimientoOrdenCargador}
      </Modal>

    </div>
  );
}

export default ActividadesOservChequeo;

