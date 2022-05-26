import React, { Component } from 'react';
import html2pdf from "html2pdf.js";
import 'bootstrap/dist/css/bootstrap.min.css';

class ImprimirOT extends Component {

    render() {
        return (
            <div>
                <button className="btn btn-primary botonPdf " onClick={() => this.exportarAPdf()} >Exportar a PDF</button>

                <div className="container" >
                    <h1>OT # </h1>
                </div>
            </div>
        );
    }
}

export default ImprimirOT;