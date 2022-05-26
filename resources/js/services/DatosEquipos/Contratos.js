import url from "../../components/Url";
const baseUrl = `${url}/api/contratos`;   
import axios from "axios";
const contratos = {};

contratos.save = async (data) => {
    const urlSave = baseUrl + "/create"
    const res = await axios.post(urlSave, data)
        .then(response => { return response.data })
        .catch(error => { return error; })
    return res;
}

contratos.listContratos = async () => {
    const urlList = baseUrl+"/listar_contratos"
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

contratos.listalertasestadoscontratos = async () => {
    const urlList = baseUrl+"/listar_alertasestadoscontratos"
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

contratos.listconsoestcontratos = async (totalcontratos) => {
    const urlList = baseUrl+"/listar_consoestcontratos/"+totalcontratos
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

contratos.sumatotalcontratos = async () => {
    const urlList = baseUrl+"/sumatotalcontratos"
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
       
    return res;
}


contratos.listarvencimientofecha = async () => {
    const urlList = baseUrl+"/listar_vencimientofecha"
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

contratos.listarvencimientofacturas = async () => {
    const urlList = baseUrl+"/listar_vencimientofacturas"
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

contratos.listardetallevencimientofacturas = async (dia) => {
    const urlList = baseUrl+"/listar_detallevencimientofacturas/"+dia
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

contratos.listarvencimientocontratos = async (fecha) => {
    console.log("DATO : ",fecha);
    const urlList = baseUrl+"/listar_vencimientocontratos/"+fecha
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

contratos.listUnContrato = async (equipoID) => {
    console.log(equipoID);
    const urlList = baseUrl+"/get/"+equipoID
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

contratos.leevalorcontratomes = async (codigo) => {
    console.log(equipoID);
    const urlList = baseUrl+"/leevalorcontratomes/"+codigo
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}


contratos.update = async (data) => {
    console.log(data);
    const urlUpdate = baseUrl+"/update/"+data.codigocontrato_ctr
    const res = await axios.put(urlUpdate, data)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

contratos.delete = async (codigocontrato_ctr) => {
    const urlDelete = baseUrl+"/delete/"+codigocontrato_ctr
    const res = await axios.delete(urlDelete)
    .then(response=> { return response.data })
    .catch(error =>{ return error })

    return res;
}
  
export default contratos;