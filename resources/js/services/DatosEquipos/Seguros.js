import url from "../../components/Url";
const baseUrl = `${url}/api/seguros`;
import axios from "axios";
const seguros = {};

seguros.save = async (data) => {
    const urlSave = baseUrl + "/create"
    const res = await axios.post(urlSave, data)
        .then(response => { return response.data })
        .catch(error => { return error; })
    return res;
}

seguros.listSeguros = async () => {
    const urlList = baseUrl+"/listar_seguros"
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

seguros.listUnSeguro = async (numeroseguro_seg) => {
    const urlList = baseUrl+"/get/"+numeroseguro_seg
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

seguros.update = async (data) => {
    console.log(data);
    const urlUpdate = baseUrl+"/update/"+data.id_seg
    const res = await axios.put(urlUpdate, data)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

seguros.delete = async (id_seg) => {
    const urlDelete = baseUrl+"/delete/"+id_seg
    const res = await axios.delete(urlDelete)
    .then(response=> { return response.data })
    .catch(error =>{ return error })

    return res;
}
  
export default seguros;