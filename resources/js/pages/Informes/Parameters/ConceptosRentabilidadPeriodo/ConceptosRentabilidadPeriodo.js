import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Button, Table, TableBody, TableCell, TableContainer, InputLabel, Select, MenuItem, } from '@material-ui/core';
import { TableHead, TableRow, Paper, Typography, Grid, TextField, FormControl } from '@material-ui/core';
import { green, blue, blueGrey, red } from '@material-ui/core/colors';
import Loading from "../../../../components/Loading";
import swal from 'sweetalert';

//Leer Api
import rentabilidadPeriodosServices from "../../../../services/Importar/RentabilidadPeriodo";
import conceptosRentabilidadServices from "../../../../services/Importar/ConceptosRentabilidad";
import equiposServices from "../../../../services/Mantenimiento/Equipos";
import consumosrepuestosServices from "../../../../services/Importar/ConsumosRepuestos";
import facturacionServices from "../../../../services/Importar/Facturacion";
import contratacionesServices from "../../../../services/Importar/Contrataciones";
import activosServices from "../../../../services/Activos/Activos";

const useStyles = makeStyles((theme) => ({
    modal: {
        position: 'absolute',
        width: 600,
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
    const [asignaValoresConsumosRepuestos, setAsignaValoresConsumosRepuestos] = useState([]);
    const [facturacionPeriodo, setFacturacionPeriodo] = useState([]);
    const [contratacionesPeriodo, setContratacionesPeriodo] = useState([]);
    const [activos, setActivos] = useState([]);
    const [anno, setAnno] = useState(0);
    const [mes, setMes] = useState(0);
    const [loading, setLoading] = useState(false);
    const [ok, setOk] = useState(true);
    const [asignaValores, setAsignaValores] = useState(false);

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

    useEffect(() => {
        async function fetchDataActivos() {
            const res = await activosServices.listActivos();
            setActivos(res.data);
        }
        fetchDataActivos();
    }, [])

    const asignaValoresGastos = async () => {
        let periodo = anno + mes;

        const res = await consumosrepuestosServices.paretoconsolidadoconsumosrep(periodo);
        //console.log("DATA XXXX : ", res.data)
        setAsignaValoresConsumosRepuestos(res.data);
        
        const rest = await facturacionServices.listarfactperiodo(periodo);
        //console.log("FACTURACION : ", rest.data)
        setFacturacionPeriodo(rest.data);

        const restcontra = await contratacionesServices.paretoconsolidadocontra(periodo);
        //console.log("CONTRATACIONES : ", restcontra.data)
        setContratacionesPeriodo(restcontra.data);

        setTimeout(20000);
        setAsignaValores(true);
    }

    useEffect(() => {
        if(asignaValores){
            //console.log("FACTURACION PERIODo : ", facturacionPeriodo[0] )
            setAsignaValores(false);
            generarPeriodoRentabilidad();
        }
    }, [asignaValores])

    const generarPeriodoRentabilidad = async () => {
        setLoading(true);
        let periodo = anno + mes;
        //console.log("PERIODO : ", periodo);
        const res = await rentabilidadPeriodosServices.listarrentabilidadperiodoequipo(periodo);
        //console.log(res.data);

        if (res.data.length > 0) {
            swal("Rentabilidad Periodo",
                "Para este periodo ya se Acumulo la Rentabilidad!", "warning", { button: "Aceptar" });
        }
        else {
            console.log("NO ESTA ACUMULADA");

            var longitudconceptosrentabilidad = listConceptosRentabilidad.length;

            var conceptos = [{
                nombrefacturacion: listConceptosRentabilidad[0].nombre_rtb,
                tipofacturacion: listConceptosRentabilidad[0].tipo_rtb,
                valorfacturacion_rtb: 0,
                nombreconsumointerno: listConceptosRentabilidad[1].nombre_rtb,
                tipoconsumointerno: listConceptosRentabilidad[1].tipo_rtb,
                valorconsumointerno_rtb: 0,
                nombrerepuestos: listConceptosRentabilidad[2].nombre_rtb,
                tiporepuestos: listConceptosRentabilidad[2].tipo_rtb,
                valorrepuestos_rtb: 0,
                mttocorrectivo: listConceptosRentabilidad[3].nombre_rtb,
                tipomttocorrectivo: listConceptosRentabilidad[3].tipo_rtb,
                valormttocorrectivo_rtb: 0,
                nombremttopreventivo: listConceptosRentabilidad[4].nombre_rtb,
                tipomttopreventivo: listConceptosRentabilidad[4].tipo_rtb,
                valormttopreventivo_rtb: 0,
                nombreentregaequipo: listConceptosRentabilidad[5].nombre_rtb,
                tipoentregaequipo: listConceptosRentabilidad[5].tipo_rtb,
                valorentregaequipo_rtb: 0,
                nombredevolucionequipo: listConceptosRentabilidad[6].nombre_rtb,
                tipodevolucionequipo: listConceptosRentabilidad[6].tipo_rtb,
                valordevolucionequipo_rtb: 0,
                nombrediagnostico: listConceptosRentabilidad[7].nombre_rtb,
                tipodiagnostico: listConceptosRentabilidad[7].tipo_rtb,
                valordiagnostico_rtb: 0,
                nombredepreciacion: listConceptosRentabilidad[8].nombre_rtb,
                tipodepreciacion: listConceptosRentabilidad[8].tipo_rtb,
                valordepreciacion_rtb: 0,
            }];

            var conceptosmaquina = [];
            var longitud = listEquipos.length;

            for (var i = 0; i < longitud; i++) {
                conceptosmaquina[i] = {
                    id_rtb: i, periodo_rtb: periodo, equipo_rtb: listEquipos[i].codigo_equ,
                    equipoperiodo_rtb: periodo.concat(listEquipos[i].codigo_equ),
                    nombrefacturacion: conceptos[0].nombrefacturacion, tipofacturacion: conceptos[0].tipofacturacion, valorfacturacion_rtb: 0,
                    nombreconsumointerno: conceptos[0].nombreconsumointerno, tipoconsumointerno: conceptos[0].tipoconsumointerno, valorconsumointerno_rtb: 0,
                    nombrerepuestos: conceptos[0].nombrerepuestos, tiporepuestos: conceptos[0].tiporepuestos, valorrepuestos_rtb: 0,
                    mttocorrectivo: conceptos[0].mttocorrectivo, tipomttocorrectivo: conceptos[0].tipomttocorrectivo, valormttocorrectivo_rtb: 0,
                    nombremttopreventivo: conceptos[0].nombremttopreventivo, tipomttopreventivo: conceptos[0].tipomttopreventivo, valormttopreventivo_rtb: 0,
                    nombreentregaequipo: conceptos[0].nombreentregaequipo, tipoentregaequipo: conceptos[0].tipoentregaequipo, valorentregaequipo_rtb: 0,
                    nombredevolucionequipo: conceptos[0].nombredevolucionequipo, tipodevolucionequipo: conceptos[0].tipodevolucionequipo, valordevolucionequipo_rtb: 0,
                    nombrediagnostico: conceptos[0].nombrediagnostico, tipodiagnostico: conceptos[0].tipodiagnostico, valordiagnostico_rtb: 0,
                    nombredepreciacion: conceptos[0].nombredepreciacion, tipodepreciacion: conceptos[0].tipodepreciacion, valordepreciacion_rtb: 0
                };
            }
          
            var longitudconceptosmaquina  = conceptosmaquina.length;
            var longitudconsumosrepuestos = asignaValoresConsumosRepuestos.length;
            var longitudfacturacionmes    = facturacionPeriodo.length;
            var longitudcontratacionesmes = contratacionesPeriodo.length;
            var longitudactivos           = activos.length;
            //console.log("LONGITUD CONUSMOS : ", longitudconsumosrepuestos)
            
            // Asigna Gastos Consumos Repuestos
            for (var i = 0; i < longitudconceptosmaquina; i++) {
                for (var j = 0; j < longitudconsumosrepuestos; j++) {
                    if(asignaValoresConsumosRepuestos[j].codigo_cre === conceptosmaquina[i].equipoperiodo_rtb){
                        //console.log("EQUIPOS PERIODO : ",asignaValoresConsumosRepuestos[j].codigo_cre,"-",conceptosmaquina[i].equipoperiodo_rtb )
                        conceptosmaquina[i] = {
                        equipo_rtb:  conceptosmaquina[i].equipo_rtb, 
                        equipoperiodo_rtb: conceptosmaquina[i].equipoperiodo_rtb,
                        id_rtb: conceptosmaquina[i].id_rtb,
                        mttocorrectivo: conceptosmaquina[i].mttocorrectivo,
                        nombreconsumointerno: conceptosmaquina[i].nombreconsumointerno,
                        nombredevolucionequipo: conceptosmaquina[i].nombredevolucionequipo,
                        nombrediagnostico: conceptosmaquina[i].nombrediagnostico,
                        nombreentregaequipo: conceptosmaquina[i].nombreentregaequipo,
                        nombrefacturacion: conceptosmaquina[i].nombrefacturacion,
                        nombremttopreventivo: conceptosmaquina[i].nombremttopreventivo,
                        nombrerepuestos: conceptosmaquina[i].nombrerepuestos,
                        nombredepreciacion: conceptosmaquina[i].nombredepreciacion,
                        periodo_rtb: conceptosmaquina[i].periodo_rtb,
                        tipoconsumointerno: conceptosmaquina[i].tipoconsumointerno,
                        tipodevolucionequipo: conceptosmaquina[i].tipodevolucionequipo,
                        tipodiagnostico: conceptosmaquina[i].tipodiagnostico,
                        tipoentregaequipo: conceptosmaquina[i].tipoentregaequipo,
                        tipofacturacion: conceptosmaquina[i].tipofacturacion,
                        tipomttocorrectivo: conceptosmaquina[i].tipomttocorrectivo,
                        tipomttopreventivo: conceptosmaquina[i].tipomttopreventivo,
                        tiporepuestos: conceptosmaquina[i].tiporepuestos,
                        tipodepreciacion: conceptosmaquina[i].tipodepreciacion,
                        valorconsumointerno_rtb: conceptosmaquina[i].valorconsumointerno_rtb,
                        valordevolucionequipo_rtb: conceptosmaquina[i].valordevolucionequipo_rtb,
                        valordiagnostico_rtb: conceptosmaquina[i].valordiagnostico_rtb,
                        valorentregaequipo_rtb: conceptosmaquina[i].valorentregaequipo_rtb,
                        valorfacturacion_rtb: conceptosmaquina[i].valorfacturacion_rtb,
                        valormttocorrectivo_rtb: conceptosmaquina[i].valormttocorrectivo_rtb,
                        valormttopreventivo_rtb: conceptosmaquina[i].valormttopreventivo_rtb,
                        valorrepuestos_rtb: asignaValoresConsumosRepuestos[j].paretovalorconsumosrep,
                        valordepreciacion_rtb: conceptosmaquina[i].valordepreciacion_rtb
                        };
                    }
                }
            }
            
             // Asigna Gastos Consumos Repuestos
             for (var i = 0; i < longitudconceptosmaquina; i++) {
                for (var j = 0; j < longitudfacturacionmes; j++) {
                    if(facturacionPeriodo[j].codigo_fac === conceptosmaquina[i].equipoperiodo_rtb){
                        //console.log("EQUIPOS PERIODO : ",asignaValoresConsumosRepuestos[j].codigo_cre,"-",conceptosmaquina[i].equipoperiodo_rtb )
                        conceptosmaquina[i] = {
                        equipo_rtb:  conceptosmaquina[i].equipo_rtb, 
                        equipoperiodo_rtb: conceptosmaquina[i].equipoperiodo_rtb,
                        id_rtb: conceptosmaquina[i].id_rtb,
                        mttocorrectivo: conceptosmaquina[i].mttocorrectivo,
                        nombreconsumointerno: conceptosmaquina[i].nombreconsumointerno,
                        nombredevolucionequipo: conceptosmaquina[i].nombredevolucionequipo,
                        nombrediagnostico: conceptosmaquina[i].nombrediagnostico,
                        nombreentregaequipo: conceptosmaquina[i].nombreentregaequipo,
                        nombrefacturacion: conceptosmaquina[i].nombrefacturacion,
                        nombremttopreventivo: conceptosmaquina[i].nombremttopreventivo,
                        nombrerepuestos: conceptosmaquina[i].nombrerepuestos,
                        nombredepreciacion: conceptosmaquina[i].nombredepreciacion,
                        periodo_rtb: conceptosmaquina[i].periodo_rtb,
                        tipoconsumointerno: conceptosmaquina[i].tipoconsumointerno,
                        tipodevolucionequipo: conceptosmaquina[i].tipodevolucionequipo,
                        tipodiagnostico: conceptosmaquina[i].tipodiagnostico,
                        tipoentregaequipo: conceptosmaquina[i].tipoentregaequipo,
                        tipofacturacion: conceptosmaquina[i].tipofacturacion,
                        tipomttocorrectivo: conceptosmaquina[i].tipomttocorrectivo,
                        tipomttopreventivo: conceptosmaquina[i].tipomttopreventivo,
                        tiporepuestos: conceptosmaquina[i].tiporepuestos,
                        tipodepreciacion: conceptosmaquina[i].tipodepreciacion,
                        valorconsumointerno_rtb: conceptosmaquina[i].valorconsumointerno_rtb,
                        valordevolucionequipo_rtb: conceptosmaquina[i].valordevolucionequipo_rtb,
                        valordiagnostico_rtb: conceptosmaquina[i].valordiagnostico_rtb,
                        valorentregaequipo_rtb: conceptosmaquina[i].valorentregaequipo_rtb,
                        valorfacturacion_rtb: facturacionPeriodo[j].valorfactura,
                        valormttocorrectivo_rtb: conceptosmaquina[i].valormttocorrectivo_rtb,
                        valormttopreventivo_rtb: conceptosmaquina[i].valormttopreventivo_rtb,
                        valorrepuestos_rtb: conceptosmaquina[i].valorrepuestos_rtb,
                        valordepreciacion_rtb: conceptosmaquina[i].valordepreciacion_rtb
                        };
                    }
                }
            }

            // Asigna Gastos Consumos Repuestos
            for (var i = 0; i < longitudconceptosmaquina; i++) {
                for (var j = 0; j < longitudcontratacionesmes; j++) {
                    if(contratacionesPeriodo[j].codigo === conceptosmaquina[i].equipoperiodo_rtb){
                        //console.log("EQUIPOS PERIODO : ",asignaValoresConsumosRepuestos[j].codigo_cre,"-",conceptosmaquina[i].equipoperiodo_rtb )
                        conceptosmaquina[i] = {
                        equipo_rtb:  conceptosmaquina[i].equipo_rtb, 
                        equipoperiodo_rtb: conceptosmaquina[i].equipoperiodo_rtb,
                        id_rtb: conceptosmaquina[i].id_rtb,
                        mttocorrectivo: conceptosmaquina[i].mttocorrectivo,
                        nombreconsumointerno: conceptosmaquina[i].nombreconsumointerno,
                        nombredevolucionequipo: conceptosmaquina[i].nombredevolucionequipo,
                        nombrediagnostico: conceptosmaquina[i].nombrediagnostico,
                        nombreentregaequipo: conceptosmaquina[i].nombreentregaequipo,
                        nombrefacturacion: conceptosmaquina[i].nombrefacturacion,
                        nombremttopreventivo: conceptosmaquina[i].nombremttopreventivo,
                        nombrerepuestos: conceptosmaquina[i].nombrerepuestos,
                        nombredepreciacion: conceptosmaquina[i].nombredepreciacion,
                        periodo_rtb: conceptosmaquina[i].periodo_rtb,
                        tipoconsumointerno: conceptosmaquina[i].tipoconsumointerno,
                        tipodevolucionequipo: conceptosmaquina[i].tipodevolucionequipo,
                        tipodiagnostico: conceptosmaquina[i].tipodiagnostico,
                        tipoentregaequipo: conceptosmaquina[i].tipoentregaequipo,
                        tipofacturacion: conceptosmaquina[i].tipofacturacion,
                        tipomttocorrectivo: conceptosmaquina[i].tipomttocorrectivo,
                        tipomttopreventivo: conceptosmaquina[i].tipomttopreventivo,
                        tiporepuestos: conceptosmaquina[i].tiporepuestos,
                        tipodepreciacion: conceptosmaquina[i].tipodepreciacion,
                        valorconsumointerno_rtb: contratacionesPeriodo[j].paretovalorcontrataciones,
                        valordevolucionequipo_rtb: conceptosmaquina[i].valordevolucionequipo_rtb,
                        valordiagnostico_rtb: conceptosmaquina[i].valordiagnostico_rtb,
                        valorentregaequipo_rtb: conceptosmaquina[i].valorentregaequipo_rtb,
                        valorfacturacion_rtb: conceptosmaquina[i].valorfacturacion_rtb,
                        valormttocorrectivo_rtb: conceptosmaquina[i].valormttocorrectivo_rtb,
                        valormttopreventivo_rtb: conceptosmaquina[i].valormttopreventivo_rtb,
                        valorrepuestos_rtb: conceptosmaquina[i].valorrepuestos_rtb,
                        valordepreciacion_rtb: conceptosmaquina[i].valordepreciacion_rtb
                        };
                    }
                }
            }

            // Leer datos depreciación activos
            for (var i = 0; i < longitudconceptosmaquina; i++) {
                for (var j = 0; j < longitudactivos; j++) {
                    if(activos[j].codigo_equ === conceptosmaquina[i].equipo_rtb){
                        //console.log("EQUIPOS PERIODO : ",asignaValoresConsumosRepuestos[j].codigo_cre,"-",conceptosmaquina[i].equipoperiodo_rtb )
                        conceptosmaquina[i] = {
                        equipo_rtb:  conceptosmaquina[i].equipo_rtb, 
                        equipoperiodo_rtb: conceptosmaquina[i].equipoperiodo_rtb,
                        id_rtb: conceptosmaquina[i].id_rtb,
                        mttocorrectivo: conceptosmaquina[i].mttocorrectivo,
                        nombreconsumointerno: conceptosmaquina[i].nombreconsumointerno,
                        nombredevolucionequipo: conceptosmaquina[i].nombredevolucionequipo,
                        nombrediagnostico: conceptosmaquina[i].nombrediagnostico,
                        nombreentregaequipo: conceptosmaquina[i].nombreentregaequipo,
                        nombrefacturacion: conceptosmaquina[i].nombrefacturacion,
                        nombremttopreventivo: conceptosmaquina[i].nombremttopreventivo,
                        nombrerepuestos: conceptosmaquina[i].nombrerepuestos,
                        nombredepreciacion: conceptosmaquina[i].nombredepreciacion,
                        periodo_rtb: conceptosmaquina[i].periodo_rtb,
                        tipoconsumointerno: conceptosmaquina[i].tipoconsumointerno,
                        tipodevolucionequipo: conceptosmaquina[i].tipodevolucionequipo,
                        tipodiagnostico: conceptosmaquina[i].tipodiagnostico,
                        tipoentregaequipo: conceptosmaquina[i].tipoentregaequipo,
                        tipofacturacion: conceptosmaquina[i].tipofacturacion,
                        tipomttocorrectivo: conceptosmaquina[i].tipomttocorrectivo,
                        tipomttopreventivo: conceptosmaquina[i].tipomttopreventivo,
                        tiporepuestos: conceptosmaquina[i].tiporepuestos,
                        tipodepreciacion: conceptosmaquina[i].tipodepreciacion,
                        valorconsumointerno_rtb: conceptosmaquina[i].valorconsumointerno_rtb,
                        valordevolucionequipo_rtb: conceptosmaquina[i].valordevolucionequipo_rtb,
                        valordiagnostico_rtb: conceptosmaquina[i].valordiagnostico_rtb,
                        valorentregaequipo_rtb: conceptosmaquina[i].valorentregaequipo_rtb,
                        valorfacturacion_rtb: conceptosmaquina[i].valorfacturacion_rtb,
                        valormttocorrectivo_rtb: conceptosmaquina[i].valormttocorrectivo_rtb,
                        valormttopreventivo_rtb: conceptosmaquina[i].valormttopreventivo_rtb,
                        valorrepuestos_rtb: conceptosmaquina[i].valorrepuestos_rtb,
                        valordepreciacion_rtb: activos[j].depreciacionmensual_act
                        };
                    }
                }
            }

            setLoading(false);
            console.log("CONCEPTOS MAQUINA : ", conceptosmaquina);
            setRentabilidadPeriodoSeleccionado(conceptosmaquina);
        }

    }

    const Datos = () => {
         console.log("RENTABILIDAD PERIODO : ", rentabilidadPeriodoSeleccionado);

        var longitud = rentabilidadPeriodoSeleccionado.length;

        const addContrataciones = async () => {
            setLoading(true);

            for (var i = 0; i < longitud; i++) {
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
            <Typography align="center" className={classes.typography} variant="button" display="block"> Generar Rentabilidad Periodo </Typography>
            <Grid container spacing={2} >
                <Grid item xs={12} md={3}>
                    <TextField type="numeric" className={classes.inputMaterial} label="Año" name="anno" fullWidth onChange={handleChange}
                        onChange={(e) => setAnno(e.target.value)} />
                </Grid>
                <Grid item xs={12} md={3}>
                    <TextField type="numeric" className={classes.inputMaterial} label="Mes" name="mes" fullWidth onChange={handleChange}
                        onChange={(e) => setMes(e.target.value)} />
                </Grid>
                <Grid item xs={12} md={3}>
                    <Button className={classes.button} color="primary" onClick={() => asignaValoresGastos()} >Procesar</Button>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Button className={classes.button} color="primary" onClick={() => Datos()} >Subir Datos</Button>
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