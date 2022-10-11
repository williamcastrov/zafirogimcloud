import url from "../../components/Url";
const baseUrl = `${url}/api/registrollamadas`;
import axios from "axios";
const registrollamadas = {};

registrollamadas.save = async (data) => {
    const urlSave = baseUrl + "/create"
    const res = await axios.post(urlSave, data)
        .then(response => { return response.data })
        .catch(error => { return error; })
    return res;
}

registrollamadas.listarregistrollamadas = async () => {
    const urlList = baseUrl+"/listar_registrollamadas"
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

registrollamadas.listar_iniciovisitacomercial = async () => {
    const urlList = baseUrl+"/listar_iniciovisitacomercial"
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

registrollamadas.listar_registrollamadascliente = async (cliente_rll) => {
    const urlList = baseUrl+"/listar_registrollamadascliente/"+cliente_rll
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

registrollamadas.listunregistrollamada = async (id_rll) => {
    //console.log("DATA UN REGISTRO LLAMADAS : ",id_rll)
    const urlList = baseUrl+"/get/"+id_rll
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

registrollamadas.update = async (data) => {
    console.log("DATA : ", data)
    const urlUpdate = baseUrl+"/update/"+data.id_rll
    const res = await axios.put(urlUpdate, data)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

registrollamadas.delete = async (id_rll) => {
    const urlDelete = baseUrl+"/delete/"+id_rll
    const res = await axios.delete(urlDelete)
    .then(response=> { return response.data })
    .catch(error =>{ return error })

    return res;
}
  
export default registrollamadas;