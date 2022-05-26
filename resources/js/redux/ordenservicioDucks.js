import axios from "axios";

// constantes
const dataInicial = {
    arrayOrdenes : []
}

// types
const OBTENER_ORDENES_EXITO = 'OBTENER_ORDENES_EXITO'

// reducer
export default function ordenesservicioReducer(state =  dataInicial, action) {
    switch(action.type){
        case OBTENER_ORDENES_EXITO:
            return {...state, arrayOrdenes: action.payload.data}
        default:
            return state
    }
} 

// acciones
export const obtenerOrdenesAccion = () => async (dispatch, getState) => {
    try {
        //console.log('getState', getState())
        // Lee los datos desde el Storage
        
        if(localStorage.getItem('ordenesservicio')) {
            dispatch({
                type    :   OBTENER_ORDENES_EXITO,
                payload :   JSON.parse(localStorage.getItem('ordenesservicio')) 
            }) 
            return
        } 
        
        //const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=10`)
        const res = await axios.get(`http://127.0.0.1:8000/api/ordenesserv/listar_ordenesserv`)
        console.log(res.data)
       
        dispatch({
            type    :   OBTENER_ORDENES_EXITO,
            payload :   res.data
        }) 
        // Guarda los datos en el Storage
        localStorage.setItem('ordenesservicio', JSON.stringify(res.data) )
    } catch (error) {
        console.log(error)
        
    }
}
