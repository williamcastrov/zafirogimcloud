import React, { useEffect, useState } from 'react';
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { Button, Typography } from "@material-ui/core";
import { green, blue, blueGrey, red } from '@material-ui/core/colors';
import { makeStyles } from "@material-ui/core/styles";
import Moment from 'moment';

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

function ReporteCostosOT() {
    const styles = useStyles();
    const [listarOT, setListarOT] = useState([]);

    useEffect(() => {
        async function fetchDataOT() {
            const res = await ordenesCumplimiento.listarcostosot();

            const newItems = [];
            let valida = false;
            res.data &&
                res.data.map((items, index) => {
                    valida = newItems.includes(items.ot_cre);
                    if (!valida) {
                        newItems.push(items.ot_cre);
                    }
                });
           
            let DetCosto = [];
            if (res.data) {
                newItems && newItems.map((tem) => {
                    let cantidaduno = 0;
                    let valoruno = 0;
                    let cantidaddos = 0;
                    let valordos = 0;
                    let cantidadtres = 0;
                    let valortres = 0;
                    let ot = 0;
                    let equipo = 0;
                    let actividad = 0;
                    let razonsocial = "";
                    let ciudad = "";
                    let fecha = "";

                    res.data && res.data.map((items, index) => {
                        if (items.ot_cre == tem) {
                            if (items.tipo_cre == 1) {
                                cantidaduno = cantidaduno + items.cantidad_cre;
                                valoruno = valoruno + items.costototal_cre;
                            } else
                                if (items.tipo_cre == 2) {
                                    cantidaddos = cantidaddos + items.cantidad_cre;
                                    valordos = valordos + items.costototal_cre;
                                } else
                                    if (items.tipo_cre == 3) {
                                        cantidadtres = cantidadtres + items.cantidad_cre;
                                        valortres = valortres + items.costototal_cre;
                                    }

                                    ot = items.id_otr;
                                    equipo = items.codigo_equ;
                                    actividad = items.id_actividad;
                                    razonsocial = items.razonsocial_cli;
                                    ciudad = items.nombre_ciu;
                                    fecha = items.fechaprogramada_otr;
                        }
                    })

                    let row = {
                        cantidadmo: cantidaduno,
                        valormo: valoruno,
                        cantidadinsumo: cantidaddos,
                        valorinsumo: valordos,
                        cantidadrep: cantidadtres,
                        valorrep: valortres,
                        id_otr: ot,
                        codigo_equ: equipo,
                        id_actividad: actividad,
                        razonsocial_cli: razonsocial,
                        nombre_ciu: ciudad,
                        total: valoruno+valordos+valortres,
                        fechaprogramada_otr: fecha
                    }

                    DetCosto.push(row)
                })
                console.log("DATOS : ", DetCosto)
                setListarOT(DetCosto);
            }
        }
        fetchDataOT();
    }, [])

    return (
        <div>
            <div align="center" >
                <Button className={styles.button} color="primary" >
                    <ReactHTMLTableToExcel
                        table="costos"
                        filename="ReporteCostosOT"
                        sheet="Sheet"
                        buttonText="Exportar a Excel"
                    />
                </Button>
            </div>
            <table id="costos" className="table">
                <thead>
                    <tr>
                        <th># OT</th>
                        <th>MT</th>
                        <th>ID ACTIVIDAD</th>
                        <th>CLIENTE ID</th>
                        <th>CIUDAD</th>
                        <th>FECHA</th>
                        <th>CANTIDAD INSUMOS</th>
                        <th>VALOR INSUMOS</th>
                        <th>CANTIDAD MO</th>
                        <th>VALOR MO</th>
                        <th>CANTIDAD REPUESTO</th>
                        <th>VALOR REPUESTO</th>
                        <th>TOTAL COSTO</th>
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
                                    <td>{ordenes.cantidadinsumo}</td>
                                    <td>{ordenes.valorinsumo}</td>
                                    <td>{ordenes.cantidadmo}</td>
                                    <td>{ordenes.valormo}</td>
                                    <td>{ordenes.cantidadrep}</td>
                                    <td>{ordenes.valorrep}</td>
                                    <td>{ordenes.total}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

        </div>
    );
}

export default ReporteCostosOT;