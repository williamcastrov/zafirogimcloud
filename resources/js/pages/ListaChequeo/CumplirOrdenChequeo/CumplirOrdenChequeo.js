import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { Modal, Button, ButtonGroup, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import NumberFormat from 'react-number-format';
import CachedIcon from '@material-ui/icons/Cached';
import ReplayIcon from '@material-ui/icons/Replay';
import { green, blue, blueGrey, red } from '@material-ui/core/colors';

// Componentes de Conexion con el Backend
import crearordenesServices from "../../../services/GestionOrdenes/CrearOrdenes";

// Componentes Adicionales al proceso de Ordenes de Servicio
import ActividadesOserv from "../ActividadesOservChequeo";

// hooks react redux
import {useDispatch, useSelector} from 'react-redux';

import { obtenerOrdenesAccion } from "../../../redux/ordenservicioDucks";

//Componentes Gestion de Ordenes
import MenuListaChequeo from "../MenuListaChequeo";

//import MenuCrearOrden from "../../DatosEquipos/MenuEquipos";

const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: 1400,
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
    color: theme.palette.getContrastText(green[500]),
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
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

function CumplirOrdenChequeo() {
  const styles = useStyles();
  const dispatch = useDispatch();
  const listOrdenes = useSelector(store => store.ordenesservicio.arrayOrdenes);

  const [listarOrdenes, setListarOrdenes] = useState([]);
  const [ordenServicio, setOrdenServicio] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalAsignar, setModalAsignar] = useState(false);
  const [formError, setFormError] = useState(false);
   
  const [cambio, setCambio] = useState(false);

  const [ordenSeleccionado, setOrdenSeleccionado] = useState({
    'id_otr': "",
    'estado_otr': "",
    'tipo_otr': "",
    'tipooperacion_otr':"",
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
    async function fetchDataOrdenes() {
      const res = await crearordenesServices.listOrdenesChequeo();
      setListarOrdenes(res.data);
      //console.log("Lee Ordenes Manual", res.data);
    }
    fetchDataOrdenes();
  }

  const leerOrdenesActivas = () => {
    async function fetchDataOrdenes() {
      const res = await crearordenesServices.listOrdenesChequeoActivas();
      setListarOrdenes(res.data);
      //console.log("Cargar Una Orden", res.data);
    }
    fetchDataOrdenes();
  }

  useEffect(() => {
    async function fetchDataOrdenes() {
      const res = await crearordenesServices.listOrdenesChequeoActivas();
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

  const seleccionarOrden = (orden, caso) => {
    //console.log("DATOS ORDEN : ", orden)
    setOrdenServicio(orden);
    setOrdenSeleccionado(orden);
    setCambio(true);
    //console.log("CLIENTE SELECCIONADO : ", listarClientes);
    (caso === "Editar") ? abrirCerrarModalEditar() : abrirCerrarModalEliminar()
  }

  const abrirCerrarModalInsertar = () => {
    setModalInsertar(!modalInsertar);
  }

  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
  }

  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
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
      field: 'razonsocial_int',
      title: 'Proveedor'
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

  const ordenInsertar = (
    <div className={styles.modal}>
      <Typography align="center" className={styles.typography} variant="button" display="block" >
        Crear Orden de Servicio
      </Typography>
    </div>
  )
 
  const ordenEditar = (
    <div className="App" >
      <div className={styles.modal}>
        <ActividadesOserv ordenSeleccionado={ordenSeleccionado}          
        />
      </div>
    </div>
  )

//<Button variant="contained" startIcon={<CachedIcon />} color="primary" onClick={() => dispatch(obtenerOrdenesAccion())} >Todas las Ordenes</Button>
 
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
            icon: 'edit',
            tooltip: 'Editar Orden',
            onClick: (event, rowData) => seleccionarOrden(rowData, "Editar")
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
                  <Button variant="contained">Estado Contable : </Button> {}

                </div>
              )
            },
          },
        ]}
      />
      {}
      <Modal
        open={modalInsertar}
        onClose={abrirCerrarModalInsertar}
      >
        {ordenInsertar}
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

export default CumplirOrdenChequeo;
