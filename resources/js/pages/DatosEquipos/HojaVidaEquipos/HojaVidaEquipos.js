import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { Modal, Button, ButtonGroup, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CachedIcon from '@material-ui/icons/Cached';
import ReplayIcon from '@material-ui/icons/Replay';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import { green, blue, blueGrey, red } from '@material-ui/core/colors';

// Componentes de Conexion con el Backend
import crearordenesServices from "../../../services/GestionOrdenes/CrearOrdenes";
import cumplimientooserServices from "../../../services/GestionOrdenes/CumplimientoOserv";

const useStyles = makeStyles((theme) => ({
    modal2: {
        position: 'absolute',
        width: 1500,
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
    iconos: {
        cursor: 'pointer'
    },
    inputMaterial: {
        width: '100%'
    },
    formControl: {
        margin: theme.spacing(0),
        minWidth: 290,
        maxWidth: 290,
    },
    formControl2: {
        margin: theme.spacing(0),
        minWidth: 600,
        maxWidth: 600,
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
        margin: 0,
        top: 'auto',
        left: 20,
        bottom: 20,
        right: 'auto',
        position: 'fixed',
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

function HojaVidaEquipos(props) {
    const { equipoID, equipoCodigo } = props;
    //console.log("EQUIPO ID : ", equipoID)
    //console.log("EQUIPO CODIGO : ", equipoCodigo)

    const styles = useStyles();
    const [listarActivides, setListarActividades] = useState([]);
    const [listarOrdenes, setListarOrdenes] = useState([]);
    const [modalActividades, setModalActividades] = useState(false);

    useEffect(() => {
        async function fetchDataActividades() {
            const res = await cumplimientooserServices.leeractividadesmaquina(equipoID);
            setListarActividades(res.data);
            console.log("ACTIVIDADES MAQUINA : ", res.data)
        }
        fetchDataActividades();
    }, [])

    const columnasactividades = [
        {
            field: 'codigo_equ',
            title: 'Equipo',
            cellStyle: { minWidth: 50 }
        },
        {
            field: 'id_actividad',
            title: '# Actividad',
            cellStyle: { minWidth: 50 }
        },
        {
            field: 'id_cosv',
            title: '# OT',
            cellStyle: { minWidth: 50 }
        },
        {
            field: 'fechaprogramada_cosv',
            title: 'Fecha Programada',
            cellStyle: { minWidth: 100 }
        },
        {
            field: 'horometro_cosv',
            title: 'Horometro',
            cellStyle: { minWidth: 100 }
        },
        {
            field: 'fecha_pot',
            title: 'Fecha Pendiente',
            type: 'date'
        },
        {
            field: 'descripcion_pot',
            title: 'Pendiente'
        },
        {
            field: 'descripcion_cosv',
            title: 'Actividad Realizada',
            cellStyle: { minWidth: 200 }
        },
        {
            field: 'nombre_est',
            title: 'Equipo Operativo',
            cellStyle: { minWidth: 100 }
        },      
        {
            field: 'tiempoactividad_cosv',
            title: 'Tiempo Actividad',
            cellStyle: { minWidth: 60 }
        },
        
    ]

    return (
        <div className={styles.modal2}>
            <Typography align="center" className={styles.typography} variant="button" display="block" >
                Historico Actividades Maquina
            </Typography>
            <MaterialTable
                columns={columnasactividades}
                data={listarActivides}
                title="CONSULTAR ACTIVIDADES MAQUINA"
            />
            { }
        </div>
    );
}

export default HojaVidaEquipos;