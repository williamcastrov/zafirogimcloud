import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { Modal, Button, ButtonGroup, Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import NumberFormat from 'react-number-format';
import SignalWifi4BarLockIcon from '@material-ui/icons/SignalWifi4BarLock';
import { green, blue, blueGrey, red } from '@material-ui/core/colors';
import ForwardIcon from '@material-ui/icons/Forward';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import SpellcheckIcon from '@material-ui/icons/Spellcheck';
import Moment from 'moment';
import shortid from "shortid"

// Componentes de Conexion con el Backend
import crearordenesServices from "../../../services/GestionOrdenes/CrearOrdenes";
import cumplimientoactividadesServices from "../../../services/GestionOrdenes/CumplimientoOserv";
import firmarotServices from "../../../services/GestionOrdenes/FirmarOT";
import imagenesotServices from "../../../services/GestionOrdenes/ImagenesOT";

// Componentes Adicionales al proceso de Ordenes de Servicio
import ActividadesOserv from "../ActividadesOserv/RevisarAprobarActividades";

// hooks react redux
import { useDispatch, useSelector } from 'react-redux';

import { obtenerOrdenesAccion } from "../../../redux/ordenservicioDucks";

//Componentes Gestion de Ordenes
import MenuCrearOrden from "../MenuCrearOrden";
import cumplimientooserv from "../../../services/GestionOrdenes/CumplimientoOserv";

//import MenuCrearOrden from "../../DatosEquipos/MenuEquipos";

const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: 1200,
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
    width: 490,
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
    width: 900,
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

function RevisarAprobarOT(props) {
  const { operarioot, idUsuario } = props;
  console.log("Operario : ", operarioot)

  const styles = useStyles();
  const dispatch = useDispatch();
  const listOrdenes = useSelector(store => store.ordenesservicio.arrayOrdenes);
  const [imageURL, setImageURL] = useState(null);
  const [fotoURL, setFotoURL] = useState(null);
  const [fotoURL1, setFotoURL1] = useState(null);
  const [listarOrdenes, setListarOrdenes] = useState([]);
  const [listarActividadesOrdenes, setListarActividadesOrdenes] = useState([]);
  const [ordenServicio, setOrdenServicio] = useState([]);
  const [modalFirmar, setModalFirmar] = useState(false);
  const [modalFotos, setModalFotos] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [listarFirma, setListarFirma] = useState([]);
  const [listarFotos, setListarFotos] = useState([]);
  const [actualiza, setActualiza] = useState(false);
  const [tiempoParo, setTiempoParo] = useState(0);
  const [tiempoActividad, setTiempoActividad] = useState(0);

  const [cambio, setCambio] = useState(false);

  const [ordenSeleccionado, setOrdenSeleccionado] = useState({
    estado_otr: "",
    tipo_otr: "",
    tipooperacion_otr: "",
    tiposervicio_otr: "",
    fechaprogramada_otr: "",
    fechainicia_otr: "",
    fechafinal_otr: "",
    diasoperacion_otr: 0,
    equipo_otr: "",
    proveedor_otr: "",
    cliente_otr: "",
    operario_otr: "",
    operariodos_otr: "",
    contactocliente_otr: "",
    nitcliente_otr: "",
    subgrupoequipo_otr: "",
    ciudad_otr: "",
    resumenorden_otr: "",
    prioridad_otr: "",
    empresa_otr: "",
    horometro_otr: "",
    iniciatransporte_otr: "",
    finaltransporte_otr: "",
    tiempotransporte_otr: "",
    tiempoorden_otr: "",
    iniciaparomaquina_otr: "",
    finalparomaquina_otr: "",
    tiempoparo_otr: "",
  })

  useEffect(() => {
    async function fetchDataActividadesOrdenes() {
      const res = await cumplimientooserv.listar_actividadesotrevision();
      setListarActividadesOrdenes(res.data);
      //console.log("DATOS ACTIVIDADES : ",res.data)
    }
    fetchDataActividadesOrdenes();
  }, [])

  useEffect(() => {
    async function fetchDataOrdenes() {
      if (idUsuario === 14) {
        const res = await crearordenesServices.listOrdenesServActivasRevisionUsuario();
        setListarOrdenes(res.data);
      } else {
        const res = await crearordenesServices.listOrdenesServActivasRevision();
        setListarOrdenes(res.data);
      }

      //console.log("Lee Ordenes Automaticas", res.data);
      setActualiza(false);
    }
    fetchDataOrdenes();
  }, [actualiza])

  const handleChange = e => {
    const { name, value } = e.target;

    setOrdenSeleccionado(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const seleccionarOrden = (actividad, caso) => {
    console.log("DATOS ACTIVIDAD ORDEN : ", actividad)
    setOrdenServicio(actividad);
    setOrdenSeleccionado(actividad);
    var a = Moment(actividad.iniciaparomaquina_otr, "YYYY-MM-DD HH:mm:ss")
    var b = Moment(actividad.finalparomaquina_otr, "YYYY-MM-DD HH:mm:ss")
    //console.log("DIFERENCIA MINUTOS ACTIVIDAD: ", a.diff(b, 'minutes'))
    let tiempo = b.diff(a, 'minutes');
    setTiempoParo(tiempo);
    // Calcula tiempo de la Actividad a Cerrar

    var a = Moment(actividad.fechainicia_cosv, "YYYY-MM-DD HH:mm:ss")
    var b = Moment(actividad.fechafinal_cosv, "YYYY-MM-DD HH:mm:ss")
    //console.log("DIFERENCIA MINUTOS ACTIVIDAD: ", a.diff(b, 'minutes'))
    let tiempoActividad = b.diff(a, 'minutes');
    console.log("TIEMPO ACTIVIDAD : ", tiempoActividad)
    setTiempoActividad(tiempoActividad);
    //console.log("TIEMPO PARO : ", tiempo)
    setImageURL([]);

    async function fetchDataFirma() {
      const res = await firmarotServices.listfirmasot(actividad.id_actividad);
      setListarFirma(res.data);
      setImageURL(res.data[0].imagen_fir);
    }
    fetchDataFirma();

    setCambio(true);
    //console.log("CLIENTE SELECCIONADO : ", listarClientes);

    (caso === "Editar") ? abrirCerrarModalEditar() : abrirCerrarModalFirmar()

    setActualiza(true);
  }

  const seleccionarFotos = (actividad, caso) => {
    //console.log("DATOS ACTIVIDAD ORDEN : ", actividad)
    setFotoURL([]);

    async function fetchDataFotos() {
      setFotoURL(null);
      setFotoURL1(null);
      const res = await imagenesotServices.listimagenesot(actividad.id_actividad);
      console.log("DATOS FOTOS : ", res.data);
      setListarFotos(res.data);
      setFotoURL("/images/"+res.data[0].name+"?v="+shortid());
      setFotoURL1("/images/"+res.data[1].name+"?v="+shortid());
      //console.log("URL FOTOS : ", "/images/"+res.data[0].name);
    }
    fetchDataFotos();

    setCambio(true);
    //console.log("CLIENTE SELECCIONADO : ", listarClientes);

    (caso === "Fotos") ? abrirCerrarModalFotos() : abrirCerrarModalFotos()

    setActualiza(true);
  }

  const abrirCerrarModalFirmar = () => {
    setModalFirmar(!modalFirmar);
  }

  const abrirCerrarModalFotos = () => {
    setModalFotos(!modalFotos);
  }

  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
  }

  // "string","boolean","numeric","date","datetime","time","currency"
  const columnas = [
    {
      field: 'id_otr',
      title: '# Orden',
      cellStyle: { minWidth: 50 }
    },
    {
      field: 'id_actividad',
      title: 'id Actividad',
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
      field: 'nombretecnico',
      title: 'Tecnico Asignado'
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

  const ordenFirmar = (
    <div className={styles.modal2}>
      <Typography align="center" className={styles.typography} variant="button" display="block" >
        Firma OT por parte del Cliente
      </Typography>
      <Grid container spacing={2} >
        <Grid item xs={12} md={12}>
          <img
            src={imageURL}
            alt="firma"
            style={{
              display: "block",
              margin: "0 auto",
              border: "1px solid black",
              width: "400px"
            }}
          />
        </Grid>
      </Grid>
    </div>
  )

  const ordenFotos = (
    <div className={styles.modal3}>
      <Typography align="center" className={styles.typography} variant="button" display="block" >
        Fotos OT
      </Typography>
      <Grid container spacing={2} >
        <Grid item xs={6} md={6}>
          <img
            src={fotoURL}
            alt="foto"
            style={{
              display: "block",
              margin: "0 auto",
              border: "1px solid black",
              width: "400px"
            }}
          />
        </Grid>
        <Grid item xs={6} md={6}>
          <img
            src={fotoURL1}
            alt="foto"
            style={{
              display: "block",
              margin: "0 auto",
              border: "1px solid black",
              width: "400px"
            }}
          />
        </Grid>
      </Grid>
    </div>
  )
///var/www/bc-gim/public/images/gimcloudAMzT88Mjb2YHXJNKcu6A.jpeg
// src={"fotoURL"}
  const ordenEditar = (
    <div className="App" >
      <div className={styles.modal}>
        <ActividadesOserv ordenSeleccionado={ordenSeleccionado} tiempoParo={tiempoParo} tiempoActividad={tiempoActividad}
                          idUsuario={idUsuario} ordenServicio={ordenServicio}
        />
      </div>
    </div>
  )

  //<Button variant="contained" startIcon={<CachedIcon />} color="primary" onClick={() => dispatch(obtenerOrdenesAccion())} >Todas las Ordenes</Button>

  return (
    <div className="App">
      <br />
      <Button className={styles.button}
        variant="contained" startIcon={<ForwardIcon />} color="primary" onClick={() => setActualiza(true)}
      > Actualizar Datos
      </Button>
      <MaterialTable
        columns={columnas}
        data={listarActividadesOrdenes}
        title="REVISAR Y APROBAR OT"
        actions={[
          {
            icon: 'edit',
            tooltip: 'Actividades OT',
            onClick: (event, rowData) => seleccionarOrden(rowData, "Editar")
          },
          {
            icon: SpellcheckIcon,
            tooltip: 'Revisar Firma',
            onClick: (event, rowData) => seleccionarOrden(rowData, "Firmar")
          },
          {
            icon: AddAPhotoIcon,
            tooltip: 'Revisar Fotos',
            onClick: (event, rowData) => seleccionarFotos(rowData, "Fotos")
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
                  <Button variant="contained">Modelo :  {rowData.modelo_dequ} </Button> { }
                  <Button variant="contained">Serie :  {rowData.serie_dequ} </Button> { }
                  <Button variant="contained">Referencia :  {rowData.referencia_dequ} </Button>
                  <Button variant="contained">Proveedor :  {rowData.nombre_emp} </Button>
                </div>
              )
            },
          },
        ]}
      />
      { }
      <Modal
        open={modalFirmar}
        onClose={abrirCerrarModalFirmar}
      >
        {ordenFirmar}
      </Modal>
      <Modal
        open={modalFotos}
        onClose={abrirCerrarModalFotos}
      >
        {ordenFotos}
      </Modal>
      <Modal
        open={modalEditar}
        onClose={abrirCerrarModalEditar}
      >
        {ordenEditar}
      </Modal>
    </div>
  );
}

export default RevisarAprobarOT;
