import url from "../../components/Url";
const baseUrl = `${url}/api/equipos`;
import axios from "axios";
const equipos = {};

equipos.save = async (data) => {
    const urlSave = baseUrl + "/create"
    const res = await axios.post(urlSave, data)
        .then(response => { return response.data })
        .catch(error => { return error; })
    return res;
}

equipos.listEquipos = async () => {
    const urlList = baseUrl+"/listar_equipos"
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

equipos.listReporteEquipos = async () => {
    const urlList = baseUrl+"/listar_reporteequipos"
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

equipos.listbajasequiposhistoricos = async () => {
    const urlList = baseUrl+"/listar_bajasequiposhistoricos"
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

equipos.listEquiposMontacargas = async () => {
    const urlList = baseUrl+"/listar_equiposmontacargas"
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

equipos.consultarEquiposMontacargas = async () => {
    const urlList = baseUrl+"/consultar_equiposmontacargas"
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

equipos.leerultimoequipo = async () => {
    const urlList = baseUrl+"/leerultimoequipo"
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

equipos.listEquiposMontacargasusuario = async () => {
    const urlList = baseUrl+"/listar_equiposmontacargasusuario"
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

equipos.listaralertasestadosequipos = async (totequipos) => {
    const urlList = baseUrl+"/listar_alertasestadosequipos/"+totequipos
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

equipos.sumatotalequipos = async () => {
    const urlList = baseUrl+"/sumatotalequipos"
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
       
    return res;
}

equipos.detalleequipos = async () => {
    const urlList = baseUrl+"/detalleequipos"
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
       
    return res;
}
    
equipos.listEquiposAccesorios = async () => {
    const urlList = baseUrl+"/listar_equiposaccesorios"
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

equipos.listActivosRenta = async () => {
    const urlList = baseUrl+"/listar_activosrenta"
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

equipos.informecomfiabilidad = async () => {
    const urlList = baseUrl+"/informecomfiabilidad"
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

equipos.totalcorrectivomtperiodo = async () => {
    const urlList = baseUrl+"/totalcorrectivomtperiodo"
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

equipos.listActivosAsegurados = async () => {
    const urlList = baseUrl+"/listar_activosasegurados"
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

equipos.listUnEquipo = async (id_equ) => {
    const urlList = baseUrl+"/get/"+id_equ
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

equipos.listar_combogrupoequipo = async (codigo_equ) => {
    const urlList = baseUrl+"/listar_combogrupoequipo/"+codigo_equ
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

equipos.fecharetornaequipo = async (id_equ) => {
    const urlList = baseUrl+"/fecharetornaequipo/"+id_equ
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

equipos.update = async (data) => {
    //console.log(data);
    const urlUpdate = baseUrl+"/update/"+data.id_equ
    const res = await axios.put(urlUpdate, data)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

equipos.delete = async (id_equ) => {
    const urlDelete = baseUrl+"/delete/"+id_equ
    const res = await axios.delete(urlDelete)
    .then(response=> { return response.data })
    .catch(error =>{ return error })

    return res;
}
  
export default equipos;