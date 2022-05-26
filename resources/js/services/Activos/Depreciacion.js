import url from "../../components/Url";
const baseUrl = `${url}/api/depreciacion`;
//console.log("BASE URL : ", baseUrl);
import axios from "axios";
const depreciacion = {};

depreciacion.save = async (data) => {
    //console.log("DATA : ", data)
    const urlSave = baseUrl + "/create"
    const res = await axios.post(urlSave, data)
        .then(response => { return response.data })
        .catch(error => { return error; })
    return res;
}

depreciacion.listdepreciacion = async () => {
    const urlList = baseUrl+"/listar_depreciacion"
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

depreciacion.validaperiododepreciacion = async (annomes_dpr) => {
    const urlList = baseUrl+"/validaperiododepreciacion/"+annomes_dpr
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

depreciacion.get = async (annomes_dpr) => {
    const urlList = baseUrl+"/get/"+annomes_dpr
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

depreciacion.update = async (data) => {
    //console.log(data);
    const urlUpdate = baseUrl+"/update/"+data.id_dpr
    const res = await axios.put(urlUpdate, data)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

depreciacion.delete = async (annomes_dpr) => {
    //console.log("DATA : ", annomes_dpr)
    const urlDelete = baseUrl+"/delete/"+annomes_dpr
    const res = await axios.delete(urlDelete)
    .then(response=> { return response.data })
    .catch(error =>{ return error })

    return res;
}

export default depreciacion;