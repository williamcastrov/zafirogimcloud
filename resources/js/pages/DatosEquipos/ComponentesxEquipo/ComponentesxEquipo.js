import React, { useEffect, useState } from "react";
import axios from "axios";
import MaterialTable from "material-table";
import { Modal, TextField, Button, Select, MenuItem, FormControl, InputLabel, Grid, ButtonGroup, Typography } from "@material-ui/core";
import { green, blue, blueGrey, red } from '@material-ui/core/colors';
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from '@material-ui/icons/Save';

//Estilos 
import "./ComponentesxEquipo.css";

// Componentes de Conexion con el Backend
import componentesServices from "../../../services/Mantenimiento/ComponentesxEquipo"
import estadosServices from "../../../services/Parameters/Estados";
import equiposServices from "../../../services/Mantenimiento/Equipos";
import clientesServices from "../../../services/Interlocutores/Clientes";

const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width:  600,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  modalcomponente: {
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
    minWidth: 380,
    maxWidth: 380,
  },
  formControl2: {
    margin: theme.spacing(0),
    minWidth: 160,
    maxWidth: 160,
  },
  formControl3: {
    margin: theme.spacing(0),
    minWidth: 335,
    maxWidth: 335,
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
  typography: {
    fontSize: 16,
    color: "#ff3d00"
  },
}));

