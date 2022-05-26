import url from "../../components/Url";
const baseUrl = `${url}/api/tiposequipos`;
import axios from "axios";
const tiposequipos = {};

tiposequipos.save = async (data) => {
    const urlSave = baseUrl + "/create"
    const res = await axios.post(urlSave, data)
        .then(response => { return response.data })
        .catch(error => { return error; })
    return res;
}

tiposequipos.listTiposEquipos = async () => {
    const urlList = baseUrl+"/listar_tiposequipos"
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

tiposequipos.update = async (data) => {
    console.log(data);
    const urlUpdate = baseUrl+"/update/"+data.id_tequ
    const res = await axios.put(urlUpdate, data)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

tiposequipos.delete = async (id_tequ) => {
    const urlDelete = baseUrl+"/delete/"+id_tequ
    const res = await axios.delete(urlDelete)
    .then(response=> { return response.data })
    .catch(error =>{ return error })

    return res;
}
  
export default tiposequipos;