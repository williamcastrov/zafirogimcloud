import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { Modal, Button, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import 'bootstrap/dist/css/bootstrap.min.css';
import swal from 'sweetalert';
import Moment from 'moment';
import Loading from "../../../components/Loading";

// Componentes de Conexion con el Backend
import consumosrepuestosServices from "../../../services/Importar/ConsumosRepuestos";

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

function ConsumosRepuestos() {
  const [progress, setProgress] = React.useState(0);
  const styles = useStyles();
  const [contratacionesMtto, setContrataciones] = useState([]);
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
        const res = await consumosrepuestosServices.importarconsumosrepuestos(contratacionesMtto[i]);

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
            <th scope="col">Transacción</th>
            <th scope="col">Concepto</th>
            <th scope="col">Documento</th>
            <th scope="col">Fecha</th>
            <th scope="col">Equipo</th>
            <th scope="col">Codigo</th>
            <th scope="col">Documento</th>
            <th scope="col">Bodega</th>
            <th scope="col">Referencia</th>
            <th scope="col">Descripción</th>
            <th scope="col">Centro de Costo</th>
            <th scope="col">Cantidad</th>
            <th scope="col">Costo Unitario</th>
            <th scope="col">Costo Total</th>
            <th scope="col">Valor Bruto</th>
          </tr>
        </thead>
        <tbody>
          {
            contratacionesMtto.map((d) => (
              <tr key={d.id_cre}>
                <th>{d.anno_cre}</th>
                <td>{d.mes_cre}</td>
                <td>{d.periodo_cre}</td>
                <td>{d.tr_cre}</td>
                <td>{d.concepto_cre}</td>
                <td>{d.documento_cre}</td>
                <td>{d.fecha_cre}</td>   
                <td>{d.idequipo_cre}</td>
                <td>{d.codigo_cre}</td>
                <td>{d.documentodest_cre}</td>
                <td>{d.bodega_cre}</td>
                <td>{d.referencia_cre}</td>
                <td>{d.descripcion_cre}</td>
                <td>{d.centrocosto_cre}</td>
                <td>{d.cantidad_cre}</td>
                <td>{d.costounitario_cre}</td>
                <td>{d.costototal_cre}</td>
                <td>{d.valorbruto_cre}</td>
              </tr>
            ))
          }
        </tbody>
      </table>

    </div>
  );
}

export default ConsumosRepuestos;
