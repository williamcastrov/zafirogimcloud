import url from "../../components/Url";
const baseUrl = `${url}/api/tipocostovariable`;   
import axios from "axios";
const tipocostovariable = {};

tipocostovariable.save = async (data) => {
    const urlSave = baseUrl + "/create"
    const res = await axios.post(urlSave, data)
        .then(response => { return response.data })
        .catch(error => { return error; })
    return res;
}

tipocostovariable.listtipocostovariable = async () => {
    const urlList = baseUrl+"/listar_tipocostovariable"
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

tipocostovariable.update = async (data) => {
    console.log(data);
    const urlUpdate = baseUrl+"/update/"+data.id_tcv
    const res = await axios.put(urlUpdate, data)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

tipocostovariable.delete = async (id_tcv) => {
    const urlDelete = baseUrl+"/delete/"+id_tcv
    const res = await axios.delete(urlDelete)
    .then(response=> { return response.data })
    .catch(error =>{ return error })

    return res;
}
  
export default tipocostovariable;