import url from "../../components/Url";
const baseUrl = `${url}/api/componentes`;
import axios from "axios";
const componentesxequipos = {};

componentesxequipos.save = async (data) => {
    const urlSave = baseUrl + "/create"
    const res = await axios.post(urlSave, data)
        .then(response => { return response.data })
        .catch(error => { return error; })
    return res;
}

componentesxequipos.listcomponentesxequipos = async () => {
    const urlList = baseUrl+"/listar_componentesxequipos"
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

componentesxequipos.listuncomponentexequipo = async (equipo_com) => {
    const urlList = baseUrl+"/get/"+equipo_com
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

componentesxequipos.update = async (data) => {
    console.log(data);
    const urlUpdate = baseUrl+"/update/"+data.id_com
    const res = await axios.put(urlUpdate, data)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

componentesxequipos.delete = async (id_com) => {
    const urlDelete = baseUrl+"/delete/"+id_com
    const res = await axios.delete(urlDelete)
    .then(response=> { return response.data })
    .catch(error =>{ return error })

    return res;
}
  
export default componentesxequipos;