import React from 'react';
import {Bar} from 'react-chartjs-2';
import './Graphics.css';

const data={
    labels:["Facebook", "Youtube", "WhatsApp", "Facebook Messenger", "WeChat"],
    datasets:[
        {
        label:"Millones de Usuarios",
        backgroundColor: 'rgba(0,0,255,1)',
        borderColor:'black',
        borderWidth:1,
        hoverBackgroundColor:'rgba(0,0,255,0.2)',
        hoverBorderColor:'rgba(73,155,234,1)',
        data: [0.17, 19, 156, 357, 565, 1149]
        }
    ]
}

const opciones = {
    responsive: true,
    maintainAspectRatio: false
}

function Graphics(props) {
   
    return (
        <div className="containerGrafica">
            <Bar data={data} opctions={opciones} />
        </div>
    );
}

export default Graphics;