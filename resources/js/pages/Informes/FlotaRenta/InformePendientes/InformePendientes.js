import React, { useEffect, useState } from 'react';
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { Modal, Button, Typography, Grid, TextField } from "@material-ui/core";
import { green, blue, blueGrey, red } from '@material-ui/core/colors';
import { makeStyles } from "@material-ui/core/styles";
import Moment from 'moment';

import pendientesotServices from "../../../../services/GestionOrdenes/PendienteOT";

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
        backgroundColor: green[700],
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

function InformesPendientes() {
    const styles = useStyles();
    const [listarEquipos, setListarEquipos] = useState([]);
    const [modalDepreciar, setModalDepreciar] = useState(false);

    useEffect(() => {
        async function fetchDataEquipos() {
            const res = await pendientesotServices.listpendientes();
            setListarEquipos(res.data);
            //console.log("PENDIENTES : ", res.data);
        }
        fetchDataEquipos();
    }, [])

    const periodoDepreciacionConsultar = () => {
        setModalDepreciar(!modalDepreciar);
    }

    return (
        <div>
            <div align="center" >
                <Button className={styles.button} color="primary" >
                    <ReactHTMLTableToExcel
                        table="pendientes"
                        filename="Informacion Pendientes"
                        sheet="Sheet"
                        buttonText="Exportar a Excel"
                    />
                </Button>
            </div>
            <table id="pendientes" className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>OT</th>
                        <th>Tecnico Uno</th>
                        <th>Tecnico Dos</th>
                        <th>Tecnico Tres</th>
                        <th>Cliente</th>
                        <th>Equipo</th>
                        <th>Marca</th>
                        <th>Fecha OT</th>
                        <th>Fecha Registra Pendiente</th>
                        <th>Tipo de Actividad</th>
                        <th>Novedad</th>
                        <th>Caso Actual</th>
                        <th>Solicitud de Repuesto</th>
                        <th>Respuesta Solicitud</th>
                        <th>Observación Solicitud</th>
                        <th>Fecha Cierre</th>
                        <th>Observación</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listarEquipos && listarEquipos.map((pendientes, index) => {
                            return (
                                <tr>
                                    <td>{pendientes.id}</td>
                                    <td>{pendientes.id_pot}</td>
                                    <td>{pendientes.nombretecnicouno}</td>
                                    <td>{pendientes.nombretecnicodos}</td>
                                    <td>{pendientes.nombretecnicotres}</td>
                                    <td>{pendientes.razonsocial_cli}</td>
                                    <td>{pendientes.codigo_equ}</td>
                                    <td>{pendientes.descripcion_mar}</td>
                                    <td>{pendientes.fechainicia_otr}</td>
                                    <td>{pendientes.fecha_pot}</td>
                                    <td>{pendientes.descripcion_tmt}</td>
                                    <td>{pendientes.novedad_pot}</td>
                                    <td>{pendientes.estadoot}</td>
                                    <td>{pendientes.solicitudrepuesto_pot}</td>
                                    <td>{pendientes.respuestarepuesto_pot}</td>
                                    <td>{pendientes.observacionrespuesta_pot}</td>
                                    <td>{pendientes.fechacierre_pot}</td>
                                    <td>{pendientes.descripcion_pot}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

        </div>
    );
}

export default InformesPendientes;