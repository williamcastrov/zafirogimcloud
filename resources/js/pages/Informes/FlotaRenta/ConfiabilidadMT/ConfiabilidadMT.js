import React, { useEffect, useState } from 'react';
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { Button, Typography } from "@material-ui/core";
import { green, blue, blueGrey, red } from '@material-ui/core/colors';
import { makeStyles } from "@material-ui/core/styles";
import Moment from 'moment';

import ordenesServices from "../../../../services/GestionOrdenes/CrearOrdenes";
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

function ConfiabilidadMT() {
    const styles = useStyles();
    const [listarOT, setListarOT] = useState([]);
    const [totalCorrectivo, setTotalCorrectivo] = useState([]);

    useEffect(() => {
        async function fetchDataOT() {
            const res = await equiposServices.informecomfiabilidad();
            setListarOT(res.data);
            //console.log("EQUIPOS DEL SISTEMA : ", res.data);
        }
        fetchDataOT();
    }, [])

    useEffect(() => {
        async function fetchDataTotalCorrectivo() {
            const res = await equiposServices.totalcorrectivomtperiodo();
            setTotalCorrectivo(res.data);
            console.log("TOTAL CORRECTIVOS : ", res.data);
        }
        fetchDataTotalCorrectivo();
    }, [])


    return (
        <div>
            <div align="center" >
                <Button className={styles.button} color="primary" >
                    <ReactHTMLTableToExcel
                        table="confibilidad"
                        filename="CofiabilidadFlotadaEquiposRenta"
                        sheet="Sheet"
                        buttonText="Exportar a Excel"
                    />
                </Button>
            </div>
            <table id="confibilidad" className="table">
                <thead>
                    <tr>
                        <th>MT</th>
                        <th>CLIENTE ID</th>
                        <th>CIUDAD</th>
                        <th>DEPARTAMENTO</th>
                        <th>TIEMPO TOTAL CORRECTIVO</th>
                        <th>TOTAL CORRECTIVOS</th>
                        <th>HORAS CONTRATADAS</th>
                        <th>TIEMPO RESPUESTA</th>
                        <th>MTTR (TIEMPO PROMEDIO DE REPARACION)</th>
                        <th>MTBF (TIEMPO PROMEDIO ENTRE FALLAS)</th>
                        <th>CONFIABILIDAD</th>
                        <th>FIABILIDAD</th>
                        <th>DISPONIBILIDAD</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listarOT && listarOT.map((ordenes, index) => {
                            let tiempo = 0;
                            let contador = 0;
                            let promedioentrefallas = 0;
                            let tiempopromedioreparacion = 0;
                            let tiempoderespuesta = 6;
                            let confiabilidad = 0;

                            if (totalCorrectivo.length > 0) {
                                for (var i = 0; i < totalCorrectivo.length; i++) {
                                    if (totalCorrectivo[i].equipo_otr === ordenes.id_equ) {
                                        tiempo = totalCorrectivo[i].tiempo;
                                        contador = totalCorrectivo[i].contar;
                                        tiempopromedioreparacion = tiempo / contador;
                                        promedioentrefallas = (ordenes.horascontratadas - 
                                                              ((tiempoderespuesta * totalCorrectivo[i].contar) * contador))/
                                                                totalCorrectivo[i].contar
                                        confiabilidad = promedioentrefallas / (promedioentrefallas + tiempopromedioreparacion)
                                    }
                                }
                            }

                            return (
                                <tr>
                                    <td>{ordenes.codigo_equ}</td>
                                    <td>{ordenes.razonsocial_cli}</td>
                                    <td>{ordenes.nombre_ciu}</td>
                                    <td>{ordenes.nombre_dep}</td>
                                    <td>{tiempo}</td>
                                    <td>{contador}</td>
                                    <td>{ordenes.horascontratadas}</td>
                                    <td>{tiempoderespuesta}</td>
                                    <td>{tiempopromedioreparacion}</td>
                                    <td>{promedioentrefallas}</td>
                                    <td>{confiabilidad}</td>
                                    <td>{0}</td>
                                    <td>{0}</td>
                                    </tr>
                            )
                        })
                    }
                </tbody>
            </table>

        </div>
    );
}

export default ConfiabilidadMT;