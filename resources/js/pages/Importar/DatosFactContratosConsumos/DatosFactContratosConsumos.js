import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { Modal, Button, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import 'bootstrap/dist/css/bootstrap.min.css';
import swal from 'sweetalert';
import Moment from 'moment';
import Loading from "../../../components/Loading";

// Componentes de Conexion con el Backend
import datosFacturacionServices from "../../../services/Importar/DatosFactContratosConsumos";

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

function DatosFactContratosConsumos() {
  const [progress, setProgress] = React.useState(0);
  const styles = useStyles();
  const [datosFacturacion, setDatosFacturacion] = useState([]);
  const [ok, setOk] = useState(true);
  const [loading, setLoading] = useState(false);

  const readExcel = (file) => {
  //console.log("FILE : ", file)
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
      setDatosFacturacion(d);
    });
  };

  const subirFacturacion = () => {

    const addFacturas = async () => {
      console.log("FACTURACION IMPORTADAS : ", datosFacturacion);

      var longitud = datosFacturacion.length;
      console.log("LONGITUD : ", longitud);
      setLoading(true);

      for (var i = 0; i < longitud; i++) {
        const res = await datosFacturacionServices.save(datosFacturacion[i]);

        if (!res.success)
          setOk(false)
      }

      if (ok) {
        setLoading(false);
        swal("Subir Facturación", "Archivo de Facturación cargado de forma correcta!", "success", { button: "Aceptar" });
        console.log(res.message)
        
        //abrirCerrarModalCancelar();
      }
      else {
        swal("Subir Facturación", "Error Subiendo Archivo de Facturación!", "error", { button: "Aceptar" });
        console.log(res.message);
        //abrirCerrarModalCancelar();
      }
      setLoading(false);
  
    }
    addFacturas();
  }

  return (
    <div className="App">
      <div>
        <input type="file" onChange={(e) => {
          const file = e.target.files[0];
          readExcel(file);
        }} />
        <Button variant="contained" color="primary" onClick={() => subirFacturacion()} > Subir Archivo </Button>
        {
          loading ? <Loading /> : null
        }
      </div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">id_equipo</th>
            <th scope="col">codigomt</th>
            <th scope="col">descripcionmt</th>
            <th scope="col">anno</th>
            <th scope="col">mes</th>
            <th scope="col">periodo</th>
            <th scope="col">codigomtanno</th>
            <th scope="col">codigomtanno</th>
            <th scope="col">valorconsumo</th>
            <th scope="col">valorrentames</th>
            <th scope="col">valorcontratos</th>
          </tr>
        </thead>
        <tbody>
          {
            datosFacturacion.map((d) => (
              <tr key={d.id_equipo}>
                <td>{d.idequipo}</td>
                <td>{d.codigomt}</td>
                <td>{d.descripcionmt}</td>
                <td>{d.anno}</td>
                <td>{d.mes}</td>
                <td>{d.periodo}</td>
                <td>{d.codigomtanno}</td>
                <td>{d.codigoperiodo}</td>
                <td>{d.valorconsumo}</td>
                <td>{d.valorrentames}</td>
                <td>{d.valorcontratos}</td>
              </tr>
            ))
          }
        </tbody>
      </table>

    </div>
  );
}

export default DatosFactContratosConsumos;
