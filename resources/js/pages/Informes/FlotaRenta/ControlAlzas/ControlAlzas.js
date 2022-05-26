import React, { useEffect, useState } from 'react';
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { Modal, Button, Typography, Grid, TextField } from "@material-ui/core";
import { green, blue, blueGrey, red } from '@material-ui/core/colors';
import { makeStyles } from "@material-ui/core/styles";
import Moment from 'moment';

import contratosServices from "../../../../services/DatosEquipos/Contratos";

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
    const [listarEquipos, setListarEquipos] = useState([]);
    const [modalDepreciar, setModalDepreciar] = useState(false);
    const [alza, setAlza] = useState("N");

    useEffect(() => {
        async function fetchDataEquipos() {
            const res = await contratosServices.listContratos();
            /*
            if(res.data.controlalza_ctr === 0){
                setAlza("N");
            }else
            {
                setAlza("S");
            }
            */
            setListarEquipos(res.data);

            console.log("CONTRATOS : ", res.data);
        }
        fetchDataEquipos();
    }, [])

    return (
        <div>
            <div align="center" >
                <Button className={styles.button} color="primary" >
                    <ReactHTMLTableToExcel
                        table="pendientes"
                        filename="Informe Facturacion"
                        sheet="Sheet"
                        buttonText="Exportar a Excel"
                    />
                </Button>
            </div>
            <table id="pendientes" className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Codigo</th>
                        <th>Equipo</th>
                        <th>Cliente</th>
                        <th>Email</th>
                        <th>Nombre Asesor</th>
                        <th>Apellido Asesor</th>
                        <th>Descripción</th>
                        <th>Ciudad</th>
                        <th>Observaciones</th>
                        <th>Dia Facturación</th>
                        <th>Aplico Alza</th>
                        <th>Valor Contrato</th>
                        <th>Renta Mes</th>
                        <th>Fecha Alza</th>
                        <th>Fecha Inicia</th>
                        <th>Fecha Final</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listarEquipos && listarEquipos.map((pendientes, index) => {
                            return (
                                < tr >
                                    <td>{pendientes.id_ctr}</td>
                                    <td>{pendientes.codigocontrato_ctr}</td>
                                    <td>{pendientes.codigo_equ}</td>
                                    <td>{pendientes.razonsocial_cli}</td>
                                    <td>{pendientes.email_cli}</td> 
                                    <td>{pendientes.primer_nombre_emp}</td>
                                    <td>{pendientes.primer_apellido_emp}</td>
                                    <td>{pendientes.descripcion_equ}</td>
                                    <td>{pendientes.nombre_ciu}</td>
                                    <td>{pendientes.observacion_ctr}</td>
                                    <td>{pendientes.diafacturacion_ctr}</td>
                                    <td>{pendientes.controlalza_ctr}</td>
                                    <td>{pendientes.valorcontrato_ctr}</td>
                                    <td>{pendientes.valorrentames_ctr}</td>
                                    <td>{pendientes.fechaalza_ctr}</td>
                                    <td>{pendientes.fechainicio_ctr}</td>
                                    <td>{pendientes.fechafinal_ctr}</td>
                                    <td>{pendientes.nombre_est}</td>
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