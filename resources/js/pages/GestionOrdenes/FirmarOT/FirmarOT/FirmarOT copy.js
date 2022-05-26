import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import PropTypes from 'prop-types';
import { Modal, TextField, Button, Typography, Grid, ButtonGroup } from "@material-ui/core";
import { makeStyles, lighten } from "@material-ui/core/styles";
import { green, blue, blueGrey, red } from '@material-ui/core/colors';
import NumberFormat from 'react-number-format';
import SignalWifi4BarLockIcon from '@material-ui/icons/SignalWifi4BarLock';
import ForwardIcon from '@material-ui/icons/Forward';
import swal from 'sweetalert';
import Moment from 'moment';
import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';
import SignaturePad from 'react-signature-canvas';
import './firmarOT.css';

// Componentes de Conexion con el Backend
import crearordenesServices from "../../../../services/GestionOrdenes/CrearOrdenes";
import pendienteotServices from "../../../../services/GestionOrdenes/PendienteOT";

const useStyles = makeStyles((theme) => ({
    modal: {
        position: 'absolute',
        width: 800,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    },
    modalcumplimiento: {
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
    iconos: {
        cursor: 'pointer'
    },
    inputMaterial: {
        width: '100%'
    },
    formControl: {
        margin: theme.spacing(0),
        minWidth: 155,
        maxWidth: 155,
    },
    formControl2: {
        margin: theme.spacing(0),
        minWidth: 220,
        maxWidth: 220,
    },
    typography: {
        fontSize: 13,
        color: "#ff3d00"
    },
    typography2: {
        fontSize: 16,
        color: "#f44336"
    },
    button: {
        color: theme.palette.getContrastText(blueGrey[200]),
        margin: theme.spacing(0.3),
        '&:hover': {
            backgroundColor: blueGrey[200],
        },
    },
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
    button1: {
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
        backgroundColor: blue[900],
        margin: theme.spacing(1),
        fontSize: 12,
        '&:hover': {
            backgroundColor: blue[900],
        },
    },
    button3: {
        color: theme.palette.getContrastText(blueGrey[500]),
        backgroundColor: red[700],
        margin: theme.spacing(1),
        fontSize: 12,
        '&:hover': {
            backgroundColor: red[700],
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

NumberFormatCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

function FirmarOT(props) {
    const { id_otr, nombre_emp, razonsocial_cli, telefono_cli, nombre_ciu, email_cli, descripcion_mar, modelo_dequ,
        fechainicia_otr, descripcion_tser, descripcion_tmt, serie_dequ, codigo_equ, descripcion_con, primer_apellido_con,
        primer_nombre_con, horometro_otr, iniciatransporte_otr, finaltransporte_otr, tiempotransporte_otr, tiempoorden_otr,
        estado_otr
    } = props.ordenSeleccionado;

    const { operario } = props;

    //console.log("ES UN OPERARIO : ", operario)

    const { tipoRegistro } = props;

    //console.log("TIPO REGISTRO : ", tipoRegistro);

    const styles = useStyles();
    const [value, setValue] = useState(false);
    const [listUnCumplimiento, setListUnCumplimiento] = useState([]);
    const [modalRevisarCumplimiento, setModalRevisarCumplimiento] = useState(false);
    const [modalPendienteOT, setModalPendienteOT] = useState(false);
    const [formError, setFormError] = useState(false);
    const [grabar, setGrabar] = React.useState(false);
    const fechaactual = Moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
    const horaactual = Moment(new Date()).format('HH:mm:ss');
    const [activo, setActivo] = useState(false);
    const [actualiza, setActualiza] = useState(false);

    let servicio = 1;

    const [pendienteSeleccionado, setPendienteSeleccionado] = useState({
        id: "",
        id_pot: "",
        descripcion_pot: "",
    });

    const handleChange = e => {
        const { name, value } = e.target;

        setPendienteSeleccionado(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const seleccionarCumplimiento = (cumplimiento, caso) => {
        //console.log(cumplimiento)
        setPendienteSeleccionado(cumplimiento);
        (caso === "Editar") ? abrirCerrarModalActualizarCumplimiento() : abrirCerrarModalEliminarActividad()
    }

    const iniciarCumplimiento = () => {
        //console.log("REFERENCIA SELECCIONADA : ", value);
        handleOnSelect(value)
    }

    const abrirCerrarModalEliminarActividad = () => {
        setModalEliminarActividad(!modalEliminarActividad);
    }

    const abrirCerrarModalPendienteOT = () => {
        setModalPendienteOT(!modalPendienteOT);
    }

    const abrirCerrarModalRevisarCumplimiento = () => {
        setModalRevisarCumplimiento(!modalRevisarCumplimiento);
    }

    const registrarPendiente = async () => {
        setFormError({});
        let errors = {};
        let formOk = true;

        if (!pendienteSeleccionado.descripcion_pot) {
            alert("1")
            errors.descripcion_pot = true;
            formOk = false;
        }

        if (formOk) {
            {
                setPendienteSeleccionado([{
                    id: "",
                    id_pot: id_otr,
                    descripcion_pot: pendienteSeleccionado.descripcion_pot
                }])
            }
            setGrabar(true);
        } else {
            swal("Pendientes Maquia", "Debe Ingresar Todos los Datos!", "warning", { button: "Aceptar" });
            //console.log(ordenSeleccionado);
            console.log(res.message);
            abrirCerrarModalInsertar();
        }

    }

    useEffect(() => {
        if (grabar) {

            async function grabarPendiente() {
                //console.log("DATOS PENDIENTE : ", pendienteSeleccionado)
                const res = await pendienteotServices.save(pendienteSeleccionado[0]);

                if (res.success) {
                    swal("Pendiente OT", "Pendiente OT Creada de forma Correcta!", "success", { button: "Aceptar" });
                    //console.log(res.message)
                } else {
                    swal("Pendiente OT", "Error Creando Registro OT Maquina!", "error", { button: "Aceptar" });
                    console.log(res.message);
                }
                //setActualiza(true);
            }
            grabarPendiente();
        }
    }, [grabar])


    const cumplimiento = [
        {
            title: '# OT',
            field: 'id_pot',
            cellStyle: { minWidth: 50 }
        },
        {
            title: 'Actividad',
            field: 'descripcion_pot',
            cellStyle: { minWidth: 250 }
        },
        {
            title: 'Referencia',
            field: 'referencia_pot',
            cellStyle: { minWidth: 100 }
        },
        {
            title: 'Fecha Inicia',
            field: 'fechainicia_pot',
            type: "date",
            cellStyle: { minWidth: 100 }
        },
        {
            title: 'Fecha Fin',
            field: 'fechafinal_pot',
            type: "date",
            cellStyle: { minWidth: 100 }
        },
        {
            title: 'Cantidad',
            field: 'cantidad_pot',
            cellStyle: { minWidth: 50 }
        },
        {
            title: 'Valor Unitario',
            field: 'valorunitario_pot',
            cellStyle: { minWidth: 100 }
        },
        {
            title: 'Valor Total',
            field: 'valortotal_pot',
            cellStyle: { minWidth: 100 }
        }
    ]

    const RevisarCumplimiento = (
        <div className={styles.modalcumplimiento}>
            <br />
            <MaterialTable
                columns={cumplimiento}
                data={listUnCumplimiento}
                title="CONSULTA CUMPLIMIENTO ORDEN DE SERVICIO"
                actions={[
                    {
                        icon: 'edit',
                        tooltip: 'Editar Item',
                        onClick: (event, rowData) => seleccionarCumplimiento(rowData, "Editar")
                    },
                    {
                        icon: 'delete',
                        tooltip: 'Eliminar Item',
                        onClick: (event, rowData) => seleccionarCumplimiento(rowData, "Eliminar")
                    }
                ]}
                options={{
                    actionsColumnIndex: -1,
                    exportButton: true
                }}
                localization={{
                    header: {
                        actions: "Acciones"
                    }
                }}

            />
        </div>
    )

    const grabarPendienteOT = (
        <div className={styles.modal}>
            <Grid container spacing={2} >
                <Grid item xs={12} md={6}></Grid>
                <Grid item xs={12} md={3}>
                    <Popup modal trigger={<Button variant="contained" startIcon={<SignalWifi4BarLockIcon />} >Firmar Aqui</Button>}>
                        <SignaturePad canvasProps={{
                            className: "firmarOT"
                        }} />
                    </Popup>
                </Grid>
            </Grid>
        </div>
    )

    return (
        <div className="App">
            <br />
            <Typography align="center" className={styles.typography} variant="button" display="block" >
                - ORDEN DE SERVICIO # {props.ordenSeleccionado.id_otr}
            </Typography>

            <ButtonGroup orientation="vertical" className={styles.button} color="primary" aria-label="outlined primary button group">
                <Button>EMPRESA : {nombre_emp} </Button>
                <Button>CLIENTE : {razonsocial_cli} </Button>
                <Button>TELEFONO : {telefono_cli} </Button>
            </ButtonGroup>
            <ButtonGroup orientation="vertical" className={styles.button} color="primary" aria-label="outlined primary button group">
                <Button >CONTACTO :{primer_apellido_con}{" "}{primer_nombre_con} </Button>
                <Button >CIUDAD : {nombre_ciu} </Button>
                <Button >CORREO : {email_cli} </Button>
            </ButtonGroup>
            <ButtonGroup orientation="vertical" className={styles.button} color="primary" aria-label="outlined primary button group">
                <Button >MARCA : {descripcion_mar} </Button>
                <Button >MODELO : {modelo_dequ} </Button>
                <Button >FECHA : {fechainicia_otr} </Button>
            </ButtonGroup>
            <ButtonGroup orientation="vertical" className={styles.button} color="primary" aria-label="outlined primary button group">
                <Button >SERIE : {serie_dequ}  </Button>
                <Button >ID INTERNO : {codigo_equ}  </Button>
            </ButtonGroup>
            <ButtonGroup className={styles.button} color="primary" aria-label="outlined primary button group">
                <Button >TIPO DE SERVICIO : {descripcion_tser} </Button>
                <Button >TIPO DE ACTIVIDAD : {descripcion_tmt}  </Button>
            </ButtonGroup>

            <ButtonGroup  >
                <Button className={styles.button}
                    variant="contained" startIcon={<ForwardIcon />} color="primary" onClick={() => abrirCerrarModalPendienteOT()}
                > Firmar OT
                </Button>
            </ButtonGroup>

            <Modal
                open={modalRevisarCumplimiento}
                onClose={abrirCerrarModalRevisarCumplimiento}
            >
                {RevisarCumplimiento}
            </Modal>

            <Modal
                open={modalPendienteOT}
                onClose={abrirCerrarModalPendienteOT}
            >
                {grabarPendienteOT}
            </Modal>

        </div>
    );
}

export default FirmarOT;