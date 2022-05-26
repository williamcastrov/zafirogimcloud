import url from "../../components/Url";
const baseUrl = `${url}/api/inventarios`;   
import axios from "axios";
const inventarios = {};

inventarios.save = async (data) => {
    const urlSave = baseUrl + "/create"
    const res = await axios.post(urlSave, data)
        .then(response => { return response.data })
        .catch(error => { return error; })
    return res;
}

inventarios.listSaldosalmacen = async () => {
    const urlList = baseUrl+"/listar_saldosalmacen"
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

inventarios.listEntregaEquipos = async () => {
    const urlList = baseUrl+"/listar_chequeoentrega"
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

inventarios.listRecepcionEquipos = async () => {
    const urlList = baseUrl+"/listar_chequeorecepcion"
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

inventarios.listRecepcionAlmacen = async () => {
    const urlList = baseUrl+"/listar_recepcionalmacen"
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

inventarios.listInventarios = async () => {
    const urlList = baseUrl+"/listar_inventarios"
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

inventarios.listReferenciasInventarios = async () => {
    const urlList = baseUrl+"listar_referenciainventarios"
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

inventarios.listUnArticulo = async (id_inv) => {
    const urlList = baseUrl+"/get/"+id_inv
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}


inventarios.update = async (data) => {
    //console.log(data);
    const urlUpdate = baseUrl+"/update/"+data.id_inv
    const res = await axios.put(urlUpdate, data)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

inventarios.delete = async (id_inv) => {
    const urlDelete = baseUrl+"/delete/"+id_inv
    const res = await axios.delete(urlDelete)
    .then(response=> { return response.data })
    .catch(error =>{ return error })

    return res;
}
  
export default inventarios;