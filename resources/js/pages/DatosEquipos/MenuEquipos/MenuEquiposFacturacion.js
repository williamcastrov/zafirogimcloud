import React, { useState } from "react";
import { Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ZoomOutMapIcon from '@material-ui/icons/ZoomOutMap';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import RoomIcon from '@material-ui/icons/Room';
import DescriptionIcon from '@material-ui/icons/Description';
import RecentActorsIcon from '@material-ui/icons/RecentActors';
import CategoryIcon from '@material-ui/icons/Category';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import LockIcon from '@material-ui/icons/Lock';
import SettingsInputComponentIcon from '@material-ui/icons/SettingsInputComponent';

// Floating Button
import { Container, Button, Link, lightColors, darkColors } from 'react-floating-action-button'

import Garantias from "../Garantias";
import DatosEquipos from "../DatosEquipos";
import Contratos from "../Contratos";
import FichaTecnica from "../FichaTecnica";
import Ubicaciones from "../Ubicaciones";
import ExtrasEquipos from "../../Mantenimiento/ExtrasEquipos";
import Seguros from "../Seguros";
import ComponentesxEquipo from "../ComponentesxEquipo";
import HojaVidaEquipos from "../HojaVidaEquipos";

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

export default function MenuEquiposFacturacion(props) {
  const { equipoID, equipoCodigo, tipo, idUsu } = props;

  const styles = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const fecha = new Date();
  const ano = fecha.getFullYear();

  const [listGarantia, setListGarantia] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);

  const [modalExtrasEquipos, setModalExtrasEquipos] = useState(false);
  const [modalDatosEquipos, setModalDatosEquipos] = useState(false);
  const [modalGarantias, setModalGarantias] = useState(false);
  const [modalContratos, setModalContratos] = useState(false);
  const [modalFichaTecnica, setModalFichaTecnica] = useState(false);
  const [modalUbicaciones, setModalUbicaciones] = useState(false);
  const [modalSeguros, setModalSeguros] = useState(false);
  const [modalHojaVida, setModalHojaVida] = useState(false);
  const [modalComponentesEquipos, setModalComponentesEquipos] = useState(false);
 
  const abrirCerrarModalDatosEquipos = () => {
    setModalDatosEquipos(!modalDatosEquipos);
  }
  
  const datosequipos = (
    <div>
      <DatosEquipos equipoID={equipoID} equipoCodigo={equipoCodigo} />
    </div>
  )

  const abrirCerrarModalExtrasEquipos = () => {
    setModalExtrasEquipos(!modalExtrasEquipos);
  }
  
  const extrasequipos = (
    <div>
      <ExtrasEquipos equipoID={equipoID} equipoCodigo={equipoCodigo} />
    </div>
  )

  const abrirCerrarModalContratos = () => {
    setModalContratos(!modalContratos);
  }
  
  const contratos = (
    <div>
      <Contratos equipoID={equipoID} equipoCodigo={equipoCodigo} idUsu={idUsu} />
    </div>
  )

  const abrirCerrarModalGarantias = () => {
    setModalGarantias(!modalGarantias);
  }

  const garantias = (
    <div>
      <Garantias equipoID={equipoID} equipoCodigo={equipoCodigo} />
    </div>
  )
  
  const abrirCerrarModalFichaTecnica = () => {
    setModalFichaTecnica(!modalFichaTecnica);
  }

  const fichatecnica = (
    <div>
      <FichaTecnica equipoID={equipoID} equipoCodigo={equipoCodigo} />
    </div>
  )

  const abrirCerrarModalUbicaciones = () => {
    setModalUbicaciones(!modalUbicaciones);
  }

  const ubicaciones = (
    <div> 
      <Ubicaciones equipoID={equipoID} equipoCodigo={equipoCodigo} />
    </div>
  )

  const abrirCerrarModalSeguros = () => {
    setModalSeguros(!modalSeguros);
  }
  
  const seguros = (
    <div> 
      <Seguros equipoID={equipoID} equipoCodigo={equipoCodigo} tipo={tipo} />
    </div>
  )

  const abrirCerrarModalHojaVida = () => {
    setModalHojaVida(!modalHojaVida);
  }

  const hojavida = (
    <HojaVidaEquipos equipoID={equipoID} equipoCodigo={equipoCodigo} />
  )

  const abrirCerrarModalComponentesEquipos = () => {
    setModalComponentesEquipos(!modalComponentesEquipos);
  }
  
  const componentesEquipos = (
    <ComponentesxEquipo equipoID={equipoID} equipoCodigo={equipoCodigo} />
  )

  return (
    <div>
      {/*
      <Modal
        open={modalGarantias}
        onClose={abrirCerrarModalGarantias}
      >
        {garantias}
      </Modal>
    */}
      <Modal
        open={modalDatosEquipos}
        onClose={abrirCerrarModalDatosEquipos}
      >
        {datosequipos}
      </Modal>

      <Modal
        open={modalExtrasEquipos}
        onClose={abrirCerrarModalExtrasEquipos}
      >
        {extrasequipos}
      </Modal>

      <Modal
        open={modalContratos}
        onClose={abrirCerrarModalContratos}
      >
        {contratos}
      </Modal>

      <Modal
        open={modalFichaTecnica}
        onClose={abrirCerrarModalFichaTecnica}
      >
        {fichatecnica}
      </Modal>

      <Modal
        open={modalUbicaciones}
        onClose={abrirCerrarModalUbicaciones}
      >
        {ubicaciones}
      </Modal>

      <Modal
        open={modalSeguros}
        onClose={abrirCerrarModalSeguros}
      >
        {seguros}
      </Modal>

      <Modal
        open={modalHojaVida}
        onClose={abrirCerrarModalHojaVida}
        style={{ overflow: 'scroll' }}
      >
        {hojavida}
      </Modal>

      <Modal
        open={modalComponentesEquipos}
        onClose={abrirCerrarModalComponentesEquipos}
      >
        {componentesEquipos}
      </Modal>


      <Container className={styles.floatingbutton} >
        <Button
          tooltip="Contratos"
          rotate={true}
          styles={{ backgroundColor: darkColors.red, color: lightColors.white }}
          onClick={() => setModalContratos(true)} ><SupervisorAccountIcon />
        </Button>
        <Button
          tooltip="Información Equipos!"
          rotate={true}
          styles={{ backgroundColor: darkColors.lightBlue, color: lightColors.white }}
          onClick={() => alert('Seleccione Información relaciona con la Gestión de los Equipos!')} ><ZoomOutMapIcon /></Button>
      </Container>
    </div>

  );
}
