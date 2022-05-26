import url from "../../components/Url";
const baseUrl = `${url}/api/fotosbajashistoricos`;
import axios from "axios";
const fotosbajashistoricos = {};

fotosbajashistoricos.save = async (data) => {
    console.log("DATA : ", data)
    const urlSave = baseUrl + "/create"
    const res = await axios.post(urlSave, data)
        .then(response => { return response.data })
        .catch(error => { return error; })
    return res;
}

fotosbajashistoricos.listfotosequipos = async (codigoequipo) => {
    const urlList = baseUrl+"/listar_fotosequipos/"+codigoequipo
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

fotosbajashistoricos.update = async (data) => {
    //console.log(data);
    //console.log("DATA : ", data.id);
    const urlUpdate = baseUrl+"/update/"+data.id
    const res = await axios.put(urlUpdate, data)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

fotosbajashistoricos.delete = async (id) => {
    const urlDelete = baseUrl+"/delete/"+id
    const res = await axios.delete(urlDelete)
    .then(response=> { return response.data })
    .catch(error =>{ return error })

    return res;
}
  
export default fotosbajashistoricos;