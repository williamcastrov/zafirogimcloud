import React, { useEffect, useState } from "react";
import { Modal, TextField, Button, Select, MenuItem, FormControl, InputLabel, Typography, Grid, ButtonGroup, Card ,
  CardContent} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import "./CardsHeader.css";
import MaterialTable from "material-table";
import swal from 'sweetalert';
import PageviewIcon from '@material-ui/icons/Pageview';
import NumberFormat from 'react-number-format';
import Moment from 'moment';
import { green, blue, blueGrey, red } from '@material-ui/core/colors';

// Componentes de Conexion con el Backend
import ordenesServices from "../../../services/GestionOrdenes/CrearOrdenes";
import cumplimientooservServices from "../../../services/GestionOrdenes/CumplimientoOserv";

const Styles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: 1400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    overflow:'hidden',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  modalrevisar: {
    position: 'absolute',
    width: 800,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    overflow:'scroll',
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
    minWidth: 315,
  },
  typography: {
    fontSize: 16,
    color: "#ff3d00"
  }
}));

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      prefix="$"
    />
  );
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};


function CardsHeaderOTTerminadas(props) {
  const styles = Styles();
  const useStyles = makeStyles(() => ({
    root: {
      textAlign: 'center',
      background: props.color
    },
    texto: {
      fontSize: 18,
      color: props.font
    },
    titulo: {
      fontWeight: 'bold',
      fontSize: 22,
      color: props.font
    }
  }));

  const [modalConsultarOT, setModalConsultarOT] = useState(false);
  const [listarOTTerminadas, setListarOTTerminadas] = useState([]);
  const [modalRevisarCumplimiento, setModalRevisarCumplimiento] = useState(false);
  const [modalConsultarCumplimiento, setModalConsultarCumplimiento] = useState(false);
  const [otSeleccionado, setOTSeleccionado] = useState([]);

  const [cumplimientoSeleccionado, setCumplimientoSeleccionado] = useState({
    id: "",
    id_cosv: "",
    descripcion_cosv: "",
    tipooperacion_cosv: "",
    tipofallamtto_cosv: "",
    referencia_cosv: "",
    fechainicia_cosv: "",
    fechafinal_cosv: "",
    cantidad_cosv: "",
    valorunitario_cosv: "",
    valortotal_cosv: "",
    servicio_cosv: 0,
    observacion_cosv: "",
    tiempoactividad_cosv: 0,
    idcomponente: 0,
    seriecomponente: 0,
    voltajecomponente: 0,
    voltajesalidasulfatacion: 0,
    amperajecomponente: 0,
    celdasreferenciacomponente: 0,
    cofreseriecomponentes: 0,
    estadocomponentes: 0,
    estadooperacionequipo_cosv: 81,
  });

  const classes = useStyles();

  useEffect(() => {
    async function fetchDataOT() {
      const res = await ordenesServices.listotterminadas();
      setListarOTTerminadas(res.data)
      console.log("OT TERMINADAS : ", res.data);
    }
    fetchDataOT();
  }, [])

  const seleccionarOT = (ot, caso) => {
    async function fetchDataUnCumplimiento() {
      const res = await cumplimientooservServices.listUnCumplimiento(ot.id_otr);
      setOTSeleccionado(res.data);
      //console.log("DATOS CUMPLIMIENTO : ", res.data)
      abrirCerrarModalConsultarCumplimiento();
    }
    fetchDataUnCumplimiento();
  }

  const seleccionarCumplimiento = (cumplimiento, caso) => {
    console.log("DATOS CUMPLIMIENTO : ", cumplimiento)
    setCumplimientoSeleccionado(cumplimiento);
    (caso === "Editar") ? abrirCerrarModalCumplimiento() : abrirCerrarModalCumplimiento()
  }


  const abrirCerrarModalConsultarOT = () => {
    setModalConsultarOT(!modalConsultarOT);
  }

  const abrirCerrarModalCumplimiento = () => {
    setModalRevisarCumplimiento(!modalRevisarCumplimiento);
  }

  const abrirCerrarModalConsultarCumplimiento = () => {
    setModalConsultarCumplimiento(!modalConsultarCumplimiento);
  }

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
    },
    {
      field: 'descripcion_abc',
      title: 'Prioridad de la Orden',
      cellStyle: { minWidth: 100 }
    }
  ]

  const cumplimiento = [
    {
      title: '# OT',
      field: 'id_cosv',
      cellStyle: { minWidth: 50 }
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
      title: 'Cantidad',
      field: 'cantidad_cosv',
      cellStyle: { minWidth: 50 }
    },
    {
      title: 'Valor Unitario',
      field: 'valorunitario_cosv',
      cellStyle: { minWidth: 100 }
    },
    {
      title: 'Valor Total',
      field: 'valortotal_cosv',
      cellStyle: { minWidth: 100 }
    },
    {
      title: 'Estado Equipo',
      field: 'nombre_est'
    }
  ]

  const consultarOT = (
    <div className={styles.modal}>
      <MaterialTable
        columns={columnas}
        data={listarOTTerminadas}
        title="CONSULTAR OT TERMINADAS"
        actions={[
          {
            icon: PageviewIcon,
            tooltip: 'Revisar Cumplimiento',
            onClick: (event, rowData) => seleccionarOT(rowData, "Editar")
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
      />{ }

    </div>
  )

  const consultarCumplimiento = (
    <div className={styles.modal}>
      <br />
      <MaterialTable
        columns={cumplimiento}
        data={otSeleccionado}
        title="CONSULTA CUMPLIMIENTO ORDEN DE SERVICIO"
        /*actions={[
          {
            icon: 'edit',
            tooltip: 'Editar Item',
            onClick: (event, rowData) => seleccionarCumplimiento(rowData, "Editar")
          }
        ]}*/
        options={{
          actionsColumnIndex: -1,
          exportButton: true
        }}
        localization={{
          header: {
            actions: "Acciones"
          }
        }}

      />
    </div>
  )

  const revisarCumplimiento = (
    <div className="App" >
      <div className={styles.modalrevisar}>
        <Typography align="center" className={styles.typography} variant="button" display="block" >
          Consultar Cumplimiento
        </Typography>
        <br />
        <Grid container spacing={2} >
          <Grid item xs={12} md={4}>
            <TextField className={styles.inputMaterial} name="id" label="Id Cumplimiento" disabled="true"
              fullWidth value={cumplimientoSeleccionado && cumplimientoSeleccionado.id} />
          </Grid>
          <Grid item xs={12} md={4}> <TextField name="id_cosv" label="# Orden de Servicio" disabled="true"
            fullWidth value={cumplimientoSeleccionado && cumplimientoSeleccionado.id_cosv} />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl className={styles.formControl2}>
              <InputLabel id="idselecttipooperacion_cosv">Tipo</InputLabel>
              <Select
                disabled="true"
                labelId="selecttipooperacion_cosv"
                name="tipooperacion_cosv"
                id="idselecttipooperacion_cosv"
                fullWidth
                value={cumplimientoSeleccionado && cumplimientoSeleccionado.tipooperacion_cosv}
              >
               
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField name="referencia_cosv" label="Referencia Producto"
              fullWidth
              value={cumplimientoSeleccionado && cumplimientoSeleccionado.referencia_cosv}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl className={styles.formControl2}>
              <InputLabel id="tipofallamtto">Tipo de Falla</InputLabel>
              <Select
                labelId="selecttipofallamtto"
                name="tipofallamtto"
                id="idselecttipofallamtto"
                value={cumplimientoSeleccionado && cumplimientoSeleccionado.tipofallamtto}
              >
              
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl className={styles.formControl2}>
              <InputLabel id="fallamtto_cosv">Falla del Equipo</InputLabel>
              <Select
                labelId="selecttfallamtto_cosv"
                name="tipofallamtto_cosv"
                id="idselectfallamtto_cosv"
                value={cumplimientoSeleccionado && cumplimientoSeleccionado.tipofallamtto_cosv}
              >
              
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField className={styles.inputMaterial} label="Actividad Realizada" name="descripcion_cosv"
              value={cumplimientoSeleccionado && cumplimientoSeleccionado.descripcion_cosv} />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl className={styles.formControl2}>
              <InputLabel id="servicio_cosv">Servicio Realizado</InputLabel>
              <Select
                labelId="selectservicio_cosv"
                name="servicio_cosv"
                id="idselectservicio_cosv"
                value={cumplimientoSeleccionado && cumplimientoSeleccionado.servicio_cosv}
              >
             
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}> <TextField type="datetime" InputLabelProps={{ shrink: true }} name="fechainicia_cosv"
            defaultValue={Moment(cumplimientoSeleccionado.fechainicia_cosv).format('YYYY-MM-DD HH:mm:ss')}
            label="Fecha Inicia Actividad" />
          </Grid>
          <Grid item xs={12} md={4}> <TextField type="datetime" InputLabelProps={{ shrink: true }} name="fechafinal_cosv"
            defaultValue={Moment(cumplimientoSeleccionado.fechafinal_cosv).format('YYYY-MM-DD HH:mm:ss')}
            label="Fecha Finaliza Actividad" />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField className={styles.inputMaterial} name="cantidad_cosv" InputLabelProps={{ shrink: true }}
              label="Cantidad" fullWidth
              value={cumplimientoSeleccionado && cumplimientoSeleccionado.cantidad_cosv} />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField className={styles.inputMaterial} name="valorunitario_cosv" label="Valor Unitario" fullWidth
              InputLabelProps={{ shrink: true }} InputProps={{ inputComponent: NumberFormatCustom, }}
              value={cumplimientoSeleccionado && cumplimientoSeleccionado.valorunitario_cosv} />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField className={styles.inputMaterial} type="numeric" name="valortotal_cosv" label="Valor Total"
              InputLabelProps={{ shrink: true }} fullWidt InputProps={{ inputComponent: NumberFormatCustom, }}
              value={cumplimientoSeleccionado && cumplimientoSeleccionado.valortotal_cosv} />
          </Grid>
          <Grid item xs={12} md={8}>
            <TextField className={styles.inputMaterial} label="Observaciones o Comentarios" name="observacion_cosv"
              value={cumplimientoSeleccionado && cumplimientoSeleccionado.observacion_cosv} />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl className={styles.formControl2}>
              <InputLabel id="estadooperacionequipo_cosv">Estado del Equipo</InputLabel>
              <Select
                labelId="selectestadooperacionequipo_cosv"
                name="estadooperacionequipo_cosv"
                id="idselectestadooperacionequipo_cosv"
                value={cumplimientoSeleccionado && cumplimientoSeleccionado.estadooperacionequipo_cosv}
              >
               
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <br />
        <div align="right">
          <Button className={styles.button} onClick={() => abrirCerrarModalCumplimiento()}>Cancelar</Button>
        </div>
      </div>
    </div>
  )

  return (
    <div>
      <Card className={classes.root}>
        <CardContent>
          {props.icono}
          <Typography className={classes.titulo}>
            {props.titulo}
          </Typography>

          <Typography className={classes.texto}>
            {props.totalotactivas}
          </Typography>
          <Button size="small" onClick={() => abrirCerrarModalConsultarOT()} >
            Consultar OT Terminadas
          </Button>

        </CardContent>
      </Card>

      <Modal
        open={modalConsultarOT}
        onClose={abrirCerrarModalConsultarOT}
        style={{ overflow: 'scroll' }}
      >
        {consultarOT}
      </Modal>

      <Modal
        open={modalRevisarCumplimiento}
        onClose={abrirCerrarModalCumplimiento}
      >
        {revisarCumplimiento}
      </Modal>

      <Modal
        open={modalConsultarCumplimiento}
        onClose={abrirCerrarModalConsultarCumplimiento}
      >
        {consultarCumplimiento}
      </Modal>
    </div>



  );
}

export default CardsHeaderOTTerminadas;