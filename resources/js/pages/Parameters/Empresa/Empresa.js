import React, { useEffect, useState } from "react";
import axios from "axios";
import MaterialTable from "material-table";
import { Modal, TextField, Button, Select, MenuItem, FormControl, InputLabel, Typography } from "@material-ui/core";
import { green, blue, blueGrey, red } from '@material-ui/core/colors';
import { makeStyles } from "@material-ui/core/styles";
import swal from 'sweetalert';
import Moment from 'moment';
import SaveIcon from '@material-ui/icons/Save';

import empresaServices from "../../../services/Empresa";
import paisServices from "../../../services/Parameters/Paises";
import ciudadServices from "../../../services/Parameters/Ciudades";

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
  iconos: {
    cursor: 'pointer'
  },
  inputMaterial: {
    width: '100%'
  },
  formControl: {
    margin: theme.spacing(0),
    minWidth: 415,
  },
  typography: {
    fontSize: 16,
    color   : "#ff3d00"
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

function Empresa() {
  const styles = useStyles();
  const [listarEmpresas, setListEmpresas] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [formError, setFormError] = useState(false);
  const [listarPaises, setListarPaises] = useState([]);
  const [listarCiudades, setListarCiudades] = useState([]);
  const fechaactual = Moment(new Date()).format('YYYY-MM-DD');
  const [actualiza, setActualiza] = useState(false);

  const [empresaSeleccionado, setEmpresaSeleccionado] = useState({
    'id_emp': "",
    'nombre_emp': "",
    'nit_emp': "",
    'digitochequeo_emp': "",
    'direccion_emp': "",
    'fecha_creacion_emp': "",
    'fecha_modificacion_emp': "",
    'ciudad_emp': "",
    'pais_emp': ""
  })

  useEffect(() => {
    async function fetchDataEmpresa() {
      const res = await empresaServices.listEmpresas();
      setListEmpresas(res.data);
    }
    setActualiza(false);
    fetchDataEmpresa();
  }, [actualiza])

  useEffect(() => {
    async function fetchDataPais() {
      const res = await paisServices.listPaises();
      console.log(res.data);
      setListarPaises(res.data)
      console.log(listarPaises);
    }
    fetchDataPais();
  }, [])

  useEffect(() => {
    async function fetchDataCiudad() {
      const res = await ciudadServices.listCiudades();
      setListarCiudades(res.data)
      //console.log(res.data);
    }
    fetchDataCiudad();
  }, [])

  const handleChange = e => {
    const { name, value } = e.target;

    setEmpresaSeleccionado(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const seleccionarEmpresa = (empresa, caso) => {
    setEmpresaSeleccionado(empresa);
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

  const grabarEmpresa = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;

    if (!empresaSeleccionado.nombre_emp) {
      errors.nombre_emp = true;
      formOk = false;
    }

    if (!empresaSeleccionado.nit_emp) {
      errors.nit_emp = true;
      formOk = false;
    }

    if (!empresaSeleccionado.digitochequeo_emp) {
      errors.digitochequeo_emp = true;
      formOk = false;
    }

    if (!empresaSeleccionado.direccion_emp) {
      errors.direccion_emp = true;
      formOk = false;
    }

    if (!empresaSeleccionado.fecha_creacion_emp) {
      errors.fecha_creacion_emp = true;
      formOk = false;
    }

    if (!empresaSeleccionado.fecha_modificacion_emp) {
      errors.fecha_modificacion_emp = true;
      formOk = false;
    }

    if (!empresaSeleccionado.ciudad_emp) {
      errors.ciudad_emp = true;
      formOk = false;
    }
/*
    if (!empresaSeleccionado.pais_emp) {
      errors.pais_emp = true;
      formOk = false;
    }
*/
    setFormError(errors);

    if (formOk) {
      const res = await empresaServices.save(empresaSeleccionado);

      if (res.success) {
       swal({
          title: "Empresa",
          text: "Creada de forma Correcta!",
          icon: "success",
          button: "Aceptar"
        });
        console.log(res.message)
        abrirCerrarModalInsertar();

        delete empresaSeleccionado.id;
        delete empresaSeleccionado.nombre_emp;
        delete empresaSeleccionado.nit_emp;
        delete empresaSeleccionado.digitochequeo_emp;
        delete empresaSeleccionado.direccion_emp;
        delete empresaSeleccionado.fecha_creacion_emp;
        delete empresaSeleccionado.fecha_modificación_emp;
        delete empresaSeleccionado.ciudad_emp;
        delete empresaSeleccionado.pais_emp;
      } else {
        swal({
          title: "Empresa",
          text: "Error Creaando la Empresa!",
          icon: "error",
          button: "Aceptar"
        });
        console.log(res.message);
        abrirCerrarModalInsertar();
      }
    }
    else {
      swal({
        title: "Empresa",
        text: "Debe Ingresar Todos los Datos, Error Creando la Empresa!",
        icon: "warning",
        button: "Aceptar"
      });
      console.log(res.message);
      abrirCerrarModalInsertar();
    }
    setActualiza(true);
  }

  const actualizarEmpresa = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;

    if (!empresaSeleccionado.nombre_emp) {
      errors.nombre_emp = true;
      formOk = false;
    }

    if (!empresaSeleccionado.nit_emp) {
      errors.nit_emp = true;
      formOk = false;
    }

    if (!empresaSeleccionado.digitochequeo_emp) {
      errors.digitochequeo_emp = true;
      formOk = false;
    }

    if (!empresaSeleccionado.direccion_emp) {
      errors.direccion_emp = true;
      formOk = false;
    }

    if (!empresaSeleccionado.fecha_creacion_emp) {
      errors.fecha_creacion_emp = true;
      formOk = false;
    }

    if (!empresaSeleccionado.fecha_modificacion_emp) {
      errors.fecha_modificacion_emp = true;
      formOk = false;
    }

    if (!empresaSeleccionado.ciudad_emp) {
      errors.ciudad_emp = true;
      formOk = false;
    }
/*
    if (!empresaSeleccionado.pais_emp) {
      errors.pais_emp = true;
      formOk = false;
    }
*/
    setFormError(errors);

    if (formOk) {
      const res = await empresaServices.update(empresaSeleccionado);

      if (res.success) {
        swal({
          title: "Empresa",
          text: "Actualizada de forma Correcta!",
          icon: "success",
          button: "Aceptar"
        });
        console.log(res.message)
        abrirCerrarModalEditar();
        delete empresaSeleccionado.id_emp;
        delete empresaSeleccionado.nombre_emp;
        delete empresaSeleccionado.nit_emp;
        delete empresaSeleccionado.digitochequeo_emp;
        delete empresaSeleccionado.direccion_emp;
        delete empresaSeleccionado.fecha_creacion_emp;
        delete empresaSeleccionado.fecha_modificación_emp;
        delete empresaSeleccionado.ciudad_emp;
        delete empresaSeleccionado.pais_emp;
      } else {
        swal({
          title: "Empresa",
          text: "Error Actualizando la Empresa!",
          icon: "error",
          button: "Aceptar"
        });
        console.log(res.message);
        abrirCerrarModalEditar();
      }
    }
    else {;
      swal({
        title: "Empresa",
        text: "Debe Ingresar Todos los Datos, Error Actualizando la Empresa!",
        icon: "warning",
        button: "Aceptar"
      });
      console.log(res.message);
      abrirCerrarModalEditar();
    }
    setActualiza(true);
  }

  const borrarEmpresa = async () => {

    const res = await empresaServices.delete(empresaSeleccionado.id_emp);

    if (res.success) {
      swal({
        title: "Empresa",
        text: "Borrada de forma Correcta!",
        icon: "success",
        button: "Aceptar"
      });
      console.log(res.message)
      abrirCerrarModalEliminar();
    }
    else {
      swal({
        title: "Empresa",
        text: "Error Borrando la Empresa!",
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
      title: 'Codigo',
      field: 'id_emp'
    },
    {
      title: 'Nombre',
      field: 'nombre_emp'
    },
    {
      title: 'Nit',
      field: 'nit_emp'
    },
    {
      title: 'Digito Chequeo',
      field: 'digitochequeo_emp'
    },
    {
      title: 'Direccion',
      field: 'direccion_emp'
    },
    {
      title: 'Fecha Creación',
      field: 'fecha_creacion_emp',
      type: 'date'
    },
    {
      title: 'Fecha Modificación',
      field: 'fecha_modificacion_emp',
      type: 'date'
    },
    {
      title: 'Codigo',
      field: 'codigo_ciu'
    },
    {
      title: 'Descripción',
      field: 'nombre_ciu'
    }
  ]

  const empresaInsertar = (
    <div className={styles.modal}>
      <Typography  align="center" className={ styles.typography } variant="button" display="block" >
        Agregar Nueva Empresa
      </Typography>
      <TextField className={styles.inputMaterial} label="Nombre" name="nombre_emp" onChange={handleChange} />
      <br />
      <TextField className={styles.inputMaterial} label="Nit" name="nit_emp" onChange={handleChange} />
      <br />
      <TextField className={styles.inputMaterial} label="Digito Chequeo" name="digitochequeo_emp" onChange={handleChange} />
      <br />
      <TextField className={styles.inputMaterial} label="Dirección" name="direccion_emp" onChange={handleChange} />
      <br />
      <TextField className={styles.inputMaterial} label="Fecha Creación" name="fecha_creacion_emp" onChange={handleChange} />
      <br />
      <TextField className={styles.inputMaterial} label="Fecha Modificación" name="fecha_modificacion_emp" onChange={handleChange} />

      <br />
      <FormControl className={styles.formControl}>
        <InputLabel id="idselectCiudad">Ciudad</InputLabel>
        <Select
          labelId="selectCiudad"
          name="ciudad_emp"
          id="idselectCiudad"
          onChange={handleChange}
        >
          <MenuItem value="">  <em>None</em> </MenuItem>
          {
            listarCiudades.map((itemselect) => {
              return (
                <MenuItem value={itemselect.id_ciu}>{itemselect.nombre_ciu}</MenuItem>
              )
            })
          }
        </Select>
      </FormControl>
      <br />
      <div align="right">
        <Button className={styles.button} color="primary" onClick={() => grabarEmpresa()} >Insertar</Button>
        <Button className={styles.button2} onClick={() => abrirCerrarModalInsertar()} >Cancelar</Button>
      </div>
    </div>
  )

  const empresaEditar = (
    <div className={styles.modal}>
      <Typography  align="center" className={ styles.typography } variant="button" display="block" >
      Actualizar Datos de la Empresa
      </Typography>
      <TextField className={styles.inputMaterial} label="Nombre" name="nombre_emp" onChange={handleChange} value={empresaSeleccionado && empresaSeleccionado.nombre_emp} />
      <br />
      <TextField className={styles.inputMaterial} label="Nit" name="nit_emp" onChange={handleChange} value={empresaSeleccionado && empresaSeleccionado.nit_emp} />
      <br />
      <TextField className={styles.inputMaterial} label="Digito Chequeo" name="digitochequeo_emp" onChange={handleChange} value={empresaSeleccionado && empresaSeleccionado.digitochequeo_emp} />
      <br />
      <TextField className={styles.inputMaterial}  label="Dirección" name="direccion_emp" onChange={handleChange} value={empresaSeleccionado && empresaSeleccionado.direccion_emp} />
      <br />
      <TextField 
        className={styles.inputMaterial} type="date" InputLabelProps={{ shrink: true }} label="Fecha Creación"
        name="fecha_creacion_emp" defaultValue={Moment(empresaSeleccionado.fecha_creacion_emp).format('YYYY-MM-DD')}
        onChange={handleChange}
      />
      <br />
      <TextField 
        className={styles.inputMaterial} type="date" InputLabelProps={{ shrink: true }} label="Fecha Modificación"
        name="fecha_modificacion_emp" defaultValue={Moment(empresaSeleccionado.fecha_modificacion_emp).format('YYYY-MM-DD')}
        onChange={handleChange}
      />
      <br />
      <FormControl className={styles.formControl}>
        <InputLabel id="idselectCiudad">Ciudad</InputLabel>
        <Select
          labelId="selectCiudad"
          name="ciudad_emp"
          id="idselectCiudad"
          onChange={handleChange}
          value={empresaSeleccionado && empresaSeleccionado.ciudad_emp}
        >
          <MenuItem value="">  <em>None</em> </MenuItem>
          {
            listarCiudades.map((itemselect) => {
              return (
                <MenuItem value={itemselect.id_ciu}>{itemselect.nombre_ciu}</MenuItem>
              )
            })
          }
        </Select>
      </FormControl>
      <br/>
      <div align="right">
        <Button className={styles.button} color="primary" onClick={() => actualizarEmpresa()} >Editar</Button>
        <Button className={styles.button2} onClick={() => abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  const empresaEliminar = (
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar la Empresa <b>{empresaSeleccionado && empresaSeleccionado.nombre_emp}</b>? </p>
      <div align="right">
        <Button className={styles.button} className={styles.button} color="secondary" onClick={() => borrarEmpresa()}> Confirmar </Button>
        <Button className={styles.button2} className={styles.button2} onClick={() => abrirCerrarModalEliminar()}> Cancelar </Button>
      </div>
    </div>
  )

  return (
    <div className="App">
      <br />
      <Button variant="contained" startIcon={<SaveIcon />} color="primary" onClick={() => abrirCerrarModalInsertar()} >Agregar Empresa</Button>
      <MaterialTable
        columns={columnas}
        data={listarEmpresas}
        title="MAESTRA DE EMPRESA"
        actions={[
          {
            icon: 'edit',
            tooltip: 'Editar Empresa',
            onClick: (event, rowData) => seleccionarEmpresa(rowData, "Editar")
          },
          {
            icon: 'delete',
            tooltip: 'Borrar Empresa',
            onClick: (event, rowData) => seleccionarEmpresa(rowData, "Eliminar")
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
        {empresaInsertar}
      </Modal>

      <Modal
        open={modalEditar}
        onClose={abrirCerrarModalEditar}
      >
        {empresaEditar}
      </Modal>

      <Modal
        open={modalEliminar}
        onClose={abrirCerrarModalEliminar}
      >
        {empresaEliminar}
      </Modal>
    </div>
  );
}

export default Empresa;