import url from "../../components/Url";
const baseUrl = `${url}/api/rentabilidad`;
import axios from "axios";
const conceptosrentabilidad = {};

conceptosrentabilidad.save = async (data) => {
    const urlSave = baseUrl + "/create"
    const res = await axios.post(urlSave, data)
        .then(response => { return response.data })
        .catch(error => { return error; })
    return res;
}

conceptosrentabilidad.addconceprentabilidadperiodo = async (data) => {
    const urlSave = baseUrl + "/addconceprentabilidadperiodo"
    const res = await axios.post(urlSave, data)
        .then(response => { return response.data })
        .catch(error => { return error; })
    return res;
}

conceptosrentabilidad.listconceptosrentabilidad = async () => {
    const urlList = baseUrl+"/listar_conceptosrentabilidad"
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

conceptosrentabilidad.update = async (data) => {
    console.log("DATA : ", data.id_rtb)
    const urlUpdate = baseUrl+"/update/"+data.id_rtb
    const res = await axios.put(urlUpdate, data)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

conceptosrentabilidad.delete = async (id_rtb) => {
    const urlDelete = baseUrl+"/delete/"+id_rtb
    const res = await axios.delete(urlDelete)
    .then(response=> { return response.data })
    .catch(error =>{ return error })

    return res;
}
  
export default conceptosrentabilidad;