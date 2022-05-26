import React, { useEffect, useState } from 'react';
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { Modal, Button, Typography, Grid, TextField } from "@material-ui/core";
import { green, blue, blueGrey, red } from '@material-ui/core/colors';
import { makeStyles } from "@material-ui/core/styles";
import Moment from 'moment';

import depreciacionServices from "../../../../services/Activos/Depreciacion";

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

function Depreciacion() {
    const styles = useStyles();
    const [listarEquipos, setListarEquipos] = useState([]);
    const [modalDepreciar, setModalDepreciar] = useState(false);
    const fechaactual = Moment(new Date()).format('YYYY-MM-DD');
    const [anno, setAnno] = useState(0);
    const [mes, setMes] = useState(0);

    const procesarDepreciacion = async () => {
        let periodo = anno + mes;

        async function fetchDataEquipos() {
            const res = await depreciacionServices.get(periodo);
            setListarEquipos(res.data);
            //console.log("EQUIPOS DEL SISTEMA : ", res.data);
        }
        fetchDataEquipos();
        periodoDepreciacionConsultar();
    }

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

    const equipoDepreciar = (
        <div className={styles.modal}>
            <Typography align="center" className={styles.typography} variant="button" display="block"> Periodo Depreciación a Exportar </Typography>
            <Grid item xs={12} md={12}>
                <TextField type="numeric" className={styles.inputMaterial} label="Año" name="annodepreciar" fullWidth onChange={handleChange}
                    onChange={(e) => setAnno(e.target.value)} />
            </Grid>
            <Grid item xs={12} md={12}>
                <TextField type="numeric" className={styles.inputMaterial} label="Mes" name="mesdepreciar" fullWidth onChange={handleChange}
                    onChange={(e) => setMes(e.target.value)} />
            </Grid>
            <div align="right">
                <Button className={styles.button} color="primary" onClick={() => procesarDepreciacion()} >Confirmar</Button>
                <Button className={styles.button2} onClick={() => periodoDepreciacionConsultar()} >Cancelar</Button>
            </div>
        </div>
    )

    return (
        <div>
            <Modal
                open={modalDepreciar}
                onClose={periodoDepreciacionConsultar}
            >
                {equipoDepreciar}
            </Modal>
            <div align="center" >
                <Button className={styles.button} color="primary" >
                    <ReactHTMLTableToExcel
                        table="depreciacion"
                        filename="Informacion Depreciacion"
                        sheet="Sheet"
                        buttonText="Exportar a Excel"
                    />
                </Button>
                <Button className={styles.button2} onClick={() => periodoDepreciacionConsultar()}>Seleccionar Periodo</Button>
            </div>
            <table id="depreciacion" className="table">
                <thead>
                    <tr>
                        <th>AÑO</th>
                        <th>MES</th>
                        <th>ID ACTIVO</th>
                        <th>ID MT</th>
                        <th>CTA CONTABLE</th>
                        <th>CTA DEPRECIACION</th>
                        <th>DESCRIPCION</th>
                        <th>VALOR ADQUISICION</th>
                        <th>CUOTA DEPRECIACION</th>
                        <th>DEPRECIACION ACUMULADA</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listarEquipos && listarEquipos.map((depreciacion, index) => {
                            return (
                                <tr>
                                    <td>{depreciacion.anno_dpr}</td>
                                    <td>{depreciacion.mes_dpr}</td>
                                    <td>{depreciacion.codigocontable_act}</td>
                                    <td>{depreciacion.codigo_equ}</td>
                                    <td>{depreciacion.ctacontable_act}</td>
                                    <td>{depreciacion.ctadepreciacion_act}</td>
                                    <td>{depreciacion.descripcion_act}</td>
                                    <td>{depreciacion.valoradquisicion_act}</td>
                                    <td>{depreciacion.valordepreciacion_dpr}</td>
                                    <td>{depreciacion.depreciacionacumulada_act}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

        </div>
    );
}

export default Depreciacion;