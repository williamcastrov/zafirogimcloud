import React, { useState } from "react";
import { Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ZoomOutMapIcon from '@material-ui/icons/ZoomOutMap';
import RecentActorsIcon from '@material-ui/icons/RecentActors';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

// Floating Button
import { Container, Button, Link, lightColors, darkColors } from 'react-floating-action-button'

import AsignarOrden from "../../GestionOrdenes/AsignarOrden";


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
  floatingbutton: {
    margin: 35,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
  }
}));

export default function MenuListaChequeo(props) {
  const { ordenServicio, tipoOperacion } = props;

  console.log("TIPO OPERACION : ", tipoOperacion);
  console.log("ORDEN DE SERVICIO : ", ordenServicio);
  const styles = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const fecha = new Date();

  const [modalAsignarOrden, setModalAsignarOrden] = useState(false);

  const abrirCerrarModalAsignarOrden = () => {
    setModalAsignarOrden(!modalAsignarOrden);
  }

  const asignarOrden = (
    <div>
      <AsignarOrden ordenServicio={ordenServicio} tipoOperacion={tipoOperacion} />
    </div>
  )
  //     <AsignarOrden ordenServicio={ordenServicio} />

  return (
    <div>
      <Modal
        open={modalAsignarOrden}
        onClose={abrirCerrarModalAsignarOrden}
      >
        {asignarOrden}
      </Modal>

      <Container className={styles.floatingbutton} >
        <Button
          tooltip="Pendiente"
          rotate={true}
          styles={{ backgroundColor: darkColors.grey, color: lightColors.white }}
          onClick={() => alert("Opción Pendiente")} ><RecentActorsIcon />
        </Button>
        <Button
          tooltip="Asignar Orden"
          rotate={true}
          styles={{ backgroundColor: darkColors.lightBlue, color: lightColors.white }}
          onClick={() => setModalAsignarOrden(true)} ><ArrowForwardIcon />
        </Button>
        <Button
          tooltip="Gestionar Ordenes!"
          rotate={true}
          styles={{ backgroundColor: darkColors.green, color: lightColors.white }}
          onClick={() => alert('Seleccione Información relaciona con la Gestión de Ordenes!')} ><ZoomOutMapIcon /></Button>
      </Container>
    </div>

  );
}
