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
import Loading from "../../../components/Loading";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import CachedIcon from '@material-ui/icons/Cached';

// Componentes de Conexion con el Backend
import empresasServices from "../../../services/Empresa";
import depreciacionServices from "../../../services/Activos/Depreciacion";
import activosServices from "../../../services/Activos/Activos";

const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: 500,
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
      backgroundColor: blueGrey[500],
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
  const [listarDepreciacion, setListarDepreciacion] = useState([]);
  const [modalDepreciar, setModalDepreciar] = useState(false);
  const [modalLeerActivos, setModalLeerActivos] = useState(false);
  const [modalAcumular, setModalAcumular] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [listarEmpresas, setListarEmpresas] = useState([]);
  const [fechaHoy, setFechaHoy] = useState(new Date());
  const [actualiza, setActualiza] = useState(false);
  const [anno, setAnno] = useState(0);
  const [mes, setMes] = useState(0);
  const [ok, setOk] = useState(true);
  const [loading, setLoading] = useState(false);
  const [leerActivos, setLeerActivos] = useState(false);

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

  const leerDatosActivosPeriodo = () => {
      async function fetchDataEquipos() {
        let periodo = "";
        if(mes < 10){
          periodo = ""+anno + "0" + mes;  
        }else{
          periodo = ""+anno + mes;
        }
        console.log("PERIODO : ", periodo)
        const res = await activosServices.listactivosdepreciar(periodo);
        setListarEquipos(res.data);
        //setActualiza(false);
        console.log("ACTIVOS : ", res.data)
        abrirCerrarModalLeerActivos()
      }
      fetchDataEquipos();
  }

  const leerDepreciacion = () => {
    async function leeDepreciacion() {
      const res = await depreciacionServices.listdepreciacion();
      setListarDepreciacion(res.data);
      //setActualiza(false);
      //console.log("ACTIVOS : ", res.data)
    }
    leeDepreciacion();
  }

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
    /*
    setDepreciacionSeleccionado(equipo);
    (caso === "Editar") ? abrirCerrarModalEditar() : abrirCerrarModalEliminar()
    */
  }

  const calcularDepreciacion = () => {
    setModalDepreciar(!modalDepreciar);
  }

  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
  }

  const abrirCerrarModalLeerActivos = () => {
    setModalLeerActivos(!modalLeerActivos);
  }

  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
  }

  const acumularDepreciacion = async () => {
    let fecha = "'" + anno + "-" + mes + "-" + "12" + "'";
    console.log("FECHA : ", fecha);

    const res = await activosServices.validadepreciacionacumulada(fecha);

    if (res.success) {
      swal("Acumular Depreciación",
        "Para este periodo ya se Acumulo la Deprecición!", "warning", { button: "Aceptar" });
    }
    else {
      console.log("NO ESTA ACUMULADA");
      //console.log("EQUIPOS DEL SISTEMA : ", res.data);

      let periodo = anno + mes;
      const rest = await activosServices.actualizadepreactivos(periodo);

      if (rest.success) {
        swal("Acumular Depreciación",
          "Depreciación para el periodo " + periodo + " Acumulada de forma Correcta!", "success", { button: "Aceptar" });
      }
      else {
        swal("Acumular Depreciación",
          "Error Acumulando Depreciación para el periodo " + periodo + "!", "error", { button: "Aceptar" });
        //console.log("EQUIPOS DEL SISTEMA : ", res.data);
      }
    }
  }

  const abrirCerrarModalAcumular = () => {
    setModalAcumular(!modalAcumular);
  }

  const procesarDepreciacion = async () => {
    setLeerActivos(true);
    let borrarperiodo = anno + mes;
    const res = await depreciacionServices.validaperiododepreciacion(borrarperiodo);

    if (res.success) {
      swal("Generar Depreciación",
        "Para este periodo ya se Calculo la Deprecicion, Primero Debe Borrar el proceso anterior!", "warning", { button: "Aceptar" });
    }
    else {
      const addDepreciaciones = async () => {
        //console.log("DEPRECIACIONES : ", listarEquipos);

        var longitud = listarEquipos.length;
        var contador = 0;

        setLoading(true);

        for (var i = 0; i < longitud; i++) {
          const res = await depreciacionServices.save(listarEquipos[i]);
          //console.log("EQUIPO : ",i )
          contador++;

          if (contador > 150) {
            contador = 0;
            paraGrabacion();
          }

          if (!res.success)
            setOk(false)
        }

        if (ok) {
          setLoading(false);
          setModalDepreciar(!modalDepreciar);
          swal("Generar Depreciación", "Calculo depreciación generada de forma correcta!", "success", { button: "Aceptar" });
          //console.log(res.message)  
        }
        else {
          setModalDepreciar(!modalDepreciar);
          swal("Generar Depreciación", "Error Calculando Depreciaciones!", "error", { button: "Aceptar" });
          //console.log(res.message);
        }
        setLoading(false);

      }
      addDepreciaciones();
    }
  }

  const paraGrabacion = () => {
    async function duerme() {
      console.log('Esperando...');
      await setTimeout(4000);
      console.log('Continua...');
    }
    duerme();
  }


  const actualizarEquipo = async () => {

    setActualiza(true);
  }

  const borrarDepreciacion = async () => {
    setLoading(true);
    let borrarperiodo = anno + mes;
    //console.log("PERIODO A BORRAR : ", borrarperiodo)
    const res = await depreciacionServices.delete(borrarperiodo);
    console.log(res.message);
    console.log(res);
    setLoading(false);
    //setActualiza(true);
  }

  // "string","boolean","numeric","date","datetime","time","currency"
  const columnas = [
    {
      field: 'annomes_dpr',
      title: 'Periodo',
      cellStyle: { minWidth: 50 }
    },
    {
      field: 'descripcion_dpr',
      title: 'Descripción  del Activo',
      cellStyle: { minWidth: 300 }
    },
    {
      field: 'codigo_equ',
      title: 'ID Interno',
      cellStyle: { minWidth: 70 }
    },
    {
      field: 'valordepreciacion_dpr',
      title: 'Valor Depreciación',
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
    }
  ]

  const equipoDepreciar = (
    <div className={styles.modal}>
      <br/>
      <Typography align="center" className={styles.typography} variant="button" display="block"> Parametros Calculo Depreciación </Typography>
      <br/>
      <br/>
      <div align="center">
        <Button className={styles.button} color="primary" onClick={() => procesarDepreciacion()} >Confirmar</Button>
        <Button className={styles.button2} onClick={() => calcularDepreciacion()} >Cancelar</Button>
      </div>
    </div>
  )

  const leerDatosActivos = (
    <div className={styles.modal}>
      <Typography align="center" className={styles.typography} variant="button" display="block"> Periodo de Calculo </Typography>
      <Grid item xs={12} md={12}>
        <TextField type="numeric" className={styles.inputMaterial} label="Año" name="annodepreciar" fullWidth onChange={handleChange}
          onChange={(e) => setAnno(e.target.value)} />
      </Grid>
      <Grid item xs={12} md={12}>
        <TextField type="numeric" className={styles.inputMaterial} label="Mes" name="mesdepreciar" fullWidth onChange={handleChange}
          onChange={(e) => setMes(e.target.value)} />
      </Grid>
      <div align="right">
        <Button className={styles.button} color="primary" onClick={() => leerDatosActivosPeriodo()} >Confirmar</Button>
        <Button className={styles.button2} onClick={() => abrirCerrarModalLeerActivos()} >Cancelar</Button>
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
      <Typography align="center" className={styles.typography} variant="button" display="block"> Eliminar Depreciación Calculada </Typography>
      <Grid item xs={12} md={12}>
        <TextField type="numeric" className={styles.inputMaterial} label="Año" name="annodepreciar" fullWidth onChange={handleChange}
          onChange={(e) => setAnno(e.target.value)} />
      </Grid>
      <Grid item xs={12} md={12}>
        <TextField type="numeric" className={styles.inputMaterial} label="Mes" name="mesdepreciar" fullWidth onChange={handleChange}
          onChange={(e) => setMes(e.target.value)} />
      </Grid>
      <div align="right">
        <Button className={styles.button} color="secondary" onClick={() => borrarDepreciacion()}> Confirmar </Button>
        <Button className={styles.button2} onClick={() => abrirCerrarModalEliminar()}> Cancelar </Button>
      </div>
    </div>
  )

  const acumularDepreciar = (
    <div className={styles.modal}>
      <Typography align="center" className={styles.typography} variant="button" display="block"> Acumula Depreciación del Período </Typography>
      <Grid item xs={12} md={12}>
        <TextField type="numeric" className={styles.inputMaterial} label="Año" name="annodepreciar" fullWidth onChange={handleChange}
          onChange={(e) => setAnno(e.target.value)} />
      </Grid>
      <Grid item xs={12} md={12}>
        <TextField type="numeric" className={styles.inputMaterial} label="Mes" name="mesdepreciar" fullWidth onChange={handleChange}
          onChange={(e) => setMes(e.target.value)} />
      </Grid>
      <div align="right">
        <Button className={styles.button} color="secondary" onClick={() => acumularDepreciacion()}> Confirmar </Button>
        <Button className={styles.button2} onClick={() => abrirCerrarModalAcumular()}> Cancelar </Button>
      </div>
    </div>
  )

  return (
    <div className="App">
      {
        loading ? <Loading /> : null
      }
      <br />
      <Button className={styles.button} variant="contained" startIcon={<CallMissedIcon />} onClick={() => abrirCerrarModalLeerActivos()} >
        Definir Periodo a Procesar
      </Button>
      <Button className={styles.button} variant="contained" startIcon={<CallMissedIcon />} onClick={() => calcularDepreciacion()} >
        Calcular Depreciación
      </Button>
      <Button className={styles.button2} variant="contained" startIcon={< DeleteForeverIcon />} onClick={() => abrirCerrarModalEliminar()} >
        Borrar Depreciación
      </Button>
      <Button className={styles.button} variant="contained" startIcon={< CachedIcon />} onClick={() => leerDepreciacion()} >
        Consultar Depreciación
      </Button>
      <Button className={styles.button} variant="contained" startIcon={< CachedIcon />} onClick={() => abrirCerrarModalAcumular()} >
        Acumula Depreciación
      </Button>

      <MaterialTable
        columns={columnas}
        data={listarDepreciacion}
        title="CONSULTAR DEPRECIACION"
        actions={[
          {
            icon: 'edit',
            tooltip: 'Editar Depreciacion',
            onClick: (event, rowData) => seleccionarEquipo(rowData, "Editar")
          },
          {
            icon: 'delete',
            tooltip: 'Borrar Depreciación',
            onClick: (event, rowData) => seleccionarEquipo(rowData, "Eliminar")
          }
        ]}
        options={{
          actionsColumnIndex: 11,
          exportButton: true
        }}
        localization={{
          header: {
            actions: "Acciones"
          }
        }}
      />

      <Modal
        open={modalDepreciar}
        onClose={calcularDepreciacion}
      >
        {equipoDepreciar}
      </Modal>
      <Modal
        open={modalLeerActivos}
        onClose={abrirCerrarModalLeerActivos}
      >
        {leerDatosActivos}
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
      <Modal
        open={modalAcumular}
        onClose={abrirCerrarModalAcumular}
      >
        {acumularDepreciar}
      </Modal>
    </div>
  );
}

export default Depreciacion;