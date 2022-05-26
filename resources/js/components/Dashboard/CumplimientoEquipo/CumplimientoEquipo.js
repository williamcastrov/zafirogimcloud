import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Modal, Button, Table, TableBody, TableCell, TableContainer, InputLabel, Select, MenuItem } from '@material-ui/core';
import { TableHead, TableRow, Paper, Typography, Grid, TextField, FormControl } from '@material-ui/core';
import { green, blue, blueGrey, red } from '@material-ui/core/colors';
import { Bar } from 'react-chartjs-2';

//Leer Api
import consumosServices from "../../../services/Importar/ConsumosRepuestos";
import contratacionesServices from "../../../services/Importar/Contrataciones";
import facturacionServices from "../../../services/Importar/Facturacion";
import equiposServices from "../../../services/Mantenimiento/Equipos";

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 400,
    },
    modal: {
        position: 'absolute',
        width: 900,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    },
    typography: {
        fontSize: 16,
        color: "#ff3d00"
    },
    inputMaterial: {
        width: '100%'
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
        backgroundColor: blue[700],
        margin: theme.spacing(1),
        fontSize: 12,
        '&:hover': {
            backgroundColor: green[700],
        },
    },
    formControl: {
        margin: theme.spacing(0),
        minWidth: 180,
        maxWidth: 180,
    },
    typography: {
        fontSize: 16,
        color: "#ff3d00"
    }
}));



