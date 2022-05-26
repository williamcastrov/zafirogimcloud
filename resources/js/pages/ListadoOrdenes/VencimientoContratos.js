import React, { useEffect, useState } from "react";
import AlzasContratos from "../Alertas/AlzasContratos";

import dashboardServices from "../../services/Dashboard";

function VencimientoContratos() {
  
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
      <AlzasContratos />
    </div>
  );
}

//  <DataGrid autoHeight rows={listDashboard} columns={columns} pageSize={6} checkboxSelection />


export default VencimientoContratos;
