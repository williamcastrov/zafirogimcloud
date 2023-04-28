import React, { useEffect, useState } from 'react';
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { Button, Typography } from "@material-ui/core";
import { green, blue, blueGrey, red } from '@material-ui/core/colors';
import { makeStyles } from "@material-ui/core/styles";
import Moment from 'moment';

import comercialServices from "../../../../services/Ventas/RegistroLlamadas";
import facturacionServices from "../../../../services/Importar/Facturacion";

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

function SeguimientoComercial() {
    const styles = useStyles();
    const [listarOT, setListarOT] = useState([]);

    useEffect(() => {
        async function fetchDataOT() {
            const res = await comercialServices.listarregistrollamadas();
            setListarOT(res.data);
            console.log("REGISTRO LLAMADAS : ", res.data);
        }
        fetchDataOT();
    }, [])

    return (
        <div>
            <div align="center" >
                <Button className={styles.button} color="primary" >
                    <ReactHTMLTableToExcel
                        table="seguimiento"
                        filename="InformeSeguimiento"
                        sheet="Sheet"
                        buttonText="Exportar a Excel"
                    />
                </Button>
            </div>
            <table id="seguimiento" className="table">
                <thead>
                    <tr>
                        <th>FECHA</th>
                        <th>CLIENTE</th>
                        <th>MOTIVO</th>
                        <th>ASISTENTES</th>
                        <th>CONTACTO</th>
                        <th>ASESOR COMERCIAL</th>
                        <th>equipo_rll</th>
                        <th>TEMA UNO</th>
                        <th>COMENTARIOS</th>
                        <th>TEMA DOS</th>
                        <th>COMENTARIOS</th>
                        <th>TEMA TRES</th>
                        <th>COMENTARIOS</th>
                        <th>TEMA CUATRO</th>
                        <th>COMENTARIOS</th>
                        <th>TEMA CINCO</th>
                        <th>COMENTARIOS</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listarOT && listarOT.map((ordenes, index) => {
                            return (
                                <tr>
                                    <td>{ordenes.fecha_rll}</td>
                                    <td>{ordenes.nombrecliente}</td>
                                    <td>{ordenes.motivollamada_rll}</td>
                                    <td>{ordenes.asistentes}</td>
                                    <td>{ordenes.contacto_rll}</td>
                                    <td>Eliana Chaverra</td>
                                    <td>{ordenes.equipo_rll}</td>
                                    <td>{ordenes.temauno}</td>
                                    <td>{ordenes.comentariostemauno}</td>
                                    <td>{ordenes.temados}</td>
                                    <td>{ordenes.comentariostemados}</td>
                                    <td>{ordenes.tematres}</td>
                                    <td>{ordenes.comentariostematres}</td>
                                    <td>{ordenes.temacuatro}</td>
                                    <td>{ordenes.comentariostemacuatro}</td>
                                    <td>{ordenes.temacinco}</td>
                                    <td>{ordenes.comentariostemacinco}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

        </div>
    );
}

export default SeguimientoComercial;