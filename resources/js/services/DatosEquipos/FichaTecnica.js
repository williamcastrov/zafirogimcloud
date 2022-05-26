import url from "../../components/Url";
const baseUrl = `${url}/api/fichatecnica`;   
import axios from "axios";
const fichatecnica = {};

fichatecnica.save = async (data) => {
    const urlSave = baseUrl + "/create"
    const res = await axios.post(urlSave, data)
        .then(response => { return response.data })
        .catch(error => { return error; })
    return res;
}

fichatecnica.listFichaTecnica = async () => {
    const urlList = baseUrl+"/listar_fichatecnica"
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

fichatecnica.listUnaFichaTecnica = async (equipoID) => {
    console.log(equipoID);
    const urlList = baseUrl+"/get/"+equipoID
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

fichatecnica.update = async (data) => {
    console.log(data);
    const urlUpdate = baseUrl+"/update/"+data.id_fit
    const res = await axios.put(urlUpdate, data)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

fichatecnica.delete = async (id_fit) => {
    const urlDelete = baseUrl+"/delete/"+id_fit
    const res = await axios.delete(urlDelete)
    .then(response=> { return response.data })
    .catch(error =>{ return error })

    return res;
}
  
export default fichatecnica;