import React, { useEffect, useState } from "react";
import { Modal, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import firebase from "../../server/firebase";
import "firebase/auth";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    modal: {
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
    formControl: {
        margin: theme.spacing(0),
        minWidth: 320,
    },
    iconos: {
        cursor: 'pointer'
    },
    inputMaterial: {
        width: '100%'
    },
    typography: {
        fontSize: 16,
        color: "#ff3d00"
    }
}));

function Error404(props) {
    const styles = useStyles();
    const [modal404, setModal404] = useState(true);
    const history = useHistory();

    const abrirCerrarModal404 = () => {
        setModal404(!modal404);
    }

    const logout = () => {
        firebase.auth().signOut();
        history.push("/gim");
    }

    const notFound = (
        <div className={styles.modal}>
            <br />
            <Typography align="center" className={styles.typography} variant="button" display="block" >
                Error 404
            </Typography>
            <p>Not Found - Usuario no Autorizado</p>
            <div align="right">
                <Button onClick={() => logout()} >Cerrar</Button>
            </div>
        </div>
    )

    return (
        <div className="App">
            <Button variant="contained" onClick={() => abrirCerrarModal404()} >
                Usuario no Autorizado
            </Button>
            <Modal
                open={modal404}
                onClose={abrirCerrarModal404}
            >
                {notFound}
            </Modal>
        </div>
    );
}

export default Error404;