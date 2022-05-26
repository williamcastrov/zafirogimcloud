import url from "../../components/Url";
const baseUrl = `${url}/api/notificacionpendientes`;
import axios from "axios";
const notificacionpendientes = {};

notificacionpendientes.save = async (data) => {
    console.log("DATA : ", data)
    const urlSave = baseUrl + "/create"
    const res = await axios.post(urlSave, data)
        .then(response => { return response.data })
        .catch(error => { return error; })
    return res;
}

notificacionpendientes.listar_notificacionpendientes = async () => {
    const urlList = baseUrl+"/listar_notificacionpendientes/"
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

notificacionpendientes.listar_solicitonotificacionpendientes = async () => {
    const urlList = baseUrl+"/listar_solicitonotificacionpendientes/"
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

notificacionpendientes.listar_ingresonotificacionpendientes = async () => {
    const urlList = baseUrl+"/listar_ingresonotificacionpendientes/"
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

notificacionpendientes.listar_notificacionpendiente = async (codigopendiente) => {
    const urlList = baseUrl+"/listar_notificacionpendiente/"+codigopendiente
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

notificacionpendientes.update = async (data) => {
    //console.log(data);
    //console.log("DATA : ", data.id);
    const urlUpdate = baseUrl+"/update/"+data.id
    const res = await axios.put(urlUpdate, data)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

notificacionpendientes.actualizanotificacion = async (data) => {
    //console.log(data);
    //console.log("DATA : ", data.id);
    const urlUpdate = baseUrl+"/actualizanotificacion/"+data.id
    const res = await axios.put(urlUpdate, data)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

notificacionpendientes.delete = async (id) => {
    const urlDelete = baseUrl+"/delete/"+id
    const res = await axios.delete(urlDelete)
    .then(response=> { return response.data })
    .catch(error =>{ return error })

    return res;
}
  
export default notificacionpendientes;