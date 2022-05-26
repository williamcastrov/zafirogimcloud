import url from "../../components/Url";
const baseUrl = `${url}/api/tiposproductos`;   
import axios from "axios";
const tiposproductos = {};

tiposproductos.save = async (data) => {
    const urlSave = baseUrl + "/create"
    const res = await axios.post(urlSave, data)
        .then(response => { return response.data })
        .catch(error => { return error; })
    return res;
}

tiposproductos.listTiposproductos = async () => {
    const urlList = baseUrl+"/listar_tiposproductos"
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

tiposproductos.update = async (data) => {
    console.log(data);
    const urlUpdate = baseUrl+"/update/"+data.id_tprd
    const res = await axios.put(urlUpdate, data)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

tiposproductos.delete = async (id_tprd) => {
    const urlDelete = baseUrl+"/delete/"+id_tprd
    const res = await axios.delete(urlDelete)
    .then(response=> { return response.data })
    .catch(error =>{ return error })

    return res;
}
  
export default tiposproductos;