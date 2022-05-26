import url from "../../components/Url";
const baseUrl = `${url}/api/contactos`;
import axios from "axios";
const contactos = {};

contactos.save = async (data) => {
    console.log(data)
    const urlSave = baseUrl + "/create"
    const res = await axios.post(urlSave, data)
        .then(response => { return response.data })
        .catch(error => { return error; })
    return res;
}

contactos.listContactos = async () => {
    const urlList = baseUrl+"/listar_contactos"
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
    return res;
}

contactos.listContactosInterlocutor = async (id_con) => {
    const urlList = baseUrl+"/get/"+id_con
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
    return res;
}

contactos.contactosInterlocutor = async (idinterlocutor_con) => {
    console.log("DATA : ",idinterlocutor_con)
    const urlList = baseUrl+"/contactosinterlocutor/"+idinterlocutor_con
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
    return res;
}

contactos.contactosClientes = async (identificacion_con) => {
    console.log("DATA : ",identificacion_con)
    const urlList = baseUrl+"/contactosclientes/"+identificacion_con
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
    return res;
}

contactos.update = async (data) => {
    console.log(data);
    const urlUpdate = baseUrl+"/update/"+data.id_con
    const res = await axios.put(urlUpdate, data)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
    return res;
}

contactos.delete = async (id_con) => {
    const urlDelete = baseUrl+"/delete/"+id_con
    const res = await axios.delete(urlDelete)
    .then(response=> { return response.data })
    .catch(error =>{ return error })

    return res;
}
  
export default contactos;