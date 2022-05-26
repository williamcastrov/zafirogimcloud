import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import MaterialTable from "material-table";
import { Modal, Button, Grid, ButtonGroup, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CachedIcon from '@material-ui/icons/Cached';
import ReplayIcon from '@material-ui/icons/Replay';
import swal from 'sweetalert';
import Moment from 'moment';
Moment.locale('es');
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./ArchivoPdf.css";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Componentes de Conexion con el Backend
import incrementocanonServices from "../../../../services/Mantenimiento/IncrementoCanon";
import ciudadesServices from "../../../../services/Parameters/Ciudades";
import estadosServices from "../../../../services/Parameters/Estados";
import clientesServices from "../../../../services/Interlocutores/Clientes";
import equiposServices from "../../../../services/Mantenimiento/Equipos";

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
    fontSize: 16,
    color: "#000"
  },
  button: {
    margin: theme.spacing(0),
  },
}));

function IncrementoCanon() {
  const styles = useStyles();

  const [listarIncrementoCanon, setListarIncrementoCanon] = useState([]);
  const [modalGenerarPdf, setModalGenerarPdf] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalAsignar, setModalAsignar] = useState(false);
  const [valorIncremento, setValorIncremento] = useState(0);
  const [maquina, setMaquina] = useState("");
  const fechaactual = Moment(new Date()).format('YYYY-MM-DD');
  const horaactual = Moment(new Date()).format('HH:mm:ss');
  const anno = Moment(new Date()).format('YYYY');
  //console.log("AÑO : ", anno);
  const [nombreCliente, setNombreCliente] = useState("");
  const [actualiza, setActualiza] = useState(false);
  const [listarEquipos, setListarEquipos] = useState([]);

  const [incrementoSeleccionado, setIncrementoSeleccionado] = useState({
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
      setListarIncrementoCanon(res.data);
      let valor = res.data[0].valorrentames_ctr * (1 + (res.data[0].variacion_inc / 100));
      //console.log("NUEVO VALOR MES : ", valor);
      setValorIncremento(valor);
      setMaquina(res.data[0].codigo_equ);
      setActualiza(false);
      leerMaquina(res.data[0].equipo_inc);
    }
    fetchDataIncrementoCanon();
  }, [actualiza])

  const leerMaquina = async (maquina) => {
    const res = await equiposServices.listUnEquipo(maquina);
    setListarEquipos(res.data);
  }

  const [nombrePdf, setNombrePdf] = useState("cartas")

  const exportarAPdf = () => {
    const input = document.getElementById('pdfreact');
    html2canvas(input)
      .then((canvas) => {
        var imgWidth = 200;
        var pageHeight = 290;
        var imgHeight = canvas.height * imgWidth / canvas.width;
        var heightLeft = imgHeight;
        const imgData = canvas.toDataURL('../img/LogoLogistral.png');
        const pdf = new jsPDF('p', 'mm', 'a4')
        var position = 0;
        var heightLeft = imgHeight;
        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
        pdf.save("CartaAlza" + maquina + ".pdf");
      });
  }

  const handleChange = e => {
    const { name, value } = e.target;

    setIncrementoSeleccionado(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const seleccionarOrden = (orden, caso) => {
    setNombreCliente(orden.razonsocial_cli);
    console.log("VALOR SELECCIONAD : ", orden)
    setIncrementoSeleccionado(orden);
    window.open("https://gimcloud.co/api/mantenimiento/generarPdfAlza/" + orden.id_inc, "PDF")

    //(caso === "PdfOrden") ? abrirCerrarModalGenerarPdf() : abrirCerrarModalCancelar()
  }

  const abrirCerrarModalGenerarPdf = () => {
    setModalGenerarPdf(!modalGenerarPdf);
  }

  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
  }

  const abrirCerrarModalCancelar = () => {
    setModalCancelar(!modalCancelar);
  }

  const abrirCerrarModalAsignar = () => {
    setModalAsignar(!modalAsignar);
  }

  const columnas = [
    {
      title: 'Id',
      field: 'id_inc'
    },
    {
      title: 'Cliente',
      field: 'razonsocial_cli',
      cellStyle: { minWidth: 200 }
    },
    {
      title: 'Nombre Contacto',
      field: 'nombrecontacto_inc',
      cellStyle: { minWidth: 200 }
    },
    {
      title: 'Ciudad',
      field: 'nombre_ciu'
    },
    {
      title: 'Fecha Creación',
      field: 'fechacreacion_inc',
      type: "date"
    },
    {
      title: 'Fecha Incremento',
      field: 'fechaincremento_inc',
      type: "date"
    },
    {
      title: 'Variación',
      field: 'nombre_est'
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

  const ordenGenerarPdf = (
    <div className={styles.modal}>
      console.log("Proceso anterior para crear PDF - Cambiado en 2021/07/04")
    </div>
  )

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
        <Button variant="contained" startIcon={<CachedIcon />} color="primary" onClick={() => leerOrdenes()} >Todas las Cartas</Button>
        <Button variant="contained" startIcon={<ReplayIcon />} color="primary" onClick={() => leerOrdenesActivas()}>Cartas Activas</Button>
      </ButtonGroup>
      <MaterialTable
        columns={columnas}
        data={listarIncrementoCanon}
        title="GENERAR PDF CARTAS INCREMENTO CANON"
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
        open={modalGenerarPdf}
        onClose={abrirCerrarModalGenerarPdf}
      >
        {ordenGenerarPdf}
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

export default IncrementoCanon;
