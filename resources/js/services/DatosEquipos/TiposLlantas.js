import url from "../../components/Url";
const baseUrl = `${url}/api/tiposllantas`;
import axios from "axios";
const tiposllantas = {};

tiposllantas.save = async (data) => {
    const urlSave = baseUrl + "/create"
    const res = await axios.post(urlSave, data)
        .then(response => { return response.data })
        .catch(error => { return error; })
    return res;
}

tiposllantas.listTiposLlantas = async () => {
    const urlList = baseUrl+"/listar_tiposllantas"
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

tiposllantas.update = async (data) => {
    console.log(data);
    const urlUpdate = baseUrl+"/update/"+data.id_llan
    const res = await axios.put(urlUpdate, data)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

tiposllantas.delete = async (id_llan) => {
    const urlDelete = baseUrl+"/delete/"+id_llan
    const res = await axios.delete(urlDelete)
    .then(response=> { return response.data })
    .catch(error =>{ return error })

    return res;
}
  
export default tiposllantas;