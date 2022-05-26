import url from "../../components/Url";
const baseUrl = `${url}/api/novedadesactivos`;
import axios from "axios";
const novedadesactivos = {};
console.log("EN SERVICES");
novedadesactivos.save = async (data) => {
    console.log("DATA : ", data)
    const urlSave = baseUrl + "/create"
    const res = await axios.post(urlSave, data)
        .then(response => { return response.data })
        .catch(error => { return error; })
    return res;
}

novedadesactivos.listnovedadesactivos = async (id_nac) => {
    const urlList = baseUrl+"/listar_novedadesactivos/"+id_nac
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

novedadesactivos.update = async (data) => {
    console.log(data);
    const urlUpdate = baseUrl+"/update/"+data.id_nac
    const res = await axios.put(urlUpdate, data)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

novedadesactivos.delete = async (id_nac) => {
    const urlDelete = baseUrl+"/delete/"+id_nac
    const res = await axios.delete(urlDelete)
    .then(response=> { return response.data })
    .catch(error =>{ return error })

    return res;
}
  
export default novedadesactivos;