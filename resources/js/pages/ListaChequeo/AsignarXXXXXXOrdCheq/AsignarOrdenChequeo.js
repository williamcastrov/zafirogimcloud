import React, { useState, useEffect, Component } from "react";
import { Button, TextField, Select, MenuItem, FormControl, InputLabel, Grid, ButtonGroup, Typography, Container, Table } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { green, purple, blueGrey } from '@material-ui/core/colors';
import swal from 'sweetalert';
import Moment from 'moment';
import "bootstrap/dist/css/bootstrap.min.css";

import estadosServices from "../../../services/Parameters/Estados";
import empleadosServices from "../../../services/Interlocutores/Empleados";
import crearordenesServices from "../../../services/GestionOrdenes/CrearOrdenes";
import inventariosServices from "../../../services/Almacenes/Inventarios";
import cumplimientooservServices from "../../../services/GestionOrdenes/CumplimientoOserv";

const useStyles = makeStyles((theme) => ({
    modal: {
        position: 'absolute',
        width: 1000,
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

function AsignarOrdenChequeo(props) {

    const { ordenServicio, tipoOperacion } = props;
    //console.log("Codigo Orden : ", ordenServicio);
    //console.log("Tipo Operacion : ", tipoOperacion);
    const styles = useStyles();
    const [operario, setOperario] = React.useState("");
    const [grabar, setGrabar] = React.useState(false);
    const [grabarListaChequeo, setGrabarListaChequeo] = React.useState(false);

    const [tipooperacion, setTipoOperacion] = useState(0);
    const [referencia, setReferencia] = useState(0);
    const [actividadrealizada, setActividadrealizada] = useState(0);
    const [fechainicial, setFechainicial] = useState(0);
    const [fechafinal, setFechafinal] = useState(0);
    const [horainicial, setHorainicial] = useState(0);
    const [horafinal, setHorafinal] = useState(0);
    const [cantidad, setCantidad] = useState(0);
    const [valorunitario, setValorunitario] = useState(0);
    const [valortotal, setValortotal] = useState(0);
    const [serviciorealizado, setServicioRealizado] = useState(0);
    const [observacion, setObservacion] = useState(0);

    const [listIdOrden, setListIdOrden] = useState([]);
    const [listChequeoEntrega, setListChequeoEntrega] = useState([]);
    const [listChequeoRecepcion, setListChequeoRecepcion] = useState([]);
    const [listUnCumplimiento, setListUnCumplimiento] = useState([]);
    const [listarOrdenes, setListarOrdenes] = useState([]);
    const [listarEstados, setListarEstados] = useState([]);
    const [listarEmpleados, setListarEmpleados] = useState([]);
    const fechaactual = Moment(new Date()).format('YYYY-MM-DD');
    const horaactual = Moment(new Date()).format('HH:mm:ss');
    let cambio = 12;

    const [ordenSeleccionado, setOrdenSeleccionado] = useState({
        id_otr: "",
        estado_otr: "",
        tipo_otr: "",
        concepto_otr: "",
        fechaprogramada_otr: "",
        fechainicia_otr: "",
        fechafinal_otr: "",
        diasoperacion_otr: 0,
        equipo_otr: "",
        proveedor_otr: "",
        cliente_otr: "",
        operario_otr: "",
        grupoequipo_otr: "",
        subgrupoequipo_otr: "",
        ciudad_otr: "",
        resumenorden_otr: "",
        prioridad_otr: "",
        empresa_otr: ""
    })

    const [cumplimientoSeleccionado, setCumplimientoSeleccionado] = useState({
        id_cosv: 0,
        descripcion_cosv: "",
        tipooperacion_cosv: "",
        referencia_cosv: "",
        fechainicia_cosv: "",
        fechafinal_cosv: "",
        horainiciacosv: "",
        horafinal_cosv: "",
        cantidad_cosv: "",
        valorunitario_cosv: "",
        valortotal_cosv: "",
        servicio_cosv: "",
        observacion_cosv: ""
    });

    const agregarTarea = (e) => {
        e.preventDefault();

        if (operario === '') {
            console.log("Elemento Vacío");
            return;
        }

        //console.log("LISTAR ORDENES : ", listarOrdenes);

        {
            listarOrdenes.map((asignar) => (

                setOrdenSeleccionado([{
                    id_otr: asignar.id_otr,
                    estado_otr: cambio,
                    tipo_otr: asignar.tipo_otr,
                    concepto_otr: asignar.concepto_otr,
                    fechaprogramada_otr: asignar.fechaprogramada_otr,
                    fechainicia_otr: asignar.fechainicia_otr,
                    fechafinal_otr: asignar.fechafinal_otr,
                    diasoperacion_otr: asignar.diasoperacion_otr,
                    equipo_otr: asignar.equipo_otr,
                    proveedor_otr: asignar.proveedor_otr,
                    cliente_otr: asignar.cliente_otr,
                    operario_otr: operario,
                    grupoequipo_otr: asignar.grupoequipo_otr,
                    subgrupoequipo_otr: asignar.subgrupoequipo_otr,
                    ciudad_otr: asignar.ciudad_otr,
                    resumenorden_otr: asignar.resumenorden_otr,
                    prioridad_otr: asignar.prioridad_otr,
                    empresa_otr: asignar.empresa_otr
                }])
            ))
        }

        setGrabar(true)
    };

    const editar = (item) => {
        console.log(item);
        setOperario(item.operario_otr);

        //console.log("ESTADO ORDEN : ", item.estado_otr);
        if (item.estado_otr !== 1 && item.estado_otr !== 12) {
            swal("Asignar Orden de Servicio", "Estado de la Orden no Permite Cambios!", "warning", { button: "Aceptar" });
            return;
        }

        setOrdenSeleccionado([{
            id_otr: item.id_otr,
            estado_otr: cambio,
            tipo_otr: item.tipo_otr,
            concepto_otr: item.concepto_otr,
            fechaprogramada_otr: item.fechaprogramada_otr,
            fechainicia_otr: item.fechainicia_otr,
            fechafinal_otr: item.fechafinal_otr,
            diasoperacion_otr: item.diasoperacion_otr,
            equipo_otr: item.equipo_otr,
            proveedor_otr: item.proveedor_otr,
            cliente_otr: item.cliente_otr,
            operario_otr: item.operario_otr,
            grupoequipo_otr: item.grupoequipo_otr,
            subgrupoequipo_otr: item.subgrupoequipo_otr,
            ciudad_otr: item.ciudad_otr,
            resumenorden_otr: item.resumenorden_otr,
            prioridad_otr: item.prioridad_otr,
            empresa_otr: item.empresa_otr
        }]);

    };

    useEffect(() => {
        async function fetchDataOrdenes() {
            const res = await crearordenesServices.listUnaOrden(ordenServicio);
            setListarOrdenes(res.data);
            //console.log("Carga Orden", res.data);
        }
        fetchDataOrdenes();
    }, [])

    useEffect(() => {
        async function fetchDataListaChequeoEntrega() {
            const res = await inventariosServices.listEntregaEquipos();
            setListChequeoEntrega(res.data);
            //console.log("LISTA CHEQUEO ENTREGA : ", res.data);
        }
        fetchDataListaChequeoEntrega();
    }, [])

    useEffect(() => {
        async function fetchDataUnCumplimiento() {
            const res = await cumplimientooservServices.listUnCumplimiento(ordenServicio);
            setListUnCumplimiento(res.data);
            console.log("LEE DATOS CUMPLIMIENTO ORDEN : ", res.data)
        }
        fetchDataUnCumplimiento();
    }, [])

    useEffect(() => {
        async function fetchDataListaChequeoRecepcion() {
            const res = await inventariosServices.listRecepcionEquipos();
            setListChequeoRecepcion(res.data);
            //console.log("LISTA CHEQUEO RECEPCION : ", res.data);
        }
        fetchDataListaChequeoRecepcion();
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
            const res = await empleadosServices.listEmpleados();
            setListarEmpleados(res.data)
            //console.log(res.data);
        }
        fetchDataEmpleados();
    }, [])

    const datoslistachequeo = () => {
        if (tipoOperacion === 3) {
            { //listChequeoEntrega.length
                for (var i = 0; i < 2; i++) {
                    setCumplimientoSeleccionado([{
                        id_cosv: ordenServicio,
                        descripcion_cosv: listChequeoEntrega[i].descripcion_inv,
                        tipooperacion_cosv: listChequeoEntrega[i].tipooperacion_inv,
                        referencia_cosv: listChequeoEntrega[i].referencia_inv,
                        fechainicia_cosv: fechaactual,
                        fechafinal_cosv: fechaactual,
                        horainiciacosv: horaactual,
                        horafinal_cosv: horaactual,
                        cantidad_cosv: 0,
                        valorunitario_cosv: 0,
                        valortotal_cosv: 0,
                        servicio_cosv: 2,
                        observacion_cosv: " "
                        //cumplimientoSeleccionado
                    }]);
                   const prueba = cumplimientoSeleccionado.scile();
                }
            }
            console.log("VALOR DE PRUEBA : ",prueba);
        }
        else
            if (tipoOperacion === 4) {
                {
                    listChequeoRecepcion.map((item) => {
                        console.log("EN RECEPCION : ", item.descripcion_inv)

                        //validar(itemselect.razonsocial_int)
                    })
                }
            }
    }

    const asignaDatos = () => {

        //for (var n = 0; n < 2; n++) {
        datoslistachequeo();

        setGrabarListaChequeo(true);
        //}
    }


    useEffect(() => {
        if (grabar) {
            async function asignarEstado() {
                console.log("ASIGNAR NUEVO VALOR A BASE DE DATOS : ", ordenSeleccionado[0])

                const res = await crearordenesServices.updateestadoasignado(ordenSeleccionado[0]);

                if (res.success) {
                    swal("Orden de Servicio", "Orden de Servicio Actualizada de forma Correcta!", "success", { button: "Aceptar" });
                    console.log(res.message)
                } else {
                    swal("Orden de Servicio", "Error Actualizando la Orden de Servicio!", "error", { button: "Aceptar" });
                    console.log(res.message);
                }
                if (cumplimientoSeleccionado.id_cosv === 0) {
                    asignaDatos();
                }
            }
            asignarEstado();
        }
    }, [grabar])


    useEffect(() => {
        if (grabarListaChequeo) {
            async function asignarLista() {
                console.log("ASIGNAR LISTA DE CHEQUEO A ORDEN : ", cumplimientoSeleccionado[0]);
/*
                const res = await cumplimientooservServices.save(cumplimientoSeleccionado[0]);

                if (res.success) {
                    swal("Orden de Servicio", "Datos Lista de Chequeo Grabados Correctamente!", "success", { button: "Aceptar" });
                    console.log(res.message)
                } else {
                    swal("Orden de Servicio", "Error Creando Lista de Chequeo!", "error", { button: "Aceptar" });
                    console.log(res.message);
                }
                setGrabarListaChequeo(false);
*/
            }
            asignarLista();
        }
    }, [grabarListaChequeo])

    return (
        <div className={styles.modal} >
            <br />
            <div className="App">
                <Typography align="center" className={styles.typography} variant="button" display="block" >
                    ASIGNAR ORDEN DE SERVICIO
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
                                    {listarOrdenes.map((item) => (
                                        <tr key={item.id_otr}>
                                            <td>{item.id_otr}</td>
                                            <td>{item.nombre_est}</td>
                                            <td>{item.primer_nombre_emp}</td>
                                            <td>
                                                <Button variant="contained" color="primary" size="small" onClick={() => editar(item)}>
                                                    Editar
                                                </Button>{" "}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Container>
                    </ul>
                </Grid>
                <Grid item xs={12} md={4}>
                    <br />
                    <form onSubmit={agregarTarea} >
                        <FormControl className={styles.formControl}>
                            <InputLabel id="operario_otr">Operario</InputLabel>
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
                                    listarEmpleados.map((itemselect) => {
                                        return (
                                            <MenuItem value={itemselect.id_emp}>{itemselect.primer_nombre_emp}{ }{itemselect.primer_apellido_emp}</MenuItem>
                                        )
                                    })
                                }
                            </Select>
                        </FormControl>
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

export default AsignarOrdenChequeo;
