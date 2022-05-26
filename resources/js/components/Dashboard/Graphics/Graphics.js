import React, {useState, useEffect} from 'react';
import {Bar} from 'react-chartjs-2';
import './Graphics.css';

// Componentes de Conexion con el Backend
import facturacionServices from "../../../services/Importar/Facturacion";

function Graphics(props) {
    const { maquinas, valores } = props;

    const data={
        labels:maquinas,
        datasets:[
            {
            label: 'Ventas por Maquinas',
            backgroundColor: 'rgba(0,0,255,1)',
            borderColor:'black',
            borderWidth:1,
            hoverBackgroundColor:'rgba(0,0,255,0.2)',
            hoverBorderColor:'rgba(73,155,234,1)',
            data: valores
            }
        ]
    }

    const opciones = {
        responsive: true,
        maintainAspectRatio: false
    }
       
    return (
        <div className="containerGrafica">
            <h2>Consolidado Ventas Montacargas por Año</h2>

            <Bar data={data} opctions={opciones} />
        </div>
    );
}

export default Graphics;