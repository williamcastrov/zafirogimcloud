import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { Modal, TextField, Button, Select, MenuItem, FormControl, InputLabel, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from '@material-ui/icons/Save';
import swal from 'sweetalert';

import rentabilidadServices from "../../../../services/Importar/ConceptosRentabilidad";
import estadosServices from "../../../../services/Parameters/Estados";

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
  iconos: {
    cursor: 'pointer'
  },
  inputMaterial: {
    width: '100%'
  },
  typography: {
    fontSize: 16,
    color: "#ff3d00"
  },
  formControl: {
    margin: theme.spacing(0),
    minWidth: 315,
  }
}));

function ConceptosRentabilidad() {
  const styles = useStyles();
  const [listConceptos, setListConceptos] = useState([]);
  const [listEstados, setListEstados] = useState([]);
  const [validar, setValidar] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [estado, setEstado] = useState("");
  const [formError, setFormError] = useState(false);
  const [actualiza, setActualiza] = useState(false);
  const [conceptosSeleccionado, setConceptosSeleccionado] = useState({
    id_rtb: "",
    nombre_rtb: "",
    estado_rtb: "",
    tipo_rtb: ""
  })

  useEffect(() => {
    async function fetchDataConceptos() {
      const res = await rentabilidadServices.listconceptosrentabilidad();
      setListConceptos(res.data);
      if(res.data.tipo_rtb = 1){
        setEstado("Suma")
      }else{
        setEstado("Resta")
      }
      setActualiza(false);
    }
    fetchDataConceptos();
  }, [actualiza])

  useEffect(() => {
    async function fetchDataEstados() {
      const res = await estadosServices.listEstadosGenerales();
      setListEstados(res.data);
    }
    fetchDataEstados();
  }, [])

  const handleChange = e => {
    const { name, value } = e.target;

    setConceptosSeleccionado(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const seleccionarConceptos = (conceptos, caso) => {
    setConceptosSeleccionado(conceptos);
    (caso === "Editar") ? abrirCerrarModalEditar() : abrirCerrarModalEliminar()
  }

  const abrirCerrarModalInsertar = () => {
    setModalInsertar(!modalInsertar);
  }

  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
  }

  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
  }

  const grabarConceptos = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;

    if (!conceptosSeleccionado.nombre_rtb) {
      errors.nombre_rtb = true;
      formOk = false;
    }

    if (!conceptosSeleccionado.estado_rtb) {
      errors.estado_rtb = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
      const res = await rentabilidadServices.save(conceptosSeleccionado);

      if (res.success) {
        swal({
          title: "Conceptos Rentabilidad",
          text: "Concepto Rentabilidad Creado de forma Correcta!",
          icon: "success",
          button: "Aceptar"
        });
        console.log(res.message)
        abrirCerrarModalInsertar();
        delete conceptosSeleccionado.nombre_rtb;
        delete conceptosSeleccionado.estado_rtb;
      } else {
        swal({
          title: "Conceptos Rentabilidad",
          text: "Error Creando el Concepto Rentabilidad!",
          icon: "error",
          button: "Aceptar"
        });
        console.log(res.message);
        abrirCerrarModalInsertar();
      }
    }
    else {
      swal({
        title: "Conceptos Rentabilidad",
        text: "Debe ingresar todos los datos, Error creando el Concepto!",
        icon: "warning",
        button: "Aceptar"
      });
      console.log(res.message);
      abrirCerrarModalInsertar();
    }
    setActualiza(true);
  }

  const actualizarConcepto = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;

    if (!conceptosSeleccionado.nombre_rtb) {
      errors.nombre_rtb = true;
      formOk = false;
    }

    if (!conceptosSeleccionado.estado_rtb) {
      errors.estado_rtb = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
      const res = await rentabilidadServices.update(conceptosSeleccionado);
      console.log("CONCEPTOS RETENCION : ",conceptosSeleccionado);

      if (res.success) {
        swal({
          title: "Conceptos Rentabilidad",
          text: "Concepto Actualizado de forma Correcta!",
          icon: "success",
          button: "Aceptar"
        });
        console.log(res.message)
        abrirCerrarModalEditar();
        delete conceptosSeleccionado.nombre_rtb;
        delete conceptosSeleccionado.estado_rtb;
      } else {
        swal({
          title: "Conceptos Rentabilidad",
          text: "Error Actualizando el Concepto!",
          icon: "error",
          button: "Aceptar"
        });
        console.log(res.message);
        abrirCerrarModalEditar();
      }
    }
    else {
      console.log(res.message);
      abrirCerrarModalEditar();
    }
    setActualiza(true);
  }

  const borrarConcepto = async () => {

    const res = await rentabilidadServices.delete(conceptosSeleccionado.id_pai);

    if (res.success) {
      swal({
        title: "Conceptos Rentabilidad",
        text: "Concepto Borrada de forma Correcta!",
        icon: "success",
        button: "Aceptar"
      });
      console.log(res.message)
      abrirCerrarModalEliminar();
    }
    else {
      swal({
        title: "Conceptos Rentabilidad",
        text: "Error brorrando el Concepto!",
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
      title: 'Id',
      field: 'id_rtb',
      type: 'number'
    },
    {
      title: 'Descripción',
      field: 'nombre_rtb'
    },
    {
      title: 'Tipo Concepto',
      field: 'tipo_rtb'
    },
    {
      title: 'Estado',
      field: 'nombre_est'
    }
  ]

  const conceptoInsertar = (
    <div className={styles.modal}>
      <Typography align="center" className={styles.typography} variant="button" display="block" >
        Agregar Conceptos Rentabilidad
      </Typography>
      <TextField className={styles.inputMaterial} label="Descripción" name="nombre_rtb" onChange={handleChange} />
      <br />
      <FormControl className={styles.formControl}>
        <InputLabel id="idselectTipo" >Tipo Concepto</InputLabel>
        <Select
          labelId="selecTipo"
          name="tipo_rtb"
          id="idselectTipo"
          fullWidth
          onChange={handleChange}
        >
          <MenuItem value=""> <em>None</em> </MenuItem>
          <MenuItem value="Suma">Suma</MenuItem>
          <MenuItem value="Resta">Resta</MenuItem>
        </Select>
      </FormControl>
      <br />
      <FormControl className={styles.formControl}>
        <InputLabel id="idselectEstado">Estado</InputLabel>
        <Select
          labelId="selectEstado"
          name="estado_rtb"
          id="idselectEstado"
          onChange={handleChange}
        >
          <MenuItem value=""> <em>None</em> </MenuItem>
          {
            listEstados.map((itemselect) => {
              return (
                <MenuItem value={itemselect.id_est}>{itemselect.nombre_est}</MenuItem>
              )
            })
          }
        </Select>
      </FormControl>
      <br /><br />
      <div align="right">
        <Button color="primary" onClick={() => grabarConceptos()} >Insertar</Button>
        <Button onClick={() => abrirCerrarModalInsertar()} >Cancelar</Button>
      </div>
    </div>
  )

  const conceptoEditar = (
    <div className={styles.modal}>
      <Typography align="center" className={styles.typography} variant="button" display="block" >
        Actualizar Concepto Retención
      </Typography>
      <TextField className={styles.inputMaterial} label="Descripción" name="nombre_rtb" onChange={handleChange} value={conceptosSeleccionado && conceptosSeleccionado.nombre_rtb} />
      <br />
      <br />
      <FormControl className={styles.formControl}>
        <InputLabel id="idselectTipo" >Tipo Concepto</InputLabel>
        <Select
          labelId="selecTipo"
          name="tipo_rtb"
          id="idselectTipo"
          fullWidth
          onChange={handleChange}
          value={conceptosSeleccionado && conceptosSeleccionado.tipo_rtb}
        >
          <MenuItem value=""> <em>None</em> </MenuItem>
          <MenuItem value="Suma">Suma</MenuItem>
          <MenuItem value="Resta">Resta</MenuItem>
        </Select>
      </FormControl>
      <br />
      <FormControl className={styles.formControl}>
        <InputLabel id="idselectEstado">Estado</InputLabel>
        <Select
          labelId="selectEstado"
          name="estado_rtb"
          id="idselectEstado"
          onChange={handleChange}
          value={conceptosSeleccionado && conceptosSeleccionado.estado_rtb}
        >
          <MenuItem value=""> <em>None</em> </MenuItem>
          {
            listEstados.map((itemselect) => {
              return (
                <MenuItem value={itemselect.id_est}>{itemselect.nombre_est}</MenuItem>
              )
            })
          }
        </Select>
      </FormControl>
      <br /><br />
      <div align="right">
        <Button color="primary" onClick={() => actualizarConcepto()} >Editar</Button>
        <Button onClick={() => abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  const conceptoEliminar = (
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar el Concepto de Rentabilidad <b>{conceptosSeleccionado && conceptosSeleccionado.nombre_rtb}</b>? </p>
      <div align="right">
        <Button color="secondary" onClick={() => borrarConcepto()}> Confirmar </Button>
        <Button onClick={() => abrirCerrarModalEliminar()}> Cancelar </Button>
      </div>
    </div>
  )

  return (
    <div className="App">
      <br />
      <Button variant="contained" startIcon={<SaveIcon />} color="primary" onClick={() => abrirCerrarModalInsertar()} >Agregar Concepto</Button>
      <MaterialTable
        columns={columnas}
        data={listConceptos}
        title="CONCEPTOS PARA CALCULO RENTABILIDAD"
        actions={[
          {
            icon: 'edit',
            tooltip: 'Editar Concepto',
            onClick: (event, rowData) => seleccionarConceptos(rowData, "Editar")
          },
          {
            icon: 'delete',
            tooltip: 'Borrar Concepto',
            onClick: (event, rowData) => seleccionarConceptos(rowData, "Eliminar")
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
      <Modal
        open={modalInsertar}
        onClose={abrirCerrarModalInsertar}
      >
        {conceptoInsertar}
      </Modal>

      <Modal
        open={modalEditar}
        onClose={abrirCerrarModalEditar}
      >
        {conceptoEditar}
      </Modal>

      <Modal
        open={modalEliminar}
        onClose={abrirCerrarModalEliminar}
      >
        {conceptoEliminar}
      </Modal>
    </div>
  );
}

export default ConceptosRentabilidad;

//onClick={peticionDelete}