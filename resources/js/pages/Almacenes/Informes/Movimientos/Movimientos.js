import React, { useEffect, useState } from 'react';
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { Modal, Button, Typography, Grid, TextField } from "@material-ui/core";
import { green, blue, blueGrey, red } from '@material-ui/core/colors';
import { makeStyles } from "@material-ui/core/styles";
import Moment from 'moment';

import movimientosServices from "../../../../services/Almacenes/Inventarios";

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

function ControlAlzas() {
    const styles = useStyles();
    const [listarMovimientos, setListarMovimientos] = useState([]);
    const [modalDepreciar, setModalDepreciar] = useState(false);
    const [alza, setAlza] = useState("N");

    useEffect(() => {
        const leeMovimientos = async () => {
            const data = { username: 'example' };

            fetch("https://api.gimcloud.com/gimcloudzafiro/api/5")
                .then((response) => response.json())
                .then((data) => {
                    console.log('Success:', data);
                    setListarMovimientos(data);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        };
        leeMovimientos();
    }, [])

    return (
        <div>
            <div align="center" >
                <Button className={styles.button} color="primary" >
                    <ReactHTMLTableToExcel
                        table="movimientos"
                        filename="MovimientosAlmacen"
                        sheet="Sheet"
                        buttonText="Exportar a Excel"
                    />
                </Button>
            </div>
            <table id="movimientos" className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tipo de Mvto</th>
                        <th>Almacen</th>
                        <th>Desembolso</th>
                        <th>O. Compra</th>
                        <th>Proveedor</th>
                        <th>Referencia</th>
                        <th>MT</th>
                        <th>Descripción</th>
                        <th>Quién aprobo</th>
                        <th>Cantidad</th>
                        <th>Valor unitario</th>
                        <th>Valor Total</th>
                        <th>Fecha mvto</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listarMovimientos && listarMovimientos.map((mvto, index) => {
                            return (
                                < tr >
                                    <td>{mvto.tipooperacion_mov}</td>
                                    <td>{mvto.descripcion_tope}</td>
                                    <td>{mvto.descripcion_alm}</td>
                                    <td>{mvto.descripcion_dese}</td>
                                    <td>{mvto.ordendecompra_mov}</td>
                                    <td>{mvto.razonsocial_int}</td>
                                    <td>{mvto.referencia_mov}</td>
                                    <td>{mvto.codigo_equ}</td>
                                    <td>{mvto.descripcion_mov}</td>
                                    <td>{mvto.aprobo_mov}</td>
                                    <td>{mvto.cantidad_mov}</td>
                                    <td>{mvto.costounitario_mov}</td>
                                    {
                                        mvto.tipooperacion_mov == 2 ?
                                            <td>{mvto.valormovimiento_mov}</td>
                                            :
                                            <td>{mvto.valormovimiento_mov * -1}</td>
                                    }

                                    <td>{mvto.fecha_mov}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

        </div >
    );
}

export default ControlAlzas;