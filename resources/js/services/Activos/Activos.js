import url from "../../components/Url";
const baseUrl = `${url}/api/activos`;
import axios from "axios";
const activos = {};

activos.save = async (data) => {
    const urlSave = baseUrl + "/create"
    const res = await axios.post(urlSave, data)
        .then(response => { return response.data })
        .catch(error => { return error; })
    return res;
}

activos.listActivos = async () => {
    const urlList = baseUrl+"/listar_activos"
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

activos.update = async (data) => {
    console.log(data);
    const urlUpdate = baseUrl+"/update/"+data.id_act
    const res = await axios.put(urlUpdate, data)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

activos.validadepreciacionacumulada = async (fecha) => {
    const urlList = baseUrl+"/validadepreciacionacumulada/"+fecha
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

activos.actualizadepreactivos = async (annomes_dpr) => {
    //console.log(data);
    const urlUpdate = baseUrl+"/actualizadepreactivos/"+annomes_dpr
    const res = await axios.put(urlUpdate)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

activos.leeactivo = async (id_equ) => {
    const urlList = baseUrl+"/leeactivo/"+id_equ
    const res = await axios.get(urlList)
    .then(response=> { return response.data })
    .catch(error =>{ return error })

    return res;
}

activos.listactivosdepreciar = async (periodo) => {
    const urlList = baseUrl+"/leeactivodepreciar/"+periodo
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

activos.delete = async (id_act) => {
    const urlDelete = baseUrl+"/delete/"+id_act
    const res = await axios.delete(urlDelete)
    .then(response=> { return response.data })
    .catch(error =>{ return error })

    return res;
}
  
export default activos;