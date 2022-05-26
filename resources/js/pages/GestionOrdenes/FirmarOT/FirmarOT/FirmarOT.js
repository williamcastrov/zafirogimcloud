import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { Modal, TextField, Button, Typography, Grid, ButtonGroup } from "@material-ui/core";
import { makeStyles, lighten } from "@material-ui/core/styles";
import { green, blue, blueGrey, red } from '@material-ui/core/colors';
import NumberFormat from 'react-number-format';
import ForwardIcon from '@material-ui/icons/Forward';
import swal from 'sweetalert';
import Moment from 'moment';
import 'reactjs-popup/dist/index.css';
import SignaturePad from 'react-signature-canvas';
import './firmarOT.css';

// Componentes de Conexion con el Backend
import firmarotServices from "../../../../services/GestionOrdenes/FirmarOT";

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
    typography: {
        fontSize: 13,
        color: "#ff3d00"
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

function FirmarOT(props) {
    const { id_otr, nombre_emp, razonsocial_cli, telefono_cli, nombre_ciu, email_cli, descripcion_mar, modelo_dequ,
        fechainicia_otr, descripcion_tser, descripcion_tmt, serie_dequ, codigo_equ, descripcion_con, primer_apellido_con,
        primer_nombre_con, horometro_otr, iniciatransporte_otr, finaltransporte_otr, tiempotransporte_otr, tiempoorden_otr,
        estado_otr
    } = props.ordenSeleccionado;

    const styles = useStyles();
    const [sigCanvas, setSigCanvas] = useState({});
    const [sigCanvasTecnico, setSigCanvasTecnico] = useState({});
    const [imageURL, setImageURL] = useState(null);
    const [imageURLTecnico, setImageURLTecnico] = useState(null);
    const [modalPendienteOT, setModalPendienteOT] = useState(false);
    const [formError, setFormError] = useState(false);
    const [grabar, setGrabar] = React.useState(false);
    const fechaactual = Moment(new Date()).format('YYYY-MM-DD');

    const [firmarotSeleccionado, setFirmarOTSeleccionado] = useState({
        id_fir: "",
        imagen_fir: "",
        nombre_fir: "",
        firmatecnico_fir: "",
        fechafirma_fir: "",
    });

    const limpiar = () => {
        sigCanvas.current.clear();
        sigCanvasTecnico.current.clear();
    }

    const guardar = () => {
        setImageURL(sigCanvas.current.getTrimmedCanvas().toDataURL("image/png"));
        setImageURLTecnico(sigCanvasTecnico.current.getTrimmedCanvas().toDataURL("image/png"));
        //console.log("Numero OT : ", id_otr)
        setFirmarOTSeleccionado([{
            id_fir: id_otr,
            imagen_fir: sigCanvas.current.getTrimmedCanvas().toDataURL("image/png"),
            firmatecnico_fir: sigCanvasTecnico.current.getTrimmedCanvas().toDataURL("image/png"),
            nombre_fir: id_otr + "firmagimcloudot",
            fechafirma_fir: fechaactual
        }]);
        setGrabar(true);
    }

    useEffect(() => {
        if (grabar) {
            console.log("DATOS IMAGEN : ", firmarotSeleccionado[0])

            async function fetchDataGrabarImagen() {
                const res = await firmarotServices.save(firmarotSeleccionado[0]);
                console.log("Mensaje desde el Servidor : ", res.data);

                if (res.success) {
                    swal("Firma OT Cliente", "Grabada de Forma Correcta!", "success", { button: "Aceptar" });
                    console.log(res.message)
                    abrirCerrarModalPendienteOT();
                }
                else {
                    swal("Firma OT Client", "Error Grabando Firma de la OT!", "error", { button: "Aceptar" });
                    console.log(res.message);
                    abrirCerrarModalPendienteOT();
                }
            }
            fetchDataGrabarImagen();
        }
    }, [grabar])

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

    const abrirCerrarModalPendienteOT = () => {
        setModalPendienteOT(!modalPendienteOT);
    }

    const grabarPendienteOT = (
        <div className={styles.modal}>
            <Grid container spacing={2} >
                <Grid item xs={12} md={12}>
                    <Typography align="center" className={styles.typography} variant="button" display="block" >
                        Firma Cliente
                    </Typography>
                </Grid>
                <Grid item xs={12} md={12}>
                    <SignaturePad
                        ref={sigCanvas}
                        canvasProps={{
                            className: "firmarOT"
                        }} />
                </Grid>
                <Grid item xs={12} md={12}>
                    <Typography align="center" className={styles.typography} variant="button" display="block" >
                        Firma Técnico
                    </Typography>
                </Grid>
                <Grid item xs={12} md={12}></Grid>
                <SignaturePad
                    ref={sigCanvasTecnico}
                    canvasProps={{
                        className: "firmarOT"
                    }} />
            </Grid>
            <Grid container spacing={2} >
                <Grid item xs={12} md={4}>
                    <Button className={styles.button} onClick={limpiar}>
                        Limpiar Area de Firma
                    </Button>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Button className={styles.button} onClick={guardar}>
                        Guardar Firma
                    </Button>
                </Grid>
            </Grid>

            <Grid item xs={12} md={4}>


                {
                    imageURL ?

                        <Grid item xs={12} md={12}>
                            <img
                                src={imageURL}
                                alt="firma"
                                style={{
                                    display: "block",
                                    margin: "0 auto",
                                    border: "1px solid black",
                                    width: "200px"
                                }}
                            />
                        </Grid>

                        :
                        null
                }
            </Grid>
            <Grid item xs={12} md={12}>
                {
                    imageURLTecnico ?

                        <Grid item xs={12} md={12}>
                            <img
                                src={imageURLTecnico}
                                alt="firma"
                                style={{
                                    display: "block",
                                    margin: "0 auto",
                                    border: "1px solid black",
                                    width: "200px"
                                }}
                            />
                        </Grid>

                        :
                        null
                }
            </Grid>
        </div>
    )

    return (
        <div className="App">
            <div className={styles.modal}>
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

                <Grid container spacing={2}>
                    <Grid item xs={12} md={4}></Grid>
                    <Grid item xs={12} md={4}>
                        <Button className={styles.button}
                            variant="contained" startIcon={<ForwardIcon />} color="primary" onClick={() => abrirCerrarModalPendienteOT()}
                        > Firmar OT
                        </Button>
                    </Grid>
                </Grid>
            </div>
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