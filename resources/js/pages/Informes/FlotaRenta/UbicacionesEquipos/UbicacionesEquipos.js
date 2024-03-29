import React, { useEffect, useState } from 'react';
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { Modal, Button, Select, MenuItem, FormControl, InputLabel, Grid, Typography } from "@material-ui/core";
import { green, blue, blueGrey, red } from '@material-ui/core/colors';
import { makeStyles } from "@material-ui/core/styles";
import CallMissedIcon from '@material-ui/icons/CallMissed';
import Moment from 'moment';

import ubicacionesServices from "../../../../services/DatosEquipos/Ubicaciones";
import cumplimientooserv from '../../../../services/GestionOrdenes/CumplimientoOserv';
import equiposServices from "../../../../services/Mantenimiento/Equipos";

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

function UbicacionesEquipos() {
    const styles = useStyles();
    const [listarUbicacionesMT, setListarUbicacionesMT] = useState([]);
    const fechaactual = Moment(new Date()).format('YYYY-MM-DD');
    const [modalCodigoEquipo, setModalCodigoEquipo] = useState(false);
    const [listarEquipos, setListarEquipos] = useState([]);

    const leerModalCodigoEquipo = () => {
        setModalCodigoEquipo(!modalCodigoEquipo);
    }

    useEffect(() => {
        //console.log("ID Usuario : ", idUsuario)
        async function fetchDataEquipos() {
            const res = await equiposServices.listEquiposMontacargas();
            setListarEquipos(res.data);
        }
        fetchDataEquipos();
    }, [])

    const codigoEquipo = (
        <div className="App" >
            <div className={styles.modal}>
                <Typography align="center" className={styles.typography} variant="button" display="block" >
                    Seleccionar Codigo MT
                </Typography>

                <Grid item xs={12} md={4}>
                    <FormControl className={styles.formControl}>
                        <InputLabel id="idselectequipo_otr">Equipo</InputLabel>
                        <Select
                            labelId="selectequipo_otr"
                            name="equipo_otr"
                            id="idselectequipo_otr"
                            fullWidth
                            //onChange={handleChange}
                            onClick={(e) => DatosEquipos(e.target.value)}
                        >
                            <MenuItem value=""> <em>None</em> </MenuItem>
                            {
                                listarEquipos && listarEquipos.map((itemselect) => {
                                    return (
                                        <MenuItem value={itemselect.id_equ}>{itemselect.codigo_equ}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                </Grid>
                <br />
            </div>
        </div>
    )

    const DatosEquipos = (equipo) => {
        console.log("EQUIPO : ", equipo)
        async function fetchDataHojaVida(equ) {
            const res = await ubicacionesServices.listUnaUbicacion(equ);
            setListarUbicacionesMT(res.data);
            
            console.log("UBICACIONES EQUIPOS : ", res.data);
        }
        fetchDataHojaVida(equipo);
        //leerDatosEquipos();
        leerModalCodigoEquipo();
    }

    return (
        <div>
            <Modal
                open={modalCodigoEquipo}
                onClose={leerModalCodigoEquipo}
            >
                {codigoEquipo}
            </Modal>
            <div align="center" >
                <Button className={styles.button} variant="contained" startIcon={<CallMissedIcon />} onClick={() => leerModalCodigoEquipo()} >
                    Seleccionar Equipo
                </Button>
                <Button className={styles.button} color="primary" >
                    <ReactHTMLTableToExcel
                        table="ubicacionesequipos"
                        filename="Ubicaciones equipos"
                        sheet="Sheet"
                        buttonText="Exportar a Excel"
                    />
                </Button>
            </div>
            <table id="ubicacionesequipos" className="table">
                <thead>
                    <tr>
                        <th>EQUIPO</th>
                        <th>DESCRIPCIÓN</th>
                        <th>CLIENTE</th>
                        <th>DIRECCIÓN</th>
                        <th>CIUDAD</th>
                        <th>ESTADO</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listarUbicacionesMT && listarUbicacionesMT.map((hojavida, index) => {
                            return (
                                <tr>
                                    <td>{hojavida.codigo_equ}</td>
                                    <td>{hojavida.descripcion_equ}</td>
                                    <td>{hojavida.razonsocial_cli}</td>
                                    <td>{hojavida.direccion_ubi}</td>
                                    <td>{hojavida.nombre_ciu}</td>
                                    <td>{hojavida.nombre_est}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

        </div>
    );
}

export default UbicacionesEquipos;