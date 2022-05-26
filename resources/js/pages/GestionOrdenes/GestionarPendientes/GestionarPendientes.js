import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { Modal, TextField, Button, Select, MenuItem, FormControl, InputLabel, Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from '@material-ui/icons/Save';
import swal from 'sweetalert';
import Moment from 'moment';
import { green, blue, blueGrey, red } from '@material-ui/core/colors';

// Componentes de Conexion con el Backend
import pendienteotServices from "../../../services/GestionOrdenes/PendienteOT";
import estadosServices from "../../../services/Parameters/Estados";
import empresasServices from "../../../services/Empresa";
import ordenesServices from "../../../services/GestionOrdenes/CrearOrdenes";
import empleadosServices from "../../../services/Interlocutores/Empleados";
import equiposServices from "../../../services/Mantenimiento/Equipos";
import notificacionServices from "../../../services/Mantenimiento/NotificacionPendientes";

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
  modal2: {
    position: 'absolute',
    width: 1500,
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
    minWidth: 200,
  },
  formControl2: {
    margin: theme.spacing(0),
    minWidth: 415,
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
  button3: {
    color: theme.palette.getContrastText(blueGrey[500]),
    backgroundColor: blue[700],
    margin: theme.spacing(1),
    fontSize: 12,
    '&:hover': {
      backgroundColor: green[700],
    },
  },
}));

