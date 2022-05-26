import React, { useEffect, useState } from 'react';
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { Modal, Button, Typography, Grid, TextField } from "@material-ui/core";
import { green, blue, blueGrey, red } from '@material-ui/core/colors';
import { makeStyles } from "@material-ui/core/styles";
import Moment from 'moment';

import activosServices from "../../../../services/Activos/Activos";

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

function Activos() {
    const styles = useStyles();
    const [listarEquipos, setListarEquipos] = useState([]);
    const [modalDepreciar, setModalDepreciar] = useState(false);
    const fechaactual = Moment(new Date()).format('YYYY-MM-DD');
    const [anno, setAnno] = useState(0);
    const [mes, setMes] = useState(0);

    useEffect (() => {
        async function fetchDataEquipos() {
            const res = await activosServices.listActivos();
            setListarEquipos(res.data);
            //console.log("EQUIPOS DEL SISTEMA : ", res.data);
        }
        fetchDataEquipos();
    }, [])

    const periodoDepreciacionConsultar = () => {
        setModalDepreciar(!modalDepreciar);
    }

    const handleChange = e => {
        const { name, value } = e.target;
        /*
            setDepreciacionSeleccionado(prevState => ({
              ...prevState,
              [name]: value
            }));
            */
    }

    return (
        <div>
            <div align="center" >
                <Button className={styles.button} color="primary" >
                    <ReactHTMLTableToExcel
                        table="activos"
                        filename="Informacion Activos"
                        sheet="Sheet"
                        buttonText="Exportar a Excel"
                    />
                </Button>
            </div>
            <table id="activos" className="table">
                <thead>
                    <tr>
                        <td>ID</td>
                        <th>Codigo Equipo</th>
                        <th>Codigo Activo</th>
                        <th>Descripción</th>
                        <th>Propietario</th>
                        <th>Marca</th>
                        <th>Antiguedad</th>
                        <th>Valor Adquisición</th>
                        <th>Valor Base Mayo 2021</th>
                        <th>Estado Contable</th>
                        <th>Cta Contable</th>
                        <th>Cta Depreciación</th>
                        <th>Valor Residual</th>
                        <th>Costo sin IVA</th>
                        <th>Depreciación Acumulada</th>
                        <th>Valor Neto</th>
                        <th>Valor Novedad</th>
                        <th>Duración</th>
                        <th>Depreciación Mensual</th>
                        <th>Fecha Inicia Depreciación</th>
                        <th>Fecha Ultima Depreciacion</th>
                        <th>Numero Combo</th>
                        <th>Estado Depreciación</th>
                        <th>Observación</th>
                        <th>Nombre Empresa</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listarEquipos && listarEquipos.map((depreciacion, index) => {
                            return (
                                <tr>
                                    <td>{depreciacion.id_act}</td>
                                    <td>{depreciacion.codigo_equ}</td>
                                    <td>{depreciacion.codigo_act}</td>
                                    <td>{depreciacion.descripcion_act}</td>
                                    <td>{depreciacion.razonsocial_int}</td>
                                    <td>{depreciacion.descripcion_mar}</td>
                                    <td>{depreciacion.antiguedad_act}</td>
                                    <td>{depreciacion.valoradquisicion_act}</td>
                                    <td>{depreciacion.valorenlibros_act}</td>
                                    <td>{depreciacion.nombre_est}</td>
                                    <td>{depreciacion.ctacontable_act}</td>
                                    <td>{depreciacion.ctadepreciacion_act}</td>
                                    <td>{depreciacion.valorresidual_act}</td>
                                    <td>{depreciacion.costosiniva_act}</td>
                                    <td>{depreciacion.depreciacionacumulada_act}</td>
                                    <td>{depreciacion.valorneto_act}</td>
                                    <td>{depreciacion.valornovedad_act}</td>
                                    <td>{depreciacion.duracion_act}</td>
                                    <td>{depreciacion.depreciacionmensual_act}</td>
                                    <td>{depreciacion.fechainiciadepre_act}</td>
                                    <td>{depreciacion.fechaultimadepre_act}</td>
                                    <td>{depreciacion.numerocombo_act}</td>
                                    <td>{depreciacion.estadodepre_act}</td>
                                    <td>{depreciacion.observacion_act}</td>
                                    <td>{depreciacion.nombre_emp}</td>
                                    
                                   
                             
                                 
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

        </div>
    );
}

export default Activos;