import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Typography, Button, Grid, TextField, } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { green, blue, blueGrey, red } from '@material-ui/core/colors';

import contratacionesServices from "../../../services/Importar/Contrataciones";
import consumosrepuestosServices from "../../../services/Importar/ConsumosRepuestos";
import facturacionServices from "../../../services/Importar/Facturacion";

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 400,
    },
    modal: {
        position: 'absolute',
        width: 800,
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
    formControl: {
        margin: theme.spacing(0),
        minWidth: 300,
        maxWidth: 300,
    },
    typography: {
        fontSize: 16,
        color: "#ff3d00"
    }
}));

const data = {
    labels: ['MT101', 'MT102', 'MT178', 'MT193', 'MT206', 'MT167'],
    datasets: [
        {
            label: 'Facturación',
            data: [3145612, 2890121, 2146789, 3078024, 2734567, 3089453],
            backgroundColor: 'rgb(75, 192, 192)',
        },
        {
            label: 'Gastos',
            data: [1789121, 978872, 112401, 1812011, 1019212, 1901121],
            backgroundColor: 'rgb(255, 99, 132)',
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

function FacturacionVsGastos(props) {
    const classes = useStyles();
    const [listarcontrataciones, setListarContrataciones] = useState([]);
    const [listarconsumos, setListarConsumos] = useState([]);
    const [listartotalmes, setListarTotalMes] = useState([]);
    const [listarconsumostotalmes, setListarConsumosTotalMes] = useState([]);

    const [listarfactequipomes, setListarFactEquipoMes] = useState([]);
    const [listarcodigosequipomes, setListarCodigosEquipoMes] = useState([]);
    const [listargastosequipomes, setListarGastosEquipoMes] = useState([]);

    const [grabar, setGrabar] = useState(false);
    const [leido, setLeido] = useState(false);
    const [procesa, setProcesa] = useState(false);
    const [control, setControl] = useState(true);
    const [anno, setAnno] = useState(0);
    const [mes, setMes] = useState(0);
    const [totalVeinte, setTotalVeinte] = useState(0);

    const [veinteContrataciones, setVeinteContrataciones] = useState([]);
    const [veinteConsumos, setVeinteConsumos] = useState([]);

    const DatosContrataciones = () => {
        setGrabar(true);
    }

    const handleChange = e => {
        const { name, value } = e.target;
    }

    useEffect(() => {
        if (grabar) {
            var periodo = "" + anno + mes;

            async function fetchDataContrataciones() {
                const res = await contratacionesServices.paretoconsolidadocontra(periodo);
                setListarContrataciones(res.data);
            }
            fetchDataContrataciones();

            async function fetchDataConsumos() {
                const res = await consumosrepuestosServices.paretoconsolidadoconsumosrep(periodo);
                setListarConsumos(res.data);
            }
            fetchDataConsumos();
        }
    }, [grabar])

    useEffect(() => {
        if (grabar) {
            var periodo = "" + anno + mes;

            async function fetchDataContrataciones() {
                const res = await contratacionesServices.consolidadocontrames(periodo);
                setListarTotalMes(res.data);
            }
            fetchDataContrataciones();

            async function fetchDataConsumos() {
                const res = await consumosrepuestosServices.consolidadoconsumosrepmes(periodo);
                setListarConsumosTotalMes(res.data);
            }
            fetchDataConsumos();
        }
    }, [grabar])

    const FormanElVeinte = () => {
        if (!leido) {
            var cantidad = listarcontrataciones.length;
            var cantidadconsumos = listarconsumos.length;
            var total = 0;
            var totalconsumos = 0;
            var hastaVeinte = listartotalmes[0].valorcontratacionmes * 0.20;
            var hastaVeinteConsumos = listarconsumostotalmes[0].valorconsumosrepmes * 0.20;
            var contrataciones = [];
            var consumos = [];
            var gastos = [];
            var maquinas = [];
            var indice = 0;

            for (var i = 0; i < cantidad; i++) {
                total = total + listarcontrataciones[i].paretovalorcontrataciones;
                contrataciones[i] = listarcontrataciones[i].codigo;

                gastos[indice] = Math.round(listarcontrataciones[i].paretovalorcontrataciones);
                maquinas[indice] = listarcontrataciones[i].documentoref;
                indice++;

                if (total > hastaVeinte) {
                    var itemsVeinte = i;
                    i = cantidad;
                }
            }

            for (var i = 0; i < cantidadconsumos; i++) {
                totalconsumos = totalconsumos + listarconsumos[i].paretovalorconsumosrep;
                consumos[i] = listarconsumos[i].codigo_cre;

                gastos[indice] = Math.round(listarconsumos[i].paretovalorconsumosrep);
                maquinas[indice] = listarconsumos[i].idequipo_cre;
                indice++;

                if (totalconsumos > hastaVeinteConsumos) {
                    var itemsVeinteConsumos = i;
                    i = cantidadconsumos;
                }
            }

            setVeinteContrataciones(contrataciones);
            setVeinteConsumos(consumos);
            setListarGastosEquipoMes(gastos);
            setListarCodigosEquipoMes(maquinas);
            setLeido(true);
            setProcesa(true);
        }
    }

    const leerFacturacion = () => {
        if (control) {
            var longcontrataciones = veinteContrataciones.length;
            var longconsumos = veinteConsumos.length;
            var facturacion = [];
            var indice = 0;

            for (var i = 0; i < longcontrataciones; i++) {
                async function fetchDataFactContrataciones() {
                    const res = await facturacionServices.leerfactcodigomes("'" + veinteContrataciones[i] + "'");
                    console.log("DATOS FACTURACION : ",res.data)
                    if(res.data.length > 0)
                      facturacion[indice] = res.data[0].valorrentames;
                    else
                        facturacion[indice] = 0;
                    indice++;
                }
                fetchDataFactContrataciones();
            }

            for (var i = 0; i < longconsumos; i++) {
                async function fetchDataFactConsumos() {
                    const res = await facturacionServices.leerfactcodigomes("'" + veinteConsumos[i] + "'");
                    console.log("DATOS FACTURACION: ",res.data)
                    //facturacion[indice] = res.data[0].valorrentames;
                    if(res.data.length > 0)
                      facturacion[indice] = res.data[0].valorrentames;
                    else
                        facturacion[indice] = 0;
                    indice++;
                }
                fetchDataFactConsumos();
            }
            setListarFactEquipoMes(facturacion);
            //console.log("CODIGOS EQUIPOS : ", listarcodigosequipomes);
            //console.log("FACTURACION EQUIPOS : ", listarfactequipomes);
            //console.log("GASTOS EQUIPOS : ", listargastosequipomes);
            setControl(false);
            setProcesa(true);
        }
    }

    useEffect(() => {
        if (procesa) {
            leerFacturacion();
        }
    }, [procesa])

    return (
        <div>
            <Typography align="center" className={classes.typography} variant="button" display="block"> Indicador Cumplimiento OT </Typography>
            <Grid container spacing={2} >
                <Grid item xs={12} md={3}></Grid>
                <Grid item xs={12} md={2}>
                    <TextField type="numeric" className={classes.inputMaterial} label="Año" name="anno" fullWidth 
                        onChange={(e) => setAnno(e.target.value)} />
                </Grid>
                <Grid item xs={12} md={2}>
                    <TextField type="numeric" className={classes.inputMaterial} label="Mes" name="mes" fullWidth
                        onChange={(e) => setMes(e.target.value)} />
                </Grid>
                <Grid item xs={12} md={2}>
                    <Button className={classes.button} color="primary" onClick={() => DatosContrataciones()} >Confirmar</Button>
                </Grid>
            </Grid>
            {
                listarcontrataciones.length > 0 ?
                    (
                        listartotalmes.length > 0 ?
                            (
                                listarconsumos.length > 0 ?
                                    (
                                        listarconsumostotalmes.length > 0 ?
                                            FormanElVeinte()
                                            :
                                            console.log("DATOS EN BLANCO")
                                    )
                                    :
                                    console.log("DATOS EN BLANCO")
                            )
                            :
                            console.log("DATOS EN BLANCO")
                    )
                    :
                    console.log("DATOS EN BLANCO")
            }

            <IndicadorGastosFacturacion listarcodigosequipomes={listarcodigosequipomes}
                listarfactequipomes={listarfactequipomes}
                listargastosequipomes={listargastosequipomes} />

        </div>
    );

}

function IndicadorGastosFacturacion(props) {
    const { listarcodigosequipomes, listarfactequipomes, listargastosequipomes } = props;
    //console.log("CODIGOS MES : ", listarcodigosequipomes)
    //console.log("FACTURACION MES : ", listarfactequipomes)
    //console.log("GASTOS MES : ", listargastosequipomes)
    const classes = useStyles();

    //const [leyenda, setLeyenda] = useState('Cumplimiento OT');
    //var cumplimiento = totalotterminadas / totalotmes
    //console.log("CUMPLIMIENTO : ", cumplimiento);

    const data = {
        labels: listarcodigosequipomes,
        datasets: [
            {
                label: 'Facturación Mes',
                data: listarfactequipomes,
                backgroundColor: 'rgb(128,185,24)',
            },
            {
                label: 'Gastos Mes',
                data: listargastosequipomes,
                backgroundColor: 'rgba(248,80,50,1)',
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
                        Facturación Vs Gastos por Maquina
                    </Typography >
                    <Typography variant="h2" align="center">

                    </Typography>
                    <Bar data={data} options={options} />
                </Grid>
            </Grid>
        </div>
    );
}

//    
//<Bar data={data} options={options} />
// <Button className={classes.button} color="primary" onClick={() => ValorPrueba()} >Prueba</Button>

export default FacturacionVsGastos;