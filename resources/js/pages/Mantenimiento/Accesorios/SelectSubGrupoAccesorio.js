import React, { useState, useEffect } from "react";
import firebase from "../../../../server/firebase";
import "firebase/auth";
import BarSessionSuperAdmin from "./BarSessionSuperAdmin";
import BarSession from "./BarSession";
import BarSessionUno from "./BarSessionUno";
import BarSessionDos from "./BarSessionDos";
import BarSessionTres from "./BarSessionTres";

export default function SelectSubGrupoAccesorio(props) {
  const {  tipousuario } = props;
  console.log("TIPO DE USUARIO : ", tipousuario);

  const [selectedForm, setSelectedForm] = useState(0);
  //const [listarUsuarios, setListUsuarios] = useState([]);

  const handlerForm = () => {
   //setSelectedForm(tipo_usu)
    switch (tipousuario) {
      case 13:
        return <BarSessionSuperAdmin />;
      case 10:
        return <BarSession />;
      case 11:
        return <BarSessionUno/>
      case 12:
        return <BarSessionDos/>
      default:
        return <BarSessionTres />;
    }
  };

  return (
    <div>
      <div>
        {handlerForm()}
      </div>
    </div>
  );
}
