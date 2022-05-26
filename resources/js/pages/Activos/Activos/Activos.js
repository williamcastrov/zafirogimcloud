import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import MaterialTable from "material-table";
import { Modal, Button, TextField, Select, MenuItem, FormControl, InputLabel, Grid, Typography } from "@material-ui/core";
import { green, blue, blueGrey, red } from '@material-ui/core/colors';
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from '@material-ui/icons/Save';
import FindReplaceIcon from '@material-ui/icons/FindReplace';
import CommentIcon from '@material-ui/icons/Comment';
import NumberFormat from 'react-number-format';
import swal from 'sweetalert';
import Moment from 'moment';
import { useHistory } from "react-router-dom";

// Componentes de Conexion con el Backend
import empresasServices from "../../../services/Empresa";
import estadosServices from "../../../services/Parameters/Estados";
import marcasServices from "../../../services/Mantenimiento/Marcas";
import propietariosServices from "../../../services/Interlocutores/Proveedores";
import subgruposequiposServices from "../../../services/Mantenimiento/SubGruposPartes";
import activosServices from "../../../services/Activos/Activos";
import novedadesactivosServices from "../../../services/Activos/NovedadesActivos";

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
  modal2: {
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

function Activos(props) {
  const {idUsu} = props;
  //console.log("USUARIO ACTIVOS : ", idUsu)

  const [consecutivo, setConsecutivo] = useState(0);
  const [prefijo, setPrefijo] = useState("");
  const history = useHistory();

  useEffect(() => {
    async function fetchDataSubGruposEquipos() {
      const res = await subgruposequiposServices.listSubGrupospartesequipos();
      let valor = res.data[0].tipoconsecutivo_sgre + (res.data[0].consecutivo_sgre + 1);
      //console.log("DATOS SUBGRUPOS : ", res.data[0].tipoconsecutivo_sgre);
      //console.log("DATOS CONSECUTIVO : ", valor);
      setConsecutivo(valor)
      setPrefijo(res.data[0].tipoconsecutivo_sgre)
    }
    fetchDataSubGruposEquipos();
  }, [])

  return (
    <div>
      <RegistraEquipos consecutivo={consecutivo} prefijo={prefijo} idUsu={idUsu} />
    </div>
  )
}

function RegistraEquipos(props) {
  const { consecutivo, prefijo, idUsu } = props;
  const history = useHistory();
  //console.log("CONSECUTIVO : ", prefijo)
  const styles = useStyles();
  const [listarEquipos, setListarEquipos] = useState([]);
  const [listarNovedadesActivos, setListarNovedadesActivos] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalConsultarNovedades, setModalConsultarNovedades] = useState(false);
  const [formError, setFormError] = useState(false);
  const [grabar, setGrabar] = useState(false);
  const [mostrarNovedades, setMostrarNovedades] = useState(false);
  const [listarEmpresas, setListarEmpresas] = useState([]);
  const [listarEstados, setListarEstados] = useState([]);
  const [listarPropietarios, setListarPropietarios] = useState([]);
  const [listarMarcas, setListarMarcas] = useState([]);
  const [fechaNovedad, setFechaNovedad] = useState("");
  const [observacion, setObservacion] = useState("");
  const [valorDepreciacion, setValorDepreciacion] = useState(0);
  const [valorNovedad, setValorNovedad] = useState(0);
  const [sumaResta, setSumaResta] = useState("");
  let valorneto = 0;
  let valnovedad = 0;
  let registrarvalornovedad = 0;

  const [fechaHoy, setFechaHoy] = useState(new Date());
  const [actualiza, setActualiza] = useState(false);
  const [tipo, setTipo] = useState("EQ");

  let frecuencia = 2

  const [equiposSeleccionado, setEquiposSeleccionado] = useState({
    codigo_act: "",
    codigocontable_act: 0,
    descripcion_act: "",
    empresa_act: "",
    propietario_act: "",
    marca_act: "",
    antiguedad_act: "",
    valoradquisicion_act: "",
    estadocontable_act: "",
    ctacontable_act: "",
    ctadepreciacion_act: "",
    valorresidual_act: "",
    costosiniva_act: "",
    depreciacionacumulada_act: "",
    valorneto_act: "",
    valornovedad_act: "",
    duracion_act: "",
    depreciacionmensual_act: "",
    fechainiciadepre_act: "",
    fechaultimadepre_act: "",
    valorenlibros_act: "",
    numerocombo_act: "",
    estadodepre_act: "",
    observacion_act: ""
  })

  const [novedadesActivosSeleccionado, setNovedadesActivosSeleccionado] = useState({
    id_nac: "",
    codigo_nac: "",
    fechanovedad_nac: "",
    cuotadepreciacion_nac: "",
    valornovedad_nac: "",
    tiponovedad_nac: "",
    observacion_nac: ""
  })

  useEffect(() => {
    async function fetchDataEquipos() {
      const res = await activosServices.listActivos();
      setListarEquipos(res.data);
      setActualiza(false);
      //console.log(res.data)
    }
    fetchDataEquipos();
  }, [actualiza])

  useEffect(() => {
    async function fetchDataEmpresas() {
      const res = await empresasServices.listEmpresas();
      setListarEmpresas(res.data)
      //console.log("EQUIPOS DEL SISTEMA : ", res.data);
    }
    fetchDataEmpresas();
  }, [])

  useEffect(() => {
    async function fetchDataEstados() {
      const res = await estadosServices.listEstadosEquipos();
      setListarEstados(res.data)
      //console.log("DATOS ESTADOS ",res.data);
    }
    fetchDataEstados();
  }, [])

  useEffect(() => {
    async function fetchDataPropietarios() {
      const res = await propietariosServices.listProveedores();
      setListarPropietarios(res.data)
      //console.log(res.data);
    }
    fetchDataPropietarios();
  }, [])

  useEffect(() => {
    async function fetchDataMarcas() {
      const res = await marcasServices.listMarcas();
      setListarMarcas(res.data)
      //console.log(res.data);
    }
    fetchDataMarcas();
  }, [])

  const handleChange = e => {
    const { name, value } = e.target;

    setEquiposSeleccionado(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const seleccionarEquipo = (equipo, caso) => {
    if(caso === "Editar"){
      if(idUsu !== 25){
        swal("Activo", "Usuario no Habilitado para Registrar Novedad!", "warning", { button: "Aceptar" });
        return
      }
    }
    setEquiposSeleccionado(equipo);
    setValorDepreciacion(equipo.depreciacionmensual_act);
    console.log("ACTIVO :  ", equipo.id_act )
    async function fetchDataNovedadesActivos() {
      const res = await novedadesactivosServices.listnovedadesactivos(equipo.id_act);
      setListarNovedadesActivos(res.data)
    }
    fetchDataNovedadesActivos();
    //setMostrarNovedades(true);
    (caso === "Editar") ? abrirCerrarModalEditar() : abrirCerrarModalConsultarNovedades()
  }
/*
  useEffect(() => {
    if (mostrarNovedades) {
      console.log("NOVEDADES ACTIVOS : ", novedadesActivos)
    }
  }, [mostrarNovedades])
    */
  const abrirCerrarModalInsertar = () => {
    setModalInsertar(!modalInsertar);
  }

  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
  }

  const abrirCerrarModalConsultarNovedades = () => {
    setModalConsultarNovedades(!modalConsultarNovedades);
  }


  const actualizaEstadoEquipo = async () => {
    setFormError({});
    let errors = {};
    let formOk = true;
  }

  const actualizarEquipo = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;

    if (!fechaNovedad) {
      alert("1");
      errors.fechaNovedad = true;
      formOk = false;
    }

    if (!observacion) {
      alert("2");
      errors.observacion = true;
      formOk = false;
    }

    if (!valorDepreciacion) {
      alert("3");
      errors.valorDepreciacion = true;
      formOk = false;
    }

    if (!valorNovedad) {
      alert("4");
      errors.valorNovedad = true;
      formOk = false;
    }

    if (!sumaResta) {
      alert("5");
      errors.sumaResta = true;
      formOk = false;
    }

    if (!formOk) {
      //console.log(equiposSeleccionado);
      swal("Activo", "Debe Ingresar Todos los Datos, Error Ingresando Novedad!", "warning", { button: "Aceptar" });
      //console.log(equiposSeleccionado);
      //console.log(res.message);
      abrirCerrarModalEditar();
    }

    if (sumaResta === 'Resta') {
      valorneto = Number(equiposSeleccionado.valoradquisicion_act) - Number(equiposSeleccionado.depreciacionacumulada_act) -
        Number(valorNovedad) + Number(equiposSeleccionado.valornovedad_act);
      setValorNovedad(Number(valorNovedad) * Number(-1))
      valnovedad = Number(equiposSeleccionado.valornovedad_act) + (Number(valorNovedad) * Number(-1))
      registrarvalornovedad = (Number(valorNovedad) * Number(-1));
    }
    else {
      valorneto = Number(equiposSeleccionado.valoradquisicion_act) - Number(equiposSeleccionado.depreciacionacumulada_act) +
        Number(valorNovedad) + Number(equiposSeleccionado.valornovedad_act);
      valnovedad = Number(equiposSeleccionado.valornovedad_act) + Number(valorNovedad)
      registrarvalornovedad = Number(valorNovedad);
    }

    {
      setEquiposSeleccionado([{
        id_act: equiposSeleccionado.id_act,
        codigo_act: equiposSeleccionado.codigo_act,
        codigocontable_act: equiposSeleccionado.codigocontable_act,
        descripcion_act: equiposSeleccionado.descripcion_act,
        empresa_act: equiposSeleccionado.empresa_act,
        propietario_act: equiposSeleccionado.propietario_act,
        marca_act: equiposSeleccionado.marca_act,
        antiguedad_act: equiposSeleccionado.antiguedad_act,
        valoradquisicion_act: equiposSeleccionado.valoradquisicion_act,
        estadocontable_act: equiposSeleccionado.estadocontable_act,
        ctacontable_act: equiposSeleccionado.ctacontable_act,
        ctadepreciacion_act: equiposSeleccionado.ctadepreciacion_act,
        valorresidual_act: equiposSeleccionado.valorresidual_act,
        costosiniva_act: equiposSeleccionado.costosiniva_act,
        depreciacionacumulada_act: equiposSeleccionado.depreciacionacumulada_act,
        valorneto_act: valorneto,
        valornovedad_act: valnovedad,
        duracion_act: equiposSeleccionado.duracion_act,
        depreciacionmensual_act: equiposSeleccionado.depreciacionmensual_act,
        fechainiciadepre_act: equiposSeleccionado.fechainiciadepre_act,
        fechaultimadepre_act: equiposSeleccionado.fechaultimadepre_act,
        valorenlibros_act: equiposSeleccionado.valorenlibros_act,
        numerocombo_act: equiposSeleccionado.numerocombo_act,
        estadodepre_act: equiposSeleccionado.estadodepre_act,
        observacion_act: equiposSeleccionado.observacion_act
      }]);
    }

    {
      setNovedadesActivosSeleccionado([{
        id_nac: 0,
        codigo_nac: equiposSeleccionado.id_act,
        fechanovedad_nac: fechaNovedad,
        cuotadepreciacion_nac: valorDepreciacion,
        valornovedad_nac: registrarvalornovedad,
        tiponovedad_nac: sumaResta,
        observacion_nac: observacion
      }]);
    }
    setGrabar(true);
  }

  useEffect(() => {
    async function grabarEquipo() {

      if (grabar) {

        //console.log("EQUIPO SELECCIONADO : ", equiposSeleccionado)

        const res = await activosServices.update(equiposSeleccionado[0]);

        if (res.success) {
          //console.log("ENTRE GRABAR NOVEDAD")
          //console.log("NOVEDADES ACTIVOS : ",novedadesActivosSeleccionado)
          const res = await novedadesactivosServices.save(novedadesActivosSeleccionado[0]);
        }

        if (res.success) {
          swal("Activo", "Equipo Actualizado de forma Correcta!", "success", { button: "Aceptar" });
          console.log(res.message);
        } else {
          swal("Activo", "Error Actualizando el Equipo!", "error", { button: "Aceptar" });
          console.log(res.message);
        }
        //history.push("/gim");

        setGrabar(false);
        setActualiza(true);
        abrirCerrarModalEditar();
      }
    }
    grabarEquipo();
  }, [grabar])

  const consultarNovedadesActivos = async () => {

    const res = await activosServices.delete(equiposSeleccionado.id_act);

    if (res.success) {
      swal("Activo", "Equipo Borrado de forma Correcta!", "success", { button: "Aceptar" });
      console.log(res.message)
      abrirCerrarModalConsultarNovedades();
    }
    else {
      swal("Activo", "Error Borrando el Equipo!", "error", { button: "Aceptar" });
      console.log(res.message);
      abrirCerrarModalConsultarNovedades();
    }
    setActualiza(true);
  }

  // "string","boolean","numeric","date","datetime","time","currency"
  const columnas = [
    {
      field: 'codigo_equ',
      title: 'Codigo',
      cellStyle: { minWidth: 50 }
    },
    {
      field: 'codigocontable_act',
      title: 'Codigo Contable',
      cellStyle: { minWidth: 30 }
    },
    {
      field: 'descripcion_act',
      title: 'Descripción  del Activo',
      cellStyle: { minWidth: 300 }
    },
    {
      field: 'descripcion_mar',
      title: 'Marca',
      cellStyle: { minWidth: 70 }
    },
    {
      field: 'valoradquisicion_act',
      title: 'Costo con IVA',
      cellStyle: { minWidth: 70 }
    },
    {
      field: 'costosiniva_act',
      title: 'Costo sin IVA',
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
      field: 'depreciacionacumulada_act',
      title: 'Depreciación Acumulada',
      cellStyle: { minWidth: 70 }
    },
    {
      field: 'valorneto_act',
      title: 'Valor en Libros',
      cellStyle: { minWidth: 70 }
    },
    {
      field: 'fechaultimadepre_act',
      title: 'Ultima Depreciación'
    },
    {
      field: 'depreciacionmensual_act',
      title: 'Depreciación Mensual',
      cellStyle: { minWidth: 160 }
    }
  ]

  const novedades = [
    {
      field: 'fechanovedad_nac',
      title: 'Fecha Novedad',
      cellStyle: { minWidth: 100 }
    },
    {
      field: 'tiponovedad_nac',
      title: 'Tipo de Novedad',
      cellStyle: { minWidth: 100 }
    },
    {
      field: 'cuotadepreciacion_nac',
      title: 'Cuota Depreciación',
      cellStyle: { minWidth: 100 }
    },
    {
      field: 'valornovedad_nac',
      title: 'Valor Novedad',
      cellStyle: { minWidth: 100 }
    },
    {
      field: 'observacion_nac',
      title: 'Observación',
      cellStyle: { minWidth: 300 }
    }
  ]


  const equipoInsertar = (
    <div className={styles.modal}>
      <Typography align="center" className={styles.typography} variant="button" display="block"> Agregar Nuevo Activo </Typography>
      <div align="right">
        <Button className={styles.button} color="primary" onClick={() => actualizaEstadoEquipo()} >Insertar</Button>
        <Button className={styles.button2} onClick={() => abrirCerrarModalInsertar()} >Cancelar</Button>
      </div>
    </div>
  )

  //defaultValue={Moment(fechaHoy).format('YYYY-MM-DD')}

  const equipoEditar = (
    <div className={styles.modal}>
      <Typography align="center" className={styles.typography} variant="button" display="block" > Registro Novedades </Typography>
      <Grid container spacing={2} >
        <Grid item xs={12} md={6}> <TextField type="date" InputLabelProps={{ shrink: true }} name="fechanovedad"
          label="Fecha de Novedad" fullWidth onChange={(e) => setFechaNovedad(e.target.value)} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField className={styles.inputMaterial} name="valoradquisicion_act" label="Valor de Adquisición" fullWidth
            InputLabelProps={{ shrink: true }} InputProps={{ inputComponent: NumberFormatCustom, }}
            onChange={handleChange} value={equiposSeleccionado && equiposSeleccionado.valoradquisicion_act}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField className={styles.inputMaterial} name="depreciacionacumulada_act" label="Depreciación Acumulada" fullWidth
            InputLabelProps={{ shrink: true }} InputProps={{ inputComponent: NumberFormatCustom, }}
            onChange={handleChange} value={equiposSeleccionado && equiposSeleccionado.depreciacionacumulada_act}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField className={styles.inputMaterial} name="valorresidual_act" label="Valor Residual" fullWidth
            InputLabelProps={{ shrink: true }} InputProps={{ inputComponent: NumberFormatCustom, }}
            onChange={handleChange} value={equiposSeleccionado && equiposSeleccionado.valorresidual_act}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField className={styles.inputMaterial} name="valorneto_act" label="Valor Neto" fullWidth
            InputLabelProps={{ shrink: true }} InputProps={{ inputComponent: NumberFormatCustom, }}
            onChange={handleChange} value={equiposSeleccionado && equiposSeleccionado.valorneto_act}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField className={styles.inputMaterial} name="depreciacionmensual_act" label="Cuota Depreciación" fullWidth
            InputLabelProps={{ shrink: true }} InputProps={{ inputComponent: NumberFormatCustom, }}
            onChange={handleChange} value={equiposSeleccionado && equiposSeleccionado.depreciacionmensual_act}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField className={styles.inputMaterial} name="valornovedad" label="Valor Novedad" fullWidth
            InputLabelProps={{ shrink: true }} InputProps={{ inputComponent: NumberFormatCustom, }}
            onChange={(e) => setValorNovedad(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectTipo" >Tipo Concepto</InputLabel>
            <Select
              labelId="selecTipo"
              name="tipo_rtb"
              id="idselectTipo"
              fullWidth
              onChange={(e) => setSumaResta(e.target.value)}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              <MenuItem value="Suma">Suma</MenuItem>
              <MenuItem value="Resta">Resta</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField className={styles.inputMaterial} label="Observaciones o Comentarios" name="observacion"
            value={observacion} onChange={(e) => setObservacion(e.target.value)} />
        </Grid>
      </Grid>
      <div align="right">
        <Button className={styles.button} color="primary" onClick={() => actualizarEquipo()} >Editar</Button>
        <Button className={styles.button2} onClick={() => abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  const equipoConsultarNovedades = (
    <div className={styles.modal2}>
      <MaterialTable
        columns={novedades}
        data={listarNovedadesActivos}
        title="CONSULTAR NOVEDADES ACTIVOS"
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
      {}
    </div>
  )

  return (
    <div className="App">
      <br />
      <br />
      <MaterialTable
        columns={columnas}
        data={listarEquipos}
        title=" MAESTRA DE ACTIVOS"
        actions={[
          {
            icon: CommentIcon,
            tooltip: 'Novedades',
            onClick: (event, rowData) => seleccionarEquipo(rowData, "Editar")
          },
          {
            icon: FindReplaceIcon,
            tooltip: 'Consultar Novedades',
            onClick: (event, rowData) => seleccionarEquipo(rowData, "Consultar")
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
        detailPanel={[
          {
            tooltip: 'Estados del Activo',
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
                  <Button variant="contained">Estado Contable : {rowData.nombre_est}</Button> {}
                  <Button variant="contained">Marca :{rowData.descripcion_mar}</Button>
                </div>
              )
            },
          }
        ]}
      />
      {}
      <Modal
        open={modalInsertar}
        onClose={abrirCerrarModalInsertar}
      >
        {equipoInsertar}
      </Modal>
      <Modal
        open={modalEditar}
        onClose={abrirCerrarModalEditar}
      >
        {equipoEditar}
      </Modal>
      <Modal
        open={modalConsultarNovedades}
        onClose={abrirCerrarModalConsultarNovedades}
      >
        {equipoConsultarNovedades}
      </Modal>
    </div>
  );
}

export default Activos;

/*
  <Fab variant="extended">
        <NavigationIcon className={styles.extendedIcon} />
        Datos Adicionales Equipos
        onClick
      </Fab>
*/