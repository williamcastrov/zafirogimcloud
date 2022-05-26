import React, { useEffect, useState } from "react";
import { Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ZoomOutMapIcon from '@material-ui/icons/ZoomOutMap';
import RecentActorsIcon from '@material-ui/icons/RecentActors';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

// Floating Button
import { Container, Button, Link, lightColors, darkColors } from 'react-floating-action-button'

import AsignarOrden from "../AsignarOrden";
import CrearActividad from "../CrearActividad";

//Procedimiento para llamar al Web Service
import cumplimientooservServices from "../../../services/GestionOrdenes/CumplimientoOserv";

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

export default function MenuEquipos(props) {
  const { ordenServicio } = props;

  const styles = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const fecha = new Date();
  
  const [modalAsignarOrden, setModalAsignarOrden] = useState(false);
  const [modalCrearActividad, setModalCrearActividad] = useState(false);
  const [actividadesActivasOT, setActividadesActivasOT] = useState(0);
  const [actividadesTotalesOT, setActividadesTotalesOT] = useState(0);

  useEffect(() => {
    async function fetchDataActividadesActivasOT() {
      const res = await cumplimientooservServices.actividadesactivasxot(ordenServicio);
      setActividadesActivasOT(res.data[0].actividadesxotactivas);
      const rest = await cumplimientooservServices.actividadestotalesxot(ordenServicio);
      setActividadesTotalesOT(rest.data[0].actividadestotalesxot);
      console.log("ACTIVIADES ACTIVAS : ", rest.data[0].actividadestotalesxot)
    }
    fetchDataActividadesActivasOT();
  }, [])
 
  const abrirCerrarModalAsignarOrden = () => {
    setModalAsignarOrden(!modalAsignarOrden);
  }

  const abrirCerrarModalCrearActividad = () => {
    setModalCrearActividad(!modalCrearActividad);
  }
  
  const asignarOrden = (
    <div>
      <AsignarOrden ordenServicio={ordenServicio} />
    </div>
  )

  const crearActividad = (
    <div>
      <CrearActividad ordenServicio={ordenServicio} actividadesActivasOT={actividadesActivasOT} 
                      actividadesTotalesOT={actividadesTotalesOT} />
    </div>
  )
  
  return (
    <div>   
      <Modal
        open={modalAsignarOrden}
        onClose={abrirCerrarModalAsignarOrden}
      >
        {asignarOrden}
      </Modal>
      <Modal
        open={modalCrearActividad}
        onClose={abrirCerrarModalCrearActividad}
      >
        {crearActividad}
      </Modal>

      <Container className={styles.floatingbutton} >
        <Button
          tooltip="Crear Actividad"
          rotate={true}
          styles={{ backgroundColor: darkColors.grey, color: lightColors.white }}
          onClick={() => setModalCrearActividad(true)} ><RecentActorsIcon />
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

/*
  <Button
          tooltip="Asignar Orden"
          rotate={true}
          styles={{ backgroundColor: darkColors.lightBlue, color: lightColors.white }}
          onClick={() => setModalAsignarOrden(true)} ><ArrowForwardIcon/>
        </Button>
*/
