import url from "../../components/Url";
const baseUrl = `${url}/api/facturacion`;   
import axios from "axios";
const facturacion = {};

facturacion.save = async (data) => {
    console.log(data)
    const urlSave = baseUrl + "/create"
    const res = await axios.post(urlSave, data)
        .then(response => { return response.data })
        .catch(error => { return error; })
    return res;
}

facturacion.importarfacturacion = async (data) => {
    //console.log("DATA : ", data)
    const urlSave = baseUrl + "/importarfacturacion"
    const res = await axios.post(urlSave, data)
        .then(response => { return response.data })
        .catch(error => { return error; })
    return res;
}

facturacion.listarfacturacion = async () => {
    const urlList = baseUrl+"/listar_facturacion"
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

facturacion.listarfactconsoequipo = async () => {
    const urlList = baseUrl+"/listar_factconsoequipo"
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

facturacion.listarfactconsomes = async () => {
    const urlList = baseUrl+"/listar_factconsomes"
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

facturacion.listarfactmes = async (mes_fac) => {
    const urlList = baseUrl+"/listar_factmes/"+mes_fac
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

facturacion.listarfactmesequipo = async (mes_fac) => {
    const urlList = baseUrl+"/listar_factmesequipo/"+mes_fac
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

facturacion.listarfactperiodo = async (periodo_fac) => {
    //console.log("DATA : ", periodo_fac)
    const urlList = baseUrl+"/listar_factperiodo/"+periodo_fac
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

facturacion.leerfactcodigomes = async (mes_fac) => {
    //console.log("DATA : ", mes_fac)
    const urlList = baseUrl+"/leerfactcodigomes/"+mes_fac
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

facturacion.itemfacturado = async (id_fac) => {
    //console.log("DATOS ENVIADOS A LA API : ", data);
    const urlUpdate = baseUrl+"/itemfacturado/"+id_fac
    const res = await axios.put(urlUpdate)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

facturacion.update = async (data) => {
    //console.log("DATOS ENVIADOS A LA API : ", data);
    const urlUpdate = baseUrl+"/update/"+data.id_fac
    const res = await axios.put(urlUpdate, data)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

export default facturacion;