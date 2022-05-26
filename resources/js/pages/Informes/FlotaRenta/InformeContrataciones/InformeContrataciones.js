import React, { useEffect, useState } from 'react';
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { Modal, Button, Select, MenuItem, FormControl, InputLabel, Grid, TextField, Typography } from "@material-ui/core";
import { green, blue, blueGrey, red } from '@material-ui/core/colors';
import { makeStyles } from "@material-ui/core/styles";
import CallMissedIcon from '@material-ui/icons/CallMissed';
import Moment from 'moment';

import cumplimientoService from '../../../../services/GestionOrdenes/CumplimientoOserv';
import contratacionesServices from "../../../../services/Importar/Contrataciones";

const useStyles = makeStyles((theme) => ({
    modal: {
        position: 'absolute',
        width: 400,
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

function InformeContrataciones() {
    const styles = useStyles();
    const [contrataciones, setContrataciones] = useState([]);
    const fechaactual = Moment(new Date()).format('YYYY-MM-DD');
    const [modalPeriodo, setModalPeriodo] = useState(false);
    const [anno, setAnno] = useState(0);
    const [mes, setMes] = useState(0);
    const [periodo, setPeriodo] = useState(0);

    const abrirCerrarModalPeriodo = () => {
        setModalPeriodo(!modalPeriodo);
    }

    const periodoInforme = (
        <div className={styles.modal}>
            <Typography align="center" className={styles.typography} variant="button" display="block"> Ingrese Periodo Informe </Typography>
            <Grid item xs={12} md={12}>
                <TextField type="numeric" className={styles.inputMaterial} label="Año" name="annodepreciar" fullWidth
                    onChange={(e) => setAnno(e.target.value)} />
            </Grid>
            <Grid item xs={12} md={12}>
                <TextField type="numeric" className={styles.inputMaterial} label="Mes" name="mesdepreciar" fullWidth
                    onChange={(e) => setMes(e.target.value)} />
            </Grid>
            <div align="right">
                <Button className={styles.button} color="primary" onClick={() => procesarInforme()} >Confirmar</Button>
                <Button className={styles.button2} onClick={() => abrirCerrarModalPeriodo()} >Cancelar</Button>
            </div>
        </div>
    )

    const procesarInforme = async () => {
        let periodo = anno + mes;
        setPeriodo(periodo);
        console.log("PERIODO : ", periodo)

        async function fetchDataConsumosRepuestos(per) {
            const res = await contratacionesServices.listarcontratacionesperiodo(per);
            setContrataciones(res.data);
            console.log("DATOS CONTRATACIONES : ", res.data);
        }
        fetchDataConsumosRepuestos(periodo);
        //leerDatosEquipos();
    }

    return (
        <div>
            <Modal
                open={modalPeriodo}
                onClose={abrirCerrarModalPeriodo}
            >
                {periodoInforme}
            </Modal>
            <div align="center" >
                <Button className={styles.button} variant="contained" startIcon={<CallMissedIcon />} onClick={() => abrirCerrarModalPeriodo()} >
                    Generar Informe
                </Button>
                <Button className={styles.button} color="primary" >
                    <ReactHTMLTableToExcel
                        table="contrataciones"
                        filename="ContratacionesMT"
                        sheet="Sheet"
                        buttonText="Exportar a Excel"
                    />
                </Button>
            </div>
            <table id="contrataciones" className="table">
                <thead>
                    <tr>
                        <th>CODIGO MT</th>
                        <th>AÑO</th>
                        <th>MES</th>
                        <th>DOCUMENTO</th>
                        <th>PROVEEDOR</th>
                        <th>DESCRIPCION</th>
                        <th>CENTRO COSTO</th>
                        <th>VALOR TOTAL</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        contrataciones && contrataciones.map((consumos, index) => {
                            return (
                                <tr>
                                    <td>{consumos.documentoref}</td>
                                    <td>{consumos.anno}</td>
                                    <td>{consumos.mes}</td>
                                    <td>{consumos.documento}</td>
                                    <td>{consumos.nombrenit}</td>
                                    <td>{consumos.detalle}</td>
                                    <td>{consumos.centrocosto}</td>
                                    <td>{Math.round(consumos.costomtto)}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

        </div>
    );
}

export default InformeContrataciones;