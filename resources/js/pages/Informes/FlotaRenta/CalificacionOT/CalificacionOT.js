import React, { useEffect, useState } from 'react';
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { Modal, Button, Select, MenuItem, FormControl, InputLabel, Grid, Typography } from "@material-ui/core";
import { green, blue, blueGrey, red } from '@material-ui/core/colors';
import { makeStyles } from "@material-ui/core/styles";
import CallMissedIcon from '@material-ui/icons/CallMissed';
import Moment from 'moment';

import ubicacionesServices from "../../../../services/DatosEquipos/Ubicaciones";
import cumplimientoService from '../../../../services/GestionOrdenes/CumplimientoOserv';
import equiposServices from "../../../../services/Mantenimiento/Equipos";

const useStyles = makeStyles((theme) => ({
    modal: {
        position: 'absolute',
        width: 400,
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

function CalificacionOT() {
    const styles = useStyles();
    const [calificacionOT, setCalificacionOT] = useState([]);
    const fechaactual = Moment(new Date()).format('YYYY-MM-DD');
    const [modalCodigoEquipo, setModalCodigoEquipo] = useState(false);
    const [listarEquipos, setListarEquipos] = useState([]);

    const leerModalCodigoEquipo = () => {
        setModalCodigoEquipo(!modalCodigoEquipo);
    }

    useEffect(() => {
        //console.log("ID Usuario : ", idUsuario)
        async function fetchDataCalificacion() {
            const res = await cumplimientoService.calificacionot(0);
            setCalificacionOT(res.data);
        }
        fetchDataCalificacion();
    }, [])


    return (
        <div>
            <div align="center" >
                <Button className={styles.button} color="primary" >
                    <ReactHTMLTableToExcel
                        table="calificacionot"
                        filename="CalificacionOT"
                        sheet="Sheet"
                        buttonText="Exportar a Excel"
                    />
                </Button>
            </div>
            <table id="calificacionot" className="table">
                <thead>
                    <tr>
                        <th># OT</th>
                        <th>FECHA</th>
                        <th>CLIENTE</th>
                        <th>RESUMEN ACTIVIDAD</th>
                        <th>OPERARIO</th>
                        <th>CALIFICACION</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        calificacionOT && calificacionOT.map((calificacion, index) => {
                            return (
                                <tr>
                                    <td>{calificacion.ot_cse}</td>
                                    <td>{calificacion.fechaprogramada_cosv}</td>
                                    <td>{calificacion.razonsocial_cli}</td>
                                    <td>{calificacion.resumenactividad_cosv}</td>
                                    <td>{calificacion.nombreempleado}</td>
                                    <td>{calificacion.valorservicio_cse}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

        </div>
    );
}

export default CalificacionOT;