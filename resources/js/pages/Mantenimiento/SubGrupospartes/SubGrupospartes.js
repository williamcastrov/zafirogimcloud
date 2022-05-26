import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { Modal, TextField, Button, Select, MenuItem, FormControl, InputLabel, Typography } from "@material-ui/core";
import { green, blue, blueGrey, red } from '@material-ui/core/colors';
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from '@material-ui/icons/Save';
import swal from 'sweetalert';

// Componentes de Conexion con el Backend
import subgrupospartesServices from "../../../services/Mantenimiento/SubGruposPartes";
import gruposequiposServices from "../../../services/Mantenimiento/GruposEquipos";
import estadosServices from "../../../services/Parameters/Estados";
import empresasServices from "../../../services/Empresa";
import unidadesServices from "../../../services/Parameters/Unidades";

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
  formControl: {
    margin: theme.spacing(0),
    minWidth: 315,
  },
  typography: {
    fontSize: 16,
    color: "#ff3d00"
  },
  button: {
    color: theme.palette.getContrastText(blueGrey[500]),
    backgroundColor: green[700],
    margin: theme.spacing(1),
    fontSize: 12,
    '&:hover': {
      backgroundColor: blue[700],
    },
  },
  button2: {
    color: theme.palette.getContrastText(blueGrey[500]),
    backgroundColor: red[700],
    margin: theme.spacing(1),
    fontSize: 12,
    '&:hover': {
      backgroundColor: blue[700],
    },
  },
}));

