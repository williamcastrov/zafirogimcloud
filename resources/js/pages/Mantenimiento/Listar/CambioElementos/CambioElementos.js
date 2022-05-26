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
  const fechaactual = Moment(new Date()).format('YYYY-MM-DD');
  const horaactual = Moment(new Date()).format('HH:mm:ss');
 
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


  const seleccionarOrden = (orden, caso) => {
    console.log("VALOR SELECCIONAD : ", orden)
    window.open("https://gimcloud.co/api/cambioelementos/generarPdf/" + orden.id_cel, "PDF")
  }

  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
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
        open={modalEditar}
        onClose={abrirCerrarModalEditar}
      >
        {ordenEditar}
      </Modal>

    </div>
  );
}

export default CambioElementos;
