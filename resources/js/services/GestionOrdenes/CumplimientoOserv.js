import url from "../../components/Url";
const baseUrl = `${url}/api/cumplimiento`;
import axios from "axios";
const cumplimientooserv = {};

cumplimientooserv.save = async (data) => {
    console.log("DATA : ", data.id_cosv)
    const urlSave = baseUrl + "/create"
    const res = await axios.post(urlSave, data)
        .then(response => { return response.data })
        .catch(error => { return error; })
    return res;
}

cumplimientooserv.listCumplimiento = async () => {
    const urlList = baseUrl+"/listar_cumplimiento"
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

cumplimientooserv.leerdatoshojadevida = async (equipo) => {
    const urlList = baseUrl+"/leerdatoshojadevida/"+equipo
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

cumplimientooserv.listar_actividadesotrevision = async () => {
    const urlList = baseUrl+"/listar_actividadesotrevision"
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

cumplimientooserv.listUnCumplimiento = async (id_actividad) => {
    console.log("DATO ACTIVIDAD : ",id_actividad)
    const urlList = baseUrl+"/get/"+id_actividad
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

cumplimientooserv.calificacionot = async (id_actividad) => {
    const urlList = baseUrl+"/calificacionot/"+id_actividad
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

cumplimientooserv.leeractividadesmaquina = async (equipo_otr) => {
    const urlList = baseUrl+"/leeractividadesmaquina/"+equipo_otr
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

cumplimientooserv.actividadesactivasxot = async (id_cosv) => {
    const urlList = baseUrl+"/actividadesactivasxot/"+id_cosv
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

cumplimientooserv.actividadestotalesxot = async (id_cosv) => {
    const urlList = baseUrl+"/actividadestotalesxot/"+id_cosv
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

cumplimientooserv.listOserv = async (id_cosv) => {
    const urlList = baseUrl+"/getoser/"+id_cosv
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

cumplimientooserv.listActividadesOT = async (id_cosv) => {
    const urlList = baseUrl+"/get/"+id_cosv
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

cumplimientooserv.leeractividadesot = async (id_cosv) => {
    const urlList = baseUrl+"/leeractividadesot/"+id_cosv
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

cumplimientooserv.cerraractividad = async (id_actividad) => {
    //console.log("DATA PROGRAMADA : ", id_actividad);
    const urlUpdate = baseUrl+"/cerraractividad/"+id_actividad
    const res = await axios.put(urlUpdate)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

cumplimientooserv.cerraractividad = async (data) => {
    console.log("DATO CIERRE : ", data)
    const urlUpdate = baseUrl+"/cerraractividad/"+data.id_actividad
    const res = await axios.put(urlUpdate, data)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

cumplimientooserv.update = async (data) => {
    console.log(data);
    console.log("DATA : ", data.id);
    const urlUpdate = baseUrl+"/update/"+data.id
    const res = await axios.put(urlUpdate, data)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

cumplimientooserv.delete = async (id) => {
    const urlDelete = baseUrl+"/delete/"+id
    const res = await axios.delete(urlDelete)
    .then(response=> { return response.data })
    .catch(error =>{ return error })

    return res;
}
  
export default cumplimientooserv;