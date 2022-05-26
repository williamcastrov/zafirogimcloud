import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import paisReducer from "./paisDucks";
import ordenesservicioReducer  from "./ordenservicioDucks";
//import usuarioReducer from "./usuarioDucks";

const rootReducer = combineReducers({
    paises: paisReducer,
    ordenesservicio: ordenesservicioReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore(){
    const store = createStore( rootReducer, composeEnhancers( applyMiddleware(thunk) ))
    return store;
}