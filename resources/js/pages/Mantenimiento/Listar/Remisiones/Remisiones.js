import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { Modal, Button, TextField, Select, MenuItem, FormControl, InputLabel, Grid, ButtonGroup, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CachedIcon from '@material-ui/icons/Cached';
import ReplayIcon from '@material-ui/icons/Replay';
import swal from 'sweetalert';
import Moment from 'moment';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./ArchivoPdf.css";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Componentes de Conexion con el Backend
import contactosServices from "../../../../services/Interlocutores/Contactos";
import cumplimientooservServices from "../../../../services/GestionOrdenes/CumplimientoOserv";
import remisionesServices from "../../../../services/Mantenimiento/Remisiones";
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

function Remisiones() {
  const styles = useStyles();

  const [listarOrdenes, setListarOrdenes] = useState([]);
  const [modalGenerarPdf, setModalGenerarPdf] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalAsignar, setModalAsignar] = useState(false);
  const [formError, setFormError] = useState(false);
  const [listUnCumplimiento, setListUnCumplimiento] = useState([]);
  const [listarContactos, setListarContactos] = useState([]);
  const fechaactual = Moment(new Date()).format('YYYY-MM-DD');
  const horaactual = Moment(new Date()).format('HH:mm:ss');
  const [activo, setActivo] = useState(false);
  const [listarEquipo1, setListarEquipo1] = useState([]);
  const [listarEquipo2, setListarEquipo2] = useState([]);
  const [listarEquipo3, setListarEquipo3] = useState([]);
  const [listarEquipo4, setListarEquipo4] = useState([]);
  const [listarEquipo5, setListarEquipo5] = useState([]);
  const [lucesTrabajo, setLucesTrabajo] = useState("");
  const [luzStrober, setLuzStrober] = useState("");
  const [camara, setCamara] = useState("");
  const [sensorImpacto, setSensorImpacto] = useState("");
  const [alarmaReversa, setAlarmaReversa] = useState("");
  const [camasBateria, setCamasBateria] = useState("");

  const [estado, setEstado] = useState(1);
  let cambio = 12;
  let empresa = 1;
  let diasoperacion = 0;

  const [ordenSeleccionado, setOrdenSeleccionado] = useState({
    id_rem: "",
    cliente_rem: "",
    ordencompra_rem: "",
    ciudad_rem: "",
    direccion_rem: "",
    contacto_rem: "",
    telefono_rem: "",
    celular_rem: "",
    fechacreacion_rem: "",
    horometro_rem: "",
    estado_rem: "",
    equipo1_rem: "",
    equipo2_rem: "",
    equipo3_rem: "",
    equipo4_rem: "",
    lucesdetrabajo_rem:"",
		luzstrober_rem:"",
		camara_rem:"",
		sensordeimpacto_rem:"",
		alarmadereservsa_rem:"",
		camasdebateria_rem:""

  })

  const [nombrePdf, setNombrePdf] = useState("remision")

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
        pdf.save("Remision"+ordenSeleccionado.id_rem+".pdf");
      });
  }

  const leerOrdenes = () => {
    async function fetchDataOrdenes() {
      const res = await remisionesServices.listremision();
      setListarOrdenes(res.data);
      //console.log("Lee Ordenes Manual", res.data);
    }
    fetchDataOrdenes();
  }

  const leerOrdenesActivas = () => {
    async function fetchDataOrdenes() {
      const res = await remisionesServices.listremision();
      setListarOrdenes(res.data);
      //console.log("Cargar Una Orden", res.data);
    }
    fetchDataOrdenes();
  }

  useEffect(() => {
    async function fetchDataOrdenes() {
      const res = await remisionesServices.listremision();
      setListarOrdenes(res.data);
      console.log("Lee Ordenes Automaticas", res.data);
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

  const consultarCumplimiento = (id) => {
    //console.log("CUMPLIMIENTO A CONSULTAR : ", id)

    async function fetchDataUnCumplimiento() {
      //console.log("CUMPLIMIENTO A CONSULTAR : ", id)
      const res = await cumplimientooservServices.listUnCumplimiento(id);
      setListUnCumplimiento(res.data);
      if (res.data) {
        setActivo(true)
      } else { setActivo(false) }
      //console.log("DATOS CUMPLIMIENTO : ", res.data)

    }
    fetchDataUnCumplimiento();
  }

  const seleccionarOrden = (orden, caso) => {
    //console.log("REGISTRO SELECCIONADO : ", orden);
    consultarCumplimiento(orden.id_otr);
    setOrdenSeleccionado(orden);

    if(orden.lucesdetrabajo_rem === 'S'){
      setLucesTrabajo('Luces de Trabajo');
    }
    
    if(orden.luzstrober_rem === 'S'){
      setLuzStrober('Luz Strober');
    }
    
    if(orden.camara_rem === 'S'){
      setCamara('Camara');
    }
    
    if(orden.sensordeimpacto_rem === 'S'){
      setSensorImpacto('Sensor Impacto');
    }

    if(orden.alarmadereservsa_rem === 'S'){
      setAlarmaReversa('Alarma Reversa');
    }
    
    if(orden.camasdebateria_rem === 'S'){
      setCamasBateria('Camas de Batería');
    }

    async function fetchDataEquipos1() {
      const res = await equiposServices.listUnEquipo(orden.equipo1_rem);
      setListarEquipo1(res.data);
      console.log("EQUIPO 1 : ", res.data)
    }
    fetchDataEquipos1();

    async function fetchDataEquipos2() {
      const res = await equiposServices.listUnEquipo(orden.equipo2_rem);
      setListarEquipo2(res.data);
      console.log("EQUIPO 2 : ", res.data)
    }
    fetchDataEquipos2();

    async function fetchDataEquipos3() {
      const res = await equiposServices.listUnEquipo(orden.equipo3_rem);
      setListarEquipo3(res.data);
      console.log("EQUIPO 3 : ", res.data)
    }
    fetchDataEquipos3();

    async function fetchDataEquipos4() {
      const res = await equiposServices.listUnEquipo(orden.equipo4_rem);
      setListarEquipo4(res.data);
      console.log("EQUIPO 4 : ", res.data)
    }
    fetchDataEquipos4();

    async function fetchDataEquipos5() {
      const res = await equiposServices.listUnEquipo(orden.equipo5_rem);
      setListarEquipo5(res.data);
      console.log("EQUIPO 5 : ", res.data)
    }
    fetchDataEquipos5();

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
      field: 'id_rem'
    },
    {
      title: 'Cliente',
      field: 'razonsocial_cli',
      cellStyle: { minWidth: 200 }
    },
    {
      title: 'Orde de Compra',
      field: 'ordencompra_rem',
      cellStyle: { minWidth: 70 }
    },
    {
      title: 'Ciudad',
      field: 'nombre_ciu'
    },
    {
      title: 'Dirección',
      field: 'direccion_rem',
      cellStyle: { minWidth: 200 }
    },
    {
      title: 'Contacto',
      field: 'contacto_rem',
      cellStyle: { minWidth: 100 }
    },
    {
      title: 'Telefono',
      field: 'telefono_rem'
    },
    {
      title: 'Celular',
      field: 'celular_rem'
    },
    {
      title: 'Fecha de Creación',
      field: 'fechacreacion_rem',
      type: "date"
    },
    {
      title: 'Horometro',
      field: 'horometro_rem'
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
          <br />
          <Grid container spacing={1} >
            <Grid item xs={12} md={4}>
              <img src={require("../img/LogoLogistral.png")} className="imagenes" />
            </Grid> 
            <Grid item xs={12} md={6}>
              <Typography align="center" className={styles.typography} variant="button" display="block" >
                LOGISTICA ESTRUCTURAL S.A. Nit 900.161.726-3
              </Typography>
              <Typography align="center" className={styles.typography} variant="button" display="block" >
               REMISION # {ordenSeleccionado.id_rem}
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={1} >
            <Grid item xs={12} md={8} >
              <Button >CLIENTE : {ordenSeleccionado.razonsocial_cli}  </Button>
            </Grid>
            <Grid item xs={12} md={4} >
              <Button >ORDEN DE COMPRA : {ordenSeleccionado.ordencompra_rem} </Button>
            </Grid>
            <Grid item xs={12} md={12} >
              <Button >DIRECCION : {ordenSeleccionado.direccion_rem}</Button>
            </Grid>
          </Grid>
          <Grid container spacing={1} >
            <Grid item xs={12} md={12} >
              <Button>CONTACTO : {ordenSeleccionado.contacto_rem}</Button>
            </Grid>
            <Grid item xs={12} md={12} >
              <Button>CIUDAD : {ordenSeleccionado.nombre_ciu}  </Button>
            </Grid>
            <Grid item xs={12} md={12} >
              <Button>DEPARTAMENTO : {ordenSeleccionado.nombre_dep} </Button>
            </Grid>
          </Grid>
          <Grid container spacing={1} >
            <Grid item xs={12} md={12} >
              <Button>TELEFONO : {ordenSeleccionado.telefono_rem} </Button>
            </Grid>
          </Grid>
          <Typography align="center" className={styles.typography} variant="button" display="block" > MOVIMIENTOS DE RENTA </Typography>
          <table className="table table-bordered">
            <thead className="table-primary">
              <th>ID_Interno: </th>
              <th>Referencia: </th>
              <th>Descripción: </th>
              <th>Marca: </th>
              <th>Modelo: </th>
              <th>Serie: </th>
              <th>Horometro: </th>
            </thead>
            <tbody>
              {listarEquipo1 && listarEquipo1.map((cumplimiento, index) => {
                return (
                  <tr>
                    <td>{cumplimiento.codigo_equ}</td>
                    <td>{cumplimiento.referencia_dequ}</td>
                    <td>{cumplimiento.descripcion_equ}</td>
                    <td>{cumplimiento.descripcion_mar}</td>
                    <td>{cumplimiento.modelo_dequ}</td>
                    <td>{cumplimiento.serie_dequ}</td>
                    <td>{ordenSeleccionado.horometro_rem}</td>
                  </tr>
                )
              })
              
              }
              <br />
              {listarEquipo2 && listarEquipo2.map((cumplimiento, index) => {
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
              <br />
              {listarEquipo3 && listarEquipo3.map((cumplimiento, index) => {
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
              <br />
              {listarEquipo4 && listarEquipo4.map((cumplimiento, index) => {
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
          <page_footer>
            <Grid item xs={12} md={12}>
              <Typography align="center" className={styles.typography2} display="block" >
                ACCESORIOS
              </Typography>
            </Grid>
            <Grid container spacing={2} >
              <Grid item xs={12} md={4}>
                <Typography align="center" className={styles.typography2} display="block" >
                  {lucesTrabajo}
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography align="center" className={styles.typography2} display="block" >
                  {luzStrober}
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography align="center" className={styles.typography2} display="block" >
                  {camara}
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography align="center" className={styles.typography2} display="block" >
                  {sensorImpacto}
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography align="center" className={styles.typography2} display="block" >
                  {alarmaReversa}
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography align="center" className={styles.typography2} display="block" >
                  {camasBateria}
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2} >
              <Grid item xs={12} md={12}>
                <Typography align="center" className={styles.typography2} display="block" >
                  Observaciones____________________________________________________________________________________________
                </Typography>
              </Grid>
              <Grid item xs={12} md={12}>
                <Typography align="center" className={styles.typography2} display="block" >
                  __________________________________________________________________________________________________________
                </Typography>
              </Grid>
              <Grid item xs={12} md={12}>
                <Typography align="center" className={styles.typography2} display="block" >
                  __________________________________________________________________________________________________________
                </Typography>
              </Grid>
            </Grid>
            <br />
            <br />
            <Grid container spacing={2} >
              <Grid item xs={12} md={4}>
                <Typography align="center" className={styles.typography2} display="block" >
                  _______________________________
                  Responsable de Logística
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography align="center" className={styles.typography2} display="block" >
                  _______________________________
                  Responsable Transporte
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography align="center" className={styles.typography2} display="block" >
                  _______________________________
                  Cliente
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
        <Button variant="contained" startIcon={<CachedIcon />} color="primary" onClick={() => leerOrdenes()} >Todas las Remisiones</Button>
        <Button variant="contained" startIcon={<ReplayIcon />} color="primary" onClick={() => leerOrdenesActivas()}>Remisiones Activas</Button>
      </ButtonGroup>
      <MaterialTable
        columns={columnas}
        data={listarOrdenes}
        title="GENERAR PDF REMISIONES"
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

export default Remisiones;