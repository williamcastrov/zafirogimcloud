import url from "../../components/Url";
const baseUrl = `${url}/api/rentabilidadperiodo`;
import axios from "axios";
const rentabilidadperiodo = {};

rentabilidadperiodo.save = async (data) => {
    //console.log("DATA : ", data)
    const urlSave = baseUrl + "/create"
    const res = await axios.post(urlSave, data)
        .then(response => { return response.data })
        .catch(error => { return error; })
    return res;
}

rentabilidadperiodo.listarrentabilidadperiodo = async () => {
    const urlList = baseUrl+"/listar_rentabilidadperiodoequipo"
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

rentabilidadperiodo.listarrentabilidadperiodoequipo = async (periodo) => {
    const urlList = baseUrl+"/listar_rentabilidadperiodoequipo/"+periodo
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

rentabilidadperiodo.listar_factcontratacionrepuestosperiodo = async (periodo) => {
    const urlList = baseUrl+"/listar_factcontratacionrepuestosperiodo/"+periodo
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

rentabilidadperiodo.sumartiempoactividades = async (periodo) => {
    //console.log("DATA PROGRAMADA : ", periodo);
    const urlUpdate = baseUrl+"/consumorptorentabilidadperiodo/"+periodo
    const res = await axios.put(urlUpdate)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

rentabilidadperiodo.update = async (data) => {
    //console.log("DATA : ", data.id_rtb)
    const urlUpdate = baseUrl+"/update/"+data.id_rtb
    const res = await axios.put(urlUpdate, data)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

rentabilidadperiodo.delete = async (id_rtb) => {
    const urlDelete = baseUrl+"/delete/"+id_rtb
    const res = await axios.delete(urlDelete)
    .then(response=> { return response.data })
    .catch(error =>{ return error })

    return res;
}
  
export default rentabilidadperiodo;