export default function CumplimientoEquipo() {
    const classes = useStyles();
    const [factTotMesEquipo, setFactTotMesEquipo] = useState([]);
    const [gastosTotMesEquipo, setGastosTotMesEquipo] = useState([]);
    const [etiqueta, setEtiqueta] = useState([]);
    const [actualiza, setActualiza] = useState(false);
    const [procesar, setProcesar] = useState(false);
    const [listarEquipos, setListarEquipos] = useState([]);

    const [equipo, setEquipo] = useState(0);
    const [equipo2, setEquipo2] = useState(0);
    const [equipo3, setEquipo3] = useState(0);

    const [anno, setAnno] = useState(0);
    const [mes, setMes] = useState(0);


    useEffect(() => {
        async function fetchDataEquipos() {
            const res = await equiposServices.listEquiposMontacargas();
            setListarEquipos(res.data);
        }
        fetchDataEquipos();
    }, [])

    const DatosCumplimientoEquipo = () => {
        var facturacion = [0,0];
        var gastos = [0,0];
        var label = [0,0];

        let codigo_fac = anno + mes + equipo;
        let codigo_fac2 = anno + mes + equipo2;
        let codigo_fac3 = anno + mes + equipo3;
        //console.log("CODIGO FAC-1 : ", codigo_fac)
        //console.log("CODIGO FAC-2 : ", codigo_fac2)

        async function fetchDataFactFacturacion() {
            const res = await facturacionServices.leerfactcodigomes("'" + codigo_fac + "'");
            if (res.data.length > 0) {
            //console.log("FACTURACION MES-1 : ", res.data)
                facturacion[0] = res.data[0].valor_fac;
                label[0] = res.data[0].equipo_fac;
                //console.log("FACTURACION MES-2: ", res.data[0].valor_fac)
            }
        }
        fetchDataFactFacturacion();

        async function fetchDataFactFacturacion2() {
            const res = await facturacionServices.leerfactcodigomes("'" + codigo_fac2 + "'");
            if (res.data.length > 0) {
                //console.log("FACTURACION MES-2 : ", res.data)
                facturacion[1] = res.data[0].valor_fac;
                label[1] = res.data[0].equipo_fac;
                //console.log("FACTURACION MES-2: ", res.data[0].valor_fac)
            }
        }
        fetchDataFactFacturacion2();

        async function fetchDataFactFacturacion3() {
            const res = await facturacionServices.leerfactcodigomes("'" + codigo_fac3 + "'");
            if (res.data.length > 0) {
                //console.log("FACTURACION MES-2 : ", res.data)
                facturacion[2] = res.data[0].valor_fac;
                label[2] = res.data[0].equipo_fac;
                //console.log("FACTURACION MES-2: ", res.data[0].valor_fac)
            }
        }
        fetchDataFactFacturacion3();

        async function fetchDataContratacion() {
            const res = await contratacionesServices.listarcontratacionesmesequipo("'" + codigo_fac + "'");
            if (res.data.length > 0) {
                gastos[0] = Math.round(res.data[0].valorcontratacionmesequipo);
                //console.log("CONTRATACION MES : ", res.data)
                //console.log("CONTRATACION MES-2 : ",res.data[0].valorcontratacionmesequipo);
            }
        }
        fetchDataContratacion();

        async function fetchDataContratacion2() {
            const res = await contratacionesServices.listarcontratacionesmesequipo("'" + codigo_fac2 + "'");
            if (res.data.length > 0) {
                gastos[1] = Math.round(res.data[0].valorcontratacionmesequipo);
                //console.log("CONTRATACION MES : ", res.data)
                //console.log("CONTRATACION MES-2 : ",res.data[0].valorcontratacionmesequipo);
            }
        }
        fetchDataContratacion2();

        async function fetchDataContratacion3() {
            const res = await contratacionesServices.listarcontratacionesmesequipo("'" + codigo_fac3 + "'");
            if (res.data.length > 0) {
                gastos[2] = Math.round(res.data[0].valorcontratacionmesequipo);
                //console.log("CONTRATACION MES : ", res.data)
                //console.log("CONTRATACION MES-3 : ",res.data[0].valorcontratacionmesequipo);
            }
        }
        fetchDataContratacion3();


        async function fetchDataConsumos() {
            const res = await consumosServices.listarconsumosmesequipo("'" + codigo_fac + "'");
            if (res.data.length > 0) {
                //console.log("CONSUMO MES : ", res.data)
                gastos[0] = gastos[0] + Math.round(res.data[0].valorconsumosrepmes);
                //console.log("CONSUMOS Mes-2: ", gastos[0])
            }
        }
        fetchDataConsumos();

        async function fetchDataConsumos2() {
            const res = await consumosServices.listarconsumosmesequipo("'" + codigo_fac2 + "'");
            if (res.data.length > 0) {
                //console.log("CONSUMO MES : ", res.data)
                gastos[1] = gastos[1] + Math.round(res.data[0].valorconsumosrepmes);
                //console.log("CONSUMOS Mes-2: ", gastos[0])
            }
        }
        fetchDataConsumos2();

        async function fetchDataConsumos3() {
            const res = await consumosServices.listarconsumosmesequipo("'" + codigo_fac3 + "'");
            if (res.data.length > 0) {
                //console.log("CONSUMO MES : ", res.data)
                gastos[2] = gastos[2] + Math.round(res.data[0].valorconsumosrepmes);
                //console.log("CONSUMOS Mes-2: ", gastos[0])
            }
        }
        fetchDataConsumos3();

        setFactTotMesEquipo(facturacion);
        setGastosTotMesEquipo(gastos);
        setEtiqueta(label);
        setProcesar(true);
    }

    const Graficar = () => {
        setActualiza(true);
    }
    /*
    useEffect(() => {
        if (procesar) {
            console.log("FACTURACION : ", factTotMesEquipo);
            console.log("GASTOS : ", gastosTotMesEquipo);
            console.log("LABEL : ", etiqueta);
            setActualiza(true);
        }
    }, [procesar])
*/
    const handleChange = e => {
        const { name, value } = e.target;
    }

    return (
        <div>
            <Typography align="center" className={classes.typography} variant="button" display="block"> Comparativo x Equipo </Typography>
            <Grid container spacing={2} >
                <Grid item xs={12} md={1}></Grid>
                <Grid item xs={12} md={1}>
                    <TextField type="numeric" className={classes.inputMaterial} label="Año" name="anno" fullWidth onChange={handleChange}
                        onChange={(e) => setAnno(e.target.value)} />
                </Grid>
                <Grid item xs={12} md={1}>
                    <TextField type="numeric" className={classes.inputMaterial} label="Mes" name="mes" fullWidth onChange={handleChange}
                        onChange={(e) => setMes(e.target.value)} />
                </Grid>
                <Grid item xs={12} md={3}>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="idselectequipo">EquipoUno</InputLabel>
                        <Select
                            labelId="selectequipo"
                            name="equipo"
                            id="idselectequipo"
                            fullWidth
                            onChange={handleChange}
                            onClick={(e) => setEquipo(e.target.value)}
                        >
                            <MenuItem value=""> <em>None</em> </MenuItem>
                            {
                                listarEquipos.map((itemselect) => {
                                    return (
                                        <MenuItem value={itemselect.codigo_equ}>{itemselect.codigo_equ}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="idselectequipo2">EquipoDos</InputLabel>
                        <Select
                            labelId="selectequipo2"
                            name="equipo2"
                            id="idselectequipo2"
                            fullWidth
                            onChange={handleChange}
                            onClick={(e) => setEquipo2(e.target.value)}
                        >
                            <MenuItem value=""> <em>None</em> </MenuItem>
                            {
                                listarEquipos.map((itemselect) => {
                                    return (
                                        <MenuItem value={itemselect.codigo_equ}>{itemselect.codigo_equ}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="idselectequipo2">EquipoTres</InputLabel>
                        <Select
                            labelId="selectequipo3"
                            name="equipo3"
                            id="idselectequipo3"
                            fullWidth
                            onChange={handleChange}
                            onClick={(e) => setEquipo3(e.target.value)}
                        >
                            <MenuItem value=""> <em>None</em> </MenuItem>
                            {
                                listarEquipos.map((itemselect) => {
                                    return (
                                        <MenuItem value={itemselect.codigo_equ}>{itemselect.codigo_equ}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <Grid container spacing={2} >
                <Grid item xs={12} md={9}></Grid>
                <Grid item xs={12} md={3}>
                    {
                        !procesar ?
                            <Button className={classes.button2} color="primary" onClick={() => DatosCumplimientoEquipo()} >Leer Datos</Button>
                            :
                            console.log("Debe leer Datos")
                    }

                </Grid>
                <Grid item xs={12} md={3}>
                    {
                        procesar ?
                            <Button className={classes.button} color="primary" onClick={() => Graficar()} >Graficar</Button>
                            :
                            console.log("Debe leer Datos")
                    }

                </Grid>
            </Grid>
            {
                actualiza ?
                    <IndicadorOT factTotMesEquipo={factTotMesEquipo} gastosTotMesEquipo={gastosTotMesEquipo} etiqueta={etiqueta} />
                    :
                    console.log("Valor en Cero")
            }

        </div>
    )
}

function IndicadorOT(props) {
    const { factTotMesEquipo, gastosTotMesEquipo, etiqueta } = props;

    //console.log("FACTURACION EN INDICADOR : ", factTotMesEquipo)
    //console.log("GASTOS EN INDICADOR : ", gastosTotMesEquipo)

    const classes = useStyles();
    const [leyenda, setLeyenda] = useState('Cumplimiento OT');
    //var cumplimiento = totalotterminadas / totalotmes
    //console.log("CUMPLIMIENTO : ", cumplimiento);

    const data = {
        labels: etiqueta,
        datasets: [
            {
                label: 'Facturacion Equipo',
                data: factTotMesEquipo,
                backgroundColor: 'rgb(2,119,189)',
            },
            {
                label: 'Gastos Equipo',
                data: gastosTotMesEquipo,
                backgroundColor: 'rgb(128,185,24)',
            }
        ],
    };

    const options = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        },
    };

    return (
        <div>
            <Grid container spacing={3} >
                <Grid item xs={12} md={12}  >
                    <Typography align="center" className={classes.typography} variant="button" display="block" >
                        Comparación Margen x Equipo Mes
                    </Typography >
                    <Typography variant="h2" align="center">

                    </Typography>
                    <Bar data={data} options={options} />
                </Grid>
            </Grid>
        </div>
    );
}
//  {`${(cumplimiento * 100).toFixed(0)} %`}
//
