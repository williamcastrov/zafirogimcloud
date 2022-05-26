import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import MaterialTable from "material-table";
import { Modal, Button, TextField, Select, MenuItem, FormControl, InputLabel, Grid, ButtonGroup, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from '@material-ui/icons/Save';
import NumberFormat from 'react-number-format';
import CachedIcon from '@material-ui/icons/Cached';
import ReplayIcon from '@material-ui/icons/Replay';
import BuildIcon from '@material-ui/icons/Build';
import { green, blue, blueGrey, red } from '@material-ui/core/colors';
import ForwardIcon from '@material-ui/icons/Forward';
import swal from 'sweetalert';
import Moment from 'moment';
import CancelIcon from '@material-ui/icons/Cancel';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import { useHistory } from "react-router-dom";

// Componentes de Conexion con el Backend
import empresasServices from "../../../services/Empresa";
import estadosServices from "../../../services/Parameters/Estados";
import ciudadesServices from "../../../services/Parameters/Ciudades";
import proveedoresServices from "../../../services/Interlocutores/Proveedores";
import clientesServices from "../../../services/Interlocutores/Clientes";
import empleadosServices from "../../../services/Interlocutores/Empleados";
import crearordenesServices from "../../../services/GestionOrdenes/CrearOrdenes";
import tiposservicioServices from "../../../services/GestionOrdenes/TiposServicio";
import gruposequiposServices from "../../../services/Mantenimiento/GruposEquipos";
import subgruposequiposServices from "../../../services/Mantenimiento/SubGruposPartes";
import equiposServices from "../../../services/Mantenimiento/Equipos";
import clasificacionabcServices from "../../../services/Mantenimiento/ClasificacionABC";
import tiposmttoServices from "../../../services/Mantenimiento/Tiposmtto";
import tipooperacionServices from "../../../services/GestionOrdenes/TipoOperacion";
import contactosServices from "../../../services/Interlocutores/Contactos";
import usuariosServices from "../../../services/Usuarios";

//Componentes Gestion de Ordenes
import MenuCrearOrden from "../MenuCrearOrden";
import ActividadesPendientes from "../ActividadesOserv/ActividadesPendiente";

//import MenuCrearOrden from "../../DatosEquipos/MenuEquipos";
// Componentes Adicionales al proceso de Ordenes de Servicio
import ActividadesOserv from "../ActividadesOserv";

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
  modal2: {
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
  modal3: {
    position: 'absolute',
    width: 500,
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
    minWidth: 290,
    maxWidth: 290,
  },
  formControl2: {
    margin: theme.spacing(0),
    minWidth: 600,
    maxWidth: 600,
  },
  formControl3: {
    margin: theme.spacing(0),
    minWidth: 215,
    maxWidth: 215,
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
    fontSize: 22,
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
    />
  );
}

function CrearOrdenes(props) {
  const { operarioot, idUsuario } = props;
  console.log("idUsuario : ", idUsuario)

  const styles = useStyles();
  const history = useHistory();

  const [modalCodigoEquipo, setModalCodigoEquipo] = useState(false);
  const [listarOrdenes, setListarOrdenes] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalCancelar, setModalCancelar] = useState(false);
  const [modalHerramientas, setModalHerramientas] = useState(false);
  const [formError, setFormError] = useState(false);
  const [modalPendiente, setModalPendiente] = useState(false);

  const [listarUsuarios, setListUsuarios] = useState([]);
  const [listarEmpresas, setListarEmpresas] = useState([]);
  const [listarEstados, setListarEstados] = useState([]);
  const [listarTipoServicio, setListarTipoServicio] = useState([]);
  const [listarCiudades, setListarCiudades] = useState([]);
  const [listarProveedores, setListarProveedores] = useState([]);
  const [listarClientes, setListarClientes] = useState([]);
  const [listarEmpleados, setListarEmpleados] = useState([]);
  const [listarGruposEquipos, setListarGruposEquipos] = useState([]);
  const [listarContactos, setListarContactos] = useState([]);
  const [listarSubGruposEquipos, setListarSubGruposEquipos] = useState([]);
  const [listarEquipos, setListarEquipos] = useState([]);
  const [listarUnEquipo, setListarUnEquipo] = useState([]);
  const [listarConceptososerv, setListarConceptosOserv] = useState([]);
  const [listarClasificacionABC, setListarClasificacionABC] = useState([]);
  const [listarTiposMtto, setListarTiposMtto] = useState([]);
  const [listarTipoOperacion, setListarTipoOperacion] = useState([]);
  const [actualiza, setActualiza] = useState(false);
  const [grabar, setGrabar] = React.useState(false);
  const [confirmar, setConfirmar] = React.useState(false);
  const [editar, setEditar] = React.useState(false);

  const fechaactual = Moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
  //const fechaactual = "2000/01/01 12:00:00";
  const horaactual = Moment(new Date()).format('HH:mm:ss');
  const fechatransporte = Moment(new Date()).format('2001-01-01 00:00:00');

  const [estado, setEstado] = useState(21);
  const [asignaOperario, setAsignaOperario] = useState(0);
  const [cliente, setCliente] = useState(0);
  const [contacto, setContacto] = useState(0);
  const [subgrupoEquipo, setSubGrupoEquipo] = useState(0);
  const [ciudad, setCiudad] = useState(0);
  const [equipo, setEquipo] = useState('');
  const [tipoRegistro, setTipoRegistro] = useState(false);

  let cambio = 12;
  let empresa = 1;
  let diasoperacion = 0;
  let operariosinasignar = 1;
  let tipomtto = 3;
  let tipooperacion = 8;
  let operario = 1;
  let proveedor = 23;
  let prioridad = 2;

  const [ordenSeleccionado, setOrdenSeleccionado] = useState({
    'id_otr': "",
    'estado_otr': estado,
    'tipo_otr': tipomtto,
    'tipooperacion_otr': tipooperacion,
    'tiposervicio_otr': "",
    'fechaprogramada_otr': fechaactual,
    'fechainicia_otr': fechaactual,
    'fechafinal_otr': fechaactual,
    'diasoperacion_otr': 0,
    'equipo_otr': "",
    'proveedor_otr': proveedor,
    'cliente_otr': "",
    'operario_otr': operario,
    'operariodos_otr': operario,
    'contactocliente_otr': "",
    'nitcliente_otr': 0,
    'subgrupoequipo_otr': "",
    'ciudad_otr': "",
    'resumenorden_otr': "",
    'prioridad_otr': prioridad,
    'empresa_otr': 1,
    'horometro_otr': 0,
    'iniciatransporte_otr': fechatransporte,
    'finaltransporte_otr': fechatransporte, 
    'tiempotransporte_otr': 0,
    'tiempoorden_otr': 0
  })

  const leerOrdenes = () => {
    async function fetchDataOrdenes() {
      if (idUsuario === 14) {
        const res = await crearordenesServices.listOrdenesServUsuario();
        setListarOrdenes(res.data);
      } else {
        const res = await crearordenesServices.listOrdenesServ();
        setListarOrdenes(res.data);
      }
      //console.log("Lee Ordenes Manual", res.data);
    }
    fetchDataOrdenes();
  }

  useEffect(() => {
    async function fetchDataUsuarios() {
      const res = await usuariosServices.listUsuarios();
      setListUsuarios(res.data);
      //console.log("INFORMACION DEL USUARIO : ", res.data)
    }
    fetchDataUsuarios();
  }, [])

  const leerOrdenesActivas = () => {
    async function fetchDataOrdenes() {
      if (idUsuario === 14) {
        const res = await crearordenesServices.listOrdenesServActivasUsuario();
        setListarOrdenes(res.data);
      } else {
        const res = await crearordenesServices.listOrdenesServActivas();
        setListarOrdenes(res.data);
      }
      //console.log("Cargar Una Orden", res.data);
    }
    fetchDataOrdenes();
  }

  useEffect(() => {
    async function fetchDataTipoOperacion() {
      const res = await tipooperacionServices.listTipooperacion();
      setListarTipoOperacion(res.data);
    }
    fetchDataTipoOperacion();
  }, [])

  useEffect(() => {
    async function fetchDataOrdenes() {
      const res = await crearordenesServices.listOrdenesServActivas();
      setListarOrdenes(res.data);
      setActualiza(false);
      //console.log("Lee Ordenes Automaticas", res.data);
    }
    fetchDataOrdenes();
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
      const res = await estadosServices.listEstadosOT();
      setListarEstados(res.data)
      //console.log(res.data);
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
    async function fetchDataProveedores() {
      const res = await proveedoresServices.listProveedoresServMtto();
      setListarProveedores(res.data)
      //console.log(res.data);
    }
    fetchDataProveedores();
  }, [])

  useEffect(() => {
    async function fetchDataClientes() {
      const res = await clientesServices.listClientes();
      setListarClientes(res.data)
      //console.log("INFORMACION CLIENTE ",res.data);
    }
    fetchDataClientes();
  }, [])

  useEffect(() => {
    async function fetchDataEmpleados() {
      const res = await empleadosServices.listEmpleadosOT();
      setListarEmpleados(res.data)
      //console.log(res.data);
    }
    fetchDataEmpleados();
  }, [])

  useEffect(() => {
    async function fetchDataTiposServicio() {
      const res = await tiposservicioServices.listTiposservicio();
      setListarTipoServicio(res.data)
      //console.log("TIPOS SERVICIOS ORDEN : ",res.data);
    }
    fetchDataTiposServicio();
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
      const res = await subgruposequiposServices.listSubGrupospartes();
      setListarSubGruposEquipos(res.data)
      //console.log(res.data);
    }
    fetchDataSubGruposEquipos();
  }, [])

  useEffect(() => {
    console.log("ID Usuario : ", idUsuario)
    async function fetchDataEquipos() {
      if (idUsuario === 14) {
        const res = await equiposServices.listEquiposMontacargasusuario();
        setListarEquipos(res.data);
        console.log("EQUIPOS : ", res.data)
      } else {
        const res = await equiposServices.listEquiposMontacargas();
        setListarEquipos(res.data);
      }
    }
    fetchDataEquipos();
  }, [idUsuario])

  useEffect(() => {
    async function fetchDataClasificacionABC() {
      const res = await clasificacionabcServices.listClasificacionabc();
      setListarClasificacionABC(res.data)
      //console.log(res.data);
    }
    fetchDataClasificacionABC();
  }, [])

  useEffect(() => {
    async function fetchDataTiposMtto() {
      const res = await tiposmttoServices.listTiposmtto();
      setListarTiposMtto(res.data)
      //console.log(res.data);
    }
    fetchDataTiposMtto();
  }, [])

  useEffect(() => {
    async function fetchDataContactos() {
      const res = await contactosServices.listContactos();
      setListarContactos(res.data);
      //console.log("CONTACTOS : ", res.data)
    }
    fetchDataContactos();
  }, [])

  const handleChange = e => {
    const { name, value } = e.target;

    setOrdenSeleccionado(prevState => ({
      ...prevState,
      [name]: value
    }));
  }


  const contactosInterlocutor = (cliente) => {
    //console.log("CODIGO CLIENTE : ", cliente)

    async function fetchDataContactos() {
      const res = await contactosServices.contactosInterlocutor(cliente);
      setListarContactos(res.data);
      //console.log("CONTACTOS : ", res.data)
      if (!res.success) {
        //swal("Contactos", "Cliente Seleccionado no tiene Contactos!", "warning", { button: "Aceptar" });
      }
    }
    fetchDataContactos();
  }

  const leerContactos = (cliente) => {
    //console.log("CODIGO CLIENTE : ", cliente)

    async function fetchDataContactos() {
      const res = await contactosServices.listContactosInterlocutor(cliente);
      setListarContactos(res.data);
      //console.log("CONTACTOS : ", res.data)
      if (!res.success) {
        swal("Contactos", "Cliente Seleccionado no tiene Contactos!", "warning", { button: "Aceptar" });
      }
    }
    fetchDataContactos();
  }

  const leerDatosEquipos = () => {
    leerModalCodigoEquipo();
  }

  const DatosEquipos = (equipo) => {
    async function fetchLeerDatoEquipo() {
      const res = await equiposServices.listUnEquipo(equipo);
      setListarUnEquipo(res.data);
      setCliente(res.data[0].cliente_ubi);
      setEquipo(res.data[0].codigo_equ);
      setContacto(res.data[0].id_con);
      setCiudad(res.data[0].ciudad_ubi);
      setSubGrupoEquipo(res.data[0].subgrupoparte_equ);
      console.log("DATOS DEL EQUIPO SELECCIONADO : ", res.data[0])
    }
    fetchLeerDatoEquipo();
  }

  const seleccionarOrden = (orden, caso) => {
    if (orden.estado_otr === 24 || orden.estado_otr === 27 || orden.estado_otr === 32) {
      swal("Cumplimiento OT", "El estado de la OT no permite cambios", "warning", { button: "Aceptar" });
    } else {
      setOrdenSeleccionado(orden);
      (caso === "Editar") ? abrirCerrarModalEditar() : abrirCerrarModalCancelar()
    }
  }

  const crearPendientes = (orden, caso) => {
    if (orden.estado_otr === 24 || orden.estado_otr === 32) {
      swal("Cumplimiento OT", "El estado de la OT no permite cambios", "warning", { button: "Aceptar" });
    } else {
      setOrdenSeleccionado(orden);
      //console.log("ORDEN SELECCIONADA : ", orden);
      (caso === "Herramientas") ?  abrirCerrarModalPendiente() :  abrirCerrarModalPendiente()
    }
  }

  const asignarHerramientas = (orden, caso) => {
    if (orden.estado_otr === 24 || orden.estado_otr === 27 || orden.estado_otr === 32) {
      swal("Cumplimiento OT", "El estado de la OT no permite cambios", "warning", { button: "Aceptar" });
    } else {
      setOrdenSeleccionado(orden);
      if (orden.estado_otr !== 21) {
        swal("Orden de Servicio", "Estado de la Orden no permite Incluir Herramientas!", "warning", { button: "Aceptar" });
        history.push("/gim");
      }
      //console.log("ORDEN SELECCIONADA : ", orden);
      (caso === "Herramientas") ? abrirCerrarModalHerramientas() : abrirCerrarModalEliminar()
    }
  }

  const ConfirmeCancelarOrden = (orden, caso) => {
    if (orden.estado_otr === 24 || orden.estado_otr === 27 || orden.estado_otr === 32) {
      swal("Cumplimiento OT", "El estado de la OT no permite cambios", "warning", { button: "Aceptar" });
    } else {
      setOrdenSeleccionado(orden);
      if (orden.estado_otr === 15 || orden.estado_otr === 14) {
        swal("Orden de Servicio", "Estado de la Orden no permite Cancelación!", "error", { button: "Aceptar" });
      } else {
        abrirCerrarModalCancelar();
      }
    }
  }

  const modalCancelarOrden = (
    <div className={styles.modal3}>
      <p>Estás seguro que desea Cancelar la Orden de Trabajo : <b>{ordenSeleccionado.id_otr}</b>? </p>
      <div align="right">
        <Button className={styles.button2} color="secondary" onClick={() => cancelarOrden()}> Confirmar </Button>
        <Button className={styles.button} onClick={() => abrirCerrarModalCancelar()}> Cancelar </Button>
      </div>
    </div>
  )

  const modalAsignarHerramientas = (
    <div className="App" >
      <div className={styles.modal}>
        <ActividadesOserv ordenSeleccionado={ordenSeleccionado} tipoRegistro={tipoRegistro}
        />
      </div>
    </div>
  )

  const cancelarOrden = () => {

    const cancelarOT = async () => {
      //const res = await crearordenesServices.cancelar(ordenSeleccionado[0])

      const res = await crearordenesServices.cancelar(ordenSeleccionado.id_otr);

      if (res.success) {
        swal("Orden de Servicio", "Cancelada de forma Correcta!", "success", { button: "Aceptar" });
        console.log(res.message)
        abrirCerrarModalCancelar();
      }
      else {
        swal("Orden de Servicio", "Error Cancelando la Orden de Servicio!", "error", { button: "Aceptar" });
        console.log(res.message);
        abrirCerrarModalCancelar();
      }
    }
    cancelarOT();
  }

  const leerModalCodigoEquipo = () => {
    setModalCodigoEquipo(!modalCodigoEquipo);
  }

  const abrirCerrarModalInsertar = () => {
    setModalInsertar(!modalInsertar);
  }

  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
  }

  const abrirCerrarModalCancelar = () => {
    setModalCancelar(!modalCancelar);
  }

  const abrirCerrarModalHerramientas = () => {
    setModalHerramientas(!modalHerramientas);
  }

  const abrirCerrarModalPendiente = () => {
    setModalPendiente(!modalPendiente);
  }

  useEffect(() => {
    if(confirmar){
       grabarListaChequeo();
       setConfirmar(false);
    }
  }, [confirmar])

  const grabarListaChequeo = async () => {
      const res = await clientesServices.listUnCliente(cliente);
      //setListarClientes(res)
      console.log("INFORMACION CLIENTE ",res.data[0].nit_cli);

    setFormError({});
    let errors = {};
    let formOk = true;

    if (!tipooperacion) {
      alert("1")
      errors.tipooperacion_otr = true;
      formOk = false;
    }

    if (!ordenSeleccionado.tiposervicio_otr) {
      alert("2")
      errors.tiposervicio_otr = true;
      formOk = false;
    }

    if (!ordenSeleccionado.fechaprogramada_otr) {
      alert("3")
      errors.fechaprogramada_otr = true;
      formOk = false;
    }

    if (!ordenSeleccionado.fechainicia_otr) {
      alert("4")
      errors.fechainicia_otr = true;
      formOk = false;
    }

    if (!ordenSeleccionado.fechafinal_otr) {
      alert("5")
      errors.fechafinal_otr = true;
      formOk = false;
    }
/*
    if (!ordenSeleccionado.prioridad_otr) {
      alert("6")
      errors.prioridad_otr = true;
      formOk = false;
    }
*/
    setFormError(errors);

    if (formOk) {

      {
        //let resultado = (cantidad * valorunitario)
        //Asignar Valores al Estado Cumplimiento
        console.log("ASIGNA OPERARIO : ", asignaOperario)
        let estadoope = 21;

        if(asignaOperario > 1){
           estadoope = 23
        }
        
        cliente ? (
          setOrdenSeleccionado([{
            estado_otr: estadoope,
            tipo_otr: ordenSeleccionado.tipo_otr,
            tipooperacion_otr: ordenSeleccionado.tipooperacion_otr,
            tiposervicio_otr: ordenSeleccionado.tiposervicio_otr,
            fechaprogramada_otr: ordenSeleccionado.fechaprogramada_otr,
            fechainicia_otr: ordenSeleccionado.fechainicia_otr,
            fechafinal_otr: ordenSeleccionado.fechafinal_otr,
            diasoperacion_otr: ordenSeleccionado.diasoperacion_otr,
            equipo_otr: ordenSeleccionado.equipo_otr,
            proveedor_otr: ordenSeleccionado.proveedor_otr,
            cliente_otr: cliente,
            operario_otr: asignaOperario,
            operariodos_otr: ordenSeleccionado.operariodos_otr,
            contactocliente_otr: contacto,
            nitcliente_otr: res.data[0].nit_cli,
            subgrupoequipo_otr: subgrupoEquipo,
            ciudad_otr: ciudad,
            resumenorden_otr: ordenSeleccionado.resumenorden_otr,
            prioridad_otr: prioridad,
            empresa_otr: ordenSeleccionado.empresa_otr,
            iniciatransporte_otr: fechatransporte,
            finaltransporte_otr: fechatransporte,
            tiempotransporte_otr: 0,
            tiempoorden_otr: 0
          }])
        )
          :
          (
            setOrdenSeleccionado([{
              estado_otr: estadoope,
              tipo_otr: ordenSeleccionado.tipo_otr,
              tipooperacion_otr: ordenSeleccionado.tipooperacion_otr,
              tiposervicio_otr: ordenSeleccionado.tiposervicio_otr,
              fechaprogramada_otr: ordenSeleccionado.fechaprogramada_otr,
              fechainicia_otr: ordenSeleccionado.fechainicia_otr,
              fechafinal_otr: ordenSeleccionado.fechafinal_otr,
              diasoperacion_otr: ordenSeleccionado.diasoperacion_otr,
              equipo_otr: ordenSeleccionado.equipo_otr,
              proveedor_otr: ordenSeleccionado.proveedor_otr,
              cliente_otr: 0,
              operario_otr: asignaOperario,
              operariodos_otr: ordenSeleccionado.operariodos_otr,
              contactocliente_otr: 0,
              nitcliente_otr: 0,
              subgrupoequipo_otr: subgrupoEquipo,
              ciudad_otr: 5,
              resumenorden_otr: ordenSeleccionado.resumenorden_otr,
              prioridad_otr: prioridad,
              empresa_otr: ordenSeleccionado.empresa_otr,
              iniciatransporte_otr: fechatransporte,
              finaltransporte_otr: fechatransporte,
              tiempotransporte_otr: 0,
              tiempoorden_otr: 0
            }])
          )

      }
      setGrabar(true);
    } else {
      swal("Orden de Servicio", "Debe Ingresar Todos los Datos, Error Creando la Orden de Servicio!", "warning", { button: "Aceptar" });
      //console.log(ordenSeleccionado);
      console.log(res.message);
      abrirCerrarModalInsertar();
    }
  }

  useEffect(() => {

    if (grabar) {

      async function grabarListaChequeo() {

        //console.log("DATOS ORDEN SELECCIONADO : ", ordenSeleccionado)

        const res = await crearordenesServices.save(ordenSeleccionado[0]);

        if (res.success) {
          swal("Orden de Servicio", "Orden de Servicio Creada de forma Correcta!", "success", { button: "Aceptar" });
          //console.log(res.message)
          history.push("/gim");
          abrirCerrarModalInsertar();

          delete ordenSeleccionado.id_otr;
          delete ordenSeleccionado.estado_otr;
          delete ordenSeleccionado.tipooperacion_otr;
          delete ordenSeleccionado.tipo_otr;
          delete ordenSeleccionado.fechaprogramada_otr;
          delete ordenSeleccionado.fechainicia_otr;
          delete ordenSeleccionado.fechafinal_otr;
          delete ordenSeleccionado.diasoperacion_otr;
          delete ordenSeleccionado.equipo_otr;
          delete ordenSeleccionado.proveedor_otr;
          delete ordenSeleccionado.cliente_otr;
          delete ordenSeleccionado.operario_otr;
          delete ordenSeleccionado.contactocliente_otr;
          delete ordenSeleccionado.subgrupoequipo_otr;
          delete ordenSeleccionado.ciudad_otr;
          delete ordenSeleccionado.resumenorden_otr;
          delete ordenSeleccionado.prioridad_otr;
          delete ordenSeleccionado.tiposervicio_otr;

        } else {
          swal("Orden de Servicio", "Error Creando la Orden de Servicio!", "error", { button: "Aceptar" });
          console.log(res.message);
          //abrirCerrarModalInsertar();
        }
        setActualiza(true);
        setGrabar(false);
      }
      grabarListaChequeo();
    }
  }, [grabar])

  const actualizarOrden = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;

    if (!ordenSeleccionado.estado_otr) {
      errors.estado_otr = true;
      formOk = false;
    }
