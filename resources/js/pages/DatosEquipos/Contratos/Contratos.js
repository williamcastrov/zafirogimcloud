import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import PropTypes from 'prop-types';
import { Modal, TextField, Button, Select, MenuItem, FormControl, InputLabel, Grid, Box, InputAdornment, Typography } from "@material-ui/core";
import { green, blue, blueGrey, red } from '@material-ui/core/colors';
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from '@material-ui/icons/Save';
import NumberFormat from 'react-number-format';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import swal from 'sweetalert';
import Moment from 'moment';
import { useHistory } from "react-router-dom";


// Componentes de Conexion con el Backend
import contratosServices from "../../../services/DatosEquipos/Contratos";
import estadosServices from "../../../services/Parameters/Estados";
import ciudadesServices from "../../../services/Parameters/Ciudades";
import equiposServices from "../../../services/Mantenimiento/Equipos";
import clientesServices from "../../../services/Interlocutores/Clientes";
import empleadosServices from "../../../services/Interlocutores/Empleados";
import subgruposequiposServices from "../../../services/Mantenimiento/SubGruposPartes";

//Componentes
import PdfContratos from "../../Pdfs/PdfContratos";
import ConsultarPdfsContratos from "../../Pdfs/PdfContratos/ConsultarPdfsContratos";

//Estilos
import "../../Mantenimiento/Equipos/Equipos.css";

const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: 750,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  modalcontratos: {
    position: 'absolute',
    width: 1750,
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
    minWidth: 320,
  },
  formControl2: {
    margin: theme.spacing(0),
    minWidth: 550,
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

function NumberFormatCustom2(props) {
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
      prefix=""
    />
  );
}

