import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Spinner } from "reactstrap";
import "./Loading.css";

function Loading(props) {
    return (
        <div className="divPadre" >
            <div className="divHijo" >
                <br />
                <Spinner color="primary" className="spinnerReactstrap" />
            </div>
        </div>
    );
}

export default Loading;