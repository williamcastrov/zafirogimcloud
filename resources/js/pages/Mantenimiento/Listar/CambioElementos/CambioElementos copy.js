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
import contactosServices from "../../../../services/Interlocutores/Contactos";
import cumplimientooservServices from "../../../../services/GestionOrdenes/CumplimientoOserv";
import cambioelementosServices from "../../../../services/Mantenimiento/CambioElementos";
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

function CambioElementos() {
  const styles = useStyles();

  const [listarOrdenes, setListarOrdenes] = useState([]);
  const [modalGenerarPdf, setModalGenerarPdf] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalAsignar, setModalAsignar] = useState(false);
  const fechaactual = Moment(new Date()).format('YYYY-MM-DD');
  const horaactual = Moment(new Date()).format('HH:mm:ss');
  const [nombreCliente, setNombreCliente] = useState("");
  const [listarEntrega1, setListarEntrega1] = useState([]);
  const [listarRecibe1, setListarRecibe1] = useState([]);
  const [listarEntrega2, setListarEntrega2] = useState([]);
  const [listarRecibe2, setListarRecibe2] = useState([]);
  const [listarEntrega3, setListarEntrega3] = useState([]);
  const [listarRecibe3, setListarRecibe3] = useState([]);

  const [ordenSeleccionado, setOrdenSeleccionado] = useState({
    id_cel: "",
    cliente_cel: "",
    ciudad_cel: "",
    direccion_cel: "",
    fechacreacion_cel: "",
    estado_cel: "",
    equipoentrega1_cel: "",
    equiporecibe1_cel: "",
    equipoentrega2_cel: "",
    equiporecibe2_cel: "",
    equipoentrega3_cel: "",
    equiporecibe3_cel: ""
  })

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
            pdf.save("CartaCambio.pdf");
    });
  }

  const leerOrdenes = () => {
    async function fetchDataOrdenes() {
      const res = await CambioelementosServices.listcambioelementos();
      setListarOrdenes(res.data);
      //console.log("Lee Ordenes Manual", res.data);
    }
    fetchDataOrdenes();
  }

  const leerOrdenesActivas = () => {
    async function fetchDataOrdenes() {
      const res = await cambioelementosServices.listcambioelementos();
      setListarOrdenes(res.data);
      //console.log("Cargar Una Orden", res.data);
    }
    fetchDataOrdenes();
  }

  useEffect(() => {
    async function fetchDataOrdenes() {
      const res = await cambioelementosServices.listcambioelementos();
      setListarOrdenes(res.data);
      //console.log("Lee Ordenes Automaticas", res.data);
    }
    fetchDataOrdenes();
  }, [])

  const handleChange = e => {
    const { name, value } = e.target;

    setOrdenSeleccionado(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const seleccionarOrden = (orden, caso) => {
    setNombreCliente(orden.razonsocial_cli);
    //console.log("VALOR SELECCIONAD : ", orden)
    setOrdenSeleccionado(orden);

    async function fetchDataEquipos1() {
      const res = await equiposServices.listUnEquipo(orden.equipoentrega1_cel);
      setListarEntrega1(res.data);
      //console.log("EQUIPO 1 : ", res.data)
    }
    fetchDataEquipos1();

    async function fetchDataEquipos2() {
      const res = await equiposServices.listUnEquipo(orden.equipoentrega2_cel);
      setListarEntrega2(res.data);
      //console.log("EQUIPO 2 : ", res.data)
    }
    fetchDataEquipos2();

    async function fetchDataEquipos3() {
      const res = await equiposServices.listUnEquipo(orden.equipoentrega3_cel);
      setListarEntrega3(res.data);
      console.log("EQUIPO 3 : ", res.data)
    }
    fetchDataEquipos3();

    async function fetchDataEquipos4() {
      const res = await equiposServices.listUnEquipo(orden.equiporecibe1_cel);
      setListarRecibe1(res.data);
      //console.log("RECIBE 1 : ", res.data)
    }
    fetchDataEquipos4();

    async function fetchDataEquipos5() {
      const res = await equiposServices.listUnEquipo(orden.equiporecibe2_cel);
      setListarRecibe2(res.data);
      //console.log("RECIBE 2 : ", res.data)
    }
    fetchDataEquipos5();

    async function fetchDataEquipos6() {
      const res = await equiposServices.listUnEquipo(orden.equiporecibe3_cel);
      setListarRecibe3(res.data);
      //console.log("RECIBE 3 : ", res.data)
    }
    fetchDataEquipos6();

    (caso === "PdfOrden") ? abrirCerrarModalGenerarPdf() : abrirCerrarModalCancelar()
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
      field: 'id_cel'
    },
    {
      title: 'Cliente',
      field: 'razonsocial_cli',
      cellStyle: { minWidth: 200 }
    },
    {
      title: 'Ciudad',
      field: 'nombre_ciu'
    },
    {
      title: 'Dirección',
      field: 'direccion_cel',
      cellStyle: { minWidth: 200 }
    },
    {
      title: 'Fecha de Creación',
      field: 'fechacreacion_cel',
      type: "date"
    },
    {
      title: 'Estado',
      field: 'nombre_est'
    }
  ]

  const ordenGenerarPdf = (
    <div className={styles.modal}>
      <br />
      <div className="container" id="pdfreact" >
        <page>
          <br/>
          <Grid container spacing={2} >
            <Grid item xs={12} md={4}>
              <img src={require("../img/LogoLogistral.png")} className="imagenesCarta" />
            </Grid>
            <Grid item xs={12} md={12}>
              <Typography align="left" className={styles.typography} variant="button" display="block" >
                La Estrella,  {Moment(ordenSeleccionado.fechacreacion_cel).format("YYYY/MM/DD")}
              </Typography>
            </Grid>
            <br/>
            <Grid item xs={12} md={12}>
              <Typography align="left" className={styles.typography} variant="button" display="block" >
                Señores:
              </Typography>
            </Grid>
            <Grid item xs={12} md={12}>
            <Typography align="left" className={styles.typography} variant="button" display="block" >
              {nombreCliente}
            </Typography>
            </Grid>
            <Grid item xs={12} md={12}>
            <Typography align="left" className={styles.typography} display="block" >
              De Logística Estructural S.A. con NIT. 900.161.726-3, les notificamos de manera formal
              que de acuerdo al contrato de renta que tenemos vigente a la fecha, se hace cambio de
              los siguientes elementos:
            </Typography>
            </Grid>
          </Grid>
          <br/>
          <Grid item xs={12} md={12}>
            <Typography align="left" className={styles.typography} variant="button" display="block" > 
              ELEMENTO(S) ENTREGADO(S): 
            </Typography>
          </Grid>
          <table className="table table-bordered">
            <thead className="table-primary">
              <th>ID </th>
              <th>Referencia: </th>
              <th>Descripción: </th>
              <th>Marca: </th>
              <th>Modelo: </th>
              <th>Serie: </th>
            </thead>
            <tbody>
              {listarEntrega1 && listarEntrega1.map((cumplimiento, index) => {
                return (
                  <tr>
                    <td>{cumplimiento.codigo_equ}</td>
                    <td>{cumplimiento.referencia_dequ}</td>
                    <td>{cumplimiento.descripcion_equ}</td>
                    <td>{cumplimiento.descripcion_mar}</td>
                    <td>{cumplimiento.modelo_dequ}</td>
                    <td>{cumplimiento.serie_dequ}</td>
                  </tr>
                )
              })}
               {listarEntrega2 && listarEntrega2.map((cumplimiento, index) => {
                return (
                  <tr>
                    <td>{cumplimiento.codigo_equ}</td>
                    <td>{cumplimiento.referencia_dequ}</td>
                    <td>{cumplimiento.descripcion_equ}</td>
                    <td>{cumplimiento.descripcion_mar}</td>
                    <td>{cumplimiento.modelo_dequ}</td>
                    <td>{cumplimiento.serie_dequ}</td>
                  </tr>
                )
              })}
              {listarEntrega3 && listarEntrega3.map((cumplimiento, index) => {
                return (
                  <tr>
                    <td>{cumplimiento.codigo_equ}</td>
                    <td>{cumplimiento.referencia_dequ}</td>
                    <td>{cumplimiento.descripcion_equ}</td>
                    <td>{cumplimiento.descripcion_mar}</td>
                    <td>{cumplimiento.modelo_dequ}</td>
                    <td>{cumplimiento.serie_dequ}</td>
                  </tr>
                )
              })}
              <Grid item xs={12} md={12}>
                <Typography align="left" className={styles.typography} variant="button" display="block" > 
                  ELEMENTO(S)_DEVUELTOS(S): 
                </Typography>
              </Grid>
              {listarRecibe1 && listarRecibe1.map((cumplimiento, index) => {
                return (
                  <tr>
                    <td>{cumplimiento.codigo_equ}</td>
                    <td>{cumplimiento.referencia_dequ}</td>
                    <td>{cumplimiento.descripcion_equ}</td>
                    <td>{cumplimiento.descripcion_mar}</td>
                    <td>{cumplimiento.modelo_dequ}</td>
                    <td>{cumplimiento.serie_dequ}</td>
                  </tr>
                )
              })}
               {listarRecibe2 && listarRecibe2.map((cumplimiento, index) => {
                return (
                  <tr>
                    <td>{cumplimiento.codigo_equ}</td>
                    <td>{cumplimiento.referencia_dequ}</td>
                    <td>{cumplimiento.descripcion_equ}</td>
                    <td>{cumplimiento.descripcion_mar}</td>
                    <td>{cumplimiento.modelo_dequ}</td>
                    <td>{cumplimiento.serie_dequ}</td>
                  </tr>
                )
              })}
               {listarRecibe3 && listarRecibe3.map((cumplimiento, index) => {
                return (
                  <tr>
                    <td>{cumplimiento.codigo_equ}</td>
                    <td>{cumplimiento.referencia_dequ}</td>
                    <td>{cumplimiento.descripcion_equ}</td>
                    <td>{cumplimiento.descripcion_mar}</td>
                    <td>{cumplimiento.modelo_dequ}</td>
                    <td>{cumplimiento.serie_dequ}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <br/>
          <page_footer>
            <Grid item xs={12} md={12}>
              <Typography align="left" className={styles.typography} display="block" >
                Este comunicado hace parte integral del contrato de renta, para lo cual solicitamos
                por favor anexarlo al mismo.
              </Typography>
            </Grid>
            <br/>
            <Grid container spacing={2} >
              <Grid item xs={12} md={6}>
                <Typography align="left" className={styles.typography2} display="block" >
                  Firma Responsable de entrega:
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography align="left" className={styles.typography2} display="block" >
                  Firma Responsable Recibo:
                </Typography>
              </Grid>
              <br/>
              <br/>
              <br/>
              <br/>
              <Grid item xs={12} md={6}>
                <Typography align="left" className={styles.typography2} display="block" >
                  ___________________________________________________
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography align="left" className={styles.typography2} display="block" >
                  ___________________________________________________
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography align="left" className={styles.typography2} display="block" >
                  LOGISTRAL S.A.                                    
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography align="left" className={styles.typography2} display="block" >
                  {nombreCliente}                                   
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography align="left" className={styles.typography2} display="block" >                        
                Eliana González Ortega                           
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography align="left" className={styles.typography2} display="block" >                        
                 Nombre:                         
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography align="left" className={styles.typography2} display="block" >                           
                  Analista de  Mantenimiento                        
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography align="left" className={styles.typography2} display="block" >                           
                  Cargo:                       
                </Typography>
              </Grid>

            </Grid>
          </page_footer>
        </page>
      </div>
      <Grid container spacing={2} >
        <Grid item xs={12} md={5} ></Grid>
        <Grid item xs={12} md={4}>
          <Button variant="contained" startIcon={<PictureAsPdfIcon />} color="primary" onClick={() => exportarAPdf()} >Exportar a PDF
          </Button>
        </Grid>
      </Grid>
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
        data={listarOrdenes}
        title="GENERAR PDF CARTAS CAMBIO ELEMENTOS"
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
      {}
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

export default CambioElementos;
