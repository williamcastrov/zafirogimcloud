import React, { useState, useEffect } from "react";
import firebase from "../../../../server/firebase";
import "firebase/auth";
import BarSessionSuperAdmin from "./BarSessionSuperAdmin";
import BarSession from "./BarSession";
import BarSessionUno from "./BarSessionUno";
import BarSessionDos from "./BarSessionDos";
import BarSessionTres from "./BarSessionTres";
import BarSessionCuatro from "./BarSessionCuatro";
import BarSessionCinco from "./BarSessionCinco";
import BarSessionSeis from "./BarSessionSeis";
import BarSessionSiete from "./BarSessionSiete";
import BarSessionOcho from "./BarSessionOcho";

export default function SelectMenuBar(props) {
  const { tipousuario, idusuario } = props;
  //console.log("TIPO DE USUARIO : ", tipousuario);
  //console.log("ID DE USUARIO : ", idusuario);

  const [selectedForm, setSelectedForm] = useState(0);
  //const [listarUsuarios, setListUsuarios] = useState([]);

  const handlerForm = () => {
    //setSelectedForm(tipo_usu)
    console.log("TIPO DE USUARIO : ", tipousuario)
    switch (tipousuario) {
      case 13:
        return <BarSessionSuperAdmin />
      case 10:
        return <BarSession idusuario={idusuario} />
      case 11:
        return <BarSessionUno />
      case 12:
        return <BarSessionDos />
      case 18:
          return <BarSessionCinco />
      case 19:
          return <BarSessionSeis />
      case 20:
          return <BarSessionSiete />
      case 21:
          return <BarSessionOcho />
      case 17:
        return <BarSessionCuatro />
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
