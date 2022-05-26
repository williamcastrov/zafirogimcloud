import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { Modal, Button, ButtonGroup, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import NumberFormat from 'react-number-format';
import CachedIcon from '@material-ui/icons/Cached';
import ReplayIcon from '@material-ui/icons/Replay';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import { green, blue, blueGrey, red } from '@material-ui/core/colors';
import swal from 'sweetalert';

// Componentes de Conexion con el Backend
import crearordenesServices from "../../../services/GestionOrdenes/CrearOrdenes";
import cumplimientooserServices from "../../../services/GestionOrdenes/CumplimientoOserv";

// Componentes Adicionales al proceso de Ordenes de Servicio
import ActividadesOservOperario from "../ActividadesOserv/RegistroActividadesOperario";
import ActividadesOserv from "../ActividadesOserv/ActividadesOserv";
import FirmarOT from "../FirmarOT/FirmarOT";


// hooks react redux
import { useDispatch, useSelector } from 'react-redux';

import { obtenerOrdenesAccion } from "../../../redux/ordenservicioDucks";

//Componentes Gestion de Ordenes
import MenuCrearOrden from "../MenuCrearOrden";

//import MenuCrearOrden from "../../DatosEquipos/MenuEquipos";

const useStyles = makeStyles((theme) => ({
  modal2: {
    position: 'absolute',
    width: 1500,
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

function CumplirOrden(props) {
  const { operario, idUsuario } = props;
  //console.log("ES OPERARIO  : ", operario)
  //console.log("DATO USUARIO : ", idUsuario)
  const styles = useStyles();
  const dispatch = useDispatch();
  const listOrdenes = useSelector(store => store.ordenesservicio.arrayOrdenes);

  const [listarOrdenes, setListarOrdenes] = useState([]);
  const [listarActivides, setListarActividades] = useState([]);
  const [ordenServicio, setOrdenServicio] = useState([]);

  const [modalEditar, setModalEditar] = useState(false);
  const [modalFirmar, setModalFirmar] = useState(false);
  const [modalActividades, setModalActividades] = useState(false);
  const [consumo, setConsumo] = useState(true);
  const [tipoRegistro, setTipoRegistro] = useState(true);
  const [cambio, setCambio] = useState(false);

  const [ordenSeleccionado, setOrdenSeleccionado] = useState({
    'id_otr': "",
    'estado_otr': "",
    'tipo_otr': "",
    'concepto_otr': "",
    'fechaprogramada_otr': "",
    'fechainicia_otr': "",
    'fechafinal_otr': "",
    'diasoperacion_otr': 0,
    'equipo_otr': "",
    'proveedor_otr': "",
    'cliente_otr': "",
    'operario_otr': "",
    'grupoequipo_otr': "",
    'subgrupoequipo_otr': "",
    'ciudad_otr': "",
    'resumenorden_otr': "",
    'prioridad_otr': "",
    'empresa_otr': ""
  })

  const leerOrdenes = () => {
    if (operario) {
      async function fetchDataOrdenes() {
        const res = await crearordenesServices.leetodasordentecnico(idUsuario);
        setListarOrdenes(res.data);
        //console.log("LEE ORDEN DEL USUARIO : ", res.data);
      }
      fetchDataOrdenes();
    } else {
      async function fetchDataOrdenes() {
        const res = await crearordenesServices.listOrdenesServ();
        setListarOrdenes(res.data);
        //console.log("Lee Ordenes Manual", res.data);
      }
      fetchDataOrdenes();
    }
  }

  const leerOrdenesActivas = () => {
    if (operario) {
      async function fetchDataOrdenes() {
        const res = await crearordenesServices.leeordentecnico(idUsuario);
        setListarOrdenes(res.data);
        //console.log("LEE ORDEN DEL USUARIO : ", res.data);
      }
      fetchDataOrdenes();
    } else {
      async function fetchDataOrdenes() {
        const res = await crearordenesServices.listOrdenesServActivas();
        setListarOrdenes(res.data);
        //console.log("Cargar Una Orden", res.data);
      }
      fetchDataOrdenes();
    }
  }

  useEffect(() => {
    if (operario) {
      async function fetchDataOrdenes() {
        const res = await crearordenesServices.leeordentecnico(idUsuario);
        setListarOrdenes(res.data);
        //console.log("LEE ORDEN DEL USUARIO : ", res.data);
      }
      fetchDataOrdenes();
    } else {
      async function fetchDataOrdenes() {
        const res = await crearordenesServices.listOrdenesServActivas();
        setListarOrdenes(res.data);
        //console.log("Lee Ordenes Automaticas", res.data);
      }
      fetchDataOrdenes();
    }
  }, [])

  const leeActividadesOT = (idorden) => {
    //console.log("NUMERO OT : ", idorden)
    async function fetchDataActividades() {
      const res = await cumplimientooserServices.leeractividadesot(idorden);
      setListarActividades(res.data);
      /*
        then(
          (response) => {
            if (response) {
              setListarActividades(res.data);
              //console.log("Actividades OT", res.data);
            } else {
              console.log("RESPUESTA ACTIVIDADES: ", response);
              //return null;
            }
          }
        );
     */
    }
    fetchDataActividades();
  }

  const seleccionarActividadOrden = (orden, caso) => {
    console.log("DATOS ORDEN : ", orden)
    leeActividadesOT(orden.id_otr);
    (caso === "Actividades") ? abrirCerrarModalActividades() : abrirCerrarModalActividades()
  }

  const seleccionarOrden = (orden, caso) => {
    //console.log("DATOS ORDEN : ", orden)
    if (orden.estado_otr === 24 || orden.estado_otr === 27 || orden.estado_otr === 32) {
      swal("Cumplimiento OT", "El estado de la OT no permite cambios", "warning", { button: "Aceptar" });
    } else {
      setOrdenServicio(orden);
      setOrdenSeleccionado(orden);
      setCambio(true);
      //console.log("CLIENTE SELECCIONADO : ", listarClientes);
      (caso === "Editar") ? abrirCerrarModalEditar() : abrirCerrarModalEditar()
    }
  }

  const FirmarOrden = (orden, caso) => {
    //console.log("DATOS ORDEN : ", orden)
    if (orden.estado_otr === 24 || orden.estado_otr === 27 || orden.estado_otr === 32) {
      swal("Cumplimiento OT", "El estado de la OT no permite cambios", "warning", { button: "Aceptar" });
    } else {
      setOrdenServicio(orden);
      setOrdenSeleccionado(orden);
      setCambio(true);
      //console.log("CLIENTE SELECCIONADO : ", listarClientes);
      (caso === "Firmar") ? abrirCerrarModalFirmar() : abrirCerrarModalFirmar()
    }
  }

  const abrirCerrarModalActividades = () => {
    setModalActividades(!modalActividades);
  }

  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
  }

  const abrirCerrarModalFirmar = () => {
    setModalFirmar(!modalFirmar);
  }

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
      cellStyle: { minWidth: 100 }
    },
    {
      field: 'nombrealterno_dequ',
      title: 'Bodega',
      cellStyle: { minWidth: 100 }
    },
    {
      field: 'razonsocial_cli',
      title: 'Cliente',
      cellStyle: { width: 300, maxWidth: 300 }
    },
    {
      field: 'nombre_ciu',
      title: 'Ciudad',
      cellStyle: { minWidth: 150 }
    }
  ]

  const columnasactividades = [
    {
      field: 'id_actividad',
      title: '# Actividad',
      cellStyle: { minWidth: 50 }
    },
    {
      field: 'nombre_est',
      title: 'Estado Equipo',
      cellStyle: { minWidth: 100 }
    },
    {
      field: 'descripcion_tfa',
      title: 'Tipo de Falla',
      cellStyle: { minWidth: 100 }
    },
    {
      field: 'descripcion_fmt',
      title: 'Descripcion',
      type: 'date'
    },
    {
      field: 'descripcion_cosv',
      title: 'Actividad Realizada',
      cellStyle: { minWidth: 200 }
    },
    {
      field: 'nombretecnico',
      title: 'Nombre Técnico'
    },
    {
      field: 'fechainicia_cosv',
      title: 'Fecha Inicia',
      cellStyle: { minWidth: 100 }
    },
    {
      field: 'fechafinal_cosv',
      title: 'Fecha Final'
    },
    {
      field: 'tiempoactividad_cosv',
      title: 'Tiempo Actividad',
      cellStyle: { minWidth: 60 }
    },
    {
      field: 'tiempotransporte_cosv',
      title: 'Tiempo Transporte',
      cellStyle: { minWidth: 60 }
    }
  ]

  const ordenActividades = (
    <div className={styles.modal}>
      <Typography align="center" className={styles.typography} variant="button" display="block" >
        Consultar Actividades x OT
      </Typography>
      <MaterialTable
        columns={columnasactividades}
        data={listarActivides}
        title="CONSULTAR ACTIVIDADES OT"
      />
      { }
    </div>
  )

  const ordenEditar = (
    <div className="App" >
      <div className={styles.modal}>
        {
          consumo ?
            (
              <ActividadesOserv ordenSeleccionado={ordenSeleccionado} tipoRegistro={tipoRegistro} operario={operario} idUsuario={idUsuario} />
            )
            :
            (
              <ActividadesOservOperario ordenSeleccionado={ordenSeleccionado} operario={operario} idUsuario={idUsuario} />
            )
        }
      </div>
    </div>
  )

  const ordenFirmar = (
    <div className="App" >
      <div className={styles.modal}>
        <Typography align="center" className={styles.typography} variant="button" display="block" >
          <FirmarOT ordenSeleccionado={ordenSeleccionado} tipoRegistro={tipoRegistro} operario={operario} />
        </Typography>
      </div>
    </div>
  )

  return (
    <div className="App">
      <br />
      <ButtonGroup  >
        <Button variant="contained" startIcon={<CachedIcon />} color="primary" onClick={() => leerOrdenes()} >Todas las Ordenes</Button>
        <Button variant="contained" startIcon={<ReplayIcon />} color="primary" onClick={() => leerOrdenesActivas()}>Ordenes Activas</Button>
      </ButtonGroup>
      <MaterialTable
        columns={columnas}
        data={listarOrdenes}
        title="GESTIONAR ORDENES DE SERVICIO"
        actions={[
          {
            icon: PlaylistAddCheckIcon,
            tooltip: 'Firmar Orden',
            onClick: (event, rowData) => FirmarOrden(rowData, "Firmar")
          },
          {
            icon: 'edit',
            tooltip: 'Actividades Orden',
            onClick: (event, rowData) => seleccionarActividadOrden(rowData, "Actividades")
          }
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
                    fontSize: 14,
                    textAlign: 'center',
                    color: 'white',
                    backgroundColor: '#0277bd',
                  }}
                >
                  <Button variant="contained">Email Contacto : {rowData.email_con} </Button> { } Proveedor : {rowData.razonsocial_int}
                </div>
              )
            },
          },
        ]}
      />
      { }
      <Modal
        open={modalActividades}
        onClose={abrirCerrarModalActividades}
      >
        {ordenActividades}
      </Modal>
      <Modal
        open={modalEditar}
        onClose={abrirCerrarModalEditar}
      >
        {ordenEditar}
      </Modal>
      <Modal
        open={modalFirmar}
        onClose={abrirCerrarModalFirmar}
      >
        {ordenFirmar}
      </Modal>
    </div>
  );
}

export default CumplirOrden;
