import React, { useEffect, useState } from 'react';
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { Button, Typography } from "@material-ui/core";
import { green, blue, blueGrey, red } from '@material-ui/core/colors';
import { makeStyles } from "@material-ui/core/styles";
import Moment from 'moment';

import equiposServices from "../../../../services/Mantenimiento/Equipos";

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

function ActivosRenta() {
    const styles = useStyles();
    const [listarEquipos, setListarEquipos] = useState([]);
    const fechaactual = Moment(new Date()).format('YYYY-MM-DD');

    useEffect(() => {
        async function fetchDataEquipos() {
            const res = await equiposServices.listActivosRenta();
            setListarEquipos(res.data);
            console.log("EQUIPOS DEL SISTEMA : ", res.data);
        }
        fetchDataEquipos();
    }, [])

    return (
        <div>
            <div align="center" >
                <Button className={styles.button} color="primary" >
                    <ReactHTMLTableToExcel
                        table="emp"
                        filename="Activos Renta"
                        sheet="Sheet"
                        buttonText="Exportar a Excel"
                    />
                </Button>
            </div>
            <table id="emp" className="table">
                <thead>
                    <tr>
                        <th>Item Seguro</th>
                        <th>N. Importación</th>
                        <th>Fecha</th>
                        <th>Propietario</th>
                        <th>Estado</th>
                        <th>ID Interno</th>
                        <th>Cod SubGrupo</th>
                        <th>Descripción SubGrupo</th>
                        <th>Cliente</th>
                        <th>Direccion</th>
                        <th>Ciudad</th>
                        <th>Referencia</th>
                        <th>Descripción</th> 
                        <th>Marca</th>
                        <th>Modelo</th>
                        <th>Serie</th> 
                        <th>Año Fabicación</th> 
                        <th>Cuenta Contable</th> 
                    </tr>
                </thead>
                <tbody>
                    {
                        listarEquipos && listarEquipos.map((equipos, index) => {
                            return (
                                <tr>
                                    <td>{equipos.IDinterno_seg}</td>
                                    <td>{equipos.declaracionimportacion_seg}</td>
                                    <td>{fechaactual}</td>
                                    <td>{equipos.razonsocial_int}</td>
                                    <td>{equipos.nombre_estcli}</td>
                                    <td>{equipos.codigo_equ}</td>
                                    <td>{equipos.codigo_sgre}</td>
                                    <td>{equipos.descripcion_sgre}</td>
                                    <td>{equipos.cliente_ubi}</td>
                                    <td>{equipos.direccion_ubi}</td>
                                    <td>{equipos.ciudad_ubi}</td>
                                    <td>{equipos.referencia_dequ}</td>
                                    <td>{equipos.descripcion_equ}</td>
                                    <td>{equipos.descripcion_mar}</td>
                                    <td>{equipos.modelo_dequ}</td>
                                    <td>{equipos.serie_dequ}</td>
                                    <td>{equipos.annofabricacion_dequ}</td>
                                    <td>{equipos.ctacontable_equ}</td>

                                    
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

        </div>
    );
}

export default ActivosRenta;