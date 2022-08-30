import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { Modal, Button, ButtonGroup, Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import NumberFormat from 'react-number-format';
import { green, blue, blueGrey, red } from '@material-ui/core/colors';

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

function OTCorrectivas(props) {
  const { operarioot, idUsuario } = props;
  console.log("Operario : ", operarioot)

  const styles = useStyles();
  const dispatch = useDispatch();
  const listOrdenes = useSelector(store => store.ordenesservicio.arrayOrdenes);
  const [listarOrdenes, setListarOrdenes] = useState([]);
  const [listarActividadesOrdenes, setListarActividadesOrdenes] = useState([]);
  const [modalFirmar, setModalFirmar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [actualiza, setActualiza] = useState(false);

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
      const res = await cumplimientooserv.ordenescorrectivo();
      setListarActividadesOrdenes(res.data);
      //console.log("DATOS ACTIVIDADES : ",res.data)
    }
    fetchDataActividadesOrdenes();
  }, [])

  useEffect(() => {
    async function fetchDataOrdenes() {
      if (idUsuario === 14) {
        const res = await crearordenesServices.ordenesasignadas();
        setListarOrdenes(res.data);
      } else {
        const res = await crearordenesServices.ordenesasignadas();
        setListarOrdenes(res.data);
      }

      //console.log("Lee Ordenes Automaticas", res.data);
      setActualiza(false);
    }
    fetchDataOrdenes();
  }, [actualiza])

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
      title: 'Estado Maquina',
      cellStyle: { minWidth: 100 }
    },
    {
      field: 'estadoot',
      title: 'Estado OT',
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

  //<Button variant="contained" startIcon={<CachedIcon />} color="primary" onClick={() => dispatch(obtenerOrdenesAccion())} >Todas las Ordenes</Button>

  return (
    <div className="App">
      <br />
      <MaterialTable
        columns={columnas}
        data={listarActividadesOrdenes}
        title="OT MTTO CORRECTIVO"
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
    </div>
  );
}

export default OTCorrectivas;
