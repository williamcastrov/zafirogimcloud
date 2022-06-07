import React, { Fragment, useEffect, useState } from 'react';
import MaterialTable from "material-table";
import { Modal, Button, Select, MenuItem, FormControl, InputLabel, Grid, Typography, TextField } from "@material-ui/core";
import axios from "axios";
import CancelIcon from '@material-ui/icons/Cancel';
import EditAttributesIcon from '@material-ui/icons/EditAttributes';
import EditIcon from '@material-ui/icons/Edit';
import { green, blue, blueGrey, red } from '@material-ui/core/colors';
import { makeStyles } from "@material-ui/core/styles";
import Moment from 'moment';
import img from "../../../assets/img/montacarga.jpg";

import contratosServices from "../../../services/DatosEquipos/Contratos";

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
    modaldetalle: {
        position: 'absolute',
        width: 1000,
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
        minWidth: 410,
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

function Facturacion(props) {
    const styles = useStyles();
    const [facturacionEquipos, setFacturacionEquipos] = useState([]);
    const [listVariantesProductoSeleccionada, setListVariantesProductosSeleccionada] = useState([]);
    const [idequipo, setIdequipo] = useState(0);
    const fechaactual = Moment(new Date()).format('YYYY-MM-DD');
    const [modalPeriodo, setModalPeriodo] = useState(false);
    const [modalFacturacion, setModalFacturacion] = useState(false);
    const [botonGrabar, setBotonGrabar] = useState(false);
    const [listarContratos, setListarContratos] = useState([]);
    const [anno, setAnno] = useState(0);
    const [mes, setMes] = useState(0);

    const periodoConsultar = () => {
        setModalPeriodo(!modalPeriodo);
    }

    const facturacionModal = () => {
        setModalFacturacion(!modalFacturacion);
    }

    const cambioDato = () => {
        console.log("NUEVO VALOR : ", listVariantesProductoSeleccionada);
        setFacturacionEquipos(listVariantesProductoSeleccionada);

        const newDet = [];
        listVariantesProductoSeleccionada && listVariantesProductoSeleccionada.map((variante, index) => {
            {
                if (idequipo === variante.id_ctr) {
                    let item = {
                        value: variante.value,
                        anno_fac: variante.anno_fac,
                        asesorcomercial_ctr: variante.asesorcomercial_ctr,
                        ciudad_ctr: variante.ciudad_ctr,
                        cliente_ctr: variante.cliente_ctr,
                        codigocontrato_ctr: variante.codigocontrato_ctr,
                        diafacturacion_ctr: variante.diafacturacion_ctr,
                        equipo_fac: variante.equipo_fac,
                        fechaalza_ctr: variante.fechaalza_ctr,
                        fechafinal_ctr: variante.fechafinal_ctr,
                        fechainicio_ctr: variante.fechainicio_ctr,
                        id_ctr: variante.id_ctr,
                        id_fac: variante.id_fac,
                        mes_fac: variante.mes_fac,
                        nombre_ciu: variante.nombre_ciu,
                        periodo_fac: variante.periodo_fac,
                        primer_apellido_emp: variante.primer_apellido_emp,
                        primer_nombre_emp: variante.primer_nombre_emp,
                        razonsocial_cli: variante.razonsocial_cli,
                        tableData: variante.tableData,
                        valorrentames_ctr: variante.valorrentames_ctr
                    };
                    newDet.push(item);
                    console.log("MAQUINA A CAMBIAR : ", newDet );
                }
            }
        })
        setBotonGrabar(true)
    }


    const procesarPeriodo = async () => {
        let periodo = anno + mes;
        //console.log("PERIODO : ", periodo);

        async function fetchDataPeriodo() {
            const res = await contratosServices.listdatosfacturacion(periodo);
            setFacturacionEquipos(res.data);
            //console.log("FACTURACION EQUIPOS : ", res.data);
        }
        fetchDataPeriodo();
        periodoConsultar();
    }

    useEffect(() => {
        async function fetchDataEquipos() {
            const res = await contratosServices.listContratos();

            setListarEquipos(res.data);

            console.log("CONTRATOS : ", res.data);
        }
        fetchDataEquipos();
    }, [])

    const columnas = [
        {
            title: 'Imagen',
            field: 'imageUrl',
            render: rowData => <img src={img} style={{ width: 50, height: 50 }} />
        },
        {
            title: 'Periodo',
            field: 'periodo_fac'
        },
        {
            title: 'Montacarga',
            field: 'equipo_fac'
        },
        {
            title: 'Cliente',
            field: 'razonsocial_cli'
        },
        {
            title: 'Ciudad',
            field: 'nombre_ciu'
        },
        {
            title: 'Valor Mes',
            field: 'valorrentames_ctr'
        },
        {
            title: 'Día Facturación',
            field: 'diafacturacion_ctr'
        }
    ]

    const columnasvar = [
        {
            title: 'Montacarga',
            field: 'equipo_fac'
        },
        {
            title: 'Cliente',
            field: 'razonsocial_cli'
        },
        {
            title: 'Ciudad',
            field: 'nombre_ciu'
        },
        {
            title: 'Valor Mes',
            field: 'valorrentames_ctr'
        },
        {
            title: 'Día Facturación',
            field: 'diafacturacion_ctr'
        },
    ]

    const periodoFacturacion = (
        <div className={styles.modal}>
            <Typography align="center" className={styles.typography} variant="button" display="block"> Periodo de Facturación a Consultar </Typography>
            <Grid xl={12} lg={12} xs={12} md={12}>
                <FormControl className={styles.formControl}>
                    <TextField type="numeric" label="Año" name="annodepreciar"
                        onChange={(e) => setAnno(e.target.value)} />
                </FormControl>
            </Grid>
            <Grid xl={12} lg={12} xs={12} md={12}>
                <FormControl className={styles.formControl}>
                    <TextField type="numeric" className={styles.inputMaterial} label="Mes" name="mesdepreciar"
                        onChange={(e) => setMes(e.target.value)} />
                </FormControl>
            </Grid>
            <div align="right">
                <Button className={styles.button} color="primary" onClick={() => procesarPeriodo()} >Confirmar</Button>
                <Button className={styles.button2} onClick={() => periodoConsultar()} >Cancelar</Button>
            </div>
        </div>
    )

    const detalleFacturacion = (
        <div className={styles.modaldetalle}>
            <MaterialTable
                title="Facturación el Zafiro"
                columns={columnasvar}
                data={facturacionEquipos}
                editable={{

                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                const dataUpdate = [...facturacionEquipos];
                                const index = oldData.tableData.id;
                                dataUpdate[index] = newData;
                                setListVariantesProductosSeleccionada([...dataUpdate]);
                                if (dataUpdate) {
                                    cambioDato()
                                } else
                                    console.log("NADA")
                                resolve();
                            }, 1000)
                        }),

                }}
                options={{
                    actionsColumnIndex: 11,
                    headerStyle: { backgroundColor: '#015CAB', fontSize: 16, color: 'white' },
                    rowStyle: {
                        fontSize: 14,
                    }
                }}
            />
        </div>
    )

    const seleccionarProducto = (maquina, caso) => {
        //console.log("EQUIPO SELECT : ", maquina)
        setIdequipo(maquina.id_ctr);
        //alert("ENTRE")

        const newDet = [];
        {
            facturacionEquipos && facturacionEquipos.map((variante, index) => {
                {
                    //console.log("INTERNO VARIANTE : ", variante.id_ctr)
                    if (maquina.id_ctr == variante.id_ctr) {
                        let item = {
                            value: variante.value,
                            anno_fac: variante.anno_fac,
                            asesorcomercial_ctr: variante.asesorcomercial_ctr,
                            ciudad_ctr: variante.ciudad_ctr,
                            cliente_ctr: variante.cliente_ctr,
                            codigocontrato_ctr: variante.codigocontrato_ctr,
                            diafacturacion_ctr: variante.diafacturacion_ctr,
                            equipo_fac: variante.equipo_fac,
                            fechaalza_ctr: variante.fechaalza_ctr,
                            fechafinal_ctr: variante.fechafinal_ctr,
                            fechainicio_ctr: variante.fechainicio_ctr,
                            id_ctr: variante.id_ctr,
                            id_fac: variante.id_fac,
                            mes_fac: variante.mes_fac,
                            nombre_ciu: variante.nombre_ciu,
                            periodo_fac: variante.periodo_fac,
                            primer_apellido_emp: variante.primer_apellido_emp,
                            primer_nombre_emp: variante.primer_nombre_emp,
                            razonsocial_cli: variante.razonsocial_cli,
                            tableData: variante.tableData,
                            valorrentames_ctr: variante.valorrentames_ctr
                        };
                        newDet.push(item);
                    }
                }
            })
        }
        //console.log("NUEVO ARREGLO VARIANTE : ", newDet);
        setListVariantesProductosSeleccionada(newDet);
        facturacionModal();
    }

    return (
        <Fragment>
            <div>
                <Grid container spacing={2} >
                    <Grid item lg={2} xl={2} xs={2} md={2}></Grid>
                    <Grid item lg={2} xl={2} xs={2} md={2}>
                        <div align="center" >
                            <Button className={styles.button2} onClick={() => periodoConsultar()}>Seleccionar Periodo</Button>
                        </div>
                    </Grid>
                    <Grid item lg={2} xl={2} xs={2} md={2}>
                        <div align="center" >
                            <Button className={styles.button2} onClick={() => cambioDato()}>Validar Dato</Button>
                        </div>
                    </Grid>
                    {
                        botonGrabar ?
                            (
                                <Grid item lg={2} xl={2} xs={2} md={2}>
                                    <div align="center" >
                                        <Button className={styles.button2} onClick={() => cambioDato()}>Actualizar</Button>
                                    </div>
                                </Grid>
                            )
                            :
                            null

                    }
                </Grid>



                <MaterialTable
                    title="Facturación el Zafiro"
                    columns={columnas}
                    data={facturacionEquipos}
                    actions={[
                        {
                            icon: EditIcon,
                            tooltip: 'Editar Producto',
                            onClick: (event, rowData) => seleccionarProducto(rowData, "Producto")
                        },
                        {
                            icon: EditAttributesIcon,
                            tooltip: 'Variante Producto',
                            onClick: (event, rowData) => seleccionarProducto(rowData, "Variante")
                        }
                    ]}
                    options={{
                        actionsColumnIndex: 11,
                        headerStyle: { backgroundColor: '#015CAB', fontSize: 16, color: 'white' },
                        rowStyle: {
                            fontSize: 16,
                        }
                    }}
                />


                <Modal
                    open={modalPeriodo}
                    onClose={periodoConsultar}
                >
                    {periodoFacturacion}
                </Modal>

                <Modal
                    open={modalFacturacion}
                    onClose={facturacionModal}
                >
                    {detalleFacturacion}
                </Modal>


            </div>
        </Fragment>
    );
}

export default Facturacion;