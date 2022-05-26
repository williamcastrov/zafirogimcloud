import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import {Modal, TextField, Button, Select, MenuItem, FormControl, InputLabel,Typography } from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import SaveIcon from '@material-ui/icons/Save';
import swal from 'sweetalert';

// Componentes de Conexion con el Backend
import plandecuentasServices from "../../../services/Activos/PlandeCuentas";

const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  iconos:{
    cursor: 'pointer'
  }, 
  inputMaterial:{
    width: '100%'
  },
  formControl: {
    margin: theme.spacing(0),
    minWidth: 315,
  },
  typography: {
    fontSize: 16,
    color   : "#ff3d00"
  }
}));

function PlandeCuentas() {
  const styles = useStyles();
  const [listPlandeCuentas, setListPlandeCuentas] = useState([]);
  const [modalInsertar, setModalInsertar ] = useState(false);
  const [modalEditar, setModalEditar]= useState(false);
  const [modalEliminar, setModalEliminar]= useState(false);
  const [formError, setFormError] = useState(false);
  
  const [plandecuentasSeleccionado, setPlandeCuentasSeleccionado] = useState({
    id_puc: "",
    cuenta_puc: "",
    nombrecuenta_puc: "",
    vigencia_puc: "",
    tipo_puc: "",
    movimiento_puc: "",
    centrocosto_puc: "",
    ajuste_puc: "",
    tipoplazo_puc: "",
    nivel_puc: "",
    baseretencion_puc: ""
  })

  useEffect(() => {
    async function fetchDataPlandeCuentas() {
      const res = await plandecuentasServices.listPlandeCuentas();
      setListPlandeCuentas(res.data);
      //console.log("CENTOS DE COSTOS : ",res.data)
    }
    fetchDataPlandeCuentas();
  }, [])

  const handleChange = e => {
    const {name, value} = e.target;

    setPlandeCuentasSeleccionado( prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const seleccionarPlandeCuentas=(plandecuentas, caso)=>{
    setPlandeCuentasSeleccionado(plandecuentas);
    (caso==="Editar") ? abrirCerrarModalEditar() : abrirCerrarModalEliminar()
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

  const columnas = [
    {
      title: 'Cuenta',
      field: 'cuentacontable_puc'
    },
    {
      title: 'Nombre Cuenta',
      field: 'nombrecuenta_puc',
      cellStyle : { minWidth: 300}
    },
    {
      title: 'Vigencia',
      field: 'vigencia_puc'
    },
    {
      title: 'Tipo',
      field: 'tipo_puc'
    },
    {
      title: 'Movimiento',
      field: 'movimiento_puc'
    },
    {
      title: 'Maneja Cencosto',
      field: 'centrocosto_puc'
    },
    {
      title: 'Ajuste',
      field: 'ajuste_puc'
    },
    {
      title: 'T Plazo',
      field: 'tipoplazo_puc'
    },
    {
      title: 'Nivel',
      field: 'nivel_puc'
    },
    {
      title: 'Base Retención',
      field: 'baseretencion_puc'
    }
  ]

  return (
    <div className="App">
    <br />
     <MaterialTable
       columns={columnas}
       data={listPlandeCuentas}
       title="PLAN DE CUENTAS"
       actions={[
         {
           icon     : 'edit',
           tooltip  : 'Editar Plan de Cuentas',
           onClick  : (event, rowData) => seleccionarCencostos(rowData, "Editar")
         },
         {
          icon     : 'delete',
          tooltip  : 'Borrar Plan de  Cuentas',
          onClick  : (event, rowData) =>   seleccionarCencostos(rowData, "Eliminar")
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
    />{}

    </div>
  );
}

export default PlandeCuentas;