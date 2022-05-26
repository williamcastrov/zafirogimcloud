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

function InformeSeguros() {
    const styles = useStyles();
    const [listarEquipos, setListarEquipos] = useState([]);
    const fechaactual = Moment(new Date()).format('YYYY-MM-DD');

    useEffect(() => {
        async function fetchDataEquipos() {
            const res = await equiposServices.listActivosAsegurados();
            setListarEquipos(res.data);
            //console.log("EQUIPOS DEL SISTEMA : ", res.data);
        }
        fetchDataEquipos();
    }, [])

    return (
        <div>
            <div align="center" >
                <Button className={styles.button} color="primary" >
                    <ReactHTMLTableToExcel
                        table="seguros"
                        filename="Informacion Seguros"
                        sheet="Sheet"
                        buttonText="Exportar a Excel"
                    />
                </Button>
            </div>
            <table id="seguros" className="table">
                <thead>
                    <tr>
                        <th>No. SEGURO</th>
                        <th>ID PRODUCTO</th>
                        <th>ESTADO SEGURO</th>
                        <th>CLIENTE</th>
                        <th>CIUDAD</th>
                        <th>DIRECCIÓN CONTRATO</th>
                        <th>DESCRIPCIÓN</th>
                        <th>CÓDIGO-REFERENCIA</th>
                        <th>MARCA</th>
                        <th>MODELO</th>
                        <th>SERIE</th> 
                        <th>VALOR COMERCIAL</th>
                        <th>ASEGURAR SEGÚN VALOR COMERCIAL</th>   
                        <th>AÑO DE FABRICACIÓN</th>        
                        <th>No. IMPORTACIÓN</th>   
                    </tr>
                </thead>
                <tbody>
                    {
                        listarEquipos && listarEquipos.map((seguros, index) => {
                            return (
                                <tr>
                                    <td>{seguros.numeroseguro_seg}</td>
                                    <td>{seguros.codigo_equ}</td>
                                    <td>{seguros.nombre_estcli}</td> 
                                    <td>{seguros.razonsocial_cli}</td>
                                    <td>{seguros.nombre_ciu}</td>
                                    <td>{seguros.direccion_ubi}</td>
                                    <td>{seguros.descripcion_equ}</td>
                                    <td>{seguros.referencia_dequ}</td>  
                                    <td>{seguros.descripcion_mar}</td>
                                    <td>{seguros.modelo_dequ}</td>
                                    <td>{seguros.serie_dequ}</td>
                                    <td>{seguros.valoradquisicion_equ}</td>
                                    <td>{seguros.valorcomercial_seg}</td>
                                    <td>{seguros.annofabricacion_dequ}</td> 
                                    <td>{seguros.declaracionimportacion_seg}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

        </div>
    );
}

export default InformeSeguros;