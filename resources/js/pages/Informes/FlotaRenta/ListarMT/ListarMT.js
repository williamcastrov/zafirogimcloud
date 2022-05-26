import React, { useEffect, useState } from 'react';
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { Button, Typography } from "@material-ui/core";
import { green, blue, blueGrey, red } from '@material-ui/core/colors';
import { makeStyles } from "@material-ui/core/styles";
import Moment from 'moment';
import Loading from "../../../../components/Loading";

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

function ListarMT() {
    const styles = useStyles();
    const [listarEquipos, setListarEquipos] = useState([]);
    const fechaactual = Moment(new Date()).format('YYYY-MM-DD');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchDataEquipos() {
            setLoading(true);
            const res = await equiposServices.listEquipos();
            setListarEquipos(res.data);
            //console.log("EQUIPOS DEL SISTEMA : ", res.data);
            setLoading(false);
        }
        fetchDataEquipos();
    }, [])

    return (
        <div>
            {
                loading ? <Loading /> : null
            }
            <div align="center" >
                <Button className={styles.button} color="primary" >
                    <ReactHTMLTableToExcel
                        table="equiposmt"
                        filename="ListadoFlotaEquipos"
                        sheet="Sheet"
                        buttonText="Exportar a Excel"
                    />
                </Button>
            </div>
            <table id="equiposmt" className="table">
                <thead>
                    <tr>
                        <th>PROPIETARIO</th>
                        <th>DATO AUXILIAR PROPIETARIO</th>
                        <th>ESTADO CLIENTE</th>
                        <th>ID EQUIPO</th>
                        <th>ESTADO MMTO</th>
                        <th>FRECUENCIA</th>
                        <th>REFERENCIA</th>
                        <th>DESCRIPCIÓN</th>
                        <th>MARCA</th>
                        <th>DATOS EXTRACCION RPTO/MEJORA</th>
                        <th>MATRICULA</th>
                        <th>MARCACIÓN</th>
                        <th>MODELO</th>
                        <th>SERIE</th>
                        <th>AÑO DE FABRICACIÓN</th>
                        <th>ESTADO CALIDAD</th>
                        <th>DATO AUXILIAR CALIDAD</th>
                        <th>CUENTA CONTABLE</th>
                        <th>CUENTA DEPRECIACIÓN</th>
                        <th>DATO AUXILIAR CUENTAS</th>
                        <th>DOCUMENTO  MOVIMIENTO</th>
                        <th>COSTO  SIN IVA</th>
                        <th>COSTO CON IVA</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listarEquipos && listarEquipos.map((seguros, index) => {
                            return (
                                <tr>
                                    <td>{seguros.razonsocial_int}</td>
                                    <td>{seguros.datoauxiliarpropietario_equ}</td>
                                    <td>{seguros.nombre_estcli}</td>
                                    <td>{seguros.codigo_equ}</td>
                                    <td>{seguros.nombre_estmtto}</td>
                                    <td>{seguros.frecuencia_equ}</td>
                                    <td>{seguros.referencia_dequ}</td>
                                    <th>{seguros.descripcion_equ}</th>
                                    <th>{seguros.descripcion_mar}</th>
                                    <th>{seguros.datoauxiliaraquimejora_equ}</th>
                                    <th>{seguros.manejamatricula_equ}</th>
                                    <th>{seguros.manejamarcacion_equ}</th>
                                    <th>{seguros.modelo_dequ}</th>
                                    <th>{seguros.serie_dequ}</th>
                                    <th>{seguros.annofabricacion_dequ}</th>
                                    <td>{seguros.blanco}</td>
                                    <td>{seguros.nombre_estcal}</td>
                                    <td>{seguros.blanco}</td>
                                    <td>{seguros.ctacontable_equ}</td>
                                    <td>{seguros.ctadepreciacion_equ}</td>
                                    <td>{seguros.blanco}</td>
                                    <td>{seguros.blanco}</td>
                                    <th>{seguros.valoradquisicion_equ}</th>
                                    <th>{seguros.costosiniva_act}</th>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

        </div>
    );
}

export default ListarMT;