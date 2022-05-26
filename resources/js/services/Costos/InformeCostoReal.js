import url from "../../components/Url";
const baseUrl = `${url}/api/informecostoreal`;   
import axios from "axios";
const informecostoreal = {};

informecostoreal.leecostovariableperiodo = async (periodo) => {
    const urlList = baseUrl+"/get/"+periodo
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

informecostoreal.numeroequiposmes = async (anno) => {
    const urlList = baseUrl+"/numeroequiposmes/"+anno
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

informecostoreal.costosvariableanno = async (anno) => {
    const urlList = baseUrl+"/costosvariableanno/"+anno
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

informecostoreal.leeinformacionacumuladaequipos = async (codigo) => {
    console.log("PERIODO COSTOS: ", codigo)
    const urlList = baseUrl+"/leeinformacionacumuladaequipos/"+codigo
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

informecostoreal.equipostotalesrenta = async () => {
    const urlList = baseUrl+"/equipostotalesrenta"
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

informecostoreal.equipostotales = async () => {
    const urlList = baseUrl+"/equipostotales"
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

informecostoreal.leeinformacionequiposmes = async (periodo) => {
    const urlList = baseUrl+"/leeinformacionequiposmes/"+periodo
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

informecostoreal.leeinformacionequipos = async (periodo) => {
    const urlList = baseUrl+"/leeinformacionequipos/"+periodo
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

export default informecostoreal;