import React, { useState, useEffect } from 'react';
import { Modal, ButtonGroup, Button, Select, MenuItem, FormControl, InputLabel, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AutorenewIcon from '@material-ui/icons/Autorenew';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import YoutubeSearchedForIcon from '@material-ui/icons/YoutubeSearchedFor';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import MoneyIcon from '@material-ui/icons/Money';
import { green, blue, blueGrey, red } from '@material-ui/core/colors';
import "./Rentabilidad.css";

//Componentes Indicadores o Alertas
import CardsHeader from "../../../components/Dashboard/CardsHeader";
import CardsHeaderOTTerminadas from "../../../components/Dashboard/CardsHeader/CardsHeaderOTTErminadas";
import Cards from "../../../components/Dashboard/Cards";
import Graphics from "../../../components/Dashboard/Graphics";
import FacturacionVsGastos from "../../../components/Dashboard/FacturacionVsGastos";
import Margen from "../../../components/Dashboard/Margen";
import CumplimientoOT from "../../../components/Dashboard/CumplimientoOT";
import CumplimientoEquipo from "../../../components/Dashboard/CumplimientoEquipo";

// Componentes de Conexion con el Backend
import facturacionServices from "../../../services/Importar/Facturacion";
import ordenesServices from "../../../services/GestionOrdenes/CrearOrdenes";
import empresasServices from "../../../services/Empresa";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    modal: {
        position: 'absolute',
        width: 900,
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
        width: 1100,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    },
    iconos: {
        color: 'white'
    },
    container: {
        paddingTop: '40px',
        alignItems: 'center'
    },
    containerGrafica: {
        marginTop: '40px'
    },
    containerTabla: {
        marginTop: '40px'
    },
    formControl: {
        margin: theme.spacing(0),
        minWidth: 260,
    },
    typography: {
        fontSize: 16,
        color: "#ff3d00"
    },
    button: {
        color: theme.palette.getContrastText(blue[500]),
        backgroundColor: blueGrey[500],
        margin: theme.spacing(1),
        fontSize: 12,
        '&:hover': {
            backgroundColor: green[700],
        },
    },
    button1: {
        color: theme.palette.getContrastText(blueGrey[500]),
        backgroundColor: blue[700],
        margin: theme.spacing(1),
        fontSize: 12,
        '&:hover': {
            backgroundColor: green[700],
        },
    },
}));

