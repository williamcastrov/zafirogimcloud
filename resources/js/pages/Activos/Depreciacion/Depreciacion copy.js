import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import MaterialTable from "material-table";
import { Modal, Button, TextField, Select, MenuItem, FormControl, InputLabel, Grid, Typography } from "@material-ui/core";
import { green, blue, blueGrey, red } from '@material-ui/core/colors';
import { makeStyles } from "@material-ui/core/styles";
import Moment from 'moment';
Moment.locale('es');
import CallMissedIcon from '@material-ui/icons/CallMissed';
import NumberFormat from 'react-number-format';
import swal from 'sweetalert';
import { useHistory } from "react-router-dom";

// Componentes de Conexion con el Backend
import empresasServices from "../../../services/Empresa";
import depreciacionServices from "../../../services/Activos/Depreciacion";
import activosServices from "../../../services/Activos/Activos";

const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: 700,
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
    minWidth: 300,
  },
  formControlEstados: {
    margin: theme.spacing(0),
    minWidth: 200,
  },
  formControlManeja: {
    margin: theme.spacing(0),
    minWidth: 140,
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

function Depreciacion() {
  const styles = useStyles();
  const [listarEquipos, setListarEquipos] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [formError, setFormError] = useState(false);
  const [grabar, setGrabar] = useState(false);
  const [listarEmpresas, setListarEmpresas] = useState([]);
  const [fechaHoy, setFechaHoy] = useState(new Date());
  const [actualiza, setActualiza] = useState(false);
  const [anno, setAnno] = useState(0);
  const [mes, setMes] = useState(0);

  let frecuencia = 2

  const [depreciacionSeleccionado, setDepreciacionSeleccionado] = useState({
    id_dpr: "",
    activo_dpr: "",
    anno_dpr: "",
    mes_dpr: "",
    descripcion_dpr: "",
    empresa_dpr: "",
    valordepreciacion_dpr: "",
    observacion_act: ""
  })

  useEffect(() => {
    async function fetchDataEquipos() {
      const res = await activosServices.listactivosdepreciar();
      setListarEquipos(res.data);
      //setActualiza(false);
      //console.log("ACTIVOS : ", res.data)
    }
    fetchDataEquipos();
  }, [])

  useEffect(() => {
    async function fetchDataEmpresas() {
      const res = await empresasServices.listEmpresas();
      setListarEmpresas(res.data)
      //console.log("EQUIPOS DEL SISTEMA : ", res.data);
    }
    fetchDataEmpresas();
  }, [])

  const handleChange = e => {
    const { name, value } = e.target;

    setDepreciacionSeleccionado(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const seleccionarEquipo = (equipo, caso) => {
    setDepreciacionSeleccionado(equipo);
    (caso === "Editar") ? abrirCerrarModalEditar() : abrirCerrarModalEliminar()
  }

  const calcularDepreciacion = () => {
    setModalInsertar(!modalInsertar);
  }

  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
  }

  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
  }



  useEffect(() => {
    async function grabarDepreciacion() {

      if (grabar) {
        alert("EN GRABAR DEPRECIACION")
        /*
                const res = await activosServices.save(depreciacionSeleccionado[0]);
        
                if (res.success) {
                  swal("Equipo", "Equipo Creado de forma Correcta!", "success", { button: "Aceptar" });
                  console.log(res.message)
                } else {
                  swal("Equipo", "Error Creando el Equipo!", "error", { button: "Aceptar" });
                  console.log(res.message);
                }
                */
        setGrabar(false);
        leerDepreciacion();
        //setActualiza(true);
        //history.push("/gim");
        //calcularDepreciacion();
      }
    }
    grabarDepreciacion();
  }, [grabar])

  const leerDepreciacion = async () => {
    alert("LEER DEPRECIACION");
    console.log("VALOR DEPRECIACION : ", depreciacionSeleccionado[0])
    const res = await depreciacionServices.save(depreciacionSeleccionado[0]);

  }

  const procesarDepreciacion = async () => {

    //console.log("LISTAR ORDENES : ",listarEquipos);

    var longitud = listarEquipos.length;
    //var contador = 0;
    console.log("LONGITUD : ", longitud);
    //setLoading(true);

    {
      listarEquipos.map((asignar) => {
        setDepreciacionSeleccionado([{
          activo_dpr: asignar.codigo_act,
          anno_dpr: anno,
          mes_dpr: mes,
          descripcion_dpr: asignar.descripcion_act,
          empresa_dpr: 1,
          valordepreciacion_dpr: asignar.depreciacionmensual_act,
          observacion_act: ""
        }])
        leerDepreciacion();
      })
    }

    /*
    for (var i = 0; i < 2; i++) {
      if (listarEquipos[i].depreciacionacumulada_act < listarEquipos[i].valoradquisicion_act) {
        console.log(listarEquipos[i].codigo_act, " : ", listarEquipos[i].depreciacionmensual_act)

        setDepreciacionSeleccionado([{
          id_dpr: i,
          activo_dpr: listarEquipos[i].codigo_act,
          anno_dpr: anno,
          mes_dpr: mes,
          descripcion_dpr: listarEquipos[i].descripcion_act,
          empresa_dpr: 1,
          valordepreciacion_dpr: listarEquipos[i].depreciacionmensual_act,
          observacion_act: ""
        }])
        setGrabar(true);
      }
     
      //console.log("AUX DEPRECIACION : ", depreciacionSeleccionado)
    }
    */

  }

  const actualizarEquipo = async () => {

    setActualiza(true);
  }

  const borrarEquipo = async () => {

    setActualiza(true);
  }

  // "string","boolean","numeric","date","datetime","time","currency"
  const columnas = [
    {
      field: 'codigo_act',
      title: 'Codigo',
      cellStyle: { minWidth: 50 }
    },
    {
      field: 'descripcion_act',
      title: 'Descripción  del Activo',
      cellStyle: { minWidth: 300 }
    },
    {
      field: 'marca_act',
      title: 'Marca',
      cellStyle: { minWidth: 70 }
    },
    {
      field: 'antiguedad_act',
      title: 'Antiguedad',
      cellStyle: { minWidth: 70 }
    },
    {
      field: 'valoradquisicion_act',
      title: 'Valor Adquisición',
      cellStyle: { minWidth: 70 }
    },
    {
      field: 'ctacontable_act',
      title: 'Cuenta Contable',
      cellStyle: { minWidth: 70 }
    },
    {
      field: 'ctadepreciacion_act',
      title: 'Cuenta Depreciación',
      cellStyle: { minWidth: 70 }
    },
    {
      field: 'valorresidual_act',
      title: 'Valor Residual',
      cellStyle: { minWidth: 70 }
    },
    {
      field: 'cuotadepreciacion_act',
      title: 'Cuota',
      cellStyle: { minWidth: 160 }
    }
  ]

  const equipoDepreciar = (
    <div className={styles.modal}>
      <Typography align="center" className={styles.typography} variant="button" display="block"> Parametros Calculo Depreciación </Typography>
      <Grid item xs={12} md={6}>
        <TextField type="numeric" className={styles.inputMaterial} label="Año" name="annodepreciar" fullWidth onChange={handleChange}
          onChange={(e) => setAnno(e.target.value)} />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField type="numeric" className={styles.inputMaterial} label="Mes" name="mesdepreciar" fullWidth onChange={handleChange}
          onChange={(e) => setMes(e.target.value)} />
      </Grid>
      <div align="right">
        <Button className={styles.button} color="primary" onClick={() => procesarDepreciacion()} >Confirmar</Button>
        <Button className={styles.button2} onClick={() => calcularDepreciacion()} >Cancelar</Button>
      </div>
    </div>
  )

  const equipoEditar = (
    <div className={styles.modal}>
      <Typography align="center" className={styles.typography} variant="button" display="block" > Actualizar Activo </Typography>
      <div align="right">
        <Button className={styles.button} color="primary" onClick={() => actualizarEquipo()} >Editar</Button>
        <Button className={styles.button2} onClick={() => abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  const equipoEliminar = (
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar el Activo <b>{depreciacionSeleccionado && depreciacionSeleccionado.descripcion_act}</b>? </p>
      <div align="right">
        <Button className={styles.button} color="secondary" onClick={() => borrarEquipo()}> Confirmar </Button>
        <Button className={styles.button2} onClick={() => abrirCerrarModalEliminar()}> Cancelar </Button>
      </div>
    </div>
  )

  return (
    <div className="App">
      <br />
      <Button variant="contained" startIcon={<CallMissedIcon />} color="primary" onClick={() => calcularDepreciacion()} >
        Calcular Depreciación
      </Button>

      <Button variant="contained" startIcon={<CallMissedIcon />} color="primary" onClick={() => leerDepreciacion()} >
        Leer Depreciación
      </Button>

      <Modal
        open={modalInsertar}
        onClose={calcularDepreciacion}
      >
        {equipoDepreciar}
      </Modal>
      <Modal
        open={modalEditar}
        onClose={abrirCerrarModalEditar}
      >
        {equipoEditar}
      </Modal>
      <Modal
        open={modalEliminar}
        onClose={abrirCerrarModalEliminar}
      >
        {equipoEliminar}
      </Modal>
    </div>
  );
}

export default Depreciacion;

/*
  <Fab variant="extended">
        <NavigationIcon className={styles.extendedIcon} />
        Datos Adicionales Equipos
        onClick
      </Fab>
*/