function ComponentesxEquipo(props) {
  const { equipoID, equipoCodigo } = props;

  const styles = useStyles();
  const [listarComponentes, setListarComponentes] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [formError, setFormError] = useState(false);
  const [listarEstados, setListarEstados] = useState([]);
  const [listarEquipos, setListarEquipos] = useState([]);
  const [listarClientes, setListarClientes] = useState([]);
  const [actualiza, setActualiza] = useState(false);
  const [componentesSeleccionado, setComponentesSeleccionado] = useState({
    id_com: "",
    equipo_com: equipoID,
    cliente_com: "",
    camara_com: "",
    idcamara_com: "",
    sensordeimpacto_com: "",
    idsensordeimpacto_com: "",
    alarmadesplazamiento_com: "",
    luzestrober_com: "",
    lucespuntoazul_com: "",
    lucesreflectoras_com: "",
    estado_com: ""
  })

  useEffect(() => {
    async function fetchDataComponentes() {
      const res = await componentesServices.listuncomponentexequipo(equipoID);
      console.log("Datos Retornados : ", res.data)
      setListarComponentes(res.data);
      setActualiza(false);
    }
    fetchDataComponentes();
  }, [actualiza])

  useEffect(() => {
    async function fetchDataClientes() {
      const res = await clientesServices.listClientes();
      setListarClientes(res.data)
      console.log(res.data);
    }
    fetchDataClientes();
  }, [])

  useEffect(() => {
    async function fetchDataEstados() {
      const res = await estadosServices.listEstadosGenerales();
      setListarEstados(res.data)
      //console.log(res.data);
    }
    fetchDataEstados();
  }, [])

  const handleChange = e => {
    const { name, value } = e.target;

    setComponentesSeleccionado(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const seleccionarComponente = (componente, caso) => {
    setComponentesSeleccionado(componente);
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

  const grabarComponente = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;

    if (!componentesSeleccionado.equipo_com) {
      alert("1")
      errors.equipo_Com = true;
      formOk = false;
    }

    if (!componentesSeleccionado.cliente_com) {
      alert("2")
      errors.cliente_com = true;
      formOk = false;
    }

    if (!componentesSeleccionado.camara_com) {
      alert("3")
      errors.camara_com = true;
      formOk = false;
    }

    if (!componentesSeleccionado.idcamara_com) {
      alert("4")
      errors.idcamara_com = true;
      formOk = false;
    }

    if (!componentesSeleccionado.sensordeimpacto_com) {
      alert("5")
      errors.sensordeimpacto_com = true;
      formOk = false;
    }

    if (!componentesSeleccionado.idsensordeimpacto_com) {
      alert("6")
      errors.idsensordeimpacto_com = true;
      formOk = false;
    }

    if (!componentesSeleccionado.alarmadesplazamiento_com) {
      alert("6")
      errors.alarmadesplazamiento_com = true;
      formOk = false;
    }

    if (!componentesSeleccionado.luzestrober_com) {
      alert("7")
      errors.luzestrober_com = true;
      formOk = false;
    }

    if (!componentesSeleccionado.lucespuntoazul_com) {
      alert("8")
      errors.lucespuntoazul_com = true;
      formOk = false;
    }

    if (!componentesSeleccionado.lucesreflectoras_com) {
      alert("9")
      errors.lucesreflectoras_com = true;
      formOk = false;
    }

    if (!componentesSeleccionado.estado_com) {
      alert("10")
      errors.estado_com = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
      //console.log(componentesSeleccionado);
      const res = await componentesServices.save(componentesSeleccionado);

      if (res.success) {
        swal("Componente x Equipo", "Creado de forma Correcta!", "success", { button: "Aceptar" });
        console.log(res.message)
        abrirCerrarModalInsertar();
      } else {
        swal("Componente x Equipo", "Error Creando Componente Equipo!", "error", { button: "Aceptar" });
        console.log(componentesSeleccionado);
        console.log(res.message);
        abrirCerrarModalInsertar();
      }
    }
    else {
      swal("Componente x Equipo", "Debe Ingresar Todos los Datos, Error Creando Componente del  Equipo!", "warning", { button: "Aceptar" });
      console.log(componentesSeleccionado);
      console.log(res.message);
      abrirCerrarModalInsertar();
    }
    setActualiza(true);
  }

  const actualizarComponente = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;

    if (!componentesSeleccionado.equipo_com) {
      alert("1")
      errors.equipo_Com = true;
      formOk = false;
    }

    if (!componentesSeleccionado.cliente_com) {
      alert("2")
      errors.cliente_com = true;
      formOk = false;
    }

    if (!componentesSeleccionado.camara_com) {
      alert("3")
      errors.camara_com = true;
      formOk = false;
    }

    if (!componentesSeleccionado.idcamara_com) {
      alert("4")
      errors.idcamara_com = true;
      formOk = false;
    }

    if (!componentesSeleccionado.sensordeimpacto_com) {
      alert("5")
      errors.sensordeimpacto_com = true;
      formOk = false;
    }

    if (!componentesSeleccionado.idsensordeimpacto_com) {
      alert("6")
      errors.idsensordeimpacto_com = true;
      formOk = false;
    }

    if (!componentesSeleccionado.alarmadesplazamiento_com) {
      alert("6")
      errors.alarmadesplazamiento_com = true;
      formOk = false;
    }

    if (!componentesSeleccionado.luzestrober_com) {
      alert("7")
      errors.luzestrober_com = true;
      formOk = false;
    }

    if (!componentesSeleccionado.lucespuntoazul_com) {
      alert("8")
      errors.lucespuntoazul_com = true;
      formOk = false;
    }

    if (!componentesSeleccionado.lucesreflectoras_com) {
      alert("9")
      errors.lucesreflectoras_com = true;
      formOk = false;
    }

    if (!componentesSeleccionado.estado_com) {
      alert("10")
      errors.estado_com = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {

      const res = await componentesServices.update(componentesSeleccionado);

      if (res.success) {
        swal("Componente x Equipo", "Tipo de Ubicación del Equipo actualizado de forma Correcta!", "success", { button: "Aceptar" });
        console.log(res.message)
        abrirCerrarModalEditar();
        delete componentesSeleccionado.cliente_com;
        delete componentesSeleccionado.direccion_com;
        delete componentesSeleccionado.ciudad_com;
        delete componentesSeleccionado.estado_com;
      } else {
        swal("Componente x Equipo", "Error Actualizando el Tipo de Ubicación del  Equipo!", "error", { button: "Aceptar" });
        console.log(res.message);
        abrirCerrarModalEditar();
      }
    }
    else {
      swal("Componente x Equipo", "Debe Ingresar Todos los Datos, Error Actualizando el Tipo de Ubicación del Equipo!", "warning", { button: "Aceptar" });
      console.log(res.message);
      abrirCerrarModalEditar();
    }
    setActualiza(true);
  }

  const borrarComponente = async () => {
    const res = await componentesServices.delete(componentesSeleccionado.id_com);

    if (res.success) {
      swal("Componente x Equipo", "El Tipo de Ubicación del Equipo Borrada de forma Correcta!", "success", { button: "Aceptar" });
      console.log(res.message)
      abrirCerrarModalEliminar();
    }
    else {
      swal("Componente x Equipo", "Error Borrando el Tipo de Ubicación del Equipo!", "error", { button: "Aceptar" });
      console.log(res.message);
      abrirCerrarModalEliminar();
    }
    setActualiza(true);
  }
  // "string","boolean","numeric","date","datetime","time","currency"
  const columnas = [
    {
      title: 'Equipo',
      field: 'codigo_equ',
      cellStyle: { minWidth: 50 }
    },
    {
      title: 'Descripción',
      field: 'descripcion_equ',
      cellStyle: { minWidth: 250 }
    },
    {
      title: 'Cliente',
      field: 'razonsocial_cli',
      cellStyle: { minWidth: 250 }
    },
    {
      title: 'Camara',
      field: 'camara_com'
    },
    {
      title: 'IDCamara',
      field: 'idcamara_com'
    },
    {
      title: 'Sensor',
      field: 'sensordeimpacto_com'
    },
    {
      title: 'IDSensor',
      field: 'idsensordeimpacto_com'
    },
    {
      title: 'Alarma',
      field: 'alarmadesplazamiento_com'
    },
    {
      title: 'Luz Estrober',
      field: 'luzestrober_com'
    },
    {
      title: 'Luz Punto Azul',
      field: 'lucespuntoazul_com'
    },
    {
      title: 'Luz Reflectora',
      field: 'lucesreflectoras_com'
    },
    {
      title: 'Estado',
      field: 'nombre_est'
    }
  ]

  const componenteInsertar = (
    <div className={styles.modal}>
      <Typography align="center" className={styles.typography} variant="button" display="block" >
        Agregar Componente Equipo
      </Typography>
      <Grid container spacing={2} >
        <Grid item xs={12} md={3}>
          <TextField className={styles.inputMaterial} label="ID Equipo" name="equipo_com" onChange={handleChange}
            defaultValue={equipoID} disabled="true" />
        </Grid>
        <Grid item xs={12} md={9}>
          <FormControl className={styles.formControl}>
            <InputLabel id="cliente_com">Cliente</InputLabel>
            <Select
              labelId="selectcliente_com"
              name="cliente_com"
              id="idselectcliente_com"
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
        <Grid item xs={12} md={4}>
          <FormControl className={styles.formControl2}>
            <InputLabel id="camara_com">Camara</InputLabel>
            <Select
              labelId="selectcamara_com"
              name="camara_com"
              id="idselectcamara_com"
              onChange={handleChange}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              <MenuItem value="SI"> <em>SI</em> </MenuItem>
              <MenuItem value="NO"> <em>NO</em> </MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={8}>
          <TextField className={styles.inputMaterial} label="ID Camara" name="idcamara_com" onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl className={styles.formControl2}>
            <InputLabel id="sensordeimpacto_com">Sensor de Impacto</InputLabel>
            <Select
              labelId="selectsensordeimpacto_com"
              name="sensordeimpacto_com"
              id="idselectsensordeimpacto_com"
              onChange={handleChange}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              <MenuItem value="SI"> <em>SI</em> </MenuItem>
              <MenuItem value="NO"> <em>NO</em> </MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={8}>
          <TextField className={styles.inputMaterial} label="ID Sensor de Impacto" name="idsensordeimpacto_com" onChange={handleChange} />
        </Grid>

        <Grid item xs={12} md={4}>
          <FormControl className={styles.formControl2}>
            <InputLabel id="alarmadesplazamiento_com">Alarma Desplazamiento</InputLabel>
            <Select
              labelId="selectalarmadesplazamiento_com"
              name="alarmadesplazamiento_com"
              id="idselectalarmadesplazamiento_com"
              onChange={handleChange}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              <MenuItem value="SI"> <em>SI</em> </MenuItem>
              <MenuItem value="NO"> <em>NO</em> </MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl className={styles.formControl2}>
            <InputLabel id="luzestrober_com">Luz Estrober</InputLabel>
            <Select
              labelId="selectluzestrober_com"
              name="luzestrober_com"
              id="idselectluzestrober_com"
              onChange={handleChange}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              <MenuItem value="SI"> <em>SI</em> </MenuItem>
              <MenuItem value="NO"> <em>NO</em> </MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl className={styles.formControl2}>
            <InputLabel id="lucespuntoazul_com">Luces Punto Azul</InputLabel>
            <Select
              labelId="selectlucespuntoazul_com"
              name="lucespuntoazul_com"
              id="idselectlucespuntoazul_com"
              onChange={handleChange}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              <MenuItem value="SI"> <em>SI</em> </MenuItem>
              <MenuItem value="NO"> <em>NO</em> </MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl className={styles.formControl2}>
            <InputLabel id="lucesreflectoras_com">Luces Reflectoras</InputLabel>
            <Select
              labelId="selectlucesreflectoras_com"
              name="lucesreflectoras_com"
              id="idselectlucesreflectoras_com"
              onChange={handleChange}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              <MenuItem value="SI"> <em>SI</em> </MenuItem>
              <MenuItem value="NO"> <em>NO</em> </MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={8}>
          <FormControl className={styles.formControl3}>
            <InputLabel id="estado_com">Estado</InputLabel>
            <Select
              labelId="selectestado_com"
              name="estado_com"
              id="idselectestado_com"
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
      </Grid>
      <br /><br />
      <div align="right">
        <Button className={styles.button} color="primary" onClick={() => grabarComponente()} >Insertar</Button>
        <Button className={styles.button2} onClick={() => abrirCerrarModalInsertar()} >Cancelar</Button>
      </div>
    </div>
  )

  const componenteEditar = (
    <div className={styles.modal}>
      <Typography align="center" className={styles.typography} variant="button" display="block" >
        Actualizar Componente Equipo
      </Typography>
      <Grid container spacing={2} >
        <Grid item xs={12} md={3}>
          <TextField className={styles.inputMaterial} label="ID Equipo" name="equipo_com" onChange={handleChange}
            defaultValue={equipoID} disabled="true" value={componentesSeleccionado && componentesSeleccionado.equipo_com} />
        </Grid>
        <Grid item xs={12} md={9}>
          <FormControl className={styles.formControl}>
            <InputLabel id="cliente_com">Cliente</InputLabel>
            <Select
              labelId="selectcliente_com"
              name="cliente_com"
              id="idselectcliente_com"
              onChange={handleChange}
              value={componentesSeleccionado && componentesSeleccionado.cliente_com}
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
        <Grid item xs={12} md={4}>
          <FormControl className={styles.formControl2}>
            <InputLabel id="camara_com">Camara</InputLabel>
            <Select
              labelId="selectcamara_com"
              name="camara_com"
              id="idselectcamara_com"
              onChange={handleChange}
              value={componentesSeleccionado && componentesSeleccionado.camara_com}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              <MenuItem value="SI"> <em>SI</em> </MenuItem>
              <MenuItem value="NO"> <em>NO</em> </MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={8}>
          <TextField className={styles.inputMaterial} label="ID Camara" name="idcamara_com" onChange={handleChange}
          value={componentesSeleccionado && componentesSeleccionado.idcamara_com} />
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl className={styles.formControl2}>
            <InputLabel id="sensordeimpacto_com">Sensor de Impacto</InputLabel>
            <Select
              labelId="selectsensordeimpacto_com"
              name="sensordeimpacto_com"
              id="idselectsensordeimpacto_com"
              onChange={handleChange}
              value={componentesSeleccionado && componentesSeleccionado.sensordeimpacto_com}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              <MenuItem value="SI"> <em>SI</em> </MenuItem>
              <MenuItem value="NO"> <em>NO</em> </MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={8}>
          <TextField className={styles.inputMaterial} label="ID Sensor de Impacto" name="idsensordeimpacto_com" onChange={handleChange} 
                     value={componentesSeleccionado && componentesSeleccionado.idsensordeimpacto_com} />
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl className={styles.formControl2}>
            <InputLabel id="alarmadesplazamiento_com">Alarma Desplazamiento</InputLabel>
            <Select
              labelId="selectalarmadesplazamiento_com"
              name="alarmadesplazamiento_com"
              id="idselectalarmadesplazamiento_com"
              onChange={handleChange}
              value={componentesSeleccionado && componentesSeleccionado.alarmadesplazamiento_com} 
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              <MenuItem value="SI"> <em>SI</em> </MenuItem>
              <MenuItem value="NO"> <em>NO</em> </MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl className={styles.formControl2}>
            <InputLabel id="luzestrober_com">Luz Estrober</InputLabel>
            <Select
              labelId="selectluzestrober_com"
              name="luzestrober_com"
              id="idselectluzestrober_com"
              onChange={handleChange}
              value={componentesSeleccionado && componentesSeleccionado.luzestrober_com} 
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              <MenuItem value="SI"> <em>SI</em> </MenuItem>
              <MenuItem value="NO"> <em>NO</em> </MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl className={styles.formControl2}>
            <InputLabel id="lucespuntoazul_com">Luces Punto Azul</InputLabel>
            <Select
              labelId="selectlucespuntoazul_com"
              name="lucespuntoazul_com"
              id="idselectlucespuntoazul_com"
              onChange={handleChange}
              value={componentesSeleccionado && componentesSeleccionado.lucespuntoazul_com} 
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              <MenuItem value="SI"> <em>SI</em> </MenuItem>
              <MenuItem value="NO"> <em>NO</em> </MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl className={styles.formControl2}>
            <InputLabel id="lucesreflectoras_com">Luces Reflectoras</InputLabel>
            <Select
              labelId="selectlucesreflectoras_com"
              name="lucesreflectoras_com"
              id="idselectlucesreflectoras_com"
              onChange={handleChange}
              value={componentesSeleccionado && componentesSeleccionado.lucesreflectoras_com} 
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              <MenuItem value="SI"> <em>SI</em> </MenuItem>
              <MenuItem value="NO"> <em>NO</em> </MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={8}>
          <FormControl className={styles.formControl3}>
            <InputLabel id="estado_com">Estado</InputLabel>
            <Select
              labelId="selectestado_com"
              name="estado_com"
              id="idselectestado_com"
              onChange={handleChange}
              value={componentesSeleccionado && componentesSeleccionado.estado_com} 
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
      </Grid>
      <br /><br />
      <div align="right">
        <Button className={styles.button} color="primary" onClick={() => actualizarComponente()} >Editar</Button>
        <Button className={styles.button2} onClick={() => abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  const componenteEliminar = (
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar Componente del Equipo <b>{componentesSeleccionado && componentesSeleccionado.equipo_com}</b>? </p>
      <div align="right">
        <Button className={styles.button} color="secondary" onClick={() => borrarComponente()}> Confirmar </Button>
        <Button className={styles.button2} onClick={() => abrirCerrarModalEliminar()}> Cancelar </Button>
      </div>
    </div>
  )

  return (
    <div className="App">
      <br />
      <Button align="center" variant="contained" startIcon={<SaveIcon />} color="primary" onClick={() => abrirCerrarModalInsertar()} >Agregar Componente del Equipo</Button>
      <div className="datosequipos">
        <MaterialTable
          columns={columnas}
          data={listarComponentes}
          title="CONSULTAR COMPONENTES DEL EQUIPO"
          actions={[
            {
              icon: 'edit',
              tooltip: 'Editar Componente del Equipo',
              onClick: (event, rowData) => seleccionarComponente(rowData, "Editar")
            },
            {
              icon: 'delete',
              tooltip: 'Borrar Componente del Equipo',
              onClick: (event, rowData) => seleccionarComponente(rowData, "Eliminar")
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
      <Modal
        open={modalInsertar}
        onClose={abrirCerrarModalInsertar}
      >
        {componenteInsertar}
      </Modal>

      <Modal
        open={modalEditar}
        onClose={abrirCerrarModalEditar}
      >
        {componenteEditar}
      </Modal>

      <Modal
        open={modalEliminar}
        onClose={abrirCerrarModalEliminar}
      >
        {componenteEliminar}
      </Modal>
    </div>
  );
}

export default ComponentesxEquipo;