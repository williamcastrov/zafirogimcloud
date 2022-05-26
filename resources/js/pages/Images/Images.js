import React, { Fragment, useEffect, useState } from 'react';
import { Modal, TextField, Button, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { green, blue, blueGrey, red } from '@material-ui/core/colors';
import SaveIcon from '@material-ui/icons/Save';
import swal from 'sweetalert';
import imageCompression from "browser-image-compression";
import Card from "react-bootstrap/Card";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    modal: {
        position: 'absolute',
        width: 600,
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

function Images(props) {
    const { numeroorden, operario } = props;
    const history = useHistory();
    console.log("OPERARIO : ", operario)
    const [modalGrabar, setModalGrabar] = useState(true);
    const styles = useStyles();
    const [file, setFile] = useState(null)
    const [compressedLink, setCompressedLink] = useState("https://testersdock.com/wp-content/uploads/2017/09/file-upload-1280x640.png");
    const [originalImage, setOriginalImage] = useState("");
    const [originalLink, setOriginalLink] = useState("");
    const [outputFileName, setOutputFileName] = useState("");
    const [clicked, setClicked] = useState(false);
    const [uploadImage, setUploadImage] = useState(false);
    const [actualiza, setActualiza] = useState(false);
    const [cargaImagen, setCargaImagen] = useState(false);
    const [mostrar, setMostrar] = useState(false);

    const selectedHandler = e => {
        setFile(e.target.files[0])
    }

    const abrirCerrarModalGrabar = () => {
        setModalGrabar(!modalGrabar);
    }

    const handle = e => {
        const imageFile = e.target.files[0];

        setOriginalLink(URL.createObjectURL(imageFile));
        setOriginalImage(imageFile);
        setOutputFileName(imageFile.name);
        setUploadImage(true);
        setClicked(true);
        setActualiza(true);
    };

    useEffect(() => {
        if (actualiza) {
            const options = {
                maxSizeMB: 2,
                maxWidthOrHeight: 800,
                useWebWorker: true
            };

            if (options.maxSizeMB >= originalImage.size / 1024) {
                alert("Imagen no requiere cambio de tamaño");
                return 0;
            }

            let output;
            console.log("IMAGEN ORIGINAL : ", originalImage);

            imageCompression(originalImage, options).then(x => {
                output = x;
                setFile(x);
                console.log("ARCHIVO COMPRIMIDO : ", x)
                const downloadLink = URL.createObjectURL(output);
                setCompressedLink(downloadLink);
                setCargaImagen(true);
            });

            //setClicked(true);
            //return 1;
        }
    }, [actualiza])


    const sendHandler = () => {
        //console.log(file)
        if (!file) {
            return
        }

        const formdata = new FormData();
        formdata.append('image', file)
        formdata.append('orden', numeroorden)
        console.log("FORM DATA : ", formdata)

        setMostrar(true);
        setActualiza(false);
        fetch('https://imagenes.gimcloud.co/api/imagenes/post', {
            method: 'POST',
            body: formdata
        })
            .then(res => res.text())
            .then(
                res => swal("Fotos OT", "Ingreso de Fotos OK", "success", { button: "Aceptar" })

            )
            .catch(err => {
                swal("Fotos OT", "Error Grabando Fotos", "error", { button: "Aceptar" })
            })

        document.getElementById('fileinput').value = null;
        setFile(null);
    }

    useEffect(() => {
        if (mostrar) {
            setCargaImagen(false);
            setMostrar(false);
        }
    }, [mostrar])

    const ordenGrabar = (
        <div className={styles.modal}>
            <div className="row mt-2">
                <div className="col-xl-12 col-lg-4 col-md-12 col-sm-12">
                    <Typography align="center" className={styles.typography} variant="button" display="block">
                        Imagen Original
                    </Typography>

                    <Grid container spacing={2} >
                        <Grid item xs={12} md={8}>
                            <input
                                type="file"
                                accept="image/*"
                                className="mt-2 btn btn-dark w-75"
                                onChange={e => handle(e)}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            {cargaImagen ? (
                                <Button className={styles.button} variant="contained" startIcon={<SaveIcon />} onClick={sendHandler} >Guardar</Button>
                            ) : (
                                <></>
                            )}
                        </Grid>
                    </Grid>
                </div>
                <Grid container spacing={2} >
                    <Grid item xs={12} md={12}>
                    </Grid>
                </Grid>
                <div className="col-xl-12 col-lg-4 col-md-12 col-sm-12 mt-3">

                    {
                        cargaImagen ?
                            <Typography align="center" className={styles.typography} variant="button" display="block">
                                Imagen Ajustada - Subir a GIM Cloud
                            </Typography>
                            :
                            console.log("Imagen Pendiente")

                    }

                </div>
            </div>
        </div >
    )
    // <Card.Img variant="top" src={compressedLink}></Card.Img>

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

export default Images;