import url from "../../components/Url";
const baseUrl = `${url}/api/cencostos`;
import axios from "axios";
const cencostos = {};

cencostos.save = async (data) => {
    const urlSave = baseUrl + "/create"
    const res = await axios.post(urlSave, data)
        .then(response => { return response.data })
        .catch(error => { return error; })
    return res;
}

cencostos.listCencostos = async () => {
    const urlList = baseUrl+"/listar_cencostos"
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

cencostos.update = async (data) => {
    console.log(data);
    const urlUpdate = baseUrl+"/update/"+data.id_cco
    const res = await axios.put(urlUpdate, data)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

cencostos.delete = async (id_cco) => {
    const urlDelete = baseUrl+"/delete/"+id_cco
    const res = await axios.delete(urlDelete)
    .then(response=> { return response.data })
    .catch(error =>{ return error })

    return res;
}
  
export default cencostos;