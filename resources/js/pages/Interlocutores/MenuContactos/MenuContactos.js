import React, { useState } from "react";
import { Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ZoomOutMapIcon from '@material-ui/icons/ZoomOutMap';
import RecentActorsIcon from '@material-ui/icons/RecentActors';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

// Floating Button
import { Container, Button, Link, lightColors, darkColors } from 'react-floating-action-button'

import Contactos from "../Contactos";

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
    minWidth: 250,
  },
  floatingbutton : {
      margin: 55,
      top: 'auto',
      right: 20,
      bottom: 20,
      left: 'auto',
      position: 'fixed',
  }
}));

export default function MenuContactos(props) {
  const { interlocutor, nitCliente } = props;
  //console.log("INTERLOCUTOR : ", interlocutor)

  const styles = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const fecha = new Date();
  
  const [modalAsignarContacto, setModalAsignarContacto] = useState(false);
 
  const abrirCerrarModalAsignarContacto = () => {
    setModalAsignarContacto(!modalAsignarContacto);
  }
  
  const asignarContacto = (
    <div>
      <Contactos interlocutor={interlocutor} nitCliente={nitCliente} />
    </div>
  )
  
  return (
    <div>   
      <Modal
        open={modalAsignarContacto}
        onClose={abrirCerrarModalAsignarContacto}
      >
        {asignarContacto}
      </Modal>

      <Container className={styles.floatingbutton} >
        <Button
          tooltip="Pendiente"
          rotate={true}
          styles={{ backgroundColor: darkColors.grey, color: lightColors.white }}
          onClick={() => alert("Opción Pendiente")} ><RecentActorsIcon />
        </Button>
        <Button
          tooltip="Registrar Contactos"
          rotate={true}
          styles={{ backgroundColor: darkColors.lightBlue, color: lightColors.white }}
          onClick={() => setModalAsignarContacto(true)} ><ArrowForwardIcon/>
        </Button>
        <Button
          tooltip="Gestionar Contactos!"
          rotate={true}
          styles={{ backgroundColor: darkColors.green, color: lightColors.white }}  
          onClick={() => alert('Seleccione Información relaciona con los Contactos!')} ><ZoomOutMapIcon /></Button>
      </Container>
    </div>

  );
}
