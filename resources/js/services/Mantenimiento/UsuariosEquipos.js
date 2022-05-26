import url from "../../components/Url";
const baseUrl = `${url}/api/usuariosequipos`;   
import axios from "axios";
const usuariosequipos = {};

usuariosequipos.save = async (data) => {
    const urlSave = baseUrl + "/create"
    const res = await axios.post(urlSave, data)
        .then(response => { return response.data })
        .catch(error => { return error; })
    return res;
}

usuariosequipos.listar_usuariosporequipo = async () => {
    const urlList = baseUrl+"/listar_usuariosporequipo"
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

usuariosequipos.update = async (data) => {
    console.log(data);
    const urlUpdate = baseUrl+"/update/"+data.id_eus
    const res = await axios.put(urlUpdate, data)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

usuariosequipos.delete = async (id_eus) => {
    const urlDelete = baseUrl+"/delete/"+id_eus
    const res = await axios.delete(urlDelete)
    .then(response=> { return response.data })
    .catch(error =>{ return error })

    return res;
}
  
export default usuariosequipos;