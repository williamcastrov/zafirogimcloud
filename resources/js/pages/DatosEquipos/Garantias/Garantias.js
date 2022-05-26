import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { Modal, TextField, Button, Select, MenuItem, FormControl, InputLabel, Grid, ButtonGroup, Typography } from "@material-ui/core";
import { green, blue, blueGrey, red } from '@material-ui/core/colors';
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from '@material-ui/icons/Save';
import CachedIcon from '@material-ui/icons/Cached';
import swal from 'sweetalert';
import Moment from 'moment';

// Componentes de Conexion con el Backend
import garantiasServices from "../../../services/DatosEquipos/Garantias";
import estadosServices from "../../../services/Parameters/Estados";
import empresasServices from "../../../services/Empresa";
import equiposServices from "../../../services/Mantenimiento/Equipos";
import tipogarantiaServices from "../../../services/DatosEquipos/TipoGarantia";
import clientesServices from "../../../services/Interlocutores/Clientes";
import proveedoresServices from "../../../services/Interlocutores/Proveedores";

//Estilos
import "../../Mantenimiento/Equipos/Equipos.css";

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
  formControl2: {
    margin: theme.spacing(0),
    minWidth: 617,
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

function Garantias(props) {
  const { equipoID, equipoCodigo } = props;

  const styles = useStyles();
  const [listGarantias, setListGarantias] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [formError, setFormError] = useState(false);
  const [listarEstados, setListarEstados] = useState([]);
  const [listarEmpresas, setListarEmpresas] = useState([]);
  const [listarEquipos, setListarEquipos] = useState([]);
  const [listarTipoGarantia, setListarTipoGarantia] = useState([]);
  const [listarClientes, setListarClientes] = useState([]);
  const [listarProveedores, setListarProveedores] = useState([]);
  const [actualiza, setActualiza] = useState(false);
  let itemsToRender;

  const [garantiaSeleccionado, setGarantiaSeleccionado] = useState({
    'equipo_gar': equipoID,
    'tipogarantia_gar':"",
    'IDgarantia_gar':"",
    'proveedor_gar':"",
    'cliente_gar':"",
    'empresa_gar':"",
    'fechainicial_gar':"",
    'fechafinal_gar':"",
    'estado_gar':"",
    'observacion_gar':""
  })

  useEffect(() => {
    async function fetchDataGarantias() {
      const res = await garantiasServices.listUnaGarantia(equipoID);
      setListGarantias(res.data);
      setActualiza(false);
    }
    fetchDataGarantias();
  }, [actualiza])

  useEffect(() => {
    async function fetchDataEmpresas() {
      const res = await empresasServices.listEmpresas();
      setListarEmpresas(res.data)
      //console.log(res.data);
    }
    fetchDataEmpresas();
  }, [])

  useEffect(() => {
    async function fetchDataEstados() {
      const res = await estadosServices.listEstados();
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
    async function fetchDataProveedores() {
      const res = await proveedoresServices.listProveedores();
      setListarProveedores(res.data)
      //console.log(res.data);
    }
    fetchDataProveedores();
  }, [])

  useEffect(() => {
    async function fetchDataTipoGarantia() {
      const res = await tipogarantiaServices.listTipogarantia();
      setListarTipoGarantia(res.data)
      //console.log(res.data);
    }
    fetchDataTipoGarantia();
  }, [])

  const handleChange = e => {
    const { name, value } = e.target;

    setGarantiaSeleccionado(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const seleccionarGarantia = (garantia, caso) => {
    setGarantiaSeleccionado(garantia);
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

  const grabarGarantia = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;

    if (!garantiaSeleccionado.equipo_gar) {
      errors.equipo_gar = true;
      formOk = false;
    }

    if (!garantiaSeleccionado.tipogarantia_gar) {
      errors.tipogarantia_gar = true;
      formOk = false;
    }

    if (!garantiaSeleccionado.IDgarantia_gar) {
      errors.IDgarantia_gar = true;
      formOk = false;
    }

    if (!garantiaSeleccionado.proveedor_gar) {
      errors.proveedor_gar = true;
      formOk = false;
    }

    if (!garantiaSeleccionado.cliente_gar) {
      errors.cliente_gar = true;
      formOk = false;
    }

    if (!garantiaSeleccionado.empresa_gar) {
      errors.empresa_gar = true;
      formOk = false;
    }

    if (!garantiaSeleccionado.fechainicial_gar) {
      errors.fechainicial_gar = true;
      formOk = false;
    }

    if (!garantiaSeleccionado.fechafinal_gar) {
      errors.fechafinal_gar = true;
      formOk = false;
    }

    if (!garantiaSeleccionado.estado_gar) {
      errors.estado_gar = true;
      formOk = false;
    }

    if (!garantiaSeleccionado.observacion_gar) {
      errors.observacion_gar = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
      //console.log(garantiaSeleccionado);
      const res = await garantiasServices.save(garantiaSeleccionado);

      if (res.success) {
        swal( "Garantias", "Garantia Creada de forma Correcta!", "success", { button: "Aceptar" });
        //console.log(res.message)
        abrirCerrarModalInsertar();
        delete garantiaSeleccionado.equipo_gar;
        delete garantiaSeleccionado.tipogarantia_gar;
        delete garantiaSeleccionado.IDgarantia_gar;
        delete garantiaSeleccionado.proveedor_gar;
        delete garantiaSeleccionado.cliente_gar;
        delete garantiaSeleccionado.empresa_gar;
        delete garantiaSeleccionado.fechainicial_gar;
        delete garantiaSeleccionado.fechafinal_gar;
        delete garantiaSeleccionado.estado_gar;
        delete garantiaSeleccionado.observacion_gar;
      } else {
        swal( "Garantias", "Error Creando la Garantia!", "error", { button: "Aceptar" });
        //console.log(res.message);
        abrirCerrarModalInsertar();
      }
    }
    else {
      swal( "Garantias", "Debe Ingresar Todos los Datos, Revisar Información!", "warning", { button: "Aceptar" });
      //console.log(garantiaSeleccionado);
      console.log(res.message);
      abrirCerrarModalInsertar();
    }
    setActualiza(true);
  }

  const actualizarGarantia = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;

    if (!garantiaSeleccionado.equipo_gar) {
      errors.equipo_gar = true;
      formOk = false;
    }

    if (!garantiaSeleccionado.tipogarantia_gar) {
      errors.tipogarantia_gar = true;
      formOk = false;
    }

    if (!garantiaSeleccionado.IDgarantia_gar) {
      errors.IDgarantia_gar = true;
      formOk = false;
    }

    if (!garantiaSeleccionado.proveedor_gar) {
      errors.proveedor_gar = true;
      formOk = false;
    }

    if (!garantiaSeleccionado.cliente_gar) {
      errors.cliente_gar = true;
      formOk = false;
    }

    if (!garantiaSeleccionado.empresa_gar) {
      errors.empresa_gar = true;
      formOk = false;
    }

    if (!garantiaSeleccionado.fechainicial_gar) {
      errors.fechainicial_gar = true;
      formOk = false;
    }

    if (!garantiaSeleccionado.fechafinal_gar) {
      errors.fechafinal_gar = true;
      formOk = false;
    }

    if (!garantiaSeleccionado.estado_gar) {
      errors.estado_gar = true;
      formOk = false;
    }

    if (!garantiaSeleccionado.observacion_gar) {
      errors.observacion_gar = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {

      const res = await garantiasServices.update(garantiaSeleccionado);

      if (res.success) {
        swal( "Garantias", "Garantia actualizada de forma Correcta!", "success", { button: "Aceptar" });
        //console.log(res.message)
        abrirCerrarModalEditar();
        delete garantiaSeleccionado.equipo_gar;
        delete garantiaSeleccionado.tipogarantia_gar;
        delete garantiaSeleccionado.IDgarantia_gar;
        delete garantiaSeleccionado.proveedor_gar;
        delete garantiaSeleccionado.cliente_gar;
        delete garantiaSeleccionado.empresa_gar;
        delete garantiaSeleccionado.fechainicial_gar;
        delete garantiaSeleccionado.fechafinal_gar;
        delete garantiaSeleccionado.estado_gar;
        delete garantiaSeleccionado.observacion_gar;
      } else {
        swal( "Garantias", "Error Actualizando la Garantia!", "error", { button: "Aceptar" });
        //console.log(res.message);
        abrirCerrarModalEditar();
      }
    }
    else {
      swal( "Garantias", "Debe Ingresar Todos los Datos, Revisar Información!", "warning", { button: "Aceptar" });
      //console.log(res.message);
      abrirCerrarModalEditar();
    }
    setActualiza(true);
  }

  const borrarGarantia = async () => {

    const res = await garantiasServices.delete(garantiaSeleccionado.id_gar);

    if (res.success) {
      swal( "Garantias", "Garantia Borrada de forma Correcta!", "success", { button: "Aceptar" });
      //console.log(res.message)
      abrirCerrarModalEliminar();
    }
    else {
      swal( "Garantias", "Error Borrando la Garantia!", "error", { button: "Aceptar" });
      //console.log(res.message);
      abrirCerrarModalEliminar();
    }
    setActualiza(true);
  }
  // "string","boolean","numeric","date","datetime","time","currency"
  const columnas = [
    {
      title: 'Codigo Equipo',
      field: 'descripcion_equ',
      cellStyle: { minWidth: 250 }
    },
    {
      title: 'Tipo Garantía',
      field: 'descripcion_tga',
      cellStyle: { minWidth: 150 }
    },
    {
      title: 'IDGarantía',
      field: 'IDgarantia_gar'
    },
    {
      title: 'Cliente',
      field: 'razonsocial_cli',
      cellStyle: { minWidth: 100 }
    },
    {
      title: 'Descripción',
      field: 'nombre_emp',
      cellStyle: { minWidth: 150 }
    },
    {
      title: 'Fecha Inicial',
      field: 'fechainicial_gar',
      type: 'date'
    },
    {
      title: 'Fecha Final',
      field: 'fechafinal_gar',
      type: 'date'
    },
    {
      title: 'Descripción',
      field: 'nombre_est'
    }
  ]

  const garantiaInsertar = (
    <div className={styles.modal}>
      <br />
      <h3 align="center" ></h3>
      <Typography align="center" className={styles.typography} variant="button" display="block">
        Agregar Garantia del Equipo { } {equipoCodigo}
      </Typography>
      <Grid container spacing={2} >
        <Grid item xs={12} md={6}> <TextField name="equipo_gar" label="ID Equipo" defaultValue={equipoID} disabled="true"
          fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectTipogarantia">Tipo Garantía</InputLabel>
            <Select
              labelId="selecttipogarantia_gar"
              name="tipogarantia_gar"
              id="idselecttipogarantia_gar"
              onChange={handleChange}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarTipoGarantia.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_tga}>{itemselect.descripcion_tga}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField className={styles.inputMaterial} label="ID Garantía" name="IDgarantia_gar" fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectproveedor_gar">Proveedor</InputLabel>
            <Select
              labelId="selectproveedor_gar"
              name="proveedor_gar"
              id="idselectproveedor_gar"
              onChange={handleChange}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarProveedores.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_int}>{itemselect.razonsocial_int}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectempresa_gar">Empresa</InputLabel>
            <Select
              labelId="selectempresa_gar"
              name="empresa_gar"
              id="idselectempresa_gar"
              onChange={handleChange}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarEmpresas.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_emp}>{itemselect.nombre_emp}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectEstado">Estado</InputLabel>
            <Select
              labelId="selectEstado"
              name="estado_gar"
              id="idselectEstado"
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
        <Grid item xs={12} md={6}> <TextField type="date" InputLabelProps={{ shrink: true}} name="fechainicial_gar"
              label="Fecha Inicia la Garantía" fullWidth onChange={handleChange} /> 
        </Grid>
        <Grid item xs={12} md={6}> <TextField type="date" InputLabelProps={{ shrink: true}} name="fechafinal_gar" 
              label="Fecha Fin de la Garantía" fullWidth onChange={handleChange} /> 
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl2}>
            <InputLabel id="idselectcliente_gar">Clientes</InputLabel>
            <Select
              labelId="selectcliente_gar"
              name="cliente_gar"
              id="idselectcliente_gar"
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
        <Grid item xs={12} md={12}>
          <TextField className={styles.inputMaterial} label="Observación" name="observacion_gar" fullWidth onChange={handleChange} />
        </Grid>
      </Grid>
      <br /><br />
      <div align="right">
        <Button className={styles.button} color="primary" onClick={() => grabarGarantia()} >Insertar</Button>
        <Button className={styles.button2} onClick={() => abrirCerrarModalInsertar()} >Cancelar</Button>
      </div>
    </div>
  )
  
  const garantiaEditar = (
    <div className={styles.modal}>
      <Typography align="center" className={styles.typography} variant="button" display="block">
        Actualizar Garantia del Equipo { } {equipoCodigo}
      </Typography>
      <Grid container spacing={2} >
        <Grid item xs={12} md={6}> <TextField name="equipo_gar" label="ID Equipo" defaultValue={equipoID} disabled="true"
          fullWidth onChange={handleChange} value={garantiaSeleccionado && garantiaSeleccionado.equipo_gar} />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectTipogarantia">Tipo Garantía</InputLabel>
            <Select
              labelId="selecttipogarantia_gar"
              name="tipogarantia_gar"
              id="idselecttipogarantia_gar"
              onChange={handleChange}
              value={garantiaSeleccionado && garantiaSeleccionado.tipogarantia_gar}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarTipoGarantia.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_tga}>{itemselect.descripcion_tga}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField className={styles.inputMaterial} label="ID Garantía" name="IDgarantia_gar" fullWidth onChange={handleChange}
          value={garantiaSeleccionado && garantiaSeleccionado.IDgarantia_gar} />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectproveedor_gar">Proveedor</InputLabel>
            <Select
              labelId="selectproveedor_gar"
              name="proveedor_gar"
              id="idselectproveedor_gar"
              onChange={handleChange}
              value={garantiaSeleccionado && garantiaSeleccionado.proveedor_gar}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarProveedores.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_int}>{itemselect.razonsocial_int}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectempresa_gar">Empresa</InputLabel>
            <Select
              labelId="selectempresa_gar"
              name="empresa_gar"
              id="idselectempresa_gar"
              onChange={handleChange}
              value={garantiaSeleccionado && garantiaSeleccionado.empresa_gar}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarEmpresas.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_emp}>{itemselect.nombre_emp}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectEstado">Estado</InputLabel>
            <Select
              labelId="selectEstado"
              name="estado_gar"
              id="idselectEstado"
              onChange={handleChange}
              value={garantiaSeleccionado && garantiaSeleccionado.estado_gar}
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
        <Grid item xs={12} md={6}> <TextField type="date" InputLabelProps={{ shrink: true }} name="fechainicial_gar"
          defaultValue={Moment(garantiaSeleccionado.fechainicial_gar).format('YYYY-MM-DD')}  
          label="Fecha Inicia la Garantía" fullWidth onChange={handleChange} /> 
        </Grid>
        <Grid item xs={12} md={6}> <TextField type="date" InputLabelProps={{ shrink: true}} name="fechafinal_gar" 
          defaultValue={Moment(garantiaSeleccionado.fechafinal_gar).format('YYYY-MM-DD')}  
          label="Fecha Fin de la Garantía" fullWidth onChange={handleChange} /> 
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl2}>
            <InputLabel id="idselectcliente_gar">Clientes</InputLabel>
            <Select
              labelId="selectcliente_gar"
              name="cliente_gar"
              id="idselectcliente_gar"
              onChange={handleChange}
              value={garantiaSeleccionado && garantiaSeleccionado.cliente_gar}
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
        <Grid item xs={12} md={12}>
          <TextField className={styles.inputMaterial} label="Observación" name="observacion_gar"
                     fullWidth onChange={handleChange}  value={garantiaSeleccionado && garantiaSeleccionado.observacion_gar} />
        </Grid>
      </Grid>
      <br /><br />
      <div align="right">
        <Button className={styles.button} color="primary" onClick={() => actualizarGarantia()} >Editar</Button>
        <Button className={styles.button2} onClick={() => abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  const garantiaEliminar = (
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar la Garantia <b>{garantiaSeleccionado && garantiaSeleccionado.idgarantia_gar}</b>? </p>
      <div align="right">
        <Button className={styles.button} color="secondary" onClick={() => borrarGarantia()}> Confirmar </Button>
        <Button className={styles.button2} onClick={() => abrirCerrarModalEliminar()}> Cancelar </Button>
      </div>
    </div>
  )

  return (
    <div className="App" >
      <br />
        <ButtonGroup  >
          <Button variant="contained" startIcon={<SaveIcon />} color="primary" onClick={() => abrirCerrarModalInsertar()} >Agregar Garantía</Button>
        </ButtonGroup>
  
      <div className="datosequipos">
        <MaterialTable
          columns={columnas}
          data={listGarantias}
          title="GARANTIA DEL EQUIPO"
          actions={[
            {
              icon: 'edit',
              tooltip: 'Editar Garantia',
              onClick: (event, rowData) => seleccionarGarantia(rowData, "Editar")
            },
            {
              icon: 'delete',
              tooltip: 'Borrar Garantia',
              onClick: (event, rowData) => seleccionarGarantia(rowData, "Eliminar")
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
              tooltip: 'Estados del Equipo',
              render: rowData => {
                return (
                  <div
                    style={{
                      fontSize: 14,
                      color: 'white',
                      backgroundColor: '#0277bd',
                    }}
                  >
                    <Button variant="contained">Observación : {rowData.observacion_gar}</Button> { }
                  </div>
                )
              },
            },  
          ]}
        />
      </div>
      <Modal
        open={modalInsertar}
        onClose={abrirCerrarModalInsertar}
      >
        {garantiaInsertar}
      </Modal>

      <Modal
        open={modalEditar}
        onClose={abrirCerrarModalEditar}
      >
        {garantiaEditar}
      </Modal>

      <Modal
        open={modalEliminar}
        onClose={abrirCerrarModalEliminar}
      >
        {garantiaEliminar}
      </Modal>
    </div>
  );
}

export default Garantias;