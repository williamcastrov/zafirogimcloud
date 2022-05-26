const baseUrl = "http://127.0.0.1:8000/api/pruebas";
import axios from "axios";
const pruebas = {};

pruebas.save = async (data) => {
    console.log('DATOS EN SERVICE : ',data)
    const urlSave = baseUrl + "/create"
    const res = await axios.post(urlSave, data)
        .then(response => { return response.data })
        .catch(error => { return error; })
    return res;
}

pruebas.listPruebas = async () => {
    const urlList = baseUrl+"/listar_pruebas"
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

pruebas.listUnaPrueba = async (id_pai, pai) => {
    console.log("ID DEL PAIS",id_pai, pai);
    const urlList = baseUrl+"/get/"+id_pai
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

pruebas.update = async (data) => {
    console.log('DATOS EN SERVICE : ',data.cantidad )
    const urlUpdate = baseUrl+"/update/"+data.id_pai
    const res = await axios.put(urlUpdate, data)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

pruebas.delete = async (id_pai) => {
    const urlDelete = baseUrl+"/delete/"+id_pai
    const res = await axios.delete(urlDelete)
    .then(response=> { return response.data })
    .catch(error =>{ return error })

    return res;
}
  
export default pruebas;