import url from "../../components/Url";
const baseUrl = `${url}/api/costosvariables`;   
import axios from "axios";
const costosvariables = {};

costosvariables.save = async (data) => {
    const urlSave = baseUrl + "/create"
    const res = await axios.post(urlSave, data)
        .then(response => { return response.data })
        .catch(error => { return error; })
    return res;
}

costosvariables.listcostosvariables = async () => {
    const urlList = baseUrl+"/listar_costosvariables"
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

costosvariables.listUnDatoHorometro = async (id_cvp) => {
    const urlList = baseUrl+"/get/"+id_cvp
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

costosvariables.update = async (data) => {
    console.log(data);
    const urlUpdate = baseUrl+"/update/"+data.id_cvp
    const res = await axios.put(urlUpdate, data)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

costosvariables.delete = async (id_cvp) => {
    const urlDelete = baseUrl+"/delete/"+id_cvp
    const res = await axios.delete(urlDelete)
    .then(response=> { return response.data })
    .catch(error =>{ return error })

    return res;
}
  
export default costosvariables;