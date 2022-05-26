import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Button, Table, TableBody, TableCell, TableContainer, InputLabel, Select, MenuItem, } from '@material-ui/core';
import { TableHead, TableRow, Paper, Typography, Grid, TextField, FormControl } from '@material-ui/core';
import { green, blue, blueGrey, red } from '@material-ui/core/colors';
import Loading from "../../../../components/Loading";

//Leer Api
import rentabilidadPeriodosServices from "../../../../services/Importar/RentabilidadPeriodo";
import conceptosRentabilidadServices from "../../../../services/Importar/ConceptosRentabilidad";
import equiposServices from "../../../../services/Mantenimiento/Equipos";

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
    const [listEquipos, setListEquipos] = useState([]);
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
            setListConceptosRentabilidad(res.data);
        }
        fetchDataConceptosRentabilidad();
    }, [])

    useEffect(() => {
        async function fetchDataEquipos() {
            const res = await equiposServices.detalleequipos();
            setListEquipos(res.data);
        }
        fetchDataEquipos();
    }, [])

    const generarPeriodoRentabilidad = () => {
        let periodo = anno + mes;
        var conceptos = [];
        var longitud = listConceptosRentabilidad.length;

        setLoading(true);
/*'id_rtb',
            'periodo_rtb',
            'equipo_rtb',
            */
        
        for (var i = 0; i < longitud; i++) {
            //const res = await rentabilidadPeriodosServices.save(listConceptosRentabilidad[i]);

            console.log("LIST CONCEPTOS : ",listConceptosRentabilidad)

            if(i=== 0){
                conceptos[i] = [{nombrefacturacion:listConceptosRentabilidad[i].nombre_rtb}, {tipofacturacion:listConceptosRentabilidad[i].tipo_rtb}, {valorfacturacion_rtb:0}];
            }else
            if(i===1){
                conceptos[i] = [{nombreconsumointerno:listConceptosRentabilidad[i].nombre_rtb}, {tipoconsumointerno:listConceptosRentabilidad[i].tipo_rtb}, {valorconsumointerno_rtb:0}];
            }else
            if(i===2){
                conceptos[i] = [{nombrerepuestos:listConceptosRentabilidad[i].nombre_rtb}, {tiporepuestos:listConceptosRentabilidad[i].tipo_rtb}, {valorrepuestos_rtb:0}];
            }else
            if(i===3){
                conceptos[i] = [{mttocorrectivo:listConceptosRentabilidad[i].nombre_rtb}, {tipomttocorrectivo:listConceptosRentabilidad[i].tipo_rtb}, {valormttocorrectivo_rtb:0}];
            }else
            if(i===4){
                conceptos[i] = [{nombremttopreventivo:listConceptosRentabilidad[i].nombre_rtb}, {tipomttopreventivo:listConceptosRentabilidad[i].tipo_rtb}, {valormttopreventivo_rtb:0}];
            }else
            if(i===5){
                conceptos[i] = [{nombreentregaequipo:listConceptosRentabilidad[i].nombre_rtb}, {tipoentregaequipo:listConceptosRentabilidad[i].tipo_rtb}, {valorentregaequipo_rtb:0}];
            }else
            if(i===6){
                conceptos[i] = [{nombredevoluciónequipo:listConceptosRentabilidad[i].nombre_rtb}, {tipodevoluciónequipo:listConceptosRentabilidad[i].tipo_rtb}, {valordevoluciónequipo_rtb:0}];
            }else
            if(i===7){
                conceptos[i] = [{nombrediagnostico:listConceptosRentabilidad[i].nombre_rtb}, {tipodiagnostico:listConceptosRentabilidad[i].tipo_rtb}, {valordiagnostico_rtb:0}];
            }
            
            //conceptos[i] = nombre:listConceptosRentabilidad[i].nombre_rtb, {tip:listConceptosRentabilidad[i].tipo_rtb}, {valor:0};
        }
        //console.log("CONCEPTOS : ",conceptos)
        setLoading(false);
        var conceptosRenta = conceptos[0].concat(conceptos[1], conceptos[2], conceptos[3], conceptos[4], conceptos[5], conceptos[6], conceptos[7]);

        var conceptosmaquina = [];

        var longitud = listEquipos.length;

        setLoading(true);

        for (var i = 0; i < longitud; i++) {
            //const res = await rentabilidadPeriodosServices.save(listConceptosRentabilidad[i]);
            console.log("EQUIPO : ", listEquipos[i].codigo_equ);
            conceptosmaquina[i] = [{id_rtb:i}, {periodo_rtb:periodo}, {equipo_rtb:listEquipos[i].codigo_equ}];
        }

        var conceptosmaquinaperiodo = [];

        for (var i = 0; i < longitud; i++) {
            //const res = await rentabilidadPeriodosServices.save(listConceptosRentabilidad[i]);
            conceptosmaquinaperiodo[i] = conceptosmaquina[i].concat(conceptosRenta);
        }

        setRentabilidadPeriodoSeleccionado(conceptosmaquinaperiodo);
        setLoading(false);
    }

    const Datos = () => {
        console.log("RENTABILIDAD PERIODO : ", rentabilidadPeriodoSeleccionado);

        var longitud = rentabilidadPeriodoSeleccionado.length;

        const addContrataciones = async () => {
            setLoading(true);

            for (var i = 0; i < 2; i++) {
                const res = await rentabilidadPeriodosServices.save(rentabilidadPeriodoSeleccionado[i]);

                if (!res.success)
                    setOk(false)
            }

            if (ok) {
                setLoading(false);
                swal("Subir Contrataciones", "Archivo de Contrataciones cargado de forma correcta!", "success", { button: "Aceptar" });
                console.log(res.message)

                //abrirCerrarModalCancelar();
            }
            else {
                swal("Subir Contrataciones", "Error Subiendo Archivo de contrataciones!", "error", { button: "Aceptar" });
                console.log(res.message);
                //abrirCerrarModalCancelar();
            }

            setLoading(false);
        }
        addContrataciones();
        
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