import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import MaterialTable from "material-table";
import { Modal, TextField, Button, Select, MenuItem, FormControl, InputLabel, Typography, Grid, InputAdornment} from "@material-ui/core";
import { green, blue, blueGrey, red } from '@material-ui/core/colors';
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from '@material-ui/icons/Save';
import swal from 'sweetalert';
import Moment from 'moment';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import NumberFormat from 'react-number-format';

// Componentes de Conexion con el Backend
import repuestosServices from "../../../services/Importar/ConsumosRepuestos";

const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: 600,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
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
    minWidth: 515,
    maxWidth: 515,
  },
  formControl2: {
    margin: theme.spacing(0),
    minWidth: 250,
    maxWidth: 250,
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

function Repuestos() {
  const styles = useStyles();
  const [listRepuestos, setListRepuestos] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [formError, setFormError] = useState(false);
  const [actualiza, setActualiza] = useState(false);
  const [listarEstados, setListarEstados] = useState([]);
  let tipoinventario = 1

  const [repuestosSeleccionado, setRepuestosSeleccionado] = useState({
    id_cre: "",
    anno_cre: "",
    mes_cre: "",
    tr_cre: "", 
    documento_cre: "",
    concepto_cre: "",
    fecha_cre: "",
    documentoref_cre: "",
    idequipo_cre: "",
    documentodest_cre: "",
    bodega_cre: "",
    referencia_cre: "", 
    descripcion_cre: "",
    centrocosto_cre: "",
    cantidad_cre: "", 
    costounitario_cre: "", 
    costototal_cre: "", 
    valorbruto_cre: "",
  })

  useEffect(() => {
    async function fetchDataRepuestos() {
      const res = await repuestosServices.listarconsumosrepuestos();
      setListRepuestos(res.data);
      setActualiza(false);
    }
    fetchDataRepuestos();
  }, [actualiza])

  const handleChange = e => {
    const { name, value } = e.target;

    setInventariosSeleccionado(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const seleccionarRepuestos = (repuestos, caso) => {
    setRepuestosSeleccionado(repuestos);
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
  
  // "string","boolean","numeric","date","datetime","time","currency"
  const columnas = [
    {
      title: 'Año',
      field: 'anno_cre',
      cellStyle : { minWidth: 40}
    },
    {
      title: 'Mes',
      field: 'mes_cre',
      cellStyle : { minWidth: 40}
    },
    {
      title: 'Transacción',
      field: 'tr_cre'
    },
    {
      title: 'Documento',
      field: 'documento_cre'
    },
    {
      title: 'Concepto',
      field: 'concepto_cre'
    },
    {
      title: 'Equipo',
      field: 'idequipo_cre',
    },
    {
      title: 'Referencia',
      field: 'referencia_cre'
    },
    {
      title: 'Descripción',
      field: 'descripcion_cre',
      cellStyle : { minWidth: 150}
    },
    {
      title: 'Cantidad',
      field: 'cantidad_cre',
      cellStyle : { minWidth: 50}
    },
    {
      title: 'Costo Unitario',
      field: 'costounitario_cre',
      cellStyle : { minWidth: 50}
    },
    {
      title: 'Costo Total',
      field: 'costototal_cre',
      cellStyle : { minWidth: 50}
    },
    {
      title: 'Valor Bruto',
      field: 'valorbruto_cre',
      cellStyle : { minWidth: 50}
    } 
  ]
  
  return (
    <div className="App">
      <br />
      <MaterialTable
        columns={columnas}
        data={listRepuestos}
        title="CONSULTAR CONSUMO REPUESTOS"
        actions={[
          {
            icon: 'edit',
            tooltip: 'Editar Consumos',
            onClick: (event, rowData) => seleccionarContrataciones(rowData, "Editar")
          },
          {
            icon: 'delete',
            tooltip: 'Borrar Cconsumos',
            onClick: (event, rowData) => seleccionarContrataciones(rowData, "Eliminar")
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
  );
}

export default Repuestos;