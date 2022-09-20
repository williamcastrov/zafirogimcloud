import React, { useEffect, useState } from 'react';
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { Button, Typography } from "@material-ui/core";
import { green, blue, blueGrey, red } from '@material-ui/core/colors';
import { makeStyles } from "@material-ui/core/styles";
import Moment from 'moment';

import ordenesServices from "../../../../services/GestionOrdenes/CrearOrdenes";

const useStyles = makeStyles((theme) => ({
    modal: {
        position: 'absolute',
        width: 700,
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

function InformeOT() {
    const styles = useStyles();
    const [listarOT, setListarOT] = useState([]);

    useEffect(() => {
        async function fetchDataOT() {
            const res = await ordenesServices.listOrdenesServCumplimiento();
            setListarOT(res.data);
            //console.log("EQUIPOS DEL SISTEMA : ", res.data);
        }
        fetchDataOT();
    }, [])

    return (
        <div>
            <div align="center" >
                <Button className={styles.button} color="primary" >
                    <ReactHTMLTableToExcel
                        table="seguros"
                        filename="Informe OT"
                        sheet="Sheet"
                        buttonText="Exportar a Excel"
                    />
                </Button>
            </div>
            <table id="seguros" className="table">
                <thead>
                    <tr>	
                        <th># OT</th>
                        <th>MT</th>
                        <th>ID ACTIVIDAD</th>
                        <th>CLIENTE ID</th>
                        <th>CIUDAD</th>
                        <th>SERIE</th>
                        <th>HOROMETRO</th>
                        <th>#OT FECHA</th>
                        <th>TIPO SERVICIO</th>
                        <th>TIPO DE FALLA</th>
                        <th>ACTIVIDAD REALIZADA</th>
                        <th>ESTADO DE LA ORDEN</th>
                        <th>#COMBO</th>
                        <th>OBSERVACION GENERAL</th>
                        <th>PROBLEMA REPORTADO</th>
                        <th>RESUMEN</th>
                        <th>OBSERVACION</th>
                        <th>DATOS UNO - PENDIENTES</th>
                        <th>DATOS DOS - PENDIENTES</th>
                        <th>TECNICO UNO</th>
                        <th>TECNICO DOS</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listarOT && listarOT.map((ordenes, index) => {
                            return (
                                <tr>
                                    <td>{ordenes.id_otr}</td>
                                    <td>{ordenes.codigo_equ}</td>
                                    <td>{ordenes.id_actividad}</td>
                                    <td>{ordenes.razonsocial_cli}</td>
                                    <td>{ordenes.nombre_ciu}</td>                    
                                    <td>{ordenes.referencia_dequ}</td>
                                    <td>{ordenes.horometro_cosv}</td>
                                    <td>{ordenes.fechainicia_otr}</td>
                                    <td>{ordenes.descripcion_tmt}</td>
                                    <td>{ordenes.descripcion_fmt}</td>
                                    <td>{ordenes.descripcion_cosv}</td>
                                    <td>{ordenes.nombre_est}</td>
                                    <td>{ordenes.combogrupo_cosv}</td>
                                    <td>{ordenes.observacion_cosv}</td>
                                    <td>{ordenes.resumenorden_otr}</td>
                                    <td>{ordenes.resumenactividad_cosv}</td>
                                    <td>{ordenes.observacion_cosv}</td>
                                    <td>{ordenes.observacionrespuesta_pot}</td>
                                    <td>{ordenes.descripcion_pot}</td>
                                    <td>{ordenes.primer_nombre_emp}{" "} {ordenes.primer_apellido_emp}</td>
                                    <td>{ordenes.nombretecnicodos}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

        </div>
    );
}

export default InformeOT;