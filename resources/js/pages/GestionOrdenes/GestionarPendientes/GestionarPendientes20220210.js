import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { Modal, TextField, Button, Select, MenuItem, FormControl, InputLabel, Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from '@material-ui/icons/Save';
import swal from 'sweetalert';
import Moment from 'moment';

// Componentes de Conexion con el Backend
import pendienteotServices from "../../../services/GestionOrdenes/PendienteOT";
import estadosServices from "../../../services/Parameters/Estados";
import empresasServices from "../../../services/Empresa";
import ordenesServices from "../../../services/GestionOrdenes/CrearOrdenes";
import empleadosServices from "../../../services/Interlocutores/Empleados";

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
    minWidth: 200,
  },
  typography: {
    fontSize: 16,
    color: "#ff3d00"
  }
}));

function GestionarPendientes() {
  const styles = useStyles();
  const [listPendientes, setListPendientes] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalCrearPendienteOT, setModalCrearPendienteOT] = useState(false);
  const [formError, setFormError] = useState(false);
  const [listarOrdenes, setListarOrdenes] = useState([]);
  const [listarEmpleados, setListarEmpleados] = useState([]);
  const [listarEstados, setListarEstados] = useState([]);
  const [actualiza, setActualiza] = useState(false);
  const [observacionPendienteOT, setObservacionPendienteOT] = useState("");
  const [actividadPendiente, setActividadPendiente] = React.useState(false);
  const fechaactual = Moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
  const [pendientesSeleccionado, setPendientesSeleccionado] = useState({
    id: "",
    id_pot: "",
    fecha_pot: "",
    tecnico1_pot: "",
    tecnico2_pot: "",
    tecnico3_pot: "",
    solicitudrepuesto_pot: "",
    respuestarepuesto_pot: "",
    observacionrespuesta_pot: "",
    estado_pot: "",
    novedad_pot: "",
    fechacierre_pot: "",
    descripcion_pot: ""
  })

  useEffect(() => {
    async function fetchDataPendientes() {
      const res = await pendienteotServices.listpendientes();
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
    setModalCrearPendienteOT(!modalCrearPendienteOT);
  }

  const crearPendiente = () => {
    {
      setPendienteSeleccionado([{
        id: 0,
        id_pot: 3011,
        fecha_pot: fechaactual,
        repuesto_pot: 0,
        tecnico1_pot: 0,
        tecnico2_pot: 0,
        tecnico3_pot: 0,
        solicitudrepuesto_pot: 0,
        respuestarepuesto_pot: 0,
        observacionrespuesta_pot: "",
        estado_pot: 84,
        novedad_pot: "",
        fechacierre_pot: fechaactual,
        descripcion_pot: observacionPendienteOT
      }])
      setActividadPendiente(true)
    }
  }

  useEffect(() => {
    if (actividadPendiente) {

      async function grabarPendiente() {
        console.log("DATOS PENDIENTE : ", pendienteSeleccionado)

        const res = await pendienteotServices.save(pendienteSeleccionado[0]);

        if (res.success) {
          swal("Pendiente OT", "Pendiente OT Creada de forma Correcta!", "success", { button: "Aceptar" });
          console.log(res.message)
        } else {
          swal("Pendiente OT", "Error Creando Registro OT Maquina!", "error", { button: "Aceptar" });
          console.log(res.message);
        }
        setActividadPendiente(false)
        //cerrarModalCrearPendienteOT();
      }
      grabarPendiente();
    }
  }, [actividadPendiente])


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
        console.log(res.message)
        abrirCerrarModalEditar();
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
      title: 'Novedad',
      field: 'novedad_pot'
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
    <div>
      <Typography align="center" className={styles.typography} variant="button" display="block" >
        Crear Pendiente Sin OT
      </Typography>
      <Grid container spacing={2} >
        <Grid item xs={12} md={6}>
          <TextField name="descripcion_pot" label="Ingrese descripción del pendiente" fullWidth
            onChange={(e) => setObservacionPendienteOT(e.target.value)}
          />
        </Grid>
      </Grid>
      <div>
        <Button type="primary" danger onClick={cerrarModalCrearPendienteOT} > Cancelar </Button>,
        <Button type="primary" onClick={crearPendiente} > Enviar </Button>
      </div>
    </div >
  )

  const unidadEliminar = (
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar el Pendiente de la OT <b>{pendientesSeleccionado && pendientesSeleccionado.descripcion_pot}</b>? </p>
      <div align="right">
        <Button color="secondary" onClick={() => borrarUnidad()}> Confirmar </Button>
        <Button onClick={() => abrirCerrarModalEliminar()}> Cancelar </Button>
      </div>
    </div>
  )

  return (
    <div className="App">
      <br />
      <Button color="secondary" onClick={() => abrirCerrarModalCrearPendienteOT()}>
        CREAR PENDIENTE OT
      </Button>
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
      />{ }

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
    </div>
  );
}

export default GestionarPendientes;