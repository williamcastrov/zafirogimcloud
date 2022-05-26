import url from "../../components/Url";
const baseUrl = `${url}/api/proveedores`;   
import axios from "axios";
const proveedores = {};

proveedores.save = async (data) => {
    const urlSave = baseUrl + "/create"
    const res = await axios.post(urlSave, data)
        .then(response => { return response.data })
        .catch(error => { return error; })
    return res;
}

proveedores.listProveedores = async () => {
    const urlList = baseUrl+"/listar_proveedores"
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

proveedores.listProveedoresServMtto = async () => {
    const urlList = baseUrl+"/listar_prestadoresservmtto"
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

proveedores.update = async (data) => {
    console.log(data);
    const urlUpdate = baseUrl+"/update/"+data.id_int
    const res = await axios.put(urlUpdate, data)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

proveedores.delete = async (id_int) => {
    const urlDelete = baseUrl+"/delete/"+id_int
    const res = await axios.delete(urlDelete)
    .then(response=> { return response.data })
    .catch(error =>{ return error })

    return res;
}
  
export default proveedores;