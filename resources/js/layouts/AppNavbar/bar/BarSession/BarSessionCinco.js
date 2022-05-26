import React, { useState, useEffect } from 'react';
import { Toolbar, Typography, makeStyles, Button, IconButton, Drawer } from "@material-ui/core";
import UsuarioCinco from "../UsuarioCinco";
import firebase from "../../../../server/firebase";
import "firebase/auth";
import swal from 'sweetalert';
import { useHistory } from "react-router-dom";

// Web Services
import usuariosServices from "../../../../services/Usuarios";

const useStyles = makeStyles((theme) => ({
    sectionDesktop: {
        display: "none",
        [theme.breakpoints.up("md")]: {
            display: "flex"
        }
    },
    sectionMobile: {
        display: "flex",
        [theme.breakpoints.up("md")]: {
            display: "none"
        }
    },
    grow: {
        flexGrow: 1
    }
}));

const BarSessionCinco = (props) => {
    const { idusuario } = props;
    console.log("ID DE USUARIO BAR SESSION : ", idusuario);
    const classes = useStyles();
    const history = useHistory();

    const habilitaralertas = () => {
        async function fetchDataAlertas() {
            const res = await usuariosServices.habilitaralertas(idusuario);
            if (res.success) {
                window.location.reload();
            }
        }
        fetchDataAlertas();
    }

    const habilitarindicadores = () => {
        async function fetchDataIndicadores() {
            const res = await usuariosServices.habilitarindicadores(idusuario);
            if (res.success) {
                window.location.reload();
            }
        }
        fetchDataIndicadores();
    }

    const irapendientes = () => {
        history.push("/gestionordenes/gestionarpendientes");
    }

    const logout = () => {
        swal({
            title: "LOGISTRAL S.A.",
            text: "Oprima OK para salir de GIM Cloud Cinco!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    firebase.auth().signOut();
                } else {
                    console.log("Falso")
                }
            });
    }

    const IraInicio = () => {
        history.push("/gim");
    }

    const IraOrdenes = () => {
        history.push("/gestionordenes/ordenes");
    }

    const IraOrdenesChequeo = () => {
        history.push("/listachequeo/panellistachequeo");
    }

    const [state, setState] = React.useState({
        left: false,
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    return (
        <div>

            <Toolbar>
                <IconButton color="inherit" >
                    {["left"].map((anchor) => (
                        <React.Fragment key={anchor}>
                            <Button onClick={toggleDrawer(anchor, true)} size="large" color="inherit"  >{"menu"}</Button>
                            <Drawer
                                anchor={anchor}
                                open={state[anchor]}
                                onClose={toggleDrawer(anchor, false)}
                            >
                                <UsuarioCinco />
                            </Drawer>
                        </React.Fragment>
                    ))}

                </IconButton>
                <Typography variant="h3" color="inherit" >
                    GIM Cloud
                </Typography>

                <div className={classes.grow} ></div>
                <div className={classes.sectionDesktop} >
                    <Button size="large" onClick={IraInicio} variant="outlined" color="inherit" > Ir a Inicio </Button>
                    <Button size="large" onClick={IraOrdenes} variant="outlined" color="inherit" > Ir a Ordenes </Button>
                    <Button size="large" onClick={IraOrdenesChequeo} variant="outlined" color="inherit" >Entrega Recepción Equipos</Button>
                    <Button size="large" onClick={irapendientes} variant="outlined" color="inherit" > Ir a Pendientes </Button>
                </div>

                <div className={classes.grow} ></div>
                <div className={classes.sectionDesktop} >
                    <Button size="large" color="inherit" onClick={logout} >Salir</Button>
                </div>
                <div className={classes.sectionMobile} >
                    <IconButton color="inherit">
                        <i className="material-icons">more_vert</i>
                    </IconButton>
                </div>

            </Toolbar>

        </div>
    );
};

export default BarSessionCinco;
