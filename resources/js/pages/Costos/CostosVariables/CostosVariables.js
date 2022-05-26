import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import PropTypes from 'prop-types';
import { Modal, Button, TextField, Select, MenuItem, FormControl, InputLabel, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from '@material-ui/icons/Save';
import swal from 'sweetalert';
import NumberFormat from 'react-number-format';

import costosvariablesServices from "../../../services/Costos/CostosVariables";
import tiposcostosServices from "../../../services/Costos/TipoCostoVariable";

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
  formControl: {
    margin: theme.spacing(0),
    minWidth: 320,
  },
  iconos: {
    cursor: 'pointer'
  },
  inputMaterial: {
    width: '100%'
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
      prefix=""
    />
  );
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

function CostosVariables() {
  const styles = useStyles();
  const [listParametrosCostos, setListarParametrosCostos] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [formError, setFormError] = useState(false);
  const [listarTiposCostos, setListarTiposCostos] = useState([]);
  const [actualiza, setActualiza] = useState(false);
  const [editar, setEditar] = useState(false);
  const [grabar, setGrabar] = useState(false);
  const [parametrosCostosSeleccionado, setParametrosCostosSeleccionado] = useState({
    id_cvp: "",
    tipocosto_cvp: "",
    valorcosto_cvp: "",
    anno_cvp: "",
    mes_cvp: "",
    periodo_cvp: 0
  })

  useEffect(() => {
    async function fetchDataParametrosCostos() {
      const res = await costosvariablesServices.listcostosvariables();
      setListarParametrosCostos(res.data);
      setActualiza(false);
    }
    fetchDataParametrosCostos();
  }, [actualiza])

  useEffect(() => {
    async function fetchDataTiposCostos() {
      const res = await tiposcostosServices.listtipocostovariable();
      setListarTiposCostos(res.data);
    }
    fetchDataTiposCostos();
  }, [])


  const handleChange = e => {
    const { name, value } = e.target;

    setParametrosCostosSeleccionado(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const seleccionarParametrosCostos = (costos, caso) => {
    setParametrosCostosSeleccionado(costos);
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

  const grabarParametrosCostos = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;

    if (!parametrosCostosSeleccionado.tipocosto_cvp) {
      errors.tipocosto_cvp = true;
      formOk = false;
    }

    if (!parametrosCostosSeleccionado.anno_cvp) {
      errors.anno_cvp = true;
      formOk = false;
    }

    if (!parametrosCostosSeleccionado.mes_cvp) {
      errors.mes_cvp = true;
      formOk = false;
    }

    if (!parametrosCostosSeleccionado.valorcosto_cvp) {
      errors.valorcosto_cvp = true;
      formOk = false;
    }

    setFormError(errors);

    if (!formOk) {
      //console.log(parametrosCostosSeleccionado);
      swal({
        title: "Parametros Costos",
        text: "Debe ingresar todos los datos, Error creando el Parametro Costos Variables!",
        icon: "warning",
        button: "Aceptar"
      });
      abrirCerrarModalInsertar();
    }
    {
      let periodo = ''+parametrosCostosSeleccionado.anno_cvp+parametrosCostosSeleccionado.mes_cvp
      setParametrosCostosSeleccionado([{
        id_cvp: parametrosCostosSeleccionado.id_cvp,
        tipocosto_cvp: parametrosCostosSeleccionado.tipocosto_cvp,
        valorcosto_cvp: parametrosCostosSeleccionado.valorcosto_cvp,
        anno_cvp: parametrosCostosSeleccionado.anno_cvp,
        mes_cvp: parametrosCostosSeleccionado.mes_cvp,
        periodo_cvp: periodo
      }]);
    }
    setGrabar(true);
  }

  useEffect(() => {
    async function grabarCostoVariable() {
      if (grabar) {
        console.log("PARAMETRO COSTOS VARIABLE : ", parametrosCostosSeleccionado[0])
     
        const res = await costosvariablesServices.save(parametrosCostosSeleccionado[0]);

        if (res.success) {
          swal({
            title: "Parametros Costos",
            text: "Parametro Costos Variables Creado de forma Correcta!",
            icon: "success",
            button: "Aceptar"
          });
          console.log(res.message);
          abrirCerrarModalInsertar();
        } else {
          swal({
            title: "Parametros Costos",
            text: "Error Creando el Parametro Costos Variables!",
            icon: "error",
            button: "Aceptar"
          });
          console.log(res.message);
          abrirCerrarModalInsertar();
        }
        setGrabar(false);
        setActualiza(true);
        abrirCerrarModalInsertar();
      }
    }
    grabarCostoVariable();
  }, [grabar])

  const actualizarParametrosCostos = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;

    if (!parametrosCostosSeleccionado.tipocosto_cvp) {
      errors.tipocosto_cvp = true;
      formOk = false;
    }

    if (!parametrosCostosSeleccionado.anno_cvp) {
      errors.anno_cvp = true;
      formOk = false;
    }

    if (!parametrosCostosSeleccionado.mes_cvp) {
      errors.mes_cvp = true;
      formOk = false;
    }

    if (!parametrosCostosSeleccionado.valorcosto_cvp) {
      errors.valorcosto_cvp = true;
      formOk = false;
    }

    setFormError(errors);

    if (!formOk) {
      //console.log(parametrosCostosSeleccionado);
      swal({
        title: "Parametros Costos",
        text: "Debe ingresar todos los datos, Error creando el Parametro Costos Variables!",
        icon: "warning",
        button: "Aceptar"
      });
      abrirCerrarModalEditar();
    }
    {
      let periodo = ''+parametrosCostosSeleccionado.anno_cvp+parametrosCostosSeleccionado.mes_cvp
      setParametrosCostosSeleccionado([{
        id_cvp: parametrosCostosSeleccionado.id_cvp,
        tipocosto_cvp: parametrosCostosSeleccionado.tipocosto_cvp,
        valorcosto_cvp: parametrosCostosSeleccionado.valorcosto_cvp,
        anno_cvp: parametrosCostosSeleccionado.anno_cvp,
        mes_cvp: parametrosCostosSeleccionado.mes_cvp,
        periodo_cvp: periodo
      }]);
    }
    setEditar(true);
  }

  useEffect(() => {
    async function actualizarCostoVariable() {
      if (editar) {
        console.log("PARAMETRO COSTOS VARIABLE : ", parametrosCostosSeleccionado[0])
     
        const res = await costosvariablesServices.update(parametrosCostosSeleccionado[0]);

        if (res.success) {
          swal({
            title: "Parametros Costos",
            text: "Parametro Costos Variables Actualizado de forma Correcta!",
            icon: "success",
            button: "Aceptar"
          });
          console.log(res.message);
          abrirCerrarModalEditar();
        } else {
          swal({
            title: "Parametros Costos",
            text: "Error Actualizando el Parametro Costos Variables!",
            icon: "error",
            button: "Aceptar"
          });
          console.log(res.message);
          abrirCerrarModalEditar();
        }
        setEditar(false);
        setActualiza(true);
        abrirCerrarModalEditar();
      }
    }
    actualizarCostoVariable();
  }, [editar])

  const borrarParametrosCostos = async () => {

    const res = await costosvariablesServices.delete(parametrosCostosSeleccionado.id_pai);

    if (res.success) {
      swal({
        title: "Parametros Costos",
        text: "Parametro Costos Variables Borrada de forma Correcta!",
        icon: "success",
        button: "Aceptar"
      });
      console.log(res.message)
      abrirCerrarModalEliminar();
    }
    else {
      swal({
        title: "Parametros Costos",
        text: "Error brorrando el Parametro Costos Variables!",
        icon: "error",
        button: "Aceptar"
      });
      console.log(res.message);
      abrirCerrarModalEliminar();
    }
    setActualiza(true);
  }

  const columnas = [
    {
      title: 'Id',
      field: 'id_cvp'
    },
    {
      title: 'Tipo Costo',
      field: 'descripcion_tcv'
    },
    {
      title: 'Año',
      field: 'anno_cvp'
    },
    {
      title: 'Mes',
      field: 'mes_cvp'
    },
    {
      title: 'Valor Data Bases x Mes',
      field: 'valorcosto_cvp'
    }
  ]

  const parametroscostoInsertar = (
    <div className={styles.modal}>
      <Typography align="center" className={styles.typography} variant="button" display="block" >
        Agregar Datos Costos Real x Mes
      </Typography>
      <Grid item xs={12} md={12}>
        <FormControl className={styles.formControl}>
          <InputLabel id="tipocosto_cvp">Tipos Costos</InputLabel>
          <Select
            labelId="selecttipocosto_cvp"
            name="tipocosto_cvp"
            id="idtipocosto_cvp"
            onChange={handleChange}
          >
            <MenuItem value="">  <em>None</em> </MenuItem>
            {
              listarTiposCostos && listarTiposCostos.map((itemselect) => {
                return (
                  <MenuItem value={itemselect.id_tcv}>{itemselect.descripcion_tcv}</MenuItem>
                )
              })
            }
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={12}>
        <TextField className={styles.inputMaterial} name="anno_cvp" label="Año" fullWidth
          onChange={handleChange} value={parametrosCostosSeleccionado && parametrosCostosSeleccionado.anno_cvp}
        />
      </Grid>
      <Grid item xs={12} md={12}>
        <TextField className={styles.inputMaterial} name="mes_cvp" label="Mes" fullWidth
          onChange={handleChange} value={parametrosCostosSeleccionado && parametrosCostosSeleccionado.mes_cvp}
        />
      </Grid>
      <Grid item xs={12} md={12}>
        <TextField className={styles.inputMaterial} name="valorcosto_cvp" label="Valor Dato Base" fullWidth
          InputLabelProps={{ shrink: true }} InputProps={{ inputComponent: NumberFormatCustom, }}
          onChange={handleChange} value={parametrosCostosSeleccionado && parametrosCostosSeleccionado.valorhorometro_cvp}
        />
      </Grid>
      <br />
      <div align="right">
        <Button color="primary" onClick={() => grabarParametrosCostos()} >Insertar</Button>
        <Button onClick={() => abrirCerrarModalInsertar()} >Cancelar</Button>
      </div>
    </div>
  )

  const parametroscostoEditar = (
    <div className={styles.modal}>
      <Typography align="center" className={styles.typography} variant="button" display="block" >
        Actualizar Datos Costos Real x Mes
      </Typography>
      <Grid item xs={12} md={12}>
        <FormControl className={styles.formControl}>
          <InputLabel id="tipocosto_cvp">Tipos Costos</InputLabel>
          <Select
            labelId="selecttipocosto_cvp"
            name="tipocosto_cvp"
            id="idtipocosto_cvp"
            onChange={handleChange}
          >
            <MenuItem value="">  <em>None</em> </MenuItem>
            {
              listarTiposCostos && listarTiposCostos.map((itemselect) => {
                return (
                  <MenuItem value={itemselect.id_tcv}>{itemselect.descripcion_tcv}</MenuItem>
                )
              })
            }
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={12}>
        <TextField className={styles.inputMaterial} name="anno_cvp" label="Año" fullWidth
          onChange={handleChange} value={parametrosCostosSeleccionado && parametrosCostosSeleccionado.anno_cvp}
        />
      </Grid>
      <Grid item xs={12} md={12}>
        <TextField className={styles.inputMaterial} name="mes_cvp" label="Mes" fullWidth
          onChange={handleChange} value={parametrosCostosSeleccionado && parametrosCostosSeleccionado.mes_cvp}
        />
      </Grid>
      <Grid item xs={12} md={12}>
        <TextField className={styles.inputMaterial} name="valorcosto_cvp" label="Valor Dato Base" fullWidth
          InputLabelProps={{ shrink: true }} InputProps={{ inputComponent: NumberFormatCustom, }}
          onChange={handleChange} value={parametrosCostosSeleccionado && parametrosCostosSeleccionado.valorcosto_cvp}
        />
      </Grid>
      <br />
      <div align="right">
        <Button color="primary" onClick={() => actualizarParametrosCostos()} >Editar</Button>
        <Button onClick={() => abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  const parametroscostoEliminar = (
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar Datos Base Costos Real x Mes <b>{parametrosCostosSeleccionado && parametrosCostosSeleccionado.id_cvp}</b>? </p>
      <div align="right">
        <Button color="secondary" onClick={() => borrarParametrosCostos()}> Confirmar </Button>
        <Button onClick={() => abrirCerrarModalEliminar()}> Cancelar </Button>
      </div>
    </div>
  )

  return (
    <div className="App">
      <br />
      <Button variant="contained" startIcon={<SaveIcon />} color="primary" onClick={() => abrirCerrarModalInsertar()} >
        DATOS BASE COSTOS VARIABLES x MES
      </Button>
      <MaterialTable
        columns={columnas}
        data={listParametrosCostos}
        title="DATOS BASE COSTOS VARIABLES x MES"
        actions={[
          {
            icon: 'edit',
            tooltip: 'Editar Parametro',
            onClick: (event, rowData) => seleccionarParametrosCostos(rowData, "Editar")
          },
          {
            icon: 'delete',
            tooltip: 'Borrar Parametro',
            onClick: (event, rowData) => seleccionarParametrosCostos(rowData, "Eliminar")
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
      <Modal
        open={modalInsertar}
        onClose={abrirCerrarModalInsertar}
      >
        {parametroscostoInsertar}
      </Modal>

      <Modal
        open={modalEditar}
        onClose={abrirCerrarModalEditar}
      >
        {parametroscostoEditar}
      </Modal>

      <Modal
        open={modalEliminar}
        onClose={abrirCerrarModalEliminar}
      >
        {parametroscostoEliminar}
      </Modal>
    </div>
  );
}

export default CostosVariables;