/*
    if (!ordenSeleccionado.prioridad_otr) {
      errors.prioridad_otr = true;
      formOk = false;
    }
*/
    if (!ordenSeleccionado.fechaprogramada_otr) {
      errors.fechaprogramada_otr = true;
      formOk = false;
    }

    if (!ordenSeleccionado.fechainicia_otr) {
      errors.fechainicia_otr = true;
      formOk = false;
    }

    if (!ordenSeleccionado.fechafinal_otr) {
      errors.fechafinal_otr = true;
      formOk = false;
    }

    if (!ordenSeleccionado.equipo_otr) {
      errors.equipo_otr = true;
      formOk = false;
    }

    if (!ordenSeleccionado.tipo_otr) {
      errors.tipo_otr = true;
      formOk = false;
    }

    if (!ordenSeleccionado.proveedor_otr) {
      errors.proveedor_otr = true;
      formOk = false;
    }

    if (!ordenSeleccionado.cliente_otr) {
      errors.cliente_otr = true;
      formOk = false;
    }

    if (!ordenSeleccionado.operario_otr) {
      errors.operario_otr = true;
      formOk = false;
    }

    if (!ordenSeleccionado.contactocliente_otr) {
      errors.contactocliente_otr = true;
      formOk = false;
    }

    if (!ordenSeleccionado.subgrupoequipo_otr) {
      errors.subgrupoequipo_otr = true;
      formOk = false;
    }

    if (!ordenSeleccionado.ciudad_otr) {
      errors.ciudad_otr = true;
      formOk = false;
    }
    /*
        if (!ordenSeleccionado.resumenorden_otr) {
          errors.resumenorden = true;
          formOk = false;
        }
    */
    if (!ordenSeleccionado.tiposervicio_otr) {
      errors.tiposervicio_otr = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
      {
        //let resultado = (cantidad * valorunitario)
        //Asignar Valores al Estado Cumplimiento
       // console.log("ASIGNA OPERARIO : ", asignaOperario)
        let estadoope = 21;
        let actualizaoperario = 0;

        if(ordenSeleccionado.operario_otr !== 0){
            actualizaoperario = ordenSeleccionado.operario_otr;
            estadoope = 23;
        }else
        if(asignaOperario > 1){
           estadoope = 23;
           actualizaoperario = asignaOperario;
        }
        //console.log("CODIGO OPERARIO : ", actualizaoperario)
        
          setOrdenSeleccionado([{
            id_otr: ordenSeleccionado.id_otr,
            estado_otr: estadoope,
            tipo_otr: ordenSeleccionado.tipo_otr,
            tipooperacion_otr: ordenSeleccionado.tipooperacion_otr,
            tiposervicio_otr: ordenSeleccionado.tiposervicio_otr,
            fechaprogramada_otr: ordenSeleccionado.fechaprogramada_otr,
            fechainicia_otr: ordenSeleccionado.fechainicia_otr,
            fechafinal_otr: ordenSeleccionado.fechafinal_otr,
            diasoperacion_otr: ordenSeleccionado.diasoperacion_otr,
            equipo_otr: ordenSeleccionado.equipo_otr,
            proveedor_otr: ordenSeleccionado.proveedor_otr,
            cliente_otr: ordenSeleccionado.cliente_otr,
            operario_otr: actualizaoperario,
            operariodos_otr: ordenSeleccionado.operariodos_otr,
            contactocliente_otr: ordenSeleccionado.contactocliente_otr,
            nitcliente_otr: ordenSeleccionado.nitcliente_otr,
            subgrupoequipo_otr: ordenSeleccionado.subgrupoequipo_otr,
            ciudad_otr: ordenSeleccionado.ciudad_otr,
            resumenorden_otr: ordenSeleccionado.resumenorden_otr,
            prioridad_otr: ordenSeleccionado.prioridad_otr,
            empresa_otr: ordenSeleccionado.empresa_otr,
            iniciatransporte_otr: ordenSeleccionado.iniciatransporte_otr,
            finaltransporte_otr: ordenSeleccionado.finaltransporte_otr,
            tiempotransporte_otr: 0,
            tiempoorden_otr: 0
          }])
      }
      setEditar(true);
    } else {
      swal("Orden de Servicio", "Debe Ingresar Todos los Datos, Error Actualizando la Orden de Servicio!", "warning", { button: "Aceptar" });
      //console.log(ordenSeleccionado);
      console.log(res.message);
      abrirCerrarModalEditar();
    }
  }

  useEffect(() => {
    if (editar) {
      async function editarOrden() {
        //console.log("ACTUALIZAR ORDEN SELECCIONADO XXXXXX : ", ordenSeleccionado[0])

        const res = await crearordenesServices.update(ordenSeleccionado[0]);

        if (res.success) {
          swal("Orden de Servicio", "Orden de Servicio Actualizada de forma Correcta!", "success", { button: "Aceptar" });
          //console.log(res.message)
          history.push("/gim");
          abrirCerrarModalInsertar();

        } else {
          swal("Orden de Servicio", "Error Actualizando la Orden de Servicio!", "error", { button: "Aceptar" });
          console.log(res.message);
          //abrirCerrarModalInsertar();
        }
        setActualiza(true);
        setEditar(false);
      }
      editarOrden();
    }
  }, [editar])

  // "string","boolean","numeric","date","datetime","time","currency"
  const columnas = [
    {
      field: 'id_otr',
      title: '# Orden',
      cellStyle: { minWidth: 50 }
    },
    {
      field: 'nombre_est',
      title: 'Estado',
      cellStyle: { minWidth: 100 }
    },
    {
      field: 'descripcion_tmt',
      title: 'Tipo de Orden',
      cellStyle: { minWidth: 100 }
    },
    {
      field: 'fechaprogramada_otr',
      title: 'Fecha de Programación',
      type: 'date'
    },
    {
      field: 'codigo_equ',
      title: 'Equipo',
      cellStyle: { minWidth: 150 }
    },
    {
      field: 'nombrealterno_dequ',
      title: 'Bodega',
      cellStyle: { minWidth: 150 }
    },
    {
      field: 'nombretecnico',
      title: 'Tecnico Asignado'
    },
    {
      field: 'razonsocial_cli',
      title: 'Cliente',
      cellStyle: { width: 100, maxWidth: 100 },
      headerStyle: { width: 100, maxWidth: 100 }
    },
    {
      field: 'nombre_ciu',
      title: 'Ciudad',
      cellStyle: { minWidth: 100 }
    },
    {
      field: 'descripcion_abc',
      title: 'Prioridad de la Orden',
      cellStyle: { minWidth: 100 }
    }
  ]

  const ordenInsertar = (
    <div className={styles.modal}>
      <Typography align="center" className={styles.typography} variant="button" display="block" >
        Crear Orden de Servicio
      </Typography>
      <Grid container spacing={2} >
        <Grid item xs={12} md={3}> <TextField name="id_otr" label="# Orden de Servicio" disabled="true"
          fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={3}>
          <FormControl className={styles.formControl3}>
            <InputLabel id="idselecttipooperacion_otr">Tipo de Operación</InputLabel>
            <Select
              labelId="selecttipooperacion_otr"
              name="tipooperacion_otr"
              id="idselecttipooperacion_otr"
              disabled="true"
              fullWidth
              defaultValue={tipooperacion}
              onChange={handleChange}
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
        <Grid item xs={12} md={3}>
          <FormControl className={styles.formControl3}>
            <InputLabel id="idselectestado_otr">Estado</InputLabel>
            <Select
              labelId="selectestado_otr"
              name="estado_otr"
              id="idselectestado_otr"
              fullWidth
              disabled="true"
              defaultValue={estado}
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
        <Grid item xs={12} md={3}>
          
        </Grid>
        <Grid item xs={12} md={4}> <TextField type="date" InputLabelProps={{ shrink: true }} name="fechaprogramada_otr"
          defaultValue={Moment(fechaactual).format('YYYY-MM-DD')} label="Fecha de Creación de Orden"
          fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={4}> <TextField type="date" InputLabelProps={{ shrink: true }} name="fechainicia_otr"
          defaultValue={Moment(fechaactual).format('YYYY-MM-DD')}
          label="Fecha en que Inicia" fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField type="date" InputLabelProps={{ shrink: true }} name="fechafinal_otr"
            defaultValue={Moment(fechaactual).format('YYYY-MM-DD')}
            label="Fecha de Cierre" fullWidth onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={4}> <TextField name="equipo_otr" label="Equipo"
          fullWidth onChange={handleChange} disabled="true" defaultValue={equipo} />
        </Grid>
        <Grid item xs={12} md={4}> <TextField type="number" name="diasoperacion_otr" label="Cuantos días duro la Actividad"
          fullWidth onChange={handleChange} disabled="true" defaultValue={diasoperacion} />
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselecttipo_otr">Tipo de Actividad</InputLabel>
            <Select
              labelId="selecttipo_otr"
              name="tipo_otr"
              id="idselecttipo_otr"
              fullWidth
              defaultValue={tipomtto}
              onChange={handleChange}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarTiposMtto.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_tmt}>{itemselect.descripcion_tmt}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselecttiposervicio_otr" >Tipo de Servicio de la Orden</InputLabel>
            <Select
              labelId="selectiposervicio_otr"
              name="tiposervicio_otr"
              id="idselecttiposervicio_otr"
              fullWidth
              onChange={handleChange}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarTipoServicio.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_tser}>{itemselect.descripcion_tser}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl className={styles.formControl}>
            <InputLabel id="proveedor_otr">Prestador del servicio</InputLabel>
            <Select
              labelId="selectproveedor_otr"
              name="proveedor_otr"
              id="idselectproveedor_otr"
              fullWidth
              defaultValue={proveedor}
              onChange={handleChange}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarProveedores.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_int}>{itemselect.razonsocial_int}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl className={styles.formControl}>
            <InputLabel id="cliente_otr">Cliente</InputLabel>
            <Select
              labelId="selectcliente_otr"
              name="cliente_otr"
              id="idselectcliente_otr"
              fullWidth
              onChange={handleChange}
              onClick={(e) => contactosInterlocutor(e.target.value)}
              disabled="true"
              defaultValue={cliente}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarClientes.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_cli}>{itemselect.razonsocial_cli}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl className={styles.formControl}>
            <InputLabel id="operario_otr">Operario</InputLabel>
            <Select
              labelId="selectoperario_otr_otr"
              name="operario_otr"
              id="idselectoperario_otr"
              defaultValue={operario}
              fullWidth
              onChange={handleChange}
              onClick={(e) => setAsignaOperario(e.target.value)}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarEmpleados.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_emp}>{itemselect.primer_nombre_emp}{" "}{itemselect.primer_apellido_emp}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl className={styles.formControl}>
            <InputLabel id="operariodos_otr">Segundo Operario</InputLabel>
            <Select
              labelId="selectoperariodos_otr_otr"
              name="operariodos_otr"
              id="idselectoperariodos_otr"
              defaultValue={operario}
              fullWidth
              onChange={handleChange}
              //onClick={(e) => handleChangeOperario(e.target.value)}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarEmpleados.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_emp}>{itemselect.primer_nombre_emp}{" "}{itemselect.primer_apellido_emp}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectcontactocliente_otr">Contacto Cliente</InputLabel>
            <Select
              labelId="selectcontactocliente_otr"
              name="contactocliente_otr"
              id="idselectcontactocliente_otr"
              fullWidth
              onChange={handleChange}
              //onClick={(e) => contactosInterlocutor(contacto)}
              defaultValue={contacto}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarContactos ?
                  listarContactos.map((itemselect) => {
                    return (
                      <MenuItem value={itemselect.id_con}>{itemselect.primer_nombre_con}{" "}{itemselect.primer_apellido_con}</MenuItem>
                    )
                  })
                  :
                  console.log("Sin Datos")
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectsubgrupoequipo_otr_otr">SubGrupo del Equipo</InputLabel>
            <Select
              labelId="subgrupoequipo_otr_otr"
              name="subgrupoequipo_otr"
              id="idselectsubgrupoequipo_otr"
              fullWidth
              onChange={handleChange}
              defaultValue={subgrupoEquipo}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarSubGruposEquipos.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_sgre}>{itemselect.descripcion_sgre}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectciudad_otr">Ciudad</InputLabel>
            <Select
              labelId="ciudad_otr"
              name="ciudad_otr"
              id="idselectciudad_otr"
              fullWidth
              onChange={handleChange}
              defaultValue={ciudad}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarCiudades.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_ciu}>{itemselect.nombre_ciu}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectempresa_otr" >Empresa</InputLabel>
            <Select
              labelId="selectempresa_otr"
              name="empresa_otr"
              id="idselectempresa_otr"
              fullWidth
              onChange={handleChange}
              disabled="true"
              defaultValue={empresa}
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
        <Grid item xs={12} md={12}>
          <TextField name="resumenorden_otr" label="Resumen de la Orden" fullWidth onChange={handleChange} />
        </Grid>
      </Grid>
      <br /><br />
      <div align="right">
        <Button className={styles.button} color="primary" onClick={() => setConfirmar(true)} >Insertar</Button>
        <Button className={styles.button2} onClick={() => abrirCerrarModalInsertar()} >Cancelar</Button>
      </div>
    </div>
  )

  const ordenEditar = (
    <div className="App" >
      <div className={styles.modal}>
        <Typography align="center" className={styles.typography} variant="button" display="block" >Actualizar Orden de Servicio</Typography>
        <Grid container spacing={2} >
          <Grid item xs={12} md={3}> <TextField name="id_otr" label="# Orden de Servicio" disabled="true"
            defaultValue={ordenSeleccionado.id_otr}
            fullWidth onChange={handleChange} value={ordenSeleccionado && ordenSeleccionado.id_otr} />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl className={styles.formControl3}>
              <InputLabel id="idselecttipooperacion_otr">Tipo de Operación</InputLabel>
              <Select
                labelId="selecttipooperacion_otr"
                name="tipooperacion_otr"
                id="idselecttipooperacion_otr"
                fullWidth
                onChange={handleChange}
                disabled="true"
                value={ordenSeleccionado && ordenSeleccionado.tipooperacion_otr}
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
          <Grid item xs={12} md={3}>
            <FormControl className={styles.formControl3}>
              <InputLabel id="idselectestado_otr">Estado</InputLabel>
              <Select
                labelId="selectestado_otr"
                name="estado_otr"
                id="idselectestado_otr"
                fullWidth
                onChange={handleChange}
                disabled="true"
                value={ordenSeleccionado && ordenSeleccionado.estado_otr}
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
          <Grid item xs={12} md={3}>

          </Grid>
          <Grid item xs={12} md={4}> <TextField type="date" InputLabelProps={{ shrink: true }} name="fechaprogramada_otr"
            defaultValue={Moment(ordenSeleccionado.fechaprogramada_otr).format('YYYY-MM-DD')} disabled="true"
            label="Fecha de Creación de Orden" fullWidth onChange={handleChange} />
          </Grid>
          <Grid item xs={12} md={4}> <TextField type="date" InputLabelProps={{ shrink: true }} name="fechainicia_otr"
            defaultValue={Moment(ordenSeleccionado.fechainicia_otr).format('YYYY-MM-DD')}
            label="Fecha en que Inicia" fullWidth onChange={handleChange} />
          </Grid>
          <Grid item xs={12} md={4}> <TextField type="date" InputLabelProps={{ shrink: true }} name="fechafinal_otr"
            defaultValue={Moment(ordenSeleccionado.fechafinal_otr).format('YYYY-MM-DD')}
            label="Fecha de Cierre" fullWidth onChange={handleChange} />
          </Grid>
          <Grid item xs={12} md={8}>
            <FormControl className={styles.formControl2}>
              <InputLabel id="idselectequipo_otr">Equipo</InputLabel>
              <Select
                labelId="selectequipo_otr"
                name="equipo_otr"
                id="idselectequipo_otr"
                fullWidth
                onChange={handleChange}
                value={ordenSeleccionado && ordenSeleccionado.equipo_otr}
              >
                <MenuItem value=""> <em>None</em> </MenuItem>
                {
                  listarEquipos && listarEquipos.map((itemselect) => {
                    return (
                      <MenuItem value={itemselect.id_equ}>{itemselect.codigo_equ}</MenuItem>
                    )
                  })
                }
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}> <TextField type="number" name="diasoperacion_otr" label="Cuantos días duro la Actividad"
            disabled="true" defaultValue={diasoperacion}
            fullWidth onChange={handleChange} value={ordenSeleccionado && ordenSeleccionado.diasoperacion_otr} />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl className={styles.formControl}>
              <InputLabel id="idselecttipo_otr">Tipo de Actividad</InputLabel>
              <Select
                labelId="selecttipo_otr"
                name="tipo_otr"
                id="idselecttipo_otr"
                fullWidth
                onChange={handleChange}
                value={ordenSeleccionado && ordenSeleccionado.tipo_otr}
              >
                <MenuItem value=""> <em>None</em> </MenuItem>
                {
                  listarTiposMtto.map((itemselect) => {
                    return (
                      <MenuItem value={itemselect.id_tmt}>{itemselect.descripcion_tmt}</MenuItem>
                    )
                  })
                }
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl className={styles.formControl}>
              <InputLabel id="idselecttiposervicio_otr" >Tipo de Servicio de la Orden</InputLabel>
              <Select
                labelId="selectiposervicio_otr"
                name="tiposervicio_otr"
                id="idselecttiposervicio_otr"
                fullWidth
                onChange={handleChange}
                value={ordenSeleccionado && ordenSeleccionado.tiposervicio_otr}
              >
                <MenuItem value=""> <em>None</em> </MenuItem>
                {
                  listarTipoServicio.map((itemselect) => {
                    return (
                      <MenuItem value={itemselect.id_tser}>{itemselect.descripcion_tser}</MenuItem>
                    )
                  })
                }
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl className={styles.formControl}>
              <InputLabel id="proveedor_otr">Prestador del servicio</InputLabel>
              <Select
                labelId="selectproveedor_otr"
                name="proveedor_otr"
                id="idselectproveedor_otr"
                fullWidth
                onChange={handleChange}
                value={ordenSeleccionado && ordenSeleccionado.proveedor_otr}
              >
                <MenuItem value=""> <em>None</em> </MenuItem>
                {
                  listarProveedores.map((itemselect) => {
                    return (
                      <MenuItem value={itemselect.id_int}>{itemselect.razonsocial_int}</MenuItem>
                    )
                  })
                }
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl className={styles.formControl}>
              <InputLabel id="cliente_otr">Cliente</InputLabel>
              <Select
                labelId="selectcliente_otr"
                name="cliente_otr"
                id="idselectcliente_otr"
                fullWidth
                onChange={handleChange}
                value={ordenSeleccionado && ordenSeleccionado.cliente_otr}
              //onClick={(e) => leerContactos(e.target.value)}
              >
                <MenuItem value=""> <em>None</em> </MenuItem>
                {
                  listarClientes.map((itemselect) => {
                    return (
                      <MenuItem value={itemselect.id_cli}>{itemselect.razonsocial_cli}</MenuItem>
                    )
                  })
                }
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl className={styles.formControl}>
              <InputLabel id="operario_otr">Operario</InputLabel>
              <Select
                labelId="selectoperario_otr_otr"
                name="operario_otr"
                id="idselectoperario_otr"
                fullWidth
                defaultValue={operariosinasignar}
                onChange={handleChange}
                value={ordenSeleccionado && ordenSeleccionado.operario_otr}
                onClick={(e) => setAsignaOperario(e.target.value)}
              >
                <MenuItem value=""> <em>None</em> </MenuItem>
                {
                  listarEmpleados.map((itemselect) => {
                    return (
                      <MenuItem value={itemselect.id_emp}>{itemselect.primer_nombre_emp}{" "}{itemselect.primer_apellido_emp}</MenuItem>
                    )
                  })
                }
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl className={styles.formControl}>
              <InputLabel id="operariodos_otr">Segundo Operario</InputLabel>
              <Select
                labelId="selectoperariodos_otr"
                name="operariodos_otr"
                id="idselectoperariodos_otr"
                fullWidth
                defaultValue={operariosinasignar}
                onChange={handleChange}
                value={ordenSeleccionado && ordenSeleccionado.operariodos_otr}
                onClick={() => setEstado(16)}
              >
                <MenuItem value=""> <em>None</em> </MenuItem>
                {
                  listarEmpleados.map((itemselect) => {
                    return (
                      <MenuItem value={itemselect.id_emp}>{itemselect.primer_nombre_emp}{" "}{itemselect.primer_apellido_emp}</MenuItem>
                    )
                  })
                }
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl className={styles.formControl}>
              <InputLabel id="idselectcontactocliente_otr">Contacto</InputLabel>
              <Select
                labelId="selectcontactocliente_otr"
                name="contactocliente_otr"
                id="idselectcontactocliente_otr"
                fullWidth
                onChange={handleChange}
                value={ordenSeleccionado && ordenSeleccionado.contactocliente_otr}
              >
                <MenuItem value=""> <em>None</em> </MenuItem>
                {
                  listarContactos ?
                    listarContactos.map((itemselect) => {
                      return (
                        <MenuItem value={itemselect.id_con}>{itemselect.primer_nombre_con}{" "}{itemselect.primer_apellido_con}</MenuItem>
                      )
                    })
                    :
                    console.log("Sin Datos")
                }
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl className={styles.formControl}>
              <InputLabel id="idselectsubgrupoequipo_otr">SubGrupo del Equipo</InputLabel>
              <Select
                labelId="subgrupoequipo_otr"
                name="subgrupoequipo_otr"
                id="idselectsubgrupoequipo_otr"
                fullWidth
                onChange={handleChange}
                value={ordenSeleccionado && ordenSeleccionado.subgrupoequipo_otr}
              >
                <MenuItem value=""> <em>None</em> </MenuItem>
                {
                  listarSubGruposEquipos.map((itemselect) => {
                    return (
                      <MenuItem value={itemselect.id_sgre}>{itemselect.descripcion_sgre}</MenuItem>
                    )
                  })
                }
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl className={styles.formControl}>
              <InputLabel id="idselectciudad_otr">Ciudad</InputLabel>
              <Select
                labelId="ciudad_otr"
                name="ciudad_otr"
                id="idselectciudad_otr"
                fullWidth
                onChange={handleChange}
                value={ordenSeleccionado && ordenSeleccionado.ciudad_otr}
              >
                <MenuItem value=""> <em>None</em> </MenuItem>
                {
                  listarCiudades.map((itemselect) => {
                    return (
                      <MenuItem value={itemselect.id_ciu}>{itemselect.nombre_ciu}</MenuItem>
                    )
                  })
                }
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField name="resumenorden_otr" label="Resumen de la Orden" fullWidth onChange={handleChange}
              value={ordenSeleccionado && ordenSeleccionado.resumenorden_otr} />
          </Grid>
        </Grid>
        <br /><br />
        <div align="right">
          <Button className={styles.button} color="primary" onClick={() => actualizarOrden()} >Editar</Button>
          <Button className={styles.button2} onClick={() => abrirCerrarModalEditar()}>Cancelar</Button>
        </div>
        <MenuCrearOrden ordenServicio={ordenSeleccionado.id_otr} />
      </div>
    </div>
  )

  const codigoEquipo = (
    <div className="App" >
      <div className={styles.modal2}>
        <Typography align="center" className={styles.typography} variant="button" display="block" >
          Seleccionar Codigo MT
        </Typography>
        <Grid item xs={12} md={4}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectequipo_otr">Equipo</InputLabel>
            <Select
              labelId="selectequipo_otr"
              name="equipo_otr"
              id="idselectequipo_otr"
              fullWidth
              onChange={handleChange}
              onClick={(e) => DatosEquipos(e.target.value)}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarEquipos && listarEquipos.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_equ}>{itemselect.codigo_equ}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <br />
        <div align="center">
          <Button className={styles.button} variant="contained" startIcon={<SaveIcon />} color="primary"
            onClick={() => abrirCerrarModalInsertar()}>  Crear Orden de Trabajo
          </Button>
        </div>
      </div>
    </div>
  )

  const ordenPendiente = (
    <div className={styles.modal}>
      <Typography align="center" className={styles.typography} variant="button" display="block" >
        <ActividadesPendientes ordenSeleccionado={ordenSeleccionado} tipoRegistro={tipoRegistro} operario={operario} />
      </Typography>
    </div>
  )

  return (
    <div className="App">
      <br />
      <ButtonGroup  >
        <Button className={styles.button}
          variant="contained" startIcon={<ForwardIcon />} color="primary" onClick={() => leerDatosEquipos()}
        > Seleccionar Equipo
        </Button>
      </ButtonGroup>
      <ButtonGroup  >
        <Button variant="contained" startIcon={<CachedIcon />} color="primary" onClick={() => leerOrdenes()} >Todas las Ordenes</Button>
        <Button variant="contained" startIcon={<ReplayIcon />} color="primary" onClick={() => leerOrdenesActivas()}>Ordenes Activas</Button>
      </ButtonGroup>
      <MaterialTable
        columns={columnas}
        data={listarOrdenes}
        fontSize={24}
        title="LISTADO DE ORDENES"
        actions={[
          {
            icon: 'edit',
            tooltip: 'Editar Orden',
            onClick: (event, rowData) => seleccionarOrden(rowData, "Editar")
          },
          {
            icon: CancelIcon,
            tooltip: 'Cancelar Orden',
            onClick: (event, rowData) => ConfirmeCancelarOrden(rowData, "Cancelar")
          },
          {
            icon: AccessAlarmIcon,
            tooltip: 'Pendiente Orden',
            onClick: (event, rowData) => crearPendientes(rowData, "Pendiente")
          }
         /*
          {
            icon: BuildIcon,
            tooltip: 'Asignar Herramientas',
            onClick: (event, rowData) => asignarHerramientas(rowData, "Herramientas")
          },
          */
        ]}
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
            tooltip: 'Estados del Equipo',
            render: rowData => {
              return (
                <div
                  style={{
                    fontSize: 18,
                    textAlign: 'center',
                    color: 'white',
                    backgroundColor: '#0277bd',
                  }}
                >
                  <Button variant="contained">Datos Contacto: {rowData.primer_nombre_con} { } {rowData.primer_apellido_con} { }
                    Telefono: {rowData.telefono_con} { } email: {rowData.email_con}{ } Proveedor : {rowData.razonsocial_int}
                  </Button>

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
        {ordenInsertar}
      </Modal>

      <Modal
        open={modalEditar}
        onClose={abrirCerrarModalEditar}
      >
        {ordenEditar}
      </Modal>
      <Modal
        open={modalCodigoEquipo}
        onClose={leerModalCodigoEquipo}
      >
        {codigoEquipo}
      </Modal>
      <Modal
        open={modalCancelar}
        onClose={abrirCerrarModalCancelar}
      >
        {modalCancelarOrden}
      </Modal>
      <Modal
        open={modalHerramientas}
        onClose={abrirCerrarModalHerramientas}
      >
        {modalAsignarHerramientas}
      </Modal>
      <Modal
        open={modalPendiente}
        onClose={abrirCerrarModalPendiente}
      >
        {ordenPendiente}
      </Modal>
    </div>
  );
}

export default CrearOrdenes;

/*
  <Fab variant="extended">
        <NavigationIcon className={styles.extendedIcon} />
        Datos Adicionales Equipos
        onClick
      </Fab>
*/