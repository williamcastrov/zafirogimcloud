import React, { useEffect, useState } from "react";
import VencimientoFacturacion from "../Alertas/VencimientoFacturacion";

import dashboardServices from "../../services/Dashboard";

function DiasFacturacion() {
  
  const [listDashboard, setListDashboard] = useState([]);

  useEffect(() => {
    async function fetchDataDashboard() {
      const res = await dashboardServices.listarDashboard();
      //console.log(res.data);
      setListDashboard(res.data);
      //console.log("LISTADO DASH BOARD : ", listDashboard);
     
    }
    fetchDataDashboard();
  }, [])

  return (
    <div style={{ height: 400, width: '100%' }}>
      <VencimientoFacturacion />
    </div>
  );
}

//  <DataGrid autoHeight rows={listDashboard} columns={columns} pageSize={6} checkboxSelection />


export default DiasFacturacion;
