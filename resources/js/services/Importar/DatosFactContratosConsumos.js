import url from "../../components/Url";
const baseUrl = `${url}/api/rentabilidad`;   
import axios from "axios";
const datosfacturacion = {};

datosfacturacion.save = async (data) => {
    const urlSave = baseUrl + "/create"
    const res = await axios.post(urlSave, data)
        .then(response => { return response.data })
        .catch(error => { return error; })
    return res;
}

export default datosfacturacion;