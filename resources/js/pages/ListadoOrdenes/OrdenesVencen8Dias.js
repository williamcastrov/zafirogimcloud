import React, { useEffect, useState } from "react";
import { DataGrid } from '@material-ui/data-grid';

import dashboardServices from "../../services/Dashboard";

const columns = [
  { field: 'orden', headerName: 'Orden', width: 100 },
  { field: 'tipomant', headerName: 'Tipo Mantenimiento', width: 180 },
  { field: 'codequipo', headerName: 'Codigo del Equipo', width: 180 },
  { field: 'operario', headerName: 'Nombre del Operario', width: 180 },
  { field: 'cliente', headerName: 'Codigo del Equipo', width: 180 },
  { field: 'descripcion', headerName: 'Descripción', width: 230 },
  {
    field: 'valor',
    headerName: 'Valor',
    type: 'number',
    width: 120,
  },
];

function OrdenesVencen8Dias() {
  
  const [listDashboard, setListDashboard] = useState([]);

  useEffect(() => {
    async function fetchDataDashboard() {
      const res = await dashboardServices.listarDashboard();
      console.log(res.data);
      setListDashboard(res.data);
      console.log(listDashboard);
     
    }
    fetchDataDashboard();
  }, [])

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid autoHeight rows={listDashboard} columns={columns} pageSize={6} checkboxSelection />
    </div>
  );
}

export default OrdenesVencen8Dias;
