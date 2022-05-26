import React, { useEffect, useState } from 'react';
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { Modal, Button, Typography, Grid, TextField } from "@material-ui/core";
import { green, blue, blueGrey, red } from '@material-ui/core/colors';
import { makeStyles } from "@material-ui/core/styles";
import CallMissedIcon from '@material-ui/icons/CallMissed';
import CachedIcon from '@material-ui/icons/Cached';
import Moment from 'moment';

import informecostorealServices from "../../../../services/Costos/InformeCostoReal";

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

function NumberFormatCustom(props) {
    const { inputRef, onChange, ...other } = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
            thousandSeparator
            isNumericString
            prefix="$"
        />
    );
}

function CostosRealesEquipos() {
    const styles = useStyles();
    const [listarEquipos, setListarEquipos] = useState([]);
    const [listarCostoVariablePeriodo, setListarCostoVariablePeriodo] = useState([]);
    const [modalPeriodo, setModalPeriodo] = useState(false);
    const [equipoTotalRenta, setEquipoTotalRenta] = useState(0);
    const [equipoTotal, setEquipoTotal] = useState(0);
    const [anno, setAnno] = useState(0);
    const [mes, setMes] = useState(0);
    const [periodo, setPeriodo] = useState(0);

    useEffect(() => {
        async function fetchDataEquiposTotalRenta() {
            const res = await informecostorealServices.equipostotalesrenta();
            setEquipoTotalRenta(res.data[0].totalequiposrenta);
            console.log("Equipos Total Renta : ", res.data);

            const rest = await informecostorealServices.equipostotales();
            setEquipoTotal(rest.data[0].totalequipos);
            console.log("Equipos Total : ", rest.data);
        }
        fetchDataEquiposTotalRenta();
    }, [])

    const leerDatosEquipos = () => {
        async function fetchDataLeeInformacionEquipos() {
            let periodocontrataciones = '' + anno + mes;
            const res = await informecostorealServices.leeinformacionequiposmes(periodocontrataciones);
            setListarEquipos(res.data);
            console.log("Lee Información Equipos : ", res.data);
            abrirCerrarModalPeriodo();
        }
        fetchDataLeeInformacionEquipos();
    }

    const abrirCerrarModalPeriodo = () => {
        setModalPeriodo(!modalPeriodo);
    }

    const periodoInforme = (
        <div className={styles.modal}>
            <Typography align="center" className={styles.typography} variant="button" display="block"> Ingrese Periodo Informe </Typography>
            <Grid item xs={12} md={12}>
                <TextField type="numeric" className={styles.inputMaterial} label="Año" name="annodepreciar" fullWidth
                    onChange={(e) => setAnno(e.target.value)} />
            </Grid>
            <Grid item xs={12} md={12}>
                <TextField type="numeric" className={styles.inputMaterial} label="Mes" name="mesdepreciar" fullWidth
                    onChange={(e) => setMes(e.target.value)} />
            </Grid>
            <div align="right">
                <Button className={styles.button} color="primary" onClick={() => procesarInforme()} >Confirmar</Button>
                <Button className={styles.button2} onClick={() => abrirCerrarModalPeriodo()} >Cancelar</Button>
            </div>
        </div>
    )

    const procesarInforme = async () => {
        let periodo = anno + mes;
        setPeriodo(periodo);
        console.log("PERIODO : ", periodo)

        async function fetchDataCostoVariablePeriodo(per) {
            const res = await informecostorealServices.leecostovariableperiodo(per);
            setListarCostoVariablePeriodo(res.data);
            console.log("DATOS BASE COSTO REAL PERIODO : ", res.data);
        }
        fetchDataCostoVariablePeriodo(periodo);

        leerDatosEquipos();
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
                        <th>AÑO</th>
                        <th>MES</th>
                        <th>VALOR EN LIBROS</th>
                        <th>VALOR RENTA MES</th>
                        <th>GAS</th>
                        <th>GASOLINA</th>
                        <th>PEAJES</th>
                        <th>INSUMOS</th>
                        <th>CONTRATACIONES</th>
                        <th>CONSUMOS RPTOS</th>
                        <th>LOGISTICA</th>
                        <th>DEPRECIACION MES</th>
                        <th>VALOR COMERCIAL</th>
                        <th>SEGURO</th>
                        <th>CUOTA FINANCIERA</th>
                        <th>MENSUALIDAD SOFTWARE</th>
                        <th>TÉCNICOS NÓMINA + SS + SST + DOTACIÓN</th>
                        <th>RENTING CAMIONETA</th>
                        <th>MOTO CARRO</th>
                        <th>RENTA MOTOS MOTOCÚBICO</th>
                        <th>LÍNEAS CELULAR</th>
                        <th>TOTAL GASTOS x MT</th>
                        <th>RENTABILIDAD x MT</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listarEquipos && listarEquipos.map((informecostos, index) => {
                            {
                                let gas = 0;
                                let gasolina = 0;
                                let peajes = 0;
                                let insumos = 0;
                                let motocubico = 0;
                                let nomina = 0;
                                let lineacelular = 0;
                                let rentingcamioneta = 0;
                                let motocarro = 0;
                                let codigo = periodo + informecostos.codigo_equ;
                                let equiposrentaantioquia = listarCostoVariablePeriodo[10].valorcosto_cvp;
                                let totalequiposrenta = listarCostoVariablePeriodo[11].valorcosto_cvp;
                                let softwaremtto = Math.round(listarCostoVariablePeriodo[7].valorcosto_cvp / totalequiposrenta);
                                let rentabilidad = 0;
                                let totalgastos = 0;
                                let rentames = 1;
                                let contrataciones = 0;
                                let logistica = 0;

                                if (informecostos.departamento_ciu === '05') {
                                    gas = Math.round(listarCostoVariablePeriodo[0].valorcosto_cvp / equiposrentaantioquia);
                                    gasolina = Math.round(listarCostoVariablePeriodo[1].valorcosto_cvp / equiposrentaantioquia);
                                    peajes = Math.round(listarCostoVariablePeriodo[2].valorcosto_cvp / equiposrentaantioquia);
                                    insumos = Math.round(listarCostoVariablePeriodo[3].valorcosto_cvp / equiposrentaantioquia);
                                    motocubico = Math.round(listarCostoVariablePeriodo[4].valorcosto_cvp / equiposrentaantioquia);
                                    nomina = Math.round(listarCostoVariablePeriodo[5].valorcosto_cvp / equiposrentaantioquia);
                                    lineacelular = Math.round(listarCostoVariablePeriodo[6].valorcosto_cvp / equiposrentaantioquia);
                                    rentingcamioneta = Math.round(listarCostoVariablePeriodo[8].valorcosto_cvp / equiposrentaantioquia);
                                    motocarro = Math.round(listarCostoVariablePeriodo[9].valorcosto_cvp / equiposrentaantioquia);
                                }
                                else
                                    gas = 0;

                                if (informecostos.tipogasto == "2")
                                    logistica = informecostos.costomtto;
                                else
                                    contrataciones = informecostos.costomtto;
                                //if (informecostos.tipogasto == "2")
                                    
                                if (informecostos.valorrentames_ctr < 10)
                                    rentames = 1;
                                else
                                    rentames = informecostos.valorrentames_ctr;

                                rentabilidad = rentames -
                                    (gas + gasolina + peajes + insumos + informecostos.costomtto + informecostos.costototal_cre + 0 +
                                        informecostos.depreciacionmensual_act + 0 + softwaremtto + nomina + rentingcamioneta +
                                        motocarro + motocubico + lineacelular + (informecostos.valorcomercial_seg * 0.009 * 0.0821917));

                                totalgastos = (gas + gasolina + peajes + insumos + informecostos.costomtto + informecostos.costototal_cre + 0 +
                                    informecostos.depreciacionmensual_act + 0 + softwaremtto + nomina + rentingcamioneta +
                                    motocarro + motocubico + lineacelular + (informecostos.valorcomercial_seg * 0.009 * 0.0821917));

                                return (
                                    <tr>
                                        <td>{informecostos.codigo_equ}</td>
                                        <td>{anno}</td>
                                        <td>{mes}</td>
                                        <td>{informecostos.valorenlibros_act}</td>
                                        <td>{rentames}</td>
                                        <td>{gas}</td>
                                        <td>{gasolina}</td>
                                        <td>{peajes}</td>
                                        <td>{insumos}</td>
                                        <td>{contrataciones}</td>
                                        <td>{informecostos.costototal_cre}</td>
                                        <td>{logistica}</td>
                                        <td>{0}</td>
                                        <td>{informecostos.valorcomercial_seg}</td>
                                        <td>{Math.round(informecostos.valorcomercial_seg * 0.009 * 0.0821917)}</td>
                                        <td>{0}</td>
                                        <td>{softwaremtto}</td>
                                        <td>{nomina}</td>
                                        <td>{rentingcamioneta}</td>
                                        <td>{motocarro}</td>
                                        <td>{motocubico}</td>
                                        <td>{lineacelular}</td>
                                        <td>{totalgastos}</td>
                                        <td>{rentabilidad}</td>
                                    </tr>
                                )
                            }
                        })
                    }
                </tbody>
            </table>

        </div>
    );
}

// <td>{informecostos.depreciacionmensual_act}</td>

export default CostosRealesEquipos;