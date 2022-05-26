import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Modal, TextField, Button, Select, MenuItem, FormControl, InputLabel, Typography, Grid, ButtonGroup } from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles, lighten } from "@material-ui/core/styles";
import { green, blue, blueGrey, red } from '@material-ui/core/colors';
import NumberFormat from 'react-number-format';
import swal from 'sweetalert';
import Moment from 'moment';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import shortid from "shortid";

// Componentes de Conexion con el Backend
import crearordenesServices from "../../../services/GestionOrdenes/CrearOrdenes";
import pendienteotServices from "../../../services/GestionOrdenes/PendienteOT";
import estadosServices from "../../../services/Parameters/Estados";
import empleadosServices from "../../../services/Interlocutores/Empleados";

const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: 600,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  modalcumplimiento: {
    position: 'absolute',
    width: 1400,
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
    minWidth: 250,
    maxWidth: 250,
  },
  typography: {
    fontSize: 13,
    color: "#ff3d00"
  },
  typography2: {
    fontSize: 16,
    color: "#f44336"
  },
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  button1: {
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
    backgroundColor: blue[900],
    margin: theme.spacing(1),
    fontSize: 12,
    '&:hover': {
      backgroundColor: blue[900],
    },
  },
  button3: {
    color: theme.palette.getContrastText(blueGrey[500]),
    backgroundColor: red[700],
    margin: theme.spacing(1),
    fontSize: 12,
    '&:hover': {
      backgroundColor: red[700],
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

function ActividadesPendiente(props) {
  const { id_otr, nombre_emp, razonsocial_cli, telefono_cli, nombre_ciu, email_cli, descripcion_mar, modelo_dequ,
    fechainicia_otr, descripcion_tser, descripcion_tmt, serie_dequ, codigo_equ, descripcion_con, primer_apellido_con,
    primer_nombre_con, horometro_otr, iniciatransporte_otr, finaltransporte_otr, tiempotransporte_otr, tiempoorden_otr,
    estado_otr
  } = props.ordenSeleccionado;

  const { operario } = props;

  //console.log("ES UN OPERARIO : ", operario)

  const { tipoRegistro } = props;

  //console.log("TIPO REGISTRO : ", tipoRegistro);

  const styles = useStyles();
  const [value, setValue] = useState(false);
  const [listUnCumplimiento, setListUnCumplimiento] = useState([]);
  const [modalRevisarCumplimiento, setModalRevisarCumplimiento] = useState(false);
  const [modalPendienteOT, setModalPendienteOT] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [listarEstados, setListarEstados] = useState([]);
  const [listarEmpleados, setListarEmpleados] = useState([]);
  const [formError, setFormError] = useState(false);
  const [grabar, setGrabar] = React.useState(false);
  const [activo, setActivo] = useState(false);

  let servicio = 1;
  let tecnico = 0;

  const [pendienteSeleccionado, setPendienteSeleccionado] = useState({
    id: "",
    id_pot: "",
    fecha_pot: "",
    tecnico1_pot: tecnico,
    tecnico2_pot: tecnico,
    tecnico3_pot: tecnico,
    solicitudrepuesto_pot: 0,
    respuestarepuesto_pot: 0,
    observacionrespuesta_pot: 0,
    estado_pot: "",
    novedad_pot: "",
    fechacierre_pot: "",
    descripcion_pot: ""
  });

  useEffect(() => {
    async function fetchDataEstados() {
      const res = await estadosServices.listEstadosPendientes();
      setListarEstados(res.data)
      //console.log(res.data);
    }
    fetchDataEstados();
  }, [])


  useEffect(() => {
    async function fetchDataEmpleados() {
      const res = await empleadosServices.listEmpleados();
      setListarEmpleados(res.data)
      //console.log(res.data);
    }
    fetchDataEmpleados();
  }, [])


  const handleChange = e => {
    const { name, value } = e.target;

    setPendienteSeleccionado(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const seleccionarCumplimiento = (cumplimiento, caso) => {
    //console.log(cumplimiento)
    setPendienteSeleccionado(cumplimiento);
    (caso === "Editar") ? abrirCerrarModalActualizarCumplimiento() : abrirCerrarModalEliminarActividad()
  }

  const iniciarCumplimiento = () => {
    //console.log("REFERENCIA SELECCIONADA : ", value);
    handleOnSelect(value)
  }

  const abrirCerrarModalEliminarActividad = () => {
    setModalEliminarActividad(!modalEliminarActividad);
  }

  const abrirCerrarModalPendienteOT = () => {
    setModalPendienteOT(!modalPendienteOT);
  }

  const abrirCerrarModalRevisarCumplimiento = () => {
    setModalRevisarCumplimiento(!modalRevisarCumplimiento);
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

  const registrarPendiente = async () => {
    setFormError({});
    let errors = {};
    let formOk = true;

    if (!pendienteSeleccionado.fecha_pot) {
      alert("1")
      errors.fecha_pot = true;
      formOk = false;
    }

    if (!pendienteSeleccionado.estado_pot) {
      alert("3")
      errors.estado_pot = true;
      formOk = false;
    }

    if (!pendienteSeleccionado.descripcion_pot) {
      alert("4")
      errors.descripcion_pot = true;
      formOk = false;
    }

    if (formOk) {
      {
        setPendienteSeleccionado([{
          id: 0,
          id_pot: id_otr,
          fecha_pot: pendienteSeleccionado.fecha_pot,
          repuesto_pot: pendienteSeleccionado.repuesto_pot,
          tecnico1_pot: pendienteSeleccionado.tecnico1_pot,
          tecnico2_pot: pendienteSeleccionado.tecnico2_pot,
          tecnico3_pot: pendienteSeleccionado.tecnico3_pot,
          solicitudrepuesto_pot: pendienteSeleccionado.solicitudrepuesto_pot,
          respuestarepuesto_pot: 0,
          observacionrespuesta_pot: pendienteSeleccionado.observacionrespuesta_pot,
          estado_pot: pendienteSeleccionado.estado_pot,
          novedad_pot: pendienteSeleccionado.novedad_pot,
          fechacierre_pot: pendienteSeleccionado.fechacierre_pot,
          descripcion_pot: pendienteSeleccionado.descripcion_pot
        }])
      }
      setGrabar(true);
    } else {
      swal("Pendientes OT", "Debe Ingresar Todos los Datos!", "warning", { button: "Aceptar" });
      //console.log(ordenSeleccionado);
      console.log(res.message);
      abrirCerrarModalInsertar();
    }
  }

  useEffect(() => {
    if (grabar) {

      async function grabarPendiente() {
        //console.log("DATOS PENDIENTE : ", pendienteSeleccionado)
        const res = await pendienteotServices.save(pendienteSeleccionado[0]);

        if (res.success) {
          swal("Pendiente OT", "Pendiente OT Creada de forma Correcta!", "success", { button: "Aceptar" });
          console.log(res.message)
          abrirCerrarModalPendienteOT();
        } else {
          swal("Pendiente OT", "Error Creando Registro OT Maquina!", "error", { button: "Aceptar" });
          console.log(res.message);
          abrirCerrarModalPendienteOT();
        }
        //setActualiza(true);
      }
      grabarPendiente();
    }
  }, [grabar])

  const cumplimiento = [
    {
      title: '# OT',
      field: 'id_pot',
      cellStyle: { minWidth: 50 }
    },
    {
      title: 'Actividad',
      field: 'descripcion_pot',
      cellStyle: { minWidth: 250 }
    },
    {
      title: 'Referencia',
      field: 'referencia_pot',
      cellStyle: { minWidth: 100 }
    },
    {
      title: 'Fecha Inicia',
      field: 'fechainicia_pot',
      type: "date",
      cellStyle: { minWidth: 100 }
    },
    {
      title: 'Fecha Fin',
      field: 'fechafinal_pot',
      type: "date",
      cellStyle: { minWidth: 100 }
    },
    {
      title: 'Cantidad',
      field: 'cantidad_pot',
      cellStyle: { minWidth: 50 }
    },
    {
      title: 'Valor Unitario',
      field: 'valorunitario_pot',
      cellStyle: { minWidth: 100 }
    },
    {
      title: 'Valor Total',
      field: 'valortotal_pot',
      cellStyle: { minWidth: 100 }
    }
  ]

  const RevisarCumplimiento = (
    <div className={styles.modalcumplimiento}>
      <br />
      <MaterialTable
        columns={cumplimiento}
        data={listUnCumplimiento}
        title="CONSULTA CUMPLIMIENTO ORDEN DE SERVICIO"
        actions={[
          {
            icon: 'edit',
            tooltip: 'Editar Item',
            onClick: (event, rowData) => seleccionarCumplimiento(rowData, "Editar")
          },
          {
            icon: 'delete',
            tooltip: 'Eliminar Item',
            onClick: (event, rowData) => seleccionarCumplimiento(rowData, "Eliminar")
          }
        ]}
        options={{
          actionsColumnIndex: -1,
          exportButton: true
        }}
        localization={{
          header: {
            actions: "Acciones"
          }
        }}

      />
    </div>
  )

  const grabarPendienteOT = (
    <div className={styles.modal}>
      <Typography align="center" className={styles.typography} variant="button" display="block" >
        INGRESAR PENDIENTES PARA EL EQUIPO {props.ordenSeleccionado.codigo_equ}
      </Typography>
      <br />
      <Grid container spacing={2} >
        <Grid item xs={12} md={6}>
          <TextField type="date" InputLabelProps={{ shrink: true }} name="fecha_pot"
            label="Fecha Actividad Pendiente" fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselecttecnico1_pot" >Tecnico Uno</InputLabel>
            <Select
              labelId="selecttecnico1_pot"
              name="tecnico1_pot"
              id="idselecttecnico1_pot"
              defaultValue={tecnico}
              fullWidth
              onChange={handleChange}
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
              defaultValue={tecnico}
              fullWidth
              onChange={handleChange}
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
              defaultValue={tecnico}
              fullWidth
              onChange={handleChange}
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
        <Grid item xs={12} md={12}>
          <TextField name="observacionrespuesta_pot" label="Observación a la Solicitud" fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField name="novedad_pot" label="Novedad" fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField name="respuestarepuesto_pot" label="Repuesta a la Solicitud" fullWidth onChange={handleChange} />
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

        <Grid item xs={12} md={12}>
          <TextField name="descripcion_pot" label="Descripción del pendiente" fullWidth onChange={handleChange} />
        </Grid>
      </Grid>
      <div align="right">
        <Button className={styles.button1} color="secondary" onClick={() => registrarPendiente()} > Confirmar </Button>
        <Button className={styles.button2} onClick={() => abrirCerrarModalPendienteOT()}> Cancelar </Button>
      </div>
    </div>
  )

  /*
  <Grid item xs={12} md={6}>
          <TextField name="solicitudrepuesto_pot" label="Repuesto Solicitado" fullWidth onChange={handleChange} />
        </Grid>

   <Grid item xs={12} md={6}>
          <TextField type="date" InputLabelProps={{ shrink: true }} name="fechacierre_pot"
            label="Fecha de Cierre" fullWidth onChange={handleChange} />
        </Grid>
        
  */

  return (
    <div className="App">
      <br />
      <Typography align="center" className={styles.typography} variant="button" display="block" >
        - ORDEN DE SERVICIO # {props.ordenSeleccionado.id_otr}
      </Typography>

      <ButtonGroup orientation="vertical" className={styles.button} color="primary" aria-label="outlined primary button group">
        <Button>EMPRESA : {nombre_emp} </Button>
        <Button>CLIENTE : {razonsocial_cli} </Button>
        <Button>TELEFONO : {telefono_cli} </Button>
      </ButtonGroup>
      <ButtonGroup orientation="vertical" className={styles.button} color="primary" aria-label="outlined primary button group">
        <Button >CONTACTO :{primer_apellido_con}{" "}{primer_nombre_con} </Button>
        <Button >CIUDAD : {nombre_ciu} </Button>
        <Button >CORREO : {email_cli} </Button>
      </ButtonGroup>
      <ButtonGroup orientation="vertical" className={styles.button} color="primary" aria-label="outlined primary button group">
        <Button >MARCA : {descripcion_mar} </Button>
        <Button >MODELO : {modelo_dequ} </Button>
        <Button >FECHA : {fechainicia_otr} </Button>
      </ButtonGroup>
      <ButtonGroup orientation="vertical" className={styles.button} color="primary" aria-label="outlined primary button group">
        <Button >SERIE : {serie_dequ}  </Button>
        <Button >ID INTERNO : {codigo_equ}  </Button>
      </ButtonGroup>
      <ButtonGroup className={styles.button} color="primary" aria-label="outlined primary button group">
        <Button >TIPO DE SERVICIO : {descripcion_tser} </Button>
        <Button >TIPO DE ACTIVIDAD : {descripcion_tmt}  </Button>
      </ButtonGroup>

      <Typography align="center" className={styles.typography} variant="button" display="block" >
        Dar Click para agregar Pendientes de la Orden de Servicio
      </Typography>

      <div>
        {
          <div className="App" >
            {
              !tipoRegistro ?
                (
                  <div>
                    <Button className={styles.button1} onClick={() => abrirCerrarModalPendienteOT()()} >Agregar Pendiente </Button>
                  </div>

                )
                :
                (
                  <div>
                    {
                      value ?
                        (
                          <Button className={styles.button1} onClick={() => iniciarCumplimiento()} >Iniciar Cumplimiento </Button>
                        )
                        :
                        (
                          console.log("Hasta no seleccionar un registro no se activa la opción de cumplimiento")
                        )
                    }
                    <Button className={styles.button1} onClick={() => abrirCerrarModalPendienteOT()()} >Agregar Item </Button>
                    {
                      activo ? (
                        <div>
                          <Button className={styles.button2} onClick={() => consultarCumplimiento()} >Revisar Cumplimiento </Button>
                        </div>
                      )
                        :
                        (
                          console.log("NO hay registros de cumplimiento")
                        )

                    }
                  </div>
                )

            }

          </div>
        }
      </div>

      <Modal
        open={modalRevisarCumplimiento}
        onClose={abrirCerrarModalRevisarCumplimiento}
      >
        {RevisarCumplimiento}
      </Modal>

      <Modal
        open={modalPendienteOT}
        onClose={abrirCerrarModalPendienteOT}
      >
        {grabarPendienteOT}
      </Modal>

    </div>
  );
}

export default ActividadesPendiente;