function SubGrupospartes() {
  const styles = useStyles();
  const [listSubGrupospartes, setListSubGrupospartes] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [formError, setFormError] = useState(false);
  const [listarEmpresas, setListarEmpresas] = useState([]);
  const [listarEstados, setListarEstados] = useState([]);
  const [listarGruposEquipos, setListarGruposEquipos] = useState([]);
  const [listarUnidades, setListarUnidades] = useState([]);
  const [actualiza, setActualiza] = useState(false);
  const [subgrupospartesSeleccionado, setSubGruposPartesSeleccionado] = useState({
    id_sgre: "",
    codigo_sgre: "",
    tipoconsecutivo_sgre:"",
    tipo_sgre:"",
    grupo_sgre: "",
    descripcion_sgre: "",
    empresa_sgre: "",
    estado_sgre: "",
    consecutivo_sgre: ""
  })

  useEffect(() => {
    async function fetchDataSubGrupospartes() {
      const res = await subgrupospartesServices.listSubGrupospartes();
      setListSubGrupospartes(res.data);
      setActualiza(false);
    }
    fetchDataSubGrupospartes();
  }, [actualiza])

  useEffect(() => {
    async function fetchDataGruposequipos() {
      const res = await gruposequiposServices.listGruposequipos();
      setListarGruposEquipos(res.data);
    }
    fetchDataGruposequipos();
  }, [])

  useEffect(() => {
    async function fetchDataEmpresas() {
      const res = await empresasServices.listEmpresas();
      setListarEmpresas(res.data)
      //console.log(res.data);
    }
    fetchDataEmpresas();
  }, [])

  useEffect(() => {
    async function fetchDataEstados() {
      const res = await estadosServices.listEstados();
      setListarEstados(res.data)
      //console.log(res.data);
    }
    fetchDataEstados();
  }, [])

  useEffect(() => {
    async function fetchDataUnidades() {
      const res = await unidadesServices.listTipopartes();
      setListarUnidades(res.data)
      console.log(res.data);
    }
    fetchDataUnidades();
  }, [])

  const handleChange = e => {
    const { name, value } = e.target;

    setSubGruposPartesSeleccionado(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const seleccionarSubGrupoparte = (subgrupoparte, caso) => {
    console.log(subgrupoparte)
    setSubGruposPartesSeleccionado(subgrupoparte);
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

  const grabarSubGrupoequipo = async () => {

    for (var i = 0; i < subgrupospartesSeleccionado.codigo_sgre.length; i++) {
      console.log("La cantidad de : ", i);
    }

    if (i > 4) {
      swal("SubGrupos", "El Codigo del SubGrupo debe tener maximo cuatro Caracteres!", "warning", { button: "Aceptar" });
    } 
    else 
    {
      setFormError({});
      let errors = {};
      let formOk = true;

      if (!subgrupospartesSeleccionado.codigo_sgre) {
        errors.codigo_sgre = true;
        formOk = false;
      }

      if (!subgrupospartesSeleccionado.tipoconsecutivo_sgre) {
        errors.tipoconsecutivo_sgre = true;
        formOk = false;
      }

      if (!subgrupospartesSeleccionado.tipo_sgre) {
        errors.tipo_sgre = true;
        formOk = false;
      }

      if (!subgrupospartesSeleccionado.grupo_sgre) {
        errors.grupo_sgre = true;
        formOk = false;
      }

      if (!subgrupospartesSeleccionado.descripcion_sgre) {
        errors.descripcion_sgre = true;
        formOk = false;
      }

      if (!subgrupospartesSeleccionado.empresa_sgre) {
        errors.empresa_sgre = true;
        formOk = false;
      }

      if (!subgrupospartesSeleccionado.estado_sgre) {
        errors.estado_sgre = true;
        formOk = false;
      }

      if (!subgrupospartesSeleccionado.consecutivo_sgre) {
        errors.consecutivo_sgre = true;
        formOk = false;
      }

      setFormError(errors);

      if (formOk) {
        console.log(subgrupospartesSeleccionado);
        const res = await subgrupospartesServices.save(subgrupospartesSeleccionado);

        if (res.success) {
          swal("SubGrupos", "Creado de forma Correcta!", "success", { button: "Aceptar" });
          console.log(res.message)
          abrirCerrarModalInsertar();
          delete subgrupospartesSeleccionado.codigo_sgre;
          delete subgrupospartesSeleccionado.tipoconsecutivo_sgre;
          delete subgrupospartesSeleccionado.tipo_sgre;
          delete subgrupospartesSeleccionado.grupo_sgre;
          delete subgrupospartesSeleccionado.descripcion_sgre;
          delete subgrupospartesSeleccionado.empresa_sgre;
          delete subgrupospartesSeleccionado.estado_sgre;
          delete subgrupospartesSeleccionado.consecutivo_sgre;
        } else {
          swal("SubGrupos", "Error Creando el SubGrupo del Equipo!", "error", { button: "Aceptar" });
          console.log(res.message);
          abrirCerrarModalInsertar();
        }
      }
      else {
        swal("SubGrupos", "Debe Ingresar Todos los Datos, Revisar Información!", "warning", { button: "Aceptar" });
        console.log(res.message);
        abrirCerrarModalInsertar();
      }
    }
    setActualiza(true);
  }

  const actualizarSubGrupoequipo = async () => {

    for (var i = 0; i < subgrupospartesSeleccionado.codigo_sgre.length; i++) {
      console.log("La cantidad de : ", i);
    }

    if (i > 4) {
      swal("SubGrupos", "El Codigo del SubGrupo debe tener maximo cuatro Caracteres!", "warning", { button: "Aceptar" });
    } 
    else 
    {
      setFormError({});
      let errors = {};
      let formOk = true;

      if (!subgrupospartesSeleccionado.codigo_sgre) {
        errors.codigo_sgre = true;
        formOk = false;
      }

      if (!subgrupospartesSeleccionado.tipoconsecutivo_sgre) {
        errors.tipoconsecutivo_sgre = true;
        formOk = false;
      }
 
      if (!subgrupospartesSeleccionado.tipo_sgre) {
        errors.tipo_sgre = true;
        formOk = false;
      }

      if (!subgrupospartesSeleccionado.grupo_sgre) {
        errors.grupo_sgre = true;
        formOk = false;
      }

      if (!subgrupospartesSeleccionado.descripcion_sgre) {
        errors.descripcion_sgre = true;
        formOk = false;
      }

      if (!subgrupospartesSeleccionado.empresa_sgre) {
        errors.empresa_sgre = true;
        formOk = false;
      }

      if (!subgrupospartesSeleccionado.estado_sgre) {
        errors.estado_sgre = true;
        formOk = false;
      }

      if (!subgrupospartesSeleccionado.consecutivo_sgre) {
        errors.consecutivo_sgre = true;
        formOk = false;
      }

      setFormError(errors);

      if (formOk) {

        const res = await subgrupospartesServices.update(subgrupospartesSeleccionado);

        if (res.success) {
          swal("SubGrupos", "Actualizado de forma Correcta!", "success", { button: "Aceptar" });
          console.log(res.message)
          abrirCerrarModalEditar();
          delete subgrupospartesSeleccionado.codigo_sgre;
          delete subgrupospartesSeleccionado.tipoconsecutivo_sgre;
          delete subgrupospartesSeleccionado.tipo_sgre;
          delete subgrupospartesSeleccionado.grupo_sgre;
          delete subgrupospartesSeleccionado.descripcion_sgre;
          delete subgrupospartesSeleccionado.empresa_sgre;
          delete subgrupospartesSeleccionado.estado_sgre;
          delete subgrupospartesSeleccionado.consecutivo_sgre;
        } else {
          swal("SubGrupos", "Error Actualizando SubGrupo del Equipo!", "error", { button: "Aceptar" });
          console.log(res.message);
          abrirCerrarModalEditar();
        }
      }
      else {
        swal("SubGrupos", "Debe Ingresar Todos los Datos, Revisar Información!", "warning", { button: "Aceptar" });
        console.log(res.message);
        abrirCerrarModalEditar();
      }
    }
    setActualiza(true);
  }

  const borrarSubGrupoequipo = async () => {

    const res = await subgrupospartesServices.delete(subgrupospartesSeleccionado.id_sgre);

    if (res.success) {
      swal("SubGrupos", "Borrado de forma Correcta!", "success", { button: "Aceptar" });
      console.log(res.message)
      abrirCerrarModalEliminar();
    }
    else {
      swal("SubGrupos", "Error Borrando el SubGrupo del Equipo!", "error", { button: "Aceptar" });
      console.log(res.message);
      abrirCerrarModalEliminar();
    }
    setActualiza(true);
  }
  // "string","boolean","numeric","date","datetime","time","currency"
  const columnas = [
    {
      title: 'Id',
      field: 'id_sgre'
    },
    {
      title: 'SubGrupo',
      field: 'codigo_sgre'
    },
    {
      title: 'Tipo',
      field: 'tipo_sgre'
    },
    {
      title: 'Descripcion',
      field: 'descripcion_sgre'
    },
    {
      title: 'Grupo',
      field: 'descripcion_grp'
    },
   
    {
      title: 'Código',
      field: 'empresa_sgre'
    },
    {
      title: 'Tipo Consecutivo',
      field: 'tipoconsecutivo_sgre'
    },
    {
      title: 'Consecutivo',
      field: 'consecutivo_sgre'
    },
    {
      title: 'Estado',
      field: 'estado_sgre'
    },
    {
      title: 'Nombre Estado',
      field: 'nombre_est'
    }
  ]

  const subgrupoequipoInsertar = (
    <div className={styles.modal}>
      <Typography align="center" className={styles.typography} variant="button" display="block">Agregar SubGrupos de Partes </Typography>
      <TextField className={styles.inputMaterial} label="Código" name="codigo_sgre" onChange={handleChange} />
      <br />
      <FormControl className={styles.formControl}>
        <InputLabel id="idselectTipo">Tipo</InputLabel>
        <Select
          labelId="selectTipo"
          name="tipo_sgre"
          id="idselectTipo"
          onChange={handleChange}
        >
           <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarUnidades.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.tipo_und}>{itemselect.descripcion_und}</MenuItem>
                  )
                })
              }
        </Select>
      </FormControl>
      <br />
      <FormControl className={styles.formControl}>
        <InputLabel id="idselectGrupo">Grupo Equipo</InputLabel>
        <Select
          labelId="selectGrupo"
          name="grupo_sgre"
          id="idselectGrupo"
          onChange={handleChange}
        >
          <MenuItem value="">  <em>None</em> </MenuItem>
          {
            listarGruposEquipos.map((itemselect) => {
              return (
                <MenuItem value={itemselect.id_grp}>{itemselect.descripcion_grp}</MenuItem>
              )
            })
          }
        </Select>
      </FormControl>
      <br />
      <TextField className={styles.inputMaterial} label="Tipo Consecutivo" name="tipoconsecutivo_sgre" onChange={handleChange} />
      <br />
      <TextField className={styles.inputMaterial} type="numeric" label="Consecutivo" name="consecutivo_sgre" onChange={handleChange} />
      <br />
      <TextField className={styles.inputMaterial} label="Descripción" name="descripcion_sgre" onChange={handleChange} />
      <br />
      <FormControl className={styles.formControl}>
        <InputLabel id="idselectEmpresa">Empresa</InputLabel>
        <Select
          labelId="selectEmpresa"
          name="empresa_sgre"
          id="idselectEmpresa"
          onChange={handleChange}
        >
          <MenuItem value="">  <em>None</em> </MenuItem>
          {
            listarEmpresas.map((itemselect) => {
              return (
                <MenuItem value={itemselect.id_emp}>{itemselect.nombre_emp}</MenuItem>
              )
            })
          }
        </Select>
      </FormControl>
      <br />
      <FormControl className={styles.formControl}>
        <InputLabel id="idselectEstado">Estado</InputLabel>
        <Select
          labelId="selectEstado"
          name="estado_sgre"
          id="idselectEstado"
          onChange={handleChange}
        >
          <MenuItem value=""> <em>None</em> </MenuItem>
          {
            listarEstados.map((itemselect) => {
              return (
                <MenuItem value={itemselect.id_est}>{itemselect.nombre_est}</MenuItem>
              )
            })
          }
        </Select>
      </FormControl>
      <br /><br />
      <div align="right">
        <Button className={styles.button} color="primary" onClick={() => grabarSubGrupoequipo()} >Insertar</Button>
        <Button className={styles.button2} onClick={() => abrirCerrarModalInsertar()} >Cancelar</Button>
      </div>
    </div>
  )

  const subgrupoequipoEditar = (
    <div className={styles.modal}>
      <Typography align="center" className={styles.typography} variant="button" display="block">Actualizar SubGrupos de Partes </Typography>
      <TextField className={styles.inputMaterial} label="Codigo" name="codigo_sgre" onChange={handleChange} value={subgrupospartesSeleccionado && subgrupospartesSeleccionado.codigo_sgre} />
      <br />
      <FormControl className={styles.formControl}>
        <InputLabel id="idselectTipo">Tipo</InputLabel>
        <Select
          labelId="selectTipo"
          name="tipo_sgre"
          id="idselectTipo"
          onChange={handleChange}
          value={subgrupospartesSeleccionado && subgrupospartesSeleccionado.tipo_sgre} 
        >
           <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarUnidades.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.tipo_und}>{itemselect.descripcion_und}</MenuItem>
                  )
                })
              }
        </Select>
      </FormControl>
      <br />
      <FormControl className={styles.formControl}>
        <InputLabel id="idselectGrupo">Grupo Equipo</InputLabel>
        <Select
          labelId="selectGrupo"
          name="grupo_sgre"
          id="idselectGrupo"
          value={subgrupospartesSeleccionado && subgrupospartesSeleccionado.grupo_sgre} 
        >
          <MenuItem value="">  <em>None</em> </MenuItem>
          {
            listarGruposEquipos.map((itemselect) => {
              return (
                <MenuItem value={itemselect.id_grp}>{itemselect.descripcion_grp}</MenuItem>
              )
            })
          }
        </Select>
      </FormControl>
      <br />
      <TextField className={styles.inputMaterial} label="Tipo Consecutivo" name="tipoconsecutivo_sgre" onChange={handleChange} 
          value={subgrupospartesSeleccionado && subgrupospartesSeleccionado.tipoconsecutivo_sgre}  />
      <br />
      <TextField className={styles.inputMaterial} type="numeric" label="Consecutivo" name="consecutivo_sgre" onChange={handleChange} 
          value={subgrupospartesSeleccionado && subgrupospartesSeleccionado.consecutivo_sgre}  />
      <br />
      <TextField className={styles.inputMaterial} label="Descripción" name="descripcion_sgre" onChange={handleChange} 
          value={subgrupospartesSeleccionado && subgrupospartesSeleccionado.descripcion_sgre} />
      <br />
      <FormControl className={styles.formControl}>
        <InputLabel id="idselectEmpresa">Empresa</InputLabel>
        <Select
          labelId="selectEmpresa"
          name="empresa_sgre"
          id="idselectEmpresa"
          onChange={handleChange}
          value={subgrupospartesSeleccionado && subgrupospartesSeleccionado.empresa_sgre}
        >
          <MenuItem value="">  <em>None</em> </MenuItem>
          {
            listarEmpresas.map((itemselect) => {
              return (
                <MenuItem value={itemselect.id_emp}>{itemselect.nombre_emp}</MenuItem>
              )
            })
          }
        </Select>
      </FormControl>
      <br />
      <FormControl className={styles.formControl}>
        <InputLabel id="idselectEstado">Estado</InputLabel>
        <Select
          labelId="selectEstado"
          name="estado_sgre"
          id="idselectEstado"
          onChange={handleChange}
          value={subgrupospartesSeleccionado && subgrupospartesSeleccionado.estado_sgre}
        >
          <MenuItem value=""> <em>None</em> </MenuItem>
          {
            listarEstados.map((itemselect) => {
              return (
                <MenuItem value={itemselect.id_est}>{itemselect.nombre_est}</MenuItem>
              )
            })
          }
        </Select>
      </FormControl>
      <br /><br />
      <div align="right">
        <Button className={styles.button} color="primary" onClick={() => actualizarSubGrupoequipo()} >Editar</Button>
        <Button className={styles.button2} onClick={() => abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  const subgrupoequipoEliminar = (
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar el Sub Grupo del Equipo <b>{subgrupospartesSeleccionado && subgrupospartesSeleccionado.descripcion_sgre}</b>? </p>
      <div align="right">
        <Button className={styles.button} color="secondary" onClick={() => borrarSubGrupoequipo()}> Confirmar </Button>
        <Button className={styles.button2} onClick={() => abrirCerrarModalEliminar()}> Cancelar </Button>
      </div>
    </div>
  )

  return (
    <div className="App">
      <br />
      <Button variant="contained" startIcon={<SaveIcon />} color="primary" onClick={() => abrirCerrarModalInsertar()} >Agregar SubGrupos de Partes</Button>
      <MaterialTable
        columns={columnas}
        data={listSubGrupospartes}
        title="SUBGRUPOS DE PARTES"
        actions={[
          {
            icon: 'edit',
            tooltip: 'Editar Tipo SubGrupo',
            onClick: (event, rowData) => seleccionarSubGrupoparte(rowData, "Editar")
          },
          {
            icon: 'delete',
            tooltip: 'Borrar Tipo SubGrupo',
            onClick: (event, rowData) => seleccionarSubGrupoparte(rowData, "Eliminar")
          }
        ]}
        options={{
          actionsColumnIndex: -1,
          exportButton: true
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
        {subgrupoequipoInsertar}
      </Modal>

      <Modal
        open={modalEditar}
        onClose={abrirCerrarModalEditar}
      >
        {subgrupoequipoEditar}
      </Modal>

      <Modal
        open={modalEliminar}
        onClose={abrirCerrarModalEliminar}
      >
        {subgrupoequipoEliminar}
      </Modal>
    </div>
  );
}

export default SubGrupospartes;