NumberFormatCustom2.propTypes = {
  inputRef: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

function Contratos(props) {
  const { equipoID, equipoCodigo, idUsu } = props;
  //console.log(equipoCodigo);

  //const valorcontrato_ctr = 1480900123.9898

  const styles = useStyles();
  const [consecutivo, setConsecutivo] = useState(0);
  const [prefijo, setPrefijo] = useState("");
  const history = useHistory();
  const [grabar, setGrabar] = useState(false);
  const [listContratos, setListContratos] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalPdfContrato, setModalPdfContrato] = useState(false);
  const [modalConsultarPdfContrato, setModalConsultarPdfContrato] = useState(false);
  const [formError, setFormError] = useState(false);
  const [listarEstados, setListarEstados] = useState([]);
  const [listarCiudades, setListarCiudades] = useState([]);
  const [listarEquipos, setListarEquipos] = useState([]);
  const [listarClientes, setListarClientes] = useState([]);
  const [listarEmpleados, setListarEmpleados] = useState([]);
  const [actualiza, setActualiza] = useState(false);
  const fechainicial = Moment(new Date()).format('2001-01-01 00:00:00');
  const [listarCodigoContrato, setListarCodigoContrato] = useState([]);

  const [contratoSeleccionado, setContratoSeleccionado] = useState({
    'id_ctr': equipoID,
    'codigocontrato_ctr': "",
    'cliente_ctr': "",
    'asesorcomercial_ctr': "",
    'duracion_ctr': "",
    'fechainicio_ctr': "",
    'fechafinal_ctr': "",
    'ciudad_ctr': "",
    'valorcontrato_ctr': 0,
    'estado_ctr': "",
    'observacion_ctr': "",
    'valorrentames_ctr': "",
    'valorfacturadomes_ctr': 0,
    'numerodiasparo_ctr': 0,
    'fecharegistradiasparo_ctr': fechainicial,
    'fechaalza_ctr': "",
    'diafacturacion_ctr': "",
    'controldiafactura_ctr': 0,
    'controlalza_ctr': "N",
    'horastrabajocontratadas_ctr': 0
  })

  useEffect(() => {
    async function fetchDataContratos() {
      const res = await contratosServices.listUnContrato(equipoID);
      setListContratos(res.data);
      setActualiza(false);
    }
    fetchDataContratos();
  }, [actualiza]);

  useEffect(() => {
    async function fetchDataSubGruposEquipos() {
      const res = await subgruposequiposServices.listConsecutivoContratos();
      let valor = (res.data[0].consecutivo_sgre + 1);
      //let valor = res.data[0].tipoconsecutivo_sgre + (res.data[0].consecutivo_sgre + 1);
      //console.log("DATOS SUBGRUPOS : ", res.data[0].tipoconsecutivo_sgre);
      //console.log("DATOS CONSECUTIVO : ", valor);
      setConsecutivo(valor)
      setPrefijo(res.data[0].tipoconsecutivo_sgre)
    }
    fetchDataSubGruposEquipos();
  }, [])

  useEffect(() => {
    async function fetchDataCiudades() {
      const res = await ciudadesServices.listCiudades();
      setListarCiudades(res.data)
      //console.log(res.data);
    }
    fetchDataCiudades();
  }, [])

  useEffect(() => {
    async function fetchDataEstados() {
      const res = await estadosServices.listEstadosContratos();
      setListarEstados(res.data)
      //console.log(res.data);
    }
    fetchDataEstados();
  }, [])

  useEffect(() => {
    async function fetchDataEquipos() {
      const res = await equiposServices.listEquipos();
      setListarEquipos(res.data)
      //console.log(res.data);
    }
    fetchDataEquipos();
  }, [])

  useEffect(() => {
    async function fetchDataClientes() {
      const res = await clientesServices.listClientes();
      setListarClientes(res.data)
      //console.log(res.data);
    }
    fetchDataClientes();
  }, [])

  useEffect(() => {
    async function fetchDataEmpleados() {
      const res = await empleadosServices.listEmpleadoscomercial();
      setListarEmpleados(res.data)
      //console.log(res.data);
    }
    fetchDataEmpleados();
  }, [])

  const handleChange = e => {
    const { name, value } = e.target;

    setContratoSeleccionado(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const seleccionarContratos = (contrato, caso) => {
    setContratoSeleccionado(contrato);

    if (idUsu == 54)
      null
    else
      (caso === "Editar") ? abrirCerrarModalEditar() : abrirCerrarModalEliminar()
  }

  const seleccionarPdfContratos = (pdf, caso) => {
    //console.log("DATOS CONTRATOS : ", pdf.codigocontrato_ctr)
    let codigocontrato = pdf.codigocontrato_ctr;
    console.log("DATOS CONTRATOS : ", codigocontrato);
    setListarCodigoContrato(codigocontrato);
    (caso === "Pdf") ? abrirCerrarModalPdfContrato() : abrirCerrarModalConsultarPdfContrato()
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

  const abrirCerrarModalPdfContrato = () => {
    setModalPdfContrato(!modalPdfContrato);
  }

  const abrirCerrarModalConsultarPdfContrato = () => {
    setModalConsultarPdfContrato(!modalConsultarPdfContrato);
  }

  useEffect(() => {
    async function grabarContrato() {

      if (grabar) {
        console.log("CONTRATO SELECCIONADO : ", contratoSeleccionado[0])

        const res = await contratosServices.save(contratoSeleccionado[0]);

        if (res.success) {

          swal("Contratos", "Contrato Creado de forma Correcta!", "success", { button: "Aceptar" });

          const result = await subgruposequiposServices.actualizaConsecutivo(prefijo);

          if (result.success)
            swal("Consecutivo", "Consecutivo Contrato Actualizado de forma Correcta!", "success", { button: "Aceptar" });
          else
            swal("Consecutivo", "Error Actualizando Consecutivo Contrato - Revisar!", "error", { button: "Aceptar" });

          console.log(res.message);
          delete contratoSeleccionado.id_ctr;
          //delete contratoSeleccionado.codigocontrato_ctr;
          delete contratoSeleccionado.cliente_ctr;
          delete contratoSeleccionado.asesorcomercial_ctr;
          delete contratoSeleccionado.duracion_ctr;
          delete contratoSeleccionado.fechainicio_ctr;
          delete contratoSeleccionado.fechafinal_ctr;
          delete contratoSeleccionado.ciudad_ctr;
          delete contratoSeleccionado.valorcontrato_ctr;
          delete contratoSeleccionado.estado_ctr;
          delete contratoSeleccionado.observacion_ctr;
        } else {
          swal("Equipo", "Error Creando el Contrato!", "error", { button: "Aceptar" });
          console.log(res.message);
        }
        setGrabar(false);
        setActualiza(true);
        history.push("/gim");
        abrirCerrarModalInsertar();

      }
    }
    grabarContrato();
  }, [grabar])

  const actualizaEstadoContrato = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;

    if (!contratoSeleccionado.id_ctr) {
      errors.id_ctr = true;
      formOk = false;
      alert("1");
    }

    if (!contratoSeleccionado.cliente_ctr) {
      errors.cliente_ctr = true;
      formOk = false;
      alert("3");
    }

    if (!contratoSeleccionado.asesorcomercial_ctr) {
      errors.asesorcomercial_ctr = true;
      formOk = false;
      alert("4");
    }

    if (!contratoSeleccionado.duracion_ctr) {
      errors.duracion_ctr = true;
      formOk = false;
      alert("5");
    }

    if (!contratoSeleccionado.fechainicio_ctr) {
      errors.fechainicio_ctr = true;
      formOk = false;
      alert("6");
    }

    if (!contratoSeleccionado.fechafinal_ctr) {
      errors.fechafinal_ctr = true;
      formOk = false;
      alert("7");
    }

    if (!contratoSeleccionado.ciudad_ctr) {
      errors.ciudad_ctr = true;
      formOk = false;
      alert("8");
    }

    if (!contratoSeleccionado.valorcontrato_ctr) {
      errors.valorcontrato_ctr = true;
      formOk = false;
      alert("9");
    }

    if (!contratoSeleccionado.estado_ctr) {
      errors.estado_ctr = true;
      formOk = false;
      alert("10");
    }

    if (!contratoSeleccionado.observacion_ctr) {
      errors.observacion_ctr = true;
      formOk = false;
      alert("11");
    }

    setFormError(errors);

    if (!formOk) {
      //console.log(equiposSeleccionado);
      swal("Contrato", "Debe Ingresar Todos los Datos, Error Creando el Contrato!", "warning", { button: "Aceptar" });
      //console.log(equiposSeleccionado);
      //console.log(res.message);
      abrirCerrarModalInsertar();
    }

    {
      setContratoSeleccionado([{
        id_ctr: equipoID,
        codigocontrato_ctr: consecutivo,
        cliente_ctr: contratoSeleccionado.cliente_ctr,
        asesorcomercial_ctr: contratoSeleccionado.asesorcomercial_ctr,
        duracion_ctr: contratoSeleccionado.duracion_ctr,
        fechainicio_ctr: contratoSeleccionado.fechainicio_ctr,
        fechafinal_ctr: contratoSeleccionado.fechafinal_ctr,
        ciudad_ctr: contratoSeleccionado.ciudad_ctr,
        valorcontrato_ctr: contratoSeleccionado.valorcontrato_ctr,
        estado_ctr: contratoSeleccionado.estado_ctr,
        observacion_ctr: contratoSeleccionado.observacion_ctr,
        valorrentames_ctr: contratoSeleccionado.valorrentames_ctr,
        valorfacturadomes_ctr: 0,
        numerodiasparo_ctr: 0,
        fecharegistradiasparo_ctr: fechainicial,
        fechaalza_ctr: contratoSeleccionado.fechaalza_ctr,
        diafacturacion_ctr: contratoSeleccionado.diafacturacion_ctr,
        controldiafactura_ctr: 0,
        controlalza_ctr: "N",
        horastrabajocontratadas_ctr: 0 //contratoSeleccionado.horastrabajocontratadas_ct
      }]);
    }
    setGrabar(true);
  }

  const actualizarContrato = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;

    setFormError(errors);

    if (formOk) {

      const res = await contratosServices.update(contratoSeleccionado).
        then(
          (response) => {
            console.log("RESPONSE THEN: ", response)
            if (response.res === 1) {
              swal("Contrato", "Contrato del Equipo Actualizado de forma Correcta!", "success", { button: "Aceptar" });
              //console.log(res.message)
              setActualiza(true);
              abrirCerrarModalEditar();
            } else {
              swal("Contrato", "Error Actualizando Contrato del Equipo!", "error", { button: "Aceptar" });
              //console.log(res.message);
              abrirCerrarModal();
            }
          }
        ).catch(
          console.log("RESPONSE CATCH: ", response)
        )
      //console.log("DATOS CONTRATO ACTUALIZAR : ",contratoSeleccionado);
      /*
            if (res.success) {
              swal("Contrato", "Contrato del Equipo Actualizado de forma Correcta!", "success", { button: "Aceptar" });
              //console.log(res.message)
              abrirCerrarModalEditar();
            } else {
              swal("Contrato", "Error Actualizando Contrato del Equipo!", "error", { button: "Aceptar" });
              //console.log(res.message);
              abrirCerrarModalEditar();
            }
      */
    }
    else {
      swal("Contrato", "Debe Ingresar Todos los Datos del Contrato, Revisar Información!", "warning", { button: "Aceptar" });
      //console.log(res.message);
      abrirCerrarModalEditar();
    }
    setActualiza(true);
  }

  const borrarContrato = async () => {

    const res = await contratosServices.delete(contratoSeleccionado.codigocontrato_ctr);

    if (res.success) {
      swal("Contrato", "Contrato Brorrando de forma Correcta!", "success", { button: "Aceptar" });
      //console.log(res.message)
      abrirCerrarModalEliminar();
    }
    else {
      swal("Contrato", "Error Borrando Contrato del Equipo!", "error", { button: "Aceptar" });
      //console.log(res.message);
      abrirCerrarModalEliminar();
    }
    setActualiza(true);
  }
  // "string","boolean","numeric","date","datetime","time","currency"
  const columnas = [
    {
      title: 'ID Contrato',
      field: 'codigocontrato_ctr'
    },
    {
      title: 'Cliente',
      field: 'razonsocial_cli',
      cellStyle: { minWidth: 130 }
    },
    {
      title: 'Bodega',
      field: 'nombrealterno_dequ',
      cellStyle: { minWidth: 100 }
    },
    {
      title: 'Duración Meses',
      field: 'duracion_ctr'
    },
    {
      title: 'Fecha de Inicio',
      field: 'fechainicio_ctr',
      type: 'date'
    },
    {
      title: 'Fecha Final',
      field: 'fechafinal_ctr',
      type: 'date'
    },
    {
      title: 'Fecha Alza',
      field: 'fechaalza_ctr',
      type: 'date'
    },
    {
      title: 'Dia Facturación',
      field: 'diafacturacion_ctr',
      cellStyle: { minWidth: 80 }
    },
    {
      title: 'Ciudad',
      field: 'nombre_ciu',
      cellStyle: { minWidth: 80 }
    },
    {
      title: 'Renta Mes',
      field: 'valorrentames_ctr',
      cellStyle: { minWidth: 100 }
    },
    {
      title: 'Horas Contratadas',
      field: 'horastrabajocontratadas_ctr',
    },
    {
      title: 'Valor Contrato',
      field: 'valorcontrato_ctr'
    },
    {
      title: 'Estado',
      field: 'nombre_est',
      cellStyle: { minWidth: 60 }
    }
  ]

  /*
 <Grid item xs={12} md={6}> <TextField name="codigocontrato_ctr" label="Número del Contrato"
          fullWidth onChange={handleChange} />
        </Grid>
  */
  const contratoInsertar = (
    <div className={styles.modal}>
      <Typography align="center" className={styles.typography} variant="button" display="block">
        Agregar Contrato del Equipo { } {equipoCodigo}
      </Typography>
      <Grid container spacing={2} >
        <Grid item xs={12} md={2}> <TextField name="codigocontrato_ctr" label="ID Contrato" defaultValue={consecutivo}
          fullWidth onChange={handleChange} disabled="true" />
        </Grid>
        <Grid item xs={12} md={10}>
          <FormControl className={styles.formControl2}>
            <InputLabel id="idselectcliente_ctr" >Cliente que contrata</InputLabel>
            <Select
              labelId="selectcliente_ctr"
              name="cliente_ctr"
              id="idselectcliente_ctr"
              fullWidth
              onChange={handleChange}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarClientes.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_cli}>{itemselect.razonsocial_cli}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="asesorcomercial_ctr" >Asesor comercial que atiende al Cliente</InputLabel>
            <Select
              labelId="selectasesorcomercial_ctr"
              name="asesorcomercial_ctr"
              id="idselectasesorcomercial_ctr"
              fullWidth
              onChange={handleChange}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarEmpleados.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_emp}>{itemselect.primer_nombre_emp}{ } {itemselect.primer_apellido_emp}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectestado_ctr" >Estado del Contrato</InputLabel>
            <Select
              labelId="selectestado_ctr"
              name="estado_ctr"
              id="idselectestado_ctr"
              fullWidth
              onChange={handleChange}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarEstados.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_est}>{itemselect.nombre_est}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}> <TextField type="date" InputLabelProps={{ shrink: true }} name="fechainicio_ctr"
          label="Fecha de inicio del Contrato" fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={4}> <TextField type="date" InputLabelProps={{ shrink: true }} name="fechafinal_ctr"
          label="Fecha Final del Contrato" fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={4}> <TextField type="date" InputLabelProps={{ shrink: true }} name="fechaalza_ctr"
          label="Fecha Alza Contrato" fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={4}> <TextField type="numeric" name="duracion_ctr" label="Duración del Contrato"
          fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={4}> <TextField type="numeric" name="diafacturacion_ctr" label="Dia Facturación"
          fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField className={styles.inputMaterial} name="valorrentames_ctr" label="Renta Mensual" fullWidth
            InputLabelProps={{ shrink: true }} InputProps={{ inputComponent: NumberFormatCustom, }}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectciudad_ctr" >Ciudad donde se realiza el contrato</InputLabel>
            <Select
              labelId="selectciudad_ctr"
              name="ciudad_ctr"
              id="idselectciudad_ctr"
              fullWidth
              onChange={handleChange}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarCiudades.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_ciu}>{itemselect.nombre_ciu}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField className={styles.inputMaterial} name="valorcontrato_ctr" label="Valor del Contrato" fullWidth
            InputLabelProps={{ shrink: true }} InputProps={{ inputComponent: NumberFormatCustom, }}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField className={styles.inputMaterial} name="horastrabajocontratadas_ctr" label="Horas Contratadas" fullWidth
            InputLabelProps={{ shrink: true }} InputProps={{ inputComponent: NumberFormatCustom2, }}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={12}> <TextField name="observacion_ctr" label="Observaciones sobre el Contrato"
          fullWidth onChange={handleChange} />
        </Grid>
      </Grid>
      <br /><br />
      <div align="right">
        <Button className={styles.button} color="primary" onClick={() => actualizaEstadoContrato()} >Insertar</Button>
        <Button className={styles.button2} onClick={() => abrirCerrarModalInsertar()} >Cancelar</Button>
      </div>
    </div>
  )

  /*
 <Grid item xs={12} md={6}> <TextField name="codigocontrato_ctr" label="Número del Contrato"
          fullWidth onChange={handleChange} value={contratoSeleccionado && contratoSeleccionado.codigocontrato_ctr} />
        </Grid>
  */

  const contratoEditar = (
    <div className={styles.modal}>
      <Typography align="center" className={styles.typography} variant="button" display="block">
        Modificar Contrato del Equipo { } {equipoCodigo}
      </Typography>
      <Grid container spacing={2} >
        <Grid item xs={12} md={2}> <TextField name="codigocontrato_ctr" label="ID Contrato" defaultValue={equipoID} disabled="true"
          fullWidth onChange={handleChange} value={contratoSeleccionado && contratoSeleccionado.codigocontrato_ctr} />
        </Grid>
        <Grid item xs={12} md={10}>
          <FormControl className={styles.formControl2}>
            <InputLabel id="idselectcliente_ctr" >Cliente que contrata</InputLabel>
            <Select
              labelId="selectcliente_ctr"
              name="cliente_ctr"
              id="idselectcliente_ctr"
              fullWidth
              onChange={handleChange}
              value={contratoSeleccionado && contratoSeleccionado.cliente_ctr}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarClientes.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_cli}>{itemselect.razonsocial_cli}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="asesorcomercial_ctr" >Asesor comercial que atiende al Cliente</InputLabel>
            <Select
              labelId="selectasesorcomercial_ctr"
              name="asesorcomercial_ctr"
              id="idselectasesorcomercial_ctr"
              fullWidth
              onChange={handleChange}
              value={contratoSeleccionado && contratoSeleccionado.asesorcomercial_ctr}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarEmpleados.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_emp}>{itemselect.primer_nombre_emp}{ } {itemselect.primer_apellido_emp}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectestado_ctr" >Estado del Contrato</InputLabel>
            <Select
              labelId="selectestado_ctr"
              name="estado_ctr"
              id="idselectestado_ctr"
              fullWidth
              onChange={handleChange}
              value={contratoSeleccionado && contratoSeleccionado.estado_ctr}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarEstados.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_est}>{itemselect.nombre_est}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}> <TextField type="date" InputLabelProps={{ shrink: true }} name="fechainicio_ctr"
          defaultValue={Moment(contratoSeleccionado.fechainicio_ctr).format('YYYY-MM-DD')}
          label="Fecha de inicio del Contrato" fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={4}> <TextField type="date" InputLabelProps={{ shrink: true }} name="fechafinal_ctr"
          defaultValue={Moment(contratoSeleccionado.fechafinal_ctr).format('YYYY-MM-DD')}
          label="Fecha Final del Contrato" fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={4}> <TextField type="date" InputLabelProps={{ shrink: true }} name="fechaalza_ctr"
          defaultValue={Moment(contratoSeleccionado.fechaalza_ctr).format('YYYY-MM-DD')}
          label="Fecha Alza Contrato" fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={4}> <TextField name="duracion_ctr" label="Duración del Contrato"
          fullWidth onChange={handleChange} value={contratoSeleccionado && contratoSeleccionado.duracion_ctr} />
        </Grid>
        <Grid item xs={12} md={4}> <TextField type="numeric" name="diafacturacion_ctr" label="Dia Facturación"
          fullWidth onChange={handleChange} value={contratoSeleccionado && contratoSeleccionado.diafacturacion_ctr} />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField className={styles.inputMaterial} name="valorrentames_ctr" label="Renta Mensual" fullWidth
            InputLabelProps={{ shrink: true }} InputProps={{ inputComponent: NumberFormatCustom, }}
            onChange={handleChange} value={contratoSeleccionado && contratoSeleccionado.valorrentames_ctr}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectciudad_ctr" >Ciudad donde se realiza el contrato</InputLabel>
            <Select
              labelId="selectciudad_ctr"
              name="ciudad_ctr"
              id="idselectciudad_ctr"
              fullWidth
              onChange={handleChange}
              value={contratoSeleccionado && contratoSeleccionado.ciudad_ctr}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarCiudades.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_ciu}>{itemselect.nombre_ciu}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField className={styles.inputMaterial} name="valorcontrato_ctr" label="Valor del Contrato" fullWidth
            InputLabelProps={{ shrink: true }} InputProps={{ inputComponent: NumberFormatCustom, }}
            onChange={handleChange} value={contratoSeleccionado && contratoSeleccionado.valorcontrato_ctr} />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField className={styles.inputMaterial} name="horastrabajocontratadas_ctr" label="Horas Contratadas" fullWidth
            InputLabelProps={{ shrink: true }} InputProps={{ inputComponent: NumberFormatCustom2, }}
            onChange={handleChange} value={contratoSeleccionado && contratoSeleccionado.horastrabajocontratadas_ctr}
          />
        </Grid>
        <Grid item xs={12} md={12}> <TextField name="observacion_ctr" label="Observaciones sobre el Contrato"
          fullWidth onChange={handleChange} value={contratoSeleccionado && contratoSeleccionado.observacion_ctr} />
        </Grid>
      </Grid>
      <br /><br />
      <div align="right">
        <Button className={styles.button} color="primary" onClick={() => actualizarContrato()} >Editar</Button>
        <Button className={styles.button2} onClick={() => abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  const contratoEliminar = (
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar el Contrato <b>{contratoSeleccionado && contratoSeleccionado.codigocontrato_ctr}</b>? </p>
      <div align="right">
        <Button className={styles.button} color="secondary" onClick={() => borrarContrato()}> Confirmar </Button>
        <Button className={styles.button2} onClick={() => abrirCerrarModalEliminar()}> Cancelar </Button>
      </div>
    </div>
  )

  const pdfContrato = (
    <PdfContratos codigocontrato={listarCodigoContrato} />
  )

  const consultarPdfContrato = (
    <ConsultarPdfsContratos codigocontrato={listarCodigoContrato} />
  )

  return (
    <div className="App">
      <br />
      <Button variant="contained" startIcon={<SaveIcon />} color="primary" onClick={() => abrirCerrarModalInsertar()} >Agregar Contrato</Button>
      <div className={styles.modalcontratos}>
        <MaterialTable
          columns={columnas}
          data={listContratos}
          title="DATOS DEL CONTRATO"
          actions={[
            {
              icon: 'edit',
              tooltip: 'Editar Contrato',
              onClick: (event, rowData) => seleccionarContratos(rowData, "Editar")
            },
            {
              icon: 'delete',
              tooltip: 'Borrar Contrato',
              onClick: (event, rowData) => seleccionarContratos(rowData, "Eliminar")
            },
            {
              icon: CloudUploadIcon,
              tooltip: 'Pdf Contrato',
              onClick: (event, rowData) => seleccionarPdfContratos(rowData, "Pdf")
            },
            {
              icon: PictureAsPdfIcon,
              tooltip: 'Consultar Pdf',
              onClick: (event, rowData) => seleccionarPdfContratos(rowData, "ConsultarPdf")
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
          detailPanel={[
            {
              tooltip: 'Observaciones relacionadas con los contratos',
              render: rowData => {
                return (
                  <div
                    style={{
                      fontSize: 14,
                      textAlign: 'center',
                      color: 'white',
                    }}
                  >
                    <Box bgcolor="text.disabled" color="background.paper" p={1}>
                      Observación : {rowData.observacion_ctr} {"/"}
                      Asesor Comercial : {rowData.primer_nombre_emp} {" "} {rowData.primer_apellido_emp}
                    </Box>

                  </div>
                )
              },
            },
          ]}
        />{ }
      </div>

      <Modal
        open={modalInsertar}
        onClose={abrirCerrarModalInsertar}
      >
        {contratoInsertar}
      </Modal>

      <Modal
        open={modalEditar}
        onClose={abrirCerrarModalEditar}
      >
        {contratoEditar}
      </Modal>

      <Modal
        open={modalEliminar}
        onClose={abrirCerrarModalEliminar}
      >
        {contratoEliminar}
      </Modal>

      <Modal
        open={modalPdfContrato}
        onClose={abrirCerrarModalPdfContrato}
      >
        {pdfContrato}
      </Modal>

      <Modal
        open={modalConsultarPdfContrato}
        onClose={abrirCerrarModalConsultarPdfContrato}
      >
        {consultarPdfContrato}
      </Modal>
    </div>
  );
}

export default Contratos;