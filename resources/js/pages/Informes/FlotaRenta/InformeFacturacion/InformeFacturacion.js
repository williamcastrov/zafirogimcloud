import React, { useEffect, useState } from 'react';
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { Button, Typography } from "@material-ui/core";
import { green, blue, blueGrey, red } from '@material-ui/core/colors';
import { makeStyles } from "@material-ui/core/styles";
import Moment from 'moment';

import ordenesServices from "../../../../services/GestionOrdenes/CrearOrdenes";
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

function InformeFacturacion() {
    const styles = useStyles();
    const [listarOT, setListarOT] = useState([]);

    useEffect(() => {
        async function fetchDataOT() {
            const res = await facturacionServices.listarfacturacion();
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
                        table="facturas"
                        filename="Informe Facturación Mes"
                        sheet="Sheet"
                        buttonText="Exportar a Excel"
                    />
                </Button>
            </div>
            <table id="facturas" className="table">
                <thead>
                    <tr>
                        <th>Año</th>
                        <th>MES</th>
                        <th>TIPO DE FACTURA</th>
                        <th>EQUIPO</th>
                        <th>ASESOR COMERCIAL</th>
                        <th>CLIENTE</th>
                        <th>CIUDAD</th>
                        <th>DIA FACTURACION</th>
                        <th>VALOR FACTURA</th>
                        <th>NUMERO FACTURA</th>
                        <th>FACTURADA S/N</th>
                        <th>DATOS CLIENTES</th>
                        <th>OBSERVACION</th>
                        <th>CIUDAD</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listarOT && listarOT.map((ordenes, index) => {
                            return (
                                <tr>
                                    <td>{ordenes.anno_fac}</td>
                                    <td>{ordenes.mes_fac}</td>
                                    <td>{ordenes.descripcion_tpf}</td>
                                    <td>{ordenes.equipo_fac}</td>
                                    <td>Eliana Chaverra</td>
                                    <td>{ordenes.razonsocial_cli}</td>
                                    <td>{ordenes.nombre_ciu}</td>
                                    <td>{ordenes.diafacturacion_ctr}</td>
                                    <td>{ordenes.valorrentames_ctr}</td>
                                    <td>{ordenes.numerofactura_ctr}</td>
                                    <td>{ordenes.facturada_ctr}</td> 
                                    <td>{ordenes.datoscliente_ctr}</td>
                                    <td>{ordenes.observacion_ctr}</td>      
                                    <td>{ordenes.nombre_ciu}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

        </div>
    );
}

export default InformeFacturacion;