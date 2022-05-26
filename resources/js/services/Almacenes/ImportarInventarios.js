import url from "../../components/Url";
const baseUrl = `${url}/api/inventarios`;   
import axios from "axios";
const importarinventario = {};

importarinventario.importarinventario = async (data) => {
    console.log("DATA : ", data)
    const urlSave = baseUrl + "/importarinventario"
    const res = await axios.post(urlSave, data)
        .then(response => { return response.data })
        .catch(error => { return error; })
    return res;
}
  
export default importarinventario;