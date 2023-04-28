import React, { useState, useEffect } from 'react';
import { Modal, TextField, Button, Select, MenuItem, FormControl, InputLabel, Typography, Grid, ButtonGroup } from "@material-ui/core";
import { makeStyles, lighten } from "@material-ui/core/styles";
import { green, blue, blueGrey, red } from '@material-ui/core/colors';
import swal from 'sweetalert';

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
        minWidth: 400,
        maxWidth: 400,
    },
    formControl3: {
        margin: theme.spacing(0),
        minWidth: 600,
        maxWidth: 600,
    },
    formControl2: {
        margin: theme.spacing(0),
        minWidth: 220,
        maxWidth: 220,
    },
    typography: {
        fontSize: 14,
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
        fontSize: 14,
        '&:hover': {
            backgroundColor: blue[700],
        },
    },
    button2: {
        color: theme.palette.getContrastText(blueGrey[500]),
        backgroundColor: blue[900],
        margin: theme.spacing(1),
        fontSize: 14,
        '&:hover': {
            backgroundColor: blue[900],
        },
    },
    button3: {
        color: theme.palette.getContrastText(blueGrey[500]),
        backgroundColor: red[700],
        margin: theme.spacing(1),
        fontSize: 14,
        '&:hover': {
            backgroundColor: red[700],
        },
    },
}));

function EnviarEmail(props) {
    const styles = useStyles();
    const { id_otr, nombre_emp, razonsocial_cli, telefono_cli, nombre_ciu, email_cli, descripcion_mar, modelo_dequ,
        fechainicia_otr, descripcion_tser, descripcion_tmt, serie_dequ, codigo_equ, descripcion_con, primer_apellido_con,
        primer_nombre_con, horometro_otr, iniciatransporte_otr, finaltransporte_otr, tiempotransporte_otr, tiempoorden_otr,
        estado_otr, id_actividad
    } = props.ordenSeleccionado;
    console.log("ORDEN SELECCIONADA : ", id_actividad);

    const [emailEnviar, setEmailEnviar] = useState(false);
    const onSubmit = values => console.log(values);
    const [enviar, setEnviar] = useState(false);
    const [nombre, setNombre] = useState(primer_nombre_con + ' ' + primer_apellido_con);
    //const [email, setEmail] = useState("claudiaholguinarroyave@gmail.com");
    const [comentario, setComentario] = useState("https://zafiro.gimcloud.com/api/ordenesserv/generarPdf/" + id_actividad);
    const [contacto, setContacto] = useState({
        nombre: primer_nombre_con + ' ' + primer_apellido_con,
        email: email_cli,
        //email: 'williamcastrov@gmail.com',
        comentario: "https://zafiro.gimcloud.com/api/ordenesserv/generarPdf/" + id_actividad
    });

    const handleChange = e => {

        const { name, value } = e.target;

        setContacto(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const creaMensaje = () => {
        //e.preventDefault();
        setEnviar(true);
    }

    useEffect(() => {
        if (enviar) {
            function fetchDataDatosEquipos() {
                {
                    console.log("EMAIL : ", emailEnviar);
                    if (emailEnviar) {
                        setContacto([{
                            nombre: nombre,
                            email: emailEnviar,
                            //email: 'williamcastrov@gmail.com',
                            comentario: "https://zafiro.gimcloud.com/api/ordenesserv/generarPdf/" + id_actividad
                        }])

                    } else {
                        setContacto([{
                            nombre: nombre,
                            email: email_cli,
                            //email: 'williamcastrov@gmail.com',
                            comentario: "https://zafiro.gimcloud.com/api/ordenesserv/generarPdf/" + id_actividad
                        }])
                    }
                }
                agregarTarea();
            }
            fetchDataDatosEquipos();
        }
    }, [enviar])

    const agregarTarea = (e) => {
        //e.preventDefault();
        const templateId = 'template_smmfw59';
        const serviceID = 'service_0yis59h';
        if (emailEnviar) {
            sendFeedback(serviceID, templateId, {
                to_name: contacto.nombre, from_name: contacto.nombre, message_html: contacto.comentario,
                reply_to: "jefemantenimiento@elzafiro.com.co", email: emailEnviar, id_otr: id_actividad, razonsocial_cli: razonsocial_cli
            })
        } else {
            sendFeedback(serviceID, templateId, {
                to_name: contacto.nombre, from_name: contacto.nombre, message_html: contacto.comentario,
                reply_to: "jefemantenimiento@elzafiro.com.co", email: contacto.email, id_otr: id_actividad, razonsocial_cli: razonsocial_cli
            })
        }
        return;
    }

    const sendFeedback = (serviceID, templateId, variables) => {
        window.emailjs.send(
            serviceID, templateId,
            variables
        ).then(res => {
            swal("Email", "Correo enviado al destinatario!", "success", { button: "Aceptar" })
        })
            .catch(err => swal("Email", "Error enviando Correo al destinatario!", "error", { button: "Aceptar" }))
    }

    return (
        <div className="App">
            <Typography align="center" className={styles.typography} variant="button" display="block" >
                - ORDEN DE SERVICIO # {props.ordenSeleccionado.id_actividad}
            </Typography>
            <ButtonGroup orientation="vertical" className={styles.button} color="primary" aria-label="outlined primary button group">
                <Button>EMPRESA : {nombre_emp} </Button>
                <Button>CLIENTE : {razonsocial_cli} </Button>
                <Button>TELEFONO : {telefono_cli} </Button>
            </ButtonGroup>

            <ButtonGroup orientation="vertical" className={styles.button} color="primary" aria-label="outlined primary button group" >
                <Button text-align="right" >CONTACTO :{primer_apellido_con}{" "}{primer_nombre_con} </Button>
                <Button >CIUDAD : {nombre_ciu} </Button>
                <Button >CORREO : {email_cli} </Button>
            </ButtonGroup>

            <ButtonGroup orientation="vertical" className={styles.button} color="primary" aria-label="outlined primary button group">
                <Button >MARCA : {descripcion_mar} </Button>
                <Button >MODELO : {modelo_dequ} </Button>
                <Button >FECHA : {fechainicia_otr} </Button>
            </ButtonGroup>
            <br />
            <ButtonGroup orientation="vertical" className={styles.button} color="primary" aria-label="outlined primary button group">
                <div>
                    <Typography align="center" className={styles.typography} variant="button" display="block"> Ingrese Email Enviar OT </Typography>
                    <Grid xl={12} lg={12} xs={12} md={12}>
                        <FormControl className={styles.formControl3}>
                            <TextField type="text" className={styles.inputMaterial} label="Ingrese Emanil" name="nvoemail"
                                onChange={(e) => setEmailEnviar(e.target.value)} />
                        </FormControl>
                    </Grid>
                </div>
                <br />
                <Button variant="contained" onClick={creaMensaje} size="large" color="secondary" >
                    Enviar Email
                </Button>
            </ButtonGroup>

        </div>
    );
}

export default EnviarEmail;