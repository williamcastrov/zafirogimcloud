import React, { useState, useEffect, Component } from "react";
import { Button, TextField, Select, MenuItem, FormControl, InputLabel, Grid, ButtonGroup, Typography, Container, Table } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { green, purple, blueGrey } from '@material-ui/core/colors';
import swal from 'sweetalert';
import Moment from 'moment';
import "bootstrap/dist/css/bootstrap.min.css";
import shortid from "shortid";
import estadosServices from "../../../services/Parameters/Estados";
import empleadosServices from "../../../services/Interlocutores/Empleados";
import crearordenesServices from "../../../services/GestionOrdenes/CrearOrdenes";
import cumplimientooservServices from "../../../services/GestionOrdenes/CumplimientoOserv";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    modal: {
        position: 'absolute',
        width: 1200,
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
        backgroundColor: green[500],
        margin: theme.spacing(1),
        fontSize: 12,
        '&:hover': {
            backgroundColor: green[700],
        },
    },
}));

function CrearActividad(props) {
    const { ordenServicio, actividadesActivasOT, actividadesTotalesOT } = props;
    console.log("Codigo Orden : ", ordenServicio);
    const styles = useStyles();
    const history = useHistory();
    const [operario, setOperario] = React.useState(0);
    const [operarioDos, setOperarioDos] = React.useState(0);
    const [comentarios, setComentarios] = React.useState(0);
    const [grabar, setGrabar] = React.useState(false);

    const [listarOrdenes, setListarOrdenes] = useState([]);
    const [listarEstados, setListarEstados] = useState([]);
    const [listarEmpleados, setListarEmpleados] = useState([]);
    const fechainicial = Moment(new Date()).format('2001-01-01 00:00:00');
    const fechaactual = Moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
    const [idCumplimiento, setIdCumplimiento] = useState(0);
    let cambio = 12;
    let servicio = 1;
    let consecutivo = actividadesTotalesOT + 1;
    let idactividad = "" + ordenServicio + (actividadesTotalesOT + 1);
    //console.log("IDACTIVIDAD : ", idactividad)

    const [cumplimientoSeleccionado, setCumplimientoSeleccionado] = useState({
        id: consecutivo,
        id_cosv: "",
        id_actividad: idactividad,
        descripcion_cosv: "",
        tipooperacion_cosv: "",
        tipofallamtto_cosv: "",
        referencia_cosv: "",
        cantidad_cosv: "",
        valorunitario_cosv: "",
        valortotal_cosv: "",
        servicio_cosv: servicio,
        observacion_cosv: "",
        tiempoactividad_cosv: 0,
        tipo_cosv: "",
        fechaprogramada_cosv: fechaactual,
        fechainicia_cosv: fechainicial,
        fechafinal_cosv: "",
        operario_cosv: operario,
        operariodos_cosv: operarioDos,
        resumenactividad_cosv: "",
        iniciatransporte_cosv: fechainicial,
        finaltransporte_cosv: fechainicial,
        tiempotransporte_cosv: 0,
        horometro_cosv:0,
        combogrupo_cosv:0,
        estado_cosv: 23,
        idcomponente: 0,
        seriecomponente: 0,
        voltajecomponente: 0,
        voltajesalidasulfatacion: 0,
        amperajecomponente: 0,
        celdasreferenciacomponente: 0,
        cofreseriecomponentes: 0,
        estadocomponentes: 0,
        estadooperacionequipo_cosv: 81,
        comentarios_cosv: comentarios,
        placavehiculo_cosv: 0
    });

    const agregarActividad = (e) => {
        e.preventDefault();

        if (operario === '') {
            swal("Asignar Orden de Trabajo", "Debe asignar un Técnico!", "warning", { button: "Aceptar" });
            return;
        }
        
        // SE Comenta por solicitud de Logistral, la OT puede tener mas de una actividad abierta.
        /*
        if (actividadesActivasOT > 0) {
            swal("Asignar Orden de Trabajo", "Esta OT tiene una Actividad en Proceso, Deben Terminar Actividad Anterior !", "warning", { button: "Aceptar" });
            return;
        }
        */
        //console.log("LISTAR ORDENES : ", listarOrdenes);
        //console.log("OPERARIO UNO : ", operario);
        //console.log("OPERARIO DOS : ", operarioDos);

        {
            listarOrdenes && listarOrdenes.map((asignar) => (
                setCumplimientoSeleccionado([{
                    id: consecutivo,
                    id_cosv: ordenServicio,
                    id_actividad: idactividad,
                    descripcion_cosv: "",
                    tipooperacion_cosv: 8,
                    tipofallamtto_cosv: 48,
                    referencia_cosv: 0,
                    cantidad_cosv: 0,
                    valorunitario_cosv: 0,
                    valortotal_cosv: 0,
                    servicio_cosv: servicio,
                    observacion_cosv: "",
                    tiempoactividad_cosv: 0,
                    tipo_cosv: 1,
                    fechaprogramada_cosv: fechaactual,
                    fechainicia_cosv: fechainicial,
                    fechafinal_cosv: fechaactual,
                    operario_cosv: operario,
                    operariodos_cosv: operarioDos,
                    resumenactividad_cosv: "",
                    iniciatransporte_cosv: fechainicial,
                    finaltransporte_cosv: fechainicial,
                    tiempotransporte_cosv: 0,
                    horometro_cosv: 0,
                    combogrupo_cosv: 0,
                    estado_cosv: 23,
                    idcomponente: 0,
                    seriecomponente: 0,
                    voltajecomponente: 0,
                    voltajesalidasulfatacion: 0,
                    amperajecomponente: 0,
                    celdasreferenciacomponente: 0,
                    cofreseriecomponentes: 0,
                    estadocomponentes: 0,
                    estadooperacionequipo_cosv: 81,
                    comentarios_cosv: comentarios,
                    placavehiculo_cosv: 0
                }])
            ))
        }

        setGrabar(true)
    };

    useEffect(() => {
        setIdCumplimiento(consecutivo);
        async function fetchDataOrdenes() {
            const res = await crearordenesServices.leerot(ordenServicio);
            setListarOrdenes(res.data);
            console.log("Carga Orden", res.data);
        }
        fetchDataOrdenes();
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
        async function fetchDataEmpleados() {
            const res = await empleadosServices.listEmpleadosOT();
            setListarEmpleados(res.data)
            //console.log(res.data);
        }
        fetchDataEmpleados();
    }, [])

    useEffect(() => {
        async function crearActividad() {
            if (grabar) {
                //console.log("DATOS CREAR ACTIVIDAD : ", cumplimientoSeleccionado[0])
                
                const res = await cumplimientooservServices.save(cumplimientoSeleccionado[0]);

                if (res.success) {
                    swal("Crear Actividad OT", "Actividad de la OT Creada de forma Correcta!", "success", { button: "Aceptar" });
                    console.log(res.message)
                    window.location.reload();
                } else {
                    swal("Crear actividad OT", "Error Creando la Actividad de la OT!", "error", { button: "Aceptar" });
                    console.log(res.message);
                }
                
            }
        }
        crearActividad();
    }, [grabar])

    return (
        <div className={styles.modal} >
            <br />
            <div className="App">
                <Typography align="center" className={styles.typography} variant="button" display="block" >
                    CREAR ACTIVIDAD OT # {ordenServicio}
                </Typography>
            </div>

            <br />
            <Grid container spacing={2}>
                <Grid item xs={12} md={8}>
                    <ul>
                        <Container>
                            <br />
                            <Table>
                                <thead>
                                    <tr>
                                        <th># Orden</th>
                                        <th>Estado</th>
                                        <th>Operario</th>
                                        <th>Acción</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {listarOrdenes && listarOrdenes.map((item) => (
                                        <tr key={item.id_otr}>
                                            <td>{item.id_otr}</td>
                                            <td>{item.nombre_est}</td>
                                            <td>{item.primer_nombre_emp}</td>
                                            <td>{item.razonsocial_cli}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Container>
                    </ul>
                </Grid>
                <Grid item xs={12} md={4}>
                    <br />
                    <form onSubmit={agregarActividad} >
                        <FormControl className={styles.formControl}>
                            <InputLabel id="operario_otr">Técnico</InputLabel>
                            <Select
                                labelId="selectoperario_otr_otr"
                                name="operario_otr"
                                id="idselectoperario_otr"
                                fullWidth
                                value={operario}
                                onChange={(e) => setOperario(e.target.value)}
                            >
                                <MenuItem value=""> <em>None</em> </MenuItem>
                                {
                                    listarEmpleados && listarEmpleados.map((itemselect) => {
                                        return (
                                            <MenuItem value={itemselect.id_emp}>{itemselect.primer_nombre_emp}{" "}{itemselect.primer_apellido_emp}</MenuItem>
                                        )
                                    })
                                }
                            </Select>
                        </FormControl>
                        <FormControl className={styles.formControl}>
                            <InputLabel id="operariodos_otr">Técnico Dos</InputLabel>
                            <Select
                                labelId="selectoperariodos_otr"
                                name="operariodos_otr"
                                id="idselectoperariodos_otr"
                                fullWidth
                                value={operarioDos}
                                onChange={(e) => setOperarioDos(e.target.value)}
                            >
                                <MenuItem value=""> <em>None</em> </MenuItem>
                                {
                                    listarEmpleados && listarEmpleados.map((itemselect) => {
                                        return (
                                            <MenuItem value={itemselect.id_emp}>{itemselect.primer_nombre_emp}{" "}{itemselect.primer_apellido_emp}</MenuItem>
                                        )
                                    })
                                }
                            </Select>
                        </FormControl>
                        <TextField name="comentarios_cosv" label="Comentarios para el Técnico" fullWidth
                                   onChange={(e) => setComentarios(e.target.value)} />
                        <div >
                            <Button className={styles.button} variant="contained" type="submit" size="small" color="secondary" >
                                Actualizar
                            </Button>
                        </div>
                    </form>
                </Grid>

            </Grid>
        </div>

    );
}

export default CrearActividad;
