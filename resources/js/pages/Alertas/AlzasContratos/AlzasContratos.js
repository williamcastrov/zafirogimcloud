import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { Modal} from "@material-ui/core";
import { green, blue, blueGrey, red } from '@material-ui/core/colors';
import { makeStyles } from "@material-ui/core/styles";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';

import contratosServices from "../../../services/DatosEquipos/Contratos";

const useStyles = makeStyles((theme) => ({
    modal: {
        position: 'absolute',
        width: 1300,
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

function AlzasContratos() {
    const styles = useStyles();
    const [listContratos, setListContratos] = useState([]);
    const [listVencimientoContratos, setListVencimientoContratos] = useState([]);
    const [modalContratos, setModalContratos] = useState(false);
    const [grabar, setGrabar] = useState(false);

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
        'fechaalza_ctr': "",
        'diafacturacion_ctr': "",
        'controldiafactura_ctr': "",
        'controlalza_ctr': ""
    })


    useEffect(() => {
        async function fetchDataDashboard() {
            const res = await contratosServices.listarvencimientofecha();
            console.log("VENCIMIENTOS : ", res.data);
            setListContratos(res.data);
            //console.log(listDashboard);
        }
        fetchDataDashboard();
    }, [])

    const abrirCerrarModalContratos = () => {
        setModalContratos(!modalContratos);
    }

    const seleccionarContratos = (contratos, caso) => {
        //console.log("FECHA CONTRATO : ", contratos.dia)
        async function fetchDataContratos() {
            const res = await contratosServices.listarvencimientocontratos("'" + contratos.fechaalza_ctr + "'");
            //console.log("VENCIMIENTO CONTRATOS : ", res.data);
            setListVencimientoContratos(res.data);
            //console.log(listDashboard);
        }
        fetchDataContratos();

        (caso === "Editar") ? abrirCerrarModalContratos() : abrirCerrarModalEliminar()
    }

    const contratoRenovado = (contrato, caso) => {
        //console.log("CONTRATO : ", contrato);
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
                fechaalza_ctr: contrato.fechaalza_ctr,
                diafacturacion_ctr: contrato.diafacturacion_ctr,
                controldiafactura_ctr: contrato.controldiafactura_ctr,
                controlalza_ctr: periodo
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
            swal("Contrato", "Control Alza del Contracto OK!", "success", { button: "Aceptar" });
        }
        else
        {
            swal("Contrato", "Error Actualizando Control Alza del Contrato!", "error", { button: "Aceptar" });
        }
    }

    const columnas = [
        {
            title: 'Fecha de Vencimiento',
            field: 'fechaalza_ctr',
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
            field: 'totalvencimientofecha',
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
                minWidth: 350
            },
            headerStyle: {
                backgroundColor: '#039be5',
            }
        },
        {
            title: 'Fecha de Inicio',
            field: 'fechainicio_ctr',
            type: 'date'
        },
        {
            title: 'Fecha Final',
            field: 'fechafinal_ctr',
            type: 'date'
        },
        {
            title: 'Fecha Alza',
            field: 'fechaalza_ctr',
            type: 'date'
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
                title="CONTRATOS PENDIENTES POR RENOVAR"
                actions={[
                    {
                        icon:  DoneOutlineIcon,
                        tooltip: 'Alza Contrato',
                        onClick: (event, rowData) => contratoRenovado(rowData, "Editar")
                    }
                ]}
                options={{
                    actionsColumnIndex: -1
                }}
                localization={{
                    header: {
                        actions: "Alza"
                    }
                }}
            />{ }
        </div>
    )

    return (
        <div style={{ height: 400, width: '100%' }}>
            <MaterialTable
                columns={columnas}
                data={listContratos}
                title="CONTRATOS POR VENCER"
                actions={[
                    {
                        icon: ArrowForwardIcon,
                        tooltip: 'Detalle Contratos',
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

        </div>
    );
}

export default AlzasContratos;