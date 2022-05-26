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

function AsignarOrden(props) {

    const { ordenServicio } = props;
    console.log("Codigo Orden : ", ordenServicio);
    const styles = useStyles();
    const [operario, setOperario] = React.useState("");
    const [grabar, setGrabar] = React.useState(false);

    const [listarOrdenes, setListarOrdenes] = useState([]);
    const [listarEstados, setListarEstados] = useState([]);
    const [listarEmpleados, setListarEmpleados] = useState([]);
    let cambio = 12;

    const [ordenSeleccionado, setOrdenSeleccionado] = useState({
        'id_otr': "",
        'estado_otr': "",
        'tipo_otr': "",
        'tipooperacion_otr': "",
        'tiposervicio_otr': "",
        'fechaprogramada_otr': "",
        'fechainicia_otr': "",
        'fechafinal_otr': "",
        'diasoperacion_otr': 0,
        'equipo_otr': "",
        'proveedor_otr': "",
        'cliente_otr': "",
        'operario_otr': "",
        'contactocliente_otr': "",
        'subgrupoequipo_otr': "",
        'ciudad_otr': "",
        'resumenorden_otr': "",
        'prioridad_otr': "",
        'empresa_otr': ""
    })

    const agregarTarea = (e) => {
        e.preventDefault();

        if (operario === '') {
            console.log("Elemento Vacío");
            return;
        }

        console.log("LISTAR ORDENES : ",listarOrdenes);

        {
            listarOrdenes.map((asignar) => (

                setOrdenSeleccionado([{
                    id_otr: asignar.id_otr,
                    estado_otr: cambio,
                    tipo_otr: asignar.tipo_otr,
                    tipooperacion_otr: asignar.tipooperacion_otr,
                    tiposervicio_otr: asignar.tiposervicio_otr,
                    fechaprogramada_otr: asignar.fechaprogramada_otr,
                    fechainicia_otr: asignar.fechainicia_otr,
                    fechafinal_otr: asignar.fechafinal_otr,
                    diasoperacion_otr: asignar.diasoperacion_otr,
                    equipo_otr: asignar.equipo_otr,
                    proveedor_otr: asignar.proveedor_otr,
                    cliente_otr: asignar.cliente_otr,
                    operario_otr: operario,
                    contactocliente_otr: asignar.contactocliente_otr,
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
 
        console.log("ESTADO ORDEN : ",item.estado_otr);
        if(item.estado_otr !== 1 && item.estado_otr !== 12 ){
            swal("Asignar Orden de Servicio", "Estado de la Orden no Permite Cambios!", "warning", { button: "Aceptar" });
            return;
        }

        setOrdenSeleccionado([{
            id_otr: item.id_otr,
            estado_otr: cambio,
            tipo_otr: item.tipo_otr,
            tipooperacion_otr: item.tipooperacion_otr,
            tiposervicio_otr: item.tiposervicio_otr,
            fechaprogramada_otr: item.fechaprogramada_otr,
            fechainicia_otr: item.fechainicia_otr,
            fechafinal_otr: item.fechafinal_otr,
            diasoperacion_otr: item.diasoperacion_otr,
            equipo_otr: item.equipo_otr,
            proveedor_otr: item.proveedor_otr,
            cliente_otr: item.cliente_otr,
            operario_otr: item.operario_otr,
            contactocliente_otr: item.contactocliente_otr,
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
            const res = await empleadosServices.listEmpleados();
            setListarEmpleados(res.data)
            //console.log(res.data);
        }
        fetchDataEmpleados();
    }, [])

    useEffect(() => {
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
        }
        asignarEstado();
    }, [grabar])

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
                                    listarEmpleados && listarEmpleados.map((itemselect) => {
                                        return (
                                            <MenuItem value={itemselect.id_emp}>{itemselect.primer_nombre_emp}{ }{itemselect.primer_apellido_emp}</MenuItem>
                                        )
                                    })
                                }
                            </Select>
                        </FormControl>
                        <div >
                            <Button className={styles.button}  variant="contained" type="submit" size="small" color="secondary" >
                                Actualizar
                            </Button>
                        </div>
                       
                    </form>
                </Grid>

            </Grid>
        </div>

    );
}

export default AsignarOrden;
