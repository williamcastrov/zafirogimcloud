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
import contactosServices from "../../../services/Interlocutores/Contactos";
import cumplimientooservServices from "../../../services/GestionOrdenes/CumplimientoOserv";
import imagenesotServices from "../../../services/GestionOrdenes/ImagenesOT";
import firmarotServices from "../../../services/GestionOrdenes/FirmarOT";

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
  const { metadata } = props;
  //console.log("ID USUARIO : ", metadata)
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
  const [idUsuario, setIdUsuario] = useState(111111111);
  const [listarImagenes, setListarImagenes] = useState([]);
  const [listarImagenesDb, setListarImagenesDb] = useState([]);
  const [listarFirmasOT, setListarFirmasOT] = useState(null);
  const [listarFirmasOTTecnico, setListarFirmasOTTecnico] = useState(null);

  const [estado, setEstado] = useState(1);
  let cambio = 12;
  let empresa = 1;
  let diasoperacion = 0;

  const [prueba, setPrueba] = useState({
    'id_otr': 13,
    'usuario': 1111111
  })

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

  const [nombrePdf, setNombrePdf] = useState("ot")

  const exportarAPdf = () => {
    var configuracion = {
      margin: 0,
      filename: "OTCliente" + ordenSeleccionado.id_otr + ".pdf",
      jsPDF: { unit: 'in', format: 'letter' }
    }
    var documento = document.getElementById('pdf react');
    html2pdf(documento, configuracion);
  }

  const leerOrdenes = () => {
    async function fetchDataOrdenes() {
      const res = await crearordenesServices.listOrdenesServ();
      setListarOrdenes(res.data);
      //console.log("Lee Ordenes Manual", res.data);
    }
    fetchDataOrdenes();
  }

  const leerOrdenesActivas = () => {
    async function fetchDataOrdenes() {
      const res = await crearordenesServices.listOrdenesServActivas();
      setListarOrdenes(res.data);
      //console.log("Cargar Una Orden", res.data);
    }
    fetchDataOrdenes();
  }

  useEffect(() => {
    async function fetchDataOrdenes() {
      const res = await crearordenesServices.listOrdenesServ();
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
      //abrirCerrarModalRevisarCumplimiento();
    }
    fetchDataUnCumplimiento();
  }

  const seleccionarOrden = async (orden, caso) => {
    //console.log("REGISTRO SELECCIONADO : ", orden);
    const res = await imagenesotServices.listimagenesot(orden.id_otr);
    setListarImagenesDb(res.data);

    console.log("DATOS IMAGENES DB : ", res.data)

    const rest = await firmarotServices.listfirmasot(orden.id_otr);
    console.log("VALOR : ", rest.data.length)
    if(!rest.data.length){
      swal("Imprimir OT", "Orden sin Fotos o Firma !", "warning", { button: "Aceptar" });
      return
    }
    setListarFirmasOT(rest.data[0].imagen_fir);
    setListarFirmasOTTecnico(rest.data[0].firmatecnico_fir);
    console.log("FIRMA OT : ", rest.data[0].imagen_fir)

    consultarCumplimiento(orden.id_otr);
    const formdata = new FormData();
    formdata.append('image', " ")
    formdata.append('orden', orden.id_otr)
    formdata.append('idusuario', metadata)
    //console.log("FORM DATA : ", formdata)

    fetch('https://imagenes.gimcloud.co/api/imagenes/recibedata', {
      method: 'POST',
      body: formdata
    })
      .then(res => res.json())
      .then(res => setListarImagenes(res))
      .catch(err => {
        console.error(err)
      })

      /*
      .then(res => setListarImagenes(res),
          console.log("RES IMAGENES : ", res))
      */

    /*
        fetch('http://128.199.2.127:9000/api/imagenes/get/' + prueba)
          .then(res => res.json())
          .then(res => setListarImagenes(res))
          .catch(err => {
            console.error(err)
          })
          */

    setOrdenSeleccionado(orden);
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

  const ordenGenerarPdf = (
    <div className={styles.modal}>
      <div className="container" id="pdf react" >
        <br />
        <Grid container spacing={2} >
          <Grid item xs={12} md={4}>
            <img src={require("../img/LogoLogistral.png")} className="imagenesCliente" />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography align="center" className={styles.typography} variant="button" display="block" >
              LOGISTICA ESTRUCTURAL S.A. Nit 900.161.726-3 - ORDEN DE TRABAJO # {ordenSeleccionado.id_otr}
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={1} >
          <Grid item xs={12} md={8} >
            <Button >CLIENTE : {ordenSeleccionado.razonsocial_cli} </Button>
          </Grid>
          <Grid item xs={12} md={4} >
            <Button >TELEFONO : {ordenSeleccionado.telefono_con}</Button>
          </Grid>
        </Grid>
        <Grid container spacing={1} >
          <Grid item xs={12} md={4} >
            <Button>CONTACTO : {ordenSeleccionado.primer_nombre_con}{" "}{ordenSeleccionado.primer_apellido_con}</Button>
          </Grid>
          <Grid item xs={12} md={4} >
            <Button>CIUDAD : {ordenSeleccionado.nombre_ciu}  </Button>
          </Grid>
          <Grid item xs={12} md={4} >
            <Button>CORREO : {ordenSeleccionado.email_con} </Button>
          </Grid>
        </Grid>
        <Grid container spacing={1} >
          <Grid item xs={12} md={8} >
            <Button>TIPO DE SERVICIO : {ordenSeleccionado.descripcion_tser}</Button>
          </Grid>
          <Grid item xs={12} md={4} >
            <Button>FECHA : {ordenSeleccionado.fechaprogramada_otr} </Button>
          </Grid>
        </Grid>
        <Grid container spacing={1} >
          <Grid item xs={12} md={4} >
            <Button>ID INTERNO : {ordenSeleccionado.codigo_equ} </Button>
          </Grid>
          <Grid item xs={12} md={4} >
            <Button>MODELO : {ordenSeleccionado.modelo_dequ} </Button>
          </Grid>
          <Grid item xs={12} md={4} >
            <Button>SERIE : {ordenSeleccionado.serie_dequ} </Button>
          </Grid>
        </Grid>
        <Grid container spacing={1} >
          <Grid item xs={12} md={4} >
            <Button>MARCA : {ordenSeleccionado.descripcion_mar} </Button>
          </Grid>
          <Grid item xs={12} md={4} >
            <Button>HOROMETRO :  {ordenSeleccionado.horometro_otr} </Button>
          </Grid>
          <Grid item xs={12} md={4} >
            <Button> {ordenSeleccionado.descripcion_tmt} </Button>
          </Grid>
        </Grid>
        <table className="table table-bordered">
          <thead className="table-primary">
            <th>ACTIVIDAD</th>
            <th>FECHA_HORA_INICIAL</th>
            <th>FECHA_HORA_FINAL</th>
          </thead>
          <tbody>
            {listUnCumplimiento && listUnCumplimiento.map((cumplimiento, index) => {
              return (
                <tr>
                  <td>{cumplimiento.descripcion_cosv}</td>
                  <td>{cumplimiento.fechainicia_cosv}</td>
                  <td>{cumplimiento.fechafinal_cosv}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <table className="table table-bordered">
          <thead className="table-primary">
            <th>HORA INICIA EL SERVICIO</th>
            <th>HORA DE LLEGADA CLIENTE</th>
            <th>TIEMPO TRANSPORTE</th>
            <th>TIEMPO ACTIVIDAD</th>
          </thead>
          <tbody>
            <tr>
              <td>{ordenSeleccionado.iniciatransporte_otr}</td>
              <td>{ordenSeleccionado.finaltransporte_otr}</td>
              <td>{ordenSeleccionado.tiempotransporte_otr}</td>
              <td>{ordenSeleccionado.tiempoorden_otr}</td>
            </tr>
          </tbody>
        </table>
        <br />
        <br />

        <div className="container" mt-3 style={{ display: "flex" }} >
          {listarImagenesDb.map(imagen => (
            <div key={imagen} className="card" >
              <img src={'http://128.199.2.127:9000/' + imagen.name} alt="..." className="card-img-top"
                style={{ height: "200px", width: "300px" }} />
            </div>
          ))}
        </div>


        <br />
        <br />
        <br />
        <br />
        <br />
        <Grid container spacing={2} >
          <Grid item xs={12} md={12}>
            <Typography align="center" className={styles.typography2} display="block" >
              Observaciones___________________________________________________________________________________________________________
            </Typography>
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography align="center" className={styles.typography2} display="block" >
              ________________________________________________________________________________________________________________________
            </Typography>
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography align="center" className={styles.typography2} display="block" >
              Al firmar este documento el cliente expresa haber recibido a satisfacción el servicio y/o repuestos suministrados por
              LOGISTICA ESTRUCTURAL S.A. y acusa de haber recibido una copia de la presente orden. Este documento sirve de soporte
              para el cobro del servicio si es VENTA, en caso de servicio de RENTA, no aplica siempre y cuando corresponda a un caso
              especial sujeto a revisión.
            </Typography>
          </Grid>
        </Grid>
        <br />
        <br />
        <Grid container spacing={2} >
          <Grid item xs={12} md={6}>
          {
                listarFirmasOTTecnico ?
                    <Grid container spacing={2} >
                        <Grid item xs={12} md={12}>
                            <img
                                src={listarFirmasOTTecnico}
                                alt="firma"
                                style={{
                                    display: "block",
                                    margin: "0 auto",
                                    border: "1px solid black",
                                    width: "200px"
                                }}
                            />
                        </Grid>
                    </Grid>
                    :
                    null
            }
            <Typography align="center" className={styles.typography2} display="block" >
              ___________________________________________________________
              Firma_Técnico
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
          {
                listarFirmasOT ?
                    <Grid container spacing={2} >
                        <Grid item xs={12} md={12}>
                            <img
                                src={listarFirmasOT}
                                alt="firma"
                                style={{
                                    display: "block",
                                    margin: "0 auto",
                                    border: "1px solid black",
                                    width: "200px"
                                }}
                            />
                        </Grid>
                    </Grid>
                    :
                    null
            }
            <Typography align="center" className={styles.typography2} display="block" >
              ___________________________________________________________
              Firma_Cliente
            </Typography>
          </Grid>
        </Grid>
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

export default OrdenesPdfCliente;
