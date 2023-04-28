import React, { useEffect, useState } from "react";
import axios from "axios";
import MaterialTable from "material-table";
import { Modal, TextField, Button, ButtonGroup, Select, MenuItem, FormControl, 
         TextareaAutosize,InputLabel, Typography, Grid } from "@material-ui/core";
import { green, blue, blueGrey, red, grey } from '@material-ui/core/colors';
import { makeStyles } from "@material-ui/core/styles";
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import ForwardIcon from '@material-ui/icons/Forward';
import SaveIcon from '@material-ui/icons/Save';
import { MultiSelect } from "react-multi-select-component";
import Moment from 'moment';
import swal from 'sweetalert';
import "./RegistroLlamadas.css";
import { useHistory } from "react-router-dom";

// Componentes de Conexion con el Backend
import contactosServices from "../../../services/Interlocutores/Contactos";
import clientesServices from "../../../services/Interlocutores/Clientes";
import registrollamadasServices from "../../../services/Ventas/RegistroLlamadas";
import equiposServices from "../../../services/Mantenimiento/Equipos";
import estadosServices from "../../../services/Parameters/Estados";

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
    width: 1000,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    overflow:'scroll',
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
    minWidth: 450,
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
      backgroundColor: blue[700],
    },
  },
  button4: {
    color: theme.palette.getContrastText(blueGrey[500]),
    backgroundColor: grey[700],
    margin: theme.spacing(1),
    fontSize: 12,
    '&:hover': {
      backgroundColor: blue[700],
    },
  },
}));

