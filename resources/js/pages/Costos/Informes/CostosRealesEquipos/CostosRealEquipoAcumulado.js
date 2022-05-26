import React, { useEffect, useState } from 'react';
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { Modal, Button, Select, MenuItem, FormControl, InputLabel, Typography, Grid, TextField } from "@material-ui/core";
import { green, blue, blueGrey, red } from '@material-ui/core/colors';
import { makeStyles } from "@material-ui/core/styles";
import CallMissedIcon from '@material-ui/icons/CallMissed';
import CachedIcon from '@material-ui/icons/Cached';
import Moment from 'moment';

import informecostorealServices from "../../../../services/Costos/InformeCostoReal";
import equiposServices from "../../../../services/Mantenimiento/Equipos";
import cumplimientooserv from '../../../../services/GestionOrdenes/CumplimientoOserv';

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
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    formControl: {
        margin: theme.spacing(0),
        minWidth: 300,
    },
    typography: {
        fontSize: 16,
        color: "#ff3d00"
    },
    button: {
        color: theme.palette.getContrastText(blueGrey[500]),
        backgroundColor: blue[700],
        margin: theme.spacing(1),
        fontSize: 12,
        '&:hover': {
            backgroundColor: green[700],
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
}));

function CostosRealEquipoAcumulado() {
    const styles = useStyles();
    const [listarEquipos, setListarEquipos] = useState([]);
    const [listarCostoVariablePeriodo, setListarCostoVariablePeriodo] = useState([]);
    const [listarNumeroEquiposMes, setListarNumeroEquiposMes] = useState([]);
    const [modalPeriodo, setModalPeriodo] = useState(false);
    const [equipoTotalRenta, setEquipoTotalRenta] = useState(0);
    const [equipoTotal, setEquipoTotal] = useState(0);
    const [anno, setAnno] = useState(0);
    const [mes, setMes] = useState(0);
    const [codigoEquipo, setCodigoEquipo] = useState(0);
    const [periodo, setPeriodo] = useState(0);
    const [equipos, setEquipos] = useState([]);

    useEffect(() => {
        //console.log("ID Usuario : ", idUsuario)
        async function fetchDataEquipos() {
            const res = await equiposServices.listEquiposMontacargas();
            setEquipos(res.data);
        }
        fetchDataEquipos();
    }, []);

    useEffect(() => {
        async function fetchDataEquiposTotalRenta() {
            const res = await informecostorealServices.equipostotalesrenta();
            setEquipoTotalRenta(res.data[0].totalequiposrenta);
            //console.log("Equipos Total Renta : ", res.data);

            const rest = await informecostorealServices.equipostotales();
            setEquipoTotal(rest.data[0].totalequipos);
            //console.log("Equipos Total : ", rest.data);
        }
        fetchDataEquiposTotalRenta();
    }, [])

    const abrirCerrarModalPeriodo = () => {
        setModalPeriodo(!modalPeriodo);
    }

    const periodoInforme = (
        <div className={styles.modal}>
            <Typography align="center" className={styles.typography} variant="button" display="block"> Ingrese Periodo Informe </Typography>
            <Grid container spacing={2} >
                <Grid item xs={12} md={3}>
                    <TextField type="numeric" className={styles.inputMaterial} label="Año" name="annodepreciar" fullWidth
                        onChange={(e) => setAnno(e.target.value)} />
                </Grid>
                <Grid item xs={12} md={8}>
                    <FormControl className={styles.formControl}>
                        <InputLabel id="idselectequipo_otr">Equipo</InputLabel>
                        <Select
                            labelId="selectequipo_otr"
                            name="equipo_otr"
                            id="idselectequipo_otr"
                            fullWidth
                            onChange={(e) => setCodigoEquipo(e.target.value)}
                        //onClick={(e) => DatosEquipos(e.target.value)}
                        >
                            <MenuItem value=""> <em>None</em> </MenuItem>
                            {
                                equipos && equipos.map((itemselect) => {
                                    return (
                                        <MenuItem value={itemselect.codigo_equ}>{itemselect.codigo_equ}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <div align="right">
                <Button className={styles.button} color="primary" onClick={() => procesarInforme()} >Confirmar</Button>
                <Button className={styles.button2} onClick={() => abrirCerrarModalPeriodo()} >Cancelar</Button>
            </div>
        </div>
    )

    const procesarInforme = async () => {
        let codigo = '"' + anno + codigoEquipo + '"';
        //console.log("CODIGO : ", codigo)
        //console.log("AÑO : ", anno)

        async function fetchDataCostoVariablePeriodo(dat) {
            const res = await informecostorealServices.costosvariableanno(dat);
            setListarCostoVariablePeriodo(res.data);
            console.log("DATOS BASE COSTO REAL AÑO : ", res.data);
        }
        fetchDataCostoVariablePeriodo(anno);

        async function fetchDataEquiposMes(anno) {
            const res = await informecostorealServices.numeroequiposmes(anno);
            setListarNumeroEquiposMes(res.data);
            console.log("DATOS BASE COSTO REAL PERIODO : ", res.data);
        }
        fetchDataEquiposMes(anno);
        leerDatosEquipos(codigo);
    }

    const leerDatosEquipos = (codigo) => {
        console.log("CODIGO EQUIPO : ", codigo)
        async function fetchDataLeeInformacionEquipos(cod) {
            const res = await informecostorealServices.leeinformacionacumuladaequipos(cod);
            setListarEquipos(res.data);
            console.log("Lee Información Equipos : ", res.data);
            //abrirCerrarModalPeriodo();
        }
        fetchDataLeeInformacionEquipos(codigo);
    }

    return (
        <div>
            <Modal
                open={modalPeriodo}
                onClose={abrirCerrarModalPeriodo}
            >
                {periodoInforme}
            </Modal>

            <div align="center" >
                <Button className={styles.button} variant="contained" startIcon={<CallMissedIcon />} onClick={() => abrirCerrarModalPeriodo()} >
                    Generar Informe
                </Button>

                <Button className={styles.button} color="primary" >
                    <ReactHTMLTableToExcel
                        table="costosreales"
                        filename="InformacionCostosReales"
                        sheet="Sheet"
                        buttonText="Exportar a Excel"
                    />
                </Button>
            </div>
            <table id="costosreales" className="table">
                <thead>
                    <tr>
                        <th>ID EQUIPO</th>
                        <th>DESCRIPCION MT</th>
                        <th>AÑO</th>
                        <th>MES</th>
                        <th>VALOR RENTA MES</th>
                        <th>COSTOS MES ($)</th>
                        <th>$ RENTABILIDAD x MT</th>
                        <th>% GASTOS VS INGRESOS</th>
                        <th>% RENTABILIDAD %</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listarCostoVariablePeriodo.length > 0 ?
                            (
                                listarEquipos && listarEquipos.map((informecostos, index) => {
                                    {
                                        let costosmes = 0;
                                        let equiposrentaantioquia = 1;
                                        let rentabilidad = 0;
                                        let porcentajegastos = 0;
                                        let porcentajerentable = 0;
                                        let rentames = 1;

                                        listarCostoVariablePeriodo && listarCostoVariablePeriodo.map((costos, index) => {
                                            {
                                                /*
                                                console.log("COSTOS VALOR : ", costos.valor,"--", costos.mes, "--",
                                                             costos.equiposantioquia, "--", informecostos.valorcomercial_seg,
                                                             "--",informecostos.depreciacionmensual_act )
                                                */

                                                if (costos.mes == informecostos.mes) {
                                                    costosmes = 0;
                                                    equiposrentaantioquia = 1; //listarCostoVariablePeriodo[10].valorcosto_cvp;

                                                    //let totalequiposrenta = listarCostoVariablePeriodo[11].valorcosto_cvp;
                                                    //let softwaremtto = Math.round(listarCostoVariablePeriodo[7].valorcosto_cvp / totalequiposrenta);
                                                    rentabilidad = 0;

                                                    if (informecostos.departamento_ciu === '05') {
                                                        costosmes = (costos.valor / costos.equiposantioquia) +
                                                            //(informecostos.valorcomercial_seg * 0.009 * 0.0821917) +
                                                            informecostos.depreciacionmensual_act +
                                                            informecostos.valorcontratos + informecostos.valorconsumo;
                                                    }
                                                    else
                                                        costosmes = Math.round(
                                                            (1650000 / costos.equipostotal) +
                                                            (informecostos.valorcomercial_seg * 0.009 * 0.0821917) +
                                                            informecostos.depreciacionmensual_act +
                                                            informecostos.valorcontratos + informecostos.valorconsumo);

                                                    //console.log("COSTO MES : ", informecostos.mes, " : ", costosmes)
                                                    //console.log("VALOR SEGURO : ", informecostos.valorcomercial_seg * 0.009 * 0.0821917)
                                                    //console.log("COSTOS CONCEPTOS : ", costos.valor)
                                                    //console.log("EQUIPOS ANTIOQUIA : ", costos.equiposantioquia)
                                                }

                                            }

                                        })

                                        if (informecostos.valorrentames < 10)
                                            rentames = 1;
                                        else
                                            rentames = informecostos.valorrentames;

                                        //console.log("RENTA MES  : ", informecostos.valorrentames)
                                        rentabilidad = Math.round(rentames - costosmes);
                                        porcentajegastos = ((costosmes / rentames) * 100).toFixed(0);
                                        porcentajerentable = 100 - ((costosmes / rentames) * 100).toFixed(0);

                                        return (
                                            <tr>
                                                <td>{informecostos.codigo_equ}</td>
                                                <td>{informecostos.descripcion_equ}</td>
                                                <td>{informecostos.anno}</td>
                                                <td>{informecostos.mes}</td>
                                                <td>{rentames}</td>
                                                <td>{Math.round(costosmes)}</td>
                                                <td>{rentabilidad}</td>
                                                <td>{porcentajegastos + "%"}</td>
                                                <td>{porcentajerentable + "%"}</td>
                                            </tr>
                                        )
                                    }
                                })
                            ) :
                            null
                    }
                </tbody>
            </table>

        </div>
    );
}

export default CostosRealEquipoAcumulado;