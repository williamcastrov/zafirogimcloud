import url from "../../components/Url";
const baseUrl = `${url}/api/contrataciones`;   
import axios from "axios";
const contrataciones = {};

contrataciones.importarcontrataciones = async (data) => {
    //console.log("DATA : ", data)
    const urlSave = baseUrl + "/importarcontrataciones"
    const res = await axios.post(urlSave, data)
        .then(response => { return response.data })
        .catch(error => { return error; })
    return res;
}

contrataciones.listarcontrataciones = async () => {
    const urlList = baseUrl+"/listar_contrataciones"
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

contrataciones.listarcontratacionesperiodo = async (periodo) => {
    const urlList = baseUrl+"/listar_contratacionesperiodo/"+periodo
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

contrataciones.listarcontratacionesmesequipo = async (codigo) => {
    const urlList = baseUrl+"/listar_contratacionesmesequipo/"+codigo
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

contrataciones.paretoconsolidadocontra = async (periodo) => {
    const urlList = baseUrl+"/paretoconsolidadocontra/"+periodo
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

contrataciones.consolidadocontrames = async (periodo) => {
    const urlList = baseUrl+"/consolidadocontrames/"+periodo
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

export default contrataciones;