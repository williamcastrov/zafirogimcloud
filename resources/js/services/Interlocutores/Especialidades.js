import url from "../../components/Url";
const baseUrl = `${url}/api/especialidad`;   
import axios from "axios";
const especialidades = {};

especialidades.save = async (data) => {
    const urlSave = baseUrl + "/create"
    const res = await axios.post(urlSave, data)
        .then(response => { return response.data })
        .catch(error => { return error; })
    return res;
}

especialidades.listEspecialidades = async () => {
    const urlList = baseUrl+"/listar_especialidades"
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

especialidades.update = async (data) => {
    console.log(data);
    const urlUpdate = baseUrl+"/update/"+data.id_esp
    const res = await axios.put(urlUpdate, data)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

especialidades.delete = async (id_esp) => {
    const urlDelete = baseUrl+"/delete/"+id_esp
    const res = await axios.delete(urlDelete)
    .then(response=> { return response.data })
    .catch(error =>{ return error })

    return res;
}
  
export default especialidades;