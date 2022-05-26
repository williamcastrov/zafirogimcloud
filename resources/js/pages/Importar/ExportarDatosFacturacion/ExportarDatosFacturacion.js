import React, { useEffect, useState } from 'react';
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { Modal, Button, Select, MenuItem, FormControl, InputLabel, Grid, Typography, TextField } from "@material-ui/core";
import { green, blue, blueGrey, red } from '@material-ui/core/colors';
import { makeStyles } from "@material-ui/core/styles";
import CallMissedIcon from '@material-ui/icons/CallMissed';
import Moment from 'moment';

import rentabilidadService from '../../../services/Importar/RentabilidadPeriodo';

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
        backgroundColor: blue[700],
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

function ExportarDatosFacturacion() {
    const styles = useStyles();
    const [facturacionEquipos, setFacturacionEquipos] = useState([]);
    const fechaactual = Moment(new Date()).format('YYYY-MM-DD');
    const [modalPeriodo, setModalPeriodo] = useState(false);
    const [listarEquipos, setListarEquipos] = useState([]);
    const [anno, setAnno] = useState(0);
    const [mes, setMes] = useState(0);

    const periodoConsultar = () => {
        setModalPeriodo(!modalPeriodo);
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

    const procesarPeriodo = async () => {
        let periodo = anno + mes;
        console.log("PERIODO : ", periodo);
        
        async function fetchDataPeriodo() {
            const res = await rentabilidadService.listar_factcontratacionrepuestosperiodo(periodo);
            setFacturacionEquipos(res.data);
            console.log("FACTURACION EQUIPOS : ", res.data);
        }
        fetchDataPeriodo();
        periodoConsultar();
    }

    const periodoFacturacion = (
        <div className={styles.modal}>
            <Typography align="center" className={styles.typography} variant="button" display="block"> Periodo Depreciación a Exportar </Typography>
            <Grid item xs={12} md={12}>
                <TextField type="numeric" className={styles.inputMaterial} label="Año" name="annodepreciar" 
                    onChange={(e) => setAnno(e.target.value)} />
            </Grid>
            <Grid item xs={12} md={12}>
                <TextField type="numeric" className={styles.inputMaterial} label="Mes" name="mesdepreciar" 
                    onChange={(e) => setMes(e.target.value)} />
            </Grid>
            <div align="right">
                <Button className={styles.button} color="primary" onClick={() => procesarPeriodo()} >Confirmar</Button>
                <Button className={styles.button2} onClick={() => periodoConsultar()} >Cancelar</Button>
            </div>
        </div>
    )

    return (
        <div>
              <Modal
                open={modalPeriodo}
                onClose={periodoConsultar}
            >
                {periodoFacturacion}
            </Modal>
            <div align="center" >
                <Button className={styles.button} color="primary" >
                    <ReactHTMLTableToExcel
                        table="facturacionmes"
                        filename="Facturacionmes"
                        sheet="Sheet"
                        buttonText="Exportar a Excel"
                    />
                </Button>
                <Button className={styles.button2} onClick={() => periodoConsultar()}>Seleccionar Periodo</Button>
            </div>
            <table id="facturacionmes" className="table">
                <thead>
                    <tr>
                        <th>idequipo</th>
                        <th>codigomt</th>
                        <th>descripcionmt</th>
                        <th>anno</th>
                        <th>mes</th>
                        <th>periodo</th>
                        <th>codigomtanno</th>
                        <th>codigoperiodo</th>
                        <th>valorconsumo</th>
                        <th>valorrentames</th>
                        <th>valorcontratos</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        facturacionEquipos && facturacionEquipos.map((facturacion, index) => {
                            return (
                                <tr>
                                    <td>{facturacion.idequipo}</td>
                                    <td>{facturacion.codigomt}</td>
                                    <td>{facturacion.descripcionmt}</td>
                                    {
                                        facturacion.anno ?
                                        <td>{facturacion.anno}</td>
                                        :
                                        <td>{anno}</td>
                                    }
                                    {
                                        facturacion.mes ?
                                        <td>{facturacion.mes}</td>
                                        :
                                        <td>{mes}</td>
                                    }
                                    {
                                        facturacion.periodo ?
                                        <td>{facturacion.periodo}</td>
                                        :
                                        <td>{anno}{mes}</td>
                                    }
                                    {
                                        facturacion.codigomtanno ?
                                        <td>{facturacion.codigomtanno}</td>
                                        :
                                        <td>{anno}{facturacion.codigomt}</td>
                                    }
                                    {
                                        facturacion.codigoperiodo ?
                                        <td>{facturacion.codigoperiodo}</td>
                                        :
                                        <td>{anno}{mes}{facturacion.codigomt}</td>
                                    }
                                    {
                                        facturacion.valorconsumo ?
                                        <td>{facturacion.valorconsumo}</td>
                                        :
                                        <td>{0}</td>
                                    }
                                     {
                                        facturacion.valorrentames ?
                                        <td>{facturacion.valorrentames}</td>
                                        :
                                        <td>{0}</td>
                                    }
                                   
                                    {
                                        facturacion.valorcontratos ?
                                        <td>{facturacion.valorcontratos}</td>
                                        :
                                        <td>{0}</td>
                                    }
                                   
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

        </div>
    );
}

export default ExportarDatosFacturacion;