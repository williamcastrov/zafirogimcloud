import url from "../../components/Url";
const baseUrl = `${url}/api/tiposalmacenes`;   
import axios from "axios";
const tiposalmacenes = {};

tiposalmacenes.save = async (data) => {
    const urlSave = baseUrl + "/create"
    const res = await axios.post(urlSave, data)
        .then(response => { return response.data })
        .catch(error => { return error; })
    return res;
}

tiposalmacenes.listTiposalmacenes = async () => {
    const urlList = baseUrl+"/listar_tiposalmacenes"
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

tiposalmacenes.update = async (data) => {
    console.log(data);
    const urlUpdate = baseUrl+"/update/"+data.id_talm
    const res = await axios.put(urlUpdate, data)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

tiposalmacenes.delete = async (id_talm) => {
    const urlDelete = baseUrl+"/delete/"+id_talm
    const res = await axios.delete(urlDelete)
    .then(response=> { return response.data })
    .catch(error =>{ return error })

    return res;
}
  
export default tiposalmacenes;