function RegistroLlamadas() {
  const styles = useStyles();
  const [modalCodigoCliente, setModalCodigoCliente] = useState(false);
  const [listRegistroLlamadas, setListRegistroLlamadas] = useState([]);
  const [listarEquipos, setListarEquipos] = useState([]);

  const [modalIniciar, setModalIniciar] = useState(false);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);

  const [formError, setFormError] = useState(false);
  const [listContactos, setListContactos] = useState([]);
  const [listarClientes, setListarClientes] = useState([]);
  const [clientesMultiselect, setClientesMultiselect] = useState([]);
  const [actualiza, setActualiza] = useState(false);
  const [iniciaVisita, setIniciaVisita] = useState(false);
  const [selected, setSelected] = useState([]);
  const [motivosLlamadas, setMotivosLlamadas] = useState([]);
  const [estadosLlamadas, setEstadosLlamadas] = useState([]);
  const [grabar, setGrabar] = useState(false);
  const [tipo, setTipo] = useState(0);
  const history = useHistory();
  let contacto = 0;

  const fechaactual = Moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
  const [registroLlamadasSeleccionado, setRegistroLlamadasSeleccionado] = useState({
    id_rll: 0,
    cliente_rll: "",
    motivollamada_rll: "",
    asistentes: "",
    contacto_rll: "",
    equipo_rll: 0,
    fecha_rll: fechaactual,
    estado_rll: "",
    nombrecliente: "",
    temauno: "",
    comentariostemauno: "",
    temados: "",
    comentariostemados: "",
    tematres: "",
    comentariostematres: "",
    temacuatro: "",
    comentariostemacuatro: "",
    temacinco: "",
    comentariostemacinco: ""
  })

  const [cliente, setCliente] = useState({
    direccion_cli: "",
    email_cli: "",
    razonsocial_cli: "",
    nit_cli: "",
    telefono_cli: "",
    id_cli: 0
  });

  useEffect(() => {
    async function fetchDataLlamadas() {
      const res = await registrollamadasServices.listar_iniciovisitacomercial();
      setListRegistroLlamadas(res.data)
      console.log(res.data);
      setIniciaVisita(false);
    }
    fetchDataLlamadas();
  }, [iniciaVisita])

  useEffect(() => {
    async function fetchDataClientes() {
      const res = await clientesServices.listClientes();
      setListarClientes(res.data)
      //console.log(res.data);
    }
    fetchDataClientes();

    async function fetchDataClientesMultiselect() {
      const res = await clientesServices.listar_clientesmultiselect();
      setClientesMultiselect(res.data)
      //console.log(res.data);
    }
    fetchDataClientesMultiselect();
  }, [])

  useEffect(() => {
    async function fetchDataMotivoLlamadas() {
      const res = await estadosServices.listEstadosLlamadas();
      setMotivosLlamadas(res.data)
      //console.log(res.data);
    }
    fetchDataMotivoLlamadas();
  }, [])

  useEffect(() => {
    async function fetchDataEstadosLlamadas() {
      const res = await estadosServices.listar_estadosregistrollamadas();
      setEstadosLlamadas(res.data)
      //console.log(res.data);
    }
    fetchDataEstadosLlamadas();
  }, [])

  const contactosInterlocutor = (cliente) => {
    console.log("CODIGO CLIENTE : ", cliente)

    async function fetchDataContactos() {
      const res = await contactosServices.contactosInterlocutor(cliente);
      setListContactos(res.data);
      console.log("CONTACTOS : ", res.data)
      if (!res.success) {
        //swal("Contactos", "Cliente Seleccionado no tiene Contactos!", "warning", { button: "Aceptar" });
      }
    }
    fetchDataContactos();
  }

  const handleChange = e => {
    const { name, value } = e.target;

    setRegistroLlamadasSeleccionado(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const seleccionarLlamada = (llamada, caso) => {
    setRegistroLlamadasSeleccionado(llamada);
    (caso === "Editar") ? abrirCerrarModalEditar() : abrirCerrarModalEliminar()
  }

  const seleccionarOrden = async (orden, caso) => {
    console.log("NUMERO : ", orden)
    window.open("https://zafiro.gimcloud.com/api/registrollamadas/generarPdf/" + orden.id_rll, "PDF")
  }

  const abrirCerrarModalInsertar = () => {
    console.log("CREAR REGISTRO CLIENTE SELECCIONADO : ", selected);
    setCliente([{
      ciudad_cli: selected[0].ciudad_cli,
      direccion_cli: selected[0].direccion_cli,
      email_cli: selected[0].email_cli,
      razonsocial_cli: selected[0].label,
      nit_cli: selected[0].nit_cli,
      telefono_cli: selected[0].telefono_cli,
      id_cli: selected[0].value
    }]);

    async function fetchDataContactos() {
      const res = await contactosServices.contactosInterlocutor(selected[0].value);
      setListContactos(res.data);
      console.log("CONTACTOS : ", res.data)
      if (!res.success) {
        //swal("Contactos", "Cliente Seleccionado no tiene Contactos!", "warning", { button: "Aceptar" });
      }
    }
    fetchDataContactos();

    async function fetchDataEquipos() {
      console.log("CLIENTE EQUIPO : ", selected[0].value)
      const res = await equiposServices.listar_equiposcliente(selected[0].value);
      setListarEquipos(res.data)
      console.log("LISTA EQUIPOS CLIENTE : ", res.data)
    }
    fetchDataEquipos();

    async function fetchDataLlamadas() {
      const res = await registrollamadasServices.listar_registrollamadascliente(selected[0].value);
      setListRegistroLlamadas(res.data)
      console.log("RESPUESTA CONSULTA CLIENTE XXX: ", res.data);
      setActualiza(false);
    }
    fetchDataLlamadas();

    setModalInsertar(!modalInsertar);
  }

  const abrirCerrarModalIniciar = () => {
    console.log("INICIA REGISTRO CLIENTE SELECCIONADO : ", selected);
    setCliente([{
      ciudad_cli: selected[0].ciudad_cli,
      direccion_cli: selected[0].direccion_cli,
      email_cli: selected[0].email_cli,
      razonsocial_cli: selected[0].label,
      nit_cli: selected[0].nit_cli,
      telefono_cli: selected[0].telefono_cli,
      id_cli: selected[0].value
    }]);

    async function fetchDataContactos() {
      const res = await contactosServices.contactosInterlocutor(selected[0].value);
      setListContactos(res.data);
      console.log("CONTACTOS : ", res.data)
      if (!res.success) {
        //swal("Contactos", "Cliente Seleccionado no tiene Contactos!", "warning", { button: "Aceptar" });
      }
    }
    fetchDataContactos();

    async function fetchDataEquipos() {
      console.log("CLIENTE EQUIPO : ", selected[0].value)
      const res = await equiposServices.listar_equiposcliente(selected[0].value);
      setListarEquipos(res.data)
      console.log("LISTA EQUIPOS CLIENTE : ", res.data)
    }
    fetchDataEquipos();

    async function fetchDataLlamadas() {
      const res = await registrollamadasServices.listar_registrollamadascliente(selected[0].value);
      setListRegistroLlamadas(res.data)
      console.log("RESPUESTA CONSULTA CLIENTE XXX: ", res.data);
      setActualiza(false);
    }
    fetchDataLlamadas();

    setModalIniciar(!modalIniciar);
  }

  const consultarRegistroLlamadas = () => {
    console.log("CONSULTAR CLIENTE SELECCIONADO : ", selected);

    async function fetchDataLlamadas() {
      const res = await registrollamadasServices.listar_registrollamadascliente(selected[0].value);
      setListRegistroLlamadas(res.data)
      console.log("RESPUESTA CONSULTA CLIENTE : ", res.data);
      setActualiza(false);
    }
    fetchDataLlamadas();

    setModalCodigoCliente(!modalCodigoCliente);
  }

  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
  }

  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
  }

  const leerDatosClientes = () => {
    leerModalCodigoCliente();
  }

  const CrearClientes = () => {
    history.push("/interlocutores/clientes");
  }

  const GestionarEquipos = () => {
    history.push("/mantenimiento/equipos");
  }

  const leerModalCodigoCliente = () => {
    setModalCodigoCliente(!modalCodigoCliente);
  }

  const grabarRegistroLlamada = async () => {
    setTipo(1);
    setFormError({});
    let errors = {};
    let formOk = true;

    if (!registroLlamadasSeleccionado.motivollamada_rll) {
      errors.motivollamada_rll = true;
      formOk = false;
    }

    if (!registroLlamadasSeleccionado.contacto_rll) {
      errors.contacto_rll = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
      console.log("CODIGO EQUIPO : ", registroLlamadasSeleccionado.equipo_rll)
      setRegistroLlamadasSeleccionado([{
        id_rll: 0,
        cliente_rll: cliente[0].id_cli,
        motivollamada_rll: registroLlamadasSeleccionado.motivollamada_rll,
        asistentes:registroLlamadasSeleccionado.asistentes,
        contacto_rll: registroLlamadasSeleccionado.contacto_rll,
        equipo_rll: registroLlamadasSeleccionado.equipo_rll,
        fecha_rll: registroLlamadasSeleccionado.fecha_rll,
        observaciones_rll: registroLlamadasSeleccionado.observaciones_rll,
        estado_rll: registroLlamadasSeleccionado.estado_rll,
        nombrecliente: registroLlamadasSeleccionado.nombrecliente,
        temauno: registroLlamadasSeleccionado.temauno,
        comentariostemauno: registroLlamadasSeleccionado.comentariostemauno,
        temados: registroLlamadasSeleccionado.temados,
        comentariostemados: registroLlamadasSeleccionado.comentariostemados,
        tematres: registroLlamadasSeleccionado.tematres,
        comentariostematres: registroLlamadasSeleccionado.comentariostematres,
        temacuatro: registroLlamadasSeleccionado.temacuatro,
        comentariostemacuatro: registroLlamadasSeleccionado.comentariostemacuatro,
        temacinco: registroLlamadasSeleccionado.temacinco,
        comentariostemacinco: registroLlamadasSeleccionado.comentariostemacinco
      }]);
      setGrabar(true);
    }
    else {
      swal("Registro Llamadas", "Debe Ingresar Todos los Datos, Revisar Información!", "warning", { button: "Aceptar" });
      console.log(res.message);
      abrirCerrarModalInsertar();
    }
    setActualiza(true);
  }

  const grabarIniciaRegistroVisita = async () => {
    setTipo(2);
    setFormError({});
    let errors = {};
    let formOk = true;

    setFormError(errors);

    console.log("CODIGO EQUIPO : ", registroLlamadasSeleccionado.equipo_rll)
    setRegistroLlamadasSeleccionado([{
      id_rll: 0,
      cliente_rll: cliente[0].id_cli,
      asistentes: 0,
      motivollamada_rll: 0,
      contacto_rll: 0,
      equipo_rll: 0,
      fecha_rll: fechaactual,
      observaciones_rll: 0,
      estado_rll: 31,
      nombrecliente: registroLlamadasSeleccionado.nombrecliente,
      temauno: registroLlamadasSeleccionado.temauno,
      comentariostemauno: registroLlamadasSeleccionado.comentariostemauno,
      temados: registroLlamadasSeleccionado.temados,
      comentariostemados: registroLlamadasSeleccionado.comentariostemados,
      tematres: registroLlamadasSeleccionado.tematres,
      comentariostematres: registroLlamadasSeleccionado.comentariostematres,
      temacuatro: registroLlamadasSeleccionado.temacuatro,
      comentariostemacuatro: registroLlamadasSeleccionado.comentariostemacuatro,
      temacinco: registroLlamadasSeleccionado.temacinco,
      comentariostemacinco: registroLlamadasSeleccionado.comentariostemacinco
    }]);
    setGrabar(true);

    setActualiza(true);
  }

  useEffect(() => {
    async function grabarLlamada() {
      if (grabar) {
        console.log("DATOS REGISTRO LLAMADAS : ", registroLlamadasSeleccionado[0]);

        const res = await registrollamadasServices.save(registroLlamadasSeleccionado[0]);

        if (res.success) {
          swal("Registro Llamadas", "Registro Llamada Creado de forma Correcta!", "success", { button: "Aceptar" });
          console.log(res.message)
          if (tipo === 1)
            abrirCerrarModalInsertar();
          else
            if (tipo === 2)
              abrirCerrarModalIniciar();
            else
              setTipo(0)
        } else {
          swal("Registro Llamadas", "Error Creando el Registro de Llamadas!", "error", { button: "Aceptar" });
          console.log(res.message);
          if (tipo === 1)
            abrirCerrarModalInsertar();
          else
            if (tipo === 2)
              abrirCerrarModalIniciar();
            else
              setTipo(0)
        }
      }
      setGraba
    }
    grabarLlamada();
  }, [grabar])

  const actualizarRegistroLlamada = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;

    if (!registroLlamadasSeleccionado.cliente_rll) {
      errors.cliente_rll = true;
      formOk = false;
    }
