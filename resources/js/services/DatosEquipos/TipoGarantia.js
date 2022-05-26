import url from "../../components/Url";
const baseUrl = `${url}/api/tipogarantia`;
import axios from "axios";
const tipogarantia = {};

tipogarantia.save = async (data) => {
    const urlSave = baseUrl + "/create"
    const res = await axios.post(urlSave, data)
        .then(response => { return response.data })
        .catch(error => { return error; })
    return res;
}

tipogarantia.listTipogarantia = async () => {
    const urlList = baseUrl+"/listar_tipogarantia"
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

tipogarantia.update = async (data) => {
    console.log(data);
    const urlUpdate = baseUrl+"/update/"+data.id_tga
    const res = await axios.put(urlUpdate, data)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

tipogarantia.delete = async (id_tga) => {
    const urlDelete = baseUrl+"/delete/"+id_tga
    const res = await axios.delete(urlDelete)
    .then(response=> { return response.data })
    .catch(error =>{ return error })

    return res;
}
  
export default tipogarantia;