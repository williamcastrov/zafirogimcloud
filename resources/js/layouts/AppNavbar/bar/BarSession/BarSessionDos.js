import React, {useState, useEffect} from 'react';
import UsuarioDos from "../UsuarioDos";
import firebase from "../../../../server/firebase";
import { Toolbar, Typography, makeStyles, Button, IconButton, Drawer } from "@material-ui/core";
import "firebase/auth";
import { useHistory } from "react-router-dom";
import swal from 'sweetalert';

const useStyles = makeStyles((theme) => ({
    sectionDesktop : {
        display: "none",
        [theme.breakpoints.up("md")] : {
            display : "flex"
        }
    },
    sectionMobile:{
        display: "flex",
        [theme.breakpoints.up("md")] : {
            display: "none"
        }
    },
    grow : {
        flexGrow: 1
    }
}));

const BarSessionDos = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const [listarUsuarios, setListUsuarios] = useState([]);

    const logout = () => {
        swal({
            title: "LOGISTRAL S.A.",
            text: "Oprima OK para salir de GIM Cloud!",
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
                        <UsuarioDos />
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

export default BarSessionDos;