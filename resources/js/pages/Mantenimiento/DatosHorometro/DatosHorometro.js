import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import PropTypes from 'prop-types';
import { Modal, Button, TextField, Select, MenuItem, FormControl, InputLabel, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from '@material-ui/icons/Save';
import swal from 'sweetalert';
import NumberFormat from 'react-number-format';

import datoshorometroServices from "../../../services/Mantenimiento/DatosHorometro";
import equiposServices from "../../../services/Mantenimiento/Equipos";

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

function DatosHorometro() {
  const styles = useStyles();
  const [listDatosHorometro, setListDatosHorometro] = useState([]);
  const [validar, setValidar] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [formError, setFormError] = useState(false);
  const [listarEquipos, setListarEquipos] = useState([]);
  const [datosHorometroSeleccionado, setDatosHorometroSeleccionado] = useState({
    id_dhr: "",
    codigoequipo_dhr: "",
    valorhorometro_dhr: ""
  })

  useEffect(() => {
    async function fetchDataHorometro() {
      const res = await datoshorometroServices.listdatoshorometro();
      setListDatosHorometro(res.data);
      setValidar(res.data);
    }
    fetchDataHorometro();
  }, [])

  useEffect(() => {
    async function fetchDataEquipos() {
      const res = await equiposServices.listEquipos();
      setListarEquipos(res.data);
    }
    fetchDataEquipos();
  }, [])

  const handleChange = e => {
    const { name, value } = e.target;

    setDatosHorometroSeleccionado(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const seleccionarHorometro = (datoshorometro, caso) => {
    setDatosHorometroSeleccionado(datoshorometro);
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



  const grabarHorometro = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;

    if (!datosHorometroSeleccionado.codigoequipo_dhr) {
      errors.codigoequipo_dhr = true;
      formOk = false;
    }

    if (!datosHorometroSeleccionado.valorhorometro_dhr) {
      errors.valorhorometro_dhr = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
      const res = await datoshorometroServices.save(datosHorometroSeleccionado);

      if (res.success) {
        swal({
          title: "Datos Horometro",
          text: "Control Horometro Creado de forma Correcta!",
          icon: "success",
          button: "Aceptar"
        });
        console.log(res.message)
        abrirCerrarModalInsertar();
        delete datosHorometroSeleccionado.codigoequipo_dhr;
        delete datosHorometroSeleccionado.valorhorometro_dhr;
      } else {
        swal({
          title: "Datos Horometro",
          text: "Error Creando el Control Horometro!",
          icon: "error",
          button: "Aceptar"
        });
        console.log(res.message);
        abrirCerrarModalInsertar();
      }
    }
    else {
      swal({
        title: "Datos Horometro",
        text: "Debe ingresar todos los datos, Error creando el Control Horometro!",
        icon: "warning",
        button: "Aceptar"
      });
      console.log(res.message);
      abrirCerrarModalInsertar();
    }
  }

  const actualizarHorometro = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;

    if (!datosHorometroSeleccionado.codigoequipo_dhr) {
      errors.codigoequipo_dhr = true;
      formOk = false;
    }

    if (!datosHorometroSeleccionado.valorhorometro_dhr) {
      errors.valorhorometro_dhr = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {

      const res = await datoshorometroServices.update(datosHorometroSeleccionado);
      console.log(datosHorometroSeleccionado);

      if (res.success) {
        swal({
          title: "Datos Horometro",
          text: "Control Horometro Actualizado de forma Correcta!",
          icon: "success",
          button: "Aceptar"
        });
        console.log(res.message)
        abrirCerrarModalEditar();
        delete datosHorometroSeleccionado.codigoequipo_dhr;
        delete datosHorometroSeleccionado.valorhorometro_dhr;
      } else {
        alert("");
        swal({
          title: "Datos Horometro",
          text: "Error Actualizando el Control Horometro!",
          icon: "error",
          button: "Aceptar"
        });
        console.log(res.message);
        abrirCerrarModalEditar();
      }
    }
    else {
      c
      console.log(res.message);
      abrirCerrarModalEditar();
    }
  }

  const borrarHorometro = async () => {

    const res = await datoshorometroServices.delete(datosHorometroSeleccionado.id_pai);

    if (res.success) {
      swal({
        title: "Datos Horometro",
        text: "Control Horometro Borrada de forma Correcta!",
        icon: "success",
        button: "Aceptar"
      });
      console.log(res.message)
      abrirCerrarModalEliminar();
    }
    else {
      swal({
        title: "Datos Horometro",
        text: "Error brorrando el Control Horometro!",
        icon: "error",
        button: "Aceptar"
      });
      console.log(res.message);
      abrirCerrarModalEliminar();
    }
  }

  const columnas = [
    {
      title: 'Id',
      field: 'id_dhr',
      type: 'number'
    },
    {
      title: 'Codigo',
      field: 'codigo_equ'
    },
    {
      title: 'Descripción',
      field: 'descripcion_equ'
    },
    {
      title: 'Valor Horometro',
      field: 'valorhorometro_dhr'
    }
  ]

  const horometroInsertar = (
    <div className={styles.modal}>
      <Typography align="center" className={styles.typography} variant="button" display="block" >
        Agregar Control Horometro
      </Typography>
      <Grid item xs={12} md={12}>
        <FormControl className={styles.formControl}>
          <InputLabel id="idscodigoequipo_dhr">Equipo</InputLabel>
          <Select
            labelId="selectcodigoequipo_dhr"
            name="codigoequipo_dhr"
            id="idcodigoequipo_dhr"
            onChange={handleChange}
          >
            <MenuItem value="">  <em>None</em> </MenuItem>
            {
              listarEquipos.map((itemselect) => {
                return (
                  <MenuItem value={itemselect.id_equ}>{itemselect.codigo_equ}</MenuItem>
                )
              })
            }
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={12}>
        <TextField className={styles.inputMaterial} name="valorhorometro_dhr" label="Valor Horometro" fullWidth
          InputLabelProps={{ shrink: true }} InputProps={{ inputComponent: NumberFormatCustom, }}
          onChange={handleChange} value={datosHorometroSeleccionado && datosHorometroSeleccionado.valorhorometro_dhr}
        />
      </Grid>
      <br />
      <div align="right">
        <Button color="primary" onClick={() => grabarHorometro()} >Insertar</Button>
        <Button onClick={() => abrirCerrarModalInsertar()} >Cancelar</Button>
      </div>
    </div>
  )

  const horometroEditar = (
    <div className={styles.modal}>
      <Typography align="center" className={styles.typography} variant="button" display="block" >
        Actualizar Control Horometro
      </Typography>
      <Grid item xs={12} md={12}>
        <FormControl className={styles.formControl}>
          <InputLabel id="idscodigoequipo_dhr">Equipo</InputLabel>
          <Select
            labelId="selectcodigoequipo_dhr"
            name="codigoequipo_dhr"
            id="idcodigoequipo_dhr"
            onChange={handleChange}
            value={datosHorometroSeleccionado && datosHorometroSeleccionado.codigoequipo_dhr}
          >
            <MenuItem value="">  <em>None</em> </MenuItem>
            {
              listarEquipos.map((itemselect) => {
                return (
                  <MenuItem value={itemselect.id_equ}>{itemselect.codigo_equ}</MenuItem>
                )
              })
            }
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={12}>
        <TextField className={styles.inputMaterial} name="valorhorometro_dhr" label="Valor Horometro" fullWidth
          InputLabelProps={{ shrink: true }} InputProps={{ inputComponent: NumberFormatCustom, }}
          onChange={handleChange} value={datosHorometroSeleccionado && datosHorometroSeleccionado.valorhorometro_dhr}
        />
      </Grid>
      <br />
      <div align="right">
        <Button color="primary" onClick={() => actualizarHorometro()} >Editar</Button>
        <Button onClick={() => abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  const horometroEliminar = (
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar Control Horometro <b>{datosHorometroSeleccionado && datosHorometroSeleccionado.codigoequipo_dhr}</b>? </p>
      <div align="right">
        <Button color="secondary" onClick={() => borrarHorometro()}> Confirmar </Button>
        <Button onClick={() => abrirCerrarModalEliminar()}> Cancelar </Button>

      </div>

    </div>
  )

  return (
    <div className="App">
      <br />
      <Button variant="contained" startIcon={<SaveIcon />} color="primary" onClick={() => abrirCerrarModalInsertar()} >
        Grabar Control Horometro
      </Button>
      <MaterialTable
        columns={columnas}
        data={listDatosHorometro}
        title="CONTROL VALOR HOROMETRO"
        actions={[
          {
            icon: 'edit',
            tooltip: 'Editar Horometro',
            onClick: (event, rowData) => seleccionarHorometro(rowData, "Editar")
          },
          {
            icon: 'delete',
            tooltip: 'Borrar Horometro',
            onClick: (event, rowData) => seleccionarHorometro(rowData, "Eliminar")
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
        {horometroInsertar}
      </Modal>

      <Modal
        open={modalEditar}
        onClose={abrirCerrarModalEditar}
      >
        {horometroEditar}
      </Modal>

      <Modal
        open={modalEliminar}
        onClose={abrirCerrarModalEliminar}
      >
        {horometroEliminar}
      </Modal>
    </div>
  );
}

export default DatosHorometro;
