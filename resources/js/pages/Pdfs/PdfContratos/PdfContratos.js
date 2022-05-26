import React, { Fragment, useEffect, useState } from 'react';
import { Modal, TextField, Button, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { green, blue, blueGrey, red } from '@material-ui/core/colors';
import SaveIcon from '@material-ui/icons/Save';
import swal from 'sweetalert';

const useStyles = makeStyles((theme) => ({
    modal: {
        position: 'absolute',
        width: 700,
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
}));

function PdfContratos(props) {
    const { codigocontrato } = props;
    console.log("NUMERO CONTRATO : ", codigocontrato)
    const [modalGrabar, setModalGrabar] = useState(true);
    const styles = useStyles();
    const [file, setFile] = useState(null)
    const [nombreContratos, setNombreContratos] = useState([]);
    const [fechaContratos, setFechaContratos] = useState([]);

    const selectedHandler = e => {
        setFile(e.target.files[0])
    }

    const abrirCerrarModalGrabar = () => {
        setModalGrabar(!modalGrabar);
    }

    const sendHandler = () => {
        //console.log(file)
        if (!file) {
            alert("Seleccione un Archivo")
            return
        }

        //console.log(nombreContratos)
        //console.log(fechaContratos)
        const formdata = new FormData();
        formdata.append('image', file)
        formdata.append('contrato', codigocontrato)
        formdata.append('nombrecontrato', nombreContratos)
        formdata.append('fechacontrato', fechaContratos)
        console.log("FORM DATA : ", formdata)

        fetch('https://imagenes.gimcloud.co/api/pdfscontratos/post', {
            method: 'POST',
            body: formdata
        })
            .then(res => res.text())
            .then(res => swal("PDF Contrato", "Ingreso de PDF OK", "success", { button: "Aceptar" }))
            .catch(err => {
                swal("Fotos OT", "Error Grabando PDF", "error", { button: "Aceptar" })
            })

        document.getElementById('fileinput').value = null;
        setFile(null)
        abrirCerrarModalGrabar();
    }

    const ordenGrabar = (
        <div className={styles.modal}>
            <Typography align="center" className={styles.typography} variant="button" display="block">
                Agregar PDF Contrato
            </Typography>
            <br />
            <Grid container spacing={2} >
                <Grid item xs={12} md={12}>
                    <TextField name="" label="Nombre del Contrato" fullWidth onChange={(e) => setNombreContratos(e.target.value)} />
                </Grid>
                <Grid item xs={12} md={6}> <TextField type="date" InputLabelProps={{ shrink: true }} name="fechainicio_ctr"
                    label="Fecha del Contrato" fullWidth onChange={(e) => setFechaContratos(e.target.value)} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField type="file" id="fileinput" name="file" label="Subir Imagen" onChange={selectedHandler} />
                </Grid>
                <Grid item xs={12} md={4}></Grid>
                <Grid item xs={12} md={6}>
                    <Button className={styles.button} variant="contained" startIcon={<SaveIcon />} onClick={sendHandler} >Agregar PDF</Button>
                </Grid>
            </Grid>
        </div>
    )

    return (
        <div className="App">
            <Modal
                open={modalGrabar}
                onClose={abrirCerrarModalGrabar}
            >
                {ordenGrabar}
            </Modal>
        </div>
    );
}

export default PdfContratos;