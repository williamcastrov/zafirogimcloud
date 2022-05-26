import axios from "axios";

// constantes
const dataInicial = {
    arrayPaises : []
}

// types
const OBTENER_PAISES_EXITO = 'OBTENER_PAISES_EXITO'

// reducer
export default function paisReducer(state =  dataInicial, action) {
    switch(action.type){
        case OBTENER_PAISES_EXITO:
            return {...state, arrayPaises: action.payload.data}
        default:
            return state

    }
} 

// acciones
export const obtenerPaisesAccion = () => async (dispatch, getState) => {
    try {
        //console.log('getState', getState())
        // Lee los datos desde el Storage
        
        if(localStorage.getItem('paises')) {
            dispatch({
                type    :   OBTENER_PAISES_EXITO,
                payload :   JSON.parse(localStorage.getItem('paises')) 
            }) 
            return
        } 
        
        //const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=10`)
        const res = await axios.get(`http://127.0.0.1:8000/api/paises/listar_paises`)
        console.log(res.data)
       
        dispatch({
            type    :   OBTENER_PAISES_EXITO,
            payload :   res.data
        }) 
        // Guarda los datos en el Storage
        localStorage.setItem('paises', JSON.stringify(res.data) )
    } catch (error) {
        console.log(error)
        
    }
}
