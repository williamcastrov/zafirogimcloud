import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { Modal, Button, Grid, ButtonGroup, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CachedIcon from '@material-ui/icons/Cached';
import ReplayIcon from '@material-ui/icons/Replay';
import { green, purple } from '@material-ui/core/colors';
import swal from 'sweetalert';
import Moment from 'moment';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import html2pdf from "html2pdf.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./ArchivoPdf.css";

// Componentes de Conexion con el Backend
import crearordenesServices from "../../../services/GestionOrdenes/CrearOrdenes";
import imagenesotServices from "../../../services/GestionOrdenes/ImagenesOT";
import firmarotServices from "../../../services/GestionOrdenes/FirmarOT";
import cumplimientootServices from "../../../services/GestionOrdenes/CumplimientoOserv";
import cumplimientooserv from "../../../services/GestionOrdenes/CumplimientoOserv";

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
    color: "#000"
  },
  typography2: {
    fontSize: 10,
    color: "#000"
  },
  button: {
    margin: theme.spacing(1),
  },
}));

function OrdenesPdfCliente(props) {
  const { metadata, idUsu } = props;
  console.log("ID USUARIO : ", idUsu)
  const styles = useStyles();

  const [listarOrdenes, setListarOrdenes] = useState([]);
  const [modalGenerarPdf, setModalGenerarPdf] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [listUnCumplimiento, setListUnCumplimiento] = useState([]);
  const fechaactual = Moment(new Date()).format('YYYY-MM-DD');
  const horaactual = Moment(new Date()).format('HH:mm:ss');
  const [activo, setActivo] = useState(false);
  const [listarImagenesDb, setListarImagenesDb] = useState([]);

  const [estado, setEstado] = useState(1);
  let cambio = 12;
  let empresa = 1;
  let diasoperacion = 0;

  const [ordenSeleccionado, setOrdenSeleccionado] = useState({
    'id_otr': "",
    'estado_otr': estado,
    'tipooperacion_otr': 2,
    'tipo_otr': "",
    'concepto_otr': "",
    'fechaprogramada_otr': fechaactual,
    'fechainicia_otr': fechaactual,
    'fechafinal_otr': fechaactual,
    'diasoperacion_otr': 0,
    'equipo_otr': "",
    'proveedor_otr': "",
    'cliente_otr': "",
    'operario_otr': "",
    'contactocliente_otr': "",
    'subgrupoequipo_otr': "",
    'ciudad_otr': "",
    'resumenorden_otr': "",
    'prioridad_otr': 1,
    'empresa_otr': 1,
    'horometro_otr': "",
    'iniciatransporte_otr': "",
    'finaltransporte_otr': "",
    'tiempotransporte_otr': "",
    'tiempoorden_otr': ""
  })

  const leerOrdenes = () => {
    async function fetchDataOrdenes() {
      /*if (idUsu === 14) {
        const res = await crearordenesServices.listOrdenesServUsuario();
        setListarOrdenes(res.data);
      }
      else {*/
        const res = await crearordenesServices.listOrdenesServ();
        setListarOrdenes(res.data);
        //console.log("Lee Ordenes Manual", res.data);
      //}
    }
    fetchDataOrdenes();
  }

  const leerOrdenesActivas = () => {
    async function fetchDataOrdenes() {
      /*
      if (idUsu === 14) {
        const res = await crearordenesServices.listOrdenesServUsuario();
        setListarOrdenes(res.data);
      }
      else {*/
        const res = await crearordenesServices.listOrdenesServActivas();
        setListarOrdenes(res.data);
        //console.log("Cargar Una Orden", res.data);
      //}
    }
    fetchDataOrdenes();
  }

  useEffect(() => {
    if (idUsu != 0) {
      async function fetchDataOrdenes() {
        /*if (idUsu === 14) {
          const res = await crearordenesServices.listOrdenesServUsuario();
          setListarOrdenes(res.data);
        }
        else { */
          const res = await crearordenesServices.listOrdenesServ();
          setListarOrdenes(res.data);
          console.log("Lee Ordenes Automaticas", res.data);
        //}
      }
      fetchDataOrdenes();
    }
  }, [idUsu])

  const handleChange = e => {
    const { name, value } = e.target;

    setOrdenSeleccionado(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const seleccionarOrden = async (orden, caso) => {
    const numeroactividadesOT = await cumplimientootServices.actividadestotalesxot(orden.id_otr);
    if (numeroactividadesOT > 1) {
      console.log("OT : ", orden.id_otr, "Sin Actividades")
    } else {
      console.log("ORDEN SELECCIONADA : ", orden)
      const res = await imagenesotServices.listimagenesot(7721);
      console.log("DATOS IMAGENES : ", res.data)
      setListarImagenesDb(res.data);

      console.log("DATOS IMAGENES DB : ", res.data)
      const rest = await firmarotServices.listfirmasot(orden.id_actividad);
      //console.log("FIRMAS : ", rest.data.length)

      const result = await cumplimientooserv.listUnCumplimiento(orden.id_actividad);
      console.log("CUMPLIMIENTO : ", result.data)

      if (!result.data) {
        swal("Imprimir OT", "Orden sin Registro de Cumplimiento !", "warning", { button: "Aceptar" });
        return
      }

      window.open("https://gimcloud.co/api/ordenesserv/generarPdf/" + orden.id_actividad, "PDF")
    }
  }

  const abrirCerrarModalGenerarPdf = () => {
    setModalGenerarPdf(!modalGenerarPdf);
  }

  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
  }

  const columnas = [
    {
      field: 'id_otr',
      title: '# Orden',
      cellStyle: { minWidth: 50 }
    },
    {
      field: 'id_actividad',
      title: '# Actvidad',
      cellStyle: { minWidth: 50 }
    },
    {
      field: 'nombre_est',
      title: 'Estado',
      cellStyle: { minWidth: 250 }
    },
    {
      field: 'descripcion_tmt',
      title: 'Tipo de Orden',
      cellStyle: { minWidth: 200 }
    },
    {
      field: 'fechaprogramada_otr',
      title: 'Fecha de Programación',
      type: 'date'
    },
    {
      field: 'codigo_equ',
      title: 'Equipo',
      cellStyle: { minWidth: 70 }
    },
    {
      field: 'razonsocial_int',
      title: 'Proveedor',
      cellStyle: { width: 200, maxWidth: 200 },
    },
    {
      field: 'razonsocial_cli',
      title: 'Cliente',
      cellStyle: { width: 350, maxWidth: 350 },
    },
    {
      field: 'nombre_ciu',
      title: 'Ciudad',
      cellStyle: { minWidth: 150 }
    },
    {
      field: 'descripcion_abc',
      title: 'Prioridad de la Orden',
      cellStyle: { minWidth: 100 }
    }
  ]

  const ordenEditar = (
    <div className={styles.modal}>
      <Typography align="center" className={styles.typography} variant="button" display="block" >
        Crear Orden de Servicio
      </Typography>
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
        title="GENERAR PDF OT CLIENTE"
        actions={[
          {
            icon: PictureAsPdfIcon,
            tooltip: 'crear Pdf',
            onClick: (event, rowData) => seleccionarOrden(rowData, "PdfOrden")
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
                  <Button variant="contained">Datos Contacto: {rowData.primer_nombre_con} { } {rowData.primer_apellido_con} { }
                    Telefono: {rowData.telefono_con} { } email: {rowData.email_con}{ }
                  </Button>

                </div>
              )
            },
          },
        ]}
      />
      { }

      <Modal
        open={modalEditar}
        onClose={abrirCerrarModalEditar}
      >
        {ordenEditar}
      </Modal>

    </div>
  );
}

export default OrdenesPdfCliente;
