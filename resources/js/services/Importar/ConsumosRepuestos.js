import url from "../../components/Url";
const baseUrl = `${url}/api/consumos`;   
import axios from "axios";
const consumosrepuestos = {};

consumosrepuestos.save = async (data) => {
    const urlSave = baseUrl + "/create"
    const res = await axios.post(urlSave, data)
        .then(response => { return response.data })
        .catch(error => { return error; })
    return res;
}

consumosrepuestos.listarconsumosrepuestos = async () => {
    const urlList = baseUrl+"/listar_consumosrepuestos"
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

consumosrepuestos.listar_consumosrepuestosperiodo = async (periodo) => {
    const urlList = baseUrl+"/listar_consumosrepuestosperiodo/"+periodo
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

consumosrepuestos.listarconsumosmesequipo = async (codigo) => {
    console.log("DATA : ", codigo)
    const urlList = baseUrl+"/listar_consumosmesequipo/"+codigo
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

consumosrepuestos.update = async (data) => {
    const urlUpdate = baseUrl+"/update/"+data.id_cre
    const res = await axios.put(urlUpdate, data)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

consumosrepuestos.delete = async (id_cre) => {
    const urlDelete = baseUrl+"/delete/"+id_cre
    const res = await axios.delete(urlDelete)
    .then(response=> { return response.data })
    .catch(error =>{ return error })

    return res;
}

export default consumosrepuestos;