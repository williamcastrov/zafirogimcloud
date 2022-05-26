import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Modal, Button, Table, TableBody, TableCell, TableContainer, InputLabel, Select, MenuItem } from '@material-ui/core';
import { TableHead, TableRow, Paper, Typography, Grid, TextField, FormControl } from '@material-ui/core';
import { green, blue, blueGrey, red } from '@material-ui/core/colors';
import { Bar } from 'react-chartjs-2';

//Leer Api
import ordenesServices from "../../../services/GestionOrdenes/CrearOrdenes";

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



export default function CumplimientoOT() {
    const [totalotmes, setTotalOTMes] = useState(0);
    const [totalotterminadas, setTotalOTTerminadas] = useState(0);
    const [grabar, setGrabar] = useState(false);
    const [anno, setAnno] = useState(0);
    const [mes, setMes] = useState(0);
    const classes = useStyles();


    const DatosCumplimientoOT = () => {
        setGrabar(true);
    }

    useEffect(() => {
        if (grabar) {
            var periodo = '"'+anno+'-'+mes+'-'+'01"';
            console.log("PERIODO TOTAL MES : ", periodo);

            async function fetchDataTotalOTMes() {
                const res = await ordenesServices.cumplimientototalotmes(periodo);
                console.log("TOTAL OT MES : ", res.data[0].cumplimientototalotmes);
                setTotalOTMes(res.data[0].cumplimientototalotmes);
            }
            fetchDataTotalOTMes();
            
            //console.log("PERIODO TOTAL TERMINADOS : ", periodo);
            async function fetchDataTotalOTTerminadas() {
                const res = await ordenesServices.cumplimientootterminadasmes(periodo);
                console.log("TOTAL OT TERMINADAS : ", res.data[0].cumplimientototalotterminadasmes);
                setTotalOTTerminadas(res.data[0].cumplimientototalotterminadasmes);
                //setModalCumplimientoOT(true);
            }
            fetchDataTotalOTTerminadas();
            setGrabar(false);
        }
    }, [grabar])

    /*
    const leerDatos = () => {
console.log("DATA : ", data)
console.log("OPTIONS : ", options)
    }
*/

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
                    <Button className={classes.button} color="primary" onClick={() => DatosCumplimientoOT()} >Confirmar</Button>
                </Grid>
            </Grid>
            {
                totalotterminadas > 0 ?
                    <IndicadorOT totalotmes={totalotmes} totalotterminadas={totalotterminadas} />
                    :
                    console.log("Valor en Cero")
            }

        </div>
    )
}

function IndicadorOT(props) {
    const { totalotmes, totalotterminadas } = props;
    //console.log("TOTAL OT MES : ", totalotmes)
    //console.log("TOTAL OT TERMINADAS MES : ", totalotterminadas)
    const classes = useStyles();
    const [leyenda, setLeyenda] = useState('Cumplimiento OT');
    var cumplimiento = totalotterminadas / totalotmes
    console.log("CUMPLIMIENTO : ", cumplimiento);

    const data = {
        labels: ['CUMPLIMIENTO OT MES'],
        datasets: [
            {
                label: 'Total OT Mes',
                data: [totalotmes],
                backgroundColor: 'rgb(2,119,189)',
            },
            {
                label: 'OT Terminadas Mes',
                data: [totalotterminadas],
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
                        Total OT Mes Vs OT Terminadas
                    </Typography >
                    <Typography variant="h2" align="center">
                         {`${(cumplimiento * 100).toFixed(0)} %`}
                    </Typography>
               
                    <Bar data={data} options={options} />
                </Grid>
            </Grid>
        </div>
    );
}


