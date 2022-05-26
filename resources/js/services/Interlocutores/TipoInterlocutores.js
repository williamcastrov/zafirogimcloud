import url from "../../components/Url";
const baseUrl = `${url}/api/tipointerlocutor`;   
import axios from "axios";
const tipointerlocutor = {};

tipointerlocutor.save = async (data) => {
    const urlSave = baseUrl + "/create"
    const res = await axios.post(urlSave, data)
        .then(response => { return response.data })
        .catch(error => { return error; })
    return res;
}

tipointerlocutor.listTipoInterlocutor = async () => {
    const urlList = baseUrl+"/listar_tipointerlocutor"
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

tipointerlocutor.update = async (data) => {
    const urlUpdate = baseUrl+"/update/"+data.id_tint
    const res = await axios.put(urlUpdate, data)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

tipointerlocutor.delete = async (id_tint) => {
    const urlDelete = baseUrl+"/delete/"+id_tint
    const res = await axios.delete(urlDelete)
    .then(response=> { return response.data })
    .catch(error =>{ return error })

    return res;
}
  
export default tipointerlocutor;