function Rentabilidad(props) {
    const classes = useStyles();

    const [mes, setMes] = useState(0);
    const [listFacturacion, setListFacturacion] = useState([]);
    const [listFactMes, setListFactMes] = useState([]);
    const [modalSeleccionarMes, setModalSeleccionarMes] = useState(false);
    const [modalMargenContribucion, setModalMargenContribucion] = useState(false);
    const [modalCumplimientoOT, setModalCumplimientoOT] = useState(false);
    const [modalCumplimientoEquipo, setModalCumplimientoEquipo] = useState(false);
    const [listarEmpresas, setListarEmpresas] = useState([]);
    const [maquinas, setMaquinas] = useState([]);
    const [valores, setValores] = useState([]);
    const [empresa, setEmpresa] = useState("");
    const [totalotactivas, setTotalOTActivas] = useState(0);
    const [totalotprogramadas, setTotalOTProgramadas] = useState(0);
    const [totalotrevision, setTotalOTRevision] = useState(0);
    const [totalotmes, setTotalOTMes] = useState(0);
    const [totalotterminadas, setTotalOTTerminadas] = useState(0);

    useEffect(() => {
        async function fetchDataEmpresas() {
            const res = await empresasServices.listEmpresas();
            setListarEmpresas(res.data);
            setEmpresa(res.data[0].nombre_emp);
        }
        fetchDataEmpresas();
    }, [])

    useEffect(() => {
        async function fetchDataTotalOTActivas() {
            const res = await ordenesServices.totalotactivas();
            //console.log("TOTAL OT ACTIVAS : ",res.data[0].totalotactivas)
            setTotalOTActivas(res.data[0].totalotactivas);
        }
        fetchDataTotalOTActivas();
    }, [])

    useEffect(() => {
        async function fetchDataTotalOTProgramadas() {
            const res = await ordenesServices.totalotprogramadas();
            //console.log("TOTAL OT ACTIVAS : ",res.data[0].totalotactivas)
            setTotalOTProgramadas(res.data[0].totalotprogramadas);
        }
        fetchDataTotalOTProgramadas();
    }, [])

    useEffect(() => {
        async function fetchDataTotalOTRevision() {
            const res = await ordenesServices.totalotrevision();
            //console.log("TOTAL OT ACTIVAS : ",res.data[0].totalotactivas)
            setTotalOTRevision(res.data[0].totalotrevision);
        }
        fetchDataTotalOTRevision();
    }, [])

    useEffect(() => {
        async function fetchDataTotalOTMes() {
            const res = await ordenesServices.totalotmes();
            //console.log("TOTAL OT MES : ",res.data[0].totalotmes)
            setTotalOTMes(res.data[0].totalotmes);
        }
        fetchDataTotalOTMes();
    }, [])

    useEffect(() => {
        async function fetchDataTotalOTTerminadas() {
            const res = await ordenesServices.totalotterminadasmes();
            //console.log("TOTAL OT TERMINADAS : ", res.data[0].totalotterminadas)
            setTotalOTTerminadas(res.data[0].totalotterminadasmes);
        }
        fetchDataTotalOTTerminadas();
    }, [])

    const abrirCerrarModalSeleccionarMes = () => {
        setModalSeleccionarMes(!modalSeleccionarMes);
    }

    const abrirCerrarModalMargenContribucion = () => {
        setModalMargenContribucion(!modalMargenContribucion);
    }

    const abrirCerrarModalCumplimientoOT = () => {
        setModalCumplimientoOT(!modalCumplimientoOT);
    }

    const abrirCerrarModalCumplimientoEquipo = () => {
        setModalCumplimientoEquipo(!modalCumplimientoEquipo);
    }

    const datosFacturacionMes = async () => {
        const res = await facturacionServices.listarfactconsomes();
        if (res.success) {
            setListFacturacion(res.data);
        }

        const rest = await facturacionServices.listarfactconsoequipo();
        if (rest.success) {
            var respuesta = rest.data;
            var auxMaquinas = [], auxValores = [];
            respuesta.map(elemento => {
                auxMaquinas.push(elemento.equipo_fac);
                auxValores.push(elemento.ventatotal);
            })
            setMaquinas(auxMaquinas);
            setValores(auxValores);
        }
    }

    const actualizaInforme = async () => {

        const rest = await facturacionServices.listarfactmes(mes);
        if (rest.success) {
            var respuesta = rest.data;
            var auxMaquinas = [], auxValores = [];
            respuesta.map(elemento => {
                auxMaquinas.push(elemento.equipo_fac);
                auxValores.push(elemento.ventatotal);
            })
            setMaquinas(auxMaquinas);
            setValores(auxValores);
        }
        //console.log("MAQUINA : ", maquinas)
        //console.log("VALORES : ", valores)

        //const res = await facturacionServices.listarfactmes(mes);
        //if (res.success) {

        //}
    }

    useEffect(() => {
        datosFacturacionMes();
    }, [])

    const seleccionarMes = (
        <div className={classes.modal}>
            <Grid container spacing={3} >
                <Grid item xs={12} md={12}  >
                    <FacturacionVsGastos />
                </Grid>
            </Grid>
        </div>
    )

    const margenContribucion = (
        <div className={classes.modal2}>
            <Grid container spacing={3} >
                <Grid item xs={12} md={12}  >
                    <Margen />
                </Grid>
            </Grid>
        </div>
    )

    const cumplimientoOT = (
        <div className={classes.modal}>
            <Grid container spacing={3} >
                <Grid item xs={12} md={12}  >
                    <CumplimientoOT />
                </Grid>
            </Grid>
        </div>
    )

    const cumplimientoEquipo = (
        <div className={classes.modal}>
            <Grid container spacing={3} >
                <Grid item xs={12} md={12}  >
                    <CumplimientoEquipo />
                </Grid>
            </Grid>
        </div>
    )

    return (
        <div className={classes.root}>
            <br />
            <Grid container spacing={1} >
                <Grid item xs={12} md={4}> </Grid>
                <ButtonGroup>
                    <Button className={classes.button1} color="secondary" onClick={() => abrirCerrarModalSeleccionarMes()}>
                        Comparativa Facturacion vs Gastos
                    </Button>
                    {/*
                    <Button className={classes.button} color="secondary" onClick={() => abrirCerrarModalMargenContribucion()}>
                        Margen de Contribución
                    </Button>
                    */}
                    <Button className={classes.button1} color="secondary" onClick={() => abrirCerrarModalCumplimientoOT()}>
                        Cumplimiento OT
                    </Button>
                    {/*
                    <Button className={classes.button} color="secondary" onClick={() => abrirCerrarModalCumplimientoEquipo()}>
                       Comparativo x Equipo
                    </Button>
                    */}
                </ButtonGroup>
            </Grid>
            <br />
            <div>
                <Grid container spacing={1} >
                    <Grid item xs={12} md={1} ></Grid>
                    <Grid item xs={12} md={2} >
                        <CardsHeader totalotactivas={totalotactivas} icono={<AutorenewIcon className={classes.iconos} />}
                            titulo="OT Activas" texto={empresa} color="#bdbdbd" font="black" />
                    </Grid>
                    <Grid item xs={12} md={2} >
                        <CardsHeader totalotactivas={totalotprogramadas} icono={<EventAvailableIcon className={classes.iconos} />}
                            titulo="OT Programadas" texto={empresa} color="#bdbdbd" font="black" />
                    </Grid>
                    <Grid item xs={12} md={2} >
                        <CardsHeader totalotactivas={totalotrevision} icono={<YoutubeSearchedForIcon className={classes.iconos} />}
                            titulo="OT en Revisión" texto={empresa} color="#bdbdbd" font="black" />
                    </Grid>
                    <Grid item xs={12} md={2} >
                        <CardsHeader totalotactivas={totalotmes} icono={<MoneyIcon className={classes.iconos} />}
                            titulo="Total OT Mes" texto="85" color="#bdbdbd" font="black" />
                    </Grid>
                    <Grid item xs={12} md={2} >
                        <CardsHeaderOTTerminadas
                            totalotactivas={totalotterminadas} icono={<PlaylistAddCheckIcon className={classes.iconos} />}
                            titulo="OT Terminadas" texto="85" color="#bdbdbd" font="black" /> 
                    </Grid>
                </Grid>
            </div>

            <Modal
                open={modalSeleccionarMes}
                onClose={abrirCerrarModalSeleccionarMes}
            >
                {seleccionarMes}
            </Modal>
            <Modal
                open={modalMargenContribucion}
                onClose={abrirCerrarModalMargenContribucion}
            >
                {margenContribucion}
            </Modal>
            <Modal
                open={modalCumplimientoOT}
                onClose={abrirCerrarModalCumplimientoOT}
            >
                {cumplimientoOT}
            </Modal>
            <Modal
                open={modalCumplimientoEquipo}
                onClose={abrirCerrarModalCumplimientoEquipo}
            >
                {cumplimientoEquipo}
            </Modal>

        </div>
    );
}

export default Rentabilidad;

//  <Graphics />