function GestionarPendientes(props) {
  const { metadata, idUsu } = props;
  const styles = useStyles();
  const [listPendientes, setListPendientes] = useState([]);
  const [listNotificaciones, setListNotificaciones] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalCrearPendienteOT, setModalCrearPendienteOT] = useState(false);
  const [modalNotificacion, setModalNotificacion] = useState(false);
  const [formError, setFormError] = useState(false);
  const [listarOrdenes, setListarOrdenes] = useState([]);
  const [listarEmpleados, setListarEmpleados] = useState([]);
  const [listarEstados, setListarEstados] = useState([]);
  const [actualiza, setActualiza] = useState(false);
  const [observacionPendienteOT, setObservacionPendienteOT] = useState("");
  const [codigoMT, setCodigoMT] = useState("");
  const [actividadPendiente, setActividadPendiente] = React.useState(false);
  const fechaactual = Moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
  const [pendienteSinOT, setpendienteSinOT] = React.useState(false);
  const [colorCrearPendiente, setColorCrearPendiente] = React.useState(false);
  const [colorConsultarPendiente, setColorConsultarPendiente] = React.useState(false);
  const [colorTodosPendiente, setColorTodosPendiente] = React.useState(false);
  const [colorNotificaciones, setColorNotificaciones] = React.useState(false);
  const [listarEquipos, setListarEquipos] = useState([]);
  const [notificacion, setNotificacion] = React.useState(false);
  const [pendientesSeleccionado, setPendientesSeleccionado] = useState({
    id: "",
    id_pot: "",
    fecha_pot: "",
    tecnico1_pot: "",
    tecnico2_pot: "",
    tecnico3_pot: "",
    solicitudrepuesto_pot: "",
    respuestarepuesto_pot: "",
    observacionrespuesta_pot: 0,
    estado_pot: "",
    novedad_pot: "",
    fechacierre_pot: "",
    descripcion_pot: ""
  })

  const [notificacionPendientes, setNotificacionesPendientes] = useState({
    id: "",
    descripcion: "",
    fechanotificacion: "",
    estado: 31,
    codigopendiente: "",
    tiponotificacion: 0
  })

  useEffect(() => {
    async function fetchDataEquipos() {
      const res = await equiposServices.listEquiposMontacargas();
      setListarEquipos(res.data);
      //console.log(res.data);
    }
    fetchDataEquipos();
  }, [])

  useEffect(() => {
    async function fetchDataPendientes() {
      const res = await pendienteotServices.listar_pendientesactivos();
      setListPendientes(res.data);
      setActualiza(false);
    }
    fetchDataPendientes();
  }, [actualiza])

  useEffect(() => {
    async function fetchDataEstados() {
      const res = await estadosServices.listEstadosPendientes();
      setListarEstados(res.data)
      console.log(res.data);
    }
    fetchDataEstados();
  }, [])

  useEffect(() => {
    async function fetchDataEmpleados() {
      const res = await empleadosServices.listEmpleadosOT();
      setListarEmpleados(res.data)
      //console.log(res.data);
    }
    fetchDataEmpleados();
  }, [])


  const handleChange = e => {
    const { name, value } = e.target;

    setPendientesSeleccionado(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const seleccionarPendientes = (pendiente, caso) => {
    setPendientesSeleccionado(pendiente);
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

  const abrirCerrarModalCrearPendienteOT = () => {
    setColorCrearPendiente(true);
    setColorConsultarPendiente(false);
    setColorTodosPendiente(false);
    setModalCrearPendienteOT(!modalCrearPendienteOT);
  }

  const abrirCerrarModalNotificacion = () => {
    setColorCrearPendiente(false);
    setColorConsultarPendiente(false);
    setColorTodosPendiente(false);
    setColorNotificaciones(false);
    setModalNotificacion(!modalNotificacion);
  }

  const crearPendiente = () => {
    {
      var caracteres = "012346789";
      var codigo = 0;
      for (var i = 0; i < 6; i++)
        codigo += caracteres.charAt(
          Math.floor(Math.random() * caracteres.length)
        );
      //let cadena = codigoid; //shortid();

      setPendientesSeleccionado([{
        id: 0,
        id_pot: codigo,
        fecha_pot: fechaactual,
        repuesto_pot: 0,
        tecnico1_pot: 0,
        tecnico2_pot: 0,
        tecnico3_pot: 0,
        solicitudrepuesto_pot: 0,
        respuestarepuesto_pot: 0,
        observacionrespuesta_pot: 0,
        estado_pot: 84,
        novedad_pot: codigoMT,
        fechacierre_pot: fechaactual,
        descripcion_pot: observacionPendienteOT
      }])
      setActividadPendiente(true)
    }
  }

  useEffect(() => {
    if (actividadPendiente) {

      async function grabarPendiente() {
        console.log("DATOS PENDIENTE : ", pendientesSeleccionado)
        const res = await pendienteotServices.save(pendientesSeleccionado[0]);

        if (res.success) {
          swal("Pendiente OT", "Pendiente OT Creada de forma Correcta!", "success", { button: "Aceptar" });
          console.log(res.message)
        } else {
          swal("Pendiente OT", "Error Creando Registro OT Maquina!", "error", { button: "Aceptar" });
          console.log(res.message);
        }
        setActividadPendiente(false)
        abrirCerrarModalCrearPendienteOT();
      }
      grabarPendiente();
    }
  }, [actividadPendiente])

  const consultarPendientes = async () => {
    setColorCrearPendiente(false);
    setColorConsultarPendiente(true);
    setColorTodosPendiente(false);

    setpendienteSinOT(true);
    async function fetchDataPendientes() {
      const res = await pendienteotServices.listar_pendientesinot();
      setListPendientes(res.data);
      setActualiza(false);
    }
    fetchDataPendientes();
  }

  const consultarTodosPendientes = async () => {
    setColorCrearPendiente(false);
    setColorConsultarPendiente(false);
    setColorTodosPendiente(true);
    setpendienteSinOT(true);
    async function fetchDataPendientes() {
      const res = await pendienteotServices.listpendientes();
      setListPendientes(res.data);
      setActualiza(false);
    }
    fetchDataPendientes();
  }

  const consultarNotificaciones = async () => {
    async function fetchDataNotificaciones() {
      if(idUsu === 3){
        const res = await notificacionServices.listar_solicitonotificacionpendientes();
        setListNotificaciones(res.data);
        //console.log(res.data);
      }else
      if(idUsu === 7){
        const res = await notificacionServices.listar_ingresonotificacionpendientes();
        setListNotificaciones(res.data);
        //console.log(res.data);
      }else{
        const res = await notificacionServices.listar_notificacionpendientes();
        setListNotificaciones(res.data);
        //console.log(res.data);
      }
    }
    fetchDataNotificaciones();

    setColorCrearPendiente(false);
    setColorConsultarPendiente(false);
    setColorTodosPendiente(false);
    setColorNotificaciones(true);
    setModalNotificacion(!modalNotificacion);
  }

  const actualizarPendiente = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;

    if (!pendientesSeleccionado.fecha_pot) {
      alert("1")
      errors.fecha_pot = true;
      formOk = false;
    }

    if (!pendientesSeleccionado.estado_pot) {
      alert("3")
      errors.estado_pot = true;
      formOk = false;
    }

    if (!pendientesSeleccionado.descripcion_pot) {
      alert("4")
      errors.descripcion_pot = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {

      const res = await pendienteotServices.update(pendientesSeleccionado);

      if (res.success) {
        swal({
          title: "Pendiente",
          text: "Actualizado de forma Correcta!",
          icon: "success",
          button: "Aceptar"
        });
        grabarNotificacion();
        delete pendientesSeleccionado.fecha_pot;
        delete pendientesSeleccionado.repuesto_pot;
        delete pendientesSeleccionado.estado_pot;
        delete pendientesSeleccionado.descripcion_pot;
      } else {
        swal({
          title: "Pendiente",
          text: "Error Actualizando el Pendiente!",
          icon: "error",
          button: "Aceptar"
        });
        console.log(res.message);
        abrirCerrarModalEditar();
      }
    }
    else {
      swal({
        title: "Pendiente",
        text: "Debe Ingresar Todos los Datos, Error Actualizando Pendiente!",
        icon: "warning",
        button: "Aceptar"
      });
      console.log(res.message);
      abrirCerrarModalEditar();
    }
    setActualiza(true);
  }

  useEffect(() => {

    if (notificacion) {
      const grabarNotificacion = async () => {
        console.log("DATOS NOTIFICACION : ", notificacionPendientes[0])
        const res = await notificacionServices.save(notificacionPendientes[0]);

        if (res.success) {
          swal({
            title: "Pendiente Notificación",
            text: "Notificación pendiente creada de forma correcta!",
            icon: "success",
            button: "Aceptar"
          });
        } else {
          swal({
            title: "Pendiente Notificación",
            text: "Error Creando Notificación pendiente!",
            icon: "error",
            button: "Aceptar"
          });

          console.log(res.message)
          abrirCerrarModalEditar();
        }
      }
      grabarNotificacion();
    }
  }, [notificacion])

  const grabarNotificacion = async () => {
    let comentario = "";
    if (pendientesSeleccionado.estado_pot == 90) {
      comentario = " Repuesto ya fue solicitado ";
    } else
      if (pendientesSeleccionado.estado_pot == 91) {
        comentario = " Ingreso del repuesto al Inventario - Disponible ";
      } else
        comentario = " ";

    setNotificacionesPendientes([{
      id: 0,
      descripcion: pendientesSeleccionado.descripcion_pot + comentario,
      fechanotificacion: fechaactual,
      estado: 31,
      codigopendiente: pendientesSeleccionado.id,
      tiponotificacion: pendientesSeleccionado.estado_pot
    }])
    setNotificacion(true);
  }

  const actualizarNotificacion = async(notificacion, caso) => {
    //console.log("DATOS ACTUALIZA NOTIFICACION : ", notificacion)
    
    const res = await notificacionServices.actualizanotificacion(notificacion);

    if (res.success) {
      swal({
        title: "Notificacion",
        text: "Actualizado de forma Correcta!",
        icon: "success",
        button: "Aceptar"
      });
    } else {
      swal({
        title: "Notificacion",
        text: "Error Actualizando el Pendiente!",
        icon: "error",
        button: "Aceptar"
      });
      console.log(res.message);
      abrirCerrarModalNotificacion();
    }
  }

  const borrarPendiente = async () => {

    const res = await pendienteotServices.delete(pendientesSeleccionado.id);

    if (res.success) {
      swal({
        title: "Pendiente",
        text: "Borrado de forma Correcta!",
        icon: "success",
        button: "Aceptar"
      });
      console.log(res.message)
      abrirCerrarModalEliminar();
    }
    else {
      swal({
        title: "Pendiente",
        text: "Error Borrando el Pendiente!",
        icon: "success",
        button: "Aceptar"
      });
      console.log(res.message);
      abrirCerrarModalEliminar();
    }
    setActualiza(true);
  }
  // "string","boolean","numeric","date","datetime","time","currency"

  const columnas = [
    {
      title: '#Orden',
      field: 'id_otr',
      cellStyle: { maxWidth: 50 }
    },
    {
      title: '#Actividad',
      field: 'id_pot'
    },
    {
      title: 'Equipo',
      field: 'codigo_equ'
    },
    {
      title: 'Fecha Creación',
      field: 'fecha_pot',
    },
    {
      title: 'Técnico Uno',
      field: 'nombretecnicouno',
    },
    {
      title: 'Repuesta Solicitado',
      field: 'solicitudrepuesto_pot'
    },
    {
      title: 'Repuesta a la Solicitud',
      field: 'respuestarepuesto_pot'
    },
    {
      title: 'Fecha de Cierre',
      field: 'fechacierre_pot',
    },
    {
      title: 'Estado',
      field: 'nombre_est'
    },
    {
      title: 'Descripcion',
      field: 'descripcion_pot',
      cellStyle: { minWidth: 200 }
    }
  ]

  const columnassinot = [
    {
      title: '#Pendiente',
      field: 'id_pot',
      cellStyle: { maxWidth: 50 }
    },
    {
      title: 'Equipo',
      field: 'codigo_equ'
    },
    {
      title: 'Descripción Equipo',
      field: 'descripcion_equ'
    },
    {
      title: 'Fecha Creación',
      field: 'fecha_pot',
    },
    {
      title: 'Descripciín pendiente',
      field: 'descripcion_pot',
    },
    {
      title: 'Estado',
      field: 'nombre_est'
    },
  ]

  const columnasnotificacion = [
    {
      title: '#Pendiente',
      field: 'codigopendiente',
      cellStyle: { maxWidth: 50 }
    },
    {
      title: 'Descripción',
      field: 'descripcion',
      cellStyle: { minWidth: 200 }
    },
    {
      title: 'Fecha Notificación',
      field: 'fechanotificacion'
    },
    {
      title: 'Estado',
      field: 'nombre_est',
    }
  ]

  // value={pendientesSeleccionado && pendientesSeleccionado.fecha_pot}

  const unidadEditar = (
    <div className={styles.modal}>
      <Typography align="center" className={styles.typography} variant="button" display="block" >
        Actualizar Pendiente
      </Typography>
      <Grid container spacing={2} >
        <Grid item xs={12} md={6}>
          <TextField type="date" InputLabelProps={{ shrink: true }} name="fecha_pot" label="Fecha Actividad Pendiente"
            fullWidth onChange={handleChange} value={pendientesSeleccionado && pendientesSeleccionado.fecha_pot} />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselecttecnico1_pot" >Tecnico Uno</InputLabel>
            <Select
              labelId="selecttecnico1_pot"
              name="tecnico1_pot"
              id="idselecttecnico1_pot"
              fullWidth
              onChange={handleChange}
              value={pendientesSeleccionado && pendientesSeleccionado.tecnico1_pot}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarEmpleados && listarEmpleados.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_emp}>{itemselect.primer_nombre_emp} {" "} {itemselect.primer_apellido_emp}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselecttecnico2_pot" >Tecnico Dos</InputLabel>
            <Select
              labelId="selecttecnico2_pot"
              name="tecnico2_pot"
              id="idselecttecnico2_pot"
              fullWidth
              onChange={handleChange}
              value={pendientesSeleccionado && pendientesSeleccionado.tecnico2_pot}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarEmpleados && listarEmpleados.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_emp}>{itemselect.primer_nombre_emp} {" "} {itemselect.primer_apellido_emp}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselecttecnico3_pot" >Tecnico Tres</InputLabel>
            <Select
              labelId="selecttecnico3_pot"
              name="tecnico3_pot"
              id="idselecttecnico3_pot"
              fullWidth
              onChange={handleChange}
              value={pendientesSeleccionado && pendientesSeleccionado.tecnico1_pot}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarEmpleados && listarEmpleados.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_emp}>{itemselect.primer_nombre_emp} {" "} {itemselect.primer_apellido_emp}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField name="solicitudrepuesto_pot" label="Repuesto Solicitado" fullWidth onChange={handleChange}
            value={pendientesSeleccionado && pendientesSeleccionado.solicitudrepuesto_pot} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField name="respuestarepuesto_pot" label="Repuesta a la Solicitud" fullWidth onChange={handleChange}
            value={pendientesSeleccionado && pendientesSeleccionado.respuestarepuesto_pot} />
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField name="observacionrespuesta_pot" label="Observación a la Solicitud" fullWidth onChange={handleChange}
            value={pendientesSeleccionado && pendientesSeleccionado.observacionrespuesta_pot} />
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField name="novedad_pot" label="Novedad" fullWidth onChange={handleChange}
            value={pendientesSeleccionado && pendientesSeleccionado.novedad_pot} />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectestado_pot" >Estado Pendiente</InputLabel>
            <Select
              labelId="selectestado_pot"
              name="estado_pot"
              id="idselectestado_pot"
              fullWidth
              onChange={handleChange}
              value={pendientesSeleccionado && pendientesSeleccionado.estado_pot}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarEstados && listarEstados.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_est}>{itemselect.nombre_est}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField type="date" InputLabelProps={{ shrink: true }} name="fechacierre_pot" label="Fecha de Cierre" fullWidth
            onChange={handleChange} value={pendientesSeleccionado && pendientesSeleccionado.fechacierre_pot} />
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField name="descripcion_pot" label="Descripción del pendiente" fullWidth onChange={handleChange}
            value={pendientesSeleccionado && pendientesSeleccionado.descripcion_pot} />
        </Grid>
      </Grid>
      <br />
      <br />
      <div align="right">
        <Button color="primary" onClick={() => actualizarPendiente()} >Editar</Button>
        <Button onClick={() => abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  const crearPendienteOT = (
    <div className={styles.modal}>
      <Typography align="center" className={styles.typography} variant="button" display="block" >
        Crear Pendiente sin OT
      </Typography>
      <Grid container spacing={2} >
        <Grid item xs={12} md={12}>
          <FormControl className={styles.formControl2}>
            <InputLabel id="idselectnovedad_pot">Equipo</InputLabel>
            <Select
              labelId="selectnovedad_pot"
              name="novedad_pot"
              id="idselectnovedad_pot"
              fullWidth
              onChange={(e) => setCodigoMT(e.target.value)}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarEquipos && listarEquipos.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_equ}>{itemselect.codigo_equ}{" "}{itemselect.descripcion_equ} </MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField name="descripcion_pot" label="Ingrese descripción del pendiente" fullWidth
            onChange={(e) => setObservacionPendienteOT(e.target.value)}
          />
        </Grid>
      </Grid>
      <div>
        <Button className={styles.button2} danger onClick={abrirCerrarModalCrearPendienteOT} > Cancelar </Button>,
        <Button className={styles.button} onClick={crearPendiente} > Enviar </Button>
      </div>
    </div >
  )

  const unidadEliminar = (
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar el Pendiente de la OT <b>{pendientesSeleccionado && pendientesSeleccionado.descripcion_pot}</b>? </p>
      <div align="right">
        <Button className={styles.button} onClick={() => borrarPendiente()}> Confirmar </Button>
        <Button className={styles.button} onClick={() => abrirCerrarModalEliminar()}> Cancelar </Button>
      </div>
    </div>
  )
  /*
 const [colorCrearPendiente, setColorCrearPendiente] = React.useState(false);
  const [colorConsultarPendiente, setColorConsultarPendiente] = React.useState(false);
  const [colorTodosPendiente, setColorTodosPendiente] = React.useState(false);
  */


  const consultarNotificacion = (
    <div className={styles.modal2}>
      <MaterialTable
        columns={columnasnotificacion}
        data={listNotificaciones}
        title="CONSULTAR NOTIFICACIONES"
        actions={[
          {
            icon: 'edit',
            tooltip: 'Actualiza Notificación',
            onClick: (event, rowData) => actualizarNotificacion(rowData, "Editar")
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
            tooltip: 'Información de Pendientes',
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
                </div>
              )
            },
          },
        ]}
      />
    </div>
  )

  return (
    <div className="App">
      <br />
      {
        !colorCrearPendiente ?
          (
            <Button className={styles.button3} onClick={() => abrirCerrarModalCrearPendienteOT()}>
              CREAR PENDIENTE OT
            </Button>

          )
          :
          (
            <Button className={styles.button} onClick={() => abrirCerrarModalCrearPendienteOT()}>
              CREAR PENDIENTE OT
            </Button>
          )
      }

      {
        !colorConsultarPendiente ?
          (
            <Button className={styles.button3} onClick={() => consultarPendientes()}>
              CONSULTAR PENDIENTE SIN OT
            </Button>
          )
          :
          (
            <Button className={styles.button} onClick={() => consultarPendientes()}>
              CONSULTAR PENDIENTE SIN OT
            </Button>
          )
      }
      {
        !colorTodosPendiente ?
          (
            <Button className={styles.button3} onClick={() => consultarTodosPendientes()}>
              TODOS LOS PENDIENTES
            </Button>
          )
          :
          (
            <Button className={styles.button} onClick={() => consultarTodosPendientes()}>
              TODOS LOS PENDIENTES
            </Button>
          )
      }

      {
        !colorNotificaciones ?
          (
            <Button className={styles.button3} onClick={() => consultarNotificaciones()}>
              CONSULTAR NOTIFICACIONES
            </Button>
          )
          :
          (
            <Button className={styles.button} onClick={() => consultarNotificaciones()}>
              CONSULTAR NOTIFICACIONES
            </Button>
          )
      }

      {
        !pendienteSinOT ?
          (
            <div>
              <MaterialTable
                columns={columnas}
                data={listPendientes}
                title="CONSULTAR PENDIENTES"
                actions={[
                  {
                    icon: 'edit',
                    tooltip: 'Editar Pendiente',
                    onClick: (event, rowData) => seleccionarPendientes(rowData, "Editar")
                  },
                  {
                    icon: 'delete',
                    tooltip: 'Borrar Pendiente',
                    onClick: (event, rowData) => seleccionarPendientes(rowData, "Eliminar")
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
                    tooltip: 'Información de Pendientes',
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
                          <Button variant="contained">Técnico Dos : {rowData.nombretecnicodos}</Button> { }
                          <Button variant="contained">Técnico Tres  : {rowData.nombretecnicotres}</Button> { }
                          <Button variant="contained">Observación :{rowData.observacionrespuesta_pot}</Button> { }
                          <Button variant="contained">Comentarios :{rowData.descripcion_pot}</Button>
                        </div>
                      )
                    },
                  },
                ]}
              />
            </div>
          )
          :
          (
            <div>
              <MaterialTable
                columns={columnassinot}
                data={listPendientes}
                title="CONSULTAR PENDIENTES"
                actions={[
                  {
                    icon: 'edit',
                    tooltip: 'Editar Pendiente',
                    onClick: (event, rowData) => seleccionarPendientes(rowData, "Editar")
                  },
                  {
                    icon: 'delete',
                    tooltip: 'Borrar Pendiente',
                    onClick: (event, rowData) => seleccionarPendientes(rowData, "Eliminar")
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
                    tooltip: 'Información de Pendientes',
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
                          <Button variant="contained">Técnico Dos : {rowData.nombretecnicodos}</Button> { }
                          <Button variant="contained">Técnico Tres  : {rowData.nombretecnicotres}</Button> { }
                          <Button variant="contained">Observación :{rowData.observacionrespuesta_pot}</Button> { }
                          <Button variant="contained">Comentarios :{rowData.descripcion_pot}</Button>
                        </div>
                      )
                    },
                  },
                ]}
              />
            </div>
          )
      }

      <Modal
        open={modalEditar}
        onClose={abrirCerrarModalEditar}
      >
        {unidadEditar}
      </Modal>

      <Modal
        open={modalEliminar}
        onClose={abrirCerrarModalEliminar}
      >
        {unidadEliminar}
      </Modal>
      <Modal
        open={modalCrearPendienteOT}
        onClose={abrirCerrarModalCrearPendienteOT}
      >
        {crearPendienteOT}
      </Modal>
      <Modal
        open={modalNotificacion}
        onClose={abrirCerrarModalNotificacion}
      >
        {consultarNotificacion}
      </Modal>
    </div>
  );
}

export default GestionarPendientes;