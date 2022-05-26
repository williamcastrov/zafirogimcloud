import url from "../../components/Url";
const baseUrl = `${url}/api/empleados`;   
import axios from "axios";
const empleados = {};

empleados.save = async (data) => {
    console.log(data)
    const urlSave = baseUrl + "/create"
    const res = await axios.post(urlSave, data)
        .then(response => { return response.data })
        .catch(error => { return error; })
    return res;
}

empleados.listEmpleados = async () => {
    const urlList = baseUrl+"/listar_empleados"
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

empleados.listEmpleadosOT = async () => {
    const urlList = baseUrl+"/listar_empleadosOT"
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

empleados.listEmpleadoscomercial = async () => {
    const urlList = baseUrl+"/listar_empleadoscomercial"
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

empleados.update = async (data) => {
    console.log(data);
    const urlUpdate = baseUrl+"/update/"+data.id_emp
    const res = await axios.put(urlUpdate, data)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

empleados.delete = async (id_emp) => {
    const urlDelete = baseUrl+"/delete/"+id_emp
    const res = await axios.delete(urlDelete)
    .then(response=> { return response.data })
    .catch(error =>{ return error })

    return res;
}
  
export default empleados;