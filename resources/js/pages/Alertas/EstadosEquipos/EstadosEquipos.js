import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { Modal } from "@material-ui/core";
import { green, blue, blueGrey, red } from '@material-ui/core/colors';
import { makeStyles } from "@material-ui/core/styles";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';

import equiposServices from "../../../services/Mantenimiento/Equipos";

const useStyles = makeStyles((theme) => ({
    modal: {
        position: 'absolute',
        width: 1250,
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

function EstadosEquipos() {
    const styles = useStyles();
    const [listContratos, setListContratos] = useState([]);
    const [listVencimientoContratos, setListVencimientoContratos] = useState([]);
    const [modalContratos, setModalContratos] = useState(false);
    const [grabar, setGrabar] = useState(false);

    useEffect(() => {
        async function fetchDataDashboard() {
            const res = await equiposServices.listaralertasestadosequipos();
            //console.log("VENCIMIENTOS : ", res.data);
            setListContratos(res.data);
            //console.log(listDashboard);
        }
        fetchDataDashboard();
    }, [])

    useEffect(() => {

        async function fetchDataTotalEquipos() {
            const res = await equiposServices.sumatotalequipos();
           // console.log("TOTAL EQUIPO : ", res.data);

            async function fetchDataDashboard() {
                const rest = await equiposServices.listaralertasestadosequipos(res.data[0].totalequipos);
                console.log("DATOS ESTADOS EQUIPOS  : ", rest.data);
                setListContratos(rest.data);
                //console.log(listDashboard);
            }
            fetchDataDashboard();
        }
        fetchDataTotalEquipos();

    }, [])

    const abrirCerrarModalContratos = () => {
        setModalContratos(!modalContratos);
    }

    const seleccionarContratos = (contratos, caso) => {
        //console.log("FECHA CONTRATO : ", contratos.dia)
      /*
        async function fetchDataContratos() {
            const res = await contratosServices.listardetallevencimientofacturas(contratos.dia);
            //console.log("VENCIMIENTO CONTRATOS : ", res.data);
            setListVencimientoContratos(res.data);
            //console.log(listDashboard);
        }
        fetchDataContratos();

        (caso === "Editar") ? abrirCerrarModalContratos() : abrirCerrarModalEliminar()
        */
    }

    const columnas = [
        {
            title: 'Estado',
            field: 'nombre_estmtto',
            cellStyle: {
                backgroundColor: 'rgba(158, 158, 158)',
                color: 'rgb(255, 255, 255)'
            },
            headerStyle: {
                backgroundColor: '#0277bd'
            }
        },
        {
            title: 'Cantidad',
            field: 'cantidad',
            cellStyle: {
                backgroundColor: 'rgba(158, 158, 158)',
                color: 'rgb(255, 255, 255)',
            },
            headerStyle: {
                backgroundColor: '#0277bd',
            }
        },
        {
            title: 'Porcentaje',
            field: 'porcentaje',
            cellStyle: {
                backgroundColor: 'rgba(158, 158, 158)',
                color: 'rgb(255, 255, 255)'
            },
            headerStyle: {
                backgroundColor: '#0277bd',
            }
        },
    ]

    const contratos = [
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
                title="ESTADOS FLOTA DE EQUIPOS"
                actions={[
                    {
                        icon:  DoneOutlineIcon,
                        tooltip: 'Renovado',
                        onClick: (event, rowData) => contratoRenovado(rowData, "Editar")
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

    return (
        <div style={{ height: 400, width: '100%' }}>
            <MaterialTable
                columns={columnas}
                data={listContratos}
                title="ESTADOS FLOTA DE EQUIPOS"
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

export default EstadosEquipos;