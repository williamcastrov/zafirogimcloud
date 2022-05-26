import React, {useState} from 'react';
import html2pdf from "html2pdf.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./ArchivoPdf.css";

function ImprimirOT(){
    const [nombrePdf, setNombrePdf] = useState("ot")

    const exportarAPdf = () => {

        var configuracion = {
            margin: 1,
            filename: nombrePdf+".pdf",
            jsPDF: { unit: 'in', format: 'letter' }
        }

        var documento = document.getElementById('pdf react');
        html2pdf(documento, configuracion);
    }

        return (
            <div>
                <br />
                <button className="btn btn-primary botonPdf " onClick={() => exportarAPdf()} >Exportar a PDF</button>

                <div className="container" id="pdf react" >
                    <img src={require("../img/logo-menu.png")} className="imagenesPdf" />
                    <h5>GIM CLOUD LOGISTRAL S.A.</h5>
                    <h2 className="tituloPdf" >OT # </h2>

                    <p className="parrafoPdf" >
                        React (también llamada React.js o ReactJS)
                        Es una biblioteca Javascript de código abierto diseñada para crear interfaces de usuario
                        con el objetivo de facilitar el desarrollo de aplicaciones en una sola página.
                        Es mantenido por Facebook y la comunidad de software libre.
                        En el proyecto hay más de mil desarrolladores libres.

                        React intenta ayudar a los desarrolladores a construir aplicaciones que usan datos
                        que cambian todo el tiempo. Su objetivo es ser sencillo, declarativo y fácil de combinar.
                        React sólo maneja la interfaz de usuario en una aplicación;
                        React es la Vista en un contexto en el que se use el patrón MVC (Modelo-Vista-Controlador) o
                        MVVM (Modelo-vista-modelo de vista)
                   </p>
                   
                   
                </div>
            </div>
        );

}

export default ImprimirOT;