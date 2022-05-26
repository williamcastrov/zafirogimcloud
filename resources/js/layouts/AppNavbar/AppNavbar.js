import React, {useState, useEffect} from 'react';
import { AppBar, Toolbar, makeStyles } from "@material-ui/core";
import BarSession from './bar/BarSession/BarSession';
import SelectMenuBar from './bar/BarSession/SelectMenuBar';

import usuariosServices from "../../services/Usuarios";

const useStyles = makeStyles((theme) => ({
    sectionDesktop : {
        display : "none",
        [theme.breakpoints.up("md")] : {
            display : "flex"
        }
    },
    sectionMobile : {
        display : "flex",
        [theme.breakpoints.up("md")] : {
            display : "none"
        }
    }
}));

const AppNavbar = (props) => {
    const { metadata } = props;
    //console.log("META DATA : ",metadata)
    const [tipousuario, setTipoUsuario] = useState(0);
    const [idusuario, setIdUsuario] = useState(0);

    useEffect(() => {
       
        async function fetchDataUsuarios() {
          const res = await usuariosServices.leerUsuario(metadata);
          setTipoUsuario(res.data[0].tipo_usu);
          setIdUsuario(res.data[0].id_usu);
          //console.log("DATOS MENU SELECT USUARIO : ",res.data[0].tipo_usu)
        }
        fetchDataUsuarios();
    }, [])    

    return (
        <div>
            <AppBar position="static" >
                <SelectMenuBar tipousuario={tipousuario} idusuario={idusuario} />
            </AppBar>
        </div>
    );
};

export default AppNavbar;