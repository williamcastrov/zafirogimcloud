import url from "../../components/Url";
const baseUrl = `${url}/api/areas`;
import axios from "axios";
const areas = {};

areas.save = async (data) => {
    const urlSave = baseUrl + "/create"
    const res = await axios.post(urlSave, data)
        .then(response => { return response.data })
        .catch(error => { return error; })
    return res;
}

areas.listAreas = async () => {
    const urlList = baseUrl+"/listar_areas"
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

areas.update = async (data) => {
    console.log(data);
    const urlUpdate = baseUrl+"/update/"+data.id_are
    const res = await axios.put(urlUpdate, data)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

areas.delete = async (id_are) => {
    const urlDelete = baseUrl+"/delete/"+id_are
    const res = await axios.delete(urlDelete)
    .then(response=> { return response.data })
    .catch(error =>{ return error })

    return res;
}
  
export default areas;