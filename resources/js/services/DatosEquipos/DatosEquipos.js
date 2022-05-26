import url from "../../components/Url";
const baseUrl = `${url}/api/datosequipos`;
import axios from "axios";
const datosequipos = {};

datosequipos.save = async (data) => {
    const urlSave = baseUrl + "/create"
    const res = await axios.post(urlSave, data)
        .then(response => { return response.data })
        .catch(error => { return error; })
    return res;
}

datosequipos.listDatosEquipos = async () => {
    const urlList = baseUrl+"/listar_datosequipos"
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

datosequipos.listUnDatoEquipo = async (equipoID) => {
    const urlList = baseUrl+"/get/"+equipoID
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

datosequipos.update = async (data) => {
    //console.log("DATA : ",data);
    const urlUpdate = baseUrl+"/update/"+data.id_dequ
    const res = await axios.put(urlUpdate, data)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

datosequipos.delete = async (id_dequ) => {
    const urlDelete = baseUrl+"/delete/"+id_dequ
    const res = await axios.delete(urlDelete)
    .then(response=> { return response.data })
    .catch(error =>{ return error })

    return res;
}
  
export default datosequipos;