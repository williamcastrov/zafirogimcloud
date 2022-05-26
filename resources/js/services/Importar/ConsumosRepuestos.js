import url from "../../components/Url";
const baseUrl = `${url}/api/consumos`;   
import axios from "axios";
const consumosrepuestos = {};

consumosrepuestos.importarconsumosrepuestos = async (data) => {
    console.log("DATA : ", data)
    const urlSave = baseUrl + "/importarconsumosrepuestos"
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

consumosrepuestos.paretoconsolidadoconsumosrep = async (periodo) => {
    console.log("DATA : ", periodo)
    const urlList = baseUrl+"/paretoconsolidadoconsumosrep/"+periodo
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

consumosrepuestos.consolidadoconsumosrepmes = async (periodo) => {
    const urlList = baseUrl+"/consolidadoconsumosrepmes/"+periodo
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

export default consumosrepuestos;