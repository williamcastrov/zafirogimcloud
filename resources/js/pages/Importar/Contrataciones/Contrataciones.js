import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { Modal, Button, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import 'bootstrap/dist/css/bootstrap.min.css';
import swal from 'sweetalert';
import Moment from 'moment';
import Loading from "../../../components/Loading";

// Componentes de Conexion con el Backend
import contratacionesServices from "../../../services/Importar/Contrataciones";

const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: 1000,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  iconos: {
    cursor: 'pointer'
  },
  inputMaterial: {
    width: '100%'
  },
  formControl: {
    margin: theme.spacing(0),
    minWidth: 290,
    maxWidth: 290,
  },
  formControl2: {
    margin: theme.spacing(0),
    minWidth: 600,
    maxWidth: 600,
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
    margin: 0,
    top: 'auto',
    left: 20,
    bottom: 20,
    right: 'auto',
    position: 'fixed',
  },
  typography: {
    fontSize: 16,
    color: "#ff3d00"
  },
  button: {
    margin: theme.spacing(1),
  },
}));

function Contrataciones() {
  const [progress, setProgress] = React.useState(0);
  const styles = useStyles();
  const [contratacionesMtto, setContrataciones] = useState([]);
  const [ok, setOk] = useState(true);
  const [loading, setLoading] = useState(false);

  const readExcel = (file) => {

    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: "buffer" });

        const wsname = wb.SheetNames[0];

        const ws = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws);

        resolve(data);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((d) => {
      setContrataciones(d);
    });
  };

  const subirContrataciones = () => {

    const addContrataciones = async () => {
      console.log("CONTRATACIONES IMPORTADAS : ", contratacionesMtto);

      var longitud = contratacionesMtto.length;
      console.log("LONGITUD : ", longitud);
      setLoading(true);

      for (var i = 0; i < longitud; i++) {
        const res = await contratacionesServices.importarcontrataciones(contratacionesMtto[i]);

        if (!res.success)
          setOk(false)
      }

      if (ok) {
        setLoading(false);
        swal("Subir Contrataciones", "Archivo de Contrataciones cargado de forma correcta!", "success", { button: "Aceptar" });
        console.log(res.message)
        
        //abrirCerrarModalCancelar();
      }
      else {
        swal("Subir Contrataciones", "Error Subiendo Archivo de contrataciones!", "error", { button: "Aceptar" });
        console.log(res.message);
        //abrirCerrarModalCancelar();
      }
      setLoading(false);
    }
    addContrataciones();
  }

  return (
    <div className="App">
      <div>
        <input type="file" onChange={(e) => {
          const file = e.target.files[0];
          readExcel(file);
        }} />
        <Button variant="contained" color="primary" onClick={() => subirContrataciones()} > Subir Archivo </Button>
        {
          loading ? <Loading /> : null
        }
      </div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Año</th>
            <th scope="col">Mes</th>
            <th scope="col">Periodo</th>
            <th scope="col">Cuenta</th>
            <th scope="col">Nombre Cuenta</th>
            <th scope="col">Nit</th>
            <th scope="col">Nombre Nit</th>
            <th scope="col">DocumentoRef</th>
            <th scope="col">Codigo</th>
            <th scope="col">Fecha</th>
            <th scope="col">Documento</th>
            <th scope="col">Detalle</th>
            <th scope="col">Centrocosto</th>
            <th scope="col">Tipogasto</th>
            <th scope="col">Costomtto</th>
          </tr>
        </thead>
        <tbody>
          {
            contratacionesMtto.map((d) => (
              <tr key={d.id}>
                <th>{d.anno}</th>
                <td>{d.mes}</td>
                <td>{d.periodo}</td>
                <td>{d.cuenta}</td>
                <td>{d.nombrecuenta}</td>
                <td>{d.nit}</td>
                <td>{d.nombrenit}</td>
                <td>{d.documentoref}</td>
                <td>{d.codigo}</td>
                <td>{Moment(d.fecha).format("YYYY/MM/DD")}</td>
                <td>{d.documento}</td>
                <td>{d.detalle}</td>
                <td>{d.centrocosto}</td>
                <td>{d.tipogasto}</td>
                <td>{d.costomtto}</td>
              </tr>
            ))
          }
        </tbody>
      </table>

    </div>
  );
}

export default Contrataciones;
