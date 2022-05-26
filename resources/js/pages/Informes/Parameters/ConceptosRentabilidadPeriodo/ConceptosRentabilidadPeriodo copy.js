import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Button, Table, TableBody, TableCell, TableContainer, InputLabel, Select, MenuItem, } from '@material-ui/core';
import { TableHead, TableRow, Paper, Typography, Grid, TextField, FormControl } from '@material-ui/core';
import { green, blue, blueGrey, red } from '@material-ui/core/colors';
import Loading from "../../../../components/Loading";

//Leer Api
import rentabilidadPeriodosServices from "../../../../services/Importar/RentabilidadPeriodo";
import conceptosRentabilidadServices from "../../../../services/Importar/ConceptosRentabilidad";

const useStyles = makeStyles((theme) => ({
    modal: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    },
    table: {
        minWidth: 700,
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
}));

function ConceptosRentabilidadPeriodo() {
    const classes = useStyles();
    const [listConceptosRentabilidad, setListConceptosRentabilidad] = useState([]);
    const [anno, setAnno] = useState(0);
    const [mes, setMes] = useState(0);
    const [loading, setLoading] = useState(false);
    const [ok, setOk] = useState(true);

    const [rentabilidadPeriodoSeleccionado, setRentabilidadPeriodoSeleccionado] = useState([]);

    const handleChange = e => {
        const { name, value } = e.target;
    }

    useEffect(() => {
        async function fetchDataConceptosRentabilidad() {
            const res = await conceptosRentabilidadServices.listconceptosrentabilidad();
            console.log("CONCEPTOS RENTABILIDAD : ", res.data)
            setListConceptosRentabilidad(res.data);
        }
        fetchDataConceptosRentabilidad();
    }, [])

    const generarPeriodoRentabilidad = () => {
        let periodo = anno + mes;
        console.log("CODIGO PERIODO : ", periodo)

        const addPeriodoRentabilidad = async () => {
            console.log("CONCEPTOS RENTABILIDAD : ", listConceptosRentabilidad)

            var longitud = listConceptosRentabilidad.length;
            console.log("LONGITUD : ", longitud);
            setLoading(true);

            for (var i = 0; i < longitud; i++) {
                const res = await rentabilidadPeriodosServices.save(listConceptosRentabilidad[i]);

                {
                    setRentabilidadPeriodoSeleccionado[{
                        id_rtp: i,
                        periodo_rtp: periodo,
                        equipo_rtp: 'XXXXX',
                        nombre_rtp: listConceptosRentabilidad[i].nombre_rtp,
                        tipo_rtb: listConceptosRentabilidad[i].tipo_rtp,
                        valorconcepto_rtp: 0
                    }];
                }
            }

            setLoading(false);
        }
        addPeriodoRentabilidad();
    }

    const Datos = () => {
        console.log("DATOS : ", rentabilidadPeriodoSeleccionado)
    }

    return (
        <div className={classes.modal} >
            <Typography align="center" className={classes.typography} variant="button" display="block"> Generar Periodo Rentabilidad </Typography>
            <Grid container spacing={2} >
                <Grid item xs={12} md={4}>
                    <TextField type="numeric" className={classes.inputMaterial} label="Año" name="anno" fullWidth onChange={handleChange}
                        onChange={(e) => setAnno(e.target.value)} />
                </Grid>
                <Grid item xs={12} md={4}>
                    <TextField type="numeric" className={classes.inputMaterial} label="Mes" name="mes" fullWidth onChange={handleChange}
                        onChange={(e) => setMes(e.target.value)} />
                </Grid>
                <Grid item xs={12} md={4}>
                    <Button className={classes.button} color="primary" onClick={() => generarPeriodoRentabilidad()} >Confirmar</Button>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Button className={classes.button} color="primary" onClick={() => Datos()} >Datos</Button>
                </Grid>
            </Grid>
            <div className="App">
                {
                    loading ? <Loading /> : null
                }
            </div>

        </div>
    );
}

export default ConceptosRentabilidadPeriodo;