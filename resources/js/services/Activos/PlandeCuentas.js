import url from "../../components/Url";
const baseUrl = `${url}/api/plandecuentas`;
import axios from "axios";
const plandecuentas = {};

plandecuentas.save = async (data) => {
    const urlSave = baseUrl + "/create"
    const res = await axios.post(urlSave, data)
        .then(response => { return response.data })
        .catch(error => { return error; })
    return res;
}

plandecuentas.listPlandeCuentas = async () => {
    const urlList = baseUrl+"/listar_plandecuentas"
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

plandecuentas.update = async (data) => {
    console.log(data);
    const urlUpdate = baseUrl+"/update/"+data.id_puc
    const res = await axios.put(urlUpdate, data)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

plandecuentas.delete = async (id_puc) => {
    const urlDelete = baseUrl+"/delete/"+id_puc
    const res = await axios.delete(urlDelete)
    .then(response=> { return response.data })
    .catch(error =>{ return error })

    return res;
}
  
export default plandecuentas;