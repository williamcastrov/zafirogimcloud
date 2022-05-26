import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { Modal, Button, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import 'bootstrap/dist/css/bootstrap.min.css';
import swal from 'sweetalert';

// Componentes de Conexion con el Backend
import crearordenesServices from "../../../services/GestionOrdenes/CrearOrdenes";
import contactosServices from "../../../services/Interlocutores/Contactos";
import cumplimientooservServices from "../../../services/GestionOrdenes/CumplimientoOserv";
import importarinventarioServices from "../../../services/Almacenes/ImportarInventarios";
import importarinventario from "../../../services/Almacenes/ImportarInventarios";

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

function InventariosAlmacen() {
  const styles = useStyles();
  const [inventariosAlmacen, setInventariosAlmacen] = useState([]);
  const [ok, setOk] = useState(true);

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
      setInventariosAlmacen(d);
    });
  };

  const subirInventarios = () => {
 
    const inventario = async () => {
    console.log("INVENTARIO IMPORTADO : ",inventariosAlmacen);

    var longitud = inventariosAlmacen.length;

    for (var i = 0; i < longitud; i++) {
      const res = await importarinventarioServices.importarinventario(inventariosAlmacen[i]);
    
      if(!res.success)
        setOk(false)
    }

    if (ok) {
      swal("Subir Inventario", "Inventario cargado de forma correcta!", "success", { button: "Aceptar" });
      console.log(res.message)
      //abrirCerrarModalCancelar();
    }
    else {
      swal("Subir Inventario", "Error Subiendo el inventario de respuestos!", "error", { button: "Aceptar" });
      console.log(res.message);
      //abrirCerrarModalCancelar();
    }
  }
  inventario();
}



  return (
    <div className="App">
      <input type="file" onChange={(e) => {
        const file = e.target.files[0];
        readExcel(file);
      }} />
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Items</th>
            <th scope="col">Descripción</th>
            <th scope="col">UM</th>
            <th scope="col">ProductCode</th>
          </tr>
        </thead>
        <tbody>
          {
            inventariosAlmacen.map((d) => (
              <tr key={d.item}>
                <th>{d.item}</th>
                <td>{d.description}</td>
                <td>{d.um}</td>
                <td>{d.productcode}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <Button onClick={() => subirInventarios()} > Subir Archivo </Button>
    </div>
  );
}

export default InventariosAlmacen;
