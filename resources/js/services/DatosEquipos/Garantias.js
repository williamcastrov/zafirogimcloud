import url from "../../components/Url";
const baseUrl = `${url}/api/garantias`;   
import axios from "axios";
const garantias = {};

garantias.save = async (data) => {
    const urlSave = baseUrl + "/create"
    const res = await axios.post(urlSave, data)
        .then(response => { return response.data })
        .catch(error => { return error; })
    return res;
}

garantias.listGarantias = async () => {
    const urlList = baseUrl+"/listar_garantias"
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

garantias.listUnaGarantia = async (equipoID) => {
    console.log(equipoID);
    const urlList = baseUrl+"/get/"+equipoID
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

garantias.update = async (data) => {
    console.log(data);
    const urlUpdate = baseUrl+"/update/"+data.id_gar
    const res = await axios.put(urlUpdate, data)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

garantias.delete = async (id_gar) => {
    const urlDelete = baseUrl+"/delete/"+id_gar
    const res = await axios.delete(urlDelete)
    .then(response=> { return response.data })
    .catch(error =>{ return error })

    return res;
}
  
export default garantias;