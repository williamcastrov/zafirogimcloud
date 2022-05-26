import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import PropTypes from 'prop-types';
import { Modal, TextField, Typography, Grid, Button } from "@material-ui/core";
import { green, blue, blueGrey, red } from '@material-ui/core/colors';
import { makeStyles } from "@material-ui/core/styles";
import NumberFormat from 'react-number-format';
import Moment from 'moment';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';
import BlockIcon from '@material-ui/icons/Block';

import contratosServices from "../../../services/DatosEquipos/Contratos";

const useStyles = makeStyles((theme) => ({
    modal: {
        position: 'absolute',
        width: 1400,
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
    iconos: {
        cursor: 'pointer'
    },
    inputMaterial: {
        width: '100%'
    },
    formControl: {
        margin: theme.spacing(0),
        minWidth: 320,
    },
    formControl2: {
        margin: theme.spacing(0),
        minWidth: 550,
    },
    typography: {
        fontSize: 16,
        color: "#ff3d00"
    },
    button: {
        color: theme.palette.getContrastText(blueGrey[500]),
        backgroundColor: green[700],
        margin: theme.spacing(1),
        fontSize: 12,
        '&:hover': {
            backgroundColor: blue[700],
        },
    }
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

NumberFormatCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

function NumberFormatCustom2(props) {
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
            prefix=""
        />
    );
}

NumberFormatCustom2.propTypes = {
    inputRef: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};


function VencimientoFacturacion() {
    const styles = useStyles();
    const [listContratos, setListContratos] = useState([]);
    const [listVencimientoContratos, setListVencimientoContratos] = useState([]);
    const [modalContratos, setModalContratos] = useState(false);
    const [modalValorFactura, setModalValorFactura] = useState(false);
    const [modalDiasParo, setModalDiasParo] = useState(false);
    const [nuevoValorFactura, setNuevoValorFactura] = useState(0);
    const [numeroDiasParo, setNumeroDiasParo] = useState(0);
    const [grabar, setGrabar] = useState(false);
    const fechaactual = Moment(new Date()).format('YYYY-MM-DD HH:mm:ss');

    const [contratoSeleccionado, setContratoSeleccionado] = useState({
        'id_ctr': "",
        'codigocontrato_ctr': "",
        'cliente_ctr': "",
        'asesorcomercial_ctr': "",
        'duracion_ctr': "",
        'fechainicio_ctr': "",
        'fechafinal_ctr': "",
        'ciudad_ctr': "",
        'valorcontrato_ctr': "",
        'estado_ctr': "",
        'observacion_ctr': "",
        'valorrentames_ctr': "",
        'valorfacturadomes_ctr': 0,
        'numerodiasparo_ctr': 0,
        'fecharegistradiasparo_ctr': fechaactual,
        'fechaalza_ctr': "",
        'diafacturacion_ctr': "",
        'controldiafactura_ctr': "",
        'controlalza_ctr': ""
    })

    useEffect(() => {
        async function fetchDataDashboard() {
            const res = await contratosServices.listarvencimientofacturas();
            //console.log("VENCIMIENTOS : ", res.data);
            setListContratos(res.data);
            //console.log(listDashboard);
        }
        fetchDataDashboard();
    }, [])

    const abrirCerrarModalContratos = () => {
        setModalContratos(!modalContratos);
    }

    const abrirCerrarModalValorFactura = () => {
        setModalValorFactura(!modalValorFactura);
    }

    const abrirCerrarModalDiasParo = () => {
        setModalDiasParo(!modalDiasParo);
    }

    const seleccionarContratos = (contratos, caso) => {
        //console.log("FECHA CONTRATO : ", contratos.dia)
        async function fetchDataContratos() {
            const res = await contratosServices.listardetallevencimientofacturas(contratos.dia);
            //console.log("VENCIMIENTO CONTRATOS : ", res.data);
            setListVencimientoContratos(res.data);
            //console.log(listDashboard);
        }
        fetchDataContratos();

        (caso === "Editar") ? abrirCerrarModalContratos() : abrirCerrarModalEliminar()
    }

    const contratoModificado = (contrato, caso) => {
        //console.log("DATOS CONTRATO : ",contrato)
        setContratoSeleccionado(contrato);
        setModalValorFactura(!modalValorFactura);
    }

    const actualizaDiasParo = (contrato, caso) => {
        //console.log("DATOS CONTRATO : ",contrato)
        setContratoSeleccionado(contrato);
        setModalDiasParo(!modalDiasParo);
    }

    const handleChange = e => {
        const { name, value } = e.target;

        setContratoSeleccionado(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const contratoDatosFactura = () => {
        //console.log("VALOR FACTURA : ", nuevoValorFactura);
        //console.log("DIAS PARO : ", numeroDiasParo);
        //console.log("DATOS CONTRATO : ", contratoSeleccionado);
        var fecha = new Date()
        var año = fecha.getFullYear();
        var mes = fecha.getMonth() + 1;
        var periodo = "" + año + mes;

        {
            setContratoSeleccionado([{
                id_ctr: contratoSeleccionado.id_ctr,
                codigocontrato_ctr: contratoSeleccionado.codigocontrato_ctr,
                cliente_ctr: contratoSeleccionado.cliente_ctr,
                asesorcomercial_ctr: contratoSeleccionado.asesorcomercial_ctr,
                duracion_ctr: contratoSeleccionado.duracion_ctr,
                fechainicio_ctr: contratoSeleccionado.fechainicio_ctr,
                fechafinal_ctr: contratoSeleccionado.fechafinal_ctr,
                ciudad_ctr: contratoSeleccionado.ciudad_ctr,
                valorcontrato_ctr: contratoSeleccionado.valorcontrato_ctr,
                estado_ctr: contratoSeleccionado.estado_ctr,
                observacion_ctr: contratoSeleccionado.observacion_ctr,
                valorrentames_ctr: contratoSeleccionado.valorrentames_ctr,
                valorfacturadomes_ctr: nuevoValorFactura,
                numerodiasparo_ctr: contratoSeleccionado.numerodiasparo_ctr,
                fecharegistradiasparo_ctr: contratoSeleccionado.fecharegistradiasparo_ctr,
                fechaalza_ctr: contratoSeleccionado.fechaalza_ctr,
                diafacturacion_ctr: contratoSeleccionado.diafacturacion_ctr,
                controldiafactura_ctr: 0,
                controlalza_ctr: contratoSeleccionado.controlalza_ctr
            }]);
        }
        setGrabar(true);
    }

    const contratoDiasParo = () => {
        //console.log("VALOR FACTURA : ", nuevoValorFactura);
        //console.log("DIAS PARO : ", numeroDiasParo);
        //console.log("DATOS CONTRATO : ", contratoSeleccionado);
        var fecha = new Date()
        var año = fecha.getFullYear();
        var mes = fecha.getMonth() + 1;
        var periodo = "" + año + mes;

        {
            setContratoSeleccionado([{
                id_ctr: contratoSeleccionado.id_ctr,
                codigocontrato_ctr: contratoSeleccionado.codigocontrato_ctr,
                cliente_ctr: contratoSeleccionado.cliente_ctr,
                asesorcomercial_ctr: contratoSeleccionado.asesorcomercial_ctr,
                duracion_ctr: contratoSeleccionado.duracion_ctr,
                fechainicio_ctr: contratoSeleccionado.fechainicio_ctr,
                fechafinal_ctr: contratoSeleccionado.fechafinal_ctr,
                ciudad_ctr: contratoSeleccionado.ciudad_ctr,
                valorcontrato_ctr: contratoSeleccionado.valorcontrato_ctr,
                estado_ctr: contratoSeleccionado.estado_ctr,
                observacion_ctr: contratoSeleccionado.observacion_ctr,
                valorrentames_ctr: contratoSeleccionado.valorrentames_ctr,
                valorfacturadomes_ctr: contratoSeleccionado.valorfacturadomes_ctr,
                numerodiasparo_ctr: numeroDiasParo,
                fecharegistradiasparo_ctr: fechaactual,
                fechaalza_ctr: contratoSeleccionado.fechaalza_ctr,
                diafacturacion_ctr: contratoSeleccionado.diafacturacion_ctr,
                controldiafactura_ctr: 0,
                controlalza_ctr: contratoSeleccionado.controlalza_ctr
            }]);
        }
        setGrabar(true);
    }

    const contratoRenovado = (contrato, caso) => {
        console.log("VALOR FACTURA : ", nuevoValorFactura);
        console.log("DIAS PARO : ", numeroDiasParo);
        var fecha = new Date()
        var año = fecha.getFullYear();
        var mes = fecha.getMonth() + 1;
        var periodo = "" + año + mes;

        {
            setContratoSeleccionado([{
                id_ctr: contrato.id_ctr,
                codigocontrato_ctr: contrato.codigocontrato_ctr,
                cliente_ctr: contrato.cliente_ctr,
                asesorcomercial_ctr: contrato.asesorcomercial_ctr,
                duracion_ctr: contrato.duracion_ctr,
                fechainicio_ctr: contrato.fechainicio_ctr,
                fechafinal_ctr: contrato.fechafinal_ctr,
                ciudad_ctr: contrato.ciudad_ctr,
                valorcontrato_ctr: contrato.valorcontrato_ctr,
                estado_ctr: contrato.estado_ctr,
                observacion_ctr: contrato.observacion_ctr,
                valorrentames_ctr: contrato.valorrentames_ctr,
                valorfacturadomes_ctr: nuevoValorFactura,
                numerodiasparo_ctr: numeroDiasParo,
                fecharegistradiasparo_ctr: fechaactual,
                fechaalza_ctr: contrato.fechaalza_ctr,
                diafacturacion_ctr: contrato.diafacturacion_ctr,
                controldiafactura_ctr: periodo,
                controlalza_ctr: contrato.controlalza_ctr
            }]);
        }
        setGrabar(true);
    }

    useEffect(() => {
        if (grabar) {
            actualizaContrato();
        }
    }, [grabar])

    const actualizaContrato = async () => {
        console.log("CONTRATO SELECCIONADO : ", contratoSeleccionado[0]);
        const res = await contratosServices.update(contratoSeleccionado[0]);

        if (res.success) {
            swal("Facturación", "Control Renovación del Contracto OK!", "success", { button: "Aceptar" });
        }
        else {
            swal("Facturación", "Error Actualizando Control Renovación del Contrato!", "error", { button: "Aceptar" });
        }
    }

    const columnas = [
        {
            title: 'Año',
            field: 'año',
            cellStyle: {
                backgroundColor: 'rgba(158, 158, 158)',
                color: 'rgb(255, 255, 255)'
            },
            headerStyle: {
                backgroundColor: '#0277bd',
            }
        },
        {
            title: 'Mes',
            field: 'mes',
            cellStyle: {
                backgroundColor: 'rgba(158, 158, 158)',
                color: 'rgb(255, 255, 255)'
            },
            headerStyle: {
                backgroundColor: '#0277bd',
            }
        },
        {
            title: 'Día',
            field: 'dia',
            cellStyle: {
                backgroundColor: 'rgba(158, 158, 158)',
                color: 'rgb(255, 255, 255)'
            },
            headerStyle: {
                backgroundColor: '#0277bd',
            }
        },
        {
            title: 'Numero de Contratos',
            field: 'totalvencimientofacturas',
            cellStyle: {
                backgroundColor: 'rgba(158, 158, 158)',
                color: 'rgb(255, 255, 255)',
            },
            headerStyle: {
                backgroundColor: '#0277bd',
            }
        }
    ]

    const contratos = [
        {
            title: 'Equipo',
            field: 'codigo_equ',
            cellStyle: { minWidth: 30 }
        },
        {
            title: 'Cliente',
            field: 'razonsocial_cli',
            cellStyle: {
                backgroundColor: '#0277bd',
                color: '#FFF',
                minWidth: 400
            },
            headerStyle: {
                backgroundColor: '#039be5',
            }
        },
        {
            title: 'Año',
            field: 'año',
            cellStyle: { minWidth: 50 }
        },
        {
            title: 'Mes',
            field: 'mes',
            cellStyle: { minWidth: 50 }
        },
        {
            title: 'Día',
            field: 'diafacturacion_ctr',
            cellStyle: { minWidth: 50 }
        },
        {
            title: 'Ciudad',
            field: 'nombre_ciu',
            cellStyle: { minWidth: 80 }
        },
        {
            title: 'Renta Mes',
            field: 'valorrentames_ctr',
            cellStyle: { minWidth: 100 }
        },
        {
            title: 'Valor Contrato',
            field: 'valorcontrato_ctr',
            cellStyle: { minWidth: 100 }
        },
        {
            title: 'Estado',
            field: 'nombre_est',
            cellStyle: { minWidth: 60 }
        }
    ]

    const contratoContratos = (
        <div className={styles.modal}>
            <MaterialTable
                columns={contratos}
                data={listVencimientoContratos}
                title="CONTRATOS PENDIENTES POR FACTURAR"
                actions={[
                    {
                        icon: DoneOutlineIcon,
                        tooltip: 'Renovado',
                        onClick: (event, rowData) => contratoRenovado(rowData, "Editar")
                    },
                    {
                        icon: TrendingDownIcon,
                        tooltip: 'Registrar Días Paro',
                        onClick: (event, rowData) =>  actualizaDiasParo(rowData, "Editar")
                    },
                    {
                        icon: BlockIcon,
                        tooltip: 'Modificar Valor Factura',
                        onClick: (event, rowData) => contratoModificado(rowData, "Factura")
                    }
                ]}
                options={{
                    actionsColumnIndex: -1
                }}
                localization={{
                    header: {
                        actions: "Renovado"
                    }
                }}
            />{ }
        </div>
    )

    const valorFactura = (
        <div className={styles.modal2}>
            <Typography align="center" className={styles.typography} variant="button" display="block">
                Ingresar Valor Facturado
            </Typography>
            <Grid container spacing={2} >
                <Grid item xs={12} md={12}>
                    <TextField className={styles.inputMaterial} name="valorfactura" label="Valor Facturado" fullWidth
                        defaultValue={ contratoSeleccionado.valorfacturadomes_ctr}
                        InputLabelProps={{ shrink: true }} InputProps={{ inputComponent: NumberFormatCustom, }}
                        onChange={(e) => setNuevoValorFactura(e.target.value)}>
                    </TextField>
                </Grid>
                <Grid item xs={12} md={12}>
                    <TextField className={styles.inputMaterial} name="numerodiasparo" label="Número Días Paro" fullWidth
                        defaultValue={ contratoSeleccionado.numerodiasparo_ctr}  disabled
                        InputLabelProps={{ shrink: true }} InputProps={{ inputComponent: NumberFormatCustom2, }}
                        onChange={(e) => setNumeroDiasParo(e.target.value)}>
                    </TextField>
                </Grid>
                <Grid item xs={12} md={12}>
                    <TextField className={styles.inputMaterial} name="fecharegistradiasparo_ctr" label="Fecha Registra Paro" fullWidth
                        defaultValue={ contratoSeleccionado.fecharegistradiasparo_ctr} disabled
                    >
                    </TextField>
                </Grid>
            </Grid>
            <Grid container spacing={2} >
                <Grid item xs={12} md={4}></Grid>
                <Grid item xs={12} md={4}>
                    <Button className={styles.button} onClick={() => contratoDatosFactura()} >Confirmar</Button>
                </Grid >
            </Grid >
        </div>
    )

    const diasParo = (
        <div className={styles.modal2}>
            <Typography align="center" className={styles.typography} variant="button" display="block">
                Ingresar Dias Paro
            </Typography>
            <Grid container spacing={2} >
                <Grid item xs={12} md={12}>
                    <TextField className={styles.inputMaterial} name="numerodiasparo" label="Número Días Paro" fullWidth
                        defaultValue={ contratoSeleccionado.numerodiasparo_ctr} 
                        InputLabelProps={{ shrink: true }} InputProps={{ inputComponent: NumberFormatCustom2, }}
                        onChange={(e) => setNumeroDiasParo(e.target.value)}>
                    </TextField>
                </Grid>
                <Grid item xs={12} md={12}>
                    <TextField className={styles.inputMaterial} name="fecharegistradiasparo_ctr" label="Fecha Registra Paro" fullWidth
                        defaultValue={ contratoSeleccionado.fecharegistradiasparo_ctr} disabled
                    >
                    </TextField>
                </Grid>
            </Grid>
            <Grid container spacing={2} >
                <Grid item xs={12} md={4}></Grid>
                <Grid item xs={12} md={4}>
                    <Button className={styles.button} onClick={() => contratoDiasParo()} >Confirmar</Button>
                </Grid >
            </Grid >
        </div>
    )

    return (
        <div style={{ height: 400, width: '100%' }}>
            <MaterialTable
                columns={columnas}
                data={listContratos}
                title="CONTRATOS POR FACTURAR"
                actions={[
                    {
                        icon: ArrowForwardIcon,
                        tooltip: 'Detalle Facturas',
                        onClick: (event, rowData) => seleccionarContratos(rowData, "Editar")
                    }
                ]}
                options={{
                    actionsColumnIndex: -1
                }}
                localization={{
                    header: {
                        actions: "Detalle"
                    }
                }}
            />{ }
            <Modal
                open={modalContratos}
                onClose={abrirCerrarModalContratos}
            >
                {contratoContratos}
            </Modal>

            <Modal
                open={modalValorFactura}
                onClose={abrirCerrarModalValorFactura}
            >
                {valorFactura}
            </Modal>

            <Modal
                open={modalDiasParo}
                onClose={abrirCerrarModalDiasParo}
            >
                {diasParo}
            </Modal>

        </div>
    );
}

export default VencimientoFacturacion;