import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { makeStyles } from "@material-ui/core/styles";
import MaterialTable from "material-table";
import { green, blue, blueGrey, red } from '@material-ui/core/colors';
import NumberFormat from 'react-number-format';

// Componentes de Conexion con el Backend
import facturacionServices from "../../../services/Importar/Facturacion";

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
  const [listFacturacion, setListFacturacion] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [formError, setFormError] = useState(false);
  const [actualiza, setActualiza] = useState(false);
  const [listarEstados, setListarEstados] = useState([]);
  let tipoinventario = 1;

  const [facturacionSeleccionado, setFacturacionSeleccionado] = useState({
      id_fac: "",
      anno_fac: "",
      mes_fac: "",
      equipo_fac: "",
      valor_fac: ""
  })

  useEffect(() => {
    async function fetchDataFacturacion() {
      const res = await facturacionServices.listarfacturacion();
      setListFacturacion(res.data);
      setActualiza(false);
    }
    fetchDataFacturacion();
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
      title: 'ID',
      field: 'id_fac',
      cellStyle : { minWidth: 50}
    },
    {
      title: 'Año',
      field: 'anno_fac',
      cellStyle : { minWidth: 50}
    },
    {
      title: 'Mes',
      field: 'mes_fac',
      cellStyle : { minWidth: 50}
    },
    {
      title: 'Cliente',
      field: 'razonsocial_cli'
    },
    {
      title: 'ID Equipo',
      field: 'equipo_fac'
    },
    {
      title: 'Descripción Equipo',
      field: 'descripcion_equ'
    } ,
    {
      title: 'Valor Factura',
      field: 'valor_fac'
    } 
  ]
  
  return (
    <div className="App">
      <br />
      <MaterialTable
        columns={columnas}
        data={listFacturacion}
        title="FACTURACION EQUIPOS"
        actions={[
          {
            icon: 'edit',
            tooltip: 'Editar Facturas',
            onClick: (event, rowData) => seleccionarContrataciones(rowData, "Editar")
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