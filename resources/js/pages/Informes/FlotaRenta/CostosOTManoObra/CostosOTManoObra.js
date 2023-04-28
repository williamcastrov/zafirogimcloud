import React, { useEffect, useState } from 'react';
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { Modal, Button, Typography, Grid, TextField } from "@material-ui/core";
import { green, blue, blueGrey, red, grey } from '@material-ui/core/colors';
import { makeStyles } from "@material-ui/core/styles";
import Moment from 'moment';
import "./costos.css";
import Loading from "../../../../components/Loading";

import ordenesServices from "../../../../services/GestionOrdenes/CrearOrdenes";
import ordenesCumplimiento from "../../../../services/GestionOrdenes/CumplimientoOserv";

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
    modal2: {
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
    button3: {
        color: theme.palette.getContrastText(blueGrey[500]),
        backgroundColor: grey[700],
        margin: theme.spacing(1),
        fontSize: 12,
        '&:hover': {
            backgroundColor: green[700],
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

function CostosOTManoObra() {
    const styles = useStyles();
    const [listarOT, setListarOT] = useState([]);
    const [anno, setAnno] = useState(0);
    const [mes, setMes] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [modalDepreciar, setModalDepreciar] = useState(false);

    const procesarTodo = async () => {
        async function fetchDataOT() {
            const res = await ordenesCumplimiento.listarcostosot();
            //console.log("DATOS OT : ", res.data)
            setListarOT(res.data);
        }
        fetchDataOT();
    }

    const procesarPeriodo = async () => {
        setIsLoading(true);
        let periodo = anno + mes;

        async function fetchDataOT() {
            let rowData = [];
            const res = await ordenesCumplimiento.listarcostosot();
            //console.log("DATOS OT : ", res.data)
            let long = res.data.length - 2;
            let contar = 0;
            res.data &&
                res.data.map((row, index) => {
                    contar = contar + 1;
                    if (row.tipo_cre == 1) {
                        let date = row.fechaprogramada_otr;
                        let dato = String(date);
                        let annoot = dato.substr(0, 4);
                        let mesot = dato.substr(5, 2);

                        if (parseInt(annoot) === parseInt(anno) && parseInt(mesot) === parseInt(mes)) {
                            rowData.push(row);
                        }
                    }
                    if (contar > long)
                        setIsLoading(false)
                })
            setListarOT(rowData);
        }
        fetchDataOT();
        periodoConsultar();
    }

    const periodoConsultar = () => {
        setModalDepreciar(!modalDepreciar);
    }


    const equipoDepreciar = (
        <div className={styles.modal2}>
            {
                isLoading ?
                    <Loading />
                    :
                    null
            }

            <Typography align="center" className={styles.typography} variant="button" display="block"> Periodo a Consultar</Typography>
            <Grid item xs={12} md={12}>
                <TextField
                    type="numeric"
                    className={styles.inputMaterial}
                    label="Año"
                    name="annodepreciar" fullWidth
                    onChange={(e) => setAnno(e.target.value)}
                />
            </Grid>
            <Grid item xs={12} md={12}>
                <TextField
                    type="numeric"
                    className={styles.inputMaterial}
                    label="Mes"
                    name="mesdepreciar" fullWidth
                    onChange={(e) =>
                        setMes(e.target.value)}
                />
            </Grid>
            <div align="right">
                <Button className={styles.button} color="primary" onClick={() => procesarPeriodo()} >Confirmar</Button>
                <Button className={styles.button2} onClick={() => periodoConsultar()} >Cancelar</Button>
            </div>
        </div>
    )

    return (
        <div className='centrar'>
            <Modal
                open={modalDepreciar}
                onClose={periodoConsultar}
            >
                {equipoDepreciar}
            </Modal>
            <div align="center" >
                <Button
                    className={styles.button3}
                    onClick={() => procesarTodo()}
                >
                    Consultar todo
                </Button>
                <Button className={styles.button} color="primary" >
                    <ReactHTMLTableToExcel
                        table="costos"
                        filename="CostosOTManoObra"
                        sheet="Sheet"
                        buttonText="Exportar a Excel"
                    />
                </Button>
                <Button
                    className={styles.button}
                    onClick={() => periodoConsultar()}
                >
                    Seleccionar Periodo
                </Button>
            </div>
            <table id="costos" className="table tamanotabla">
                <thead>
                    <tr>
                        <th># OT</th>
                        <th>MT</th>
                        <th>ID ACTIVIDAD</th>
                        <th>CLIENTE ID</th>
                        <th>CIUDAD</th>
                        <th>FECHA</th>
                        <th>MANO DE OBRA</th>
                        <th>CONCEPTO</th>
                        <th>CANTIDAD</th>
                        <th>COSTO UNITARIO</th>
                        <th>COSTO TOTAL</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listarOT && listarOT.map((ordenes, index) => {
                            return (
                                <tr>
                                    <td>{ordenes.id_otr}</td>
                                    <td>{ordenes.codigo_equ}</td>
                                    <td>{ordenes.id_actividad}</td>
                                    <td>{ordenes.razonsocial_cli}</td>
                                    <td>{ordenes.nombre_ciu}</td>
                                    <td>{ordenes.fechaprogramada_otr}</td>
                                    <td>{ordenes.concepto_cre}</td>
                                    <td>{ordenes.proveedor_cre}</td>
                                    <td>{ordenes.cantidad_cre}</td>
                                    <td>{ordenes.costounitario_cre}</td>
                                    <td>{ordenes.costototal_cre}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

        </div>
    );
}

export default CostosOTManoObra;