/*
    if (!registroLlamadasSeleccionado.motivollamada_rll) {
      errors.motivollamada_rll = true;
      formOk = false;
    }

    if (!registroLlamadasSeleccionado.contacto_rll) {
      errors.contacto_rll = true;
      formOk = false;
    }
*/
    setFormError(errors);

    if (formOk) {
      console.log("DATA REGISTRO LLAMADA : ", registroLlamadasSeleccionado)


      const res = await registrollamadasServices.update(registroLlamadasSeleccionado);

      if (res.success) {
        swal("Registro Llamadas", "Registro de Llamada actualizado de forma Correcta!", "success", { button: "Aceptar" });
        console.log(res.message)
        abrirCerrarModalEditar();
      } else {
        swal("Registro Llamadas", "Error Actualizando el Registro de Llamadas!", "error", { button: "Aceptar" });
        console.log(res.message);
        abrirCerrarModalEditar();
      }
    }
    else {
      swal("Registro Llamadas", "Debe Ingresar Todos los Datos, Revisar Información!", "warning", { button: "Aceptar" });
      console.log(res.message);
      abrirCerrarModalEditar();
    }
    setActualiza(true);
  }

  const borrarRegistroLlamada = async () => {

    const res = await registrollamadasServices.delete(registroLlamadasSeleccionado.id_rll);

    if (res.success) {
      swal("Registro Llamadas", "Registro de Llamada Borrado de forma Correcta!", "success", { button: "Aceptar" });
      console.log(res.message)
      abrirCerrarModalEliminar();
    }
    else {
      swal("Registro Llamadas", "Error Borrando El Registro de Llamada!", "error", { button: "Aceptar" });
      console.log(res.message);
      abrirCerrarModalEliminar();
    }
    setActualiza(true);
  }
  // "string","boolean","numeric","date","datetime","time","currency"
  const columnas = [
    {
      title: 'ID',
      field: 'id_rll'
    },
    {
      title: 'Cliente',
      field: 'razonsocial_cli'
    },
    {
      title: 'Motivo',
      field: 'nombre_est'
    },
    {
      title: 'Contacto',
      field: 'nombrecontacto'
    },
    {
      title: 'Fecha',
      field: 'fecha_rll'
    },
    {
      title: 'Referencia',
      field: 'referencia_dequ'
    },
    {
      title: 'Dirección',
      field: 'direccion_dequ'
    },
    {
      title: 'Observación',
      field: 'observaciones_rll'
    }
  ]

  const llamadaInsertar = (
    <div className={styles.modal2}>
      <Typography align="center" className={styles.typography} variant="button" display="block">Grabar datos visita</Typography>
      <Grid container spacing={2} >
        <Grid item xs={6} md={6} xl={6} lg={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectEmpresa"> Cliente </InputLabel>
            <Select
              labelId="selectCliente"
              name="cliente_rll"
              id="idselectcliente_rll"
              onChange={handleChange}
              defaultValue={cliente[0] && cliente[0].id_cli}
            >
              <MenuItem value="">  <em>None</em> </MenuItem>
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
        <Grid item xs={6} md={6} xl={6} lg={6}>
          <TextField className={styles.inputMaterial} label="Datos clientes" name="nombrecliente" onChange={handleChange} />
        </Grid>
      </Grid>
      <TextField className={styles.inputMaterial} label="Datos Contacto" name="contacto_rll" onChange={handleChange} />
      <Grid item xs={6} md={6} xl={6} lg={6}>
          <TextField className={styles.inputMaterial} label="Asistentes" name="asistentes" onChange={handleChange} />
      </Grid>
      <Grid container spacing={2} >
        <Grid item xs={6} md={6} xl={6} lg={6}>
          <TextField className={styles.inputMaterial} label="Motivo visita o servicio" name="motivollamada_rll" onChange={handleChange} />
        </Grid>
        <Grid item xs={6} md={6} xl={6} lg={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectEstado"> Estado Llamada </InputLabel>
            <Select
              labelId="selectestado_rll"
              name="estado_rll"
              id="idselectestado_rll"
              onChange={handleChange}
            >
              <MenuItem value="">  <em>None</em> </MenuItem>
              {
                estadosLlamadas && estadosLlamadas.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_est}>{itemselect.nombre_est}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container spacing={2} >
        <Grid item xs={6} md={6} xl={6} lg={6}>
          <TextField type="date" InputLabelProps={{ shrink: true }} name="fecha_rll"
            defaultValue={Moment(fechaactual).format('YYYY-MM-DD')} label="Fecha Llamada"
            fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={6} md={6} xl={6} lg={6}>
          <TextField className={styles.inputMaterial} label="Equipos" name="equipo_rll" onChange={handleChange} />
        </Grid>
      </Grid>
      <Typography align="center" className={styles.typography} variant="button" display="block">
        TEMAS TRATADOS Y DESARROLLO DE LA REUNION
      </Typography>
      <TextField className={styles.inputMaterial} label="Tema Uno" name="temauno" onChange={handleChange} />
      <textarea className="descripcionproducto" label="Comentarios tema uno" name="comentariostemauno" onChange={handleChange} />

      <TextField className={styles.inputMaterial} label="Tema Dos" name="temados" onChange={handleChange} />
      <textarea className="descripcionproducto" label="Comentarios tema dos" name="comentariostemados" onChange={handleChange} />

      <TextField className={styles.inputMaterial} label="Tema Tres" name="tematres" onChange={handleChange} />
      <textarea className="descripcionproducto" label="Comentarios tema tres" name="comentariostematres" onChange={handleChange} />

      <TextField className={styles.inputMaterial} label="Tema Cuatro" name="temacuatro" onChange={handleChange} />
      <textarea className="descripcionproducto" label="Comentarios tema cuatro" name="comentariostemacuatro" onChange={handleChange} />
{/*
      <TextField className={styles.inputMaterial} label="Tema Cinco" name="temacinco" onChange={handleChange} />
      <textarea className="descripcionproducto" label="Comentarios tema cinco" name="comentariostemacinco" onChange={handleChange} />
            */}
      <div align="right">
        <Button className={styles.button} color="primary" onClick={() => grabarRegistroLlamada()} >Guardar</Button>
        <Button className={styles.button2} onClick={() => abrirCerrarModalInsertar()} >Cancelar</Button>
      </div>
    </div>
  )

  const RegistrarSolicitudVisita = (
    <div className={styles.modal}>
      <Typography align="center" className={styles.typography} variant="button" display="block">Iniciar Registro Visita </Typography>
      <FormControl className={styles.formControl}>
        <InputLabel id="idselectEmpresa"> Cliente </InputLabel>
        <Select
          labelId="selectCliente"
          name="cliente_rll"
          id="idselectcliente_rll"
          onChange={handleChange}
          defaultValue={cliente[0] && cliente[0].id_cli}
        >
          <MenuItem value="">  <em>None</em> </MenuItem>
          {
            listarClientes.map((itemselect) => {
              return (
                <MenuItem value={itemselect.id_cli}>{itemselect.razonsocial_cli}</MenuItem>
              )
            })
          }
        </Select>
      </FormControl>
      <br />
      <TextField type="date" InputLabelProps={{ shrink: true }} name="fecha_rll"
        defaultValue={Moment(fechaactual).format('YYYY-MM-DD')} label="Fecha Llamada"
        fullWidth onChange={handleChange} />

      <br /><br />
      <div align="right">
        <Button className={styles.button} color="primary" onClick={() => grabarIniciaRegistroVisita()} >Insertar</Button>
        <Button className={styles.button2} onClick={() => abrirCerrarModalIniciar()} >Cancelar</Button>
      </div>
    </div>
  )

  //value={registroLlamadasSeleccionado && registroLlamadasSeleccionado.empresa_estcli}
  //value={registroLlamadasSeleccionado && registroLlamadasSeleccionado.cliente_rll}
  const llamadaeditar = (
    <div className={styles.modal2}>
      <Typography align="center" className={styles.typography} variant="button" display="block">Actualizar Registro de Llamada</Typography>
      <Grid container spacing={2} >
        <Grid item xs={6} md={6} xl={6} lg={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectEmpresa"> Cliente </InputLabel>
            <Select
              labelId="selectCliente"
              name="cliente_rll"
              id="idselectcliente_rll"
              onChange={handleChange}
              value={registroLlamadasSeleccionado && registroLlamadasSeleccionado.cliente_rll}
            >
              <MenuItem value="">  <em>None</em> </MenuItem>
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
        <Grid item xs={6} md={6} xl={6} lg={6}>
          <TextField className={styles.inputMaterial} label="Datos clientes" name="nombrecliente" onChange={handleChange} 
           value={registroLlamadasSeleccionado && registroLlamadasSeleccionado.nombrecliente}
          />
        </Grid>
      </Grid>
      <TextField className={styles.inputMaterial} label="Datos Contacto" name="contacto_rll" onChange={handleChange} 
        value={registroLlamadasSeleccionado && registroLlamadasSeleccionado.contacto_rll}
      />
      <TextField className={styles.inputMaterial} label="Asistentes" name="asistentes" onChange={handleChange} 
        value={registroLlamadasSeleccionado && registroLlamadasSeleccionado.asistentes}
      />
      <Grid container spacing={2} >
        <Grid item xs={6} md={6} xl={6} lg={6}>
          <TextField className={styles.inputMaterial} label="Motivo visita o servicio" name="motivollamada_rll" 
          onChange={handleChange}  value={registroLlamadasSeleccionado && registroLlamadasSeleccionado.motivollamada_rll}
        />
        </Grid>
        <Grid item xs={6} md={6} xl={6} lg={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectEstado"> Estado Llamada </InputLabel>
            <Select
              labelId="selectestado_rll"
              name="estado_rll"
              id="idselectestado_rll"
              onChange={handleChange}
              value={registroLlamadasSeleccionado && registroLlamadasSeleccionado.estado_rll}
            >
              <MenuItem value="">  <em>None</em> </MenuItem>
              {
                estadosLlamadas && estadosLlamadas.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_est}>{itemselect.nombre_est}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Grid container spacing={2} >
        <Grid item xs={6} md={6} xl={6} lg={6}>
          <TextField type="date" InputLabelProps={{ shrink: true }} name="fecha_rll"
            value={registroLlamadasSeleccionado && registroLlamadasSeleccionado.fecha_rll}
            fullWidth onChange={handleChange} />

        </Grid>
        <Grid item xs={6} md={6} xl={6} lg={6}>
          <TextField className={styles.inputMaterial} label="Equipos" name="equipo_rll" onChange={handleChange} 
          value={registroLlamadasSeleccionado && registroLlamadasSeleccionado.equipo_rll}
          />
        </Grid>
      </Grid>
     
      <Typography align="center" className={styles.typography} variant="button" display="block">
        TEMAS TRATADOS Y DESARROLLO DE LA REUNION
      </Typography>
      <TextField className={styles.inputMaterial} label="Tema Uno" name="temauno" onChange={handleChange} 
      value={registroLlamadasSeleccionado && registroLlamadasSeleccionado.temauno}
      />
      <textarea className="descripcionproducto"  label="Comentarios tema uno" name="comentariostemauno" onChange={handleChange}
      value={registroLlamadasSeleccionado && registroLlamadasSeleccionado.comentariostemauno}
      />

      <TextField className={styles.inputMaterial} label="Tema Dos" name="temados" onChange={handleChange} 
      value={registroLlamadasSeleccionado && registroLlamadasSeleccionado.temados}
      />
      <textarea className="descripcionproducto" label="Comentarios tema dos" name="comentariostemados" onChange={handleChange} 
       value={registroLlamadasSeleccionado && registroLlamadasSeleccionado.comentariostemados}
      />

      <TextField className={styles.inputMaterial} label="Tema Tres" name="tematres" onChange={handleChange} 
      value={registroLlamadasSeleccionado && registroLlamadasSeleccionado.tematres}
      />
      <textarea className="descripcionproducto" label="Comentarios tema tres" name="comentariostematres" onChange={handleChange} 
       value={registroLlamadasSeleccionado && registroLlamadasSeleccionado.comentariostematres}
      />

      <TextField className={styles.inputMaterial} label="Tema Cuatro" name="temacuatro" onChange={handleChange} 
      value={registroLlamadasSeleccionado && registroLlamadasSeleccionado.temacuatro}
      />
      <textarea className="descripcionproducto" label="Comentarios tema cuatro" name="comentariostemacuatro" onChange={handleChange}
       value={registroLlamadasSeleccionado && registroLlamadasSeleccionado.comentariostemacuatro}
      />
{/*
      <TextField className={styles.inputMaterial} label="Tema Cinco" name="temacinco" onChange={handleChange} 
      value={registroLlamadasSeleccionado && registroLlamadasSeleccionado.temacinco}/>
      <textarea className="descripcionproducto" label="Comentarios tema cinco" name="comentariostemacinco" onChange={handleChange} 
       value={registroLlamadasSeleccionado && registroLlamadasSeleccionado.comentariostemacinco}
      />
            */}
      <div align="right">
        <Button className={styles.button} color="primary" onClick={() => actualizarRegistroLlamada()} >Guardar</Button>
        <Button className={styles.button2} onClick={() => abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  const llamadaEliminar = (
    <div className={styles.modal}>
      <p>Eliminar el Registro de Llamada <b>{registroLlamadasSeleccionado && registroLlamadasSeleccionado.fecha_rll} {"-"}
        {registroLlamadasSeleccionado && registroLlamadasSeleccionado.motivollamada_rll}</b>? </p>
      <div align="right">
        <Button className={styles.button} color="secondary" onClick={() => borrarRegistroLlamada()}> Confirmar </Button>
        <Button className={styles.button2} onClick={() => abrirCerrarModalEliminar()}> Cancelar </Button>

      </div>

    </div>
  )

  const codigoCliente = (
    <div className="App" >
      <div className={styles.modal}>
        <Typography align="center" className={styles.typography} variant="button" display="block" >
          Seleccionar Codigo Cliente
        </Typography>
        <Grid item xs={12} md={4}>
          <MultiSelect className="inputmultiselect"
            options={clientesMultiselect}
            value={selected}
            onChange={setSelected}
            labelledBy="Seleccione el Cliente"
            overrideStrings={{
              allItemsAreSelected:
                "All items are selected.",
              clearSearch:
                "Limpiar",
              noOptions:
                "No options",
              search: "Buscar",
              selectAll:
                "Marcar solo uno",
              selectAllFiltered:
                "Select All (Filtered)",
              selectSomeItems:
                "Seleccionar Cliente ...",
            }}
          />
        </Grid>
        <br />
        <div align="center">
          <ButtonGroup orientation="vertical">
            <Button className={styles.button} variant="contained" startIcon={<SaveIcon />} color="primary"
              onClick={() => abrirCerrarModalIniciar()}>  Iniciar Visita
            </Button>
            <Button className={styles.button} variant="contained" startIcon={<SaveIcon />} color="primary"
              onClick={() => abrirCerrarModalInsertar()}>  Registrar Visita
            </Button>
            <Button className={styles.button} variant="contained" startIcon={<SaveIcon />} color="primary"
              onClick={() => consultarRegistroLlamadas()}>  Consultar Visita
            </Button>
          </ButtonGroup>
        </div>
      </div>
    </div>
  )

  return (
    <div className="App">
      <br />
      <Grid container spacing={2} >
        <Grid item xs={12} md={2}></Grid>
        <Grid item xs={12} md={2}>
          <Button className={styles.button3}
            variant="contained" startIcon={<ForwardIcon />} color="primary" onClick={() => GestionarEquipos()}
          > Gestionar Equipo
          </Button>
        </Grid>
        <Grid item xs={12} md={2}>
          <Button className={styles.button}
            variant="contained" startIcon={<ForwardIcon />} color="primary" onClick={() => CrearClientes()}
          > Crear Cliente
          </Button>
        </Grid>
        <Grid item xs={12} md={2}>
          <Button className={styles.button4}
            variant="contained" startIcon={<ForwardIcon />} color="primary" onClick={() => leerDatosClientes()}
          > Seleccionar Cliente
          </Button>
        </Grid>
        <Grid item xs={12} md={2}>
          <Button className={styles.button4}
            variant="contained" startIcon={<ForwardIcon />} color="primary" onClick={() => setIniciaVisita(true)}
          > Consultar programación
          </Button>
        </Grid>
      </Grid>

      <MaterialTable
        columns={columnas}
        data={listRegistroLlamadas}
        title="CONSULTAR REGISTRO DE LLAMADA"
        actions={[
          {
            icon: 'edit',
            tooltip: 'Editar Llamada',
            onClick: (event, rowData) => seleccionarLlamada(rowData, "Editar")
          },
          {
            icon: 'delete',
            tooltip: 'Borrar Llamada',
            onClick: (event, rowData) => seleccionarLlamada(rowData, "Eliminar")
          },
          {
            icon: PictureAsPdfIcon,
            tooltip: 'crear Pdf',
            onClick: (event, rowData) => seleccionarOrden(rowData, "Imprimir PDF")
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
        open={modalCodigoCliente}
        onClose={leerModalCodigoCliente}
      >
        {codigoCliente}
      </Modal>
      <Modal
        open={modalInsertar}
        onClose={abrirCerrarModalInsertar}
      >
        {llamadaInsertar}
      </Modal>

      <Modal
        open={modalIniciar}
        onClose={abrirCerrarModalIniciar}
      >
        {RegistrarSolicitudVisita}
      </Modal>

      <Modal
        open={modalEditar}
        onClose={abrirCerrarModalEditar}
      >
        {llamadaeditar}
      </Modal>

      <Modal
        open={modalEliminar}
        onClose={abrirCerrarModalEliminar}
      >
        {llamadaEliminar}
      </Modal>
    </div>
  );
}

export default RegistroLlamadas;