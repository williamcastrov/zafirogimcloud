import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { Modal, TextField, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import FileCopyIcon from '@material-ui/icons/FileCopy';
import swal from 'sweetalert';

import pdfcontratosServices from "../../../services/DatosEquipos/PdfsContratos";

const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: 1400,
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
  typography: {
    fontSize: 16,
    color: "#ff3d00"
  }
}));

function ConsultarPdfsContratos(props) {
  const { codigocontrato } = props;
  console.log("NUMERO CONTRATO : ", codigocontrato)
  const styles = useStyles();
  const [listConsultarPdfsContratos, setListConsultarPdfsContratos] = useState([]);
  const [validar, setValidar] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [actualiza, setActualiza] = useState(false);
  const [PdfContratoSeleccionado, setPdfContratoSeleccionado] = useState({
    id: "",
    type: "",
    name: "",
    nombrecontrato: "",
    fechacontrato: "",
    url: "",
    contrato: ""
  })

  const handleChange = e => {
    const { name, value } = e.target;

    setPdfContratoSeleccionado(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const seleccionarPdfContrato = (pdf, caso) => {
    setPdfContratoSeleccionado(pdf);
    (caso === "Eliminar") ? abrirCerrarModalEliminar() : abrirCerrarModalEliminar()
  }

  const mostrarPdfContrato = (pdf, caso) => {
    //console.log("VALOR PDF : ", pdf)
    if (pdf) {
      mostrarPDF(pdf.name)
    }
  }

  const abrirCerrarModalInsertar = () => {
    setModalInsertar(!modalInsertar);
  }

  const abrirCerrarModalEditar = () => {
    //setModalEditar(!modalEditar);
  }

  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
  }

  useEffect(() => {
    async function fetchDataPdfContratos() {
      const res = await pdfcontratosServices.listpdfscontratos(codigocontrato);
      setListConsultarPdfsContratos(res.data);
      setValidar(res.data);
      setActualiza(false);
    }
    fetchDataPdfContratos();
  }, [actualiza])


  const borrarPdfContrato = async () => {

    const res = await pdfcontratosServices.delete(PdfContratoSeleccionado.id);

    if (res.success) {
      swal({
        title: "Gestión ConsultarPdfsContratos",
        text: "Contrato Borrado de forma Correcta!",
        icon: "success",
        button: "Aceptar"
      });
      console.log(res.message)
      abrirCerrarModalEliminar();
    }
    else {
      swal({
        title: "Gestión ConsultarPdfsContratos",
        text: "Error Borrando el Contrsto!",
        icon: "error",
        button: "Aceptar"
      });
      console.log(res.message);
      abrirCerrarModalEliminar();
    }
    setActualiza(true);
  }

  const columnas = [
    {
      title: 'Id PDF',
      field: 'id',
      type: 'number'
    },
    {
      title: 'Nombre Contrato',
      field: 'nombrecontrato'
    },
    {
      title: 'Fecha Contrato',
      field: 'fechacontrato'
    },
    {
      title: 'Tipo',
      field: 'type'
    },
    {
      title: 'Nombre PDF',
      field: 'name'
    }
  ]

  const mostrarPDF = (nombrepdf) => {
    window.open("https://imagenes.gimcloud.co/" + nombrepdf, "PDF")
  }

  const pdfContratoEliminar = (
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar el PDF del Contrato <b>{PdfContratoSeleccionado && PdfContratoSeleccionado.name}</b>? </p>
      <div align="right">
        <Button color="secondary" onClick={() => borrarPdfContrato()}> Confirmar </Button>
        <Button onClick={() => abrirCerrarModalEliminar()}> Cancelar </Button>

      </div>

    </div>
  )

  return (
    <div className="App">
      <div className={styles.modal}>
        <br />
        <MaterialTable
          columns={columnas}
          data={listConsultarPdfsContratos}
          title="PDF's CONTRATOS"
          actions={[
            {
              icon: FileCopyIcon,
              tooltip: 'Consultar PDF',
              onClick: (event, rowData) => mostrarPdfContrato(rowData, "Consultar")
            },
            {
              icon: 'delete',
              tooltip: 'Borrar Pais',
              onClick: (event, rowData) => seleccionarPdfContrato(rowData, "Eliminar")
            }
          ]}
          options={{
            actionsColumnIndex: -1
          }}
          localization={{
            header: {
              actions: "Acciones"
            }
          }}
        />{ }
      </div>


      <Modal
        open={modalEliminar}
        onClose={abrirCerrarModalEliminar}
      >
        {pdfContratoEliminar}
      </Modal>
    </div>
  );
}

export default ConsultarPdfsContratos;