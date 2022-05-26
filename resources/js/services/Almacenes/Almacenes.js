import url from "../../components/Url";
const baseUrl = `${url}/api/almacenes`;   
import axios from "axios";
const almacenes = {};

almacenes.save = async (data) => {
    const urlSave = baseUrl + "/create"
    const res = await axios.post(urlSave, data)
        .then(response => { return response.data })
        .catch(error => { return error; })
    return res;
}

almacenes.listAlmacenes = async () => {
    const urlList = baseUrl+"/listar_almacenes"
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

almacenes.update = async (data) => {
    console.log(data);
    const urlUpdate = baseUrl+"/update/"+data.id_alm
    const res = await axios.put(urlUpdate, data)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

almacenes.delete = async (id_alm) => {
    const urlDelete = baseUrl+"/delete/"+id_alm
    const res = await axios.delete(urlDelete)
    .then(response=> { return response.data })
    .catch(error =>{ return error })

    return res;
}
  
export default almacenes;